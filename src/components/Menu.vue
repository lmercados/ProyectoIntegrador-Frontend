<template>
  <div>
    <v-navigation-drawer class="black" width="280" v-model="drawer" absolute>
      <div class="d-flex justify-center">
        <v-row>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="white--text letras">{{
                devolverUsuario.nombre
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </div>
      <div class="d-flex justify-center">
        <span class="white--text caption mb-2">SIGDE</span>
      </div>

      <div>
        <v-divider class="grey"></v-divider>
      </div>

      <div>
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            no-action
          >
            <v-icon slot="prependIcon" medium color="white">{{
              item.file
            }}</v-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  class="white--text letras"
                  v-text="item.title"
                ></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="subItem in item.items" :key="subItem.title">
              <v-list-item-content @click="drawer = !drawer">
                <router-link
                  class="white--text caption"
                  style="text-decoration: none; color: inherit;"
                  :to="{ name: subItem.ruta }"
                  >{{ subItem.title }}</router-link
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="letras"
        >Sistema Integral de Gestión de Distribución
        Energética(SIGDE)</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar color="red">
              <span class="white--text headline">{{
                getInitials(devolverUsuario.nombre)
              }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="caption">
              <v-btn @click="cerrarSesion()">
                <v-icon class="red--text">mdi-arrow-left-circle</v-icon>Cerrar
                Sesion
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="caption">
              <v-btn @click="dialog = !dialog">
                <v-icon class="green--text">mdi-autorenew</v-icon>Cambiar
                Contraseña
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <router-view></router-view>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title primary--text">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Contraseña"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    @click:append="show1 = !show1"
                    :rules="Rules"
                    required
                    v-model="editedItem.password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label=" Nueva Contraseña"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    @click:append="show1 = !show1"
                    :rules="Rules"
                    required
                    v-model="editedItem.newPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Repetir Contraseña"
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
          <v-btn color="error darken-1" text @click="dialog = !dialog"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="cambiarPassword()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer height="50" app>
      <v-row class="letras">
        <v-col cols="12" md="6" xs="12" class="d-flex justify-start">
          <p>
            <span class="font-weight-bold">Copyright © 2020-2021</span>
            <span class="blue--text ml-1">Luis Mercado</span>.Todos los derechos
            reservados.
          </p>
        </v-col>
        <v-col cols="12" md="6" xs="12" class="d-flex justify-end">
          <p>
            Calle 4,Edificio 23,3B,Villa Magisterial,Santiago.
            <span class="blue--text">Tel.(829)693-1596</span>
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mapMutations, mapGetters } from "vuex";
import router from "@/router/index";
import alertas from "@/missing/Alertas";
import validaciones from "@/missing/Validaciones";
import token from "@/missing/ConfigToken";
export default {
  mixins: [alertas, validaciones, token],
  name: "App",
  data: () => {
    return {
      valid: true,
      menu: false,
      show1: false,
      dialog: false,
      formTitle: "Cambiar Contraseña",
      editedItem: {
        password: "",
        newPassword: "",
        repeatPassword: "",
      },
      overlay: false,
      drawer: true,
      open: ["public"],
      tree: [],
      items: [
        {
          file: "mdi-account-group",
          title: "Transformadores",
          items: [{ title: "Adm. Clientes", ruta: "AdmCliente" }],
        },
        {
          file: "mdi-account-key",
          title: "Usuarios",
          items: [{ title: "Adm. Usuarios", ruta: "AdmUsuarios" }],
        },
        {
          file: "mdi-cogs",
          title: "Otros",
          items: [
            { title: "Agregar ARS", ruta: "AdmSeguros" },
            { title: "Agregar Plan", ruta: "AdmPlan" },
            { title: "Agregar Empresa", ruta: "AdmEmpresa" },
            { title: "Agregar Referencia", ruta: "AdmReferencia" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["devolverUsuario"]),
  },
  methods: {
    cambiarPassword() {
      if (
        this.editedItem.newPassword.trim().length <= 0 ||
        this.editedItem.password.trim().length <= 0 ||
        this.editedItem.repeatPassword.trim().length <= 0
      ) {
        return this.alertError({ mensaje: "Debe completar todos los campos" });
      }
      if (this.editedItem.newPassword != this.editedItem.repeatPassword) {
        return this.alertError({ mensaje: "Las Contraseñas no coinciden" });
      }

      this.axios
        .put(
          `/usuarios/changePassword/${this.devolverUsuario.usuarioID}`,
          this.editedItem,
          this.buscarToken()
        )
        .then((res) => {
          if (res.data === "Ok") {
            this.alertSave({ mensaje: "Contraseña modificada correctamente" });
            this.close();
          } else {
            this.alertError({ mensaje: "Error al Modificar Contraseña" });
          }
        })
        .catch((err) => {
          this.alertError({ mensaje: "Error al Modificar Contraseña" });
        });
    },
    close() {
      this.dialog = false;
      this.editedItem.password = "";
      this.editedItem.newPassword = "";
      this.editedItem.repeatPassword = "";
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    },
    getInitials(string) {
      if (string.length > 0) {
        var names = string.split(" "),
          initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
      }
    },
  },
  components: {},
};
</script>

<style>
::v-deep .v-data-table-header {
  background-color: rgb(53, 58, 64) !important;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 2px solid rgb(236, 237, 239) !important;
  border-radius: 50%;
  overflow: hidden;
  padding: 30px;
  padding-left: 30px;
  background-color: rgb(247, 247, 247) !important;
}
img {
  max-width: 100%;
}

.panel3 {
  background-color: rgb(236, 237, 239) !important;
}

.panel5 {
  background-color: rgb(53, 58, 64) !important;
}

p {
  font-size: 13px !important;
}
.letras {
  font-family: Calibri;
  font-size: 18px !important;
}
</style>
