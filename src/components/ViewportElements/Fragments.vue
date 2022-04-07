<template>
    <div v-for="(element, index) of fragments.elements" :key="index" :style="element.CSSText" :class="['fragments', element.class]">&nbsp;</div>
</template>

<script>
export default {
    name: 'Fragments',
    
    props: {
        contentLoaded: {
            type: Boolean,
        },
        viewportData: {
            type: Object
        },
        randomizer: {
            type: Function
        },
        CSSTextCompilator: {
            type: Function
        },
        actualPerformance: {
            type: String
        }
    },


    data(){
        return {
            fragments: {
                totalElements: {                 // Количество корректных фрагментов, которые попытается создать функция, но не более limiter, для соответсвующего имени производительности.
                    fast: 200,
                    normal: 100,
                    middle: 50,
                    slow: 25,
                    veryslow: 0
                },             // Количество корректных фрагментов, которые попытается создать функция, но не более limiter.
                limiter: 500,                   // Маскимальное кол-во итераций/попыток создания корректных фрагментов. Для предотвращения бесконечного зацикливания, когда введены некоректные значения, например, когда фрагменты все время попадают в зону отчуждения.  
                dist: [0, 4500],                // Минимальный и максимальный пороги дистанции (разброс) размещения элементов от центра пространства в пикселях. Минимальный порог != 0 работает некорректно, образуя стены-пустоты по каждой из осей.  
                breakaway: 100,                 // Дистанция (зона отчуждения) от граней кубов, в области которой не будут размещаться фрагменты, центры которых попадают в данную область. Следует учитывать, что данная величина не должна быть менее половины размера фрагментов.
                elemSize: [140, 220],           // Минимальный и максимальный размеры элементов.
                classes: ['maple', 'oak', 'chestnut', 'liquidambar', 'linden'],
                elements: []
            }
        }
    },


    methods: {

        fragmentsGenerator(fragments = []){
            const sizes = this.randomizer(this.fragments.elemSize[0], this.fragments.elemSize[1]);
            const fragmentCSSProps = {
                width: [sizes, 'px'],
                height: [sizes, 'px'],
                transform: {
                    translate3d: [
                        this.randomizer(this.fragments.dist[0], this.fragments.dist[1], true) + this.viewportData.win.width / 2 - sizes / 2,  
                        this.randomizer(this.fragments.dist[0], this.fragments.dist[1], true) + this.viewportData.win.height / 2 - this.viewportData.cubes.size / 2,
                        this.randomizer(this.fragments.dist[0], this.fragments.dist[1], true),
                        'px'
                    ],
                    rotateX: [this.randomizer(0, 359), 'deg'],
                    rotateY: [this.randomizer(0, 359), 'deg']
                }
            }
            let ignoredCoords = {};
            let insideDetected = false;
            for(let cubeName in this.viewportData.cubes.CSSprops.stack){
                ignoredCoords[cubeName] = {
                    X: [this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[0] - sizes / 2 - this.fragments.breakaway,
                        this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[0] + this.viewportData.cubes.size - sizes / 2 + this.fragments.breakaway],
                    Y: [this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[1] - this.viewportData.cubes.size / 2 - this.fragments.breakaway,
                        this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[1] + this.viewportData.cubes.size / 2 + this.fragments.breakaway],
                    Z: [this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[2] - this.viewportData.cubes.size / 2 - this.fragments.breakaway,
                        this.viewportData.cubes.CSSprops.stack[cubeName].transform.translate3d[2] + this.viewportData.cubes.size / 2 + this.fragments.breakaway]
                }
                let iterator = 0;
                for(let axis in ignoredCoords[cubeName]){
                    if(!(fragmentCSSProps.transform.translate3d[iterator] > ignoredCoords[cubeName][axis][0] && fragmentCSSProps.transform.translate3d[iterator] < ignoredCoords[cubeName][axis][1])){
                        break;
                    }else{
                        if(iterator == 2) insideDetected = true;
                        iterator++;
                    }
                }
            }
            if(!insideDetected){
                fragments.push({
                    CSSText: this.CSSTextCompilator(fragmentCSSProps),
                    class: this.fragments.classes[this.randomizer(0, this.fragments.classes.length - 1)]
                });
            }
            this.fragments.limiter--;
            if(fragments.length < this.fragments.totalElements[this.actualPerformance] && this.fragments.limiter > 0){
                this.fragmentsGenerator(fragments);
            }else{
                this.fragments.elements = fragments;
            }
        },
    },


    watch: {
        contentLoaded(){
            this.fragmentsGenerator();
        }
    }

}
</script>


