const pinataKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const pinataSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET || "";

import axios from "axios";

export const pinJSONToIPFS = async json => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  return axios
    .post(url, json, {
      headers: {
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret,
      },
    })
    .then(res => res.data.IpfsHash)
    .catch(err => console.error(err));
};

export const pinFileToIPFS = async (file, pinataMetadata) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  let data = new FormData();
  data.append("file", file);
  data.append("pinataMetadata", JSON.stringify(pinataMetadata));

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(res => res.data.IpfsHash)
    .catch(err => console.error(err));
};
