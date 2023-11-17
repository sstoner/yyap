"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import settings from 'schemas/singletons/settings'
import SynoPhoto from 'components/shared/SynoPhoto'
import SynoPhotos from 'components/shared/SynoPhotos';
import LoadMoreButton from 'components/shared/LoadMorePhotos';
import Link from 'next/link';
import AutoResponsive from 'autoresponsive-react';
import { SimplestSampleComponent } from 'components/shared/SimpleAutoResponse';

export function PhotoPage({ album_id, offset1, limit }:
  { album_id: string, size: string, offset1: number, limit: number }) {

  const [size, setSize] = useState('sm'); // default to 'sm' for server rendering
  useEffect(() => {
    // this code will run after the component is mounted on the client
    const newSize = window.innerWidth <= 768 ? 'sm' : 'xl';
    setSize(newSize);
  }, []); // empty dependency array means this effect runs once on mount

  let [offset, setOffset] = useState(offset1);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const loaderRef = useRef(null);

  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      fetch(`/api/syno/photos?album_id=${album_id}&offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(photos.concat(data.data.list));
          setOffset(offset + limit);
        });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }

    setIsLoading(false);
  }, [isLoading, offset, limit, album_id]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          fetchData();
        }
      }, {
      rootMargin: '0px 0px -2.0% 0px',
      //        threshold: 0
    }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]); // Empty dependency array

  // useEffect(() => {
  //   fetchData();
  // }, []); // Empty dependency array

  const containerRef = useRef(null);
  return (
    <div className="container mx-auto px-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div className="rounded overflow-hidden shadow-lg p-4">
            <SynoPhoto
              id={photo.id}
              cache_key={photo.cache_key}
              album_id={album_id}
              size={size}
              className="w-full object-scale-down"
            />
          </div>
        ))}
      </div>

      <div ref={loaderRef}>{
        isLoading &&
        <LoadMoreButton onClick={fetchData} loading={isLoading} />}
      </div>
    </div>
  )
}

export default PhotoPage;