export function Selector(){let n;function l(l){n=l}return l.get=(l,t)=>(null!=n||(n=l),n[t]),l.set=(l,t,e)=>(null!=n||(n=l),n[t]=e,!0),l.apply=(l,t,e)=>{null!=n||(n=l);return n.bind(t)(...e)},l}