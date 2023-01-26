function Slide(index, title, background, link ) {
   this.title = title;
   this.background = background;
   this.link = link;
   this.id = index;
   this.fullid = "pug-" + index;
}

const Slider = {
   current: 0,
   slides: [],
   initSlider: function(slides){
       let index = 0;
       for (let slide of slides){
           this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
           index++;
       }
       this.buildSlider();
   },
      buildSlider: function() {
       let sliderHTML = "";
       for(let slide of this.slides) {
//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
           sliderHTML +=
               `<div id='slide-${slide.id}' class='singleSlide' style='background-image:url(${slide.background});'>
                  <div class='slideOverlay'>
                    <h2>${slide.title}</h2>
                    <a class='link' href='${slide.link}' target='_blank'>Open</a>
                  </div>
                </div>`;
       }

       document.getElementById("slider").innerHTML = sliderHTML;
       document.getElementById("slide-" + this.current).style.left = 0;
   },
   prevSlide: function() {
       let next;
       if (this.current === 0 ) {
           next = this.slides.length - 1;
       } else {
           next = this.current - 1;
       }

       document.getElementById("slide-" + next).style.left = "-100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

       this.current = next;

   },
   nextSlide: function(){
       let next;
       if (this.current === (this.slides.length - 1) ) {
           next = 0;
       } else {
           next = this.current + 1;
       }

       document.getElementById("slide-" + next).style.left = "100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

       this.current = next;
   },

   hideSlider: function () {
    const btnShow = document.getElementById("show-hide");
     if (document.getElementById("slider").style.display == 'block') {
      document.getElementById("slider").style.display = "none";
      document.getElementById("slider__prev").style.display = "none";
      document.getElementById("slider__next").style.display = "none";
      document.getElementById("start").style.display = "none";

      btnShow.innerHTML = "Show";

     }
     else{
      document.getElementById('slider').style.display = "block";
      document.getElementById("slider__prev").style.display = "inline-block";
      document.getElementById("slider__next").style.display = "inline-block";
      document.getElementById("start").style.display = "inline-block";

      btnShow.innerHTML = "Hide";
     }
   },
   pagin: function(index) {
     this.crrent = index;
   }

}

const prev = document.getElementById('slider__prev');
    prev.addEventListener("click", () => Slider.prevSlide());

const next = document.getElementById('slider__next');
    next.addEventListener("click", () => Slider.nextSlide());

const toggle = document.getElementById('start');
toggle.addEventListener('click', (event)=>{
   if (event.target.classList.contains('start')){
       event.target.innerHTML = 'Start';
       clearInterval(interval)
   } else {
       event.target.innerHTML = 'Stop';
       interval = setInterval(()=>{
           Slider.nextSlide();
       },2000)
   }
   event.target.classList.toggle('start')
});
const pag1 = document.getElementById('btn-0');
  pag1.addEventListener("click", (event)=>Slider.pagin(1));
const pag2 = document.getElementById('btn-1');
  pag1.addEventListener("click", ()=>Slider.pagin(1));
const pag3 = document.getElementById('btn-2');
  pag1.addEventListener("click", ()=>Slider.pagin(2));