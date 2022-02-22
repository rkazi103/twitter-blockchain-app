import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import InitialMintingState from "./InitialMintingState";
import LoadingMintingState from "./LoadingMintingState";
import FinishedMintingState from "./FinishedMintingState";

const ProfileImageMinter = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("initial");
  const [profileImage, setProfileImage] = useState();
  const { setAppStatus } = useContext(TwitterContext);

  const mint = async () => {
    if (!name || !description || !profileImage) return;
    setStatus("loading");
  };

  const renderLogic = (modalStatus = status) => {
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

  return <>{renderLogic()}</>;
};

export default ProfileImageMinter;
