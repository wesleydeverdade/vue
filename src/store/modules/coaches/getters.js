export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const { coaches } = getters;
    const { userId } = rootGetters;
    return coaches.some((coach) => coach.id === userId);
  },
};
