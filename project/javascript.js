// Változók inicializálása
let scheduleData = {
    days: [
      { name: 'Hétfő', hours: [] },
      { name: 'Kedd', hours: [] },
      { name: 'Szerda', hours: [] },
      { name: 'Csütörtök', hours: [] },
      { name: 'Péntek', hours: [] }
    ]
  };
  
  // Lokális tárolóban tárolt adatok ellenőrzése
  function localStorageEllenorzes() {
    const storedData = localStorage.getItem('scheduleData');
    if (storedData) {
      scheduleData = JSON.parse(storedData);
    }
  }
  
  // Adat hozzáadása a változóhoz
  function adatHozzaadas(dayIndex, hourText) {
    scheduleData.days[dayIndex].hours.push(hourText);
    tartalomRendereles();
    blackWhiteModMentesALocalStoragebe();
  }
  
  // Adat eltávolítása a változóból
  function adatTorle(dayIndex, hourIndex) {
    scheduleData.days[dayIndex].hours.splice(hourIndex, 1);
    tartalomRendereles();
    blackWhiteModMentesALocalStoragebe();
  }
  
  // Sötét és világos mód váltása
  function blackWhiteModValtas() {
    document.body.classList.toggle('night-mode');
  }
  
  // Sötét és világos mód beállítása a lokális tárolóban
  function blackWhiteModMentesALocalStoragebe() {
    const nightModeEnabled = document.body.classList.contains('night-mode');
    localStorage.setItem('nightModeEnabled', nightModeEnabled);
  }
  
  // Sötét és világos mód beállítása a lokális tárolóból
  function blackWhiteModBeallitasALocalStoragebol() {
    const nightModeEnabled = localStorage.getItem('nightModeEnabled') === 'true';
    if (nightModeEnabled) {
      document.body.classList.add('night-mode');
    }
  }
  
  // Lokális tároló inicializálása, ha nincs adat
  function localStorageInicializalas() {
    const storedData = localStorage.getItem('scheduleData');
    if (!storedData) {
      localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }
  }
  
  // Megjelenítés generálása
  function tartalomRendereles() {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';
  
    scheduleData.days.forEach((day, index) => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerHTML = `<h2>${day.name}</h2>`;
  
      day.hours.forEach((hour, hourIndex) => {
        const hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');
        hourDiv.innerHTML = `<span>${hour}</span><button onclick="adatTorle(${index}, ${hourIndex})">Törlés</button>`;
        dayElement.appendChild(hourDiv);
      });
  
      const addHourButton = document.createElement('button');
      addHourButton.classList.add('addHourButton');
      addHourButton.textContent = 'Óra Hozzáadása';
      addHourButton.addEventListener('click', function() {
        const hourText = prompt('Adja meg az órát:');
        if (hourText) {
          adatHozzaadas(index, hourText);
        }
      });
  
      dayElement.appendChild(addHourButton);
      daysContainer.appendChild(dayElement);
    });
  }
  
  // Események kezelése
  document.addEventListener('DOMContentLoaded', function() {
    localStorageEllenorzes();
    localStorageInicializalas();
    tartalomRendereles();
    blackWhiteModBeallitasALocalStoragebol();
  
    const nightModeToggle = document.getElementById('nightModeToggle');
    nightModeToggle.addEventListener('click', function() {
      blackWhiteModValtas();
      blackWhiteModMentesALocalStoragebe();
    });
  });