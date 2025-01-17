import { Navbar } from 'components/global/Navbar'
import HomePost from 'components/pages/homepost/HomePost'
import HomePostPreview from 'components/pages/homepost/HomePostPreview'
import { getPosts, getPostsPaths } from 'lib/sanity.fetch'
import { homePostsQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import LiveQuery from 'next-sanity/preview/live-query'
import { Suspense } from 'react'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getPostsPaths()
  return slugs.map((slug) => ({ slug }))
}

export default async function PostsRoute({ params }: Props) {
  const data = await getPosts()
  if (!data && !draftMode().isEnabled) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepost document yet,{' '}
        <Link
          href="/studio/desk/home%7C%2Cview%3Dpreview"
          className="underline"
        >
          create one now
        </Link>
      </div>
    )
  }

  return (
    <>
      <LiveQuery
        enabled={draftMode().isEnabled}
        // enabled={false}
        query={homePostsQuery}
        initialData={data}
        as={HomePostPreview}
      >
        <HomePost data={data} />
      </LiveQuery>
    </>
  )
}
