import { Navbar } from 'components/global/Navbar'
import { Suspense } from 'react'

export default function PostSlugRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>{children}</Suspense>
    </>
  )
}
