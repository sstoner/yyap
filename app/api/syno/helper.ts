

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
        throw new Error('Session ID is empty')
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
    myHeaders.append('x-syno-sharing', `${alid}`)
    myHeaders.append('Cookie', `sharing_sid = ${sid}`)

    const url = await generateThumbnailUrl(client.endpoint, id, cache_key, sid, size)
    const requestOptions = {
        method: 'GET',
        myHeaders,
        // redirect: 'follow' as RequestRedirect,
    }

    // return url;

    try {
        const response = await client.do_fetch(requestOptions)

        return response
        // return blob
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
        throw new Error('Session ID is empty')
    }
    const myHeaders = new Headers()
    myHeaders.append('x-syno-sharing', alid)
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
    myHeaders.append('Cookie', `sharing_sid = ${sid}`)

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

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow' as RequestRedirect,
    }

    console.log(`requestOptions: `, requestOptions)
    try {
        const response = await client.do_fetch(requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('error', error)
        throw error
    }
}

async function generateThumbnailUrl(
    endpoint: string,
    id: string,
    cache_key: string,
    sid: string,
    size: string,
): Promise<any> {
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
async function fetch_sharing_login(client: Client): Promise<string> {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('api', 'SYNO.Core.Sharing.Login')
    urlencoded.append('method', 'login')
    urlencoded.append('version', '1')
    urlencoded.append('sharing_id', client.albumID)

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow' as RequestRedirect,
    }

    try {
        const response = await client.do_fetch(requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const responseJson = await response.json()
        const sharingId = responseJson.data.sharing_sid
        return sharingId || ''
    } catch (error) {
        console.error('error', error)
        throw error
    }
}