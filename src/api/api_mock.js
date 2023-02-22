function later(result) {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve(result)
        }, 1000);
    });
}


export const api = {
    async searchUsers(search){
        const result = {
            items: [
                {login: 'joao'},
                {login: 'jose'},
            ]
        }
        return later(result)
    },
    async listRepositories(username){
        const result = [
            {name: 'Django', owner: {login: 'joao'}},
            {name: 'Vue.js', owner: {login: 'jose'}},
        ]
        return later(result)
    }
}