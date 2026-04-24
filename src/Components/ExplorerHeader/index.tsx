import { Outlet } from "react-router";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";
import { HeaderBorderCard } from "../HeaderBorderCard";
import { HeaderCard } from "../HeaderCard";
import { HeaderContainer } from "../HeaderContainer";
import { HeaderTitle } from "../HeaderTitle";

export function ExplorerHeader() {
    return (
        <HeaderContainer>
            <HeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title="Explorar" />
                    <FeedNav>
                        <FeedNavLink route={""} title={""} />
                    </FeedNav>
                </HeaderCard>
            </HeaderBorderCard>
            <Outlet />
        </HeaderContainer>
    );
}