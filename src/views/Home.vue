<template>
  <div id="home" :class="mode">
    <div class="back-image" :mode="mode">
      <h1 class="title" :mode="mode">BeatFul</h1>
      <todo-list v-if="isHidden"></todo-list>
      <button v-on:click="isHidden = !isHidden">
        <i class="fas fa-edit eye"></i>
      </button>
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

      <div class="player-xs">
        <div class="player_cover">
          <!-- eslint-disable -->
          <div
            class="player-cover__item"
            v-if="$index === index"
            :style="{ backgroundImage: `url(${song.cover})` }"
            v-for="(song, $index) in songs"
            :key="$index"></div>
        </div>
        <h2 class="song-title">
          <span class="span-playing-xs">Currently playing:</span><br />{{
            current.title
          }}
          <br /><span class="span-artist-xs">{{ current.artist }}</span>
        </h2>
        <div
          class="control_stuff"
          :mode="mode"
        >
          <button class="prev" @click="prev">
            <i class="fas fa-step-backward"></i>
          </button>
          <button class="play" v-if="!isPlaying" @click="play">
            <i class="fas fa-play"></i>
          </button>
          <button class="pause" v-else @click="pause">
            <i class="fas fa-pause"></i>
          </button>
          <button class="next" @click="next">
            <i class="fas fa-step-forward"></i>
          </button>

          <div class="progress">
            <div class="progress_bar">
              <div class="progress_current" :style="{ width: barWidth }"></div>
            </div>
          </div>
        </div>
      </div>

      <p class="listen">
        Beatful puts very little between you and music.
      </p>
    </div>
    <!--<div class="" id="clock">
      <p>{{ h }}:{{ m }}:{{ s }}</p>
    </div>-->
    <div class="player" :class="{ change_color: scrollPosition > 20 }">
      <h2 class="song-title">
        <span class="span-playing">Currently playing:</span><br />{{
          current.title
        }}
        <br /><span class="span-artist">{{ current.artist }}</span>
      </h2>
      <div class="player_cover">
        <!-- eslint-disable -->
        <div
          class="player-cover__item"
          v-if="$index === index"
          :style="{ backgroundImage: `url(${song.cover})` }"
          v-for="(song, $index) in songs"
          :key="$index"></div>
      </div>
      <div
        class="control_stuff"
        :class="{ change_show: scrollPosition > 20 }"
        :mode="mode"
      >
        <button class="prev" @click="prev">
          <i class="fas fa-step-backward"></i>
        </button>
        <button class="play" v-if="!isPlaying" @click="play">
          <i class="fas fa-play"></i>
        </button>
        <button class="pause" v-else @click="pause">
          <i class="fas fa-pause"></i>
        </button>
        <button class="next" @click="next">
          <i class="fas fa-step-forward"></i>
        </button>

        <div class="progress" ref="progress">
          <div class="progress_bar">
            <div class="progress_current" :style="{ width: barWidth }"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="playlist scroll-hide"
      :class="{ change_color: scrollPosition > 20 }"
    >
      <h3></h3>
      <button
        v-for="song in songs"
        :key="song.src"
        @click="play(song)"
        :class="song.src == current.src ? 'song playing' : 'song'"
      >
        {{ song.title }} - {{ song.artist }}
        <span class="playing-dur">{{ song.duration }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import TodoList from "../components/TodoList";
export default {
  name: "home",
  components: {
    Nav,
    TodoList,
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
        //ukoliko je pritisnuta pjesma koja već svira, krenuti će ispočetka
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener("ended", function () {
        this.player.pause();
        this.player.next();
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
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  created() {
    window.addEventListener("keyup", this.keyPress);

    let vm = this;

    this.current = this.songs[this.index];
    this.player.src = this.current.src;

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
