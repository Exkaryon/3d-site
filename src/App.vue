<template>
    <div id="cover" :class="[$store.state.activeTheme, {modalactive: $store.state.activeModal}]">
        <TopBar></TopBar>
        <SubMenu></SubMenu>
        <Viewport :contentLoaded="contentLoaded" ></Viewport>
        <Modal></Modal>
    </div>
</template>




<script>
export default {
    name: 'App',
    components: { },
    data(){
        return {
            contentLoaded: false,
        }
    },

    methods: {
        // Загрузка контента.
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
    },


    created(){
        this.getContentFromServer();
    }
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
</style>
