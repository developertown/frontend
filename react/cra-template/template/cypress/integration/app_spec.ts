/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe("App", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.findByText("Learn React");
  });
});
