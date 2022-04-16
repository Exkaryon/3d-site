export default {
    name: 'openator',

    mounted(el, binding, vnode){
        let tId = 0;
        let changeMode = false;
        el.addEventListener('mouseover', () => {
            if(!binding.instance.blockedSwitcher && !changeMode){
                el.classList.add('active');
                clearTimeout(tId);
            }
        });
        el.addEventListener('mouseout', () => {
            if(!changeMode){
                tId = setTimeout(() => {
                    el.classList.remove('active');
                }, 500);
            }
        });

        document.addEventListener('click', (event) => {
            const elem = event.target.closest('.themes_switcher [data-theme]');
            if(elem){
                if(elem.classList.contains('selected')){
                    return
                }else{
                    clearTimeout(tId);
                    changeMode = true;
                    tId = setTimeout(() => {
                        el.classList.remove('active');
                        changeMode = false;
                    }, 1000);
                };
            }else{
                clearTimeout(tId);
                el.classList.remove('active');
                changeMode = false;
            }
        });
    }
}