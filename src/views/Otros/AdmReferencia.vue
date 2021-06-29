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
      <v-card-title class="blue--text">Administrar Referencias</v-card-title>
      <v-toolbar flat color="white">
        <v-text-field v-model="search" @input="consultarReferencia()" label="Search" class="mx-4"></v-text-field>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark class="mb-2 blue" v-bind="attrs" v-on="on">Nueva Referencia</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="title primary--text">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
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
                      <v-text-field v-model="editedItem.telefono" label="Teléfono Móvil"></v-text-field>
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
                      <v-textarea
                        solo
                        name="input-7-4"
                        v-model="editedItem.direccion"
                        label="Dirección"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>
<script>
import validaciones from "@/missing/Alertas";
import alertas from "@/missing/Validaciones";
import token from "@/missing/ConfigToken";
import "@/assets/estilos.css";
export default {
  mixins: [validaciones, alertas, token],
  data: () => ({
    valid: true,
    search: "",
    dialog: false,
    payload: {},
    loading: true,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "referenciaID",
        class: ["white--text blue", "letras"]
      },
      {
        text: "NOMBRE",
        value: "nombre",
        class: ["white--text blue", "letras"]
      },
      {
        text: "APELLIDO",
        value: "apellido",
        class: ["white--text blue", "letras"]
      },
      {
        text: "CÉDULA",
        value: "cedula",
        class: ["white--text blue", "letras"]
      },
      {
        text: "DIRECCIÓN",
        value: "direccion",
        class: ["white--text blue", "letras"]
      },
      {
        text: "TELÉFONO",
        value: "telefono",
        class: ["white--text blue", "letras"]
      },
      {
        text: "Última Modificación",
        value: "updatedAt",
        class: ["white--text blue", "letras"]
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: ["white--text blue", "letras"]
      }
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      empresaID: 0,
      empresa: ""
    },
    defaultItem: {
      empresaID: 0,
      empresa: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Referencia" : "Editar Referencia";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios
        .get("/referencia", this.buscarToken())
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
    consultarReferencia() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/referencia/all/${this.search}`, this.buscarToken())
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
    saveReferencia() {
      this.axios
        .post("/referencia", this.editedItem, this.buscarToken())
        .then(res => {
          if (res.data.referenciaID > 0) {
            this.initialize();
            this.payload.mensaje = "Referencia agregada correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          }
        })
        .catch(err => {
          this.payload.mensaje = "Error al registrar Referencia !!";
          this.alertError(this.payload);
        });
    },
    updateReferencia() {
      this.axios
        .put(
          `/referencia/${this.editedItem.referenciaID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then(res => {
          if (res.data === "Ok") {
            this.data.push(this.editedItem);
            this.payload.mensaje = "Referencia modificada correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
            this.initialize();
          }
        })
        .catch(err => {
          console.log(err);
          this.payload.mensaje = "Error al modificar Empresa !!";
          this.alertError(this.payload);
        });
    },
    borrarReferencia() {
      this.axios
        .delete(`/referencia/${this.editedItem.referenciaID}`, this.buscarToken())
        .then(res => {
          if (res.data === "Ok") {
            this.alertSave("Referencia eliminada correctamente");
            this.initialize();
          }
        })
        .catch(err => {});
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.payload.mensaje = "Desea Eliminar esta Referencia ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarReferencia();
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
          this.updateReferencia();
        } else {
          this.saveReferencia();
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
.letras {
  font-family: Calibri;
  font-size: 14px;
}
</style>