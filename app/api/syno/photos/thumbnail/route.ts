import path from 'path'
import { fileURLToPath } from 'url'
import { NextRequest, NextResponse } from 'next/server'
import { SynoAlbum, SynoClient } from '../../client'


// https://blackpig.info:5001/mo/sharing/${albumID}
// syno/photo/thumbnail?albumID=xxxxx&id=xxxxx&cache_key=xxxxx&size=xxxxx
// sid get by self
export async function GET(req: NextRequest) {
  // parse request params
  const searchParams = new URL(req.nextUrl).searchParams

  const albumID = searchParams.get('album_id') || ''
  const id = searchParams.get('id') || ''
  const cache_key = searchParams.get('cache_key') || ''
  const size = searchParams.get('size') || ''

  try {
    const synoclient = new SynoClient(albumID)
    const album = new SynoAlbum(synoclient)
    const response = album.login().then((): Promise<Response> => {
      return album.thumbnail({ id, cache_key, size })
    })
    return response
  } catch (error) {
    console.log('An error occurred: ', error)
    return NextResponse.json({
      status: 500,
      error: error,
    })
  }
}

