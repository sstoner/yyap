"use client";
import SynoPhoto from "components/shared/SynoPhoto";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Cover({ albums }) {
    const [covers, setCovers] = useState([]);
    useEffect(() => {
        async function fetchAlbums() {
            let covers = []
            for (const album of albums) {
                const album_id = getLastPartOfUrl(album.sharedAlbumUrl)
                const cover = await getCover(album_id);
                //construct slugURL, should append to /photos/
                const slugUrl = "/photos/" + album.slug.current;
                covers = covers.concat({ cover, album_id, slugUrl });
            }
            setCovers(covers);
        }

        fetchAlbums();

    }, []);


    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {covers.map((cover, index) => (
                    <Link href={cover.slugUrl}>
                        <SynoPhoto
                            key={index}
                            id={cover.cover.id}
                            cache_key={cover.cover.cache_key}
                            album_id={cover.album_id}
                            size="sm"
                            className="rounded overflow-hidden shadow-lg p-4"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

async function getCover(album_id) {
    const res = await fetch(`/api/syno/photos?album_id=${album_id}&offset=1&limit=1`);
    const data = await res.json();
    return data.data.list[0];
}

export function getLastPartOfUrl(url) {
    var parts = url.split("/");
    return (parts.pop() || parts.pop());
}

export default Cover;