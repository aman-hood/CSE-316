let users = JSON.parse(localStorage.getItem("users")) || {};
 let loggedInUser = "";
 let storedFiles = JSON.parse(localStorage.getItem("storedFiles")) || {};
 
 function showSignup() {
     document.getElementById("signup").classList.remove("hidden");
     document.getElementById("login").classList.add("hidden");
 }
 
 function showLogin() {
     document.getElementById("signup").classList.add("hidden");
     document.getElementById("login").classList.remove("hidden");
 }
 
 function signUp() {
     let newUsername = document.getElementById("newUsername").value.trim();
     let newPassword = document.getElementById("newPassword").value;
     
     if (!newUsername || !newPassword) {
         alert("Username and password cannot be empty.");
         return;
     }
 
     if (users[newUsername]) {
         alert("Username already exists!");
     } else {
         users[newUsername] = newPassword;
         localStorage.setItem("users", JSON.stringify(users));
         alert("Account created successfully! Please log in.");
         showLogin();
     }
 }
 
 function authenticate() {
     let username = document.getElementById("username").value.trim();
     let password = document.getElementById("password").value;
 
     if (users[username] && users[username] === password) {
         loggedInUser = username;
         document.getElementById("auth-section").classList.add("hidden");
         document.getElementById("file-section").classList.remove("hidden");
         document.getElementById("userDisplay").innerText = loggedInUser;
         loadStoredFiles();
     } else {
         alert("Incorrect username or password!");
     }
 }
 
 function logout() {
     loggedInUser = "";
     document.getElementById("file-section").classList.add("hidden");
     document.getElementById("auth-section").classList.remove("hidden");
     document.getElementById("fileList").innerHTML = "";
     showLogin();
 }
 
 function encryptFiles() {
     const files = document.getElementById("fileInput").files;
     if (files.length === 0) {
         alert("Select at least one file");
         return;
     }
 
     if (!storedFiles[loggedInUser]) storedFiles[loggedInUser] = [];
 
     Array.from(files).forEach(file => {
         const reader = new FileReader();
         reader.onload = function(event) {
             const base64String = btoa(event.target.result);
             const encrypted = CryptoJS.AES.encrypt(base64String, users[loggedInUser]).toString();
             const timestamp = new Date().toLocaleString();
             storedFiles[loggedInUser].push({ name: file.name, data: encrypted, type: file.type, timestamp });
             saveStoredFiles();
             loadStoredFiles();
         };
         reader.readAsBinaryString(file);
     });
 }
 
 function decryptFile(index) {
     const file = storedFiles[loggedInUser][index];
     const decrypted = CryptoJS.AES.decrypt(file.data, users[loggedInUser]).toString(CryptoJS.enc.Utf8);
     const binaryData = atob(decrypted);
     const arrayBuffer = new Uint8Array(binaryData.length);
     for (let i = 0; i < binaryData.length; i++) {
         arrayBuffer[i] = binaryData.charCodeAt(i);
     }
     const blob = new Blob([arrayBuffer], { type: file.type });
     const a = document.createElement("a");
     a.href = URL.createObjectURL(blob);
     a.download = file.name;
     a.click();
 }
 
 function deleteFile(index) {
     storedFiles[loggedInUser].splice(index, 1);
     saveStoredFiles();
     loadStoredFiles();
 }
 
 function saveStoredFiles() {
     localStorage.setItem("storedFiles", JSON.stringify(storedFiles));
 }
 
 function loadStoredFiles() {
     storedFiles = JSON.parse(localStorage.getItem("storedFiles")) || {};
     let fileTable = `
         <table class="file-table">
             <tr>
                 <th>File Name</th>
                 <th>Timestamp</th>
                 <th>Actions</th>
             </tr>`;
 
     if (storedFiles[loggedInUser]) {
         storedFiles[loggedInUser].forEach((file, index) => {
             fileTable += `
                 <tr>
                     <td>${file.name}</td>
                     <td>${file.timestamp}</td>
                     <td class="actions">
                         <button class="download-btn" onclick="decryptFile(${index})">⬇</button>
                         <button class="delete-btn" onclick="deleteFile(${index})">❌</button>
                     </td>
                 </tr>`;
         });
     }
 
     fileTable += `</table>`;
     document.getElementById("fileList").innerHTML = fileTable;
 }