'use strict';

// Hàm lấy element theo id
function getEl(id) {
    return document.getElementById(id);
}

// Get các btn
const submitBtn = getEl('submit-btn');
const healthyBtn = getEl('healthy-btn');
const bmiBtn = getEl('bmi-btn');

// Get các input element
const idInput = getEl('input-id');
const nameInput = getEl('input-name');
const ageInput = getEl('input-age');
const typeInput = getEl('input-type');
const weightInput = getEl('input-weight');
const lengthInput = getEl('input-length');
const colorInput = getEl('input-color-1');
const breedInput = getEl('input-breed');
const vaccinatedInput = getEl('input-vaccinated');
const dewormedInput = getEl('input-dewormed');
const sterilizedInput = getEl('input-sterilized');

const petArr = [];
const listDelBtn = [];

// validate form
function validate() {
    let flag = true;

    if (idInput.value === '' || nameInput.value === '' || ageInput.value === '' || weightInput.value === '' || lengthInput.value === '') {
        alert('Please enter all data!');
        flag = false;
    }
    for (let i = 0; i < petArr.length; i++) {
        if (idInput.value === petArr[i].id) {
            flag = false;
            alert('ID must be unique!');
        }
    }
    if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 15) {
        flag = false;
        alert('Age must be between 1 and 15!');
    }
    if (parseInt(weightInput.value) < 1 || parseInt(weightInput.value) > 15) {
        flag = false;
        alert('Weight must be between 1 and 15!');
    }
    if (parseInt(lengthInput.value) < 1 || parseInt(lengthInput.value) > 100) {
        flag = false;
        alert('Length must be between 1 and 100!');
    }
    if (typeInput.value === '') {
        flag = false;
        alert('Please select Type!');
    }
    if (breedInput.value === '') {
        flag = false;
        alert('Please select Breed!');
    }
    return flag;
}

// clear input khi submit thành công
function clearInput() {
    getEl('input-id').value = '';
    getEl('input-name').value = '';
    getEl('input-age').value = '';
    getEl('input-type').value = '';
    getEl('input-weight').value = '';
    getEl('input-length').value = '';
    getEl('input-color-1').value = '#000000';
    getEl('input-breed').value = '';
    getEl('input-vaccinated').checked = false;
    getEl('input-dewormed').checked = false;
    getEl('input-sterilized').checked = false;
}

// Render petArr ra trình duyệt
function renderTableData(arr) {
    const tableBodyEl = document.getElementById('tbody');
    tableBodyEl.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        const row = document.createElement('tr')
        row.innerHTML =
            `<th scope="row">${petArr[i].id}</th>
            <td>${arr[i].name}</td>
            <td>${arr[i].age}</td>
            <td>${arr[i].type}</td>
            <td>${arr[i].weight} kg</td>
            <td>${arr[i].petLength} cm</td>
            <td>${arr[i].breed}</td>
            <td><i class="bi bi-square-fill" style="color: ${arr[i].id}"></i></td>
            ${arr[i].vaccinated ? '<td><i class="bi bi-check-circle-fill"></i></td>' : '<td><i class="bi bi-x-circle-fill"></i></td>'}
            ${arr[i].dewormed ? '<td><i class="bi bi-check-circle-fill"></i></td>' : '<td><i class="bi bi-x-circle-fill"></i></td>'}
            ${arr[i].sterilized ? '<td><i class="bi bi-check-circle-fill"></i></td>' : '<td><i class="bi bi-x-circle-fill"></i></td>'}
            <td class="bmi-el" style="cursor: pointer">?</td>
            <td>${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</td>
            <td><button type="button" class="btn btn-danger delete-btn" onclick="deletePet('${arr[i].id}')">Delete</button></td>`
        tableBodyEl.appendChild(row);
    }
}

// xử lý sự kiện khi click vào submit btn
submitBtn.addEventListener('click', function () {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        petLength: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,

        // method check pet healthy
        checkHealthy: function () {
            if (this.vaccinated === true &&
                this.dewormed === true &&
                this.sterilized === true) {
                return true;
            }
        },
        // method calculate pet bmi
        calcBmi: function () {
            if (this.type === 'dog') {
                return ((this.weight * 703) / this.petLength ** 2).toFixed(2);
            }
            if (this.type === 'cat') {
                return ((this.weight * 886) / this.petLength ** 2).toFixed(2);
            }
        }
    };
    
    // Nếu validate thành công thì thêm pet vào mảng, xóa dữ liệu trong các ô input, render ra trình duyệt
    if (validate()) {
        petArr.push(data);
        clearInput();
        renderTableData(petArr);
        listDelBtn.push(document.querySelectorAll('.delete-btn'));
    }
})

// Hàm xóa pet khỏi mảng và khỏi trang web 
function deletePet(petId) {
    if (confirm('Are you sure?')) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id === petId) {
                petArr.splice(i, 1);
                listDelBtn.splice(i, 1);
            }
        }
        renderTableData(petArr);
    }
}

// Hiện thị thú cưng khỏe mạnh
const showHealthyPet = () => {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].checkHealthy() === true) {
            healthyPetArr.push(petArr[i]);
        }
    }
    healthyBtn.innerHTML = 'Show All Pet';
    renderTableData(healthyPetArr);
}
const showAllPet = () => {
    healthyBtn.innerHTML = 'Show Healthy Pet';
    renderTableData(petArr);
}

healthyBtn.addEventListener('click', function () {
    if (healthyBtn.innerHTML === 'Show Healthy Pet') {
        showHealthyPet();
    } else {
        showAllPet();
    }
})

// Hiện thị BMI của thú cưng
const showBmi = () => {
    const listBmi = document.querySelectorAll('.bmi-el');
    for (let i = 0; i < listBmi.length; i++) {
        listBmi[i].innerHTML = petArr[i].calcBmi();
    }
}

bmiBtn.addEventListener('click', showBmi);