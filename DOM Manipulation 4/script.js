// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Change Content
    const contentText = document.getElementById('content-text');
    const btnChangeContent = document.getElementById('btn-change-content');
    
    let isContentChanged = false;
    
    // Add click event listener to the button
    btnChangeContent.addEventListener('click', () => {
        // Manipulate DOM content and basic inline styles
        if (!isContentChanged) {
            contentText.textContent = "✨ The content has been successfully updated using JavaScript! ✨";
            contentText.style.color = "#4f46e5";
            contentText.style.fontWeight = "bold";
            btnChangeContent.textContent = "Reset Content";
        } else {
            contentText.textContent = "This is the original text. Click the button to change me!";
            contentText.style.color = "";
            contentText.style.fontWeight = "normal";
            btnChangeContent.textContent = "Change Content";
        }
        isContentChanged = !isContentChanged;
    });

    // 2. Change Styles
    const styleBox = document.getElementById('style-box');
    const btnChangeStyle = document.getElementById('btn-change-style');
    
    btnChangeStyle.addEventListener('click', () => {
        // Manipulate DOM styles by toggling a CSS class
        // This is generally preferred over extensive inline styles
        styleBox.classList.toggle('new-style');
        
        // Change text based on current state
        if (styleBox.classList.contains('new-style')) {
            styleBox.textContent = "Styled!";
            btnChangeStyle.textContent = "Revert Style";
        } else {
            styleBox.textContent = "I am a box";
            btnChangeStyle.textContent = "Change Style";
        }
    });

    // 3. Change Visibility
    const visibilityBox = document.getElementById('visibility-box');
    const btnToggleVisibility = document.getElementById('btn-toggle-visibility');
    
    btnToggleVisibility.addEventListener('click', () => {
        // Manipulate visibility by toggling a 'hidden' class
        visibilityBox.classList.toggle('hidden');
        
        if (visibilityBox.classList.contains('hidden')) {
            btnToggleVisibility.textContent = "Show Element";
        } else {
            btnToggleVisibility.textContent = "Hide Element";
        }
    });
});
