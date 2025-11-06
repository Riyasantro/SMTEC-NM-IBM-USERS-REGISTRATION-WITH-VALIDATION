// --- UI Animation for Login/Register Switch ---
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// --- Backend Connection (Render URL) ---
const BACKEND_URL = "https://smtec-user-registration-backend.onrender.com";

// --- Registration Handler ---
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    showPopup("All fields are required!", "error");
    return;
  }

  if (password.length < 8) {
    showPopup("Password must be at least 8 characters long!", "error");
    return;
  }

  if (password !== confirmPassword) {
    showPopup("Passwords do not match!", "error");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      showPopup("Registration successful! You can now log in.", "success");
      document.getElementById("registerForm").reset();
      container.classList.remove("right-panel-active");
    } else {
      const data = await response.json();
      showPopup(data.message || "Registration failed.", "error");
    }
  } catch (error) {
    showPopup("Network error. Please try again later.", "error");
  }
});

// --- Login Handler ---
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showPopup("Please fill in both email and password.", "error");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
  const data = await response.json();
  localStorage.setItem("loggedUser", JSON.stringify(data.user));

  showPopup("Login successful! Redirecting...", "success");
  document.getElementById("loginForm").reset();

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1500);
}
 else {
      const data = await response.json();
      showPopup(data.message || "Invalid credentials.", "error");
    }
  } catch (error) {
    showPopup("Network error. Please try again later.", "error");
  }
});

// --- Popup Notification Function ---
function showPopup(message, type = "info") {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 50);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}

// --- Popup Styling ---
const style = document.createElement("style");
style.textContent = `
.popup {
  position: fixed;
  top: 20px;
  right: -400px;
  padding: 12px 20px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: right 0.3s ease, opacity 0.3s;
  z-index: 1000;
  opacity: 0.95;
}
.popup.show {
  right: 20px;
}
.popup.success {
  background: #16a34a;
}
.popup.error {
  background: #dc2626;
}
.popup.info {
  background: #2563eb;
}
`;
document.head.appendChild(style);
