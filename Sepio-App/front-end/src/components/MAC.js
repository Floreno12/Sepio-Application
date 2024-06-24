
// //new
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';

// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 setResponseMessage('Please enter at least one MAC address.');
//                 return;
//             }

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             console.log("post responce > " + responce.data.tables);

//             const newFoundMacAddresses = responce.data.map((response, index) => ({
//                 macAddress: macAddresses[index],
//                 macAddressStatus: response.macAddress,
//                 tables: response.tables || []
//             }));

//             setResponseMessage('Search completed');
//             setFoundMacAddresses(newFoundMacAddresses);
//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             setResponseMessage('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Avatar icon='pi pi-user' size='large' shape='circle' />
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />

//             <CSidebar className='border-end custom-sidebar'>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{ width: `${(searchQuery.length < 45 ? 45 : searchQuery.length) * 8 + 20}px`, minWidth: '600px' }} // Adjusting width dynamically
//                 />
//                 <Button label='Search' icon='pi pi-search' onClick={handlePostMac} style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '0px' }} />
//             </div>
//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft: '140px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}
//             {foundMacAddresses.length > 0 && (
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '100px' }}>
//                     {foundMacAddresses.map((item, index) => (
//                         <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '900px' }}>
//                             <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                             <DataTable value={[item]} responsiveLayout="scroll" style={{ width: '100%', minWidth: '650px' }}>
//                                 <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                 <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                             </DataTable>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


















//new
// import React, { useState, useRef, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';

// export default function Layout({icon_username}) {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
//     const [marginLeft, setMarginLeft] = useState('auto'); 
//     const toast = useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             if (searchQuery.split(",").indexOf("") >= 0) {
//                 showError('Please, remove extra comma(s) from your search bar!');
//                 return;
//             }

