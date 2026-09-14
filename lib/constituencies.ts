import constituenciesRaw from "@/data/constituencies.json";

export interface ConstituencyItem {
  id: number;
  assembly: string;
  district: string;
  parliament: string;
  state: string;
  code?: number;
}

export const constituencies: ConstituencyItem[] = constituenciesRaw as ConstituencyItem[];

// Popular UP constituencies to show as quick recommendations
export const popularUPConstituencies: ConstituencyItem[] = [
  { id: 189, assembly: "Kalyanpur", district: "Kanpur Nagar", parliament: "Akbarpur", state: "Uttar Pradesh", code: 712 },
  { id: 84, assembly: "Bithoor", district: "Kanpur Nagar", parliament: "Akbarpur", state: "Uttar Pradesh", code: 710 },
  { id: 147, assembly: "Ghatampur", district: "Kanpur Nagar", parliament: "Akbarpur", state: "Uttar Pradesh", code: 711 },
  { id: 225, assembly: "Lucknow Cantt.", district: "Lucknow", parliament: "Lucknow", state: "Uttar Pradesh", code: 965 },
  { id: 226, assembly: "Lucknow Central", district: "Lucknow", parliament: "Lucknow", state: "Uttar Pradesh", code: 966 },
  { id: 293, assembly: "Noida", district: "Gautam Buddha Nagar", parliament: "Gautam Buddha Nagar", state: "Uttar Pradesh", code: 868 },
  { id: 35, assembly: "Ayodhya", district: "Ayodhya", parliament: "Faizabad", state: "Uttar Pradesh", code: 844 },
  { id: 330, assembly: "Rohaniya", district: "Varanasi", parliament: "Varanasi", state: "Uttar Pradesh", code: 1102 },
  { id: 153, assembly: "Gorakhpur Urban", district: "Gorakhpur", parliament: "Gorakhpur", state: "Uttar Pradesh", code: 887 },
  { id: 1, assembly: "Agra Cantt.", district: "Agra", parliament: "Agra", state: "Uttar Pradesh", code: 704 },
  { id: 24, assembly: "Allahabad North", district: "Prayagraj", parliament: "Phulpur", state: "Uttar Pradesh", code: 1049 },
  { id: 245, assembly: "Meerut Cantt.", district: "Meerut", parliament: "Meerut", state: "Uttar Pradesh", code: 994 }
];

/**
 * Fast search through constituencies by assembly, district, parliament, or state.
 * Results with assembly match at the beginning are boosted to the top.
 */
export function searchConstituencies(
  query: string,
  limit = 20,
  stateFilter?: string
): ConstituencyItem[] {
  const cleanQ = (query || "").trim().toLowerCase();
  if (!cleanQ) {
    if (stateFilter) {
      return constituencies.filter((c) => c.state.toLowerCase() === stateFilter.toLowerCase()).slice(0, limit);
    }
    return popularUPConstituencies.slice(0, limit);
  }

  const results: { item: ConstituencyItem; score: number }[] = [];

  for (const item of constituencies) {
    if (stateFilter && item.state.toLowerCase() !== stateFilter.toLowerCase()) {
      continue;
    }

    const aLower = item.assembly.toLowerCase();
    const dLower = item.district.toLowerCase();
    const pLower = item.parliament.toLowerCase();
    const sLower = item.state.toLowerCase();

    let score = 0;

    // Exact assembly match
    if (aLower === cleanQ) score += 100;
    // Assembly starts with query
    else if (aLower.startsWith(cleanQ)) score += 50;
    // Assembly contains query
    else if (aLower.includes(cleanQ)) score += 30;

    // District match
    if (dLower === cleanQ) score += 40;
    else if (dLower.startsWith(cleanQ)) score += 25;
    else if (dLower.includes(cleanQ)) score += 15;

    // Parliament match
    if (pLower === cleanQ) score += 20;
    else if (pLower.includes(cleanQ)) score += 10;

    // State match
    if (sLower.includes(cleanQ)) score += 5;

    // Prioritize Uttar Pradesh when scores are close
    if (item.state === "Uttar Pradesh") score += 2;

    if (score > 0) {
      results.push({ item, score });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit).map((r) => r.item);
}

/**
 * Get unique districts for a given state (default Uttar Pradesh)
 */
export function getDistricts(state = "Uttar Pradesh"): string[] {
  const distSet = new Set<string>();
  for (const c of constituencies) {
    if (!state || c.state.toLowerCase() === state.toLowerCase()) {
      if (c.district) distSet.add(c.district);
    }
  }
  return Array.from(distSet).sort();
}
