<template>
    <h3>事件修饰符</h3>
    <a @click="clickHandle()" href="https://www.baidu.com">百度</a>
    <p>{{ count }}</p>
    <div>test</div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        methods: {
            clickHandle(e) {
                // 通过evnet对象组织默认事件
                e.preventDefault();
                console.log('click');
            }
        }
    }
</script>