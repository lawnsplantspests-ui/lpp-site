// ─────────────────────────────────────────────────────────────
//  YOUR SERVICES
//  Each service has its own full page (good for Google). To remove a
//  service, delete its entry here AND its file in src/pages/services/.
//  To add one, copy an entry here and copy a page file as a template.
// ─────────────────────────────────────────────────────────────

export const services = [
  {
    slug: "lawn-care",
    name: "Lawn Care",
    summary: "Season-long fertilization and weed control on a schedule built for Pennsylvania turf.",
    keywords: "lawn care, lawn fertilization, weed control, crabgrass pre-emergent",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    summary: "Targeted treatment for the pests that actually cause problems here — including stinging insects.",
    keywords: "pest control, yellow jacket removal, ant control, exterminator",
  },
  {
    slug: "plant-health-care",
    name: "Plant Health Care",
    summary: "Keeping trees and shrubs healthy with insect, mite, and disease management — the right input at the right time.",
    keywords: "plant health care, tree and shrub care, mite control, PHC",
  },
  {
    slug: "honeybee-removal",
    name: "Honeybee Removal",
    summary: "Live, no-kill removal and relocation of honeybee colonies by a working beekeeper.",
    keywords: "honeybee removal, bee relocation, live bee removal, swarm removal",
    // ⚠️ If you do NOT offer this service, delete this entry and the file
    //    src/pages/services/honeybee-removal.astro
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
