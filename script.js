document.addEventListener('DOMContentLoaded', loadAppointments);

const appointmentForm = document.getElementById('appointment-form');
const appointmentList = document.getElementById('appointment-list');
const filterDateInput = document.getElementById('filter-date');
const filterBtn = document.getElementById('filter-btn');
const filterCount = document.getElementById('filter-count');

appointmentForm.addEventListener('submit', addAppointment);
filterBtn.addEventListener('click', filterAppointments);

function loadAppointments() {
    const appointments = getAppointmentsFromLocalStorage();
    appointments.forEach(appointment => displayAppointment(appointment));
}

function addAppointment(event) {
    event.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const date = document.getElementById('appointment-date').value;
    const description = document.getElementById('description').value;

    const appointment = { name, date, description };
    saveAppointmentToLocalStorage(appointment);
    displayAppointment(appointment);
    
    appointmentForm.reset();
}

function displayAppointment(appointment) {
    const appointmentItem = document.createElement('div');
    appointmentItem.className = 'appointment-item';
    appointmentItem.innerHTML = `
        <strong>${appointment.name}</strong><br>
        Date: ${appointment.date}<br>
        Description: ${appointment.description}
        <button class="delete-btn" onclick="deleteAppointment('${appointment.date}', '${appointment.name}')">Delete</button>
    `;
    appointmentList.appendChild(appointmentItem);
}

function deleteAppointment(date, name) {
    const appointments = getAppointmentsFromLocalStorage().filter(app => !(app.date === date && app.name === name));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    location.reload();
}

function filterAppointments() {
    const filterDate = filterDateInput.value;
    const appointments = getAppointmentsFromLocalStorage();
    const filteredAppointments = appointments.filter(app => app.date === filterDate);
    
    appointmentList.innerHTML = '';
    filteredAppointments.forEach(app => displayAppointment(app));
    
    filterCount.textContent = `Total appointments on ${filterDate}: ${filteredAppointments.length}`;
}

function saveAppointmentToLocalStorage(appointment) {
    const appointments = getAppointmentsFromLocalStorage();
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function getAppointmentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('appointments')) || [];
}
