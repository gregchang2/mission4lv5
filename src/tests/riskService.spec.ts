import {
  getAllClaims,
  getOneClaim,
  createOneClaim,
  deleteClaim,
  updateClaim,
  updateClaimPartial,
} from "../services/riskService";

describe("getAllClaims", () => {
  test("should return a default claim", () => {
    // Arrange
    const expected = [
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

    // Act
    const actual = getAllClaims();

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("createClaim", () => {
  test("should create a claim", () => {
    const claimKeywords = /(collision|crash|accident|scratch)/gi;
    //Arrange
    const input = {
      claim:
        "I had a collision with another car last year, but no other incidents",
    };
    const matches = input.claim.match(claimKeywords);
    const rating = matches ? matches.length : 0;
    const expected = {
      id: 3,
      claim:
        "I had a collision with another car last year, but no other incidents",
      riskRating: rating + 1,
    };

    //Act
    const actual = createOneClaim(input.claim);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("createOneClaim", () => {
  test("should throw an error when claim is empty", () => {
    // Arrange
    const input = "";

    // Act
    const createClaim = () => createOneClaim(input);

    // Assert
    expect(createClaim).toThrow("Claim cannot be empty.");
  });
});

describe("getOneClaim", () => {
  test("should throw an error when claim is not found", () => {
    // Arrange
    const claimId = 10;

    // Act
    const getClaim = () => getOneClaim(claimId);

    // Assert
    expect(getClaim).toThrow("Claim not found");
  });
});

describe("getOneTask", () => {
  test("should return a claim by Id", () => {
    //Arrange
    const input = 2;
    const expected = {
      id: 2,
      claim: "i have crashed into a lampost and have several scratches",
      riskRating: 3,
    };
    //Act
    const actual = getOneClaim(input);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("deleteClaim", () => {
  test("should delete a claim", () => {
    // Arrange
    const claimId = 2;

    // Act
    const result = deleteClaim(claimId);

    // Assert
    expect(result).toBe(true);
    expect(getAllClaims()).toHaveLength(2);
  });

  test("should throw an error when claim to delete is not found", () => {
    // Arrange
    const claimId = 10;

    // Act
    const deleteClaimFn = () => deleteClaim(claimId);

    // Assert
    expect(deleteClaimFn).toThrow("Claim not found");
  });
});

describe("updateClaim", () => {
  test("should update a claim", () => {
    // Arrange
    const claimId = 1;
    const updatedClaim = {
      id: claimId,
      claim: "I crashed into a lampost and have some scratches",
      riskRating: 4,
    };
    const expected = updatedClaim;

    // Act
    const actual = updateClaim(updatedClaim);

    // Assert
    expect(actual).toEqual(expected);
    expect(getOneClaim(claimId)).toEqual(expected);
  });

  test("should throw an error when claim to update is not found", () => {
    // Arrange
    const claimId = 10;
    const updatedClaim = {
      id: claimId,
      claim: "I crashed into a tree",
      riskRating: 5,
    };

    // Act
    const updateClaimFn = () => updateClaim(updatedClaim);

    // Assert
    expect(updateClaimFn).toThrow("Claim not found");
  });
});

describe("updateClaimPartial", () => {
  test("should update a claim partially", () => {
    // Arrange
    const claimId = 1;
    const updatedClaim = {
      id: claimId,
      claim: "I crashed into a lampost and have some scratches",
      riskRating: 3,
    };
    const expected = {
      id: claimId,
      claim: updatedClaim.claim,
      riskRating: 3,
    };

    // Act
    const actual = updateClaimPartial(updatedClaim);

    // Assert
    expect(actual).toEqual(expected);
    expect(getOneClaim(claimId)).toEqual(expected);
  });

  test("should throw an error when claim to update partially is not found", () => {
    // Arrange
    const claimId = 10;
    const updatedClaim = {
      id: claimId,
      claim: "I crashed into a tree",
      riskRating: 3,
    };

    // Act
    const updateClaimPartialFn = () => updateClaimPartial(updatedClaim);

    // Assert
    expect(updateClaimPartialFn).toThrow("Claim not found");
  });
});
