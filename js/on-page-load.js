// Most of this logic is AI-copied; digest and try to understand the logic at some point

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('columns');
  const columns = container.querySelectorAll('column');
  const leftArrow = document.querySelector('.nav-arrow.left');
  const rightArrow = document.querySelector('.nav-arrow.right');
  const header = document.querySelector('.page-header'); 

  const isMobile = window.innerWidth < 768;
  
  if (!container || !columns.length) return;

  // --- MOBILE ONLY LOGIC ---
  if (isMobile && leftArrow && rightArrow) {
    
    function getRemValue() {
      const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return htmlFontSize;
    }

    function isMiddleColumnCentered(container, column_index) {
     
    }

    function updateArrowVisibility() {
      const scrollY = window.scrollY;
      const headerHeight = header ? header.offsetHeight : 80;
      const remVal = getRemValue();
      
      // check if the user has scrolled past the header
      const isPastHeader = scrollY > headerHeight;

      // check if the middle column is in the center of the viewport
      const viewportCenter = container.scrollLeft + container.clientWidth / 2;
      const columnCenter = columns[1].offsetLeft + columns[1].clientWidth / 2;
      const tolerance = 2; // pixels
      const isMiddleColumnCentered = Math.abs(viewportCenter - columnCenter) < tolerance;
      const distFromCenter = viewportCenter - columnCenter

      // Hide arrow if more than 1rem from the center of the scrollable area
      const showLeft = isPastHeader && (distFromCenter > -remVal);
      const showRight = isPastHeader && (distFromCenter < remVal);

      // Apply classes
      if (showLeft) leftArrow.classList.remove('hidden');
      else leftArrow.classList.add('hidden');

      if (showRight) rightArrow.classList.remove('hidden');
      else rightArrow.classList.add('hidden');
    }

    // --- NEW: CLICK HANDLERS ---
    leftArrow.addEventListener('click', () => {
      const scrollAmount = container.clientWidth * 0.85; // Scroll 85% of screen width
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      // Re-check visibility immediately after click
      requestAnimationFrame(updateArrowVisibility);
    });

    rightArrow.addEventListener('click', () => {
      const scrollAmount = container.clientWidth * 0.85;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      requestAnimationFrame(updateArrowVisibility);
    });
    // -------------------------

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateArrowVisibility);
    });

    container.addEventListener('scroll', () => {
      requestAnimationFrame(updateArrowVisibility);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        updateArrowVisibility();
      } else {
        leftArrow.classList.add('hidden');
        rightArrow.classList.add('hidden');
      }
    });

    updateArrowVisibility();
  }
  else if (leftArrow && rightArrow) {
      leftArrow.classList.add('hidden');
      rightArrow.classList.add('hidden');
  }

  // --- MIDDLE COLUMN SCROLL LOGIC (Global) ---
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const middleIndex = Math.floor(columns.length / 2);
  const targetColumn = columns[middleIndex];

  // Reveal after scroll completes
  requestAnimationFrame(() => {
    container.classList.add('visible');
  });

  setTimeout(() => {
    const containerWidth = container.clientWidth;
    const columnWidth = targetColumn.clientWidth;
    const scrollPos = targetColumn.offsetLeft - (containerWidth / 2) + (columnWidth / 2);

    container.scrollTo({ left: scrollPos, behavior: 'auto' });
    
    if (isMobile && leftArrow && rightArrow) {
      updateArrowVisibility();
    }

    container.classList.add('loaded');
  }, 100);

  // setTimeout(() => {
    // document.body.classList.add('loaded');
    // 
  // })
});
