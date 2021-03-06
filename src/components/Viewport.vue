<template>
    <div id="viewport" :style="viewport.CSS.text" :class="{collapse_fragments: $store.state.changeThemeProcess.fragmentsAnimation}">
        <div class="wrapper" :style="wrapper.CSS.text" v-transformwrapper>

            <section v-for="cube in $store.state.content" :key="cube.name" :class="['cube', cube.name]" :style="[cubes.CSS.text.common, cubes.CSS.text.stack[cube.name]]" @click="$store.dispatch('interactiveNavi', $event.target)">
                <article v-for="(article, sideName) in cube.sides" :key="sideName" :class="sideName" :data-name="article.name" :style="cubes.sidesCSS[sideName]">
                    <h2 v-show="article.title">{{article.title}}<span>2010 — 2012</span></h2>
                    <div v-html="article.description"></div>
                    <button v-show="article.title">Подробнее</button>
                </article>
            </section>

            <fragments
                :contentLoaded="contentLoaded"
                :actualPerformance="actualPerformance"
                :viewportData="{win: win, cubes: {size: cubes.size, CSSprops: cubes.CSS.props.stack}}"
                :randomizer="randomizer"
                :CSSTextCompilator="CSSTextCompilator"
            />
            
        </div>
    </div>
</template>

<script>
import Fragments from '@/components/ViewportElements/Fragments.vue';

