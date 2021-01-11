<template>
  <div class="card card--clickable" @click="$emit('select', game)">
    <header class="card__header">
      <div class="game-image">
        <img
          :src="`https://raw.githubusercontent.com/ja1984/sogdb/master/images/${game.image_slug}.webp`"
          class="game-image__image"
        />
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
      </div>
    </header>
    <section class="card__body">
      <span class="game__name">{{ game.name }}</span>
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
          <span class="release-date">{{ releaseDate }}</span>
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

.game__name {
  font-weight: 600;
  font-size: 17px;
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

.early-access {
  position: absolute;
  bottom: 15px;
  right: 0;
  background: #FFC107;
  color: #000;
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
}

.players {
  min-width: 24px;
  text-align: center;
  font-size: 14px;
}
</style>
