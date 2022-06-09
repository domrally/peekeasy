type Mapped<T> = T
const Mapped = {} as new <T>() => Mapped<T>
Mapped.constructor = () => {
	return {}
}

class Example {
	hello = 'world'
}

const example = new Mapped<Example>()
example.hello // the compiler thinks it is an Example
