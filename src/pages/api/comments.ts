import { db, Comment } from "astro:db";

export async function POST({ request }: { request: Request }) {
  try {
    const { venueId, userName, comment } = await request.json();

    if (!venueId || !userName || !comment) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the next ID by counting existing comments
    const existingComments = await db.select().from(Comment);
    const nextId = existingComments.length + 1;

    await db.insert(Comment).values({
      id: nextId,
      venueId: Number(venueId),
      userName: userName.trim(),
      comment: comment.trim(),
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error posting comment:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to post comment" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
