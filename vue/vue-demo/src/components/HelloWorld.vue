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
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dish, index) in dishes">
        <td>{{ dish.name }}</td>
        <td>{{ dish.catagory }}</td>
        <td><button @click="deleteRow(index)">Delete Data</button></td>
      </tr>
    </tbody>
  </table>
  <button @click="addData()">Add New Data</button>
  <input type="file" accept=".xlsx, .xls" @change="handleFileUpload" />
</template>

<script>
import * as XLSX from 'xlsx';

class Dish {
  constructor(name, catagory) {
    this.name = name;
    this.catagory = catagory;
  }
  
}

// 这里的export default是必须的，它用来导出组件对象
export default {
  data() {
    return {
      welcome: 'Study Vue 3: Grammar',
      dishes: [
        new Dish('apple', 'fruit'),
        new Dish('banana', 'fruit'),
        new Dish('orange', 'fruit'),
        new Dish('cabbage', 'vegetable'),
        new Dish('potato', 'vegetable'),
        new Dish('tomato', 'vegetable')
      ],
      uploadStatus: "",
    }
  },

  methods: {
    addData() {
      console.log('addData');
      var table = document.getElementById('dishTable');
      var inputName = prompt('Please enter the name of the dish');
      var inputCatagory = prompt('Please enter the catagory of the dish');
      var newRow = table.insertRow(-1);
      var nameCell = newRow.insertCell(0).innerText = inputName;
      var catagoryCell = newRow.insertCell(1).innerText = inputCatagory;
      this.dishes.push(new Dish(inputName, inputCatagory));
    },

    deleteRow(index) {
      console.log('deleteRow');
      this.dishes.splice(index, 1);
    },

    handleFileUpload() {
      console.log('handleFileUpload');
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this .uploadStatus = "Processing file..."
      const fileReader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // 假设读取第一个工作表
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // 转换为 JSON 数据
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // 处理数据并添加到 Dishes
          jsonData.forEach((row) => {
            if (row.name && row.category) {
              this.Dishes.push(new Dish(row.name, row.category));
            }
          });

          this.uploadStatus = 'File uploaded successfully!';
        } catch (error) {
          console.error('Error reading Excel file:', error);
          this.uploadStatus = 'Error: Could not read the file.';
        }
      };

      reader.readAsArrayBuffer(file);
    },
  }
}
</script>