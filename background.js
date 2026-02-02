// Controla la apertura/cierre del side panel al hacer clic en el icono
let isPanelOpen = false;

chrome.action.onClicked.addListener(async (tab) => {
  if (!isPanelOpen) {
    // Abrir el panel
    await chrome.sidePanel.open({ windowId: tab.windowId });
    isPanelOpen = true;
  } else {
    // Cerrar el panel (solo en Chrome 116+)
    // En versiones anteriores, el usuario debe cerrar manualmente
    try {
      await chrome.sidePanel.setOptions({
        enabled: false,
        windowId: tab.windowId
      });
      await chrome.sidePanel.setOptions({
        enabled: true,
        windowId: tab.windowId
      });
      isPanelOpen = false;
    } catch (e) {
      console.log('Panel toggle not supported, user must close manually');
    }
  }
});