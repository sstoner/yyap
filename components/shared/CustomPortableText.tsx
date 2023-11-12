import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Image } from 'sanity'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={`${paragraphClasses} p-1`}>{children}</p>
      },
      h1: ({ children }) => {
        return (
          <h1 className={`${paragraphClasses} text-4xl font-bold p-1`}>
            {children}
          </h1>
        )
      },
      h2: ({ children }) => {
        return (
          <h2 className={`${paragraphClasses} text-3xl font-bold p-1`}>
            {children}
          </h2>
        )
      },
      h3: ({ children }) => {
        return (
          <h3 className={`${paragraphClasses} text-2xl font-bold p-1`}>
            {children}
          </h3>
        )
      },
      h4: ({ children }) => {
        return (
          <h4 className={`${paragraphClasses} text-xl font-bold p-1`}>
            {children}
          </h4>
        )
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="text-xl italic font-serif text-gray-600">
            {children}
          </blockquote>
        )
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
      code: ({ value }) => {
        return <SyntaxHighlighter language={'c'}>{value}</SyntaxHighlighter>
      },
    },
  }

  return <PortableText components={components} value={value} />
}
