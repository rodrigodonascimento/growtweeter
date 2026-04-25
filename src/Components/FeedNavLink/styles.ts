import styled from "styled-components";
import { NavLink } from "react-router";

interface NavLinkFeedProps {
    active?: boolean;
}

export const NavLinkFeed = styled(NavLink) <NavLinkFeedProps>`
    text-decoration: none;
    color: ${props => props.theme.colors.primaryTextColor};
    font-size: ${props => props.theme.fonts.fontSize.generalText};
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: transparent;
        bottom: -14px; 
        transition: background-color 0.3s ease;
    }
    
    &.active::after {
        border-bottom: ${(props) => (props ? '2px solid #1D9BF0' : '2px solid transparent')};
    }
`;