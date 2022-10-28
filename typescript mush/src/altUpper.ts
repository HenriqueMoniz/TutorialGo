var test="string hello"
var random=""
var count:number=0
for(var i =0; i<test.length;i++){
    if (count%2==0){
        random+=test[i].toUpperCase();
        count+=1
    }
    else{
        random+=test[i];
        count+=1
    }
}
console.log(random)

