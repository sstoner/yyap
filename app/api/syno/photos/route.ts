import { useAlbum } from "hooks/useAlbum"
import { NextResponse } from "next/server"


// albumID, limit, offset
export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams
    const limit = searchParams.get('limit') || ''
    const offset = searchParams.get('offset') || ''
    const albumID = searchParams.get('album_id') || ''

    try {
        // const synoclient = new SynoClient(albumID)
        const album = useAlbum(albumID)
        const response = album.login().then((): Promise<Response> => {
            return album.info({ offset, limit })
        })

        return response

    } catch (error) {
        console.log('An error occurred: ', error)
        return new Response(error, { status: 500 })
    }
}