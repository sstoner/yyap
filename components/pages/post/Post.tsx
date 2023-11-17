'use client'

import { motion } from 'framer-motion'
import { Footer } from 'components/global/Footer'
import ThreeDots from 'components/shared/ContentLoader'
import { Header } from 'components/shared/Header'
import Hero, { HeroAnimation } from 'components/shared/Hero'
import { PostBody } from 'components/shared/PostBody'
import { useMotionValue } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import {
  Parallax,
  ParallaxProvider,
  useParallaxController,
} from 'react-scroll-parallax'
import { PostPayload } from 'types'

// import React from 'react';
export interface PostProps {
  data: PostPayload | null
}

export default function Post({ data }: PostProps) {
  const { body, author, overview, mainImage, title } = data ?? {}
  const imageUrl =
    mainImage && urlForImage(mainImage)?.auto('format').fit('scale').url()
  return (
    /* heropattern */

    <div className="">
      <HeroAnimation heroImageURL={imageUrl} />
      <motion.div
        className="mt-20"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1, }}
        transition={{
          type: 'smooth',
          repeatType: 'mirror',
          duration: 2,
          repeat: 0,
        }}
      >
        <Header title={title} centered={true} description={overview} />
      </motion.div>

      <div className="mb-20">
        <PostBody body={body} />
      </div>

    </div>
  )
}
