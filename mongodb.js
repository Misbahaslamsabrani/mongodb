const {MongoClient, ObjectId} = require("mongodb");
/* const MongoClient = mongodb.MongoClient; */
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "myDB";
const newID = ObjectId();
console.log(newID);
console.log(newID.getTimestamp())

MongoClient.connect(connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("error conncting database")
        }
        const db = client.db(databaseName);
        //deleteMany
            db.collection("profile").deleteMany({
                name: "daniyal"
            }).then(result => console.log(result)).catch(error => console.log(error))

        //deleteOne
        db.collection("profile").deleteOne({
                email: "aamir@gmail.com"
            }).then(result => console.log(result)).catch(error => console.log(error))

        //updateMany
        db.collection("profile").updateMany({
            email:"misbah@gmail.com"
        }, {
            $set: {
                occupation: "TA"
            }
        })

        //updateONe
        db.collection("profile").updateOne({
            email: "misbah@gmail.com"
        }, {
            $inc: {age: 22}
        }).then(result => console.log(result)).catch(error => console.log(error))

        db.collection("profile").updateOne({
            email:"misbah@gmail.com"
        }, 
        {
            $set:{
                name: "Misbah Aslam Sabrani"
            }
        }).then(result => console.log(result)).catch(error => console.log(error))

        //find
        db.collection("profile").find({ email: "misbah@gmail.com"}).toArray((error, dataArray) => {
            if(error){
                console.log("unable to fetch")
            }
            if(dataArray.length !== 0){
                console.log(dataArray);
            }
            else{
                console.log("no matching user")
            }
        })
        
        //findOne

        db.collection("profile").findOne({
            email:'misbah@gmail.com'
        }, (error, response) => {
            if(error){
                return console.log("can't fetch");
            }
            if(response){
                console.log(response)
            }
            else{
                console.log("no user found!")
            }
        })

        //insertMany
        db.collection("profile").insertMany([{
            name: "misbah",
            email: "misbah@gmail.com"
        },
        {
            name: "aamir",
            email: "aamir@gmail.com"
        },
        {
            name: "daniyal",
            emial: "daniyal@gmail.com"
        }
        ], (error, response) => {
            if(error){
                console.log("error inserting document!")
            }
            console.log(response.ops)
        })

        //insertOne
        db.collection("profile").insertOne(
        {
            _id: newID,
            name: "daniyal",
            emial: "daniyal@gmail.com"
        }
        , (error, response) => {
            if(error){
                console.log("error inserting document!")
            }
            console.log(response.ops)
        })
        console.log("DB connected successfully")
        client.close()
    })