export default {
    components: {Fragments},

    name: 'Viewport',

    props: {
        contentLoaded: {
            type: Boolean,
        },
        actualPerformance: {
            type: String
        }
    },


data(){
        return {
            win: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            transTime: {
                ids: {
                    navi: null,
                    modal: null,
                },
                intro: 7,
                navi: 1.5,
            },
            viewport: {
                transformStates: {
                    beforeIntro: {                  // Настоящие (current) параметры трансформации обертки. Установленные значения - начальные параметры для intro.
                        scale: [0.05, '']
                    },
                    defaultOverview: {              // Опорные и конечные для Intro параметры трансформации.
                        scale: [0.401, '']
                    },
                    fulcrum: {
                        scale: [0.4, '']
                    },
                },
                CSS: {
                    props: {},
                    text: ''
                }
            },

            wrapper: {
                perspectiveCoef: 1.3,      // Коэффициент умножения для перспективы
                perspectiveSizeRelativity: 0,
                rotate: {                  // Рассчетные параметры вращения по осям Y и X для Wrapper
                    location:  [0,0],
                    prevLoc:   [0,0],
                    degs:      [0,0],      // Y,X
                },
                move: {                    // Рассчетные параметры перемещения Обертки по осям X и Y.
                    location:  [0,0],
                    prevLoc:   [0,0],
                    translate: [0,0],
                    increment: [0,0],
                },
                roundDegs: function(deg){
                    if(deg >= 360){
                        deg = deg - 360;
                    }else if(deg < 0){
                        deg = deg + 360;
                    }
                    return deg;
                },
                transformStates: {
                    beforeIntro: {                  // Настоящие (current) параметры трансформации обертки. Установленные значения - начальные параметры для intro (Порядок имеет значение!).
                        perspective: [6500, 'px'],
                        rotateX: [270, 'deg'],
                        rotateY: [410, 'deg'],
                        rotateZ: [0, 'deg'],
                        translateX: [0, 'px'],
                        translateY: [0, 'px'],
                        translateZ: [0, 'px'],
                    },
                    defaultOverview: {              // Опорные и конечные для Intro параметры трансформации (Порядок имеет значение!).
                        perspective: [2350, 'px'],
                        rotateX: [340, 'deg'],
                        rotateY: [35, 'deg'],
                        rotateZ: [0, 'deg'],
                        translateX: [0, 'px'],
                        translateY: [0, 'px'],
                        translateZ: [0, 'px'],
                    },
                    fulcrum: {
                        perspective: [2351, 'px'],
                        rotateX: [340, 'deg'],
                        rotateY: [35, 'deg'],
                        rotateZ: [0, 'deg'],
                        translateX: [0, 'px'],
                        translateY: [0, 'px'],
                        translateZ: [0, 'px'],
                    },
                },
                CSS: {
                    props: {},
                    text: ''
                },
            },

            cubes: {
                sizeCoef: 0.5,             // Коэффициент умножения для размера кубов по умолчанию (1 = половина наименьшего значения вьюпорта (ширины или высоты))
                size: 0,                   // Размеры кубов. Определяется при монтировании.
                sidesCSS: {
                    back:   'rotateX(-180deg) translate3d(0, 0, calc(--cubesWidth / 2));',
                    top:    'rotateX(90deg) translate3d(0, 0, calc(--cubesWidth / 2));',
                    front:  'translate3d(0, 0, calc(--cubesWidth / 2));',
                    bottom: 'rotateX(-90deg) translate3d(0, 0, calc(--cubesWidth / -2 + --cubesWidth));',
                    left:   'rotateY(-90deg)  translate3d(0, 0, calc(--cubesWidth / 2));',
                    right:  'rotateY(90deg) translate3d(0, 0, calc(--cubesWidth / 2));'
                },
                orientations: {            // Углы отлонения по осям для выбранных граней. Первый элемент - порядок присвоения значений по осям.
                    front:  ['YXZ', 0,   0,   0],
                    bottom: ['YXZ', 0,   270, 0],
                    back:   ['YXZ', 0,   180, 0],
                    top:    ['YXZ', 0,   90,  0],
                    left:   ['YZX', 270, 0,   0],
                    right:  ['YZX', 270, -180, -180]
                },
                CSS: {
                    props: {
                        common: {},
                        stack: {},
                    },
                    text: {
                        common: '',
                        stack: {},
                    }
                }
            },
        };
    },


    methods: {
        randomizer(min, max, signed) {
            if(!signed){
                return Math.floor(min + Math.random() * (max + 1 - min));
            }else{
                let sign = Math.round(Math.random()) ? -1 : 1; 
                return Math.floor( (min + Math.random() * (max + 1 - min)) * sign);
            }
        },


        transformPropsСloner(transformState){
            let clone = {};
            for (const propName in transformState) {
                clone[propName] = Object.assign([], transformState[propName]);
            }
            return clone;
        },


        CSSTextCompilator(props){
            const getValueStr = (prps, separator = ' ') => {
                let params =  Object.assign([], prps);
                let unit = params.pop();
                let valueStr = params.reduce(function(sum, current, index, arr) {
                    current = typeof current !== 'string' && unit == 'px' ? Math.round(current) : current;
                    return sum + current + unit + ((index < arr.length - 1 ) ? separator : '');
                }, '');
                return valueStr;
            };
            let CSSText = '';
            for (const prop in props) {
                if(Array.isArray(props[prop])){
                    CSSText += `${prop.replace(/[A-Z]/g, "-$&").toLowerCase()}: ${getValueStr(props[prop])}; `;
                }else{
                    let str = '';
                    for (const part in props[prop]) {
                        str += `${part}(${getValueStr(props[prop][part], ', ')}) `;
                    }
                    CSSText += `${prop.replace(/[A-Z]/g, "-$&").toLowerCase()}: ${str}; `;
                }
            }
            return CSSText;
        },


        buildCubes(){
            // Определение соотношения сторон и соответсвующие расчеты для размеров кубов.
            if(this.win.width > this.win.height){
                this.cubes.size = Math.round(this.win.height - this.win.height / (this.cubes.sizeCoef + 1));
            }else{
                this.cubes.sizeCoef = 414 * 1.5 / this.win.width;
                this.cubes.size = Math.round(this.win.width - this.win.width / (this.cubes.sizeCoef + 1));
            }
            // Общие параметры кубов
            this.cubes.CSS.props.common = {
                fontSize: [Math.round(this.cubes.size * 18 / 450), 'px'],
                width: [this.cubes.size, 'px'],
                height: [this.cubes.size, 'px'],
            };
            // Параметры трансформации
            for (const side in this.cubes.sidesCSS) {
                this.cubes.sidesCSS[side] = `transform: ${this.cubes.sidesCSS[side].replace(/--cubesWidth/g, this.cubes.size+'px')}; padding: ${Math.round(this.cubes.size * 25 / 400)}px;`;
            }
            this.cubes.CSS.text.common = this.CSSTextCompilator(this.cubes.CSS.props.common);
        },


        positioningCubes(){
            for (const cubeName in this.$store.state.content){
                const el = this.$store.state.content[cubeName];
                const pos  = {
                    x: this.cubes.size * el.offset.x + this.win.width / 2 - this.cubes.size / 2,
                    y: this.cubes.size * el.offset.y + this.win.height / 2 - this.cubes.size / 2,
                    z: this.cubes.size * el.offset.z,
                };
                this.cubes.CSS.props.stack[el.name] = {
                    transformOrigin: [pos.x + this.cubes.size / 2, pos.y + this.cubes.size / 2, pos.z, 'px'],
                    transform: {
                        rotateX: [0, 'deg'],
                        rotateY: [0, 'deg'],
                        rotateZ: [0, 'deg'],
                        translate3d: [pos.x, pos.y, pos.z, 'px'] 
                    },
                };
                this.cubes.CSS.text.stack[el.name] = this.CSSTextCompilator(this.cubes.CSS.props.stack[el.name]);
            }
        },


        wrapperPreparation(){
            this.wrapper.perspectiveSizeRelativity = this.win.width > this.win.height ? this.win.width : this.win.height;
            this.wrapper.rotate.degs[0] = this.wrapper.transformStates.beforeIntro.rotateY[0];
            this.wrapper.rotate.degs[1] = this.wrapper.transformStates.beforeIntro.rotateX[0];
            this.wrapper.CSS.props = {
                transformOrigin: [
                    this.win.width / 2,
                    this.win.width > this.win.height ? this.win.height / 2 + this.cubes.size * (1 / this.cubes.sizeCoef) : this.win.height - this.cubes.size + this.win.height / 2,
                    0,
                    'px'
                ],
                top: [
                    this.win.width > this.win.height ? this.cubes.size * (-1 / this.cubes.sizeCoef) : this.win.height * -1  + this.cubes.size,
                    'px'
                ],
                transform: this.transformPropsСloner(this.wrapper.transformStates.beforeIntro)
            };
            this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
        },


        viewportPreparation(){
            this.viewport.CSS.props = {
                transform: this.transformPropsСloner(this.viewport.transformStates.beforeIntro)
            };
            this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
        },


        async intro(){
            this.$store.commit('setActionsLock', true);
            await new Promise((resolve, reject) => setTimeout(resolve, 100));
            // Изменить настоящие параметры для вьюпорта и обертки равные конечному положению анимации (опорному положению обзора).
            Object.assign(this.viewport.CSS.props, {
                transform: this.transformPropsСloner(this.viewport.transformStates.defaultOverview),
                transition: ['all '+this.transTime.intro+'s cubic-bezier(0.46, -0.05, 0.59, 0.99)', '']
            });
            Object.assign(this.wrapper.CSS.props, {
                transform: this.transformPropsСloner(this.wrapper.transformStates.defaultOverview),
                transition: ['all '+this.transTime.intro+'s cubic-bezier(0.46, -0.05, 0.59, 0.99)', '']
            });
            // Установить рассчетные параметры вращения обертки соответственно текущим параметрам трансформации.
            this.wrapper.rotate.degs[0] = this.wrapper.CSS.props.transform.rotateY[0];
            this.wrapper.rotate.degs[1] = this.wrapper.CSS.props.transform.rotateX[0];
            // Применить трансформацию к элементам.
            this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
            this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
            // Подождать проигрывание перехода.
            this.transTime.ids.navi = setTimeout(() => {
                this.$store.commit('setActionsLock', false);
                delete this.viewport.CSS.props.transition;
                delete this.wrapper.CSS.props.transition;
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
            }, this.transTime.intro * 1000);
        },


        transitionToCube(){
            if(!this.currentCube) return;
            if(this.actionsLock) clearTimeout(this.transTime.ids.navi);
            this.$store.commit('setActionsLock', true);
            this.$store.commit('setCurrentCubeMenu', null);

            const offset = this.$store.state.content[this.currentCube].offset;
            // Центрирование выбранного куба во viewport смещением wrapper.
            this.wrapper.CSS.props.transform.translateX[0] = offset.x * -this.cubes.size;
            this.wrapper.CSS.props.transform.translateY[0] = offset.y * -this.cubes.size;
            this.wrapper.CSS.props.transform.translateZ[0] = offset.z * -this.cubes.size;
            // Небольшой поворот wrapper при переходах
            this.wrapper.rotate.degs[0] += this.randomizer(0, 25, true);
            this.wrapper.rotate.degs[1] += this.randomizer(0, 15, true);
            this.wrapper.CSS.props.transform.rotateY[0] = this.wrapper.rotate.degs[0];
            this.wrapper.CSS.props.transform.rotateX[0] = this.wrapper.rotate.degs[1];
            // Возвращение перспективы обертки в исходное значение и применение трансформацици к элементам.
            this.wrapper.CSS.props.transform.perspective[0] = Math.round(this.wrapper.perspectiveSizeRelativity / this.wrapper.perspectiveCoef);
            // Возвращение масштаба в исходное значение.
            this.viewport.CSS.props.transform.scale[0] = 1;
            // Установка параметров перехода перед обновлением CSS свойств.
            this.wrapper.CSS.props.transition = ['all '+this.transTime.navi+'s ease', ''];
            this.viewport.CSS.props.transition = ['all '+this.transTime.navi+'s ease', ''];
            this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
            this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);

            this.transTime.ids.navi = setTimeout(() => {
                this.$store.commit('setActionsLock', false);
                this.$store.commit('setCurrentCubeMenu', this.currentCube);
                delete this.viewport.CSS.props.transition;
                delete this.wrapper.CSS.props.transition;
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
            }, this.transTime.navi * 1000);
        },


        toFulcrum(){
            if(this.actionsLock) clearTimeout(this.transTime.ids.navi);
            this.$store.commit('setActionsLock', true);
            this.$store.commit('setCurrentCubeMenu', null);

            this.wrapper.rotate.degs[0] = this.wrapper.transformStates.defaultOverview.rotateY[0];
            this.wrapper.rotate.degs[1] = this.wrapper.transformStates.defaultOverview.rotateX[0];
            Object.assign(this.viewport.CSS.props, {
                transform: this.transformPropsСloner(Object.assign(this.viewport.CSS.props.transform, this.viewport.transformStates.fulcrum)),
                transition: ['all '+this.transTime.navi+'s ease', '']
            });
            Object.assign(this.wrapper.CSS.props, {
                transform: this.transformPropsСloner(this.wrapper.transformStates.fulcrum),
                transition: ['all '+this.transTime.navi+'s ease', '']
            });
            this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
            this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);

            this.transTime.ids.navi = setTimeout(() => {
                this.$store.commit('setActionsLock', false);
                delete this.viewport.CSS.props.transition;
                delete this.wrapper.CSS.props.transition;
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
            }, this.transTime.navi * 1000);
        },


        cubeRotation(edge){
            let edgeData = Object.assign([], this.cubes.orientations[edge]);
            let sequence = edgeData.shift();
            let newTransform = {};
            edgeData.forEach((value, index) => {
                if(index < 2){
                    value = 360 - this.wrapper.rotate.degs[index] - value;
                }
                delete this.cubes.CSS.props.stack[this.currentCube].transform['rotate'+sequence[index]];   // Заменяемые свойства из оригинального объекта необходимо удалить.
                newTransform['rotate'+sequence[index]] = [value, 'deg'];
            });
            this.cubes.CSS.props.stack[this.currentCube].transform = Object.assign(newTransform, this.cubes.CSS.props.stack[this.currentCube].transform);
            this.cubes.CSS.text.stack[this.currentCube] = this.CSSTextCompilator(this.cubes.CSS.props.stack[this.currentCube]);
        },


        modalStateActivator(modalState){
            if(modalState){
                this.viewport.CSS.props.transform = {
                    translateX: [-25, '%'],
                    scale: [this.viewport.CSS.props.transform.scale[0], '']
                }
            }else{
                delete this.viewport.CSS.props.transform.translateX;
            }
            this.viewport.CSS.props.transition = ['all '+this.transTime.navi+'s ease', ''];
            if(this.actionsLock){
                clearTimeout(this.transTime.ids.navi);
                this.wrapper.CSS.props.transition = ['all '+this.transTime.navi+'s ease', ''];
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
                this.$store.commit('setCurrentCubeMenu', this.currentCube);
                this.transTime.ids.navi = setTimeout(() => {
                    this.$store.commit('setActionsLock', false);
                    delete this.viewport.CSS.props.transition;
                    delete this.wrapper.CSS.props.transition;
                    this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                    this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
                }, this.transTime.navi * 1000);
            }else{
                clearTimeout(this.transTime.ids.modal)
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.transTime.ids.modal = setTimeout(() => {
                    delete this.viewport.CSS.props.transition;
                    this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                }, this.transTime.navi * 1000);
            }
        },


        toChangeThemeViewpoint(viewpoint){
            if(this.actionsLock) clearTimeout(this.transTime.ids.navi);
            this.$store.commit('setActionsLock', true);

            if(viewpoint){
                const viewportCSSProps = {
                    transform: { scale: [0.5, ''] },
                    transition: ['all '+this.$store.state.changeThemeProcess.transitionTime+'s ease', '']
                };
                const wrapperCSSProps = Object.assign({}, this.wrapper.CSS.props, {
                    transform: {
                        perspective: [2000, 'px'],
                        rotateX: [10 + (this.wrapper.CSS.props.transform.rotateX[0] > 180 ? 360 : 0), 'deg'],
                        rotateY: [10 + (this.wrapper.CSS.props.transform.rotateY[0] > 180 ? 360 : 0), 'deg'],
                        rotateZ: [0, 'deg'],
                        translateX: [0, 'px'],
                        translateY: [0, 'px'],
                        translateZ: [0, 'px'],
                    },
                    transition: ['all '+this.$store.state.changeThemeProcess.transitionTime+'s ease', '']
                });
                this.viewport.CSS.text = this.CSSTextCompilator(viewportCSSProps);
                this.wrapper.CSS.text = this.CSSTextCompilator(wrapperCSSProps);
                this.transTime.ids.navi = setTimeout(() => {
                    delete viewportCSSProps.transition;
                    delete wrapperCSSProps.transition;
                    this.viewport.CSS.text = this.CSSTextCompilator(viewportCSSProps);
                    this.wrapper.CSS.text = this.CSSTextCompilator(wrapperCSSProps);
                }, this.$store.state.changeThemeProcess.transitionTime * 1000);
            }else{
                this.viewport.CSS.props.transition = ['all '+this.$store.state.changeThemeProcess.transitionTime+'s ease', ''];
                this.wrapper.CSS.props.transition = ['all '+this.$store.state.changeThemeProcess.transitionTime+'s ease', ''];
                this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
                this.transTime.ids.navi = setTimeout(() => {
                    this.$store.commit('setActionsLock', false);
                    delete this.viewport.CSS.props.transition;
                    delete this.wrapper.CSS.props.transition;
                    this.viewport.CSS.text = this.CSSTextCompilator(this.viewport.CSS.props);
                    this.wrapper.CSS.text = this.CSSTextCompilator(this.wrapper.CSS.props);
                }, this.$store.state.changeThemeProcess.transitionTime * 1000);
            }
        }
    },


    computed: {
        currentCube(){
            return this.$store.state.selectedCube;
        },
        fulcrum(){
            return this.$store.state.fulcrum;
        },
        actionsLock(){
            return this.$store.state.actionsLock;
        },
        activeCubeSide(){
            return this.$store.state.activeCubeSide;
        },
        modalActive(){
            return this.$store.state.activeModal;
        },
        changeThemeViewpoint(){
            return this.$store.state.changeThemeProcess.viewpoint;
        }
    },


    watch: {
        contentLoaded(){
            this.buildCubes();
            this.positioningCubes();
            this.wrapperPreparation();
            this.viewportPreparation();
            this.intro();
        },

        currentCube(){
            this.transitionToCube();
        },

        activeCubeSide(nVal){
            if(nVal) this.cubeRotation(nVal);
        },

        fulcrum(){
            this.toFulcrum();
        },

        modalActive(nVal){
            this.modalStateActivator(nVal);
        },

        changeThemeViewpoint(nVal){
            this.toChangeThemeViewpoint(nVal);
        }
    },
}
</script>




