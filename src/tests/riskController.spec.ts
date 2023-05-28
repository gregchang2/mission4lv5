import { createRequest, createResponse } from "node-mocks-http";
import {
  getAllClaims,
  getOneClaim,
  deleteClaim,
  updateClaim,
  updateClaimPartial,
} from "../controller/riskratingController";

describe("getAllClaims", () => {
  test("should send all claims via res", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
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
    getAllClaims(req, res);

    // Assert
    expect(res.json()._getData()).toEqual(expected);
  });
});

describe("getOneClaim", () => {
  test("should return a claim by ID", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const expected = {
      id: 1,
      claim: "there has been no accidents in the past 3 years",
      riskRating: 1,
    };

    req.params = { id: "1" };

    // Act
    getOneClaim(req, res);

    // Assert
    expect(res.json()._getData()).toEqual(expected);
  });

  test("should return 404 if claim ID does not exist", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();

    req.params = { id: "999" };

    // Act
    getOneClaim(req, res);

    // Assert
    expect(res.statusCode).toBe(404);
  });
});

describe("deleteClaim", () => {
  test("should delete a claim by ID and return 204 status code", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToDelete = 1;

    req.params = { id: claimIdToDelete.toString() };

    // Act
    deleteClaim(req, res);

    // Assert
    expect(res.statusCode).toBe(204);
  });

  test("should return 404 if claim ID to delete does not exist", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToDelete = 999;

    req.params = { id: claimIdToDelete.toString() };

    // Act
    deleteClaim(req, res);

    // Assert
    expect(res.statusCode).toBe(404);
  });
});

describe("updateClaim", () => {
  test("should update a claim by ID and return the updated claim in the response", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToUpdate = 2;
    const updatedClaim = {
      claim: "i had a collision with a car and several scratches",
      riskRating: 3,
    };

    req.params = { id: claimIdToUpdate.toString() };
    req.body = {
      claim: updatedClaim.claim,
      riskRating: updatedClaim.riskRating,
    };

    // Act
    updateClaim(req, res);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.json()._getData()).toEqual(
      expect.objectContaining(updatedClaim)
    );
  });

  test("should return 404 if claim ID to update does not exist", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToUpdate = 10;
    const updatedClaim = {
      claim: "Updated claim",
      riskRating: 3,
    };

    req.params = { id: claimIdToUpdate.toString() };
    req.body = {
      claim: updatedClaim.claim,
      riskRating: updatedClaim.riskRating,
    };

    // Act
    updateClaim(req, res);

    // Assert
    expect(res.statusCode).toBe(404);
  });
});

describe("updateClaimPartial", () => {
  test("should update a claim partially by ID and return the updated claim in the response", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToUpdate = 2;
    const updatedClaimPartial = {
      claim: "help car scratch",
    };

    req.params = { id: claimIdToUpdate.toString() };
    req.body = { claim: updatedClaimPartial.claim };

    // Act
    updateClaimPartial(req, res);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.json()._getData()).toEqual(
      expect.objectContaining(updatedClaimPartial)
    );
  });

  test("should return 404 if claim ID to update partially does not exist", () => {
    // Arrange
    const req = createRequest();
    const res = createResponse();
    const claimIdToUpdate = 10;
    const updatedClaimPartial = {
      claim: "Updated claim",
    };

    req.params = { id: claimIdToUpdate.toString() };
    req.body = { claim: updatedClaimPartial.claim };

    // Act
    updateClaimPartial(req, res);

    // Assert
    expect(res.statusCode).toBe(404);
  });
});
