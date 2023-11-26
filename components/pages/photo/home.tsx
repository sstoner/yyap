"use client";
import SynoPhoto from "components/shared/SynoPhoto";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

function LoadingSpinner() {
    return (
        <motion.div
            className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"
            style={{ borderRightColor: 'transparent' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        />
    );
}

export function Cover({ albums }) {
    const [covers, setCovers] = useState<{cover: any; album_id: string; href: string}[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchedAlbums = new Set();

    useEffect(() => {
        async function fetchAlbums() {
            let newCovers = [];
            for (const album of albums) {
              const album_id = getLastPartOfUrl(album.sharedAlbumUrl);
              if (!fetchedAlbums.has(album_id)) {
                const cover = await getCover(album_id);
                const href = "/photos/" + album.slug.current;
                newCovers = newCovers.concat({ cover, album_id, href });
                fetchedAlbums.add(album_id);
              }
            }
            setCovers(newCovers);
            setIsLoading(false);
          }
      
          fetchAlbums();
    }, [albums]);


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
            <div className="mt-20">
                {covers.map((cover, index) => (
                <div className="mx-auto max-w-[50rem] rounded-md border" key={index}>
                    <SynoPhoto
                        id={cover.cover.id}
                        cache_key={cover.cover.cache_key}
                        album_id={cover.album_id}
                        size="sm"
                        className="p-4 overflow-hidden rounded shadow-lg"
                        key={index}
                        href={cover.href}
                    />
                </div>
                ))}
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