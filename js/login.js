document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const loginTabBtn = document.getElementById("login-tab-btn")
    const signupTabBtn = document.getElementById("signup-tab-btn")
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    const guestAccessBtn = document.getElementById("guest-access-btn")
  
    // Switch between login and signup tabs
    loginTabBtn.addEventListener("click", () => {
      loginTabBtn.classList.add("active")
      signupTabBtn.classList.remove("active")
      loginForm.classList.remove("hidden")
      signupForm.classList.add("hidden")
    })
  
    signupTabBtn.addEventListener("click", () => {
      signupTabBtn.classList.add("active")
      loginTabBtn.classList.remove("active")
      signupForm.classList.remove("hidden")
      loginForm.classList.add("hidden")
    })
  
    // Handle login form submission
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value
  
      // In a real app, you would validate credentials with the server
      console.log("Login attempt:", { email, password })
  
      // For demo purposes, just redirect to the home page
      window.location.href = "index.html"
    })
  
    // Handle signup form submission
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("signup-confirm-password").value
  
      // Validate passwords match
      if (password !== confirmPassword) {
        alert("Passwords don't match!")
        return
      }
  
      // In a real app, you would send this data to the server
      console.log("Signup attempt:", { name, email, password })
  
      // For demo purposes, just redirect to the home page
      window.location.href = "index.html"
    })
  
    // Guest access button
    guestAccessBtn.addEventListener("click", () => {
      window.location.href = "index.html"
    })
  })
  
  