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
      <v-card-title class="blue--text">Administrar Planes</v-card-title>
      <v-toolbar flat color="white">
        <v-text-field v-model="search" @input="consultarPlan()" label="Search" class="mx-4"></v-text-field>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark class="mb-2 blue" v-bind="attrs" v-on="on">Nuevo Plan</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="title primary--text">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.plan"
                        :rules="Rules"
                        label="Nombre"
                        required
                      ></v-text-field>
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
  mixins: [validaciones, alertas,token],
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
        value: "planID",
        class: ["white--text blue", "letras"]
      },
      {
        text: "Plan",
        value: "plan",
        class: ["white--text blue", "letras"]
      },
      {
        text: "Creada",
        value: "createdAt",
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
      planID: 0,
      plan: ""
    },
    defaultItem: {
      planID: 0,
      plan: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Plan" : "Editar Plan";
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
        .get("/planes",this.buscarToken())
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
   consultarPlan() {
      if (this.search == "") {
        this.initialize();
      } else {
        this.axios
          .get(`/planes/all/${this.search}`,this.buscarToken())
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
    savePlan() {
      this.axios
        .post("/planes", this.editedItem,this.buscarToken())
        .then(res => {
          if (res.data.planID > 0) {
            this.initialize();
            this.payload.mensaje = "Plan agregado correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
          }
        })
        .catch(err => {
          this.payload.mensaje = "Error al registrar Plan !!";
          this.alertError(this.payload);
        });
    },
    updatePlan() {
   
      this.axios.put(`/planes/${this.editedItem.planID}`, this.editedItem,this.buscarToken())
        .then(res => {
         if (res.data === "Ok") {
            this.data.push(this.editedItem);
            this.payload.mensaje = "Plan modificado correctamente !!";
            this.payload.dialog = this.dialog;
            this.alertSave(this.payload);
            this.close();
            this.initialize();
          }
        })
        .catch(err => {
          console.log(err);
          this.payload.mensaje = "Error al modificar Plan !!";
          this.alertError(this.payload);
        });
    },
    borrarSeguro() {
      this.axios
        .delete(`/planes/${this.editedItem.planID}`,this.buscarToken())
        .then(res => {
          if (res.data === "Ok") {
            this.alertSave("Plan eliminado correctamente");
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
      this.payload.mensaje = "Desea Eliminar este Plan ?";
      const respuesta = await this.alertConfirmar(this.payload.mensaje);
      if (respuesta) {
        this.borrarSeguro();
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
          this.updatePlan();
        } else {
          this.savePlan();
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