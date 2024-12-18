// // import React from "react";

// // export default function Testingwork() {
// //   return (
// //     <>
          
// //     </>
// //   );
// // }
// import React, { useEffect } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com"; // Replace with your Google Client ID
// const API_KEY = "YOUR_API_KEY"; // Replace with your Google API Key
// const SCOPES = "https://www.googleapis.com/auth/drive.file";

// export default function Testingwork () {
//   useEffect(() => {
//     // Initialize the Google API client
//     const start = () => {
//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         scope: SCOPES,
//         discoveryDocs: [
//           "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
//         ],
//       });
//     };
//     gapi.load("client:auth2", start);
//   }, []);

//   // Authenticate user
//   const handleAuthClick = () => {
//     gapi.auth2.getAuthInstance().signIn().then(() => {
//       console.log("User signed in");
//     });
//   };

//   // Sign out user
//   const handleSignOutClick = () => {
//     gapi.auth2.getAuthInstance().signOut().then(() => {
//       console.log("User signed out");
//     });
//   };

//   // Upload file to Google Drive
//   const uploadFile = () => {
//     const fileContent = "Hello, Google Drive!"; // Replace with file content
//     const file = new Blob([fileContent], { type: "text/plain" }); // Create a Blob
//     const metadata = {
//       name: "example.txt", // Name of the file in Google Drive
//       mimeType: "text/plain",
//     };

//     // Get the access token
//     const accessToken = gapi.auth.getToken().access_token;

//     // Create a FormData object
//     const form = new FormData();
//     form.append(
//       "metadata",
//       new Blob([JSON.stringify(metadata)], { type: "application/json" })
//     );
//     form.append("file", file);

//     // Send the file to Google Drive
//     fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
//       method: "POST",
//       headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
//       body: form,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("File uploaded successfully:", data);
//       })
//       .catch((error) => {
//         console.error("Error uploading file:", error);
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Google Drive Upload</h2>
//       <button onClick={handleAuthClick} className="btn btn-primary">
//         Sign in with Google
//       </button>
//       <button onClick={handleSignOutClick} className="btn btn-secondary mx-2">
//         Sign Out
//       </button>
//       <button onClick={uploadFile} className="btn btn-success">
//         Upload File
//       </button>
//     </div>
//   );
// };


