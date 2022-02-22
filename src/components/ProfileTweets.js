import Post from "./Post";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";

const ProfileTweets = () => {
  const { currentAccount, currentUser } = useContext(TwitterContext);

  return (
    <div className="scrollbar-hide">
      {currentUser.tweets?.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            currentUser.name === "Unnamed"
              ? `${currentAccount.slice(0, 4)}...${currentAccount.slice(41)}`
              : currentUser.name
          }
          userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
            41
          )}`}
          avatar={currentUser.profileImage}
          text={tweet.tweet}
          isProfileImageNft={currentUser.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default ProfileTweets;
