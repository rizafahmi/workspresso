import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  saveVenue: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      address: z.string(),
      hours: z.string(),
      wifiScore: z.number().min(0).max(5),
      powerScore: z.number().min(0).max(5),
      noiseScore: z.number().min(0).max(5),
    }),
    handler: (input) => {
      // Implement the handler logic here
      console.log("Saving venue:", input);
      return { success: true };
    },
  }),
};
