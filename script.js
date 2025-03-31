async function fetchLogs() {
    try {
        const response = await fetch("/logs");
        const data = await response.json();
        document.getElementById("log-output").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}
