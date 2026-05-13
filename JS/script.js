/* ============================================
   SITE CURRÍCULO - WALLACE BAHIA
   EFEITOS E ANIMAÇÕES MODERNAS
   ============================================ */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  
  /* ============================================
     OVERLAY DE CARREGAMENTO
     ============================================ */
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add('hide');
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 500);
    }, 1000);
  }

  /* ============================================
     EFEITO DE CURSOR PERSONALIZADO
     ============================================ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorGlow = document.querySelector('.cursor-glow');

  if (cursorDot && cursorGlow && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      cursorGlow.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    // Adiciona efeito hover em elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .btn, .rede-link, .menu-link');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = `scale(1.5)`;
        cursorGlow.style.borderColor = '#fff';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = `scale(1)`;
        cursorGlow.style.borderColor = 'var(--cor-secundaria)';
      });
    });
  }

  /* ============================================
     MENU MOBILE (HAMBURGUER)
     ============================================ */
  const menuMobileBtn = document.querySelector('.menu-mobile-btn');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (menuMobileBtn && mobileOverlay) {
    menuMobileBtn.addEventListener('click', () => {
      menuMobileBtn.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Fecha menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.mobile-lista a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuMobileBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     CABEÇALHO COM EFEITO DE SCROLL
     ============================================ */
  const cabecalho = document.querySelector('.cabecalho');
  if (cabecalho) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        cabecalho.classList.add('scrolled');
      } else {
        cabecalho.classList.remove('scrolled');
      }
    });
  }

  /* ============================================
     EFEITO DE DIGITAÇÃO NO TÍTULO HERO
     ============================================ */
  const tituloDigitando = document.querySelector('.hero-titulo-digitando');
  if (tituloDigitando) {
    const palavras = ['< Desenvolvedor Web />', '< Estudante de TI />', '< Criador de Soluções />'];
    let indicePalavra = 0;
    let indiceChar = 0;
    let isDeletando = false;

    function typeEffect() {
      const palavraAtual = palavras[indicePalavra];
      
      if (isDeletando) {
        tituloDigitando.textContent = palavraAtual.substring(0, indiceChar - 1);
        indiceChar--;
      } else {
        tituloDigitando.textContent = palavraAtual.substring(0, indiceChar + 1);
        indiceChar++;
      }

      if (!isDeletando && indiceChar === palavraAtual.length) {
        isDeletando = true;
        setTimeout(typeEffect, 2000);
        return;
      }

      if (isDeletando && indiceChar === 0) {
        isDeletando = false;
        indicePalavra = (indicePalavra + 1) % palavras.length;
        setTimeout(typeEffect, 500);
        return;
      }

      const velocidade = isDeletando ? 50 : 100;
      setTimeout(typeEffect, velocidade);
    }

    typeEffect();
  }

  /* ============================================
     ANIMAÇÃO DE CONTAGEM DOS ESTATÍSTICAS
     ============================================ */
  const statNumbers = document.querySelectorAll('.stat-numero');
  
  function animateNumbers() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      
      const updateNumber = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target;
        }
      };
      
      updateNumber();
    });
  }

  // Intersection Observer para ativar contagem quando visível
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsContainer = document.querySelector('.sobre-stats');
  if (statsContainer) {
    observer.observe(statsContainer);
  }

  /* ============================================
     ANIMAÇÃO DAS BARRAS DE HABILIDADE
     ============================================ */
  const progressBars = document.querySelectorAll('.habilidade-progresso');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = `${level}%`;
    });
  }

  const habilidadesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        habilidadesObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const habilidadesSection = document.querySelector('.habilidades-section');
  if (habilidadesSection) {
    habilidadesObserver.observe(habilidadesSection);
  }

  /* ============================================
     ANIMAÇÃO DE SCROLL REVEAL (AOS-like)
     ============================================ */
  const revealElements = document.querySelectorAll('.timeline-item, .formacao-card, .habilidade-card, .contato-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });

  /* ============================================
     PARTÍCULAS FLUTUANTES (Canvas)
     ============================================ */
  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particlesContainer.appendChild(canvas);
    
    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;
    
    let particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    
    function handleResize() {
      canvas.width = particlesContainer.offsetWidth;
      canvas.height = particlesContainer.offsetHeight;
      particles = [];
      initParticles();
    }
    
    initParticles();
    animateParticles();
    window.addEventListener('resize', handleResize);
  }

  /* ============================================
     FORMULÁRIO DE CONTATO
     ============================================ */
  const formContato = document.getElementById('form-contato');
  if (formContato) {
    formContato.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simula envio do formulário
      const btnEnviar = this.querySelector('.btn-enviar');
      const textoOriginal = btnEnviar.innerHTML;
      
      btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btnEnviar.disabled = true;
      
      setTimeout(() => {
        btnEnviar.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
        formContato.reset();
        
        setTimeout(() => {
          btnEnviar.innerHTML = textoOriginal;
          btnEnviar.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ============================================
     NAVEGAÇÃO SUAVE PARA ÂNCORAS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================
     ADICIONA CLASSE ATIVA AO MENU BASEADO NO SCROLL
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.menu-link, .mobile-lista a');
  
  function highlightActiveMenu() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    menuLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveMenu);
  highlightActiveMenu();

  /* ============================================
     EFEITO DE PARALLAX NO FUNDO DAS SEÇÕES
     ============================================ */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });

  /* ============================================
     TOOLTIP PARA LINKS DE REDES SOCIAIS
     ============================================ */
  const redeLinks = document.querySelectorAll('.rede-link');
  redeLinks.forEach(link => {
    const platform = link.classList.contains('linkedin') ? 'LinkedIn' :
                     link.classList.contains('instagram') ? 'Instagram' :
                     link.classList.contains('facebook') ? 'Facebook' : 'GitHub';
    
    link.setAttribute('title', `Visitar ${platform}`);
  });

  console.log('Site carregado com sucesso! ✨');
});