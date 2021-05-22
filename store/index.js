export const state = () => ({
  suppliers: undefined,
  sourceMaterials: undefined
});

export const mutations = {
  setProperty(state, payload) {
    state[payload.entity] = payload.payload;
  },
  deleteItemLocally(state, payload) {
    console.log(payload);
    state[payload.entity] = state[payload.entity].filter(
      (el) => el.id !== payload.id
    );
  }
};

export const getters = {
  isNameTaken: (state) => ({ id, property, takenValue, entity }) => {
    const itemThatHasTakenName = state[entity].find(
      (el) => el[property] === takenValue
    )?.id;
    if (!itemThatHasTakenName) return false;
    const isThatItemTheSameAsThisOne = itemThatHasTakenName === id;
    return !isThatItemTheSameAsThisOne;
  },
  getSuppliers: (state) => {
    return state.suppliers;
  }
};

export const actions = {
  async setSuppliers({ commit }) {
    const token = this.$auth.strategy.token.get().split(' ')[1];
    try {
      const payload = await this.$axios.$get(`api/suppliers`, {
        params: {
          userid: token
        }
      });
      commit('setProperty', { payload, entity: 'suppliers' });
    } catch (error) {
      console.log('Error in setting suppliers:', error.message);
    }
  },
  async setSourceMaterials({ commit }) {
    const token = this.$auth.strategy.token.get().split(' ')[1];
    try {
      const payload = await this.$axios.$get(`api/source-materials`, {
        params: {
          userid: token
        }
      });
      commit('setProperty', { payload, entity: 'sourceMaterials' });
    } catch (error) {
      console.log('Error in setting source materials:', error);
    }
  }
};
