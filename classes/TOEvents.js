class TOEvents {
    axios    = require('axios');

    constructor() {
    }

    createEvent(url, token, chartName, chartVersion, eventName, eventType, severity, details, tags) {
        let mapName = `${chartName}-${chartVersion}`

        let event = {
            name: eventName,
            annotations: {
                "severity": severity,
                "type": eventType,
                "details": details
            },
            tags: tags.split(',')
        }

        this.createWavefrontEvent(decodeURIComponent(url), decodeURIComponent(token), event)
            .then((response)=> {
                console.log(response.data.status);
            }).catch((wfError)=>{
                console.log(wfError);
        });
    }

    endEvent(url, token, eventName) {
        this.getWavefrontEventID(url, token, eventName).then((response)=>{
            let findID = new Promise((resolve, reject)=>{
                response.data.response.items.forEach((event)=>{
                    try {
                        if(event.name == eventName) {
                            resolve(event.id);
                        }
                    }catch(err) {
                        reject(err);
                    }

                    reject(`${eventName} not found!`);
                });
            })

            this.endWavefrontEvent(url, token, findID);
        }).catch((error)=>{
            console.log(error);
        });
    }

    createWavefrontEvent(wfURL, wfToken, event) {
        return this.axios.post(`${wfURL}/api/v2/event`, event,{
            headers: {
                Authorization: `Bearer ${wfToken}`
            }
        });
    }

    endWavefrontEvent(wfURL, wfToken, eventID) {
        eventID.then((id)=>{
            return this.axios.post(`${wfURL}/api/v2/event/${id}/close`, null,{
                headers: {
                    Authorization: `Bearer ${wfToken}`
                }
            });
        }).catch((err)=>{
            console.log(err);
        })
    }

    getWavefrontEventID(url, token, eventName) {
        return this.axios.get(`${url}/api/v2/event`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

module.exports = TOEvents;