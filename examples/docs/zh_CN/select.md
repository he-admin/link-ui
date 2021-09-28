:::demo
```html
 <template>
{{test}}
  <lku-select placeholder="请选择" :multiple="false" v-model="test" @change="change">
<lku-options-group label="水果">
     <lku-option v-for="option in list" :value="option.value" :key="option.value" :disabled="option.disabled">
       {{option.name}}
     </lku-option>
</lku-options-group>
</lku-select>
</template>
 <script>
 export default {
  data(){
return {
  test: 1,
  list: [{name:'张三',value:1,disabled: false},{name: '李四',value:2},{name: '李四21121212',value:3},{name: '李四',value:4},{name: '李四212121',value:5}]
}
  
},
methods:{
   change(val){
     console.log('change',val);   
},
input(val) {
  console.log(val);
}
}
 }
</script>
```
:::
