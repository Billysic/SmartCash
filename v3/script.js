// 1. Função de Navegação Universal
function changeTab(target) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.querySelectorAll('.nav-item').forEach(b => {
        b.classList.remove('nav-active');
        b.classList.add('text-gray-500');
    });
    
    const targetSection = document.getElementById(target);
    if (targetSection) targetSection.classList.add('active-tab');

    const activeBtn = document.getElementById('btn-' + target);
    if (activeBtn) {
        activeBtn.classList.add('nav-active');
        activeBtn.classList.remove('text-gray-500');
    }
}

// 2. Inicialização quando a página carrega
window.onload = () => {
    initCharts();
    generateHabitGrid();
};

// 3. Gráficos (Chart.js)
function initCharts() {
    // Gráfico de Gestão (Aba 4)
    const ctxV1 = document.getElementById('chartV1');
    if (ctxV1) {
        new Chart(ctxV1.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    data: [120, 300, 150, 80],
                    backgroundColor: '#00f2ff',
                    borderRadius: 8
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // Gráfico de Simulação (Aba 3)
    const ctxSim = document.getElementById('simChart');
    if (ctxSim) {
        let simChart = new Chart(ctxSim.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mês 1', 'Mês 6', 'Mês 12'],
                datasets: [{
                    data: [300, 1900, 3840],
                    borderColor: '#00f2ff',
                    fill: true,
                    backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    tension: 0.4
                }]
            },
            options: { 
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
            }
        });

        // Lógica do Slider de Simulação
        const slider = document.getElementById('sim-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                document.getElementById('val-label').innerText = `R$ ${val}`;
                const final = (val * 12 * 1.07).toFixed(0);
                document.getElementById('sim-res').innerText = `R$ ${parseFloat(final).toLocaleString('pt-BR')},00`;
                
                simChart.data.datasets[0].data = [val, val*6, final];
                simChart.update();
            });
        }
    }
}

// 4. Gerador do Calendário de Desafios (Aba 3)
function generateHabitGrid() {
    const grid = document.getElementById('habit-grid');
    if (grid) {
        grid.innerHTML = ''; // Limpa antes de gerar
        for (let i = 1; i <= 21; i++) {
            const dot = document.createElement('div');
            // Os primeiros 5 dias aparecem como "concluídos" (acesos)
            dot.className = `habit-day ${i <= 5 ? 'habit-on' : 'habit-off'}`;
            grid.appendChild(dot);
        }
    }
}