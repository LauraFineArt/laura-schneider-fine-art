const nav = document.getElementById("nav");
const hamburger = document.querySelector(".hamburger");

function toggleMenu() {
  const isOpen = nav.classList.toggle("active");

  hamburger.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );
}

function closeMenu() {
  nav.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
}

document.addEventListener(
  "pointerdown",
  function (event) {
    if (!nav.classList.contains("active")) {
      return;
    }

    const clickedInsideNav = nav.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);

    if (
      !clickedInsideNav &&
      !clickedHamburger
    ) {
      closeMenu();
    }
  },
  true
);

nav.addEventListener("click", function (event) {
  if (event.target.closest("a")) {
    closeMenu();
  }
});


/* =============== PAINTINGS =============== */

const paintings = [
  {
    slug: "vortex",
    title: "Vortex",
    image: "images/vortex_2026.jpg",
    size: '20" × 24"',
    medium: "Oil on Canvas",
    year: "2026",
    availability: "Available",
    description:
      "Vortex (2026), an original oil painting by Laura Schneider of a green bowl surrounded by reflections."
  },

  {
    slug: "burning-match",
    title: "Burning Match",
    image: "images/burning_match_2026.jpg",
    size: '20" × 24"',
    medium: "Oil on Canvas",
    year: "2026",
    availability: "Available",
    description:
      "Burning Match (2026), an original oil painting by Laura Schneider depicting a glowing glass ashtray and a lit match."
  },

  {
    slug: "chandelier",
    title: "Chandelier",
    image: "images/chandelier_2026.jpg",
    size: '20" × 24"',
    medium: "Oil on Canvas",
    year: "2026",
    availability: "Available",
    description:
      "Chandelier (2026), an original oil painting by Laura Schneider exploring luminous glass and dramatic light."
  },

  {
    slug: "spellbound",
    title: "Spellbound",
    image: "images/spellbound_2026.jpg",
    size: '16" × 20"',
    medium: "Oil on Canvas",
    year: "2026",
    availability: "Private Collection",
    description:
      "Spellbound (2026), an original oil painting by Laura Schneider featuring crystal, distortion, and mystical light."
  },

  {
    slug: "limes",
    title: "Limes",
    image: "images/limes_2026.jpg",
    size: '12" × 16"',
    medium: "Oil on Canvas",
    year: "2026",
    availability: "Private Collection",
    description:
      "Limes (2026), an original oil painting by Laura Schneider depicting a bowl of fresh limes in luminous glass."
  }
];


/* =============== CURRENT PAINTING =============== */

const urlParameters = new URLSearchParams(window.location.search);

const requestedSlug =
  urlParameters.get("art") || "burning-match";

const currentIndex = paintings.findIndex(function (painting) {
  return painting.slug === requestedSlug;
});

const safeIndex =
  currentIndex === -1 ? 0 : currentIndex;

const currentPainting =
  paintings[safeIndex];

const previousIndex =
  safeIndex === 0
    ? paintings.length - 1
    : safeIndex - 1;

const nextIndex =
  safeIndex === paintings.length - 1
    ? 0
    : safeIndex + 1;

const previousPainting =
  paintings[previousIndex];

const nextPainting =
  paintings[nextIndex];


/* =============== ELEMENTS =============== */

const paintingImage =
  document.getElementById("painting-image");

const paintingTitle =
  document.getElementById("painting-title");

const paintingSize =
  document.getElementById("painting-size");

const paintingMedium =
  document.getElementById("painting-medium");

const paintingYear =
  document.getElementById("painting-year");

const paintingAvailability =
  document.getElementById("painting-availability");

const previousLink =
  document.getElementById("previous-painting");

const nextLink =
  document.getElementById("next-painting");

const inquiryButton =
  document.getElementById("inquiry-button");

const inquiryModal =
  document.getElementById("inquiry-modal");

const closeButton =
  document.getElementById("inquiry-close");

