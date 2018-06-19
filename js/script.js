// Global variables
var arrayResults = [];
var arrayLabels = [];
var arrayTCL = [];
var simulaciones = 0;
var valorN = 0;
var valorP = 0;
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
    simulaciones = size;
    valorN = n;
    valorP = p;
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
    document.getElementById('media').innerHTML = 'La media es ' + media.toFixed(3);
    document.getElementById('varianza').innerHTML = 'La varianza es ' + variance(arrayResults).toFixed(3);

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

    for(let i = 1; i <= n; i++){
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
    document.getElementById('span-singular').innerHTML = 'La probabilidad es: ' + probability.toFixed(3);
    errorTaskPuntual();
}

function errorTaskPuntual(){
    var mediaReal = valorN * valorP;
    var varianzaReal = valorN * valorP * (1 - valorP);
    console.log(mediaReal + " y  varianza" + varianzaReal);

}

function calculateProbInterval(){
    var valueJust = document.getElementById('input-prob-interval1').value;
    var valueUntil = document.getElementById('input-prob-interval2').value;
    var select = document.getElementById('selectInterval').value;
    var total = 0;
    var sum = 0;

    if(valueUntil <= valueJust){
        window.alert('El segundo valor no puede ser menor o igual que el primero');
    } else {
        if(select == "cerrado"){
            for(let i = 0; i < arrayResults.length; i++){        
                if((arrayResults[i] >= valueJust) && (arrayResults[i] <= valueUntil)){                  
                    total++;
                    sum += arrayResults[i];
                }
            }
        } else if(select == "abierto"){
            for(let i = 0; i < arrayResults.length; i++){        
                if((arrayResults[i] > valueJust) && (arrayResults[i] < valueUntil)){                  
                    total++;
                    sum += arrayResults[i];
                }
            }
        } else if(select == "abiertoIzq"){
            for(let i = 0; i < arrayResults.length; i++){        
                if((arrayResults[i] > valueJust) && (arrayResults[i] <= valueUntil)){                  
                    total++;
                    sum += arrayResults[i];
                }
            }
        } else {
            for(let i = 0; i < arrayResults.length; i++){        
                if((arrayResults[i] >= valueJust) && (arrayResults[i] < valueUntil)){                  
                    total++;
                    sum += arrayResults[i];
                }
            }
        }
        var probability = total / arrayResults.length;
        document.getElementById('span-interval').innerHTML = 'La probabilidad es: ' + probability.toFixed(2);
        errorTaskInterval(sum, total, probability);
    }
    
}

function errorTaskInterval(sum, total, probability){
    var media = sum / total;
    var error = media / arrayResults.length;
    var totalError = Math.abs(error - probability);
    document.getElementById('span-error').innerHTML = 'El error cometido del intervalo es ' +  totalError.toFixed(2);

}
function maxArray(){
    var values = arrayResults;
    var max = 0;
    console.log('Tam de array result' + arrayResults.length);
    console.log('Tam de array VALLUES ' + values.length);
    for(var i = 0; i < values.length; i++){
      if(max < values[i]){
          max = values[i];
      }    
    }
  console.log('Maximo del array ' + max);
  return max;
}


Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

function calculo(array){

    var x = array.sort((a, b) => a - b );
    var frecuencias = [];
    frecuencias.length = ((array.unique())).length;
    console.log('Tam array frec' + frecuencias.length);
    var cant = 0;
    var c = 0;
    for(let i = 0; i < x.length; i+=cant){
        cant=0;
        for(let j = 0; j < x.length; j++){
            if(x[i] == x[j]){
                cant++;
            }
        }        
        frecuencias[c] = cant;
        c++;
    }
        
    console.log('Array frecuencias ' + frecuencias);
    return frecuencias;
}

// GRAPHICS

function graphicBinomial(){
    var ctx = document.getElementById('myChart').getContext('2d');
    console.log("Resultado en la X simulaciones " + arrayResults.sort((a, b) => a - b ));
    console.log("Posibles valores " + (arrayResults.unique()).sort((a, b) => a - b ));
    var chart = new Chart(ctx, {
    
    type: 'bar',
        
    
    data: {
        labels: (arrayResults.unique()).sort((a, b) => a - b ), //posibles valores, EJE X y ademas ordenados
        datasets: [{
            label: "Resultados Binomial",
            backgroundColor: '#c75c5c',
            borderColor: '#c75c5c',
            data: calculo(arrayResults),
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
    type: 'line',

    
    data: {
        labels: (arrayTCL.unique()).sort((a, b) => a - b ),
        datasets: [{
           // fill: false,
            label: "Resultados TCL",
            backgroundColor: '#f5cf87',
            borderColor: '#f5cf87',
            data: calculo(arrayResults), 
        }]
    },

    
    options: {}
    
});

    var chart = document.getElementById('secondChart').style.visibility='visible';        
    document.getElementById('mediaTCL').innerHTML = 'La media es ' + Math.abs(media(arrayTCL).toFixed(0));
    document.getElementById('varianzaTCL').innerHTML = 'La varianza es ' + variance(arrayTCL).toFixed(0);

}

// END GRAPHICS


