// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const cors = require('cors');
// const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Log incoming requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });

// //Sign-up
// app.post('/signup', async (req, res) => {
//   const { username, password } = req.body;
//   console.log(`Registering user: ${username}`);

//   try {
//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create user using Prisma Client
//     const newUser = await prisma.user.create({
//       data: {
//         name: username,
//         password: hashedPassword,
//         otp_secret: '',
//         otp_verified: false
//       },
//     });

//     console.log('User created successfully:', newUser);

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error signing up user:', error);
//     res.status(500).json({ success: false, message: 'Error signing up user' });
//   }
// });

// // Endpoint to check if user is authenticated and set up 2FA if not
// app.post('/authenticate', async (req, res) => {
//   const { username, password } = req.body;
//   console.log(`Authenticating user: ${username}`);

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         name: username,
//       },
//     });

//     if (!user || user.password !== password) {
//       console.log(`Authentication failed for user: ${username}`);
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     if (user.otp_secret) {
//       // User has OTP enabled
//       console.log(`User ${username} has OTP enabled`);
//       return res.json({ otpRequired: true });
//     }

//     // User does not have OTP enabled, generate new OTP secret
//     console.log(`User ${username} does not have OTP enabled, generating secret`);
//     const secret = speakeasy.generateSecret({ length: 20 });
//     console.log(`Generated secret for user ${username}: ${secret.base32}`);
//     const otpauth_url = speakeasy.otpauthURL({ secret: secret.base32, label: username, issuer: 'YourApp' });

//     // Store secret in database
//     await prisma.user.update({
//       where: {
//         name: username,
//       },
//       data: {
//         otp_secret: secret.base32,
//       },
//     });

//     // Generate QR code for 2FA setup
//     qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: 'QR code generation failed' });
//       }
//       console.log(`Generated QR code for user ${username}`);
//       res.json({ otpRequired: true, qrCode: data_url, secret: secret.base32 });
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });

// // Endpoint to verify OTP token
// app.post('/verify', async (req, res) => {
//   const { username, token } = req.body;
//   console.log(`Verifying token for user: ${username}`);

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         name: username,
//       },
//     });

//     if (!user || !user.otp_secret) {
//       console.log(`User ${username} not set up for 2FA`);
//       return res.status(400).json({ verified: false, message: 'User not set up for 2FA' });
//     }

//     const verified = speakeasy.totp.verify({
//       secret: user.otp_secret,
//       encoding: 'base32',
//       token: token.trim(),
//       window: 5, // Increase the window to account for clock drift
//     });

//     if (verified) {
//       console.log(`Token verified for user: ${username}`);
//       res.json({ verified: true });
//     } else {
//       console.log(`Invalid token for user: ${username}`);
//       res.json({ verified: false, message: 'Invalid token' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Database error' });
//   }
// });

// // app.use(express.static(path.join(__dirname, '../front-end/build')));

// // // Serve React app for any other routes
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// // });

// // Routes
// let serviceNowCredentials = {};
// let sepioCredentials = {};
// let sepioCredentialsAvailable = false;

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// app.get('/get-source', async (req, res) => {

//   console.log("we are here > /get-source + " + serviceNowCredentials.toString());

//   res.json(serviceNowCredentials);
//   //return serviceNowCredentials;
// });

// app.get('/get-sepio-source', async (req, res) => {

//   console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

//   res.json(sepioCredentials);
//   //return serviceNowCredentials;
// });

// //************************************
// //*********** Sepio creds ************
// //************************************ 
// // var sepioLogin = "icloud";
// // var sepioPassword = "Changecloud19";
// // var sepioEndpoint = "sepio-hac-1-ng.sepiocyber.com";

// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = { serviceNowInstance, username, password };

//   try {
//     const response = await axios.get(`https://${serviceNowInstance}`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       res.json({ success: true, message: 'Connection successful!' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// app.post('/check-sepio-connection', async (req, res) => {
//   let { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
//   sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };

