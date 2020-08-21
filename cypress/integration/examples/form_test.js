describe('order app', () => {
    it('can navigate to the page', () => {
        cy.visit('http://localhost:3001/pizza')
        cy.url().should('include', 'localhost')
    })

    it('can select toppings', () => {
        cy.get('input[name="pepperoni"]')
        .check()
        cy.get('input[name="cheese"]')
        .check()
    })

    it('can submit form data', () => {
        cy.get('form')
        .submit()

    })
})