<style lang="scss">
#viewport {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom:0;
        display: flex;
        align-items: center;
        transform-style: preserve-3d;
        .cube {
            transform-style: preserve-3d;
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0, 0, 0);
            position: absolute;
            left:0px;
            transition: transform 1.5s ease;
            cursor: default;
            font-size: 18px;
            & > article {
                height: 100%;
                width: 100%;
                position: absolute;
                padding: 25px;
                box-sizing: border-box;
                transition: box-shadow 0.5s ease;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                transform-style: preserve-3d;
                /* overflow: hidden; - создает проблему недосягаемости грани для курсора при определенных оборотах куба */
                background: linear-gradient(0deg, #0c1118, #111b29);
                border:solid 1px #f00;
                h2 {
                    font-size: 140%;
                    font-weight: 300;
                    letter-spacing: 0.03em;
                    width: 100%;
                    margin: 0;
                    text-transform: uppercase;
                    span {
                        display: none;
                    }
                }
                div {
                    width: 100%;
                }
                p {
                    font-size: 120%;
                    line-height: 130%;
                    margin:1.5em 0;
                    font-weight: 100;
                    letter-spacing: 0.05em;
                    word-spacing: 0.1em;
                    a {
                        color: #fff;
                        font-weight: 100;
                        text-decoration: none;
                        border-bottom: solid 1px #fff9;
                        position: relative;
                        transition: all 0.5s ease;
                        &:hover {
                            border-bottom-color: #0dc1;
                            color: #0dc;
                        }
                    }
                }
                button {
                    display: block;
                    max-width: 160px;
                    text-align: center;
                    padding: 0.8em 1.5em;
                    margin: 0;
                    border: none;
                    position: relative;
                    transform: translateZ(5px);
                    transform-style: preserve-3d;
                    border-radius: 5px;
                    transition: all 0.5s ease;
                    cursor: pointer;
                    font-size: 80%;
                    font-weight: 100;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    outline: none;
                    &::before {
                        position: absolute;
                        content: '';
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        transform: translateZ(-5px) translateX(-5px) translateY(-5px);
                        border-radius: 5px;
                        transition: all 0.5s ease;
                    }
                    &:hover {
                        transform: translateZ(10px) translateX(2px) translateY(3px);
                        &::before {
                            transform: translateZ(-10px) translateX(-10px) translateY(-10px);
                            top: -2px;
                            right: -2px;
                            bottom: -2px;
                            left: -2px;
                            filter: blur(2px);
                        }
                    }
                }
            }
        }
    }
}


