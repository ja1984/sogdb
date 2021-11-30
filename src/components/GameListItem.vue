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
          <div v-if="hasFreeTrial" class="pre-order">
            <svg width="48" height="73" fill="none" viewBox="0 0 48 73" xmlns="http://www.w3.org/2000/svg"><mask id="c1093" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="73" fill="#000"><path fill="#fff" d="M0 0h48v73H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2C2.68 2 2 2.67 2 3.5v3.36c0 14.18 8.49 25.87 19.45 27.58v3.33C10.5 39.47 2 51.17 2 65.34c0 .43 0 .85.02 1.28H2v3.35c0 .84.67 1.5 1.5 1.5h41.46c.83 0 1.5-.66 1.5-1.5v-3.35h-.02c.02-.43.03-.85.03-1.28 0-14.17-8.49-25.87-19.46-27.57v-3.33c10.97-1.71 19.46-13.4 19.46-27.58V3.51c0-.84-.68-1.51-1.5-1.51H3.5z"></path></mask><path d="M2 6.86H.5v1.5H2v-1.5zm0 0h1.5v-1.5H2v1.5zm19.45 27.58h1.5v-1.29l-1.26-.2-.24 1.49zm0 3.33l.24 1.48 1.27-.2v-1.28h-1.5zM2.02 66.62v1.5h1.56l-.05-1.56-1.5.06zm-.02 0V65.1H.5v1.5H2zm44.47 0h1.5V65.1h-1.5v1.5zm-.03 0l-1.5-.06-.06 1.56h1.56v-1.5zM27.01 37.77h-1.5v1.28l1.27.2.23-1.48zm0-3.33l-.23-1.49-1.27.2v1.29H27zM46.47 6.86h1.5-1.5zm0-.03h-1.5 1.5zM3.5 3.51V.49A3.01 3.01 0 0 0 .49 3.51h3.02zm0 3.35V3.51H.49v3.35h3.02zM2 5.36v3-3zm19.69 27.6C11.67 31.38 3.5 20.53 3.5 6.85H.49c0 14.67 8.81 27.2 20.73 29.07l.47-2.98zm1.27 4.8v-3.32h-3.01v3.33h3zM3.5 65.35c0-13.68 8.16-24.53 18.18-26.09l-.47-2.97C9.3 38.14.5 50.68.5 65.34h3.02zm.02 1.22c-.02-.4-.02-.8-.02-1.22H.49c0 .45.01.89.03 1.33l3-.1zM2 68.12h.02v-3.01H2v3.01zm1.5 1.85v-3.35h-3v3.35h3zm0 0h-3a3.01 3.01 0 0 0 3 3.01v-3zm41.46 0H3.51v3.01h41.45v-3zm0 0v3.01a3.01 3.01 0 0 0 3.01-3h-3zm0-3.35v3.35h3.01v-3.35h-3zm1.48 1.5h.03v-3.01h-.03v3.01zm-1.48-2.78c0 .41 0 .82-.02 1.22l3 .11c.02-.44.03-.88.03-1.33h-3zM26.78 39.25c10.01 1.56 18.18 12.41 18.18 26.1h3.01c0-14.67-8.8-27.21-20.73-29.07l-.46 2.97zm-1.27-4.81v3.33h3v-3.33h-3zM44.96 6.86c0 13.68-8.17 24.53-18.18 26.1l.46 2.97c11.93-1.86 20.73-14.4 20.73-29.07h-3zm0-.03v.03h3.01v-.03h-3zm0-3.32v3.32h3.01V3.51h-3zm0 0h3.01a3.01 3.01 0 0 0-3-3.02v3.02zm-41.45 0h41.45V.49H3.51v3.02z" fill="#E8EAED" class="KfhlHf" mask="url(#c1093)"></path><path stroke="url(#c1094)" stroke-width="1.51" d="M2 67.25h44.47"></path><path stroke="#A8ADB3" stroke-width="1.51" d="M2 5.42h44.47"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2.45 12.42h43.57C43.96 25.11 35 34.66 24.23 34.66c-10.75 0-19.72-9.55-21.78-22.24z" fill="url(#c1095)"></path><path d="M19.02 30.26C11.62 27.56 6.1 19.3 5.52 9.3" stroke="#E8EAED" stroke-width="1.51" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.11 53.52l.18 1.9c0 .1.06.19.15.22l1.65.94c.23.12.2.45-.04.56l-1.74.75c-.08.04-.14.11-.19.23L15.74 60c-.06.25-.36.33-.52.14l-1.24-1.43a.23.23 0 0 0-.26-.1l-1.87.23c-.25.04-.45-.24-.3-.45l.97-1.65c.06-.08.04-.2.01-.3l-.78-1.72c-.1-.25.1-.5.34-.45l1.86.41c.09.04.2.01.26-.06l1.4-1.29c.17-.17.46-.06.5.2z" fill="#fff"></path><path d="M32.12 56.46l.98-2.76a1.47 1.47 0 1 0 .99-2.77l.99-2.77a4.42 4.42 0 0 1 2.66 5.64 4.4 4.4 0 0 1-5.62 2.66z" fill="#E8EAED" class="KfhlHf"></path><path d="M23.34 43l-2.64 3.92 3.91 2.65 2.64-3.93L23.34 43z" fill="#E93B2D"></path><defs><linearGradient id="c1094" x1="2" y1="68.51" x2="46.47" y2="68.51" gradientUnits="userSpaceOnUse"><stop stop-color="#F8491B"></stop><stop offset=".52" stop-color="#F12F3F"></stop><stop offset="1" stop-color="#DC1860"></stop></linearGradient><linearGradient id="c1095" x1="2.45" y1="12.42" x2="44.21" y2="37.9" gradientUnits="userSpaceOnUse"><stop stop-color="#FF4C1D"></stop><stop offset="1" stop-color="#C01C49"></stop></linearGradient></defs></svg>
            Free Trial
          </div>
        </div>
        <div class="game__details">
          <div v-if="game.is_pro" class="game-badge">
            <img src="@/assets/pro.png">
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

.pre-order {
  background: #f44336;
  color: #fff;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
  display: inline-block;
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
