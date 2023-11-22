/// <reference types="../global.d.ts" />

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("loginCustomer", () => {
  cy.visit("/login");
  cy.getByTestId("login-email").type(Cypress.env("TEST_USER_EMAIL"));
  cy.getByTestId("login-password").type(Cypress.env("TEST_USER_PASSWORD"));
  cy.getByTestId("login-submit").click();
});

import "@testing-library/cypress/add-commands";
