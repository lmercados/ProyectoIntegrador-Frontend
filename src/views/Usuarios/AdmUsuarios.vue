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
      <v-card-title class="blue--text">Administrar Usuarios</v-card-title>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          @input="consultarUsuarios()"
          label="Search"
          class="mx-4"
        ></v-text-field>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue" dark class="mb-2" v-bind="attrs" v-on="on"
              >Nuevo Usuario</v-btn
            >
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
                        v-model="editedItem.nombre"
                        :rules="Rules"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" md="6">
                      <v-text-field
                        :rules="Rules"
                        required
                        v-model="editedItem.apellido"
                        label="Apellido"
                        hint="example of helper text only on focus"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-text-field
                        :rules="Rules"
                        required
                        v-model="editedItem.correoElectronico"
                        label="Correo Electrónico"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-select
                        v-model="editedItem.perfil"
                        :items="tipoUsuario"
                        label="Perfil de Usuario"
                        dense
                        required
                        :rules="Rules_Select"
                      ></v-select>
                    </v-col>
                    <v-col v-if="editedIndex == -1" cols="12" sm="6">
                      <v-text-field
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        @click:append="show1 = !show1"
                        :rules="Rules"
                        required
                        v-model="editedItem.password"
                      ></v-text-field>
                    </v-col>

                    <v-col v-if="editedIndex == -1" cols="12" sm="6">
                      <v-text-field
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        @click:append="show1 = !show1"
                        :rules="Rules"
                        required
                        v-model="editedItem.repeatPassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="resetPassword()"
                >Resetear Contraseña</v-btn
              >
              <v-btn color="error darken-1" text @click="close()">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
            </v-card-actions>
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
import validaciones from "@/missing/Alertas";
import alertas from "@/missing/Validaciones";
import token from "@/missing/ConfigToken";
import "@/assets/estilos.css";
export default {
  mixins: [validaciones, alertas, token],
  data: () => ({
    valid: true,
    tipoUsuario: ["", "Adm", "User"],
    itemsPermisos: [],
    show1: false,
    search: "",
    dialog: false,
    payload: {},
    loading: true,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "usuarioID",
        class: ["white--text blue", "letras"],
      },
      {
        text: "NOMBRE",
        value: "nombre",
        class: ["white--text blue", "letras"],
      },
      {
        text: "APELLIDO",
        value: "apellido",
        class: ["white--text blue", "letras"],
      },
      {
        text: "CORREO",
        value: "correoElectronico",
        class: ["white--text blue", "letras"],
      },
      {
        text: "Perfil",
        value: "perfil",
        class: ["white--text blue", "letras"],
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: ["white--text blue", "letras"],
      },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      apellido: "",
      correoElectronico: "",
      password: "",
      repeatPassword: "",
      perfil: "",
    },
    defaultItem: {
      nombre: "",
      apellido: "",
      correoElectronico: "",
      password: "",
      repeatPassword: "",
      perfil: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    consultarUsuario() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/usuarios/all/${this.search}`, this.buscarToken())
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
    initialize() {
      this.axios
        .get("/usuarios", this.buscarToken())
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
    resetPassword() {
      this.axios
        .put(
          `/usuarios/resetPassword/${this.editedItem.usuarioID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then((res) => {
          if (res.data === "Ok") {
            this.alertSave({ mensaje: "Contraseña reseteada correctamente" });
            this.close();
          } else {
            this.alertError({ mensaje: "Error al resetear Contraseña" });
          }
        })
        .catch((err) => {
          this.alertError({ mensaje: "Error al resetear Contraseña" });
        });
    },
    consultarUsuarios() {
      this.axios
        .get(`/usuarios/all/${this.search}`, this.buscarToken())
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
    saveUsuario() {
      this.axios
        .post("/usuarios", this.editedItem, this.buscarToken())
        .then((res) => {
          if (res.data.usuarioID > 0) {
            this.initialize();
            this.payload.mensaje = "Usuario Agregado correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Error al Registrar Usuario !!";
          this.alertError(err);
        });
    },
    updateUsuario() {
      this.axios
        .put(
          `/usuarios/${this.editedItem.usuarioID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then((res) => {
          if (res.data === "Ok") {
            this.data.push(this.editedItem);
            this.payload.mensaje = "Usuario Modificado correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
            this.initialize();
          }
        })
        .catch((err) => {
          this.payload.mensaje = "Error al Modificar Usuario !!";
          this.alertError(this.payload);
        });
    },
    borrarUsuarios() {
      this.axios
        .delete(`/usuarios/${this.editedItem.usuarioID}`, this.buscarToken())
        .then((res) => {
          if (res.data === "Ok") {
            this.alertSave("Cliente eliminado correctamente");
            this.initialize();
          }
        })
        .catch((err) => {});
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.payload.mensaje = "Desea Eliminar este Usuario ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarUsuarios();
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
          this.updateUsuario();
        } else {
          this.saveUsuario();
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
.letras {
  font-family: Calibri;
  font-size: 14px;
}
</style>
