import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import type { PagePayload } from 'types'

export interface PageProps {
  data: PagePayload | null
}

export function AboutPage({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  return (
    <div className="">
      <div className="h-full w-full heropattern-floatingcogs-blue-100/50">
        <div className="relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
          {/* Header */}
          <Header title={''} description={overview} />
          {/* Beautiful Line */}
          <div className="my-4 border-b-2 border-gray-200"></div>
          {/* Body */}
          {body && (
            <CustomPortableText
              paragraphClasses="prose font-serif max-w-3xl text-gray-600 text-xl"
              value={body}
            />
          )}
        </div>
        {/* <div className="absolute left-0 w-screen border-t" /> */}
      </div>
    </div>
  )
}

export default AboutPage
