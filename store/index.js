export const state = () => ({
  suppliers: undefined
});

export const mutations = {
  setSuppliers(state, payload) {
    state.suppliers = payload;
  },
  deleteItemLocally(state, payload) {
    state[payload.entity] = state[payload.entity].filter(
      (el) => el.id !== payload.id
    );
  }
};

export const actions = {
  async setSuppliers({ commit }) {
    const token = this.$auth.strategy.token.get().split(' ')[1];
    try {
      const payload = await this.$axios.$get(`api/suppliers/${token}`);
      commit('setSuppliers', payload);
    } catch (error) {
      console.log('Error in setting suppliers:', error.message);
    }
  }
};
