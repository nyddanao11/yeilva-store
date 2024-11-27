import React,{useState} from 'react';
import { Alert , Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from'axios';

export default function DeleteAccount () {
  const [formData, setFromData] = useState();
  const [serverResponse, setServerResponse] = useState('');

const navigate = useNavigate();

const backToMyAccount =()=>{  
// alert('Are you sure To Delete your Account? ')
navigate ('/myaccount');
}

const handleDeleteAccount = async()=>{
  try{
    const response = await axios.post('https://yeilva-store-server.up.railway.app/api/delete-account',{
      email: formData.email
    });
      
      if(response.status===200){
        console.log('Account Delation is sent successfully')
        setServerResponse('Account Delation is sent successfully')
      } else {
        console.error('Error:', response.data)

      } 
    }catch(error){
      console.error('error:', error)
     setServerResponse('Error deleting Account');
      }
    
};

  return (
    <div style={{paddingTop:"15px"}}>
    {serverResponse && (
              <p className="text-danger mt-3">{serverResponse}</p>
            )}

      <Alert variant="danger">
        <Alert.Heading>We are sad that you want to leave us</Alert.Heading>
        <p>but please note that Account deletion is irriversible </p>
        <div  style={{marginTop:'20px'}}>
        <Button className="primary" onClick={handleDeleteAccount} > OK </Button>
        <Button className="primary"style={{marginLeft:'15px'}} onClick={backToMyAccount}> Cancel </Button>
        </div>
      </Alert>

    </div>
  );
};

