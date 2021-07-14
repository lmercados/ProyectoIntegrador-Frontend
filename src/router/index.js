import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../components/Home.vue";
import Menu from "../components/Menu.vue";
import About from "../components/About.vue";
import Factura from "../components/Factura.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Menu",
    name: "Menu",
    component: Menu,
    children: [
      { path: "Home", component: Home },
      {
        path: "Factura",
        name: "Factura",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/Factura.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "/EvaluacionTRNuevo",
        name: "EvaluacionTRNuevo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Transformadores/EvaluacionTRNuevo.vue"
          ),
      },{
        path: "/RetirarTRLinea",
        name: "RetirarTRLinea",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Transformadores/RetirarTRLinea.vue"
          ),
      },{
        path: "/RetirarTRObra",
        name: "RetirarTRObra",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Transformadores/RetirarTRObra.vue"
          ),
      },{
        path: "/TransferirTR",
        name: "TransferirTR",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Transformadores/TransferirTR.vue"
          ),
      },{
        path: "/GenerarAviso",
        name: "GenerarAviso",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Avisos/GenerarAviso.vue"
          ),
      },{
        path: "/EjecutarAviso",
        name: "EjecutarAviso",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Avisos/EjecutarAviso.vue"
          ),
      },
      {
        path: "/AdmCliente",
        name: "AdmCliente",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Clientes/AdmCliente.vue"
          ),
      },
      {
        path: "/AdmVendedores",
        name: "AdmVendedores",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Vendedores/AdmVendedores.vue"
          ),
        //meta: { requireAuth: true },
      },
      {
        path: "/AdmUsuarios",
        name: "AdmUsuarios",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Usuarios/AdmUsuarios.vue"
          ),
        meta: { requireAuth: true },
      },
      {
        path: "/AdmProceso",
        name: "AdmProceso",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Procesos/AdmProceso.vue"
          ),
      },
      {
        path: "/AdmCobros",
        name: "AdmCobros",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Cobros/AdmCobros.vue"
          ),
      },
      {
        path: "/AdmSeguros",
        name: "AdmSeguros",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Otros/AdmSeguros.vue"
          ),
      },
      {
        path: "/AdmPlan",
        name: "AdmPlan",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Otros/AdmPlan.vue"),
      },
      {
        path: "/AdmEmpresa",
        name: "AdmEmpresa",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Otros/AdmEmpresa.vue"
          ),
      },
      {
        path: "/PagosMasivos",
        name: "PagosMasivos",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Cobros/PagosMasivos.vue"
          ),
      },
      {
        path: "/AdmReferencia",
        name: "AdmReferencia",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Otros/AdmReferencia.vue"
          ),
      },
      {
        path: "/AdmReporteCobros",
        name: "AdmReporteCobros",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Cobros/AdmReporteCobros.vue"
          ),
        // meta: { requireAuth: true }
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/Errores",
    name: "Errores",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Otros/Errores.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: "/",
});

/*router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.requireAuth);
  const token = localStorage.getItem("token");
  if (token) {
    store.commit("obtenerUsuario", token);
  } else {
    store.commit("obtenerUsuario", "");
  }

  if (rutaProtegida && store.state.usuarioDB.perfil != "Adm") {
    next("/Errores");
  }
  if (to.path == "/" && token != "") {
    next("/Menu");
  } else {
    if (token === null && to.path != "/Login") {
      next("/Login");
    } else {
      next();
    }
  }
});*/

export default router;
