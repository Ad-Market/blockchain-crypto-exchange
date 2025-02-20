import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import config from '../config.json' 

import { 
  loadProvider, 
  loadNetwork, 
  loadAccount, 
  loadTokens,
  loadExchange 
} 
  from '../store/interactions'


function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {

    //Connect ethers to blockchain
    const provider = loadProvider(dispatch)

    //Fetch current network chain ID (ex. hardhat: 31337, kovan: 42... )
    const chainId = await loadNetwork(provider, dispatch)

    //Fetch current account and balance from Metamask
    await loadAccount(provider, dispatch)

    //Load token smart contract
    const DAPP = config[chainId].DAPP
    const eETH = config[chainId].eETH

    await loadTokens(provider, [DAPP.address, eETH.address], dispatch)

    //Load exchange smart contract
    const exchangeConfig = config[chainId].exchange
    await loadExchange(provider, exchangeConfig.address, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;
