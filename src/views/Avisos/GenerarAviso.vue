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
        <v-toolbar-title>Registro de Avisos</v-toolbar-title>
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
        <v-card
          class="mb-10"
         
        >
          <v-row >
            <v-col cols="3" xs="12" md="3">
            <v-text-field
            label="Aviso"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Obra"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            label="CT"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-select
           label="Viviendas"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Provincia"
          outlined
        ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
            <v-select
           label="Municipio"
          outlined
        ></v-select>
            </v-col>
            <v-col cols="3" xs="12" md="3">
            <v-select
           label="Localidad"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
           label="Sector"
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
           <v-col cols="6" xs="12" md="6">
       <v-text-field
            label="Calle"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
         <v-select
            label="Seccionador"
            outlined
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
        <v-select
            label="Apartarrayos"
            outlined
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Puesta Tierra"
            outlined
          ></v-select>
            </v-col>
              <v-col cols="3" xs="12" md="3">
        <v-select
            label="Apoyo"
            outlined
          ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
        <v-select
           label="Apoyo"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Estado Apoyo"
            outlined
          ></v-select>
            </v-col>
             <v-col cols="3" xs="12" md="3">
         <v-select
            label="Recomendación"
            outlined
          ></v-select>
            </v-col>
             <v-col cols="5" xs="12" md="5">
                            <v-textarea
                            append-icon="mdi-comment"
                            class="mx-2"
                            label="Observación"
                           rows="1"
                       ></v-textarea>
                    </v-col>
                 <v-col cols="4" xs="12" md="4">
                      <v-file-input
                         accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera"
                          label="Adjuntar Imagen"
                  ></v-file-input>
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
          class="mb-12"
          height="295px"
        >
         <v-row>
           <v-col cols="3" xs="12" md="3">
          <v-select
           label="Causa"
          outlined
        ></v-select>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-select
           label="SubCausa"
          outlined
        ></v-select>
            </v-col>
             <v-col cols="6" xs="12" md="6">
         <v-text-field
            label="Digite la serie desmontada"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Estado"
            outlined
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Ubicación"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-text-field
            disabled
            label="Propiedad"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            disabled
            label="Potencia"
            outlined
          ></v-text-field>
            </v-col>
             </v-row>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
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
        <v-stepper-content step="4">
          <v-card
          class="mb-10"
          height="295px"
        >
         <v-row>
        <v-col cols="8" xs="12" md="8">
         <v-text-field
            label="Digite la serie a instalar"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="4" xs="12" md="4">
          <v-text-field
            disabled
            label="Estado"
            outlined
          ></v-text-field>
            </v-col>
              <v-col cols="3" xs="12" md="3">
          <v-text-field
            disabled
            label="Ubicación"
            outlined
          ></v-text-field>
            </v-col>
               <v-col cols="3" xs="12" md="3">
            <v-text-field
            disabled
            label="Propiedad"
            outlined
          ></v-text-field>
            </v-col>
             <v-col cols="3" xs="12" md="3">
           <v-text-field
            disabled
            label="Potencia"
            outlined
          ></v-text-field>
            </v-col> <v-col cols="3" xs="12" md="3">
           <v-text-field
            label="Etiqueta"
            outlined
          ></v-text-field>
            </v-col>
             </v-row>
        </v-card>
    

        <v-btn
          color="primary"
          @click="e1 = 4"
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
        text: "CÓDIGO",
        align: "center",
        value: "codigo",
      },
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
        value: "circuito",
       
        align: "center",
      },
      {
        text: "PROVINCIA",
        value: "provincia",
     
        align: "center",
      },

      {
        text: "SECTOR",
        value: "sector",

        align: "center",
      },
      {
        text: "MUNICIPIO",
        value: "municipio",
       
        align: "center",
      },
      {
        text: "LOCALIDAD",
        value: "localidad",
    
        align: "center",
      },
      {
        text: "ESTADO",
        value: "estado",
      
        align: "center",
      }
    ],
    editedIem:{},
    data: [],
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