//   if (sepioEndpoint && sepioUsername && sepioPassword) {

//     sepioCredentialsAvailable = true;

//     console.log("sepioEndpoint > " + sepioEndpoint);

//     console.log("username > " + sepioUsername);
//     console.log("password > " + sepioPassword);
//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       if (response.status === 200) {
//         res.json({ success: true, message: 'Connection successful!' });
//       } else {
//         res.status(500).json({ success: false, message: 'Connection failed!' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     }
//   } else {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// const getMacAddresses = async (macAddress) => {

//   console.log(macAddress);
//   let { username, password, serviceNowInstance } = serviceNowCredentials;


//   if (!username && !password && !serviceNowInstance) {
//     return "Please, provide valid ServiceNow credentials";
//   }


//   const auth = Buffer.from(`${username}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   try {
//     let snQueryParms = [];
//     let searchQuery = "";

//     macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

//     searchQuery = snQueryParms.join("%5EOR");

//     let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

//     console.log(`endpoint > ${endpoint}`);

//     const response = await axios.get(endpoint, config);

//     if (response.status === 200) {

//       const queryResults = response.data.result;

//       console.log('Filtered MAC addresses:', queryResults);

//       return queryResults;

//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     return [];
//   }
// };

// const getSepioToken = async () => {

//   if (sepioCredentialsAvailable == true) {

//     console.log("Started sepio token retrieving process");

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       throw error;
//     }
//   }
// };

// const addTagsToSepioElements = async (elementSpecifier, tagsList, token) => {

//   if (sepioCredentialsAvailable == true) {
//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     console.log("SEPIO TAG: we are here!");

//     var tagsNames = [];

//     var tagsNames = tagsList.map(item => item);

//     const generalToken = tagsNames.length == 0 ? "not_incmdb" : "in_cmdb";

//     tagsNames.push(generalToken);

//     var requestBody = {
//       "tagNames": tagsNames,
//       "elementKeys": [elementSpecifier],
//       "function": 0,
//       "processChildren": false
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//       if (response.status === 200) {

//         console.log("Adding tags process to element: " + elementSpecifier + " is success!");

//         return response;
//       } else {
//         console.error("Adding tags process to element: " + elementSpecifier + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//       }
//     } catch (error) {

//       console.error('Error adding tags to Sepio elements:', error);
//       throw error;
//     }
//   }
// };

// app.post('/api/check-mac', async (req, res) => {

//   const { macAddress } = req.body;

//   try {

//     const result = await getMacAddresses(macAddress);

//     if (Array.isArray(result)) {

//       if (result.length > 0) {

//         let responce = [];

//         const token = await getSepioToken();

//         for (const singleMac of macAddress) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           for (const assetWithCmdbInfo of result) {

//             if (assetWithCmdbInfo.mac_address == singleMac && assetWithCmdbInfo.sys_class_name.indexOf("cmdb_ci") >= 0) {

//               macAndTables.tables.push(assetWithCmdbInfo.sys_class_name);
//             }
//           }

//           if (macAndTables.tables.length == 0) {

//             macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//           } else {

//             macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//           }

//           console.log("singleMac > " + singleMac);
//           console.log("macAndTables.tables > " + macAndTables.tables);

//           const responceFromTagAPI = await addTagsToSepioElements(singleMac, macAndTables.tables, token);

//           responce.push(macAndTables);

//           console.log("macAndTables > " + macAndTables);
//         };

//         console.log("responce >" + responce);

//         res.json(responce);

//       } else {

//         let responce = [];

//         macAddress.forEach(function (singleMac) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;

//           responce.push(macAndTables);
//         });

//         res.json(responce);
//       }
//     } else if (typeof (result) == "string") {
//       res.status(400).json({ success: false, message: 'Please, provide valid ServiceNow credentials' });

//     } else {

//       let responce = [];

//       let macAndTables = {
//         "error": "Unexpected error"
//       }
//       responce.push(macAndTables);

//       res.json(responce);
//     }

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });

