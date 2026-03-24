document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Click Event
    const clickBtn = document.getElementById('clickBtn');
    const clickResult = document.getElementById('clickResult');

    clickBtn.addEventListener('click', () => {
        const timestamp = new Date().toLocaleTimeString();
        clickResult.textContent = `Button was clicked at ${timestamp}!`;
        clickResult.style.color = '#27ae60'; // Change color to green on click
    });

    // 2. Hover Event (Mouseover & Mouseout)
    const hoverBox = document.getElementById('hoverBox');
    const hoverResult = document.getElementById('hoverResult');

    hoverBox.addEventListener('mouseover', () => {
        hoverBox.style.backgroundColor = '#2ecc71'; // Change to green
        hoverBox.style.transform = 'scale(1.05)';
        hoverResult.textContent = 'Mouse is currently hovering over the box!';
        hoverResult.style.color = '#e67e22';
    });

    hoverBox.addEventListener('mouseout', () => {
        hoverBox.style.backgroundColor = '#e74c3c'; // Revert to red
        hoverBox.style.transform = 'scale(1)';
        hoverResult.textContent = 'Mouse left the box. Waiting for hover...';
        hoverResult.style.color = '#7f8c8d';
    });

    // 3. Keypress Event (Keydown & Keyup to catch all keys nicely)
    const keyInput = document.getElementById('keyInput');
    const keyResult = document.getElementById('keyResult');

    keyInput.addEventListener('keydown', (event) => {
        keyResult.textContent = `Key pressed down: ${event.key} (Code: ${event.code})`;
        keyResult.style.color = '#2980b9';
    });

    keyInput.addEventListener('keyup', () => {
        // Update to show current value shortly after keyup
        setTimeout(() => {
            if (keyInput.value) {
                keyResult.textContent = `Current input value: ${keyInput.value}`;
                keyResult.style.color = '#8e44ad';
            } else {
                keyResult.textContent = 'Waiting for keypress...';
                keyResult.style.color = '#7f8c8d';
            }
        }, 500); 
    });

    // 4. Submit Event
    const demoForm = document.getElementById('demoForm');
    const formName = document.getElementById('formName');
    const submitResult = document.getElementById('submitResult');

    demoForm.addEventListener('submit', (event) => {
        // Prevent the default form submission (page reload)
        event.preventDefault(); 
        
        const name = formName.value;
        submitResult.textContent = `Form successfully submitted! Hello, ${name}.`;
        submitResult.style.color = '#27ae60';
        submitResult.style.fontWeight = 'bold';
        
        // Clear the form
        demoForm.reset();
        
        setTimeout(() => {
            submitResult.textContent = 'Waiting for submission...';
            submitResult.style.color = '#7f8c8d';
            submitResult.style.fontWeight = 'normal';
        }, 3000);
    });

    // 5. Contest Event Handling
    const startContestBtn = document.getElementById('startContestBtn');
    const clickContestBtn = document.getElementById('clickContestBtn');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const clickScoreDisplay = document.getElementById('clickScore');
    const contestResult = document.getElementById('contestResult');
    const finalScore = document.getElementById('finalScore');
    const contestMessage = document.getElementById('contestMessage');

    let score = 0;
    let timeLeft = 5;
    let timerInterval;

    startContestBtn.addEventListener('click', () => {
        // Reset contest state
        score = 0;
        timeLeft = 5;
        clickScoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        
        contestResult.classList.add('hidden');
        startContestBtn.disabled = true;
        clickContestBtn.disabled = false;
        
        // Start Timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endContest();
            }
        }, 1000);
    });

    clickContestBtn.addEventListener('click', () => {
        if (timeLeft > 0) {
            score++;
            clickScoreDisplay.textContent = score;
        }
    });

    function endContest() {
        clearInterval(timerInterval);
        clickContestBtn.disabled = true;
        startContestBtn.disabled = false;
        startContestBtn.textContent = 'Play Again';
        
        finalScore.textContent = score;
        
        if (score >= 35) {
            contestMessage.textContent = "Incredible speed! You're a clicking master 🏆";
        } else if (score >= 20) {
            contestMessage.textContent = "Great job! Very fast fingers! 👏";
        } else {
            contestMessage.textContent = "Good try! Give it another go! 👍";
        }
        
        contestResult.classList.remove('hidden');
    }

});
