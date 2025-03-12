document.addEventListener('DOMContentLoaded', function() {
  // Hanterar bokningsformuläret
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Förhindrar att sidan laddas om

      // Återställer felmeddelandet
      const formMessage = document.getElementById('formMessage');
      formMessage.innerHTML = ''; // Rensar tidigare felmeddelanden
      let errorMessages = []; // Lista för att lagra felmeddelanden

      // Hämtar input-fältens värden
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const date = document.getElementById('date');
      const time = document.getElementById('time');
      const guests = document.getElementById('guests');

      // Felmeddelanden/validering för bokningsformuläret
      if (name.value.trim() === '') errorMessages.push('Vänligen ange ditt namn.');
      if (email.value.trim() === '' || !validateEmail(email.value)) errorMessages.push('Vänligen ange en giltig e-postadress.');
      if (date.value.trim() === '') errorMessages.push('Vänligen välj ett datum.');
      if (time.value.trim() === '') errorMessages.push('Vänligen välj en tid.');
      if (guests.value.trim() === '' || guests.value <= 0) errorMessages.push('Vänligen ange antal personer.');

      if (errorMessages.length > 0) {
        // Skriver ut alla felmeddelanden i en lista
        formMessage.innerHTML = '<ul><li>' + errorMessages.join('</li><li>') + '</li></ul>';
      } else {
        // Visa bekräftelse för bokning om allt är korrekt ifyllt
        document.getElementById('confirmationModal').style.display = 'flex';
      }
    });
  }
  
  // Hantera stängning av bokningsbekräftelse
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      document.getElementById('confirmationModal').style.display = 'none';
      // Omdirigerar till samma sida, så att man stannar kvar på bokningssidan
      window.location.href = 'TEST-TABLE.html';
    });
  }
  
  // Flatpickr för tid med 24-timmarsformat
  flatpickr("#time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i", // Tex. 18:30
    time_24hr: true,
    locale: "sv"
  });
  
  // Validering av e-postadress
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});