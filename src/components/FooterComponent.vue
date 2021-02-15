<template>
    <footer class="footer">
      <div class="container">
        <div class="row row--block-mobile">
          <div class="column">
            <div class="small-section">
            <div class="logo row row--center-v row--small-gutter">
              <div class="column column--wrap column--small-gutter">
                <span class="logo__text"><img src="@/assets/google-stadia-logo--white.png" class="logo__image">OGDb</span>
                <div class="logo__sub-title">Stadia Open Games Database</div>
              </div>
            </div>
            <p>
              SOGDb is a databse for the available Google Stadia games. SOGDb makes it easy to filter the games to find the one you are looking for.
            </p>
            <p>
              Stadia is a trademark of Google LLC. SOGDb is not affiliated with Stadia or Google.
            </p>
            </div>
          </div>

          <div class="column">
            <div class="small-section">
            <h2>Thanks</h2>
            <p>
              Thank you to the awesome <strong>nilicule</strong> who got this ball rolling by creating <strong>Stadia Game DB</strong>
            </p>
            <p>
              <strong>Links</strong>
              <ul>
                <li><a href="https://github.com/nilicule/"  target="_blank">nilicule</a></li>
                <li><a href="https://stadiagamedb.com/"  target="_blank">Stadia Game DB</a> (<a href="https://github.com/nilicule/StadiaGameDB" target="_blank">GitHub</a>)</li>
                <li><a href="https://stadia.google.com/"  target="_blank">Stadia</a></li>
                <li><div class="divider"></div></li>
                <li><a href="https://github.com/ja1984/sogdb"  target="_blank">SOGDb Github</a></li>
              </ul>
              <button class="footer-button" @click="showModal = true">Use SOGDb data</button>
            </p>
          </div>
          </div>
        </div>
      </div>
      <div class="modal" v-show="showModal">
        <div class="modal__inner">
            <div class="modal__inner__close" @click="showModal = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x game-details__header__close__icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
          <div class="dev-information">
            <header class="dev-information__header">
              <strong class="current-color">JSON URL</strong>
              <input readonly type="text" class="form-input form-input--fill" value="https://raw.githubusercontent.com/ja1984/sogdb/master/data/games.json">
              <strong class="current-color margin-top">Response</strong>
            </header>
            <section class="dev-information__body">
              <div class="dev-information__body__inner">
                <pre class="pre">{{ json }}</pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
