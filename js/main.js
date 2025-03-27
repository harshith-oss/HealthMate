document.addEventListener("DOMContentLoaded", () => {
    // Modal functionality
    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const loginModal = document.getElementById("login-modal")
    const signupModal = document.getElementById("signup-modal")
    const closeBtns = document.querySelectorAll(".close")
    const showSignupLink = document.getElementById("show-signup")
    const showLoginLink = document.getElementById("show-login")
  
    // Open login modal
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block"
      })
    }
  
    // Open signup modal
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        signupModal.style.display = "block"
      })
    }
  
    // Close modals when clicking the X
    if (closeBtns) {
      closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          loginModal.style.display = "none"
          signupModal.style.display = "none"
        })
      })
    }
  
    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none"
      }
      if (e.target === signupModal) {
        signupModal.style.display = "none"
      }
    })
  
    // Switch between login and signup modals
    if (showSignupLink) {
      showSignupLink.addEventListener("click", (e) => {
        e.preventDefault()
        loginModal.style.display = "none"
        signupModal.style.display = "block"
      })
    }
  
    if (showLoginLink) {
      showLoginLink.addEventListener("click", (e) => {
        e.preventDefault()
        signupModal.style.display = "none"
        loginModal.style.display = "block"
      })
    }
  
    // Handle form submissions
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("login-email").value
        const password = document.getElementById("login-password").value
  
        // In a real application, you would send this data to the server
        console.log("Login attempt:", { email, password })
  
        // Simulate successful login
        alert("Login successful!")
        loginModal.style.display = "none"
  
        // Update UI to show logged in state
        if (loginBtn && signupBtn) {
          loginBtn.style.display = "none"
          signupBtn.style.display = "none"
  
          // Create user profile element
          const userProfile = document.querySelector(".user-profile")
          const profileElement = document.createElement("div")
          profileElement.className = "logged-in-user"
          profileElement.innerHTML = `
                      <span>${email}</span>
                      <button id="logout-btn">Logout</button>
                  `
          userProfile.appendChild(profileElement)
  
          // Add logout functionality
          document.getElementById("logout-btn").addEventListener("click", () => {
            profileElement.remove()
            loginBtn.style.display = "block"
            signupBtn.style.display = "block"
          })
        }
      })
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = document.getElementById("signup-name").value
        const email = document.getElementById("signup-email").value
        const password = document.getElementById("signup-password").value
        const confirmPassword = document.getElementById("signup-confirm-password").value
  
        // Validate passwords match
        if (password !== confirmPassword) {
          alert("Passwords do not match!")
          return
        }
  
        // In a real application, you would send this data to the server
        console.log("Signup attempt:", { name, email, password })
  
        // Simulate successful signup
        alert("Account created successfully! Please log in.")
        signupModal.style.display = "none"
        loginModal.style.display = "block"
      })
    }
  
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
  
    if (testimonials.length > 0 && dots.length > 0) {
      let currentSlide = 0
  
      // Hide all testimonials except the first one
      testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          testimonial.style.display = "none"
        }
      })
  
      // Function to show a specific slide
      const showSlide = (index) => {
        testimonials.forEach((testimonial) => {
          testimonial.style.display = "none"
        })
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        testimonials[index].style.display = "block"
        dots[index].classList.add("active")
        currentSlide = index
      }
  
      // Event listeners for dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index)
        })
      })
  
      // Event listeners for prev/next buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          let newIndex = currentSlide - 1
          if (newIndex < 0) {
            newIndex = testimonials.length - 1
          }
          showSlide(newIndex)
        })
  
        nextBtn.addEventListener("click", () => {
          let newIndex = currentSlide + 1
          if (newIndex >= testimonials.length) {
            newIndex = 0
          }
          showSlide(newIndex)
        })
      }
    }
  })
  
  