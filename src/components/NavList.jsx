import Link from 'next/link'
import { SingleNav } from '@/queries/navigations'

/**
 * Fetches navigation links from Hygraph for a given navigation ID.
 *
 * This function sends a GraphQL query to the Hygraph endpoint to retrieve
 * navigation links associated with the specified navId.
 *
 * @param {string} navId - The ID of the navigation to retrieve links for.
 * @returns {Promise<Array>} A promise that resolves to an array of navigation links.
 * @throws Will throw an error if the fetch request encounters any errors.
 */
async function getNav(navId) {
  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SingleNav,
      variables: { navId: navId }
    })
  }).then((res) => 
  res.json())
  if (res.errors) {
    console.error(res.errors)
    throw new Error(res.errors[0].message)
  }
  console.log(res.data.navigation.link)
  return res.data.navigation.link
}

/**
 * A Next.js component that renders a list of links from a navigation.
 *
 * This component expects a single prop, `navId`, which is the ID of the navigation to
 * retrieve from Hygraph.
 *
 * @param {Object} props
 * @prop {string} navId - The ID of the navigation to retrieve from Hygraph
 */
export default async function NavList({ navId }) {
  const navItems = await getNav(navId)
  return (
    <>
      {navItems.map((navItem) => {
        const url = navItem?.externalUrl ? navItem.externalUrl : `/${navItem.page.slug}`
        return (
          <li key={navItem.id}>
            <Link href={`${url}`}>{navItem.displayText}</Link>
          </li>
        )
      })}
    </>
  )
}
