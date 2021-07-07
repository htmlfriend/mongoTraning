let client = require('mongodb').MongoClient;
const connectionString = "mongodb://localhost:27017";

(async () => {
	let connection = await client.connect(connectionString);
	let db = connection.db('userdb');
  const collection = await db.collection('users');
	try {
		// await collection.insertMany([
		// 	{name: 'yulia', age: 25},
		// 	{name: 'yura', age: 33},
		// 	{name: 'tyueusl', age: 22},
		// 	{name: 'John', age: 44},
		// 	{name:'John', age:55}
		// ]);
// 		await collection.insertMany([
// 			{name: 'Hugo', age: 'ten', accupation: 'kid'},
// 			{name: 'Kate', occupation: 'actress'}
// ])
		// let cursor = collection.find({},{projection:{name:true,age:true}}).sort({age:-1}).limit(3);
		// let cursor = collection.find({age:{$lt:46}, name:{$nin:['John', 'yulia']}});
		// let cursor = collection.find({$or:[{name:'yura'}, {age:{$lt:45}}]})
		// let cursor = collection.find({age: {$exists: true}})
		// let cursor = collection.find({age:{$type:'string'}})
		// let cursor = collection.find({age:{$type:'number'}})

		// await collection.insertMany([{
		// 	cust_id: 'a123',
		// 	amount: 500,
		// 	status: 'A'
		// },
		// 	{
		// 		cust_id: 'a124',
		// 	amount: 300,
		// 	status: 'A'
		// 	},
		// 	{
		// 		cust_id: 'b123',
		// 	amount: 400,
		// 	status: 'A'
		// 	},
		// 	{
		// 		cust_id: 'd123',
		// 	amount: 500,
		// 	status: 'd'
		// }])
// agregation with group
		// const cursor = await collection.aggregate([
		// 	{$match: {status: 'A'}}
		// 	, {$group: {_id: '$cust_id', total: {$sum: '$amount'}}}
		// ])
// out
		//  { _id: 'a123', total: 1000 },
  // { _id: 'a124', total: 600 },
  // { _id: 'b123', total: 800 }


		// agregation with map-reduce
		const cursor = await collection.mapReduce(
			function () {emit(this.cust_id, this.amount);},
			function (key, values) {return Array.sum(values);},
			{
				query: {status: 'A'},
				out: 'order_totals'
			}
				)

		const result = await cursor.toArray();
		console.log('cursor',result)

		// cursor.forEach(doc => {
		// 	console.log('doc', doc.age)
		// });
		// while (await cursor.hasNext()) {
		// 	const doc = await cursor.next();
		// 	console.log('doc', doc)
		// }
		// 	console.log('finished')
	} finally {
		connection.close()
	}
})().catch(error => {
	console.log('something went wrong', error)
})


// mongoexport --db  --collection --out c:\Users\Home\Desktop\MongoConnect
// mongoimport --db --collection --file c:\User\Home\Desktop\MongoConnect\file
// mongodump --archive=c:\Users\mongoarchive --db
// mongorestore --archive=c:\Users\mongoarchve --db


// aggregation pipeline
// SQL     MongoDb
// where => $match
// group by => $group
// having => $match
// select => $project
// order by => $sort
