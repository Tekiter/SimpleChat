const state = {
    ip: '127.0.0.1',
    port: 54321
}

const mutations = {
    SET_PORT_CLIENT (state, port) {
        
        state.port = port
    },
    SET_IP_CLIENT (state, port) {
        
        state.port = port
    }
}

const actions = {
    setJoinPort({ commit, state }, port) {
        
        commit('SET_PORT_CLIENT', port)
    },
    setJoinIP({ commit, state }, ip) {
        
        commit('SET_IP_CLIENT', ip)
    }
}

export default {
    state,
    mutations,
    actions
}
