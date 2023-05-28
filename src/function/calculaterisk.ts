export function calculateRisk(claim: string): { riskRating: number } {
  if (!claim) {
    throw new Error("Invalid input: claim is missing or empty.");
  }

  if (claim === "No claims in the last 3 years.") {
    return { riskRating: 1 };
  }

  const claimKeywords = /(collision|crash|accident|scratch)/gi;
  const matches = claim.match(claimKeywords);
  const riskRating = matches ? matches.length : 0;

  if (!matches) {
    throw new Error("Invalid claim keywords: unrecognized claim keywords.");
  }

  return { riskRating: Math.min(riskRating + 1, 5) };
}
