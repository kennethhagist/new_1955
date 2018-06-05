const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const modelsPath = path.resolve('server', 'models');
const reg = new RegExp("\\.js$", "i");
const dbURI = 'mongodb://localhost/1955-api';

mongoose.connect(dbURI);

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ${ dbURI }');
});

mongoose.connection.on('error', err => {
    console.error('Mongoose default connection error: ${ err }');

    process.exit(0);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through program termination');
        process.exit(0);
    });
});

fs.readdirSync(modelsPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelsPath, file));
    }
});