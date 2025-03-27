document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const getStartedBtn = document.getElementById("get-started-btn")
    const inputSection = document.getElementById("input-section")
    const resultsSection = document.getElementById("results-section")
    const analyzeBtn = document.getElementById("analyze-btn")
    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const loginModal = document.getElementById("login-modal")
    const signupModal = document.getElementById("signup-modal")
    const closeBtns = document.querySelectorAll(".close")
    const symptomInput = document.getElementById("symptom-input")
    const addSymptomBtn = document.getElementById("add-symptom-btn")
    const symptomTags = document.getElementById("symptom-tags")
    const diseaseInput = document.getElementById("disease-input")
    const diseaseSuggestions = document.getElementById("disease-suggestions")
    const symptomSuggestions = document.getElementById("symptom-suggestions")
    const medicineRecommendations = document.getElementById("medicine-recommendations")
    const medicineDetails = document.getElementById("medicine-details")
    const medicineName = document.getElementById("medicine-name")
    const medicineDescription = document.getElementById("medicine-description")
    const medicineDosage = document.getElementById("medicine-dosage")
    const medicineUsage = document.getElementById("medicine-usage")
    const medicineSideEffects = document.getElementById("medicine-side-effects")
    const helpfulBtn = document.getElementById("helpful-btn")
    const notHelpfulBtn = document.getElementById("not-helpful-btn")
    const diagnosisResult = document.getElementById("diagnosis-result")
  
    // Sample data (in a real application, this would come from a backend API)
    const diseases = [
      "Common Cold",
      "Flu",
      "Allergies",
      "Headache",
      "Migraine",
      "Fever",
      "Cough",
      "Sore Throat",
      "Stomach Ache",
      "Diarrhea",
    ]
  
    const symptoms = [
      "Fever",
      "Cough",
      "Headache",
      "Sore Throat",
      "Runny Nose",
      "Sneezing",
      "Body Aches",
      "Fatigue",
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Chills",
      "Sweating",
      "Dizziness",
      "Congestion",
    ]
  
    const medicines = {
      "Common Cold": [
        {
          name: "Acetaminophen",
          description: "A pain reliever and fever reducer that can help alleviate cold symptoms.",
          dosage:
            "Adults and children 12 years and over: 2 tablets every 4-6 hours as needed. Do not exceed 6 tablets in 24 hours.",
          usage: [
            "Take with a full glass of water",
            "Can be taken with or without food",
            "Do not take more than directed",
          ],
          sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Headache"],
          match: 85,
        },
        {
          name: "Dextromethorphan",
          description: "A cough suppressant that helps reduce coughing.",
          dosage:
            "Adults and children 12 years and over: 2 teaspoons (10 mL) every 4 hours. Do not exceed 12 teaspoons in 24 hours.",
          usage: [
            "Use the measuring cup provided",
            "Do not use for persistent or chronic cough",
            "Drink plenty of water while taking this medication",
          ],
          sideEffects: ["Dizziness", "Drowsiness", "Nausea", "Nervousness"],
          match: 75,
        },
      ],
      Headache: [
        {
          name: "Ibuprofen",
          description: "A nonsteroidal anti-inflammatory drug (NSAID) that reduces pain, inflammation, and fever.",
          dosage: "Adults: 1-2 tablets (200-400 mg) every 4-6 hours as needed. Do not exceed 6 tablets in 24 hours.",
          usage: [
            "Take with food or milk to prevent stomach upset",
            "Take with a full glass of water",
            "Do not lie down for 10 minutes after taking",
          ],
          sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness"],
          match: 90,
        },
        {
          name: "Aspirin",
          description: "A pain reliever, fever reducer, and anti-inflammatory medication.",
          dosage: "Adults: 1-2 tablets (325-650 mg) every 4 hours as needed. Do not exceed 12 tablets in 24 hours.",
          usage: [
            "Take with a full glass of water",
            "Take with food if stomach upset occurs",
            "Do not crush or chew enteric-coated tablets",
          ],
          sideEffects: ["Stomach irritation", "Heartburn", "Nausea", "Ringing in the ears"],
          match: 80,
        },
      ],
    }
  
    // Event Listeners
    getStartedBtn.addEventListener("click", () => {
      inputSection.scrollIntoView({ behavior: "smooth" })
    })
  
    analyzeBtn.addEventListener("click", analyzeAndRecommend)
  
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block"
    })
  
    signupBtn.addEventListener("click", () => {
      signupModal.style.display = "block"
    })
  
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        loginModal.style.display = "none"
        signupModal.style.display = "none"
      })
    })
  
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none"
      }
      if (e.target === signupModal) {
        signupModal.style.display = "none"
      }
    })
  
    addSymptomBtn.addEventListener("click", addSymptom)
    symptomInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addSymptom()
      }
    })
  
    diseaseInput.addEventListener("input", () => {
      const value = diseaseInput.value.toLowerCase()
      if (value.length > 0) {
        const filteredDiseases = diseases.filter((disease) => disease.toLowerCase().includes(value))
        showSuggestions(diseaseSuggestions, filteredDiseases, selectDisease)
      } else {
        diseaseSuggestions.style.display = "none"
      }
    })
  
    symptomInput.addEventListener("input", () => {
      const value = symptomInput.value.toLowerCase()
      if (value.length > 0) {
        const filteredSymptoms = symptoms.filter((symptom) => symptom.toLowerCase().includes(value))
        showSuggestions(symptomSuggestions, filteredSymptoms, selectSymptom)
      } else {
        symptomSuggestions.style.display = "none"
      }
    })
  
    // Functions
    function addSymptom() {
      const symptom = symptomInput.value.trim()
      if (symptom) {
        const tag = document.createElement("div")
        tag.classList.add("symptom-tag")
        tag.innerHTML = `${symptom} <i class="fas fa-times"></i>`
  
        tag.querySelector("i").addEventListener("click", () => {
          tag.remove()
        })
  
        symptomTags.appendChild(tag)
        symptomInput.value = ""
        symptomSuggestions.style.display = "none"
      }
    }
  
    function showSuggestions(container, items, selectCallback) {
      container.innerHTML = ""
  
      if (items.length > 0) {
        items.forEach((item) => {
          const suggestionItem = document.createElement("div")
          suggestionItem.classList.add("suggestion-item")
          suggestionItem.textContent = item
          suggestionItem.addEventListener("click", () => selectCallback(item))
          container.appendChild(suggestionItem)
        })
        container.style.display = "block"
      } else {
        container.style.display = "none"
      }
    }
  
    function selectDisease(disease) {
      diseaseInput.value = disease
      diseaseSuggestions.style.display = "none"
    }
  
    function selectSymptom(symptom) {
      symptomInput.value = symptom
      symptomSuggestions.style.display = "none"
      addSymptom()
    }
  
    function analyzeAndRecommend() {
      // Show results section
      resultsSection.classList.remove("hidden")
      resultsSection.scrollIntoView({ behavior: "smooth" })
  
      // Get user inputs
      const disease = diseaseInput.value.trim()
      const symptomElements = symptomTags.querySelectorAll(".symptom-tag")
      const symptoms = Array.from(symptomElements).map((el) => el.textContent.trim())
      const temperature = document.getElementById("temperature").value
      const humidity = document.getElementById("humidity").value
      const season = document.getElementById("season").value
  
      // Simulate AI processing with a delay
      diagnosisResult.innerHTML = '<div class="loader"></div>'
      medicineRecommendations.innerHTML = '<div class="loader"></div>'
  
      setTimeout(() => {
        // Decision tree algorithm simulation
        let diagnosisHTML = ""
        if (disease) {
          diagnosisHTML += `<p>Based on your input, you may have <strong>${disease}</strong>.</p>`
        } else {
          diagnosisHTML += `<p>Based on your symptoms, you may have <strong>Common Cold</strong>.</p>`
        }
  
        diagnosisHTML += `<p>Symptoms identified:</p><ul>`
        if (symptoms.length > 0) {
          symptoms.forEach((symptom) => {
            diagnosisHTML += `<li>${symptom}</li>`
          })
        } else {
          diagnosisHTML += `<li>No specific symptoms provided</li>`
        }
        diagnosisHTML += `</ul>`
  
        diagnosisHTML += `<p>Environmental factors:</p><ul>`
        diagnosisHTML += `<li>Temperature: ${temperature}</li>`
        diagnosisHTML += `<li>Humidity: ${humidity}</li>`
        diagnosisHTML += `<li>Season: ${season}</li>`
        diagnosisHTML += `</ul>`
  
        diagnosisResult.innerHTML = diagnosisHTML
  
        // Display medicine recommendations
        const diseaseName = disease || "Common Cold"
        const recommendedMedicines = medicines[diseaseName] || medicines["Common Cold"]
  
        let recommendationsHTML = ""
        recommendedMedicines.forEach((medicine) => {
          recommendationsHTML += `
                      <div class="medicine-card" data-medicine="${medicine.name}">
                          <div class="medicine-card-icon">
                              <i class="fas fa-pills"></i>
                          </div>
                          <div class="medicine-card-content">
                              <h4>${medicine.name}</h4>
                              <p>${medicine.description.substring(0, 80)}...</p>
                              <div class="medicine-card-match">
                                  <span>Match:</span>
                                  <span class="match-percentage">${medicine.match}%</span>
                              </div>
                          </div>
                      </div>
                  `
        })
  
        medicineRecommendations.innerHTML = recommendationsHTML
  
        // Add event listeners to medicine cards
        document.querySelectorAll(".medicine-card").forEach((card) => {
          card.addEventListener("click", () => {
            const medicineName = card.getAttribute("data-medicine")
            const medicine = recommendedMedicines.find((m) => m.name === medicineName)
  
            if (medicine) {
              showMedicineDetails(medicine)
            }
          })
        })
  
        // Show first medicine details by default
        if (recommendedMedicines.length > 0) {
          showMedicineDetails(recommendedMedicines[0])
        }
      }, 2000)
    }
  
    function showMedicineDetails(medicine) {
      medicineDetails.classList.remove("hidden")
  
      medicineName.textContent = medicine.name
      medicineDescription.textContent = medicine.description
      medicineDosage.textContent = medicine.dosage
  
      populateList(medicineUsage, medicine.usage)
      populateList(medicineSideEffects, medicine.sideEffects)
  
      // Highlight the selected medicine card
      document.querySelectorAll(".medicine-card").forEach((card) => {
        if (card.getAttribute("data-medicine") === medicine.name) {
          card.style.backgroundColor = "#f0f7ff"
          \
                  card.style.borderColor =
          var('--primary-color');
        } else {
          card.style.backgroundColor = ""
          card.style.borderColor = "#ddd"
        }
      })
  
      // Add event listeners for feedback buttons
      helpfulBtn.onclick = () => provideFeedback(medicine.name, true)
      notHelpfulBtn.onclick = () => provideFeedback(medicine.name, false)
    }
  
    function populateList(element, items) {
      element.innerHTML = ""
      items.forEach((item) => {
        const li = document.createElement("li")
        li.textContent = item
        element.appendChild(li)
      })
    }
  
    function provideFeedback(medicineName, isHelpful) {
      // In a real application, this would send feedback to the server
      // to improve the reinforcement learning model
      alert(`Thank you for your feedback on ${medicineName}! This helps our AI learn and improve.`)
  
      // Simulate updating the recommendation based on feedback
      if (isHelpful) {
        document.querySelector(`.medicine-card[data-medicine="${medicineName}"] .match-percentage`).textContent = "95%"
      } else {
        document.querySelector(`.medicine-card[data-medicine="${medicineName}"] .match-percentage`).textContent = "70%"
      }
    }
  })
  
  