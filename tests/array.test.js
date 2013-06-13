define(["doh/runner", "project/enumerator", "project/tests/numbers", "project/tests/states"], function(doh, enu, numbers, states) {
    var nums = numbers.single;

    var numberIterator = function(num){ return typeof num === "number"; };
    var evenIterator = function(num){ return num % 2 === 0; };
    var oddIterator = function(num){ return num % 2 === 1; };
    var abbrs = enu.map(states, function(state){ return state.abbreviation; })

    doh.register("Enumerator Methods", {
        "every value should pass test":{
            setUp:function () {
                this.numberIterator = function(num){
                    return num * 1 === num;
                }
            },
            runTest: function(){
                doh.t(enu.every(nums, this.numberIterator, this));
                doh.t(enu.every(nums, numberIterator));
            }
        },
        "some values should pass test":{
            setUp:function () {
                this.numberIterator = function(num){
                    return num % 2 === 0;
                }
            },
            runTest: function(){
                doh.t(enu.some(nums, this.numberIterator, this));
                doh.t(enu.some(nums, numberIterator));
            }
        },
        "should filter values":{
            runTest: function(){
                var newNums1 = enu.filter(nums, numberIterator);
                var newNums2 = enu.filter(nums, evenIterator);
                var newNums3 = enu.filter(nums, oddIterator);
                doh.is(newNums1, nums);
                doh.is(newNums2, [0,2,4,6,8]);
                doh.is(newNums3, [1,3,5,7,9]);
            }
        },
        "should build new array using forEach":{
            runTest: function(){
                var aStates = [];
                enu.forEach(states, function(state){
                    if(state.name.indexOf("A") === 0){ aStates.push(state.abbreviation); }
                });
                doh.t(aStates.length === 5);
                doh.is(enu.first(aStates), "AL");
                doh.is(enu.last(aStates), "AR");
            }
        },
        "should return indexOf item in array":{
            runTest: function(){
                doh.t(enu.indexOf(numbers.single, 9) === 9);
                doh.t(enu.indexOf(numbers.single, 0) === 0);
                doh.t(enu.indexOf(abbrs, 'AR') === 4);
            }
        },
        "should return lastIndexOf item in array":{
            setUp: function(){
                this.nums = [];
                for(var i=0; i<2; i++){
                    enu.each(numbers.single, function(num){
                        this.nums.push(num);
                    }, this);
                }
            },
            runTest: function(){
                doh.t(enu.lastIndexOf(this.nums, 9) === 19);
                doh.t(enu.lastIndexOf(this.nums, 0) === 10);
                doh.t(enu.lastIndexOf(abbrs, 'AR') === 4);
            }
        },
        "should map new array":{
            setUp: function(){
                this.states = enu.map(states, function(state){
                    return state.abbreviation;
                });
            },
            runTest: function(){
                doh.t(enu.first(this.states) === "AL");
                doh.t(enu.last(this.states) === "WY");
            }
        }
    });
});