import { album } from 'schemas/documents/album';

export interface Photo {
    id: number;
    filename: string;
    filesize: number;
    time: number;
    indexed_time: number;
    owner_user_id: number;
    folder_id: number;
    type: string;
    additional: {
      resolution: { width: number; height: number };
      orientation: number;
      orientation_original: number;
      thumbnail: {
        m: string;
        xl: string;
        preview: string;
        sm: string;
        cache_key: string;
        unit_id: number;
      };
      provider_user_id: number;
    };
}


const thumbnailURI = '/api/syno/photos/thumbnail'

export function getThumbnailURL(photo: Photo, size: string, album_id: string): string {
    const urlencoded = new URLSearchParams()
    urlencoded.append(    "album_id", album_id )
    urlencoded.append(    "id", photo.id.toString(), )
    urlencoded.append(    "cache_key", photo.additional.thumbnail.cache_key, )
    urlencoded.append(    "size", size )

    return thumbnailURI + '?' + urlencoded.toString()
}