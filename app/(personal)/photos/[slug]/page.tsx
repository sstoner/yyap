// import Album from "app/api/syno/photo/route";
import { PhotoPage, } from "components/pages/photo/page";
import { ReactPhotoAlbum } from "components/shared/Album";
import { SynoReactPhotoAlbum } from "components/shared/photos/ReactPhotoAlbum";
import { useAlbum } from "hooks/useAlbum";
import { getSharedAlbumsBySlug } from "lib/sanity.fetch";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import PhotoAlbum from "react-photo-album";
import { Photo, getThumbnailURL } from "types/syno";

async function generateMetadata ({ params }) {
    return {
        title: params.slug,
    }
}

export default async function PhotoSlugRoute ({ params }) {
    const sharedAlbum = await getSharedAlbumsBySlug(params.slug)
    if (!sharedAlbum && !draftMode().isEnabled) {
        notFound()
    }

    const album_id = getLastPartOfUrl(sharedAlbum.sharedAlbumUrl)
    const size = 'xl';

    const album = useAlbum(album_id);
    const data = await album.info({ offset: 0, limit: 10 }).then((resp) => {
        return resp.json();
    });

    return (
        <SynoReactPhotoAlbum data={data} album_id={album_id} size={size} />
    );
}

export function getLastPartOfUrl (url) {
    var parts = url.split("/");
    return (parts.pop() || parts.pop());
}