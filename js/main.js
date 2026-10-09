
// 2. Manejo visual del formulario de contacto
const formulario = document.getElementById('form-contacto');


formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de inmediato
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    formulario.reset(); // Limpia los campos del formulario
});