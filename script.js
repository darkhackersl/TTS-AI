// DOM Elements
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const voiceColor = document.getElementById('voiceColor');
const generateButton = document.querySelector('button');
const audioPlayer = document.getElementById('audioPlayer');
const downloadButton = document.getElementById('downloadButton');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const darkModeToggle = document.getElementById('darkModeToggle');

// Event Listeners
generateButton.addEventListener('click', generateSpeech);
speedRange.addEventListener('input', updateSpeed);
darkModeToggle.addEventListener('change', toggleDarkMode);
voiceColor.addEventListener('change', updateVoiceColor);

// Generate Speech Function
async function generateSpeech() {
    const text = textInput.value.trim();
    const voice = voiceSelect.value;

    if (!text) {
        alert('Please enter some text.');
        return;
    }

    // Show generating animation
    const generatingAnimation = document.getElementById('generatingAnimation');
    generatingAnimation.style.display = 'flex';

    const apiUrl = `https://bk9.fun/tools/tts-voices?q=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}`;

    try {
        // Fetch the audio file directly
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch audio.');
        }

        // Get the audio file as a Blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Set the audio URL and play it
        audioPlayer.src = audioUrl;
        audioPlayer.classList.add('show');
        audioPlayer.play();

        // Enable download button
        downloadButton.disabled = false;
        downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `Thenux-tts-${Date.now()}.mp3`;
            link.click();
        };
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating speech.');
    } finally {
        // Hide generating animation
        generatingAnimation.style.display = 'none';
    }
}

// Update Playback Speed
function updateSpeed() {
    const speed = speedRange.value;
    audioPlayer.playbackRate = speed;
    speedValue.textContent = `${speed}x`;
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

// Update Voice Color
function updateVoiceColor() {
    const color = voiceColor.value;
    generateButton.style.backgroundColor = color;
    downloadButton.style.backgroundColor = color;
}
