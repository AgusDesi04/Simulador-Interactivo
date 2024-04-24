// LOCAL STORAGE:

let empleados = [];

let empleadosLS = localStorage.getItem("empleadosCargados");
if (empleadosLS) {
    empleados = JSON.parse(empleadosLS);
} else {
    empleados = [];
};


// ELEMENTOS DEL HTML:

let cargarBtn = document.getElementById("botonCarga");
let nombreInput = document.getElementById("nombre");
let generoInput = document.getElementById("genero");
let edadInput = document.getElementById("edad")
let cargoInput = document.getElementById("cargo");
let salarioInput = document.getElementById("salario");
let buscadorInput = document.getElementById("buscador");
let infoBtn = document.getElementById("botonInfo");
let contenedorEmpleados = document.getElementById('contenedorEmpleados')
let formulario = document.getElementById("formulario")
let botonPromedio = document.getElementById("botonPromedio")
let botonBorrarPorNombre = document.getElementById('borrarPorNombre')
let botonBorrarTodo = document.getElementById('borrarTodo')

// FUNCTIONS:

function mostrarInformacionEmpleado(empleadosEncontrados) {

    contenedorEmpleados.innerHTML = ''
    empleadosEncontrados.forEach(empleado => {
        let empleadoHTML = `
        <div  style= "border: 2px solid black">
            <p>Nombre: ${empleado.nombre}</p>
            <p>Género: ${empleado.genero}</p>
            <p>Edad: ${empleado.edad}</p>
            <p>Cargo: ${empleado.cargo}</p>
            <p>Salario: ${empleado.salario}</p>
        </div>
    `;
        contenedorEmpleados.innerHTML += empleadoHTML
    })

}

function buscarPromedio(empleados) {
    let acumulador = 0
    let cantidad = 0

    empleados.forEach(empleado => {
        acumulador += empleado.edad
        cantidad++
    })
    return acumulador / cantidad

}


function mostrarPromedio(promedio) {
    contenedorEmpleados.innerHTML = ''
    contenedorEmpleados.innerHTML = `
<div class="card text-bg-secondary mb-3" style="max-width: 18rem; margin-left: 115px; margin-top: 40px" >
  <div class="card-header">EL PROMEDIO DE EDADES ES:</div>
  <div class="card-body">
    <h5 class="card-title">${promedio} AÑOS</h5>
  </div>
</div>
     
    `;
}

// EVENTOS:

cargarBtn.onclick = () => {
    let nombre = nombreInput.value;
    let genero = generoInput.value;
    let edad = parseInt(edadInput.value) || 0;
    let cargo = cargoInput.value;
    let salario = parseInt(salarioInput.value) || 0;
    if (nombre != "" && genero != "" && cargo != "") {
        if (edad > 0 && salario > 0) {
            empleados.push(new Persona(nombre, genero, edad, cargo, salario));
            localStorage.setItem("empleadosCargados", JSON.stringify(empleados));
            formulario.reset();
            Toastify({
                text: "Empleado Cargado!",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        } else {
            Toastify({
                text: "La edad y el salario deben ser mayores a 0",
                className: "info",
                style: {
                    background: "red",
                }
            }).showToast();
        }
    } else {
        Toastify({
            text: "Los campos de nombre, genero y cargo no pueden estar vacios!",
            className: "info",
            style: {
                background: "red",
            }
        }).showToast();
    };


    console.log(empleados);



};

infoBtn.onclick = () => {
    let buscador = buscadorInput.value.trim().toLowerCase();
    console.log("termino de busqueda:", buscador)
    let empleadosEncontrados = empleados.filter((el) => {
        return el.nombre.toLowerCase().includes(buscador);
    });
    console.log(empleadosEncontrados)
    if (buscador != '') {
        if (empleadosEncontrados.length > 0) {
            contenedorEmpleados.innerHTML = ""

            mostrarInformacionEmpleado(empleadosEncontrados)

        } else {
            Toastify({
                text: "No se encontro el empleado!",
                className: "info",
                style: {
                    background: "red",
                }
            }).showToast();

            contenedorEmpleados.innerHTML = ""
        }
    } else {
        Toastify({
            text: "Debes rellenar el campo de busqueda para encontrar un empleado!",
            className: "info",
            style: {
                background: "red",
            }
        }).showToast();

    }
};



botonPromedio.onclick = () => {
    let promedio = buscarPromedio(empleados)
    if (!isNaN(promedio) && promedio !== 0) {
        mostrarPromedio(promedio)
        console.log(promedio)
    } else {
        Toastify({
            text: "No hay empleados para mostrar un promedio!",
            className: "info",
            style: {
                background: "red",
            }
        }).showToast();
    }

    promedio = 0


};

botonBorrarTodo.onclick = () => {
    localStorage.clear();
    location.reload();
};


botonBorrarPorNombre.onclick = () => {
    let buscador = buscadorInput.value.trim().toLowerCase();
    console.log("termino de busqueda:", buscador)
    let empleadosABorrar = empleados.filter((el) => {
        return el.nombre.toLowerCase().includes(buscador);
    });
    console.log(empleadosABorrar)
    if (empleadosABorrar.length > 0) {
        empleadosABorrar.forEach(empleado => {
            let index = empleados.indexOf(empleado);
            if (index !== -1) {
                empleados.splice(index, 1); // Eliminar el empleado del arreglo
            }
        });

        localStorage.setItem("empleadosCargados", JSON.stringify(empleados));

        Toastify({
            text: "Empleados eliminados correctamente.",
            className: "info",
            style: {
                background: "green",
            }
        }).showToast();

    } else {
        Toastify({
            text: "No hay empleados con ese nombre para borrar!",
            className: "info",
            style: {
                background: "red",
            }
        }).showToast();
    }
}