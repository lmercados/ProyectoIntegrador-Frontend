<template>
  <div>
    <div ref="content" class="white">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="ma-2 pa-1">
            <v-row class="d-flex justify-center">
              <v-col  cols="12" md="6" xs="12">
                <v-text-field label="Titulo de la Factura"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" tag="strong">
                <v-col cols="12" xs="12" md="12">
                  <v-text-field label="NFC"></v-text-field>
                  <p>RNC O CÉDULA : {{dataCliente.cedula}}</p>
                  <p>Nombre o Razón Social: {{dataCliente.nombre}}</p>
                  <p>Fecha de Factura : {{devolverFecha()}}</p>
                </v-col>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xs="12">
                <v-data-table
                  loading-text="Loading... Please wait"
                  :headers="headers"
                  :items="dataFactura"
                  class="elevation-1"
                  hide-default-footer
                ></v-data-table>
                <v-row class="d-flex justify-space-around">
                  <v-col md="4">
                    <v-text-field readonly></v-text-field>
                    <p class="text-center">Despachado Por</p>
                  </v-col>
                  <v-col md="4" readonly>
                    <v-text-field></v-text-field>
                    <p class="text-center">Recibido Por</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" cols="12">
                    <v-btn small color="green white--text" @click="generarFactura">Generar Factura</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import router from "@/router";
import "@/assets/estilos.css";
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    nombre: "",
    cedula: "",
    headers: [
      {
        text: "DESCRIPCIÓN",
        value: "descripcion",
        class: ["white--text"],
        align: "center",
        sortable: false
      },
      {
        text: "",
        value: "vacio",
        class: ["white--text"],
        align: "center",
        sortable: false
      },
      {
        text: "VALOR",
        value: "valor",
        class: ["white--text"],
        align: "center",
        sortable: false
      }
    ]
  }),
  computed: {
    ...mapState(["dataCliente", "dataFactura"])
  },
  methods: {
    closeFactura() {
      this.ver = false;
    },
    ...mapMutations(["modificarVerFactura"]),
    devolverFecha() {
      const d = new Date();
      const yy = d.getFullYear();
      const mm = d.getMonth() + 1;
      const dd = d.getDate();
      return `${yy + "-" + mm + "-" + dd}`;
    },
    close() {
      this.verFactura = false;
    },
    generarFactura() {
      const name = this.dataCliente.nombre;
      const doc = new jspdf({
        orientation: "landscape"
      });
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function(
        canvas
      ) {
        const img = canvas.toDataURL("image/jpeg", 0.8);
        doc.addImage(img, "JPEG", 20, 20);
        doc.save(name);
        router.push({ name: "AdmCobros" });
      });
    }
  }
};
</script>

<style>
.color {
  background-color: rgb(53, 58, 64) !important;
}
</style>