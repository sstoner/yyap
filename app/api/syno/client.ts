
export interface SynoPhotoProps {
    id: string;
    cache_key: string;
    album_id: string;
    size: string;
}

export interface Client {
    endpoint: string
    sid: string
    albumID: string

    set_sid: (sid: string) => void

    do_fetch: (url: string, { method, myHeaders, body }) => Promise<any>
}

export interface Album {
    // info list of album
    info: ({ limit, offset }) => Promise<any>
    // thumbnail of album
    thumbnail: ({ id, cache_key, size }) => Promise<any>
}

export class SynoAlbum implements Album {
    client: Client

    constructor(client: Client) {
        this.client = client
        this.login()
    }

    async login(): Promise<any> {
        if (!this.client.sid) {
            const sid = await fetch_sharing_login(this.client)
            this.client.set_sid(sid.data.sharing_sid)
        }
        return this.client.sid
    }

    async info({ offset, limit }): Promise<any> {
        return fetch_browse_item(this.client, offset, limit)
    }

    async thumbnail({ id, cache_key, size }): Promise<any> {
        return fetch_thumbnail(id, cache_key, this.client, size)
    }
}

const api_url = process.env.BLACKPIG_HOME_API_URL || 'MUST_EXIST'

export class SynoClient implements Client {
    endpoint: string
    sid: string
    albumID: string

    constructor(albumID: string) {
        this.endpoint = api_url
        this.albumID = albumID
    }

    async do_fetch(url: string, { method, myHeaders, body }): Promise<any> {
        // console.log(`debug: send request with options: `, options.myHeaders, `to endpoint: `, this.endpoint)
        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
        }
        return await fetch(url, requestOptions)
    }

    set_sid(sid: string) {
        this.sid = sid
    }
}


// --------------------------- // 
async function fetch_thumbnail(
    id: string,
    cache_key: string,
    client: Client,
    size: string,
): Promise<any> {
    const sid = client.sid
    const alid = client.albumID

    if (!sid) {
        throw new Error(`albumID: ${alid}, Session ID is empty`)
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
    myHeaders.append('x-syno-sharing', `${alid}`)
    myHeaders.append('Cookie', `sharing_sid=${sid}`)

    const url = generateThumbnailUrl(client.endpoint, id, cache_key, sid, size)
    // return url;
    try {
        // console.log(`debug: send request with options: to endpoint: `, url)
        return client.do_fetch(url, {
            // cookie: `sharing_sid = ${sid}`,
            method: 'GET',
            myHeaders: myHeaders,
            body: null,
        })
    } catch (error) {
        console.error('error', error)
        throw error
    }
}


async function fetch_browse_item(
    client: Client,
    offset: number,
    limit: number,
): Promise<any> {
    const sid = client.sid
    const alid = client.albumID

    if (!sid) {
        throw new Error(`albumID: ${alid}, Session ID is empty`)
    }
    const myHeaders = new Headers()
    myHeaders.append('x-syno-sharing', alid)
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
    myHeaders.append('Cookie', `sharing_sid=${sid}`)

    const urlencoded = new URLSearchParams()
    urlencoded.append(
        'additional',
        '["thumbnail","resolution","orientation","video_convert","video_meta","provider_user_id"]',
    )
    urlencoded.append('offset', offset.toString())
    urlencoded.append('limit', limit.toString())
    urlencoded.append('sort_by', '"takentime"')
    urlencoded.append('sort_direction', '"asc"')
    urlencoded.append('passphrase', `"${alid}"`)

    urlencoded.append('api', 'SYNO.Foto.Browse.Item')
    urlencoded.append('method', 'list')
    urlencoded.append('version', '1')


    try {
        return client.do_fetch(client.endpoint, {
            method: 'POST',
            myHeaders: myHeaders,
            body: urlencoded,
        })
    } catch (error) {
        console.error('error', error)
        throw error
    }
}

function generateThumbnailUrl(
    endpoint: string,
    id: string,
    cache_key: string,
    sid: string,
    size: string,
): string {
    const url = new URL(endpoint)
    const params = new URLSearchParams({
        api: 'SYNO.Foto.Thumbnail',
        version: '1',
        method: 'get',
        mode: 'download',
        id: id,
        type: 'unit',
        size: size,
        cache_key: cache_key,
        _sid: sid,
    })

    url.search = params.toString()

    return url.toString()
}


// sharing url: https://blackpig.info:5001/ui/SHARING/xxxxx
async function fetch_sharing_login(client: Client): Promise<any> {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('api', 'SYNO.Core.Sharing.Login')
    urlencoded.append('method', 'login')
    urlencoded.append('version', '1')
    urlencoded.append('sharing_id', client.albumID)


    try {
        return client.do_fetch(client.endpoint, {
            method: 'POST',
            myHeaders: myHeaders,
            body: urlencoded,
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        })
    } catch (error) {
        console.error('error', error)
        throw error
    }
}