document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("showMessageBtn");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const messageContainer = document.getElementById("apiMessage");

    // Funktion för att hämta API-meddelandet
    async function fetchApiMessage() {
        try {
            const response = await fetch("api.json"); // Hämtar data från den lokala JSON-filen
            const data = await response.json();
            messageContainer.textContent = data.message; // Uppdaterar pop-up-texten
            popup.style.display = "block"; // Visar pop-up
        } catch (error) {
            console.error("Fel vid hämtning av API-data:", error);
            messageContainer.textContent = "Ett fel inträffade vid hämtning av information.";
            popup.style.display = "block"; // Visar pop-up även om det blir fel
        }
    }

    // När användaren klickar på knappen visas pop-up med API-datan
    button.addEventListener("click", fetchApiMessage);

    // När användaren klickar på "X" stängs pop-upen
    closePopup.addEventListener("click", function() {
        popup.style.display = "none";
    });

    // När användaren klickar utanför pop-upen stängs den
    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
