<template>
    <div id="modal">
    <div class="container" :class="{show: visibleContent}">
        <h2>{{ article.title}}</h2>
        <div v-html="article.fulltext"></div>
    </div>
    <div class="shadow">&nbsp;</div>
    <div class="close" @click="$store.commit('setActiveModal', false)">Закрыть</div>
</div>
</template>

<script>
export default {
    name: 'Modal',

    data(){
        return {
            article: {},
            visibleContent: false,
        }
    },



    methods: {
        updateContent(){
            if(!this.currentCube || !this.activeCubeSide || !this.activeModal) return;
            const article = this.$store.state.content[this.currentCube].sides[this.activeCubeSide];
            if(article.name == this.article.name) return;
            this.visibleContent = false;
            setTimeout(() => {
                this.article = article;
                this.visibleContent = true;
            } , 500);
        },
    },


    computed: {
        currentCube(){
            return this.$store.state.selectedCube;
        },
        activeCubeSide(){
            return this.$store.state.activeCubeSide;
        },
        activeModal(){
            return this.$store.state.activeModal;
        }
    },


    watch: {
        currentCube(){
            this.updateContent();
        },

        activeCubeSide(){
            this.updateContent();
        },

        activeModal(){
            this.updateContent();
        }
    }

}
</script>


<style lang="scss">
.modalactive #modal {
    transform: translateX(0);
}

#modal {
    position: fixed;
    height: 100%;
    top:0;
    right: 0;
    width: 50%;
    z-index: 10;
    transform: translateX(110%);
    transition: all 0.7s ease;
    background: #000e;
    cursor: default;
    &::before {
        content:'';
        position: absolute;
        top:15%;
        bottom:15%;
        left:-2px;
        width: 5px;
        filter: blur(5px);
    }
    &::after {
        content:'';
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        width: 1px;
        background: linear-gradient(0deg, #fff0, #fff9, #fff0);
    }
    .container {
        padding:60px 20px 20px 40px;
        position: relative;
        z-index: 11;
        transition: opacity 0.5s ease;
        opacity:0;
        height: calc(100% - 140px);
        overflow: auto;
        box-sizing: border-box;
        font-family: Boxed;
        &.show {
            opacity:1;
        }
    }
    .shadow {
        margin-top: -30px;
        position: relative;
        margin-left: 1px;
        height: 30px;
        background: linear-gradient(0deg, #000, #0000);
        z-index: 11;
    }
    h2 {
        color: #fff;
        text-transform: uppercase;
        span {
            margin-left:20px;
            border-left: dashed 1px #fff5;
            padding-left: 20px;
            font-weight: 100;
        }
    }
    p {
        line-height: 1.6em;
        font-weight: 300;
        b {
            border-bottom: dotted 1px #fff9;
            sup {
                font-weight: 200;
                position: absolute;
                margin: -5px 0 0 10px;
                font-style: italic;
            }
        }
    }
    .close {
        display: block;
        right:25px;
        bottom:100px;
        position: absolute;
        padding-left:25px;
        cursor: pointer;
        font-size: 20px;
        font-family: Boxed;
        &::before,
        &::after {
            content:'';
            position: absolute;
            display:block;
            width: 20px;
            height: 2px;
            background: #fff;
            transform: rotate(45deg);
            top: 10px;
            left:0;
        }
        &::after {
            transform: rotate(-45deg);
        }
    }

    .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        & > div {
            width: calc(50% - 20px);
            margin: 10px 0;
            padding: 20px 20px 30px;
            box-sizing: border-box;
            background: linear-gradient(-50deg, #404650, #12151b);
            border: solid 1px #1111;
            border-bottom-color: #fff4;
            border-right-color: #fff4;
            & > div:nth-of-type(1){
                position: relative;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border: solid 1px #0009;
                }
            }
            & > div:nth-of-type(2){
                display: flex;
                justify-content: space-between;
            }
            img {
                width: 100%;
                display: block;
            }
            h5 {
                font-size: 1.3em;
                font-weight: 100;
                text-transform: uppercase;
                margin: 20px 0 0 0;
                b {
                    display: block;
                    font-weight: 500;
                }
            }
        }
        p {
            font-weight: 200;
            font-size: 0.9em;
        }
        a:first-child::before {
            content: '*';
            position: absolute;
            right: -12px;
            top: -2px;
        }
    }

    a {
        color: #fff;
        font-weight: 300;
        text-decoration: none;
        border-bottom: solid 1px #fff9;
        position: relative;
        transition: all 0.5s ease;
        & + a {
            margin-left: 20px;
        }
        &:hover {
            border-bottom-color: #0000;
            color: rgb(255, 0, 34);
            text-shadow: 0 0 10px #000, 0 0 1px #f00;
        }
    }
    .sites {
        display: flex;
        flex-wrap: wrap;
        span,
        a {
            margin:0 20px 0 0;
        }
        span {
            font-weight: 500;
        }
    }
    .notfound {
        opacity: .5;
        font-style: italic;
        color: #f90;
        font-weight: 100;
    }
}


