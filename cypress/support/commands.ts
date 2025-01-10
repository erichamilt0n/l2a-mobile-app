/// <reference types="cypress" />

// Type definitions
type LoginCommand = (email: string, password: string) => void;
type LogoutCommand = () => void;

/* eslint-disable @typescript-eslint/no-namespace */
// Namespace is required for Cypress type augmentation
// See: https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with email and password
       * @param email - The user's email
       * @param password - The user's password
       * @example cy.login('test@example.com', 'password123')
       */
      login: LoginCommand;

      /**
       * Custom command to logout the current user
       * @example cy.logout()
       */
      logout: LogoutCommand;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

/**
 * Implementation of the login command
 * @param email - The user's email
 * @param password - The user's password
 */
const login: LoginCommand = (email, password) => {
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
};

/**
 * Implementation of the logout command
 */
const logout: LogoutCommand = () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
};

// Add commands to cy namespace
cy.login = login;
cy.logout = logout;

export {};
