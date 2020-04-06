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
          <div class="column">
            <div class="row row--center-v row--small-gutter row--center-h always-flex">
              <div class="column column--wrap column--small-gutter">
                <button @click="showSort = !showSort" class="filter-toggle">Sorting</button>
              </div>
              <div class="column column--wrap column--small-gutter">
                <button @click="showFilter = !showFilter" class="filter-toggle">Filter</button>
              </div>
            </div>
          </div>
          <div class="column column--wrap">
            <div class="row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <input type="search" v-model="filter" class="filter form-input" placeholder="Type to filter">
              </div>
            </div>
          </div>
        </div>
        <VueSlideToggle :open="showFilter">
          <div class="filter-options">
            <div class="rating genres">
              <strong class="filter-options__title">Rating {{ (rating === 0 || rating === '0') ? '' : `> ${rating}` }}</strong>
              <div class="row row--small-gutter">
                  <input type="range" min="0" max="100" v-model="rating" class="form-input form-input--fill">
              </div>
            </div>
            <div class="genres">
              <strong class="filter-options__title">Genres</strong>
              <div class="row row--small-gutter">
                <div class="column filter-genre" v-for="genre in sortedGenres" :key="genre">
                  <label class="checkbox">
                    <input v-model="selectedGenres" :value="genre" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ genre }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Game modes</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="mode in sortedGameModes" :key="mode">
                  <label class="checkbox">
                    <input v-model="selectedGameModes" :value="mode" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ mode }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Available in</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="country in sortedCountries" :key="country">
                  <label class="checkbox">
                    <input v-model="selectedCountries" :value="country" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ country }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Game language</strong>
              <div class="row row--small-gutter">
                <div class="column filter-player" v-for="language in sortedLanguages" :key="language">
                  <label class="checkbox">
                    <input v-model="selectedLanguages" :value="language" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ language }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </VueSlideToggle>
        <VueSlideToggle :open="showSort">
          <div class="filter-options">
            <div class="genres">
              <strong class="filter-options__title">Sort on</strong>
              <div class="row row--small-gutter">
                <div class="column filter-genre" v-for="option in sortOptions" :key="option">
                  <label class="radio">
                    <input v-model="selectedSortOption" name="sortoption" :value="option" type="radio" >
                    <div class="radio-box" /> <span class="radio__label">{{ option }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="genres">
                            <strong class="filter-options__title">Sort order</strong>
              <div class="row row--small-gutter">
                <div class="column filter-genre" v-for="option in sortOrderOptions" :key="option">
                  <label class="radio">
                    <input v-model="selectedSortOrder" name="sortorderoption" :value="option" type="radio" class="form-input">
                    <div class="radio-box" /> <span class="radio__label">{{ option }}</span>
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
          <game-list-item :game="game" @select="selectGame" :game-modes="sortedGameModes"></game-list-item>
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
      rating: 0,
      filter: '',
      showFilter: false,
      showSort: false,
      selectedGame: null,
      selectedSortOrder: 'desc',
      sortOrderOptions: ['asc', 'desc'],
      sortOptions: ['release', 'name', 'rating'],
      selectedSortOption: 'release',
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

      if (this.rating > 0) {
        games = games
          .filter((x) => (x.rating || 0) >= this.rating);
      }

      if (this.selectedLanguages.length > 0) {
        games = games
          .filter((x) => this.selectedLanguages.some((z) => x.languages.includes(z)));
      }

      if (this.selectedCountries.length > 0) {
        games = games
          .filter((x) => this.selectedCountries.some((z) => x.countries.includes(z)));
      }

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
      games.sort((a, b) => {
        const valA = this.selectedSortOrder === 'asc' ? a : b;
        const valB = this.selectedSortOrder === 'asc' ? b : a;

        if (this.selectedSortOption === 'name') {
          return valA.name.localeCompare(valB.name);
        }

        if (this.selectedSortOption === 'rating') {
          return valA.rating - valB.rating;
        }

        return valA.released - valB.released;
      });
      return games;
    },
    sortedLanguages() {
      return this.languages.concat()
        .sort((a, b) => a.localeCompare(b));
    },
    sortedCountries() {
      return this.countries.concat()
        .sort((a, b) => a.localeCompare(b));
    },
    sortedGameModes() {
      return this.game_modes.concat()
        .sort((a, b) => a.localeCompare(b));
    },
    sortedGenres() {
      return this.genres.concat()
        .sort((a, b) => a.localeCompare(b));
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

.header .row.always-flex {
  display: flex;
}
</style>
