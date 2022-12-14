/* eslint-disable */
import React, { useState } from 'react';
import FakeNewsApp from '../contracts/FakeNewsApp.json';
import { Web3Context } from './index';
import Web3 from 'web3';

const Web3Provider = ({ children }) => {
  //const [chainId,setChain]=useState("")
  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });
  const [Contract, setContract] = useState('');

  // const connectWeb3 = new Promise(async (resolve) => {
  //   const web3 = await getWeb3();
  //   resolve(web3);
  // });
  //Connect Wallet utility
 // const randomNumber = Math.round(Math.random() * 1000000);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      // console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      // console.log('We have the ethereum object');
    }
    var web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain = await web3.eth.getChainId()
    //setChain(chain)
    // console.log('chain ID:', chain);
     setAccount({
        accounts: accounts,
        currentAccount: accounts[0],
      });

    if (accounts.length !== 0) {
      //const account = accounts[0];
      // console.log('Found an authorized account:', account);
     
      //console.log(chain)
      getContract(chain);
    } else {
      console.log('No authorized account found');
    }
  };
  const getContract = (chain) => {
    //console.log(provider,signer);
    var web3 = new Web3(window.ethereum);
    
    //const networkId = await web3.eth.net.getId();
    const deployedNetwork = FakeNewsApp.networks[chain];

    const instance = new web3.eth.Contract(
      FakeNewsApp.abi,
      deployedNetwork && deployedNetwork.address
    );
    //console.log(account.currentAccount)

    //console.log(instance)
    setContract(instance);
  };

  return (
    <Web3Context.Provider
      value={{ connectWallet, checkIfWalletIsConnected, account, Contract }}
    >
      {children}
    </Web3Context.Provider>
  );
};
export default Web3Provider;
