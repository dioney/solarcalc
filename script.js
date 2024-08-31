// Dados de incidência solar por cidade
const dadosCidades = {
    "Natal": 5.5,
    "Parnamirim": 5.3
};

// Elementos do DOM
const form = document.getElementById('solarForm');
const resultado = document.getElementById('resultado');
const compartilharBtn = document.getElementById('compartilharBtn');
const refazerBtn = document.getElementById('refazerBtn');
const resultadoTexto = document.getElementById('resultadoTexto');

// Toggle para a seção avançada
document.getElementById('toggleAvancado').addEventListener('click', function() {
    const avancadoContent = document.getElementById('avancadoContent');
    avancadoContent.classList.toggle('hidden');
    this.textContent = avancadoContent.classList.contains('hidden') ? 'Avançado ▼' : 'Avançado ▲';
});

// Evento de submissão do formulário
let dadosCalculados = {};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cidade = document.getElementById('cidade').value;
    const area = parseFloat(document.getElementById('area').value);
    const conta1 = parseFloat(document.getElementById('conta1').value);
    const conta2 = parseFloat(document.getElementById('conta2').value);
    const conta3 = parseFloat(document.getElementById('conta3').value);
    const custoEquipamentos = parseFloat(document.getElementById('custoEquipamentos').value) || 0;
    const custoMaoDeObra = parseFloat(document.getElementById('custoMaoDeObra').value) || 0;

    const mediaConsumo = (conta1 + conta2 + conta3) / 3;
    const incidenciaSolar = dadosCidades[cidade];

    const producaoEstimada = area * incidenciaSolar * 0.15 * 30;
    const economiaEstimada = (producaoEstimada / 1000) * mediaConsumo;
    const custoTotal = custoEquipamentos + custoMaoDeObra;
    const tempoRetorno = custoTotal / (economiaEstimada * 12);

    // Armazenar dados calculados
    dadosCalculados = {
        cidade,
        area,
        conta1,
        conta2,
        conta3,
        custoEquipamentos,
        custoMaoDeObra,
        producaoEstimada,
        economiaEstimada,
        custoTotal,
        tempoRetorno,
        dataCalculo: new Date()
    };

    // Atualizar os resultados nos espaços reservados
    document.getElementById('producaoEstimada').textContent = producaoEstimada.toFixed(2);
    document.getElementById('economiaEstimada').textContent = `R$ ${economiaEstimada.toFixed(2)}`;
    document.getElementById('custoTotal').textContent = `R$ ${custoTotal.toFixed(2)}`;
    document.getElementById('tempoRetorno').textContent = tempoRetorno.toFixed(1);

    // Esconder o formulário e mostrar os resultados
    form.style.display = 'none';
    resultado.style.display = 'block';
});

// Evento do botão Compartilhar
compartilharBtn.addEventListener('click', function() {
    const dataFormatada = dadosCalculados.dataCalculo.toLocaleString('pt-BR');
    const texto = `
Resultado da Calculadora de Energia Solar:

Data do cálculo: ${dataFormatada}

Dados inseridos:
Cidade: ${dadosCalculados.cidade}
Área disponível: ${dadosCalculados.area.toFixed(2)} m²
Contas de energia: R$ ${dadosCalculados.conta1.toFixed(2)}, R$ ${dadosCalculados.conta2.toFixed(2)}, R$ ${dadosCalculados.conta3.toFixed(2)}
Custo dos Equipamentos: R$ ${dadosCalculados.custoEquipamentos.toFixed(2)}
Custo da Mão de Obra: R$ ${dadosCalculados.custoMaoDeObra.toFixed(2)}

Resultados:
Produção Estimada: ${dadosCalculados.producaoEstimada.toFixed(2)} kWh/mês
Economia Estimada: R$ ${dadosCalculados.economiaEstimada.toFixed(2)}/mês
Custo Total: R$ ${dadosCalculados.custoTotal.toFixed(2)}
Tempo de Retorno: ${dadosCalculados.tempoRetorno.toFixed(1)} Anos
    `.trim();

    resultadoTexto.value = texto;
    resultadoTexto.style.display = 'block';
    resultadoTexto.select();
    document.execCommand('copy');
    alert('Resultado copiado para a área de transferência!');
});

// Evento do botão Refazer Cálculo
refazerBtn.addEventListener('click', function() {
    form.style.display = 'block';
    resultado.style.display = 'none';
    resultadoTexto.style.display = 'none';
    form.reset();
});
