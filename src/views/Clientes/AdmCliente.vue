<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="data"
      class="elevation-1 ma-4"
      :items-per-page="20"
    >
      <template v-slot:top>
        <v-card-title class="blue--text">Administrar Clientes</v-card-title>

        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            @input="consultarProceso()"
            label="Search"
            class="mx-4"
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="820px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="blue" dark class="mb-2" v-bind="attrs" v-on="on"
                >Nuevo Cliente</v-btn
              >
            </template>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1"
                  >Datos Personales</v-stepper-step
                >

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2"
                  >Datos Administrativos</v-stepper-step
                >
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row class="grey lighten-4 mx-auto">
                        <v-card-title class="blue--text">{{
                          formTitle
                        }}</v-card-title>
                      </v-row>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" xs="12" md="6">
                              <v-text-field
                                :rules="Rules"
                                v-model="editedItem.nombre"
                                label="Nombre"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xs="12" md="6">
                              <v-text-field
                                v-model="editedItem.apellido"
                                label="Apellido"
                                required
                                :rules="Rules"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" xs="12" md="6">
                              <v-text-field
                                v-model="editedItem.telefonoMovil"
                                label="Teléfono Móvil"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" xs="12" md="6">
                              <v-text-field
                                v-model="editedItem.telefonoResidencial"
                                label="Teléfono Residencial"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="editedItem.correoElectronico"
                                label="Correo Electrónico"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="editedItem.cedula"
                                :rules="Rules"
                                label="Cédula"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.fechaNacimiento"
                                    label="Fecha de Nacimiento"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="editedItem.fechaNacimiento"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1920-01-01"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-textarea
                                solo
                                name="input-7-4"
                                v-model="editedItem.direccion"
                                label="Dirección"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                          <v-btn color="blue darken-1" text @click="e1 = 2"
                            >Continue</v-btn
                          >
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" xs="12" md="4">
                              <v-select
                                item-text="seguro"
                                item-value="seguroID"
                                :items="dataSeguro"
                                label="Seguro"
                                v-model="editedItem.seguroID"
                                @change="tipoPlan($event, editedItem.seguroID)"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" xs="12" md="4">
                              <v-select
                                item-text="plan"
                                item-value="planID"
                                :items="dataTipoSeguro"
                                v-model="editedItem.planID"
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
                              <v-text-field
                                v-model="editedItem.numeroSeguridadSocial"
                                label="NSS"
                                required
                              ></v-text-field>
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
                              <v-checkbox
                                v-model="depediente"
                                label="Depedientes ?"
                              ></v-checkbox>
                            </v-col>

                            <v-col v-if="depediente" cols="12" md="12">
                              <v-form
                                ref="formTwo"
                                v-model="validTwo"
                                lazy-validation
                              >
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
                                    <v-text-field
                                      v-model="depedientes.cedula"
                                      label="Cédula"
                                    ></v-text-field>
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
                                  <v-col
                                    cols="12"
                                    md="4"
                                    class="d-flex align-center"
                                  >
                                    <v-btn
                                      small
                                      color="success"
                                      @click="agregarDepediente()"
                                      >Agregar</v-btn
                                    >
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
                                  <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItemDepedientes(item)"
                                    >mdi-pencil</v-icon
                                  >
                                  <v-icon
                                    small
                                    @click="deleteItemDepedientes(item)"
                                    >mdi-delete</v-icon
                                  >
                                </template>
                              </v-data-table>
                            </v-col>
                            <v-col cols="12" md="3">
                              <v-select
                                item-text="referencia"
                                item-value="referenciaID"
                                :items="dataReferido"
                                label="Referido Por"
                                v-model="editedItem.referenciaID"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                              <v-select
                                item-text="empresa"
                                item-value="empresaID"
                                :items="dataEmpresa"
                                label="Empresa"
                                v-model="editedItem.empresaID"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                              <v-text-field
                                solo
                                v-model="editedItem.montoPagar"
                                label="Monto a Pagar"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                              <v-text-field
                                solo
                                v-model="editedItem.balance"
                                label="Balance"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-divider></v-divider>
                          <v-row class="mx-auto">
                            <v-col
                              cols="12"
                              class="grey lighten-4 d-flex justify-end"
                            >
                              <v-btn color="green darken-1" text @click="e1 = 1"
                                >Back</v-btn
                              >
                              <v-btn color="error darken-1" text @click="close"
                                >Cancel</v-btn
                              >
                              <v-btn color="blue darken-1" text @click="save"
                                >Save</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-dialog>
          <download-excel
            class="blue--text ma-2"
            :data="data"
            worksheet="Datos"
            name="Clientes.xls"
          >
            <v-icon class="green--text" medium>mdi-microsoft-excel</v-icon
            >EXPORTAR
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
              <v-btn
                icon
                dark
                class="header red"
                @click="dialogDepediente = !dialogDepediente"
              >
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
        <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import alertas from "@/missing/Alertas";
