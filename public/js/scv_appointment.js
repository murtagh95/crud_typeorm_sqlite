window.onload = async () =>{
    const nav_button = document.getElementById("generate_scv");
    nav_button.addEventListener('click', generate_scv, false)
}

async function generate_scv(){
    try {
        // Consulto los datos para generar el scv
        const response = await fetch('/get-today-appointment');        
        const data = await response.json();

        // Genero el scv
        const anchor = document.createElement("a");
        anchor.href =
            "data:text/csv;charset=utf-8," + data.metadata;
        anchor.target = "_blank";
        anchor.download = "turnos.csv";
        anchor.click();
    } catch (error) {
        alert('Sucedio un error, rezar para que jeova le ayude');
        return null
    }

}