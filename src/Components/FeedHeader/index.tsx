import { Outlet } from "react-router-dom";
import { HeaderContainer } from "../HeaderContainer";
import { HeaderBorderCard } from "../HeaderBorderCard";
import { HeaderCard } from "../HeaderCard";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";
import { HeaderTitle } from "../HeaderTitle";



export function FeedHeader() {
    return (
        <HeaderContainer>
            <HeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title="Página Inicial" />
                    <FeedNav>
                        <FeedNavLink route={""} title={"Para Você"}></FeedNavLink>
                        <FeedNavLink route={"following"} title={"Seguindo"}></FeedNavLink>
                    </FeedNav>
                </HeaderCard>
            </HeaderBorderCard>
            <Outlet />
        </HeaderContainer>
    );
}
