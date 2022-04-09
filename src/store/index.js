import { createStore } from 'vuex'

export default createStore({
    state(){
        return {
            // Отслеживаемые состояния
            actionsLock: false,
            selectedCube: null,
            currentCubeMenu: null,
            activeCubeSide: null,
            activeModal: false,
            fulcrum: false,
            activeTheme: 'mix',
            changeThemeProcess: {
                status: false,
                viewpoint: false,
                fragmentsAnimation: false,
                transitionTime: 1.5
            },
            activeManual: false,
            // Статичные данные
            content: {},
        }
    },

    getters: {

    },

    mutations: {
        setActionsLock(state, val){
            state.actionsLock = val;
        },
        setFulcrum(state, val){
            state.fulcrum = val;
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
        setActiveModal(state, val){
            state.activeModal = val;
        },
        setChangeThemeProcess(state, val){
            state.changeThemeProcess.status = val[0];
            state.changeThemeProcess.viewpoint = val[1];
            state.changeThemeProcess.fragmentsAnimation = val[2];
        },
        setActiveTheme(state, theme){
            state.activeTheme = theme;
        },
        setActiveManual(state, val){
            state.activeManual = val;
        }
    },

    actions: {
        interactiveNavi({state, commit}, elem){
            const cubeName = elem.closest('section').classList[1];
            const cubeSide = elem.closest('article');
            console.log(elem)
            switch(elem.tagName.toLowerCase()){
                case 'button':
                    commit('setSelectedCube', cubeName);
                    commit('setActiveCubeSide', cubeSide.classList[0]);
                    if(!state.actionsLock){
                        commit('setActiveModal', true);
                    }
                    break;
                case 'article':
                case 'div':
                case 'h2':
                case 'p':
                    if(state.selectedCube != cubeName){
                        commit('setSelectedCube', cubeName);
                        commit('setActiveCubeSide', null);
                    }else{
                        if(state.activeCubeSide == cubeSide.classList[0] && cubeSide.dataset.name){
                            commit('setActiveModal', true);
                        }
                        commit('setActiveCubeSide', cubeSide.classList[0]);
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
                        setTimeout(() => {  // Задержка для того, чтобы в компоненте было отслежено изменение состояния selectedCube. 
                            commit('setSelectedCube', elemName);
                            link.closest('nav').classList.remove('show');
                        }, 50);
                    break;
                case 'submenu':
                    if(state.activeCubeSide != elemName){
                        commit('setActiveCubeSide', elemName);
                    }else{
                        if(state.activeModal != link.dataset.name){
                            commit('setActiveModal', link.dataset.name);
                        }
                    }
                    break;
            }
        },

        async changeTheme({state, commit}, themeName){
            if(state.changeThemeProcess.status) return;
            commit('setChangeThemeProcess', [true, false, false]);
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            commit('setChangeThemeProcess', [true, true, false]);
            await new Promise((resolve, reject) => setTimeout(resolve, state.changeThemeProcess.transitionTime * 1000));
            commit('setChangeThemeProcess', [true, true, true]);
            await new Promise((resolve, reject) => setTimeout(resolve, 4000));
            commit('setActiveTheme', themeName);
            await new Promise((resolve, reject) => setTimeout(resolve, 4000));
            commit('setChangeThemeProcess', [true, false, false]);
            await new Promise((resolve, reject) => setTimeout(resolve, state.changeThemeProcess.transitionTime * 1000));
            commit('setChangeThemeProcess', [false, false, false]);
        }
    }
})
