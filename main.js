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

    var resultado = Number(larguraBandaHz) * Math.log2(1 + Math.pow(10, Number(sinalRuidoDb) / 10));
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

    var resultado = 2 * Number(larguraBandaHz) * Number(modulacaoMultinivel);
    document.getElementById('nyquist-result').innerHTML = resultado.toFixed(2) + ' bps'
}

// Função para realizar a conversão de mW para dBm
function mwToDbm() {
    let potenciaMW = document.getElementById('mwToDbm-potenciaMW').value;

    if(!potenciaMW) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = 10 * Math.log10(Number(potenciaMW));
    document.getElementById('mwToDbm-result').innerHTML = resultado.toFixed(2) + ' dBm'
}

// Função para efetuar a conversão de dBm para mW
function dbmToMw() {
    let potenciaDBm = document.getElementById('dbmToMw-potenciaDBm').value;

    if(!potenciaDBm) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = Math.pow(10, Number(potenciaDBm) / 10);
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

    var resultado = Number(potenciaTransmissaoDBm) + Number(ganhoAntenaDBi) - Number(perdasCaboDB);
    document.getElementById('eirp-result').innerHTML = resultado.toFixed(2) + ' dBm'
}

// Função para determinar o FSLP (Free Space Loss Path)
function fslp() {
    let distanciaKm = document.getElementById('fslp-distanciaKm').value;
    let frequenciaMHz = document.getElementById('fslp-frequenciaMHz').value;

    if(!distanciaKm || !frequenciaMHz) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = 32.4 + 20 * Math.log10(Number(distanciaKm)) + 20 * Math.log10(Number(frequenciaMHz));
    document.getElementById('fslp-result').innerHTML = resultado.toFixed(2) + ' dB'
}

// Função para calcular o RSL (Received Signal Level)
function rsl() {
    let potenciaTransmissaoDBm = document.getElementById('rsl-potenciaTransmissaoDBm').value;
    let ganhoAntenaTXDBi = document.getElementById('rsl-ganhoAntenaTXDBi').value;
    let perdasCaboTXDB = document.getElementById('rsl-perdasCaboTXDB').value;
    let freeSpaceLossPath = document.getElementById('rsl-freeSpaceLossPath').value;
    let ganhoAntenaRXDBi = document.getElementById('rsl-ganhoAntenaRXDBi').value;
    let perdasCaboRXDB = document.getElementById('rsl-perdasCaboRXDB').value;

    if(!potenciaTransmissaoDBm || !ganhoAntenaTXDBi || !perdasCaboTXDB || !freeSpaceLossPath || !ganhoAntenaRXDBi || !perdasCaboRXDB) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }

    var resultado = Number(potenciaTransmissaoDBm) + Number(ganhoAntenaTXDBi) - Number(perdasCaboTXDB) - Number(freeSpaceLossPath) + Number(ganhoAntenaRXDBi) - Number(perdasCaboRXDB);
    document.getElementById('rsl-result').innerHTML = resultado.toFixed(2) + ' dBm'
}

// Função para determinar o Raio da zona de Fresnel
function fresnel() {
    let DAO = document.getElementById('fresnel-DAO').value;
    let distanciaKm = document.getElementById('fresnel-distanciaKm').value;
    let DBO = Number(distanciaKm) - Number(DAO);
    let frequenciaMHz = document.getElementById('fresnel-frequenciaMHz').value;

    if(!DAO || !distanciaKm || !frequenciaMHz) {
        alert('Por favor, preencha todos os parâmetros!');
        return;
    }
 
    fillFormula(DBO.toFixed(2), 'fresnel', 'DBO', 'DBO')

    var resultado = 550 * Math.sqrt((Number(DAO) * Number(DBO)) / (Number(distanciaKm) * Number(frequenciaMHz)));
    var margem60 = resultado * 0.6;
    document.getElementById('fresnel-result').innerHTML = '<b>100% =</b> ' + resultado.toFixed(2) + ' m' + '<br>';
    document.getElementById('fresnel-result').innerHTML += '<b>60% =</b> ' + margem60.toFixed(2) + ' m'
}