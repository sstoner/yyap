'use client'

import { motion, useScroll } from 'framer-motion'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
// import React from 'react';
import { useEffect, useState } from 'react'
import type { MenuItem, SettingsPayload } from 'types'
interface NavbarProps {
  data: SettingsPayload
  isActive?: boolean
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  /** add this bit **/
  const { scrollY } = useScroll()

  /** add useState hook to manage state **/
  const [hidden, setHidden] = useState(false)

  /** this onUpdate function will be called in the `scrollY.onChange` callback **/
  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false)
      console.log('visible')
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true)
      console.log('hidden')
    }
  }
  /** add this useEffect hook to return events everytime the scrollY changes **/
  useEffect(() => {
    return scrollY.onChange(() => update())
  })

  /** add this const **/
  const variants = {
    /** this is the "visible" key and it's respective style object **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's respective style object **/
    hidden: { opacity: 0, y: -25 },
  }

  return (
    <motion.nav /** the variants object needs to be passed into the motion component **/
      variants={variants}
      /** it's right here that we match our boolean state with these variant keys **/
      animate={hidden ? 'hidden' : 'visible'}
      /** I'm also going to add a custom easing curve and duration for the animation **/
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      className="sticky top-0 flex flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32"
    >
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`text-lg hover:text-black md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-black'
                  : 'text-gray-600'
              }`}
              href={href}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="elevation-1 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                {menuItem.title}
              </motion.button>
            </Link>
          )
        })}
    </motion.nav>
  )
}
