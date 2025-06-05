// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Boot Loader - alleen bij eerste bezoek
  const hasVisited = sessionStorage.getItem("hasVisited");
  const bootLoader = document.getElementById("boot-loader");

  if (!hasVisited && bootLoader) {
    // Toon boot sequence
    setTimeout(() => {
      sessionStorage.setItem("hasVisited", "true");
      bootLoader.classList.add("hidden");
      setTimeout(() => {
        bootLoader.style.display = "none";
      }, 500);
    }, 8500); // Na alle boot messages

    // Boot loader kan ook worden weggedrukt
    document.addEventListener("keydown", function skipBoot() {
      sessionStorage.setItem("hasVisited", "true");
      bootLoader.classList.add("hidden");
      setTimeout(() => {
        bootLoader.style.display = "none";
      }, 500);
      document.removeEventListener("keydown", skipBoot);
    });

    // Ook klikken om over te slaan
    bootLoader.addEventListener("click", function () {
      sessionStorage.setItem("hasVisited", "true");
      bootLoader.classList.add("hidden");
      setTimeout(() => {
        bootLoader.style.display = "none";
      }, 500);
    });
  } else if (bootLoader) {
    // Verberg direct als al bezocht
    bootLoader.style.display = "none";
  }

  // Typing Animation
  const texts = [
    "Mijn ontwikkeling tijdens HBO-ICT, overzichtelijk en digitaal",
    "Praktische oplossingen bouwen met code",
    "Elke dag beter worden in softwareontwikkeling",
    "Van idee naar digitale toepassing",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextElement = document.getElementById("typed-text");

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 50;

    if (isDeleting) {
      typeSpeed = 50;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 3000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(typeWriter, typeSpeed);
  }

  if (typedTextElement) {
    typeWriter();
  }

  // Create floating code elements
  function createFloatingElement() {
    const codeSnippets = [
      "function()",
      "const x =",
      "if (true)",
      "return;",
      "class {}",
      "import *",
      "export",
      "=> {}",
      "async",
      "await",
      "try {",
      "catch",
      "console.log",
      "document.",
      "window.",
      "this.",
      "new Object",
      "<div>",
      "</html>",
      "SELECT *",
      "INSERT",
      "UPDATE",
      "DELETE",
    ];

    const floatingElement = document.createElement("div");
    floatingElement.className = "floating-element";
    floatingElement.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    floatingElement.style.left = Math.random() * 100 + "%";
    floatingElement.style.animationDuration = Math.random() * 10 + 10 + "s";
    floatingElement.style.fontSize = Math.random() * 8 + 10 + "px";

    // Add to hero section
    const hero = document.querySelector(".hero");
    if (hero) {
      if (!hero.querySelector(".floating-elements")) {
        const container = document.createElement("div");
        container.className = "floating-elements";
        hero.appendChild(container);
      }
      hero.querySelector(".floating-elements").appendChild(floatingElement);

      // Remove element after animation
      setTimeout(() => {
        if (floatingElement.parentNode) {
          floatingElement.parentNode.removeChild(floatingElement);
        }
      }, 15000);
    }
  }

  // Create floating elements periodically
  setInterval(createFloatingElement, 2000);

  // Status text rotation
  const statusTexts = [
    "Nieuwe technologieën aan het ontdekken",
    "Werken aan projecten die écht iets doen",
    "Problemen oplossen, stap voor stap",
    "Van idee naar werkende code",
    "Laatste wijzigingen aan het doorvoeren...",
  ];

  let statusIndex = 0;
  const statusTextElement = document.querySelector(".status-text");

  function rotateStatus() {
    if (statusTextElement) {
      statusTextElement.style.opacity = "0";
      setTimeout(() => {
        statusIndex = (statusIndex + 1) % statusTexts.length;
        statusTextElement.textContent = statusTexts[statusIndex];
        statusTextElement.style.opacity = "1";
      }, 300);
    }
  }

  if (statusTextElement) {
    statusTextElement.style.transition = "opacity 0.3s ease";
    setInterval(rotateStatus, 4000);
  }

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = 70;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // CTA button smooth scroll
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();

      const targetSection = document.querySelector("#assignments");
      if (targetSection) {
        const headerHeight = 70;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // Add active class to nav links based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

  // Create code rain effect
  function createCodeRain() {
    const codeChars = [
      "0",
      "1",
      "{",
      "}",
      "(",
      ")",
      ";",
      "=",
      "+",
      "-",
      "*",
      "/",
      ">",
      "<",
      "!",
      "?",
      ":",
      "&",
      "|",
      "#",
      "@",
      "$",
      "%",
    ];

    const rainDrop = document.createElement("div");
    rainDrop.className = "rain-drop";
    rainDrop.textContent =
      codeChars[Math.floor(Math.random() * codeChars.length)];
    rainDrop.style.left = Math.random() * 100 + "%";
    rainDrop.style.animationDuration = Math.random() * 3 + 2 + "s";
    rainDrop.style.fontSize = Math.random() * 6 + 8 + "px";

    // Add to body
    let codeRainContainer = document.querySelector(".code-rain");
    if (!codeRainContainer) {
      codeRainContainer = document.createElement("div");
      codeRainContainer.className = "code-rain";
      document.body.appendChild(codeRainContainer);
    }

    codeRainContainer.appendChild(rainDrop);

    // Remove element after animation
    setTimeout(() => {
      if (rainDrop.parentNode) {
        rainDrop.parentNode.removeChild(rainDrop);
      }
    }, 5000);
  }

  // Create code rain drops periodically
  setInterval(createCodeRain, 300);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".assignment-card, .reflection-content")
    .forEach((el) => {
      observer.observe(el);
    });
  // PD2 Countdown Timer
  function updateCountdown() {
    // Target date: September 1, 2025 at 9:30 AM
    const targetDate = new Date("2025-09-01T09:30:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const daysElement = document.getElementById("days");
      const hoursElement = document.getElementById("hours");
      const minutesElement = document.getElementById("minutes");

      if (daysElement) daysElement.textContent = days;
      if (hoursElement)
        hoursElement.textContent = hours.toString().padStart(2, "0");
      if (minutesElement)
        minutesElement.textContent = minutes.toString().padStart(2, "0");
    }
  }

  // Update countdown every minute
  updateCountdown();
  setInterval(updateCountdown, 60000); // PD2 Notify button interaction
  const notifyBtn = document.querySelector(".notify-btn");
  if (notifyBtn) {
    notifyBtn.addEventListener("click", function () {
      // Simple notification effect
      const originalText = this.innerHTML;
      this.innerHTML = "<span>🚀 Je bent op de hoogte gesteld!</span>";
      this.style.background = "linear-gradient(45deg, #00ff41, #00d4aa)";

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = "linear-gradient(45deg, #ff6b6b, #ee5a52)";
      }, 2000);
    });
  }

  // Interactive Terminal
  const terminalInput = document.getElementById("terminal-input");
  const terminalBody = document.getElementById("terminal-body");
  let commandHistory = [];
  let historyIndex = -1;
  let easterEggFound = false;

  const commands = {
    help: () => {
      return `<div class="terminal-output">Available commands:
• help - Show this help message
• about - Information about PD2.0
• status - Check system status
• clear - Clear terminal
• date - Show current date
• whoami - Display current user
• ls - List directory contents
• cat readme.txt - Read the readme file
• secret - Try to find the easter egg... 🐰</div>`;
    },

    about: () => {
      return `<div class="terminal-output">Personal Development 2.0
Version: 2.0.0-beta
Release: September 2025
Features: Enhanced self-reflection, career exploration, teamwork skills
Status: Under development 🚀</div>`;
    },

    status: () => {
      const statuses = [
        "All systems operational ✅",
        "Motivation levels: 95% 📈",
        "Learning progress: Excellent 🎯",
        "Coffee levels: Critical ☕",
        "Procrastination.exe: Still running 😅",
      ];
      return `<div class="terminal-output">${
        statuses[Math.floor(Math.random() * statuses.length)]
      }</div>`;
    },

    clear: () => {
      // Clear all terminal lines except the original ones
      const lines = terminalBody.querySelectorAll(".terminal-line");
      lines.forEach((line, index) => {
        if (index >= 7) {
          // Keep first 7 original lines
          line.remove();
        }
      });
      return "";
    },

    date: () => {
      return `<div class="terminal-output">${new Date().toLocaleString(
        "nl-NL"
      )}</div>`;
    },

    whoami: () => {
      return `<div class="terminal-output">student@hbo-ict-pd2.0:~$ You are a motivated HBO-ICT student! 👨‍💻</div>`;
    },

    ls: () => {
      return `<div class="terminal-output">personal-development/
├── motivation.js
├── skills.json
├── reflection.md
├── feedback.txt
├── goals.yaml
├── progress.log
└── secret_wisdom.hidden 🔒</div>`;
    },

    "cat readme.txt": () => {
      return `<div class="terminal-output"># Personal Development 2.0 README

Welcome to your journey of growth and self-discovery! 

This terminal represents your mindset - ready to explore, 
learn, and push boundaries. Every command you type is 
like a step forward in your development.

Remember: The best way to predict the future is to create it! 💪

Tip: Try exploring with different commands...</div>`;
    },    secret: () => {
      if (!easterEggFound) {
        easterEggFound = true;
        // Trigger glitch effect
        triggerGlitchEffect();
        return `<div class="terminal-output easter-egg">� GLITCH MODE ACTIVATED! �
<pre>
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  � SYSTEM BREACH: Reality.exe corrupted    ┃
┃                                             ┃
┃  [WARNING] Matrix glitch detected...        ┃  
┃  [INFO] You broke the simulation! 🤖        ┃
┃                                             ┃
┃  "The curious mind is the hacker's          ┃
┃   greatest tool."                           ┃
┃                                             ┃
┃  ✨ Achievement: Code Reality Bender ✨    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Loading chaos.exe... 
▓▓▓▓▓▓▓▓▓▓ 100% COMPLETE

Welcome to the GLITCH DIMENSION! 🌀
</pre></div>`;
      } else {
        // Trigger glitch effect again
        triggerGlitchEffect();
        return `<div class="terminal-output easter-egg">🎊 GLITCH RELOADED! 🎊
<pre>
You found it again! The glitch effect never gets old... 

🔄 Reality.exe restarting...
🌈 Glitch level: MAXIMUM
⚡ Chaos factor: UNLIMITED

Keep exploring the digital realm! �✨
</pre></div>`;
      }
    },
  };  // Glitch Effect Function
  function triggerGlitchEffect() {
    const body = document.body;
    const terminal = document.querySelector('.pd2-terminal');
    
    // PROTECT assignment cards before starting glitch
    const assignmentCards = document.querySelectorAll('.assignment-card, .assignment-grid, .assignments-section');
    const originalStyles = [];
    
    // Store original styles and apply protection
    assignmentCards.forEach((card, index) => {
      originalStyles[index] = {
        animation: card.style.animation,
        filter: card.style.filter,
        transform: card.style.transform,
        opacity: card.style.opacity,
        visibility: card.style.visibility
      };
      
      // Force protection styles
      card.style.animation = 'none !important';
      card.style.filter = 'none !important';
      card.style.transform = 'none !important';
      card.style.opacity = '1 !important';
      card.style.visibility = 'visible !important';
      card.style.zIndex = '10000';
      card.style.position = 'relative';
    });
    
    // Create glitch overlay elements
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    body.appendChild(glitchOverlay);
    
    const scanlines = document.createElement('div');
    scanlines.className = 'glitch-scanlines';
    body.appendChild(scanlines);
    
    const noise = document.createElement('div');
    noise.className = 'glitch-noise';
    body.appendChild(noise);
    
    // Add glitch class to body and terminal (FULL EFFECT!)
    body.classList.add('glitch-active');
    if (terminal) {
      terminal.classList.add('terminal-glitch');
    }
    
    // INTENSE glitch intensity changes
    const glitchInterval = setInterval(() => {
      const intensity = Math.random();
      
      // Apply effects to body but constantly protect assignment cards
      body.style.filter = `
        hue-rotate(${Math.random() * 360}deg) 
        saturate(${1 + intensity * 2}) 
        brightness(${0.8 + intensity * 0.4})
        contrast(${1 + intensity * 0.5})
      `;
      
      // Frequently add text shadow glitch
      if (Math.random() > 0.7) {
        body.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff
        `;
      } else {
        body.style.textShadow = 'none';
      }
      
      // Constantly reapply protection to assignment cards
      assignmentCards.forEach(card => {
        card.style.animation = 'none !important';
        card.style.filter = 'none !important';
        card.style.transform = 'none !important';
        card.style.opacity = '1 !important';
        card.style.visibility = 'visible !important';
      });
    }, 100);
    
    // Clean up after 5 seconds (original duration)
    setTimeout(() => {
      clearInterval(glitchInterval);
      body.classList.remove('glitch-active');
      if (terminal) {
        terminal.classList.remove('terminal-glitch');
      }
      body.style.filter = 'none';
      body.style.textShadow = 'none';
      
      // Restore original styles to assignment cards
      assignmentCards.forEach((card, index) => {
        const original = originalStyles[index];
        card.style.animation = original.animation || '';
        card.style.filter = original.filter || '';
        card.style.transform = original.transform || '';
        card.style.opacity = original.opacity || '';
        card.style.visibility = original.visibility || '';
      });
      
      // Remove overlay elements
      if (glitchOverlay.parentNode) {
        glitchOverlay.parentNode.removeChild(glitchOverlay);
      }
      if (scanlines.parentNode) {
        scanlines.parentNode.removeChild(scanlines);
      }
      if (noise.parentNode) {
        noise.parentNode.removeChild(noise);
      }
    }, 5000);
    
    // Add LOTS of random glitch bursts during the effect
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        setTimeout(() => {
          body.style.transform = 'none';
        }, 50);
      }, Math.random() * 4000);
    }
  }

  if (terminalInput) {
    // Focus terminal input when clicking on terminal
    terminalBody.addEventListener("click", function () {
      terminalInput.focus();
    });

    terminalInput.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          const command = this.value.trim().toLowerCase();

          if (command) {
            // Add command to history
            commandHistory.unshift(command);
            historyIndex = -1;

            // Display the command
            const commandLine = document.createElement("div");
            commandLine.className = "terminal-line";
            commandLine.innerHTML = `<span class="prompt-symbol">$</span> ${command}`;

            // Insert before the input line
            const promptLine = terminalBody.querySelector(".terminal-prompt");
            terminalBody.insertBefore(commandLine, promptLine);

            // Execute command
            let output = "";
            if (commands[command]) {
              output = commands[command]();
            } else {
              output = `<div class="terminal-output terminal-error">Command not found: ${command}
Type 'help' for available commands.</div>`;
            }

            if (output) {
              const outputDiv = document.createElement("div");
              outputDiv.innerHTML = output;
              terminalBody.insertBefore(outputDiv, promptLine);
            }

            // Clear input
            this.value = "";

            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (
            commandHistory.length > 0 &&
            historyIndex < commandHistory.length - 1
          ) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
          } else if (historyIndex === 0) {
            historyIndex = -1;
            this.value = "";
          }
          break;
      }    });    // Only focus terminal when user explicitly clicks on it - no auto-focus
  }
});
