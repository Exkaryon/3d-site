<template>
    <div id="topbar">
        <nav>
            <div>
                <a v-for="link in $store.state.content" :key="link.name" v-bind:href="'#'+link.name" @click.prevent="$store.dispatch('linkNavi', $event.target)">{{link.title}}</a>
            </div>
        </nav>
        <div class="fulcrum" @click.prevent="[$store.commit('setFulcrum', Date.now()), $store.commit('setSelectedCube', null)]">
            &nbsp;
        </div>
        <div class="themes_switcher" v-openator>
            <div>Тема:</div>
            <div>
                <div v-for="(theme, index) in themes" :key="index" v-bind:data-theme="theme.title.toLowerCase()" @click="themeSelection(index, $event.target)" :class="[theme.active ? 'selected' : '', index === transElemIndex ? 'trans' : '']"><span>{{theme.title}}</span></div>
            </div>
        </div>
        <div class="manlink" @click="$store.commit('setActiveManual', true)"> 
            <span>Справка</span>
        </div>
    </div>
</template>




<script>
export default {
    name: 'TopBar',

    props: {

    },

    data(){
        return {
            themes: [
                {title: 'Mix', active: true},
                {title: 'Autumn', active: false},
                {title: 'Winter', active: false},
                {title: 'Spring-summer', active: false},
            ],
            transElemIndex: false,
        }
    },

    methods: {
        themeSelection(index, target){
            if(this.blockedSwitcher) return;
            this.transElemIndex = index;
            setTimeout(() => {
                this.themes.forEach(t => { t.active = t.title == target.innerText ? true : false; });
                this.themes.sort((a,b) => b.active - a.active);
                this.transElemIndex = false;
                this.$store.dispatch('changeTheme', target.innerText.toLowerCase());
            }, 500);
        }
    },

    computed: {
        blockedSwitcher(){
            return this.$store.state.changeThemeProcess.status;
        }
    }
}
</script>




<style scoped lang="scss">
#topbar {
    font-family: Boxed;
    position: fixed;
    left:0;
    top:0;
    right:0;
    z-index: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: box-shadow 1.5s ease;
    &::after {
        content:'';
        position: absolute;
        display: block;
        width: 100%;
        bottom: 0px;
        top: 0px;
        background: rgba(0, 0, 0, 1);
        border-bottom:solid 1px rgba(255,255,255,0.2);
        opacity: 0.8;
    }

    nav, div {
        position: relative;
        z-index: 1;
    }

    nav {
        height: 100%;
        padding: 20px 0;
        a {
            color: #fff;
            margin: 0 20px;
            position: relative;
            z-index: 6;
            transition: text-shadow 0.5s ease;
            font-weight: normal;
            font-size: 20px;
            text-decoration: none;
            &::after {
                content:'';
                position: absolute;
                z-index: -1;
                display: block;
                height:1px;
                bottom:-2px; left:0; right:0;
            }
            &:hover::after {
                width: 180%;
                left:-40%;
            }
        }
    }


    .fulcrum {
        width: 33px;
        height: 33px;
        text-align: center;
        transition: box-shadow 0.5s ease;
        cursor: pointer;
        margin:0 100px;
        &::before{
            content: '';
            position: absolute;
            width: 50px;
            height: 50px;
            background: url("../assets/images/crosshair.png") center center no-repeat;
            top: -8px;
            left:-9px;
        } 
    }

    .manlink {
        margin-left: 230px;
        border-bottom: dashed 1px #fff5;
        position: relative;
        color: #fff9;
        cursor: pointer;
        &::before {
            content: '🛠';
            position: absolute;
            display: block;
            text-align: center;
            width: 15px;
            height: 20px;
            left: -27px;
            top: -7px;
            font-size: 22px;
            opacity: 0.8;
        }
        &:hover {
            color: #fff;
            border-color: #fff9;
        }
        transition: color 0.5s ease;
    }

    .themes_switcher {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
            margin-left: 25px;
            display: flex;
            cursor: pointer;
            div {
                position: absolute;
                display: block;
                border:solid 1px #fff9;
                padding: 5px 25px 5px 10px;
                border-radius: 10px;
                min-width: 155px;
                top: -16px;
                transform-origin: 140px center 0;
                transition: transform 0.5s cubic-bezier(0.42, 0, 0.25, 1.51);
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 8px;
                    height:8px;
                    border-radius: 50%;
                    border:solid 1px #fff
                }
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    background: linear-gradient(90deg, #000 50%, #0000 100%);
                    border-radius: 10px;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left:0;
                    transition: box-shadow 0.25s ease;
                }
                span {
                    position: relative;
                    z-index: 1;
                }
            }
        }
        .selected {
            z-index: 5;
            order: 1;
            & + div {
                z-index: 4;
                order: 2;
                & + div {
                    z-index: 3;
                    order: 3;
                    + div {
                        z-index: 2;
                        order: 4;
                    }
                }
            }
        }

        &.active {
            .selected {
                transform: rotate(0deg);
                & + div {
                    transform: rotate(-25deg);
                    & + div {
                        transform: rotate(-50deg);
                        & + div {
                            transform: rotate(-75deg);
                        }
                    }
                }
            }
            div div.trans {
                transform: rotate(0deg)!important;
            }
        }
    }
}


