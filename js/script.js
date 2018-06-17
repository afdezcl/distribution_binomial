// Global variables
var arrayResults = [];
var arrayData = [];


//-----------------

function show(){        
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: arrayData,
        datasets: [{
            label: "Resultados",
            backgroundColor: '#c75c5c',
            borderColor: '#c75c5c',
            data: arrayResults, //quitar este array y llamar a una funcion que devuelve un array con los resultados
        }]
    },

    // Configuration options go here
    options: {}
    
});
    var chart = document.getElementById('myChart').style.visibility='visible';
}

function inputValues(){
    var size = document.getElementById('size').value;
    var n = document.getElementById('valueN').value;
    var p = document.getElementById('valueP').value;
    

    console.log('Valor de size: ' + size);
    console.log('N: ' + n);
    console.log('P: ' + p);

    results(size, n, p);
    console.log(arrayResults);    
    show();

}


function results(size, n, p){
    var media = 0;
    var result;
    for(let i = 0; i < size; i++){ 
        result = binomial(n, p);   
        arrayResults[i] = result;
        arrayData[i] = i+1;
        console.log('Resultado ' + i + ":" + result);
        media += result;
    }

    media = media / size;     
    console.log('Media: ' + trunc(media, 2));
    document.getElementById('media').innerHTML = 'La media es ' + media;
    document.getElementById('varianza').innerHTML = 'La varianza es ';

}

function trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
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
