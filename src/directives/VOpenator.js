export default {
    name: 'openator',

    mounted(el, binding, vnode){
        let tId = 0;
        el.addEventListener('mouseover', () => {
            el.classList.add('active');
            clearTimeout(tId);
        });
        el.addEventListener('mouseout', () => {
            tId = setTimeout(() => {
                el.classList.remove('active');
            }, 500);
        });
    }
}