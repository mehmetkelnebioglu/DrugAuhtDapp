import {ethers} from 'ethers';
import React, { useEffect, useState, useContext  } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import DrugAuth from '../../../src/contracts/DrugAuth.json';
import {Web3DataContext} from '../../context/Web3Context';


const Navigation = () => {
  
  const {provider,address,onConnectClick,balance}=useContext(Web3DataContext);



    /*  const onAddCompany = async ()=>{

      try {

        const _address="0xD66C088E0bA4873422465cfbb512ed0E057a5394"
        const _companyName="test company"
        console.log('creating tx..');
        const tx= await drugAuthContaract.addCompany(_address,_companyName);
        console.log('executing..');
        const result = await tx.wait();
        console.log("result", result);
      } catch (error) {
        console.log("error",error);
      }

     
     };  */



  return(
  <>
    <Menu.Header as='a' href='/' className="logo" >
      Drug Auth <span> dApp</span>
    </Menu.Header> 

    <Menu.Item position='right' className="right-menu">

      {provider && !address? (<Button as='button' className='ui button login' onClick={onConnectClick} >
      connect Metamask 
       </Button>):
       
        provider && address ? (
          <>
        <Button as='button' className='ui button login' href='#' onClick={onConnectClick} >  walllet adress: {address}
       </Button>

       <Button as='button' className='ui button login' href='#' onClick={onConnectClick}>   acount banlance:{balance}
       </Button>
       
     {/*   <Button as='button' className='ui button login' href='#' onClick={onAddCompany}>   addCompany
       </Button> */}


       </> 
      ):(
        <Button as='button' className='ui button login' href='#'>
       <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" >install Metamask </a>
       </Button>
      )}
      

    </Menu.Item>
  </>

  )
}

export default Navigation;