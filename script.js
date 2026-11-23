/**
 * Nordic & Co. Architecture - JavaScript Interactions
 * Features:
 * - Dynamic Active Nav & Sticky Navbar
 * - Live Category Filter (Portfolio)
 * - Project Detail Modal with Rich Architectural Data
 * - Interactive Project Cost & Fee Calculator (Services)
 * - Consultation Form Validation & Inquiry Autofill (Contact)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Navigation & Sticky Header
  // =========================================================================
  const navbar = document.getElementById('nordicNavbar');
  const scrollTopBtn = document.getElementById('scrollTopNordic');

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active nav link highlight based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nordic-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // =========================================================================
  // 2. Portfolio Project Data & Filter (projects.html)
  // =========================================================================
  const projectDatabase = {
    'villa-fjordlyst': {
      title: 'Villa Fjordlyst',
      category: 'Residential',
      location: 'Aarhus Coast, Denmark',
      area: '380 m²',
      year: '2024',
      materials: 'Ditlev Oak, Cast Terrazzo, Low-Iron Structural Glass',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      description: 'Perched upon a glacial slope overlooking the Kattegat Sea, Villa Fjordlyst is conceived as a sequence of three stepped timber pavilions. Cantilevered cedar planes shade generous glass apertures, capturing shifting daylight while maintaining passive thermal insulation. The interior features bespoke smoked oak millwork and continuous micro-cement floors.'
    },
    'koppen-gallery': {
      title: 'Koppen Atelier & Gallery',
      category: 'Commercial',
      location: 'Berlin-Mitte, Germany',
      area: '540 m²',
      year: '2023',
      materials: 'Restored Clinker Brick, Patinated Steel, Acoustical Birch Panels',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      description: 'An adaptive restoration of a late 19th-century textile warehouse into a contemporary design gallery and architectural workshop. By introducing a central double-height lightwell, the project floods the ground exhibition floors with diffused northern sky illuminance without compromising structural masonry.'
    },
    'osterbro-penthouse': {
      title: 'Østerbro Penthouse',
      category: 'Minimalist Interior',
      location: 'Copenhagen, Denmark',
      area: '220 m²',
      year: '2025',
      materials: 'Gotland Limestone, Raw Belgian Linen, Brushed Gunmetal',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      description: 'A complete spatial reorganization of a top-floor heritage residence in Copenhagen. Interior partitions were dissolved in favor of monolithic limestone service blocks that delineate kitchen, bathing, and dressing zones while allowing sightlines from sunrise to sunset across the Danish capital.'
    },
    'pine-pavilion': {
      title: 'The Pine Pavilion',
      category: 'Residential',
      location: 'Stockholm Archipelago, Sweden',
      area: '190 m²',
      year: '2024',
      materials: 'Charred Scots Pine (Shou Sugi Ban), Granite Bedrock, Zinc Roof',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      description: 'An off-grid private summer residence integrated organically into exposed granite ridges. Anchored directly to rock fissures with minimal excavation, the structure features charred pine claddings resistant to harsh Baltic maritime storms, paired with an integrated geothermal heating loop.'
    },
    'luma-headquarters': {
      title: 'Luma Nordic Headquarters',
      category: 'Commercial',
      location: 'Hamburg HafenCity, Germany',
      area: '1,250 m²',
      year: '2023',
      materials: 'Glulam Timber Ribs, Triple-Pane Solar Glass, Reclaimed Terracotta',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      description: 'An award-winning mass-timber corporate workplace celebrating Scandinavian humanism in commercial life. Biophilic courtyard pockets, active acoustic baffled ceilings, and flexible modular workstations encourage natural collaboration and quiet contemplative focus.'
    },
    'sankt-hans-apartment': {
      title: 'Sankt Hans Residence',
      category: 'Minimalist Interior',
      location: 'Nørrebro, Copenhagen',
      area: '165 m²',
      year: '2024',
      materials: 'Dinesen Douglas Fir, Hand-applied Chalk Plaster, Raw Brass',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      description: 'Designed around the sensory qualities of natural timber and tactile chalk plaster. The central feature is a 5-meter unbroken kitchen monolith crafted from dark basalt, complemented by full-plank Douglas fir flooring running uninterrupted across the living suites.'
    },
    'malaren-retreat': {
      title: 'Lake Mälaren Retreat',
      category: 'Residential',
      location: 'Mariefred, Sweden',
      area: '290 m²',
      year: '2025',
      materials: 'Cross-Laminated Timber (CLT), Local Slate, Recessed Triple Glazing',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      description: 'Designed as a serene sanctuary for an author and composer. The house opens entirely to the tranquil waters of Lake Mälaren through sliding glass pockets that disappear into timber walls during Nordic summer months.'
    },
    'atelier-blanc': {
      title: 'Atelier Blanc Studio',
      category: 'Commercial',
      location: 'Berlin-Kreuzberg, Germany',
      area: '340 m²',
      year: '2022',
      materials: 'Cast In-Situ Concrete, Bleached Ash Wood, Acoustic Kvadrat Felt',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      description: 'A boutique creative studio emphasizing luminous spatial clarity. Custom pivoting ash partitions allow the open studio to be subdivided into private screening rooms, client lounges, and photographic staging areas in moments.'
    }
  };

  // Filter functionality on projects.html
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-grid-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Project Detail Modal Trigger
  const projectModalElement = document.getElementById('projectDetailsModal');
  let projectModal = null;
  if (projectModalElement && typeof bootstrap !== 'undefined') {
    projectModal = new bootstrap.Modal(projectModalElement);
  }

  const modalImg = document.getElementById('modalProjectImg');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalArea = document.getElementById('modalProjectArea');
  const modalLocation = document.getElementById('modalProjectLocation');
  const modalYear = document.getElementById('modalProjectYear');
  const modalMaterials = document.getElementById('modalProjectMaterials');
  const modalDescription = document.getElementById('modalProjectDescription');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  document.querySelectorAll('.open-project-modal').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-id');
      const project = projectDatabase[projectId];

      if (project && projectModal) {
        if (modalImg) modalImg.src = project.image;
        if (modalCategory) modalCategory.textContent = project.category;
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalArea) modalArea.textContent = project.area;
        if (modalLocation) modalLocation.textContent = project.location;
        if (modalYear) modalYear.textContent = project.year;
        if (modalMaterials) modalMaterials.textContent = project.materials;
        if (modalDescription) modalDescription.textContent = project.description;

        if (modalInquireBtn) {
          modalInquireBtn.href = `contact.html?project=${encodeURIComponent(project.title)}`;
        }

        projectModal.show();
      }
    });
  });

  // =========================================================================
  // 3. Interactive Cost & Fee Calculator (services.html)
  // =========================================================================
  const calcAreaRange = document.getElementById('calcAreaRange');
  const calcAreaInput = document.getElementById('calcAreaInput');
  const calcTypeRadios = document.querySelectorAll('input[name="propertyType"]');
  const calcTierRadios = document.querySelectorAll('input[name="serviceTier"]');
  const calcAddons = document.querySelectorAll('.calc-addon-check');

  const resultFeeTotal = document.getElementById('resultFeeTotal');
  const resultBuildEstimate = document.getElementById('resultBuildEstimate');
  const resultDuration = document.getElementById('resultDuration');
  const resultSchematic = document.getElementById('resultSchematic');
  const resultTechnical = document.getElementById('resultTechnical');
  const resultSupervision = document.getElementById('resultSupervision');
  const calcBookBtn = document.getElementById('calcBookBtn');

  // Rates definition (Base design fee / m², Construction budget / m²)
  const typeRates = {
    'residential-villa': { designFee: 180, buildCost: 2800, durationBase: 8 },
    'urban-apartment': { designFee: 140, buildCost: 1900, durationBase: 5 },
    'commercial-office': { designFee: 160, buildCost: 2200, durationBase: 7 },
    'hospitality': { designFee: 210, buildCost: 3200, durationBase: 10 }
  };

  const tierMultipliers = {
    'concept': { multiplier: 1.0, label: 'Concept & Schematics', schematicPct: 0.7, technicalPct: 0.3, superPct: 0 },
    'comprehensive': { multiplier: 1.45, label: 'Comprehensive Architecture', schematicPct: 0.4, technicalPct: 0.45, superPct: 0.15 },
    'turnkey': { multiplier: 1.85, label: 'Turnkey Architecture & Supervision', schematicPct: 0.3, technicalPct: 0.4, superPct: 0.3 }
  };

  function updateCalculator() {
    if (!calcAreaRange || !calcAreaInput) return;

    const area = parseInt(calcAreaRange.value, 10) || 150;

    // Selected property type
    let selectedType = 'residential-villa';
    calcTypeRadios.forEach(radio => {
      if (radio.checked) selectedType = radio.value;
    });

    // Selected tier
    let selectedTier = 'comprehensive';
    calcTierRadios.forEach(radio => {
      if (radio.checked) selectedTier = radio.value;
    });

    // Addons sum
    let addonsTotal = 0;
    calcAddons.forEach(addon => {
      if (addon.checked) {
        addonsTotal += parseInt(addon.value, 10) || 0;
      }
    });

    const typeConfig = typeRates[selectedType] || typeRates['residential-villa'];
    const tierConfig = tierMultipliers[selectedTier] || tierMultipliers['comprehensive'];

    // Architectural fee calculation
    const baseDesignFee = area * typeConfig.designFee * tierConfig.multiplier;
    const totalDesignFee = Math.round(baseDesignFee + addonsTotal);

    // Approximate construction budget
    const totalBuildCost = Math.round(area * typeConfig.buildCost);

    // Estimated duration calculation
    const durationMonths = Math.max(typeConfig.durationBase, Math.round(typeConfig.durationBase + (area / 150)));

    // Breakdown
    const schematicFee = Math.round(totalDesignFee * tierConfig.schematicPct);
    const technicalFee = Math.round(totalDesignFee * tierConfig.technicalPct);
    const supervisionFee = totalDesignFee - schematicFee - technicalFee;

    // Update DOM with formatted currency
    if (resultFeeTotal) {
      resultFeeTotal.textContent = `€${totalDesignFee.toLocaleString()}`;
    }
    if (resultBuildEstimate) {
      resultBuildEstimate.textContent = `€${totalBuildCost.toLocaleString()}`;
    }
    if (resultDuration) {
      resultDuration.textContent = `${durationMonths} – ${durationMonths + 3} Months`;
    }
    if (resultSchematic) {
      resultSchematic.textContent = `€${schematicFee.toLocaleString()}`;
    }
    if (resultTechnical) {
      resultTechnical.textContent = `€${technicalFee.toLocaleString()}`;
    }
    if (resultSupervision) {
      resultSupervision.textContent = supervisionFee > 0 ? `€${supervisionFee.toLocaleString()}` : 'Included in technical';
    }

    // Update Consultation CTA Link with query params
    if (calcBookBtn) {
      calcBookBtn.href = `contact.html?type=${encodeURIComponent(selectedType)}&area=${area}&fee=${totalDesignFee}`;
    }
  }

  if (calcAreaRange && calcAreaInput) {
    // Two-way synchronization between slider and number input
    calcAreaRange.addEventListener('input', () => {
      calcAreaInput.value = calcAreaRange.value;
      updateCalculator();
    });

    calcAreaInput.addEventListener('input', () => {
      let val = parseInt(calcAreaInput.value, 10);
      if (isNaN(val)) val = 50;
      if (val < 30) val = 30;
      if (val > 1500) val = 1500;
      calcAreaRange.value = val;
      updateCalculator();
    });

    calcTypeRadios.forEach(radio => radio.addEventListener('change', updateCalculator));
    calcTierRadios.forEach(radio => radio.addEventListener('change', updateCalculator));
    calcAddons.forEach(addon => addon.addEventListener('change', updateCalculator));

    updateCalculator(); // Initial calculation
  }

  // =========================================================================
  // 4. Contact Form Validation & URL Autofill (contact.html)
  // =========================================================================
  const consultationForm = document.getElementById('consultationForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactPhone = document.getElementById('contactPhone');
  const contactType = document.getElementById('contactType');
  const contactArea = document.getElementById('contactArea');
  const contactMessage = document.getElementById('contactMessage');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');
  const submitContactBtn = document.getElementById('submitContactBtn');

  // Autofill from URL query params (e.g. from Projects modal or Calculator)
  const urlParams = new URLSearchParams(window.location.search);
  const paramProject = urlParams.get('project');
  const paramType = urlParams.get('type');
  const paramArea = urlParams.get('area');
  const paramFee = urlParams.get('fee');

  if (paramProject && contactMessage) {
    contactMessage.value = `I am interested in commissioning a project with an aesthetic and materiality similar to ${paramProject}.`;
  } else if (paramType && contactType) {
    // Map URL param to select value
    if (paramType.includes('villa')) contactType.value = 'residential';
    else if (paramType.includes('apartment')) contactType.value = 'interior';
    else if (paramType.includes('commercial')) contactType.value = 'commercial';
    else if (paramType.includes('hospitality')) contactType.value = 'hospitality';

    if (paramArea && contactArea) {
      contactArea.value = paramArea;
    }
    if (paramFee && contactMessage) {
      contactMessage.value = `I generated a preliminary estimate of €${parseInt(paramFee, 10).toLocaleString()} for a ${paramArea} m² project via your online calculator. I would like to schedule an introductory architectural review.`;
    }
  }

  // Form submission & validation
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Full Name validation
      if (!contactName.value.trim()) {
        contactName.classList.add('is-invalid');
        isValid = false;
      } else {
        contactName.classList.remove('is-invalid');
      }

      // Email validation (RFC standard regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail.value.trim())) {
        contactEmail.classList.add('is-invalid');
        isValid = false;
      } else {
        contactEmail.classList.remove('is-invalid');
      }

      // Phone validation
      if (!contactPhone.value.trim()) {
        contactPhone.classList.add('is-invalid');
        isValid = false;
      } else {
        contactPhone.classList.remove('is-invalid');
      }

      // Message validation
      if (!contactMessage.value.trim()) {
        contactMessage.classList.add('is-invalid');
        isValid = false;
      } else {
        contactMessage.classList.remove('is-invalid');
      }

      if (!isValid) return;

      // Submission simulation state
      submitContactBtn.disabled = true;
      submitContactBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Submitting Inquiry...';

      setTimeout(() => {
        submitContactBtn.disabled = false;
        submitContactBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Inquiry Received';
        submitContactBtn.className = 'btn btn-nordic-dark w-100 py-3 text-white';

        if (contactSuccessAlert) {
          const clientName = contactName.value.trim();
          contactSuccessAlert.innerHTML = `
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-check-circle-fill text-terracotta fs-3"></i>
              <div>
                <h5 class="font-serif mb-1 fw-bold text-dark">Thank you, ${clientName}</h5>
                <p class="small text-secondary mb-0">Our architectural partners in Copenhagen and Berlin have received your brief. We will review your site specifications and contact you within 24 business hours.</p>
              </div>
            </div>
          `;
          contactSuccessAlert.classList.remove('d-none');
          contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        consultationForm.reset();
      }, 1000);
    });
  }

});
