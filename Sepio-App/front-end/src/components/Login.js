import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SepioLogo from './../image/Sepio_Logo.png';
import {Toast} from 'primereact/toast';
import axios from 'axios';

export default function InputSubscription({ setUsername }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: '', password: '', status: 'initial' });
  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({severity: 'success', summary: 'Success', detail: message, life: 3000});
  }

  const showError = (message) => {
    toast.current.clear();
    toast.current.show({severity: 'error', summary: 'Error', detail: message, life: 3000});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData({...data, status: 'loading'});
    try {
      const response = await axios.post('/authenticate', {
        username: data.username,
        password: data.password
      });

      if (response.data.otpRequired) {
        showSuccess('Logging in Successful');
        setTimeout(() => {
        setUsername(data.username);
        navigate('/2fa', {state: {qrCode: response.data.qrCode, username: data.username}})
        }, 1500)
        
      } else {
        setUsername(data.username);
        navigate('/querytool');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setData({ ...data, status: 'failure' });
      showError('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <Toast ref = {toast}/>
      <img src={SepioLogo} alt="Welcome" style={{ marginBottom: '20px', height: 70 }} />
      <div className='form-token'>
        <form onSubmit={handleSubmit} id="demo">
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="User name"
              type="text"
              required
              value={data.username}
              onChange={(event) => setData({ ...data, username: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              required
              value={data.password}
              onChange={(event) => setData({ ...data, password: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <Button loading = {data.status === 'loading'}  variant="solid" color="primary" type="submit" style = {{marginTop: '22px'}}>
              Log in
            </Button>
          
          </FormControl>
        </form>
      </div>
    </div>
  );
}