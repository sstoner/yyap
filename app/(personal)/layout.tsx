import 'styles/index.css'

import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import { token } from 'lib/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const PreviewProvider = dynamic(
  () => import('components/preview/PreviewProvider'),
)

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled
  // get slug

  const layout = (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {isDraftMode && <PreviewBanner />}
      <Suspense><Navbar /></Suspense>
      <Suspense>{children}</Suspense>

      <div className="flex px-0 py-0">
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </div>
  )

  if (isDraftMode) {
    return <PreviewProvider token={token!}>{layout}</PreviewProvider>
  }

  return layout
}
