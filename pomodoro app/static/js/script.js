document.addEventListener('DOMContentLoaded', (event) => {
    const clock = document.querySelector('.clock');
    let elapsedTime = 0; // Total elapsed time in seconds
    let interval = null;
    let faceDetected = false;

    const updateTime = () => {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        const digits = clock.querySelectorAll('.digit');
        digits[0].querySelector('.upper').textContent = Math.floor(minutes / 10);
        digits[0].querySelector('.lower').textContent = Math.floor(minutes / 10);
        digits[1].querySelector('.upper').textContent = minutes % 10;
        digits[1].querySelector('.lower').textContent = minutes % 10;
        digits[3].querySelector('.upper').textContent = Math.floor(seconds / 10);
        digits[3].querySelector('.lower').textContent = Math.floor(seconds / 10);
        digits[4].querySelector('.upper').textContent = seconds % 10;
        digits[4].querySelector('.lower').textContent = seconds % 10;
    };

    const startTimer = () => {
        interval = setInterval(() => {
            elapsedTime++;
            updateTime();
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(interval);
    };

    const checkFacePresence = () => {
        // Replace this with a proper server call to get face detection status
        fetch('/face_detection_status') // Placeholder for server-side face detection logic
            .then(response => response.json())
            .then(result => {
                const facesDetected = result.faceDetected;

                if (facesDetected && !faceDetected) {
                    faceDetected = true;
                    startTimer(); // Start the timer when face is detected
                } else if (!facesDetected && faceDetected) {
                    faceDetected = false;
                    stopTimer(); // Stop the timer when no face is detected
                }
            });
    };

    setInterval(checkFacePresence, 1000);
});
