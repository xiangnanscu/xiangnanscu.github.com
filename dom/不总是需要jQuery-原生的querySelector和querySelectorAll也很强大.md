
基于CSS selector语法, IE 8 都支持. 够用了. 比如你要查找符合这种条件的第一个`input`元素:
```html
<div class="user-panel main">
  <input name="login"/>
</div>
```
那么这样:
```js
document.querySelector("div.user-panel.main input[name='login']");
```
参考:
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
