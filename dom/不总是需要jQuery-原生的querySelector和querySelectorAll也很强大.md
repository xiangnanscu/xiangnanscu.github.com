
基于CSS selector语法, IE 8 都支持. 够用了.比如你要查找这样的元素
```html
<input name="login"/> within a <div class="user-panel main">
```
那么这样:
```js
document.querySelector("div.user-panel.main input[name='login']");
```
参考:
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
