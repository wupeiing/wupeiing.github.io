document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.getElementById('regionSelect');
  const weatherRegion = document.getElementById('weatherRegion');
  const weatherCondition = document.getElementById('weatherCondition');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherHumidity = document.getElementById('weatherHumidity');
  const weatherWind = document.getElementById('weatherWind');
  const localTime = document.getElementById('localTime');
  const localDate = document.getElementById('localDate');

  const weatherData = {
    Taipei: { zone: 'Asia/Taipei', condition: 'Clear', temp: '26°C', humidity: '72%', wind: '12 km/h' },
    Tokyo: { zone: 'Asia/Tokyo', condition: 'Partly Cloudy', temp: '23°C', humidity: '68%', wind: '10 km/h' },
    Berlin: { zone: 'Europe/Berlin', condition: 'Light Rain', temp: '15°C', humidity: '81%', wind: '18 km/h' },
    NewYork: { zone: 'America/New_York', condition: 'Sunny', temp: '21°C', humidity: '55%', wind: '14 km/h' }
  };

  function formatDate(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  function updateWeather(regionKey) {
    const region = weatherData[regionKey];
    if (!region) return;
    const now = new Date();
    const regionTime = formatDate(now, 'en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: region.zone
    });
    const regionDate = formatDate(now, 'en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: region.zone
    });

    weatherRegion.textContent = regionKey.replace(/([A-Z])/g, ' $1').trim();
    weatherCondition.textContent = region.condition;
    weatherTemp.textContent = region.temp;
    weatherHumidity.textContent = region.humidity;
    weatherWind.textContent = region.wind;
    localTime.textContent = regionTime;
    localDate.textContent = regionDate;
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
    regionSelect.addEventListener('change', () => updateWeather(regionSelect.value));
    updateWeather(regionSelect.value);
    setInterval(() => updateWeather(regionSelect.value), 1000);
  }

  highlightNav();
});
