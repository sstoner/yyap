import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import { client } from 'lib/sanity.client'
import type { Post } from 'types'

interface PostProps {
  post: Post
  odd: number
}

export function PostListItem(props: PostProps) {
  const { post, odd } = props
  return (
    <div
      className={`flex flex-row gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${odd && 'border-b border-t xl:flex-row-reverse'
        }`}
      style={{ maxWidth: 'auto' }}
    >
      <div className="w-1/2 xl:w-9/12 flex flex-col">
        <ImageBox
          image={post.mainImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="relative aspect-[16/9] md:aspect-[16/9]"
        />
      </div>
      <div className="w-1/2 xl:w-1/4 flex flex-col">
        <TextBox Post={post} />
      </div>
    </div>
  )
}

function TextBox({ Post }: { Post: Post }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0 h-full overflow-hidden">
      {/* Title */}
      <div className="mb-2 text-sm font-extrabold tracking-tight md:text-md">
        {Post.title}
      </div>
      {/* Overview */}
      <div className="font-serif text-gray-500 overflow-hidden line-clamp-3">
        <CustomPortableText value={Post.overview as PortableTextBlock[]} />
      </div>
      {/* Tags */}
      <div className="mt-1 flex flex-row gap-x-2">
        {Post.categories?.map((tag, key) =>
          client
            .fetch(`*[_type == "category" && _id == "${tag._ref}"][0]`)
            .then((res) => (
              <div
                className="text-sm font-medium lowercase md:text-lg"
                key={key}
              >
                <div className="inline-block bg-green-100 rounded-full px-1 py-0.5 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{res.title}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
