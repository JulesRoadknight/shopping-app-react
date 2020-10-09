describe('Signing up', () => {
  it('Fails to sign up with existing email', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="signupButton"]')
      .click();

    cy.get('[data-testid="signupSubmit"]')
      .should('be.disabled');

    cy.request('GET', 'http://localhost:4000/users/exists/admin@example.com/0')
      .should((response) => {
        expect(response.body[0]).to.have.property('exists', true)
      })

    cy.get('[data-testid="signupEmail"]')
      .type('admin@example.com');

    cy.get('[data-testid="signupPassword"]')
      .type('nosuchpassword');

    cy.get('[data-testid="signupConfirmPassword"]')
      .type('nosuchpassword');

    cy.get('[data-testid="signupSubmit"]')
      .should('not.be.disabled')
      .click();

    cy.get('[data-testid="emailTaken"]')
      .should('be.visible');    
  })

  it('Signs up, logs in, and deletes a new account', () => {
     cy.visit('http://localhost:3000');

    cy.get('[data-testid="signupButton"]')
      .click();

    cy.get('[data-testid="signupSubmit"]')
      .should('be.disabled');

    cy.get('[data-testid="signupEmail"]')
      .type('admin@example.com');

    cy.get('[data-testid="signupPassword"]')
      .type('nosuchpassword');

    cy.get('[data-testid="signupConfirmPassword"]')
      .type('nosuchpassword');

    cy.get('[data-testid="signupSubmit"]')
      .click();

    cy.get('[data-testid="emailTaken"]')
      .should('be.visible');

    cy.get('[data-testid="signupEmail"]')
      .clear();

    cy.get('[data-testid="signupEmail"]')
      .type('test@signup.com');

    cy.get('[data-testid="signupPassword"]')
      .clear();

    cy.get('[data-testid="signupPassword"]')
      .type('testpassword');

    cy.get('[data-testid="signupConfirmPassword"]')
      .clear();
      
    cy.get('[data-testid="signupConfirmPassword"]')
      .type('testpassword');

    cy.get('[data-testid="signupSubmit"]')
      .click();

    cy.get('[data-testid="emailTaken"]')
      .should('not.be.visible');

    cy.get('[data-testid="loginButton"]')
      .click();

    cy.get('[data-testid="loginEmail"]')
      .type('test@signup.com');

    cy.get('[data-testid="loginPassword"]')
      .type('testpassword');

    cy.get('[data-testid="loginSubmit"]')
      .click();

    cy.get('[data-testid="loginButton"]')
      .should('not.be.visible');

    cy.get('[data-testid="accountButton"]')
      .click();

    cy.get('[data-testid="deleteAccountButton"]')
      .click();

    cy.get('[data-testid="cancelDeleteAccountButton"]')
      .should('be.visible');

    cy.get('[data-testid="confirmDeleteAccountButton"]')
      .click();

    cy.get('[data-testid="loginButton"]')
      .should('be.visible');

    cy.get('[data-testid="logoutButton"]')
      .should('not.be.visible');

    cy.request('GET', 'http://localhost:4000/users/exists/test@signup.com/0')
      .should((response) => {
        expect(response.body[0]).to.have.property('exists', false)
    })
  })
})