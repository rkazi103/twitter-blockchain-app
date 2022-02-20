/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";

const ProfileHeader = () => {
  const router = useRouter();

  const isProfileImageNft = false;
  const currentAccount = "0x55648de19836338549130b1af587f16bea46f66b";

  return (
    <div className="border-b border-[#38444d]">
      <div className="mt-2 flex items-center py-1 px-3">
        <div
          className="mr-2 cursor-pointer rounded-full p-1 text-3xl hover:bg-[#313b44]"
          onClick={() => router.push("/")}
        >
          <BsArrowLeftShort />
        </div>

        <div className="px-3">
          <div className="bg-transparent font-bold outline-none">Rayan</div>
          <div className="text-xs text-[#8899a6]">3 Tweets</div>
        </div>
      </div>

      <div className="flex h-[15vh] items-center justify-center overflow-hidden">
        <img
          src="https://physicsworld.com/wp-content/uploads/2019/11/M-CC-BN-Header-twitter-1500x500.jpg"
          alt="Cover/Banner for profile"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="justify mt-[-3rem] mb-2 flex h-[6rem] w-full items-center justify-between rounded-full px-3">
        <div
          className={
            isProfileImageNft
              ? "hex"
              : "justify mt-[-3rem] mb-2 flex h-[6rem] w-full items-center justify-between rounded-full px-3"
          }
        >
          <img
            src="https://lh3.googleusercontent.com/ogw/ADea4I6ue6ul3ozCcUYNy63qPsdyJ5zRRK5GenxA4mELWg=s64-c-mo"
            alt=""
            className={
              isProfileImageNft
                ? "h-full object-cover"
                : "h-full rounded-full object-cover"
            }
          />
        </div>
      </div>

      <div className="px-3">
        <div>
          <div className="bg-transparent font-bold outline-none">Rayan</div>
        </div>
        <div className="text-xs text-[#8899a6]">
          {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(37)}
            </>
          )}
        </div>
      </div>

      <div className="mt-4 mb-2 flex justify-around text-xs font-semibold text-[#8899a6]">
        <div className="cursor-pointer text-white">Tweets</div>
        <div className="cursor-pointer">Tweets & Replies</div>
        <div className="cursor-pointer">Media</div>
        <div className="cursor-pointer">Likes</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
