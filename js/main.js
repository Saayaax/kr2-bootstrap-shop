// Проверка форм средствами Bootstrap: класс was-validated подсвечивает поля
// зелёным или красным, а при успешной проверке показывается сообщение alert.
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

    // Если форма находится в модальном окне — закрываем его.
    const modalElement = form.closest('.modal');
    if (modalElement) {
      bootstrap.Modal.getOrCreateInstance(modalElement).hide();
    }
  });

  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
  });
});

// Окно подтверждения возраста 18+.
// Ответ запоминается до закрытия вкладки (sessionStorage).
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
    } catch (error) {
      // Если хранилище недоступно, окно просто появится снова на следующей странице.
    }
    ageModal.hide();
  });

  document.getElementById('age-no').addEventListener('click', () => {
    document.getElementById('age-denied').classList.remove('d-none');
  });
}
