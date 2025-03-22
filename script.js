let storedFiles = {};

function encryptFiles() {
    const files = document.getElementById("fileInput").files;
    if (files.length === 0) return alert("Select at least one file");
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64String = btoa(event.target.result);
            const encrypted = CryptoJS.AES.encrypt(base64String, "secret-key").toString();
            storedFiles[file.name] = { data: encrypted, type: file.type };
            saveStoredFiles();
            loadStoredFiles();
        };
        reader.readAsBinaryString(file);
    });
    document.getElementById("status").innerText = "Files encrypted and stored successfully";
}

function deleteFile(filename) {
    delete storedFiles[filename];
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
    
    Object.keys(storedFiles).forEach(filename => {
        let file = storedFiles[filename];
        let li = document.createElement("li");
        li.innerHTML = `<span>${filename}</span> 
                        <button onclick="deleteFile('${filename}')">Delete</button>`;
        if (file.type.startsWith("image")) {
            document.getElementById("imageList").appendChild(li);
        } else if (file.type.includes("pdf") || file.type.includes("document")) {
            document.getElementById("documentList").appendChild(li);
        } else {
            document.getElementById("otherList").appendChild(li);
        }
    });
}
