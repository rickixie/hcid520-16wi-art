Bonny Christopher 
Net ID: bchristo

Ricki Xie
Net ID: rickixie

Julie Sutherland
Net ID: juliesea


Title: Bouncing Notes in a Musical Window: User Generated Compositions with Color and Sound

“Bouncing Notes in a Musical Window” allows a participant to create a visual and musical space in the browser window. The dimensions of the browser window affect the speed of the notes and key presses 1 through 7 activate the notes in the space. By playing with the number keys, the mouse click, and the browser window, the participant can create vibrant visual and auditory compositions. 

Our interactive art piece allows a participant to exercise choice and develop preferences while still being surprised and hopefully delighted by the randomness of our program. We did this visually by limiting the hue pallet of the “notes” (balls) while randomizing the lightness and allowing the user to mouse click through a complementary background color pallet. Auditorily, we matched the keys 1 through 7 with a rising scale, and yet used a given speed and browser window size to make the sound pattern less predictable.

Further Details:

This new version incorporates key press input on the number keys 1 - 7 to generate the same number of balls (1 - 7). We then generated piano notes on each key press/ ball release (based on a rising scale) that would play only when the balls ran into the edge of the windows, creating a randomized, often clustering, piano sound. We made the window resizable which allows the participant to significantly change the pace of the piano notes depending on if the window is small or large. Finally we set the maximum ball generation to 15 total balls (to make the sound more pleasing) and like last time, had the ball size change randomly between 5 and 20 pixels in diameter. Wanting this to be visually pleasing, but still random and surprising, we changed the color of the balls from flickering a randomized value on every pixel (as in our last version) to a specific hue (h) and saturation (s), while randomizing the lightness percentage between 40% and 90% (l).  We connected this color generation to the key press/ ball generation in “modified rainbow” order from 1 to 7. 


Work Breakdown

Bonny Christopher
Researched changing background colors on spacebar and/or mouse click, implementation
Implemented limiting the number of current balls to 15, with newer balls replacing older balls. 
Made window resizable while enabling piano notes to play
Change sounds per key pressed (sound matched to specific ball not last number pressed)
Enabled mouse location for ball drops
General code analysis and troubleshooting.

Julie Sutherland
Prototyped interactions in p5 for multiple balls following the mouse. 
Researched hsla color pallet to simulate monochromatic color ranges.
Matched hsla color pallet for bouncing balls with pallet of background colors
Art piece description and review process for readme.txt file

Ricki Xie
Audio integration (recording and linking sounds to file) 
Audio generation of sound when ball hits the width and height minus the ball’s diameter.
Key press integration number 1 - 7 to generate the number or balls, the randomness of a ball hsla range, and escape to clear all balls.
Mouse click to control background color changes
Bouncing speed and gravity.
Code analysis and optimizing
Troubleshooting




Sources and Inspiration

hsla 		
https://css-tricks.com/examples/HSLaExplorer/
http://hslpicker.com/

ball 		
http://www.openprocessing.org/sketch/47766  (Bounce ball with gravity)
http://www.openprocessing.org/sketch/110555 (Bounce ball and change color when hits the edges)
http://www.openprocessing.org/sketch/218262 (Bounce ball with elastic collision)

keycodes	
https://css-tricks.com/snippets/javascript/javascript-keycodes/


creative	
http://www.openprocessing.org/sketch/156547
http://p5art.tumblr.com/post/88684720968/connecting-the-dots-lifting-the-veil-wait-a-few
http://www.patatap.com/
 