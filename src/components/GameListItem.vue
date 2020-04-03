<template>
  <div class="card">
    <header class="card__header">
      <div class="game-image">
        <img
          :src="`https://raw.githubusercontent.com/nilicule/StadiaGameDB/master/images/posters/webp/${game.image_slug}.webp`"
          class="game-image__image"
        />
        <div class="rating" v-if="game.rating && !isNaN(game.rating)" alt="Rating" title="Rating">
          <img src="@/assets/smile.svg" class="rating__icon" />
          <span class="rating__text">{{ game.rating || 'n/a' }}</span>
        </div>
      </div>
    </header>
    <section class="card__body">
      <span class="game__name">{{ game.name }}</span>
      <div class="game__description">
        <p>{{ game.description }}</p>
      </div>
    </section>
    <footer class="card__footer">
      <div class="row row--center-v">
        <div class="column">
          <span class="release-date">{{ releaseDate }}</span>
        </div>
        <div class="column column--wrap">
          <a :href="game.store_link" target="_blank">
            <div class="store-icon">
              <img src="@/assets/shopping-bag.svg" />
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
  props: {
    game: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    releaseDate() {
      return format(this.game.released, 'MMMM dd, yyyy');
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
}

</style>
