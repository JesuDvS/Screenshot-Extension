// Detectar cuando el usuario selecciona texto
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    // Guardar en storage para que el side panel lo lea
    chrome.storage.local.set({ selectedText: selectedText });
    console.log('Texto seleccionado:', selectedText);
  }
});

// También detectar selección con teclado
document.addEventListener('keyup', (e) => {
  // Ctrl+A, Shift+Arrows, etc.
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText.length > 0) {
      chrome.storage.local.set({ selectedText: selectedText });
      console.log('Texto seleccionado:', selectedText);
    }
  }
});