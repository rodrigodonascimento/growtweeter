import styled from "styled-components";

export const ExplorerUsersContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LinkToProfileUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border-Bottom: ${props => props.theme.colors.borderColor};
    cursor: pointer;
`;

export const NameProfileUser = styled.p`
    font-weight: bold; 
    margin: 0;
`;

export const UsernameProfileUser = styled.p`
    color: ${props => props.theme.colors.secondaryTextColor};
    margin: 0;
`;