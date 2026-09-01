const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

const navAnchors = document.querySelectorAll(
  '.desktop-nav a, .mobile-menu-inner a[href^="#"]',
);
const spySections = Array.from(navAnchors)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActiveNavLink = (id) => {
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + id);
  });
};

if (spySections.length) {
  const navSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNavLink(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );
  spySections.forEach((section) => navSpyObserver.observe(section));
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}

function scrollToBooking() {
  const bookingSection = document.getElementById("reservation");
  if (!bookingSection) return;
  bookingSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const navBooking = document.getElementById("navBooking");

if (navBooking) {
  navBooking.addEventListener("click", scrollToBooking);
}

const mobileBooking = document.getElementById("mobileBooking");

if (mobileBooking) {
  mobileBooking.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    setTimeout(() => {
      scrollToBooking();
    }, 200);
  });
}

document.querySelectorAll("[data-booking]").forEach((button) => {
  button.addEventListener("click", scrollToBooking);
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const revealImages = document.querySelectorAll(".reveal-image");

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealImages.forEach((image) => {
  imageObserver.observe(image);
});

const filterButtons = document.querySelectorAll(".filter");

const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    const selectedFilter = button.dataset.filter;
    foodCards.forEach((card) => {
      const categories = card.dataset.category.toLowerCase().split(/\s+/);
      const shouldShow =
        selectedFilter === "all" || categories.includes(selectedFilter);
      if (shouldShow) {
        card.classList.remove("hidden");
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "menuCardIn .55s cubic-bezier(.16,1,.3,1)";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const menuAnimationStyle = document.createElement("style");

menuAnimationStyle.textContent = `

@keyframes menuCardIn {
    from {
        opacity: 0;
        transform:
            translateY(20px)
            scale(.97);
    }
    to {
        opacity: 1;
        transform:
            translateY(0)
            scale(1);
    }
}

`;

document.head.appendChild(menuAnimationStyle);

const bookingForm = document.getElementById("bookingForm");

const bookingSuccess = document.getElementById("bookingSuccess");

const newBooking = document.getElementById("newBooking");

if (bookingForm && bookingSuccess) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = bookingForm.querySelector(".booking-submit");
    const originalText = submitButton.querySelector("span").textContent;
    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "CHECKING AVAILABILITY...";
    setTimeout(() => {
      bookingForm.style.display = "none";
      bookingSuccess.classList.add("active");
      submitButton.disabled = false;
      submitButton.querySelector("span").textContent = originalText;
    }, 1000);
  });
}

if (newBooking && bookingForm) {
  newBooking.addEventListener("click", () => {
    bookingSuccess.classList.remove("active");
    bookingForm.style.display = "block";
    bookingForm.reset();
  });
}

const dateInput = document.getElementById("date");

if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
}

const hero = document.querySelector(".hero");

const heroPhotos = document.querySelectorAll(".hero-photo");

if (
  hero &&
  heroPhotos.length > 0 &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches
) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroPhotos.forEach((photo, index) => {
      const strength = index === 0 ? 12 : -10;
      photo.style.translate = `${x * strength}px ${y * strength}px`;
    });
  });
  hero.addEventListener("mouseleave", () => {
    heroPhotos.forEach((photo) => {
      photo.style.translate = "0 0";
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
