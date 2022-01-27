<template>
  <div id="mainer">
    <div class="nav">
      <router-link to="/" class="pep">Home</router-link>
      <router-link to="/songs" class="pep">Songs</router-link>
      <router-link to="/contact" class="pep">Contact</router-link>
      <router-view />
    </div>
  </div>
</template>

<script></script>

<style lang="scss">
#mainer {
  width: 10px;
  text-align: center;
}
#mainer a.pep {
  position: relative;
  top: 34px;
  left: 270px;
  color: #91a48e;
  padding: 6px 18px;
  margin-left: 13px;
  font-size: 18px;
  font-weight: 500;
  transition: 0.1s;
}
#mainer a.pep:hover {
  border-radius: 17px;
  background-color: #a2b29f;
  color: #f6f6f6;
}
#mainer a.router-link-exact-active {
  border-radius: 17px;
  background-color: #a2b29f;
  color: #f6f6f6;
}
@media screen and (max-width: 980px) {
  #mainer {
    margin-top: -3px;
  }
  #mainer a.pep {
    top: 31px;
    left: 230px;
    margin-left: 24px;
    font-size: 18px;
  }
}
@media screen and (max-width: 780px) {
  #mainer a.pep {
    display: none;
  }
}
</style>
