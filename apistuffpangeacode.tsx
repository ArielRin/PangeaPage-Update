

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
//



<p className="descriptionsml">
 Current Price of $PRT: {tokenPriceUSD}
</p>

<p className="descriptionsml">
Initial Supply: {INITIAL_SUPPLY.toLocaleString()}
</p>
<p className="descriptionsml">
       Remaining Supply: {totalSupply}
</p>
<p className="descriptionsml">
         Tokens Removed from Supply: {tokensRemoved}
</p>
