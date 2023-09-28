import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const observeDOMChanges = (callback) => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        callback();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const InstructionBlockWrapper = () => {
  return (
    <>
      <InstructionBlock type="yarn" />
      <InstructionBlock type="bun" />
      <InstructionBlock type="pnpm" />
    </>
  );
};

const getInstallationInstruction = (type, libraryName) => {
  let instruction = "";
  const isTypePackage = libraryName.startsWith("@types/");

  if (type === "yarn") {
    instruction = `yarn add ${libraryName}${isTypePackage ? " --dev" : ""}`;
  } else if (type === "npm") {
    instruction = `npm install ${libraryName}${isTypePackage ? " --save-dev" : ""}`;
  } else if (type === "pnpm") {
    instruction = `pnpm add ${libraryName}${isTypePackage ? " --save-dev" : ""}`;
  } else if (type === "bun") {
    instruction = `bun i ${libraryName}${isTypePackage ? " --save-dev" : ""}`;
  }

  return instruction.trim();
};

const getLibraryName = () => {
  const targetClass = "d767adf4";
  const targetParagraph = document.querySelector(`p.${targetClass}`);
  const libraryName = targetParagraph.textContent.split("npm i")[1];
  return libraryName.trim();
};
export const InstructionBlock = ({ type }) => {
  const [libraryName, setLibraryName] = useState(() => {
    getLibraryName();
  });

  useEffect(() => {
    const _libraryName = getLibraryName();
    observeDOMChanges(() => setLibraryName(_libraryName));
  }, []);

  if (!libraryName) {
    return null;
  }

  const installationInstruction = getInstallationInstruction(type, libraryName);
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installationInstruction);
      // You can provide user feedback that the text has been copied if needed
      // alert("Text copied to clipboard: " + installationInstruction);
    } catch (error) {
      console.error("Failed to copy text to clipboard: " + error.message);
    }
  };

  return (
    <p className="d767adf4 lh-copy truncate ph0 mb3 black-80 b5be2af6 f6 flex flex-row">
      <svg viewBox="0 0 12.32 9.33">
        <g>
          <line className="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line>
          <rect width="1.9" height="1.9"></rect>
          <rect x="1.9" y="1.9" width="1.9" height="1.9"></rect>
          <rect x="3.7" y="3.7" width="1.9" height="1.9"></rect>
          <rect x="1.9" y="5.6" width="1.9" height="1.9"></rect>
          <rect y="7.5" width="1.9" height="1.9"></rect>
        </g>
      </svg>
      <code className="flex-auto truncate db" title="Copy Command to Clipboard">
        <button
          className="ctx-instruction-button"
          aria-label="Copy install command to clipboard"
          onClick={handleCopyToClipboard}
        >
          {installationInstruction}
        </button>
      </code>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="copy"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
      </svg>
    </p>
  );
};

// Function to get the original onclick function from the first button
const getOriginalOnclickFunction = () => {
  const targetButton = document.querySelector(
    'button[aria-label^="Copy install command to clipboard"]:not([aria-label*=" yarn "]):not([aria-label*=" bun "]):not([aria-label*=" pnpm "])'
  );

  return targetButton ? targetButton.onclick : null;
};

// const root = document.createElement("div");
// root.id = "crx-root";
// document.body.appendChild(root);

const root = document.createElement("div");
// Find the <p> element with the specified class
const targetClass = "d767adf4";
const targetParagraph = document.querySelector(`p.${targetClass}`);

if (targetParagraph) {
  // Insert your element after the target <p> element
  targetParagraph.insertAdjacentElement("afterend", root);
}

ReactDOM.createRoot(root).render(<InstructionBlockWrapper />);
