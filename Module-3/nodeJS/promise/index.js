const promise1 = new Promise(
    
    function(resolve,reject) {
        resolve();
    }
);

promise1
    .then(function() {
        console.log('Hello');
    })

    .catch(function() {
        console.log('Sai oy');
    })

const promise2 = new Promise(

    function(resolve,reject) {
        resolve(
            {
                name: 'A',
                age: 20
            }
        );
    } 
);
    
promise2
    .then(function(courses) {
        console.log(courses);
    })

    .catch(function() {
        console.log('Sai oy');
    })

const promise3 = new Promise(

    function(resolve,reject) {
        resolve(
            {
               status: 'Success',
               data: [
                {name: 'A', age: 25},
                {name: 'B', age: 30},
               ]
            }
        );
    } 
);
    
promise3
    .then(function(courses) {
        console.log(courses);
    })

    .catch(function() {
        console.log('Sai oy');
    })    