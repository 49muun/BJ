const AllPosts = `
  query AllPosts {
    posts(orderBy: publishedAt_DESC) {
      id
      exerto
      slug
      titulo
      data
    }
  }
`

const SinglePost = `
  query SinglePost($slug: String!) {
    post(where: { slug: $slug }) {
      createdAt
      updatedAt
      publishedAt
      titulo
      slug
      data
      exerto
      conteudo {
        raw
        html
        markdown
        text
      }
      imagem {
        url
        width
        height
      }
      autor {
        ... on autor {
          remoteTypeName: __typename
          remoteId: id
          nome
          titulo
          imagem {
            url
            width
            height
          }
        }
      }
    }
  }
`

export { AllPosts, SinglePost }
