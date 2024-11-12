document.addEventListener('DOMContentLoaded', function () {
  // Menangani klik pada tombol toggle untuk konten pertama
  const toggleButton1 = document.getElementById('toggleButton1');
  const content1 = document.getElementById('content1');
  
  toggleButton1.addEventListener('click', function () {
    content1.classList.toggle('active');
    if (content1.classList.contains('active')) {
      // Scroll otomatis ke konten yang baru terbuka
      content1.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Menangani klik pada tombol toggle untuk konten kedua
  const toggleButton2 = document.getElementById('toggleButton2');
  const content2 = document.getElementById('content2');
  
  toggleButton2.addEventListener('click', function () {
    content2.classList.toggle('active');
    if (content2.classList.contains('active')) {
      // Scroll otomatis ke konten yang baru terbuka
      content2.scrollIntoView({ behavior: 'smooth' });
    }
  });
});







        // Fungsi untuk menghitung ekspresi dan menghasilkan nilai y
        function evaluateExpression(expr, x) {
            try {
                // Sanitasi ekspresi, ganti '^' dengan '**' untuk eksponensial (bila ada)
                expr = expr.replace(/\^/g, '**');
                
                // Ganti semua 'x' dengan nilai numerik yang sesuai
                return eval(expr.replace(/x/g, `(${x})`)); 
            } catch (e) {
                alert("Ekspresi tidak valid.");
                return NaN;
            }
        }

        // Fungsi untuk menggambar grafik
        function plotGraph() {
            var expr = document.getElementById("expression").value; // Ambil ekspresi dari input
            if (!expr) {
                alert("Masukkan ekspresi terlebih dahulu!");
                return;
            }

            // Menyimpan langkah-langkah pengerjaan untuk ditampilkan
            let stepsHtml = "";
            let xValues = [];
            let yValues = [];
            let pointsX = []; // Untuk titik-titik x yang dihitung
            let pointsY = []; // Untuk titik-titik y yang dihitung

            // Menghitung titik-titik dan membuat langkah-langkah pengerjaan
            for (let x = -5; x <= 5; x++) { // Kita hanya menghitung pada nilai x integer dari -5 sampai 5
                let y = evaluateExpression(expr, x); // Hitung y untuk setiap x
                if (!isNaN(y)) { // Pastikan hasil valid
                    xValues.push(x);
                    yValues.push(y);

                    // Menambahkan titik-titik pada grafik untuk setiap perhitungan (x, y)
                    pointsX.push(x);
                    pointsY.push(y);

                    // Menambahkan langkah pengerjaan untuk setiap titik
                    stepsHtml += `<div class="step">Langkah: Substitusi x = ${x}, Hasil: ${expr.replace(/x/g, `(${x})`)} = ${y}</div>`;
                }
            }

            // Menampilkan langkah-langkah pengerjaan
            document.getElementById("steps").innerHTML = stepsHtml;

            // Trace untuk grafik garis
            var traceLine = {
                x: xValues,
                y: yValues,
                mode: 'lines',
                type: 'scatter',
                name: 'Fungsi',
                line: { color: 'blue' }
            };

            // Trace untuk titik-titik hasil perhitungan
            var tracePoints = {
                x: pointsX,
                y: pointsY,
                mode: 'markers',
                type: 'scatter',
                name: 'Titik Perhitungan',
                marker: {
                    color: 'red',
                    size: 8,
                    symbol: 'circle'
                }
            };

            // Layout untuk grafik dengan sumbu X dan Y yang jelas dan rentang terbatas
            var layout = {
                title: 'Grafik Fungsi',
                xaxis: {
                    title: 'x',
                    zeroline: true,  // Menambahkan sumbu X di 0
                    showgrid: true,  // Menambahkan garis grid pada sumbu X
                    range: [-5, 5]   // Rentang x dari -5 hingga 5
                },
                yaxis: {
                    title: 'y',
                    zeroline: true,  // Menambahkan sumbu Y di 0
                    showgrid: true,  // Menambahkan garis grid pada sumbu Y
                    range: [-10, 20] // Rentang y dari -10 hingga 20
                },
                showlegend: true
            };

            // Buat grafik di elemen dengan id 'graph'
            Plotly.newPlot('graph', [traceLine, tracePoints], layout);
        }
// JavaScript untuk menambahkan kelas 'visible' saat scroll
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
