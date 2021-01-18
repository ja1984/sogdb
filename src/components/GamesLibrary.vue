<template>
  <div class="games-library">
    <div class="container">
      <header class="header">
        <div class="row row--center-v">
          <div class="column column--wrap">
            <div class="logo row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <span class="logo__text"
                  ><img
                    src="@/assets/google-stadia-logo.png"
                    class="logo__image"
                  />OGDb</span
                >
                <div class="logo__sub-title">Stadia Open Games Database</div>
              </div>
            </div>
          </div>
          <div class="column">
            <div
              class="row row--center-v row--small-gutter row--center-h always-flex"
            >
              <div class="column column--wrap column--small-gutter">
                <button @click="showSort = !showSort" class="filter-toggle">
                  Sorting
                </button>
              </div>
              <div class="column column--wrap column--small-gutter">
                <button @click="showFilter = !showFilter" class="filter-toggle">
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div class="column column--wrap">
            <div class="row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <input
                  type="search"
                  v-model="filter"
                  class="filter form-input"
                  placeholder="Type to filter"
                />
              </div>
              <div class="column column--wrap column--small-gutter">
                <div class="toolbar">
                                <div class="column column--wrap column--small-gutter">
                <div @click="useDarkTheme = !useDarkTheme" class="select-theme">
                  <template v-if="useDarkTheme">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-sun select-theme__icon"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </template>
                  <template v-else>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-moon select-theme__icon"
                    >
                      <path
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                      ></path>
                    </svg>
                  </template>
                </div>
              </div>
              <div class="column column--wrap column--small-gutter">
                <div class="select-theme" @click="showSmallCards = !showSmallCards">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="select-theme__icon"
                    v-if="!showSmallCards"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g
                        id="columns-(1)-2"
                        transform="translate(3.000000, 3.000000)"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <g id="columns-(1)">
                          <path
                            d="M9,0 L16,0 C17.1045695,0 18,0.8954305 18,2 L18,16 C18,17.1045695 17.1045695,18 16,18 L9,18"
                            id="Path"
                          ></path>
                          <path
                            d="M9,0 L2,0 C0.8954305,0 0,0.8954305 0,2 L0,16 C0,17.1045695 0.8954305,18 2,18 L9,18"
                            id="Path"
                          ></path>
                          <line x1="6" y1="0" x2="6" y2="18" id="Path"></line>
                          <line x1="12" y1="0" x2="12" y2="18" id="Path"></line>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-columns select-theme__icon"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path></svg>
                </div>
              </div>
              <div class="column column--wrap column--small-gutter">
                <div class="select-theme" @click="filterMyGames = !filterMyGames" :class="{'select-theme--active': filterMyGames}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star select-theme__icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VueSlideToggle :open="showFilter">
          <div class="filter-options">
            <h2 class="text-center">
              Showing {{ filteredGames.length }} games of {{ games.length }}
            </h2>
            <div class="rating genres">
              <div class="row row--small-gutter">
                <div class="column">
                  <label class="checkbox">
                    <input
                      v-model="filterProGames"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">Show only PRO games</span>
                  </label>
                </div>
                <div class="column">
                  <label class="checkbox">
                    <input
                      v-model="filterMyGames"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">Show only MY games</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="rating genres">
              <strong class="filter-options__title"
                >Rating
                {{
                  rating === 0 || rating === "0" ? "" : `>= ${rating}`
                }}</strong
              >
              <div class="row row--small-gutter">
                <input
                  type="range"
                  min="0"
                  max="100"
                  v-model="rating"
                  class="form-input form-input--fill"
                />
              </div>
            </div>
            <div class="resolutions genres">
              <strong class="filter-options__title">Resolution</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-genre"
                  v-for="resolution in sortedResolutions"
                  :key="resolution"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedResolutions"
                      :value="resolution"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">{{
                      resolution | makePretty
                    }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="resolutions genres">
              <strong class="filter-options__title">PEGI Rating</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-genre"
                  v-for="rating in ageRatings"
                  :key="rating"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedAgeRatings"
                      :value="rating"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label"
                      ><div class="pegi-rating" :class="rating"></div
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Game modes</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-player"
                  v-for="mode in gameModesFilterOptions"
                  :key="mode"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedGameModes"
                      :value="mode"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">{{ mode }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="genres">
              <strong class="filter-options__title">Genres</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-genre"
                  v-for="genre in sortedGenres"
                  :key="genre"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedGenres"
                      :value="genre"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">{{ genre }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Available in</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-countries"
                  v-for="country in sortedCountries"
                  :key="country"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedCountries"
                      :value="country"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">{{ country }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="players genres">
              <strong class="filter-options__title">Game language</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-language"
                  v-for="language in sortedLanguages"
                  :key="language"
                >
                  <label class="checkbox">
                    <input
                      v-model="selectedLanguages"
                      :value="language"
                      type="checkbox"
                      class="form-input"
                    />
                    <div class="checkbox-box" />
                    <span class="checkbox__label">{{ language }}</span>
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
                <div
                  class="column filter-genre"
                  v-for="option in sortOptions"
                  :key="option"
                >
                  <label class="radio">
                    <input
                      v-model="selectedSortOption"
                      name="sortoption"
                      :value="option"
                      type="radio"
                    />
                    <div class="radio-box" />
                    <span class="radio__label">{{ option }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="genres">
              <strong class="filter-options__title">Sort order</strong>
              <div class="row row--small-gutter">
                <div
                  class="column filter-genre"
                  v-for="option in sortOrderOptions"
                  :key="option"
                >
                  <label class="radio">
                    <input
                      v-model="selectedSortOrder"
                      name="sortorderoption"
                      :value="option"
                      type="radio"
                      class="form-input"
                    />
                    <div class="radio-box" />
                    <span class="radio__label">{{ option }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </VueSlideToggle>
      </header>
      <div class="loader" v-if="loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-loader spin feather--large"
        >
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      </div>
      <div class="games-wrapper" v-else>
        <transition-group
          name="fade"
          tag="div"
          :class="{ 'small-cards': showSmallCards }"
        >
          <div
            class="column column--small game"
            v-for="game in orderedGames"
            :key="game.name"
          >
            <game-list-item
              :game="game"
              @select="selectGame"
              @toggle-game-in-my-games="toggleGameInMyGames"
              :game-modes="sortedGameModes"
              :is-owned="myGames.includes(game.slug)"
              :is-pro-deal="proGames.includes(game.slug)"
            ></game-list-item>
          </div>
        </transition-group>
      </div>
      <div class="last-update" v-if="!loading">
        Game data updated: {{ lastUpdate }}
      </div>
    </div>
    <transition name="fade">
      <game-details
        v-if="selectedGame"
        :game="selectedGame"
        @close="selectedGame = null"
      ></game-details>
    </transition>
  </div>
</template>

<script>
// import axios from 'axios';
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
      ageRatings: [],
      selectedGenres: [],
      selectedGameModes: [],
      selectedCountries: [],
      selectedLanguages: [],
      selectedResolutions: [],
      selectedAgeRatings: [],
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
      gameModesFilterOptions: ['single player', 'split screen', 'online multiplayer', 'local co-op', 'online co-op', 'local multiplayer', 'competitive', 'cross platform multiplayer'],
      lastUpdate: null,
      filterProGames: false,
      myGames: [],
      filterMyGames: false,
      showSmallCards: false,
      page: 1,
      gamesPerPage: 48,
    };
  },
  filters: {
    makePretty(input) {
      if (input === 'unknown') return 'Unknown';
      let split = input.split('p');
      if (split.length === 2) {
        return `${split[0]}p @ ${split[1]} fps`;
      }

      split = input.split('k');
      if (split.length === 2) {
        return `${split[0]}k @ ${split[1]} fps`;
      }
      return 'Unknown';
    },
  },
  mounted() {
    this.getFilters();
    if (document.body.classList.contains('dark-theme')) {
      this.useDarkTheme = true;
    }
    if (typeof window.localStorage !== 'undefined') {
      if (localStorage.getItem('small-cards')) {
        this.showSmallCards = true;
      }
      if (localStorage.getItem('show-my-games')) {
        this.filterMyGames = true;
      }
    }
    this.fillMyGames();
    fetch('https://raw.githubusercontent.com/ja1984/osgdb/master/data/games.json')
      .then((response) => response.json())
      .then((data) => {
        this.loading = false;
        data.games.forEach((game) => {
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

          if (game.age_rating && !this.ageRatings.includes(game.age_rating)) {
            this.ageRatings.push(game.age_rating);
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
          game.is_pro = this.checkIfPro([game.store_link, ...game.expansions.map(x => x.store_link)].join(''), data.pro_skuids); //eslint-disable-line
          this.games.push(Object.freeze(game));
        });
        this.lastUpdate = data.updated;
        this.ageRatings.sort((a, b) => b.localeCompare(a, undefined, {
          numeric: true,
          sensitivity: 'base',
        }));
        this.pro_games = data.pro_games;
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
    pagedList() {
      return this.orderedGames.concat().splice((this.page - 1) * this.gamesPerPage, this.gamesPerPage);
    },
    pages() {
      return Math.ceil(this.filteredGames.length / this.gamesPerPage);
    },
    filteredGames() {
      let games = this.games.concat();
      games = games
        .filter((x) => x.name.toLowerCase().includes(this.filter.toLowerCase()));

      if (this.filterMyGames) {
        games = games.filter((x) => this.myGames.includes(x.slug));
      }
      if (this.filterProGames) {
        games = games.filter((x) => x.is_pro);
      }
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

      if (this.selectedAgeRatings.length > 0) {
        games = games
          .filter((x) => this.selectedAgeRatings.some((z) => (x.age_rating || '').includes(z)));
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
          .filter((x) => {
            const test = x.game_modes.join('');
            return this.selectedGameModes.some((y) => test.includes(y) || test.includes(y.replace(' ', '-')));
          });
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
    fillMyGames() {
      if (typeof window.localStorage === 'undefined') return;
      const myGames = window.localStorage.getItem('sogdb-my-games');
      if (!myGames) return;
      this.myGames = JSON.parse(myGames);
    },
    toggleGameInMyGames(slug) {
      const index = this.myGames.indexOf(slug);
      if (index === -1) {
        this.myGames.push(slug);
      } else {
        this.myGames.splice(index, 1);
      }

      if (typeof window.localStorage === 'undefined') return;
      window.localStorage.setItem('sogdb-my-games', JSON.stringify(this.myGames));
    },
    checkIfPro(url, skuIds) {
      for (let i = 0; i < skuIds.length; i += 1) {
        if (url.includes(skuIds[i])) return true;
      }
      return false;
    },
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
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${querystring.stringify(newVal)}`;
      window.history.pushState({ path: newurl }, '', newurl);
    },
    useDarkTheme(useDarkTheme) {
      if (useDarkTheme) {
        document.body.classList.add('dark-theme');
        if (typeof window.localStorage === 'undefined') return;
        localStorage.setItem('dark-theme', true);
      } else {
        document.body.classList.remove('dark-theme');
        if (typeof window.localStorage === 'undefined') return;
        localStorage.removeItem('dark-theme');
      }
    },
    showSmallCards(smallCards) {
      if (typeof window.localStorage === 'undefined') return;
      if (smallCards) {
        localStorage.setItem('small-cards', true);
      } else {
        localStorage.removeItem('small-cards');
      }
    },
    filterMyGames(smallCards) {
      if (typeof window.localStorage === 'undefined') return;
      if (smallCards) {
        localStorage.setItem('show-my-games', true);
      } else {
        localStorage.removeItem('show-my-games');
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

  @media (min-width: 1200px) {
    width: 400px;
  }
}

.filter-genre,
.filter-player,
.filter-countries,
.filter-language {
  flex: 0 1 20%;
  padding: 5px;
}

// .filter-player {
//   flex: 0 1 (100% / 3);
// }

.logo__image {
  height: 30px;
  display: inline-block;

  @media (min-width: 1025px) {
    height: 45px;
  }
}

.logo__text {
  color: #2c3e50;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 40px;

  @media (min-width: 1025px) {
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
  transition: opacity 0.3s;
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

  @media (min-width: 1024px) {
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
  opacity: 0.5;
  transition: all ease 0.3s;

  &:hover {
    opacity: 1;
  }

}
.select-theme__icon {
  display: block;
}

.select-theme--active {
  color: #FFC107;
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

.pegi-rating {
  width: 21px;
  height: 25px;
  background-size: cover;
  display: inline-block;
  &.pegi_3 {
    background-image: url("~@/assets/pegi_3.png");
  }
  &.pegi_7 {
    background-image: url("~@/assets/pegi_7.png");
  }
  &.pegi_12 {
    background-image: url("~@/assets/pegi_12.png");
  }
  &.pegi_16 {
    background-image: url("~@/assets/pegi_16.png");
  }
  &.pegi_18 {
    background-image: url("~@/assets/pegi_18.png");
  }
}

.last-update {
  text-align: center;
  padding: 25px 0;
  font-weight: 600;
}

.toolbar {
  display: flex;
  margin: 0 -5px;

  @media (max-width: 1023px) {
    position: absolute;
    top: 25px;
    right: 25px;
  }
}
</style>
