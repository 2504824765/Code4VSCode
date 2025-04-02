<template>
    <h3>内联事件处理器</h3>
    <button @click="increment">button</button>
    <button @click="this.count = 0">reset</button>
    <p>{{ count }}</p>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },

        methods: {
            // event对象，可以用来获取事件源对象
            increment(event) {
                event.target.innerHTML = this.count
                this.count++
            }
        }
    }
</script>