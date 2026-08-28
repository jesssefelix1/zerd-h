(function () {
  var WHATSAPP_NUMBER = "2349066600444";
  var whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER;
  var whatsappMessage = "Hey ZERD, I'd like to start a build.";

  document.querySelectorAll("#wa-hero-link, #wa-contact-link").forEach(function (el) {
    el.href = whatsappUrl + "?text=" + encodeURIComponent(whatsappMessage);
  });

  // Footer year
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = "EST. " + new Date().getFullYear();

  // Build sheet ticket
  var form = document.getElementById("build-form");
  var ticketLink = document.getElementById("wa-ticket-link");
  ticketLink.href = whatsappUrl;

  var orderNo = null;

  function pad(n, len) {
    n = String(n);
    while (n.length < len) n = "0" + n;
    return n;
  }

  function generateOrderNo() {
    return pad(Math.floor(Math.random() * 900) + 100, 4);
  }

  function updateTicket(data) {
    document.getElementById("t-make").textContent = data.make || "—";
    document.getElementById("t-model").textContent = data.model || "—";
    document.getElementById("t-year").textContent = data.year || "—";
    document.getElementById("t-garment").textContent = data.garment || "TEE";
    document.getElementById("t-notes").textContent = data.notes || "—";
    document.getElementById("t-orderno").textContent = "NO. " + orderNo;
    document.getElementById("t-status").textContent = "READY — ATTACH PHOTO ON WHATSAPP";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var make = document.getElementById("f-make").value.trim();
    var model = document.getElementById("f-model").value.trim();
    var year = document.getElementById("f-year").value.trim();
    var garment = document.getElementById("f-garment").value;
    var notes = document.getElementById("f-notes").value.trim();

    if (!make || !model || !year) {
      document.getElementById("t-status").textContent = "MAKE, MODEL & YEAR REQUIRED";
      return;
    }

    orderNo = generateOrderNo();
    updateTicket({ make: make, model: model, year: year, garment: garment, notes: notes });

    var msg =
      "Hey ZERD, starting a build — " +
      "Order No. " + orderNo + ". " +
      year + " " + make + " " + model + ", " + garment + "." +
      (notes ? " Notes: " + notes + "." : "") +
      " Photo attached.";

    ticketLink.href = whatsappUrl + "?text=" + encodeURIComponent(msg);
    ticketLink.setAttribute("data-prefill", msg);

    var ticket = document.getElementById("ticket");
    ticket.style.transform = "scale(1.015)";
    setTimeout(function () {
      ticket.style.transform = "scale(1)";
    }, 160);
  });
})();
