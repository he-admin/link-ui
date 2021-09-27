:::demo
```html
 <template>
  <lku-select placeholder="请选择" :multiple="true">
     <lku-option v-for="option in list" :value="option.value" :key="option.value" :disabled="option.disabled">
       {{option.name}}
     </lku-option>
</lku-select>
</template>
 <script>
 export default {
  data(){
return {
  list: [{name:'张三',value:1,disabled: false},{name: '李四',value:2}]
}
  
}
 }
</script>
```
:::
