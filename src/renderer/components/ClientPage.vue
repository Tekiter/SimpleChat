<template>
    <div>
        <b-button :to="'/'">Back to main</b-button>
        <div v-for="(chat, idx) of lists" :key="idx">
            <div>
                {{chat}}
            </div>
        </div>
        <form action="">
            <input v-model="m" autocomplete="off" /><button @click="sending()">Send</button>
        </form>
    </div>
</template>
<style scoped>

</style>
<script>
import io from "socket.io-client";

export default {
    data(){
        return{
            socket:'',
            m:'',
            lists:[]
        }
    },
    mounted(){
        this.socket=io("http://localhost:3001");
    },
    methods:{
        sending(){
            this.socket.emit('chat message',this.m);
            this.m='';
            this.recieve();
        },
        recieve(){
            this.socket.on('chat message',(msg)=>{
                this.lists.push({chat:msg,idx:1});
            })
        }
    }
}
</script>