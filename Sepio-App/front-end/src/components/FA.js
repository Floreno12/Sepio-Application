import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import {Toast} from 'primereact/toast'
import axios from 'axios';

export default function TwoFactorAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({ token: '', status: 'initial' });
  const [qrCode, setQrCode] = useState(location.state?.qrCode || '');
  const username = location.state?.username; // Get the username from the location state
  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({severity: 'success', summary: 'Success', detail: message, life: 3000});
  }

  const showError = (message) => {
    toast.current.clear();
    toast.current.show({severity: 'error', summary: 'Error', detail: message, life: 3000});
  }

  useEffect(() => {
    if (!username) {
      console.error('Username is not provided to TwoFactorAuth component');
    } else {
      console.log(username);
    }
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      console.error('Username is missing. Cannot submit 2FA token.');
      setData((current) => ({ ...current, status: 'failure' }));
      showError('Incorrect 2FA code.');
      return;
    }

    console.log(`Verifying 2FA for user: ${username} with token: ${data.token.trim()}`);
    axios.post('/verify', { username: username, token: data.token.trim() })
      .then(response => {
        if (response.data.verified) {
          showSuccess('2FA successful!');
          setData((current) => ({ ...current, status: 'loading' }));
          setTimeout(() => {
            setData({ token: '', status: 'sent' });
            navigate('/querytool');
          }, 1500);
        } else {
          console.log(`Verification failed: ${response.data.message}`);
          setData((current) => ({ ...current, status: 'failure' }));
          showError('Incorrect 2FA code.');
        }
      })
      .catch(error => {
        console.error('Error verifying token:', error);
        setData((current) => ({ ...current, status: 'failure' }));
        showError('Incorrect 2FA code.');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <Toast ref = {toast}/>
      {qrCode && (
        <div>
          <img src={qrCode} alt="QR Code" />
          <p>Scan this QR code with your authenticator app to set up 2FA.</p>
        </div>
      )}
      <div className='form-token'>
        <form onSubmit={handleSubmit} id="demo">
          <FormControl>
            <FormLabel sx={(theme) => ({ '--FormLabel-color': theme.vars.palette.primary.plainColor })}>
              2FA Code
            </FormLabel>
            <Input
              sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
              placeholder="Enter 2FA Code"
              type="text"
              required
              value={data.token}
              onChange={(event) => setData({ token: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
            >
              Verify
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}