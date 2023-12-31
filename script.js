function smooth () {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  
}

function page1and2 () {
  gsap.to("#nav svg",{
    rotate: "90deg",
    scrollTrigger : {
        trigger:"#scroll h1",
        scroller:"#main",
        start:"top 95%",
        end:"top 85%",
        scrub:1
    }
  })
  
  gsap.to("#scroll h1",{
      transform: "translateX(-100%)",
      scrollTrigger : {
          trigger:"#scroll h1",
          scroller:"#main",
          // markers:true,
          start:"top 80%",
          end:"top -100%",
          scrub:4
      }
  })
  
  
}

function page2 () {
  var allh1 = document.querySelectorAll("#page2 h1");
  allh1.forEach(function (elem){
    var cluter = ""
    var h1text = elem.textContent
    var splited = h1text.split("")
    splited.forEach(function (e){
      cluter += `<span>${e}</span>`
    }) 
    elem.innerHTML = cluter
  })
  
  gsap.to("#page2 h1 span",{
    color:"white",
    stagger:.1,
    scrollTrigger: {
      trigger:"#page2 h1",
      scroller:"#main",
      // markers:true,
      start:"top 70%",
      end: "top -80%",
      scrub:5,
    }
  })
}


function imgfot () {
  gsap.from("#img-nav .img-elem,#mid h4",{
    z:100,
    stagger:.3,
    duration:1,
    delay:.5,
    opacity:0,
    scrollTrigger: {
      // markers:true,
      trigger: "#page3",
      scroller:"#main",
      start: "top 60%",
      // markers:true,
      end:"top 20%",
      scrub:5,
    }
  })
  
  gsap.from("#img-nav .img-elem1",{
    y:100,
    stagger:.1,
    duration:1,
    delay:.5,
    opacity:0,
    scrollTrigger: {
      // markers:true,
      trigger: "#page3",
      scroller:"#main",
      start: "top 10%",
      end:"top -30%",
      scrub:5,
    }
  })
  
}
smooth ();
page1and2 ();
page2 ();
imgfot ();
