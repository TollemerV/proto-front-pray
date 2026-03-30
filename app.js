/**
 * PrayLink — App Sociale Chrétienne
 * Navigation et micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Screen Navigation ---
  const navItems = document.querySelectorAll('.nav-item[data-screen]');
  const screens = document.querySelectorAll('.screen');

  function switchScreen(screenId) {
    // Hide all screens
    screens.forEach(s => s.classList.remove('active'));
    // Show target
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }

    // Update nav active state
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screenId);
    });
  }

  // Make switchScreen global for inline onclick
  window.switchScreen = switchScreen;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchScreen(item.dataset.screen);
    });
  });

  // --- Church Tabs ---
  const churchTabs = document.querySelectorAll('.church-tab');
  const tabContents = document.querySelectorAll('.church-tab-content');

  churchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;

      // Update active tab
      churchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding content
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabId}`);
      });
    });
  });

  // --- Pray Button Interaction ---
  document.querySelectorAll('.pray-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('.action-icon');

      if (btn.classList.contains('active')) {
        icon.classList.add('pray-animate');
        setTimeout(() => icon.classList.remove('pray-animate'), 400);
      }
    });
  });

  // --- Like Button Interaction ---
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('.action-icon');

      if (btn.classList.contains('active')) {
        icon.classList.add('pray-animate');
        setTimeout(() => icon.classList.remove('pray-animate'), 400);
      }
    });
  });

  // --- Pray Small Button (Church prayers) ---
  document.querySelectorAll('.pray-small-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('prayed')) {
        btn.classList.add('prayed');
        btn.style.background = 'var(--accent-pray)';
        btn.style.color = 'white';
        btn.innerHTML = '✓ Prié';

        // Update count
        const footer = btn.closest('.prayer-request-footer');
        const countEl = footer.querySelector('.prayer-count');
        const match = countEl.textContent.match(/(\d+)/);
        if (match) {
          const newCount = parseInt(match[1]) + 1;
          countEl.textContent = `🙏 ${newCount} personnes prient`;
        }
      }
    });
  });

  // --- Event Attend Button ---
  document.querySelectorAll('.event-attend-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('attending')) {
        btn.classList.add('attending');
        btn.textContent = '✓ Inscrit';
        btn.style.background = 'var(--accent-blue)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--accent-blue)';
      }
    });
  });

  // --- Story hover effect ---
  document.querySelectorAll('.story-avatar').forEach(avatar => {
    avatar.addEventListener('click', () => {
      avatar.style.transform = 'scale(0.92)';
      setTimeout(() => {
        avatar.style.transform = 'scale(1)';
      }, 150);
    });
  });

});
