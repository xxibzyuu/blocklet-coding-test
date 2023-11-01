describe('Example Test', () => {
  it('Performs search and pagination', () => {
    cy.visit('./index.vue') 

    // 输入框测试
    cy.get('input[type="text"]').type('Search keyword') 

    // 概要信息测试
    cy.get('.detail-list').should('contain', 'Summary information') 

    // 分页查询测试
    cy.get('.pagination').should('exist')

    // 验证分页结果
    cy.get('.transac-list').should('paginatedData.length', 10) 

  })
})