/* RESPONSIVE */
@media (max-width:999px){
    #topbar {
        justify-content: space-between;
        z-index: 11;
        nav a {
            margin: 0 0 0 20px;
            font-size: 16px;
        }
        .fulcrum {
            width: 28px;
            height: 28px;
            margin:0 20px;
            &::before{
                width: 41px;
                height: 41px;
                background-size: contain;
                top: -7px;
                left:-7px;
            }
        }
        .themes_switcher {
            padding-right: 180px;
        }
        .manlink {
            margin-right: 20px;
            margin-left: 0;
        }
    }
}

@media (max-width:767px){
    #topbar {
        min-height: 55px;
        nav {
            margin-left: 20px;
            &::before {
                content: '';
                position: absolute;
                display: block;
                height: 24px;
                width: 38px;
                border-top: solid 2px #fff;
                border-bottom: solid 2px #fff;
                left:0;
                top:5px;
                transition: all 0.5s ease;
            }
            &::after {
                content: '';
                position: absolute;
                display: block;
                height: 2px;
                background: #fff;
                width: 38px;
                left:0;
                top:18px;
                transition: all 0.5s ease;
            }
            div {
                position: fixed;
                left: -250px;
                top: 67px;
                width: auto;
                display: flex;
                flex-direction: column;
                padding: 10px 20px;
                border: solid 1px #0599;
                background: linear-gradient(45deg, #000, #000A);
                border-radius: 0 15px 15px 15px;
                text-align: center;
                transition: left 0.5s ease;
                a {
                    white-space: nowrap;
                    margin: 7px 0;
                }
            }
            &.show {
                &::before {
                    height: 0px;
                    width: 38px;
                    border-top-width:1px;
                    border-bottom-width:1px;
                    transform: rotate(45deg);
                    top: 17px;
                }
                &::after {
                    transform: rotate(-405deg);
                }
                div {
                    left: 20px;
                }
            }
        }
        .fulcrum {
            margin-left: calc(100% - 430px);
        }
        .themes_switcher {
            padding-right: 210px;
            & > div {
                margin-left: 10px;
            }
        }
    }
}

@media (max-width:540px){
    #topbar {
        .fulcrum {
           margin-right: 0;
           margin-left: calc(100% - 310px);
        }
        .themes_switcher {
            padding-right: 145px;
            & > div {
                &:first-child {
                    font-size: 14px;
                }
                div {
                    min-width: 136px;
                    white-space: nowrap;
                    transform-origin: 120px center 0;
                    span {
                        font-size: 14px;
                    }
                }
            }
        }
        .manlink {
            border: none;
            &::before {
                position: static;
                display: block;
                left: 0px;
                top: 0px;
                line-height: 20px;
            }
            span {
                display: none;
            }
        }
    }
}

