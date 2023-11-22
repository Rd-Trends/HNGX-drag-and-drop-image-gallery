/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(dataTestId: string, args?: any): Chainable<JQuery<HTMLElement>>;

    loginCustomer(): void;
  }
}
