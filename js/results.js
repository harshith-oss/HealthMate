document.addEventListener("DOMContentLoaded", () => {
    // Set the current date
    const generationDateElement = document.getElementById("generation-date")
    if (generationDateElement) {
      const currentDate = new Date()
      const options = { year: "numeric", month: "long", day: "numeric" }
      generationDateElement.textContent = currentDate.toLocaleDateString("en-US", options)
    }
  
    // Get data from localStorage (in a real app, this would come from a database)
    const guidanceData = localStorage.getItem("medicineGuidanceData")
  
    if (guidanceData) {
      const data = JSON.parse(guidanceData)
      console.log("Retrieved guidance data:", data)
  
      // Update the medications list
      const medicationsListElement = document.querySelector(".medications-list")
      if (medicationsListElement && data.medications && data.medications.length > 0) {
        medicationsListElement.innerHTML = ""
  
        data.medications.forEach((medication) => {
          // In a real app, you would fetch dosage info from a database
          // For now, we'll use some sample dosages
          let dosage = ""
          if (medication.includes("Lisinopril")) {
            dosage = "10mg, Once daily"
          } else if (medication.includes("Metformin")) {
            dosage = "500mg, Twice daily"
          } else if (medication.includes("Atorvastatin") || medication.includes("Lipitor")) {
            dosage = "20mg, Once daily at bedtime"
          } else if (medication.includes("Acetaminophen") || medication.includes("Tylenol")) {
            dosage = "500mg, As needed for pain"
          } else if (medication.includes("Ibuprofen") || medication.includes("Advil")) {
            dosage = "200mg, As needed for pain"
          } else {
            dosage = "Standard dosage"
          }
  
          const medicationItem = document.createElement("div")
          medicationItem.className = "medication-item"
          medicationItem.innerHTML = `
                      <div class="medication-name">${medication}</div>
                      <div class="medication-dosage">${dosage}</div>
                  `
  
          medicationsListElement.appendChild(medicationItem)
        })
      }
  
      // In a real application, you would generate detailed guidance based on the data
      // For now, we'll keep the sample guidance that's already in the HTML
    }
  
    // Print functionality
    const printBtn = document.querySelector(".results-actions .btn:nth-child(1)")
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print()
      })
    }
  
    // Download PDF functionality
    const downloadBtn = document.querySelector(".results-actions .btn:nth-child(2)")
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        alert("In a real application, this would generate and download a PDF of your guidance.")
      })
    }
  
    // Share functionality
    const shareBtn = document.querySelector(".results-actions .btn:nth-child(3)")
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        // Create a modal for sharing options
        const shareModal = document.createElement("div")
        shareModal.className = "modal"
        shareModal.style.display = "block"
        shareModal.innerHTML = `
                  <div class="modal-content">
                      <span class="close">&times;</span>
                      <h2>Share Your Guidance</h2>
                      <div class="share-options">
                          <button class="btn secondary-btn"><i class="fas fa-envelope"></i> Email</button>
                          <button class="btn secondary-btn"><i class="fas fa-phone"></i> Text Message</button>
                          <button class="btn secondary-btn"><i class="fab fa-whatsapp"></i> WhatsApp</button>
                      </div>
                      <div class="share-link">
                          <p>Or copy this link:</p>
                          <input type="text" value="https://medisafe.example.com/shared/guidance/12345" readonly>
                          <button class="btn small-btn">Copy</button>
                      </div>
                  </div>
              `
  
        document.body.appendChild(shareModal)
  
        // Add close functionality
        shareModal.querySelector(".close").addEventListener("click", () => {
          shareModal.remove()
        })
  
        // Copy link functionality
        const copyBtn = shareModal.querySelector(".share-link button")
        const linkInput = shareModal.querySelector(".share-link input")
  
        copyBtn.addEventListener("click", () => {
          linkInput.select()
          document.execCommand("copy")
          copyBtn.textContent = "Copied!"
          setTimeout(() => {
            copyBtn.textContent = "Copy"
          }, 2000)
        })
  
        // Close when clicking outside
        window.addEventListener("click", (e) => {
          if (e.target === shareModal) {
            shareModal.remove()
          }
        })
  
        // Add click handlers for share options
        const shareOptions = shareModal.querySelectorAll(".share-options button")
        shareOptions.forEach((option) => {
          option.addEventListener("click", () => {
            alert(`In a real application, this would share via ${option.textContent.trim()}`)
            shareModal.remove()
          })
        })
      })
    }
  
    // Feedback functionality
    const helpfulBtn = document.getElementById("helpful-btn")
    const notHelpfulBtn = document.getElementById("not-helpful-btn")
  
    if (helpfulBtn && notHelpfulBtn) {
      helpfulBtn.addEventListener("click", () => {
        provideFeedback(true)
      })
  
      notHelpfulBtn.addEventListener("click", () => {
        provideFeedback(false)
      })
  
      function provideFeedback(isHelpful) {
        // In a real application, you would send this feedback to the server
        console.log("Feedback provided:", isHelpful ? "Helpful" : "Not helpful")
  
        // Show feedback modal
        const feedbackModal = document.createElement("div")
        feedbackModal.className = "modal"
        feedbackModal.style.display = "block"
  
        if (isHelpful) {
          feedbackModal.innerHTML = `
                      <div class="modal-content">
                          <span class="close">&times;</span>
                          <h2>Thank You for Your Feedback!</h2>
                          <p>We're glad you found the guidance helpful. Is there anything specific that was most useful to you?</p>
                          <textarea rows="4" placeholder="Your comments (optional)"></textarea>
                          <button class="btn primary-btn">Submit</button>
                      </div>
                  `
        } else {
          feedbackModal.innerHTML = `
                      <div class="modal-content">
                          <span class="close">&times;</span>
                          <h2>We're Sorry to Hear That</h2>
                          <p>Please let us know how we can improve our guidance:</p>
                          <div class="feedback-options">
                              <div class="checkbox-group">
                                  <input type="checkbox" id="feedback-unclear">
                                  <label for="feedback-unclear">Instructions were unclear</label>
                              </div>
                              <div class="checkbox-group">
                                  <input type="checkbox" id="feedback-incomplete">
                                  <label for="feedback-incomplete">Information was incomplete</label>
                              </div>
                              <div class="checkbox-group">
                                  <input type="checkbox" id="feedback-inaccurate">
                                  <label for="feedback-inaccurate">Information seemed inaccurate</label>
                              </div>
                              <div class="checkbox-group">
                                  <input type="checkbox" id="feedback-other">
                                  <label for="feedback-other">Other reason</label>
                              </div>
                          </div>
                          <textarea rows="4" placeholder="Additional comments (optional)"></textarea>
                          <button class="btn primary-btn">Submit</button>
                      </div>
                  `
        }
  
        document.body.appendChild(feedbackModal)
  
        // Add close functionality
        feedbackModal.querySelector(".close").addEventListener("click", () => {
          feedbackModal.remove()
        })
  
        // Submit button functionality
        feedbackModal.querySelector(".btn.primary-btn").addEventListener("click", () => {
          alert("Thank you for your feedback! We will use it to improve our guidance.")
          feedbackModal.remove()
  
          // Disable feedback buttons to prevent multiple submissions
          helpfulBtn.disabled = true
          notHelpfulBtn.disabled = true
  
          // Update UI to show feedback was received
          const feedbackSection = document.querySelector(".results-feedback")
          feedbackSection.innerHTML = "<h3>Thank you for your feedback!</h3>"
        })
  
        // Close when clicking outside
        window.addEventListener("click", (e) => {
          if (e.target === feedbackModal) {
            feedbackModal.remove()
          }
        })
      }
    }
  })
  
  