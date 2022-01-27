<template>
  <div id="about" class="about" :class="mode">
    <h1 class="title" :mode="mode">BeatFul</h1>

    <div
      class="hamburger"
      @click="hamburgerOpen = !hamburgerOpen"
      :class="hamburgerOpen ? 'hamburger--is-open' : ''"
    >
      <div class="hamburger__item hamburger__item--first"></div>
      <div class="hamburger__item hamburger__item--middle"></div>
      <div class="hamburger__item hamburger__item--last"></div>
    </div>
    <div class="droper-content" :class="hamburgerOpen ? 'dropic' : ''">
      <router-link to="/">HOME</router-link>
      <router-link to="/songs">SONGS</router-link>
      <router-link to="/contact">CONTACT</router-link>
      <router-view />
    </div>

    <Nav class="hey" :mode="mode" @toggle="toggle" />

    <input
      type="text"
      v-model="search"
      class="search"
      placeholder="Search by title.."
    />
    <span v-if="!filteredList.length" class="no-result">
      I'm sorry, but we don't have that song 😞
      <p>If you want, <router-link to="/contact">send us a message</router-link> with the name of the songs you would love to see here.</p>
    </span>

    <div class="songs" :mode="mode">
      <button v-for="song in filteredList" :key="song.title" class="song2">
        <div class="song-image">
          <img :src="song.cover" />
          <div class="song-title2">
            <b>{{ song.title }}</b
            ><br />
            {{ song.artist }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";

export default {
  name: "home",
  components: {
    Nav,
    //TodoList,
  },
  data() {
    return {
      mode: "light",
      hamburgerOpen: false,
      current: {},
      index: 0,
      isPlaying: false,
      isHidden: false,
      barWidth: null,
      duration: null,
      currentTime: null,
      scrollPosition: null,
      search: "",
      songs: [
        {
          id: 1,
          title: "alone",
          artist: "no one's perfect",
          cover: require("../assets/art_alone.jpg"),
          src: require("../assets/alone.mp3"),
          duration: "02:16",
        },
        {
          id: 2,
          title: "Secret Beach",
          artist: "Ambulo",
          cover: require("../assets/art_secret_beach.jpg"),
          src: require("../assets/secret beach.mp3"),
          duration: "02:11",
        },
        {
          id: 3,
          title: "tea in the evening",
          artist: "bert",
          cover: require("../assets/art_tea_in_the_evening.jpg"),
          src: require("../assets/tea in the evening.mp3"),
          duration: "01:43",
        },
        {
          id: 4,
          title: "Still With You",
          artist: "Smyang Piano",
          cover: require("../assets/art_still_with_you.jpg"),
          src: require("../assets/still with you.mp3"),
          duration: "03:40",
        },
        {
          id: 5,
          title: "no longer the same",
          artist: "Kanisan, SIGH",
          cover: require("../assets/art_no_longer_the_same.jpg"),
          src: require("../assets/no longer the same.mp3"),
          duration: "02:06",
        },
        {
          id: 6,
          title: "Passing By",
          artist: "Retro Jungle, mell-Ø",
          cover: require("../assets/art_passing_by.jpg"),
          src: require("../assets/passing by.mp3"),
          duration: "02:00",
        },
        {
          id: 7,
          title: "Amsterdam",
          artist: "Lalely Lui",
          cover: require("../assets/art_amsterdam.jpg"),
          src: require("../assets/amsterdam.mp3"),
          duration: "02:11",
        },
        {
          id: 8,
          title: "Romance",
          artist: "Kanisan, Mau",
          cover: require("../assets/art_romance.jpg"),
          src: require("../assets/romance.mp3"),
          duration: "01:30",
        },
        {
          id: 9,
          title: "home alone",
          artist: "Lucid Green",
          cover: require("../assets/art_home_alone.jpg"),
          src: require("../assets/home alone.mp3"),
          duration: "02:58",
        },
        {
          id: 10,
          title: "Black Coffee",
          artist: "Lately Lui",
          cover: require("../assets/art_coffee.jpg"),
          src: require("../assets/coffee.mp3"),
          duration: "02:03",
        },
      ],
      player: new Audio(),
    };
  },
  computed: {
    //funkcija za pretragu pjesama
    filteredList() {
      return this.songs.filter((song) => {
        return song.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
    play(song) {
      if (typeof song.src != "undefined") {
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener("ended", function () {
        this.index++;
        if (this.index > this.songs.length - 1) {
          this.index = 0;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
      });
      this.isPlaying = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    next() {
      if (this.index < this.songs.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    generateTime() {
      let width = (100 / this.player.duration) * this.player.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.player.duration / 60);
      let dursec = Math.floor(this.player.duration - durmin * 60);
      let curmin = Math.floor(this.player.currentTime / 60);
      let cursec = Math.floor(this.player.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
  },
};
</script>

<style scoped>
#about {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background: #f1eff6;
  transition: background 0.3s ease-in-out;
  margin-top: -27px;
}
#about h1 {
  font-family: "Dancing Script";
  font-size: 56px;
  font-weight: 700;
  display: flex;
  justify-content: left;
  padding-top: 15px;
  margin-left: 2%;
  color: #91a48e;
}
#about.dark {
  height: 100vh;
  background-color: #363636;
  color: #e8e8e8;
}
.search {
  width: 210px;
  position: absolute;
  top: 27px;
  right: 140px;
  font-size: 14px;
  padding: 8px 8px 8px 12px;
  border: 2px solid #91a48e;
  border-radius: 17px;
  background-color: #e6e6e6;
}
.search:focus {
  outline: 0;
}
span.no-result {
  width: 80%;
  font-size: 42px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
span.no-result p {
  width: 80%;
  margin-left: 10%;
  font-size: 24px;
  font-weight: normal;
  margin-top: 20px;
}
span.no-result a {
  text-decoration: underline;
  color: #91a48e;
}
.songs {
  width: 94%;
  margin: 0 auto;
  margin-top: -40px;
}
.song2 {
  width: 20%;
  font-size: 18px;
  margin-top: 70px;
}
.songs button:hover {
  opacity: 1;
}
.song-title2 {
  position: relative;
  top: 4px;
  left: 0;
  text-align: center;
  font-size: 15px;
}
.dark .song-title2 {
  color: #e6e6e6;
}
.song-image {
  width: 75%;
  margin: 0 auto;
  height: 168px;
  border-radius: 16px;
}
.song-image img {
  border-radius: 16px;
  transition: 0.2s;
}
.song-image img:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 30px 1px rgb(76 70 124 / 60%);
}
@media screen and (max-width: 980px) {
  #about, #about.dark {
    height: auto;
    padding-bottom: 80px;
  }
  #about h1 {
    font-size: 48px;
    margin-left: 6%;
  }
  .search {
    width: 40%;
    top: 90px;
    left: 30%;
    font-size: 16px;
    padding: 10px 0px 10px 14px;
  }
  .songs {
    margin-top: 50px;
  }
  .song2 {
    width: 50%;
    margin-bottom: 270px;
  }
  .song-title2 {
    top: 13px;
    font-size: 20px;
  }
  .song-image {
    width: 73%;
  }
  .song-image img:active {
    transform: scale(1.03);
    box-shadow: 0px 6px 30px 1px rgb(76 70 124 / 60%);
  }
}
@media screen and (max-width: 780px) {
  #about, #about.dark {
    height: 105vh;
  }
  #about h1 {
    justify-content: left;
    padding-top: 65px;
    margin-left: 11%;
    font-size: 52px;
  }
  .search {
    width: 60%;
    top: 130px;
    left: 20%;
    font-size: 17px;
  }
  span.no-result {
    font-size: 2em;
    padding-top: 100px;
  }
  .songs {
    width: 100%;
    margin-top: 60px;
  }
  .song2 {
    width: 100%;
  }
  .song-title2 {
    top: 15px;
    font-size: 22px;
  }
  .song-image {
    width: 60%;
  }
}
@media screen and (max-width: 600px) {
  .song2 {
    width: 90%;
    height: 70px;
  }
  .song-title2 {
    top: 15px;
    font-size: 22px;
  }
}
</style>
