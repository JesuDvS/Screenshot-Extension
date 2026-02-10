const captureBtn = document.getElementById('captureBtn');
const filenameInput = document.getElementById('filename');
const logContainer = document.getElementById('logContainer');

// Función para agregar mensajes al log
function addLog(message, type = 'info') {
  const time = new Date().toLocaleTimeString('en-US', { 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const logEntry = document.createElement('div');
  logEntry.className = `log-entry log-${type}`;
  logEntry.innerHTML = `<span class="log-time">${time}:</span> ${message}`;
  
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Cargar el último nombre usado
chrome.storage.local.get(['lastFilename'], (result) => {
  if (result.lastFilename) {
    filenameInput.value = result.lastFilename;
  }
});

// Guardar el nombre cuando cambie
filenameInput.addEventListener('input', () => {
  chrome.storage.local.set({ lastFilename: filenameInput.value });
});

// Capturar pantalla al hacer clic
// Capturar pantalla al hacer clic
captureBtn.addEventListener('click', async () => {
  try {
    const filename = filenameInput.value.trim() || 'captura';
    
    addLog('Iniciando proceso de captura...');
    
    // Obtener la pestaña activa
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      addLog('No se pudo encontrar la pestaña activa', 'error');
      return;
    }
    
    const windowCount = await chrome.windows.getAll();
    addLog(`Pestaña activa encontrada: ${windowCount.length}`);
    
    // Capturar la pestaña visible
    addLog('Capturando pantalla...');
    const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: 'png'
    });
    
    addLog('Captura realizada correctamente', 'success');
    
    // Preparar descarga
    addLog('Preparando descarga...');
    
    // Crear timestamp con fecha y hora
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timestamp = `${year}-${month}-${day}-${hours}h${minutes}m${seconds}s`;
    const finalFilename = `${filename}-${timestamp}.png`;
    
    // Descargar la imagen
    const downloadId = await chrome.downloads.download({
      url: dataUrl,
      filename: finalFilename,
      saveAs: false
    });
    
    addLog(`¡Captura guardada: ${finalFilename}!`, 'success');
    
  } catch (error) {
    console.error('Error al capturar:', error);
    addLog(`Error: ${error.message}`, 'error');
  }
});

// Limpiar log inicial después de un momento
setTimeout(() => {
  logContainer.innerHTML = '';
  addLog('Listo para capturar');
}, 500);