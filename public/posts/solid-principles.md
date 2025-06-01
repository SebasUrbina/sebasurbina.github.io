# Principios SOLID en Python

Los principios SOLID son un conjunto de cinco principios de diseño de software que ayudan a crear código más mantenible, flexible y escalable. A continuación, se explican cada uno de estos principios con ejemplos prácticos en Python.

## S - Principio de Responsabilidad Única (Single Responsibility Principle - SRP)

Una clase debe tener una única responsabilidad, es decir, debe tener una única razón para cambiar.

### Ejemplo Incorrecto
```python
class Auto:
    def __init__(self) -> None:
        self.posicion = 0
        self.combustible = 100

    def mover(self, distancia):
        if self.combustible >= distancia / 2:
            self.posicion += distancia
            self.combustible -= distancia / 2
        else:
            print("No hay suficiente combustible")

    def agregar_combustible(self, cantidad):
        self.combustible += cantidad

    def obtener_combustible(self):
        return self.combustible
```

En este ejemplo, la clase `Auto` tiene dos responsabilidades:
1. Gestionar el movimiento del auto
2. Gestionar el combustible

### Ejemplo Correcto
```python
class TanqueCombustible:
    def __init__(self) -> None:
        self.combustible = 100

    def obtener_combustible(self):
        return self.combustible

    def agregar_combustible(self, cantidad):
        self.combustible += cantidad

    def usar_combustible(self, cantidad):
        self.combustible -= cantidad

class Auto:
    def __init__(self, tanque: TanqueCombustible) -> None:
        self.posicion = 0
        self.tanque = tanque

    def mover(self, distancia):
        if self.tanque.obtener_combustible() >= distancia / 2:
            self.posicion += distancia
            self.tanque.usar_combustible(distancia / 2)
            print(f"Se ha movido distancia: {distancia} ")
        else:
            print("No hay suficiente combustible")
```

Ahora cada clase tiene una única responsabilidad:
- `TanqueCombustible`: Gestiona el combustible
- `Auto`: Gestiona el movimiento

## O - Principio Abierto/Cerrado (Open/Closed Principle - OCP)

Las entidades de software deben estar abiertas para la extensión pero cerradas para la modificación.

### Ejemplo Correcto
```python
class Notificador:
    def __init__(self, usuario, mensaje) -> None:
        self.usuario = usuario
        self.mensaje = mensaje

    def notificar(self):
        raise NotImplementedError

class NotificadorEmail(Notificador):
    def notificar(self):
        print(f"Enviando email a: {self.usuario.email}")

class NotificadorSMS(Notificador):
    def notificar(self):
        print(f"Enviando SMS a: {self.usuario.sms}")

class NotificadorWhatsApp(Notificador):
    def notificar(self):
        print(f"Enviando Whatsapp a: {self.usuario.whatsapp}")
```

En este ejemplo, podemos agregar nuevos tipos de notificadores sin modificar el código existente, solo extendiendo la clase base `Notificador`.

## L - Principio de Sustitución de Liskov (Liskov Substitution Principle - LSP)

Si la clase B es una subclase de A, la clase A debería poder utilizarse en todos los lugares donde B pueda utilizarse.

### Ejemplo Incorrecto
```python
class Ave:
    def volar(self):
        return "Estoy volando"

class Pinguino(Ave):
    def volar(self):
        return "No puedo volar"  # Viola el principio LSP
```

### Ejemplo Correcto
```python
class Ave:
    pass

class AveVoladora(Ave):
    def volar(self):
        return "Estoy volando"

class AveNoVoladora(Ave):
    pass

class AveNadadora(Ave):
    def nadar(self):
        return "Estoy nadando"
```

## I - Principio de Segregación de Interfaces (Interface Segregation Principle - ISP)

Los clientes no deberían depender de interfaces que no utilizan.

### Ejemplo Incorrecto
```python
from abc import ABC, classmethod

class Trabajador(ABC):
    @abstractmethod
    def comer(self):
        pass

    @abstractmethod
    def dormir(self):
        pass

    @abstractmethod
    def trabajar(self):
        pass

class Robot(Trabajador):  # Viola el principio ISP
    def trabajar(self):
        return "Estoy trabajando"
```

### Ejemplo Correcto
```python
from abc import ABC, classmethod

class Trabajador(ABC):
    @abstractmethod
    def trabajar(self):
        pass

class Comedor(ABC):
    @abstractmethod
    def comer(self):
        pass

class Durmiente(ABC):
    @abstractmethod
    def dormir(self):
        pass

class Humano(Trabajador, Comedor, Durmiente):
    def comer(self):
        return "Estoy comiendo"
    def dormir(self):
        return "Estoy durmiendo"
    def trabajar(self):
        return "Estoy trabajando"

class Robot(Trabajador):
    def trabajar(self):
        return "El robot está trabajando"
```

## D - Principio de Inversión de Dependencias (Dependency Inversion Principle - DIP)

Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.

### Ejemplo Incorrecto
```python
class Diccionario:
    def verificar_palabra(self, palabra: str) -> bool:
        pass

class CorrectorOrtografico:
    def __init__(self):
        self.diccionario = Diccionario()  # Dependencia directa
```

### Ejemplo Correcto
```python
class VerificadorOrografico(ABC):
    @abstractmethod
    def verificar_palabra(self, palabra):
        pass

class Diccionario(VerificadorOrografico):
    def verificar_palabra(self, palabra: str) -> bool:
        pass

class ServicioOnline(VerificadorOrografico):
    def verificar_palabra(self, palabra: str) -> bool:
        pass

class CorrectorOrtograficoV2:
    def __init__(self) -> None:
        self.verificador = VerificadorOrografico()  # Dependencia de abstracción
```

## Beneficios de Aplicar los Principios SOLID

1. **Mantenibilidad**: El código es más fácil de mantener y modificar
2. **Flexibilidad**: El código es más flexible y adaptable a cambios
3. **Reutilización**: El código es más fácil de reutilizar
4. **Testabilidad**: El código es más fácil de probar
5. **Escalabilidad**: El código es más fácil de escalar

## Conclusión

Los principios SOLID son fundamentales para crear software de calidad. Aunque pueden parecer complejos al principio, su aplicación correcta lleva a un código más limpio, mantenible y robusto. Es importante recordar que estos principios son guías, no reglas estrictas, y deben aplicarse con sentido común según el contexto del proyecto.
