describe('SauceDemo', { testIsolation: false }, () => {
    const userOk = 'standard_user';
    const pass = 'secret_sauce';
    const userProblem= 'problem_user';
    const wrongFirstName = '123!$%';
    const wrongLastName = '123!$%';
    const wrongCp = '123!$%';
  
    it('Visit Page and Login', () => {
        cy.clearLocalStorage();
        cy.visit('https://www.saucedemo.com');
        cy.login(userOk, pass);
        
    });

    it('Steps with standar_user',()=>{
        cy.nonProducts(wrongFirstName,wrongLastName,wrongCp);
        cy.login(userOk, pass);
        cy.addProductsFinish(wrongFirstName,wrongLastName,wrongCp);
        
        
    });

    it('Steps with problem_user',()=>{
        cy.login(userProblem,pass);
        cy.addProductsFinish(wrongFirstName,wrongLastName,wrongCp);
    });
});
