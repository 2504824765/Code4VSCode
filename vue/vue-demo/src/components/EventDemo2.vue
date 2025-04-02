<template>
    <h3>事件传参</h3>
    <p @click="getName(item)" v-for="(item, index) in names" :key="index">{{ item }}</p>
</template>

<script>
    export default {
        data() {
            return {
                names: ['张三', '李四', '王五'],
            }
        },

        methods: {
            getName(item) {
                console.log(item)
            },
        }
    }
</script>