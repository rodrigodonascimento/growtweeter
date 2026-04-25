import { ProfileImage } from "../ProfileImage";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { ProfileWrapper } from "../ProfileWrapper";
import { ProfileData, Wrapper } from "../Tweet/styles";
import { TweetReactions } from "../TweetReactions";
import { TweetText } from "../TweetText";
import { TweetWrapper } from "../TweetWrapper";
import { VerifieldBadge } from "../VerifiedBadge";

export function MyMedia() {
    return (
        <TweetWrapper>
            <ProfileWrapper >
                <ProfileImage />
            </ProfileWrapper>
            <Wrapper>
                <ProfileData>
                    <ProfileName
                        $name={"Nome do usuário"}
                    />
                    <VerifieldBadge />
                    <ProfileUsername
                        $userName={"@nomedousuario"}
                        $dateCreated={" • 8 de abr"}
                    />
                </ProfileData>
                <div>
                    <TweetText
                        $writeTweet={
                            "Aqui ficam os replies do próprio usuário com imagens e fotos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo.Esse é o novo Tweet Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo."
                        }
                    />
                </div>
                <div>
                    <TweetReactions
                        $showTrashIcon
                        $textReplay={"1"}
                        $textLike={"10"}
                        $textGraphLine={"1.500"}
                    />
                </div>
            </Wrapper>
        </TweetWrapper>
    );
}