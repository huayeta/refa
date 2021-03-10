const mongoose = require('mongoose');

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
        return
    }

    return mongoose.connect('mongodb://localhost:27017/pig?compressors=zlib&gssapiServiceName=mongodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
}
module.exports = dbConnect;