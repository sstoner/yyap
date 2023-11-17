import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Image } from 'sanity'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
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
        return <p className={`${paragraphClasses} mb-3 text-gray-500 dark:text-gray-400 pl-3`}>{children}</p>
      },
      h1: ({ children }) => {
        return (
          <h1 className="text-5xl font-extrabold dark:text-white p-3">
            {children}
          </h1>
          // <h1 className={` text-4xl font-bold p-1`}>
          //   {children}
          // </h1>
        )
      },
      h2: ({ children }) => {
        return (
          <h2 className="text-4xl font-extrabold dark:text-white p-3">
            {children}
          </h2>
          // <h2 className={` text-3xl font-bold p-1`}>
          //   {children}
          // </h2>
        )
      },
      h3: ({ children }) => {
        return (
          <h3 className="text-3xl font-bold dark:text-white p-3">
            {children}
          </h3>
        )
      },
      h4: ({ children }) => {
        return (
          <h4 className="text-2xl font-bold dark:text-white p-3">
            {children}
          </h4>
        )
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p>{children}</p>
          </blockquote>
        )
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
      highlight: ({ children }) => {
        return (
          <span className="text-blue-600 dark:text-blue-500">
            {children}
          </span>
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
              <div className="font-sans text-sm text-gray-600 text-center">
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
      myCodeField: ({ value }) => {
        return (
          <SyntaxHighlighter language={value.language} style={docco}>
            {value.code}
          </SyntaxHighlighter >
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
