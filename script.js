let folders = {}; // Stores folders & files

// Create a new folder
function createFolder() {
    let folderName = document.getElementById("folderName").value.trim();
    let password = document.getElementById("folderPassword").value.trim();

    if (!folderName || !password) {
        alert("Folder name and password are required!");
        return;
    }

    if (folders[folderName]) {
        alert("Folder already exists!");
        return;
    }

    folders[folderName] = { password, files: [] };

    let dropdown = document.getElementById("folderDropdown");
    let option = document.createElement("option");
    option.value = folderName;
    option.textContent = "📂 " + folderName;
    dropdown.appendChild(option);

    alert(`Folder "${folderName}" created successfully!`);
}

// Upload a file to the selected folder
function uploadFile() {
    let folderName = document.getElementById("folderDropdown").value;
    let fileInput = document.getElementById("fileInput");
    let file = fileInput.files[0];

    if (!folderName) {
        alert("Select a folder first!");
        return;
    }

    if (!file) {
        alert("Choose a file to upload!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let fileContent = e.target.result;
        let password = folders[folderName].password;

        // Encrypt the file content
        let encryptedContent = CryptoJS.AES.encrypt(fileContent, password).toString();

        let uniqueId = Date.now(); // Unique identifier for sharing
        folders[folderName].files.push({ id: uniqueId, name: file.name, content: encryptedContent });

        alert(`File "${file.name}" uploaded successfully!`);
        loadFiles();
    };
    reader.readAsDataURL(file);
}

// Display files in the selected folder
function loadFiles() {
    let folderName = document.getElementById("folderDropdown").value;
    let folder = folders[folderName];

    if (!folder) return;

    let fileList = document.getElementById("fileList");
    fileList.innerHTML = `<h3>📂 Files in ${folderName}</h3>`;

    folder.files.forEach((file, index) => {
        let fileItem = document.createElement("div");
        fileItem.classList.add("file-item");
        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <div class="file-actions">
                <button onclick="downloadFile('${folderName}', ${index})">🔽 Download</button>
                <button onclick="deleteFile('${folderName}', ${index})">❌ Delete</button>
                <input type="text" id="shareLink-${file.id}" value="${generateShareableLink(file.id)}" readonly>
                <button onclick="copyLink('${file.id}')">📋 Copy Link</button>
            </div>
        `;
        fileList.appendChild(fileItem);
    });
}

// Generate a shareable link
function generateShareableLink(fileId) {
    return `${window.location.origin}/download?fileId=${fileId}`;
}

// Copy shareable link
function copyLink(fileId) {
    let linkInput = document.getElementById(`shareLink-${fileId}`);
    linkInput.select();
    document.execCommand("copy");
    alert("Shareable link copied!");
}

// Download a file (decrypts content)
function downloadFile(folderName, fileIndex) {
    let folder = folders[folderName];
    let file = folder.files[fileIndex];

    if (!file) {
        alert("File not found!");
        return;
    }

    let password = prompt("Enter folder password to decrypt file:");
    if (password !== folder.password) {
        alert("Incorrect password!");
        return;
    }

    let decryptedContent = CryptoJS.AES.decrypt(file.content, password).toString(CryptoJS.enc.Utf8);

    // Create a download link
    let link = document.createElement("a");
    link.href = decryptedContent;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Delete a file
function deleteFile(folderName, fileIndex) {
    let folder = folders[folderName];

    if (!folder) {
        alert("Folder not found!");
        return;
    }

    let fileName = folder.files[fileIndex].name;
    folder.files.splice(fileIndex, 1); // Remove file from folder

    alert(`File "${fileName}" deleted successfully!`);
    loadFiles(); // Refresh file list
}
