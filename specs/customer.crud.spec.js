import backoffice from '../pages/backoffice'

describe('Customer add', () => {

    let name = data.generate.string()
    let email = data.generate.email()

    it('should login to backoffice', function () {
        cy.visit('/')
        backoffice.loginDesktop(data.customerEmail, data.customerPassword)
    })

    it('should create a customer', function () {
        cy.get(backoffice.nav_bo_contacts).click()
        cy.get(backoffice.globalAdd).click()
        cy.get(backoffice.globalAdd_customer).click()
        cy.get(backoffice.customer_email).type(email)
        cy.get(backoffice.customer_firstName).type(name)
        cy.get(backoffice.label).click().should('contain.text', 'All changes saved')
    })

    it('should assert created customer', function () {
        cy.get(backoffice.nav_bo_contacts).click()
        cy.get(backoffice.table_name).should("contain.text", name)
        cy.get(backoffice.table_email).should("contain.text", email)
    })

    it('should delete customer', function () {
        backoffice.deleteCustomer(name)
        cy.get(backoffice.table_name).should('not.contain.text', name)
    })

})


