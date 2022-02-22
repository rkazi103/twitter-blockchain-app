import Head from "next/head";
import Feed from "../containers/Feed";
import Sidebar from "../containers/Sidebar";
import Widgets from "../containers/Widgets";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Image from "next/image";
import errorImg from "../assets/error.png";
import metamaskLogo from "../assets/metamask.png";

export default function Home() {
  const { appStatus, connectWallet } = useContext(TwitterContext);

  const app = (status = appStatus) => {
    switch (status) {
      case "connected":
        return userLoggedIn;

      case "notConnected":
        return noUserFound;

      case "noMetaMask":
        return noMetaMaskFound;

      case "error":
        return error;

      default:
        return loading;
    }
  };
  const userLoggedIn = (
    <div className="flex w-3/4 max-w-[1400px] justify-between">
      <Sidebar initialSelectedIcon={"Home"} />
      <Feed />
      <Widgets />
    </div>
  );

  const noUserFound = (
    <div className="flex h-full w-full flex-col items-center justify-center pb-48">
      <Image src={metamaskLogo} alt="Metamask Logo" width={200} height={200} />
      <div
        className="mb-[-3rem] mt-[3rem] cursor-pointer rounded-full bg-white px-6 py-4 text-2xl font-bold text-black hover:bg-[#d7dbdc]"
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className="mt-24 text-center text-3xl font-bold">
        Connect to Metamask.
      </div>
    </div>
  );

  const noMetaMaskFound = (
    <div className="flex h-full w-full flex-col items-center justify-center pb-48">
      <Image src={metamaskLogo} alt="Metamask Logo" width={200} height={200} />
      <div className="mt-24 text-center text-3xl font-bold">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  );

  const error = (
    <div className="flex h-full w-full flex-col items-center justify-center pb-48">
      <Image src={errorImg} alt="Error" width={250} height={200} />
      <div className="mt-24 text-center text-3xl font-bold">
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  );

  const loading = (
    <div className="flex h-full w-full flex-col items-center justify-center pb-48">
      <div className="mt-24 text-center text-3xl font-bold">Loading...</div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen select-none justify-center overflow-hidden bg-[#15202b] text-white">
      <Head>
        <title>Twitter Blockchain</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {app(appStatus)}
    </div>
  );
}
