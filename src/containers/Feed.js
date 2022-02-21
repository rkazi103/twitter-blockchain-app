import { BsStars } from "react-icons/bs";
import Post from "../components/Post";
import TweetBox from "../components/TweetBox";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";

const Feed = () => {
  const { tweets } = useContext(TwitterContext);

  return (
    <div className="flex-[2] overflow-y-scroll border-r border-l border-[#38444d] scrollbar-hide">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#15202b] p-4">
        <div className="text-xl font-bold">Home</div>
        <BsStars />
      </div>

      <TweetBox />

      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            tweet.author.name === "Unnamed"
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          userName={`${tweet.author.walletAddress.slice(
            0,
            4
          )}...${tweet.author.walletAddress.slice(41)}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default Feed;
