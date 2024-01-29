/// <reference types = "cypress" />

describe('Contact Us - Form Submission Test', () => {

  beforeEach(() => {
    cy.visit('/contact-us/', {
      auth: {
        username: 'dev500designs',
        password: '500designs',
      },
    })
  })

  it('1. Check form submission successfully and redirection to thank you page.', () => {
      cy.wait(5000)
      cy.fixture('formData').then((data) => {
        cy.get('#form-field-message').type(data.name) // full name
        cy.get('#form-field-field_ee5245b').type(data.email) // email address
        cy.get('#form-field-field_a1fdf22').type(data.business) // business name
        cy.get('#form-field-field_607aea3').type(data.comment) // comment
      })

      // click all checkbox
      for (let n = 0; n < 10; n++) { 
        cy.get('span.elementor-field-option').eq(n)
        .click('left')
      }
    
      //check form submission is successfull
      cy.clickBtn('Submit')
      cy.url().should('contain', 'submitted')
      cy.get('div.elementor-widget-container').find('p')
        .should('contain', "Nice! We’ll be in touch soon.")
  });


  it('2. Check that form should not submit if required fields are blank and shows error messages.', () => {
      cy.wait(5000)
      cy.clickBtn('Submit')
      cy.get('input:invalid').should('have.length', 3) // Validate that 3 fields are set as require
      cy.get('#form-field-message').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })

      cy.get('#form-field-message').type('John Doe') 
      cy.clickBtn('Submit')
      cy.get('#form-field-field_ee5245b').then(($input) => { // blank email
        expect($input[0].validationMessage).to.eq('Please enter a complete email address.')
      })
      
      cy.get('#form-field-field_ee5245b').type('test+1@500designs.com')
      cy.clickBtn('Submit')
      cy.get('#form-field-field_a1fdf22').then(($input) => { // blank business name
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })

      cy.get('#form-field-field_a1fdf22').type('500 Designs')
      cy.clickBtn('Submit')
      cy.get('span.elementor-checkbox-error').should('be.visible') // no selection

  });

});