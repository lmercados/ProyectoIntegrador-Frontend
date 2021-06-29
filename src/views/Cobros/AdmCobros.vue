<template>
  <div>
    <v-data-table
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1 ma-4"
      :items-per-page="20"
    >
      <template v-slot:top>
        <v-card-title class="blue--text">Administrar Cobros</v-card-title>
        <v-toolbar flat color="white">
          <v-text-field label="Search" v-model="search" @input="buscarCliente()" class="mx-4"></v-text-field>

          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row class="grey lighten-4 mx-auto">
                  <v-card-title class="blue--text">Realizar Pago</v-card-title>
                </v-row>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" xs="12" md="4">
                        <v-text-field v-model="editedItem.cliente" label="Nombre" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" md="4">
                        <v-text-field readonly v-model="editedItem.montoPagar" label="Monto"></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" md="4" class="align-self-center">
                        <v-select
                          item-text="tipo"
                          item-value="tipoPagoID"
                          :items="dataFormaPago"
                          label="Forma de Pago"
                          v-model="editedItem.formaPagoID"
                          required
                          :rules="Rules_Select"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" xs="12" md="12" class="align-self-end">
                        <v-textarea
                          outlined
                          dense
                          name="input-7-4"
                          auto-grow
                          label="Observación"
                          rows="4"
                          row-height="24"
                          v-model="editedItem.observacion"
                          required
                          :rules="Rules"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" xs="12" md="6" class="align-self-center">
                        <v-text-field
                          v-model="editedItem.montoPagado"
                          label="Monto a Pagar"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" md="6" class="align-self-center">
                        <v-text-field v-model="editedItem.balance" label="Balance" outlined dense></v-text-field>
                      </v-col>
                      <v-divider></v-divider>
                      <v-col cols="12" xs="12" md="12">
                        <v-file-input
                          v-model="editedItem.files"
                          label="Agrega tus documentos"
                          multiple
                          prepend-icon="mdi-folder"
                        >
                          <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">{{ text }}</v-chip>
                          </template>
                        </v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="d-flex justify-space-between grey lighten-4">
                      <v-col cols="12" md="4" class="d-flex align-center">
                        <v-checkbox
                          v-model="editedItem.factura"
                          label="Con Factura"
                          color="success"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" md="4" class="d-flex align-center">
                        <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Pagar</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <download-excel
            class="blue--text ma-2"
            :data="data"
            worksheet="Datos"
            name="Clientes.xls"
          >
            <v-icon class="green--text" medium>mdi-microsoft-excel</v-icon>EXPORTAR
          </download-excel>
        </v-toolbar>
        <v-row justify="center">
          <v-dialog
            v-model="dialogHistorial"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-toolbar dark class="grey lighten-4">
              <v-btn icon dark class="header red" @click="dialogHistorial=!dialogHistorial">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-card-title class="blue--text">Historial de Pagos</v-card-title>
            </v-toolbar>
            <v-card>
              <v-data-table
                :headers="headersHistorial"
                :items="dataHistorial"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon medium class="mr-2" @click="verHistorial(item)">mdi-eye-outline</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import alertas from "@/missing/Alertas";
