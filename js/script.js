// Global variables
var arrayResults = [];
var arrayLabels = [];
var arrayTCL = [];

// END Global Variables


// Math Functions 
function suma(array) {
    var sum = 0;    
    for (let i = 0, l = array.length; i < l; i++){
        sum += array[i];
    } 

    return sum;
}

function media(array) {
    return suma(array) / array.length;
}

function variance(array) {
    var med = media(array);
    return media(array.map(function(num) {
        return Math.pow(num - med, 2);
    }));
}

// END Math Functions

function show(){        
    graphicBinomial();
    document.getElementById('simular-btn').disabled = true;
    document.getElementById('h2-tcl').style.visibility='visible';
    document.getElementById('section-probabilities').style.visibility='visible';
    teoremCentralLimit(arrayResults.length);
    graphicTCL();
}

function inputValues(){
    var size = document.getElementById('size').value;
    var n = document.getElementById('valueN').value;
    var p = document.getElementById('valueP').value;
    
    if ((size === "") || (n === "") || (p === "")){
        window.alert('No puede haber campos vacíos');
        return false;
    }     

    results(size, n, p);    
    show();

}


function results(size, n, p){
    var media = 0;
    var result;
    for(let i = 0; i < size; i++){ 
        result = binomial(n, p);   
        arrayResults[i] = result;
        arrayLabels[i] = i+1;        
        media += result;
    }

    media = media / size;             
    document.getElementById('media').innerHTML = 'La media es ' + media.toFixed(2);
    document.getElementById('varianza').innerHTML = 'La varianza es ' + variance(arrayResults).toFixed(2);

}

function bernoulli(p){
    var random = Math.random();
    
    if (random <= p) {
        return (1);
    } else {
        return (0);
    }
}

function binomial(n, p) {
    var exitos = 0;

    for(let i = 0; i <= n; i++){
        if(bernoulli(p) == 1){
            exitos++;
        }
    }

    return (exitos);
}

function teoremCentralLimit(size){
    var mediaArray = media(arrayResults);
    var varianceArray = variance(arrayResults);
    
    for(let i = 0; i < size; i++){
        arrayTCL[i] = ((arrayResults[i] - mediaArray) / Math.sqrt(varianceArray));
    }

}

function calculateProbSing(){
    var value = document.getElementById('input-prob-singular').value;
    var total = 0;
    
    for(let i = 0; i < arrayResults.length; i++){        
        if(arrayResults[i] == value){              
            total++;
        }
    }

    var probability = total / arrayResults.length;    
    document.getElementById('span-singular').innerHTML = 'La probabilidad es: ' + probability.toFixed(2);
}

function calculateProbInterval(){
    var valueJust = document.getElementById('input-prob-interval1').value;
    var valueUntil = document.getElementById('input-prob-interval2').value;
    var total = 0;
    var sum = 0;

    if(valueUntil <= valueJust){
        window.alert('El segundo valor no puede ser menor o igual que el primero');
    } else {

        for(let i = 0; i < arrayResults.length; i++){        
            if((arrayResults[i] >= valueJust) && (arrayResults[i] <= valueUntil)){                  
                total++;
                sum += arrayResults[i];
            }
        }
        var probability = total / arrayResults.length;
        document.getElementById('span-interval').innerHTML = 'La probabilidad es: ' + probability.toFixed(2);
        errorTask(sum, total, probability);
    }
    
}

function errorTask(sum, total, probability){
    var media = sum / total;
    var error = media / arrayResults.length;
    console.log('NUMERO DE ELEMENTOS: ' + arrayResults.length);
    var totalError = Math.abs(error - probability);
    document.getElementById('span-error').innerHTML = 'El error cometido del intervalo es ' +  totalError.toFixed(2);

}



