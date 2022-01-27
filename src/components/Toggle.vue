<template>
  <label class="toggle">
    <input
      type="checkbox"
      :checked="mode === 'dark' ? 'checked' : false"
      @change="$emit('toggle')"
    />
    <span class="toggler round"></span>
  </label>
</template>

<script>
export default {
  props: ["mode"],
};
</script>

<style>
.toggle {
  position: relative;
  left: 50px;
  bottom: -3px;
  display: inline-block;
  width: 55px;
  height: 29px;
}
.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggler {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.toggler:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 4px;
  bottom: 4px;
  background-color: #f8ede3;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .toggler {
  background: #a2b29f;
}
input:focus + toggler {
  box-shadow: 0 0 2px #2196f3;
}
input:checked + .toggler:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.toggler.round {
  background-color: #363636;
  border-radius: 34px;
}
.toggler.round:before {
  border-radius: 50%;
}
@media screen and (max-width: 780px) {
  .toggle {
    left: 85px;
    bottom: 0;
    top: 28px;
  }
}
</style>
