import { CustomPortableText } from './CustomPortableText'

interface PostBodyProps {
  body: any // Replace "any" with the appropriate type for your Post body content
}

export function PostBody(props: PostBodyProps) {
  const { body } = props
  return (
    <div className="max-w-3xl mx-auto my-8 relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
      {body && (
        <CustomPortableText
          paragraphClasses="prose font-serif text-gray-600 text-xl leading-relaxed"
          value={body}
        />
      )}
      </div>
  )
}