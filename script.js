
let users = JSON.parse(localStorage.getItem("users")) || {};
let loggedInUser = "";
let storedFiles = {};

function signup() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    if (users[username]) {
        alert("Username already exists!");
        return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (users[username] && users[username] === password) {
        loggedInUser = username;
        document.getElementById("login").style.display = "none";
        document.getElementById("auth").style.display = "block";
        document.getElementById("userDisplay").innerText = loggedInUser;
        loadStoredFiles();
    } else {
        alert("Incorrect Username or Password!");
    }
}

function logout() {
    loggedInUser = "";
    document.getElementById("auth").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function encryptFiles() {
    const files = document.getElementById("fileInput").files;
    if (files.length === 0) return alert("Select at least one file");
    if (!storedFiles[loggedInUser]) storedFiles[loggedInUser] = [];
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64String = btoa(event.target.result);
            const encrypted = CryptoJS.AES.encrypt(base64String, users[loggedInUser]).toString();
            storedFiles[loggedInUser].push({ name: file.name, data: encrypted, type: file.type });
            saveStoredFiles();
            loadStoredFiles();
        };
        reader.readAsBinaryString(file);
    });
    document.getElementById("status").innerText = "Files encrypted and stored successfully";
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
    document.getElementById("imageList").innerHTML = "";
    document.getElementById("documentList").innerHTML = "";
    document.getElementById("otherList").innerHTML = "";
    
    if (storedFiles[loggedInUser]) {
        storedFiles[loggedInUser].forEach((file, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<span>${file.name}</span> 
                            <button onclick="deleteFile(${index})">Delete</button>`;
            if (file.type.startsWith("image")) {
                document.getElementById("imageList").appendChild(li);
            } else if (file.type.includes("pdf") || file.type.includes("document")) {
                document.getElementById("documentList").appendChild(li);
            } else {
                document.getElementById("otherList").appendChild(li);
            }
        });
    }
}
