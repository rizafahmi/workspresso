import { pipeline } from "@huggingface/transformers";

export function bm25(query: string, sentence: string) {
  const k1 = 1.2;
  const b = 0.75;

  const terms = tokenize(sentence);
  const qt = tokenize(query);

  const df = {};
  const uniqueTerms = new Set(terms);
  uniqueTerms.forEach((term) => {
    df[term] = (df[term] || 0) + 1;
  });

  const avgdl = terms.length;
  let score = 0;
  qt.forEach((qi) => {
    if (df[qi]) {
      const idf = Math.log(
        (1 - df[qi] + 0.5) / (df[qi] + 0.5) + 1,
      );
      const tf = terms.filter((term) => term === qi).length;
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (terms.length / avgdl));
      score += idf * (numerator / denominator);
    }
  });

  return score;
}

export async function embedText(
  text: string,
  task: "embeddings" | "feature-extraction" = "embeddings",
  model = "TaylorAI/bge-micro-v2",
) {
  const embedding = await pipeline(
    task,
    model,
    { dtype: "auto" },
  );
  const { data } = await embedding(text, {
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

function tokenize(text: string) {
  const result = text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter((term) => term);

  return result;
}
