// ====== Navbar Toggle ======
function toggleMenu() {
  const links = document.getElementById("navLinks");
  const right = document.getElementById("navRight");
  const hamburger = document.querySelector(".hamburger");

  links.classList.toggle("active");
  right.classList.toggle("hide");
  hamburger.classList.toggle("active");
}

// ====== Login/Logout Display ======
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const user = localStorage.getItem("user");

  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});

// ====== Logout ======
function logout() {
  localStorage.removeItem("user");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

// ====== Scroll To Top Button ======
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.opacity = "1";
    btn.style.visibility = "visible";
  } else {
    btn.style.opacity = "0";
    btn.style.visibility = "hidden";
  }
};

document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== Typed Text ======
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: ["Direct to the Farm", "Eco-Friendly Products", "Sustainable Future"],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    smartBackspace: true
  });
});

// ====== GSAP Animations ======
gsap.registerPlugin(ScrollTrigger);

gsap.from(".badge", {
  x: -150,
  rotation: 360,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".badge",
    start: "top 80%",
    toggleActions: "restart none none reset",
    markers: false
  }
});

gsap.to(".our-team-cards > div", {
  y: -10,
  duration: 2.5,
  ease: "easeInOut",
  yoyo: true,
  repeat: -1,
  stagger: {
    each: 0.4,
    yoyo: true,
    repeat: -1
  }
});

// ===== carousel section =====
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const dotsNav = document.querySelector('.dots');
const dots = Array.from(dotsNav.children);
let currentIndex = 0;

function updateSlidePosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

dotsNav.addEventListener('click', (e) => {
  if (!e.target.classList.contains('dot')) return;
  currentIndex = dots.findIndex(dot => dot === e.target);
  updateSlidePosition();
});

setInterval(() => {
  if (document.hasFocus()) {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }
}, 4000);

// Swipe support
const carousel = document.getElementById('carousel');
let startX = 0;
let isSwiping = false;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const moveX = e.touches[0].clientX;
  const diffX = moveX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0) {
      nextButton.click();
    } else {
      prevButton.click();
    }
    isSwiping = false;
  }
});

carousel.addEventListener('touchend', () => {
  isSwiping = false;
});

window.addEventListener('resize', updateSlidePosition);


// ====== Feedback Question Marks Floating Effect ======
function createQuestionMark() {
  const question = document.createElement("div");
  question.classList.add("question");
  question.textContent = "?";
  question.style.left = `${Math.random() * 100}%`;
  question.style.fontSize = `${Math.random() * 1 + 1}em`;
  question.style.animationDuration = `${4 + Math.random() * 3}s`;
  feedbackSection.appendChild(question);

  setTimeout(() => {
    feedbackSection.removeChild(question);
  }, 7000);
}
setInterval(createQuestionMark, 400);

// ====== Feedback Modal ======
function openModal() {
  document.getElementById("feedbackModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("feedbackModal").style.display = "none";
}

// ====== Feedback Form Submit ======
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const rating = parseInt(form.rating.value);
    const message = form.message.value;
    const product = form.product.value;
    const experience = form.experience.value;
    const support = form.support.value;
    const unresolved = form.unresolved.value;
    const subscribe = form.subscribe.checked;

    try {
      const res = await fetch("https://ecopuls-backend.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          rating,
          message,
          product,
          experience,
          support,
          unresolved,
          subscribe
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Feedback submitted successfully!");
        form.reset();
        closeModal();
      } else {
        alert("❌ Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
});

// ====== Custom Product Modal ======
function openCustomModal() {
  document.getElementById("customModal").style.display = "flex";
}
function closeCustomModal() {
  document.getElementById("customModal").style.display = "none";
}

// ====== Custom Product Form Submit ======
document.addEventListener("DOMContentLoaded", () => {
  const customForm = document.getElementById("customProductForm");
  if (!customForm) return;

  customForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = customForm.name.value;
    const contact = customForm.contact.value;
    const size = customForm.size.value;
    const quantity = customForm.quantity.value;
    const details = customForm.details.value;

    try {
      const res = await fetch("https://ecopuls-backend.onrender.com/api/custom-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          size,
          quantity,
          details
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Your custom order has been submitted!");
        customForm.reset();
        closeCustomModal();
      } else {
        alert("❌ Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
});
