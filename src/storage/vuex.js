import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { v4 as uuidv4 } from "uuid";

import { COLLECTION } from "./collection";
import { saveDocumentToDatabase } from "./firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [COLLECTION.User]: {
      userId: uuidv4()
    },
    [COLLECTION.Quiz]: {},
    [COLLECTION.Game]: {}
  },
  mutations: {
    saveToStoreCollection(state, { collection, data }) {
      Vue.set(state, collection, data);
    }
  },
  actions: {
    saveStoreCollectionToFirebase({ state }, { collection }) {
      const userId = state[COLLECTION.User].userId;

      return saveDocumentToDatabase(collection, userId, {
        ...state[collection],
        userId
      });
    }
  },
  plugins: [createPersistedState()]
});
