import styled from "styled-components";
import { Information } from "../../pages/RightSideMenu/styles";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImageProfileContainer } from "../ProfileImage/styles";
import { IoCalendarOutline } from "react-icons/io5";

export const QtdTweets = styled(Information)`
    margin-top: -10px;
`;

export const ArrowReturn = styled(FaArrowLeftLong)``;

export const ProfileImageProfileHeader = styled(ImageProfileContainer)`
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: -45px;
    left: 12px;
`;

export const WrapperBanner = styled.div`
    width: 100%;
    height: 132px;
    background-color: #1d9bf0;
    position: relative;
    margin-bottom: 48px;
`;

export const ProfileHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    border-bottom: 1px solid #E0E0E0;
`;

export const Sice = styled.div`
    
`;

export const Calendar = styled(IoCalendarOutline)`
    width: 12px;
    height: 10px;
`;

export const TextSice = styled.span`
    font-size: 10px;
    color: #828282;
`;

export const Follows = styled.div`
    font-size: 10px;
    color: #828282;
`;

export const NumberSpan = styled.span`
    font-weight: 600;
`;