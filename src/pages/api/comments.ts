import { Comment, db, eq, Venue } from "astro:db";
import { generate } from "../../ai.ts";

export async function POST({ request }: { request: Request }) {
  try {
    const { venueId, userName, comment } = await request.json();

    if (!venueId || !userName || !comment) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Get the next ID by counting existing comments
    const existingComments = await db.select().from(Comment);
    const nextId = existingComments.length + 1;
    const prompt =
      `Your job is to categorize whether text has a positive or negative sentiment. Just return either Positive, Negative or Neutral. Here are some examples of text you might see:

    User: I love this cafe!
    Assistant: Positive
    User: Bagus sekali.
    Assistant: Positive
    User: Kopinya pahit.
    Assistant: Negative
    User: Meh..
    Assistant: Neutral
    User: Could be better.
    Assistant: Neutral

    Now it's your turn!

    User: ${comment.trim()}
    Assistant:
    `;

    const config = {
      "responseMimeType": "application/json",
      "responseSchema": {
        type: "STRING",
      },
    };
    const { status, text } = await generate(prompt, config);
    console.log(text);

    await db.insert(Comment).values({
      id: nextId,
      venueId: Number(venueId),
      userName: userName.trim(),
      comment: comment.trim(),
      sentiment: text.text?.replaceAll('"', "").toLowerCase() || "neutral",
    });

    updateCommentsSummary(venueId);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    console.error("Error posting comment:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to post comment" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

async function updateCommentsSummary(venueId) {
  const comments = await db.select().from(Comment).where(
    eq(Comment.venueId, Number(venueId)),
  );
  const prompt =
    `You are part of customer experience system. Your job is to write brief summaries of customer's comments and interactions. This is to help support agents to understand the context quickly so they can help the venue owner efficiently.

  The comments so far is:

  ${commentList(comments)}

  Write a 10-word summary of all the things CUSTOMER has said. Then based on that summary, score the customer's satisfaction using one of the following phrases ranked from worst to best: worst, bad, ok, good, great, awesome.
  Pay particular attention to the TONE of the customer's message, as we are most interested in their emotional state.
  `;
  console.log(prompt);
  const config = {
    "responseMimeType": "application/json",
    "responseSchema": {
      type: "OBJECT",
      properties: {
        summary: { type: "STRING" },
        satisfaction: { type: "STRING" },
      },
    },
  };
  const { status, text } = await generate(prompt, config);
  console.log(typeof text.text);
  const { summary, satisfaction } = JSON.parse(text.text);
  console.log({ summary, satisfaction });

  await db
    .update(Venue)
    .set({ summary, satisfaction })
    .where(eq(Venue.id, Number(venueId)))
    .run();
}

function commentList(comments) {
  return comments.map((comment) => comment.comment).join(".\n");
}
