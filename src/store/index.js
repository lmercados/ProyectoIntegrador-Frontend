import Vue from 'vue';
import Vuex from 'vuex';
import decode from 'jwt-decode';
import router from '../router/index'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        dataFactura: [],
        dataCliente: {
            nombre: 'Luis Mercado',
            cedula: '402-11296518'
        },
        token: 'sdcsdc',
        usuarioDB: {
            nombre: 'Luis Mercado',
            cedula: '402-11296518'
        },
        verFactura: false


    },
    mutations: {

        modificarVerFactura(state, valor) {
            state.verFactura = valor;


        },
        modificarFactura(state, payload) {
            state.dataFactura = payload;

        },
        modificarCliente(state, payload) {
            state.dataCliente = payload;

        },
        obtenerUsuario(state, payload) {
            state.token = payload;
            if (payload === '') {
                state.usuarioDB = '';
            } else {
                const datos = decode(payload);
                state.usuarioDB = datos.data;



            }
        }
    },
    actions: {
        guardarUsuario({ commit }, payload) {

            localStorage.setItem('token', payload);
            commit('obtenerUsuario', payload);


        }

    },

    getters: {
        devolverToken: state => {
            return state.token;
        },
        devolverUsuario: state => {
            return state.usuarioDB;
        }
    },
    modules: {}
})