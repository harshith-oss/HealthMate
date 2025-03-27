document.addEventListener("DOMContentLoaded", () => {
    const appointmentForm = document.getElementById("appointment-form")
    const findErBtn = document.getElementById("find-er-btn")
  
    if (appointmentForm) {
      appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const name = document.getElementById("appointment-name").value
        const email = document.getElementById("appointment-email").value
        const phone = document.getElementById("appointment-phone").value
        const type = document.getElementById("appointment-type").value
        const date = document.getElementById("appointment-date").value
        const time = document.getElementById("appointment-time").value
        const symptoms = document.getElementById("appointment-symptoms").value
        const doctor = document.getElementById("appointment-doctor").value
        const urgent = document.getElementById("appointment-urgent").checked
  
        // Validate inputs
        if (!name || !email || !phone || !type || !date || !time) {
          alert("Please fill in all required fields.")
          return
        }
  
        // Prepare data for submission
        const data = {
          name,
          email,
          phone,
          type,
          date,
          time,
          symptoms,
          doctor,
          urgent,
        }
  
        console.log("Scheduling appointment with data:", data)
  
        // In a real application, you would send this data to the server
        // For now, we'll simulate a successful appointment booking
  
        // Show success message
        alert(
          `Appointment scheduled successfully for ${date} during the ${time} time slot. We will contact you at ${phone} to confirm the exact time.`,
        )
  
        // Reset form
        appointmentForm.reset()
      })
    }
  
    if (findErBtn) {
      findErBtn.addEventListener("click", () => {
        // In a real application, this would use geolocation and a map API
        // For now, we'll simulate finding nearby emergency rooms
  
        alert("Finding emergency rooms near your location...")
  
        // Simulate loading
        setTimeout(() => {
          const nearbyERs = [
            {
              name: "City General Hospital ER",
              distance: "2.3 miles",
              address: "123 Medical Center Dr",
              phone: "(555) 123-4567",
              waitTime: "15-30 minutes",
            },
            {
              name: "County Medical Center",
              distance: "4.1 miles",
              address: "456 Healthcare Ave",
              phone: "(555) 987-6543",
              waitTime: "30-45 minutes",
            },
            {
              name: "Urgent Care Clinic",
              distance: "1.5 miles",
              address: "789 Urgent Way",
              phone: "(555) 456-7890",
              waitTime: "10-20 minutes",
            },
          ]
  
          let erListHTML = "<h3>Nearby Emergency Rooms</h3><ul>"
          nearbyERs.forEach((er) => {
            erListHTML += `
                          <li>
                              <strong>${er.name}</strong> (${er.distance})<br>
                              ${er.address}<br>
                              Phone: ${er.phone}<br>
                              Estimated Wait: ${er.waitTime}
                          </li>
                      `
          })
          erListHTML += "</ul>"
  
          // Create a modal to display the results
          const erModal = document.createElement("div")
          erModal.className = "modal"
          erModal.style.display = "block"
          erModal.innerHTML = `
                      <div class="modal-content">
                          <span class="close">&times;</span>
                          ${erListHTML}
                      </div>
                  `
  
          document.body.appendChild(erModal)
  
          // Add close functionality
          erModal.querySelector(".close").addEventListener("click", () => {
            erModal.remove()
          })
  
          // Close when clicking outside
          window.addEventListener("click", (e) => {
            if (e.target === erModal) {
              erModal.remove()
            }
          })
        }, 1500)
      })
    }
  })
  
  