

function objectMap(obj) {
    const temporaryArray = []
    for (const key in obj) {
        temporaryArray.push(`${key.toUpperCase()} : ${obj[key]}`)
    }

    return(
    <>
        {temporaryArray.length && temporaryArray.map((e, pos) => <span key={pos}>{e}</span>)}
    </>)
}