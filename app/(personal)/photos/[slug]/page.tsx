// import Album from "app/api/syno/photo/route";
import { PhotoPage, } from "components/pages/photo/page";
import { useAlbum } from "hooks/useAlbum";
import { getSharedAlbumsBySlug } from "lib/sanity.fetch";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

async function generateMetadata({ params }) {
    return {
        title: params.slug,
    }
}

export default async function PhotoSlugRoute({ params }) {
    const data = await getSharedAlbumsBySlug(params.slug)
    if (!data && !draftMode().isEnabled) {
        notFound()
    }

    const album_id = getLastPartOfUrl(data.sharedAlbumUrl)

    // TODO: useAlbum hook
    return (
        <>
            <PhotoPage
                album_id={album_id}
                offset1={10}
                limit={6}
            />
        </>
    )
}

export function getLastPartOfUrl(url) {
    var parts = url.split("/");
    return (parts.pop() || parts.pop());
}