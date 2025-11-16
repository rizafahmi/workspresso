import { Comment, db, eq, Venue } from "astro:db";
import { generate, sendImageAndGenerate } from "../../ai.ts";

export async function POST({ request }: { request: Request }) {
  try {
    const { venueId, userName, comment, sentiment, imageUrl } = await request
      .json();

    let imageData = null;
    if (imageUrl) {
      const { status, text } = await checkImage(imageUrl);
      console.log({ status, text });
      const checkData = JSON.parse(text);
      if (checkData.status === "ACCEPTED") {
        imageData = imageUrl;
      }
    }

    if (!venueId || !userName || !comment) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await db.insert(Comment).values({
      venueId: Number(venueId),
      userName: userName.trim(),
      comment: comment.trim(),
      sentiment: sentiment.trim(),
      imageUrl: imageData ? imageData : null,
    });

    /* TODO: ⚠️ Summarize comments ⚠️ */
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

/* TODO: ⚠️ Summarize comments function ⚠️ */
// async function updateCommentsSummary(venueId) {
//   const comments = await db.select().from(Comment).where(
//     eq(Comment.venueId, Number(venueId)),
//   );
//   const prompt =
//     `You are part of customer experience system. Your job is to write brief summaries of customer's comments and interactions. This is to help support agents to understand the context quickly so they can help the venue owner efficiently.

//   The comments so far is:

//   ${commentList(comments)}

//   Write a 10-word summary of all the things CUSTOMER has said. Then based on that summary, score the customer's satisfaction using one of the following phrases ranked from worst to best: worst, bad, ok, good, great, awesome.
//   Pay particular attention to the TONE of the customer's message, as we are most interested in their emotional state.
//   `;
//   console.log(prompt);
//   const config = {
//     "responseMimeType": "application/json",
//     "responseSchema": {
//       type: "OBJECT",
//       properties: {
//         summary: { type: "STRING" },
//         satisfaction: { type: "STRING" },
//       },
//     },
//   };
//   const { status, text } = await generate(prompt, config);
//   const { summary, satisfaction } = JSON.parse(text);
//   console.log({ summary, satisfaction });

//   await db
//     .update(Venue)
//     .set({ summary, satisfaction })
//     .where(eq(Venue.id, Number(venueId)))
//     .run();
// }

function commentList(comments) {
  return comments.map((comment) => comment.comment).join(".\n");
}

async function checkImage(imageUrl: string) {
  if (!imageUrl) return;
  try {
    const prompt =
      `You will be analyzing an image to determine if it falls into one of three acceptable categories.

    Your task is to determine whether this image shows one of the following three acceptable types:

    1. **Foods** - Any edible items, meals, snacks, ingredients, or food products. This includes prepared dishes, raw ingredients, packaged food items, baked goods, etc.

    2. **Drinks** - Any beverages or liquid refreshments. This includes alcoholic and non-alcoholic drinks, hot and cold beverages, bottled drinks, drinks in glasses or cups, etc.

    3. **Photo of menu** - Images showing restaurant menus, cafe menus, drink menus, food menus, or any printed/digital menu displaying food and/or drink options with descriptions and/or prices.

    When analyzing the image, consider these guidelines:

    - Look carefully at all visible elements in the image
    - If the image contains multiple elements, determine what the primary focus is
    - An image showing both food and drinks should be accepted (categorize based on the primary focus)
    - Menu photos can be physical menus, digital displays, or menu boards
    - Be inclusive rather than restrictive - if something is clearly edible or drinkable, it should be accepted

    For your response:

    First, describe what you observe in the image and explain your reasoning for whether it fits into one of the acceptable categories.

    Then, provide your final determination using one of these exact phrases:
    - "ACCEPTED - Food"
    - "ACCEPTED - Drink"
    - "ACCEPTED - Menu"
    - "REJECTED - Does not match acceptable categories"

    Format your response as follows:
    <analysis>
    [Your detailed observation and reasoning here]
    </analysis>

    <determination>
    [Your final determination using one of the four exact phrases above]
    </determination>`;

    const config = {
      "responseMimeType": "application/json",
      "responseSchema": {
        type: "OBJECT",
        properties: {
          status: { type: "STRING", enum: ["ACCEPTED", "REJECTED"] },
          type: { type: "STRING", enum: ["FOOD", "DRINK", "MENU"] },
        },
      },
      "thinkingConfig": {
        "thinkingBudget": 0,
      },
    };

    return sendImageAndGenerate(prompt, imageUrl, config);
  } catch (err) {
    console.error(err);
    throw new Error("Invalid image");
  }
}
