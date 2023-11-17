"use client";
import { useEffect, useState } from "react";

export default function SynoPhoto({ id, cache_key, album_id, size, className, href = "#" }) {
    const loading = false;
    const url = '/api/syno/photos/thumbnail?album_id=' +
        album_id +
        '&id=' +
        id +
        '&size=' +
        size +
        '&cache_key=' +
        cache_key

    if (href === "#") {
        href = '/api/syno/photos/original?album_id=' +
            album_id +
            '&id=' +
            id
    }

    const [hover, setHover] = useState(false);
    return (
        <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="group">
                <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
                <div className="overlay group-hover:block hidden">
                    <p>Click to view original</p>
                </div>
            </a>
        </div>
    );
}