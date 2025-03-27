# CSE-316 Project Repository 

# SECURE FILE MANAGEMENT SYSTEM

## Overview
The Secure File Management System is a web-based program that will allow users to have a secure platform for uploading, storing, and managing files securely. The major objective of this system is data confidentiality, integrity, and restricted access by utilizing several layers of security. The users will have the capability of registering, logging in, and managing their files with encryption in both the uploading and storage phases.
The deliverables include a full web application accessible through contemporary browsers, with secure user accounts. The files will be kept in encrypted form, and there will be an audit trail that stores all important actions (uploads, downloads, deletion, and sharing events) for security purposes. The interface will be easy to use with simplicity without compromising strong security features.

## Features
User Authentication System:
1.	User Registration with Email Verification - New users provide credentials and receive a verification link via email to confirm their identity, preventing fake accounts.
2.	Secure Login/Logout - Implements encrypted session tokens and proper session invalidation to prevent unauthorized access during and after use.
File Management Interface:
3.	File Upload with Progress Indicators - Drag-and-drop interface with visual upload progress and file size validation.
4.	Folder Creation and Organization - Hierarchical directory system allowing logical grouping of files, images, others.
5.	Bulk Operations - Time-saving batch actions allowing multiple files to be downloaded, moved, or deleted simultaneously.
Security & Sharing System:
6.	Client-Side Encryption - Files are encrypted in the browser before transmission to prevent interception vulnerabilities.
7.	Activity Logging - Comprehensive audit trail recording:
    File uploads/downloads, Sharing events, Deletion attempts, Permission changes.

## Programming Languages:
•	HTML, CSS
•	JavaScript
•	PHP

## Libraries and Tools:
•	PHPMailer (for email), Defuse PHP Encryption (for server-side crypto)
•	Libraries: jQuery (for AJAX), CryptoJS (for client-side encryption), Dropzone.js (for file uploads)
•	Database (part of XAMPP Server).

## Other Tools:
•	GitHub for version control
•	XAMPP Server
•	Draw.io for Flow Diagram
•	VS Code Editor
