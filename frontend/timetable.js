const hours = [ "08:00 <br> 08:50", "08:50 <br> 09:40", "09:50 <br> 10:50", "10:50 <br> 11:45", "12:00 <br> 12:50", "12:50 <br> 13:40", "13:40 <br> 14:30"];
const days = [ { name: "Lunedì", id: 0 }, { name: "Martedì", id: 1 }, { name: "Mercoledì", id: 2 }, { name: "Giovedì", id: 3 }, { name: "Venerdì", id: 4 } ];

const timetable = document.getElementById('timetable');
timetable.style.display = 'none';
const hourColumn = document.createElement('div');
const hourHeader = document.createElement('div');

const classSelect = document.getElementById('classSelect');
const profSelect = document.getElementById('profSelect');
const roomSelect = document.getElementById('roomSelect');
const themeButtons = document.getElementById('buttons');
const theme = document.getElementById('themeToggle');

const select = [{"element":classSelect, "cosa": "classe"}, {"element":profSelect, "cosa": "prof"}, {"element":roomSelect, "cosa": "aula"}]
const opt = ["classe", "aula", "materia", "prof"];
const themes = [{"theme": "default", "primary": "#04524e", "subtitle": "#087772", "secondary": "#f2f2f2", "accents": "#91801f", "container": "#d1ebe2", "background": "#f2f2f2"},
                {"theme": "pink", "primary": "#96032d", "subtitle": "#ba0f40", "secondary": "#fff2f6", "accents": "#91801f", "container": "#fce6ed", "background": "#f2f2f2"},
                {"theme": "brown", "primary": "#752404", "subtitle": "#992f05", "secondary": "#fff6f2", "accents": "#91801f", "container": "#e3dedc", "background": "#f2f2f2"},
                {"theme": "blue", "primary": "#0e0552", "subtitle": "#180b7a", "secondary": "#f4f2ff", "accents": "#91801f", "container": "#d8d5f0", "background": "#f2f2f2"}
            ];
const darkThemes = [{"theme": "default", "primary": "#04524e", "subtitle": "#087772", "secondary": "#02211f", "accents": "#91801f", "container": "#052b29", "background": "#f2f2f2"},
                    {"theme": "pink", "primary": "#96032d", "subtitle": "#ba0f40", "secondary": "#160d10", "accents": "#91801f", "container": "#2f191f", "background": "#f2f2f2"},
                    {"theme": "brown", "primary": "#752404", "subtitle": "#992f05", "secondary": "#1b0c06", "accents": "#91801f", "container": "#2d1106", "background": "#f2f2f2"},
                    {"theme": "blue", "primary": "#0e0552", "subtitle": "#180b7a", "secondary": "#050211", "accents": "#91801f", "container": "#080429", "background": "#f2f2f2"}
            ];


// Create hour column
hourColumn.className = 'hour-column';
hourHeader.className = 'timetable-header-cell';
hourHeader.textContent = 'Ora';
hourColumn.appendChild(hourHeader);

hours.forEach(hour => {
    const hourCell = document.createElement('div');
    hourCell.className = 'timetable-hour-cell';
    hourCell.innerHTML = hour;
    hourColumn.appendChild(hourCell);

    if (hour==hours[1] || hour==hours[3]) {
        const hourCell = document.createElement('div');
        hourCell.className = 'break-cell';
        hourColumn.appendChild(hourCell);
    }
});

timetable.appendChild(hourColumn);


// Create day columns
days.forEach(day => {
    const dayColumn = document.createElement('div');
    dayColumn.className = 'day-column';

    const dayHeader = document.createElement('div');
    dayHeader.className = 'timetable-header-cell';
    dayHeader.textContent = day.name;
    dayColumn.appendChild(dayHeader);

    hours.forEach((hour, hourIndex) => {
        const hourDayRow = document.createElement('div');
        hourDayRow.className = 'hour-day-row';

        const hourCell = document.createElement('div');
        hourCell.className = 'timetable-cell hour-cell';
        hourCell.innerHTML = hour;
        hourDayRow.appendChild(hourCell);

        const materiaCell = document.createElement('div');
        materiaCell.id = `materia_${day.id+1}_${hourIndex+1}`;
        materiaCell.className = 'timetable-cell';
        materiaCell.textContent = `Materia ${hourIndex + 1}`;
        hourDayRow.appendChild(materiaCell);

        dayColumn.appendChild(hourDayRow);

        timetable.appendChild(dayColumn);


        if (hour==hours[1] || hour==hours[3]) {
            const hourDayRow = document.createElement('div');
            hourDayRow.className = 'break-row';

            const hourCell = document.createElement('div');
            hourCell.className = 'break-cell';
            hourDayRow.appendChild(hourCell);

            dayColumn.appendChild(hourDayRow);

            timetable.appendChild(dayColumn);
        }
    });
});

//add options to select
select.forEach(e => updateOption(e.cosa, e.element));

