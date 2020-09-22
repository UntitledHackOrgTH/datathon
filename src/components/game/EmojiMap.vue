<template>
  <div class="relative">
    <div class="absolute flex flex-row emoji-container">
      <div
        v-for="(emoji, index) in emojis"
        :key="index"
        class="flex flex-col justify-end mx-autop px-1"
        :style="`width: ${sizeListInPercent[index]}%;`"
      >
        <img :src="`./svgs/${emoji}.svg`" class="w-full" />
      </div>
    </div>
    <BangkokMap />
  </div>
</template>

<script>
import BangkokMap from "./BangkokMap";

const sizeList = [12, 10, 8, 6, 4];

export default {
  name: "EmojiMap",
  props: ["topics", "fontSizeMultiplier"],
  components: {
    BangkokMap
  },
  computed: {
    emojis() {
      return this.topics.map(({ emoji }) => emoji);
    },
    sizeListInPercent() {
      const sum = sizeList.reduce((count, size) => count + size, 0);

      return sizeList.map(size => Math.floor((size * 100) / sum));
    }
  }
};
</script>

<style lang="scss">
.emoji-container {
  top: 0;
  right: 10%;
  left: 10%;

  @media (min-width: 768px) {
    top: 0;
    right: 20%;
    left: 20%;
  }
}
</style>
