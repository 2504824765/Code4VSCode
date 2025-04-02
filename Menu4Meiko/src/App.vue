<template>
  <div class="excel-container">
    <h3>菜单生成器</h3>
    
    <div class="control-panel">
      <button @click="fetchDishes" class="action-btn fetch-btn">
        获取菜品数据
      </button>
      <button @click="addNewRow" class="action-btn add-btn">
        添加新菜单项
      </button>
      <button @click="exportToExcel" class="action-btn export-btn">
        导出Excel
      </button>
    </div>

    <div class="dish-type-selector">
      <label>
        <input type="radio" v-model="dishType" value="meat"> 荤菜
      </label>
      <label>
        <input type="radio" v-model="dishType" value="vegetable"> 素菜
      </label>
      <label>
        <input type="radio" v-model="dishType" value="soup"> 汤类
      </label>
    </div>

    <table class="data-table" v-if="parsedData.length">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in parsedData" :key="row.__id">
          <td v-for="header in headers" :key="header">
            <span v-if="!row.editing">{{ row[header] }}</span>
            <input v-else v-model="row[header]" @keyup.enter="finishEditing(row)">
          </td>
          <td class="actions">
            <button 
              @click="toggleEdit(row)" 
              class="edit-btn"
              :class="{ 'save-btn': row.editing }"
            >
              {{ row.editing ? '保存' : '修改' }}
            </button>
            <button 
              v-if="row.editing" 
              @click="cancelEditing(row, index)" 
              class="cancel-btn"
            >
              取消
            </button>
            <button @click="deleteRow(index)" class="delete-btn">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty-message">
      暂无菜单数据，请点击"获取菜品数据"或"添加新菜单项"
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      parsedData: [],
      originalData: [],
      headers: ['日期', '午餐主菜', '午餐副菜', '午餐汤', '晚餐主菜', '晚餐副菜', '晚餐汤', '客餐'],
      hasChanges: false,
      dishType: 'meat', // 默认选择荤菜
      dishDatabase: {
        meat: ['红烧肉', '宫保鸡丁', '糖醋排骨', '水煮鱼', '回锅肉', '辣子鸡', '梅菜扣肉'],
        vegetable: ['炒青菜', '麻婆豆腐', '地三鲜', '蒜蓉西兰花', '干煸四季豆', '西红柿炒鸡蛋'],
        soup: ['紫菜蛋花汤', '玉米排骨汤', '冬瓜薏米汤', '番茄牛肉汤', '菌菇汤', '鲫鱼豆腐汤']
      }
    }
  },
  methods: {
    // 获取菜品数据
    async fetchDishes() {
      try {
        // 模拟从网络获取菜品数据
        const dishes = this.dishDatabase[this.dishType];
        
        // 添加到菜单中
        const newRow = {
          日期: this.getCurrentDate(),
          [this.dishType === 'meat' ? '午餐主菜' : 
           this.dishType === 'vegetable' ? '午餐副菜' : '午餐汤']: dishes[Math.floor(Math.random() * dishes.length)],
          __id: Date.now() // 使用时间戳作为唯一ID
        };
        
        this.parsedData.push(newRow);
        this.originalData = JSON.parse(JSON.stringify(this.parsedData));
        this.hasChanges = true;
        
      } catch (error) {
        console.error('获取菜品失败:', error);
        alert('获取菜品数据失败，请稍后重试');
      }
    },
    
    // 获取当前日期
    getCurrentDate() {
      const now = new Date();
      return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}号`;
    },
    
    // 添加新行
    addNewRow() {
      const newRow = {
        日期: this.getCurrentDate(),
        午餐主菜: '',
        午餐副菜: '',
        午餐汤: '',
        晚餐主菜: '',
        晚餐副菜: '',
        晚餐汤: '',
        客餐: '',
        __id: Date.now(),
        editing: true // 直接进入编辑模式
      };
      this.parsedData.push(newRow);
      this.hasChanges = true;
    },
    
    // 删除行
    deleteRow(index) {
      if (confirm('确定要删除这一行吗？')) {
        this.parsedData.splice(index, 1);
        this.hasChanges = true;
      }
    },
    
    // 导出Excel
    exportToExcel() {
      if (this.parsedData.length === 0) {
        alert('没有数据可导出');
        return;
      }
      
      // 准备导出数据（移除内部使用的字段）
      const exportData = this.parsedData.map(row => {
        const { __id, editing, originalValues, ...rest } = row;
        return rest;
      });
      
      // 创建工作表
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // 创建工作簿
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "菜单");
      
      // 生成文件名
      const fileName = `菜单_${new Date().toISOString().slice(0, 10)}.xlsx`;
      
      // 导出文件
      XLSX.writeFile(wb, fileName);
    },
    
    // 以下方法保持不变
    toggleEdit(row) {
      if (row.editing) {
        this.finishEditing(row);
      } else {
        this.startEditing(row);
      }
    },
    
    startEditing(row) {
      row.originalValues = JSON.parse(JSON.stringify(row));
      row.editing = true;
    },
    
    finishEditing(row) {
      row.editing = false;
      this.checkForChanges();
    },
    
    cancelEditing(row, index) {
      Object.assign(row, row.originalValues);
      delete row.originalValues;
      row.editing = false;
      this.checkForChanges();
    },
    
    checkForChanges() {
      this.hasChanges = this.parsedData.some(
        row => row.originalValues && JSON.stringify(row) !== JSON.stringify(row.originalValues)
      );
    },
    
    saveChanges() {
      this.originalData = JSON.parse(JSON.stringify(this.parsedData));
      this.parsedData.forEach(row => {
        if (row.originalValues) {
          delete row.originalValues;
        }
      });
      this.hasChanges = false;
      alert('修改已保存！');
    }
  },
  mounted() {
    // 初始化一些示例数据
    this.parsedData = [
      {
        日期: '2025年3月1号',
        午餐主菜: '红油猪耳',
        午餐副菜: '醋溜白菜',
        午餐汤: '鱼头豆腐汤',
        晚餐主菜: '不供餐',
        晚餐副菜: '不供餐',
        晚餐汤: '不供餐',
        客餐: '',
        __id: 1
      }
    ];
    this.originalData = JSON.parse(JSON.stringify(this.parsedData));
  }
}
</script>