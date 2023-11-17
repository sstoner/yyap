import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import type { SettingsPayload } from 'types'

interface FooterProps {
  data: SettingsPayload
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  return (
    <footer className="relative bottom-0 w-full bg-white py-auto text-center md:py-auto">
      {footer && (
        // <CustomPortableText
        //   paragraphClasses="text-sm md:text-md text-center text-gray-200 font-semibold"
        //   value={footer}
        // />
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
          <a href="/" className="hover:underline">YYPatience™</a>. All rights reserved.
        </span>
      )}
    </footer>
  )
}
