---
layout: post
section-type: post
title: Extended GuiObjectView 
category: tech
tags: [ 'tech' ]
---

For our current project, I found Torque's existing GuiObjectView class was lacking in several areas. The class achieves what it sets out to do: render a 3D model in a GUI control. However, it's what it doesn't achieve that became a concern when I started creating a character creation GUI. It was decided the GuiObjectView class was in need of an update and so began the task of extending the class's list of features! 

Problems? What Problems?
• One of the first problems with the GuiObjectView was that it only supported a single mesh for the displayed model. This quickly became a problem when attempting to hide or show particular sub-meshes for our character models. 
• Another thing that cropped up immediately was the realization that the displayed mesh also supported a single material. Skinning was supported, but not for sub-meshes(i.e. seperate materials for each sub-mesh within the model).
• The stock GuiObjectView code supported only a single animation, with the added limitation that the animation couldn't be blended. For proper display of 3D character models, this would need to be updated.
• The default camera would default to a position relative to the root of the model. Adjustments would be required to have the camera auto-adjust its positioning based on the size of the displayed model.

<small>Note that I extended the GuiObjectView class a bit further, but that revelation is reserved for a future posting!</small>

{% highlight cpp %}
def foo
  puts 'foo'
end
{% endhighlight %}