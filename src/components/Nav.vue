<template>
  <nav>
    <Toggle :mode="mode" @toggle="$emit('toggle')" />
  </nav>
</template>

<script>
import Toggle from "@/components/Toggle";
export default {
  props: ["mode"],
  components: {
    Toggle,
  },
};
</script>

<style>
#home.dark {
  background-color: #363636;
  color: #e8e8e8;
}
#home.dark h1 {
  color: #839980;
}
</style>
