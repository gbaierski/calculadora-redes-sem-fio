// Função que carrega a calculadora selecionada
function load(type) {
    reset();
    document.getElementById(type).style = 'display: block';
}

// Função que esconde todas as calculadoras
function reset() {
    var calculatorBoxes = document.querySelectorAll(".calculator-box");

    for (var i = 0; i < calculatorBoxes.length; i++) {
        calculatorBoxes[i].style.display = "none";
    }
}

// Função para preencher a fórmula de cada calculadora com os números digitados
function fillFormula(value, calculator, field, defaultValue) {
    if(value)
        document.getElementById(calculator + '-campo-' + field).innerHTML = value;
    else
        document.getElementById(calculator + '-campo-' + field).innerHTML = defaultValue;
}

// Função para calcular a Capacidade Máxima de Canal (Shannon)
function shannon() {
    let larguraBandaHz = document.getElementById('shannon-larguraBandaHz').value;
    let sinalRuidoDb = document.getElementById('shannon-sinalRuidoDb').value;

    if(!larguraBandaHz || !sinalRuidoDb) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = larguraBandaHz * Math.log2(1 + Math.pow(10, sinalRuidoDb / 10));
    document.getElementById('shannon-result').innerHTML = resultado.toFixed(2) + ' bps'
}

// Função para determinar a Taxa de Nyquist
function nyquist() {
    let larguraBandaHz = document.getElementById('nyquist-larguraBandaHz').value;
    let modulacaoMultinivel = document.getElementById('nyquist-modulacaoMultinivel').value;

    if(!larguraBandaHz || !modulacaoMultinivel) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = 2 * larguraBandaHz * modulacaoMultinivel;
    document.getElementById('nyquist-result').innerHTML = resultado.toFixed(2) + ' bps'
}

// Função para realizar a conversão de mW para dBm
function mwToDbm() {
    let potenciaMW = document.getElementById('mwToDbm-potenciaMW').value;

    if(!potenciaMW) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = 10 * Math.log10(potenciaMW);
    document.getElementById('mwToDbm-result').innerHTML = resultado.toFixed(2) + ' dBm'
}

// Função para efetuar a conversão de dBm para mW
function dbmToMw() {
    let potenciaDBm = document.getElementById('dbmToMw-potenciaDBm').value;

    if(!potenciaDBm) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = Math.pow(10, potenciaDBm / 10);
    document.getElementById('dbmToMw-result').innerHTML = resultado.toFixed(2) + ' mW'
}

// Função para calcular a EIRP (Effective Isotropic Radiated Power)
function eirp() {
    let potenciaTransmissaoDBm = document.getElementById('eirp-potenciaTransmissaoDBm').value;
    let ganhoAntenaDBi = document.getElementById('eirp-ganhoAntenaDBi').value;
    let perdasCaboDB = document.getElementById('eirp-perdasCaboDB').value;

    if(!potenciaTransmissaoDBm || !ganhoAntenaDBi || !perdasCaboDB) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = potenciaTransmissaoDBm + ganhoAntenaDBi - perdasCaboDB;
    document.getElementById('eirp-result').innerHTML = resultado.toFixed(2) + ' dBm'
}

// Função para determinar o FSLP (Free Space Loss Path)
function fslp(distanciaKm, frequenciaMHz) {
    return 32.4 + 20 * Math.log10(distanciaKm) + 20 * Math.log10(frequenciaMHz);
}

// Função para calcular o RSL (Received Signal Level)
function rsl(potenciaTransmissaoDBm, ganhoAntenaTXDBi, perdasCaboTXDB, ganhoAntenaRXDBi, perdasCaboRXDB, distanciaKm, frequenciaMHz) {
    const freeSpaceLossPath = calcularFSLP(distanciaKm, frequenciaMHz);
    return potenciaTransmissaoDBm + ganhoAntenaTXDBi - perdasCaboTXDB - freeSpaceLossPath + ganhoAntenaRXDBi - perdasCaboRXDB;
}

// Função para determinar o Raio da zona de Fresnel
function fresnel(DAO, DBO, distanciaKm, frequenciaMHz) {
    return 550 * Math.sqrt((DAO * DBO) / (distanciaKm * frequenciaMHz));
}