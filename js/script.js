const baseElement = document.querySelector('.space-image');
baseElement.remove();

function createSpaceImage(imageUrl, title, date, hdurl) {
    const result = baseElement.cloneNode(true)

    result.style = '';
    result.href = hdurl;

    result.querySelector('img').src = imageUrl;
    result.querySelector('.space-image-title').textContent = title;

    // TODO: interpret date
    result.querySelector('.space-image-date').textContent = date;

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

    

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startInput.value}&end_date=${endInput.value}`)
    .then(res => {
        if (!res.ok) throw new Error(res);
        return res.json()
    })
    .then(res => {
        console.log(res);
        // clear gallery
        for (const child of gallery.children) child.remove();

        for (const imgData of res) {
            gallery.appendChild(
                createSpaceImage(imgData.url, imgData.title, imgData.date, imgData.hdurl)
            );
        }
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
