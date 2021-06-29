import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['devolverToken'])
    },
    methods: {
        buscarToken() {

            let config = {
                headers: {
                    token: this.devolverToken
                }

            }

            return config;
        }
    },

};