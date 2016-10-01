---
layout: post
section-type: post
title: Fading Gui Controls 
category: tech
tags: [ 'tech' ]
---


<br>
Subtle fading effects go a long way in improving the aesthetics of a gui and we wanted to take advantage of this effect in Torque for image and button guis. As of this writing, about the only way to manipulate fading using stock Torque is to set up schedules in script to adjust alpha values. It works but is prone to performance issues, especially with multiple schedules being called simultaneously - in addition to any other game code/scripts that may be running. 
<br>
<br>
To alleviate this, it was decided that some research into implementing a c++ solution was in order. I found this resource from 2005 by Jeff "Ddraig Goch" Parry:<br> 
[Fading Transparent Bitmap Control](https://www.garagegames.com/community/resources/view/7220)<br>
Although this resource works, we needed support for some other types of gui controls to fade in/out as well. Also any visible child controls would not fade in/out with the parent control. This would lead to things like a background image disappearing but the text inside still being there.<br>
<br>
The timing/core fading implementation was good, so we kept that aspect of the resource intact. The <b>wakeTime</b>,<b>fadeinTime</b>, and <b>fadeoutTime</b> fields and usage were left as they were. Just about everything else was replaced. Functions were implemented that internally update the states of the controls and support for child controls was added. 
<br>
<br>
I originally updated this resource to work with Torque around the version 3.5-ish era. As the needs of our prototypes grew, I ended up expanding the resource to create a new 'fading' subset of gui controls. This gave birth to the <filepath>'guiFadingControls.h'</filepath> file. This file is just a shared header file that sets up the includes and initializes a shared enumerator. This enum is used to facilitate 'states' for the new fading gui controls. These states are handled internally and aren't directly manipulated from script.
<br>
<br>
<h2>Improvements</h2>
• <b>Standalone :</b> One main advantage of the update is it leaves the existing GuiBitmapCtrl class untouched. This enabled us to just add a new <filepath>'\fading'</filepath> directory, drop in the new <filepath>'guiFadingControls.h'</filepath> file, and build new fading gui controls that would all call to #include the new header file.<br>
• <b>Includes Children :</b> The rendering code for each control has been extended to support the fading out of child gui controls.
• <b>States :</b> We added 3 states for each new control: <b>idle</b>, <b>fadingIn</b>, and <b>fadingOut</b>. These are used internally and aren't really directly called by script. They are, however, indirectly called by the new script functions if the right conditions are met. All of this ends up making the fading in/out of the controls easier to initialize and use from script than before. Prior to this extension, I would find myself having to supplement a lot of my scripts with additional calls to setVisible(), etc. in order to get the desired results.<br>
• <b>New Classes: </b> Currently we have added 3 classes that support fading in/out using custom rendering code. Each class required minor adjustments to the rendering code and, while the option of expanding the core 'guiControl' class was explored, ultimately we found it simpler to just write each custom rendering function per class. Altering the core guiControl class was just too messy, creating additional fields for all gui controls edited/saved in the Gui Editor.<br> 
• <b>Additional Fields :</b> 4 fields were added to each fading gui control to facilitate the fading operation: <b>fadeinTime</b>, <b>fadeOutTime</b>, <b>mode</b>, and <b>fadeIn_onWake</b>. The GuiFadingButtonCtrl was created specifically for buttons that won't render any bitmaps but still require a fade effect. The GuiFadingButtonCtrl has one additional field: <b>fill</b>. This optional variable enables/disables the filling of the background/border.<br>
• <b>Console Methods :</b> Each class supports fading in/out of the control on the canvas via 2 added console methods: <b>fadeIn()</b> and <b>fadeOut()</b>.<br>
<br>
<br>
<h2>New Classes</h2>
<b>• GuiFadingBitmapButtonCtrl :</b> Gui button control with an image that will fade in and out.<br>
<b>• GuiFadingBitmapCtrl :</b> Gui control with an image that will fade in and out. Includes child controls.<br>
<b>• GuiFadingButtonCtrl :</b> Gui button control that will fade in and out. Only for buttons with no image, using profiles to 'fill' the color and borders.<br>
<br>
<br>
<h2>Downloads</h2>
The Fading Gui Controls on GitHub:<br>
<br>
[Fading Gui Controls]()
<br>
<br>
<h2>Installation</h2>
<h3>Source Code:</h3>
<b>1 -</b> Create a new directory <filepath>"source\gui\fading\"</filepath>.<br>
<b>2 -</b> Copy the provided source files into the new directory.<br>
<b>3 -</b> Open your project and add the new <filepath>'fading'</filepath> filter under <filepath>"torque3d\gui\"</filepath> to mirror the new directory.<br>
<b>4 -</b> Right-click the new <filepath>'fading'</filepath> filter and choose 'Add Existing Item' from the dropdown. Go ahead and add each of the 4 new source files.<br>
<b>5 -</b> Recompile. A successful install will allow the new classes to be used and their <b>fadeIn()</b> and <b>fadeOut()</b> functions called from script.<br>
<br>
<br>
<h2>Usage</h2>
To use this resource from script you just need to understand how the added fields work. The <b>fadeinTime</b> and <b>fadeoutTime</b> are pretty self-explanatory - just tinker with these to get the transition time right(ms).<br>
<br>
The <b>alpha</b> field can be set to a value from 0 to 255. 0 = transparent.<br>
The <b>mode</b> field can be set to a value from 0 to 2. 0 = idle, 1 = fadingIn, 2 = fadingOut. This is manipulated internally and isn't exposed to script.<br>
The <b>fadeInOnWake</b> field is a bool value of whether or not the control should fade in when the control's <b>onWake()</b> is called.
<br>
When used together, these fields can cater to quite a few different scenarios. By default, the controls behave like the gui control from which they are inherited. i.e. The guiFadingBitmapCtrl acts just like the guiBitmapCtrl unless it is told to do otherwise. The most common use of the fading controls is to have the control fade in automatically, as soon as it is added to the canvas. For this behavior the fields could be set as follows:<br>
<b>alpha = 0;</b> <i>// Transparent to start.</i><br>
<b>fadeInOnWake = 1;</b> <i>// Anytime the control wakes, call its fadeIn() function.<i><br>
<br>
Once a control is faded in, you might want to fade it back out at some point. To do this, you would leave the fields alone since they are for initialization and waking of the control. Instead you could call the script function:<br>
<b>MyFadingControl.fadeOut();</b> <i>Call the console command to fade out the control, gradually decreasing its alpha value to 0.<i><br>
<br>
<h3>guiFadingButtonCtrl</h3>
If you want a button that doesn't use any image but still want the button to support fading, use this class. This class adds one extra field: <b>fill</b>. This field will enable/disable the filling of the profile's background color. This is useful if you wanted to make a button that is only text with a transparent background. For a text-only button like this to fade in automatically, the fields would look like this on the control:<br>
<b>fill = 0;</b> <i>// Don't fill the background color.</i><br>
<b>alpha = 0;</b> <i>// Transparent to start.<i><br>
<b>fadeInOnWake = 1;</b> <i>// Anytime the control wakes, call its fadeIn() function.<i><br> 
<br>
<br>
