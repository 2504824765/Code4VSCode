<template>
    <h3>Computed Demo</h3>
    <p>{{ person.name }}</p>
    <!-- 如果采用下面这种模版方法处理复杂的逻辑运算的话不好，我们采用计算属性的方式来处理这种逻辑运算 -->
    <p>使用模版语法</p>
    <p>{{ person.age.length > 0 ? "YES" : "NO" }}</p>
    <p>使用计算属性</p>
    <p>{{ isThereAnyAge }}</p>
    <h3>与函数的区别</h3>
    <p>我们使用函数的方法也可以实现类似的内容，但是使用计算属性可以让这个逻辑只执行一次，若用函数，则每次调用都会进行一次计算</p>

</template>

<script>
export default {
    data() {
        return {
            person: {
                name: '张三',
                age: [1,2,3],
            }
        }
    },
    computed: {
        // 计算属性
        isThereAnyAge() {
            // 计算属性的值是基于它的依赖进行缓存的
            // 只有当依赖发生变化时，计算属性才会重新计算
            return this.person.age.length > 0 ? "YES" : "NO"
        }
    },
    methods: {
        increment() {
            this.count++
        }
    }
}
</script>