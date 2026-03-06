document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // CORREÇÃO IMEDIATA DE VISIBILIDADE
    // ========================================
    
    // GARANTIR IMEDIATAMENTE que logo e botões sejam visíveis
    function forceVisibility() {
        const mustBeVisible = [
            '.header-logo',
            '.btn-hero',
            '.btn',
            '.btn-primary', 
            '.btn-secondary'
        ];
        
        mustBeVisible.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.opacity = '1 !important';
                el.style.visibility = 'visible !important';
                el.style.display = el.style.display || 'inline-block';
            });
        });
    }
    
    // Executar IMEDIATAMENTE
    forceVisibility();
    
    // ========================================
    // ANIMAÇÕES E EFEITOS VISUAIS
    // ========================================
    
    // Animação de carregamento da página - ELEMENTOS SEMPRE VISÍVEIS
    function initPageLoadAnimations() {
        // Garantir que elementos críticos sejam sempre visíveis primeiro
        const criticalElements = [
            '.header-logo',
            '.hero-content h1', 
            '.hero-content .description',
            '.btn-hero',
            '.contact-header',
            '.btn'
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = el.style.display || 'block';
            });
        });
        
        // Animações simplificadas - removidas para evitar problemas de layout
        setTimeout(() => {
            const logo = document.querySelector('.header-logo');
            const heroTitle = document.querySelector('.hero-content h1');
            const heroDescription = document.querySelector('.hero-content .description');
            const heroButton = document.querySelector('.btn-hero');
            const contactHeader = document.querySelector('.contact-header');
            
            // Animações de float e pulse removidas para evitar problemas de espaçamento
            // if (logo && logo.style.opacity === '1') {
            //     logo.classList.add('animate-float');
            // }
            // if (heroButton && heroButton.style.opacity === '1') {
            //     heroButton.classList.add('animate-pulse');
            // }
        }, 500);
    }
    
    // Animações baseadas em scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adicionar classe animate ao elemento principal
                    entry.target.classList.add('animate');
                    
                    // Para elementos filhos com classes de animação
                    const children = entry.target.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 150);
                    });
                    
                    // Para service cards com delay específico
                    if (entry.target.classList.contains('service-card')) {
                        const allCards = document.querySelectorAll('.service-card');
                        const cardIndex = Array.from(allCards).indexOf(entry.target);
                        entry.target.style.animationDelay = `${cardIndex * 0.2}s`;
                    }
                    
                    // Parar de observar este elemento após animação
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Também observar seções que contêm elementos para animar
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const hasAnimatableElements = section.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').length > 0;
            if (hasAnimatableElements) {
                observer.observe(section);
            }
        });
    }
    
    // Efeitos de hover melhorados para cards de serviço
    function initServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                
                // Adicionar efeito de brilho ao título
                const title = this.querySelector('h3');
                if (title) {
                    title.style.transition = 'all 0.3s ease';
                    title.style.textShadow = '0 0 10px rgba(0, 123, 255, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                const title = this.querySelector('h3');
                if (title) {
                    title.style.textShadow = 'none';
                }
            });
        });
    }
    
    // Efeito de digitação para títulos
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }
    
    // Efeito parallax removido - estava causando problemas de espaçamento
    function initParallaxEffect() {
        // Parallax desabilitado para evitar problemas de layout
        return;
    }
    
    // Contador animado para números (se houver)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }
    
    // Smooth scroll melhorado
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Efeito de loading com progress bar
    function showLoadingEffect() {
        const body = document.body;
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo animate-pulse">
                    <img src="logo.png" alt="Logo" style="width: 100px;">
                </div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
                <p class="animate-fade-in">Carregando...</p>
            </div>
        `;
        
        // Adicionar estilos do loader
        const loaderStyles = `
            <style>
                .page-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0056b3, #28a745);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    transition: opacity 0.5s ease;
                }
                .loader-content {
                    text-align: center;
                    color: white;
                }
                .loader-progress {
                    width: 200px;
                    height: 4px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 2px;
                    margin: 20px auto;
                    overflow: hidden;
                }
                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #00e0a7, #20c997);
                    width: 0%;
                    animation: loadProgress 2s ease-out forwards;
                }
                @keyframes loadProgress {
                    to { width: 100%; }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', loaderStyles);
        body.appendChild(loader);
        
        // Remover loader após carregamento
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                ensureElementsVisible();
                initPageLoadAnimations();
            }, 500);
        }, 2500);
    }
    
    // ========================================
    // FUNCIONALIDADES ORIGINAIS
    // ========================================
    
    // Function to simulate opening an appointment form/modal or scrolling
    window.openAppointmentForm = function() {
        // Adicionar efeito visual ao botão clicado
        const clickedButton = event.target;
        clickedButton.classList.add('animate-pulse');
        
        setTimeout(() => {
            clickedButton.classList.remove('animate-pulse');
        }, 1000);
        
        // Scroll smoothly to the appointment form section
        const agendamentoSection = document.getElementById('agendamento');
        if (agendamentoSection) {
            agendamentoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Destacar formulário brevemente
            setTimeout(() => {
                agendamentoSection.classList.add('animate-glow');
                setTimeout(() => {
                    agendamentoSection.classList.remove('animate-glow');
                }, 2000);
            }, 500);
        }
    };

    // Envio do formulário para WhatsApp
    const whatsappNumber = '5531972541945'; // (31) 97254-1945 com DDI Brasil
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const city = document.getElementById('city').value.trim();
            const service = document.getElementById('service').value.trim();

            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.style.transform = 'scale(0.95)';
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
                submitButton.disabled = true;
            }

            // Monta a mensagem que chegará no WhatsApp de vocês
            const message = [
                '*Solicitação de Agendamento - Site*',
                '',
                'Nome: ' + name,
                'Cidade: ' + city,
                'O que precisa: ' + service
            ].join('\n');

            const url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
            // No mobile, window.open costuma ser bloqueado; redirecionar na mesma aba abre o app
            if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = url;
            } else {
                window.open(url, '_blank');
            }

            // Feedback e reset
            setTimeout(() => {
                if (submitButton) {
                    submitButton.style.transform = 'scale(1)';
                    submitButton.innerHTML = '<i class="fas fa-check"></i> WhatsApp aberto!';
                    submitButton.style.background = '#28a745';
                    submitButton.disabled = false;
                }
                form.reset();
                setTimeout(() => {
                if (submitButton) {
                    submitButton.innerHTML = 'Enviar pelo WhatsApp';
                    submitButton.style.background = '';
                }
                }, 3000);
            }, 800);
        });
        
        // Adicionar animações aos inputs
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('animate-scale-in');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('animate-scale-in');
            });
        });
    }

    // Update current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    // Garantir que todos os elementos importantes sejam visíveis e sem transformações problemáticas
    function ensureElementsVisible() {
        // Elementos críticos que DEVEM sempre estar visíveis
        const criticalSelectors = [
            '.header-logo',
            '.btn',
            '.btn-hero', 
            '.btn-primary',
            '.btn-secondary',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'span', 'div',
            '.hero-content',
            '.contact-header',
            '.service-card',
            '.section-title',
            '.section-subtitle'
        ];
        
        criticalSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (window.getComputedStyle(el).opacity === '0') {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                }
                // Resetar qualquer transformação problemática
                if (el.style.transform && el.style.transform !== 'none') {
                    el.style.transform = 'none';
                }
            });
        });
        
        // Garantir que a seção hero não tenha transformações problemáticas
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && heroSection.style.transform) {
            heroSection.style.transform = 'none';
        }
    }
    
    // Verificar se deve mostrar loading
    if (document.readyState === 'loading') {
        showLoadingEffect();
    } else {
        ensureElementsVisible();
        initPageLoadAnimations();
    }
    
    // Inicializar todas as animações e efeitos
    forceVisibility(); // Garantir novamente
    ensureElementsVisible();
    initScrollAnimations();
    initServiceCardEffects();
    initParallaxEffect();
    initSmoothScroll();
    
    // Última verificação após 1 segundo
    setTimeout(() => {
        forceVisibility();
        ensureElementsVisible();
    }, 1000);
    
    // Garantir que elementos com animação tenham os estados iniciais corretos
    setTimeout(() => {
        // Verificar se elementos existem e têm as classes necessárias
        const elementsToCheck = [
            '.section-header.scroll-animate',
            '.service-card.scroll-animate-scale',
            '.quem-somos-content > div.scroll-animate-left',
            '.tomografia-text.scroll-animate-right',
            '.address-info.scroll-animate-left',
            '.map-container.scroll-animate-right'
        ];
        
        elementsToCheck.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Garantir que o elemento está preparado para animação
                if (!el.classList.contains('animate')) {
                    el.style.transition = 'all 0.8s ease-out';
                }
            });
        });
    }, 100);
    
    // Efeito especial no logo removido - estava causando problemas de layout
    const logo = document.querySelector('.header-logo');
    if (logo) {
        // Float animation removida para evitar problemas de espaçamento
        // logo.classList.add('animate-float');
    }
    
    // Adicionar hover effects aos botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('hover-lift');
    });
});