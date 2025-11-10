import { column, defineDb, defineTable, NOW } from "astro:db";

const Venue = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text({ optional: true }),
    tags: column.text({ optional: true }),
    grade: column.text({ default: "-" }),
    wifiScore: column.number(),
    powerScore: column.number(),
    noiseScore: column.number(),
    seatingScore: column.number(),
    address: column.text(),
    url: column.text({ optional: true }),
    hours: column.text(),
    vibe: column.text({ optional: true }),
    color: column.text({
      enum: ["emerald", "amber", "violet", "orange"],
      default: "emerald",
    }),
    summary: column.text({ optional: true }),
    satisfaction: column.text({
      enum: ["worst", "bad", "ok", "good", "great", "awesome"],
      optional: true,
    }),
    created_at: column.date({ default: NOW }),
  },
});

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    venueId: column.number({ references: () => Venue.columns.id }),
    userName: column.text(),
    comment: column.text(),
    rating: column.number({ optional: true }),
    sentiment: column.text({
      enum: ["positive", "neutral", "negative"],
      optional: true,
    }),
    imageUrl: column.text({ optional: true }),
    created_at: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Venue, Comment },
});
