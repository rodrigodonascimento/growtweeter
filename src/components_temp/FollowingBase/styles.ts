import styled from "styled-components";
import { SiPaloaltonetworks } from "react-icons/si";

export const CardFollowing = styled.section`
    padding: 15px;
`;

export const WrapperImgFollowing = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 22px;
`;

export const ImageFollowing = styled(SiPaloaltonetworks)`
    width: 37px;
    height: 37px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.borderColor};
`;