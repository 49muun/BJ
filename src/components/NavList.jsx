import Link from 'next/link';
import { gql, GraphQLClient } from 'graphql-request';

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const GET_NAV = gql`
  query GetNavigation($navId: ID!) {
    navegacao(where: { id: $navId }) {
      link
    }
  }
`;

async function getNav(navId) {
  try {
    const data = await client.request(GET_NAV, { navId });
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0].message);
    }
    if (!data.navegacao) {
      throw new Error('No navigation data found');
    }
    console.log('Fetched navigation:', data.navegacao.link);
    return data.navegacao.link;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error details:', error);
    throw new Error('Failed to fetch navigation');
  }
}

export default async function NavList({ navId }) {
  try {
    console.log('Fetching navigation with navId:', navId);
    const navLinks = await getNav(navId);
    console.log('Fetched navigation links:', navLinks);
    return (
      <nav>
        {navLinks.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.label}
          </Link>
        ))}
      </nav>
    );
  } catch (error) {
    console.error('Error in NavList component:', error);
    return <div>Failed to load navigation links.</div>;
  }
}