/* RESPONSIVE */
@media (max-width:1279px){
    #modal {
        .container {
            padding: 60px 20px 20px 20px;
        }
        .gallery > div {
            width: calc(50% - 10px);
        }
    }
}

@media (max-width:999px){
    #modal {
        width: 100%;
    }
}

@media (max-width:767px){
    #modal h2 span {
        margin-left: 0;
        border-left: none;
        padding-left: 0;
        font-weight: 100;
        white-space: nowrap;
        display: block;
        font-size: 16px;
    }
}

@media (max-width:540px){
    #modal .gallery > div {
        width: 100%;
    }
}

@media (max-width:359px){
    #modal {
        .close {
            bottom: 120px;
        }
        .container {
            height: calc(100% - 160px);
        }
    }

}


/* THEMES IN PERFORMANCE VARS */
.max {
    &.mix {
        #modal {
            color:#d2ebff;
            h2 {
                text-shadow:
                    0 0 30px #059,
                    0 0 25px #059,
                    0 0 15px #059,
                    0 0 10px #059,
                    0 0 5px #059,
                    0 0 3px #059;
            }
            .close {
                text-shadow:
                    0 0 38px #059,
                    0 0 28px #059,
                    0 0 24px #059,
                    0 0 20px #059,
                    0 0 16px #059,
                    0 0 12px #059,
                    0 0 8px  #059,
                    0 0 4px  #059;
                &::before,
                &::after {
                    box-shadow:
                        0 0 15px #059,
                        0 0 10px #059, 
                        0 0 5px  #059, 
                        0 0 4px  #059, 
                        0 0 3px  #059, 
                        0 0 2px  #059, 
                        0 0 1px  #059;
                }
                &:hover {
                    text-shadow:
                        0 0 38px #f00a,
                        0 0 28px #f00a,
                        0 0 24px #f00a,
                        0 0 20px #f00a,
                        0 0 16px #f00a,
                        0 0 12px #f00a,
                        0 0 8px  #f00a,
                        0 0 4px  #f00a;
                    &::before,
                    &::after {
                        box-shadow:
                            0 0 15px #f00, 
                            0 0 10px #f00, 
                            0 0 5px  #f00, 
                            0 0 4px  #f00, 
                            0 0 3px  #f00, 
                            0 0 2px  #f00, 
                            0 0 1px  #f00;
                    }
                }
            }
            &::before {
                background:
                    linear-gradient(0deg, #0590, #059, #0590),
                    linear-gradient(0deg, #0590, #059, #0590),
                    linear-gradient(0deg, #0590, #059, #0590);
            }
        }
    }

    &.winter {
        #modal {
            color: #d1beff;
            h2 {
                text-shadow:
                    0 0 30px #5000aa,
                    0 0 25px #5000aa,
                    0 0 15px #5000aa,
                    0 0 10px #5000aa,
                    0 0 5px #5000aa,
                    0 0 3px #5000aa;
            }
            .close {
                text-shadow:
                    0 0 38px #5000aa,
                    0 0 28px #5000aa,
                    0 0 24px #5000aa,
                    0 0 20px #5000aa,
                    0 0 16px #5000aa,
                    0 0 12px #5000aa,
                    0 0 8px  #5000aa,
                    0 0 4px  #5000aa;
                &::before,
                &::after {
                    box-shadow:
                        0 0 15px #5000aa,
                        0 0 10px #5000aa, 
                        0 0 5px  #5000aa, 
                        0 0 4px  #5000aa, 
                        0 0 3px  #5000aa, 
                        0 0 2px  #5000aa, 
                        0 0 1px  #5000aa;
                }
                &:hover {
                    text-shadow:
                        0 0 38px #e6111c,
                        0 0 28px #e6111c,
                        0 0 24px #e6111c,
                        0 0 20px #e6111c,
                        0 0 16px #e6111c,
                        0 0 12px #e6111c,
                        0 0 8px  #e6111c,
                        0 0 4px  #e6111c;
                    &::before,
                    &::after {
                        box-shadow:
                            0 0 15px #e6111c, 
                            0 0 10px #e6111c, 
                            0 0 5px  #e6111c, 
                            0 0 4px  #e6111c, 
                            0 0 3px  #e6111c, 
                            0 0 2px  #e6111c, 
                            0 0 1px  #e6111c;
                    }
                }
            }
            &::before {
                background:
                    linear-gradient(0deg, #5000aa00, #5000aa, #5000aa00),
                    linear-gradient(0deg, #5000aa00, #5000aa, #5000aa00),
                    linear-gradient(0deg, #5000aa00, #5000aa, #5000aa00);
            }
        }
    }

    &.autumn {
        #modal {
            color: #fff2df;
            h2 {
                text-shadow:
                    0 0 38px #f90,
                    0 0 16px #f907,
                    0 0 8px #f907,
                    0 0 4px #f905;
            }
            .close {
                text-shadow:
                    0 0 38px #f90,
                    0 0 24px #f90a,
                    0 0 16px #f907,
                    0 0 8px  #f90,
                    0 0 4px  #f905;
                font-weight: 300;
                &::before,
                &::after {
                    box-shadow:
                        0 0 20px #ff9900,
                        0 0 10px #ff9900,
                        0 0 5px  #ff9900cc,
                        0 0 2px  #ff9900cc;
                }
                &:hover {
                    text-shadow:
                        0 0 38px #7a0,
                        0 0 28px #7a0,
                        0 0 24px #9d0,
                        0 0 20px #7a0,
                        0 0 16px #f40,
                        0 0 12px #f30,
                        0 0 8px  #f20,
                        0 0 4px  #f10;
                    &::before,
                    &::after {
                        box-shadow:
                            0 0 25px #7a0,
                            0 0 20px #7a0,
                            0 0 14px #7a09,
                            0 0 7px  #f90c,
                            0 0 5px  #f909,
                            0 0 3px  #f70,
                            0 0 2px  #f50,
                            0 0 1px  #f50;
                    }
                }
            }
            &::before {
                background:
                    linear-gradient(0deg, #0590, #7a0c, #0590),
                    linear-gradient(0deg, #0590, #f00, #0590),
                    linear-gradient(0deg, #0590, #f00, #0590);
            }
        }
    }

    &.spring-summer {
        #modal {
            color: #f2ffd5;
            h2 {
                text-shadow:
                    0 0 36px #7a03,
                    0 0 25px #0097be,
                    0 0 20px #7a09,
                    0 0 10px #7a0,
                    0 0 1px #000;
            }
            .close {
                text-shadow:
                    0 0 58px #7a0,
                    0 0 38px #7a0,
                    0 0 24px #0097be,
                    0 0 16px #7a0,
                    0 0 8px #7a0,
                    0 0 1px #000;
                font-weight: 300;
                &::before,
                &::after {
                    box-shadow:
                        0 0 20px #ff9900,
                        0 0 10px #ff9900,
                        0 0 5px  #ff9900cc,
                        0 0 2px  #ff9900cc;
                }
                &:hover {
                    text-shadow:
                        0 0 38px #7a0,
                        0 0 28px #7a0,
                        0 0 24px #9d0,
                        0 0 20px #7a0,
                        0 0 16px #f40,
                        0 0 12px #f30,
                        0 0 8px  #f20,
                        0 0 4px  #f10;
                    &::before,
                    &::after {
                        box-shadow:
                            0 0 25px #7a0,
                            0 0 20px #7a0,
                            0 0 14px #7a09,
                            0 0 7px  #f90c,
                            0 0 5px  #f909,
                            0 0 3px  #f70,
                            0 0 2px  #f50,
                            0 0 1px  #f50;
                    }
                }
            }
            &::before {
                background:
                    linear-gradient(0deg, #0590, #7a0c, #0590),
                    linear-gradient(0deg, #0590, #f90, #0590);
            }
        }
    }
}

.middle {
    .mix {
        #modal::before {
            background:
                linear-gradient(0deg, #0590, #059, #0590),
                linear-gradient(0deg, #0590, #059, #0590),
                linear-gradient(0deg, #0590, #059, #0590);
        }
    }

    .autumn {
        #modal {
            &::before {
                background:
                    linear-gradient(0deg, #0590, #7a0c, #0590),
                    linear-gradient(0deg, #0590, #f00, #0590),
                    linear-gradient(0deg, #0590, #f00, #0590);
            }
            .close {
                font-weight: 300;
            }
        }
    }

    .winter {
        #modal::before {
            background:
                linear-gradient(0deg, #0590, #e6111c, #0590),
                linear-gradient(0deg, #0590, #5000aa, #0590),
                linear-gradient(0deg, #0590, #5000aa, #0590),
                linear-gradient(0deg, #0590, #5000aa, #0590),
                linear-gradient(0deg, #0590, #5000aa, #0590),
                linear-gradient(0deg, #0590, #5000aa, #0590);
        }
    }

    .spring-summer {
        #modal {
            &::before {
                background:
                    linear-gradient(0deg, #0590, #7a0c, #0590),
                    linear-gradient(0deg, #0590, #f90, #0590);
            }
            .close {
                font-weight: 300;
            }
        }
    }
}
</style>