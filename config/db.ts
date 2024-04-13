let LOCAL = false; // true means i want to run app against local db, false means use remote db

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost";
}
else{
    // for mongoDB connection string add the name of the db after .net/ .... also update pw
    URI = "mongodb+srv://broddent:Broddent94@project0.vqeflvz.mongodb.net/harmonyhub?retryWrites=true&w=majority&appName=Project0";
    HostName = "MongoDB Atlas";
}

export {URI, HostName};

export const SessionSecret = "INFT2202SESSIONSecret";
