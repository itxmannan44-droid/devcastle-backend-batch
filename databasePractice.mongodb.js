db.createCollection('testCollection')

// Insert Onse Document
// db.testCollection.insertOne({
//     name: "Jhon Doe",
//     age: 30,
//     city: "New York"
// })
// Insert Multiple Documents
// db.testCollection.insertMany([
//     { name: "Jane Smith", age: 25, city: "Los Angeles", hobbies: ["reading", "traveling"] },
//     { name: "Sam Brown", age: 28, city: "Chicago" },
//     { name: "Lucy Green", age: 22, city: "Miami" }
// ])

// Find Documents
// db.testCollection.find()
// db.testCollection.findOne({ _id: ObjectId('68e6658c84a85f263a9a9fcc') })
// db.testCollection.find({ age: { $gt: 25 } })
// db.testCollection.find({ age: { $gte: 25 } })
// db.testCollection.find({ age: { $lt: 25 } })
// db.testCollection.find({ age: { $lte: 25 } })
// db.testCollection.find({ name: { $in: ["Jhon Doe",'Lucy Green'] } })
// db.testCollection.find({ age: { $ne: 25 } })

// Delete document by name
// db.testCollection.deleteOne({ name: "Sam Brown" })

// Delete document by ObjectId
// db.testCollection.deleteOne({ _id: ObjectId('68e6657c6bec35a94510a0bb') })

// Update document
db.testCollection.updateOne(
    { name: "Jhon Doe" },
    {
        $set: { age: 31, city: "Rahim Yar Khan" },
    }
)

// Update document By Id
db.testCollection.updateOne(
    { _id: ObjectId('68e6658b84a85f263a9a9fcb') },
    {
        $set: { name: "ALi", age: 31, city: "Rahim Yar Khan" },
    }
)