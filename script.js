/*Configure the script to make the animation the way you want*/

var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var _w = w / 2;
var _h = h / 2;

var dp = -0.15;
var t = 0;
var u = 0;

class pt {
  constructor() {
    this.set.apply(this, arguments);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}


function calc(ang, d) {
  const newLocal = 10;
  var p1 = w / newLocal;
  var p2 = h / 2;
  var b = Math.sin(ang + t) + Math.cos(ang + t);

  return new pt(
    _w + (p2 * Math.cos(ang) + p1 * Math.sin(d + 3 * t)) / d + Math.cos(ang) * b,
    _h + (p2 * Math.sin(ang)) / d + Math.sin(ang) * b);
}

function tunnel(ang, deltaA, d, deltaB) {
  var pts = [
    calc(ang, d),
    calc(ang + deltaA, d),
    calc(ang + deltaA, d + deltaB),
    calc(ang, d + deltaB)
  ];
  var i = 0;
  $.beginPath();
  $.moveTo(pts[0].x, pts[0].y);
  while (true) {
    $.lineTo(pts[i].x, pts[i].y);
    if (++i >= pts.length) break;
  }
  $.closePath();
  $.fill();
}

function draw() {
  t += 1 / 90;
  $.fillStyle = 'hsla(2,2%,0%,1)';
  $.fillRect(0, 0, w, h);
  var num = 5;
  var ang = 0;
  var deltaA = Math.PI * 2 / num;
  var d = dp + 10;
  var deltaB = 0.10;
  var dark;
  var lum;

  var i;

  while (true) {
    i = 0;
    while (true) {
      dark = 1 / (Math.max((d + 0.3) - 3, 3));
      if (d <= 1) {
        dark = Math.max(-1, d / 2 * d / 2);
      }
      lum = (225 * (dark * Math.abs(Math.sin(i / num * (Math.PI * 2) + t))));
      lum *= (1.45 + (1.55 * Math.cos((i / num + 1.55) * Math.PI * 3.5)));
      $.fillStyle = 'hsla(' + u + ', 85%,' + lum + '%,4)';
      tunnel(ang, deltaA, d, deltaB);
      ang += deltaA;
      if (++i >= num) break;
    }
    if ((d -= deltaB) <= dp) break;
  }
  if ((dp -= 0.01) <= deltaB) dp += deltaB;
  u -= .1;
}

window.addEventListener('resize',function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, true);

run();

function run() {
  window.requestAnimationFrame(run);
  draw();
}