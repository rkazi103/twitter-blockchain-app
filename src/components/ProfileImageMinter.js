import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import InitialMintingState from "./InitialMintingState";
import LoadingMintingState from "./LoadingMintingState";
import FinishedMintingState from "./FinishedMintingState";
import { pinFileToIPFS, pinJSONToIPFS } from "../lib/pinata";
import { client } from "../lib/sanityClient";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../constants";

let metamask;
if (typeof window !== "undefined") metamask = window.ethereum;

const ProfileImageMinter = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("initial");
  const [profileImage, setProfileImage] = useState();
  const { setAppStatus, currentAccount } = useContext(TwitterContext);

  const getEthereumContract = async () => {
    if (!metamask) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionContract;
  };

  const mint = async () => {
    if (!name || !description || !profileImage) return;
    setStatus("loading");

    const pinataMetadata = {
      name: `${name} - ${description}`,
    };
    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetadata);

    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit();

    const imageMetadata = {
      name: name,
      description: description,
      image: `ipfs://${ipfsImageHash}`,
    };
    const ipfsJsonHash = pinJSONToIPFS(imageMetadata, pinataMetadata);

    const contract = await getEthereumContract();
    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    };

    try {
      await metamask.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("finished");
    }
  };

  const modalChildren = (modalStatus = status) => {
    switch (modalStatus) {
      case "initial":
        return (
          <InitialMintingState
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            mint={mint}
          />
        );

      case "loading":
        return <LoadingMintingState />;

      case "finished":
        return <FinishedMintingState />;

      default:
        router.push("/");
        setAppStatus("error");
        break;
    }
  };

  return <>{modalChildren()}</>;
};

export default ProfileImageMinter;
