//TODO: object Clicker with array of numbers : each time click on icon, use the next number before displaying popup

import ModalDetectClicks from "./ModalDetectClicks";
import ModalSurvey from "./ModalSurvey";

export function clickCountInit() {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install" || details.reason === "update") {
      chrome.storage.sync.set({"clickIconCount": clickCounts[0], "modalIndex": 0});
    }
  });
}

export function updateClickIconCount() {
  chrome.storage.sync.get("clickIconCount", function (result) {
    chrome.storage.sync.set({"clickIconCount": result.clickIconCount - 1});
  });
}

export function resetClickCount(count) {
  chrome.storage.sync.set({"clickIconCount": count}); //100
}

// Array of click counts for each modal
const clickCounts = [14,25,40,40]//[20, 40, 60, 80, 100];

// Array of modals
const modals = [ModalSurvey, ModalDetectClicks, ModalSurvey, ModalDetectClicks];

// Function to check click count and display modal
export function checkClickCountAndDisplayModal(domain) {
  chrome.storage.sync.get(['clickIconCount', 'modalIndex'], (result) => {
    if (result.clickIconCount <= 0) {
      new modals[result.modalIndex](domain).appendModal();
      let nextIndex = (result.modalIndex + 1) % modals.length;
      resetClickCount(clickCounts[nextIndex]);
      chrome.storage.sync.set({"modalIndex": nextIndex});
      updateClickIconCount();
    }
  });
}



//Mode: loop, keep last modal
