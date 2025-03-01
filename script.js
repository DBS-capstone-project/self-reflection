document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Mencegah form dari reload saat menekan Enter
    form.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Mencegah default behavior (submit)
      }
    });

    // Menangani submit form
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Mencegah form melakukan reload halaman

      // Mengambil data dari form
      const formData = new FormData(this);

      // Simpan data ke localStorage
      const result = {};
      formData.forEach((value, key) => {
        result[key] = value;
      });
      localStorage.setItem('reflectionResult', JSON.stringify(result));

      // Redirect ke halaman hasil
      window.location.href = this.action; // Gunakan atribut 'action' dari form
    });
  });

  // Menampilkan textarea hanya jika "Lainnya" dipilih
  document.querySelectorAll('.question input[type="radio"]').forEach(radio => {
    if (radio.value === 'other') {
      const parent = radio.closest('.question');
      const textarea = parent.querySelector('input[type="text"]');
      if (textarea) {
        textarea.style.display = 'none'; // Sembunyikan textarea awalnya
        radio.addEventListener('change', () => {
          textarea.style.display = radio.checked ? 'block' : 'none';
        });
      }
    }
  });
});