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