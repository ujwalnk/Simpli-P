function convert() {
    let userInput = document.getElementById("userInput").value;
    let percision = document.getElementById("precisionInput").value;

    let sqrt = document.getElementById("sqrtInput").value;
    let minSqrt = document.getElementById("sqrtMinInput").value;
    let numeric = document.getElementById("numericInput").value;
    let minNumeric = document.getElementById("numericMinInput").value;

    let negativeInput = 0;
    if (userInput < 0) {
        negativeInput = 1;
        userInput *= -1;
    }

    let output = document.getElementById("result");
    let checkVal = Math.trunc(userInput * Math.pow(10, percision));

    output.innerText = "";
    
    // Check for precision value
    if(Number(document.getElementById("userInput").value).countDecimals() < document.getElementById("precisionInput").value || document.getElementById("precisionInput").value < 0){
        output.innerHTML = "$$Check \\hspace{5px} Precision$$";
        MathJax.typeset();
        reset();

        // Highlight the precision box
        document.getElementById("precisionInput").className = document.getElementById("precisionInput").className + " is-invalid";
        console.log(document.getElementById("precisionInput").className);
        return;
    }

    document.getElementById("userInteractionButton").style.display = "none";
    let progress = document.getElementById("userInteractionProgress");
    progress.style.display = "block";

    for (let x = minSqrt; x < sqrt; x ++) {
        // Check for the rational value
        progress.children[0].setAttribute("aria-valuenow", (x / sqrt) * 100);
        if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision))) {
            if (negativeInput == 1) {
                output.innerHTML = "$$\\-sqrt{" + x + "}$$";
            } else {
                output.innerHTML = "$$\\sqrt{" + x + "}$$";
            }
            MathJax.typeset();
            reset();
            return;
        }

        for (let y = minNumeric; y < numeric; y ++) {
        // Check for irrational number

            if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) + y * Math.pow(10, percision)) {
                if (negativeInput == 1) {
                    output.innerHTML = "$$-(\\sqrt{" + x + "} +" + y + ")$$";

                } else {
                    output.innerHTML = "$$\\sqrt{" + x + "} +" + y + "$$";
                }
                MathJax.typeset();
                reset();
                return;
            }
            else if (checkVal == Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) - y * Math.pow(10, percision)) {
                if (negativeInput == 1) {
                    output.innerHTML = "$$-(\\sqrt{" + x + "} -" + y + ")$$";
                }
                else {
                    output.innerHTML = "$$\\sqrt{" + x + "} -" + y + "$$";
                }
                MathJax.typeset();
                reset();
                return;
            }
            else if (checkVal == y * Math.pow(10, percision) - Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) + 1 || checkVal == y * Math.pow(10, percision) - Math.trunc(Math.sqrt(x) * Math.pow(10, percision)) - 1) {
                if (negativeInput == 1) {
                    output.innerHTML = "$$-(" + y + "-\\sqrt{" + x + "})$$";
                }
                else {
                    output.innerHTML = "$$" + y + "-\\sqrt{" + x + "}$$";
                }
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

function reset() {
    document.getElementById("userInteractionButton").style.display = "block";
    document.getElementById("userInteractionProgress").style.display = "none";
}

function help(){
    // Generate a random sign
    let signX = (Math.random() > 0.5) ? 1 : -1;
    let signY = (Math.random() > 0.5) ? 1 : -1;

    // Generate random Number
    let a = signX * Math.random()*1000 + signY * Math.sqrt(Math.random()*1000);
    document.getElementById("userInput").value = a;

    // Set the range values from 0 to 1001
    document.getElementById("numericMinInput").value = 0;
    document.getElementById("numericInput").value = 1001;
    document.getElementById("sqrtMinInput").value = 0;
    document.getElementById("sqrtInput").value = 1001;

    // Set the precision to less that number of decimal places
    document.getElementById("precisionInput").value = 2;

    // Click on Simplify Button
    document.getElementById("userInteractionButton").click();
}

function setMaxPrecision(element){
    document.getElementById("precisionInput").max = Number(element.value).countDecimals();
}

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}
