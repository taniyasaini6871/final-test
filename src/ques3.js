/* Ques 3 - Let's do some practice with a simple exercice. You must modify the code below based on the following
 rules:

The function job must return a promise object (you are in a NodeJS environment, you can use new Promise)
The promise must resolve itself 2 seconds after the call to job and must provide hello world in the data */


function job() {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("hello world");
        }, 2000);
    })


}
let promise = job();

promise.then(function solves(value) {

    console.log(value)

});

