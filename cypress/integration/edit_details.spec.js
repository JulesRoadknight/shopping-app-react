describe('Editing User Details', () => {
  it('Signs up', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="signupButton"]')
      .click();

    cy.get('[data-testid="signupEmail"]')
      .type('test@editdetails.com');

    cy.get('[data-testid="signupPassword"]')
      .type('testedit');
      
    cy.get('[data-testid="signupConfirmPassword"]')
      .type('testedit');

    cy.get('[data-testid="signupSubmit"]')
      .click();
  })

  it('Logs in', () => {
    cy.get('[data-testid="loginButton"]')
      .click();

    cy.get('[data-testid="loginEmail"]')
      .type('test@editdetails.com');

    cy.get('[data-testid="loginPassword"]')
      .type('testedit');

    cy.get('[data-testid="loginSubmit"]')
      .click();
  })

  it('Displays the edit fields', () => {
    cy.get('[data-testid="accountButton"]')
      .click();

    cy.get('[data-testid="editUserDetailsButton"]')
      .click();

    cy.get('[data-testid="user_email"]')
      .should('not.be.visible');

    cy.get('[data-testid="edit_email"]')
      .should('be.visible');

    cy.get('[data-testid="edit_email"]')
      .should('be.visible')
      .should('have.value', 'test@editdetails.com');
  })

  it('Edits user email', () => {
    cy.get('[data-testid="edit_email"]')
      .clear();

    cy.get('[data-testid="edit_email"]')
      .type('edited@useremail.com');

    cy.get('[data-testid="confirmChangesButton"]')
      .click();

    cy.get('[data-testid="edit_email"]')
      .should('not.be.visible');

    cy.get('[data-testid="user_email"]')
      .should('be.visible');

    cy.contains('edited@useremail.com')
      .should('be.visible');
  })
  
  it('Logs in with updated email', () => {
    cy.get('[data-testid="logoutButton"]')
      .click();

    cy.get('[data-testid="loginButton"]')
      .click();

    cy.get('[data-testid="loginEmail"]')
      .type('edited@useremail.com');

    cy.get('[data-testid="loginPassword"]')
      .type('testedit');

    cy.get('[data-testid="loginSubmit"]')
      .click();

    cy.get('[data-testid="accountButton"]')
      .click();

    cy.get('[data-testid="user_email"]')
      .should('be.visible');

    cy.contains('edited@useremail.com')
      .should('be.visible');
  })

  it('Deletes the account', () => {
    cy.get('[data-testid="deleteAccountButton"]')
      .click();

    cy.get('[data-testid="cancelDeleteAccountButton"]')
      .should('be.visible');

    cy.get('[data-testid="confirmDeleteAccountButton"]')
      .click();

    cy.get('[data-testid="loginSubmit"]')
      .should('be.visible');
  })
})