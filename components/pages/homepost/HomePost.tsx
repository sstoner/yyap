import { Header } from 'components/shared/Header'
import { getPosts } from 'lib/sanity.fetch'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import post from 'schemas/documents/post'
import { HomePostPayload } from 'types'

import { ProjectListItem } from '../home/ProjectListItem'
import { PostListItem } from './PostslistItem'

export interface HomePostProps {
  data: HomePostPayload | null
}

export async function HomePost({ data }: HomePostProps) {
  const posts = convertDataToHomePostPayload(data).posts

  return (
    <div className="mt-20">
      {/* Header */}
      {/* {"title" && <Header centered title={"title"} description={""} />} */}
      {/* Showcase posts */}
      {posts && posts.length > 0 && (
        <div className="mx-auto max-w-[50rem] rounded-md border">
          {posts.map((post, key) => {
            const href = resolveHref(post._type, post.slug?.current)
            if (!href) {
              return null
            }

            return (
              <Link key={key} href={href}>
                <PostListItem post={post} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function convertDataToHomePostPayload(data: any): HomePostPayload {
  // Sort posts by date, newest first
  const posts = data.sort(
    (a, b) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
  )
  return {
    posts: posts,
  }
}

export default HomePost
