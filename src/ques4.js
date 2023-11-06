/*Ques 4 - Let's do a harder exercise. In this code, your function receives a parameter data.
 You must modify the code below based on the following rules:

Your function must always return a promise
If data is not a number, return a promise rejected instantly and give the data "error" (in a string)
If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)*/

function printingNumber(data) {
    
        return new Promise((resolve,reject) => {
             
            if (isNaN(data) || typeof data === 'string'){
                reject("It is not a number");
            } 

            if (data % 2 == 0) {
        
                setTimeout(() => {
                    resolve("Even number");
                }, 2000)
           }

           if (data % 2 !== 0) {
        
            setTimeout(() => {
                resolve("Odd number");
            }, 1000)
          
          }
            
        })
}

let myPromise = printingNumber(89);

myPromise
    .then(result => {
        console.log(result); 
    })
    .catch(error => {
        console.error(error);
    });