// // app.post('/receive-data', async (req, res) => {

// //   const { macAddresses } = req.body;
// //   console.log('Received MAC addresses:', macAddresses);

// //   if (!Array.isArray(macAddresses) || macAddresses.length !== 5) {
// //     return res.status(400).json({ success: false, message: 'Please provide exactly 5 MAC addresses' });
// //   }

// //   const foundMacAddresses = [];
// //   const notFoundMacAddresses = [];

// //   for (const mac of macAddresses) {
// //     const result = await getMacAddresses(mac);
// //     if (Array.isArray(result) && result.length > 0 && Array.isArray(result[1])) {
// //       foundMacAddresses.push({ macAddress: mac, table: result[1] });
// //     } else {
// //       notFoundMacAddresses.push(mac);
// //     }
// //   }

// //   res.json({
// //     success: true,
// //     foundMacAddresses,
// //     notFoundMacAddresses
// //   });
// // });

// // Serve static files from the React build directory 
// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const getSepioTokenPost = async (sepioEndpoint, sepioPassword, sepioLogin) => {

//   if (sepioEndpoint && sepioPassword && sepioLogin) {
//     console.log("Started sepio token retrieving process");

//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioLogin,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       //console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         //throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       //throw error;
//     }
//   }
// }

// // };

// // const addTagsToSepioElementsPost = async (foundMacAddresses, token, sepioEndpoint, notFoundMacAddresses) => {

// //   if (sepioEndpoint && foundMacAddresses && token) {

// //     console.log("SEPIO TAG: we are here!");



// //     //foundMacAddresses.forEach(function (validMacAddress) {
// //     for (const validMacAddress of foundMacAddresses) {

// //       var tagsNames = [];

// //       validMacAddress.table.forEach(function (tag) {

// //         tagsNames.push(tag.table);
// //       });

// //       tagsNames.push("in_cmdb");

// //       var requestBody = {
// //         "tagNames": tagsNames,
// //         "elementKeys": [validMacAddress.macAddress],
// //         "function": 0,
// //         "processChildren": false
// //       };

// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': 'Bearer ' + token
// //         }
// //       };

// //       try {
// //         const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

// //         if (response.status === 200) {

// //           console.log("Adding tags process to element: " + elementSpecifier + " is success!");

// //           //return response;
// //         } else {
// //           console.error("Adding tags process to element: " + elementSpecifier + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
// //         }
// //       } catch (error) {

// //         console.error('Error adding tags to Sepio elements:', error);
// //         throw error;
// //       }
// //     }

// //     for (const validMacAddress of notFoundMacAddresses) {

// //       var tagsNames = [];

// //       tagsNames.push("not_incmdb");

// //       var requestBody = {
// //         "tagNames": tagsNames,
// //         "elementKeys": [validMacAddress],
// //         "function": 0,
// //         "processChildren": false
// //       };

// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': 'Bearer ' + token
// //         }
// //       };

// //       try {
// //         const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

// //         if (response.status === 200) {

// //           console.log("Adding tags process to element: " + elementSpecifier + " is success!");

// //           //return response;
// //         } else {
// //           console.error("Adding tags process to element: " + elementSpecifier + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
// //         }
// //       } catch (error) {

// //         console.error('Error adding tags to Sepio elements:', error);
// //         throw error;
// //       }
// //     }
// //   };

// const addTagsToSepioElementsPost = async (macAddressesAndTags, token, sepioEndpoint, macAddress) => {

//   if (sepioEndpoint && macAddressesAndTags && token) {
//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     //console.log("SEPIO TAG: we are here!")

//     var tagsNames = [];
//     if (macAddressesAndTags.length > 0) {
//     for (var i = 0; i < macAddressesAndTags.length; i++) {

//       tagsNames.push(macAddressesAndTags[i].sys_class_name);

//     }
//     tagsNames.push("in_cmdb");

//   } else {
//     tagsNames.push("not_incmdb");
//   }
//   }

