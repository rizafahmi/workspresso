import { embedText, cosineSimilarity, bm25 } from "./embeddings.ts";

const data = `Name: Brew & Bytes Cafe, Description: Perfect workspace for developers and freelancers. High-speed fiber internet, plenty of power outlets, and a quiet atmosphere. Specializes in artisan coffee and healthy snacks., Known for: Modern & Tech-Friendly, Tags: coworking,wifi,quiet,coffee,developers,freelancers,power outlets
Name: The Daily Grind, Description: Traditional coffee shop with solid WiFi and decent seating. Can get noisy during rush hours. Great for casual work sessions and meetings., Known for: Classic Coffee Shop, Tags: coffee shop,traditional,wifi,meetings,casual,downtown
Name: Code & Coffee Co., Description: Premium coworking cafe designed for programmers and tech professionals. Ultra-fast WiFi, standing desks available, and coding-themed decor., Known for: Startup Haven, Tags: coworking,programmers,tech,startup,standing desks,premium,ultra fast wifi
Name: Cafe Momentum, Description: Busy neighborhood cafe with limited workspace amenities. WiFi can be unreliable and outlets are scarce. Better for quick coffee than extended work sessions., Known for: Bustling & Social, Tags: neighborhood,busy,social,coffee,limited amenities
Name: Dummin Coffee & Space UKDW, Description: Dummin Coffee & Space offers a comfortable and conducive atmosphere for concentration, making it a favorite for students and workers. It features fast Wi-Fi, numerous power outlets, and spacious seating on the second floor, perfect for long work sessions., Known for: Productive and cozy atmosphere for students and workers., Tags: Good for Work,Fast WiFi,Cafe,WFC,Great Coffee,Cozy,Spacious,Quiet,Crowded,Loud
Name: Cosan Coffee, Description: Cosan Coffee offers a cozy and simply designed space, ideal for both relaxed gatherings and focused work sessions. It caters well to students and professionals needing to complete tasks., Known for: A modern and cozy space perfect for both productivity and relaxation., Tags: Cafe,Good for Work,Cozy,Great Coffee,WFC,Loud,Crowded,Quiet,Spacious,Fast WiFi
Name: Koat Coffee Palagan, Description: Koat Coffee Palagan offers a cozy workspace with complete facilities including indoor smoking, indoor no-smoking, and outdoor areas extending to a second floor. It's a popular 24-hour spot known for its diverse menu and frequent collaborations with other outlets., Known for: Lively and popular spot with complete facilities for all-day gatherings., Tags: Cafe,Loud,Great Coffee,Cozy,Good for Work,WFC,Crowded,Quiet,Spacious,Fast WiFi
Name: Omore Coffee, Description: Omore Coffee boasts an aesthetic design and a calm atmosphere, perfect for deep conversations or focused work. It offers both indoor and outdoor seating, making it a popular spot for students to study and enjoy delicious coffee and desserts., Known for: Quiet and aesthetic, perfect for deep conversations and special moments., Tags: Loud,Cafe,Good for Work,Great Coffee,Cozy,Quiet,WFC,Crowded,Spacious,Fast WiFi
Name: JK Kopi Seduh, Description: This cafe offers a unique experience with walls covered in striking, colorful graffiti, creating a vibrant atmosphere for local artists' expression. It provides a very comfortable space for gathering and relaxed conversations, with an open view of coffee brewing from strong espresso to soft cappuccino., Known for: Artistic and relaxed with a vibrant, expressive atmosphere., Tags: Cafe,Great Coffee,Good for Work,Crowded,Spacious,Cozy,WFC,Loud,Quiet,Fast WiFi
Name: Ethikopia Coffeebay, Description: Ethikopia Coffeebay is a comfortable and calm place with an interesting and aesthetic interior design. It is perfect for enjoying coffee and conversation with friends or family., Known for: A comfortable and calm atmosphere with an aesthetic design., Tags: Cafe,Cozy,Quiet,Great Coffee,WFC,Good for Work,Spacious,Crowded,Loud,Fast WiFi
`;
const query = "modern"; // premium coffee, traditional, modern, quiet, cozy
console.log("BM25");
console.log("================================");
(function () {
  const sentences = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.trim().length > 0);
  console.log(`Query: ${query}`);
  console.time("BM25 Execution Time");
  const results = [];
  for (const sentence of sentences) {
    const relevancy = bm25(sentence, query);
    const report = sentence.split(", ")[0];
    results.push({ report, relevancy });
  }
  results.sort((a, b) => b.relevancy - a.relevancy);
  for (const { report, relevancy } of results) {
    console.log(`${report} - Score: ${relevancy}`);
  }
  console.timeEnd("BM25 Execution Time");
})();

console.log("\n\n");
console.log("TaylorAI/bge-micro-v2");
console.log("================================");
async function evalBge() {
  const texts = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.trim().length > 0);
  console.log(`Query: ${query}`);
  console.time("BGE Execution Time");
  const queryEmbed = await embedText(query);

  const results = [];
  for (const text of texts) {
    const venueEmbed = await embedText(text);
    const score = cosineSimilarity(queryEmbed, venueEmbed);
    const relevancy = Math.round(score * 100) / 100;
    const report = text.split(", ")[0];

    results.push({ report, relevancy });
  }

  results.sort((a, b) => b.relevancy - a.relevancy);
  for (const { report, relevancy } of results) {
    console.log(`${report} - Score: ${relevancy}`);
  }
  console.timeEnd("BGE Execution Time");
}
await evalBge();

console.log("\n\n");
console.log("sentence-transformers/all-MiniLM-L6-v2");
console.log("================================");
async function evalMiniLM() {
  const texts = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.trim().length > 0);
  console.log(`Query: ${query}`);
  console.time("MiniLM Execution Time");
  const queryEmbed = await embedText(
    query,
    "feature-extraction",
    "sentence-transformers/all-MiniLM-L6-v2",
  );

  const results = [];
  for (const text of texts) {
    const venueEmbed = await embedText(
      text,
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2",
    );
    const score = cosineSimilarity(queryEmbed, venueEmbed);
    const relevancy = Math.round(score * 100) / 100;
    const report = text.split(", ")[0];

    results.push({ report, relevancy });
  }
  results.sort((a, b) => b.relevancy - a.relevancy);
  for (const { report, relevancy } of results) {
    console.log(`${report} - Score: ${relevancy}`);
  }
  console.timeEnd("MiniLM Execution Time");
}
await evalMiniLM();
