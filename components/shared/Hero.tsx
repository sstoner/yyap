"use client";
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from './useWindowDimensions'
import ThreeDots from './ContentLoader'
import clsx from 'clsx';

export interface HeroProps {
  heroImageURL?: string
}

export default function Hero({ heroImageURL }: HeroProps) {
  const imageSizes = [600, 1280, 1920]

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden relative bg-black">
      <Image
        src={`${heroImageURL}`}
        alt="Hero Image"
        className="opacity-60 object-cover"
        fill
      />
    </div>
  )
}

export function HeroAnimation({ heroImageURL }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new window.Image();
    img.src = heroImageURL;
    img.onload = () => setIsLoaded(true);
  }, [heroImageURL]);

  return (
    <a href={heroImageURL} target="_blank" rel="noopener noreferrer">
      <div className="relative w-full h-1/2-screen mt-8">
        {!isLoaded && <LoadingSpinner />}
        <motion.img
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'smooth',
            repeatType: 'mirror',
            duration: 1,
            repeat: 0,
          }}
          src={heroImageURL}
          alt="floater"
          className={clsx('w-full h-full object-contain', { hidden: !isLoaded })}
        />
      </div>
    </a>
  )
}

function LoadingSpinner() {
  return <div className="absolute top-0 left-0 max-w-full h-full bg-gray-200 animate-pulse object-contain" />;
}