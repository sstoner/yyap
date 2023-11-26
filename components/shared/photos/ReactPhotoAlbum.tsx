import { Photo, getThumbnailURL } from "types/syno";
import { ReactPhotoAlbum } from "../Album";
import PhotoAlbum from "react-photo-album";

interface props {
    album_id: string
    size: string
    data: any
}

export function SynoReactPhotoAlbum(props) {
    const { data, album_id } = props
    let photos: { src: string; width: number; height: number; }[] = [];

    data.data.list.map((photo: Photo) => {
        const url = getThumbnailURL(photo, 'xl', album_id)
        photos = photos.concat(
                { 
                    src: url, 
                    width: photo.additional.resolution.width, 
                    height: photo.additional.resolution.height 
                }
            );
    });


    return (
        <div className="mx-20">
            <PhotoAlbum 
               layout="masonry" 
               photos={photos} 
               columns={4}
               padding={2}/>
        </div>
    )
}