console.log('Side panel loaded!');

const selectedTextDiv = document.getElementById('selectedText');

// Escuchar cambios en el storage
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.selectedText) {
    const newText = changes.selectedText.newValue;
    console.log('Nuevo texto recibido:', newText);
    selectedTextDiv.textContent = newText;
    selectedTextDiv.classList.remove('placeholder');
  }
});

// Cargar el último texto seleccionado al abrir el panel
chrome.storage.local.get(['selectedText'], (result) => {
  if (result.selectedText) {
    selectedTextDiv.textContent = result.selectedText;
    selectedTextDiv.classList.remove('placeholder');
  }
});