<template>
  <div>
   <v-data-table
    :headers="headers"
    sort-by="calories"
    class="elevation-1 ma-4"
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
        <v-card
          class="mb-10"
         
        >
          <v-row >
            <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Serie"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
           label="Suplidor"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            label="Licitación"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-select
           label="Valoración"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Propiedad"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Fecha de Evaluación"
          outlined
        ></v-select>
            </v-col>
            <v-col cols="3" xs="12" md="3">
            <v-select
           label="Soporte"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
           label="Tipo de Soporte"
          outlined
        ></v-select>
            </v-col>
            
          </v-row>
         
        
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-10"
          height="295px"
        >

        <v-row>
           <v-col cols="3" xs="12" md="3">
        <v-select
           label="Fabricante"
          outlined
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Fases"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Capacidad"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Conexión TR"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-select
           label="Tensión Primaria"
          outlined
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Tensión Secundaria"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Regulación"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Ubicación"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Voltaje CC"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="PSC(W)"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="PCC(W)"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Pérdida a 85 C"
            outlined
          ></v-text-field>
            </v-col>
        </v-row>
         </v-card>
        

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
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
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-text-field
            label="Impedancia"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="Corriente IOC"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Ubicación"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-select
           label="Resultado de Evaluación"
          outlined
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Estado"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
           label="Tipo de Reparación"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-text-field
            label="Sello"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="4" xs="12" md="4">
        <v-select
           label="Razones de Rechazo"
          outlined
        ></v-select>
            </v-col>
             
               <v-col cols="7" xs="12" md="7">
      
      <v-textarea
          append-icon="mdi-comment"
          class="mx-2"
          label="Observación"
          rows="1"
        ></v-textarea>
 
            </v-col>
           
        </v-row>
        </v-card>
      
        
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
        <v-btn
          color="success"
          
        >
          SAVE
        </v-btn>
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

export default {
  data: () => ({
     e1: 1,
    loading: true,
    headers: [
      {
        text: "SERIE",
        align: "center",
        value: "serie",
      },
      {
        text: "SOPORTE",
        value: "soporte",
      
        align: "center",
      },
      {
        text: "TIPO SOPORTE",
        value: "tipoSoporte",
   
        align: "center",
      },
      {
        text: "FABRICANTE",
        value: "fabricante",
       
        align: "center",
      },
      {
        text: "FASES",
        value: "fase",
     
        align: "center",
      },

      {
        text: "CAPACIDAD",
        value: "capacidad",
       
        align: "center",
      },
      {
        text: "SELLO",
        value: "sello",
    
        align: "center",
      },
      {
        text: "ESTADO",
        value: "estado",
      
        align: "center",
      },
      {
        text: "UBICACIÓN",
        value: "ubicacion",

        align: "center",
      }
    ],
    editedIem:{},
    data: [],
    editedIndex: -1
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Evaluación" : "Editar Cliente";
    },
  },

  watch: {
    
  },

  created() {
 
  },

  methods: {
   
   
  },
};
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>
