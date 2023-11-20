    Cypress.Commands.add('login',(user,pass)=>{
        cy.get('#user-name').type(user);
        cy.get('#password').type(pass);
        cy.get('#login-button').click();

    })
    Cypress.Commands.add('nonProducts',(firstName,lastName,cp)=>{
        
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').contains('Error: First Name is required')
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').contains('Error: Last Name is required')
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').contains('Error: Postal Code is required')
        cy.get('[data-test="postalCode"]').type(cp);
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').contains('Thank you for your order');
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    })

    Cypress.Commands.add('addProductsFinish',(firstName,lastName,cp)=>{
        let totalPrice = 0;

        const array_buttons = [
            "#add-to-cart-sauce-labs-backpack",
            "#add-to-cart-sauce-labs-bike-light",
            "#add-to-cart-sauce-labs-bolt-t-shirt",
            "#add-to-cart-sauce-labs-fleece-jacket",
            "#add-to-cart-sauce-labs-onesie",
            "[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']"
        ];
        array_buttons.forEach((buttonSelector, index) => {
            cy.get(buttonSelector).click();
            cy.contains(`:nth-child(${index + 1}) > .inventory_item_description > .pricebar > .inventory_item_price`, '$')
                .invoke('text')
                .then((priceText) => {
                    // Extraer el valor numérico del texto
                    const match = priceText.match(/\d+\.\d+/);
                    if (match) {
                        const numericPrice = parseFloat(match[0]);
                        totalPrice += numericPrice;
                    }
                });
        });

        cy.then(() => {
            cy.log(`Total Price: $${totalPrice.toFixed(2)}`);
            //D
            cy.get('.shopping_cart_link').click();
            cy.get('[data-test="checkout"]').click();
            cy.get('[data-test="continue"]').click();
            cy.get('.error-message-container').contains('Error: First Name is required')
            cy.get('[data-test="firstName"]').type(firstName);
            cy.get('[data-test="continue"]').click();
            cy.get('.error-message-container').contains('Error: Last Name is required')
            cy.get('[data-test="lastName"]').type(lastName);
            cy.get('[data-test="continue"]').click();
            cy.get('.error-message-container').contains('Error: Postal Code is required')
            cy.get('[data-test="postalCode"]').type(cp);
            cy.get('[data-test="continue"]').click();
            cy.get('.summary_subtotal_label').contains(totalPrice.toFixed(2))
            cy.get('.summary_tax_label')
            cy.get('[data-test="finish"]').click();
            cy.get('.complete-header').contains('Thank you for your order');
            cy.get('#react-burger-menu-btn').click();
            cy.get('#logout_sidebar_link').click();
        });

    })
