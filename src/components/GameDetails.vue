<template>
<div class="modal" @click="backdropClick">
  <div class="game-details">
    <header class="game-details__header">
      <div class="game-image">
      <img
          :src="`https://raw.githubusercontent.com/ja1984/sogdb/master/images/${game.image_slug}.webp`"
          class="image"
        />
        <div class="game-image__name">{{ game.name }}</div>
      </div>
        <div class="game-details__header__close" @click="$emit('close')">
          <img src="@/assets/x.svg" class="game-details__header__close__icon">
        </div>
        <div class="pegi-rating" v-if="game.age_rating">
          <div class="pegi-rating__icon" :class="game.age_rating"></div>
        </div>
        <div v-if="isEarlyAccess" class="early-access">
          EARLY ACCESS
        </div>
                <div v-if="isPreOrder" class="pre-order">
          PRE-ORDER
        </div>
    </header>
    <section class="game-details__body">
      <div class="game-details__body__inner">
      <div class="game__information__row">
      <div class="game__description" v-html="(game.description || '').replace(/(?:\r\n|\r|\n)/g, '<br>')"></div>
      </div>
      <div class="game__information__row">
        <strong>Languages</strong>
        <div class="capitalize">{{ languages }}</div>
      </div>
      <div class="game__information__row">
        <strong>Countries</strong>
        <div class="capitalize">{{ countries }}</div>
      </div>
      <div class="game__information__row">
        <strong class="strong strong--larger">Expansions</strong>
        <div v-for="expansion in game.expansions" :key="expansion.name">
          <div class="row row--center-v">
            <div class="column">
              {{ expansion.name }}
            </div>
            <div class="column column--wrap">
              <a :href="expansion.store_link" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'GameDetails',
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getDaysLeft() {
      const date1 = new Date();
      const date2 = new Date(this.game.released);
      const diff = date2.getTime() - date1.getTime();
      return Math.round(diff / (1000 * 3600 * 24));
    },
    isPreOrder() {
      if (this.game.pre_order) {
        return true;
      }
      return this.getDaysLeft > 0;
    },
    languages() {
      return this.game.languages.concat().sort((a, b) => a.localeCompare(b)).join(', ');
    },
    countries() {
      return this.game.countries.concat().sort((a, b) => a.localeCompare(b)).join(', ');
    },
    isEarlyAccess() {
      return this.game.early_access;
    },
  },
  methods: {
    backdropClick(event) {
      // https://stadia.google.com/player/3e7b24085e704c10ab03f93a19947c14rcp1
      if (event.target.className === 'modal') {
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="less" scoped>


.game-details {
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 5px 10px -7px rgba(0,0,0,.3);
  width: 90%;
  max-width: 650px;
  height: 90%;
  display: flex;
  flex-direction: column;

  @media(min-height: 1200px) {
    max-height: 90%;
  }
}

body.dark-theme {
  .game-details {
    background: rgb(62, 66, 78);
  }
}

.game-details__body {
  padding: 15px;
  line-height: 1.4;
  flex: 1;
  min-height: 1px;
}

.game-details__body__inner {
  height: 100%;
  overflow: auto;
}

.image {
  width: 100%;
  display: block;
}

.game-details__header {
  position: relative;
}

.game-details__header__close {
  position: absolute;
  background: #fff;
  top: 15px;
  right: 15px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: .4;
  transition: all ease .3s;

  &:hover {
    opacity: .8;
  }
}

.game-details__header__close__icon {
  display: block;
}

.game-image {
  position: relative;
}

.game-image__name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  padding: 15px 25px;
  padding-top: 175px;
  background: rgba(0,0,0,.3);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}

.game__description {
  line-height: 1.4;
}

.game__information__row {
  margin-bottom: 10px;
}

.strong--larger {
  font-size: 22px;
  margin-top: 20px;
  display: block;
}

.capitalize {
  text-transform: capitalize;
}

.early-access, .pre-order {
  position: absolute;
  bottom: 15px;
  right: 0;
  background: #FFC107;
  color: #000;
  font-size: 14px;
  padding: 5px;
  font-weight: bold;
}

.pre-order {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: auto;
  background: #F44336;
  color: #fff;
  padding: 5px;
  font-weight: bold;
}

.pegi-rating {
  position: absolute;
  top: 10px;
  left: 10px;
}


.pegi-rating__icon {
  width: 60px / 2;
  height: 73px / 2;
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