import validaciones from "@/missing/Validaciones";
import token from "@/missing/ConfigToken";
import "@/assets/estilos.css";
export default {
  mixins: [validaciones, alertas, token],
  data: () => ({
    dialogDepediente: false,
    carnet: false,
    depediente: false,
    dataDepedientes: [],
    dataVendedor: [],
    dataReferido: [],
    dataSeguro: [],
    dataEstado: [],
    dataEmpresa: [],
    dataEstadoDependientes: [],
    selectEstadoDepediente: {},
    dataTipoSeguro: [],
    editedIndexDependiente: -1,
    search: "",
    validTwo: true,
    dialog: false,
    dialogDepediente: false,
    e1: 1,
    page: 1,
    data: [],
    payload: {},
    menu: false,
    valid: true,
    dialog: false,
    loading: true,
    headers: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "clienteSeguroID",
      },
      {
        text: "CLIENTE",
        value: "Cliente",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "CÉDULA",
        value: "cedula",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "VENDEDOR",
        value: "Vendedor",
        class: ["white--text blue"],
        align: "center",
      },

      {
        text: "SEGURO",
        value: "seguro",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "PLAN",
        value: "plan",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "NSS",
        value: "numeroSeguridadSocial",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "EMPRESA",
        value: "empresa",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "MONTO A PAGAR",
        value: "montoPagar",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "ACCIONES",
        value: "actions",
        class: ["white--text blue"],
        align: "center",
      },
    ],
    headersDepedientesOne: [
      {
        text: "Nombre",
        class: ["white--text blue"],
        align: "center",
        value: "nombre",
      },
      {
        text: "Apellido",
        class: ["white--text blue"],
        align: "center",
        value: "apellido",
      },
      {
        text: "Cédula",
        class: ["white--text blue"],
        align: "center",
        value: "cedula",
      },
      {
        text: "NSS",
        class: ["white--text blue"],
        align: "center",
        value: "numeroAsegurado",
      },
      {
        text: "Estado",
        class: ["white--text blue"],
        align: "center",
        value: "estado",
      },
      {
        text: "ACCIONES",
        value: "acciones",
        class: ["white--text blue"],
        align: "center",
      },
    ],

    headersDepedientesTwo: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "depedienteID",
      },
      {
        text: "Nombre",
        class: ["white--text blue"],
        align: "center",
        value: "nombres",
      },
      {
        text: "Cédula",
        class: ["white--text blue"],
        align: "center",
        value: "cedula",
      },
      {
        text: "NSS",
        class: ["white--text blue"],
        align: "center",
        value: "numeroAsegurado",
      },
      {
        text: "Estado",
        class: ["white--text blue"],
        align: "center",
        value: "estado",
      },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      balance: 0,
      referenciaID: 0,
      empresaID: 0,
      clienteID: 0,
      seguroID: 0,
      planID: 0,
      numeroAsegurado: "",
      numeroSeguridadSocial: "",
      vendedorID: 0,
      montoPagar: 0,
      depedientes: [],
      estadoID: 0,
      estado: "",
      nombre: "",
      apellido: "",
      corrreoElectronico: "",
      telefonoMovil: "",
      telefonoResidencial: "",
      cedula: "",
      direccion: "",
      fechaNacimiento: null,
    },
    defaultItem: {
      balance: 0,
      e1: 1,
      referenciaID: 0,
      empresaID: 0,
      clienteID: 0,
      seguroID: 0,
      planID: 0,
      numeroAsegurado: "",
      numeroSeguridadSocial: "",
      vendedorID: 0,
      montoPagar: 0,
      depedientes: [],
      estadoID: 0,
      estado: "",
      nombre: "",
      apellido: "",
      corrreoElectronico: "",
      telefonoMovil: "",
      telefonoResidencial: "",
      cedula: "",
      direccion: "",
      fechaNacimiento: null,
    },
    depedientes: {
      clienteSeguroID: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      numeroAsegurado: "",
      estadoID: 0,
      estado: "",
    },
    defaultdepedientes: {
      clienteSeguroID: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      numeroAsegurado: "",
      estadoID: 0,
      estado: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Cliente" : "Editar Cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  created() {
    this.initialize();
    this.seguros();
    this.vendedores();
    this.clientesEstados();
    this.clienteReferidos();
    this.buscarEmpresas();
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    agregarDepediente() {
      try {
        if (this.$refs.formTwo.validate()) {
          if (this.editedIndexDependiente > -1) {
            this.depedientes.estado = this.dataEstadoDependientes[
              this.depedientes.estadoID - 1
            ].estado;

            Object.assign(
              this.dataDepedientes[this.editedIndexDependiente],
              this.depedientes
            );
          } else {
            this.depedientes.estado = this.dataEstadoDependientes[
              this.depedientes.estadoID - 1
            ].estado;

            this.dataDepedientes.push(this.depedientes);
          }
          this.closeDependiente();
        }
      } catch (error) {
        console.log(error);
      }
    },
    verDepedientes(item) {
      this.buscarDepedientes(item.clienteSeguroID);
      this.dialogDepediente = true;
    },
    buscarDepedientes(id) {
      this.dataDepedientes = [];
      this.axios
        .get(`/clientes-depedientes/${id}`, this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataDepedientes = res.data;
            this.depediente = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editItemDepedientes(item) {
      this.editedIndexDependiente = this.dataDepedientes.indexOf(item);
      this.depedientes = Object.assign({}, item);
    },
    async deleteItemDepedientes(item) {
      const index = this.dataDepedientes.indexOf(item);
      this.payload.mensaje = "Desea Eliminar este Registro ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.dataDepedientes.splice(index, 1);
        this.closeDependiente();
      }
    },
    closeDependiente() {
      this.selectEstadoDepediente = {};
      this.$nextTick(() => {
        this.depedientes = Object.assign({}, this.defaultdepedientes);
        this.editedIndexDependiente = -1;
      });
    },
    vendedores() {
      this.axios
        .get("/vendedor", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataVendedor = res.data;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seguros() {
      this.axios
        .get("/seguros", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataSeguro = res.data;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tipoPlan(id) {
      this.dataTipoSeguro = [];
      this.axios
        .get(`/seguroplanes/${id}`, this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataTipoSeguro = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    buscarEmpresas() {
      this.dataEmpresa = [];
      this.axios
        .get("/empresa", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataEmpresa = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clienteReferidos() {
      this.axios
        .get("/referencia", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataReferido = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clientesEstados() {
      this.dataEstado = [];
      this.dataEstadoDependientes = [];
      this.axios
        .get("/estados", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.dataEstado = res.data;
            this.dataEstadoDependientes = res.data;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initialize() {
      this.axios
        .get("/clientes-seguros", this.buscarToken())
        .then((res) => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    consultarProceso() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/clientes-seguros/all/${this.search}`, this.buscarToken())
          .then((res) => {
            if (res.data.length > 0) {
              this.data = res.data;
              this.loading = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    saveCliente() {
      this.editedItem.depedientes = this.dataDepedientes;
      this.axios
        .post("/clientes", this.editedItem, this.buscarToken())
        .then((res) => {
          if (res.status == 200) {
            // this.initialize();
            this.payload.mensaje = "Cliente Agregado correctamente.";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          } else {
            this.payload.mensaje = "Error al Registrar Cliente.";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Error al Registrar Cliente.";
          this.alertError(this.payload);
        });
    },
    updateCliente() {
      this.editedItem.depedientes = this.dataDepedientes;
      this.axios
        .put(
          `/clientes/${this.editedItem.clienteID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then((res) => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Cliente modificado correctamente";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          } else {
            this.payload.mensaje = "Este Cliente no puede ser modificado";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Este Cliente no puede ser modificado";
          this.alertError(this.payload);
        });
    },
    borrarCliente() {
      this.axios
        .delete(`/clientes/${this.editedItem.clienteID}`, this.buscarToken())
        .then((res) => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Cliente eliminado correctamente!!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
          } else {
            this.payload.mensaje = "Este Cliente no pudo ser eliminado";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Este Cliente no pudo ser eliminado";
          this.alertError(this.payload);
        });
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.buscarDepedientes(item.clienteSeguroID);
      this.tipoPlan(item.seguroID);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.payload.mensaje = "Desea Eliminar este Registro ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarCliente();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.depedientes = Object.assign({}, this.defaultdepedientes);
        (this.dataDepedientes = []), (this.editedIndex = -1);
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.updateCliente();
        } else {
          this.saveCliente();
        }
      }
    },
  },
};
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>
