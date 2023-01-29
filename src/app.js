const yargs = require('yargs');
const mongoose = require('mongoose');
const { createMovie } = require('./movies/function');
const MovieCollection = require('./movies/model');
require('./db/connection');
mongoose.set('strictQuery', true);

async function app(yargsInput) {
    if (yargsInput.create) {
        //code to add a movie goes here
        const movieObject = { title: yargsInput.title, actor: yargsInput.actor, director: yargsInput.director }
        await createMovie(movieObject) //passing through movie object

    } else if (yargsInput.read) {
        //code to list all movies goes here 
        console.log("entering read");
        const results = await MovieCollection.find({});
        const newArray = []
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            const newElement = { title: element.title, actor: element.actor, director: element.director }
            newArray.push(newElement);
            // console.log(`${element.title} With ${element.actor} Directed by ${element.director}`);
        }
        console.table(newArray);

    } else if (yargsInput.updateActor) {
        //code to update actor goes here
        console.log('Entering Update')
        const myQuery = { title: yargsInput.title };
        const myUpdate = { $set: { actor: yargsInput.actor } }
        const result = await MovieCollection.updateOne(myQuery, myUpdate);
        if (result.modifiedCount === 1) {
            console.log('actor updates successfully');
        } else {
            console.log('update not successful')
        }
        // finds the title and updates the details using the objects myquery & myupdate

    } else if (yargsInput.updateDirector) {
        //code to update director goes here
        console.log('Entering Update')
        const myQuery = { title: yargsInput.title };
        const myUpdate = { $set: { director: yargsInput.director } }
        const result = await MovieCollection.updateOne(myQuery, myUpdate);
        if (result.modifiedCount === 1) {
            console.log('director updates successfully');
        } else {
            console.log('update not successful')
        }

        // finds the title and updates the details using the objects myquery & myupdate
    } else if (yargsInput.delete) {
        //code to delete a movie goes here  
        const deletedMovie = await MovieCollection.deleteOne({
            title: yargsInput.title
        })
        console.log('Delete movie count:', deletedMovie)

    } else {
        console.log("Command not recognised")
    };
    await mongoose.disconnect();
}

app(yargs.argv);