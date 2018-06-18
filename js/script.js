// Global variables
var arrayResults = [];
var arrayLabels = [];
var arrayTCL = [];

//-----------------

// GRAPHICS

function graphicBinomial(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    
    type: 'bar',

    
    data: {
        labels: arrayLabels,
        datasets: [{
            label: "Resultados Binomial",
            backgroundColor: '#c75c5c',
            borderColor: '#c75c5c',
            data: arrayResults,
        }]
    },
    
    options: {}
    
    });

    var chart = document.getElementById('myChart').style.visibility='visible';    
}


function graphicTCL(){
    var ctx = document.getElementById('secondChart').getContext('2d');
    var chart = new Chart(ctx, {
    
    type: 'bar',

    
    data: {
        labels: arrayTCL,
        datasets: [{
            label: "Resultados TCL",
            backgroundColor: '#f5cf87',
            borderColor: '#f5cf87',
            data: arrayResults, 
        }]
    },

    
    options: {}
    
});
    var chart = document.getElementById('secondChart').style.visibility='visible';        
    document.getElementById('mediaTCL').innerHTML = 'La media es ' + media(arrayTCL).toFixed(0);
    document.getElementById('varianzaTCL').innerHTML = 'La varianza es ' + variance(arrayTCL).toFixed(0);

}

// END GRAPHICS

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
    console.log('p: '+ p);

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
function suma(array) {
    var num = 0;
    for (var i = 0, l = array.length; i < l; i++) num += array[i];
    return num;
}

function media(array) {
    return suma(array) / array.length;
}
function variance(array) {
    var mean = media(array);
    return media(array.map(function(num) {
        return Math.pow(num - mean, 2);
    }));
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

    console.log('MEDIA: ' + media(arrayTCL).toFixed(0));
    console.log('VARIANZA: ' + variance(arrayTCL).toFixed(0));

}

function calculateProbSing(){
    var value = document.getElementById('input-prob-singular').value;
    var total = 0;
    
    for(let i = 0; i < arrayResults.length; i++){        
        if(arrayResults[i] == value){
            console.log('Valor: ' + arrayResults[i]);    
            total++;
        }
    }

    var probability = total / arrayResults.length;
    console.log('Hay tantos N: ' + total);

    document.getElementById('span-singular').innerHTML = 'La probabilidad es: ' + probability;
}

function calculateProbInterval(){
    var valueJust = document.getElementById('input-prob-interval1').value;
    var valueUntil = document.getElementById('input-prob-interval2').value;
    var total = 0;

    if(valueUntil <= valueJust){
        window.alert('El segundo valor no puede ser menor o igual que el primero');
    } else {

        for(let i = 0; i < arrayResults.length; i++){        
            if((arrayResults[i] >= valueJust) && (arrayResults[i] <= valueUntil)){
                console.log('Valor: ' + arrayResults[i]);    
                total++;
            }
        }
        var probability = total / arrayResults.length;
        document.getElementById('span-interval').innerHTML = 'La probabilidad es: ' + probability;
    }



    
}