//   console.log("tagsNames > " + tagsNames);

//   var requestBody = {
//     "tagNames": tagsNames,
//     "elementKeys": [macAddress],
//     "function": 0,
//     "processChildren": false
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     }
//   };

//   //try {
//   const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//   if (response.status === 200) {

//     console.log("Adding tags process to element: " + macAddress + " is success!");

//     //return response;
//   } else {
//     console.error("Adding tags process to element: " + macAddress + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//   }

// }

// // } catch (error) {

// //   console.error('Error adding tags to Sepio elements:', error);
// //   throw error;
// // }
// //   }
// // };


// // const getMacAddressesPostT = async (macAddresses, targetEndpoint, userlogin, password) => {
// //   //const { username, password, serviceNowInstance } = serviceNowCredentials;
// //   const auth = Buffer.from(`${userlogin}:${password}`).toString('base64');

// //   const config = {
// //     headers: {
// //       'Content-Type': 'application/json',
// //       'Authorization': 'Basic ' + auth
// //     }
// //   };

// //   const queries = macAddresses.map(mac => `mac_addressLIKE${mac}`).join('^OR');
// //   const endpoint = `https://${targetEndpoint}/api/now/table/cmdb_ci?sysparm_query=${queries}&sysparm_fields=mac_address,sys_class_name,sys_id`;

// //   try {
// //     const response = await axios.get(endpoint, config);
// //     return response.data.result;
// //   } catch (error) {
// //     console.error('Error fetching MAC addresses:', error);
// //     return [];
// //   }
// // };

// const getMacAddressesPost = async (macAddresses, targetEndpoint, userlogin, password) => {
//   //const { username, password, serviceNowInstance } = serviceNowCredentials;
//   const auth = Buffer.from(`${userlogin}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   const queries = macAddresses.map(mac => `mac_addressLIKE${mac}`).join('^OR');
//   const endpoint = `https://${targetEndpoint}/api/now/table/cmdb_ci?sysparm_query=${queries}&sysparm_fields=mac_address,sys_class_name,sys_id`;

//   try {
//     const response = await axios.get(endpoint, config);
//     return response.data.result;
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     return [];
//   }
// };

// app.post('/receive-data', async (req, res) => {

//   const { loginTest } = req.body;
//   const { passwordTest } = req.body;

//   if (loginTest == "admin" && passwordTest == "admin") {
//     const { macAddresses } = req.body;
//     const { snEndpoint } = req.body;
//     const { snUserlogin } = req.body;
//     const { snPassword } = req.body;
//     const { endpointSepio } = req.body;
//     const { loginSepio } = req.body;
//     const { passwordSepio } = req.body;

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     let { username, password, serviceNowInstance } = serviceNowCredentials;

//     let snCredentialsIsAvailable = (username && password && serviceNowInstance) || (snEndpoint, snUserlogin, snPassword);
//     let sepioCredentialsIsAvailable = (sepioUsername && sepioPassword && sepioEndpoint) || (endpointSepio, loginSepio, passwordSepio);

//     if (snCredentialsIsAvailable) {

//       console.log('Received MAC addresses:', macAddresses);

//       const foundMacAddresses = [];
//       const notFoundMacAddresses = [];

//       let user = username ? username : snUserlogin;
//       let pass = password ? password : snPassword;
//       let endpoint = serviceNowInstance ? serviceNowInstance : snEndpoint;

//       const results = await getMacAddressesPost(macAddresses, endpoint, user, pass);

//       //macAddresses.forEach(mac => {
//       for (const mac of macAddresses) {

//         const matchingResults = results.filter(result => result.mac_address === mac && result.sys_class_name.indexOf("cmdb_ci") >= 0);

//         console.log("matchingResults > " + JSON.stringify(matchingResults));

//         if (sepioCredentialsIsAvailable) {

//           let sepioUser = sepioUsername ? sepioUsername : loginSepio;
//           let sepioPass = sepioPassword ? sepioPassword : passwordSepio;
//           let endpointForSepio = sepioEndpoint ? sepioEndpoint : endpointSepio;

