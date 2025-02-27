import {appendModalContainer} from "./modals/appendModalContainer";
import ModalUpdate from "./modals/ModalUpdate";


export async function uiEnhancer(domain) {
  window.addEventListener('load', async function () {
    // Create modal container
    await appendModalContainer();

    // Create "last update" modal if needed
    chrome.storage.sync.get(['displayModalUpdate'], async function (result) {
      if (result.displayModalUpdate)
        await new ModalUpdate(domain).appendModal()
    });
  });
}
