/* script.js — site chrome: contact dialog.
   (The terminal lives in terminal.js. Smooth scrolling is handled in CSS.) */
(function () {
  'use strict';

  /* ---------- Contact dialog (Web3Forms, same endpoint + key as before) ---------- */
  const dialog = document.getElementById('messageDialog');
  const form = document.getElementById('contactForm');
  const success = document.getElementById('msgSuccess');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  let sending = false;

  function setStatus(text, kind) {
    statusEl.textContent = text || '';
    statusEl.className = 'msg-status font-mono text-sm' + (kind ? ' is-' + kind : '');
  }

  function resetDialog() {
    form.hidden = false;
    success.hidden = true;
    setStatus('');
  }

  function openMessage() {
    resetDialog();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function closeMessage() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  document.getElementById('msgClose').addEventListener('click', closeMessage);
  document.getElementById('msgDone').addEventListener('click', closeMessage);
  // Click on the dimmed backdrop closes the dialog
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeMessage();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    sending = true;
    submitBtn.disabled = true;
    setStatus('Sending…', 'info');

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || 'Request failed');
      form.reset();
      form.hidden = true;
      success.hidden = false;
      setStatus('');
      document.getElementById('msgSuccessTitle').focus();
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('Could not send your message. Please try again, or email ' + form.dataset.email + ' directly.', 'error');
    } finally {
      sending = false;
      submitBtn.disabled = false;
    }
  });

  // Exposed for the terminal's `message` command
  window.PortfolioUI = { openMessage: openMessage };
})();
