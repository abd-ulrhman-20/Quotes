async function fetchQuote() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const quote = data.slip.advice;
        const slip_id = data.slip.id;
        // Update the text and counter
        document.querySelector('.quotes__text').textContent = `"${quote}"`;
        document.querySelector('.quotes__number').textContent = `ADVICE #${slip_id}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.querySelector('.quotes__text').textContent = "Sorry, couldn't fetch advice. Please try again!";
    }
}

// Fetch the initial quote when the page loads
fetchQuote();
async function fetchQuoteById(id) {
    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
        const data = await response.json();
        const quote = data.slip.advice;
        const slip_id = data.slip.id;
        // Update the text and counter
        document.querySelector('.quotes__text').textContent = `"${quote}"`;
        document.querySelector('.quotes__number').textContent = `ADVICE #${slip_id}`;
    } catch (error) {
        console.error('Error fetching quote by ID:', error);
        document.querySelector('.quotes__text').textContent = `Sorry, we couldn't find any advice with the specified ID: ${id}.` ;
    }
}

async function fetchQuoteByKeyword(keyword) {
    try {
        const response = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`);
        const data = await response.json();
        if (data.slips && data.slips.length > 0) {
            const quote = data.slips[0].advice; // Use the first result
            const slip_id = data.slips[0].id;
            // Update the text and counter
            document.querySelector('.quotes__text').textContent = `"${quote}"`;
            document.querySelector('.quotes__number').textContent = `ADVICE #${slip_id}`;
        } else {
            document.querySelector('.quotes__text').textContent = `No advice found for "${keyword}".`;
        }
    } catch (error) {
        console.error('Error fetching quote by keyword:', error);
        document.querySelector('.quotes__text').textContent = "Sorry, couldn't fetch advice by keyword. Please try again!";
    }
}

// Add event listener to the advice button
document.querySelector('.quotes__btn').addEventListener('click', fetchQuote);

// Event listener for search by ID
document.querySelector('.quotes__search--id button').addEventListener('click', () => {
    const id = document.querySelector('.quotes__search--id input').value;
    if (id) {
        fetchQuoteById(id);
    }
});

// Event listener for search by keyword
document.querySelector('.quotes__search--word button').addEventListener('click', () => {
    const keyword = document.querySelector('.quotes__search--word input').value;
    if (keyword) {
        fetchQuoteByKeyword(keyword);
    }
});

