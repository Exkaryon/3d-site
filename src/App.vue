<template>
    <div id="cover" :class="[performanceClass, $store.state.activeTheme]">
        <top-bar></top-bar>
        <sub-menu></sub-menu>
        <viewport :contentLoaded="contentLoaded" :actualPerformance="actualPerformance"></viewport>
        <modal></modal>
        <manual-info :performanceLag="performanceLag" :actualPerformance="actualPerformance"></manual-info>
    </div>
</template>




<script>
import ManualInfo from './components/ManualInfo.vue';
export default {
    name: 'App',
    components: {ManualInfo },


    data(){
        return {
            contentLoaded: false,
            performanceLag: 0,
            actualPerformance: null,
            performanceClass: null,
            performanceTypes: {
                fast: 500,                      // Тип: Верхний порог задержки в производительности, до которого данный тип актуален.
                normal: 750,
                middle: 1500,
                slow: 1700,
                veryslow: 50000
            },
            performanceClasses: {
                max: ['fast', 'normal'],        // Имя класса: [соответсвующие типы производительности - performanceTypes]
                middle: ['middle', 'slow'],
                low: ['veryslow'],
            }
        }
    },


    methods: {
        async getContentFromServer(){
            try {
                const url = `http://127.0.0.5:85/3dsite_data.php`;
                const response = await fetch(url, { method:'GET' });
                if(!response.ok) throw new Error(url); 
                const data = await response.json();
                this.$store.commit('setContent', data);
                this.contentLoaded = true;
            } catch (error) {
                console.warn(error);
            }
        },

        benchmark() {
            function factor(depth) { 
                let f = 1; 
                for(let i = 1; i < depth; i++) { 
                    f = f * i; 
                }
                return f; 
            }
            function load(amount, depth) {
                let t0 = performance.now();
                for(let n = 1; n < amount; n++) { 
                    let result = factor(depth);
                }
                let t1 = performance.now();
                let duration = Math.round(t1 - t0);
                return duration;
            }
            this.performanceLag = load(10000, 20000);
            for (const key in this.performanceTypes) {
                if(this.performanceTypes[key] > this.performanceLag){
                    this.actualPerformance = key;
                    break;
                }
            }
        },

        checkPerformanceClass(){
            for (const name in this.performanceClasses) {
                if(this.performanceClasses[name].includes(this.actualPerformance)){
                    this.performanceClass = name;
                    break;
                }
            }
        },
    },


    created(){
        this.benchmark();
        this.checkPerformanceClass();
        this.getContentFromServer();
    },

}
</script>




<style lang="scss">
* {
    box-sizing: border-box;
}
body {
    margin:0;
    font: 16px 'Proxima Nova', Arial;
    color: #fff;
    background:#000;
    cursor: grab;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:active {
        cursor: grabbing;
    }
}



@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedThin.eot');
	src: local('Boxed Thin'), local('BoxedThin'),
		url('assets/fonts/BoxedThin.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedThin.woff') format('woff'),
		url('assets/fonts/BoxedThin.ttf') format('truetype');
	font-weight: 100;
	font-style: normal;
}

@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedExtralight.eot');
	src: local('Boxed Extralight'), local('BoxedExtralight'),
		url('assets/fonts/BoxedExtralight.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedExtralight.woff') format('woff'),
		url('assets/fonts/BoxedExtralight.ttf') format('truetype');
	font-weight: 200;
	font-style: normal;
}

@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedLight.eot');
	src: local('Boxed Light'), local('BoxedLight'),
		url('assets/fonts/BoxedLight.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedLight.woff') format('woff'),
		url('assets/fonts/BoxedLight.ttf') format('truetype');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedRegular.eot');
	src: local('Boxed Regular'), local('BoxedRegular'),
		url('assets/fonts/BoxedRegular.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedRegular.woff') format('woff'),
		url('assets/fonts/BoxedRegular.ttf') format('truetype');
	font-weight: 500;
	font-style: 500;
}


@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedRegular-Bold.eot');
	src: local('Boxed Regular Bold'), local('BoxedRegular-Bold'),
		url('assets/fonts/BoxedRegular-Bold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedRegular-Bold.woff') format('woff'),
		url('assets/fonts/BoxedRegular-Bold.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}


@font-face {
	font-family: 'Bad Script';
	src: url('assets/fonts/BadScript-Regular.eot');
	src: local('Bad Script Regular'), local('BadScript-Regular'),
		url('assets/fonts/BadScript-Regular.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BadScript-Regular.woff') format('woff'),
		url('assets/fonts/BadScript-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}


@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNovaT-Thin.eot');
	src: local('Proxima Nova Thin'), local('ProximaNovaT-Thin'),
		url('assets/fonts/ProximaNovaT-Thin.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNovaT-Thin.woff') format('woff'),
		url('assets/fonts/ProximaNovaT-Thin.ttf') format('truetype');
	font-weight: 100;
	font-style: normal;
}

@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Light.eot');
	src: local('Proxima Nova Light'), local('ProximaNova-Light'),
		url('assets/fonts/ProximaNova-Light.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Light.woff') format('woff'),
		url('assets/fonts/ProximaNova-Light.ttf') format('truetype');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Regular.eot');
	src: local('Proxima Nova Regular'), local('ProximaNova-Regular'),
		url('assets/fonts/ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Regular.woff') format('woff'),
		url('assets/fonts/ProximaNova-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}




</style>
