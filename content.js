// Detectar cuando el usuario selecciona texto
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    // Enviar el texto seleccionado al background script
    chrome.runtime.sendMessage({
      type: 'TEXT_SELECTED',
      text: selectedText
    });
  }
});

// También detectar selección con teclado
document.addEventListener('keyup', (e) => {
  // Ctrl+A, Shift+Arrows, etc.
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText.length > 0) {
      chrome.runtime.sendMessage({
        type: 'TEXT_SELECTED',
        text: selectedText
      });
    }
  }
});