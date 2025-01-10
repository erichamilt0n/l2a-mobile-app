/// <reference types="cypress" />

describe("Authentication Flow", () => {
  beforeEach(() => {
    // Reset any test state
    cy.visit("/");
  });

  // This test might be redundant since we check these elements in the login test
  it("should show login form", () => {
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="login-button"]').should("be.visible");
  });

  // Let's combine validation tests for efficiency
  it("should handle form validation", () => {
    // Test empty submission
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-error"]').should("be.visible");
    cy.get('[data-testid="password-error"]').should("be.visible");

    // Test invalid email
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-error"]').should("be.visible");

    // Test password requirements
    cy.get('[data-testid="email-input"]').clear().type("test@example.com");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="password-error"]').should("be.visible");
  });

  it("should login successfully", () => {
    cy.fixture("users").then((users) => {
      const { email, password } = users.testUser;
      cy.login(email, password);
      cy.url().should("include", "/dashboard");
    });
  });

  it("should logout successfully", () => {
    // Login first
    cy.fixture("users").then((users) => {
      const { email, password } = users.testUser;
      cy.login(email, password);
    });

    // Then test logout
    cy.logout();
    cy.url().should("include", "/login");
  });
});
