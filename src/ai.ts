import { pipeline } from "@huggingface/transformers";

type Result = { status: "ok" | "ko"; text?: string; error?: string };

const MODEL = "gemini-flash-latest";

export async function generate(
  prompt: string,
  config: Record<string, unknown> = {},
): Promise<Result> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

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

    if (!result.ok) {
      throw new Error(`API Error: ${result.status} ${result.statusText}`);
    }

    const data = await result.json();
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from model");
    }
    const text = data.candidates[0].content?.parts?.[0]?.text ?? "";
    return { status: "ok", text };
  } catch (err) {
    return {
      status: "ko",
      error: (err as Error).message,
    };
  }
}

export async function generateTags(text: string) {
  const classifier = await pipeline(
    "zero-shot-classification",
    "cross-encoder/nli-MiniLM2-L6-H768",
  );

  await classifier("warm up", ["a", "b", "c"]);
  const candidateLabels = [
    "WFC",
    "Cafe",
    "Quiet",
    "Loud",
    "Cozy",
    "Spacious",
    "Fast WiFi",
    "Good for Work",
    "Great Coffee",
    "Crowded",
  ];
  const result = await classifier(text, candidateLabels);
  return result;
}

export async function sendImageAndGenerate(
  prompt: string,
  imageData: string,
  config: Record<string, unknown> = {},
): Promise<Result> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const { mime, image } = getImageData(imageData);
  const contents = {
    contents: [
      {
        parts: [{
          "inlineData": { "mimeType": mime, "data": image },
        }, { text: prompt }],
      },
    ],
    "generationConfig": config,
  };
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.GOOGLE_API_KEY,
      },
      body: JSON.stringify(contents),
    });

    const { candidates } = await result.json();

    const text = candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return { status: "ok", text };
  } catch (err) {
    return {
      status: "ko",
      error: (err as Error).message,
    };
  }
}

function getImageData(image: string) {
  const parts = image.split(",");
  // data:image/jpeg;base64,
  const mime = parts[0].match(/:(.*?);/)![1];

  return {
    mime,
    image: parts[1],
  };
}
