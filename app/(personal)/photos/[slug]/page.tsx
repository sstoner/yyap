// import Album from "app/api/syno/photo/route";
import { PhotoPage, } from "components/pages/photo/page";

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
    return {
        title: params.slug,
    }
}

export default function Index({ params }: Props) {

    // get slug as album_id
    return (
        <>
            <PhotoPage
                album_id="06OvLCNBO"
                size="xl"
                offset1={10}
                limit={4}
            />
            {/* <p>hi world!</p> */}
        </>
    )
}