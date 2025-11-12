import { pipeline } from "@huggingface/transformers";

export async function embedText(text: string) {
  const embeddingPipeline = await pipeline(
    "embeddings",
    "TaylorAI/bge-micro-v2",
  );
  const { data } = await embeddingPipeline(text, {
    pooling: "cls",
    normalize: true,
  });
  return data;
}

export function cosineSimilarity(vec1: Array<number>, vec2: Array<number>) {
  let result = 0;
  for (let i = 0; i < vec1.length; i++) {
    result += vec1[i] * vec2[i];
  }

  return result;
}
