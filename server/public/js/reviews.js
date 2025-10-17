const stars = document.querySelectorAll(".bi-star-fill");
const ratingInput = document.getElementById("reviewRating");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");
    ratingInput.value = value;

    stars.forEach(s => {
      if (s.getAttribute("data-value") <= value) {
        s.classList.add("text-yellow-500");
      } else {
        s.classList.remove("text-yellow-500");
      }
    });
  });
});
