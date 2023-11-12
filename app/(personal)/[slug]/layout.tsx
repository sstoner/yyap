import { Navbar } from 'components/global/Navbar'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
export default function PageSlugRoute({
  children,
}: {
  children: React.ReactNode
}) {
  //   const router = useRouter();
  //   const isActive = (pathname: string) => router.pathname === pathname;
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>{children}</Suspense>
    </>
  )
}
