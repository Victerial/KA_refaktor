let scheduleData = {
    days: [
      { name: 'Hétfő', hours: [] },
      { name: 'Kedd', hours: [] },
      { name: 'Szerda', hours: [] },
      { name: 'Csütörtök', hours: [] },
      { name: 'Péntek', hours: [] }
    ]
  };
  
  function localStorageEllenorzes() {
    const storedData = localStorage.getItem('scheduleData');
    if (storedData) {
      scheduleData = JSON.parse(storedData);
    }
  }
  
  function adatHozzaadas(dayIndex, hourText) {
    scheduleData.days[dayIndex].hours.push(hourText);
    tartalomRendereles();
    blackWhiteModMentesALocalStoragebe();
  }
  
  function adatTorle(dayIndex, hourIndex) {
    scheduleData.days[dayIndex].hours.splice(hourIndex, 1);
    tartalomRendereles();
    blackWhiteModMentesALocalStoragebe();
  }
  
  function blackWhiteModValtas() {
    document.body.classList.toggle('night-mode');
  }
  
  function blackWhiteModMentesALocalStoragebe() {
    const nightModeEnabled = document.body.classList.contains('night-mode');
    localStorage.setItem('nightModeEnabled', nightModeEnabled);
  }
  
  function blackWhiteModBeallitasALocalStoragebol() {
    const nightModeEnabled = localStorage.getItem('nightModeEnabled') === 'true';
    if (nightModeEnabled) {
      document.body.classList.add('night-mode');
    }
  }
  
  function localStorageInicializalas() {
    const storedData = localStorage.getItem('scheduleData');
    if (!storedData) {
      localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }
  }
  
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
