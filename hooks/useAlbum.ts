import { SynoAlbum } from 'lib/syno.client';

// Global object to store the SynoAlbum instances
const albums: { [album_id: string]: SynoAlbum } = {};

export function useAlbum(album_id: string): SynoAlbum {
    console.log(`debug: useAlbum: album_id: `, album_id);
    let album = albums[album_id];
    if (!album) {
        album = new SynoAlbum(album_id);
        console.log(`debug: useAlbum: create new album: `, album)
        albums[album_id] = album;
    }
    // if login failed, try again
    if (!album.sid) {
        album.login();
    }

    return album;
}

export function removeAlbum(album_id: string): void {
    delete albums[album_id];
}