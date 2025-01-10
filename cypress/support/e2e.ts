/// <reference types="cypress" />
/// <reference types="jquery" />
/// <reference lib="dom" />

// We need to use namespace for Cypress type augmentation
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
// DeepSource warnings are disabled because this is a required pattern for Cypress
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  namespace Cypress {
    interface Chainable<TSubject = Element> {
      /**
       * Custom command to visit a page
       * @example cy.visit('/')
       */
      visit(url: string): Chainable<Window & typeof globalThis>;

      /**
       * Custom command to get an element
       * @example cy.get('[data-testid="example"]')
       */
      get<K extends keyof HTMLElementTagNameMap>(
        selector: string
      ): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

      /**
       * Custom command to find content
       * @example cy.contains('Submit')
       */
      contains(
        content: string | number | RegExp
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get current URL
       * @example cy.url()
       */
      url(): Chainable<string>;
    }
  }
}

export {};
