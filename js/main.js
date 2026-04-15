document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.getElementById('regionSelect');
  const localTime = document.getElementById('localTime');
  const localDate = document.getElementById('localDate');

  function formatDate(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  function updateTime(timeZone) {
    if (!timeZone || !localTime || !localDate) return;
    const now = new Date();
    const regionTime = formatDate(now, 'en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone
    });
    const regionDate = formatDate(now, 'en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone
    });
    const selectedRegion = regionSelect.selectedOptions[0]?.textContent || timeZone;

    localTime.textContent = regionTime;
    localDate.textContent = `${regionDate} — ${selectedRegion}`;
  }

  function highlightNav() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;
    const links = document.querySelectorAll('.nav-link, .sub-nav-link');
    links.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });
  }

  if (regionSelect) {
    regionSelect.addEventListener('change', () => updateTime(regionSelect.value));
    updateTime(regionSelect.value);
    setInterval(() => updateTime(regionSelect.value), 1000);
  }

  highlightNav();
});
