type Mapped<T> = T
const Mapped = function () {} as unknown as new <T>() => Mapped<T>

class Example {
	hello = 'world'
}

const example = new Mapped<Example>()
example.hello // the compiler thinks it is an Example
