export const state = () => {
    return {
        user: {},
        token: '',
    }
}

export const getters = {
    getToken: (state) => {
        const t = localStorage.getItem('token') || state.token
        return t
    },
    getUser: (state) => {
        if (localStorage.getItem('user') != null) {
            const user = localStorage.getItem('user') || state.user
            let u = JSON.parse(user)
            return u
        } else {
            return null;
        }
    },
}

export const mutations = {
    SET_TOKEN(state, token) {
        localStorage.setItem('token', token)
        state.token = token
    },
    SET_USER(state, user) {
        const u = JSON.stringify(user)
        localStorage.setItem('user', u)
        state.user = user
    },
    CLEAR_USER(state) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        state.user = {}
        state.token = ''
    },
}

export const actions = {
    async userLogin({ commit, dispatch }, data) {
        const self = this
        return await self.$api
            .guestLogin(data)
            .then(async (response) => {
                await commit('SET_TOKEN', response.data.token)
                await dispatch('me', { token: response.data.token })
                return undefined
            })
            .catch((error) => {
                return error
            })
    },
    async me({ commit }, data) {
        const self = this
        return await self.$api.getMe(data)
            .then(async (response) => {
                await commit('SET_USER', response.data)
            })
            .catch((error) => {
                return error
            })
    },
    async logout({ commit }) {
        await commit('CLEAR_USER')
        return undefined
    },
}
