<template>
  <div class="card card--clickable" @click="$emit('select', game)">
    <header class="card__header">
      <div class="game-image">
        <img
          :src="`https://raw.githubusercontent.com/ja1984/sogdb/master/images/${game.image_slug}.webp`"
          crossorigin="anonymous"
          class="game-image__image"
        />
        <div class="pegi-rating" v-if="game.age_rating">
          <div class="pegi-rating__icon" :class="game.age_rating"></div>
        </div>
        <div class="rating" v-if="game.rating && !isNaN(game.rating)" alt="Rating" title="Rating">
          <img src="@/assets/smile.svg" class="rating__icon" />
          <span class="rating__text">{{ game.rating === -1 ? 'n/a' : game.rating }}</span>
        </div>
        <div v-if="isProDeal" class="deal" alt="This months pro deal" title="This months pro deal">
          <img src="@/assets/award.svg" class="deal__icon">
        </div>
        <div v-if="isEarlyAccess" class="early-access">
          EARLY ACCESS
        </div>
        <div v-if="isPreOrder" class="pre-order">
          PRE-ORDER
        </div>
        <div class="game__details">
          <span class="game__name">{{ game.name }}</span>
          <span class="game__details__information">{{ game.resolution }}</span>
        </div>
      </div>
    </header>
    <section class="card__body">
      <!-- <div class="game__description">
        <p>{{ game.description }}</p>
      </div> -->
      <div class="game-modes">
        <div class="row row--small-gutter" v-for="mode in gameGameModes" :key="mode.name" :class="{'game-modes--unavailable': !mode.exist}">
          <div class="column">
            <span class="game-modes__name">{{ mode.name }}</span>
          </div>
          <div class="column column--wrap">
            <template v-if="mode.exist">
              <div v-if="mode.players !== -1" class="players">{{ mode.players }}</div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check game-modes__icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x game-modes__icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </template>
          </div>
        </div>
      </div>
    </section>
    <footer class="card__footer">
      <div class="row row--center-v">
        <div class="column">
          <span class="release-date release-date--highlight" v-if="isPreOrder">
            <template v-if="getDaysLeft === 0">
              Today
            </template>
            <template v-else>
              {{ `In ${ getDaysLeft } days`}}
            <span :aria-label="releaseDate" data-balloon-pos="up">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </span>
            </template>
          </span>
          <span class="release-date" v-else >{{ releaseDate }}</span>
        </div>
        <div class="column column--wrap">
          <a :href="game.store_link" @click.stop target="_blank">
            <div class="store-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span class="store-icon__badge" v-if="game.expansions.length > 0">{{ game.expansions.length}}</span>
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
  data() {
    return {
      filteredGameModes: ['single player', 'split screen', 'online multiplayer', 'local co-op', 'online co-op', 'local multiplayer', 'competitive', 'cross platform multiplayer'],
    };
  },
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
  },
  methods: {
    getGameMode(mode) {
      return this.game.game_modes.find((x) => x.toLowerCase().includes(`player ${mode}`) || x.toLowerCase().includes(`players ${mode}`) || x.toLowerCase().includes(`players ${mode.replace(' ', '-')}`) || x.toLowerCase().includes(`player ${mode.replace(' ', '-')}`));
    },
  },
  computed: {
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
    isPreOrder() {
      if (this.game.pre_order) {
        return true;
      }
      return this.getDaysLeft > 0;
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
  background: rgba(0,0,0,.3);
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
  text-transform: uppercase;
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
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, .1) 100%);
    height: 35px;
  }
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
  opacity: .2;
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

.early-access, .pre-order {
  position: absolute;
  bottom: 15px;
  right: 0;
  background: #FFC107;
  color: #000;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
}

.pre-order {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: auto;
  background: #F44336;
  color: #fff;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
}

.players {
  min-width: 24px;
  text-align: center;
  font-size: 14px;
}

.release-date--highlight {
  color: #F44336;
}

.feather.feather-help-circle {
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
</style>
