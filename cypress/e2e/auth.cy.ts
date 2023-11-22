describe("auth flow", () => {
  it("should redirect unauthenticated users to login", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/login");
  });

  it("should redirect user to home after login", () => {
    cy.visit("/login");
    cy.loginCustomer();
    cy.location("pathname").should("equal", "/");
  });
});
