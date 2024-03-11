const MongoClient = require('mongodb').MongoClient;
const xlsx = require('xlsx');
const path = require('path');

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017'; // Update with your MongoDB connection URL
const dbName = 'your_database_name'; // Update with your database name

// Excel file path
const excelFilePath = 'path/to/your/excel/file.xlsx'; // Update with the path to your Excel file

// Name of the sheet in the Excel file
const sheetName = 'Sheet1'; // Update with the name of your sheet

// Function to insert Excel data into MongoDB
async function insertExcelDataToMongoDB() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // Read Excel file
    const workbook = xlsx.readFile(path.resolve(excelFilePath));
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Collection Name (assuming it's named 'blood_bank')
    const collection = db.collection('blood_bank');

    // Insert data into MongoDB
    await collection.insertMany(data);
    console.log('Data inserted successfully into MongoDB');

    // Close connection
    client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

// Call the function to insert data
insertExcelDataToMongoDB();
