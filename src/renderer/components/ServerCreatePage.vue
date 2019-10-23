<template>
    <div>
        <h1>Create Server</h1>
        <b-button :to="'/'">Back to main</b-button>
        <div class="container">
            <b-form>

                <b-form-group label="port">
                    <b-form-input v-model="serverport"></b-form-input>
                </b-form-group>

                <b-button class="btn btn-success" @click="onCreate()">Create</b-button>
            </b-form>

        </div>
    </div>
</template>
<style scoped>

</style>
<script>

export default {
    data() {
        return {
            serverport: 54321
        }
    },

    methods: {
        onCreate() {
            this.$store.dispatch('setServerPort', this.serverport)
            // this.$store.commit('SET_PORT_SERVER', this.serverport)

            this.$electron.ipcRenderer.send('ServerCreate', { port: this.serverport })

            this.$router.push('servermanage')
        }
    }
}
</script>