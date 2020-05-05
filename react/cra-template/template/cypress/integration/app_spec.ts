describe("App", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains("Learn React");
  });
});
