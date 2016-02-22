Bonny Christopher   bchristo@uw.edu
Julie Sutherland    juliesea@uw.edu
Ricki Xie           rickixie@uw.edu

Teamname: dreamcatcher

TITLE: Social Ball and Sound Composition Using Mobile Devices

We decided to go back to a prior version and use a web socket to connect mobile devices to a social composition. Our previous design, a visualization of clouds, rain, and lightning didn’t feel like a natural fit for an additional interaction model, i.e.: a mobile sensor-based interaction model.

This latest version assigns a hue and sound to each user as they join the composition (maximum 7 users), and allows them to turn their mobile device (from portrait to landscape and back) to release a stream of balls into the space. In order to clear all the balls the user can shake their phone. We used the deviceShaken and deviceMoved keys to accomplish this in the web socket. We feel like these interactions enable a user to use their mobile phone as a magic wand, and see their own bouncing color creation amongst others.

We also implemented some introductory text that will prompt a user to log into the websocket in order to release the balls with their mobile device. Once they do that, and turn their phone to release balls, the text disappears. 

Using their own keyboard a user can still trigger balls by pressing the number key 1 to 7 as before, but only one ball comes out at a time and is released from random places within the space. The user can still clear the balls by pressing the escape key. 



WORK BREAKDOWN

Bonny: Mobile device interaction experiments including a calculation that would use deviceMoved to shift the balls along the x axis according to gestural motion and velocity.

Julie: Web socket exploration and prototyping text menu and introductory text in p5.

Ricki: Mobile device and web socket implementation on deviceMoved and deviceShaken. Inclusion of mobileID to assign each user a ball color and track their interaction, changing the size and number of balls released, and implementing temporary introductory text. 


SOURCES
Arvind Satyanarayan suggested the mobileID implementation
https://uwdata.github.io/hcid520/16wi/art/



