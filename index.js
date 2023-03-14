const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

//middleWare
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uoeaphp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        const usersCollection = client.db('DevsNestTask').collection('Users');






        app.post('/usersData', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result);

        })

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users)
        })



        app.put('/usersData/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const unique = { _id: ObjectId(id) };
            console.log(unique);
            const oldUserInfo = req.body;
            const option = { upsert: true };
            const updateUserInfo = {
                $set: {
                    name: oldUserInfo.name,
                    userName: oldUserInfo.userName,
                    email: oldUserInfo.email
                }
            }
            const result = await usersCollection.updateOne(unique, updateUserInfo, option);
            res.send(result)
        })

    }



    finally { }
}
run();



app.get('/', async (req, res) => {
    res.send('test5 server Is Running')
})

app.listen(port, () => {
    console.log(`test5 server running on port ${port}`)
})