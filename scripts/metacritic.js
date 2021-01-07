const fs = require('fs');
const fileName = __dirname + '/../data/games.json';
const file = require(fileName);
const metacritic = require('metacritic');


function getMissingRatingsTitles() {
    return file.games.filter((game) => game.rating === -1);
}

function getMissingRating(game) {
    return new Promise((res) => {
        getMetacriticRating(game.name)
            .then((rating) => {
                if (rating === 'tbd') {
                    console.log(`${game.name}: tbd, retry later!`);
                    return res();
                }
                console.log(`${game.name}: ${rating}!`);
                game.rating = +rating;
                return res();
            })
            .catch((err) => {
                console.error(`${game.name}: (error) ${err}`);
                return res(err);
            });
    });
}

function fillMissingRatings() {
    return new Promise((res, rej) => {
        const missingRatingsTitles = getMissingRatingsTitles();
        const getMissingRatings = missingRatingsTitles.map((game) => getMissingRating(game));
        return Promise.all(getMissingRatings).then(() => res()).catch((err) => console.log(err));
    });
}

function getMetacriticRating(title) {
    return new Promise((res, rej) => {
        metacritic.Search({ category: 'game', text: encodeURI(title) },
            function (err, result) {
                if (err) {
                    return rej(err);
                }
                return res(result[0].metascore);
            });
    })
}

function updateLibrary() {
    console.log('Updating library...');
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log('Libray updated');
    });

}

fillMissingRatings()
    .then(() => updateLibrary())
    .catch((err) => console.error(err));