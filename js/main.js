document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const successAlert = document.getElementById(form.dataset.success);

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      successAlert.classList.add('d-none');
      return;
    }

    form.classList.remove('was-validated');
    form.reset();
    successAlert.classList.remove('d-none');

    const modalElement = form.closest('.modal');
    if (modalElement) {
      bootstrap.Modal.getOrCreateInstance(modalElement).hide();
    }
  });

  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
  });
});

const ageModalElement = document.getElementById('ageModal');

if (ageModalElement) {
  const ageModal = new bootstrap.Modal(ageModalElement);
  let ageConfirmed = false;

  try {
    ageConfirmed = sessionStorage.getItem('ageConfirmed') === 'yes';
  } catch (error) {
    ageConfirmed = false;
  }

  if (!ageConfirmed) {
    ageModal.show();
  }

  document.getElementById('age-yes').addEventListener('click', () => {
    try {
      sessionStorage.setItem('ageConfirmed', 'yes');
    } catch (error) {}
    ageModal.hide();
  });

  document.getElementById('age-no').addEventListener('click', () => {
    document.getElementById('age-denied').classList.remove('d-none');
  });
}
