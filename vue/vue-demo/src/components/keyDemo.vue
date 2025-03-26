<template>
    <h3>Key属性添加到v-for中</h3>
    <p v-for="(item, index) in results" :key="item.id">{{ item }}</p>
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
        }
    }
</script>