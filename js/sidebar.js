document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navSidebar = document.getElementById("navSidebar");
    const closeNav = document.getElementById("closeNav");

    menuBtn.addEventListener("click", () => {
        navSidebar.classList.add("open");
    });

    closeNav.addEventListener("click", () => {
        navSidebar.classList.remove("open");
    });
});