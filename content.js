let originalTexts = new Map();
let globalObserver;
let mode = 2;

// Initialize when page loads
initialize();

function initialize() {
  console.log("Initialized lowKey");
  // Store original text content
  storeOriginalTexts();
  setupAutoMode();
}

// Function to convert ALL text
function convertAllText(text, mode) {
  if (mode == 0) {
    return text.toLowerCase();
  }
  if (mode == 1) {
    return text.toUpperCase();
  }
  return text;
}

// Function to get all text nodes in an element
function getTextNodes(element) {
  let textNodes = [];
  let walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      if (
        node.parentElement.tagName === "SCRIPT" ||
        node.parentElement.tagName === "STYLE" ||
        node.parentElement.tagName === "NOSCRIPT"
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim()) {
      textNodes.push(node);
    }
  }

  return textNodes;
}

// Store original text content
function storeOriginalTexts() {
  const textNodes = getTextNodes(document.body);

  textNodes.forEach((node, index) => {
    if (!originalTexts.has(node)) {
      originalTexts.set(node, node.textContent);
    }
  });
}

// Convert all text to lowercase
function convertToLowercase() {
  const textNodes = getTextNodes(document.body);

  textNodes.forEach((node) => {
    // Store original if not already stored
    if (!originalTexts.has(node)) {
      originalTexts.set(node, node.textContent);
    }

    // Convert ALL text to lowercase
    const convertedText = convertAllText(node.textContent, mode);
    if (convertedText !== node.textContent) {
      node.textContent = convertedText;
    }
  });
}


function convertToUppercase() {
  const textNodes = getTextNodes(document.body);

  textNodes.forEach((node) => {
    if (!originalTexts.has(node)) {
      originalTexts.set(node, node.textContent);
    }

    const convertedText = convertAllText(node.textContent, mode);
    if (convertedText !== node.textContent) {
      node.textContent = convertedText;
    }
  });
}


function resetText() {
  originalTexts.forEach((originalText, node) => {
    if (node.parentNode) {
      node.textContent = originalText;
    }
  });
  if (globalObserver) {
    globalObserver.disconnect();
  }
}


function setupAutoMode() {
  if (globalObserver) {
    //kill existing observer free up some memory
    globalObserver.disconnect();
  }
  globalObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Store original texts for new content
            const newTextNodes = getTextNodes(node);
            newTextNodes.forEach((textNode) => {
              if (!originalTexts.has(textNode)) {
                originalTexts.set(textNode, textNode.textContent);
              }
              const convertedText = convertAllText(textNode.textContent, mode);
              if (convertedText !== textNode.textContent) {
                textNode.textContent = convertedText;
              }
            });
          }
        });
      }
    });
  });

  globalObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "convertToLowercase":
      mode = request.mode;
      convertToLowercase();
      sendResponse({ success: true });
      break;

    case "convertToUppercase":
      mode = request.mode;
      convertToUppercase();
      sendResponse({ success: true });
      break;

    case "resetText":
      resetText();
      sendResponse({ success: true });
      break;
  }

  return true;
});
