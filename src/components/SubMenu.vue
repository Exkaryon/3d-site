<template>
    <div id="submenu" ref="smHeap">
        <div v-for="menu in $store.state.content" :key="menu.name" :data-section="menu.name" :class="{ show: $store.state.currentCubeMenu == menu.name }">
            <a v-for="(side, index) in menu.sides" :key="index" :href="'#'+index" :data-name="side.name" v-show="side.name" @click.prevent="$store.dispatch('linkNavi', $event.target)">{{side.title}}</a>
        </div>
    </div>
</template>


<script>
export default {
    name: 'SubMenu',

    props: {

    },

    updated(){
        let smenu;
        for (const elem of Array.from(this.$refs.smHeap.children)) {
            if(elem.dataset.section == this.$store.state.currentCubeMenu){
                smenu = Array.from(elem.children);
                break;
            }
        }
        if(!smenu) return;
        smenu.forEach(link => link.classList.remove('arrival'));
        let timeout = 0;
        smenu.forEach(link => {
            setTimeout(() => {
                link.classList.add('arrival');
            }, timeout)
            timeout += 50;
        });
    }
}
</script>


<style lang="scss">
#submenu {
    font-family: Boxed;
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    div {
        flex-wrap: wrap;
        justify-content: center;
        white-space: nowrap;
        margin: auto;
        display: none;
        padding: 20px 0 5px;
        position: relative;
        background: linear-gradient(90deg, #0000, #000, #0000);
        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: -20%;
            right: 0;
            height: 1px;
            width: 140%;
            background: linear-gradient(90deg, #fff0, #fff, #fff0);
        }
        &::after {
            content: '';
            display: block;
            position: absolute;
            top: -2px;
            left: -20%;
            right: 0;
            height: 5px;
            width: 140%;
            filter: blur(5px);
        }
        a {
            margin: 0 20px 15px;
            display: inline-block;
            color: #fff;
            text-decoration: none;
            transition: text-shadow 0.5s ease;
            position: relative;
            sup {
                position: absolute;
                left: 50%;
                top: -40px;
                text-align: center;
                display: block;
                font-weight: normal;
                font-size: 12px;
                transform: scale(0.1) translateX(-100%);
                opacity: 0;
                transition: all 0.5s ease;
            }
            &:hover sup {
                transform: scale(1)  translateX(-50%);
                opacity: 1;
            }
            &:after {
                content:'';
                display: block;
                position: absolute;
                height:1px;
                bottom:-2px; left:0; right:0;
                z-index: -1;
            }
            &.arrival {
                animation: arrival 0.5s ease forwards;
            }
        }
        &.show {
            display: flex;
            animation: submenushow 0.5s ease;
        }
    }
}

@keyframes submenushow {
    100% {transform: scale(1);}
    0% {transform: scale(0.1);}
}

@keyframes arrival {
    100% {transform: translateY(0) scale(1);}
    0% {transform: translateY(-250px) scale(0.1);}
}


/* RESPONSIVE */
@media (max-width:767px){
    #submenu div a {
        margin: 0 15px 15px;
        font-size: 14px;
        sup {
            display: none;
        }
    }
}

@media (max-width:359px){
    #submenu div {
        padding: 15px 0 5px;
        a {
            margin: 0 15px 10px;
            font-size: 14px;
        }
    }
}


