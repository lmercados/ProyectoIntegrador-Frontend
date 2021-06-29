export default {
    data: () => ({
        Rules: [v => (v && v.trim.length <= 0) || 'Este Campo es Requerido'],
        Rules_Select: [v => !!v || 'Este Campo es Requerido'],
        emailRules: [
            v => !!v || 'Este Campo es Requerido',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
    })
};