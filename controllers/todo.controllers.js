const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()


module.exports.getTodos = async (req, res) => {
    try {
        let { data, status } = await axios.get(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?page-size=20',
            {
                headers: {
                    accept: 'application/json',
                    'X-Cassandra-Token': process.env.CASSANDRA_TOKEN
                }
            }
        )
        console.log(status)
        // data.sort(([a, b]) => a.createdAt < b.createdAt)
        data = {data:sortObject(data.data, "createdAt")}
        // console.log(sortObject(data, "createdAt"))
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}



module.exports.getCompletedTodos = async (req, res) => {
    try {
        let { data, status } = await axios.get(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?where=%7B%22completed%22%3A%7B%22%24eq%22%3Atrue%7D%7D&page-size=20',
            {
                headers: {
                    accept: 'application/json',
                    'X-Cassandra-Token': process.env.CASSANDRA_TOKEN
                },
            }
        )
        console.log(status)
        data = {data:sortObject(data.data, "createdAt")}
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}

module.exports.getNonCompletedTodos = async (req, res) => {
    try {
        let { data, status } = await axios.get(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list?where=%7B%22completed%22%3A%7B%22%24eq%22%3Afalse%7D%7D&page-size=20',
            {
                headers: {
                    accept: 'application/json',
                    'X-Cassandra-Token': process.env.CASSANDRA_TOKEN
                },
            }
        )
        console.log(status)
        data = {data:sortObject(data.data, "createdAt")}
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}

module.exports.createTodo = async (req, res) => {
    const { body } = req
    if (!body.content) return res.json({ message: 'Please enter a text for your todo' })
    try {
        const { data, status } = await axios.post(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list',
            {
                ...req.body,
                createdAt: Date.now(),
                completed: false,
            },
            {
                headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
            }
        )
        console.log(status)
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}

module.exports.updateTodo = async (req, res) => {
    const { body } = req
    if (!body.content) return res.json({ message: 'Please enter info for your todo' })
    try {
        const { data, status } = await axios.patch(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list/' + req.params.id,
            {
                ...req.body
            },
            {
                headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
            }
        )
        console.log(status)
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}

module.exports.deleteTodo = async (req, res) => {
    if (!req.params.id) return res.json({ message: 'Please provide an id to delete.' })

    try {
        const { data, status } = await axios.delete(
            'https://cefb09fe-9970-4f0c-bfb5-8c8d865bf50c-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/todos/collections/list/' +
            req.params.id,
            {
                headers: { accept: 'application/json', 'X-Cassandra-Token': process.env.CASSANDRA_TOKEN },
            }
        )
        console.log(status)
        res.json(data)
    } catch (error) {
        res.json({ message: 'Error', data: error })
    }
}

function sortObject(data, attr) {
    let arr = [];
    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            let obj = {};
            obj[prop] = data[prop];
            obj.tempSortName = data[prop][attr];
            arr.push(obj);
        }
    }

    arr.sort(function(a, b) {
        let at = a.tempSortName,
            bt = b.tempSortName;
        return at < bt ? 1 : ( at > bt ? -1 : 0 );
    });

    let result = [];

    for (let i=0, l=arr.length; i<l; i++) {
        let obj = arr[i];
        delete obj.tempSortName;
        let id
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                id = prop;
            }
        }
        let item = obj[id];
        result.push(item);
    }
    return result;
}

