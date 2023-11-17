import { Navbar } from "components/global/Navbar";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { Footer } from "components/global/Footer";
export default function PageSlugRoute({
  children,
}) {

  //   const router = useRouter();
  //   const isActive = (pathname: string) => router.pathname === pathname;
  return (
    <>
      {/* <Suspense><Navbar /></Suspense> */}
      <div className="flex-1 min-w-full min-h-full heropattern-floatingcogs-blue-100/50">
        <Suspense>{children}</Suspense>
      </div >

      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  )
}