const artworkName =
  document.getElementById("inquiry-artwork");

const artworkField =
  document.getElementById("artwork-field");

const inquiryForm =
  document.getElementById("inquiry-form");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightbox-image");

const lightboxClose =
  document.getElementById("lightbox-close");

const lightboxPrevious =
  document.getElementById("lightbox-prev");

const lightboxNext =
  document.getElementById("lightbox-next");

const metaDescription =
  document.getElementById("meta-description");

const openGraphTitle =
  document.getElementById("og-title");

const openGraphDescription =
  document.getElementById("og-description");

const openGraphImage =
  document.getElementById("og-image");

const openGraphUrl =
  document.getElementById("og-url");

const structuredData =
  document.getElementById("structured-data");


/* =============== PAINTING CONTENT =============== */

paintingImage.classList.remove("is-visible");

paintingImage.addEventListener(
  "load",
  function () {
    requestAnimationFrame(function () {
      paintingImage.classList.add("is-visible");
    });
  },
  { once: true }
);

paintingImage.src = currentPainting.image;

paintingImage.alt =
  currentPainting.title +
  ", " +
  currentPainting.year;

paintingTitle.textContent =
  currentPainting.title;

paintingSize.textContent =
  currentPainting.size;

paintingMedium.textContent =
  currentPainting.medium;

paintingYear.textContent =
  currentPainting.year;

paintingAvailability.textContent =
  currentPainting.availability;


/* =============== PAGE TITLE + META =============== */

document.title =
  currentPainting.title +
  ", " +
  currentPainting.year +
  " | Laura Schneider Fine Art";

metaDescription.setAttribute(
  "content",
  currentPainting.description
);

const fullPaintingTitle =
  currentPainting.title +
  ", " +
  currentPainting.year +
  " | Laura Schneider Fine Art";

openGraphTitle.setAttribute(
  "content",
  fullPaintingTitle
);

openGraphDescription.setAttribute(
  "content",
  currentPainting.description
);

openGraphImage.setAttribute(
  "content",
  new URL(
    currentPainting.image,
    window.location.href
  ).href
);

openGraphUrl.setAttribute(
  "content",
  window.location.href
);


/* =============== STRUCTURED DATA =============== */

structuredData.textContent =
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VisualArtwork",

    name: currentPainting.title,

    creator: {
      "@type": "Person",
      name: "Laura Schneider"
    },

    dateCreated: currentPainting.year,

    artMedium: currentPainting.medium,

    image: new URL(
      currentPainting.image,
      window.location.href
    ).href,

    description:
      currentPainting.description,

    url:
      window.location.href
  });


/* =============== AVAILABILITY =============== */

if (
  currentPainting.availability !== "Available"
) {
  inquiryButton.style.display = "none";
}


/* =============== PREVIOUS / NEXT LINKS =============== */

previousLink.href =
  "painting.html?art=" +
  previousPainting.slug;

nextLink.href =
  "painting.html?art=" +
  nextPainting.slug;


/* =============== MAIN PAINTING SWIPE =============== */

const paintingViewer =
  document.querySelector(".painting-viewer");

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;

paintingViewer.addEventListener(
  "touchstart",
  function (event) {
    touchStartX =
      event.changedTouches[0].screenX;

    touchStartY =
      event.changedTouches[0].screenY;
  },
  { passive: true }
);

paintingViewer.addEventListener(
  "touchend",
  function (event) {
    touchEndX =
      event.changedTouches[0].screenX;

    touchEndY =
      event.changedTouches[0].screenY;

    const horizontalDistance =
      touchEndX - touchStartX;

    const verticalDistance =
      touchEndY - touchStartY;

    const minimumSwipe = 50;

    if (
      Math.abs(horizontalDistance) >
        Math.abs(verticalDistance) &&
      Math.abs(horizontalDistance) >
        minimumSwipe
    ) {
      if (horizontalDistance < 0) {
        window.location.href =
          "painting.html?art=" +
          nextPainting.slug;
      } else {
        window.location.href =
          "painting.html?art=" +
          previousPainting.slug;
      }
    }
  },
  { passive: true }
);


