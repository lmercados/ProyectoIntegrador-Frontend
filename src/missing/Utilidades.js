export default {
    ordenarArray(arreglo) {
        return arreglo.sort((a, b) => b.ID - a.ID);
    }
}