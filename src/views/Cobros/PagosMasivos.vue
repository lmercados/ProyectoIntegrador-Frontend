<template>
  <div>
    <v-row class="ma-4">
      <v-data-table
        :headers="headers"
        :items="datos"
        border
        highlight-current-row
        style="width: 100%;margin-top:20px;"
        :item-class="rowClass"
        hide-default-footer
      >
        <template v-slot:top>
          <v-row class="d-flex justify-start ma-2">
            <v-card-title class="blue--text grey lighten-4">CARGA MASIVA DE PAGOS</v-card-title>
          </v-row>
          <v-row class="d-flex justify-end ma-2">
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
          </v-row>
        </template>
      </v-data-table>

      <v-row class="ma-4 d-flex justify-end">
        <v-btn dark class="success" @click="savePago()">PAGAR</v-btn>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadFile.vue";
import alertas from "@/missing/Alertas";
import token from "@/missing/ConfigToken";
export default {
  mixins: [token, alertas],
  components: { UploadExcelComponent },
  data() {
    return {
      payload: {},
      cedula: [],
      datos: [],
      tableData: [],
      tableHeader: [],
      headers: [
        {
          text: "ID",
          class: ["white--text blue"],
          align: "center",
          value: "clienteSeguroID"
        },
        {
          text: "CÉDULA",
          class: ["white--text blue"],
          align: "center",
          value: "cedula"
        },
        {
          text: "CLIENTE",
          class: ["white--text blue"],
          align: "center",
          value: "cliente"
        },
        {
          text: "MONTO",
          value: "montoPagar",
          class: ["white--text blue"],
          align: "center"
        },
        {
          text: "MONTO A PAGAR",
          value: "montoPagado",
          class: ["white--text blue"],
          align: "center"
        },
        {
          text: "PAGOS PENDIENTES",
          value: "cantidadPendiente",
          class: ["white--text blue"],
          align: "center"
        }
      ]
    };
  },
  methods: {
    rowClass(item) {
      if (item.clienteSeguroID == 0) {
        return "red--text";
      } else {
        return "white";
      }
    },
    buscarClientes() {
      for (const key in this.tableData) {
        if (this.tableData.hasOwnProperty(key)) {
          this.cedula.push(this.tableData[key].cedula);
        }
      }

      this.axios
        .post("/clientes-seguros-cedula", this.cedula, this.buscarToken())
        .then(res => {
          if (res.status == 200) {
            this.datos = [];
            const data = res.data;
            let existe = false;
            let posicion = 0;
            for (let i = 0; i < this.tableData.length; i++) {
              for (let index = 0; index < data.length; index++) {
                if (data[index].cedula == this.tableData[i].cedula) {
                  posicion = index;
                  existe = true;
                }
              }

              if (existe) {
                this.datos.push({
                  cliente: data[posicion].cliente,
                  clienteSeguroID: data[posicion].clienteSeguroID,
                  pagoID: data[posicion].pagoID,
                  cedula: data[posicion].cedula,
                  montoPagar: data[posicion].montoPagar,
                  montoPagado: this.tableData[i].montoPagado,
                  cantidadPendiente: data[posicion].cantidadPendiente
                });
              } else {
                this.datos.push({
                  cliente: "NO EXISTE",
                  clienteSeguroID: 0,
                  cedula: this.tableData[i].cedula,
                  montoPagar: 0,
                  montoPagado: this.tableData[i].montoPagado,
                  cantidadPendiente: 0
                });
              }
              existe = false;
            }
          } else {
            this.payload.mensaje = "Error al consultar clientes";
            this.alertError(this.payload);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    savePago() {
      for (let index = 0; index < this.datos.length; index++) {
        if (this.datos[index].clienteSeguroID == 0) {
          this.payload.mensaje = "Algunos clientes no existen O";
          return this.alertError(this.payload);
        }
        if (this.datos[index].cantidadPendiente > 1) {
          this.payload.mensaje =
            "Algunos clientes tienen más de un pago atrasado";
          return this.alertError(this.payload);
        }
      }
      ///cálculos de pagos
      
      for (let index = 0; index < this.datos.length; index++) {
         let valor = 0;
        if (!isNaN(this.datos[index].montoPagado)) {
          valor = this.datos[index].montoPagar - this.datos[index].montoPagado;

          if (valor < 0) {
            this.payload.mensaje =
              "El Valor a Pagar no debe ser mayor al Adeudado";
            this.alertError(this.payload);
            return;
          } else {
            if (valor == 0) {
              this.datos[index].pago = true;
            } else {
              this.datos[index].pago = false;
            }
          }
        } else {
          this.payload.mensaje = "Solo Números Por Favor";
          this.alertError(this.payload);
          return;
        }
      }

      this.axios
        .put("clientes-pagos-masivo", this.datos, this.buscarToken())
        .then(res => {
          if (res.data === "Ok") {
            this.payload.mensaje = "Pagos realizado correctamente";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.datos=[];
          } else {
            this.payload.mensaje = "Este Pago no puedo ser realizado";
            this.alertError(this.payload);
          }
        })
        .catch(err => {
          console.log(err);
          this.payload.mensaje = "Este Pago no puedo ser realizado";
          this.alertError(this.payload);
        });
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }

      return false;
    },
    handleSuccess({ results }) {
      this.tableData = [];
      for (const key in results) {
        if (results.hasOwnProperty(key)) {
          this.tableData.push({
            cedula: results[key].cedula,
            montoPagado: results[key].montoPagado
          });
        }
      }

      this.buscarClientes();
    }
  }
};
</script>
