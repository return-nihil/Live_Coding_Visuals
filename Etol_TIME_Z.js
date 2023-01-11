'use babel'

export default function(p) {

// CREATE WINDOW
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    windowsize = p.windowHeight;
    console.log(p.windowHeight)
  }

// USER VARIABLES
  var globaltime = 10;
  const kicks = ["gabba", "gabbaloud", "kit1", "kit2", "kit3", "nx", "ux", "phil", "sx", "kk", "bd"]
  const hats = ["hsn", "phsn", "chsn", "ghsn", "cry"]
  const highs = ["cp", "glitch", "insect"]
  const lows = ["bass0", "bass2", "bass3", "bassdm"]
  const long = ["ls", "vex"]


// INIT
  var framerate = 3;
  var start = 0;
  var pos1 = [0, 0];
  var pos2 = [0, p.windowHeight/2];
  var pos3 = [p.windowWidth/3, 0];
  var pos4 = [p.windowWidth/3, p.windowHeight/2];
  var pos5 = [(p.windowWidth/3)*2, 0];
  var pos6 = [(p.windowWidth/3)*2, p.windowHeight/2];
  var shift = (p.windowWidth/3)/2 - 10;
  var centerx = (p.windowWidth/3/2);
  var centery = (p.windowHeight/2/2);
  var timewidget = 0;


  p.setup = () => {
    p.smooth();
    p.frameRate(framerate);
    p.colorMode(p.HSB, 255);


// CREATE SPACES
   setTimeout(() => {
     p.background(0, 0, 0);
         p.strokeWeight(2);
         p.stroke(255, 0, 255);
         p.line(0, p.windowHeight/2, p.windowWidth, p.windowHeight/2);
         p.line(p.windowWidth/3, 0, p.windowWidth/3, p.windowHeight);
         p.line((p.windowWidth/3)*2, 0, (p.windowWidth/3)*2, p.windowHeight);
   })
} // setup


// FUNCTIONS
function littleRand(shift) {
  var rnd = ((Math.random() * shift) - shift/2);
    	return rnd;
    }

function scaleValue(value, from, to) {
    	var scale = (to[1] - to[0]) / (from[1] - from[0]);
    	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    	return ~~(capped * scale + to[0]);
    }



// DRAW
this.onOscMessage(message => {
      var tidalArgs = message.args;
      start = 1;

        // READER:
        tidal = {};
          for(var i = 0; i < tidalArgs.length; i+=2){
            tidal[tidalArgs[i]] = tidalArgs[i+1]
          };
       console.log(tidal);


//SWITCHER + PLOTTER

          // KICKS --> BLUE CIRCLE
              if(kicks.includes(tidal.s)) {

                let sat
                if (tidal.gain) {
                  sat = (tidal.gain * 255)
                }
                else {
                  sat = 255
                }

                let alt
                if (tidal.speed) {
                  alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
                }
                else {
                  alt = 55
                }

                let oh = littleRand(shift);

                let xx = centerx + pos1[0] + oh;
                let yy = centery + pos1[1] + alt;

                p.noStroke();
                p.fill(170, sat, 255);

                p.ellipse(xx, yy, 60, 60);
              }


          // HATS --> YELLOW SPIKES
             else if (hats.includes(tidal.s)) {

               let sat
               if (tidal.gain) {
                 sat = (tidal.gain * 255)
               }
               else {
                 sat = 255
               }

               let alt
               if (tidal.speed) {
                 alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
               }
               else {
                 alt = 55
               }

               let oh = littleRand(shift);

               let xx = centerx + pos2[0] + oh;
               let yy = centery + pos2[1] + alt;

               let dens = 15;
               for (var i = 0; i < dens; i++) {
                 let rx = Math.random() * 30;
                 let ry = Math.random() * 30;

                 p.noStroke();
                 p.fill(40, sat, 255);
                 p.circle(xx + rx, yy + ry - 10, 7);
               }
             }


         // HIGHS --> RED TRIANGLE
              else if (highs.includes(tidal.s)) {

                let base = 14;

                let sat
                if (tidal.gain) {
                  sat = (tidal.gain * 255)
                }
                else {
                  sat = 255
                }

                let alt
                if (tidal.speed) {
                  alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
                }
                else {
                  alt = 55
                }

                let oh = littleRand(shift);

                let xx = centerx + pos3[0] + oh;
                let yy = centery + pos3[1] + alt;

                p.noStroke();
                p.fill(0, sat, 255);

                p.triangle(xx - base, yy, xx, yy - 50, xx + base, yy);
              }


          // LONG --> GREEN LINE
              else if (long.includes(tidal.s)) {

                let long = 80;

                let sat
                if (tidal.gain) {
                  sat = (tidal.gain * 255)
                }
                else {
                  sat = 255
                }

                let alt
                if (tidal.speed) {
                  alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
                }
                else {
                  alt = 55
                }

                let oh = littleRand(shift);

                let xx = centerx + pos4[0] + oh;
                let yy = centery + pos4[1] + alt;

                p.strokeWeight(5);
                p.stroke(105, sat, 255);

                p.line(xx, yy, xx + long, yy);
              }


            // LOWS --> GREEN RECTANGLE
             else if (lows.includes(tidal.s)) {

               let perimeter = 160;

               let sat
               if (tidal.gain) {
                 sat = (tidal.gain * 255)
               }
               else {
                 sat = 255
               }

               let alt
               if (tidal.speed) {
                 alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
               }
               else {
                 alt = 55
               }

               let oh = littleRand(shift);

               let xx = centerx + pos5[0] + oh;
               let yy = centery + pos5[1] + alt;

               p.noStroke();
               p.fill(115, sat, 255);
               p.rect(xx, yy, perimeter/2, - perimeter/4);
             }


          // INTRO --> PURPLE LINE
             else if (tidal.s === "john") {

               let long = 150;

               let sat
               if (tidal.gain) {
                 sat = (tidal.gain * 255)
               }
               else {
                 sat = 255
               }

               let alt
               if (tidal.speed) {
                 alt = scaleValue(tidal.speed, [0.1, 4], [centery, -centery])
               }
               else {
                 alt = 55
               }

               let oh = littleRand(shift);

               let xx = centerx + pos6[0] + oh;
               let yy = centery + pos6[1] + alt;

               p.strokeWeight(8);
               p.stroke(200, sat, 255);

               p.line(xx, yy, xx + long, yy);
             }

        }) //oscmessage


// TRANSPARENT LAYER 
p.draw = () => {

if (start == 1) {
  p.noStroke();
  p.fill(0, 0, 0, 5)
  p.rect(0, 0, p.windowWidth, p.windowHeight);
  p.strokeWeight(2);
  p.stroke(255, 0, 255);
  p.line(0, p.windowHeight/2, p.windowWidth, p.windowHeight/2);
  p.line(p.windowWidth/3, 0, p.windowWidth/3, p.windowHeight);
  p.line((p.windowWidth/3)*2, 0, (p.windowWidth/3)*2, p.windowHeight);
  p.strokeWeight(30);
  p.stroke(255, 100, 255);
  p.line(0, 0, timewidget, 0)
  timewidget = timewidget + p.windowWidth/globaltime/60/framerate;
      }
  }  // draw


} //export function
