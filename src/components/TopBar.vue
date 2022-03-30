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
                <div v-for="theme in themes" :key="theme.id" v-bind:data-theme="theme.title.toLowerCase()" @click="changeTheme" :class="[theme.active ? 'selected' : '', theme.id === transElemId ? 'trans' : '']"><span>{{theme.title}}</span></div>
            </div>
        </div>

    </div>
</template>




<script>
export default {
    name: 'TopBar',

    props: {
        activeTheme: {
            type:  String,
        }
    },

    data(){
        return {
            themes: [
                {id: 0, title: 'Mix', active: true},
                {id: 1, title: 'Autumn', active: false},
                {id: 2, title: 'Winter', active: false},
                {id: 3, title: 'Spring-summer', active: false},
            ],
            changeThemeInProcess: false,
            transElemId: false,
        }
    },

    methods: {
        changeTheme(e){
            this.transElemId = this.themes.find(item => item.title == e.target.innerText).id;
            setTimeout(() => {
                this.themes.forEach(t => { t.active = t.title == e.target.innerText ? true : false; });
                this.themes.sort((a,b) => b.active - a.active);
                this.$emit('changeClass', e.target.innerText.toLowerCase())
                this.transElemId = false;
            }, 500);
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
            background: url("../assets/crosshair.png") center center no-repeat;
            top: -8px;
            left:-9px;
        } 
    }

    .themes_switcher {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
            margin-left: 25px;
            display: flex;
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

/* THEMES */
.mix {
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
            &::after {
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





</style>
