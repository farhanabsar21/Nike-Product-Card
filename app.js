const sizes = document.querySelectorAll(".size");
const colors = document.querySelectorAll(".color");
const shoes = document.querySelectorAll(".shoe");
const gradients = document.querySelectorAll(".gradient");
const shoeBg = document.querySelector(".shoeBackground");

let prevColor = "blue";
let animationEnd = true;

// changeSize function
const changeSize = (e) => {
    sizes.forEach(size => size.classList.remove("active"));
    e.target.classList.add("active");
}

// change colors
const changeColor = (e) => {
    if(!animationEnd){
        return;
    }

    let primary = e.target.getAttribute("primary");
    let color = e.target.getAttribute("color");
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    colors.forEach(color => color.classList.remove("active"));
    e.target.classList.add("active");

    document.documentElement.style.setProperty("--primary", primary);

    shoes.forEach(shoe => shoe.classList.remove("show"));
    shoe.classList.add("show");

    gradients.forEach(gradient => gradient.classList.remove("first", "second"));
    gradient.classList.add("first");
    prevGradient.classList.add("second");

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener("animationend", () =>{
        animationEnd = true;
    })
}

// calling the changeSize function
sizes.forEach(size => size.addEventListener("click", changeSize));
colors.forEach(color => color.addEventListener("click", changeColor));


// responsive with javascript

let x = window.matchMedia("(max-width: 1000px)");

const changeHeight = () =>{
    if(x.matches){
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}
window.addEventListener("resize", changeHeight);