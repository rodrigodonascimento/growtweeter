import styled from "styled-components";
import { Information } from "../../pages/RightSideMenu/styles";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImageProfileContainer } from "../ProfileImage/styles";
import { IoCalendarOutline } from "react-icons/io5";

export const ProfileHeaderBorderCard = styled.div`
    border: none;
`;

export const QtdTweets = styled(Information)`
    margin-top: -10px;
`;

export const ArrowReturn = styled(FaArrowLeftLong)`
    color: ${props => props.theme.colors.primaryTextColor};
`;

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
    padding: 15px 10px;
    border-bottom: ${props => props.theme.colors.borderColor};
`;

export const Sice = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 0px;
    gap: 3px;
`;

export const Calendar = styled(IoCalendarOutline)`
    width: 12px;
    height: ${props => props.theme.fonts.fontSize.smallText};
    color: ${props => props.theme.colors.secondaryTextColor};
`;

export const TextSice = styled.span`
    font-size: ${props => props.theme.fonts.fontSize.smallText};;
    color: ${props => props.theme.colors.secondaryTextColor};
`;

export const Follows = styled.div`
    font-size: ${props => props.theme.fonts.fontSize.smallText};;
    color: ${props => props.theme.colors.secondaryTextColor};
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
`;



export const NumberSpan = styled.span`
    font-weight: ${props => props.theme.fonts.fontWeight.extraBold};
    margin-right: 3px;
`;

export const LabelFollows = styled.span`
    font-weight: 600;
`;