/* THEMES IN PERFORMANCE VARS */
.max {
    &.mix {
        #viewport{
            .wrapper {
                .cube {
                    > article {
                        background: url(/img/light_cube.jpg) center center no-repeat;
                        background-size: cover;
                        box-shadow: 0 0 45px #000 inset, 0 0 45px #f505;
                        text-shadow: 0 0 5px #000;
                        border: none;
                        &:hover > article {
                           box-shadow: 0 0 45px #0005 inset, 0 0 15px #f00;
                        }
                        h2 {
                            font-family: Boxed;
                        }
                        button {
                            color: #fff;
                            background: #035;
                            border: solid 1px #0005;
                            &::before {
                                background: #000;
                                box-shadow: 0 0 10px #000;
                            }
                            &:hover {
                                border: solid 1px #f009;
                            }
                        }
                    }
                }
            }
        }
    }

    &.autumn {
        #viewport{
            .wrapper {
                .cube {
                    > article {
                        background: url(../assets/images/old_paper.jpg) center center no-repeat;
                        background-size: cover;
                        font-family: 'Bad Script';
                        letter-spacing: 0.05em;
                        white-space: normal;
                        color: #322;
                        text-shadow: 0 0 2em #fff;
                        font-weight: bold;
                        align-items: center;
                        border: none;
                        h2 {
                            text-align: center;
                            font-weight: bold;
                            text-shadow: 0 0 1px #000;
                        }
                        p {
                            font-weight: bold;
                            margin: 1em 0;
                        }
                        button {
                            color: #322;
                            background: url(../assets/images/button.png) center center no-repeat;
                            font-family: 'Bad Script';
                            border: none;
                            background-size: contain;
                            line-height: 100%;
                            font-weight: bold;
                            text-transform: lowercase;
                            font-size: 1.2em;
                            border-radius: 0;
                            &::before {
                                background: #000c;
                                box-shadow: 0 0 10px #000;
                                border-radius: 0;
                                filter: blur(5px);
                            }
                            &:hover::before {
                                filter: blur(10px);
                            }
                        }
                    }
                }
            }
        }
    }

    &.winter {
        #viewport{
            .wrapper {
                .cube {
                    > article {
                        background: url(/img/light_cube.jpg) center center no-repeat;
                        background-size: cover;
                        box-shadow: 0 0 45px #000 inset, 0 0 45px #e6111c55;
                        border: none;
                        &:hover > article {
                            box-shadow: 0 0 45px #0005 inset, 0 0 15px #5000aa;
                            text-shadow: 0 0 5px #000;
                        }
                        h2 {
                            font-family: Boxed;
                        }
                        button {
                            color: #fff;
                            background: none;
                            border: solid 1px #fff7;
                            box-shadow: 0 0 5px #5000aa, 0 0 12px #5000aa, 0 0 12px #5000aa inset, 0 0 5px #5000aa inset;

                            &::before {
                                background: #000;
                                box-shadow: 0 0 10px #000;
                                filter: blur(5px);
                            }
                            &:hover {
                                box-shadow: 0 0 5px #e6111c, 0 0 12px #e6111c, 0 0 12px #e6111c inset, 0 0 5px #e6111c inset;
                            }
                        }
                    }
                }
            }
        }
    }


    &.spring-summer {
        #viewport{
            .wrapper {
                .cube {
                    > article {
                        background: url(../assets/images/old_paper.jpg) center center no-repeat;
                        background-size: cover;
                        font-family: 'Bad Script';
                        letter-spacing: 0.05em;
                        white-space: normal;
                        color: #322;
                        text-shadow: 0 0 2em #fff;
                        font-weight: bold;
                        align-items: center;
                        border: none;
                        h2 {
                            text-align: center;
                            font-weight: bold;
                            text-shadow: 0 0 1px #000;
                        }
                        p {
                            font-weight: bold;
                            margin: 1em 0;
                        }
                        button {
                            color: #322;
                            background: url(../assets/images/button.png) center center no-repeat;
                            font-family: 'Bad Script';
                            border: none;
                            background-size: contain;
                            line-height: 100%;
                            font-weight: bold;
                            text-transform: lowercase;
                            font-size: 1.2em;
                            border-radius: 0;
                            &::before {
                                background: #000c;
                                box-shadow: 0 0 10px #000;
                                border-radius: 0;
                                filter: blur(5px);
                            }
                            &:hover::before {
                                filter: blur(10px);
                            }
                        }
                    }
                }
            }
        }
    }
}


