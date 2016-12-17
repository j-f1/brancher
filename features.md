# Features used by brancher

(support via [`node.green`](http://node.green))

**Current support: Node 6.9.0+**

## ~~Default Params~~
Node `6.9.0`+
```js
(a = 1, b = 2) => {}
```

## Rest Params
Node `6.9.0`+; `4.3.2`+ `--harmony`
```js
(...args) => args
```

## Spread Operator
Node `5.11.0`+; `4.3.2`+ `--harmony`
```js
(f, args) => f(2, ...args)
```
## Object Literal Extensions
Node `4.3.2`+
### Shorthand Properties
```js
var foo = 1
var bar = 2
var foobar = {foo, bar}
foobar === {foo: 1, bar: 2}
```
### Shorthand Methods
```js
var foo = {
  bar () {
  }
}
foo === {bar: function () {}}
```

## `for`-`of` Loop
Node `0.12.17`+
```js
var arr = [1, 2, 3]
for (var key of arr) {
  console.log(key)
}
```
## Template Literals
Node `4.3.2`+
```js
var foo = 'bar'
;`Hello, ${foo}!` === 'Hello, bar!'
```
## Destructuring
Node `6.9.0`+
### Destructuring Declarations
```js
var { foo, bar } = {foo: 1, bar: 2}
foo === 1
bar === 2
```
### Destructuring Parameters
```js
({ a, b }) => {}
```
## `const`
Node `0.10.48`+
## `let`
Node `4.3.2`+; `0.10.48`+ `--harmony`
## Arrow Functions `=>`
Node `4.3.2`+; `0.12.17`+ `--harmony` (partial support)
## `class`
Node `4.3.2`+
## `Proxy`
Node `6.9.0`+
```js
var pxy = new Proxy({foo: 1, bar: 2}, {
  get (target, key) {
    return target[key] + 1
  }
})
pxy.bar === 3
```
## `Promise`
Node `0.12.17`+
```js
Promise.resolve(2)
var promise = new Promise((resolve, reject) => {
  resolve(2)
})
promise.then(x => x + 2).then(console.log.bind(console))
```
## `String#startsWith`, `String#endsWith`
Node `4.3.2`+; `0.12.17`+ `--harmony` (partial support)
```js
'hello, world'.startsWith('hello') && 'hello, world'.endsWith('world')
```
## `Array#includes`

```js
[1, 2, 3].includes(3)
```
