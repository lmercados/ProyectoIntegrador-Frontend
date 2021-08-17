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
        <v-toolbar-title>Evaluación de Transformadores Nuevos</v-toolbar-title>
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
              Nueva Evaluación
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
       <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Datos Generales
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Datos Técnicos
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
       Finally
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
       
      <v-stepper-content step="1">
          <v-form ref="form" v-model="validOne" lazy-validation>
        <v-card
          class="mb-10"
         
        >
  
          <v-row >
            
            <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Serie"
            outlined
            v-model="data.serie"
            :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
           label="Suplidor"
            item-text="suplidor"
            item-value="suplidorId"
           :items="dataSuplidor"
           v-model="data.suplidor"
           :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            label="Licitación"
            v-model="data.licitacion"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-select
           label="Valoración"
             item-text="valoracion"
            item-value="valoracionId"
           :items="dataValoracion"
           v-model="data.valoracion"
           :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="4">
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
            <v-col cols="3" xs="12" md="4">
            <v-select
           label="Soporte"
            item-text="soporte"
            item-value="soporteId"
           :items="dataSoporte"
           v-model="data.soporte"
           :rules="selectRules"
          outlined
            @change="cargarTipoSoporte($event, data.soporte)"
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="4">
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
            
          </v-row>
         
        
        </v-card>

        <v-btn
          color="primary"
          :disabled="!validOne"
          @click="ContinueStep2()"
        >
        
          Continue
        </v-btn>

        <v-btn text @click="close()">
          
          Cancel
        </v-btn>
            </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
         <v-form ref="formTwo" v-model="validTwo" lazy-validation>
        <v-card
          class="mb-10"
          height="295px"
        >

        <v-row>
           <v-col cols="3" xs="12" md="3">
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
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Fases"
          outlined
           item-text="fase"
           item-value="faseId"
          :items="dataFase"
           v-model="data.fase"
            :rules="selectRules"  
          @change="cargarCapacidad($event, data.fase)"
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
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
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Conexión TR"
                 item-text="conexion"
                 item-value="conexionId"
                          :items="dataConexion"
                          v-model="data.conexion"
                                 :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
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
               <v-col cols="3" xs="12" md="3">
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
             <v-col cols="3" xs="12" md="3">
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
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Ubicación"
          outlined
             item-text="ubicacion"
             item-value="ubicacionId"
           :items="dataUbicacion"
          v-model="data.ubicacion"
          :rules="selectRules"
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Voltaje CC"
            :rules="textRules"
             v-model="data.voltajeCC"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="PSC(W)"
             :rules="textRules"
               v-model="data.psc"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="PCC(W)"
             :rules="textRules"
            outlined
             v-model="data.pcc"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Pérdida a 85 C"
            outlined
             :rules="textRules"
                v-model="data.perdida"
          ></v-text-field>
            </v-col>
        </v-row>
         </v-card>
        <v-btn
          text
          color="warning"
          @click="e1 = 1"
        >
          Back
        </v-btn>


        <v-btn @click="close()" text>
          
          Cancel
        </v-btn>
        
        <v-btn
          color="primary"
          @click="ContinueStep3()"
        >
          Continue
        </v-btn>
         </v-form>
      </v-stepper-content>

      <v-stepper-content step="3">
         <v-form ref="formThree" v-model="validThree" lazy-validation>
        <v-card
          class="mb-10"
          height="295px"
        >
        <v-card
          class="mb-12"
          height="295px"
        >
         <v-row>
           <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Pérdida Total"
            outlined
             :rules="textRules"
            v-model="data.perdidaTotal"
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Impedancia"
            :rules="textRules"
            outlined
            v-model="data.impedancia"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="Corriente IOC"
            :rules="textRules"
            outlined
            v-model="data.corriente"
          ></v-text-field>
            </v-col>
                  <v-col cols="3" xs="12" md="3">
        <v-select
           label="Resultado Evaluación"
          outlined
          item-text="resultado"
          item-value="resultadoEvaluacionId"
          :items="dataResultadoEvaluacion"
          v-model="data.resultado"
          :rules="selectRules"
          @change="cargarResultadoEstado($event, data.resultado)"
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Estado"
          outlined
          item-text="estado"
          item-value="estadoId"
          :items="dataEstado"
          v-model="data.estado"
          :rules="selectRules"
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Tipo de Reparación"
          outlined
           item-text="reparacion"
          item-value="tipoReparacionId"
          :items="dataReparacion"
          v-model="data.tipoReparacion"
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="Sello"
            outlined
            v-model="data.sello"
          ></v-text-field>
            </v-col>
               <v-col cols="4" xs="12" md="3">
        <v-select
           label="Razones de Rechazo"
          outlined
           item-text="razones"
          item-value="razonRechazoId"
          :items="dataRazonesRechazo"
          v-model="data.razonesRechazo"
        ></v-select>
            </v-col>
             
              
              
       <v-col cols="7"  md="12">
      
      <v-textarea
          append-icon="mdi-comment"
          class="mx-2"
          label="Observación"
          v-model="data.observacion"
          rows="1"
        ></v-textarea>
 
            </v-col>
           
        </v-row>
     
        </v-card>
      
      
        </v-card>

        <v-btn
          text
          color="warning"
          @click="e1 = 2"
        >
          Back
        </v-btn>

        <v-btn text   color="red" >
          Cancel
        </v-btn>
        <v-btn
          :disabled="!validThree"
          color="success"
          @click="save()"
        >
          SAVE
        </v-btn>
         </v-form>
      </v-stepper-content>
  
    </v-stepper-items>
  </v-stepper>
                </v-row>
              </v-container>
            </v-card-text>
 
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
    validOne:true,
    validTwo:true,
    validThree:true,
    e1: 1,
    loading: true,
    dialog:false,
    dialogDelete:false,
    dataSuplidor:[],
    dataValoracion:[],
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
    dataUbicacion:[],
    dataResultadoEvaluacion:[],
    dataEstado:[],
    dataReparacion:[],
    dataRazonesRechazo:[],
    dataDefault:{
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
    regulacion:"",
    impedancia:"",
    observacion:"",
    licitacion:"",
    efecto:10,
    suplidor:0,
    valoracion:0,
    razonesRechazo:0,
    tipoReparacion:0,
    usuario:3,
    codigoProyecto:3,
    codigoSap:5,
    psc:"",
    pcc:"",
    perdida:"",
    perdidaTotal:"",
    voltajeCC:"",
    corriente:"",
    matricula:"",
    estado:0,
    ubicacion:0,
    resultado:0
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
    regulacion:"",
    impedancia:"",
    observacion:"",
    licitacion:"",
    efecto:10,
    suplidor:0,
    valoracion:0,
    razonesRechazo:0,
    tipoReparacion:0,
    usuario:3,
    codigoProyecto:3,
    codigoSap:5,
    psc:"",
    pcc:"",
    perdida:"",
    perdidaTotal:"",
    voltajeCC:"",
    corriente:"",
    matricula:"",
    estado:0,
    ubicacion:0,
    resultado:0
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
   this.cargarSuplidor();
   this.cargarValoracion();
   this.cargarUbicacion();
   this.cargarResultadoEvaluacion();
  
  },

  methods: {
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.data = Object.assign({}, this.dataDefault)
        
        })
      },
      ContinueStep2()

      {  
        
      if(this.$refs.form.validate()==false){

          return
      }else
      {
        this.e1=2;
      }
     
      
      },  ContinueStep3()

      {  
        
       if(this.$refs.formTwo.validate()==false){

          return
      }else
      {
        this.e1=3;
      }

         
      
     
      
      },
     
      
    save(){
  
    
      if(this.$refs.formThree.validate()==false)
      {
          return ;
      }
      if(this.data.resultado==3 && this.data.sello.length==0){
          this.alertError({mensaje:"Favor Indicar el Sello"});
           return;
      } 
         if(this.data.resultado==4){
           this.data.sello=this.data.serie;
         } 
         
      if(this.data.resultado==3){
            
           this.data.tipoReparacion=4;
           this.data.razonesRechazo=5;
      }  
    
      
      if(this.$refs.formThree.validate()==false)
      {
          return ;
      }else
      
      {
       
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
     
     
        

    },cargarResultadoEvaluacion(){
      this.dataResultadoEvaluacion = [];
      this.axios
        .get("/resultado-evaluacion")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataResultadoEvaluacion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },cargarResultadoEstado(resultadoId){
      this.dataEstado = [];
      this.axios
        .get(`/resultado-estado/resultado/${resultadoId}`)
        .then((res) => {
          if (res.data.length > 0) {
              for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataEstado.push(res.data[i].estado);
                   
                  
                }
              }

              if(resultadoId==4){
                this.data.sello="";
                 this.cargarRazonesRechazo();
                 this.cargarTipoReparacion();
              }else{
                 this.dataRazonesRechazo=[];
                 this.dataReparacion=[];
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    }
    ,cargarUbicacion(){
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

    },cargarSuplidor(){
      this.dataSuplidor = [];
      this.axios
        .get("/suplidor")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataSuplidor = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },cargarValoracion(){
      this.dataValoracion = [];
      this.axios
        .get("/valoracion")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataValoracion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

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
        

    },
    cargarTipoReparacion(){
      this.dataReparacion = [];
      this.axios
        .get("/tipo-reparacion")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataReparacion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
        

    },
     cargarRazonesRechazo(){
      this.dataRazonesRechazo = [];
      this.axios
        .get("/razones-rechazo")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataRazonesRechazo = res.data;
            
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