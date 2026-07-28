document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const yearElement = document.querySelector("#current-year");

  yearElement.textContent = new Date().getFullYear();

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton.classList.remove("active");
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNavigation = navigation.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
      navigation.classList.contains("open") &&
      !clickedInsideNavigation &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    formStatus.textContent = "";

    window.setTimeout(() => {
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      formStatus.textContent =
        "Mensaje registrado correctamente. Esta es una demostración local.";
    }, 700);
  });
});
