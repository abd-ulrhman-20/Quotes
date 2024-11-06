
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

// Add event listener to the button
document.querySelector('.quotes__btn').addEventListener('click', fetchQuote);

// Fetch the initial quote when the page loads
fetchQuote();