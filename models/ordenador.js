// Using Node.js `require()`
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected!'));

//definimos el esquema del documento
const ordenadoresSchema = new mongoose.Schema(
    {
        marca: String,
        precio: Number
    }
);
//Creamos el modelo
const ordenador = mongoose.model('ordenador', ordenadoresSchema, 'ordenadores');

const buscaPrimero = () => {
    //buscamos el primer registro
    ordenador.findOne()
        .then(ordenador => {
            if (ordenador) {
                console.log('Primero ordenador encontrado', ordenador);
            } else {
                console.log('No se encontro ningun registro');
            }
        })
        .catch(err => console.error('Error al obtener el ordenador', err));
}
const buscaTodos = () => {
    //busca todos los registros
    return ordenador.find()
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados', ordenadores);
                return ordenadores;
            } else {
                console.log('No se encontro ningun registro');
                return null;
            }
        })
        .catch(err => {console.error('Error al obtener los ordenadores', err)
            throw err
        });
}
const idBuscado = '8898f70dd37433bc6ff3d4b6';
const buscaPorId = (id) => {
    //buscamos el primer registro
    return ordenador.findById(id)
        .then(ordenador => {
            if (ordenador) {
                console.log('Ordenador con id:', id, ' encontrado:', ordenador);
                return ordenador;
            } else {
                console.log('No se encontro el ordenador con el id:' + id);
                return null;
            }
        })
        .catch(err => {console.error('Error al obtener el ordenador', err)
            throw err
        });
        
}

//Busca por precio mayor 
const buscaPrecioMayor = (parametro) => {
    //busca todos los registros
    ordenador.find({ precio: { $gt: parametro } })
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados con precio mayor que ', parametro, ' encontrados: ', ordenadores);
            } else {
                console.log('No se encontro ningun registro');
            }
        })
        .catch(err => console.error('Error al obtener los ordenadores', err));
}

/*
Extra
*/
const creaNuevoOrdenador = (m, p) => {
    const nuevoOrdenador = new ordenador({
        marca: m,
        precio: p
    });
    // Guardar el ordenador en la base de datos
    nuevoOrdenador.save()
        .then(ordenador => console.log('Ordenador guardado:', ordenador))
        .catch(err => console.error('Error al guardar el ordenador:', err));
}
const actualizaPrecio = (idOrdenador,nuevoPrecio) => {
    ordenador.findByIdAndUpdate(idOrdenador, { precio: nuevoPrecio }, { new: true })
   .then(ordenadorActualizado => {
     if (ordenadorActualizado) {
       console.log('Ordenador actualizado:', ordenadorActualizado);
     } else {
       console.log('No se encontró ningún ordenador con ese ID.');
     }
   })
   .catch(err => console.error('Error al actualizar el ordenador:', err));
}
const borraOrdenador = (idOrdenadorParaBorrar) => {
    
 ordenador.findByIdAndDelete(idOrdenadorParaBorrar)
   .then(ordenadorEliminado => {
     if (ordenadorEliminado) {
       console.log('Ordenador eliminado:', ordenadorEliminado);
     } else {
       console.log('No se encontró ningún ordenador con ese ID.');
     }
   })
   .catch(err => console.error('Error al eliminar el ordenador:', err));
}

module.exports = { buscaPrimero, buscaTodos, buscaPorId, buscaPrecioMayor, creaNuevoOrdenador, actualizaPrecio , borraOrdenador,ordenador };
