# 📘 SMTEC-NM-IBM-User-Registration-with-Validation

A **full-stack user registration and login system** built using **Node.js, Express, MongoDB, HTML, CSS, and JavaScript**, with complete **frontend validation**, secure **password encryption**, and **cloud deployment** using Render, Netlify, and MongoDB Atlas.

---

## 🚀 Live Demo

- 🌐 **Frontend (Netlify):** [https://user-registration-01.netlify.app/](https://user-registration-01.netlify.app/)
- ⚙️ **Backend (Render API):** [https://smtec-user-registration-backend.onrender.com/](https://smtec-user-registration-backend.onrender.com/)
- 🧩 **GitHub Repo:** [https://github.com/Riyasantro/SMTEC-NM-IBM-USERS-REGISTRATION-WITH-VALIDATION](https://github.com/Riyasantro/SMTEC-NM-IBM-USERS-REGISTRATION-WITH-VALIDATION)

---

## 🧠 Project Overview

This project demonstrates a **complete authentication system** where users can:
- Register with name, email, and password  
- Login securely using bcrypt password hashing  
- View a personalized dashboard after login  
- Logout safely to end the session  

The system also includes **client-side validation**, **backend verification**, and **MongoDB cloud integration**.

---

## ⚙️ Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| 🧠 Frontend | HTML, CSS, JavaScript | Responsive single-page UI (Login + Register + Dashboard) |
| ⚙️ Backend | Node.js, Express.js | REST API endpoints for Register/Login |
| 💾 Database | MongoDB Atlas | Cloud database to store user data securely |
| 🔐 Security | bcryptjs | Encrypts passwords before storing |
| 🌐 Deployment | Netlify + Render | Cloud-hosted frontend and backend |
| 🔁 Version Control | Git + GitHub | Source management and collaboration |

---

## 🧰 Features

### 🧾 Frontend
✅ Animated single-page **Login/Register UI**  
✅ Frontend validation (password match, empty fields, etc.)    
✅ Dashboard with **Welcome, User 👋** and logout button  
✅ Mobile-friendly responsive design  

### ⚙️ Backend
✅ REST API with Express  
✅ Secure password encryption using bcryptjs  
✅ CORS-enabled for Netlify frontend  
✅ MongoDB Atlas cloud database integration  
✅ Deployed and tested live on Render  

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/login` | Login with existing credentials |
| `GET` | `/` | Default API test route |

## 🧑‍💻 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Riyasantro/SMTEC-NM-IBM-USERS-REGISTRATION-WITH-VALIDATION.git
cd SMTEC-NM-IBM-USERS-REGISTRATION-WITH-VALIDATION
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
### Create a .env file in the backend directory:
```bash
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
```
### Run the backend:
```bash
npm run dev
```
---
## 📸 Screenshots
### 🔹 Login / Register Page

<img width="1892" height="912" alt="image" src="https://github.com/user-attachments/assets/9286ded0-d5e5-463c-b310-512da1dd0a3c" />
<img width="1888" height="912" alt="Screenshot 2025-11-06 073235" src="https://github.com/user-attachments/assets/de45eab4-5353-4724-977c-f6815c75f6af" />


### 🔹 Dashboard

<img width="1563" height="811" alt="image" src="https://github.com/user-attachments/assets/b4a5542d-eeca-4487-aab4-a9bcc8938efd" />

---

### 🧭 Future Enhancements

JWT Authentication (persistent login)

Profile image upload

Email verification / password reset

Role-based access (Admin/User)

Analytics dashboard with charts

### 📄 License

This project is licensed under the MIT License — free to use, modify, and share with attribution.

### 💬 Conclusion

This project demonstrates a complete end-to-end web application integrating cloud services, secure authentication, and responsive design — a solid example of real-world full-stack development 🌐.



