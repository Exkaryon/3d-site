import { createStore } from 'vuex'

export default createStore({
    state(){
        return {
            // Отслеживаемые состояния
            actionsLock: false,
            selectedCube: null,
            currentCubeMenu: null,
            activeCubeSide: null,
            activeModalContent: null,
            fulcrum: false,

            // Статичные данные
            content: {},
        }
    },

    getters: {

    },

    mutations: {
        setActionsLock(state, value){
            state.actionsLock = value;
        },
        setFulcrum(state, value){
            state.fulcrum = value;
        },
        setContent(state, content){
            state.content = content;
        },
        setSelectedCube(state, linkData){
            state.selectedCube = linkData ? linkData : null;
        },
        setCurrentCubeMenu(state, cubeName){
            state.currentCubeMenu = cubeName;
        },
        setActiveCubeSide(state, sideName){
            state.activeCubeSide = sideName ? sideName : null;
        },
        setActiveModalContent(state, article){
            state.activeModalContent = article;
        }
    },

    actions: {
        interactiveNavi({state, commit}, elem){
            const cubeName = elem.closest('section').classList[1];
            const cubeSide = elem.closest('article');
            switch(elem.tagName.toLowerCase()){
                case 'button':
                    commit('setSelectedCube', cubeName);
                    commit('setActiveCubeSide', cubeSide.classList[0]);
                    if(!state.actionsLock){
                        commit('setActiveModalContent', cubeSide.dataset.name);
                    }
                    break;
                case 'article':
                    if(state.selectedCube != cubeName){
                        commit('setSelectedCube', cubeName);
                        commit('setActiveCubeSide', null);
                    }else{
                        commit('setActiveCubeSide', cubeSide.classList[0]);
                        if(state.activeCubeSide == cubeSide.classList[0]){
                            commit('setActiveModalContent', cubeSide.dataset.name);
                        }
                    }
                    break;
                case 'section':
                    commit('setSelectedCube', cubeName);
                    break;
            }
        },

        linkNavi({state, commit}, link){
            const type = link.closest('div[id]').id;
            const elemName = link.hash.replace('#', '');
            switch(type){
                case 'topbar':
                        commit('setSelectedCube', null);
                        commit('setActiveCubeSide', null);
                        setTimeout(() => {  // Задержка для того, чтобы в компоненте отработало отслеживание изменения. 
                            commit('setSelectedCube', elemName);
                        }, 50);
                    break;
                case 'submenu':
                    if(state.activeCubeSide != elemName){
                        commit('setActiveCubeSide', elemName);
                    }else{
                        if(state.activeModalContent != link.dataset.name){
                            commit('setActiveModalContent', link.dataset.name);
                        }
                    }
                    break;
            }

        }
    }
})
