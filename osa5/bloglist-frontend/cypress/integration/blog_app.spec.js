describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Joulupukki Valkoparta',
        username: 'santaklasu',
        password: 'tuhmeliini'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('log in').click()
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
      cy.contains('cancel')
    })
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('log in').click()
        cy.get("#username").type('santaklasu')
        cy.get("#password").type('tuhmeliini')        
        cy.get("#loginbutton").click()
        cy.contains('Joulupukki Valkoparta logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('log in').click()
        cy.get("#username").type('nuuttipukki')
        cy.get("#password").type('tuhmeliini')        
        cy.get("#loginbutton").click()
        cy.get('.note').contains('wrong credentials')
      })
    })
  })