import validaciones from "@/missing/Validaciones";
import Factura from "@/components/Factura";
import formato from "@/missing/Formatos";
import token from "@/missing/ConfigToken";
import { mapMutations, mapState } from "vuex";
import router from "@/router";
export default {
  mixins: [validaciones, alertas, token],
  components: {
    Factura
  },
  data: () => ({
    verFactura: true,
    dataFactura: [],
    dataCliente: [],
    dialog: false,
    dialogHistorial: false,
    payload: {},
    dataFormaPago: [],
    loading: true,
    valid: true,
    data: [],
    search: "",
    dataHistorial: [],
    editedItem: {
      clienteSeguroID: 0,
      files: [],
      factura: false,
      balance: 0,
      pagoID: 0,
      cliente: "",
      montoPagar: 0,
      observacion: "",
      formaPagoID: 0,
      cedula: "",
      montoActual: 0,
      montoPagado: 0,
      pago: 0
    },
    defaultItem: {
      clienteSeguroID: 0,
      files: [],
      factura: false,
      balance: 0,
      pagoID: 0,
      cliente: "",
      montoPagar: 0,
      observacion: "",
      formaPagoID: 0,
      cedula: "",
      montoActual: 0,
      montoPagado: 0,
      pago: 0
    },
    headers: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "pagoID"
      },
      {
        text: "CLIENTE",
        value: "cliente",
        class: ["white--text blue"],
        align: "center"
      },{
        text: "CEDULA",
        value: "cedula",
        class: ["white--text blue"],
        align: "center"
      },

      {
        text: "MONTO A PAGAR",
        value: "montoPagar",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "MONTO PAGADO",
        value: "montoPagado",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "STATUS",
        value: "pago",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Fecha",
        value: "updatedAt",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "ACCIONES",
        value: "actions",
        class: ["white--text blue"],
        align: "center"
      }
    ],
    headersHistorial: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "ID"
      },
      {
        text: "MONTO A PAGAR",
        value: "montoPagar",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "MONTO PAGADO",
        value: "montoPagado",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "STATUS",
        value: "pago",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Fecha",
        value: "updatedAt",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Forma de Pago",
        value: "tipo",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Observación",
        value: "observacion",
        class: ["white--text blue"],
        align: "center"
      }
    ]
  }),
  watch: {
    verFactura(val) {
      val || this.closeFactura();
    }
  },
  closeFactura() {
    this.verFactura = false;
  },
  created() {
    this.buscarFormaPago();
  },
  methods: {
    ...mapMutations(["modificarFactura", "modificarCliente"]),
    buscarCliente() {
      this.axios
        .get(`/clientes-pagos/${this.search}`, this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    buscarFormaPago() {
      this.axios
        .get("/clientes-forma-pago", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataFormaPago = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verHistorial(item) {
      this.buscarHistorial(item.pagoID);
      this.dialogHistorial = true;
    },
    buscarHistorial(id) {
      this.axios
        .get(`/clientes-pagos-historial/${id}`, this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataHistorial = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buscarFactura() {
      const factura = [
        {
          descripcion: this.editedItem.observacion,
          valor: this.editedItem.montoPagado
        },
        {
          descripcion: ""
        },
        {
          vacio: "SUBTOTAL",
          valor: this.editedItem.montoPagado
        },
        {
          vacio: "ITBIS",
          valor: this.editedItem.montoPagado * 0.18
        },
        {
          vacio: "TOTAL",
          valor:
            this.editedItem.montoPagado * 0.18 + this.editedItem.montoPagado
        }
      ];

      const cliente = {
        nombre: this.editedItem.cliente,
        cedula: this.editedItem.cedula
      };
      this.modificarFactura(factura);
      this.modificarCliente(cliente);
      router.push({ name: "Factura" });
    },
    save() {
      let valor = 0;
      if (this.$refs.form.validate()) {
        if (!isNaN(this.editedItem.montoPagado)) {
          valor = this.editedItem.montoPagar - this.editedItem.montoPagado;

          if (valor < 0) {
            this.payload.mensaje =
              "El Valor a Pagar no debe ser mayor al Adeudado";
            this.alertError(this.payload);
            return;
          } else {
            if (valor == 0) {
              this.editedItem.pago = true;
            } else {
              this.editedItem.pago = false;
            }
          }
        } else {
          this.payload.mensaje = "Solo Números Por Favor";
          this.alertError(this.payload);
          return;
        }
        const formData = new FormData();
        for (const key in this.editedItem.files) {
          if (this.editedItem.files.hasOwnProperty(key)) {
            formData.append("files", this.editedItem.files[key]);
          }
        }

        formData.append("montoPagar", this.editedItem.montoPagar);
        formData.append("observacion", this.editedItem.observacion);
        formData.append("montoPagado", this.editedItem.montoPagado);
        formData.append("pago", this.editedItem.pago);
        formData.append("formaPagoID", this.editedItem.formaPagoID);
        formData.append("cliente", this.editedItem.cliente);
       /* if (!this.editedItem.balance) {
          formData.append("balance", 0);
        } else {
       
        }*/
        formData.append("balance", this.editedItem.balance);
        formData.append("clienteSeguroID", this.editedItem.clienteSeguroID);
        this.axios
          .put(
            `/clientes-pagos/${this.editedItem.pagoID}`,
            formData,
            this.buscarToken()
          )
          .then(res => {
            if (res.data === "Ok") {
              this.payload.mensaje = "Pago realizado correctamente";
              this.payload.dialog = this.dialog;
              this.alertSave(this.payload);

              if (this.editedItem.factura == true) {
                this.buscarFactura();
              }

              this.close();
            } else {
              this.payload.mensaje = "Este Pago no puedo ser realizado";
              this.alertError(this.payload);
            }
          })
          .catch(err => {
            this.payload.mensaje = "Este Pago no puedo ser realizado";
            this.alertError(this.payload);
          });
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>
