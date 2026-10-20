(function () {
  // Scroll reveal via IntersectionObserver (sem listener de scroll)
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Modal de interesse
  var modal = document.getElementById("modal");
  var stepForm = document.getElementById("step-form");
  var stepDone = document.getElementById("step-done");
  var form = document.getElementById("form");
  var email = document.getElementById("email");
  var error = document.getElementById("form-error");
  var lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    stepForm.hidden = false;
    stepDone.hidden = true;
    error.hidden = true;
    email.removeAttribute("aria-invalid");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    email.focus();
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".js-cta").forEach(function (b) { b.addEventListener("click", open); });
  document.querySelectorAll(".js-close").forEach(function (b) { b.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) close(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!ok) {
      error.hidden = false;
      email.setAttribute("aria-invalid", "true");
      email.focus();
      return;
    }
    // Sem backend ainda: guarda localmente só para a brincadeira funcionar.
    try { localStorage.setItem("escola-do-fogo-email", email.value.trim()); } catch (_) {}
    stepForm.hidden = true;
    stepDone.hidden = false;
  });
})();
