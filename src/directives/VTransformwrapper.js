export default {
    name: 'transformwrapper',
    mounted(el, binding, vnode){
        function calcRelativity(deg){
            return [
                Math.round(Math.cos(deg * Math.PI / 180) * 1000) / 1000,    // Y
                Math.round(Math.sin(deg * Math.PI / 180) * 1000) / 1000     // X
            ];
        }
        const inst = binding.instance;
        let moveStatus = false;                     // Статус перемещения/вращения (разрешающий флаг)
        let moveType = 'rotate';                    // По умолчанию Обертка вращается.
        let userEvents = {
            keydown: ['', 'keydown', (ev) => {
                        moveType = 'move';
                    }],
            keyup:  ['', 'keyup', (ev) => {
                        moveType = 'rotate';
                    }],
            press:  ['touchstart', 'mousedown', (ev) => {
                        ev.preventDefault();        // Отмена выделения элементов, когда водим мышью с зажатой кнопкой.
                        if(inst.actionsLock || ev.target.closest('#modal')) return; 
                        moveStatus = true;
                    }],
            up:     ['touchend', 'mouseup', () => {
                        moveStatus = false;
                        inst.wrapper.rotate.location = [0, 0];
                        inst.wrapper.move.location = [0, 0];
                    }],
            out:    ['touchcancel', 'mouseleave', () => {
                        moveStatus = false;
                    }],
            move:   ['touchmove', 'mousemove', (ev) => {
                        if(!moveStatus) return;
                        inst.wrapper[moveType].prevLoc[0] = inst.wrapper[moveType].location[0] || 0;
                        inst.wrapper[moveType].prevLoc[1] = inst.wrapper[moveType].location[1] || 0;
                        inst.wrapper[moveType].location = [
                            (ev.clientX != undefined) ? ev.screenX : ev.targetTouches[0].screenX,
                            (ev.clientY != undefined) ? ev.screenY : ev.targetTouches[0].screenY,
                        ];
                        if(moveType == 'move'){
                            if(inst.wrapper.move.prevLoc[0]){
                                inst.wrapper.move.translate[0] -= (inst.wrapper.move.prevLoc[0] - inst.wrapper.move.location[0]);
                                inst.wrapper.move.increment[0] =  (inst.wrapper.move.prevLoc[0] - inst.wrapper.move.location[0]);
                            }
                            if(inst.wrapper.move.prevLoc[1]){
                                inst.wrapper.move.translate[1] -= (inst.wrapper.move.prevLoc[1] - inst.wrapper.move.location[1]);
                                inst.wrapper.move.increment[1] =  (inst.wrapper.move.prevLoc[1] - inst.wrapper.move.location[1]);
                            }
                            inst.wrapper.CSS.props.transform.translateX[0] += 
                                                (inst.wrapper.move.increment[0] * calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateY[0]))[0] * -1) + 
                                                (inst.wrapper.move.increment[1] * calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateY[0]))[1]) * 
                                                calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateX[0]))[1] * -1; // X * Yy +  Y * Yx * Xx
                            inst.wrapper.CSS.props.transform.translateY[0] += inst.wrapper.move.increment[1] * calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateX[0]))[0] * -1;  
                            inst.wrapper.CSS.props.transform.translateZ[0] +=
                                                (inst.wrapper.move.increment[0] * calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateY[0]))[1] * -1) +
                                                (inst.wrapper.move.increment[1] * calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateX[0]))[1]) * 
                                                calcRelativity(Math.round(inst.wrapper.CSS.props.transform.rotateY[0]))[0];  // X * Yx + Y * Xx * Yy
                        }else{
                            if(inst.wrapper.rotate.prevLoc[0]){
                                inst.wrapper.rotate.degs[0] = inst.wrapper.roundDegs(inst.wrapper.rotate.degs[0] - (inst.wrapper.rotate.prevLoc[0] - inst.wrapper.rotate.location[0]) / 5);
                            }
                            if(inst.wrapper.rotate.prevLoc[1]){
                                inst.wrapper.rotate.degs[1] = inst.wrapper.roundDegs(inst.wrapper.rotate.degs[1] + (inst.wrapper.rotate.prevLoc[1] - inst.wrapper.rotate.location[1]) / 5);
                            }
                            inst.wrapper.CSS.props.transform.rotateY[0] = inst.wrapper.rotate.degs[0];
                            inst.wrapper.CSS.props.transform.rotateX[0] = inst.wrapper.rotate.degs[1];
                        }
                        inst.wrapper.CSS.text = inst.CSSTextCompilator(inst.wrapper.CSS.props);
                    }],
            scroll:  ['', 'wheel', (ev) => {
                        if(inst.actionsLock || ev.target.closest('.modal')) return;
                        inst.viewport.CSS.props.transform.scale[0] -= inst.viewport.CSS.props.transform.scale[0] > 1
                            ? ev.deltaY / 1000 * Math.sqrt(inst.viewport.CSS.props.transform.scale[0])
                            : ev.deltaY / 1000 * Math.pow(inst.viewport.CSS.props.transform.scale[0], 2);
                        inst.wrapper.CSS.props.transform.perspective[0] = Math.round(inst.wrapper.perspectiveSizeRelativity / inst.wrapper.perspectiveCoef) * ( 1 / inst.viewport.CSS.props.transform.scale[0]) * Math.sqrt(inst.viewport.CSS.props.transform.scale[0]);                    
                        inst.viewport.CSS.text = inst.CSSTextCompilator(inst.viewport.CSS.props);
                        inst.wrapper.CSS.text = inst.CSSTextCompilator(inst.wrapper.CSS.props);
                    }]
        }

        // Инициализация описанных событий.
        const eventKey = 'ontouchstart' in document ? 0 : 1;
        for (const action in userEvents) {
            let actionName = action;
            document.addEventListener(userEvents[action][eventKey], function (event){
                    userEvents[actionName][2](event);
            }, false); 
        }
    }
}