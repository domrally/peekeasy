import { html, render } from 'https://unpkg.com/lit-html?module'
import { asyncReplace } from 'https://unpkg.com/lit-html/directives/async-replace.js?module'
import { Mealy } from '../../src/mealy.js'
import { Moore } from '../../src/moore.js'

abstract class Complication implements PromiseLike<Complication> {
    
    private promise: PromiseLike<Complication | any> = Promise.reject()
    readonly then = () => this.promise
    protected resolve: (c: Complication) => void

    constructor() {
        (async () => {
            while (true) {
                this.promise = new Promise(r => this.resolve = r)
                await this.promise
            }
        })()
    }

    private _ms: number
    protected get milliseconds(): number {
        return this._ms
    }
    protected set milliseconds(ms: number) {
        this._ms = ms
    }

    abstract top(): void
    abstract split(): void
}

class Stopped extends Complication {
    top() {
        watching.isWatching = true
        this.resolve(watching)
    }
    split() {
        this.resolve(restarted)
    }
}
class Restarted extends Complication {
    constructor() {
        super()
        this.milliseconds = 0
    }
    top() {
        watching.isWatching = true
        this.resolve(watching)
    }
    split() {}
}
class Watching extends Complication {
    isWatching: boolean
    constructor() {
        (async () => {
            while (true) {
                const t = Date.now()
                await new Promise<void>(r => window.requestAnimationFrame(() => r()))
                if (!this.isWatching) continue
                this.milliseconds += Date.now() - t
                this.resolve(this)
            }
        })()
        super()
    }
    top() {
        this.isWatching = false
        this.resolve(stopped)
    }
    split() {
        this.resolve(lapped)
    }
}
class Lapped extends Complication {
    top() {
        this.resolve(stopped)
    }
    split() {
        this.resolve(watching)
    }
}

const restarted = new Restarted()
const stopped = new Stopped()
const watching = new Watching()
const lapped = new Lapped()

const moore = new Moore<Complication>()
const mealy = new Mealy(restarted, stopped, watching, lapped)
const stopwatch = new Proxy({ ...restarted, ...mealy }, mealy)
// Define a template
const template = html`
<span>${asyncReplace(stopwatch)}</span>
<button @click="${stopwatch.top()}">top</button>
<button @click="${stopwatch.split()}">split</button>
`
// Render the template to the document
render(template, document.body)
