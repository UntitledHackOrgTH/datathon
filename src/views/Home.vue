<template>
  <div id="home" class="w-screen h-screen flex">
    <div class="m-auto text-center pb-24">
      <h1 class="font-bold" style="font-size: 15vh">
        กรุงเทพ
        <br />ในฝัน
      </h1>
      <h2 class="text-2xl">ตรวจสอบ-เข้าใจ-ออกความเห็น ไปด้วยกัน</h2>
      <div class="mt-12">
        <button
          class="rounded-full px-6 py-2 text-2xl"
          style="background-color:#FECC2F; box-shadow: 0px 4px 10px #FECC2F;"
          @click="registerUserId()"
        >
          เริ่มเล่น
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { COLLECTION } from "../storage/collection";

export default {
  name: "Home",
  methods: {
    ...mapActions(["saveStoreCollectionToFirebase"]),
    async registerUserId() {
      await this.saveStoreCollectionToFirebase({
        collection: COLLECTION.User
      });

      this.$router.push("/quiz");
    }
  }
};
</script>

<style lang="css" scoped>
#home {
  background: url(../assets/bg.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
