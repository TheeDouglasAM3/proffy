import express from 'express'  

const app = express()

app.get('/users', (request, response) => {

    const users = [
        {name: 'Douglas', age: 22},
        {name: 'Edu', age: 19},
        {name: 'Cacatua', age: 20},
        {name: 'Nico', age: 17},
    ]


    return response.json(users);
})

app.listen(3333)