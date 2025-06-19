document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  });

  const btn = document.querySelector(".mobile-menu-button");
  const menu = document.querySelector(".mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });

  // Typing animation
  const typingAnimationElement = document.getElementById('typing-animation');
  const typingTexts = ['Cloud Enthusiastic','Software Developer', 'Freelancer', 'Web Developer'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
      const currentText = typingTexts[textIndex];

      if (isDeleting) {
          typingAnimationElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
      } else {
          typingAnimationElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 1500; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % typingTexts.length;
          typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
  }

  // Start the typing animation
  setTimeout(type, 1000);

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Send email using EmailJS
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData).then(
        function (response) {
          alert("Message sent successfully!");
          contactForm.reset();
        },
        function (error) {
          alert("Failed to send message. Please try again later.");
          console.error("EmailJS error:", error);
        }
      );
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-yellow-400");
      link.classList.add("text-gray-400");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-400");
        link.classList.add("text-yellow-400");
      }
    });
  });
});
