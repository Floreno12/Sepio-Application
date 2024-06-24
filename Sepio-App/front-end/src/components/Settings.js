
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Avatar } from 'primereact/avatar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import {
//   CSidebar, CSidebarNav, CNavItem, CContainer
// } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { NavLink } from 'react-router-dom';
// import SepioLogo from './../image/Sepio_Logo.png';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import axios from 'axios';
// import { Message } from 'primereact/message';

// export default function Layout() {

//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();

//   const handleStartClick = () => {
//     navigate('/querytool');
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

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

//   const start = (
//     <img
//       alt='logo'
//       src={SepioLogo}
//       height='40'
//       className='mr-2'
//       onClick={handleStartClick}
//     />
//   );

//   const end = (
//     <div className='flex align-items-center gap-2'>
//       <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//         <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//         Logout
//       </NavLink>
//       <Avatar icon='pi pi-user' size='large' shape='circle' />
//     </div>
//   );

//   return (
//     <div>
//       <Menubar start={start} end={end} />
//       <div style={{ display: 'flex' }}>
//         <CSidebar className='border-end custom-sidebar'>
//           <CSidebarNav>
//             <CContainer fluid>
//             </CContainer>
//             <CNavItem>
//               <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//             </CNavItem>
//           </CSidebarNav>
//         </CSidebar>
//         <div style={{ marginTop: '100px', marginLeft: '400px' }}>
//           <div>
//             <h3>ServiceNow Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                         type="text"
//                         placeholder="ServiceNow Instance"
//                         value={serviceNowInstance}
//                         onChange={(e) => setServiceNowInstance(e.target.value)}
//               />
//               <InputText
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//               />
//               <InputText
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462' }} />

//           <div>
//           {message && (
//             <Message text={message} style={{ marginTop: '20px' }} />
//           )}
//           </div>

//         </div>
//       </div>


//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import {
  CSidebar, CSidebarNav, CNavItem, CContainer
} from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import SepioLogo from './../image/Sepio_Logo.png';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

