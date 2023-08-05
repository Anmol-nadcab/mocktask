import Web3 from "web3";
import {exchange_contract_abi,exchange_contract_address }from './config.js'
const web3 = new Web3(Web3.givenProvider );
const exchange_contract = new web3.eth.Contract(exchange_contract_abi,exchange_contract_address);

const chainId = "0xfa2" // Polygon Mainnet

const checkNetwork = (async ()=>{
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId:"0xfa2" }]
      });
    } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Fantom Network',
              chainId:"0xfa2",
              nativeCurrency: { name: 'FTMT', decimals: 18, symbol: 'FTM' },
              rpcUrls: ['https://testnet.ftmscan.com']
            }
          ]
        });
      }
    }
  }
})

export async function startNow() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        checkNetwork()
        // try {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async function (address) {
              const userAddress = address[0];
               console.log("asda",  userAddress);
              resolve({
                userAddress,
                web3,
                exchange_contract,
              });
              window.ethereum.on("accountsChanged", function (accounts) {
                window.location.reload();
              });
            }).catch((err)=>{
console.log(err)
            })
        }
 
        
      else{
        alert("Wallet Not Found");
      }
    });
  }

