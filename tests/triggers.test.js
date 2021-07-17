// 
export const assertTriggers = async () => {
    const A = Symbol('A');
    const B = Symbol('B');
    const Triggers = Object.freeze({
        A,
        B,
    });
    const shouldFail = (triggers) => {
        throw new Error('❌ Expected shouldFail to fail, but it threw success');
    };
    const shouldPass = (triggers) => {
    };
    try {
        shouldPass(Triggers.A);
    }
    catch (error) {
        throw new Error(`❌ Expected shouldPass to pass, but it threw ${error}`);
    }
    try {
        shouldFail(Symbol('B'));
    }
    catch (error) {
    }
};
