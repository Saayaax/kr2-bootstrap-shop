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
