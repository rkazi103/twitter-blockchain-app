import { BsStars } from "react-icons/bs";
import Post from "../components/Post";
import TweetBox from "../components/TweetBox";
import { tweets } from "../data/static";

const Feed = () => {
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
          displayName={tweet.displayName}
          userName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(
            41
          )}`}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default Feed;
