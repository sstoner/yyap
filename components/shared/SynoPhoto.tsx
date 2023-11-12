"use client";
import { useEffect, useState } from "react";
import { SynoPhotoProps } from "../../app/api/syno/photos";

export default function SynoPhoto({ id, cache_key, album_id, size, className }) {
    const loading = false;
    const url = '/api/syno/photos/thumbnail?album_id=' +
        album_id +
        '&id=' +
        id +
        '&size=' +
        size +
        '&cache_key=' +
        cache_key

    return (
        <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
            {loading ? <p>Loading...</p> : <img src={url} alt="thumbnail" className="w-full h-full object-cover" />}
        </div>
    )
}