//test

it('Visit Page and Login', () => {
    cy.clearLocalStorage();
    cy.visit('https://www.saucedemo.com');
    cy.login(userOk, pass);
    
});
