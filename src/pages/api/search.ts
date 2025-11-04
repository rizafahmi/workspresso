import type { APIRoute } from "astro";
import { db, Venue, like } from "astro:db";

export const GET: APIRoute = async ({ url }) => {
	const query = url.searchParams.get("q")?.trim();

	if (!query) {
		const venues = await db.select().from(Venue);
		return new Response(JSON.stringify(venues), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	const venues = await db
		.select()
		.from(Venue)
		.where(like(Venue.name, `%${query}%`));

	return new Response(JSON.stringify(venues), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
