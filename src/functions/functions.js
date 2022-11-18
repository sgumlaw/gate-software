export function 
    decimalToFraction (number) {
        let pipe_frac_dict = {
            '1/16': [0.0,.0631],  
            '1/8': [.0632,.1251], 
            '3/16': [.1252, .1881], 
            '1/4': [.1881, .2501], 
            '5/16': [.2502, .3131], 
            '3/8': [.3132, .3751], 
            '7/16': [.3752, .4381], 
            '1/2': [.4382, .5001], 
            '9/16': [.5002, .5631], 
            '5/8': [.5632, .6251], 
            '11/16': [.6252, .6881], 
            '3/4': [.6882, .7501], 
            '13/16': [.7502, .8131], 
            '7/8': [.8132, .8751], 
            '15/16': [.8752, .9501], 
        }
        let amount = Math.round(number * 1000) / 1000
        console.log("initial amount", amount % 1)
        let convertedAmount;
        let fractionAmount;
        if (parseFloat(amount) === parseInt(amount)){
            return amount;
        }
        else if ((parseFloat(amount) % 1) > .95){
            return Math.ceil(amount);
        }
        let greatestCommonDenominator = function(a, b){
            if (b < 0.000001){
                return a;
            }
            else {
                return greatestCommonDenominator(b, Math.floor(a%b))
            }
        }
        var len = amount.toString().length - 2;
        var denominator = Math.pow(10, len);
        var numerator = amount * denominator;
        var divisor = greatestCommonDenominator(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;
        var base = 0;
        if ( numerator > denominator ) {
            base = Math.floor( numerator / denominator );
            numerator -= base * denominator;
            //console.log("numerator", Math.floor(numerator))
            //console.log("denominator", Math.floor(denominator))
            amount = Math.floor(numerator) / Math.floor(denominator);
            //console.log(amount)
            //amount = Math.floor(numerator) + '/' + Math.floor(denominator);
            let v = Object.values(pipe_frac_dict);
            
            for (let i=0; i < Object.keys(pipe_frac_dict).length; i++){
                console.log(Object.keys(pipe_frac_dict).length)
                console.log(v[i][0])
                console.log(v[i][1])

                if (amount > v[i][0] && amount < v[i][1]){
                    
                    fractionAmount = Object.keys(pipe_frac_dict).splice(i,1)
                    
                }}
                console.log("fractionAmount", fractionAmount)
            
            if ( base ) {
                convertedAmount = base + '-' + fractionAmount;
            }
          
            return convertedAmount;
        }
    }


    // convertToFraction (number) {
    //     var pipe_frac_dict = {
    //         '1/16': [0.0,.063],  
    //         '1/8': [.064,.125], 
    //         '3/16': [.126, .188], 
    //         '1/4': [.189, .250], 
    //         '5/16': [.26, .313], 
    //         '3/8': [.314, .375], 
    //         '7/16': [.376, .438], 
    //         '1/2': [.439, .500], 
    //         '9/16': [.501, .563], 
    //         '5/8': [.564, .625], 
    //         '11/16': [.626, .688], 
    //         '3/4': [.689, .750], 
    //         '13/16': [.751, .813], 
    //         '7/8': [.814, .875], 
    //         '15/16': [.876, .950], 
    //         }
    //     let v = Object.values(pipe_frac_dict);
    //     for (let i=0; i < Object.keys(pipe_frac_dict).length; i++){
    //         console.log(i)
    //             if (number > v[i][0] && number < v[i][1]){
    //       return Object.keys(pipe_frac_dict).splice(i,1)
        
       
    //     }
           
    //       }
    //       }
        //}


