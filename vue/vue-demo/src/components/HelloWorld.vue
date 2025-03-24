<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
</style>

<template>
  <div class="hello">
    <h1>{{ welcome }}</h1>
  </div>

  <table id="dishTable">
    <thead>
      <tr>
        <th>Dish name</th>
        <th>Dish catagory</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dish in Dishes">
        <td>{{ dish.name }}</td>
        <td>{{ dish.catagory }}</td>
      </tr>
    </tbody>
  </table>
  <button onclick="addData(this)">Add New Data</button>
</template>

<script>
// 这里的export default是必须的，它用来导出组件对象
class Dish {
  constructor(name, catagory) {
    this.name = name;
    this.catagory = catagory;
  }
  
}

function addData(button) {
  console.log('addData');
  
  var table = document.getElementById('dishTable');
  var inputName = prompt('Please enter the name of the dish');
  var inputCatagory = prompt('Please enter the catagory of the dish');
  var newRow = table.insertRow(-1);
  var nameCell = newRow.insertCell(0).innerText = inputName;
  var catagoryCell = newRow.insertCell(1).innerText = inputCatagory;
  this.Dishes.push(new Dish(inputName, inputCatagory));
}

export default {
  data() {
    return {
      welcome: 'Study Vue 3: Grammar',

      Dishes: [
        new Dish('apple', 'fruit'),
        new Dish('banana', 'fruit'),
        new Dish('orange', 'fruit'),
        new Dish('cabbage', 'vegetable'),
        new Dish('potato', 'vegetable'),
        new Dish('tomato', 'vegetable'),
      ]
    }
  }
}
</script>