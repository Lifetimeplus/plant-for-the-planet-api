const axios = require('axios');

class PlantForThePlanetAPI {

    constructor(sessionId,tokenId, environment = true) {
        this.sessionId = sessionId
        this.tokenId = tokenId
        this.host = (environment) ? 
            'https://app-staging.plant-for-the-planet.org/app' : 
            'https://app-staging.plant-for-the-planet.org/app'
    }

    treeCash() {
        return axios({
            method: 'get',
            url: this.host + '/treeCash',
            headers: {
                'Content-Type': 'application/json',
                'X-SESSION-ID': this.sessionId,
                'X-TOKEN-API': this.tokenId
            }
        })
    }

    getTransaction() {
        return axios({
            method: 'get',
            url: this.host + '/treeCash/transactions',
            headers: {
                'Content-Type': 'application/json',
                'X-SESSION-ID': this.sessionId,
                'X-TOKEN-API': this.tokenId
            }
        })
    }

    setTransaction(project, treeCount, donater) {
        return axios({
            method: 'post',
            url: this.host + '/donations',
            headers: {
                'Content-Type': 'application/json',
                'X-SESSION-ID': this.sessionId,
                'X-TOKEN-API': this.tokenId,
                'IDEMPOTENCY-KEY': '1234567890'
            },
            data: {
                "type": "trees",
                "prePaid": true,
                "project": project,
                "treeCount": treeCount,
                "gift": {
                    "type": "invitation",
                    "recipientName": donater.name,
                    "recipientEmail": donater.email,
                    "message": donater.message,
                }
            }
        })
    }
}
