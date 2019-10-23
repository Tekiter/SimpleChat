const state = {
    ip: '127.0.0.1',
    port: 54321,
    nickname: "guest"
}

const mutations = {
    SET_PORT_CLIENT (state, port) {
        
        state.port = port
    },
    SET_IP_CLIENT (state, ip) {
        
        state.ip = ip
    },
    SET_NICKNAME_CLIENT (state, nickname) {
        
        state.nickname = nickname
    }
}

const actions = {
    setJoinPort({ commit, state }, port) {
        
        commit('SET_PORT_CLIENT', port)
    },
    setJoinIP({ commit, state }, ip) {
        
        commit('SET_IP_CLIENT', ip)
    },
    setJoinNickname({ commit, state }, nickname) {
        
        commit('SET_NICKNAME_CLIENT', nickname)
    }
}

export default {
    state,
    mutations,
    actions
}
