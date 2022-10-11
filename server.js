const dotenv = require('dotenv')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/todos/all', async (req, res) => {
    const { data, status } = await axios.get(
        'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?page-size=20',
        {
            headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
        }
    )
    console.log(status)
    res.json(data)
})

app.get('/todos/completed', async (req, res) => {
    const { data, status } = await axios.get(
        'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?where=%7B%22completed%22%3A%7B%22%24eq%22%true%7D%7D&page-size=20',
        {
            headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
        }
    )
    console.log(status)
    res.json(data)
})

app.get('/todos/non-completed', async (req, res) => {
    const { data, status } = await axios.get(
        'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?where=%7B%22completed%22%3A%7B%22%24eq%22%false%7D%7D&page-size=20',
        {
            headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
        }
    )
    console.log(status)
    res.json(data)
})

app.post('/todos/new', async (req, res) => {
    const { body } = req
    if (body.content) return res.json({ message: 'Please enter a text for your todo' })
    const { data, status } = await axios.post(
        'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list',
        {
            content: body.content,
            completed: false,
        },
        {
            headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
        }
    )
    console.log(status)
    res.json(data)
})

app.delete('/todos/delete/:id', async (req, res) => {
    if (!req.params.id) return res.json({ message: 'Please provide an id to delete.' })

    const { data, status } = await axios.delete(
        'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list/' +
            req.params.id,
        {
            headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
        }
    )
    console.log(status)
    res.json(data)
})

app.listen(process.env.PORT, () => {
    console.log('app on port ' + process.env.PORT)
})
