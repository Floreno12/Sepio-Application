
// import React, { useState, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm, CButton } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { logger } from 'react-native-logs';

// export default function Layout() {
//   const [logs, setLogs] = useState(() => {
//     const savedLogs = localStorage.getItem('logs');
//     return savedLogs ? JSON.parse(savedLogs) : [];
//   });
//   const log = logger.createLogger();

//   const captureLog = (level, msg) => {
//     const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Kiev' }); // Get current time in Kiev time zone
//     console.log(`Capturing log - Level: ${level}, Message: ${msg}`); // Add console log
//     const newLogs = [...logs, { level, msg, time: currentTime }]; // Include current time in logs
//     setLogs(newLogs);
//     localStorage.setItem('logs', JSON.stringify(newLogs));
//   };

//   useEffect(() => {
//     for (let i = 0; i < 20; i++) {
//       log.debug("This is a Debug log");
//       log.info("This is an Info log");
//       log.warn("This is a Warning log");
//       log.error("This is an Error log");
//     }
//   }, []);

//   const getColorForLevel = (level) => {
//     switch (level) {
//       case "DEBUG":
//         return "blue";
//       case "INFO":
//         return "green";
//       case "WARN":
//         return "orange";
//       case "ERROR":
//         return "red";
//       default:
//         return "black";
//     }
//   };

//   const containerStyle = {
//     padding: "20px",
//     borderRadius: "8px",
//     backgroundColor: "#f4f4f4",
//     maxWidth: "800px",
//     margin: "20px auto",
//     fontFamily: "Arial, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   };

//   const logContainerStyle = {
//     padding: "20px",
//     borderRadius: "8px",
//     backgroundColor: "#ffffff",
//     maxWidth: "100%",
//     maxHeight: "600px",
//     marginTop: '-700px',
//     marginRight: '-300px',
//     overflowY: "auto",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     width: "100%",
//   };

//   const logStyle = {
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//     display: "flex", // Make log items flex containers
//     justifyContent: "space-between", // Space between log content and time
//     alignItems: "center", // Align items vertically
//   };

//   const logLevelStyle = {
//     marginRight: "10px",
//     fontWeight: "bold"
//   };

//   const timeStyle = {
//     marginLeft: "10px", // Add space between message and time
//     color: "#777", // Change time color for better visibility
//   };

