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
      <p>{{ game.description }}</p>
    </section>
    <footer class="card__footer">
      <div class="row row--center-v">
        <div class="column">
          <span class="release-date">{{ game.formatRelease }}</span>
        </div>
        <div class="column column--wrap">
          <a :href="game.store_link" target="_blank">
            <img src="@/assets/shopping-bag.svg" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'GameListItem',
  props: {
    game: {
      type: Object,
      default: () => { },
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
}

.game__name {
  font-weight: 600;
  font-size: 17px;
}

.release-date {
  color: #aaa;
}

.game-image {
  position: relative;
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

</style>
