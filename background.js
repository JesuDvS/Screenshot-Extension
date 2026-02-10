// Background service worker para la extensión de captura de pantalla

// Listener para cuando se instala la extensión
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensión de captura de pantalla instalada');
});

// Listener para mensajes desde el popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'capture') {
    // Esta funcionalidad se maneja directamente desde el popup
    sendResponse({ success: true });
  }
  return true;
});