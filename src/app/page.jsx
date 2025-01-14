import { AllPosts } from '../queries/posts';
import Link from 'next/link';
import { HygraphClient } from '../utils/client';

async function getPosts() {
  const client = HygraphClient();
  try {
    const allPosts = await client.request(AllPosts);
    console.log(allPosts);
    return allPosts.posts;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error details:', error);
    throw new Error('Failed to fetch posts');
  }
}

export const metadata = {
  title: 'Blog Boa Nova',
};

export default async function Home({}) {
  try {
    const allPosts = await getPosts();
    return (
      <div className="divide-y divide-gray-200">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog Boa Nova
          </h1>
          <p className="text-lg leading-7 text-gray-500">
            As Publicações mais recentes
          </p>
        </div>

        <ul className="divide-y divide-gray-200">
          {allPosts.map((post) => {
            return (
              <li key={post.id} className="py-12">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500">
                      <time dateTime={post.data}>
                        {new Date(post.data).toLocaleDateString('pt-PT')}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link href={`/posts/${post.slug}`}>
                          {post.titulo}
                        </Link>
                      </h2>
                      <p className="prose max-w-none text-gray-500">
                        {post.exerto}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return <div>Failed to load posts.</div>;
  }
}