<template>
  <v-data-table
    :loading="loading"
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="data"
    sort-by="calories"
    class="elevation-1 ma-4"
    :items-per-page="20"
  >
    <template v-slot:top>
      <v-card-title class="blue--text">Administrar Novedades</v-card-title>
      <v-toolbar flat color="white">
        <v-text-field v-model="search" @input="consultarProceso()" label="Search" class="mx-4"></v-text-field>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="grey lighten-4 mx-auto">
                <v-card-title class="blue--text">{{formTitle}}</v-card-title>
              </v-row>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" xs="12" md="12">
                      <v-text-field
                        disabled
                        :rules="Rules"
                        v-model="editedItem.Cliente"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" md="4">
                      <v-select
                        item-text="seguro"
                        item-value="seguroID"
                        :items="dataSeguro"
                        label="Seguro"
                        v-model="editedItem.seguroID"
                        @change="tipoPlan($event,editedItem.seguroID)"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" xs="12" md="4">
                      <v-select
                        item-text="plan"
                        item-value="planID"
                        :items="dataTipoSeguro"
                        v-model="editedItem.tipoSeguroID"
                        label="Tipo de Plan"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" xs="12" md="4">
                      <v-select
                        item-text="vendedor"
                        item-value="vendedorID"
                        :items="dataVendedor"
                        v-model="editedItem.vendedorID"
                        label="Vendedor"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="editedItem.numeroSeguridadSocial" label="NSS" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="editedItem.numeroAsegurado"
                        label="N.Asegurado"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        item-text="estado"
                        item-value="estadoID"
                        :items="dataEstado"
                        label="Estado"
                        v-model="editedItem.estadoID"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="12">
                      <v-checkbox v-model="depediente" label="Depedientes ?"></v-checkbox>
                    </v-col>

                    <v-col v-if="depediente" cols="12" md="12">
                      <v-form ref="formTwo" v-model="validTwo" lazy-validation>
                        <v-row v-if="depediente">
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="depedientes.nombre"
                              :rules="Rules"
                              label="Nombre"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="depedientes.apellido"
                              :rules="Rules"
                              label="Apellido"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field v-model="depedientes.cedula" label="Cédula"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="depedientes.numeroAsegurado"
                              label="Número Asegurado"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-select
                              item-text="estado"
                              item-value="estadoID"
                              :items="dataEstadoDependientes"
                              label="Estado"
                              :rules="Rules_Select"
                              v-model="depedientes.estadoID"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="4" class="d-flex align-center">
                            <v-btn small color="success" @click="agregarDepediente()">Agregar</v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-data-table
                        :headers="headersDepedientesOne"
                        :items="dataDepedientes"
                        class="elevation-1"
                        hide-default-footer
                      >
                        <template v-slot:item.acciones="{ item }">
                          <v-icon small class="mr-2" @click="editItemDepedientes(item)">mdi-pencil</v-icon>
                          <v-icon small @click="deleteItemDepedientes(item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        item-text="cliente"
                        item-value="clienteID"
                        :items="dataReferido"
                        label="Referido Por"
                        v-model="editedItem.referidoID"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        solo
                        v-model="editedItem.montoPagar"
                        label="Monto a Pagar"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>
              <v-row class="mx-auto">
                <v-col cols="12" class="grey lighten-4 d-flex justify-end">
                  <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
        <download-excel class="blue--text ma-2" :data="data" worksheet="Datos" name="Clientes.xls">
          <v-icon class="green--text" medium>mdi-microsoft-excel</v-icon>EXPORTAR
        </download-excel>
      </v-toolbar>
      <v-row justify="center">
        <v-dialog
          v-model="dialogDepediente"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-toolbar dark class="grey lighten-4">
            <v-btn icon dark class="header red" @click="dialogDepediente=!dialogDepediente">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-title class="blue--text">Depedientes</v-card-title>
          </v-toolbar>
          <v-card>
            <v-data-table
              :headers="headersDepedientesTwo"
              :items="dataDepedientes"
              class="elevation-1"
              hide-default-footer
            ></v-data-table>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon medium class="mr-2" @click="verDepedientes(item)">mdi-eye-outline</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>
