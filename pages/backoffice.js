const backoffice = {

    loginDesktop(email, password, expectSuccess = true) {
        cy.intercept('https://login.katanamrp.com/co/authenticate').as('authentication')
        cy.get(this.nav_signIn).click()
        cy.get(this.login_email).type(email)
        cy.get(this.login_password).type(password)
        cy.get(this.login_signInButton).click()
        if (expectSuccess) {
            cy.wait('@authentication').its('response.statusCode').should('eq', 200)
        } else {
            cy.wait('@authentication').its('response.statusCode').should('eq', 401)
        }
    },

    deleteCustomer(name) {
        cy.intercept('https://customers.katanamrp.com/api/customers/bulkDelete').as('deleteCustomer')
        cy.get(this.table_name).contains(this.table_name, name).parent(this.tableRow).find(this.table_checkbox).click()
        cy.contains('Bulk actions').click()
        cy.contains('Delete').click()
        cy.wait('@deleteCustomer').its('response.statusCode').should('eq', 204)
    },

    //Common
    globalAdd: '#globalAdd',
    globalAdd_customer: '#add-customer',
    label: '.katana-label',
    tableRow: '[role="row"]',

    //Navigation
    nav_signIn: '.header__auth a.button--regular',
    nav_bo_contacts: '#contactsTab',

    //Login page
    login_email: '.auth0-lock-input-email input',
    login_password: '.auth0-lock-input-show-password input',
    login_signInButton: 'button.auth0-lock-submit',

    //Customer
    customer_firstName: '[data-testid="inputCustomerFirstName"] input',
    customer_lastName: '[data-testid="inputCustomerLastName"] input',
    customer_displayName: '[data-testid="inputCustomerDisplayName"] input',
    customer_email: '[data-testid="inputCustomerEmail"] input',
    table_checkbox: '[col-id="checkbox"] input',
    table_name: '[col-id="name"]',
    table_email: '[col-id="email"]',

}

export default {...backoffice}