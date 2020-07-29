describe('Logging in', () => {
  it('Fails to login with false credentials', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="loginButton"]')
      .click();

    cy.get('[data-testid="loginSubmit"]')
      .should('be.disabled');

    cy.get('[data-testid="loginEmail"]')
      .type('nosuch@email.com');

    cy.get('[data-testid="loginPassword"]')
      .type('nosuchpassword');

    cy.get('[data-testid="loginSubmit"]')
      .should('not.be.disabled');
    
    cy.get('[data-testid="loginSubmit"]')
      .click();

    cy.get('[data-testid="logoutButton"]')
      .should('not.be.visible');
  })

  it('Logs in and out with correct credentials', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="loginButton"]')
      .click();

    cy.get('[data-testid="loginEmail"]')
      .type('admin@example.com');

    cy.get('[data-testid="loginPassword"]')
      .type('Passw0rd!');
    
    cy.get('[data-testid="loginSubmit"]')
      .click();

    cy.get('[data-testid="loginButton"]')
      .should('not.be.visible');

    cy.get('[data-testid="logoutButton"]')
      .click();

    cy.get('[data-testid="logoutButton"]')
      .should('not.be.visible');

    cy.get('[data-testid="loginButton"]')
      .should('be.visible');
  })
})