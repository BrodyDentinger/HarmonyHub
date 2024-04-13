"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSecret = exports.HostName = exports.URI = void 0;
let LOCAL = false; // true means i want to run app against local db, false means use remote db
let HostName, URI;
if (LOCAL) {
    exports.URI = URI = "mongodb://localhost/contacts";
    exports.HostName = HostName = "localhost";
}
else {
    // for mongoDB connection string add the name of the db after .net/ .... also update pw
    exports.URI = URI = "mongodb+srv://broddent:Broddent94@project0.vqeflvz.mongodb.net/harmonyhub?retryWrites=true&w=majority&appName=Project0";
    exports.HostName = HostName = "MongoDB Atlas";
}
exports.SessionSecret = "INFT2202SESSIONSecret";