export default function Layout({icon_username}) {

  const [serviceNowInstance, setServiceNowInstance] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [sepioEndpoint, setSepioEndpoint] = useState('');
  const [sepioUsername, setSepioUsername] = useState('');
  const [sepioPassword, setSepioPassword] = useState('');
  const [sepioMessage, setSepioMessage] = useState('');
  const [inputWidth, setInputWidth] = useState('100%'); // Initial width for larger screens
  const [marginLeft, setMarginLeft] = useState('auto');
  const [isScrollDisabled, setIsScrollDisabled] = useState(true);
  const toast = React.useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Функція для отримання даних з сервера
  const fetchData = async () => {
    try {
      const snResponse = await axios.get('/get-source');
      setServiceNowInstance(snResponse.data.serviceNowInstance);
      setUsername(snResponse.data.username);
      setPassword(snResponse.data.password);

      const sepioResponse = await axios.get('/get-sepio-source');
      setSepioEndpoint(sepioResponse.data.sepioEndpoint);
      setSepioUsername(sepioResponse.data.sepioUsername);
      setSepioPassword(sepioResponse.data.sepioPassword)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showError = (message) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  };

  const showSuccess = (message) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  };

  // Виконання fetchData при зміні маршруту
  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    if(isScrollDisabled){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
      return () => {
        document.body.style.overflow = 'auto';
      };
    
  }, [isScrollDisabled]);

  const handleStartClick = () => {
    navigate('/querytool');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const testConnection = async () => {
    try {

      if (serviceNowInstance.indexOf("http") >= 0) {
        showError('Please, provide endpoint without «http(s)://»');
        return;
      }

      const response = await axios.post('/check-connection', {
        serviceNowInstance,
        username,
        password
      });

      if (response.data.success) {
        showSuccess(response.data.message);
      } else {
        showSuccess(response.data.message);
      }
    } catch (error) {
      showError('Connection failed. Please check your credentials and try again.');
    }
  };

  const testSepioConnection = async () => {
    try {

      if (sepioEndpoint.indexOf("http") >= 0) {
        showError('Please, provide endpoint without «http(s)://»');
        return;
      }

      const response = await axios.post('/check-sepio-connection', {
        sepioEndpoint,
        sepioUsername,
        sepioPassword
      });

      if (response.data.success) {
        showSuccess(response.data.message);
      } else {
        showSuccess(response.data.message);
      }
    } catch (error) {
      showError('Connection failed. Please check your credentials and try again.');
    }
	};
	

	const menu = useRef();
	
	const userProfile = [
		{
			template: function setProfile(){
					
				return (
					<span className='list-group mt-3'  >
						<p>{icon_username}</p>
					</span>
				);
			}
		},
		{
				separator: true
			}
	];

  const start = (
    <img
      alt='logo'
      src={SepioLogo}
      height='40'
      className='mr-2'
      onClick={handleStartClick}
    />
  );

  const end = (
    <div className='flex align-items-center gap-2'>
		  <NavLink to='/' className='p-button p-component p-button-text text-decoration-none' style={{ borderRadius: '10px', padding: '10px' }}>
        <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
        Logout
      </NavLink>
       <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2"  model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
			 <Button
				 style={{width:'46px',height:'46px', borderRadius: '50%',  color: '#183462' }}
				 icon="pi pi-user"
				 rounded
				 text
				 severity="secondary"
				 aria-label="User"
				 className="mr-2"
				 onClick={(event) => menu.current.toggle(event)}
				 aria-controls="popup_menu"
				 aria-haspopup
			 />
    </div>
  );

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 280) {
      setInputWidth('calc(100% - 10px)'); // Adjust width for smaller screens
      setMarginLeft('10px'); // Move to the right on smaller screens
    } else if (windowWidth <= 968) {
      setInputWidth('calc(100% - 50px)'); // Adjust width for medium screens
      setMarginLeft('140px'); // Move to the right on medium screens
    } else {
      setInputWidth('100%'); // Default width for larger screens
      setMarginLeft('auto'); // Center align on larger screens
    }
  };

  // Effect hook to add and remove resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set input width based on window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toast ref={toast} />
      <Menubar start={start} end={end} />

      <div style={{ display: 'flex', flex: '1' }}>
        <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0'}}>
          <CSidebarNav>
            <CContainer fluid>
            </CContainer>
            <CNavItem>
              <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
            </CNavItem>
          </CSidebarNav>
        </CSidebar>

        <div style={{ marginLeft: marginLeft, flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
            <div style={{ marginBottom: '20px' }}>
              {message && (
                <div style={{ marginBottom: '20px' }}>
                  <Message text={message} />
                </div>
              )}
              {sepioMessage && (
                <div style={{ marginBottom: '20px' }}>
                  <Message text={sepioMessage} />
                </div>
              )}
            </div>
            <h3>ServiceNow Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                type="text"
                placeholder="ServiceNow Instance"
                value={serviceNowInstance}
                onChange={(e) => setServiceNowInstance(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth, }}
              />
              <InputText
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth }}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth }}
              />
            </div>
            <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%', borderRadius: '5px'  }} />

            <div style={{ marginTop: '20px' }}></div>
            <h3>Sepio Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                type="text"
                placeholder="Sepio Endpoint"
                value={sepioEndpoint}
                onChange={(e) => setSepioEndpoint(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth }}
              />
              <InputText
                type="text"
                placeholder="Username"
                value={sepioUsername}
                onChange={(e) => setSepioUsername(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth }}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={sepioPassword}
                onChange={(e) => setSepioPassword(e.target.value)}
                style={{ marginBottom: '10px', width: inputWidth }}
              />
            </div>
            <Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%', borderRadius: '5px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}


























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
//       <br/>
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