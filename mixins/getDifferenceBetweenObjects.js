export default {
  methods: {
    getDifference(a, b) {
      return Object.fromEntries(
        Object.entries(b).filter(([key, val]) => key in a && a[key] !== val)
      );
    }
  }
};
