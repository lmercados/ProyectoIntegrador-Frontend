<template>
  <div>
   <v-data-table
    :headers="headers"
    sort-by="calories"
    class="elevation-1 ma-4"
    :items="datos"
  >
    <template v-slot:top>
   
        <v-card-title class="blue--text">Bandeja de Solicitudes</v-card-title>
       <v-toolbar
        flat
      >
      <v-row>
        <v-col  cols="8" xs="12" >
        <v-select
        
           label="Estados"
             item-text="estado"
               item-value="estadoId"
                :items="dataEstado"
                v-model="estado"
               :rules="selectRules"
              @change="findByEstado($event,estado)"
        ></v-select>
        </v-col>
      </v-row>
      
       
        <v-spacer></v-spacer>
    
         <v-dialog
          v-model="dialog"
          max-width="800px"
        >
        
        
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
       Situación de Instalación
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" :complete="e1 > 3">
       Transformador Intervenido
      </v-stepper-step>
         <v-divider></v-divider>

      <v-stepper-step step="4">
       Transformador Instalar
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
            label="Aviso"
            v-model="data.aviso"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Obra"
               v-model="data.obra"
            outlined
            :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            label="CT"
            outlined
               v-model="data.ct"
               :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="Vivienda"
            v-model="data.vivienda.vivienda"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Provincia"
            v-model="data.provincia.provincia"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
             <v-text-field
            label="Municipio"
            v-model="data.municipio.municipio"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
            <v-col cols="3" xs="12" md="3">
              <v-text-field
            label="Localidad"
            v-model="data.localidad.localidad"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Sector"
            v-model="data.sector.sector"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
            
          </v-row>
         
        
        </v-card>
        
        <v-btn text  color="red">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="ContinueStep2()"
        >
          Continue
        </v-btn>
       </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
          <v-form ref="formTwo" v-model="validOne" lazy-validation>
        <v-card
          class="mb-10"
          height="295px"
        >

        <v-row>
           <v-col cols="6" xs="12" md="3">
       <v-text-field
            label="Calle"
            outlined
            v-model="data.calle"
              :rules="textRules"
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Circuito"
            v-model="data.circuito.circuito"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Seccionador"
            v-model="data.seccionador.seccionador"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            label="Apartarrayos"
            v-model="data.apartarrayos.apartarrayos"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Puesta Tierra"
            v-model="data.puestatierra.puestaTierra"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Apoyo"
            v-model="data.apoyo.apoyo"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Estado Apoyo"
            v-model="data.estadoapoyo.estadoApoyo"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Recomendacion"
            v-model="data.recomendacion.recomendacion"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="5" xs="12" md="12">
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
        
         <v-btn
          text
          color="warning"
          @click="e1 = 1"
        >
          Back
        </v-btn>
     

        <v-btn   color="red" text>
          Cancel
        </v-btn>
           <v-btn
          text
          color="primary"
          @click="ContinueStep3()"
        >
          Continue
        </v-btn>
       
           <v-btn
          color="success"
          @click="save()"
          
        >
          SAVE
        </v-btn>
           </v-form>
      </v-stepper-content>

     
        <v-stepper-content step="3">
         <v-form ref="formThree" v-model="validThree" lazy-validation>
        <v-card
          class="mb-12"
          height="295px"
        >
         <v-row>
           <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Causa"
            v-model="data.causa.causa"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
             <v-text-field
            label="SubCausa"
            v-model="data.subcausa.subcausa"
            outlined
             :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="6" xs="12" md="6">
         <v-text-field
            label="Digite la serie desmontada"
            outlined
              v-model="data.transformadorR.serie"
            
              :rules="textRules"
          ></v-text-field>
            </v-col>
         
             </v-row>
        </v-card>
         <v-btn
          text
          color="warning"
          @click="e1 = 2"
        >
          Back
        </v-btn>
           <v-btn text    color="red">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="ContinueStep4()"
        >
          Continue
        </v-btn>

     
          </v-form>
      </v-stepper-content>
        <v-stepper-content step="4">

           <v-form ref="formFour" v-model="validFour" lazy-validation>
          <v-card
          class="mb-10"
          height="295px"
        >
         <v-row>
        <v-col cols="8" xs="12" md="8">
         <v-text-field
            label="Digite la serie a instalar"
               v-model="data.transformadorI.serie"
            outlined
        
                 :rules="textRules"
          ></v-text-field>
            </v-col>
            <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Etiqueta"
            outlined
               v-model="data.matricula"
                  :rules="textRules"
          ></v-text-field>
            </v-col>
             </v-row>
        </v-card>
    
          <v-btn
          text
          color="warning"
          @click="e1 = 3"
        >
          Back
        </v-btn>
      

        <v-btn text     color="red">
          Cancel
        </v-btn>
        <v-btn
          color="success"
          @click="update()"
          
        >
          Actualizar Aviso
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
        mdi-eye
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
    estado:0,
    datos:[],
    dataVivienda:[],
    dataSector:[],
    dataProvincia:[],
    dataMunicipio:[],
    dataLocalidad:[],
    dataSeccionador:[],
    dataApartarrayos:[],
    dataPuestaTierra:[],
    dataApoyo:[],
    dataEstado:[],
    dataEstadoApoyo:[],
    dataRecomendacion:[],
    dataCausa:[],
    dataSubcausa:[],
    dataCircuito:[],
    validOne:true,
    validTwo:true,
    validThree:true,
    validFour:true,
    e1: 1,
    loading: true,
    dialog:false,
    dialogDelete:false,
    dataTrInstalado:{
       transformadorId:0,
       estadoId:0,
       serie:"",
       estado:"",
       ubicacion:"",
       propiedad:"",
       potencia:""
    }, dataTrDesmontado:{
       transformadorId:0,
       estadoId:0,
       serie:"",
       estado:"",
       ubicacion:"",
       propiedad:"",
       potencia:""
    },
    dataTR:{
         estado:0,
         ubicacion:0,
         efecto:13,
         usuario:3

    },
    data:{
       aviso:"",
       obra:"",
       ct:"",
       calle:"",
       observacion:"",
       matricula:"",
       sector:0,
       circuito:0,
       vivienda:0,
       provincia:0,
       municipio:0,
       localidad:0,
       seccionador:0,
       apartarrayos:0,
       puestatierra:0,
       recomendacion:0,
       apoyo:0,
       estadoapoyo:0,
       causa:0,
       subcausa:0,
       usuario:3,
       transformadorI:0,
       transformadorR:0,
       estado:1
    },
     dataDefault:{
       aviso:"",
       obra:"",
       ct:"",
       calle:"",
       observacion:"",
       matricula:"",
       sector:0,
       circuito:0,
       vivienda:0,
       provincia:0,
       municipio:0,
       localidad:0,
       seccionador:0,
       apartarrayos:0,
       puestatierra:0,
       recomendacion:0,
       apoyo:0,
       estadoapoyo:0,
       causa:0,
       subcausa:0,
       usuario:3,
       transformadorI:0,
       transformadorR:0,
       estado:1
    },
     e1: 1,
    loading: true,
    headers: [
      {
        text: "AVISO",
        value: "aviso",
      
        align: "center",
      },
      {
        text: "CT",
        value: "ct",
   
        align: "center",
      },
      {
        text: "CIRCUITO",
        value: "circuito.circuito",
       
        align: "center",
      },
      {
        text: "PROVINCIA",
        value: "provincia.provincia",
     
        align: "center",
      },

      {
        text: "SECTOR",
        value: "sector.sector",

        align: "center",
      },
      {
        text: "MUNICIPIO",
        value: "municipio.municipio",
       
        align: "center",
      },
      {
        text: "LOCALIDAD",
        value: "localidad.localidad",
    
        align: "center",
      },
      {
        text: "ESTADO",
        value: "estado.estado",
      
        align: "center",
      },
      {
        text: "USUARIO",
        value: "usuario.username",
      
        align: "center",
      }, {
        text: "ACCIONES",
        value: "actions",
        align: "center",
      },
    ],
    editedIem:{},
    editedIndex: -1
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Datos del Aviso" : "Editar Cliente";
    },
  },

  watch: {
    
  },

  created() {
    
      this.cargarEstados();
  },

  methods: {

    editItem(item){

      this.data = Object.assign({}, item);
     // this.cargarMunicipio(item.provincia.provinciaId)
     // this.cargarLocalidad(item.municipio.municipioId)
      this.dialog = true;
      
    

    },
     close () {
        this.dialog = false
        this.$nextTick(() => {
          this.data = Object.assign({}, this.dataDefault)
        });
        //this.$refs.form.resetValidation();
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
  ContinueStep4()

      {  
        
       if(this.$refs.formThree.validate()==false){

          return
      }else
      {
        this.e1=4;
      }
    }, 
    update()
    {

  
      
       
           this.data.usuario=3;
           this.data.estado=3;
  
        this.axios
        .put( `/aviso/${this.data.avisoId}`,this.data)
        .then((res) => {
          if (res.status == 200) {
              this.datos=[];
              this.datos.push(res.data);
              this.alertSave({mensaje:"Aviso Enviado Actualizar",dialog:this.dialog});
            this.close();
          } else {
               this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Aviso"});
          }
        })
        .catch((err) => {
           this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Aviso"});
          console.log(err);
        });

        
      },cargarEstados(){
  
       this.dataEstado = [];
        this.axios
        .get("/avisos/estado")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataEstado = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
   findByEstado(estadoId){
      this.datos = [];
      this.axios
        .get(`/aviso/estado-aviso/${estadoId}`)
        .then((res) => {
          if (res.data.length > 0) {
              for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.datos.push(res.data[i]);
                   
                  
                }
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
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