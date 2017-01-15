var async=require("async");
//串行
//async.series([
//        function(callback) {
//            setTimeout(function(){
//                console.log(1);
//                callback(null, 'one');
//            },1000)
//        },
//        function(callback) {
//            setTimeout(function(){
//                console.log(2);
//                callback(null, 'two');
//            },1000)
//        }
//    ],
//// optional callback
//    function(err, results) {
//        console.log(results);
//        // results is now equal to ['one', 'two']
//    });

//async.series({
//    one: function(callback) {
//        setTimeout(function() {
//            console.log(1);
//            callback(null, 1);
//        }, 2000);
//    },
//    two: function(callback){
//        setTimeout(function() {
//            console.log(2);
//            callback(null, 2);
//        }, 1000);
//    }
//}, function(err, results) {
//    console.log(results);
//    // results is now equal to: {one: 1, two: 2}
//});

//并行
//async.parallel([
//        function(callback) {
//            setTimeout(function() {
//                console.log(1);
//                callback(null, 'one');
//            }, 2000);
//        },
//        function(callback) {
//            setTimeout(function() {
//                console.log(2);
//                callback(null, 'two');
//            }, 1000);
//        }
//    ],
//// optional callback
//    function(err, results) {
//        console.log(results);
//        // the results array will equal ['one','two'] even though
//        // the second function had a shorter timeout.
//    });

//对象的形式
//async.parallel({
//    one: function(callback) {
//        setTimeout(function() {
//            callback(null, 1);
//        }, 2000);
//    },
//    two: function(callback) {
//        setTimeout(function() {
//            callback(null, 2);
//        }, 1000);
//    }
//}, function(err, results) {
//    console.log(results);
//    // results is now equals to: {one: 1, two: 2}
//});


var fs=require("fs");

//async.auto({
//    // this function will just be passed a callback
//    readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
//    showData: ['readData', function(results, cb) {
//        // results.readData is the file's contents
//        // ...
//        console.log(123)
//    }]
//}, callback);

async.auto({
    get_data: function(callback) {
        console.log('in get_data');
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        console.log('in make_folder');
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null, 'folder');
    },
    write_file: ['get_data', 'make_folder', function(results, callback) {
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(results, callback) {
        console.log('in email_link', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
        callback(null, {'file':results.write_file, 'email':'user@example.com'});
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});