//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleStartClick = () => {
//     navigate('/querytool');
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const handleSearch = () => {
//     console.log('Performing search with query:', searchQuery);
//   };

//   const start = (
//     <>
//       <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' onClick={handleStartClick} />
//     </>
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

//       <CSidebar className='border-end custom-sidebar'>
//         <CSidebarNav>
//           <CContainer fluid>
//             <CForm className='d-flex'>
//               {/* Search form here */}
//             </CForm>
//           </CContainer>
//           <CNavItem>
//             <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//           </CNavItem>
//           <CNavItem>
//             <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//           </CNavItem>
//           <CNavItem>
//             <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> SearchHistory</NavLink>
//           </CNavItem>
//         </CSidebarNav>
//       </CSidebar>

//       <div style={containerStyle}>
//         <div style={logContainerStyle}>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {logs.map((log, index) => (
//               <li key={index} style={{ ...logStyle, color: getColorForLevel(log.level) }}>
//                 <span style={logLevelStyle}>{log.level}:</span> {log.msg} <span style={timeStyle}>- {log.time}</span> {/* Display current time */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm, CButton } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { Avatar } from 'primereact/avatar';
import { logger } from 'react-native-logs';
import SepioLogo from './../image/Sepio_Logo.png';
import LogsLogo from './../image/Logs.png';

export default function Layout() {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const log = logger.createLogger();

  const captureLog = (level, msg) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Kiev' }); // Get current time in Kiev time zone
    console.log(`Capturing log - Level: ${level}, Message: ${msg}`); // Add console log
    const newLogs = [...logs, { level, msg, time: currentTime }]; // Include current time in logs
    setLogs(newLogs);
    localStorage.setItem('logs', JSON.stringify(newLogs));
  };

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      captureLog("DEBUG", "This is a Debug log");
      captureLog("INFO", "This is an Info log");
      captureLog("WARN", "This is a Warning log");
      captureLog("ERROR", "This is an Error log");
    }
  }, []);

  const getColorForLevel = (level) => {
    switch (level) {
      case "DEBUG":
        return "blue";
      case "INFO":
        return "green";
      case "WARN":
        return "orange";
      case "ERROR":
        return "red";
      default:
        return "black";
    }
  };

  const containerStyle = {
    
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    marginLeft: '250px',
    maxWidth: "1300px",
   
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    
  };

  const logContainerStyle = {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    maxWidth: "100%",
    maxHeight: "600px",
    marginTop: '-700px',
    marginRight: '-400px',
    overflowY: "auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
  };

  const logStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex", // Make log items flex containers
    justifyContent: "space-between", // Space between log content and time
    alignItems: "center", // Align items vertically
  };

  const logLevelStyle = {
    marginRight: "10px",
    fontWeight: "bold"
  };

  const timeStyle = {
    color: "#777", // Change time color for better visibility
  };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartClick = () => {
    navigate('/querytool');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = () => {
    console.log('Performing search with query:', searchQuery);
  };

  const start = (
    <>
      <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
    </>
  );

  const end = (
    <div className='flex align-items-center gap-2'>
      <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
        <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
        Logout
      </NavLink>
      <Avatar icon='pi pi-user' size='large' shape='circle' />
    </div>
  );

  return (
    <div>
      <Menubar start={start} end={end} />

      <CSidebar className='border-end custom-sidebar'>
        <CSidebarNav>
          <CContainer fluid>
            <CForm className='d-flex'>
              {/* Search form here */}
            </CForm>
          </CContainer>
          <CNavItem>
            <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
          </CNavItem>
          <CNavItem>
            <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
          </CNavItem>
          <CNavItem>
            <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
          </CNavItem>
          <CNavItem>

          <NavLink to = '/querytool/settings' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> Settings </NavLink>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>

      <div style = {containerStyle}>
        <div style={logContainerStyle}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {logs.map((log, index) => (
              <li key={index} style={{ ...logStyle, color: getColorForLevel(log.level) }}>
                <span style={logLevelStyle}>{log.level}:</span> {log.msg} <span style={timeStyle}>- {log.time}</span> {/* Display current time */}
              </li>
            ))}
          </ul>
        </div>
      </div>

{/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-800px', top: '4px', marginRight: '-300px'}}>
<img alt = 'logo' src = {LogsLogo} height = '40' className = 'mr-2'/>
</div> */}


<div style = {{marginTop: '-750px', marginRight: '-200px'}}>
<h1>
  Logs:
</h1>
</div>

    </div>
  );
}




























//old vertion
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
// import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
// import {Avatar} from 'primereact/avatar';




// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');


//     const handleStartClick = () => {
//         navigate('/querytool');
//     }

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleSearch = () => {
//         // Perform search operation with searchQuery
//         console.log('Performing search with query:', searchQuery);
//     }

//     const start = (
//         <>
//             <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' onClick = {handleStartClick} />
           
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//                     <NavLink to='/' className='p-button p-component p-button-text' style={{  borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//           {/* <Button icon='pi pi-sign-out' label='Logout' style={{ backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px' }} onClick={handleLogout} />   */}
//             <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />
            
//             {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                 <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" />
//                 <Button icon='pi pi-search' onClick={handleSearch} style={{ marginLeft: '10px' }} />
//             </div> */}
//             <CSidebar className = 'border-end custom-sidebar'>
//             <CSidebarNav>
//                 <CContainer fluid>
//                     <CForm className = 'd-flex'>
//                         {/* <CFormInput type = 'search' className = 'search-item me-2' placeholder = 'Search'/>
//                         <CButton type = 'submit' variant = 'outline' style = {{backgroundColor: '#183462', color: '#fff'}}>
//                             Search
//                         </CButton> */}
//                     </CForm>
//                 </CContainer>
//                 <CNavItem>
//                 <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> MAC</NavLink>
//                 </CNavItem>

//                 <CNavItem>
//                 <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
//                 </CNavItem>
//                 <CNavItem>
//                     <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
//                 </CNavItem>
//             </CSidebarNav>
//         </CSidebar>


//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px', height: '300px', width: '500px' }}>
//                 <textarea 
//                     value={searchQuery} 
//                     onChange={(e) => setSearchQuery(e.target.value)} 
//                     placeholder="Logs:" 
//                     style={{ width: '100%', height: '100%', fontSize: '20px', padding: '10px', resize: 'none', overflow: 'auto', marginRight: '-1100px' }} 
//                 />
//             </div>
//         {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px', height: '300px',fontSize: '40px'}}>
//                 <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Logs:" />
//             </div> */}
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-350px', top: '4px', marginRight: '-150px'}}>
//     <h1>Logs</h1>
// </div>
//         </div>
//     );
// }