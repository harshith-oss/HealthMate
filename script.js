document.addEventListener('DOMContentLoaded', () => {
    const signinPage = document.getElementById('signin-page');
    const medicinePage = document.getElementById('medicine-page');
    const signinForm = document.getElementById('signin-form');
    const skipSignin = document.getElementById('skip-signin');
    const medicineSearch = document.getElementById('medicine-search');
    const medicineInfo = document.getElementById('medicine-info');
    const medicineName = document.getElementById('medicine-name');
    const medicineDescription = document.getElementById('medicine-description');
    const whenToUse = document.getElementById('when-to-use');
    const howToUse = document.getElementById('how-to-use');
    const sideEffects = document.getElementById('side-effects');

    // Sample medicine data (in a real application, this would come from a backend API)
    const medicines = {
        'aspirin': {
            name: 'Aspirin',
            description: 'Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation.',
            whenToUse: [
                'Mild to moderate pain',
                'Fever',
                'Inflammation',
                'Prevention of heart attacks and strokes in high-risk patients'
            ],
            howToUse: [
                'Take with food or milk to prevent stomach upset',
                'Swallow tablets whole with a full glass of water',
                'Do not crush, chew, or break extended-release tablets',
                'Follow the dosage instructions provided by your doctor or on the package label'
            ],
            sideEffects: [
                'Stomach irritation or bleeding',
                'Allergic reactions',
                'Ringing in the ears',
                'Increased risk of bleeding'
            ]
        },
        'ibuprofen': {
            name: 'Ibuprofen',
            description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation.',
            whenToUse: [
                'Headaches',
                'Toothaches',
                'Back pain',
                'Menstrual cramps',
                'Minor injuries'
            ],
            howToUse: [
                'Take with food or milk to prevent stomach upset',
                'Swallow tablets whole with a full glass of water',
                'Take the lowest effective dose for the shortest duration necessary',
                'Do not exceed the recommended dose'
            ],
            sideEffects: [
                'Stomach pain or nausea',
                'Heartburn',
                'Dizziness',
                'Mild headache'
            ]
        }
    };

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you would validate the credentials here
        showMedicinePage();
    });

    skipSignin.addEventListener('click', showMedicinePage);

    function showMedicinePage() {
        signinPage.classList.add('hidden');
        medicinePage.classList.remove('hidden');
    }

    medicineSearch.addEventListener('input', () => {
        const medicine = medicineSearch.value.toLowerCase().trim();
        if (medicines[medicine]) {
            displayMedicineInfo(medicines[medicine]);
        } else {
            medicineInfo.classList.add('hidden');
        }
    });

    function displayMedicineInfo(medicine) {
        medicineName.textContent = medicine.name;
        medicineDescription.textContent = medicine.description;
        
        populateList(whenToUse, medicine.whenToUse);
        populateList(howToUse, medicine.howToUse);
        populateList(sideEffects, medicine.sideEffects);

        medicineInfo.classList.remove('hidden');
    }

    function populateList(element, items) {
        element.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
    }
});

