var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default {
    methods: {
        FormatoMoneda(valor) {
            return formatter.format(valor);
        }
    }
};