//             const showSuccess = (message) => {
//                 toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//             };

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             if (responce.status === 400) {
//                 console.log("post responce from server > " + responce.data.message);
//                 showError(responce.data.message);
//             } else {
//                 const newFoundMacAddresses = responce.data.map((response, index) => ({
//                     macAddress: macAddresses[index],
//                     macAddressStatus: response.macAddress,
//                     tables: response.tables || []
//                 }));


//                 setFoundMacAddresses(newFoundMacAddresses);
//                 showSuccess('Search completed');
//             }




//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     // Function to handle resizing and adjust input width
//     const handleResize = () => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 280) {
//             setInputWidth('-10px'); // Adjust width for smaller screens
//            setMarginLeft('10px');
//         } else if (windowWidth <= 868) {
//             setInputWidth('10px'); // Adjust width for medium screens
//             setMarginLeft('50px');
//         } else {
//             setInputWidth('400px'); // Default width for larger screens
//             setMarginLeft('auto');
//         }
//     };

//     // Effect to add and remove resize event listener
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call to set input width based on window size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const menu = useRef();

//     const userProfile = [
// 		{
// 			template: function setProfile(){
					
// 				return (
// 					<span className='list-group mt-3'  >
// 						<p>{icon_username}</p>
// 					</span>
// 				);
// 			}
// 		},
// 		{
// 				separator: true
// 			}
// 	];

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2"  model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
// 			 <Button
// 				 style={{width:'46px',height:'46px', borderRadius: '50%',  color: '#183462' }}
// 				 icon="pi pi-user"
// 				 rounded
// 				 text
// 				 severity="secondary"
// 				 aria-label="User"
// 				 className="mr-2"
// 				 onClick={(event) => menu.current.toggle(event)}
// 				 aria-controls="popup_menu"
// 				 aria-haspopup
// 			 />
//     </div>
//   );
 

//     return (
//         <div>
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} />
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{
//                         width: inputWidth,
//                         minWidth: '200px', // Minimum width to prevent very narrow inputs
//                         maxWidth: '600px', // Maximum width to limit overly wide inputs
//                         transition: 'width 0.3s ease'
//                     }}
//                 />
//                 <Button
//                     label='Search'
//                     icon='pi pi-search'
//                     onClick={handlePostMac}
//                     style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '0px', borderRadius: '5px'}}
//                 />
//             </div>

//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}

//             {foundMacAddresses.length > 0 && (
//                 <div style={{  marginLeft: marginLeft, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '90px' }}>
//                     <div style = {{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         height: '400px',
//                         overflowY: 'auto',
//                         width: '600px',
//                         paddingRight: '10px',
//                     }}>
//                     {foundMacAddresses.map((item, index) => (
//                         <div key={index} style={{marginBottom: '20px', width: '90%', maxWidth: '600px' }}>
//                             <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                             <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft, width: '100%', minWidth: '400px'}}>
//                                 <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                 <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                             </DataTable>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



// import React, { useState, useRef, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';

// export default function Layout({icon_username}) {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
//     const [marginLeft, setMarginLeft] = useState('auto'); 
//     const toast = useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             if (searchQuery.split(",").indexOf("") >= 0) {
//                 showError('Please, remove extra comma(s) from your search bar!');
//                 return;
//             }

//             const showSuccess = (message) => {
//                 toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//             };

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             if (responce.status === 400) {
//                 console.log("post responce from server > " + responce.data.message);
//                 showError(responce.data.message);
//             } else {
//                 const newFoundMacAddresses = responce.data.map((response, index) => ({
//                     macAddress: macAddresses[index],
//                     macAddressStatus: response.macAddress,
//                     tables: response.tables || []
//                 }));


//                 setFoundMacAddresses(newFoundMacAddresses);
//                 showSuccess('Search completed');
//             }




//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     // Function to handle resizing and adjust input width
//     const handleResize = () => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 280) {
//             setInputWidth('-10px'); // Adjust width for smaller screens
//            setMarginLeft('10px');
//         } else if (windowWidth <= 868) {
//             setInputWidth('10px'); // Adjust width for medium screens
//             setMarginLeft('50px');
//         } else {
//             setInputWidth('700px'); // Default width for larger screens
//             setMarginLeft('auto');
//         }
//     };

//     // Effect to add and remove resize event listener
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call to set input width based on window size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const menu = useRef();

//     const userProfile = [
// 		{
// 			template: function setProfile(){
					
// 				return (
// 					<span className='list-group mt-3'  >
// 						<p>{icon_username}</p>
// 					</span>
// 				);
// 			}
// 		},
// 		{
// 				separator: true
// 			}
// 	];

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2"  model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
// 			 <Button
// 				 style={{width:'46px',height:'46px', borderRadius: '50%',  color: '#183462' }}
// 				 icon="pi pi-user"
// 				 rounded
// 				 text
// 				 severity="secondary"
// 				 aria-label="User"
// 				 className="mr-2"
// 				 onClick={(event) => menu.current.toggle(event)}
// 				 aria-controls="popup_menu"
// 				 aria-haspopup
// 			 />
//     </div>
//   );
 

//     return (
//         <div>
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} />
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{
//                         width: inputWidth,
//                         minWidth: '200px', // Minimum width to prevent very narrow inputs
//                         maxWidth: '600px', // Maximum width to limit overly wide inputs
//                         transition: 'width 0.3s ease'
//                     }}
//                 />
//                 <Button
//                     label='Search'
//                     icon='pi pi-search'
//                     onClick={handlePostMac}
//                     style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '0px', borderRadius: '5px'}}
//                 />
//             </div>

//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}

// {foundMacAddresses.length > 0 && (
//     <div style={{ marginLeft: marginLeft, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '90px' }}>
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             height: '400px',
//             overflowY: 'auto',
//             width: '1500px', // Increase the width to make the table wider
//             paddingRight: '10px',
//         }}>
//             {foundMacAddresses.map((item, index) => (
//                 <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '800px' }}>
//                     <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                     <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft, width: '100%', minWidth: '800px' }}> {/* Increase the minWidth here */}
//                         <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '200px', width: '60%' }} /> {/* Increase minWidth and width */}
//                         <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '400px', width: '40%' }} /> {/* Increase minWidth and width */}
//                     </DataTable>
//                 </div>
//             ))}
//         </div>
//     </div>
// )}

//         </div>
//     );
// }















// import React, { useState, useRef, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';

// export default function Layout({icon_username}) {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
//     const [marginLeft, setMarginLeft] = useState('auto'); 
//     const toast = useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             if (searchQuery.split(",").indexOf("") >= 0) {
//                 showError('Please, remove extra comma(s) from your search bar!');
//                 return;
//             }

//             const showSuccess = (message) => {
//                 toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//             };

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             if (responce.status === 400) {
//                 console.log("post responce from server > " + responce.data.message);
//                 showError(responce.data.message);
//             } else {
//                 const newFoundMacAddresses = responce.data.map((response, index) => ({
//                     macAddress: macAddresses[index],
//                     macAddressStatus: response.macAddress,
//                     tables: response.tables || []
//                 }));


//                 setFoundMacAddresses(newFoundMacAddresses);
//                 showSuccess('Search completed');
//             }




//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     // Function to handle resizing and adjust input width
//     const handleResize = () => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 280) {
//             setInputWidth('-10px'); // Adjust width for smaller screens
//            setMarginLeft('10px');
//         } else if (windowWidth <= 868) {
//             setInputWidth('10px'); // Adjust width for medium screens
//             setMarginLeft('50px');
//         } else {
//             setInputWidth('400px'); // Default width for larger screens
//             setMarginLeft('auto');
//         }
//     };

//     // Effect to add and remove resize event listener
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call to set input width based on window size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const menu = useRef();

//     const userProfile = [
// 		{
// 			template: function setProfile(){
					
// 				return (
// 					<span className='list-group mt-3'  >
// 						<p>{icon_username}</p>
// 					</span>
// 				);
// 			}
// 		},
// 		{
// 				separator: true
// 			}
// 	];

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text text-decoration-none' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2"  model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
// 			 <Button
// 				 style={{width:'46px',height:'46px', borderRadius: '50%',  color: '#183462' }}
// 				 icon="pi pi-user"
// 				 rounded
// 				 text
// 				 severity="secondary"
// 				 aria-label="User"
// 				 className="mr-2"
// 				 onClick={(event) => menu.current.toggle(event)}
// 				 aria-controls="popup_menu"
// 				 aria-haspopup
// 			 />
//     </div>
//   );
 

//     return (
//         <div>
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} />
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//     <InputText
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search MAC"
//         style={{
//             width: inputWidth,
//             minWidth: '200px', // Minimum width to prevent very narrow inputs
//             maxWidth: '600px', // Maximum width to limit overly wide inputs
//             transition: 'width 0.3s ease',
//             borderRadius: '5px 0px 0px 5px',
            
//         }}
//     />
//     <Button
//         label='Search'
//         icon='pi pi-search'
//         onClick={handlePostMac}
//         style={{ 
//             backgroundColor: '#183462', 
//             borderColor: '#183462', 
//             marginLeft: '0px', 
//             borderRadius: '0 5px 5px 0' // Flat edge on left, circular on right
//         }}
//     />
// </div>



//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}

//             {foundMacAddresses.length > 0 && (
//                 <div style={{  marginLeft: marginLeft, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '90px' }}>
//                     <div style = {{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         height: '400px',
//                         overflowY: 'auto',
//                         width: '1500px',
//                         paddingRight: '10px',
//                     }}>
//                     {foundMacAddresses.map((item, index) => (
//                         <div key={index} style={{marginBottom: '20px', width: '90%', maxWidth: '600px' }}>
//                             <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                             <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft, width: '100%', minWidth: '800px'}}>
//                                 <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                 <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                             </DataTable>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }














// import React, { useState, useRef, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';

// export default function Layout({ icon_username }) {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
//     const [marginLeft, setMarginLeft] = useState('auto');
//     const toast = useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {
//             if (searchQuery.trim() === '') {
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             if (searchQuery.split(",").indexOf("") >= 0) {
//                 showError('Please, remove extra comma(s) from your search bar!');
//                 return;
//             }

//             const showSuccess = (message) => {
//                 toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//             };

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             if (responce.status === 400) {
//                 console.log("post responce from server > " + responce.data.message);
//                 showError(responce.data.message);
//             } else {
//                 const newFoundMacAddresses = responce.data.map((response, index) => ({
//                     macAddress: macAddresses[index],
//                     macAddressStatus: response.macAddress,
//                     tables: response.tables || []
//                 }));

//                 setFoundMacAddresses(newFoundMacAddresses);
//                 showSuccess('Search completed');
//             }
//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     // Function to handle resizing and adjust input width
//     const handleResize = () => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 280) {
//             setInputWidth('-10px'); // Adjust width for smaller screens
//             setMarginLeft('10px');
//         } else if (windowWidth <= 868) {
//             setInputWidth('10px'); // Adjust width for medium screens
//             setMarginLeft('50px');
//         } else {
//             setInputWidth('400px'); // Default width for larger screens
//             setMarginLeft('auto');
//         }
//     };

//     // Effect to add and remove resize event listener
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call to set input width based on window size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const menu = useRef();

//     const userProfile = [
//         {
//             template: function setProfile() {
//                 return (
//                     <span className='list-group mt-3'>
//                         <p>{icon_username}</p>
//                     </span>
//                 );
//             }
//         },
//         {
//             separator: true
//         }
//     ];

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text text-decoration-none' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2" model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
//             <Button
//                 style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
//                 icon="pi pi-user"
//                 rounded
//                 text
//                 severity="secondary"
//                 aria-label="User"
//                 className="mr-2"
//                 onClick={(event) => menu.current.toggle(event)}
//                 aria-controls="popup_menu"
//                 aria-haspopup
//             />
//         </div>
//     );

//     return (
//         <div>
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'fixed', top: '50px', zIndex: 1000 }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{
//                         width: inputWidth,
//                         minWidth: '200px', // Minimum width to prevent very narrow inputs
//                         maxWidth: '600px', // Maximum width to limit overly wide inputs
//                         transition: 'width 0.3s ease',
//                         borderRadius: '5px 0px 0px 5px'
//                     }}
//                 />
//                 <Button
//                     label='Search'
//                     icon='pi pi-search'
//                     onClick={handlePostMac}
//                     style={{
//                         backgroundColor: '#183462',
//                         borderColor: '#183462',
//                         marginLeft: '0px',
//                         borderRadius: '0 5px 5px 0' // Flat edge on left, circular on right
//                     }}
//                 />
//             </div>

//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}

//             {foundMacAddresses.length > 0 && (
//                 <div style={{ marginLeft: marginLeft, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', paddingTop: '100px' }}>
//                     <div style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         height: '400px',
//                         overflowY: 'auto',
//                         width: '1500px',
//                         paddingRight: '10px',
//                     }}>
//                         {foundMacAddresses.map((item, index) => (
//                             <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '600px' }}>
//                                 <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                                 <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft, width: '100%', minWidth: '800px' }}>
//                                     <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                     <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                                 </DataTable>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }











//this
// import React, { useState, useRef, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';
// import { Toast } from 'primereact/toast';

// export default function Layout({icon_username}) {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
//     const [marginLeft, setMarginLeft] = useState('auto'); 
//     const toast = useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             if (searchQuery.split(",").indexOf("") >= 0) {
//                 showError('Please, remove extra comma(s) from your search bar!');
//                 return;
//             }

//             const showSuccess = (message) => {
//                 toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//             };

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             if (responce.status === 400) {
//                 console.log("post responce from server > " + responce.data.message);
//                 showError(responce.data.message);
//             } else {
//                 const newFoundMacAddresses = responce.data.map((response, index) => ({
//                     macAddress: macAddresses[index],
//                     macAddressStatus: response.macAddress,
//                     tables: response.tables || []
//                 }));


//                 setFoundMacAddresses(newFoundMacAddresses);
//                 showSuccess('Search completed');
//             }




//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     // Function to handle resizing and adjust input width
//     const handleResize = () => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 280) {
//             setInputWidth('-10px'); // Adjust width for smaller screens
//            setMarginLeft('10px');
//         } else if (windowWidth <= 1068) {
//             setInputWidth('10px'); // Adjust width for medium screens
//             setMarginLeft('100px');
//         } else {
//             setInputWidth('600px'); // Default width for larger screens
//             setMarginLeft('auto');
//         }
//     };

//     // Effect to add and remove resize event listener
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initial call to set input width based on window size

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const menu = useRef();

//     const userProfile = [
// 		{
// 			template: function setProfile(){
					
// 				return (
// 					<span className='list-group mt-3'  >
// 						<p>{icon_username}</p>
// 					</span>
// 				);
// 			}
// 		},
// 		{
// 				separator: true
// 			}
// 	];

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2"  model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
// 			 <Button
// 				 style={{width:'46px',height:'46px', borderRadius: '50%',  color: '#183462' }}
// 				 icon="pi pi-user"
// 				 rounded
// 				 text
// 				 severity="secondary"
// 				 aria-label="User"
// 				 className="mr-2"
// 				 onClick={(event) => menu.current.toggle(event)}
// 				 aria-controls="popup_menu"
// 				 aria-haspopup
// 			 />
//     </div>
//   );
 

//     return (
//         <div>
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} />
//             <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{
//                         width: inputWidth,
//                         minWidth: '200px', // Minimum width to prevent very narrow inputs
//                         maxWidth: '600px', // Maximum width to limit overly wide inputs
//                         transition: 'width 0.3s ease',
//                         borderRadius: '5px 0px 0px 5px'
//                     }}
//                 />
//                 <Button
//                     label='Search'
//                     icon='pi pi-search'
//                     onClick={handlePostMac}
//                     style={{
//                         backgroundColor: '#183462',
//                         borderColor: '#183462',
//                         marginLeft: '0px',
//                         borderRadius: '0 5px 5px 0' // Flat edge on left, circular on right
//                     }}
//                 />
//             </div>

//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}

//             {foundMacAddresses.length > 0 && (
//                 <div style={{ marginLeft: marginLeft, position: 'fixed', top: '150px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '1200px', paddingTop: '20px', zIndex: 1000 }}>
//                     <div style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         height: '400px',
//                         overflowY: 'auto',
//                         width: '100%',
//                         paddingRight: '10px',
//                     }}>
//                         {foundMacAddresses.map((item, index) => (
//                             <div key={index} style={{ marginBottom: '20px', width: '100%', maxWidth: '800px' }}>
//                                 <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                                 <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft,  width: '100%', minWidth: '800px' }}>
//                                     <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                     <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                                 </DataTable>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }























import React, { useState, useRef, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { NavLink } from 'react-router-dom';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { Avatar } from 'primereact/avatar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import SepioLogo from './../image/Sepio_Logo.png';
import { Toast } from 'primereact/toast';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export default function Layout({ icon_username }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [foundMacAddresses, setFoundMacAddresses] = useState([]);
    const [inputWidth, setInputWidth] = useState('300px');
    const [marginLeft, setMarginLeft] = useState('auto');
    const [isScrollDisabled, setIsScrollDisabled] = useState(true);
    const [isValidationEnabled, setIsValidationEnabled] = useState(true);
    const toast = useRef(null);

    const handleLogout = () => {
        navigate('/');
    };

    const handleStartClick = () => {
        navigate('/querytool');
    };

    const showInfo = (message) => {
        toast.current.clear();//to clear previous message
        toast.current.show({severity: 'info', summary: 'Info', detail: message, life: 300000});
    };

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };

    const isValidMacAddress = (mac) => {
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^[0-9A-Fa-f]{12}$/;
        return macRegex.test(mac);
    };

    const handlePostMac = async () => {

       
        try {
            if (searchQuery.trim() === '') {
                showError('Please enter at least one MAC address.');
                return;
            }

            if (searchQuery.split(",").indexOf("") >= 0) {
                showError('Please, remove extra comma(s) from your search bar!');
                return;
            }

            const showSuccess = (message) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
            };

            const macAddresses = searchQuery.split(',').map(mac => mac.trim());


            let invalidMacMessages = [];


            if (isValidationEnabled) {
                for (let mac of macAddresses) {
                    if (!isValidMacAddress(mac)) {
                        invalidMacMessages.push(`Invalid MAC address format: ${mac}`);
                        
                    }
                }

                if(invalidMacMessages.length > 0){
                    showInfo(invalidMacMessages.join('\n'));
                }
            }

            


            const requestBody = {
                "macAddress": macAddresses, 
                "isClientFormatRequired": true
            }

            const response = await axios.post('/api/check-mac', requestBody);

            if (response.status === 400) {
                console.log("post response from server > " + response.data.message);
                showError(response.data.message);
            } else {
                const newFoundMacAddresses = response.data.map((response, index) => ({
                    macAddress: macAddresses[index],
                    macAddressStatus: response.macAddress,
                    tables: response.tables || []
                }));

                setFoundMacAddresses(newFoundMacAddresses);
                showSuccess('Search completed');
            }
        } catch (error) {
            console.error('Error posting MAC address:', error);
            showError('Error occurred while checking MAC address.');
            setFoundMacAddresses([]);
        }
    };

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 280) {
            setInputWidth('-10px');
            setMarginLeft('10px');
        } else if (windowWidth <= 1300) {
            setInputWidth('10px');
            setMarginLeft('80px');
        } else {
            setInputWidth('600px');
            setMarginLeft('auto');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isScrollDisabled) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isScrollDisabled]);

    const menu = useRef();

    const userProfile = [
        {
            template: function setProfile() {
                return (
                    <span className='list-group mt-3'>
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
        <>
            <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
        </>
    );

    const end = (
        <div className='flex align-items-center gap-2'>
            <NavLink to='/' className='p-button p-component p-button-text  text-decoration-none' style={{ borderRadius: '10px', padding: '10px' }}>
                <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
                Logout
            </NavLink>
            <Menu className="font-medium text-xl font-semibold text-center rounded-4 mt-2" model={userProfile} popup ref={menu} id="popup_menu_left" closeOnEscape />
            <Button
                style={{ width: '46px', height: '46px', borderRadius: '50%', color: '#183462' }}
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

    return (
        <div>
            <Toast ref={toast} />
            <Menubar start={start} end={end} />
            <div>
                <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
                    <CSidebarNav>
                        <CContainer fluid>
                            <CForm className='d-flex'>
                                {/* Place for additional form elements after demo */}
                            </CForm>
                        </CContainer>
                        <CNavItem>
                            <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
                        </CNavItem>
                    </CSidebarNav>
                </CSidebar>

                <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '180px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                    <InputText
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search MAC"
                        style={{
                            width: inputWidth,
                            minWidth: '200px',
                            maxWidth: '600px',
                            transition: 'width 0.3s ease',
                            borderRadius: '5px 0px 0px 5px'
                        }}
                    />
                    <Button
                        label='Search'
                        icon='pi pi-search'
                        onClick={handlePostMac}
                        style={{
                            backgroundColor: '#183462',
                            borderColor: '#183462',
                            marginLeft: '0px',
                            borderRadius: '0 5px 5px 0'
                        }}
                    />
                </div>

                <div style={{ position: 'fixed', top: '110px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 ,  display: 'flex' }}>
                    {/* <label htmlFor="validationSwitch" style={{ marginRight: '10px', marginTop: '5px' }}>MAC Address Validation:</label> */}
                    <Typography style = {{marginTop: '5px'}} level = 'title-lg'>Mac Address validation</Typography>
                    <Switch
                   
                    style = {{color: '#12467B'}}
                    
                        checked={isValidationEnabled}
                        onChange={(e) => setIsValidationEnabled(e.target.checked)}
                        
                        slotProps={{
                            track: {
                                children: (
                                    <React.Fragment>
                                        <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                                            On
                                        </Typography>
                                        <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                                            Off
                                        </Typography>
                                    </React.Fragment>
                                ),
                            },
                        }}
                        sx={{
                            '--Switch-thumbSize': '27px',
                            '--Switch-trackWidth': '64px',
                            '--Switch-trackHeight': '31px',
                        }}
                    />
                </div>

                {responseMessage && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
                        {responseMessage}
                    </div>
                )}

                {foundMacAddresses.length > 0 && (
                    <div style={{ marginLeft: marginLeft, position: 'fixed', top: '250px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '1200px', paddingTop: '20px', zIndex: 1000 }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '400px',
                            overflowY: 'auto',
                            width: '100%',
                            paddingRight: '10px',
                        }}>
                            {foundMacAddresses.map((item, index) => (
                                <div key={index} style={{ marginBottom: '20px', width: '100%', maxWidth: '800px' }}>
                                    <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
                                    <DataTable value={[item]} responsiveLayout="scroll" style={{ marginLeft: marginLeft, width: '100%', minWidth: '800px' }}>
                                        <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
                                        <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
                                    </DataTable>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}








