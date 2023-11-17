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
    const [covers, setCovers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchedAlbums = new Set();

    useEffect(() => {
        async function fetchAlbums() {
            let covers = [];
            for (const album of albums) {
                const album_id = getLastPartOfUrl(album.sharedAlbumUrl);
                if (!fetchedAlbums.has(album_id)) {
                    const cover = await getCover(album_id);
                    const slugUrl = "/photos/" + album.slug.current;
                    covers = covers.concat({ cover, album_id, slugUrl });
                    fetchedAlbums.add(album_id);
                }
            }
            setCovers(covers);
            setIsLoading(false);
        }

        fetchAlbums();
    }, []);


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <motion.div className="container mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {covers.map((cover, index) => (
                    <SynoPhoto
                        id={cover.cover.id}
                        cache_key={cover.cover.cache_key}
                        album_id={cover.album_id}
                        size="sm"
                        className="rounded overflow-hidden shadow-lg p-4"
                        key={index}
                        href={cover.slugUrl}
                    />
                ))}
            </div>
        </motion.div>
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