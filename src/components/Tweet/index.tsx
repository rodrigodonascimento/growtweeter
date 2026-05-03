
import { useTweets } from "../../hooks/useTweets";
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
    onLike?: () => void;
    onUnlike?: () => void;
    onDelete?: () => void;
    onUpdate?: (updatedTweet: TweetInterface) => void;
    onAddReply?: (tweetId: string, newReply: TweetInterface) => void;
}

export function Tweet({ tweetData, isReply = false, onDelete, onUpdate, onAddReply, onLike, onUnlike }: TweetProps) {
    const { likeTweet, unlikeTweet } = useTweets();

    const formattedDate = formatRelativeDate(tweetData.createdAt);

    const showVerticalLine = isReply || (tweetData.replies && tweetData.replies.length > 0);

    const localLike = () => likeTweet(tweetData.id);
    const localUnlike = () => unlikeTweet(tweetData.id);

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
                            $userName={`@${tweetData.author?.username}`}
                            $dateCreated={` • ${formattedDate}`}
                        />
                    </ProfileData>
                    <TweetText $writeTweet={tweetData.content} />
                    <TweetReactions
                        tweetId={tweetData.id}
                        authorId={tweetData.author.id}
                        likes={tweetData.likes}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        content={tweetData.content}
                        hideReply={tweetData.type === 'REPLY'}
                        $textReplay={tweetData.replies?.length.toString() || '0'}
                        $textGraphLine={"1.500"}
                        onLike={onLike || localLike}
                        onUnlike={onUnlike || localUnlike}
                        onAddReply={(newReply: TweetInterface) => onAddReply?.(tweetData.id, newReply)} 
                        $textLike={""}                    />
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
                                onLike={onLike}
                                onUnlike={onUnlike}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                onAddReply={onAddReply}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
