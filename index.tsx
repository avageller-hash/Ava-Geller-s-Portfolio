
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Suppress ResizeObserver loop completed with undelivered notifications error
// This is a known benign warning in many modern frameworks/libraries
const resizeObserverErr = "ResizeObserver loop completed with undelivered notifications.";
window.addEventListener("error", (e) => {
  if (e.message === resizeObserverErr || e.message === "ResizeObserver loop limit exceeded") {
    const resizeObserverErrDiv = document.getElementById(
      "webpack-dev-server-client-overlay-div"
    );
    const resizeObserverErrAnchor = document.getElementById(
      "webpack-dev-server-client-overlay"
    );
    if (resizeObserverErrDiv) resizeObserverErrDiv.setAttribute("style", "display: none");
    if (resizeObserverErrAnchor) resizeObserverErrAnchor.setAttribute("style", "display: none");
    e.stopImmediatePropagation();
  }
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
