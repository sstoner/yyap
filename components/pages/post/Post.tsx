'use client'

import { Footer } from 'components/global/Footer'
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
    <div className="heropattern-floatingcogs-blue-100/50">
      <div className="">
        <HeroAnimation heroImageURL={imageUrl} />
        <div className="mt-20">
          <Header title={title} centered={true} description={overview} />
        </div>
        <div className="mb-20">
          <PostBody body={body} />
        </div>
      </div>
    </div>
  )
}
