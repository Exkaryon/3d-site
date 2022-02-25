<template>
    <div id="topbar">
        <nav>
            <div>
                <a v-for="link in links" :key="link.id" v-bind:href="link.name" v-on:click.prevent="choiceCube">{{link.title}}</a>
            </div>
        </nav>
        <div class="fulcrum">
            &nbsp;
        </div>
        <div class="themes_switcher">
            <div>Тема:</div>
            <div>
                <div v-for="theme in themes" :key="theme.id" v-bind:data-theme="theme.title.toLowerCase()" class="selected"><span>{{theme.title}}</span></div>
            </div>  
        </div>

    </div>
</template>


<script>
export default {
    name: 'TopBar',
    data(){
        return {
            links: [
                {id: 0, name: '#about', title: 'Обо мне'},
                {id: 1, name: '#biography', title: 'Биография'},
                {id: 2, name: '#works', title: 'Опыт'},
                {id: 3, name: '#command', title: 'Команда'},
            ],
            themes: [
                {id: 0, title: 'Mix'},
                {id: 1, title: 'Autumn'},
                {id: 2, title: 'Winter'},
                {id: 3, title: 'Spring-summer'},
            ]
        }
    },
    props: {
        msg: String
    },
    methods: {
        choiceCube: function(e){
            console.log(e);
        },

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
                min-width: 120px;
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

        .active {
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










</style>
