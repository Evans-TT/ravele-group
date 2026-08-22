const products = [
  {
    title: "Green Bananas",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/green-bananas-harvest.jpg",
    description: "Freshly harvested green bananas suited for wholesale, market supply, and food service buyers."
  },
  {
    title: "Packed Bananas",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/bananas-crates.jpg",
    description: "Crate-packed bananas prepared for handling, distribution, and structured produce channels."
  },
  {
    title: "Banana Field",
    type: "Field Crops",
    category: "field",
    image: "assets/images/banana-field.jpg",
    description: "Young banana plants cultivated in rich red soil with attention to crop establishment."
  },
  {
    title: "Avocados",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/avocados-on-tree.jpg",
    description: "Tree-grown avocados, including sought-after commercial varieties such as Maluma Hass."
  },
  {
    title: "Harvested Avocados",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/avocado-crate.jpg",
    description: "Harvested avocados gathered for sorting, handling, and buyer-ready produce supply."
  },
  {
    title: "Avocado Orchard",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/avocados-hanging.jpg",
    description: "Healthy avocado fruit developing on the tree, supported by attentive orchard management."
  },
  {
    title: "Premium Avocados",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/avocados-hand.jpg",
    description: "Hand-selected avocados that show the farm's focus on size, texture, and market value."
  },
  {
    title: "Bagged Avocados",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/bagged-avocados.jpg",
    description: "Produce staged for collection and distribution through reliable buyer relationships."
  },
  {
    title: "Fresh Chillies",
    type: "Vegetables",
    category: "vegetable",
    image: "assets/images/chillies-on-plant.jpg",
    description: "Bright red and green chillies grown for fresh markets, kitchens, and processing buyers."
  },
  {
    title: "Crated Chillies",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/red-chillies-crate.jpg",
    description: "Red chillies packed in bulk for buyers that need volume and consistent supply."
  },
  {
    title: "Cabbage",
    type: "Vegetables",
    category: "vegetable",
    image: "assets/images/cabbage-head.jpg",
    description: "Leafy cabbage grown for local markets, community demand, and fresh vegetable channels."
  },
  {
    title: "Macadamia Kernels",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/macadamia-kernels.jpg",
    description: "Prepared macadamia kernels representing value-added opportunity within produce supply."
  },
  {
    title: "Litchis",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/litchis-crate.jpg",
    description: "Seasonal litchis harvested in quantity for buyers seeking premium fruit with vivid color."
  },
  {
    title: "Litchi Branches",
    type: "Fruit",
    category: "fruit",
    image: "assets/images/litchis-branches.jpg",
    description: "Litchis shown close to harvest, highlighting the farm's fresh fruit potential."
  },
  {
    title: "Litchi Harvest",
    type: "Market Ready",
    category: "processed",
    image: "assets/images/litchis-ground.jpg",
    description: "Freshly collected litchis ready for sorting, packing, and distribution planning."
  },
  {
    title: "Maize",
    type: "Field Crops",
    category: "field",
    image: "assets/images/maize-crop.jpg",
    description: "Green maize grown as part of a broader farming mix and seasonal crop strategy."
  }
];

const body = document.body;
const splash = document.querySelector("[data-splash]");
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const progress = document.querySelector(".scroll-progress");
const grid = document.querySelector("[data-produce-grid]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxType = document.querySelector("[data-lightbox-type]");
const lightboxDescription = document.querySelector("[data-lightbox-description]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const contactForm = document.querySelector("[data-contact-form]");
const womensModal = document.querySelector("[data-womens-modal]");
const womensCloseButtons = [...document.querySelectorAll("[data-womens-close]")];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hideSplash() {
  window.setTimeout(() => {
    splash?.classList.add("is-hidden");
  }, reduceMotion ? 120 : 950);
}

function updateScrollState() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle("is-scrolled", scrollTop > 24);
  document.documentElement.style.setProperty("--hero-y", `${Math.min(scrollTop * 0.18, 80)}px`);
}

function renderProducts(items) {
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item, index) => `
        <article class="produce-card reveal" data-category="${item.category}" style="--delay:${index * 24}ms">
          <div class="produce-card__image">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <span class="produce-card__tag">${item.type}</span>
          </div>
          <div class="produce-card__body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button type="button" data-product-index="${index}">View Produce</button>
          </div>
        </article>
      `
    )
    .join("");

  observeReveals();
  setupCardTilt();
}

function setFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  document.querySelectorAll(".produce-card").forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !visible);
  });
}

function openLightbox(index) {
  if (!lightbox) return;

  const item = products[index];
  if (!item) return;

  lightboxImage.src = item.image;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxType.textContent = item.type;
  lightboxDescription.textContent = item.description;
  lightbox.hidden = false;
  body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  body.classList.remove("lightbox-open");
  lightboxImage.src = "";
}

function observeReveals() {
  const reveals = [...document.querySelectorAll(".reveal:not([data-observed])")];
  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.style.getPropertyValue("--delay") || "0ms";
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
  );

  reveals.forEach((el) => {
    el.dataset.observed = "true";
    observer.observe(el);
  });
}

function animateCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (!counters.length) return;

  const runCounter = (counter) => {
    const target = Number(counter.dataset.count);
    const duration = reduceMotion ? 1 : 1200;
    const start = performance.now();

    const tick = (now) => {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      counter.textContent = Math.round(target * eased);
      if (progressValue < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupCardTilt() {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".produce-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const topic = formData.get("topic");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Website enquiry: ${topic}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    );

    window.location.href = `mailto:ravelefarming@yahoo.com?subject=${subject}&body=${bodyText}`;
  });
}

function openWomensModal() {
  if (!womensModal) return;
  womensModal.hidden = false;
  body.classList.add("promo-open");
  womensModal.querySelector(".promo-modal__close")?.focus();
}

function closeWomensModal() {
  if (!womensModal) return;
  womensModal.hidden = true;
  body.classList.remove("promo-open");
}

function setupWomensModal() {
  if (!womensModal) return;
  const womensMonthEnd = new Date("2026-09-01T00:00:00+02:00").getTime();
  if (Date.now() >= womensMonthEnd) return;
  womensCloseButtons.forEach((button) => button.addEventListener("click", closeWomensModal));
  window.setTimeout(openWomensModal, reduceMotion ? 250 : 1250);
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = !body.classList.contains("nav-open");
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
}

if (nav) {
  nav.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

if (grid) {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-index]");
    if (!button) return;
    openLightbox(Number(button.dataset.productIndex));
  });
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (lightbox && !lightbox.hidden) closeLightbox();
    if (womensModal && !womensModal.hidden) closeWomensModal();
  }
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("load", hideSplash);

renderProducts(products);
observeReveals();
animateCounters();
setupActiveNav();
setupContactForm();
setupWomensModal();
updateScrollState();
