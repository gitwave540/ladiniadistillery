// Function to get correction factor based on temperature
        function getCorrectionFactor(temperature) {
            const alpha = 0.001; // Volumenausdehnung pro °C
            return 1 + alpha * (temperature - 20);
        }

        // Array of philosophical quotes
        const quotes = [
            "Distillation: where science turns raw nature into liquid gold.",
            "In every drop, chemistry meets craftsmanship.",
            "Distilling is science in motion, with flavor as the result.", 
            "The best spirits don’t age—they evolve into liquid wisdom.",
            "A distiller’s dream is not just to create a spirit, but to inspire an experience.",
            "Distillation is the art of patience, where time and temperature dance together.",
            "Crafted by nature, refined by time",
            "From alpine roots to liquid gold",
            "Tradition distilled to perfection",
            "Where time shapes character",
            "Nature, patience, perfection",
            "Authentic craft, timeless taste",
            "Crafted by nature, refined by time",
            "Born where the earth meets the sky",
            "Forged in glaciers, awakened by the sun",
            "Alpine heights, distilled into gold",
            "Time bends, character emerges",
            "The mountains whisper, the spirit answers",
            "Every drop, a summit in itself",
            "Patience carved by stone and wind",
            "Nature’s majesty, captured in crystal",
            "From the heart of the Dolomites, legend flows",
            "Born where the sky kisses the peaks",
            "Crafted by nature, perfected by time",
            "Glacial winds carve its character",
            "Sun, stone, and snow distilled into gold",
            "The mountains speak; this spirit answers",
            "Legends rise with every drop",
            "Time bows to patience, nature to mastery",
            "Where earth’s heart meets heaven’s breath",
            "Peaks immortalized in crystal clarity",    
            " A journey of centuries, held in your hand",
            "Alpine majesty, awakened in every sip",
            "From summit storms to serene valleys, distilled",
            "The spirit that echoes through canyons and clouds",
            "Crafted by the wild, refined by human hands",
            "Heritage etched in stone, elegance poured in glass",
            "Every taste, a tale of altitude and awe",
            "Born of legend, destined for eternity"           
        ];

        function calculate() {
            // Input values
            const liter = parseFloat(document.getElementById("liter").value);
            const promille = parseFloat(document.getElementById("promille").value);
            const targetPromille = parseFloat(document.getElementById("targetPromille").value);
            const addedPromille = parseFloat(document.getElementById("addedPromille").value);
            const temperature = parseFloat(document.getElementById("temperature").value);

            // Ensure values are valid
            if (isNaN(liter) || isNaN(promille) || isNaN(targetPromille) || isNaN(addedPromille) || isNaN(temperature)) {
                alert("Bitte geben Sie gültige Werte ein.");
                return;
            }

            // Apply correction factor for temperature
            const correctionFactor = getCorrectionFactor(temperature);
            const correctedPromille = promille * correctionFactor;

            // Calculations based on promille values
            let addedLiters;
            if (targetPromille > correctedPromille) {
                // Enrichment: Adding higher promille liquid
                if (addedPromille <= targetPromille) {
                    alert("Das zugefügte Promille muss höher als das Ziel-Promille sein.");
                    return;
                }
                addedLiters = ((liter * (targetPromille - correctedPromille)) / (addedPromille - targetPromille));
            } else if (targetPromille < correctedPromille) {
                // Dilution: Adding lower promille liquid
                if (addedPromille >= targetPromille) {
                    alert("Das zugefügte Promille muss niedriger als das Ziel-Promille sein.");
                    return;
                }
                addedLiters = ((liter * (correctedPromille - targetPromille)) / (targetPromille - addedPromille));
            } else {
                alert("Aktuelles und Ziel-Promille sind gleich. Keine Berechnung notwendig.");
                return;
            }

            const totalLiters = liter + addedLiters;

            // Display results
            document.getElementById("addedLiters").textContent = addedLiters.toFixed(2);
            document.getElementById("totalLiters").textContent = totalLiters.toFixed(2);
            document.getElementById("totalPromille").textContent = targetPromille.toFixed(2);

            document.getElementById("results").style.display = "block";

            // Show random philosophical quote
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById("philosophy").textContent = randomQuote;
            document.getElementById("philosophy").style.display = "block";
        }
// ==============================
// IDLE / CINEMA MODE
// ==============================
let timeout;

const content = document.querySelector(".content");
const logo = document.getElementById("fixed-logo");
const video = document.getElementById("bg-video");

function setIdle() {
    if (content) content.classList.add("idle");
    if (logo) logo.classList.add("idle");
    if (video) video.classList.add("idle-video"); // 🎬 Video hervorheben
}

function removeIdle() {
    if (content) content.classList.remove("idle");
    if (logo) logo.classList.remove("idle");
    if (video) video.classList.remove("idle-video");
}

function resetTimer() {
    clearTimeout(timeout);
    removeIdle();
    timeout = setTimeout(setIdle, 30000);
}

// Events
["mousemove", "click", "keydown", "scroll"].forEach(event => {
    document.addEventListener(event, resetTimer);
});

// Start
resetTimer();

const audio = document.getElementById("bg-audio");
const btn = document.getElementById("sound-toggle");

// Make sure loop is on
audio.loop = true;

// Toggle playback with the button (direct user gesture)
btn.onclick = () => {
  if (audio.paused) {
    // Unmute and play directly in button click
    audio.muted = false;
    audio.volume = 0.6;
    audio.play().then(() => {
      btn.textContent = "🔊";
    }).catch(err => {
      console.log("Play blocked by browser:", err);
    });
  } else {
    // Pause and reset
    audio.pause();
    audio.currentTime = 0;
    btn.textContent = "🔇";
  }
};

