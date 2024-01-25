import { ConnectWallet } from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';

import "./styles/Home.css";

const TOKEN_ADDRESS = '0xd8b9e0993fce7d05b3f11d828cf52d17637142ca '; //og pangea ca
import abiFile from './abiFile.json';


export default function Home() {


//fetch token pricePerToken in usd PRT
// ##############################################################
// ##############################################################
  const [tokenPriceUSD, setTokenPriceUSD] = useState('Loading...');
    const tokenAddress = '0xd8b9e0993fce7d05b3f11d828cf52d17637142ca'; // token address for pricefeed

    useEffect(() => {
      const url = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${tokenAddress}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.data && data.data.attributes && data.data.attributes.token_prices) {
            const price = data.data.attributes.token_prices[tokenAddress];
            setTokenPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
          } else {
            setTokenPriceUSD('Price not available');
          }
        })
        .catch(error => {
          console.error('Error fetching token price:', error);
          setTokenPriceUSD('Error fetching price');
        });
    }, []);
// ##############################################################
// ##############################################################
//


  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Maximize Rewards: Ama Lounge NFT Token with 9% BNB Rewards, Low Taxes
          </h1>
          <p className="description">
            Unlock rewards: Ama Lounge NFT token offers 9% BNB rewards with low taxes. Join now!
          </p>
        <p className="descriptionsml">
           Current Price of $PRT: {tokenPriceUSD}
        </p>
        </div>

                  <div className="connect">
                    <ConnectWallet
                      dropdownPosition={{
                        side: "bottom",
                        align: "center",
                      }}
                    />
                  </div>

        <div className="links">
          <p><a href="https://pancakeswap.finance/swap?outputCurrency=0xd8b9e0993fce7d05b3f11d828cf52d17637142ca&chainId=56"
             target="_blank"
             rel="noopener noreferrer">
            Buy Token
          </a></p>
          <p><a href="https://pangealasvegas.com/#/main/mint"
             target="_blank"
             rel="noopener noreferrer">
            Mint NFTs
          </a></p>

          <p className="description">
            About
          </p>
          <p className="descriptionsml">
            Welcome to the Ama Lounge, where we have something special to offer you. Our lounge introduces a unique token that grants exclusive benefits to its holders. To obtain this token, all you need is our one-of-a-kind NFT and a minimum investment of $50.00 worth of PRT. By holding our remarkable NFT and meeting the specified investment threshold, you unlock a world of advantages. One of the most significant benefits is the extra 1% reward in BNB that you receive on every sell transaction. This additional reward boosts your total earnings to an impressive 9% in BNB, creating an opportunity for substantial returns. But it doesn't stop there. We understand the importance of keeping taxes in check while maximizing your rewards. That's why we have designed our system in a way that ensures relatively low tax implications for our token holders. This way, you can enjoy the benefits of our lounge without worrying about excessive tax burdens. Imagine lounging in our exclusive space, knowing that your investment is not only safeguarded but also generating exceptional rewards. With our token, you become a part of an elite community that enjoys the perks of additional BNB rewards, amplifying your overall gains. So, step into the Ama Lounge, secure your one-of-a-kind NFT, invest $50.00 worth of PRT, and experience the satisfaction of earning an extra 1% reward in BNB on every sell transaction. With a total rewards package of 9% in BNB and a focus on maintaining low taxes, we ensure that your journey in our lounge is not only rewarding but also financially savvy.
          </p>


          <p className="description">
            Tokenomics
          </p>
            <p><a href="https://pancakeswap.finance/swap?outputCurrency=0xd8b9e0993fce7d05b3f11d828cf52d17637142ca&chainId=56"
               target="_blank"
               rel="noopener noreferrer">
              Buy Token
            </a></p>
            <p><a href="https://bscscan.com/token/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca#code"
               target="_blank"
               rel="noopener noreferrer">
              BSC Scan
            </a></p>
          <p><a href="https://pancakeswap.finance/v2/add/BNB/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca"
             target="_blank"
             rel="noopener noreferrer">
            Add Liquidity
          </a></p>
            <p><a href="https://dexscreener.com/bsc/0xad80fdc107d983cd76bec153abc00ff00e3477de"
               target="_blank"
               rel="noopener noreferrer">
              Dex Screener
            </a></p>
          <p className="descriptionsml">
            6% on buys 4% in bnb rewards 1% to liquidity 1% to buy back and burn threshold to burn will be 500 tokens. 7% on sells 4% in bnb rewards 1% to nft holders that hold 50.00 in tokens 1% to liquidity 1% to buy back and burn threshold to burn 500 tokens.
          </p>


          <p className="description">
            Pangea NFT Collection
          </p>
          <p className="descriptionsml">
            NFT collection for Pangea Las Vegas Lounge features a majestic falcon atop the globe. Holders of the NFTs are rewarded just by holding them. It's a community of art and innovation, offering exclusive perks like VIP experiences. Join now to own a unique piece of art and earn rewards over time. 1% of sells will go to NFT holders. NFT’s are 50.00, and one must hold 50.00 of Pangea token as well.
          </p>
          <p><a href="https://pangealasvegas.com/#/main/mint"
             target="_blank"
             rel="noopener noreferrer">
            Mint NFTs
          </a></p>


          <p className="description">
            Our Partners
          </p>
          <p className="descriptionsml">
            Achieve Great Things Together!
          </p>


          <p className="description">
            Pangea Team
          </p>
          <p className="descriptionsml">
            The Pangea Las Vegas Token team consists of experienced professionals with a passion for blockchain and cryptocurrency. With a focus on transparency and community engagement, the team is dedicated to delivering the best possible user experience.
          </p>
          <p className="descriptionsml">
            Greg
          </p>
          <p className="descriptionsml">
            Matt
          </p>


          <p className="description">
             .
          </p>
          <p className="descriptionsml">
            Footer The word Pangea comes from the ancient Greek, with pan meaning "all, entire, whole" and Gea meaning "Mother Earth, land". It was the name of the big single continent which existed many centuries ago.
          </p>
        <p><a href="https://x.com/official92676?t=zCKg5fW5RcTPwp0EaLQbDg&s=09"
           target="_blank"
           rel="noopener noreferrer">
          X (Twitter)
        </a></p>
        <p><a href="https://t.me/PangeaLasVegasPRT"
           target="_blank"
           rel="noopener noreferrer">
          Telegram Channel
        </a></p>
      <p><a href="https://github.com/ArielRin/PangeaPage-Update"
         target="_blank"
         rel="noopener noreferrer">
        Github
      </a></p>

        </div>

      </div>
    </main>
  );
}
