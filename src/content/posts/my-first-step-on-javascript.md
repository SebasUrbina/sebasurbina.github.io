# Mi Primer Pasos en JavaScript 🚀

¡Hola! En esta primera entrada de blog quiero compartir contigo cómo ha sido mi proceso de aprendizaje de JavaScript. Estoy empezando desde lo más básico, tomando apuntes y haciendo ejercicios simples para internalizar cada concepto. Aquí te muestro lo que he aprendido hasta ahora, explicado de forma clara y ordenada.

---

## 1. Variables en JavaScript

Para declarar una variable en JavaScript, podemos usar `var`, `let` o `const`. En este ejemplo, utilizo `var`:

```js
var person;
person = "Sebastian";
console.log("hello", person); // Output: hello Sebastian
```

---

## 2. Tipos de Datos

JavaScript trabaja con varios tipos de datos primitivos. Aquí te dejo un resumen:

- **Number**: `1997`
- **String**: `"Hello World"`
- **Boolean**: `true`, `false`
- **Null**: representa ausencia de valor.
- **Undefined**: una variable declarada pero no inicializada.
- **BigInt**: para representar números grandes.
- **Symbol**: valores únicos usados como identificadores.

> 💡 Recuerda que `null` y `undefined` son diferentes: el primero representa ausencia de valor intencionada; el segundo, una variable aún no inicializada.

---

## 3. Operadores

JavaScript cuenta con varios operadores para trabajar con datos:

### Operadores básicos

- Suma: `+`
- Resta: `-`
- Multiplicación: `*`
- División: `/`
- Módulo: `%`

### Operadores de comparación

- Igualdad: `==`
- Igualdad estricta: `===`
- Desigualdad: `!=`
- Desigualdad estricta: `!==`

> 💡 `==` compara valores ignorando el tipo, por eso `100 == '100'` devuelve `true`. Para evitar errores, mejor usar `===`.

### Operadores lógicos

- AND: `&&`
- OR: `||`
- NOT: `!`

### Operadores de asignación

- Suma y asignación: `+=`  
- Concatenación: `+=` (también se usa con strings)

---

## 4. Concatenación y Asignación

### Sumar o concatenar con `+`

```js
"inter" + "net" // "internet"
365 + " days" // "365 days"
```

### Acumulando con `+=`

```js
var overtime = 1;
overtime += 2;
overtime += 1;
overtime += 2;
overtime += 3;
console.log(overtime); // 9
```

También sirve para construir cadenas de texto:

```js
var longString = "";
longString += "Once";
longString += " upon";
longString += " a";
longString += " time";
longString += "...";
console.log(longString); // "Once upon a time..."
```

---

## 5. Ejercicios prácticos

### 🕹️ Ejercicio 1: Operador `&&`

```js
var score = 8;
console.log("Mid-level skills:", score > 0 && score < 10); // true
```

### 🕹️ Ejercicio 2: Operador `||`

```js
var timeRemaining = 0;
var energy = 10;
console.log("Game over:", timeRemaining == 0 || energy == 0); // true
```

### 🕹️ Ejercicio 3: Número par o impar usando `%`

```js
var num1 = 2;
var num2 = 5;
var test1 = num1 % 2;
var test2 = num2 % 2;
var result1 = test1 == 0;
var result2 = test2 == 0;
console.log("Is", num1, "an even number?", result1);
console.log("Is", num2, "an even number?", result2);
/*
Is 2 an even number? true
Is 5 an even number? false
*/
```

---

## 6. Estructuras Condicionales

### if / else if / else

```js
var age = 33;

if (age >= 65) {
    console.log("You get your income from your pension");
} else if (age >= 18) {
    console.log("Each month you get a salary");
} else if (age < 18) {
    console.log("You get an allowance");
} else {
    console.log("The value of the age variable is not numerical");
}
```

### switch

Más útil cuando hay múltiples casos posibles:

```js
var light = "green";

switch (light) {
    case 'green':
        console.log("Drive");
        break;
    case 'orange':
        console.log("Get ready");
        break;
    case 'red':
        console.log("Don't drive");
        break;
    default:
        console.log("The light is not green, orange, or red");
}
```

---

## 7. Bucles (Loops)

Para repetir acciones, puedes usar `for`, `while`, entre otros.

```js
for (var i = 1; i <= 5; i++) {
    console.log(i);
}
console.log("Counting completed!");
```

---

Hasta la próxima entrada 🙌
