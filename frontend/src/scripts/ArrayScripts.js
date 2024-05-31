/**
 * Returns Boolean Values
 * Returns String Values
 * Returns Number Values
 * Returns Array
 * Returns Combination of above
 * Goes through deeply nested arrays both vertically and horizontally
 */

export function arrayEmpty(array, str) {

    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return "Array is Empty"
    }

    const temporaryArray = []
    for (const key in array) {
        if (!array[key].toString().split("").filter(e => e!==" ").length) {
            temporaryArray.push(str)
        }
        else {
            temporaryArray.push('')
        }
    }

    if (temporaryArray.length) {
        return temporaryArray
    }
    if (!temporaryArray.length) {
        return "No Empty"
    }
}

export function arrayEmptyOne(array) {

    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return false
    }

    let LoopMes = ''

    function loop(arr) {
        
        for (const key in arr) {
            if (arr[key].toString().split("").filter(e => e!==" ").length) {
                LoopMes = 'EMPTY'
            }
            if (Array.isArray(arr[key])) {
                loop(arr[key])
            }
        }
    }

    for (const key in array) {
        loop(array[key])
    }

    if (LoopMes.length) {
        return true
    }
    if (!LoopMes.length) {
        return false
    }
}

export function multiDimensionArrayEmptyStr(array) {

    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return "Array is Empty"
    }

    const temporaryArray = []

    function recurr(arr, keys) {
        const position = keys

        for (const key in arr) {
            if (Array.isArray(arr[key])) {
                recurr(arr[key], position + `[${key}]`)
            }
            if (typeof arr[key] === 'string' && !arr[key].split('').filter(e => e!==' ').length) {
                temporaryArray.push(position + `[${key}]`)
            }
        }     
    }

    recurr(array, '')

    return temporaryArray
}

export function arrayItemReset(array) {
    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return "Array is Empty"
    }

    const temporaryArray = []

    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            temporaryArray.push(array[i])
        }
        if (!Array.isArray(array[i]) && typeof array[i] === 'object') {
            temporaryArray.push(array[i])
        }
        if (typeof array[i] === 'function') {
            temporaryArray.push(array[i])
        }
        if (typeof array[i] === 'string') {
            temporaryArray.push("")
        }
        if (typeof array[i] === 'number') {
            temporaryArray.push(0)
        }
        if (typeof array[i] === 'boolean') {
            temporaryArray.push(false)
        }
    }

    return temporaryArray
}

export function arrayItemChange(array, pos, val) {
    if (!Array.isArray(array)) {
        return []
    }

    if (!array.length) {
        return []
    }

    if (array.length < pos + 1) {
        return array
    }

    const temporaryArray = Array.from(array)

    temporaryArray[pos] = val

    return temporaryArray
}

export function arrayItemAdd(array, obj) {
    if (!Array.isArray(array)) {
        return []
    }

    const temporaryArray = Array.from(array)

    temporaryArray.push(obj)

    return temporaryArray
}

export function arrayItemDelete(array, pos) {
    if (!Array.isArray(array)) {
        return []
    }

    if (!array.length) {
        return []
    }

    const temporaryArray = Array.from(array)

    temporaryArray.splice(pos, 1)

    return temporaryArray
}

// WORK IN PROGRESS⚠️!!!

export function arrayEmpty2(array) {
    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return "Array is Empty"
    }

    const temporaryArray = []
    const remvEmptyArray = []
    
    for (const key in array) {
        if (Array.isArray(array[key]) && !array[key].length) {
            remvEmptyArray.push(array[key])
        }
        if (Array.isArray(array[key]) && array[key].length && remvEmptyArray.length) {
            temporaryArray.push(array[key])
        }
        if (Array.isArray(array[key]) && array[key].length && !remvEmptyArray.length) {
            for (const keys in array[key]) {
                if (Array.isArray(array[key][keys])) {
                    temporaryArray.push(array[key][keys])       
                }
            }
        }
    }

    if (temporaryArray.length) {
        return temporaryArray
    }
    if (!temporaryArray.length) {
        return "No Empty"
    }
}

export function arrayItemReset2(array) {
    if (!Array.isArray(array)) {
        return "Not An Array!"
    }

    if (!array.length) {
        return "Array is Empty"
    }

    const temporaryArray = []

    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            for (let j = 0; j < array[i].length; j++) {
                
            }
        }
        temporaryArray.push("")
    }

    return temporaryArray
}

export function arrayMake(obj) {
    const temporaryArray = []

    for (const key in obj) {
        
    }

    return temporaryArray
}

export function arrayMatchValue(arr, str) {

    for (const key in arr) {
        if (str === arr[key]) {
            return true
        }
    }
}

// TESTING📌🛠️

export function arrayTest(array) {
    const arr = []

    function recurr(tst, tst2) {
        for (let i = 0; i < tst.length; i++) {
            arr[tst2].push(i)
            recurr(tst[i], tst2)
        }
    }

    for (let i = 0; i < array.length; i++) {
        arr.push([])
        recurr(array[i], i)
    }

    return arr
}