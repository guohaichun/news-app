var main=require("./main.js");
var CronJob = require('cron').CronJob;
var child=require("child_process");
//定时执行设定任务
new CronJob('*/10 * * * * *', function() {
    process.send("正在进行");
    main();
}, null, true, 'America/Los_Angeles');