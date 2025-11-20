import { db, eq, Venue } from "astro:db";
import { generate } from "../../ai.ts";

export async function POST({ request }: { request: Request }) {
	try {
		const { venueId1, venueId2 } = await request.json();

		const id1 = Number(venueId1);
		const id2 = Number(venueId2);

		if (!Number.isInteger(id1) || !Number.isInteger(id2)) {
			return new Response(
				JSON.stringify({ error: "Invalid venue IDs." }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		if (id1 === id2) {
			return new Response(
				JSON.stringify({ error: "Please select two different venues." }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		/* FEAT 7: ⚠️ RAG - Retrieve venue data ⚠️ */
		// const [venue1] = await db
		// 	.select()
		// 	.from(Venue)
		// 	.where(eq(Venue.id, id1));

		// const [venue2] = await db
		// 	.select()
		// 	.from(Venue)
		// 	.where(eq(Venue.id, id2));

		// if (!venue1 || !venue2) {
		// 	return new Response(
		// 		JSON.stringify({ error: "One or both venues not found." }),
		// 		{ status: 400, headers: { "Content-Type": "application/json" } },
		// 	);
		// }

		// const fmt = (value: string | null | undefined) => value ?? "N/A";

		/* FEAT 7: ⚠️ RAG - Augment & Generation ⚠️ */
// 		const prompt = `Compare the following two venues for remote work and return the result as JSON:

// Venue 1:
// - Name: ${venue1.name}
// - Wi-Fi: ${venue1.wifiScore}/5
// - Power: ${venue1.powerScore}/5
// - Noise: ${venue1.noiseScore}/5
// - Seating: ${venue1.seatingScore}/5
// - Vibe: ${fmt(venue1.vibe)}
// - Tags: ${fmt(venue1.tags)}
// - Description: ${fmt(venue1.description)}

// Venue 2:
// - Name: ${venue2.name}
// - Wi-Fi: ${venue2.wifiScore}/5
// - Power: ${venue2.powerScore}/5
// - Noise: ${venue2.noiseScore}/5
// - Seating: ${venue2.seatingScore}/5
// - Vibe: ${fmt(venue2.vibe)}
// - Tags: ${fmt(venue2.tags)}
// - Description: ${fmt(venue2.description)}

// Return a JSON object with the following structure:
// {
//   "venue1": {
//     "name": "Venue 1 Name",
//     "pros": ["List of pros"],
//     "cons": ["List of cons"]
//   },
//   "venue2": {
//     "name": "Venue 2 Name",
//     "pros": ["List of pros"],
//     "cons": ["List of cons"]
//   },
//   "summary": "A brief summary comparing the two venues for remote work."
// }`;

// 		const { status, text, error } = await generate(prompt, {
// 			responseMimeType: "application/json",
// 		});

// 		if (status === "ko" || !text) {
// 			console.error("LLM error:", error);
// 			return new Response(
// 				JSON.stringify({ error: "Failed to generate comparison." }),
// 				{ status: 500, headers: { "Content-Type": "application/json" } },
// 			);
// 		}

// 		try {
// 			const parsed = JSON.parse(text);
// 			return new Response(JSON.stringify(parsed), {
// 				status: 200,
// 				headers: { "Content-Type": "application/json" },
// 			});
// 		} catch (parseError) {
// 			console.error("JSON parse error:", parseError);
// 			return new Response(
// 				JSON.stringify({ error: "Model returned invalid JSON." }),
// 				{ status: 502, headers: { "Content-Type": "application/json" } },
// 			);
// 		}
// 	} catch (err) {
// 		console.error("Unexpected error:", err);
// 		return new Response(
// 			JSON.stringify({ error: "An error occurred." }),
// 			{ status: 500, headers: { "Content-Type": "application/json" } },
// 		);
// 	}
}
