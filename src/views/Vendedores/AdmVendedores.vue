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
      <v-card-title class="blue--text">Administrar Vendedores</v-card-title>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          @input="consultarVendedor()"
          label="Search"
          class="mx-4"
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="520px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue" dark class="mb-2" v-bind="attrs" v-on="on"
              >Nuevo Vendedor</v-btn
            >
          </template>
          <v-card>
            <v-form ref="form" lazy-validation>
              <v-row class="grey lighten-4 mx-auto">
                <v-card-title class="blue--text">{{ formTitle }}</v-card-title>
              </v-row>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" xs="12" md="6">
                      <v-text-field
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
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" md="6">
                      <v-text-field
                        v-model="editedItem.telefonoMovil"
                        label="Teléfono Móvil"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" md="6">
                      <v-text-field
                        v-model="editedItem.telefonoResidencial"
                        label="Teléfono Residencial"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.correoElectronico"
                        label="Correo Electrónico"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.cedula"
                        label="Cédula"
                        required
                      ></v-text-field>
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
                </v-container>
              </v-card-text>

              <v-divider></v-divider>
              <v-row class="mx-auto">
                <v-col cols="12" class="grey lighten-4 d-flex justify-end">
                  <v-btn color="error darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
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
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>
<script>
import alertas from "@/missing/Alertas";
import validaciones from "@/missing/Validaciones";
import "@/assets/estilos.css";
import token from "@/missing/ConfigToken";
export default {
  mixins: [validaciones, alertas, token],
  data: () => ({
    data: [],
    payload: {},
    menu: false,
    search: "",
    valid: true,
    dialog: false,
    loading: true,
    payload: {},
    headers: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "vendedorID",
      },
      {
        text: "VENDEDOR",
        value: "vendedor",
        class: ["white--text blue"],
        align: "center",
      },

      {
        text: "TÉLEFONO MÓVIL",
        value: "telefonoMovil",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "TÉLEFONO RESIDENCIAL",
        value: "telefonoResidencial",
        class: ["white--text blue"],
        align: "center",
      },
      {
        text: "DIRECCIÓN",
        value: "direccion",
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
        text: "ACCIONES",
        value: "actions",
        class: ["white--text blue"],
        align: "center",
      },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      apellido: "",
      corrreoElectronico: "",
      telefonoMovil: "",
      telefonoResidencial: "",
      cedula: "",
      direccion: "",
    },
    defaultItem: {
      nombre: "",
      apellido: "",
      corrreoElectronico: "",
      telefonoMovil: "",
      telefonoResidencial: "",
      cedula: "",
      direccion: "",
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
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    initialize() {
      this.axios
        .get("/vendedor", this.buscarToken())
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
    consultarVendedor() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/vendedor/all/${this.search}`, this.buscarToken())
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
    saveVendedor() {
      this.axios
        .post("/vendedor", this.editedItem, this.buscarToken())
        .then((res) => {
          if (res.data.vendedorID > 0) {
            this.initialize();
            this.payload.mensaje = "Vendedor Agregado correctamente.";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          } else {
            this.payload.mensaje = "Error al Registrar Vendedor.";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Error al Registrar Vendedor.";
          this.alertError(this.payload);
        });
    },
    updateVendedor() {
      this.axios
        .put(
          `/vendedor/${this.editedItem.vendedorID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then((res) => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Vendedor modificado correctamente";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          } else {
            this.payload.mensaje = "Este Vendedor no puede ser modificado";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Este Vendedor no puede ser modificado";
          this.alertError(this.payload);
        });
    },
    borrarVendedor() {
      this.axios
        .delete(`/vendedor/${this.editedItem.vendedorID}`, this.buscarToken())
        .then((res) => {
          if (res.data === "Ok") {
            this.initialize();
            this.payload.mensaje = "Vendedor eliminado correctamente!!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
          } else {
            this.payload.mensaje = "Este Vendedor no pudo ser eliminado";
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Este cliente no pudo ser eliminado";
          this.alertError(this.payload);
        });
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.payload.mensaje = "Desea Eliminar este Registro ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarVendedor();
      }
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
          this.updateVendedor();
        } else {
          this.saveVendedor();
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
