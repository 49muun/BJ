const AllPages = `
  query AllPages {
    pages {
      id
      slug
      titulo
    }
  }
`

const SinglePage = `
  query SinglePage($slug: String!) {
    page(where: { slug: $slug }) {
      titulo
      seoOverride {
        titulo
        imagem {
          height
          width
          url
        }
        descricao
      }
      conteudo {
        html
        raw
      }
    }
  }
`

export { AllPages, SinglePage }
