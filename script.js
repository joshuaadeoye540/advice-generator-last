const API_URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-button");

async function getAdvice() {
  adviceButton.disabled = true;
  adviceText.textContent = "Loading advice...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }

    const data = await response.json();

    // Log the API response for inspection
    console.log(data);

    // Get the advice from the response
    const slip = data.slip;

    // Display the advice ID and text
    adviceId.textContent = slip.id;
    adviceText.textContent = `"${slip.advice}"`;

  } catch (error) {
    adviceText.textContent = "Unable to load advice. Please try again.";
    console.error("Error fetching advice:", error);

  } finally {
    adviceButton.disabled = false;
  }
}

// Load advice when the page opens
getAdvice();

// Load new advice when the dice button is clicked
adviceButton.addEventListener("click", getAdvice);