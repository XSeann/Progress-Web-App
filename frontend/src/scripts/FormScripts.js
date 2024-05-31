

export async function getData(link) {
    if (typeof link !== 'string') {
        return "Not a String Link!"
    }

    const responseGet = await fetch(link)

    const responsePostJson = await responseGet.json()

    return responsePostJson
} 

export async function postData(link, obj) {

    if (typeof link !== 'string') {
        return "Not a String Link!"
    }
    
    const responsePost = await fetch(link, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(obj)
    })

    const responsePostJson = await responsePost.json()

    return responsePostJson
}

export async function patchData(link, obj) {

    if (typeof link !== 'string') {
        return "Not a String Link!"
    }
    
    const responsePost = await fetch(link, {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(obj)
    })

    const responsePostJson = await responsePost.json()

    if (responsePost.ok) {
        return responsePostJson
    }

    if (!responsePost.ok) {
        return responsePostJson.error
    }
}

export async function deleteData(link) {

    if (typeof link !== 'string') {
        return "Not a String Link!"
    }
    
    const responsePost = await fetch(link, {
        method: 'DELETE',
    })

    const responsePostJson = await responsePost.json()

    if (responsePost.ok) {
        return responsePostJson
    }

    if (!responsePost.ok) {
        return responsePostJson.error
    }
}