(async () => {
    let message = ''
    for await (const currentLetter of 'Hello, World!') {
        message += currentLetter
    }
    console.log(message)
})()
