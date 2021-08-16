<template>
  <div class="body">
    <v-row style="margin-top:40% opacity">
      <v-col cols="12" md="3" xs12 class="mx-auto">
      
          <v-row class="mx-4">
            <v-col cols="12" xs12 class="d-flex justify-center">
              <div>
               <v-img
                 src="../assets/flash.svg"
                  max-height="50"
                  max-width="50"
                 ></v-img>

              </div>
            
              
            </v-col>

            <v-col cols="12" xs12 class="d-flex justify-center">
                    <p class="font-weight-bold">
                SIGN IN TO SIGDE
              </p>
            </v-col>
          </v-row>
            <v-card >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="ma-4 d-flex justify-center ">
              <v-col cols="12" xs12>
                <v-text-field
                  :rules="emailRules"
                  v-model.trim="email"
                  required
                  type="email"
                  solo
                  label="Username o email"
                  append-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs12>
                <v-text-field
                  v-model.trim="password"
                  solo
                  :rules="Rules"
                  required
                  type="password"
                  name="password"
                  autocomplete="on"
                  placeholder="Password"
                  append-icon="mdi-key"
                ></v-text-field>
              </v-col>
                <v-col cols="12" xs12>
                <v-btn
                block
                small
                dark
                color="success"
                @click="login()"
                class="white--text tipo mb-4"
                >Sign In</v-btn
              >
              
              </v-col>
             
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import router from "@/router";
import { mapMutations, mapActions, mapState } from "vuex";
import validaciones from "@/missing/Validaciones";
import alertas from "@/missing/Alertas";
export default {
  mixins: [validaciones, alertas],
  name: "Login",
  data() {
    return {
      recordarPass: false,
      overlay: false,
      payload: {},
      valid: true,
      show1: false,
      email: "",
      password: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(["guardarUsuario"]),
    iniciaSesion() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login() {
      router.push({ name: "Menu" });
      /* this.overlay = true;
      this.axios
        .post("/usuarios/login", {
          correo: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.token) {
            this.guardarUsuario(res.data.token);

            router.push({ name: "Menu" });
          } else {
            this.overlay = false;
            this.payload.mensaje = res.data.mensaje;
            this.alertError(this.payload);
          }
        })
        .catch((err) => {
          this.overlay = false;
          this.payload.mensaje = err;
          this.alertError(this.payload);
        });*/
    },
  },
};
</script>

<style scoped>
.body {
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.color {
  color: white !important ;
}
.letras {
  font-family: Calibri;
  font-size: 14px;
}
.white--text /deep/ label {
  color: white;
}
.opacity {
  background-color: rgba(238, 233, 231, 0.4);
}
</style>
