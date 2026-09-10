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


// --- Header phone on small screens (the nav collapses; people in pain hunt for a number) ---
(function () {
  var bar = document.querySelector(".site-header .bar");
  var toggle = bar && bar.querySelector(".nav-toggle");
  if (!bar || !toggle || bar.querySelector(".hdr-phone")) return;
  var a = document.createElement("a");
  a.className = "hdr-phone";
  a.href = "tel:+17132392300";
  a.setAttribute("aria-label", "Call (713) 239-2300");
  a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>';
  bar.insertBefore(a, toggle);
})();
