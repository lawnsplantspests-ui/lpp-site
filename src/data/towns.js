// ─────────────────────────────────────────────────────────────
//  YOUR SERVICE TOWNS  ← THIS IS THE IMPORTANT ONE
//
//  Every town in this list automatically becomes its own page at
//  /service-areas/<slug>  — this is what helps you rank for searches
//  like "lawn care Hershey PA".
//
//  To add a town: copy a block, change the values.
//  TO AVOID GOOGLE PENALTIES: give each town a genuinely different
//  "blurb" and real local "neighborhoods". Do NOT just swap the name —
//  Google detects copy-paste town pages and ignores them.
//
//  These are PLACEHOLDERS based on your area. Replace with the towns
//  you actually serve and rewrite each blurb in your own words.
// ─────────────────────────────────────────────────────────────

export const towns = [
  {
    slug: "harrisburg-pa",
    name: "Harrisburg",
    county: "Dauphin County",
    neighborhoods: ["Uptown", "Midtown", "Bellevue Park", "Shipoke"],
    blurb:
      "Harrisburg's older neighborhoods mean mature trees and established lawns that need a knowledgeable hand. We tailor turf and plant-health programs to the city's mix of shade, slope, and soil.",
  },
  {
    slug: "paxtang-pa",
    name: "Paxtang",
    county: "Dauphin County",
    neighborhoods: ["Paxtang Borough", "Rutherford"],
    blurb:
      "Paxtang is home turf for us. Tight borough lots reward precise, low-drift application — exactly the kind of careful work a licensed applicator who keeps bees insists on.",
  },
  {
    slug: "hershey-pa",
    name: "Hershey",
    county: "Dauphin County",
    neighborhoods: ["Hershey", "Hummelstown line", "Sand Beach"],
    blurb:
      "Hershey's larger properties and prized landscaping call for a season-long plan. We keep lawns, ornamentals, and trees thriving while watching out for pollinators.",
  },
  {
    slug: "camp-hill-pa",
    name: "Camp Hill",
    county: "Cumberland County",
    neighborhoods: ["Lower Allen", "Wesley Drive corridor"],
    blurb:
      "Camp Hill's well-kept residential streets set a high bar for curb appeal. Our fertilization and weed-control rounds are timed to Cumberland County's growing season.",
  },
  {
    slug: "mechanicsburg-pa",
    name: "Mechanicsburg",
    county: "Cumberland County",
    neighborhoods: ["Trindle Springs", "Upper Allen", "Shepherdstown"],
    blurb:
      "From historic in-town lots to newer developments, Mechanicsburg properties get a program matched to their turf type and tree canopy.",
  },
  {
    slug: "hummelstown-pa",
    name: "Hummelstown",
    county: "Dauphin County",
    neighborhoods: ["Brownstone", "Hershey line"],
    blurb:
      "Hummelstown's brownstone-era homes often come with established gardens and big shade trees — a perfect fit for our combined lawn and plant-health care.",
  },
];

export const getTown = (slug) => towns.find((t) => t.slug === slug);
