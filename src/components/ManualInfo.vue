<template>
    <transition name="fade">
        <div id="manual_info" v-if="activeManual">
            <div class="headline">
                <h2>Техническая информация</h2>
                <p>В этом окне вы можете ознакомиться с навигационными возможностями и производительностью вашей системы.</p>

            </div>
            <div class="control">
                <h3>Управление</h3>
                <p v-if="screenType == 'desktop'">
                    <img src="../assets/images/control.png" alt="Управление">
                </p>
                <p v-else>
                    Ваше устройство определено как мобильное!<br>На&nbsp;мобильных устройствах с&nbsp;сенсорными экранами некоторые функции навигации и&nbsp;визуализации недоступны!
                </p>
            </div>
            <div class="performance">
                <h3>Производительность</h3>
                <p v-if="actualPerformance == 'fast'" class="fast">Производительность вашего устройства оценена как <i>высокая</i>. <span>Все эффекты задействованы!</span></p>
                <p v-else-if="actualPerformance == 'normal'" class="normal">Производительность вашего устройства оценена как <i>удовлетворительная</i>. <span>Все эффекты задействованы, однако возможны задержки в&nbsp;анимации!</span></p>
                <p v-else-if="actualPerformance == 'middle'" class="middle">Тест показал, что ваше устройство имеет <i>недостаточную</i> производительность. <span>Некоторые эффекты отключены!</span></p>
                <p v-else-if="actualPerformance == 'slow'" class="slow">Тест выявил <i>серьезную недостаточность</i> производительности. <span>Страница отображается на минимально возможных настройках!</span></p>
                <p v-else-if="actualPerformance == 'veryslow'" class="veryslow">Тест выявил <i>серьезную недостаточность</i> производительности. <span>Страница отображается на минимально возможных настройках!</span></p>
                <p v-else>N/A</p>

                <div class="performance__detail">
                    <div>Текущая оценка: <b>{{ performanceLag }}</b></div>
                    <div class="note">
                        <div><b style="color:lime">&lt; 750</b> <span>Высокая <small>(Рабочие станции, ноутбуки, планшеты)</small></span></div>
                        <div><b style="color:orange">&gt; 750 — 1500</b> <span>Средняя <small>(Смартфоны, планшеты, устаревшие компьютеры)</small></span></div>
                        <div><b style="color:red">> 1500</b> <span>Низкая <small>(Устаревшие устройства, микрокомпьютеры)</small></span></div>
                    </div>
                </div>
            </div>
            <div class="accept">
                <button @click="$store.commit('setActiveManual', false)">Хорошо</button>
            </div>
            <div class="close" @click="$store.commit('setActiveManual', false)">&nbsp;</div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ManualInfo',

    props: {
        performanceLag: {
            type: Number
        },
        actualPerformance: {
            type: String
        }
    },

    data(){
        return {
            screenType: 'ontouchstart' in document ? 'mobile' : 'desktop',
        }
    },

    methods: {

    },


    computed: {
        activeManual(){
            return this.$store.state.activeManual;
        }
    },



}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

#manual_info {
    position: fixed;
    z-index: 12;
    background: radial-gradient(#000E, #111F);
    border:dotted 1px #fff5;
    box-shadow: 0 -15px 15px #000;
    left:25px;
    right:25px;
    top:25px;
    bottom:25px;
    padding: 3vw;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: default;
    transition: opacity 0.5s ease;



    h2, 
    h3 {
        font-family:'Myriad Pro', 'Proxima Nova';
        text-transform: uppercase;
        color: #f70;
        font-weight: normal;
    }

    h2 {
        font-size: 36px;
        margin:0;
        &::after {
            content: '';
            color: #fff;
            display: inline-block;
            transform: rotate(45deg);
            color: #fff;
            margin-left: 20px;
        }
    }

    h3 {
        font-size: 20px;
        margin-top: 45px;
    }

    .headline {
        width: 100%;
    }

    .control {
        width: 65%;
        max-width: 929px;
        img {
            width: 100%;
        }
    }

    .performance {
        width: calc(35% - 5vw);
        margin-left: 5vw;
        p {
            &.fast span::before {content: url(../assets/images/ok.png);}
            &.normal span::before {content: url(../assets/images/ok.png);}
            &.middle span::before {content: url(../assets/images/middle.png);}
            &.slow span::before,
            &.veryslow span::before {content: url(../assets/images/low.png);}
            span {
                display: block;
                margin-top: 15px;
                font-weight: 100;
                position: relative;
                padding-left: 40px;
                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 12px;
                    margin-top: -1px;
                }
            }
        }

        &__detail {
            margin-top: 25px;
            color: #aaa;
            div {
                margin-top: 7px;
            }
            .note {
                display: flex;
                justify-content:space-between;
                div {
                    width: 30%;
                    font-size: 15px;
                    b {
                        display: block;
                        margin-bottom: 7px;
                    }
                    small {
                        font-size: 13px;
                        display: block;
                        margin-top: 7px;
                    }
                }
            }
        }
    }

    .accept {
        width: 100%;
        text-align: center;
        padding-top:50px;
        button {
            background: none;
            border: solid 1px #fff9;
            border-radius: 5px;
            padding: 10px 25px;
            color: #fff;
            font-size: 18px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: 'Myriad Pro', 'Proxima Nova';
            text-shadow: 0 0 15px #00577c, 0 0 15px #00577c, 0 0 10px #006a97, 0 0 5px #0071a1;
            box-shadow: 0 0 29px #00577c, 0 0 20px #00577c, 0 0 10px #006f9e inset, 0 0 3px #00577c inset;
            transition: all 0.5s ease;
            cursor: pointer;
            &:hover {
                text-shadow: 0 0 15px #0f09, 0 0 15px #0f09, 0 0 10px #0f09, 0 0 5px #0f09;
                box-shadow: 0 0 29px #0f05, 0 0 20px #0f05, 0 0 10px #0f05 inset, 0 0 3px #0f05 inset;
                animation: wow 0.5s ease forwards;
            }
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        &::before,
        &::after {
            content:'';
            position: absolute;
            display:block;
            width: 30px;
            height: 2px;
            background: #fff;
            transform: rotate(45deg);
            top: 14px;
            left:0;
            box-shadow: 0 0 29px #00577c, 0 0 20px #00577c, 0 0 10px #00608a, 0 0 5px #006f9e, 0 0 2px #0072a3;
        }
        &::after {
            transform: rotate(-45deg);
        }
        &:hover {
            &::before,
            &::after {
                box-shadow: 0 0 29px #f00, 0 0 20px #f00, 0 0 10px #f00, 0 0 5px #f00, 0 0 2px #f00;
            } 
        }
    }
}

@keyframes wow {
    100% {transform: scale(1.1);}
    95% {transform: scale(1.125);}
    85% {transform: scale(1.075);}
    72% {transform: scale(1.15);}
    55% {transform: scale(1.05);}
    30% {transform: scale(1.2);}
}

</style>