import styled from "styled-components";
import { NavLink } from "react-router";

interface NavLinkFeedProps {
    active?: boolean;
}

export const NavLinkFeed = styled(NavLink)<NavLinkFeedProps>`
    text-decoration: none;
    color: #828282;
    font-size: 14px;
    
    &.active {
        border-bottom: ${(props) => (props ? '2px solid blue' : '2px solid transparent')};
    }
`;