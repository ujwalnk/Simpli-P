function convert() {
    let userInput = document.getElementById("userInput").value;
    let percision = document.getElementById("precisionInput").value;
    
    let sqrt = document.getElementById("sqrtInput").value;
    let minSqrt = document.getElementById("sqrtMinInput").value;
    let numeric = document.getElementById("numericInput").value;
    let minNumeric = document.getElementById("numericMinInput").value;


    let output = document.getElementById("result");

    let checkVal = Math.trunc(userInput * Math.pow(10, percision));

    output.innerText = "";
    document.getElementById("userInteractionButton").style.display = "none";
    let progress = document.getElementById("userInteractionProgress");
    progress.style.display = "block";

    for (let x = minSqrt; x < sqrt; x++) {
        progress.children[0].setAttribute("aria-valuenow", (x / sqrt) * 100);
        if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision))) {
            output.innerHTML = "$$\\sqrt{" + x + "}$$";
            MathJax.typeset();
            reset();
            return;
        }
        for (let y = minNumeric; y < numeric; y++) {
            if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) + y * Math.pow(10, percision)) {
                output.innerHTML = "$$\\sqrt{" + x + "} +" + y + "$$";
                MathJax.typeset();
                reset();
                return;
            }
            else if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) - y * Math.pow(10, percision)) {
                output.innerHTML = "$$\\sqrt{" + x + "} -" + y + "$$";
                MathJax.typeset();
                reset();
                return;
            }
            else if (checkVal == y * Math.pow(10, percision) - Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) + 1 || checkVal == y * Math.pow(10, percision) - Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) - 1) {
                output.innerHTML = "$$" + y + "-\\sqrt{" + x + "}$$";
                MathJax.typeset();
                reset();
                return;
            }
        }
    }

    reset();
    output.innerHTML = "$$Try \\hspace{5px} changing \\hspace{5px} the \\hspace{5px} input \\hspace{5px} values!$$";
    MathJax.typeset();
}

function reset(){
    document.getElementById("userInteractionButton").style.display = "block";
    document.getElementById("userInteractionProgress").style.display = "none";
}