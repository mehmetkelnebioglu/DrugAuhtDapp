import React,{Children, createContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import DrugAuth from '../contracts/DrugAuth.json';

const Web3DataContext = createContext(null);

 function Web3DataProvider ( {children}) {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [drugAuthContaract, setDrugAuthContaract] = useState(null)
  
     useEffect (() => {
      const eth = window?.ethereum || null;
      const _provider = eth
      ? new ethers.providers.Web3Provider(eth, "any") : null;
      setProvider (_provider);
  
      if(_provider){
  
       (async () => {
        const _signer=_provider.getSigner();
        setSigner(_signer);
        console.log("signer",_signer);
        const _address=await _signer.getAddress();
        console.log("address", _address);
  
        if (_address){
          const _balance = await _provider.getBalance(_address) ;
          console.log("balance",_balance , ethers.utils.formatEther(_balance));
          setBalance(ethers.utils.formatEther(_balance));
          setAddress(_address);
        }
  
        const _drugAuthContract =new ethers.Contract(
          "0x8a9c93c76c2ab0803524c2c1d103472b04ec62b6",
          DrugAuth.abi,
          _signer
        );
            setDrugAuthContaract(_drugAuthContract);
        const drugAdmin= await _drugAuthContract.DRUGADMIN();
          console.log("DRUGADMIN" , drugAdmin);
  
        }) ();
      }
     }, []);

     const onConnectClick = async() =>{
        try {
          //console.log("bb", provider);
          await provider.send("eth_requestAccounts",[]);
          const _signer=provider.getSigner();
          setSigner(_signer);
          const _address=await _signer.getAddress();
          console.log("address", _address);
          setAddress(_address);
          const _balance = await provider.getBalance(_address) ;
          console.log("balance",_balance , ethers.utils.formatEther(_balance));
          setBalance(ethers.utils.formatEther(_balance));
        } catch (error) {
          console.log('error',error);
        }
       };  

  return (
    <Web3DataContext.Provider 
    value={{
        provider,
        signer,
        address,
        balance,
        drugAuthContaract,
        onConnectClick,
    }}>
        {children}
    </Web3DataContext.Provider>
  )
}

export {Web3DataProvider,Web3DataContext  }