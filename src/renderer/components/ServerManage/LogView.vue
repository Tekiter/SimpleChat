<template>
    <div>
        <div v-for="item in logdata" :key="item.seq">
            <b-alert show :variant="parseVariant(item.type)">{{ item.msg }}</b-alert>
            <!-- <div v-html="item.msg"></div> -->
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    props: ['logdata'],
    data() {
        return {

        }
    },
    methods: {
        parseVariant(type) {
            switch (type) {
                case 'join':
                    return 'success'
                    break;
                case 'disconnect':
                    return 'warning'
                    break
                default:
                    return 'light'
                    break;
            }
        }
    }
}
</script>