<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="data"
    sort-by="calories"
    class="elevation-1 ma-4"
  >
    <template v-slot:top>
      <v-card-title class="blue--text">Reporte de Pagos</v-card-title>
      <v-toolbar flat color="white">
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.fechaDesde"
                  label="Desde"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="editedItem.fechaDesde"
                :max="new Date().toISOString().substr(0, 10)"
                min="1920-01-01"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(editedItem.fechaDesde)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="12" md="2">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.fechaHasta"
                  label="Hasta"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker ref="picker" v-model="editedItem.fechaHasta" min="1920-01-01">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(editedItem.fechaDesde)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="12" md="2">
            <v-select
              item-text="text"
              item-value="id"
              :items="dataPago"
              label="Status"
              v-model="editedItem.pago"
            ></v-select>
          </v-col>
          <v-col cols="12" xs="12" md="2">
            <v-select
              item-text="empresa"
              item-value="empresaID"
              :items="dataEmpresa"
              label="Empresa"
              v-model="editedItem.empresaID"
            ></v-select>
          </v-col>
          <v-col cols="12" xs="12" md="2">
            <v-select
              item-text="vendedor"
              item-value="vendedorID"
              :items="dataVendedor"
              v-model="editedItem.vendedorID"
              label="Vendedor"
            ></v-select>
          </v-col>
          <v-col cols="12" xs="12" class="text-center" md="1">
            <v-btn @click="buscarReporte" class="white--text" color="blue">Buscar</v-btn>
          </v-col>
          <v-col cols="12" xs="12" class="text-center" md="1">
            <download-excel class="blue--text" :data="data" worksheet="Datos" name="Clientes.xls">
              <v-icon class="green--text" medium>mdi-microsoft-excel</v-icon>EXPORTAR
            </download-excel>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-row>
        <v-col cols="12" xs="12" tag="strong" class="ma-4" md="6">
          <p class="blue--text">Total Cobrado : {{FormatoMoneda(totalCobrado)}}</p>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        v-if="item.nom_doc!=null"
        class="success--text"
        medium
        @click="download(item)"
      >mdi-cloud-download-outline</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import alertas from "@/missing/Alertas";
import token from "@/missing/ConfigToken";
import validaciones from "@/missing/Validaciones";
import formatos from "@/missing/Formatos";
import "@/assets/estilos.css";
export default {
  mixins: [token, validaciones, formatos, alertas],
  data: () => ({
    image: "",
    dataPago: [
      { text: "Pagado", id: 1 },
      {
        text: "Sin Pagar",
        id: 0
      }
    ],
    data: [],
    dataEmpresa: [],
    dataVendedor: [],
    menu: false,
    menu1: false,
    totalCobrado: 0,
    payload: {},
    editedItem: {
      vendedorID:0,
      empresaID:0,
      fechaDesde: "",
      fechaHasta: "",
      pago: 0
    },
    headers: [
      {
        text: "ID",
        class: ["white--text blue"],
        align: "center",
        value: "pagoID"
      },
      {
        text: "CLIENTE",
        value: "cliente",
        class: ["white--text blue"],
        align: "center"
      },

      {
        text: "MONTO PAGADO",
        value: "montoPagar",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Fecha de Pago",
        value: "updatedAt",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Forma de Pago",
        value: "tipo",
        class: ["white--text blue"],
        align: "center"
      },
      {
        text: "Acciones",
        value: "actions",
        class: ["white--text blue"],
        align: "center"
      }
    ]
  }),
  created() {
    this.vendedores();
    this.buscarEmpresas();
  },
  methods: {
    vendedores() {
      this.dataVendedor = [];
      this.axios
        .get("/vendedor", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataVendedor = res.data;
             this.dataVendedor.push({ vendedorID: 0, vendedor: "" });
             this.dataVendedor.sort((a, b) => {
              return a.vendedorID - b.vendedorID;
            });
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buscarEmpresas() {
      this.dataEmpresa = [];
      this.axios
        .get("/empresa", this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.dataEmpresa = res.data;
             this.dataEmpresa.push({ empresaID: 0, empresa: "" });
             this.dataEmpresa.sort((a, b) => {
              return a.empresaID - b.empresaID;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    download(item) {
      this.axios
        .get(
          `/download/${item.nom_doc}`,
          { responseType: "blob" },
          this.buscarToken()
        )
        .then(res => {
          if (res.status == 200) {
            let image = URL.createObjectURL(res.data);
            var a = document.createElement("a");
            a.download = item.originalname;
            a.href = image;
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            this.payload.mensaje = "Error al descargar archivo";
            this.alertError(this.payload);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    buscarReporte() {
    
      this.data = [];
      this.axios
        .post("/clientes-pagos-reporte", this.editedItem, this.buscarToken())
        .then(res => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.loading = false;
             this.totalCobrado =0;
            for (const key in this.data) {
              if (this.data.hasOwnProperty(key)) {
                this.totalCobrado += this.data[key].montoPagado;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.panel2 {
  color: #01579b !important;
}
</style>