</template>
<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      showModal: false,
      json: `{
  "games": [
    ...
    {
      "expansions": [
        {
          "name": "The Crew 2 - Gold Edition",
          "store_link": "https://stadia.google.com/u/1/store/details/cc97434908874852a6705d255a605dc8rcp1/sku/1e4107605f83447fa8e04e0abdc578b3"
        },
        {
          "name": "The Crew 2 - Deluxe Edition",
          "store_link": "https://stadia.google.com/u/1/store/details/cc97434908874852a6705d255a605dc8rcp1/sku/ec30180d14de41fcaec12d442b81e248"
        }
      ],
      "countries": ["united states", "canada", "united kingdom", "france", "germany", "spain", "italy", "netherlands", "denmark", "norway", "finland", "sweden", "belgium", "ireland"],
      "description": "In The Crew 2, take on the American motorsports scene as you explore and dominate the land, air, and sea of the United States in one of the most exhilarating open worlds ever created.  With a wide variety of exotic cars, bikes, boats, and planes to choose from, experience the unbridled thrill and adrenaline-pumping excitement of competing across the entire USA as you test your skills in a wide range of driving disciplines. Record every heart-pounding, white-knuckle, moment and share them with the simple push of a button - fame is yours to take! Play with up to 7 friends online.",
      "genres": [
        "racing"
      ],
      "image_slug": "the_crew_2",
      "slug": "the-crew-2",
      "languages": ["english", "french", "italian", "german", "spanish", "breton", "russian", "japanese", "arabic", "polish", "dutch", "kanuri", "chinese"],
      "name": "The Crew 2",
      "game_modes": [
        "single player",
        "online multiplayer",
        "online co-op",
        "competitive"
      ],
      "rating": 66,
      "released": "2020-03-24T23:00:00.000Z",
      "resolution": "unknown",
      "store_link": "https://stadia.google.com/store/details/cc97434908874852a6705d255a605dc8rcp1/sku/94db678cbb6342c3bc0e58f71130b3fb"
    },
    {
      "expansions": [],
      "countries": [],
      "description": "Interact with the words inscribed in the pages of a young girl’s diary to solve challenging puzzles, tackle unique platforming segments and discover an emotional tale set across the vibrant world of Estoria in Lost Words: Beyond the Page. Personal diary entries belonging to a young girl named Izzy will unfold as you explore a fantasy land where words hold immense power. Featuring an immersive story crafted by renowned games writer Rhianna Pratchett, Lost Words: Beyond the Page will mesmerize players with its unique blend of gameplay mechanics and striking watercolor aesthetic. Driven by the player’s curiosity, the world of Estoria and the power it holds will serve as the engine that will propel Izzy through this deeply personal narrative, resulting in a truly memorable experience.",
      "genres": [
        "adventure"
      ],
      "image_slug": "lost_words",
      "slug": "lost-words-beyond-the-page",
      "languages": [],
      "name": "Lost Words: Beyond the Page",
      "game_modes": [
        "single player"
      ],
      "rating": -1,
      "released": "2020-03-26T23:00:00.000Z",
      "resolution": "unknown",
      "store_link": "https://stadia.google.com/store/details/d334bea27ee64ef5a3a9bb14b1d6a88ercp1/sku/ab6a5a0d448d4c7aaed8dfa91ad6f4b9"
    },
    ...
  ],
  "pro_games": [
    {
      "month": "04-2020",
      "games": ["spitlings", "serious-sam-collection", "stacks-on-stacks-on-stacks"]
    }
  ],
  "updated": "2020-04-07T07:42:58.833Z"
}`,
    };
  },
  watch: {
    showModal(show) {
      if (show) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
  },
};
</script>
<style lang="less" scoped>

.logo__image {
  height: 30px;
  display: inline-block;

  @media(min-width: 1025px) {
    height: 45px;
  }
}

.logo__text {
  color: #fff;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 40px;

  @media(min-width: 1025px) {
    font-size: 60px;
  }
}

a {
  color: #fff;
}

.small-section {
  @media(min-width: 1024px) {
    padding-right: 125px;
  }
}

h2 {
  margin-top: 0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.divider {
  height: 20px;
}

.footer-button {
  margin: 25px 0 10px 0;
  background: #fff;
    color: #2c3e50;
    display: inline-block;
    text-decoration: none;
    border-radius: 50px;
    padding: 20px 60px;
    border: none;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    font-family: inherit;
    font-size: 15px;
    line-height: 1;
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,
    Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    box-shadow: 0 5px 10px -7px rgba(0,0,0, .3);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px;
}

.modal__inner {
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 5px 10px -7px rgba(0,0,0,.3);
  width: 90%;
  max-width: 650px;
  height: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 25px;

  @media(min-height: 1200px) {
    max-height: 90%;
  }
}

body.dark-theme {
  .modal__inner {
    background: rgb(62, 66, 78);
  }
}

.dev-information {
  padding: 15px;
  line-height: 1.4;
  flex: 1;
  min-height: 1px;
  display: flex;
  flex-direction: column;
}

.dev-information__body {
  flex: 1;
  min-height: 1px;
}

.dev-information__body__inner {
height: 100%;
}
.pre {
  border: 1px solid #cacaca;
  line-height: 1.4em;
  padding: 10px;
  overflow: auto;
  border-radius: 3px;
  background-color: #fafafb;
  color: #333;
  height: 100%;
  margin: 0;
}

.current-color {
  color: #333;
  margin-bottom: 5px;
  display: block;
}


body.dark-theme {
  .current-color {
    color: #eee;
  }
}

.margin-top {
  margin-top: 15px;
}

.modal__inner__close {
  position: absolute;
  top:10px;
  right: 10px;
  cursor: pointer;
  color: #333;
}

body.dark-theme {
  .modal__inner__close {
    color: #eee;
  }
}


.row--block-mobile {
  @media(max-width: 1023px) {
    display: block;
  }
}
</style>
