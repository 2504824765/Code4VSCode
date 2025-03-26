<template>
  <div v-bind:class="dynamicClass" v-bind:id="dynamicID">test</div>
  <button :disabled="isButtonDisabled">Button</button>
  <div v-bind="myObject">test2</div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicClass: 'active',
        dynamicID: 'test',

        isButtonDisabled: true,

        myObject: {
          class: 'active',
          id: 'test',
        }
      }
    }
  }
</script>

<style>
  .active {
    color: red;
  }
</style>