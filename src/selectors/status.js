export const getActionStatus = (state, type, id) => {
    const status = state.status || {};
    const action = status[type] || {};

    return action[id] || { loading: false, error: null };
};
