let mode = 2;
/*
MODES DEFINED
LOWER CASE=0
UPPERCASE=1
RESET=2 (DEFAULT MODE);
*/
document.addEventListener("DOMContentLoaded", function () {
  const lowercaseBtn = document.getElementById("lowercaseBtn");
  const uppercaseBtn = document.getElementById("uppercaseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const status = document.getElementById("status");

  //send for lowercase
  lowercaseBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      mode = 0;
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "convertToLowercase",
        mode,
      });
      updateStatus("Converting to lowercase...");
    });
  });

  //send for uppercase
  uppercaseBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      mode = 1;
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "convertToUppercase",
        mode,
      });
      updateStatus("Converting to UPPERCASE...");
    });
  });

  //send for reset button
  resetBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      mode = 2;
      chrome.tabs.sendMessage(tabs[0].id, { action: "resetText" });
      updateStatus("Resetting to original...");
    });
  });

  // Update status message
  function updateStatus(message) {
    status.textContent = message;
    setTimeout(() => {
      status.innerHTML = `lowKey follow
      <a href="https://x.com/noslopinfinite" target="_blank">@noslopinfinite</a>
      ✨`;
    }, 2000);
  }
});
