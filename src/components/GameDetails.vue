<template>
<div class="modal">
  <div class="game-details">
    <header class="game-details__header">
      <div class="game-image">
      <img
          :src="`https://raw.githubusercontent.com/nilicule/StadiaGameDB/master/images/posters/webp/${game.image_slug}.webp`"
          class="image"
        />
        <div class="game-image__name">{{ game.name }}</div>
      </div>
        <div class="game-details__header__close" @click="$emit('close')">
          <img src="@/assets/x.svg" class="game-details__header__close__icon">
        </div>
    </header>
    <section class="game-details__body">
      <div class="game-details__body__inner">
      <div class="game__information__row">
      <div class="game__description">{{ game.description }}</div>
      </div>
      <div class="game__information__row">
        <strong>Languages</strong>
        <div>{{ game.languages.join(', ') }}</div>
      </div>
      <div class="game__information__row">
        <strong>Countries</strong>
        <div>{{ game.countries.join(', ') }}</div>
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
                <img src="@/assets/shopping-bag.svg" />
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
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0, .8);
  display: flex;
  justify-content: center;
  align-items: center;
}

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
</style>
