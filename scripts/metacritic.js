const fs = require('fs');
const fileName = __dirname + '/../data/games.json';
const file = require(fileName);
const metacritic = require('metacritic');


function getMissingRatingsTitles() {
    return file.games.filter((game) => game.rating === -1);
}

function getGameRating(game) {
    return new Promise((res) => {
        getMetacriticData(game.name)
            .then((metacriticData) => {
                const rating = metacriticData.metascore;
                if (rating === 'tbd') {
                    console.log(`${game.name}: tbd, retry later!`);
                    return res();
                }
                console.log(`${game.name}: ${rating}`);
                game.rating = +rating;
                return res();
            })
            .catch((err) => {
                console.error(`${game.name}: (error) ${err}`);
                return res(err);
            });
    });
}

function getMetacriticData(title) {
    return new Promise((res, rej) => {
        const searchInput = title.replace(/[^a-zA-Z\d\s:]/g, ' ');
        metacritic.Search({ category: 'game', text: searchInput },
            function (err, results) {
                if (err) {
                    return rej(err);
                }
                const stadiagame = results.filter((result) => result.link.indexOf('\/stadia\/') >= 0);
                if (stadiagame.length === 0) {
                    return rej('Stadia game not found');
                }
                return res(stadiagame[0]);
            });
    })
}

function fillMissingRatings() {
    return new Promise((res, rej) => {
        const missingRatingsTitles = getMissingRatingsTitles();
        const getMissingRatings = missingRatingsTitles.map((game) => getGameRating(game));
        return Promise.all(getMissingRatings)
            .then(() => res())
            .catch((err) => rej(err));
    });
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