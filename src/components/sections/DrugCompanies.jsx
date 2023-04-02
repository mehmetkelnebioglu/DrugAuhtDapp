import React, { useContext, useEffect } from 'react';
import { Button, Container,Form } from 'semantic-ui-react';
import { Web3DataContext } from '../../context/Web3Context';

const DrugCompanies = () => {
//..
  const {drugAuthContaract} = useContext(Web3DataContext);

  useEffect(() => {
    
    if(drugAuthContaract){
      async function  getCompanyAddresses() {
        const _companyAddresses=await drugAuthContaract.getCompanies()
        console.log ("_companyAddress",_companyAddresses);
      }
      getCompanyAddresses();
    }
    
  }, [drugAuthContaract]);



    const onAddCompany = async ()=>{

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
       };  

    return (
        <Container style={{ minHeight: "90vh" }}>
      <Form>
      <Form.Field> 
        <label>Address</label>
        <input placeholder="address" />
     </Form.Field>
     <Form.Field> 
        <label>Company Name</label>
        <input placeholder="company name" />
     </Form.Field> 
     <Button onClick={onAddCompany} >Add Company</Button>
     </Form>
        </Container>
    );
}

export default DrugCompanies;
