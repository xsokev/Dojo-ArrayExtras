define(["doh/runner", "project/array.extras", "project/tests/data/numbers", "project/tests/data/states", "project/tests/data/authors"], function(doh, arrayExt, numbers, states, authors) {
    var nums = numbers.single;

    var evenIterator = function(num){ return num % 2 === 0; };
    var oddIterator = function(num){ return num % 2 === 1; };
    var abbrs = arrayExt.map(states, function(state){ return state.abbreviation; });

    doh.l = doh.assertLength = function(/*Number*/ expected, /*Array|String*/ value, /*String?*/ hint) {
        if(arguments.length < 2){ throw new doh._AssertFailure("assertLength failed because it was not passed an expected and actual value"); }
        if(!value.length || value.length !== expected){
            throw new doh._AssertFailure("assertLength('" + value + "') failed. Expected: " + expected + ", but got: " + value.length, hint);
        }
    };

    doh.register("Array.Extras Methods", {
        "should clone an array without modifying the original":{
            setUp: function(){
                this.a1 = arrayExt.clone(nums);
                this.a1 = this.a1.splice(0,5);
                this.s1 = arrayExt.clone(abbrs).splice(0,10);
            },
            runTest: function(){
                doh.l(5, this.a1);
                doh.l(10, nums);
                doh.l(10, this.s1);
                doh.l(59, abbrs);
            }
        },
        "should find item in array":{
            setUp: function(){
                this.n1 = arrayExt.clone(nums);
            },
            runTest: function(){
                doh.is(0, arrayExt.find(this.n1, evenIterator));
                doh.is(1, arrayExt.find(this.n1, oddIterator));
                doh.is(8, arrayExt.find(this.n1.reverse(), evenIterator));
            }
        },
        "should add unique items to array":{
            setUp: function(){
                this.n1 = arrayExt.clone(nums);
            },
            runTest: function(){
                doh.l(10, this.n1);
                arrayExt.include(this.n1, 1);
                arrayExt.include(this.n1, 10);
                doh.l(11, this.n1);
                arrayExt.include(this.n1, 10);
                arrayExt.include(this.n1, 20);
                doh.l(12, this.n1);
            }
        },
        "should combine two arrays without duplicates":{
            setUp: function(){
                var a1 = [1,2,3,4,5,6];
                var a2 = [4,5,6,7,8,9];
                this.n1 = arrayExt.combine(a1, a2);
            },
            runTest: function(){
                doh.l(9, this.n1);
            }
        },
        "should erase items from array":{
            setUp: function(){
                this.n1 = arrayExt.clone(nums);
            },
            runTest: function(){
                doh.l(10, this.n1);
                arrayExt.erase(this.n1, 1);
                arrayExt.erase(this.n1, [9]);
                doh.l(8, this.n1);
                arrayExt.erase(this.n1, [2,3,4]);
                doh.l(5, this.n1);
                doh.is([0,5,6,7,8], this.n1);
            }
        },
        "should return true if an array contains a value":{
            runTest: function(){
                doh.t(arrayExt.contains(nums, 4));
                doh.t(arrayExt.contains(nums, 9, 4));
                doh.f(arrayExt.contains(nums, 13));
                doh.t(arrayExt.contains(abbrs, 'TN'));
                doh.t(arrayExt.contains(abbrs, "WI", 26));
                doh.f(arrayExt.contains(abbrs, 'TY'));
            }
        },
        "should reduce array to a value":{
            runTest: function(){
                doh.is(45, arrayExt.reduce(nums, function(a,b){ return a+b; }));
                doh.is(60, arrayExt.reduce(nums, function(a,b){ return a+b; }, 15));
            }
        },
        "should reduce array to a value in reverse":{
            setUp: function(){
                this.fiveStates = arrayExt.clone(abbrs).splice(0,5);
            },
            runTest: function(){
                var cvsStates = arrayExt.reduceRight(this.fiveStates, function(a,b){ return a+','+b; });
                doh.is("AR,AZ,AS,AK,AL", cvsStates);
                doh.is(60, arrayExt.reduceRight(nums, function(a,b){ return a+b; }, 15));
            }
        },
        "should clean an array of false-like values":{
            runTest: function(){
                doh.is([1,2,3], arrayExt.clean([0,1,2,3]));
                doh.is([0,1,2,3], arrayExt.clean([0,1,2,3], [0]));
                doh.is([0,1,2,3,false], arrayExt.clean([0,1,2,3,false], [0,false]));
            }
        },
        "should find first value of array":{
            runTest: function(){
                doh.is(0, arrayExt.first(nums));
                doh.is('AL', arrayExt.first(abbrs));
                doh.is('AK', arrayExt.first(arrayExt.clone(abbrs).sort()));
                doh.is([0,1,2,3,4], arrayExt.first(nums,5));
                doh.is(['AL','AK'], arrayExt.first(abbrs,2));
            }
        },
        "should find last value of array":{
            runTest: function(){
                doh.is(9, arrayExt.last(nums));
                doh.is('WY', arrayExt.last(abbrs));
                doh.is([5,6,7,8,9], arrayExt.last(nums,5));
                doh.is(['WI','WY'], arrayExt.last(abbrs,2));
            }
        },
        "should find min value of array":{
            runTest: function(){
                doh.is(0, arrayExt.min(nums));
                doh.is('AK', arrayExt.min(abbrs));
            }
        },
        "should find max value of array":{
            runTest: function(){
                doh.is(9, arrayExt.max(nums));
                doh.is('WY', arrayExt.max(abbrs));
            }
        },
        "should shuffle an array":{
            setUp: function(){
                this.n1 = arrayExt.shuffle(arrayExt.clone(nums));
            },
            runTest: function(){
                doh.l(10, this.n1);
                doh.t(this.n1[1] !== nums[1]);
            }
        },
        "should remove duplicates from array":{
            setUp: function(){
                this.n1 = arrayExt.clone(nums).concat(arrayExt.clone(nums));
            },
            runTest: function(){
                doh.l(10, arrayExt.unique(this.n1));
            }
        },
        "should reject values":{
            runTest: function(){
                var newNums2 = arrayExt.reject(nums, evenIterator);
                var newNums3 = arrayExt.reject(nums, oddIterator);
                doh.is(newNums2, [1,3,5,7,9]);
                doh.is(newNums3, [0,2,4,6,8]);
            }
        },
        "should find in array based on properties": {
            setUp: function(){
                this.co_auth = arrayExt.where(authors, {"State": "CO"}, true);
                this.co_auths = arrayExt.where(authors, {"State": "CO"});
            },
            runTest: function(){
                doh.l(6, this.co_auths);
                doh.t(this.co_auth.State === "CO");
            }
        },
        "should find single object in array based on properties": {
            setUp: function(){
                this.bo_auth = arrayExt.findWhere(authors, {"City": "Boston"});
            },
            runTest: function(){
                doh.t(this.bo_auth.State === "MA");
            }
        }
    });
});