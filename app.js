const TOEvents = require("./classes/TOEvents");

let to = new TOEvents();

let envs = {
    url: process.env.URL,
    token: process.env.TOKEN,
    chartName: process.env.CHARTNAME,
    chartVersion: process.env.CHARTVERSION,
    eventName: process.env.EVENTNAME,
    eventType: process.env.EVENTTYPE,
    severity: process.env.SEVERITY,
    details: process.env.DETAILS,
    tags: process.env.TAGS
}

if(process.env.CREATEEVENT==="1"){
    to.createEvent(envs.url, envs.token, envs.chartName, envs.chartVersion,
        envs.eventName, envs.eventType, envs.severity, envs.details, envs.tags);
}else if(process.env.ENDEVENT==="1"){
    to.endEvent(envs.url, envs.token, envs.eventName);
}