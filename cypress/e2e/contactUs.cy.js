/// <reference types = "cypress" />

describe('Contact Us - Form Submission', () => {

  beforeEach(() => {
      cy.visit('/contact-us/')
  });

  it('Check form submission successfully and redirection to thank you page', () => {
      cy.fixture('formData').then((data) => {
          cy.get('#form-field-message').type(data.name) // full name
          cy.get('#form-field-field_ee5245b').type(data.email) // email address
          cy.get('#form-field-field_a1fdf22').type(data.business) // business name

          // click all checkbox
          for (let n = 0; n < 10; n++) { 
              cy.get('span.elementor-field-option').eq(n)
                .click('left')
          }

          cy.get('#form-field-field_607aea3').type(data.comment) // comment
          cy.get('button[type="submit"]').click() // Submit btn

          //check form submission is successfull
          cy.url().should('contain', 'contact-us/?submitted=1')
          cy.get('div.elementor-widget-container').find('p')
            .should('contain', "Nice! We’ll be in touch soon.")
      })
  });
});