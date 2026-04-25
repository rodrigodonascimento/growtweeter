
import { ProfileImage } from "../ProfileImage";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { ProfileWrapper } from "../ProfileWrapper";
import { TweetReactions } from "../TweetReactions";
import { TweetText } from "../TweetText";
import { TweetWrapper } from "../TweetWrapper";
import { VerifieldBadge } from "../VerifiedBadge";
import { ProfileData, Wrapper } from "./styles";

export function Tweet() {
    return (
        <>
            <TweetWrapper noBorder>
                <ProfileWrapper $hasReplay>
                    <ProfileImage />
                </ProfileWrapper>
                <Wrapper>
                    <ProfileData>
                        <ProfileName $name={"Nome do usuário"} />
                        <VerifieldBadge></VerifieldBadge>
                        <ProfileUsername $userName={"@nomedousuario"} $dateCreated={" • 8 de abr"}></ProfileUsername>
                    </ProfileData>
                    <div>
                        <TweetText $writeTweet="Esse é o novo Tweet Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo." />
                    </div>
                    <div>
                        <TweetReactions $showTrashIcon $textReplay={"1"} $textLike={"10"} $textGraphLine={"1.500"}></TweetReactions>
                    </div>
                </Wrapper>
            </TweetWrapper>
            <TweetWrapper noBorder={false}>
                <ProfileWrapper>
                    <ProfileImage />
                </ProfileWrapper>
                <Wrapper>
                    <ProfileData>
                        <ProfileName $name={"Nome do usuário"} />
                        <VerifieldBadge></VerifieldBadge>
                        <ProfileUsername $userName={"@nomedousuario"} $dateCreated={" • 8 de abr"}></ProfileUsername>
                    </ProfileData>
                    <div>
                        <TweetText $writeTweet="Esse é o novo Tweet Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo." />
                    </div>
                    <div>
                        <TweetReactions $showTrashIcon $textReplay={"1"} $textLike={"10"} $textGraphLine={"1.500"}></TweetReactions>
                    </div>
                </Wrapper>
            </TweetWrapper>
        </>
    );
}