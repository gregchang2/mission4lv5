import { ClaimRisk } from "../types/riskrating";

let claims = [
  {
    id: 1,
    claim: "there has been no accidents in the past 3 years",
    riskRating: 1,
  },
  {
    id: 2,
    claim: "i have crashed into a lampost and have several scratches",
    riskRating: 3,
  },
];

export const getAllClaims = () => {
  return claims;
};

export const createOneClaim = (claim: string) => {
  const claimKeywords = /(collision|crash|accident|scratch)/gi;

  if (!claim) {
    throw new Error("Claim cannot be empty.");
  }

  const matches = claim.match(claimKeywords);
  const rating = matches ? matches.length : 0;

  const newClaim = {
    id: claims.length + 1,
    claim,
    riskRating: rating + 1,
  };

  claims.push(newClaim);

  return newClaim;
};

export const getOneClaim = (claimId: number) => {
  const matchedClaim = claims.find((c) => c.id === claimId);

  if (!matchedClaim) {
    throw new Error("Claim not found");
  }

  return matchedClaim;
};

export const deleteClaim = (claimId: number) => {
  const matchedClaim = claims.find((c) => c.id === claimId);

  if (!matchedClaim) {
    throw new Error("Claim not found");
  }

  claims = claims.filter((c) => c.id !== claimId);
  return true;
};

export const updateClaim = (history: ClaimRisk) => {
  const matchedClaim = claims.find((c) => c.id === history.id);

  if (!matchedClaim) {
    throw new Error("Claim not found");
  }

  matchedClaim.claim = history.claim;
  matchedClaim.riskRating = history.riskRating;

  return matchedClaim;
};

export const updateClaimPartial = (history: ClaimRisk) => {
  const matchedClaim = claims.find((c) => c.id === history.id);

  if (!matchedClaim) {
    throw new Error("Claim not found");
  }

  matchedClaim.claim = history.claim ?? matchedClaim.claim;
  matchedClaim.riskRating = history.riskRating ?? matchedClaim.riskRating;

  return matchedClaim;
};
