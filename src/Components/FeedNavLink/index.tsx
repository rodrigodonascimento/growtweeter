import { NavLinkFeed } from "./styles";

interface NavFeedLinkProps {
    route: string;
    title: string;
    end?: boolean;
}

export function FeedNavLink({route, title, end}: NavFeedLinkProps) {
    return (
        <NavLinkFeed to={route} end={end}>{title}</NavLinkFeed>
    );
}