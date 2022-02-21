/* eslint-disable @next/next/no-img-element */
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState } from "react";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import { v4 as uuidv4 } from "uuid";
import { client } from "../lib/sanityClient";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const { currentAccount, currentUser } = useContext(TwitterContext);

  const postTweet = async event => {
    event.preventDefault();
    if (!tweetMessage) return;

    const tweetId = uuidv4();
    const tweetDoc = {
      _type: "tweets",
      _id: tweetId,
      tweet: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _key: tweetId,
        _ref: currentAccount,
        _type: "reference",
      },
    };

    await client.createIfNotExists(tweetDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert("after", "tweets[-1]", [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: "reference",
        },
      ])
      .commit();

    setTweetMessage("");
  };

  return (
    <div className="flex flex-row border-b border-[#38444d] px-4 pb-4">
      <div className="mr-4">
        <img
          src={currentUser.profileImage}
          alt="Profile Picture"
          className={
            currentUser.isProfileImageNft
              ? "height-12 smallHex w-12 rounded-full"
              : "height-12 w-12 rounded-full"
          }
        />
      </div>

      <div className="flex-1">
        <form action="">
          <textarea
            className="h-full w-full bg-transparent text-lg outline-none"
            placeholder="What's happening?"
            value={tweetMessage}
            onChange={e => setTweetMessage(e.target.value)}
          />

          <div className="flex">
            <div className="flex flex-1 items-center text-[#1d9bf0]">
              <BsCardImage className="mr-2" />
              <RiFileGifLine className="mr-2" />
              <RiBarChartHorizontalFill className="mr-2" />
              <BsEmojiSmile className="mr-2" />
              <IoMdCalendar className="mr-2" />
              <MdOutlineLocationOn className="mr-2" />
            </div>
            <button
              type="submit"
              disabled={!tweetMessage}
              onClick={e => postTweet(e)}
              className={`rounded-3xl px-6 py-2 font-bold ${
                tweetMessage
                  ? "bg-[#1d9bf0] text-white"
                  : "bg-[#196195] text-[#95999e]"
              }`}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
