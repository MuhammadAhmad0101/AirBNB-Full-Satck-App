const closeButton = document.querySelector(".close-svg");
const box = document.querySelector(".Flash-center");
closeButton.addEventListener("click", () => {
      box.style.display = "none";
});
// Save scroll position
window.addEventListener("beforeunload", function () {
      localStorage.setItem("scrollPosition", window.scrollY);
});

// Restore scroll position
window.addEventListener("load", function () {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
      }
});