//           const token = await getSepioTokenPost(endpointForSepio, sepioPass, sepioUser);
//           const responceSepio = await addTagsToSepioElementsPost(matchingResults, token, endpointForSepio, mac);
//         }

//         if (matchingResults.length > 0) {
//           foundMacAddresses.push({
//             macAddress: mac,
//             tables: matchingResults.map(result => ({
//               table: result.sys_class_name,
//               sys_id: result.sys_id
//             }))
//           });
//         } else {
//           notFoundMacAddresses.push(mac);
//         }

//         // if (sepioCredentialsIsAvailable) {

//         //   let sepioUser = sepioUsername ? sepioUsername : loginSepio;
//         //   let sepioPass = sepioPassword ? sepioPassword : passwordSepio;
//         //   let endpointForSepio = sepioEndpoint ? sepioEndpoint : endpointSepio;

//         //   const token = await getSepioTokenPost(endpointForSepio, sepioPass, sepioUser);
//         //const responceSepio = await addTagsToSepioElementsPost(foundMacAddresses, token, endpointForSepio,notFoundMacAddresses);
//         // }
//       }
//       res.json({
//         success: true,
//         foundMacAddresses,
//         notFoundMacAddresses
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         error: "You should provide you ServiceNow credential in settings or in request body"
//       });
//     }
//   } else {
//     res.status(401).json({
//       success: false,
//       error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
//     });
//   }
// });


const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

//Create user
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Registering user: ${username}`);

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
        otp_secret: '',
        otp_verified: false,
      },
    });

    console.log('User created successfully:', newUser);
    res.json({ success: true });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ success: false, message: 'Error signing up user' });
  }
});


//Check credentials
app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Authenticating user: ${username}`);

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log(`Authentication failed for user: ${username}`);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    //compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Authentication failed for user: ${username}`);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    if (user.otp_verified) {
      console.log(`User ${username} has completed OTP setup`);
      return res.json({ otpRequired: true });
    } else {
      console.log(`User ${username} has not completed OTP setup, generating secret`);
      const secret = speakeasy.generateSecret({ length: 20 });
      console.log(`Generated secret for user ${username}: ${secret.base32}`);

      const otpauth_url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: encodeURIComponent(username),
        issuer: 'YourApp',
        encoding: 'base32',
      });

      //Store secret in db
      await prisma.user.update({
        where: { name: username },
        data: { otp_secret: secret.base32 },
      });

      //Generete QR code for 2FA Authentication 
      qrcode.toDataURL(otpauth_url, (err, data_url) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'QR code generation failed' });
        }
        console.log(`Generated QR code for user ${username}`);
        res.json({ otpRequired: true, qrCode: data_url, secret: secret.base32 });
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

