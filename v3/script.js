function changeTab(target) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.querySelectorAll('.nav-item').forEach(b => {
        b.classList.remove('nav-active');
        b.classList.add('text-gray-500');
    });
    
    document.getElementById(target).classList.add('active-tab');
    document.getElementById('btn-' + target).classList.add('nav-active');
    document.getElementById('btn-' + target).classList.remove('text-gray-500');
}

// Gráfico de Gestão (Donut)
const controlCtx = document.getElementById('chartV1').getContext('2d');
new Chart(controlCtx, {
    type: 'doughnut',
    data: {
        labels: ['Gastos', 'Economia'],
        datasets: [{
            data: [650, 1850],
            backgroundColor: ['#ef4444', '#00f2ff'],
            borderWidth: 0
        }]
    },
    options: { cutout: '80%', plugins: { legend: { position: 'bottom', labels: { color: '#888' } } } }
});

// Simulador Dinâmico com Gráfico
const simCtx = document.getElementById('simChart').getContext('2d');
let simChart = new Chart(simCtx, {
    type: 'line',
    data: {
        labels: ['Mês 1', 'Mês 4', 'Mês 8', 'Mês 12'],
        datasets: [{
            label: 'Crescimento',
            data: [300, 1200, 2500, 3840],
            borderColor: '#00f2ff',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(0, 242, 255, 0.05)'
        }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
});

document.getElementById('sim-slider').addEventListener('input', (e) => {
    const val = e.target.value;
    const final = (val * 12 * 1.07).toFixed(0);
    document.getElementById('sim-res').innerText = `R$ ${parseFloat(final).toLocaleString('pt-BR')},00 (12 meses)`;
    
    // Atualiza gráfico simulado
    simChart.data.datasets[0].data = [val, val*4, val*8, final];
    simChart.update();
});

// Gerador de Calendário de Desafios (Heatmap)
const grid = document.getElementById('habit-grid');
for (let i = 1; i <= 21; i++) {
    const dot = document.createElement('div');
    dot.className = `habit-day ${i < 6 ? 'habit-on' : 'habit-off'}`;
    grid.appendChild(dot);
}