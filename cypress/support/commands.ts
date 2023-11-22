/// <reference types="../global.d.ts" />

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("loginCustomer", () => {
  const cokieName = `sb-${Cypress.env("TEST_SUPABASE_PROJECT_ID")}-auth-token`;
  const email = Cypress.env(`TEST_USER_EMAIL`);
  const password = Cypress.env(`TEST_USER_PASSWORD`);
  cy.task("getUserSession", {
    email,
    password,
    // @ts-ignore
  }).then(({ session }) => {
    cy.setCookie(cokieName, JSON.stringify(session));
    cy.visit("/");
  });

  // cy.fetchProfile(Cypress.env(`TEST_USER_EMAIL`));
});

import "@testing-library/cypress/add-commands";
