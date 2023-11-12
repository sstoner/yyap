import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

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
  return (
    <div className="">
      <motion.img
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'smooth',
          repeatType: 'mirror',
          duration: 2,
          repeat: 0,
        }}
        //    exit={{ x: -300, opacity: 0 }}
        src={heroImageURL}
        alt="floater"
      />
    </div>
  )
}
