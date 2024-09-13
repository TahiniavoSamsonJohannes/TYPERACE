const glowingCircle = document.querySelector('.glowing-circle');

let cursorX, cursorY;

document.onmousemove = (e) => {
    cursorX = e.pageX - glowingCircle.offsetWidth / 2;
    cursorY = e.pageY - glowingCircle.offsetHeight / 2;

    glowingCircle.style.left = cursorX + 'px';
    glowingCircle.style.top = cursorY + 'px';
}