//add themes
let currentTheme = 'default';
themes.forEach(e => {
    const button = document.createElement('button');
    button.className = 'round-button';
    button.id = e.theme;
    button.style.backgroundColor = e.primary;
    button.addEventListener('click', () => {
        const darkMode = document.body.classList.contains('dark-mode');
        if (darkMode) el = darkThemes.find(el => el.theme === e.theme);
        else el = e;
        changeTheme(el.primary, el.secondary, el.subtitle, el.accents, el.container, el.background);
        currentTheme = el.theme;
        for (let i = 0; i < themes.length; i++) {
            if (themes[i].theme !== el.theme) {
                document.getElementById(themes[i].theme).style.display = 'flex';
            } else {
                document.getElementById(themes[i].theme).style.display = 'none';
            }
        }   
        getCurrentDiv();     
    });
    if (e.theme === currentTheme) {
        button.style.display = 'none';
    }
    themeButtons.appendChild(button);
});

function getCurrentDiv(){
    const day = new Date().getDay();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    let school_hour;
    if (hour < 8 || hour > 14){
        return null;
    }else if(hour === 8){
        if(minutes < 50 && seconds < 60){
            school_hour = 1;
        }else{
            school_hour = 2;
        }
    } else if(hour === 9){
        if (minutes < 40 && seconds < 60){
            school_hour = 2;
        }else{
            school_hour = 3;
        }
    } else if(hour === 10){
        if (minutes < 50 && seconds < 60){
            school_hour = 3;
        }else{
            school_hour = 4;
        }
    } else if(hour === 11){
        if (minutes < 45 && seconds < 60){
            school_hour = 4;
        }else{
            school_hour = 5;
        }
    } else if(hour === 12){
        if (minutes < 50 && seconds < 60){
            school_hour = 5;
        }else{
            school_hour = 6;
        }
    } else if(hour === 13){
        if (minutes < 40 && seconds < 60){
            school_hour = 6;
        }else{
            school_hour = 7;
        }
    } else if(hour === 14){
        if (minutes < 30 && seconds < 60){
            school_hour = 7;
        }else{
            return null;
        }
    } else {
        return null;
    }
    //const div = document.getElementById(`materia_1_1`);
    const div = document.getElementById(`materia_${day}_${school_hour}`);
    // change color of the text and make it bold
    div.style.color = document.documentElement.style.getPropertyValue("--primary-color");
    div.style.fontWeight = "bold";
}

// Event listeners for select
classSelect.addEventListener('change', () => {
    update("classe", classSelect.value);
    timetable.style.display = 'flex';
    getCurrentDiv();
});

profSelect.addEventListener('change', () => {
    update("prof", profSelect.value);
    timetable.style.display = 'flex';
    getCurrentDiv();
});

roomSelect.addEventListener('change', () => {
    update("aula", roomSelect.value);
    timetable.style.display = 'flex';
    getCurrentDiv();
});

document.body.classList.add('dark-mode');
let them = darkThemes.find(el => el.theme === currentTheme);
changeTheme(them.primary, them.secondary, them.subtitle, them.accents, them.container, them.background);
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('dark-mode')) {
        them = darkThemes.find(el => el.theme === currentTheme);
        changeTheme(them.primary, them.secondary, them.subtitle, them.accents, them.container, them.background);
    } else {
        them = themes.find(el => el.theme === currentTheme);
        changeTheme(them.primary, them.secondary, them.subtitle, them.accents, them.container, them.background);
    }
});


function update(search, what) {
    clearOption(search);
    fetch('https://orario-marconi.martagenovese.com/api?' + search + '=' + what)
        .then(response => response.json())
        .then(data => {
            data.forEach(ora =>{
                //console.log(ora);
                const cell = document.getElementById(`materia_${ora.giorno}_${ora.ora}`);
                var s = "";
                if(cell.innerHTML !== ""){
                    s+=cell.innerHTML;
                    s+=("<br>");
                    s+=(ora.prof.substring(0,14));
                }else{
                    opt.forEach((e, index) => {
                        if(e !== search){
                            s+=(ora[e].substring(0,14));
                            if(index !== opt.length - 1)
                                s+=("<br>");
                        }
                    });
                }
                
                cell.innerHTML = s;
                //cell.innerHTML = `${ora.materia}<br>${ora.prof}<br>${ora.aula}<br>${ora.classe}`;
            });
        });
}

function clearOption(skip) {
    for (let i = 0; i < select.length; i++) {
        if(select[i].cosa !== skip){
            select[i].element.selectedIndex = 0;
        }
    }

    for (let i = 1; i <= 5 ; i++) {
        for (let j = 1; j <= 7; j++) {
            document.getElementById(`materia_${i}_${j}`).innerHTML="";
        }   
    }
}

function updateOption(what, element) {
    fetch('https://orario-marconi.martagenovese.com/api?all='+what)
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                element.appendChild(createOptions(e[what]));
            });
        });
}

function createOptions(data) {
    const options = document.createElement('option');
    options.value = data;
    options.innerHTML = data;
    return options;
}

function changeTheme(primary, secondary, subtitle, accents, container, background) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--subtitle-color', subtitle);
    document.documentElement.style.setProperty('--accents-color', accents);
    document.documentElement.style.setProperty('--container-color', container);
    document.documentElement.style.setProperty('--background-color', background);
    if (document.body.classList.contains('dark-mode')) document.documentElement.style.setProperty('--cell-color', '#ffffff');
    else document.documentElement.style.setProperty('--cell-color', '#000000');
}