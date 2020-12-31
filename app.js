var fs = require('fs');

var dataObject = {
    "a": 1,
    "b": 2
};

function createDbFile() {
    let initialized = fs.readdirSync('./').includes('mydb.txt')
    if (!initialized) {
        fs.appendFile('mydb.txt', '{}', function(err) {
            if (err) throw err;
            console.log('DB File Created');
        });
    } else {
        console.log('File already exists');
    }
}

function readFromFile() {
    return JSON.parse(fs.readFileSync('./mydb.txt'), { encoding: 'utf-8' });
}

function writeToFile(newObject) {
    fs.writeFileSync('./mydb.txt', JSON.stringify(newObject), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to file', newObject);
        }
    });
}

function read() {
    console.log(readFromFile());
}

function create(data) {
    createDbFile(data);
}

function update(key, value) {
    dataObject[key] = value;
    writeToFile(dataObject);
}

function destroy(key) {
    delete dataObject[key];
    writeToFile(dataObject);
}

create(dataObject)
update("c", 3)
read()
destroy("b")
read()