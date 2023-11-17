import { useAlbum } from "hooks/useAlbum"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = new URL(req.nextUrl).searchParams
    const albumID = searchParams.get('album_id') || ''
    const id = searchParams.get('id') || ''

    try {
        // const synoclient = new SynoClient(albumID)
        const album = useAlbum(albumID)
        const response = album.login().then((): Promise<Response> => {
            return album.download({ id })
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
