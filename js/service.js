//Movement Animation to happen
const contentor = document.querySelector(".contentor");
//Items
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");

//Animate In
contentor.addEventListener("mouseenter", (e) => {
  //Popout
  second.style.transition = "all 1s ease"
  first.style.transition = "all 1s ease"
  third.style.transition = "all 1s ease"
  first.style.transform = "translateX(100px)";
  second.style.transform = "translateX(150px) translateY(-50px) rotateZ(60deg)";
  third.style.transform = "translateX(50px)";
});
//Animate Out
contentor.addEventListener("mouseleave", (e) => {
  //Popback
  first.style.transform = "translateZ(0px)";
  second.style.transform = "translateZ(0px) rotateZ(0deg)";
  third.style.transform = "translateZ(0px)";
});
