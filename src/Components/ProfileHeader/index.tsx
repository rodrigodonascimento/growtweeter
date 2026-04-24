import { HeaderBorderCard } from "../HeaderBorderCard";
import { HeaderContainer } from "../HeaderContainer";
import { ArrowReturn, Calendar, Follows, NumberSpan, ProfileHeaderWrapper, ProfileImageProfileHeader, QtdTweets, Sice, TextSice, WrapperBanner } from "./styles";
import { HeaderCard } from "../HeaderCard";
import { HeaderTitle } from "../HeaderTitle";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { Outlet } from "react-router";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";


export function ProfileHeader() {
    return (
        <HeaderContainer>
            <HeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title="Perfil de @RodrigodoNascimento" />
                    <QtdTweets>7 weeks</QtdTweets>
                    <ArrowReturn />
                </HeaderCard>
            </HeaderBorderCard>
            <WrapperBanner>
                    <ProfileImageProfileHeader />
            </WrapperBanner>
            <ProfileHeaderWrapper>
                <ProfileName $name={"Rodrigo do Nascimento"} />
                <ProfileUsername $userName="@rodrigodonascimento" />
                <Sice>
                    <Calendar />
                    <TextSice>Ingressou em abril de 2023</TextSice>
                </Sice>
                <Follows>
                    <div>
                        <NumberSpan>55</NumberSpan>
                        <span>Seguindo</span>
                    </div>
                    <div>
                        <NumberSpan>55</NumberSpan>
                        <span>Seguidores</span>
                    </div>
                </Follows>
                <FeedNav>
                    <FeedNavLink route={"tweets"} title={"Tweets"} />
                    <FeedNavLink route={"replies"} title={"Respostas"} />
                    <FeedNavLink route={"media"} title={"Mídia"} />
                    <FeedNavLink route={"likes"} title={"Curtidas"} />
                </FeedNav>
            </ProfileHeaderWrapper>
            <Outlet />
        </HeaderContainer>
    );
}