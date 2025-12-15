// Inicializar EmailJS - TUS CLAVES REALES
emailjs.init("KHZ2n86tWOT7UkdHR"); // ← TU PUBLIC KEY


// Año en footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// Navbar: scroll suave y link activo
const navLinks = document.querySelectorAll(".nav-links a");


navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const yOffset = -70;
        const y =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      closeMobileNav();
    }
  });
});


// Actualizar link activo según scroll
const sections = document.querySelectorAll("section[id]");
function updateActiveLink() {
  const scrollPos = window.scrollY + 90;
  let currentId = "";
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentId = section.id;
    }
  });


  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// Menú móvil
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-links");


function closeMobileNav() {
  if (navToggle && navList) {
    navToggle.classList.remove("open");
    navList.classList.remove("open");
  }
}


if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navList.classList.toggle("open");
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNav();
    }
  });
}


// Animación de aparición por IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );


  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}


// EmailJS Formulario REAL - TUS CLAVES
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");


contactForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";
  formMessage.className = "form-message";
  formMessage.style.display = "none";


  try {
    const templateParams = {
      from_name: document.getElementById("nombre").value,
      from_email: document.getElementById("correo").value,
      message: document.getElementById("mensaje").value
    };


    await emailjs.send("service_abc123def456", "template_mlgmdk5", templateParams, "KHZ2n86tWOT7UkdHR");
    
    formMessage.textContent = "✅ Mensaje enviado correctamente. Te responderé pronto.";
    formMessage.className = "form-message success";
    formMessage.style.display = "block";
    
    contactForm.reset();
  } catch (error) {
    console.error("Error:", error);
    formMessage.textContent = "❌ Error al enviar. Inténtalo de nuevo o escíbeme directamente.";
    formMessage.className = "form-message error";
    formMessage.style.display = "block";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar mensaje";
  }
});


// Carga dinámica de proyectos desde data.json
async function cargarProyectos() {
  try {
    const respuesta = await fetch("data.json");
    const data = await respuesta.json();


    const gridProfesionales = document.getElementById(
      "proyectos-profesionales-grid"
    );
    const gridPersonales = document.getElementById(
      "proyectos-personales-grid"
    );


    if (gridProfesionales && Array.isArray(data.proyectos_profesionales)) {
      data.proyectos_profesionales.forEach((proyecto) => {
        const card = crearCardProyecto(proyecto);
        gridProfesionales.appendChild(card);
      });
    }


    if (gridPersonales && Array.isArray(data.proyectos_personales)) {
      data.proyectos_personales.forEach((proyecto) => {
        const card = crearCardProyecto(proyecto);
        gridPersonales.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error cargando data.json", error);
  }
}


// ==== FUNCIÓN MODIFICADA PARA INCLUIR IMÁGENES ====
function crearCardProyecto(proyecto) {
  const { nombre, descripcion, tecnologias, link_visual, imagen } = proyecto;

  const card = document.createElement("article");
  card.className = "card";

  // Cabecera con imagen + título
  const header = document.createElement("div");
  header.className = "project-header";

  if (imagen) {
    const img = document.createElement("img");
    img.className = "project-thumb";
    img.src = imagen;            // p.ej. "img/proyecto-atm.jpg"
    img.alt = nombre || "Imagen del proyecto";
    header.appendChild(img);
  }

  const headerText = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = nombre || "Proyecto sin título";

  const subtitle = document.createElement("p");
  subtitle.className = "project-subtitle";
  subtitle.textContent = "Proyecto del máster en ciberseguridad";

  headerText.appendChild(title);
  headerText.appendChild(subtitle);
  header.appendChild(headerText);

  const desc = document.createElement("p");
  desc.className = "card-description";
  desc.textContent = descripcion || "Proyecto en proceso de documentación.";

  const tech = document.createElement("p");
  tech.className = "card-tech";
  if (tecnologias) {
    const span = document.createElement("span");
    span.textContent = tecnologias;
    tech.appendChild(span);
  }

  const viewLink = document.createElement("a");
  viewLink.className = "card-view";
  viewLink.href = link_visual || "#";
  viewLink.target = "_blank";
  viewLink.textContent = "Ver demo";
  viewLink.rel = "noopener";

  card.appendChild(header);
  card.appendChild(desc);
  card.appendChild(tech);
  card.appendChild(viewLink);

  return card;
}
// ==== FIN DE LA FUNCIÓN MODIFICADA ====


cargarProyectos();


/* Fondo animado: partículas conectadas tipo constelaciones */
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");


let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;
let mouse = { x: null, y: null };
const PARTICLE_COUNT_DESKTOP = 80;
const PARTICLE_COUNT_MOBILE = 45;
let particleCount = window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;


function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);


  particleCount = window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  initParticles();
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();


window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});


class Particle {
  constructor() {
    this.reset();
  }


  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.radius = Math.random() * 1.6 + 0.6;
  }


  update() {
    this.x += this.vx;
    this.y += this.vy;


    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;


    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 120;
      if (dist < repelRadius) {
        const force = (repelRadius - dist) / repelRadius;
        this.x += (dx / dist) * force * 3;
        this.y += (dy / dist) * force * 3;
      }
    }
  }


  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(160, 190, 255, 0.6)";
    ctx.fill();
  }
}


function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}


function render() {
  ctx.clearRect(0, 0, width, height);


  const gradient = ctx.createRadialGradient(
    width * 0.5, 0, 0,
    width * 0.5, 0, width
  );
  gradient.addColorStop(0, "rgba(18, 22, 40, 0.8)");
  gradient.addColorStop(1, "rgba(3, 4, 12, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);


  particles.forEach((p) => {
    p.update();
    p.draw();
  });


  const maxDistance = 140;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);


      if (dist < maxDistance) {
        const opacity = 1 - dist / maxDistance;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(120, 155, 255, ${opacity * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }


  requestAnimationFrame(render);
}


initParticles();
render();



