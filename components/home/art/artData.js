export const artCategories = {
  ALL: "all",
  ANIMATION: "animation",
  ARTWORK: "artwork",
};

export const artProjectType = {
  professional: "Professional",
  personal: "Personal",
};

export const artItems = [
  // ─── 1. MOTHERLAND ───
  {
    id: "motherland",
    title: "Motherland",
    category: "3D Environment & Cinematic",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Artworks/saving_nigeria.jpg",
    poster: "/art-and-animation-project/Artworks/saving_nigeria.jpg",
    tools: ["Blender", "Cycles", "Photoshop"],
    tags: ["Blender", "Cycles", "3D", "Sci-Fi", "Environment", "Hard Surface", "Volumetrics"],
    description:
      "A personal conceptual project submitted for the Lagos Meet 3D billboard challenge. It depicts Nigeria in an incubation capsule, telling the story of a nation that, despite decaying infrastructure and rusty facilities, remains rich in resources and overflowing with vibrant life.",
    longDescription:
      "A personal conceptual project born from an original idea to tell the story of Nigeria and the vast resources she possesses, which I submitted for the Lagos Meet 3D billboard challenge. The piece visually portrays Nigeria in critical condition, preserved within an incubation capsule to save her. Even though the surrounding environment is a rusty, aging facility with worn infrastructure, lush vegetation bursts forth from the capsule, symbolizing the enduring life, rich heritage, and undeniable beauty that continues to thrive within the Motherland. This showcase features a cinematic film, an environment walkthrough, and a high-resolution production still.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/saving_nigeria.mp4",
        poster: "/art-and-animation-project/Artworks/saving_nigeria.jpg",
        label: "Cinematic Film",
      },
      {
        type: "video",
        src: "/art-and-animation-project/Animation/saving_nigeria_walkthrough.mp4",
        poster: "/art-and-animation-project/Artworks/saving_nigeria.jpg",
        label: "Facility Walkthrough",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/saving_nigeria.jpg",
        label: "Production Still",
      },
    ],
  },

  // ─── 2. VIRTUAL BROADCAST STUDIOS ───
  {
    id: "virtual-broadcast-studios",
    title: "Virtual Broadcast Studios",
    category: "3D Virtual Sets / Broadcast Design",
    projectType: artProjectType.professional,
    type: "image",
    filterType: artCategories.ARTWORK,
    cover: "/art-and-animation-project/Artworks/472696582_944361937795234_7609806834650220299_n.jpg",
    tools: ["Blender", "Cycles", "Photoshop"],
    tags: ["Blender", "Cycles", "3D", "Virtual Studio", "Broadcast Design", "Interior", "Chroma Key"],
    description:
      "My first attempt at creating a 3D virtual studio with an almost photorealistic finish. After the client felt the first iteration was a bit too cozy, I crafted a second design, resulting in two distinct sets built for different production needs.",
    longDescription:
      "This was my very first attempt at designing a virtual studio, and it turned out looking awesome and almost photorealistic. The client initially rejected the first concept because they felt it looked a bit too cozy and kind of like a church, which pushed me to create a completely new alternative set. Both designs turned out great in the end, each tailored to serve distinct moods and broadcast purposes.",
    mediaList: [
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/472696582_944361937795234_7609806834650220299_n.jpg",
        label: "Initial Studio Design",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/3d_virtual_set_3.webp",
        label: "Alternative Broadcast Set",
      },
    ],
  },

  // ─── 3. 3D CLOTHING PRODUCT VISUALIZATION ───
  {
    id: "apparel-simulations",
    title: "3D Clothing Product Visualization",
    category: "Product Design",
    projectType: artProjectType.professional,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/male_clothing_visualisationAD.mp4",
    poster: "/art-and-animation-project/Artworks/cloth_poster.jpg",
    tools: ["Blender", "Marvelous Designer", "Jinny"],
    tags: ["Blender", "3D", "Product Design", "Fashion", "Marvelous Designer", "Jinny"],
    description:
      "A 3D clothing product visualization where I took my client's 2D fashion sketches and turned them into fully tailored digital garments using Jinny, Marvelous Designer, and Blender.",
    longDescription:
      "For this project, my client sent over sketches of the clothing they wanted visualized. I started off in Jinny by picking a base garment that closely matched the concept, then handled all the cuts, tailoring, sewing, and materials. Since Jinny and Marvelous Designer are made by the same company, I was able to open the file directly in Marvelous Designer to add all the finishing touches like stitches, zippers, buckles, and straps. Once the garments were fully detailed, I exported everything into Blender to set up the scene, lighting, and render out the final product visualizations.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/male_clothing_visualisationAD.mp4",
        label: "Male Apparel Visualization",
      },
      {
        type: "video",
        src: "/art-and-animation-project/Animation/female_cloth_visualisationAD.mp4",
        label: "Female Apparel Visualization",
      },
    ],
  },

  // ─── 4. HOLY SHIT ───
  {
    id: "holy-shit",
    title: "Holy Shit",
    category: "Surreal 3D Concept",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Artworks/holy_shit.jpg",
    poster: "/art-and-animation-project/Artworks/holy_shit.jpg",
    tools: ["Blender", "Photoshop"],
    tags: ["Blender", "Cycles", "3D", "Atmospheric Lighting", "Photoshop"],
    description:
      "This was my very first personal 3D project and it was the project that got me into 3D animation and ultimately game development. Its simply what the phrase 'Holy Shit' would sound like to the untrained ear.",
    longDescription:
      "So, i went into my toilet on one hot afternoon, and i saw the rays of sun light shining directly into the toilet, and for a second it looked like the toilet was actually glowing, and that's when it hit me 'Holy shit'. And i knew i couldnt let this idea go to waste, i had to bring it to life.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/holy_shit_animation.mp4",
        poster: "/art-and-animation-project/Artworks/holy_shit.jpg",
        label: "Surreal Animation",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/holy_shit.jpg",
        label: "High-Res Render",
      },
    ],
  },

  // ─── 5. HAND OF GOD ───
  {
    id: "hand-of-god",
    title: "Hand of God",
    category: "3D Cosmic Animation",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Artworks/hand_of_God.png",
    poster: "/art-and-animation-project/Artworks/hand_of_God.png",
    tools: ["Blender", "Cycles", "Shaders"],
    tags: ["Blender", "3D", "Cosmic", "Particle Systems", "Procedural Shaders", "Digital Art"],
    description:
      "An animation illustrating how creation and destruction lie in God's palm. Created and animated using Blender.",
    longDescription:
      "The idea was to make an animation that illustrates the creation of the world, and how God has the whole world in the palm of His hand. The entire scene was made in Blender: the galaxy was procedurally generated by combining a bunch of shaders, and I made the hand using the skin modifier alongside Blender's sculpting tools. You can own this piece as an NFT on OpenSea, and it holds a special milestone for me as the only NFT piece I ever sold :)",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/hand_of_God.mp4",
        poster: "/art-and-animation-project/Artworks/hand_of_God.png",
        label: "Cosmic Animation",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/hand_of_God.png",
        label: "Concept Render",
      },
    ],
  },

  // ─── 6. OLYMPUS ───
  {
    id: "olympus",
    title: "Olympus",
    category: "3D Concept & Lighting",
    projectType: artProjectType.personal,
    type: "image",
    filterType: artCategories.ARTWORK,
    cover: "/art-and-animation-project/Artworks/472731250_944354424462652_4293853996476979630_n.jpg",
    tools: ["Blender", "Cycles", "Photoshop"],
    tags: ["Blender", "Cycles", "3D", "Volumetrics", "God Rays", "Lighting", "Photoshop"],
    description:
      "A personal project made in Blender while learning volumetric lighting and god rays.",
    longDescription:
      "This is a personal project made in Blender while learning how to create volumetric lighting and god rays. The mask was designed as my personal brand logo, and I built this scene as part of a cinematic animation that unfortunately never happened. Despite the full animation not coming to fruition, the piece became a defining study in mood, atmospheric scale, and lighting design.",
    mediaList: [
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/472731250_944354424462652_4293853996476979630_n.jpg",
        label: "Atmospheric Concept Render",
      },
    ],
  },

  // ─── 7. CYBER AWARENESS CAMPAIGN ───
  {
    id: "cyber-awareness",
    title: "Cyber Awareness Campaign",
    category: "3D Animation / Motion Graphics",
    projectType: artProjectType.professional,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/cyber_awareness.mp4",
    poster: null,
    tools: ["Blender"],
    tags: ["Blender", "3D", "Motion Graphics", "PSA", "Security", "Sound Design"],
    description:
      "An informative 3D animated visual campaign designed to educate audiences on cybersecurity threats, phishing defense, and digital hygiene.",
    longDescription:
      "Developed as an engaging educational piece addressing online security hygiene. Combining clean stylized 3D assets, kinetic messaging, and precise timing, it breaks down complex cyber threat vectors like phishing and compromised links into easily digestible visual metaphors.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/cyber_awareness.mp4",
        label: "Campaign Animation",
      },
    ],
  },

  // ─── 8. DOYENCV COMMERCIAL ───
  {
    id: "doyencv-commercial",
    title: "DoyenCV Brand Commercial",
    category: "3D Motion Design & Commercial",
    projectType: artProjectType.professional,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/doyencv_commercial.mp4",
    poster: null,
    tools: ["Blender"],
    tags: ["Blender", "3D", "Commercial", "Kinetic Typography", "Motion Design"],
    description:
      "A 3D commercial created for DoyenCV, a job-readiness brand that helps people gain tech skills, build professional CVs and cover letters, and prepare for interviews.",
    longDescription:
      "The founder of DoyenCV is a friend of mine, and I created this commercial to showcase what the brand is all about. DoyenCV is a job-readiness platform that equips candidates with in-demand tech skills, assists them in building standout CVs and cover letters, and prepares them to ace job interviews. I created and animated the visual assets in Blender to deliver an engaging promotional piece for the brand.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/doyencv_commercial.mp4",
        label: "Commercial Animation",
      },
    ],
  },

  // ─── 9. HOUSE CONSTRUCTION SEQUENCE ───
  {
    id: "house-construction",
    title: "House Construction 3D Sequence",
    category: "Stylized 3D Animation",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/house_construction.mp4",
    poster: null,
    tools: ["Blender"],
    tags: ["Blender", "3D", "Stylized", "Keyframe Animation", "Modeling", "Texturing"],
    description:
      "A personal project where I modeled and textured a stylized house in Blender 3D, broke it down into pieces, and created a progressive construction animation.",
    longDescription:
      "This is a personal project where I modeled and textured a stylized house completely in Blender 3D. After finishing the asset, I broke the structure into pieces and created a dynamic construction animation showing the house assembling from the ground up and animated a danfo bus driving around it.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/house_construction.mp4",
        label: "Construction Sequence",
      },
    ],
  },

  // ─── 10. FRAGILE LOVE ───
  {
    id: "broken-heart",
    title: "Fragile Love",
    category: "3D Motion Art",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/broken_heart.mp4",
    poster: null,
    tools: ["Blender", "Eevee", "Premiere Pro"],
    tags: ["Blender", "Eevee", "3D", "Cell Fracture", "Animation", "Premiere Pro"],
    description:
      "An experimental broken heart animation exploring Blender's cell fracture effect, rendered in Eevee with sound and video editing done in Premiere Pro.",
    longDescription:
      "I played around with Blender's cell fracture effect and made a broken heart animation titled 'Fragile Love'. The scene was rendered in Blender's Eevee render engine at 200 samples, with sound design and final video editing completed in Adobe Premiere Pro.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/broken_heart.mp4",
        label: "Fragile Love Animation",
      },
    ],
  },

  // ─── 11. THE WORD ───
  {
    id: "the-word",
    title: "The Word",
    category: "3D Cinematic Animation",
    projectType: artProjectType.personal,
    type: "video",
    filterType: artCategories.ANIMATION,
    cover: "/art-and-animation-project/Animation/word_of_God.mp4",
    poster: "/art-and-animation-project/Artworks/word_poster.png",
    tools: ["Blender", "Premiere Pro"],
    tags: ["Blender", "3D", "Cinematic", "Shader Animation", "Premiere Pro", "Typography"],
    description:
      "A 3D model and animation of the Holy Bible depicting a cinematic reveal of Hebrews 4:12, featuring custom page-flip animation and shader-driven glowing text.",
    longDescription:
      "This has to be the most tricky project I've ever worked on—I had to think outside the box for everything. It is a 3D model and animation of the Holy Bible that depicts a cinematic reveal of Hebrews 4:12. I had to figure out how to animate the page flipping independently and offset the timing so it wouldn't look repetitive. To texture the pages, I photographed the target Bible passage along with over 20 other pages to realistically populate the book. The heavenly text glow was animated using Blender shaders, and the ember overlay and sound design were finished in Premiere Pro.",
    mediaList: [
      {
        type: "video",
        src: "/art-and-animation-project/Animation/word_of_God.mp4",
        poster: "/art-and-animation-project/Artworks/word_poster.png",
        label: "Cinematic Bible Animation",
      },
    ],
  },

  // ─── 12. DIGITAL ARTWORKS ───
  {
    id: "digital-artworks",
    title: "Digital Artworks",
    category: "Digital Art & Photo Manipulation",
    projectType: artProjectType.personal,
    type: "image",
    isStack: true,
    filterType: artCategories.ARTWORK,
    cover: "/art-and-animation-project/Artworks/chaos.jpg",
    tools: ["Photoshop", "Wacom"],
    tags: ["Photoshop", "2D", "Digital Art", "Photo Manipulation", "Cover Art", "Surrealism"],
    description:
      "A personal collection of digital artworks and photo manipulations created while learning the craft. Each piece tells a distinct story reflecting my state of mind, and personnal experiences.",
    longDescription:
      "These are a collection of digital artworks I am proud of creating while learning how to make digital art and photo manipulation. They all tell different stories, as I chose to create them based on my state of mind at the time:\n\n• Chaos & Solitude: An atmospheric matte painting created to express and navigate my emotions after a breakup in the past, capturing personal isolation beneath a private rainstorm.\n• Letting Go: An emotional artwork created to help me express and process my feelings after a past breakup.\n• Aux Plug: Pikachu: Created as official single cover art for my friend Aux Plug's music release, fusing anime pop aesthetics with streetwear culture.\n• Midnight Cabaret Singer: A theatrical digital illustration exploring the mood, warmth, and soulful expression of a vintage jazz cabaret vocalist.",
    mediaList: [
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/chaos.jpg",
        label: "Chaos & Solitude",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/470515223_973565188161349_8188534938953437176_n.jpg",
        label: "Letting Go",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/176133166_122343313283545_7348712548360919602_n.jpg",
        label: "Aux Plug: Pikachu",
      },
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/471788302_972910101560191_3140524935030029223_n.jpg",
        label: "Midnight Cabaret Singer",
      },
    ],
  },

  // ─── 13. THE PROMISE LAND ───
  {
    id: "the-promise-land",
    title: "The Promise Land",
    category: "Photo Manipulation & Digital Art",
    projectType: artProjectType.personal,
    type: "image",
    filterType: artCategories.ARTWORK,
    cover: "/art-and-animation-project/Artworks/fatherland.jpg",
    tools: ["Photoshop"],
    tags: ["Photoshop", "2D", "Photo Manipulation", "Digital Art", "Nigeria", "Surrealism"],
    description:
      "A Nigerian Independence Day themed photo manipulation created by merging multiple images, featuring a lake shaped like Nigeria and colored in the green-white-green flag.",
    longDescription:
      "A Nigerian Independence Day themed artwork and photo manipulation titled 'The Promise Land'. I merged multiple images to compose this piece, shaping the central lake into the silhouette of Nigeria and coloring its waters green, white, and green after the Nigerian flag to symbolize heritage, beauty, and national promise.",
    mediaList: [
      {
        type: "image",
        src: "/art-and-animation-project/Artworks/fatherland.jpg",
        label: "The Promise Land Artwork",
      },
    ],
  },
];
