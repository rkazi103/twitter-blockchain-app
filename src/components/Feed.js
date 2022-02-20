import { BsStars } from "react-icons/bs";
import TweetBox from "./TweetBox";

const Feed = () => {
  return (
    <div className="flex-[2] overflow-y-scroll border-r border-l border-[#38444d] scrollbar-hide">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#15202b] p-4">
        <div className="text-xl font-bold">Home</div>
        <BsStars />
      </div>

      <TweetBox />
    </div>
  );
};

export default Feed;
