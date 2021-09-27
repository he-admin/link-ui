:::demo
```html
 <template>
{{value}}
  <lku-select placeholder="请选择" :multiple="false" v-model="value" @change="change">
     <lku-option v-for="option in list" :value="option.value" :key="option.value" :disabled="option.disabled">
       {{option.name}}
     </lku-option>
</lku-select>
</template>
 <script>
 export default {
  data(){
return {
  value: 1,
  list: [{name:'张三',value:1,disabled: false},{name: '李四',value:2},{name: '李四21121212',value:3},{name: '李四',value:4},{name: '李四212121',value:5}]
}
  
},
methods:{
   change(val){
     console.log(val);   
}
}
 }
</script>
```
:::
