<template>
  <div>
   <v-data-table
    :headers="headers"
    sort-by="calories"
    class="elevation-1 ma-4"
    :items="datos"
  >
    <template v-slot:top>
   
        <v-card-title class="blue--text">Administrar Avisos</v-card-title>
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
        
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Aviso
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
          <v-select
           label="Viviendas"
             item-text="vivienda"
               item-value="viviendaId"
                :items="dataVivienda"
                v-model="data.vivienda"
               :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Provincia"
            item-text="provincia"
               item-value="provinciaId"
                :items="dataProvincia"
                v-model="data.provincia"
               :rules="selectRules"
          outlined
              @change="cargarMunicipio($event, data.provincia)"
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Municipio"
              item-text="municipio"
               item-value="municipioId"
                :items="dataMunicipio"
                v-model="data.municipio"
               :rules="selectRules"
          outlined
             @change="cargarLocalidad($event, data.municipio)"
        ></v-select>
            </v-col>
            <v-col cols="3" xs="12" md="3">
            <v-select
           label="Localidad"
              item-text="localidad"
               item-value="localidadId"
                :items="dataLocalidad"
                v-model="data.localidad"
               :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
           label="Sector"
          outlined
             item-text="sector"
               item-value="sectorId"
                :items="dataSector"
                v-model="data.sector"
               :rules="selectRules"
        ></v-select>
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
        <v-select
            label="Circuito"
            outlined
               item-text="circuito"
               item-value="circuitoId"
                :items="dataCircuito"
                v-model="data.circuito"
               :rules="selectRules"
          ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
         <v-select
            label="Seccionador"
            outlined
              item-text="seccionador"
               item-value="seccionadorId"
                :items="dataSeccionador"
                v-model="data.seccionador"
               :rules="selectRules"
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
            label="Apartarrayos"
            outlined
               item-text="apartarrayos"
               item-value="apartarrayosId"
                :items="dataApartarrayos"
                v-model="data.apartarrayos"
               :rules="selectRules"
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Puesta Tierra"
            item-text="puestaTierra"
               item-value="puestaTierraId"
                :items="dataPuestaTierra"
                v-model="data.puestatierra"
               :rules="selectRules"
            outlined
          ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-select
            label="Apoyo"
            outlined
            item-text="apoyo"
               item-value="apoyoId"
                :items="dataApoyo"
                v-model="data.apoyo"
               :rules="selectRules"
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Estado Apoyo"
            outlined
             item-text="estadoApoyo"
               item-value="estadoApoyoId"
                :items="dataEstadoApoyo"
                v-model="data.estadoapoyo"
               :rules="selectRules"
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Recomendación"
            outlined
              item-text="recomendacion"
               item-value="recomendacionId"
                :items="dataRecomendacion"
                v-model="data.recomendacion"
               :rules="selectRules"
          ></v-select>
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
          <v-select
           label="Causa"
          outlined
           item-text="causa"
               item-value="causaId"
                :items="dataCausa"
                v-model="data.causa"
               :rules="selectRules"
                @change="cargarSubCausas($event, data.causa)"
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-select
           label="Subcausa"
             item-text="subcausa"
            item-value="subcausaId"
                :items="dataSubcausa"
                v-model="data.subcausa"
               :rules="selectRules"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="6" xs="12" md="6">
         <v-text-field
            label="Digite la serie desmontada"
            outlined
              v-model="dataTrDesmontado.serie"
              v-on:keyup.enter="findBySerieDesmontada(dataTrDesmontado.serie)"
              :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Estado"
            outlined
               v-model="dataTrDesmontado.estado"
                 :rules="textRules"
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Ubicación"
               v-model="dataTrDesmontado.ubicacion"
                 :rules="textRules"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-text-field
            disabled
            label="Propiedad"
               v-model="dataTrDesmontado.propiedad"
                 :rules="textRules"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            disabled
            label="Potencia"
               v-model="dataTrDesmontado.potencia"
                 :rules="textRules"
            outlined
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
               v-model="dataTrInstalado.serie"
            outlined
              v-on:keyup.enter="findBySerieInstalada(dataTrInstalado.serie)"
                 :rules="textRules"
          ></v-text-field>
            </v-col>
             <v-col cols="4" xs="12" md="4">
          <v-text-field
            disabled
            label="Estado"
               v-model="dataTrInstalado.estado"
                  :rules="textRules"
            outlined
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Ubicación"
               v-model="dataTrInstalado.ubicacion"
                  :rules="textRules"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-text-field
            disabled
            label="Propiedad"
               v-model="dataTrInstalado.propiedad"
                  :rules="textRules"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            disabled
            label="Potencia"
               v-model="dataTrInstalado.potencia"
                  :rules="textRules"
            outlined
          ></v-text-field>
            </v-col> <v-col cols="3" xs="12" md="3">
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
          Finalizar Aviso
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
      return this.editedIndex === -1 ? "Nuevo Aviso" : "Editar Cliente";
    },
  },

  watch: {
    
  },

  created() {
      this.cargarVivienda();
      this.cargarSector();
      this.cargarProvincia();
      this.cargarSeccionadores();
      this.cargarApartarrayos();
      this.cargarPuestaTierra();
      this.cargarApoyo();
      this.cargarEstadoApoyo();
      this.cargarRecomendaciones();
      this.cargarCausas();
      this.cargarCircuito();
      this.cargarEstados();
  },

  methods: {
    updateTr(transformadorId,data){
   this.axios.put(
          `/transformador/estado-ubicacion/${transformadorId}`,
          data
        )
        .then((res) => {
          if (res.status == 200) {
              
              return res.data;
          } else {
               this.alertError({mensaje:"Ha ocurrido un error al Intentar Transferir este Transformador"});
          }
        })
        .catch((err) => {
           this.alertError({mensaje:"Ha ocurrido un error al Intentar Transferir este Transformador"});
           console.log(err);
        });

    },
    editItem(item){

      this.data = Object.assign({}, item);
      this.cargarMunicipio(item.provincia.provinciaId)
      this.cargarLocalidad(item.municipio.municipioId)
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
   async update()
    {

     if(this.$refs.formFour.validate()==false)
      {
          return ;
      }else
    
      {
       
           this.data.usuario=3;
           this.data.transformadorI=this.dataTrInstalado.transformadorI
           this.data.transformadorR=this.dataTrInstalado.transformadorI;
           this.data.estado=2;
  
        this.axios
        .put( `/aviso/${this.data.avisoId}`,this.data)
        .then((res) => {
          if (res.status == 200) {
              this.datos=[];
              this.dataTR.estado=11;
              this.dataTR.ubicacion=15;
              this.updateTr(this.dataTrInstalado.transformadorId,this.dataTR)
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

              this.dataTR.estado=14;
              this.dataTR.ubicacion=14;
             //this.dataTR.transformadorId=this.dataTrDesmontado.transformadorId;
              this.updateTr(this.dataTrDesmontado.transformadorId,this.dataTR)
      }
    },
    save(){

   
     if(this.$refs.formTwo.validate()==false)
      {
          return ;
      }else
    {
    this.data.causa=11;
    this.data.subcausa=32;
    this.data.usuario=3;
    this.data.transformadorI=52;
    this.data.transformadorR=52;
    this.data.estado=1;
    this.data.matricula="";

   
   
        this.axios
        .post("/aviso/create", this.data)
        .then((res) => {
          if (res.status == 201) {
              this.datos.push(res.data);
              this.alertSave({mensaje:"Aviso Registrado Correctamente",dialog:this.dialog});
            this.close();
          } else {
               this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Aviso"});
          }
        })
        .catch((err) => {
           this.alertError({mensaje:"Ha ocurrido un error al Intentar agregar este Aviso"});
          console.log(err);
        });

         }
    },
    cargarVivienda(){
      this.dataVivienda = [];
      this.axios
        .get("/avisos/viviendas")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataVivienda = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarSector(){
     this.dataSector = [];
      this.axios
        .get("/avisos/sectores")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataSector = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarProvincia(){
      this.dataProvincia = [];
      this.axios
        .get("/avisos/provincias")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataProvincia = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarMunicipio(provinciaId){
       this.dataMunicipio = [];
       this.axios
        .get( `/avisos/provincia-municipios/${provinciaId}`)
        .then((res) => {
          if (res.data.length > 0) {
            for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                  
                   this.dataMunicipio.push(res.data[i].municipio);
                   
                  
                }
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },
    cargarEstados(){
  
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
    },cargarLocalidad(municipioId){
  
       this.dataLocalidad = [];
       this.axios
        .get( `/avisos/municipio-localidades/${municipioId}`)
        .then((res) => {
          if (res.data.length > 0) {
            for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataLocalidad.push(res.data[i].localidad);
                   
                  
                }
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarSeccionadores(){
      this.dataSeccionador = [];
      this.axios
        .get("/avisos/seccionadores")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataSeccionador = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarApartarrayos(){
      this.dataApartarrayos = [];
      this.axios
        .get("/avisos/apartarrayos")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataApartarrayos = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarPuestaTierra(){
      this.dataPuestaTierra = [];
      this.axios
        .get("/avisos/puesta-tierras")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataPuestaTierra = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarApoyo(){
      this.dataApoyo = [];
      this.axios
        .get("/avisos/apoyos")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataApoyo = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarEstadoApoyo(){
      this.dataEstadoApoyo = [];
      this.axios
        .get("/avisos/estado-apoyos")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataEstadoApoyo = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, cargarRecomendaciones(){
      this.dataRecomendacion = [];
      this.axios
        .get("/avisos/recomendaciones")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataRecomendacion = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
   , cargarCausas(){
      this.dataCausa = [];
      this.axios
        .get("/avisos/causas")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataCausa = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } 
     ,findByEstado(estadoId){
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
    }, cargarCircuito(){
      this.dataCircuito = [];
      this.axios
        .get("/aviso/circuitos")
        .then((res) => {
          if (res.data.length > 0) {
            this.dataCircuito = res.data;
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },cargarSubCausas(causaId){
  
       this.dataSubcausa = [];
       this.axios
        .get( `/avisos/causa-subcausas/${causaId}`)
        .then((res) => {
          if (res.data.length > 0) {
            for (const i in res.data) {
                if (res.data.hasOwnProperty.call(res.data, i)) {
            
                   
                   this.dataSubcausa.push(res.data[i].subcausa);
                   
                  
                }
              }
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },findBySerieInstalada(serie){
   
      this.axios
        .get(`/transformador/serie/${serie}`)
        .then((res) => {
         
          if (res.status==200) {
               
               this.dataTrInstalado.transformadorId=res.data.transformadorId;
               this.dataTrInstalado.potencia=res.data.capacidad.capacidad;
               this.dataTrInstalado.propiedad=res.data.propiedad.propiedad;
               this.dataTrInstalado.estado=res.data.estado.estado;
               this.dataTrInstalado.estadoId=res.data.estado.estadoId;
               this.dataTrInstalado.ubicacion=res.data.ubicacion.ubicacion;
        
               
             
           }
     
           
          
        })
        .catch((err) => {
         
                this.alertError({mensaje:"Transfomador Inexistente"});
        });  
  },findBySerieDesmontada(serie){
   
      this.axios
        .get(`/transformador/serie/${serie}`)
        .then((res) => {
         
          if (res.status==200) {
               
               this.dataTrDesmontado.transformadorId=res.data.transformadorId;
               this.dataTrDesmontado.potencia=res.data.capacidad.capacidad;
               this.dataTrDesmontado.propiedad=res.data.propiedad.propiedad;
               this.dataTrDesmontado.estado=res.data.estado.estado;
               this.dataTrDesmontado.estadoId=res.data.estado.estadoId;
               this.dataTrDesmontado.ubicacion=res.data.ubicacion.ubicacion;
        
               
             
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