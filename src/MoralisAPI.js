import Moralis from "moralis/node";

export const moralisData = {
  serverUrl: process.env.REACT_APP_SERVER_URL,
  appId: process.env.REACT_APP_APP_ID,
};

const moralisConnector = {
  moralisData,
  moralisStartAndGetNFTs: getNFTs,
};

async function getNFTs(authorization) {
  let serverUrl = moralisData.serverUrl;
  let appId = moralisData.appId;
  Moralis.start({ serverUrl, appId });
  const NFTs = await Moralis.Web3API.account.getNFTs({
    chain: "polygon",
    address: authorization,
  });
  return NFTs;
}



export async function getAchievemnts(address){
  const achievements =[];
  const token_address="0x72b6dc1003e154ac71c76d3795a3829cfd5e33b9";
  const valid_tokens = ["11057"];

  const RawNFTs = await moralisConnector.moralisStartAndGetNFTs(address);
  console.log(RawNFTs);
  const NFTs = RawNFTs.result;
  for (let i = 0; i < NFTs.length; i++) {

    const metaData = JSON.parse(NFTs[i].metadata);


    // console.log(NFTs[i].token_id);
    // console.log(valid_tokens.includes( NFTs[i].token_id))

    // console.log( NFTs[i].token_address===token_address )
    // console.log(NFTs[i].token_address)
    // console.log(Boolean(metaData) )
    // console.log(Boolean(metaData.image))
    if (Boolean(metaData) && metaData.image && NFTs[i].token_address===token_address  && valid_tokens.includes( NFTs[i].token_id)) {
      console.log('entered')
      achievements.push({img:metaData.image, title:metaData.name, desc: metaData.description});
    }
  }
  console.log(achievements);

  return achievements;
}


