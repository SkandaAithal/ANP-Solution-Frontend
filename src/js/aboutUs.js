let animateImg = document.querySelectorAll(".animate-img");
let count = 0;
setInterval(() => {
  if (count == 0) {
    animateImg[count].classList.add("active");
    animateImg[animateImg.length - 1].classList.remove("active");
    count++;
  } else if (count == animateImg.length - 1) {
    animateImg[count].classList.add("active");
    animateImg[count - 1].classList.remove("active");
    count = 0;
  } else {
    animateImg[count - 1].classList.remove("active");
    animateImg[count + 1].classList.remove("active");
    animateImg[count].classList.add("active");
    count++;
  }
}, 1000);
