import SERVER from "./ServerUrl"

const SERVER_URL = `${SERVER}/prize`

export default class PrizeApi {

    static selectPrize(prizeList) {
        return fetch(`${SERVER_URL}/selectPrize`, {
            method: 'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(prizeList)
        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        });
    }

    static getConfiguration() {
        return fetch(`${SERVER_URL}/getConfiguration`, {
            method: 'GET',
        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        });
    }
}