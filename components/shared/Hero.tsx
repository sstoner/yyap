import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from './useWindowDimensions'
import ThreeDots from './ContentLoader'

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
    <>
      <a href={heroImageURL} target="_blank">
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1, }}
            transition={{
              type: 'smooth',
              repeatType: 'mirror',
              duration: 1,
              repeat: 0,
            }}
            //    exit={{ x: -300, opacity: 0 }}
            src={heroImageURL}
            alt="floater"
            // width="1024"
            // height="600"
            //        style={{ height: '600px' }}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div >
      </a>
    </>
  )
}