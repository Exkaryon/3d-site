<template>
    <div id="cover" :class="[performanceClass, $store.state.activeTheme, {modalactive: $store.state.activeModal}]">
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
        }
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
/* 
@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Semibold.eot');
	src: local('Proxima Nova Semibold'), local('ProximaNova-Semibold'),
		url('assets/fonts/ProximaNova-Semibold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Semibold.woff') format('woff'),
		url('assets/fonts/ProximaNova-Semibold.ttf') format('truetype');
	font-weight: 600;
	font-style: normal;
}


@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Bold.eot');
	src: local('Proxima Nova Bold'), local('ProximaNova-Bold'),
		url('assets/fonts/ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Bold.woff') format('woff'),
		url('assets/fonts/ProximaNova-Bold.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Extrabld.eot');
	src: local('Proxima Nova Extrabold'), local('ProximaNova-Extrabld'),
		url('assets/fonts/ProximaNova-Extrabld.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Extrabld.woff') format('woff'),
		url('assets/fonts/ProximaNova-Extrabld.ttf') format('truetype');
	font-weight: 800;
	font-style: normal;
}

@font-face {
	font-family: 'Proxima Nova';
	src: url('assets/fonts/ProximaNova-Black.eot');
	src: local('Proxima Nova Black'), local('ProximaNova-Black'),
		url('assets/fonts/ProximaNova-Black.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/ProximaNova-Black.woff') format('woff'),
		url('assets/fonts/ProximaNova-Black.ttf') format('truetype');
	font-weight: 900;
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
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Thin.eot');
    src: local('TT Lakes Thin'), local('TTLakes-Thin'),
        url('assets/fonts/TTLakes-Thin.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Thin.woff') format('woff'),
        url('assets/fonts/TTLakes-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-ExtraLight.eot');
    src: local('TT Lakes ExtraLight'), local('TTLakes-ExtraLight'),
        url('assets/fonts/TTLakes-ExtraLight.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-ExtraLight.woff') format('woff'),
        url('assets/fonts/TTLakes-ExtraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Light.eot');
    src: local('TT Lakes Light'), local('TTLakes-Light'),
        url('assets/fonts/TTLakes-Light.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Light.woff') format('woff'),
        url('assets/fonts/TTLakes-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}


@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Regular.eot');
    src: local('TT Lakes Regular'), local('TTLakes-Regular'),
        url('assets/fonts/TTLakes-Regular.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Regular.woff') format('woff'),
        url('assets/fonts/TTLakes-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Medium.eot');
    src: local('TT Lakes Medium'), local('TTLakes-Medium'),
        url('assets/fonts/TTLakes-Medium.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Medium.woff') format('woff'),
        url('assets/fonts/TTLakes-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Bold.eot');
    src: local('TT Lakes Bold'), local('TTLakes-Bold'),
        url('assets/fonts/TTLakes-Bold.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Bold.woff') format('woff'),
        url('assets/fonts/TTLakes-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-DemiBold.eot');
    src: local('TT Lakes DemiBold'), local('TTLakes-DemiBold'),
        url('assets/fonts/TTLakes-DemiBold.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-DemiBold.woff') format('woff'),
        url('assets/fonts/TTLakes-DemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-ExtraBold.eot');
    src: local('TT Lakes ExtraBold'), local('TTLakes-ExtraBold'),
        url('assets/fonts/TTLakes-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-ExtraBold.woff') format('woff'),
        url('assets/fonts/TTLakes-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
}


@font-face {
    font-family: 'TT Lakes';
    src: url('assets/fonts/TTLakes-Black.eot');
    src: local('TT Lakes Black'), local('TTLakes-Black'),
        url('assets/fonts/TTLakes-Black.eot?#iefix') format('embedded-opentype'),
        url('assets/fonts/TTLakes-Black.woff') format('woff'),
        url('assets/fonts/TTLakes-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}




@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedSemibold.eot');
	src: local('Boxed Semibold'), local('BoxedSemibold'),
		url('assets/fonts/BoxedSemibold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedSemibold.woff') format('woff'),
		url('assets/fonts/BoxedSemibold.ttf') format('truetype');
	font-weight: 600;
	font-style: normal;
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
	src: url('assets/fonts/BoxedRegular-Bold.eot');
	src: local('Boxed Regular Bold'), local('BoxedRegular-Bold'),
		url('assets/fonts/BoxedRegular-Bold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedRegular-Bold.woff') format('woff'),
		url('assets/fonts/BoxedRegular-Bold.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedHeavy.eot');
	src: local('Boxed Heavy'), local('BoxedHeavy'),
		url('assets/fonts/BoxedHeavy.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedHeavy.woff') format('woff'),
		url('assets/fonts/BoxedHeavy.ttf') format('truetype');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'Boxed';
	src: url('assets/fonts/BoxedMedium.eot');
	src: local('Boxed Medium'), local('BoxedMedium'),
		url('assets/fonts/BoxedMedium.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedMedium.woff') format('woff'),
		url('assets/fonts/BoxedMedium.ttf') format('truetype');
	font-weight: 500;
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
	src: url('assets/fonts/BoxedRegular.eot');
	src: local('Boxed Regular'), local('BoxedRegular'),
		url('assets/fonts/BoxedRegular.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/BoxedRegular.woff') format('woff'),
		url('assets/fonts/BoxedRegular.ttf') format('truetype');
	font-weight: 500;
	font-style: normal;
}
 */



</style>
