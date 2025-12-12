import { db, Venue } from "astro:db";

export default async function seed() {
  await db.insert(Venue).values({
    id: 1,
    name: "Warung Kopi Klotok",
    description:
      "This warung is built in a traditional Javanese joglo style, offering both indoor seating and a large open area where patrons can picnic on mats while enjoying the breeze and view of Mount Merapi. It is famous for its traditionally brewed Klotok coffee, crispy banana fritters, and affordable all-you-can-eat lodeh and rice.",
    tags: "Traditional,joglo,open-air,scenic-view,Mount-Merapi,affordable,Javanese-food,famous-spot",
    grade: "A",
    wifiScore: 5,
    powerScore: 5,
    noiseScore: 5,
    seatingScore: 5,
    address: "Jalan Kaliurang Km. 16, Pakembinangun, Pakem, Sleman, DIY.",
    hours: "08:00 - 22:00",
    vibe: "Traditional",
    color: "emerald",
  });

  await db.insert(Venue).values({
    id: 2,
    name: "Space Coffee Roastery",
    description:
      "Minimalist-industrial design with large tables and numerous power outlets makes this coffee shop ideal for working or studying. It features a dedicated working space, sells manual brew equipment, and offers parking and restrooms.",
    grade: "A",
    wifiScore: 5,
    powerScore: 5,
    noiseScore: 3,
    seatingScore: 4,
    address: "Gg. Loncang No.88, Sinduadi, Mlati, Yogyakarta",
    hours: "08:00 - 24:00",
    vibe: "Minimalist-industrial design",
    color: "amber",
    tags:
      "workingspace,wifi,outlets,minimalist,industrial,large tables,manual brew tools,parking,restroom",
  });

  await db.insert(Venue).values({
    id: 3,
    name: "Klinik Kopi",
    description:
      "The venue operates out of the owner's home, providing a non-traditional coffee experience focused purely on black coffee without sugar or typical espresso drinks. The atmosphere encourages deep conversations about coffee origins and processes, functioning as a specialized tasting room where visitors are referred to as 'patients'.",
    tags:
      "coffee education,local,single origin,authentic,unique concept,no wifi,no sugar,barista talk,small menu",
    grade: "B",
    wifiScore: 1,
    powerScore: 2,
    noiseScore: 5,
    seatingScore: 3,
    address: "Jl. Kaliurang KM. 7.8, Gang Bima, Sinduharjo, Ngaglik, Sleman",
    hours: "16:00 - 20:00",
    vibe: "Study Haven",
    color: "violet",
  });

  await db.insert(Venue).values({
    id: 4,
    name: "Tekoff Coffee and Tea",
    description:
      "This coffee shop offers an environment suitable for gathering with friends, specializing in various affordable and delicious food and beverages. The atmosphere is casual and welcoming, making it an ideal local hangout.",
    tags: "Coffee Shop,Affordable,Socializing,Beverages,Takeout,Delivery",
    grade: "A",
    wifiScore: 5,
    powerScore: 5,
    noiseScore: 5,
    seatingScore: 5,
    address: "Gk 5 1053B Sagan Timur Terban Gondokusuman Yogyakarta",
    hours: "09:00 - 21:00",
    vibe: "Bustling & Social",
    color: "orange",
  });
}
