export const get = (url) =>{
    return fetch(url)
        .then(res => {
            try {
                return res.json();
            } catch (e){
                throw res;
                return res;
            }
        },(res)=> {
            throw res;
        })
}

export const post = (url, body)=>{
    const fetchOptions = {
        type: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return fetch(url, fetchOptions)
        .then(res=> {
            try {
                return res.json();
            } catch (e) {
                throw res;
                return res;
            }
        }, (res)=> {
            throw res;
        })
}

