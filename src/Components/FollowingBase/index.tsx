import { ProfileImage } from "../ProfileImage";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { ProfileWrapper } from "../ProfileWrapper";
import { ProfileData, Wrapper } from "../Tweet/styles";
import { TweetReactions } from "../TweetReactions";
import { TweetText } from "../TweetText";
import { TweetWrapper } from "../TweetWrapper";

export function FollowingBase() {
    return (
        <>
            <TweetWrapper noBorder>
                <ProfileWrapper>
                    <ProfileImage />
                </ProfileWrapper>
                <Wrapper>
                    <ProfileData>
                        <ProfileName
                            $name="Nome de Usuário"
                        />
                        <ProfileUsername
                            $userName="@nomedousuario"
                        />
                    </ProfileData>
                    <div>
                        <TweetText
                            $writeTweet="Esse é o novo Tweet Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo."
                        />
                    </div>
                    <div>
                        <TweetReactions
                            $showTrashIcon={false}
                            $textReplay={"1.111"}
                            $textLike={"1.111"}
                            $textGraphLine={"215 mil"}
                        />
                    </div>
                </Wrapper>
            </TweetWrapper>

            <TweetWrapper noBorder>
                <ProfileWrapper>
                    <ProfileImage />
                </ProfileWrapper>
                <Wrapper>
                    <ProfileData>
                        <ProfileName
                            $name="Nome de Usuário"
                        />
                        <ProfileUsername
                            $userName="@nomedousuario"
                        />
                    </ProfileData>
                    <div>
                        <TweetText
                            $writeTweet="Esse é o novo Tweet Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, ligula nec tempus gravida, nulla massa vehicula purus, eget iaculis dui arcu ac quam. Aliquam ac lobortis justo."
                        />
                    </div>
                    <div>
                        <TweetReactions
                            $showTrashIcon={false}
                            $textReplay={"1.111"}
                            $textLike={"1.111"}
                            $textGraphLine={"215 mil"}
                        />
                    </div>
                </Wrapper>
            </TweetWrapper>
        </>

    );
}