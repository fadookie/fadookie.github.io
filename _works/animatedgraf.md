---
layout: portfolio
status: publish
published: true
title: AnimatedGraf
author:
  display_name: eliot
  login: eliot
  email: fadookie@gmail.com
  url: ''
author_login: eliot
author_email: fadookie@gmail.com
wordpress_id: 803
wordpress_url: 'http://www.eliotlash.com/?post_type=portfolio&#038;p=803'
date: '2012-05-03 12:48:05 +0000'
date_gmt: '2012-05-03 19:48:05 +0000'
categories: ['Art', 'Personal', 'Featured']
tags: []
comments: []
portfolio:
  download: >-
    http://eliot.s3.amazonaws.com/releases/art/AnimatedGraf/AnimatedGraf_20120512_67f0129.zip
  website: '<a href="https://github.com/fadookie/AnimatedGraf">GitHub</a>'
  time: Free time over 2 days
  role: Programmer
  technologies: 'Processing, Mesh library'
  cover:
    value: >-
      https://eliotlash.s3.amazonaws.com/mainsite/wp-content/uploads/screenshot00.png
    thumb: >-
      https://eliotlash.s3.amazonaws.com/mainsite/wp-content/uploads/screenshot00-150x150.png
    medium: >-
      https://eliotlash.s3.amazonaws.com/mainsite/wp-content/uploads/screenshot00-300x225.png
    cover_alt: >-
      Screenshot of AnimatedGraf program showing a shape with a blue background with dark blue lines interconnecting a mesh of points, overlaid with a white structure showing the voronoi diagram of those points. A triangular rainbow pattern connects the sides of the shape to points on the left and right edges of the screen.
  media: []
---
<p>I saw <a href="http://www.paloaltopublicart.org/Collection/Col26/01.html">this really cool mural</a> in Palo Alto, and it reminded me of a Voronoi diagram. This led me to thinking that it would be cool to model the mural itself in code so it could be made interactive and rendered in real-time. This is the result.</p>
<p>The graph is generated from an array of random points, which are randomly wiggled over time. The mouse generates another point in the graph, so you can slide your mouse around to interact with it. The white lines represent the edges of polygons in the Voronoi diagram which are centered around the points. The dark blue lines connect the points with their nearest neighbors, which form a Delaunay diagram. All the points are surrounded by a convex hull which also looks like a white line.</p>
<p>The working title is "AnimatedGraf" since this is both animated graffiti and an animated graph.</p>
<p>If I ever have the time and inspiration, I think it would be cool to smooth out the animation of this graph, and maybe turn it into a music visualizer or something.</p>
<p>Thanks to <a href="http://www.joeypiziali.com/">Joey Piziali</a> who painted <em>The Untiteld,&nbsp;</em>the original mural.<br />
And to Lee Byron who wrote <a href="http://www.leebyron.com/else/mesh/">the Mesh library for Processing</a> which makes generating Voronoi and Delaunay diagrams and convex hulls a snap.</p>
