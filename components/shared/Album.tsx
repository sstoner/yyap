import PhotoAlbum from "react-photo-album";


export function ReactPhotoAlbum({photos, layout}) {
    return (
        <PhotoAlbum layout="masonry" photos={photos} />
    )
}