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
        <v-toolbar-title>Retirar Transformador de Línea</v-toolbar-title>
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
              Nuevo Retiro
            </v-btn>
          </template>
          <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>
              <span class="text-h5 blue--text">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
             
                    <v-row>
                  <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                    outlined
                      label="Serie"
                      v-model="data.serie"
                      :rules="textRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="3"
                    sm="12"
                    md="3"
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
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Soporte"
                                 :rules="selectRules"
                          outlined
                            item-text="soporte"
                          item-value="soporteId"
                          :items="dataSoporte"
                          v-model="data.soporte"
                            @change="cargarTipoSoporte($event, data.soporte)"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Tipo de Soporte"
                          outlined
                           item-text="tipoSoporte"
                          item-value="tipoSoporteId"
                          :items="dataTipoSoporte"
                          v-model="data.tipoSoporte"
                                :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Fabricante"
                          outlined
                          item-text="fabricante"
                          item-value="fabricanteId"
                          :items="dataFabricante"
                          v-model="data.fabricante"
                                :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                            :rules="selectRules"
                         label="Fases"
                          outlined
                          item-text="fase"
                          item-value="faseId"
                          :items="dataFase"
                          v-model="data.fase"
                          @change="cargarCapacidad($event, data.fase)"
                      ></v-select>
                  </v-col> <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Capacidad"
                          outlined
                           item-text="capacidad"
                          item-value="capacidadId"
                          :items="dataCapacidad"
                          v-model="data.capacidad"
                          :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Conexión TR"
                          outlined
                           item-text="conexion"
                          item-value="conexionId"
                          :items="dataConexion"
                          v-model="data.conexion"
                                 :rules="selectRules"
                      ></v-select>
                  </v-col>
                   <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Tensión Primaria"
                          outlined
                          item-text="tension"
                          item-value="tensionPrimariaId"
                          :items="dataTensionPrimaria"
                          v-model="data.tensionPrimaria"
                                 :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Tensión Secundaria"
                          outlined
                           item-text="tension"
                          item-value="tensionSecundariaId"
                          :items="dataTensionSecundaria"
                          v-model="data.tensionSecundaria"
                             :rules="selectRules"
                      ></v-select>
                  </v-col>
                   <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                     <v-select
                         label="Regulación"
                          outlined
                          item-text="regulacion"
                          item-value="regulacionId"
                          :items="dataRegulacion"
                          v-model="data.regulacion"
                               :rules="selectRules"
                      ></v-select>
                  </v-col>
                     <v-col
                    cols="3"
                    sm="12"
                    md="3"
                  >
                    <v-text-field
                    outlined
                      label="Impedancia"
                      v-model="data.impedancia"
                      :rules="textRules"
                    ></v-text-field>
                  </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea
                            append-icon="mdi-comment"
                            class="mx-2"
                            label="Observación"
                             v-model="data.observacion"
                           rows="1"
                       ></v-textarea>
                    </v-col>
                </v-row>
           
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
               :disabled="!valid"
                color="blue darken-1"
                text
                @click="save()"
              >
                Save
              </v-btn>
            </v-card-actions>
               </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estás seguro que deseas eliminar este Item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Cancel</v-btn>
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
    datos:[],
    valid:true,
    e1: 1,
    loading: true,
    dialog:false,
    dialogDelete:false,
    dataPropiedad:[],
    dataSoporte:[],
    dataTipoSoporte:[],
    dataFabricante:[],
    dataFase:[],
    dataCapacidad:[],
    dataConexion:[],
    dataTensionPrimaria:[],
    dataTensionSecundaria:[],
    dataRegulacion:[],
    dataDefault:{
    serie:"",
    propiedad:0,
    soporte:0,
    tipoSoporte:0,
    fabricante:0,
    fase:0,
    capacidad:0,
    conexion:0,
    tensionPrimaria:0,
    tensionSecundaria:0,
    regulacion:0,
    impedancia:0,
    observacion:"",
    licitacion:"",
    efecto:12,
    suplidor:6,
    valoracion:5,
    razonesRechazo:5,
    tipoReparacion:4,
    usuario:3,
    codigoProyecto:3,
    codigoSap:5,
    psc:0,
    pcc:0,
    perdida:0,
    perdidaTotal:0,
    voltajeCC:0,
    corriente:0,
    matricula:"",
    estado:11,
    ubicacion:15
    },
    data:{
    serie:"",
    sello:"",
    propiedad:0,
    soporte:0,
    tipoSoporte:0,
    fabricante:0,
    fase:0,
    capacidad:0,
    conexion:0,
    tensionPrimaria:0,
    tensionSecundaria:0,
    regulacion:0,
    impedancia:0,
    observacion:"",
    licitacion:"",
    efecto:12,
    suplidor:6,
    valoracion:5,
    razonesRechazo:5,
    tipoReparacion:4,
    usuario:3,
    codigoProyecto:3,
    codigoSap:5,
    psc:0,
    pcc:0,
    perdida:0,
    perdidaTotal:0,
    voltajeCC:0,
    corriente:0,
    matricula:"",
    estado:11,
    ubicacion:15
    },
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
        text: "ACCI{ON",
        value: "efecto.efecto",
       align: "center"
      }
    ],
    editedIem:{},
    editedIndex: -1
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Retiro" : "Editar Cliente";
    },
  },

  watch: {
      dialog (val) {
        val || this.close()
      }
  },

  created() {
   this.cargarPropiedad();
   this.cargarSoporte();
   this.cargarFabricantes();
   this.cargarFases();
   this.cargarTensionPrimaria();
   this.cargarTensionSecundaria();
   this.cargarRegulacion();
  },

  methods: {
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.data = Object.assign({}, this.dataDefault)
        
        })
      },

    save(){


     if(this.$refs.form.validate()==false)
      {
          return ;
      }else
      
      {
            this.data.sello=this.data.serie;
            this.axios
        .post("/transformador/create", this.data)
        .then((res) => {
          if (res.status == 201) {
              this.datos.push(res.data);
              this.alertSave({mensaje:"Transformador Registrado Correctamente",dialog:this.dialog});
              this.close();
          } else {
               this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Transformador"});
          }
        })
        .catch((err) => {
           this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Transformador"});
          console.log(err);
        });

      }
     
     
        

    },
    cargarPropiedad(){
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

    },
       cargarSoporte(){
      this.dataSoporte = [];
      this.axios
        .get("/soportes")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataSoporte = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
       cargarFabricantes(){
      this.dataFabricante = [];
      this.axios
        .get("/fabricante")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataFabricante = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
       cargarFases(){
      this.dataFase = [];
      this.axios
        .get("/fases")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataFase = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
       cargarTensionPrimaria(){
      this.dataTensionPrimaria = [];
      this.axios
        .get("/tension-primaria")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataTensionPrimaria = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
    cargarTensionSecundaria(){
      this.dataTensionSecundaria = [];
      this.axios
        .get("/tension-secundaria")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataTensionSecundaria = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
    cargarRegulacion(){
      this.dataRegulacion = [];
      this.axios
        .get("/regulacion")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataRegulacion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    }, cargarTipoSoporte(soporteId){
      this.dataTipoSoporte = [];
      this.axios
        .get( `/soporte-tipo-soporte/soporte/${soporteId}`)
        .then((res) => {
          if (res.data.length > 0) {
            for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataTipoSoporte.push(res.data[i].tipoSoporteId);
                   
                  
                }
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
    cargarCapacidad(faseId){

      this.dataCapacidad = [];
      this.dataConexion =[];
      this.axios
        .get( `/fase-capacidad/fase/${faseId}`)
        .then((res) => {
          if (res.data.length > 0) {
             

              for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataCapacidad.push(res.data[i].capacidadId);
                   
                  
                }
              }
               
         
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        
      this.axios
        .get( `/fase-conexion/fase/${faseId}`)
        .then((res) => {
          if (res.data.length > 0) {
  

              for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataConexion.push(res.data[i].conexionId);
                   
                  
                }
              }
               
         
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
       close () {
        this.dialog = false
        this.$nextTick(() => {
          this.data = Object.assign({}, this.dataDefault)
        });
        this.$refs.form.resetValidation();
      }

   
   
  },
};
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>