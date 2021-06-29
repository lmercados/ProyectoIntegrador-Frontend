export default {
    methods: {
        alertConfirmar(mensaje) {
            return this.$confirm("", mensaje, "question")
                .then(r => {

                    return true;
                })
                .catch(error => {
                    return false;
                });
        },
        async alertSave(payload) {

            this.$alert(payload.mensaje, "Éxito", "success").then(
                () => (payload.dialog = false)

            );

            return true;
        },
        alertError(payload) {
            this.$alert(payload.mensaje, "Error", "error");
        }

    }
};