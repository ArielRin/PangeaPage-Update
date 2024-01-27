import { ConnectWallet } from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';


import "./styles/Home.css";

const TOKEN_ADDRESS = '0xd8b9e0993fce7d05b3f11d828cf52d17637142ca'; //og pangea ca

// import abiFile from './abiFile.json';
const TOKEN_IMAGE = 'https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Web/pangeapage/src/pangearnd.png';
const TOKEN_SYMBOL = 'PRT';
const TOKEN_DECIMALS = 18;

const INITIAL_SUPPLY = 1000000; //  set at 1,000,000

import bannerImage from './images/banner1.png'; //
import gregImage from './images/greg.jpg'; //
import mattImage from './images/matt.jpg';
import backgroundImage from './images/bkg.gif';

import logo3 from './images/3.png';
import logo5 from './images/5.png';
import logo6 from './images/6.png';
import logoBitv from './images/bitv.png'; //
import logoSmart from './images/smart.png'; //
import logoDh from './images/dh.png';    //

import twitterImage from './images/twitter.png';
import telegramImage from './images/telegram.png';
import binanceImage from './images/binance.png';
import githubImage from './images/github.png';

import nft1 from './images/NFT_Pangea-1.jpg';
import nft2 from './images/NFT_Pangea-2.jpg';
import nft3 from './images/NFT_Pangea-3.jpg';


import pangeaToken from './images/pangea.png';




export default function Home() {

  const appStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      backgroundPosition: 'center',

    };





// add token to metamask
// ##############################################################
// ##############################################################
const handleAddToken = () => {
  if (window.ethereum) {
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: TOKEN_ADDRESS,
          symbol: TOKEN_SYMBOL,
          decimals: TOKEN_DECIMALS,
          image: 'https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Web/pangeapage/src/pangearnd.png',
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log('Token successfully added to wallet!');
      } else {
        console.log('Token not added to wallet.');
      }
    })
    .catch(console.error);
  } else {
    console.log('MetaMask is not installed!');
  }
};

 // ##############################################################
 // ##############################################################
 const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: TOKEN_ADDRESS,
              symbol: TOKEN_SYMBOL,
              decimals: TOKEN_DECIMALS,
              image: 'https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Web/pangeapage/src/pangearnd.png',
            },
          },
        });

        if (wasAdded) {
          console.log('Token was added to wallet!');
        } else {
          console.log('Token was not added to wallet.');
        }
      } catch (error) {
        console.error('Error adding token to wallet', error);
      }
    } else {
      console.log('Ethereum object does not exist!');
    }
  };

 // ##############################################################





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


//fetch  supply data of PRT
// ##############################################################
// ##############################################################
const [totalSupply, setTotalSupply] = useState('Loading...');
  const [tokensRemoved, setTokensRemoved] = useState('Calculating...');

  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${TOKEN_ADDRESS}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.attributes && data.data.attributes.total_supply) {
          const totalSupplyWei = data.data.attributes.total_supply;
          const totalSupplyEth = totalSupplyWei / 1e18; // Convert wei to ether
          setTotalSupply(totalSupplyEth.toLocaleString(undefined, { maximumFractionDigits: 2 }));

          // Calculate tokens removed from supply
          const removedTokens = INITIAL_SUPPLY - totalSupplyEth;
          setTokensRemoved(removedTokens.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        } else {
          setTotalSupply('Data not available');
          setTokensRemoved('Data not available');
        }
      })
      .catch(error => {
        console.error('Error fetching total supply:', error);
        setTotalSupply('Error fetching data');
        setTokensRemoved('Error fetching data');
      });
  }, []);
// ##############################################################
// ##############################################################

// copy token address to memory
// ##############################################################
// ##############################################################
const [copySuccess, setCopySuccess] = useState('');

const copyToClipboard = () => {
  navigator.clipboard.writeText(TOKEN_ADDRESS)
    .then(() => {
      setCopySuccess('Address Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy');
    });
};

// ##############################################################
// ##############################################################

// fetch marketcap from api
// ##############################################################
// ##############################################################
const [marketCap, setMarketCap] = useState('Loading...');
const [totalReserveInUSD, setTotalReserveInUSD] = useState('Loading...');