.middle {
    &.mix {
        #viewport {
            .wrapper {
                .cube > article {
                    background: url(/img/light_cube.jpg) center center no-repeat;
                    background-size: cover;
                    border: none;
                    button {
                        color: #fff;
                        background: #035;
                        border: solid 1px #0005;
                        &::before {
                            background: #000;
                        }
                        &:hover {
                            border: solid 1px #f009;
                        }
                    }
                }
            }
        }
    }

    &.autumn,
    &.spring-summer {
        #viewport {
            .wrapper {
                .cube > article {
                    background: url(../assets/images/old_paper.jpg) center center no-repeat;
                    background-size: cover;
                    font-family: 'Bad Script';
                    letter-spacing: 0.05em;
                    white-space: normal;
                    color: #322;
                    text-shadow: 0 0 25px #fff;
                    font-weight: bold;
                    align-items: center;
                    border: none;
                    h2 {
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        text-shadow: 0 0 1px #000;
                    }
                    p {
                        font-size: 16px;
                        line-height: 140%;
                        margin:10px 0 14px;
                        letter-spacing: normal;
                        font-weight: bold;
                        white-space: normal;
                    }
                    button {
                        color: #322;
                        background: url(../assets/images/button.png) center center no-repeat;
                        font-family: 'Bad Script';
                        border: none;
                        background-size: contain;
                        line-height: 100%;
                        font-weight: bold;
                        text-transform: lowercase;
                        font-size: 15px;
                        border-radius: 0;
                        &::before {
                            background: #000c;
                            box-shadow: 0 0 10px #000;
                            border-radius: 0;
                            filter: blur(5px);
                        }
                        &:hover::before  {
                            filter: blur(10px);
                        }
                    }
                }
            }
        }
    }

    &.winter {
        #viewport {
            .wrapper {
                .cube > article {
                    background: url(/img/light_cube.jpg) center center no-repeat;
                    background-size: cover;
                    border: none;
                    button {
                        color: #fff;
                        background: none;
                        border: solid 1px #fff7;
                        &::before {
                            background: #000;
                            box-shadow: 0 0 10px #000;
                            filter: blur(5px);
                        }
                    }
                }
            }
        }
    }

}
</style>