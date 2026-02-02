console.log('Side panel loaded!');

const selectedTextDiv = document.getElementById('selectedText');

// Escuchar mensajes con el texto seleccionado
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TEXT_SELECTED') {
    // Actualizar el contenido del panel con el texto seleccionado
    selectedTextDiv.textContent = message.text;
    selectedTextDiv.classList.remove('placeholder');
  }
});