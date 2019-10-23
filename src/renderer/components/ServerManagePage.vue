<template>
    <div>
        <b-button :to="'/'">Back to main</b-button>
        <h2>
        Server
        </h2>
        <b-button @click="chats.push(1)">gogo</b-button>
        <div>
            <p v-for="item in logs" :key="item.seq">
                {{item}}
            </p>
            
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    data() {
        return {
            logs: []
        }
    },
    mounted() {
        this.$electron.ipcRenderer.on('ServerLog', (e, logmsg) => {
            console.log(logmsg)
            this.logs.push(logmsg)
        })

        this.$electron.ipcRenderer.send('ServerCreate', { port: this.$store.state.server.port })
        
    }
}
</script>