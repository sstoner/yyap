"use client";

import React, { useState, useEffect } from 'react';

export default function SynoPhotos({
    album_id,
    size,
    offset,
    limit,
}) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    const [photos, setPhotos] = useState < any > ([]);
    useEffect(() => {
        const fetchData = async () => {
            fetch(`/api/syno/photos?album_id=${album_id}&offset=${offset}&limit=${limit}`)
                .then((res) => res.json())
                .then((data) => {
                    setPhotos(photos.concat(data.data.list));
                });


            setLoading(false);
        };
        fetchData();
    }, []); // Dependencies for useEffect


    return (
        <>
            {
                photos.map((photo) => {
                    const id = photo.id;
                    const cache_key = photo.additional.thumbnail.cache_key;
                    const url = '/api/syno/photos/thumbnail?album_id=' +
                        album_id +
                        '&id=' +
                        id +
                        '&size=' +
                        size +
                        '&cache_key=' +
                        cache_key
                    return <div className="shadow-lg rounded-lg overflow-hidden">
                        {loading ? <p>Loading...</p> : <img src={url} alt="thumbnail" />}
                    </div>
                })
            }
        </>
    );
}