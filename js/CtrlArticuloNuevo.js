import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraProductos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoProducto =
  getFirestore().
    collection("Articulo");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const codigoarticulo = getString(
        formData, "codigoarticulo").trim();  
    const nombre = getString(formData, "nombre").trim();
    const contactprov = getString(formData, "contactprov").trim();
    const tipo = getString(formData, "tipo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Articulo} */
    const modelo = {
      codigoarticulo,
      nombre,
      contactprov,
      tipo,
      fecha 
    };
    await daArticulo.
      add(modelo);
      muestraArticulos();
  } catch (e) {
    muestraError(e);
  }
}