/* THEMES IN PERFORMANCE VARS */
.max {
    &.mix {
        #submenu {
            a {
                text-shadow:
                    0 0 38px #059,
                    0 0 28px #059,
                    0 0 24px #059,
                    0 0 20px #059,
                    0 0 16px #059,
                    0 0 12px #059,
                    0 0 8px  #059,
                    0 0 4px  #059;
                &:hover,
                &.selected {
                    text-shadow:
                        0 0 38px #f00a,
                        0 0 28px #f00a,
                        0 0 24px #f00a,
                        0 0 20px #f00a,
                        0 0 16px #f00a,
                        0 0 12px #f00a,
                        0 0 8px  #f00a,
                        0 0 4px  #f00a;
                }
            }
            div {
                &::after {
                    background:
                        linear-gradient(90deg, #0590, #059, #0590),
                        linear-gradient(90deg, #0590, #059, #0590),
                        linear-gradient(90deg, #0590, #059, #0590);
                }
                a::after {
                    background: linear-gradient(90deg, #0590, #059, #0590);
                }
            }
        }
    }

    &.autumn {
        #submenu {
            a {
                text-shadow:
                    0 0 38px #f90,
                    0 0 24px #f90a,
                    0 0 16px #f907,
                    0 0 8px  #f90,
                    0 0 4px  #f905;
                font-weight: 300;
                &:hover,
                &.selected {
                    text-shadow:
                        0 0 38px #7a0,
                        0 0 28px #7a0,
                        0 0 24px #9d0,
                        0 0 20px #7a0,
                        0 0 16px #f40,
                        0 0 12px #f30,
                        0 0 8px  #f20,
                        0 0 4px  #f10;
                }
            }
            div {
                &::after {
                    background: linear-gradient(90deg, #fc00, #fa0c, #fc00);
                }
                a::after {
                    background: linear-gradient(90deg, #f000, #f909, #f000);
                }
            }
        }
    }

    &.winter {
        #submenu {
            a {
                text-shadow:
                    0 0 38px #5000aa,
                    0 0 28px #5000aa,
                    0 0 24px #5000aa,
                    0 0 20px #5000aa,
                    0 0 16px #5000aa,
                    0 0 12px #5000aa,
                    0 0 8px  #5000aa,
                    0 0 4px  #5000aa;
                &:hover,
                &.selected {
                    text-shadow:
                        0 0 38px #e6111c,
                        0 0 28px #e6111c,
                        0 0 24px #e6111c,
                        0 0 20px #e6111c,
                        0 0 16px #e6111c,
                        0 0 12px #e6111c,
                        0 0 8px  #e6111c,
                        0 0 4px  #e6111c;
                }
            }
            div {
                &::after {
                    background:
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00),
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00),
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
                }
                a::after {
                    background: linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
                }
            }
        }
    }

    &.spring-summer {
        #submenu {
            a {
                text-shadow:
                    0 0 58px #7a0,
                    0 0 38px #7a0,
                    0 0 24px #0097be,
                    0 0 16px #7a0,
                    0 0 8px #7a0,
                    0 0 1px #000;
                font-weight: 300;
                &:hover,
                &.selected {
                    text-shadow:
                        0 0 38px #7a0,
                        0 0 28px #7a0,
                        0 0 24px #9d0,
                        0 0 20px #7a0,
                        0 0 16px #f40,
                        0 0 12px #f30,
                        0 0 8px  #f20,
                        0 0 4px  #f10;
                }
            }
            div {
                &::after {
                    background: linear-gradient(90deg, #fc00, #fa0c, #fc00);
                }
                a::after {
                    background: linear-gradient(90deg, #f000, #f909, #f000);
                }
            }
        }
    }

}

.middle {
    &.mix {
        #submenu {
            div {
                &::after {
                    background:
                        linear-gradient(90deg, #0590, #059, #0590),
                        linear-gradient(90deg, #0590, #059, #0590),
                        linear-gradient(90deg, #0590, #059, #0590);
                }
                a::after {
                    background: linear-gradient(90deg, #0590, #059, #0590);
                }
            }
        }
    }

    &.autimn,
    &.spring-summer {
        #submenu {
            div {
                &::after {
                    background: linear-gradient(90deg, #fc00, #fa0c, #fc00);
                }
                a::after {
                    background: linear-gradient(90deg, #f000, #f909, #f000);
                }
            }
        }
    }

    &.winter {
        #submenu {
            div {
                &::after {
                    background:
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00),
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00),
                        linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
                }
                a::after {
                    background: linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
                }
            }
        }
    }

}
</style>