// ... (existing useEffect hooks)

// Fetch Market Cap and Total Reserve data
useEffect(() => {
  const url = "https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.attributes) {
        if (data.data.attributes.fdv_usd) {
          const fdvUsd = data.data.attributes.fdv_usd;
          setMarketCap(`${parseFloat(fdvUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`); // Format as currency
        } else {
          setMarketCap('Market Cap not available');
        }

        if (data.data.attributes.total_reserve_in_usd) {
          const reserveUsd = data.data.attributes.total_reserve_in_usd;
          setTotalReserveInUSD(`${parseFloat(reserveUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`); // Format as currency
        } else {
          setTotalReserveInUSD('Total Reserve not available');
        }
      } else {
        setMarketCap('Data not available');
        setTotalReserveInUSD('Data not available');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setMarketCap('Error fetching data');
      setTotalReserveInUSD('Error fetching data');
    });
}, []);
  // ##############################################################
  // ##############################################################


    // ##############################################################
    // ##############################################################

const [totalLiquidityUSD, setTotalLiquidityUSD] = useState('Loading...');

useEffect(() => {
  if (totalReserveInUSD !== 'Loading...' && totalReserveInUSD !== 'Total Reserve not available' && totalReserveInUSD !== 'Error fetching data') {
    // Extract the number from the formatted currency string
    const reserveValue = Number(totalReserveInUSD.replace(/[^0-9.-]+/g, ""));
    const liquidityValue = reserveValue * 2;
    setTotalLiquidityUSD(`${liquidityValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`); // Format as currency
  }
}, [totalReserveInUSD]); // Dependency on totalReserveInUSD








  return (
    <main className="main">
  <div style={appStyle}>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#tokenomics">Token</a></li>
          <li><a href="#nft">NFT</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="https://pancakeswap.finance/swap?outputCurrency=0xd8b9e0993fce7d05b3f11d828cf52d17637142ca&chainId=56">Buy Now</a></li>
        </ul>
      </nav>
      <div className="container">



        <div className="header">
          <h1 className="title">
            Maximize Investments with Pangea Rewards.
          </h1>
          <p className="outlined-text2 ">
            Experience Exclusive Benefits: Get 9% BNB returns with minimal tax impact through Pangea Rewards. Join now!
          </p>

                    <a href="https://pancakeswap.finance/swap?outputCurrency=0xd8B9E0993fce7d05b3F11D828Cf52D17637142Ca" target="_blank" rel="noopener noreferrer" className="button-link">
            Buy Tokens
          </a>
          <a href="https://pangealasvegas.com/#/main/mint" target="_blank" rel="noopener noreferrer" className="button2">
            Mint NFTs
          </a>
        </div>

     <div class="section-container">
    <div class="column">


          {/* About Section */}
          <section id="about" className="partner-section">
              <p className="outlined-text2">
                 Welcome
              </p>
              <p className="descriptionsml">
              Exclusive rewards await you. Our Pangea Rewards Token (PRT) holders enjoy a unique 9% return in BNB, including an additional 1% bonus on each sale. This high-yield benefit is coupled with low tax implications, ensuring your gains are maximized without heavy tax burdens. Our exclusive lounge is more than just an investment; it's an elite experience.
              Accessing these privileges is simple. Just own our exclusive NFT and hold a minimum of $50 in PRT. This small investment opens doors to higher BNB rewards and a smart financial journey in our community. Join us with a $50 PRT investment, secure your NFT, and start enjoying an enhanced 9% return in BNB on your transactions, all with the assurance of minimized taxes.
              </p>

              <div class="token-icon-container">
  <img src={pangeaToken} alt="Token Icon" class="token-icon" />
</div>

          </section>
    </div>



    <div class="column">


          <section id="tokenomics" className="black-section">
              <p className="outlined-text2">
                Pangea Rewards Token
              </p>

                   <p className="contract">
                     <a href="#!" onClick={() => copyToClipboard(TOKEN_ADDRESS)}>0xd8b9e0993fce7d05b3f11d828cf52d17637142ca</a>
                   </p>
                       {copySuccess && <div>{copySuccess}</div>}

              <p className="descriptiontoken">
                   Symbol: $PRT
              </p>
              <p className="descriptiontoken">
                   Current Value: ${tokenPriceUSD}
              </p>
              <p className="descriptiontoken">
                   Current Market Cap: {marketCap}
              </p>
              <p className="descriptiontoken">
                   Total Liquidity: {totalLiquidityUSD}
              </p>
              <p className="descriptionsml">
                  For purchases, enjoy a 6% allocation with 4% in BNB rewards, 1% contributed to liquidity, and 1% for buybacks and token burning (triggered at a 500-token threshold). On sales, benefit from a 7% distribution, including 4% in BNB rewards, 1% shared with NFT holders maintaining $50.00 in tokens, 1% towards liquidity, and another 1% for buybacks and burning, also activated at 500 tokens.
              </p>


              <p className="descriptionsmlnsapce">
                  Initial Supply: {INITIAL_SUPPLY.toLocaleString()}
              </p>
              <p className="descriptionsmlnsapce">
                 Remaining Supply: {totalSupply}
              </p>
              <p className="descriptionsmlnsapce">
                         Tokens Removed from Supply: {tokensRemoved}
              </p>
              <button className="button2" onClick={addTokenToWallet}>
                Add Token to Wallet
              </button>
              <button className="button" onClick={copyToClipboard}>Copy Address</button>
                {copySuccess && <div>{copySuccess}</div>}
          </section>
    </div>
</div>



<section id="tokenlinks" className="black-section">
   <div className="link-container">
     <p><a href="https://pancakeswap.finance/swap?outputCurrency=0xd8b9e0993fce7d05b3f11d828cf52d17637142ca&chainId=56" target="_blank" rel="noopener noreferrer">Buy Token</a></p>
     <p><a href="https://bscscan.com/token/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca#code" target="_blank" rel="noopener noreferrer">BSC Scan</a></p>
     <p><a href="https://pancakeswap.finance/v2/add/BNB/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca" target="_blank" rel="noopener noreferrer">Add to LP</a></p>
     <p><a href="https://dexscreener.com/bsc/0xad80fdc107d983cd76bec153abc00ff00e3477de" target="_blank" rel="noopener noreferrer">Chart</a></p>
   </div>
</section>


     <div id="dexscreener-embed">
        <iframe
          src="https://dexscreener.com/bsc/0xaD80FDC107d983Cd76BEc153abC00ff00E3477DE?embed=1&theme=dark&trades=0&info=0"
          title="DexScreener"
          allowFullScreen>
        </iframe>
      </div>

     {/* NFT Section */}
     <section id="nft" className="nft-section">
          <p className="outlined-text2 ">
            Pangea NFT Collection
          </p>
          <p className="descriptionsml">
            The Pangea Las Vegas Lounge NFT series showcases a stunning falcon perched on a globe. Owning these NFTs brings continuous rewards simply for holding them. This collection represents a fusion of art and innovation, providing owners with exclusive benefits such as VIP experiences. Become a part of this community today to acquire a distinctive artwork and enjoy ongoing rewards. Additionally, 1% of sales proceeds are distributed to NFT holders. Each NFT is priced at $50.00, and holders are also required to maintain a $50.00 holding in Pangea tokens.
          </p>
          <a href="https://pangealasvegas.com/#/main/mint" target="_blank" rel="noopener noreferrer" className="button-link">
  Mint NFTs
</a>

     <p className="outlined-text2 ">

     </p>
     </section>

      {/* Partners Section */}
     <section id="partners" className="black-section">
         <p className="outlined-text2">
             Our Partners
         </p>
         <p className="descriptionsml">
           Achieve Great Things Together!
         </p>
         <div className="partner-container">
             <div className="partner-logo">
                 <img src={logo3} alt="Partner Logo 3" className="partner-logo-image" />
             </div>
             <div className="partner-logo">
                 <img src={logo5} alt="Partner Logo 5" className="partner-logo-image" />
             </div>
             <div className="partner-logo">
                 <img src={logo6} alt="Partner Logo 6" className="partner-logo-image" />
             </div>
             <div className="partner-logo">
                 <img src={logoBitv} alt="Partner Logo Bitv" className="partner-logo-image" />
             </div>
             <div className="partner-logo">
                 <img src={logoSmart} alt="Partner Logo Smart" className="partner-logo-image" />
             </div>
             <div className="partner-logo">
                 <img src={logoDh} alt="Partner Logo Dh" className="partner-logo-image" />
             </div>
         </div>
     </section>

      {/* Team Section */}

     <section id="team" className="partner-section">
    <p className="description">
        Pangea Team
    </p>
    <p className="descriptionsml">
      The team behind Pangea Las Vegas Token is comprised of seasoned experts who are deeply passionate about blockchain and cryptocurrency. They prioritize transparency and active community involvement, committing themselves to providing an exceptional user experience.
    </p>
    <div className="team-container">
        <div className="team-member">
            <img src={gregImage} alt="Greg" className="team-member-image" />
            <p className="team-member-name">Greg</p>
        </div>
        <div className="team-member">
            <img src={mattImage} alt="Matt" className="team-member-image" />
            <p className="team-member-name">Matt</p>
        </div>
    </div>
    <p className="description">
    </p>
</section>

    </div>


         {/* Partners Section */}
         <section id="footer" className="footer-section">
              <p className="contract">
                <a href="#!" onClick={() => copyToClipboard(TOKEN_ADDRESS)}>0xd8b9e0993fce7d05b3f11d828cf52d17637142ca</a>
              </p>
                  {copySuccess && <div>{copySuccess}</div>}


                  <div className="social-links">
                  <a href="https://x.com/official92676?t=zCKg5fW5RcTPwp0EaLQbDg&s=09" target="_blank" rel="noopener noreferrer">
                  <img src={twitterImage} alt="Twitter" className="social-icon" />
                  </a>
                  <a href="https://t.me/PangeaLasVegasPRT" target="_blank" rel="noopener noreferrer">
                  <img src={telegramImage} alt="Telegram" className="social-icon" />
                  </a>
                  <a href="https://bscscan.com/token/0xd8b9e0993fce7d05b3f11d828cf52d17637142ca#code" target="_blank" rel="noopener noreferrer">
                  <img src={binanceImage} alt="Binance" className="social-icon" />
                  </a>
                  <a href="https://github.com/ArielRin/PangeaPage-Update" target="_blank" rel="noopener noreferrer">
                  <img src={githubImage} alt="GitHub" className="social-icon" />
                  </a>
                  </div>




               <p className="contract" >
                 The word Pangea comes from the ancient Greek, with pan meaning "all, entire, whole" and Gea meaning "Mother Earth, land". It was the name of the big single continent which existed many centuries ago.
               </p>
                    <p className="descriptionsmlfoot">
                    Pangea Rewards Token on Binance Smart Chain
                    </p>

                    <div className="connect">
                      <ConnectWallet
                        dropdownPosition={{
                          side: "bottom",
                          align: "center",
                        }}
                        theme={"dark"}
                        switchToActiveChain={true}
                        modalSize={"wide"}
                        welcomeScreen={{
                          img: {
                            src: "https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Images/pangearnd.png",
                            width: 150,
                            height: 150,
                          },
                          title: "Continue to Pangea ",
                        }}
                        modalTitleIconUrl={
                          "https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Images/pangeaaLogo.png"
                        }

                      />


                    </div>



                        <p className="contract"><a href="https://github.com/ArielRin/PangeaPage-Update/blob/master/readme.md#to-do--next-update"
                           target="_blank"
                           rel="noopener noreferrer">
                          **** DRAFT ONLY ****
                        </a></p>

                      <p className="contract"><a href="https://github.com/ArielRin/PangeaPage-Update/commits/master/"
                         target="_blank"
                         rel="noopener noreferrer">
                        Check progress here
                      </a></p>


                    <p className="contract">
                        <a href="https://t.me/InHausDevelopment/1"
                           target="_blank"
                           rel="noopener noreferrer"
                           >
                        Webpage Created by InHaus Development 2024
                        </a>
                    </p>



         </section>
</div>
</main>
  );
}



//
// <div className="banner-container">
//   <img src={bannerImage} alt="Banner" className="banner-image" />
// </div>
