import { SinglePage } from '@/queries/pages'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { HygraphClient } from '@/utils/client'

/**
 * Retrieves a page from Hygraph based on the given slug.
 *
 * This function checks if `draftMode` is enabled and accordingly sets the
 * `preview` option when creating a new instance of `HygraphClient`. It then
 * uses the client to request the page data from Hygraph and returns the
 * page.
 *
 * @param {string} slug - The slug of the page to retrieve.
 * @returns {Object} The page data from Hygraph.
 */
async function getPage(slug) {
  const { isEnabled } = draftMode()

  const client = HygraphClient({preview: isEnabled})
  
  const variables = { slug: slug }

  const { page } = await client.request(SinglePage, variables)
  return page
}

/**
 * Generates metadata for a page based on the given slug.
 *
 * This function retrieves the page data using the `getPage` function, and if
 * the page is found, it generates metadata based on the page's SEO override
 * and cover image.
 *
 * @param {Object} context - The context object containing the slug of the page.
 * @returns {Object} The generated metadata object.
 */
export async function generateMetadata({ params }) {
  const page = await getPage(params.slug)
  if (!page) return notFound()

  return {
    title: page?.seoOverride?.title || page.title,
    description: page.seo?.description || page.description,
    openGraph: {
      images: [
        {
          url: page?.seoOverride?.image?.url || page.coverImage?.url,
          width: page?.seoOverride?.image?.width || page.coverImage?.width,
          height: page?.seoOverride?.image?.height || page.coverImage?.height
        }
      ]
    }
  }
}

/**
 * A Next.js component that fetches and renders a page based on the given slug.
 *
 * This component retrieves the page data using the `getPage` function, and if
 * the page is found, it renders the page's title, subtitle, and content.
 * If the page is not found, it invokes the `notFound` function.
 *
 * @param {{ params: { slug: string }}} props
 * @returns {JSX.Element} The rendered page component or a not found response.
 */
export default async function Page({ params }) {
  const page = await getPage(params.slug)
  if (!page) {
    return notFound()
  }
  return (
    <div className="divide-y divide-gray-200">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-lg leading-7 text-gray-500">{page.subtitle}</p>
        )}
      </div>
      <div className="pb-16 lg:pb-20">
        <div className="prose max-w-none pt-10 pb-8">
          <RichText content={page.content.raw} />
        </div>
      </div>
    </div>
  )
}
