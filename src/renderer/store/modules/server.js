const state = {
    port: 54321
}

const mutations = {
    SET_PORT_SERVER (state, port) {
        
        state.port = port
    }
}

const actions = {
    setServerPort({ commit, state }, port) {
        
        commit('SET_PORT_SERVER', port)
    }
}

export default {
    state,
    mutations,
    actions
}
