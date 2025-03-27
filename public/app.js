document.addEventListener('DOMContentLoaded', () => {
    const signinPage = document.getElementById('signin-page');
    const homePage = document.getElementById('home-page');
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
    const medicineList = document.getElementById('medicine-list');

    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                showHomePage();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    skipSignin.addEventListener('click', showHomePage);

    function showHomePage() {
        signinPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        loadFeaturedMedicines();
    }

    async function loadFeaturedMedicines() {
        try {
            const response = await fetch('/api/medicines');
            const medicines = await response.json();

            medicineList.innerHTML = '';
            medicines.forEach(medicine => {
                const card = document.createElement('div');
                card.classList.add('medicine-card');
                card.textContent = medicine.name;
                card.addEventListener('click', () => showMedicineDetails(medicine.name));
                medicineList.appendChild(card);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    medicineSearch.addEventListener('input', async () => {
        const medicine = medicineSearch.value.trim();
        if (medicine) {
            await showMedicineDetails(medicine);
        } else {
            medicineInfo.classList.add('hidden');
        }
    });

    async function showMedicineDetails(medicineName) {
        try {
            const response = await fetch(`/api/medicines/${medicineName}`);
            if (response.ok) {
                const medicine = await response.json();
                displayMedicineInfo(medicine);
                homePage.classList.add('hidden');
                medicinePage.classList.remove('hidden');
            } else {
                alert('Medicine not found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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

