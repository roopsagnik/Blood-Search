
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL and database name
const url = 'mongodb+srv://roopsagnik:hMdaUB4BxS6AH8vN@cluster0.43hqsmj.mongodb.net/'; // Update with your MongoDB connection URL
const dbName = 'roopsagnik'; // Update with your database name

// Function to connect to MongoDB and perform the query
async function queryBloodBankByBloodGroup(bloodGroupType) {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // Collection Name (assuming it's named 'blood_bank')
    const collection = db.collection('blood_bank');

    // Query hospitals with the specified blood group available
    const query = { Availability: bloodGroupType }; // Assuming 'Availability' corresponds to blood group type
    const projection = { 'Blood-Bank': 1, _id: 0 }; // Projection to include only 'Blood-Bank' field

    const result = await collection.find(query, projection).toArray();

    // Print the hospital names
    console.log(`Hospitals with blood group ${bloodGroupType} available:`);
    result.forEach(doc => console.log(doc['Blood-Bank']));

    // Close connection
    client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

// Call the function to query hospitals with a specific blood group available
queryBloodBankByBloodGroup('A+'); // Replace 'A+' with the blood group type you want to query





//---------------------------------------------------------------------------------------------------------//




