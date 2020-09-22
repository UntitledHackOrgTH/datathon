<template>
  <Layout
    color="#FECC2F"
    page="Bangkok in your dream"
    title="สร้างเมืองในฝัน"
    subtitle="จินตนาการว่าตัวเองเป็นผู้ว่ากรุงเทพฯ แล้วลองเลือกพัฒนาเมืองตามประเด็นที่คุณสนใจ แล้วลองมาดูกันว่า เมืองในฝันของคุณ กับเมืองในฝันของทุกคน ใกล้เคียงกันหรือไม่?"
  >
    <div class="flex flex-row text-center">
      <div class="flex flex-col space-y-12">
        <h1 class="text-3xl font-bold">
          เปรียบเทียบ กรุงเทพในฝันของคุณ และกรุงเทพของทุกๆ คน
        </h1>
        <div
          class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8"
        >
          <div class="flex-1 flex flex-col space-y-8">
            <div>
              <h2 class="text-xl font-bold">กรุงเทพฯ ในฝันของคุณ</h2>
            </div>
            <div class="space-y-8">
              <Motto :topics="userTopics" />
              <EmojiMap :topics="userTopics" />
            </div>
            <div class="flex-1 flex flex-col space-y-8">
              <div class="grid grid-cols-1 gap-2">
                <TopicCard
                  v-for="topic in userTopics"
                  :key="topic.key"
                  :topic="topic"
                  :onClick="() => null"
                />
              </div>
            </div>
          </div>
          <div class="bg-gray-300" style="width: 1px;"></div>
          <div
            v-if="overallTopics.length > 0"
            class="flex-1 flex flex-col space-y-8"
          >
            <div>
              <h2 class="text-xl font-bold">กรุงเทพในฝันของทุกๆ คน</h2>
            </div>
            <div class="space-y-8">
              <Motto :topics="overallTopics" />
              <EmojiMap :topics="overallTopics" />
            </div>
            <div class="flex-1 flex flex-col space-y-8">
              <div class="grid grid-cols-1 gap-2">
                <TopicCard
                  v-for="topic in overallTopics"
                  :key="topic.key"
                  :topic="topic"
                  :onClick="() => null"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <router-link
            to="/construction"
            class="block rounded bg-gray-300 px-4 py-2 w-64 m-auto"
            >แบ่งปัน</router-link
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from "vuex";

import Layout from "../layouts/default";
import EmojiMap from "../components/game/EmojiMap";
import TopicCard from "../components/game/TopicCard";
import Motto from "../components/game/Motto";

import { COLLECTION } from "../storage/collection";
import { loadCollectionFromDatabase } from "../storage/firebase";
import { topics } from "../data/GameTopics.json";

const MAX_SELECTED_TOPICS = 5;

export default {
  name: "GameResult",
  components: {
    EmojiMap,
    TopicCard,
    Motto,
    Layout
  },
  data() {
    return {
      overallTopics: []
    };
  },
  computed: {
    ...mapState({
      userTopics: ({ game }) =>
        game.topicIds.map(selectedTopicId =>
          topics.find(({ id }) => selectedTopicId === id)
        )
    })
  },
  async mounted() {
    const topicCounter = {};
    const allUsersGameData = await loadCollectionFromDatabase(COLLECTION.Game);

    topics.forEach(({ id }) => (topicCounter[id] = 0));

    allUsersGameData.forEach(({ topicIds }) => {
      topicIds.forEach(
        (id, index) => (topicCounter[id] += MAX_SELECTED_TOPICS - index)
      );
    });

    this.overallTopics = Object.entries(topicCounter)
      .sort(([, aCount], [, zCount]) => zCount - aCount)
      .slice(0, MAX_SELECTED_TOPICS)
      .map(([topicId, count]) => ({
        ...topics.find(({ id }) => topicId === id),
        count
      }));
  }
};
</script>
