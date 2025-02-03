---
layout: portfolio
status: publish
published: true
title: Minecraft Mods
author:
  display_name: eliot
  login: eliot
  email: fadookie@gmail.com
  url: ''
author_login: eliot
author_email: fadookie@gmail.com
date: '2023-08-17 12:00:00 +0000'
categories: ['Personal']
tags: []
comments: []
portfolio:
  in_progress: true
  time: Ongoing
  team: 'Varies'
  role: Programmer
  technologies: 'Minecraft Java Edition, Blockbench, Java, JavaScript/TypeScript'
  cover:
    value: >-
      /assets/minecraft-urithiru.png
    thumb: >-
      /assets/minecraft-urithiru-thumb.png
    medium: >-
      /assets/minecraft-urithiru.png
    large: >-
      /assets/minecraft-urithiru.png
  media:
    - type: image
      value: >-
        /assets/minecraft-cryptic_crawl_trim.gif
      thumb: >-
        /assets/minecraft-cryptic_crawl_trim.gif
      medium: >-
        /assets/minecraft-cryptic_crawl_trim.gif
---

During COVID lockdown in the summer of 2020, I picked up a new game development hobby: Minecraft modding.

I wanted to create a mod that would re-create the world of Roshar from [Brandon Sanderson](https://www.brandonsanderson.com/)'s [Stormlight Archive](https://en.wikipedia.org/wiki/The_Stormlight_Archive) series. I had never made a Minecraft mod before, and as I was learning how to mod, I missed a lot of the more sophisticated tools that modern game engines provide, such as GUI authoring tools for animations, particle systems, and branching dialogue.

I embarked on a quest to make these tools, to varying degrees of completion and success.

**[YarnGdx](https://github.com/kyperbelt/YarnGdx):** This is an implementation of the [Yarn Spinner](https://www.yarnspinner.dev/) runtime initially for [libGDX](https://libgdx.com/) for creating branching dialogue created by my friend [Kyperbelt](https://kyperbelt.itch.io/). I helped port the system from Yarn 1 to Yarn 2 and rework it as a vanilla Java dependency that could be used in any Java project.

**[GeckoLib](https://github.com/bernie-g/geckolib):** My friend Gecko created the initial version of this library which added basic support for [Bedrock Edition model animations](https://bedrock.dev/docs/stable/Animations) for Java Edition mods. I was the second contributor, taking over as maintainer of the [Blockbench plugin](https://www.blockbench.net/) as well as architecting and doing most of the development to add support for easing curves in animation keyframes. GeckoLib has since had many more contributors and has become the gold standard mod for Java Edition animations, with over 100 million downloads.

**[Particleman](https://github.com/fadookie/particleman):** This is still a work in progress on the back burner, an attempt to extract the [Bedrock Edition particle system](https://bedrock.dev/docs/stable/Particles) runtime from [McHorse's Blockbuster mod](https://github.com/mchorse/blockbuster) as a standalone library. The objective was to allow Java Edition modders to be able to use the [Snowstorm editor](https://github.com/JannisX11/snowstorm) for authoring particle systems. My efforts to extract McHorse's [MoLang](https://bedrock.dev/docs/stable/Molang) interpreter as a standalone vanilla Java library was leveraged by GeckoLib.

<img src="/assets/minecraft-skyeel-fly-tex.gif" width="473" height="281" alt="Skyeel model by AlahrranHonor, animated by me"/>

I think overall my efforts to create tooling to support my main project were ultimately more successful than the project itself. It went through three iterations: first, as a mod for the [Fabric mod loader](https://fabricmc.net/). Then, as a vanilla-compatible server using server-side plugins such as [ModelEngine](https://mythiccraft.io/index.php?resources/model-engine%E2%80%94ultimate-entity-model-manager-1-19-4-1-20-4.1213) to add support for custom entities. Finally, when the StormCraft project shuttered due to a long bout of inactivity, I took some of the assets I had made and commissioned and contributed them to [Leaf's Cosmere Suite mod](https://github.com/leafreynolds/cosmere). More details and graphics from the mod can be found on the [17th Shard StormCraft forum thread](https://www.17thshard.com/forums/topic/96185-stormcraft-a-minecraft-modserver/).

<video class="responsive_video" controls>
  <!-- <source src="/assets/minecraft-rockbuds.mp4" type="video/mp4"> -->
  <source src="http://eliot.s3.amazonaws.com/eliotlash.com/minecraft-rockbuds.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
