---
layout: post
section-type: post
title: Extended GuiObjectView 
category: tech
tags: [ 'tech' ]
---


<br>
For our current project, I found Torque's existing GuiObjectView class was going to need to be modified to meet the demands of a quality character creation GUI. The class achieves what it sets out to do: it renders a 3D model in a GUI control. However, that's about all it does by default, and rendering of more complex models isn't supported. It was decided the GuiObjectView class was in need of an update and so began the task of extending the class's list of features! 

This extension of the GuiObjectView's source code began April 5th, 2016. During that time, any official updates that made it to release were included. The class was updated from time to time and additional extensions implemented as needed. Here I'll outline some of the changes that took place in order to extend the functionality of the GuiObjectView class:
<br>
<br>
<h2>Problems? What Problems?</h2>
• One of the first problems with the GuiObjectView was that it only supported a single mesh for the displayed model. This quickly became a problem when attempting to hide or show particular sub-meshes for our character models.<br><br>
• Another thing that cropped up immediately was the realization that the displayed mesh also supported a single material. Skinning was supported, but not for sub-meshes(i.e. seperate materials for each sub-mesh within the model).<br><br>
• The default camera would default to a position relative to the center of the model. Adjustments would be required to have the camera auto-adjust its positioning based on the size of the displayed model.<br><br>
• The default camera would allow for zooming 'inside' the model, as well as awkward 2 axis rotations. A 'closest' value would need to be added to keep the camera from going into the model, and a constraint put on rotation.
<br>
<br>
<h2>Sub-mesh Support</h2>
We wanted the GuiObjectView control to support the hiding/showing of sub-meshes within a model individually. The first step was to add "core/bitVector.h" to the includes. Including this class allowed for the creation of the mHiddenMeshes vector. Additionally, large amounts of code could be borrowed from other classes that already supported multiple sub-meshes for rendered models. The most notable about this update is that it elegantly repurposes the existing 'skin' field so the data stored can be a tab-delimited vector of strings. Several internal functions were added to index and update the hidden status for each sub-mesh in an object. A couple of these were extended into EngineMethod format:

{% highlight cpp %}
DefineEngineMethod(GuiObjectView, setAllMeshesHidden, void, (bool hide), ,
	"@brief Set the hidden state on all the shape meshes.\n\n"

	"This allows you to hide all meshes in the shape, for example, and then only "
	"enable a few.\n"

	"@param hide new hidden state for all meshes\n\n")
DefineEngineMethod(GuiObjectView, setMeshHidden, void, (const char* name, bool hide), ,
	"@brief Set the hidden state on the named shape mesh.\n\n"

	"@param name name of the mesh to hide/show\n"
	"@param hide new hidden state for the mesh\n\n")
{% endhighlight %}
<br>
This update was relatively straight-forward once I discovered how other classes were keeping track of sub-meshes. This is a shining example of how a significant feature update can be achieved with minimal code updates. The bulk of this work was already done in the Torque source code, just never was extended to be used by the GuiObjectView class.
<br>
<br>
<h2>Sub-mesh Skinning</h2>
Once multiple meshes were rendering properly within the GuiObjectView control it was time to implement proper skinning so a model with multiple materials could display all the materials. One example would be a model with a highRes head material and a second lowRes material for the rest of the mesh. Once again, this wasn't too difficult to implement once existing functionality for other classes was reverse engineered for our purposes here. "sim/netStringTable.h" was added to the includes so that the rendered model could keep track of a list of materials, rather than just one. Again, several internal support functions were added so that skin names could be properly indexed, retrieved, and updated. The renderWorld() function had to be updated so the RenderPassManager assigned a 'shared' transform. At the end of the day, this resulted in some additional EngineMethod functions for use in script:

{% highlight cpp %}
DefineEngineMethod(GuiObjectView, getSkinName, const char*, (), ,
	"@brief Get the name of the skin applied to this shape.\n\n"
	"@return the name of the skin\n\n"

	"@see skin\n"
	"@see setSkinName()\n")  
DefineEngineMethod(GuiObjectView, setSkinName, void, (const char* skinName), ,
	"@brief Sets the skin to use on the model being displayed.\n\n"
	"@param skinName Name of the skin to use.\n"
	"@tsexample\n"
	"// Define the skin we want to apply to the main model in the control\n"
	"%skinName = \"disco_gideon\";\n\n"
	"// Inform the GuiObjectView control to update the skin the to defined skin\n"
	"%thisGuiObjectView.setSkin(%skinName);\n"
	"@endtsexample\n\n"
	"@see GuiControl") 
