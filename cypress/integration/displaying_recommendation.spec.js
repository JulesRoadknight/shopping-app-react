describe('Displaying the recommendation', () => {
  it('Shows the default recommended item', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="recommendedItem"]').contains('A Free Sample - £10.00');
  })
})