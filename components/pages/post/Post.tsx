import { CustomPortableText } from "components/shared/CustomPortableText"
import { Header } from "components/shared/Header"
import { PostBody } from "components/shared/PostBody"
import { urlForImage } from "lib/sanity.image"
import { PostPayload } from "types"

export interface PostProps {
    data: PostPayload | null
    width?: number
    height?: number
}

export function Post({
    data,
    width = 3500,
    height = 2000,
}: PostProps ) {
    const { body, author, overview, mainImage, title } = data ?? {}
    const imageUrl =  
        mainImage && urlForImage(mainImage)?.height(height).width(width).fit('scale').url()
    const centered = true
    return (
        <div className="container">
          <div className="mb-14">
            {/* Header */}
            <div className="md:container md:mx-auto pl-20 pr-20">
                <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'} pb-20 pt-20`} style={{    
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>
                   <Header title={title}  centered={true} description={overview} />
                </div>
            </div>
            {/* Body */}
            <PostBody body={body}></PostBody>
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      )
}

export default Post