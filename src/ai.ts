type Result = { status: "ok" | "ko"; text?: string; error?: string };
export async function generate(
  prompt: string, config: Record<string, unknown> = {},
): Promise<Result> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.GOOGLE_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        "generationConfig": config,
      }),
    });

    console.log(result);
    const { candidates } = await result.json();
    console.log(candidates);
    const text = candidates[0].content.parts[0];
    return { status: "ok", text };
  } catch (err) {
    return {
      status: "ko",
      error: (err as Error).message,
    };
  }
}
