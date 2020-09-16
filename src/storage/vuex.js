import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { v4 as uuidv4 } from "uuid";

import { COLLECTION } from "./collection";
import { saveDocumentToDatabase } from "./firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: uuidv4(),
    [COLLECTION.User]: {},
    [COLLECTION.Quiz]: {},
    [COLLECTION.Game]: {}
  },
  mutations: {
    saveToStoreCollection(state, { collection, data }) {
      Vue.set(state, collection, data);
    }
  },
  actions: {
    saveUserData({ state, commit }, { collection, data }) {
      const { userId } = state;

      commit("saveToStoreCollection", {
        collection,
        data
      });

      return saveDocumentToDatabase(collection, userId, {
        ...data,
        userId
      });
    }
  },
  plugins: [createPersistedState()]
});