/* =============== INQUIRY MODAL =============== */

inquiryButton.addEventListener(
  "click",
  function () {
    artworkName.textContent =
      currentPainting.title;

    artworkField.value =
      currentPainting.title;

    inquiryModal.classList.add("is-open");

    inquiryModal.setAttribute(
      "aria-hidden",
      "false"
    );
  }
);

closeButton.addEventListener(
  "click",
  function () {
    inquiryModal.classList.remove("is-open");

    inquiryModal.setAttribute(
      "aria-hidden",
      "true"
    );
  }
);

inquiryModal.addEventListener(
  "click",
  function (event) {
    if (event.target === inquiryModal) {
      inquiryModal.classList.remove("is-open");

      inquiryModal.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


/* =============== LIGHTBOX =============== */

let lightboxIndex = safeIndex;
let lightboxZoom = 1;

let lightboxPanX = 0;
let lightboxPanY = 0;

let isDraggingLightbox = false;

let dragStartX = 0;
let dragStartY = 0;

let dragStartPanX = 0;
let dragStartPanY = 0;


function updateLightboxTransform() {
  lightboxImage.style.transform =
    `translate(${lightboxPanX}px, ${lightboxPanY}px) scale(${lightboxZoom})`;
}


function resetLightboxView() {
  lightboxZoom = 1;

  lightboxPanX = 0;
  lightboxPanY = 0;

  isDraggingLightbox = false;

  updateLightboxTransform();

  lightboxImage.style.cursor = "zoom-in";
}


function showLightboxPainting(index) {
  lightboxIndex = index;

  const lightboxPainting =
    paintings[lightboxIndex];

  lightboxImage.src =
    lightboxPainting.image;

  lightboxImage.alt =
    lightboxPainting.title +
    ", " +
    lightboxPainting.year;

  resetLightboxView();
}


function openLightbox() {
  lightboxIndex = safeIndex;

  showLightboxPainting(lightboxIndex);

  lightbox.classList.add("is-open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function closeLightbox() {
  lightbox.classList.remove("is-open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  resetLightboxView();
}


paintingImage.addEventListener(
  "click",
  openLightbox
);


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightboxPrevious.addEventListener(
  "click",
  function () {
    lightboxIndex =
      lightboxIndex === 0
        ? paintings.length - 1
        : lightboxIndex - 1;

    showLightboxPainting(lightboxIndex);
  }
);


lightboxNext.addEventListener(
  "click",
  function () {
    lightboxIndex =
      lightboxIndex ===
      paintings.length - 1
        ? 0
        : lightboxIndex + 1;

    showLightboxPainting(lightboxIndex);
  }
);


lightbox.addEventListener(
  "click",
  function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  }
);


/* =============== LIGHTBOX MOUSE WHEEL ZOOM =============== */

lightbox.addEventListener(
  "wheel",
  function (event) {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (window.innerWidth < 1200) {
      return;
    }

    event.preventDefault();

    if (event.deltaY < 0) {
      lightboxZoom += 0.15;
    } else {
      lightboxZoom -= 0.15;
    }

    lightboxZoom = Math.min(
      Math.max(lightboxZoom, 1),
      4
    );

    if (lightboxZoom === 1) {
      lightboxPanX = 0;
      lightboxPanY = 0;
    }

    updateLightboxTransform();

    lightboxImage.style.cursor =
      lightboxZoom > 1
        ? "grab"
        : "zoom-in";
  },
  { passive: false }
);


/* =============== LIGHTBOX CLICK + DRAG =============== */

lightboxImage.addEventListener(
  "mousedown",
  function (event) {
    if (window.innerWidth < 1200) {
      return;
    }

    if (lightboxZoom <= 1) {
      return;
    }

    event.preventDefault();

    isDraggingLightbox = true;

    dragStartX = event.clientX;
    dragStartY = event.clientY;

    dragStartPanX = lightboxPanX;
    dragStartPanY = lightboxPanY;

    lightboxImage.style.cursor = "grabbing";
  }
);


document.addEventListener(
  "mousemove",
  function (event) {
    if (!isDraggingLightbox) {
      return;
    }

    lightboxPanX =
      dragStartPanX +
      (event.clientX - dragStartX);

    lightboxPanY =
      dragStartPanY +
      (event.clientY - dragStartY);

    updateLightboxTransform();
  }
);


document.addEventListener(
  "mouseup",
  function () {
    if (!isDraggingLightbox) {
      return;
    }

    isDraggingLightbox = false;

    lightboxImage.style.cursor =
      lightboxZoom > 1
        ? "grab"
        : "zoom-in";
  }
);


/* =============== LIGHTBOX SWIPE =============== */

let lightboxTouchStartX = 0;
let lightboxTouchStartY = 0;

let lightboxTouchEndX = 0;
let lightboxTouchEndY = 0;

lightbox.addEventListener(
  "touchstart",
  function (event) {
    lightboxTouchStartX =
      event.changedTouches[0].screenX;

    lightboxTouchStartY =
      event.changedTouches[0].screenY;
  },
  { passive: true }
);


lightbox.addEventListener(
  "touchend",
  function (event) {
    lightboxTouchEndX =
      event.changedTouches[0].screenX;

    lightboxTouchEndY =
      event.changedTouches[0].screenY;

    const horizontalDistance =
      lightboxTouchEndX -
      lightboxTouchStartX;

    const verticalDistance =
      lightboxTouchEndY -
      lightboxTouchStartY;

    const minimumSwipe = 50;

    if (
      Math.abs(horizontalDistance) >
        Math.abs(verticalDistance) &&
      Math.abs(horizontalDistance) >
        minimumSwipe
    ) {
      if (horizontalDistance < 0) {
        lightboxIndex =
          lightboxIndex ===
          paintings.length - 1
            ? 0
            : lightboxIndex + 1;
      } else {
        lightboxIndex =
          lightboxIndex === 0
            ? paintings.length - 1
            : lightboxIndex - 1;
      }

      showLightboxPainting(
        lightboxIndex
      );
    }
  },
  { passive: true }
);

/* =============== INQUIRY FORM =============== */

inquiryForm.addEventListener(
  "submit",
  async function (event) {
    event.preventDefault();

    const formData =
      new FormData(inquiryForm);

    try {
      const response =
        await fetch(
          inquiryForm.action,
          {
            method: inquiryForm.method,
            body: formData,
            headers: {
              Accept: "application/json"
            }
          }
        );

      if (response.ok) {
        window.location.href =
          "thank-you.html";
      } else {
        alert(
          "Sorry, your inquiry could not be sent. Please try again."
        );
      }
    } catch (error) {
      alert(
        "Sorry, your inquiry could not be sent. Please check your connection and try again."
      );
    }
  }
);


/* =============== KEYBOARD CONTROLS =============== */

document.addEventListener(
  "keydown",
  function (event) {
    if (
      lightbox.classList.contains("is-open")
    ) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        lightboxIndex =
          lightboxIndex === 0
            ? paintings.length - 1
            : lightboxIndex - 1;

        showLightboxPainting(
          lightboxIndex
        );
      }

      if (event.key === "ArrowRight") {
        lightboxIndex =
          lightboxIndex ===
          paintings.length - 1
            ? 0
            : lightboxIndex + 1;

        showLightboxPainting(
          lightboxIndex
        );
      }
    }

    if (
      event.key === "Escape" &&
      inquiryModal.classList.contains("is-open")
    ) {
      inquiryModal.classList.remove("is-open");

      inquiryModal.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);