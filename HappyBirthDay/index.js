const contentLetterSrart_actived = "Gửi đến Mốc, Người bạn thật đặc biệt, Của tôi!" //Lời mở đầu cho bức thư
const mainContentLetter = "Chào Mốc, chắc hôm nay là sinh nhật của m đúng không? Năm trước hình như t có nói là sẽ chúc mừng sinh nhật m nhưng chưa làm được thì phải. Vậy năm nay dành cái này cho m , lần chúc đầu tiên và ... . Chúc mừng sinh nhật Vi! tm." //Nội dung của bức thư

// Gắn 1 đường link ảnh bất kì
let imgStart = document.querySelector(".myAI"); //Hình ảnh xuất hiện trong lời mở đầu của bức thư
imgStart.src = "anh/moc.jpg";

// Gắn 1 link ảnh bất kì
let imgLetter = document.querySelector(".img");
imgLetter.src = "anh/cute-young-boy-kid-wearing-vest-and-hat-free-png (1).png"; //Hình ảnh xuất hiện trong nội dung của bức thư sau khi bức thư được viết ra hết

const splitContentLetterSrart_actived = contentLetterSrart_actived.split("");
document.querySelector('.recieve').style.display = "none";
let run = false
document.querySelector(".sticker").addEventListener("click", function () { //Hiệu ứng gõ chữ cho phần mở đầu của bức thư
  if (!run){
    run = true;
  
  document.querySelector(".contentLetter").innerHTML = "";
    document.querySelector(".startLetter").classList.add("active")
    
    setTimeout(() => {
        splitContentLetterSrart_actived.forEach((val, index) => {
            setTimeout(() => {
                document.querySelector(".contentLetter").innerHTML += val;
                if (index == contentLetterSrart_actived.length - 1) {
                    setTimeout(() => {
                        document.querySelector(".recieve").setAttribute("style", "opacity: 1; transition: 1s") 
                        document.querySelector(".recieve").style.display = "block";
                    }, 1000)
                }
            }, 90 * index)
        })
    }, 1000)
  }
});


let isRunning = false;

document.querySelector("#mess").addEventListener("change", function () {
  if (!isRunning) {
    isRunning = true; // Corrected variable name from run to isRunning

    if (this.checked == true) {
      document.querySelector(".content").classList.add("actived");

      const mainContent = document.querySelector(".mainContent");
      // Clear the existing content before adding new text
      mainContent.innerHTML = "";

      const splitMainContentLetter = mainContentLetter.split("");

      splitMainContentLetter.forEach((val, index) => {
        const effectType = setTimeout(() => {
          mainContent.innerHTML += val;
          mainContent.scrollTop = mainContent.scrollHeight;
          if (index == mainContentLetter.length - 1) {
            document.querySelector(".img1").setAttribute("style", "opacity: 1; transition: .5s");
            clearTimeout(effectType);
            isRunning = false; // Reset the flag after animation is complete
          }
        }, 90 * index);
      });
    } else {
      document.querySelector(".content").classList.remove("actived");
      document.querySelector(".img1").setAttribute("style", "opacity: 0; transition: .5s");

      // Clear the content when the checkbox is unchecked
      document.querySelector(".mainContent").innerHTML = "";

      isRunning = false; // Reset the flag when the checkbox is unchecked
    }
  }
});


let getTypeDevice;
let createLight;
document.querySelector(".recieve").addEventListener("click", () => {
    document.querySelector(".startLetter").classList.add("close");
    setTimeout(() => {
        document.querySelector(".startForm").classList.add("close");
        setTimeout(() => {
            document.querySelector(".startForm").setAttribute("style", "bottom: 100%");
        }, 500)
    }, 500)
})

document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('playAudio').play();
    document.removeEventListener('click', musicPlay);
}
// Animation Drop light _ Tạo hiệu ứng kim tuyến rơi
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = 50,
    mouse = {
      x: -100,
      y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
image.src = 'anh/6596527.png'
for (var i = 0; i < thingsCount; i++) {
  let opacity = Math.random() + 0.4;
  let thingWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
  let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
  let speed = Math.random() * 1 + 0.5;
  things.push({
    width: thingWidth,
    height: thingHeight,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - thingHeight,
    speed: speed,
    vY: speed,
    vX: 0,
    d: Math.random() * 1.2 - 0.6, // wind or something like that
    stepSize: (Math.random()) / 20,
    step: 0,
    angle: Math.random() * 180 - 90,
    rad: Math.random(),
    opacity: opacity,
    _ratate: Math.random() // ratate 正負
  });
}

function drawThings() {
  things.map((thing) => {
    ctx.beginPath();
    thing.rad = (thing.angle * Math.PI) / 180;
    ctx.save();
    var cx = thing.x + thing.width / 2;
    var cy = thing.y + thing.height / 2;
    ctx.globalAlpha = thing.opacity;
    ctx.setTransform(
      Math.cos(thing.rad),
      Math.sin(thing.rad),
      -Math.sin(thing.rad),
      Math.cos(thing.rad),
      cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
      cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
    );
    ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    ctx.restore();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawThings();
}

function update() {
  things.map((thing) => {
    var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
    
    if (dist < minDist) {
      var force = minDist / (dist * dist),
          xcomp = (mouse.x - thing.x) / dist,
          ycomp = (mouse.y - thing.y) / dist,
          deltaV = force * 2; // deplay when hover mouse

      thing.vX -= deltaV * xcomp;
      thing.vY -= deltaV * ycomp;
      
      if (thing.d * xcomp > 0) {
        thing.d = 0 - thing.d;
      }
    } else {
      thing.vX *= .98;

      if (thing.vY < thing.speed) {
        thing.vY = thing.speed
      }

      thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
    }
    
    thing.y += thing.vY;
    thing.x += thing.vX + thing.d;
    
    var _angle = Math.random() + 0.2;
    // stuff.angle += _angle;
    if (thing._ratate == 0) {
      thing.angle += _angle;
    } else {
      thing.angle -= _angle;
    }
    
    if (thing.y > canvas.height) {
      reset(thing);
    }

    if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
      reset(thing);
    }
  });
}

function reset(thing) {
  thing.opacity = Math.random() + 0.4;
  thing.width = (Math.floor(Math.random() * 20) + 20) * (thing.opacity + 0.4);
  thing.height = image.naturalHeight / image.naturalWidth * thing.width;
  thing.x = Math.floor(Math.random() * canvas.width);
  thing.y = 0 - thing.height;
  thing.speed = Math.random() * 1 + 0.5
  thing.vY = thing.speed;
  thing.vX = 0;
  // thing.angle = 0;
  // thing.size = 0;
  thing._ratate = Math.random();
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
