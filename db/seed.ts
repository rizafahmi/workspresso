import { db, Venue } from "astro:db";

export default async function seed() {
  await db.insert(Venue).values({
    id: 1,
    name: "Brew & Bytes Cafe",
    grade: "A",
    wifiScore: 5,
    powerScore: 5,
    noiseScore: 5,
    seatingScore: 5,
    address: "123 Tech Street, Downtown",
    hours: "7:00 AM - 10:00 PM",
    vibe: "Modern & Tech-Friendly",
    color: "emerald",
  });

  await db.insert(Venue).values({
    id: 2,
    name: "The Daily Grind",
    grade: "B",
    wifiScore: 4,
    powerScore: 3,
    noiseScore: 3,
    seatingScore: 4,
    address: "456 Main Avenue, Central",
    hours: "6:00 AM - 8:00 PM",
    vibe: "Classic Coffee Shop",
    color: "amber",
  });

  await db.insert(Venue).values({
    id: 3,
    name: "Code & Coffee Co.",
    grade: "A",
    wifiScore: 5,
    powerScore: 5,
    noiseScore: 5,
    seatingScore: 5,
    address: "789 Innovation Blvd, Tech District",
    hours: "8:00 AM - 9:00 PM",
    vibe: "Startup Haven",
    color: "violet",
  });

  await db.insert(Venue).values({
    id: 4,
    name: "Cafe Momentum",
    grade: "C",
    wifiScore: 2,
    powerScore: 2,
    noiseScore: 2,
    seatingScore: 2,
    address: "321 Busy Street, Market Area",
    hours: "7:00 AM - 6:00 PM",
    vibe: "Bustling & Social",
    color: "orange",
  });
}
