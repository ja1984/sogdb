<template>
  <div class="hello">
    <div class="container">
      <header class="header">
        <div class="row row--center-v">
          <div class="column column--wrap">
            <div class="logo row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <span class="logo__text"><img src="@/assets/google-stadia-logo.png" class="logo__image">OGDb</span>
                <div class="logo__sub-title">Stadia Open Games Database</div>
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
              <strong class="filter-options__title">Game modes</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="mode in game_modes" :key="mode">
                  <label class="checkbox">
                    <input v-model="selectedGameModes" :value="mode" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ mode }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players">
              <strong class="filter-options__title">Available in</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="country in countries" :key="country">
                  <label class="checkbox">
                    <input v-model="selectedCountries" :value="country" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ country }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players">
              <strong class="filter-options__title">Game languages</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="language in languages" :key="language">
                  <label class="checkbox">
                    <input v-model="selectedLanguages" :value="language" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ language }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </VueSlideToggle>
      </header>
      <div class="games-wrapper">
        <transition-group name="fade" tag="div">
        <div class="column column--small game" v-for="game in orderedGames" :key="game.name">
          <game-list-item :game="game" @select="selectGame" :game-modes="game_modes"></game-list-item>
        </div>
      </transition-group>
      </div>
    </div>
        <game-details v-if="selectedGame" :game="selectedGame" @close="selectedGame = null"></game-details>
  </div>
</template>

<script>
import axios from 'axios';
import { VueSlideToggle } from 'vue-slide-toggle';
import { parseISO } from 'date-fns';
import GameListItem from '@/components/GameListItem.vue';
import GameDetails from '@/components/GameDetails.vue';


export default {
  name: 'GamesLibrary',
  props: {
    msg: String,
  },
  components: {
    VueSlideToggle,
    GameListItem,
    GameDetails,
  },
  data() {
    return {
      games: [],
      genres: [],
      game_modes: [],
      countries: [],
      languages: [],
      selectedGenres: [],
      selectedGameModes: [],
      selectedCountries: [],
      selectedLanguages: [],
      filter: '',
      showFilter: false,
      selectedGame: null,
    };
  },
  mounted() {
    axios.get('https://raw.githubusercontent.com/ja1984/osgdb/master/data/games.json').then((response) => {
      response.data.games.forEach((game) => {
        game.genres.forEach((genre) => {
          if (!this.genres.includes(genre)) {
            this.genres.push(genre);
          }
        });

        game.game_modes.forEach((mode) => {
          if (!this.game_modes.includes(mode)) {
            this.game_modes.push(mode);
          }
        });

        game.countries.forEach((country) => {
          if (!this.countries.includes(country)) {
            this.countries.push(country);
          }
        });

        game.languages.forEach((language) => {
          if (!this.languages.includes(language)) {
            this.languages.push(language);
          }
        });

        game.released = parseISO(game.released); //eslint-disable-line

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

      if (this.selectedGameModes.length > 0) {
        games = games
          .filter((x) => this.selectedGameModes.some((z) => x.game_modes.includes(z)));
      }

      return games;
    },
    orderedGames() {
      const games = this.filteredGames.concat();
      games.sort((a, b) => b.released - a.released);
      return games;
    },
  },
  methods: {
    selectGame(game) {
      this.selectedGame = game;
    },
  },
  watch: {
    selectedGame(game) {
      if (game) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
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


.filter {
  width: 100%;
  padding: 10px 8px;

  @media(min-width: 1200px) {
    width: 400px;
  }
}


.filter-genre, .filter-player {
  flex: 0 1 20%;
  padding: 5px;
}


.logo__image {
  height: 30px;
  display: inline-block;

  @media(min-width: 1025px) {
    height: 45px;
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

.logo__sub-title {
  font-size: 13px;
  margin-top: -10px;
  font-weight: 800;
  text-align: center;
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

.header .row {
  display: block;

  @media(min-width: 1024px) {
    display: flex;
  }
}

.header .logo {
  display: flex;
}

.game {
  flex: 0 1 100%;

  @media (min-width: 768px) {
    flex: 0 1 50%;
  }

  @media (min-width: 1200px) {
    flex: 0 1 100%/3;
  }
}

.games-wrapper > div {
  display: flex;
  flex-wrap: wrap;
}
</style>
