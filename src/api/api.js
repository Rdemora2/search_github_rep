async function fetch(url){
    let going = true
    let result = []
    let page = 1
    while(going){
        const response = await fetch(`${url}?page=${page}`)
        const tmpitems = await response.json()
        if(tmpitems.length > 0){
            result = result.concat(tmpitems)
            page++
        } else {
            going = false
        }
    }
    return result
}

export const api = {
    async searchUsers(search){
        const url = `https://api.github.com/search/users?q=${search}`
        const response = await fetch(url)
        return await response.json()
    },
    async listRepositories(username){
        const url = `https://api.github.com/users/${username}/repos`
        const data = await fetch(url)
        return data
    },
    async filesList (owner, reponame) {
        const url = `https://api.github.com/repos/${owner}/${reponame}/contents/`;
        const response = await fetch(url);
        return await response.json();
    },
    async folderList(owner, repo, path) {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const response = await fetch(url);
        return await response.json();
    },
    async listIssues(owner, name, page) {
        const url = `https://api.github.com/repos/${owner}/${name}/issues?page=${page}`
        const response = await fetch(url)
        return await response.json()
    },
}
