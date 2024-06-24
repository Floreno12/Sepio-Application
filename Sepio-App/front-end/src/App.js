import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import FA from './components/FA';
import RootView from './components/RootView';
import SignUp from './components/SignUp';
import MAC from './components/MAC';
import Settings from './components/Settings';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';   
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS


function App() {
  const [icon_username, setUsername] = useState('');
  return (
    <Router>
      <section className='sepio'>
        <div className="App">
          <Routes>
            <Route path = '/' element = {<SignUp />}/>
            <Route path='/login' element={<Login setUsername={setUsername} />} />
            <Route path='/2fa' element={<FA />} />
            <Route path='/querytool' element={<RootView icon_username={icon_username} />}/>
            <Route path = '/querytool/mac' element = {<MAC icon_username = {icon_username}/>}/>
            <Route path = '/querytool/settings' element = {<Settings icon_username = {icon_username}/>}/> 
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const testConnection = async () => {
//     try {
//       const response = await axios.post('/check-connection', {
//         serviceNowInstance,
//         username,
//         password
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>ServiceNow Connection Checker</h1>
//       <input
//         type="text"
//         placeholder="ServiceNow Instance"
//         value={serviceNowInstance}
//         onChange={(e) => setServiceNowInstance(e.target.value)}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={testConnection}>Test Connection</button>
//       <br />
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;