<script>
import alertas from "@/missing/Alertas";
import validaciones from "@/missing/Validaciones";
import formato from "@/missing/Formatos";
import token from "@/missing/ConfigToken";
import "@/assets/estilos.css";
export default {
  mixins: [validaciones, alertas, token],
  data: () => ({
    dialogDepediente: false,
    carnet: false,
    depediente: false,
    data: [],
    dataDepedientes: [],
    dataVendedor: [],
    dataReferido: [],
    dataSeguro: [],
    dataEstado: [],
    dataEstadoDependientes: [],
    selectEstadoDepediente: {},
    dataTipoSeguro: [],
    editedIndexDependiente: -1,
    payload: {},
    menu: false,
    search: "",
    valid: true,
    validTwo: true,
    dialog: false,
    dialogDepediente: false,
    loading: true,
    payload: {},
    headersDepedientesOne: [
      {
        text: "Nombre",
        class: ["white--text blue"],
        align: "center",
        value: "nombre"
      },
      {
        text: "Apellido",
        class: ["white--text blue"],
        align: "center",
        value: "apellido"
      },
      {
        text: "Cédula",
        class: ["white--text blue"],
        align: "center",
        value: "cedula"
      },
      {
        text: "NSS",
        class: ["white--text blue"],
        align: "center",
        value: "numeroAsegurado"
      },
      {
        text: "Estado",
        class: ["white--text blue"],
        align: "center",
        value: "estado"
      },
      {
        text: "ACCIONES",
        value: "acciones",
        class: ["white--text blue"],
        align: "center"
      }
    ],

    headersDepedientesTwo: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "depedienteID"
      },
      {
        text: "Nombre",
        class: ["white--text blue"],
        align: "center",
        value: "nombres"
      },
      {
        text: "Cédula",
        class: ["white--text blue"],
        align: "center",
        value: "cedula"
      },
      {
        text: "NSS",
        class: ["white--text blue"],
        align: "center",
        value: "numeroAsegurado"
      },
      {
        text: "Estado",
        class: ["white--text blue"],
        align: "center",
        value: "estado"
      }
    ],
    headers: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "clienteSeguroID"
      },
      {
        text: "CLIENTE",
        value: "Cliente",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "VENDEDOR",
        value: "Vendedor",
        class: ["white--text blue"],
        align: "center"
      },

      {
        text: "SEGURO",
        value: "seguro",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "PLAN",
        value: "plan",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "NSS",
        value: "numeroSeguridadSocial",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "NÚMERO DE ASEGURADO",
        value: "numeroAsegurado",
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
        text: "ACCIONES",
        value: "actions",
        class: ["white--text blue"],
        align: "center"
      }
    ],
    data: [],
    depedientes: {
      clienteSeguroID: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      numeroAsegurado: "",
      estadoID: 0,
      estado: ""
    },
    defaultdepedientes: {
      clienteSeguroID: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      numeroAsegurado: "",
      estadoID: 0,
      estado: ""
    },
    editedIndex: -1,
    editedItem: {
      referidoID: 0,
      Cliente: "",
      clienteID: 0,
      seguroID: 0,
      tipoSeguroID: 0,
      numeroAsegurado: "",
      numeroSeguridadSocial: "",
      vendedorID: 0,
      montoPagar: 0,
      depedientes: [],
      estadoID: 0,
      estado: ""
    },
    defaultItem: {
      referidoID: 0,
      Cliente: "",
      clienteID: 0,
      seguroID: 0,
      tipoSeguroID: 0,
      numeroAsegurado: "",
      numeroSeguridadSocial: "",
      vendedorID: 0,
      montoPagar: 0,
      depedientes: [],
      estadoID: 0,
      estado: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Novedad" : "Editar Novedad";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  created() {
    this.initialize();
    this.seguros();
    this.vendedores();
    this.clientesEstados();
    this.clienteReferidos();
  },

  methods: {
    vendedores() {
      this.axios
        .get("/vendedor", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataVendedor = res.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    agregarDepediente() {
      if (this.$refs.formTwo.validate()) {
        if (this.editedIndexDependiente > -1) {
          this.depedientes.estado = this.dataEstadoDependientes[
            this.depedientes.estadoID - 1
          ].estado;
          this.depedientes.clienteSeguroID = this.editedItem.clienteSeguroID;
          Object.assign(
            this.dataDepedientes[this.editedIndexDependiente],
            this.depedientes
          );
        } else {
          this.depedientes.estado = this.dataEstadoDependientes[
            this.depedientes.estadoID - 1
          ].estado;
          this.depedientes.clienteSeguroID = this.editedItem.clienteSeguroID;
          this.dataDepedientes.push(this.depedientes);
        }
        this.closeDependiente();
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    seguros() {
      this.axios
        .get("/seguros", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataSeguro = res.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clienteReferidos() {
      this.axios
        .get("/clientes", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataReferido = res.data;
          
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verDepedientes(item) {
      this.buscarDepedientes(item.clienteSeguroID);
      this.dialogDepediente = true;
    },
    buscarDepedientes(id) {
      this.dataDepedientes = [];
      this.axios
        .get(`/clientes-depedientes/${id}`, this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataDepedientes = res.data;
            this.depediente = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tipoPlan(id) {
      this.dataTipoSeguro = [];
      this.axios
        .get(`/seguroplanes/${id}`, this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
                 this.dataTipoSeguro = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clientesEstados() {
      this.dataEstado = [];
      this.dataEstadoDependientes = [];
      this.axios
        .get("/estados", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataEstado = res.data;
            this.dataEstadoDependientes = res.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initialize() {
    
      this.axios
        .get("/clientes-seguros", this.buscarToken())
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
    consultarProceso() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/clientes-seguros/all/${this.search}`, this.buscarToken())
          .then(res => {
            if (res.data.length > 0) {
              this.data = res.data;
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    updateSolicitud() {
      this.editedItem.depedientes = this.dataDepedientes;

      this.axios
        .put(
          `/clientes-seguros/${this.editedItem.clienteSeguroID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then(res => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Solicitud modificada correctamente";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          } else {
            this.payload.mensaje = "Esta solicitud no puede ser modificada";
            this.alertError(this.payload);
          }
        })
        .catch(err => {
          this.payload.mensaje = "Esta solicitud no puede ser modificada";
          this.alertError(this.payload);
        });
    },
    borrarNovedad() {
      this.axios
        .delete(
          `/clientes-seguros/${this.editedItem.clienteSeguroID}`,
          this.buscarToken()
        )
        .then(res => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Solicitud eliminada correctamente!!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
          } else {
            this.payload.mensaje = "Este solicitud no pudo ser eliminada";
            this.alertError(this.payload);
          }
        })
        .catch(err => {
          this.payload.mensaje = "Esta solicitud no pudo ser eliminada";
          this.alertError(this.payload);
        });
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.buscarDepedientes(this.editedItem.clienteSeguroID);
      this.tipoPlan(this.editedItem.seguroID);
      this.dialog = true;
    },
    editItemDepedientes(item) {
      this.editedIndexDependiente = this.dataDepedientes.indexOf(item);
      this.depedientes = Object.assign({}, item);
    },
    async deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.payload.mensaje = "Desea Eliminar este Registro ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarNovedad();
      }
    },
    async deleteItemDepedientes(item) {
      const index = this.dataDepedientes.indexOf(item);
      this.payload.mensaje = "Desea Eliminar este Registro ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.dataDepedientes.splice(index, 1);
      }
    },
    closeDependiente() {
      this.selectEstadoDepediente = {};
      this.$nextTick(() => {
        this.depedientes = Object.assign({}, this.defaultdepedientes);
        this.editedIndexDependiente = -1;
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.updateSolicitud();
        }
      }
    }
  }
};
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>