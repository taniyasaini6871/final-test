/* Q Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

Make two variants of the solution.

Using setInterval.
Using nested setTimeout. */


//  using setInterval.

function printNumbers(from, to) {
    console.log(from);

    let timer = setInterval(() => {
       
        if (from !== to) {
            console.log(from+1);
        }
        from++;
        

        if (from == to) {
            clearInterval(timer);
        }
    }, 1000)

}

printNumbers(1, 10);


