import { NavLinkFeed } from "./styles";

interface NavFeedLinkProps {
    route: string;
    title: string
}

export function FeedNavLink({route, title}: NavFeedLinkProps) {
    return (
        <NavLinkFeed to={route}>{title}</NavLinkFeed>
    );
}