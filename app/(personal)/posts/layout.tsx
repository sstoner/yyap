import { Navbar } from "components/global/Navbar";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { Footer } from "components/global/Footer";

export default function PostsSlugRoute({
    children,
}) {
    return (
        <div className="flex-1 min-w-full min-h-full heropattern-floatingcogs-blue-100/50">
            {children}
        </div >
    )
}