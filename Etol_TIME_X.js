'use babel'

export default function(p) {

// CREATE WINDOW
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    windowsize = p.windowHeight;
    console.log(p.windowHeight)
  }

// USER VARIABLES
  var globaltime = 3;
  var rows = 4;
  const kicks = ["gabba", "gabbaloud", "kit1", "kit2", "kit3", "nx", "ux", "phil", "sx", "kk", "bd"]
  const hats = ["hsn", "phsn", "chsn", "ghsn", "cry"]
  const highs = ["cp", "glitch", "insect"]
  const lows = ["bass0", "bass2", "bass3", "bassdm"]
  const long = ["ls", "vex"]


// INIT
  var framerate = 20;
  var increment = (p.windowWidth/((globaltime * 60 / rows) * framerate));
  var xpoint = 0;
  var ypoint = Math.trunc(p.windowHeight / rows);
  var halfstave = ypoint/2
  var start = 0;
  var ynum = 0;
  var stave = p.windowHeight/rows;
  var galpha = 20;


  p.setup = () => {
    p.smooth();
    p.frameRate(framerate);

    // CREATE STAVE
       setTimeout(() => {
         p.background(0, 0, 0);
         for (i = 0; i < rows; i++) {
             p.strokeWeight(2);
             p.stroke(255, 255, 255, 255);
             p.line(0, ynum, p.windowWidth, ynum);
             ynum = ynum + stave;
             console.log(ynum)
           }
       })
    }


// FUNCTIONS
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
       console.log(tidalArgs);


// SWITCHER + PLOTTER

          // KICKS --> BLUE CIRCLE
               if(kicks.includes(tidal.s)) {

                 let alpha
                 if (tidal.gain) {
                   alpha = (tidal.gain * 255) - galpha
                 }
                 else {
                   alpha = 255 - galpha
                 }

                 let alt
                 if (tidal.speed) {
                   alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
                 }
                 else {
                   alt = 55
                 }

                 p.noStroke();
                 p.fill(0, 0, 255, alpha);

                 p.ellipse(xpoint, ypoint - halfstave + alt, 15, 15);
               }


             // HATS --> YELLOW SPIKES
                else if (hats.includes(tidal.s)) {

                  let alpha
                  if (tidal.gain) {
                    alpha = (tidal.gain * 255) - galpha
                  }
                  else {
                    alpha = 255 - galpha
                  }

                  let alt;
                  if (tidal.speed) {
                    alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
                  }
                  else {
                    alt = 55
                  }

                  let shift = (Math.random() * stave - 10);
                  let dens = 10;
                  for (var i = 0; i < dens; i++) {
                    let rx = Math.random() * 10;
                    let ry = Math.random() * 10;

                    p.noStroke();
                    p.fill(255, 255, 0, alpha);
                    p.circle(xpoint + rx, ypoint + ry - halfstave + alt, 2);
                  }
                }


          // HIGHS --> RED TRIANGLE
               else if (highs.includes(tidal.s)) {

                 let base = 4;

                 let alpha
                 if (tidal.gain) {
                   alpha = (tidal.gain * 255) - galpha
                 }
                 else {
                   alpha = 255 - galpha
                 }

                 let alt;
                 if (tidal.speed) {
                   alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
                 }
                 else {
                   alt = 55
                 }

                 let yy = ypoint + alt - halfstave;

                 p.noStroke();
                 p.fill(250, 0, 0, alpha);

                 p.triangle(xpoint - base, yy, xpoint, yy - 20, xpoint + base, yy);
               }


          // LONG --> GREEN LINE
              else if (long.includes(tidal.s)) {

                let long = 40;

                let alpha
                if (tidal.gain) {
                  alpha = (tidal.gain * 255) - galpha
                }
                else {
                  alpha = 255 - galpha
                }

                let alt;
                if (tidal.speed) {
                  alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
                }
                else {
                  alt = 55
                }

                let yy = ypoint + alt - halfstave;

                p.strokeWeight(2);
                p.stroke(0, 255, 100, alpha);

                p.line(xpoint, yy, xpoint + long, yy);
              }


           // LOWS --> GREEN RECTANGLE
            else if (lows.includes(tidal.s)) {

              let perimeter = 40;

              let alpha
              if (tidal.gain) {
                alpha = (tidal.gain * 255) - galpha
              }
              else {
                alpha = 255 - galpha
              }

              let alt;
              if (tidal.speed) {
                alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
              }
              else {
                alt = 55
              }

              let perimetro = 40;

              p.noStroke();
              p.fill(50, 255, 50, alpha);
              p.rect(xpoint, ypoint - halfstave + alt, perimeter/2, - perimeter/4);
            }


          // INTRO --> PURPLE LINE
            else if (tidal.s === "john") {

              let long = 80;

              let alpha
              if (tidal.gain) {
                alpha = (tidal.gain * 255) - galpha
              }
              else {
                alpha = 255 - galpha
              }

              let alt;
              if (tidal.speed) {
                alt = scaleValue(tidal.speed, [0.1, 4], [halfstave, -halfstave])
              }
              else {
                alt = 55
              }

              let yy = ypoint + alt - halfstave;

              p.strokeWeight(4);
              p.stroke(255, 0, 255, alpha);

              p.line(xpoint, yy, xpoint + long, yy);
            }

        }) //oscmessage




// POINTER INCREMENT
p.draw = () => {

if (start == 1) {
  xpoint = (xpoint + increment)%(p.windowWidth);
  if (xpoint < (increment)) {
    ypoint = ypoint + Math.trunc(stave);
      }
    }
  }  // draw


} //export function
