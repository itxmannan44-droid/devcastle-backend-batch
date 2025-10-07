db.createCollection('testCollection')

db.testCollection.insertOne({
    name:"Jhon Doe",
    age:30,
    city:"New York"
})
db.testCollection.insertMany([
    {name:"Jane Smith", age:25, city:"Los Angeles", hobbies:["reading", "traveling"]},
    {name:"Sam Brown", age:28, city:"Chicago"},
    {name:"Lucy Green", age:22, city:"Miami"}
])
