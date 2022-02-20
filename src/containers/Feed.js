import { BsStars } from "react-icons/bs";
import Post from "../components/Post";
import TweetBox from "../components/TweetBox";

const dummyTweets = [
  {
    displayName: "Rayan",
    userName: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    avatar:
      "https://lh3.googleusercontent.com/ogw/ADea4I6ue6ul3ozCcUYNy63qPsdyJ5zRRK5GenxA4mELWg=s64-c-mo",
    text: "good morning",
    isProfileImageNft: false,
    timestamp: "2015-03-04T00:00:00.000Z",
  },
  {
    displayName: "Rayan",
    userName: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    avatar:
      "https://lh3.googleusercontent.com/ogw/ADea4I6ue6ul3ozCcUYNy63qPsdyJ5zRRK5GenxA4mELWg=s64-c-mo",
    text: "good morning",
    isProfileImageNft: false,
    timestamp: "2021-03-04T00:00:00.000Z",
  },
  {
    displayName: "Rayan",
    userName: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    avatar:
      "https://lh3.googleusercontent.com/ogw/ADea4I6ue6ul3ozCcUYNy63qPsdyJ5zRRK5GenxA4mELWg=s64-c-mo",
    text: "good morning",
    isProfileImageNft: false,
    timestamp: "2016-04-04T00:00:00.000Z",
  },
];

const Feed = () => {
  return (
    <div className="flex-[2] overflow-y-scroll border-r border-l border-[#38444d] scrollbar-hide">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#15202b] p-4">
        <div className="text-xl font-bold">Home</div>
        <BsStars />
      </div>

      <TweetBox />

      {dummyTweets.map((tweet, index) => (
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
