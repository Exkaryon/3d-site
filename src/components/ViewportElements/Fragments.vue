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

    },


    data(){
        return {
            fragments: {
                totalElements: 200,             // Количество корректных фрагментов, которые попытается создать функция, но не более limiter.
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
            if(fragments.length < this.fragments.totalElements && this.fragments.limiter > 0){
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
.mix {
    #viewport{
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
                &.maple {background: url(../../assets/maple.png) center center no-repeat;}
                &.oak {background: url(../../assets/oak.png) center center no-repeat;}
                &.chestnut {background: url(../../assets/chestnut.png) center center no-repeat;}
                &.liquidambar {background: url(../../assets/liquidambar.png) center center no-repeat;}
                &.linden {background: url(../../assets/linden.png) center center no-repeat;}
            }
        }
    }
}
</style>