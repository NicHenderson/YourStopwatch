document.addEventListener('DOMContentLoaded', function() {
    let startTime;
    let savedTime = 0; // Nuevo: Guarda el tiempo transcurrido antes de pausar
    let tInterval;
    let running = false;
    const display = document.getElementById('display_time'); // Selecciona el elemento específico por ID

    // Inicia/Pausa el cronómetro
    document.getElementById('start').addEventListener('click', function() {
        if(!running){
            startTime = new Date().getTime() - savedTime; // Ajusta startTime basado en el tiempo previamente guardado
            tInterval = setInterval(getShowTime, 1);
            running = true;
            this.textContent = 'Pause'; // Cambia el texto del botón a "Pausar"
        } else {
            clearInterval(tInterval);
            savedTime = new Date().getTime() - startTime; // Guarda el tiempo transcurrido al pausar
            running = false;
            this.textContent = 'Continue'; // Cambia el texto del botón a "Continuar"
        }
    });

    // Reinicia el cronómetro
    document.getElementById('restart').addEventListener('click', function() {
        clearInterval(tInterval);
        savedTime = 0; // Resetea el tiempo guardado
        running = false;
        display.textContent = '00:00:00';
        document.getElementById('start').textContent = 'Start'; // Asegura que el botón muestre "Iniciar"
    });

    // Función para calcular y mostrar el tiempo
    function getShowTime(){
        let updatedTime = new Date().getTime();
        let difference = updatedTime - startTime;
        // Calcula horas, minutos y segundos
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        // Formatea los números para mostrar dos dígitos
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        display.textContent = hours + ':' + minutes + ':' + seconds;
    }
});