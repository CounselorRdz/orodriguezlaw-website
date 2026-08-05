/* Orlando Rodriguez Law — shared behavior
   1. Mobile menu toggle
   2. Scroll-in reveals (respects reduced motion; page works fully without JS)
   3. Contact form -> opens the visitor's email app with details filled in
*/

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

// --- Mobile menu ---
var toggle = document.querySelector(".nav-toggle");
var mobileNav = document.querySelector(".mobile-nav");
if (toggle && mobileNav) {
  toggle.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// --- Scroll reveals ---
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach(function (el) { io.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

// --- Contact form (static site: composes an email in the visitor's mail app) ---
var form = document.getElementById("case-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };
    var subject = "New case inquiry — " + (get("f-type") || "General");
    var body =
      "Name: " + get("f-name") + "\n" +
      "Email: " + get("f-email") + "\n" +
      "Phone: " + get("f-phone") + "\n" +
      "Case type: " + get("f-type") + "\n\n" +
      "What happened:\n" + get("f-message");
    window.location.href =
      "mailto:info@orodriguezlaw.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
}