//Virify token
app.post('/verify', async (req, res) => {
  const { username, token } = req.body;
  console.log(`Verifying token for user: ${username}`);

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user || !user.otp_secret) {
      console.log(`User ${username} not set up for 2FA`);
      return res.status(400).json({ verified: false, message: 'User not set up for 2FA' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.otp_secret,
      encoding: 'base32',
      token: token.trim(),
      window: 5,
    });

    //Verified connection with Google Authenticator 
    if (verified) {
      console.log(`Token verified for user: ${username}`);
      await prisma.user.update({
        where: { name: username },
        data: { otp_verified: true },
      });
      res.json({ verified: true });
    } else {
      console.log(`Invalid token for user: ${username}`);
      res.json({ verified: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

// Routes
let serviceNowCredentials = {};
let sepioCredentials = {};

app.get('/get-source', async (req, res) => {

  console.log("we are here > /get-source + " + serviceNowCredentials.toString());

  res.json(serviceNowCredentials);
});

app.get('/get-sepio-source', async (req, res) => {

  console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

  res.json(sepioCredentials);
});

app.post('/check-connection', async (req, res) => {
  const { serviceNowInstance, username, password } = req.body;
  serviceNowCredentials = { serviceNowInstance, username, password };


  try {
    const responce = await axios.get(`https://${serviceNowInstance}/api/now/table/incident`, {
      auth: {
        username,
        password
      }
    });

    if (responce.status === 200) {
      res.json({ success: true, message: 'Connection successful' });

    } else {
      res.status(responce.status).json({ success: false, message: 'Connection faild' })
    }

  } catch (error) {
    if (error.responce && error.response.status === 401) {
      res.status(401).json({ success: false, message: 'Authentication failed: Invalid username or password' });
    } else if (error.responce && error.responce.status === 404) {
      res.status(404).json({ success: false, message: 'Service Now connection failed invalid instance.' });
    } else {
      res.status(500).json({ success: false, message: 'Connection failed' });
    }

  }
})

app.post('/check-sepio-connection', async (req, res) => {
  let { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
  sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };

  if (sepioEndpoint && sepioUsername && sepioPassword) {

    sepioCredentialsAvailable = true;

    console.log("sepioEndpoint > " + sepioEndpoint);

    console.log("username > " + sepioUsername);
    console.log("password > " + sepioPassword);
    var requestBody = {
      "username": sepioUsername,
      "password": sepioPassword
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

      if (response.status === 200) {
        res.json({ success: true, message: 'Connection successful!' });
      } else {
        res.status(500).json({ success: false, message: 'Connection failed!' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
    }
  } else {
    res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
  }
});

const getMacAddresses = async (macAddress, serviceNowInstance, snUsername, snPassword) => {

  console.log(macAddress);

  console.log(serviceNowInstance + " # " + snUsername + " # " + snPassword);

  if (!snUsername && !snPassword && !serviceNowInstance) {
    return { "error": "Please, provide valid ServiceNow credentials" };
  }

  const auth = Buffer.from(`${snUsername}:${snPassword}`).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth
    }
  };

  try {
    let snQueryParms = [];
    let searchQuery = "";

    macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

    searchQuery = snQueryParms.join("%5EOR");

    let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

    console.log(`endpoint > ${endpoint}`);

    const response = await axios.get(endpoint, config);

    console.log("foo 1 ");

    const queryResults = response.data.result;

    console.log("foo 2 ");

    if (response.status === 200) {

      const queryResults = response.data.result;

      console.log('Filtered MAC addresses:', queryResults);

      return queryResults;

    } else {
      console.log('Filtered MAC addresses status:' + response.status);
      res.status(500).json({ success: false, message: 'Connection failed!' });
    }
  } catch (error) {
    console.error('Error fetching MAC addresses:', error);
    res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
    return [];
  }
};

const getSepioToken = async (snEndpoint, snUsername, snPassword) => {

  console.log("Started sepio token retrieving process");

  var requestBody = {
    "username": snUsername,
    "password": snPassword
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.post(`https://${snEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

    console.log(response.data.token);

    if (response.status === 200) {
      console.log('Successfully got token from Sepio: ' + response.data.token);
      return response.data.token;
    } else {
      console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
      throw error;
    }

  } catch (error) {
    console.error('Error getting token from Sepio: ', error);
    throw error;
  }
};

const addTagsToSepioElements = async (sepioToken, snEndpoint, filteredMacs, mac) => {

  try {
    let tagsList = [];

    if (filteredMacs.length > 0) {
      tagsList = filteredMacs.map(result => (result.sys_class_name));
      tagsList.push("in_cmdb");
    } else {
      tagsList.push("NOT_INCMDB");
    }
    console.log("An attemt to add tags to Sepio elements");

    let requestBody = {
      "tagNames": tagsList,
      "elementKeys": [mac],
      "function": 0,
      "processChildren": false
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sepioToken
      }
    };

    const response = await axios.post(`https://${snEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

    if (response.status === 200) {

      console.log("Adding tags process to element: " + mac + " is success!");

      return response;
    } else {
      console.error("Adding tags process to element: " + mac + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
    }
  } catch (ex) {
    console.error('Error adding tags to Sepio elements:', error);
    throw error;
  }
};

app.post('/api/check-mac', async (req, res) => {

  try {
    const requestLogin = req.body.requestLogin ? req.body.requestLogin : "";
    const requestPassword = req.body.requestPassword ? req.body.requestPassword : "";

    if (true) {

      const snEndpoint = serviceNowCredentials.serviceNowInstance ? serviceNowCredentials.serviceNowInstance : req.body.snEndpoint ? req.body.snEndpoint : "";
      const snUsername = serviceNowCredentials.username ? serviceNowCredentials.username : req.body.snLogin ? req.body.snLogin : "";
      const snPassword = serviceNowCredentials.password ? serviceNowCredentials.password : req.body.snPassword ? req.body.snPassword : "";

      const sepioEndpoint = sepioCredentials.sepioEndpoint ? sepioCredentials.sepioEndpoint : req.body.sepioEndpoint ? req.body.sepioEndpoint : "";
      const sepioUsername = sepioCredentials.sepioUsername ? sepioCredentials.sepioUsername : req.body.sepioUsername ? req.body.sepioUsername : "";
      const sepioPassword = sepioCredentials.sepioPassword ? sepioCredentials.sepioPassword : req.body.sepioPassword ? req.body.sepioPassword : "";

      const macAddress = req.body.macAddress ? req.body.macAddress : [];

      const isClientFormatRequired = req.body.isClientFormatRequired ? req.body.isClientFormatRequired : false;

      console.log('Received MAC addresses: ' + macAddress);

      if (snEndpoint && snUsername && snPassword) {

        const macCheckResult = await getMacAddresses(macAddress, snEndpoint, snUsername, snPassword);

        console.log('MAC check result: ' + macCheckResult);

        if (Array.isArray(macCheckResult)) {

          let responceForClientSide = [];
          let foundMacAddresses = [];
          let notFoundMacAddresses = [];

          for (const singleMac of macAddress) {

            const matchingResults = macCheckResult.filter(macCheckResult => macCheckResult.mac_address === singleMac && macCheckResult.sys_class_name.indexOf("cmdb_ci") >= 0);

            if (sepioEndpoint && sepioUsername && sepioPassword) {

              const sepioToken = await getSepioToken(sepioEndpoint, sepioUsername, sepioPassword);

              if (sepioToken) {
                const responceSepio = await addTagsToSepioElements(sepioToken, sepioEndpoint, matchingResults, singleMac);
              } else {
                res.status(500).json({
                  success: false,
                  error: "An attempt to get a token from Sepio failed"
                });
              }
            }

            let macAndTables = { "macAddress": "", "tables": [] };

            if (isClientFormatRequired) {

              if (matchingResults.length > 0) {
                macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
                macAndTables.tables = matchingResults.map(result => (result.sys_class_name));
              } else {
                macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
              }
              responceForClientSide.push(macAndTables);

            } else {
              if (matchingResults.length > 0) {
                macAndTables.macAddress = singleMac;
                macAndTables.tables = matchingResults.map(result => ({
                  table: result.sys_class_name,
                  sys_id: result.sys_id
                }));
                foundMacAddresses.push(macAndTables);
              } else {
                notFoundMacAddresses.push(singleMac);
              }
            }
          }
          console.log("responceForClientSide > " + responceForClientSide);
          let reqdRespons = isClientFormatRequired ? responceForClientSide : { success: true, foundMacAddresses, notFoundMacAddresses }
          res.json(reqdRespons);
        } else {
          res.status(500).json({
            success: false,
            error: "Unsupported data from ServiceNow instance. It should be 'array'"
          });
        }
      } else {
        res.status(500).json({
          success: false,
          error: macCheckResult.error
        });
      }
    } else {
      res.status(401).json({
        success: false,
        error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
  }
});

// Serve static files from the React build directory 
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});