DefineEngineMethod(GuiObjectView, getTargetCount, S32, (), ,
	"Get the number of materials in the shape.\n"
	"@return the number of materials in the shape.\n"
	"@see getTargetName()\n")
DefineEngineMethod(GuiObjectView, getTargetName, const char*, (S32 index), (0),
	"Get the name of the indexed material.\n"
	"@param index index of the material to get (valid range is 0 - getTargetCount()-1).\n"
	"@return the name of the indexed material.\n"
	"@see getTargetCount()\n")
{% endhighlight %}
<br>
<br>
<h2>Extended Camera</h2>
The extension to the GuiObjectView's camera was born out of necessity to position the camera more accurately. The current implementation offsets the camera based off of the model's nodes. If the control is flagged to <filepath>'useNodes'</filepath> the model will be required to have <filepath>'base'</filepath>, <filepath>'start01'</filepath>, and <filepath>'eye'</filepath> nodes. Conveniently, in many(if not most) cases, these nodes should already have been added when the nodes for the model were being set up. If the model meets the requirements and the control has <filepath>'useNodes'</filepath> enabled the camera is able to be controlled using the new EngineMethod script functions:

{% highlight cpp %}
DefineEngineMethod(GuiObjectView, getCamPos, Point3F, (), ,
	"@brief Get the camera's position.\n\n")   
DefineEngineMethod(GuiObjectView, setCamPos, void, (Point3F xyz), ,
	"@brief Set the camera's position.\n\n") 
DefineEngineMethod(GuiObjectView, getOrbitPos, Point3F, (), ,
	"@brief Get the camera's orbit position.\n\n")
DefineEngineMethod(GuiObjectView, setOrbitPos, void, (Point3F xyz), ,
	"@brief Set the camera's orbit position.\n\n")	
DefineEngineMethod(GuiObjectView, getEyeZ, F32, (), ,
	"@brief Get the z position from the eye node.\n\n")
DefineEngineMethod(GuiObjectView, setUseNodes, void, (bool use), ,
	"Allow the GuiObjectView to use nodes for camera placement.\n"
	"Uses the shape's start01 node to set the camera position.\n")	
{% endhighlight %}
<br>
If handled properly, these functions can allow the control's camera to be animated from script. Also a default drifting operation is implemented in the provided GuiObjectView script below. It will automatically reset the camera to an optimal range when the control wakes or the model is changed. This allows models to change within the GuiObjectView dynamically, so if the client is viewing a short character and changes the model being viewed to a taller character the camera will automatically reposition itself.
<br>
<br>
<h2>Downloads</h2>
This is version 1.0 of the extended GuiObjectView class. This version implements sub-mesh visibility, sub-mesh materials, and extended camera support.   
<br>
<br>
<h2>Installation</h2>
To install:<br>
<b>1 -</b> Backup your existing <filepath>"source\T3D\guiObjectView.h"</filepath> and <filepath>"source\T3D\guiObjectView.cpp"</filepath> files.<br>
<b>2 -</b> Replace <filepath>"source\T3D\guiObjectView.h"</filepath> and <filepath>"source\T3D\guiObjectView.cpp"</filepath> with the updated files provided.<br>
<b>3 -</b> Recompile. A successful update of the GuiObjectView class will allow the script functions to be used.<br>
<b>4 -</b> Example script files have been provided, which can be initialized with the other .gui scripts. The example scripts will cause any GuiObjectView control to automatically reset its camera's position onWake() or when the displayed model is changed. It is recommended that these scripts be included when first using the resource, to promote a better understanding of the resource and how to use it from script.<br>
<br>
<br>
<h2>Additional Updates</h2>
At the time of writing, a further extended version 1.1 exists but hasn't been packaged for sharing. The updated version supports animation blends for the rendered model and provides the backbone for further expansions relating to character customization options. The update is significant enough to stand alone as a 'next iteration' and, due to the project-specific nature of the expansion, we have 2 versions of the extended GuiObjectView from which to choose! Stay tuned for more information about version 1.1.


