export default {
    data: () => ({
        textRules:   [
            v => !!v || 'Name is required'
          ],
        selectRules:  [v => !!v || 'Item is required'],
        emailRules: [
            v => !!v || 'Este Campo es Requerido',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
    })
};