describe('the conduit application',() => {
    it('shows some posts',()=>{
        cy.visit('/')
        cy.get('.article-preview').should('have.length',10)
        /*cy.request('https://conduit.productionready.io/api/articles?limit=10&offset=0')
		cy.writeFile('cypress/fixtures/posts.json', response.body)*/
    })

    it('shows the first post',()=>{
        cy.server()
        cy.route('GET','/api/articles*','fixture:posts.json')///api/articles*
        cy.visit('/')
        cy.get(':nth-child(1) > .article-preview').contains('test-moh')
    })

    it('should handle an empty database',()=>{
        cy.server()
        cy.route('GET','/api/articles*','fixture:no_posts.json')///api/articles*
        cy.visit('/')
        cy.contains('No articles are here...')
        
    })
})
