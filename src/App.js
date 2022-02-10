import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import connectors from "./connectors.ts";
import { getAchievemnts } from "./MoralisAPI";
import { useWeb3React } from "@web3-react/core";
import { ChakraProvider, Stack, StackDivider, Button } from '@chakra-ui/react'
import MyNavbar from './components/Navbar';
import SplitScreen from "./components/SplitScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import runtrack from "./assets/runtrack.jpeg";
import jog from "./assets/jog.jpeg";
import win from "./assets/win.jpeg";


function App() {

  const { active, account, activate, deactivate } = useWeb3React();

  const [domain, setDomain] = useState("");

  const [achievement, setAchievement] = useState([]);



  function createConnectHandler(connectorId) {
    return async () => {
      try {
        const connector = connectors[connectorId];
        if (connector.walletConnectProvider?.wc?.uri) {
          connector.walletConnectProvider = undefined;
        }

        await activate(connector);
        const account = await connector.getAccount();
        setDomain(connector.uauth.store.storage["uauth-default-username"]);
        setAchievement(await getAchievemnts(account));

      } catch (error) {
        console.error(error);
      }
    };
  }

  async function handleDisconnect() {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ChakraProvider>

      <div>
        {!active &&
          <div>
            <MyNavbar active={active} onClickLogin={createConnectHandler('uauth')} />
            <Stack spacing={100} divider={<StackDivider borderColor='gray.600' />}>
              <SplitScreen imgRight={true} 
             title1="Start" title2='Racing'
             desc="Start one of our races and win NFT rewards for your efforts"           img={runtrack}
              />
              <SplitScreen title1="Win or Lose" title2="You'll have fun!"
                desc="And once the race has ended we will reward you with a beautiful NFT to celebrate your effort!" img={jog}

              />
              <SplitScreen imgRight={true}
                title1="Enjoy" title2='Your Prize'
                desc="You can view all of you won NFTs in using this platform and enjoy them any time you want" img={win} />
            </Stack>
          </div>}


        {active &&
          <div>
            <MyNavbar active={active} address={domain} onClickLogout={() => handleDisconnect()} />
            <Stack spacing={100} divider={<StackDivider borderColor='gray.600' />}>
              {achievement.map((src) => {
                return <SplitScreen imgRight={true} title1={src.title}
                  title2={src.desc}
                  img={src.img}
                />
              })}
            </Stack>
          </div>
        }
      </div>
    </ChakraProvider>
  );
}

export default App;
