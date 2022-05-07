import { assert } from 'console'

try {
    const thing = async () => {}
    thing()
} catch (e) {
    assert(false, '❌ svg runtime error')
}
