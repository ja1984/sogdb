<template>
  <div class="card card--clickable" @click="$emit('select', game)">
    <header class="card__header">
      <div class="game-image">
        <img :src="`https://raw.githubusercontent.com/ja1984/sogdb/master/images/${game.image_slug}.webp`" crossorigin="anonymous" class="game-image__image" />
        <div v-if="game.age_rating" class="pegi-rating">
          <div class="pegi-rating__icon" :class="game.age_rating"></div>
        </div>

        <a v-if="game.rating && !isNaN(game.rating)" :href="metacriticLink" target="_blank" class="rating" alt="Rating" title="Rating" @click.stop>
          <img src="@/assets/metacritic-icon.svg" class="rating__icon" />
          <span class="rating__text">{{
            game.rating === -1 ? "n/a" : game.rating
          }}</span>
        </a>

        <div v-if="isProDeal" class="deal" alt="This months pro deal" title="This months pro deal">
          <img src="@/assets/award.svg" class="deal__icon" />
        </div>
        <div class="badge">
          <div v-if="isEarlyAccess" class="early-access">EARLY ACCESS</div>
          <div v-if="isPreOrder" class="pre-order">PRE-ORDER</div>
          <div v-if="hasFreeTrial" class="pre-order" :aria-label="`Play full game for ${game.free_trial} minutes`" data-balloon-pos="left">
            FREE TRIAL {{ game.free_trial }} MINUTES
          </div>
        </div>
        <div class="game__details">
          <div v-if="game.is_pro" class="game-badge">
            <img src="@/assets/pro.png">
          </div>
          <div v-if="game.ubisoft_plus">
            <img src="@/assets/ubisoft_plus.png" class="ubisoft-plus__icon">
          </div>
          <span class="game__name">{{ game.name }}</span>
          <span class="game__details__information">{{ resolution }}</span>
        </div>
      </div>
    </header>
    <section class="card__body">
      <!-- <div class="game__description">
        <p>{{ game.description }}</p>
      </div> -->
      <div class="game-modes">
        <div v-for="mode in gameGameModes" :key="mode.name" class="row row--small-gutter" :class="{ 'game-modes--unavailable': !mode.exist }">
          <div class="column">
            <span class="game-modes__name">{{ mode.name }}</span>
          </div>
          <div class="column column--wrap">
            <template v-if="mode.exist">
              <div v-if="mode.players !== -1" class="players">
                {{ mode.players }}
              </div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check game-modes__icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x game-modes__icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </template>
          </div>
        </div>
      </div>
    </section>
    <footer class="card__footer">
      <div class="row row--center-v">
        <div class="column">
          <span v-if="isPreOrder" class="release-date release-date--highlight">
            <template v-if="getDaysLeft === 0"> Today </template>
            <template v-else>
              {{ `In ${getDaysLeft} days` }}
              <span :aria-label="releaseDate" data-balloon-pos="up">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
            </template>
          </span>
          <span v-else class="release-date">
            {{ releaseDate }}
            <template v-if="game.hidden">
              <span aria-label="This game might have been removed for purchase" data-balloon-pos="up">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
            </template>
          </span>
        </div>
        <div class="column column--wrap">
          <button class="toggle-own" :class="{'toggle-own--selected': isOwned}" @click.stop="$emit('toggle-game-in-my-games', game.slug)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> -->
          </button>
          <a :href="game.store_link" target="_blank" @click.stop>
            <div class="store-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span v-if="game.expansions.length > 0" class="store-icon__badge">{{ game.expansions.length }}</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'GameListItem',
  props: {
    game: {
      type: Object,
      default: () => { },
    },
    gameModes: {
      type: Array,
      default: () => [],
    },
    isProDeal: {
      type: Boolean,
      default: false,
    },
    isOwned: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filteredGameModes: ['single player', 'split screen', 'online multiplayer', 'local co-op', 'online co-op', 'local multiplayer', 'competitive', 'cross platform multiplayer'],
    };
  },
  computed: {
    metacriticLink() {
      return `https://www.metacritic.com/search/game/${this.game.name}/results`;
    },
    resolution() {
      if (this.game.resolution === 'unknown') return 'Resolution and fps unknown';
      let split = this.game.resolution.split('p');
      if (split.length === 2) {
        return `${split[0]}p @ ${split[1]} fps`;
      }

      split = this.game.resolution.split('k');
      if (split.length === 2) {
        return `${split[0]}k @ ${split[1]} fps`;
      }
      return 'Resolution and fps unknown';
    },
    getDaysLeft() {
      const date1 = new Date();
      const date2 = new Date(this.game.released);
      const diff = date2.getTime() - date1.getTime();
      return Math.round(diff / (1000 * 3600 * 24));
    },
    gameGameModes() {
      const gameModes = [];

      this.filteredGameModes.forEach((mode) => {
        const multiplayerGameMode = this.getGameMode(mode);
        if (multiplayerGameMode) {
          const test = multiplayerGameMode.split(' ');
          gameModes.push({
            name: mode,
            exist: true,
            players: test[0],
          });
        } else {
          gameModes.push({
            name: mode,
            exist: this.game.game_modes.includes(mode),
            players: -1,
          });
        }
      });
      return gameModes;
    },
    releaseDate() {
      return format(this.game.released, 'MMMM dd, yyyy');
    },
    isEarlyAccess() {
      return this.game.early_access;
    },
    hasFreeTrial() {
      return this.game.free_trial
    },
    isPreOrder() {
      if (!this.game.pre_order) {
        return false;
      }
      return this.getDaysLeft > 0;
    },
  },
  methods: {
    getGameMode(mode) {
      return this.game.game_modes.find((x) => x.toLowerCase().includes(`player ${mode}`) || x.toLowerCase().includes(`players ${mode}`) || x.toLowerCase().includes(`players ${mode.replace(' ', '-')}`) || x.toLowerCase().includes(`player ${mode.replace(' ', '-')}`));
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;
}

.card__body {
  flex: 1;
  padding-bottom: 0;
}

.game__details {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  // font-size: 24px;
  // font-weight: 600;
  color: #fff;
  padding: 10px 15px;
  padding-top: 25px;
  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  text-shadow: 1px 1px 1px #000;
}

.game__name {
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  padding-bottom: 2px;
}

.game__details__information {
  color: #bbb;
  font-size: 13px;
  font-weight: 500;
  display: block;
}

.release-date {
  color: #777;
}

.game-image {
  position: relative;
}

.game__description {
  height: 90px;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    height: 35px;
  }
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 40px;
  padding: 3px 6px;
  color: #fff;
  display: flex;
  text-decoration: none;
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

.store-icon {
  display: inline-block;
  position: relative;
}

.store-icon__badge {
  position: absolute;
  height: 18px;
  width: 18px;
  font-size: 10px;
  background: red;
  color: #fff;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  font-weight: 800;
}

.game-modes__icon {
  height: 18px;
  display: block;
}

.game-modes {
  padding: 10px 0;
  padding-top: 0;
}

.row--small-gutter {
  // border-bottom: 1px solid #efefef;
  .column {
    padding: 5px;
  }
}

.game-modes--unavailable {
  opacity: 0.2;
}
.game-modes__name {
  text-transform: capitalize;
}

.deal {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 5px;
  border-radius: 8px;
}

.deal__icon {
  display: block;
  width: 18px;
}

.early-access {
  background: #ffc107;
  color: #000;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
}

.pre-order, .ubisoft-plus {
  background: #f44336;
  color: #fff;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
  display: inline-block;
}

.ubisoft-plus {
  background: #7B1FA2;
}

.ubisoft-plus__icon {
  height: 11px;
  width: auto;
  display: block;
  margin-bottom: 3px;
}

.players {
  min-width: 24px;
  text-align: center;
  font-size: 14px;
}

.release-date--highlight {
  color: #f44336;
}

.feather.feather-help-circle,
.feather.feather-alert-triangle {
  height: 16px;
  vertical-align: middle;
}

.pegi-rating {
  position: absolute;
  top: 10px;
  left: 10px;
}

.pegi-rating__icon {
  width: 25px;
  height: 30px;
  background-size: cover;
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

.badge {
  position: absolute;
  bottom: 55px;
  right: 0;
  z-index: 1;
  text-align: right;
}

.toggle-own {
  background: transparent;
  padding: 0;
  border: none;
  outline: none;
  margin-right: 5px;

  .feather {
    display: block;
  }

  &.toggle-own--selected {
    color: #e91e63;
  }
}
</style>
