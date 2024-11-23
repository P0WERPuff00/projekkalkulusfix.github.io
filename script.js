document.addEventListener('DOMContentLoaded', function () {
    // Ambil semua tombol toggle dan konten terkait
    const toggleButtons = document.querySelectorAll('[id^="toggleButton"]'); // Memilih semua ID yang diawali dengan 'toggleButton'
    const contents = document.querySelectorAll('[id^="content"]'); // Memilih semua ID yang diawali dengan 'content'

    // Iterasi melalui tombol toggle
    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const content = contents[index]; // Ambil konten terkait berdasarkan indeks
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                // Scroll otomatis ke konten yang baru terbuka
                content.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});







function plotExponential() {
    // Ambil nilai dari input
    const base = parseFloat(document.getElementById('base').value);
    const exponentInput = document.getElementById('exponent').value;
    const xValues = document.getElementById('x_values').value.split(',').map(Number);
    const constTambahan = parseFloat(document.getElementById('constant').value || 0);

    // Validasi input
    if (isNaN(base) || !exponentInput || xValues.some(isNaN)) {
        alert('Silakan masukkan nilai yang valid.');
        return;
    }

    const yValues = [];
    const steps = []; // Menyimpan langkah-langkah pengerjaan

    xValues.forEach(x => {
        try {
            // Evaluasi ekspresi eksponen dengan mengganti "x" menjadi nilai aktual
            const exponent = eval(exponentInput.replace(/x/g, x));
            const result = Math.pow(base, exponent) + constTambahan;
            yValues.push(result);
            steps.push(
                `Langkah: Substitusi x = ${x}, Hasil: ${base}^(${exponent}) + ${constTambahan} = ${result}`
            );
        } catch (error) {
            console.error('Error evaluating exponent:', error);
            yValues.push(null); // Tambahkan null jika ada kesalahan
        }
    });

    // Membuat data untuk grafik
    const data = [{
        x: xValues,
        y: yValues,
        mode: 'markers+lines',
        type: 'scatter',
        name: `y = ${base}^(${exponentInput}) + ${constTambahan}`
    }];

    // Layout untuk grafik
    const layout = {
        title: `Grafik y = ${base}^(${exponentInput}) + ${constTambahan}`,
        xaxis: { title: 'Nilai x' },
        yaxis: { title: 'Nilai y' }
    };

    // Tampilkan grafik dengan Plotly
    Plotly.newPlot('plot', data, layout);

    // Tampilkan langkah-langkah pengerjaan
    const stepsDiv = document.getElementById('steps');
    stepsDiv.innerHTML = '<h3>Langkah-langkah Pengerjaan:</h3><ol>' +
        steps.map(step => `<li>${step}</li>`).join('') + '</ol>';
}

function resetForm() {
    // Reset input
    document.getElementById('base').value = '';
    document.getElementById('exponent').value = '';
    document.getElementById('x_values').value = '';
    document.getElementById('constant').value = '';

    // Hapus grafik dan langkah-langkah pengerjaan
    Plotly.purge('plot');
    document.getElementById('steps').innerHTML = '';

    console.log('Form dan grafik berhasil di-reset'); // Log untuk debugging
}


window.addEventListener("scroll", function () {
  var elements = document.querySelectorAll('.fade-in');  // Seleksi semua elemen dengan kelas fade-in
  var windowHeight = window.innerHeight;  // Ambil tinggi viewport

  elements.forEach(function (element) {
    var elementTop = element.getBoundingClientRect().top;  // Posisi elemen terhadap viewport

    // Cek apakah elemen sudah ada dalam jangkauan viewport
    if (elementTop < windowHeight - 100) {
      element.classList.add('visible');  // Tambahkan kelas 'visible' untuk animasi
    }
  });
});
