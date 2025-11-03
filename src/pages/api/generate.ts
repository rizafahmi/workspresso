import { generate } from "../../ai.ts";

export async function POST({ request }: { request: Request }) {
  try {
    const { prompt, config } = await request.json();
    const result = await generate(prompt, config);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ status: "ko", error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
