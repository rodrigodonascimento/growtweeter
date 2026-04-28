
import type { TweetInterface } from "../../types/tweets";
import { formatRelativeDate } from "../../utils/formatDate";
import { ProfileImage } from "../ProfileImage";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { ProfileWrapper } from "../ProfileWrapper";
import { TweetReactions } from "../TweetReactions";
import { TweetText } from "../TweetText";
import { TweetWrapper } from "../TweetWrapper";
import { VerifieldBadge } from "../VerifiedBadge";
import { ProfileData, Wrapper } from "./styles";

interface TweetProps {
    tweetData: TweetInterface;
    isReply: boolean;
}

export function Tweet({ tweetData, isReply = false }: TweetProps) {
    const formattedDate = formatRelativeDate(tweetData.createdAt);

    // Verifica se o tweet deve mostar a linha vertical se reply
    const showVerticalLine = isReply || (tweetData.replies && tweetData.replies.length > 0);

    return (
        <>
            <TweetWrapper noBorder={showVerticalLine}>
                <ProfileWrapper $hasReplay={showVerticalLine}>
                    <ProfileImage $urlImage={tweetData.author?.imageUrl} />
                </ProfileWrapper>
                <Wrapper>
                    <ProfileData>
                        <ProfileName $name={tweetData.author?.name} />
                        <VerifieldBadge />
                        <ProfileUsername
                            $userName={`@${tweetData.author?.name}`}
                            $dateCreated={` • ${formattedDate}`}
                        />
                    </ProfileData>
                    <TweetText $writeTweet={tweetData.content} />
                    <TweetReactions
                        tweetId={tweetData.id}
                        authorId={tweetData.author.id}
                        likes={tweetData.likes}
                        $textReplay={tweetData.replies?.length.toString() || '0'}
                        $textGraphLine={"1.500"} content={""}                    />
                </Wrapper>
            </TweetWrapper>
            {tweetData.replies && tweetData.replies.length > 0 && (
                <div className="replies-container">
                    {tweetData.replies.map((reply, index) => {
                        const isLastReply = index === tweetData.replies.length - 1;

                        return (
                            <Tweet
                                key={reply.id}
                                tweetData={reply}
                                isReply={!isLastReply}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}