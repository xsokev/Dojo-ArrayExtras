/**
 * Created with IntelliJ IDEA.
 * Author: Kevin Armstrong
 * Date: 6/9/13
 */
define(["dojo/_base/array"], function (array) {
    // module:
    //		array.extras
    var isArray = Array.prototype.isArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };

    return {
        // summary:
        //		Array utilities and convenience methods.

        every: array.every,
        some: array.some,
        filter: array.filter,
        forEach: array.forEach,
        each: array.forEach,
        indexOf: array.indexOf,
        lastIndexOf: array.lastIndexOf,
        map: array.map,
        clone: function(list){
            // summary:
            //		Returns a copy of the passed array. Modifications to the cloned array
            //      will not affect the original.
            // list: Array
            //		the array to clone.
            // returns: Array
            return list.slice(0);
        },
        find: function(list, it, context){
            // summary:
            //		Looks through each value in the list, returning the first
            //      one that passes a truth test.
            // list: Array
            //		the array to iterate over.
            // it: Function
            //		a function that is invoked with three arguments (item,
            //		index, array). The return of this function is expected to
            //		be a boolean which determines whether the passed-in item
            //		will be included in the returned array.
            // context: Object?
            //		may be used to scope the call to callback
            // returns: Object
            return this.filter(list, it, context)[0];
        },
        include: function(list, item){
            // summary:
            //		Pushes the passed element into the array if it's not
            //      already present (case and type sensitive).
            // list: Array
            //		the array to add the new item to.
            // item: Object
            //		The item that should be added to this array.
            // returns: Array
            if(!this.contains(list, item)){ list.push(item); }
            return list;
        },
        combine: function(list, listb){
            // summary:
            //		Combines an array with all the items of another. Does not
            //      allow duplicates and is case and type sensitive.
            // list: Array
            //		The original array.
            // listb: Array
            //		The array whose items should be combined into this array.
            // returns: Array
            this.each(listb, function(item){ this.include(list, item) }, this);
            return list;
        },
        erase: function(list, items){
            // summary:
            //		Removes all occurrences of an item from the array.
            // list: Array
            //		the array to iterate over.
            // items: Object|Array
            //		The items to search for in the array.
            // returns: Array
            if(!isArray(items)){ items = [items]; }
            this.each(items, function(item){
                for (var i = list.length; i--;){
                    if (list[i] === item) list.splice(i, 1);
                }
            }, this);
            return list;
        },
        reduce: function(list, it, value){
            // summary:
            //		Apply a function against an accumulator and each value of the
            //      array (from left-to-right) as to reduce it to a single value.
            // list: Array
            //		the array to iterate over.
            // it: Function
            //		a function to execute on each value in the array.
            // value: Object
            //		value to use as the first argument to the first call of the it.
            // returns: Object
            for (var i = 0, l = list.length; i < l; i++){
                if(i in list){ value = !value ? list[i] : it.call(null, value, list[i], i, list); }
            }
            return value;
        },
        reduceRight: function(list, it, value){
            // summary:
            //		Apply a function against an accumulator and each value of the
            //      array (from right-to-left) as to reduce it to a single value.
            // list: Array
            //		the array to iterate over.
            // it: Function
            //		a function to execute on each value in the array.
            // value: Object
            //		value to use as the first argument to the first call of the it.
            // returns: Object
            for (var i = list.length; i >= 0; i--){
                if(i in list){ value = !value ? list[i] : it.call(null, value, list[i], i, list); }
            }
            return value;
        },
        where: function(list, props, first){
            // summary:
            //		Looks through each value in the list, returning an array
            //      of all the values that contain all of the key-value pairs
            //      listed in properties.
            // list: Array
            //		the array to iterate over.
            // props: Function
            //		key-value pairs used when iterating over the array
            // first: Boolean
            //      whether to return the first value found or a list of values
            // returns: Object|Array
            if(!props){ return first ? null : []; }
            return this[first ? 'find' : 'filter'](list, function(value){
                for(var key in props){
                    if(props[key] !== value[key]){ return false; }
                }
                return true;
            });
        },
        findWhere: function(list, props){
            // summary:
            //		Looks through the list and returns the first value that
            //      matches all of the key-value pairs listed in properties.
            // list: Array
            //		the array to iterate over.
            // props: Function
            //		key-value pairs used when iterating over the array
            // returns: Object
            return this.where(list, props, true);
        },
        reject: function(list, it, context){
            // summary:
            //		Returns the values in list without the elements that the
            //      truth test (iterator) passes. The opposite of filter.
            // list: Array
            //		the array to iterate over.
            // it: Function
            //		a function that is invoked with three arguments (item,
            //		index, array). The return of this function is expected to
            //		be a boolean which determines whether the passed-in item
            //		will be included in the returned array.
            // context: Object
            //		may be used to scope the call to callback
            // returns: Array
            return this.filter(list, function(value, index, list) {
                return !it.call(context, value, index, list);
            }, context);
        },
        contains: function(list, value, from){
            // summary:
            //		Returns true if the value is present in the list. Uses
            //      indexOf internally.
            // list: Array
            //		the array to iterate over.
            // value: Function
            //		value to find in array.
            // from: Object
            //		where to start searching in the array.
            // returns: Boolean
            return this.indexOf(list, value, from) >= 0;
        },
        first: function(list, n){
            // summary:
            //		returns the first item in the array or an array
            //      of items if the first(n) items is greater than 1
            // list: Array
            //		the array to iterate over.
            // n: Number?
            //		if passed, returns the first n items in the array
            // returns: Object|Array
            n = n || 1;
            var vals = this.clone(list).slice(0, n);
            return vals.length === 1 ? vals[0] : vals;
        },
        last: function(list, n){
            //		returns the last item in the array or an array
            //      of items if the last(n) items is greater than 1
            // list: Array
            //		the array to iterate over.
            // n: Number?
            //		if passed, returns the last n items in the array
            // returns: Object|Array
            n = n || 1;
            var vals = this.clone(list).slice(list.length-n);
            return vals.length === 1 ? vals[0] : vals;
        },
        clean: function(list, excludes){
            // summary:
            //		creates a new array with all of the elements of the array
            //      which are not false-like (undefined, null, false, 0, "", NaN).
            // list: Array
            //		the array to iterate over.
            // excludes: Array
            //		list of false-like values to allow when cleaning.
            // returns: Array
            excludes = excludes || [];
            var falsy = this.filter([0,"",false,null,undefined,NaN], function(f){ return !this.contains(excludes, f); }, this);
            return this.filter(list, function(item){
                return !this.contains(falsy, item);
            }, this);
        },
        min: function(list){
            // summary:
            //		returns the minimum value in the array. Only works well
            //      with string and number values
            // list: Array
            //		the array to iterate over.
            // returns: Object
            return this.clone(list).sort()[0];
        },
        max: function(list){
            // summary:
            //		returns the maximum value in the array. Only works well
            //      with string and number values
            // list: Array
            //		the array to iterate over.
            // returns: Object
            return this.clone(list).sort()[list.length-1];
        },
        unique: function(list){
            // summary:
            //		returns a new array without duplicate values.
            // list: Array
            //		the array to iterate over.
            // returns: Array
            return this.combine([], list);
        },
        shuffle: function(list){
            // summary:
            //		returns a shuffled copy of the list.
            // list: Array
            //		the array to mix up.
            // returns: Array
            for (var i = list.length; i && --i;){
                var temp = list[i], r = Math.floor(Math.random() * ( i + 1 ));
                list[i] = list[r];
                list[r] = temp;
            }
            return list;
        }
    };
});