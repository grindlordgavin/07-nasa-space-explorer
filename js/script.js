const spaceFacts = [
    "Space is completely silent — there's no air to carry sound.",
    "Space smells like burnt steak or welding fumes, according to astronauts.",
    "There’s a giant water reservoir in space — 140 trillion times Earth’s ocean water — near a distant black hole.",
    "A day on Venus is longer than a year on Venus — it takes ~243 Earth days to rotate once, but only ~225 to orbit the Sun.",
    "Neutron stars can spin 600+ times per second — that’s faster than a kitchen blender.",
    "The ISS orbits Earth every 90 minutes, so astronauts see about 16 sunrises and sunsets daily.",
    "One spacesuit costs $12 million — the backpack alone is ~$2 million.",
    "Your height increases in microgravity — astronauts grow up to 2 inches taller in space.",
    "GPS satellites have to account for relativity — without correction, they'd be off by 10km per day.",
    "Your blood would boil in space without a suit due to the lack of pressure.",
    "Saturn could float in water — its average density is less than that of water.",
    "Jupiter’s Great Red Spot is shrinking, but it's still bigger than Earth.",
    "Uranus rotates on its side — its axial tilt is about 98 degrees.",
    "Mars has the tallest volcano in the solar system, Olympus Mons — 3x the height of Everest.",
    "A day on Mercury lasts 176 Earth days.",
    "There are “rogue planets” floating in space not orbiting any star.",
    "A teaspoon of a neutron star would weigh 6 billion tons.",
    "Some stars turn into diamonds — a white dwarf called “Lucy” is essentially a giant space diamond.",
    "Quasars outshine galaxies — some are 1,000× brighter than the entire Milky Way.",
    "There are stars that orbit black holes at nearly light speed.",
];

const spaceFactElement = document.querySelector('.space-fact');
function setSpaceFact() {
    spaceFactElement.textContent = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
}

setSpaceFact();

const baseElement = document.querySelector('.space-image');
baseElement.remove();

const loadingMessage = document.getElementById("loading-message");
loadingMessage.remove();
loadingMessage.style = "";

function createSpaceImage(imageUrl, title, date, hdurl) {
    const result = baseElement.cloneNode(true)

    result.style = '';
    result.href = hdurl;

    result.querySelector('img').src = imageUrl;
    result.querySelector('.space-image-title').textContent = title;

    const [year, month, day] = date.split('-');
    const newDate = new Date(year, month - 1, day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    console.log(date, newDate);
    result.querySelector('.space-image-date').textContent = newDate;

    return result;
}

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getButton = document.getElementById('getButton');
const gallery = document.getElementById('gallery');

const API_KEY = 'gONQQ6bf95QFvuJ7qkN3UxWpqhz8hRGJ4sRrHOtI';

getButton.addEventListener('click', () => {
    console.log(":3");
    console.log(startInput.value, endInput.value);

    while (gallery.firstChild) gallery.firstChild.remove();
    gallery.appendChild(loadingMessage);

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startInput.value}&end_date=${endInput.value}`)
    .then(res => {
        if (!res.ok) throw new Error(res);
        return res.json()
    })
    .then(res => {
        console.log(res);
        // clear gallery
        while (gallery.firstChild) gallery.firstChild.remove();

        for (const imgData of res) {
            gallery.appendChild(
                createSpaceImage(imgData.url, imgData.title, imgData.date, imgData.hdurl)
            );
        }

        setSpaceFact();
    })
    .catch(err => {
        console.error("API Error: ", err);
    });
});

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);
