当你想对用户输入值做一些基本的转换, 比如把`"3"`转换为`3`, 把前后的空格删掉. 那么这样做:
```html
<input v-model.trim="name" type="text">
<input v-model.number="age" type="number">
```
参考:
- https://vuejs.org/v2/guide/forms.html#Modifiers
