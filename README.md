# lowKey Chrome Extension
lowKey is a simple and effective Chrome extension that allows you to instantly convert all visible text on any website to lowercase, UPPERCASE, or reset it back to the original. Perfect for designers, developers, or anyone who wants to quickly preview text transformations on the fly.

## Features

- Convert all visible text on a webpage to **lowercase**
- Convert all visible text on a webpage to **UPPERCASE**
- **Reset** the text to its original state
- Works on any website
- Simple, clean popup UI

## Installation
1. **Clone or Download** this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the project folder (`upperbot`).
5. The "lowKey" extension icon should now appear in your Chrome toolbar.

## Usage
1. Navigate to any website.
2. Click the lowKey extension icon in your Chrome toolbar.
3. In the popup, choose:
   - **Convert to lowercase**: Changes all visible text to lowercase.
   - **Convert to UPPERCASE**: Changes all visible text to uppercase.
   - **Reset to Original**: Restores the original text.
4. The status message will update to confirm the action.

> **Tip:** The extension works dynamically, so even text added after the initial conversion (e.g., via AJAX) will be transformed automatically.

## Development
### File Structure

- `manifest.json` — Chrome extension manifest (v3), defines permissions, scripts, and UI.
- `content.js` — Content script that manipulates text nodes on the page, handles conversion and reset logic, and listens for messages from the popup.
- `popup.html` — The extension's popup UI, styled with embedded CSS.
- `popup.js` — Handles user interactions in the popup and sends commands to the content script.
- `icon_16.png`, `icon_48.png`, `icon_128.png` — Extension icons.

### How it Works

- When you click a button in the popup, a message is sent to the content script in the active tab.
- The content script finds all text nodes in the page (excluding scripts, styles, etc.) and converts their content according to the selected mode.
- The original text is stored in memory, so you can always reset to the original state.
- A MutationObserver ensures that dynamically added content is also transformed.

## Permissions
- `activeTab`: Allows the extension to access the currently active tab to modify its content.
- `storage`: (Reserved for future use or settings persistence.)

## Credits
- Created by [@noslopinfinite](https://x.com/noslopinfinite)
---

**lowKey** — Instantly preview lowercase or UPPERCASE text on any website!