@media (max-width:359px){
    #topbar {
        .themes_switcher > div:first-child {
            display: none; 
        }
        .fulcrum {
           margin-left: 50px;
        }
        .themes_switcher {
            padding-right: 130px;
        }
    }
}

/* THEMES IN PERFORMANCE VARS */
.max {
    &.mix {
        /* Nav & other links */
        #topbar {
            box-shadow:
                0 0 140px #059d,
                0 0 40px  #0595,
                0 0 3px   #059 inset,
                0 0 3px   #059 inset,
                0 0 13px  #059 inset,
                0 0 23px  #059 inset;
            .fulcrum {
                box-shadow:
                    0 0 90px #059,
                    0 0 50px #059,
                    0 0 20px #059,
                    0 0 20px #059 inset,
                    0 0 10px #0595 inset;
                    &:hover {
                        box-shadow:
                            0 0 90px #f00a,
                            0 0 50px #f00a,
                            0 0 20px #f00a,
                            0 0 10px #f00 inset,
                            0 0 20px #059 inset;
                    }
            }
            nav a {
                text-shadow:
                    0 0 38px #059,
                    0 0 28px #059,
                    0 0 24px #059,
                    0 0 20px #059,
                    0 0 16px #059,
                    0 0 12px #059,
                    0 0 8px  #059,
                    0 0 4px  #059;
                &:hover, &.selected {
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
                &::after {
                    background: linear-gradient(90deg, #0590, #059, #0590);
                }
            }

            /* Switcher */
            .themes_switcher div div {
                &::after {
                    box-shadow:
                        0 0 20px #0599 inset,
                        0 0 20px #0599;
                }
                span {
                    text-shadow: 0 0 10px #059;
                }
                &.active::after {
                    box-shadow:
                        0 0 20px #059 inset,
                        0 0 20px #059;
                }
                &:hover::after {
                    box-shadow:
                        0 0 20px #f00 inset,
                        0 0 20px #f00;
                }
            }
        }
    }

    &.autumn {
        /* Nav & other links */
        #topbar {
            box-shadow:
                0 0 120px #f907,
                0 0 20px  #aa4d0055,
                0 0 3px   #f90c inset,
                0 0 3px   #f909 inset,
                0 0 13px  #f909 inset,
                0 0 23px  #f909 inset;
            .fulcrum {
                box-shadow:
                    0 0 90px #f909,
                    0 0 50px #f909,
                    0 0 20px #f909,
                    0 0 26px #f905 inset,
                    0 0 10px #f909 inset;
                    &:hover {
                        box-shadow:
                            0 0 90px #7a0,
                            0 0 50px #7a0,
                            0 0 20px #f70c,
                            0 0 10px #f50 inset,
                            0 0 30px #f805 inset;
                    }
            }
            nav a {
                text-shadow:
                    0 0 38px #f90,
                    0 0 24px #f90a,
                    0 0 16px #f907,
                    0 0 8px  #f90,
                    0 0 4px  #f905;
                font-weight: 300;
                &:hover, &.selected {
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
                &::after {
                    background: linear-gradient(90deg, #fc00, #fa0c, #fc00);
                }
            }

            /* Switcher */
            .themes_switcher div div {
                &::after {
                    box-shadow:
                        0 0 20px #f505 inset,
                        0 0 20px #f905
                }
                span {
                    text-shadow: 0 0 10px #7a0;
                }
                &.active::after {
                    box-shadow:
                        0 0 20px #f905 inset,
                        0 0 20px #f905;
                }
                &:hover::after {
                    box-shadow:
                        0 0 20px #f00 inset,
                        0 0 20px #f00;
                }
            }
        }
    }

    &.winter {
        /* Nav & other links */
        #topbar {
            box-shadow:
                0 0 140px #5000aa,
                0 0 40px  #5000aa,
                0 0 3px   #5000aa inset,
                0 0 3px   #5000aa inset,
                0 0 13px  #5000aa inset,
                0 0 23px  #5000aa inset;
            .fulcrum {
                box-shadow:
                    0 0 90px #5000aa,
                    0 0 50px #5000aa,
                    0 0 20px #5000aa,
                    0 0 20px #5000aa inset,
                    0 0 10px #5000aa inset;
                    &:hover {
                        box-shadow:
                            0 0 90px #e6111c,
                            0 0 50px #e6111c,
                            0 0 20px #e6111c,
                            0 0 10px #e6111c inset,
                            0 0 20px #5000aa inset;
                    }
            }
            nav a {
                text-shadow:
                    0 0 38px #5000aa,
                    0 0 28px #5000aa,
                    0 0 24px #5000aa,
                    0 0 20px #5000aa,
                    0 0 16px #5000aa,
                    0 0 12px #5000aa,
                    0 0 8px  #5000aa,
                    0 0 4px  #5000aa;
                &:hover, &.selected {
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
                &::after {
                    background: linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
                }
            }

            /* Switcher */
            .themes_switcher div div {
                &::after {
                    box-shadow:
                        0 0 20px #5000aa inset,
                        0 0 20px #5000aa;
                }
                span {
                    text-shadow: 0 0 10px #5000aa;
                }
                &.active::after {
                    box-shadow:
                        0 0 20px #5000aa inset,
                        0 0 20px #5000aa;
                }
                &:hover::after {
                    box-shadow:
                        0 0 20px #e6111c inset,
                        0 0 20px #e6111c;
                }
            }
        }
    }

    &.spring-summer {
        /* Nav & other links */
        #topbar {
            box-shadow:
                 0 0 220px #7a09,
                 0 0 50px  #ff550055,
                 0 0 13px  #7a09 inset,
                 0 0 3px   #f00 inset,
                 0 0 13px  #7a09 inset,
                 0 0 23px  #7a09 inset;
            &::before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left:25%;
                right:25%;
                bottom:0; 
                border-radius: 50%;
                box-shadow: 0 0 250px #7a02, 0 0 90px #7a04, 0 0 40px #0097be44;
            }
            .fulcrum {
                box-shadow:
                    0 0 90px #f909,
                    0 0 50px #f909,
                    0 0 20px #f909,
                    0 0 26px #f905 inset,
                    0 0 10px #f909 inset;
                    &:hover {
                        box-shadow:
                            0 0 90px #7a0,
                            0 0 50px #7a0,
                            0 0 20px #f70c,
                            0 0 10px #f50 inset,
                            0 0 30px #f805 inset;
                    }
            }
            nav a {
                text-shadow:
                    0 0 58px #7a0,
                    0 0 38px #7a0,
                    0 0 24px #0097be,
                    0 0 16px #7a0,
                    0 0 8px #7a0,
                    0 0 1px #000;
                font-weight: 300;
                &:hover, &.selected {
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
                &::after {
                    background: linear-gradient(90deg, #f000, #f90, #f000);
                }
            }

            /* Switcher */
            .themes_switcher div div {
                &::after {
                    box-shadow:
                        0 0 20px #7a05 inset,
                        0 0 20px #fc04
                }
                span {
                    text-shadow: 0 0 10px #7a0;
                }

                &.active::after {
                    box-shadow:
                        0 0 20px #0097be55 inset,
                        0 0 20px #ff07;
                }
                &:hover::after {
                    box-shadow:
                        0 0 20px #0097be99 inset,
                        0 0 20px #f90;
                }
            }
        }
    }

}

.middle {
    &.max {
        #topbar nav a {
            &::after {
                background: linear-gradient(90deg, #0590, #059, #0590);
            }
        }
    }

    &.autumn {
        #topbar nav a {
            font-weight: 300;
            &::after {
                background: linear-gradient(90deg, #fc00, #fa0c, #fc00);
            }
        }
    }

    &.winter {
        #topbar nav a {
            &::after {
                background: linear-gradient(90deg, #5000aa00, #5000aa, #5000aa00);
            }
        }
    }

    &.spring-summer {
        #topbar {
            nav a {
                font-weight: 300;
                &::after {
                    background: linear-gradient(90deg, #f000, #f90, #f000);
                }
            }
        }
    }
}




</style>
