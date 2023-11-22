describe("auth flow", () => {
  it("should redirect unauthenticated users to login", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/login");
  });

  it("should redirect user to home after login", () => {
    cy.visit("/login");
    cy.getByTestId("login-email").type(Cypress.env("TEST_USER_EMAIL"));
    cy.getByTestId("login-password").type(Cypress.env("TEST_USER_PASSWORD"));
    cy.getByTestId("login-submit").click();
    cy.location("pathname").should("equal", "/");
  });
});
