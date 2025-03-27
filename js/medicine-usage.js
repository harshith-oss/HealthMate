document.addEventListener("DOMContentLoaded", () => {
    // Sample data for medications, conditions, and symptoms
    const medicationSuggestions = [
      "Acetaminophen (Tylenol)",
      "Ibuprofen (Advil)",
      "Aspirin",
      "Lisinopril",
      "Atorvastatin (Lipitor)",
      "Metformin",
      "Amlodipine",
      "Metoprolol",
      "Albuterol",
      "Omeprazole (Prilosec)",
      "Losartan",
      "Gabapentin",
      "Levothyroxine (Synthroid)",
      "Simvastatin (Zocor)",
      "Hydrochlorothiazide",
    ]
  
    const conditionSuggestions = [
      "Hypertension",
      "Diabetes",
      "Asthma",
      "COPD",
      "Heart Disease",
      "High Cholesterol",
      "Arthritis",
      "Depression",
      "Anxiety",
      "Hypothyroidism",
      "Allergies",
      "Migraine",
      "Acid Reflux",
      "Insomnia",
    ]
  
    const symptomSuggestions = [
      "Headache",
      "Fever",
      "Cough",
      "Sore Throat",
      "Fatigue",
      "Nausea",
      "Dizziness",
      "Shortness of Breath",
      "Chest Pain",
      "Joint Pain",
      "Muscle Aches",
      "Rash",
      "Swelling",
      "Vomiting",
    ]
  
    // DOM Elements
    const medicationInput = document.getElementById("medication-name")
    const addMedicationBtn = document.getElementById("add-medication-btn")
    const medicationList = document.getElementById("medication-list")
    const medicationSuggestionsDiv = document.getElementById("medication-suggestions")
  
    const conditionInput = document.getElementById("condition-name")
    const addConditionBtn = document.getElementById("add-condition-btn")
    const conditionList = document.getElementById("condition-list")
    const conditionSuggestionsDiv = document.getElementById("condition-suggestions")
  
    const symptomInput = document.getElementById("symptom-name")
    const addSymptomBtn = document.getElementById("add-symptom-btn")
    const symptomList = document.getElementById("symptom-list")
    const symptomSuggestionsDiv = document.getElementById("symptom-suggestions")
  
    const generateGuidanceBtn = document.getElementById("generate-guidance-btn")
  
    // Function to create a tag element
    const createTag = (text, listElement) => {
      const tag = document.createElement("div")
      tag.className = "tag"
      tag.innerHTML = `${text} <i class="fas fa-times"></i>`
  
      // Add remove functionality
      tag.querySelector("i").addEventListener("click", () => {
        tag.remove()
      })
  
      listElement.appendChild(tag)
    }
  
    // Function to show suggestions
    const showSuggestions = (input, suggestions, suggestionsDiv, listElement) => {
      const inputValue = input.value.toLowerCase()
  
      if (inputValue.length === 0) {
        suggestionsDiv.style.display = "none"
        return
      }
  
      // Filter suggestions based on input
      const filteredSuggestions = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(inputValue))
  
      // Clear previous suggestions
      suggestionsDiv.innerHTML = ""
  
      if (filteredSuggestions.length === 0) {
        suggestionsDiv.style.display = "none"
        return
      }
  
      // Create suggestion items
      filteredSuggestions.forEach((suggestion) => {
        const item = document.createElement("div")
        item.className = "suggestion-item"
        item.textContent = suggestion
  
        item.addEventListener("click", () => {
          input.value = ""
          createTag(suggestion, listElement)
          suggestionsDiv.style.display = "none"
        })
  
        suggestionsDiv.appendChild(item)
      })
  
      suggestionsDiv.style.display = "block"
    }
  
    // Medication input and suggestions
    if (medicationInput && addMedicationBtn && medicationList && medicationSuggestionsDiv) {
      medicationInput.addEventListener("input", () => {
        showSuggestions(medicationInput, medicationSuggestions, medicationSuggestionsDiv, medicationList)
      })
  
      addMedicationBtn.addEventListener("click", () => {
        const value = medicationInput.value.trim()
        if (value) {
          createTag(value, medicationList)
          medicationInput.value = ""
          medicationSuggestionsDiv.style.display = "none"
        }
      })
  
      medicationInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          addMedicationBtn.click()
        }
      })
    }
  
    // Condition input and suggestions
    if (conditionInput && addConditionBtn && conditionList && conditionSuggestionsDiv) {
      conditionInput.addEventListener("input", () => {
        showSuggestions(conditionInput, conditionSuggestions, conditionSuggestionsDiv, conditionList)
      })
  
      addConditionBtn.addEventListener("click", () => {
        const value = conditionInput.value.trim()
        if (value) {
          createTag(value, conditionList)
          conditionInput.value = ""
          conditionSuggestionsDiv.style.display = "none"
        }
      })
  
      conditionInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          addConditionBtn.click()
        }
      })
    }
  
    // Symptom input and suggestions
    if (symptomInput && addSymptomBtn && symptomList && symptomSuggestionsDiv) {
      symptomInput.addEventListener("input", () => {
        showSuggestions(symptomInput, symptomSuggestions, symptomSuggestionsDiv, symptomList)
      })
  
      addSymptomBtn.addEventListener("click", () => {
        const value = symptomInput.value.trim()
        if (value) {
          createTag(value, symptomList)
          symptomInput.value = ""
          symptomSuggestionsDiv.style.display = "none"
        }
      })
  
      symptomInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          addSymptomBtn.click()
        }
      })
    }
  
    // Generate Guidance Button
    if (generateGuidanceBtn) {
      generateGuidanceBtn.addEventListener("click", () => {
        // Collect all input data
        const medications = Array.from(medicationList.querySelectorAll(".tag")).map((tag) =>
          tag.textContent.trim().replace(" ×", ""),
        )
        const conditions = Array.from(conditionList.querySelectorAll(".tag")).map((tag) =>
          tag.textContent.trim().replace(" ×", ""),
        )
        const symptoms = Array.from(symptomList.querySelectorAll(".tag")).map((tag) =>
          tag.textContent.trim().replace(" ×", ""),
        )
  
        // Get environmental factors
        const weather = document.querySelector('input[name="weather"]:checked').value
        const season = document.getElementById("season-select").value
        const area = document.getElementById("area-select").value
        const humidity = document.querySelector('input[name="humidity"]:checked').value
  
        // Get personal factors
        const age = document.getElementById("age-select").value
        const weight = document.getElementById("weight-select").value
        const pregnancy = document.querySelector('input[name="pregnancy"]:checked').value
        const kidney = document.getElementById("kidney-select").value
  
        // Validate inputs
        if (medications.length === 0) {
          alert("Please add at least one medication.")
          return
        }
  
        // Prepare data for submission
        const data = {
          medications,
          conditions,
          symptoms,
          environmental: {
            weather,
            season,
            area,
            humidity,
          },
          personal: {
            age,
            weight,
            pregnancy,
            kidney,
          },
        }
  
        console.log("Generating guidance with data:", data)
  
        // In a real application, you would send this data to the server
        // For now, we'll simulate a server response and redirect to the results page
  
        // Store the data in localStorage (in a real app, this would be stored in a database)
        localStorage.setItem("medicineGuidanceData", JSON.stringify(data))
  
        // Show loading state
        generateGuidanceBtn.disabled = true
        generateGuidanceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'
  
        // Simulate server processing time
        setTimeout(() => {
          // Redirect to results page
          window.location.href = "results.html"
        }, 2000)
      })
    }
  
    // Close suggestions when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#medication-name") && !e.target.closest("#medication-suggestions")) {
        if (medicationSuggestionsDiv) {
          medicationSuggestionsDiv.style.display = "none"
        }
      }
  
      if (!e.target.closest("#condition-name") && !e.target.closest("#condition-suggestions")) {
        if (conditionSuggestionsDiv) {
          conditionSuggestionsDiv.style.display = "none"
        }
      }
  
      if (!e.target.closest("#symptom-name") && !e.target.closest("#symptom-suggestions")) {
        if (symptomSuggestionsDiv) {
          symptomSuggestionsDiv.style.display = "none"
        }
      }
    })
  })
  
  