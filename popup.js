document.getElementById("save-url").addEventListener("click", async () => {
    const statusElement = document.getElementById("status");

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;
        const datetime = new Date().toLocaleString("en-US", { hour12: false });

        const response = await fetch('<SCRIPT_URL>', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ datetime, url })
        });

        const result = await response.json();
        if (result.status === "success") {
            statusElement.textContent = "URL saved successfully!";
        } else if (result.status === "duplicate") {
            statusElement.textContent = "URL has already been saved!";
        } else {
            statusElement.textContent = "Failed to save the URL.";
        }
    } catch (error) {
        statusElement.textContent = "Error: " + error.message;
    }
});
