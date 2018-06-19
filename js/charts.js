
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
