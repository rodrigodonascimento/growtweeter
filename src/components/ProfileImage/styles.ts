import styled from "styled-components";

interface ProfileProps {
    $urlImage?: string;
}

export const ImageProfileContainer = styled.div<ProfileProps>`
    width: 40px;
    height: 40px;
    background-image: url(${props => props.$urlImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JRjMc5ktNAfro-6xXXU_y-8GMPwqVbqqvQ&s'});
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
    z-index: 2;
    flex-shrink: 0;
`;