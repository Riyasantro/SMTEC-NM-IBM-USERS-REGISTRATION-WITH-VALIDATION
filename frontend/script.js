// ---- CONFIG ----
const BACKEND_URL = "https://smtec-user-registration-backend.onrender.com"; // replace with your backend URL

// Element
const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirmPassword');
const msg = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const pwdStrength = document.getElementById('pwdStrength');
document.getElementById('backendUrl').innerText = BACKEND_URL || 'REPLACE_WITH_BACKEND_URL';

// Regex helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function passwordScore(password){
  let score = 0;
  if(password.length >= 6) score++;
  if(/[A-Z]/.test(password)) score++;
  if(/[0-9]/.test(password)) score++;
  if(/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0..4
}

function clearErrors(){
  [nameError,emailError,passwordError,confirmPasswordError].forEach(e=> e.innerText = '');
  msg.className = ''; msg.innerText = '';
}

function showMessage(text, type='success'){
  msg.className = type === 'success' ? 'success' : 'error';
  msg.innerText = text;
}

// Real-time validation
emailInput.addEventListener('input', ()=>{
  emailError.innerText = emailRegex.test(emailInput.value) ? '' : 'Enter a valid email';
});

pwdInput.addEventListener('input', ()=>{
  const score = passwordScore(pwdInput.value);
  pwdStrength.value = score;
  if (pwdInput.value.length > 0 && score < 2) {
    passwordError.innerText = 'Password is weak. Use letters, numbers and symbols.';
  } else {
    passwordError.innerText = '';
  }
});

confirmPwdInput.addEventListener('input', ()=>{
  confirmPasswordError.innerText = (pwdInput.value !== confirmPwdInput.value) ? "Passwords don't match" : '';
});

// Form submit
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = pwdInput.value;
  const confirmPassword = confirmPwdInput.value;

  // client-side validation
  let hasError = false;
  if(!name){ nameError.innerText = 'Name is required'; hasError = true; }
  if(!email || !emailRegex.test(email)){ emailError.innerText = 'Valid email is required'; hasError = true; }
  if(!password || password.length < 6){ passwordError.innerText = 'Password must be at least 6 characters'; hasError = true; }
  if(password !== confirmPassword){ confirmPasswordError.innerText = 'Passwords do not match'; hasError = true; }

  if(hasError) return;

  // disable button to prevent duplicate requests
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerText = 'Registering...';

  try {
    const res = await fetch(`${BACKEND_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if(res.ok){
      showMessage(data.message || 'Registered successfully', 'success');
      form.reset();
      pwdStrength.value = 0;
    } else {
      showMessage(data.message || 'Registration failed', 'error');
    }
  } catch (err) {
    showMessage('Network error. Try again later.', 'error');
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Register';
  }
});
