<template>
    <div>
        <b-button :to="'/'">Back to main</b-button>
        <h2>
        Server
        </h2>
        <b-button @click="chats.push(1)">gogo</b-button>
        <div>
            {{chats}}
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    data() {
        return {
            chats: []
        }
    },
    mounted() {
        
    }
}
</script>