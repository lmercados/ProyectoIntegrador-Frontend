<template>
  <div>
   <v-data-table
    :headers="headers"
    sort-by="calories"
    class="elevation-1 ma-4"
    :items="datos"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Transferir Transformador</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
         <v-dialog
          v-model="dialog"
          max-width="800px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva Transferencia
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5 blue--text">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                    outlined
                    label="Digite la Serie a Transferir"
                    v-model="serie"
                    v-on:keyup.enter="findBySerie(serie)"
                    ></v-text-field>
                  </v-col>
                    <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    outlined
                    readonly
                    label="Capacidad"
                    v-model="capacidad"
                    ></v-text-field>
                  </v-col>
                    <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    
                    readonly
                    outlined
                      label="Fabricante"
                      v-model="fabricante"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    readonly
                    outlined
                      label="Fases"
                      v-model="fase"
                    ></v-text-field>
                  </v-col> 
                    <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    readonly
                    outlined
                      label="Soporte"
                     v-model="soporte"
                    ></v-text-field>
                  </v-col>
                    <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    readonly
                    outlined
                      label="Estado Actual"
                     v-model="estado"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="4"
                    sm="12"
                    md="4"
                  >
                    <v-text-field
                    readonly
                    outlined
                    label="Ubicación Actual"
                     v-model="ubicacion"
                    ></v-text-field>
                  </v-col>
                    <v-col
                    cols="6"
                    sm="12"
                    md="6"
                  >
                     <v-select
                         label="Propiedad"
                          outlined
                            item-text="propiedad"
                         item-value="propiedadId"
                        :items="dataPropiedad"
                       v-model="data.propiedad"
                     :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="6"
                    sm="12"
                    md="6"
                  >
                     <v-select
                         label="Enviar a :"
                         outlined
                         item-text="ubicacion"
                         item-value="ubicacionId"
                         :items="dataUbicacion"
                         v-model="data.ubicacion"
                         :rules="selectRules"
                      ></v-select>
                  </v-col>
                </v-row>
                  </v-form>
              </v-container>
            </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save()"
              >
                Save
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estás seguro que deseas eliminar este Item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text>Cancel</v-btn>
              <v-btn color="blue darken-1" text >OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import validaciones from "@/missing/Validaciones";
import alertas from "@/missing/Alertas";
export default {
  mixins: [validaciones,alertas],
  data: () => ({
    dataPropiedad:[],
    dataUbicacion:[],
    datos:[],
    valid:true,
    e1: 1,
    loading: true,
    dialog:false,
    dialogDelete:false,
    ubicacion:"",
    capacidad:"",
    fabricante:"",
    fase:"",
    soporte:"",
    estado:"",
    estadoId:0,
    serie:"",
    data:{
         transformadorId:0,
         ubicacion:"",
         propiedad:0,
         efecto:11,
         usuario:3

    },
     e1: 1,
    loading: true,
    headers: [
      {
        text: "SERIE",
        align: "center",
        value: "serie"
      },
      {
        text: "SOPORTE",
        value: "soporte.soporte",
      
        align: "center"
      },
      {
        text: "TIPO SOPORTE",
        value: "tipoSoporte.tipoSoporte",
   
        align: "center"
      },
      {
        text: "FABRICANTE",
        value: "fabricante.fabricante",
       
        align: "center"
      },
      {
        text: "FASES",
        value: "fase.fase",
     
        align: "center"
      },

      {
        text: "CAPACIDAD",
        value: "capacidad.capacidad",
       
        align: "center"
      },
      {
        text: "ESTADO",
        value: "estado.estado",
      
        align: "center"
      },
      {
        text: "UBICACIÓN",
        value: "ubicacion.ubicacion",
        align: "center"
       
      },
      {
        text: "ACCION",
        value: "efecto.efecto",
       align: "center"
      }
    ],
    editedIem:{},
    editedIndex: -1
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Transferencia" : "Editar Cliente";
    },
  },

  watch: {
    
  },

  created() {
     this.cargarUbicacion();
     this.cargarPropiedad();
    
  },

  methods: {

    save(){
     if(this.estadoId==11)
      {
        this.alertError({mensaje:"Este Transformador se encuentra En Línea y Funcionamiento"});
        return ;
      }
        if(this.$refs.form.validate()==false)
      {
          return ;
      }else
      {
       this.axios.put(
          `/transformador/estado-ubicacion/${this.data.transformadorId}`,
          this.data
        )
        .then((res) => {
           console.log(res)
          if (res.status == 200) {
              this.datos.push(res.data);
              this.alertSave({mensaje:"Transformador Transferido Correctamente",dialog:this.dialog});
              this.close();
          } else {
               this.alertError({mensaje:"Ha ocurrido un error al Intentar Transferir este Transformador"});
          }
        })
        .catch((err) => {
           this.alertError({mensaje:"Ha ocurrido un error al Intentar Transferir este Transformador"});
           console.log(err);
        });

     }
  



    },
      close () {
        this.dialog = false
      
      },
   cargarUbicacion(){
      this.dataUbicacion = [];
      this.axios
        .get("/ubicacion")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataUbicacion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },cargarPropiedad(){
      this.dataPropiedad = [];
      this.axios
        .get("/propiedad")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataPropiedad = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },findBySerie(serie){
   
      this.axios
        .get(`/transformador/serie/${serie}`)
        .then((res) => {
         
          if (res.status==200) {
               
              this.data.transformadorId=res.data.transformadorId;
              this.capacidad=res.data.capacidad.capacidad;
              this.fabricante=res.data.fabricante.fabricante;
              this.fase=res.data.fase.fase;
              this.soporte=res.data.soporte.soporte;
              this.estado=res.data.estado.estado;
              this.ubicacion=res.data.ubicacion.ubicacion;
              this.estadoId=res.data.estado.estadoId;
             
                 
               
             
           }
     
           
          
        })
        .catch((err) => {
         
                this.alertError({mensaje:"Transfomador Inexistente"});
        });
        

    
   
  }
}
}
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>