import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoProducto =
  getFirestore().
    collection("Articulo");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daArticulo.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Articulo} */
      const data = doc.data();
      forma.codigoarticulo.value = data.codigoarticulo;
      forma.nombre.value = data.nombre || "";
      forma.contactprov.value = data.contactprov || "";
      forma.tipo.value = data.tipo || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontrĂ³.");
    }
  } catch (e) {
    muestraError(e);
    muestraAlumnos();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const identificador = getString(
        formData, "identificador").trim();  
    const nombre = getString(formData, "nombre").trim();
    const contacto = getString(formData, "contacto").trim();
    const tipo = getString(formData, "tipo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      identificador, 
      nombre,
      contacto,
      tipo,
      fecha
    };
    await daoProducto.
      doc(id).
      set(modelo);
      muestraProductos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminaciĂ³n")) {
      await daoProducto.
        doc(id).
        delete();
        muestraProductos();
    }
  } catch (e) {
    muestraError(e);
  }
}

