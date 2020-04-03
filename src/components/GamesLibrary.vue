<template>
  <div class="hello">
    <div class="container">
      <header class="header">
        <div class="row row--center-v">
          <div class="column column--wrap">
            <div class="logo row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <img src="@/assets/google-stadia-logo.png" class="logo__image">
              </div>
              <div class="column column--wrap column--small-gutter">
                <span class="logo__text">OSGDb</span>
              </div>
            </div>
          </div>
          <div class="column"></div>
          <div class="column column--wrap">
            <div class="row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <button @click="showFilter = !showFilter" class="filter-toggle">Sorting</button>
              </div>
              <div class="column column--wrap column--small-gutter">
                <button @click="showFilter = !showFilter" class="filter-toggle">Filter</button>
              </div>
              <div class="column column--wrap column--small-gutter">
                <input type="search" v-model="filter" class="filter form-input" placeholder="Type to filter">
              </div>
            </div>
          </div>
        </div>
        <VueSlideToggle :open="showFilter">
          <div class="filter-options">
            <div class="genres">
              <strong class="filter-options__title">Genres</strong>
              <div class="row row--small-gutter">
                <div class="column filter-genre" v-for="genre in genres" :key="genre">
                  <label class="checkbox">
                    <input v-model="selectedGenres" :value="genre" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ genre }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players">
              <strong class="filter-options__title">Players</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="player in players" :key="player">
                  <label class="checkbox">
                    <input v-model="selectedPlayers" :value="player" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ player }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </VueSlideToggle>
      </header>
      <div class="games-wrapper">
        <div class="row">
          <div class="column column--small game" v-for="game in orderedGames" :key="game.name">
            <div class="card">
              <header class="card__header">
                <div class="game-image">
                  <img :src="game.image" class="game-image__image">
                  <div class="rating" v-if="game.rating && !isNaN(game.rating)" alt="Rating" title="Rating">
                    <img src="@/assets/smile.svg" class="rating__icon">
                    <span class="rating__text">
                      {{ game.rating || 'n/a' }}
                    </span>
                  </div>
                </div>
              </header>
              <section class="card__body">
                <span class="game__name">{{ game.name }}</span>
              </section>
              <footer class="card__footer">
                <div class="row row--center-v">
                  <div class="column">
                    <span class="release-date">{{ game.formatRelease }}</span>
                  </div>
                  <div class="column column--wrap">
                    <a :href="game.store_link" target="_blank"><img src="@/assets/shopping-bag.svg"></a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { VueSlideToggle } from 'vue-slide-toggle';


export default {
  name: 'GamesLibrary',
  props: {
    msg: String,
  },
  components: {
    VueSlideToggle,
  },
  data() {
    return {
      games: [],
      genres: [],
      players: [],
      selectedGenres: [],
      selectedPlayers: [],
      filter: '',
      showFilter: false,
    };
  },
  mounted() {
    axios.get('https://raw.githubusercontent.com/ja1984/osgdb/master/data/games.json').then((response) => {
      response.data.games.forEach((game) => {
        this.games.push(game);
      });
    });
  },
  computed: {
    filteredGames() {
      let games = this.games.concat();
      games = games
        .filter((x) => x.name.toLowerCase().includes(this.filter.toLowerCase()));

      if (this.selectedGenres.length > 0) {
        games = games
          .filter((x) => this.selectedGenres.some((z) => x.genres.includes(z)));
      }

      if (this.selectedPlayers.length > 0) {
        games = games
          .filter((x) => this.selectedPlayers.some((z) => x.players.includes(z)));
      }

      return games;
    },
    orderedGames() {
      const games = this.filteredGames.concat();
      games.sort((a, b) => b.released - a.released);
      return games;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.container {
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;
}


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.game-image {
  position: relative;
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0, .7);
  border-radius: 40px;
  padding: 3px 6px;
  color: #fff;
  display: flex;
}

.rating__icon {
  height: 18px;
  display: inline-block;
  vertical-align: sub;
  margin-right: 3px;
}

.rating__text {
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.game-image__image {
  display: block;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
}

.card__body {
  flex: 1;
}


.filter {
  width: 100%;

  @media(min-width: 1200px) {
    width: 400px;
  }
}

.game__name {
  font-weight: 600;
  font-size: 17px;
}

.filter-genre, .filter-player {
  flex: 0 1 20%;
  padding: 5px;
}


.logo__image {
  height: 50px;
  display: inline-block;

  @media(min-width: 1025px) {
    height: 100px;
  }
}

.logo__text {
  color: #2c3e50;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 40px;

  @media(min-width: 1025px) {
    font-size: 60px;
  }
}


.release-date {
  color: #aaa;
}

.fade-enter-active {
  transition: opacity .3s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.filter-options__title {
  display: block;
  margin: 10px 0;
}

.game {
  flex: 0 1 100%;

  @media(min-width: 768px) {
    flex: 0 1 50%;
  }

  @media(min-width: 1200px) {
    flex: 0 1 100%/3;
  }
}

.header .row {
  display: block;

  @media(min-width: 1024px) {
    display: flex;
  }
}

.header .logo {
  display: flex;
}
</style>
