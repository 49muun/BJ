const query = `
query Test($navId:String!) {
  navegacao(where: {navId: $navId}) {
    id
    link {
      externalUrl
      displayText
      page {
        ... on Page {
          id
          slug
        }
      }
    }
    navId
  
  }
}
  
`

const SingleNav = query

export { SingleNav }
