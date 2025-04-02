<template>
    <h3>数据侦听</h3>
    <h4>对于数组，某些方法vue可以自动将数组中的更改更新到UI中，而某些不可以</h4>
    <button @click="addName">Add new Data</button>
    <p @click="getName(item)" v-for="(item, index) in names" :key="index">{{ item }}</p>
</template>

<script>
export default {
    data() {
        return {
            names: ['张三', '李四', '王五'],
            results: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
        }
    },

    methods: {
        addName() {
            // 可以引起UI自动更新
            this.names.push('赵六')
        }
    }
}

</script>