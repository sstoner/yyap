import { useEffect, useState } from "react";
import SynoPhoto from "components/shared/SynoPhoto";
import { getSharedAlbums } from "lib/sanity.fetch";
import { getLastPartOfUrl } from "./[slug]/page";
import Cover from "components/pages/photo/home";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

async function generateMetadata({ params }) {
    return {
        title: params.slug,
    }
}


export default async function Index({ params }) {
    const albums = await getSharedAlbums();
    if (!albums && !draftMode().isEnabled) {
        notFound()
    }
    
    return (
        <>
            <Cover albums={albums}
            />
        </>
    )
}