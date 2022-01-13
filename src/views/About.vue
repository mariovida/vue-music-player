<template>
  <div id="home" class="about" :class="mode">
    <h1 class="title" :mode="mode">BeatFul</h1>
    <!--<todo-list v-if="isHidden"></todo-list>
    <button v-on:click="isHidden = !isHidden">
      <i class="fas fa-edit eye"></i>
    </button>-->
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
      <router-view />
    </div>

    <Nav class="hey" :mode="mode" @toggle="toggle" />

    <div class="songs" :mode="mode">
      <button v-for="song in songs" :key="song.src" class="song2">
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
//import TodoList from "../components/TodoList";
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
      menuOpen: false,
      current: {},
      index: 0,
      isPlaying: false,
      darkActive: true,
      h: "",
      m: "",
      s: "",
      isHidden: false,
      nightMode: false,
      barWidth: null,
      duration: null,
      currentTime: null,
      maxTime: null,
      scrollPosition: null,
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
  watch: {
    nightMode: function () {
      localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
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
    updateClock: function () {
      let now = new Date();
      this.h = this.leftPad("" + now.getHours());
      this.m = this.leftPad("" + now.getMinutes());
      this.s = this.leftPad("" + now.getSeconds());
    },
    leftPad: function (str) {
      const leftPad = "00";
      return leftPad.substring(0, leftPad.length - str.length) + str;
    },
    onImageLoaded: function () {
      this.imgLoaded = true;
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
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.player.currentTime = (maxduration * percentage) / 100;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    setInterval(this.updateClock, 30);
  },
  created() {
    window.addEventListener("keyup", this.keyPress);

    let vm = this;

    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    this.nightMode = JSON.parse(localStorage.getItem("nightMode"));

    this.player.ontimeupdate = function () {
      vm.generateTime();
    };
    this.player.onloadedmetadata = function () {
      vm.generateTime();
    };
  },
};
</script>

<style lang="scss">
@import "../style.css";
</style>
