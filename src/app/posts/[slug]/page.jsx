import { SinglePost } from '../../../queries/posts'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { draftMode } from 'next/headers'
import { HygraphClient } from '../../../utils/client'


async function getData(slug) {
  const { isEnabled } = draftMode()
  const client = HygraphClient({preview: isEnabled})

  const variables = { slug: slug }


  const { post } = await client.request(SinglePost, variables)  
  return post
}

export async function generateMetadata({ params }) {

  const post = await getData(params.slug)
  if (!post) return notFound()
  return {
    titulo: post.titulo,
    descricao: post.descricao || post.seoOverride?.descricao,
    openGraph: {
      imagem: [
        {
          url: post.imagem?.url,
          width: post.imagem?.width,
          height: post.imagem?.height
        }
      ]
    }
  }
}

export default async function Post({ params }) {

  const post = await getData(params.slug)
 
  if (!post) {
    return notFound()
  }
  return (
    <article>
      <header className="pt-6 lg:pb-10">
        <div className="space-y-1">
          <div>
            <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.titulo}
            </h1>
          </div>
        </div>
      </header>
      <div
        className="divide-y lg:divide-y-0 divide-gray-200 lg:grid lg:grid-cols-[200px_1fr] gap-x-6 pb-16 lg:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <dl className="pt-6 pb-10 lg:pt-0 lg:border-b lg:border-gray-200">
         { post.autor && (<>
          <dt className="mb-2 text-sm font-medium leading-5">Escrito por</dt>
          <dd>
            <ul className="space-x-8 sm:space-x-12 lg:space-x-0 lg:space-y-8">
              <li key={post.autor?.remoteId} className="flex space-x-2">
                { post.autor?.picture && (
                <Image
                  className="w-10 h-10 rounded-full"
                  src={post.autor?.imagem.url}
                  width={post.autor?.imagem.width}
                  height={post.autor?.imagem.height}
                  alt={post.autor?.nome}
                /> ) }
                <dl className="flex-1 text-sm font-medium leading-5">
                  <dt className="sr-only">Name</dt>
                  <dd className="text-gray-900">{post.autor?.nome}</dd>
                  {post.autor?.titulo && (
                    <>
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-500">{post.autor?.titulo}</dd>
                    </>
                  )}
                </dl>
              </li>
            </ul>
          </dd>
          </>)}
          <div className="mt-8">
            <dt className="text-sm font-medium leading-5">Publicado em</dt>
            <dd className="text-base leading-6 font-medium text-gray-500">
              <time dateTime={post.data}>
                {new Date(post.data).toLocaleDateString('pt-PT', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </dd>
          </div>
        </dl>
        <div className="prose lg:pb-0 lg:row-span-2">
          <RichText content={post.conteudo.raw} />
          <Image src={post.imagem.url} width={post.imagem.width} height={post.imagem.height} alt={post.titulo} />
        </div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 lg:col-start-1 lg:row-start-2">
          <div className="pt-8">
            <Link href="/" className="text-purple-500 hover:text-purple-600">
              &larr; De volta ao Inicio
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
