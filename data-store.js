const { MongoClient, ObjectId } = require('mongodb')

class DataStore {
    constructor(dbUrl, dbName, collName) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.collName = collName;
        this.dbClient = null;
      }

    
}