/**
 * Workforce Infotech Pvt. Ltd. - SEO Keyword Directory & Strategy
 * Structured for Google Search Ranking across Brand, Services, Verticals & Locations
 */

export const seoKeywords = {
  // 1. Primary Keywords - Homepage, H1, Global Metadata
  primary: [
    "Election Management Company",
    "Election Management Company in India",
    "Election Management Services",
    "Election Campaign Management Company",
    "Election Campaign Management Services",
    "Political Campaign Management Company",
    "Political Campaign Management Services",
    "Election Strategy Company",
    "Election Strategy Consultant",
    "Political Consulting Company",
    "Political Campaign Consultant",
    "Election Consultant in India",
    "Political Consulting Services India",
    "Election Campaign Consultant India"
  ],

  // 2. Brand Keywords
  brand: [
    "Workforce Infotech Pvt Ltd",
    "Workforce Infotech",
    "Workforce Infotech Election Management",
    "Workforce Infotech Election Management Company",
    "Workforce Infotech Political Consulting",
    "Workforce Infotech Election Campaign",
    "Workforce Infotech Political Campaign Management",
    "Workforce Infotech Election Consultant",
    "Workforce Infotech Kanpur",
    "Workforce Infotech Lucknow"
  ],

  // 3. Campaign Services Keywords
  campaignServices: [
    "Election Campaign Management",
    "Political Campaign Management",
    "Election War Room Management",
    "Election Data Management",
    "Voter Data Management",
    "Booth Management",
    "Booth Level Management",
    "Constituency Management",
    "Election Survey Company",
    "Voter Survey Company",
    "Political Survey Services",
    "Election Ground Survey",
    "Voter Feedback Survey",
    "Candidate Survey",
    "Political Campaign Strategy",
    "Election Campaign Strategy",
    "Constituency Survey",
    "Booth Survey",
    "Political Data Analytics"
  ],

  // 4. Digital Campaign Keywords
  digital: [
    "Political Digital Marketing",
    "Political Social Media Management",
    "Election Social Media Management",
    "Political Social Media Campaign",
    "Election Digital Campaign",
    "Political Digital Campaign",
    "Political Content Creation",
    "Political Video Production",
    "Election Video Production",
    "Political Branding",
    "Candidate Branding",
    "Political Website Development",
    "Election Website Development",
    "Political Advertising Agency",
    "Election Advertising Services"
  ],

  // 5. Ground Campaign Keywords
  ground: [
    "Election Ground Campaign Management",
    "Political Ground Campaign",
    "Booth Management Services",
    "Booth Level Campaign Management",
    "Voter Outreach Campaign",
    "Voter Contact Program",
    "Door to Door Campaign Management",
    "Election Volunteer Management",
    "Political Volunteer Management",
    "Election Call Center",
    "Political Call Center",
    "Election Telecalling Services",
    "Voter Calling Services",
    "Constituency Campaign Management"
  ],

  // 6. Location-Based Keywords
  locations: {
    uttarPradesh: [
      "Election Management Company in Uttar Pradesh",
      "Election Campaign Management Company in Uttar Pradesh",
      "Political Consulting Company in Uttar Pradesh",
      "Election Consultant in Uttar Pradesh",
      "Political Campaign Management in Uttar Pradesh",
      "Election Survey Company in Uttar Pradesh",
      "UP Election 2027 Management"
    ],
    kanpur: [
      "Election Management Company in Kanpur",
      "Election Campaign Management Company in Kanpur",
      "Political Consulting Company in Kanpur",
      "Political Campaign Management in Kanpur",
      "Election Consultant in Kanpur",
      "Election Survey Company in Kanpur",
      "Political Digital Marketing Agency in Kanpur"
    ],
    lucknow: [
      "Election Management Company in Lucknow",
      "Election Campaign Management Company in Lucknow",
      "Political Consulting Company in Lucknow",
      "Political Campaign Management in Lucknow",
      "Election Consultant in Lucknow",
      "Election Survey Company in Lucknow"
    ]
  },

  // 7. High-Intent Keywords
  highIntent: [
    "Best Election Management Company",
    "Best Election Campaign Management Company",
    "Best Political Consulting Company",
    "Best Election Consultant",
    "Election Management Agency",
    "Political Campaign Agency",
    "Election Campaign Agency",
    "Election Strategy Agency",
    "Political Consulting Agency",
    "Election Campaign Company",
    "Hire Election Management Company",
    "Hire Election Campaign Consultant",
    "Election Campaign Management Services"
  ]
};

// Flattened complete list of unique keywords
export const allSiteKeywords: string[] = Array.from(
  new Set([
    ...seoKeywords.primary,
    ...seoKeywords.brand,
    ...seoKeywords.campaignServices,
    ...seoKeywords.digital,
    ...seoKeywords.ground,
    ...seoKeywords.locations.uttarPradesh,
    ...seoKeywords.locations.kanpur,
    ...seoKeywords.locations.lucknow,
    ...seoKeywords.highIntent
  ])
);
