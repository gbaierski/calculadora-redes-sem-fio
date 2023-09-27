function load(type) {
    reset();
    document.getElementById(type).style = 'display: block';
}

function reset() {
    var calculatorBoxes = document.querySelectorAll(".calculator-box");

    for (var i = 0; i < calculatorBoxes.length; i++) {
        calculatorBoxes[i].style.display = "none";
    }
}

// Função para calcular a Capacidade Máxima de Canal (Shannon)
function shannon(larguraBandaHz, sinalRuidoDb) {
    return larguraBandaHz * Math.log2(1 + Math.pow(10, sinalRuidoDb / 10));
}

// Função para determinar a Taxa de Nyquist
function nyquist(larguraBandaHz, modulacaoMultinivel) {
    return 2 * larguraBandaHz * modulacaoMultinivel;
}

// Função para realizar a conversão de mW para dBm
function mwToDbm(potenciaMW) {
    return 10 * Math.log10(potenciaMW);
}

// Função para efetuar a conversão de dBm para mW
function dbmToMw(potenciaDBm) {
    return Math.pow(10, potenciaDBm / 10);
}

// Função para calcular a EIRP (Effective Isotropic Radiated Power)
function eirp(potenciaTransmissaoDBm, ganhoAntenaDBi, perdasCaboDB) {
    return potenciaTransmissaoDBm + ganhoAntenaDBi - perdasCaboDB;
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