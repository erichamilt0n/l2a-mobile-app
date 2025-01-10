/// <reference types="cypress" />

describe("Basic Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show welcome message", () => {
    cy.contains("Welcome Back").should("be.visible");
  });

  it("should navigate to settings when authenticated", () => {
    // Login first
    cy.fixture("users").then((users) => {
      const { email, password } = users.testUser;
      cy.login(email, password);
    });

    // Test navigation
    cy.get('[data-testid="settings-link"]').click();
    cy.url().should("include", "/settings");
  });
});
