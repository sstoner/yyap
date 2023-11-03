"use client";

import { Header } from "components/shared/Header"
import { PostBody } from "components/shared/PostBody"
import { urlForImage } from "lib/sanity.image"
import { PostPayload } from "types"
import { Parallax, useParallaxController,ParallaxProvider} from 'react-scroll-parallax';
import { Footer } from "components/global/Footer";

// import React from 'react';
export interface PostProps {
    data: PostPayload | null
}

export default function Post({ data }: PostProps) {
    const { body, author, overview, mainImage, title } = data ?? {}
    const imageUrl = mainImage && urlForImage(mainImage)?.auto('format').fit('scale').url()
    return (
        /* heropattern */
        <div className="heropattern-floatingcogs-blue-100/50">
        <div className="">
                <ParallaxProvider >
                    <Parallax className="w-full h-screen bg-center bg-no-repeat bg-cover" style={{    
                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                        // fit full screen, not just the container
                        // backgroundSize: '100%',
                        // backgroundRepeat: 'no-repeat',
                        // backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        // backgroundPositionX: 'center',
                        // backgroundPositionY: 'center',
                        // height: '100vh',
                        // width: '100vw',
                        // position: 'relative',
                    }}>
                    </Parallax>
                </ParallaxProvider>
                <div className="mt-20">
                    <Header title={title}  centered={true} description={overview} />
                </div>
                <div className="mb-20">
                    <PostBody body={body} />
                </div>
        </div>
        </div>
    )
}

