// question1

// using nested setTimeOut

function printNumber(from,to){

    setTimeout(function firstTimer(){
       console.log(from);
       if (from !== to) {
            setTimeout((firstTimer),1000);
       }
       from++;

   },1000)
}

printNumber(1,10);