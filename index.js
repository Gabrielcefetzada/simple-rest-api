
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'NodeJS' }
]

// GET INFORMATION - GET

app.get('/', (request, response) => {
   response.send('Hello world!!!') 
})

app.get('/api/courses', (request, response) => {
    response.send(courses)
})

app.get('/api/courses/:id', (request, response) => {
    let course = courses.find(c => c.id === parseInt(request.params.id))
    if(!course){
        response.status(404).send('No courses found with this id') // Not Found
        return
    } else {
        response.send(course)
    }
})

// CREATE - POST

app.post('/api/courses', (request, response) => {

    if(!request.body.name || request.body.name < 2){
        response.status(400).send('Name is required and should be minimum 3 characters') // Bad request
        return
    }

    let exists = false;
    courses.map(el => {
        if(el.name === request.body.name){
           exists = true; 
        }
    })

    if(exists){
        response.status(400).send('Course already exists.') // Bad request
        return
    }
    const course = { 
        id: courses.length + 1, 
        name: request.body.name
     }

     courses.push(course)
     response.send(course)
})

// UPDATE - PUT

app.put('/api/courses/:id', (request, response) => {
    let course = courses.find(c => c.id === parseInt(request.params.id))
        if(!course){
        response.status(404).send('No courses found with this id.') // Not Found
        return
    }

        if(!request.body.name || request.body.name < 2){
        response.status(400).send('Name is required and should be minimum 3 characters.') // Bad request
        return
    }

    let exists = false;
    courses.map(el => {
        if(el.name === request.body.name){
           exists = true; 
        }
    })

    if(exists){
        response.status(400).send('This name is already in use.') // Bad request
        return
    }

    course.name = request.body.name
    response.send(course)
})

// DELETE

app.delete('/api/courses/:id', (request, response) => {
        let course = courses.find(c => c.id === parseInt(request.params.id))
        if(!course){
            response.status(404).send('No courses found with this id.') // Not Found
            return
    }

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    response.send("Course deleted successfully.")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))