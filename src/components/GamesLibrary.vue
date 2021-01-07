<template>
  <div class="games-library">
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
              <div class="column column--wrap column--small-gutter">
                <div @click="useDarkTheme = !useDarkTheme" class="select-theme">
                  <template v-if="useDarkTheme">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun select-theme__icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  </template>
                  <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon select-theme__icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VueSlideToggle :open="showFilter">
          <div class="filter-options">
            <h2 class="text-center">Showing {{ filteredGames.length }} games of {{ games.length }}</h2>
            <div class="rating genres">
              <strong class="filter-options__title">Rating {{ (rating === 0 || rating === '0') ? '' : `>= ${rating}` }}</strong>
              <div class="row row--small-gutter">
                  <input type="range" min="0" max="100" v-model="rating" class="form-input form-input--fill">
              </div>
            </div>
            <div class="resolutions genres">
              <strong class="filter-options__title">Resolution</strong>
              <div class="row row--small-gutter">
                <div class="column filter-genre" v-for="resolution in sortedResolutions" :key="resolution">
                  <label class="checkbox">
                    <input v-model="selectedResolutions" :value="resolution" type="checkbox" class="form-input">
                    <div class="checkbox-box" /> <span class="checkbox__label">{{ resolution }}</span>
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
      <div class="loader" v-if="loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin feather--large"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        </div>
      <div class="games-wrapper" v-else>
        <transition-group name="fade" tag="div">
        <div class="column column--small game" v-for="game in orderedGames" :key="game.name">
          <game-list-item :game="game" @select="selectGame" :game-modes="sortedGameModes" :is-pro-deal="proGames.includes(game.slug)"></game-list-item>
        </div>
      </transition-group>
      </div>
    </div>
    <game-details v-if="selectedGame" :game="selectedGame" @close="selectedGame = null"></game-details>
  </div>
</template>

<script>
import axios from 'axios';
import querystring from 'query-string';
import { VueSlideToggle } from 'vue-slide-toggle';
import { parseISO, format } from 'date-fns';
import GameListItem from '@/components/GameListItem.vue';
import GameDetails from '@/components/GameDetails.vue';


export default {
  name: 'GamesLibrary',
  components: {
    VueSlideToggle,
    GameListItem,
    GameDetails,
  },
  data() {
    return {
      loading: true,
      games: [],
      genres: [],
      game_modes: [],
      countries: [],
      languages: [],
      resolutions: [],
      selectedGenres: [],
      selectedGameModes: [],
      selectedCountries: [],
      selectedLanguages: [],
      selectedResolutions: [],
      pro_games: [],
      rating: 0,
      filter: '',
      showFilter: false,
      showSort: false,
      selectedGame: null,
      selectedSortOrder: 'desc',
      sortOrderOptions: ['asc', 'desc'],
      sortOptions: ['release', 'name', 'rating'],
      selectedSortOption: 'release',
      useDarkTheme: false,
    };
  },
  mounted() {
    this.getFilters();
    if (document.body.classList.contains('dark-theme')) {
      this.useDarkTheme = true;
    }
    axios.get('https://raw.githubusercontent.com/ja1984/osgdb/master/data/games.json').then((response) => {
      this.loading = false;
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

        if (!this.resolutions.includes(game.resolution)) {
          this.resolutions.push(game.resolution);
        }

        game.countries.forEach((country) => {
          if (!this.countries.includes(country)) {
            this.countries.push(country);
          }
        });

        game.languages.forEach((language) => {
          const gameLanguage = language.split(' (')[0];
          if (!this.languages.includes(gameLanguage)) {
            this.languages.push(gameLanguage);
          }
        });

        game.released = parseISO(game.released); //eslint-disable-line

        this.games.push(game);
      });
      this.pro_games = response.data.pro_games;
    });
  },
  computed: {
    completeFilter() {
      const filters = {};
      if (this.selectedGenres.length > 0) {
        filters.genres = this.selectedGenres.join(',');
      }

      if (this.selectedGameModes.length > 0) {
        filters.game_modes = this.selectedGameModes.join(',');
      }

      if (this.rating > 0) {
        filters.rating = this.rating;
      }

      return filters;
    },
    proGames() {
      const month = format(new Date(), 'MM-yyyy');
      const proPeriod = this.pro_games.find((x) => x.month === month);
      if (!proPeriod) return [];
      return proPeriod.games;
    },
    filteredGames() {
      let games = this.games.concat();
      games = games
        .filter((x) => x.name.toLowerCase().includes(this.filter.toLowerCase()));

      if (this.rating > 0) {
        games = games
          .filter((x) => (x.rating || 0) >= this.rating);
      }

      if (this.selectedResolutions.length > 0) {
        games = games
          .filter((x) => this.selectedResolutions.includes(x.resolution));
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
    sortedResolutions() {
      return this.resolutions.concat()
        .sort((a, b) => a.localeCompare(b));
    },
  },
  methods: {
    getFilters() {
      const query = querystring.parse(window.location.search);
      if (typeof query.game_modes !== 'undefined') {
        this.selectedGameModes.push(...query.game_modes.split(','));
      }
      if (typeof query.genres !== 'undefined') {
        this.selectedGenres.push(...query.genres.split(','));
      }
      if (typeof query.rating !== 'undefined') {
        this.rating = query.rating;
      }
    },
    selectGame(game) {
      this.selectedGame = game;
    },
  },
  watch: {
    completeFilter(newVal) {
      console.log(newVal);
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${querystring.stringify(newVal)}`;
      window.history.pushState({ path: newurl }, '', newurl);
    },
    useDarkTheme(useDarkTheme) {
      if (useDarkTheme) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('dark-theme', true);
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.removeItem('dark-theme');
      }
    },
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

body.dark-theme {
  .logo__text {
    color: #eee;
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
.select-theme {
  cursor: pointer;
  opacity: .5;
  transition: all ease .3s;

  &:hover {
    opacity: 1;
  }

  @media(max-width: 1023px) {
    position: absolute;
    top: 25px;
    right: 25px;
  }
}
.select-theme__icon {
  display: block;
}

.games-library {
  flex: 1;
}

.loader {
  padding: 25px 0;
  text-align: center;
}

.spin {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(359deg);
  }
}

</style>