<style lang="scss" scoped>

#viewport {
    .wrapper {
        .fragments {
            width: 100px;
            height: 100px;
            position: absolute;
            transform-style: preserve-3d;
            transition: all 1s ease;
            background-size: contain!important;
            &::after,
            &::before {
                background-size: contain!important;
            }
        }
    }
}

/* THEMES */
.mix, .autumn {
    #viewport{
        .wrapper {
            .fragments {
                &.maple {background: url(../../assets/images/maple.png) center center no-repeat;}
                &.oak {background: url(../../assets/images/oak.png) center center no-repeat;}
                &.chestnut {background: url(../../assets/images/chestnut.png) center center no-repeat;}
                &.liquidambar {background: url(../../assets/images/liquidambar.png) center center no-repeat;}
                &.linden {background: url(../../assets/images/linden.png) center center no-repeat;}
            }
        }
    }
}


.winter {
    #viewport{
        .wrapper {
            .fragments {
                &.maple {background: url(../../assets/images/snowcristal_1.png) center center no-repeat;}
                &.oak {background: url(../../assets/images/snowcristal_2.png) center center no-repeat;}
                &.chestnut {background: url(../../assets/images/snowcristal_3.png) center center no-repeat;}
                &.liquidambar {background: url(../../assets/images/snowcristal_4.png) center center no-repeat;}
                &.linden {background: url(../../assets/images/snowcristal_5.png) center center no-repeat;}
            }
        }
    }
}


.spring-summer {
    #viewport{
        .wrapper {
            .fragments {
                background: none;
                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right:0;
                    transform: rotateY(45deg);
                    transform-origin: left;
                    transition: transform 0.5s ease;
                }
                &::after {transform: rotateY(-45deg);}
                &.maple::before,
                &.maple::after {background: url(../../assets/images/butterfly_1.png) left center no-repeat;}
                &.oak::before,
                &.oak::after {background: url(../../assets/images/butterfly_2.png) left center no-repeat;}
                &.chestnut::before,
                &.chestnut::after {background: url(../../assets/images/butterfly_3.png) left center no-repeat;}
                &.liquidambar::before,
                &.liquidambar::after {background: url(../../assets/images/butterfly_4.png) left center no-repeat;}
                &.linden::before,
                &.linden::after {background: url(../../assets/images/butterfly_5.png) left center no-repeat;}
                &:nth-child(3n+1)::before{transform: rotateY(-25deg);}
                &:nth-child(3n+1)::after{ transform: rotateY(25deg);} 
                &:nth-child(3n+2)::before{transform: rotateY(-45deg);}
                &:nth-child(3n+2)::after{ transform: rotateY(45deg);} 
                &:nth-child(3n+3)::before{transform: rotateY(-85deg);}
                &:nth-child(3n+3)::after{ transform: rotateY(85deg);} 
            }
        }
    }
}








/* Change themes animation */
.collapse_fragments {
    .fragments {
        animation: transTheme 8s ease-in-out forwards !important;
        &::before,
        &::after {
            transform: rotateY(0deg)!important;
        }
    }
}

@keyframes transTheme {
    75% {
        transform-origin: calc(100% * -22) calc(100% * -6); 
    }
    60% {
        transform-origin: calc(100% * -52) calc(100% * 6); 
    }
    50% {
        transform: translate3d(0px, 0px, -10000px) rotateX(360deg) rotateY(360deg) scale(0.1);
        transform-origin: calc(100% * 52) calc(100% * -16) ; 
        opacity: 0;
    }
}
</style>