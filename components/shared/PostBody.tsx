import { CustomPortableText } from './CustomPortableText'

interface PostBodyProps {
  body: any // Replace "any" with the appropriate type for your Post body content
}

export function PostBody(props: PostBodyProps) {
  const { body } = props
  return (
    <div className="max-w-3xl mx-auto my-8">
      {body && (
        <CustomPortableText
          paragraphClasses="font-serif text-gray-600 text-xl leading-relaxed"
          value={body}
        />
      )}
    </div>
  )
}