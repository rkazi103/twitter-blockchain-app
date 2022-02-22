/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/sanityClient";
import groq from "groq";

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!currentAccount || appStatus !== "connected") return;
    getCurrentUserDetails(currentAccount);
    fetchTweets();
  }, [currentAccount, appStatus]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (err) {
      console.error(err);
      router.push("/");
      setAppStatus("error");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (err) {
      console.error(err);
      setAppStatus("error");
    }
  };

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const userDoc = {
        _type: "users",
        _id: userWalletAddress,
        name: "Unnamed",
        isProfileImageNft: false,
        profileImage:
          "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg",
        walletAddress: userWalletAddress,
      };

      await client.createIfNotExists(userDoc);

      setAppStatus("connected");
    } catch (error) {
      router.push("/");
      setAppStatus("error");
    }
  };

  const fetchTweets = async () => {
    const query = groq`
       *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `;

    client.fetch(query).then(data =>
      data.forEach(async item => {
        const newItem = {
          tweet: item.tweet,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            isProfileImageNft: item.author.isProfileImageNft,
            profileImage: item.author.profileImage,
          },
        };

        setTweets(prevState => [...prevState, newItem]);
      })
    );
  };

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== "connected") return;

    const query = groq`
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `;

    client.fetch(query).then(data =>
      setCurrentUser({
        tweets: data[0].tweets,
        name: data[0].name,
        profileImage: data[0].profileImage,
        isProfileImageNft: data[0].isProfileImageNft,
        coverImage: data[0].coverImage,
        walletAddress: data[0].walletAddress,
      })
    );
  };

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        setAppStatus,
        currentAccount,
        connectWallet,
        fetchTweets,
        tweets,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};
