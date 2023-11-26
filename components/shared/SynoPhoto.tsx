"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";

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

    return (
        <Link href={href}>
          <Image 
                  src={url} 
                  width={500}
                  height={500}
                  alt="Picture of the author"/>
        </Link>
      );
}