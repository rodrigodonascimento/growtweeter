import { ImageProfileContainer } from "./styles";

interface ProfileImageProps {
    $urlImage?: string;
}

export function ProfileImage({$urlImage}: ProfileImageProps) {
    const isValidUrl = $urlImage && $urlImage.trim().length > 10;
    const fallback = 'https://twing.com';
    return (
        <ImageProfileContainer $urlImage={isValidUrl ? $urlImage : fallback} />
    );
}