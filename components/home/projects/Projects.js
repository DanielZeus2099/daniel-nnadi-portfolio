import { SectionHeader } from "@/components/utils/SectionHeader";
import { Project } from "./Project";
import styles from "./projects.module.scss";

export const Projects = () => {
  return (
    <section className="section-wrapper" id="projects">
      <SectionHeader title="Projects" dir="r" />

      <div className={styles.projects}>
        {MyProjects.map((project) => {
          return <Project key={project.title} {...project} />;
        })}
      </div>
    </section>
  );
};

export const projectType = {
  personal: "Personal",
  professional: "Professional",
  openSource: "Open Source",
}

export const MyProjects = [
  {
    title: "Rasta Santa: Action Platformer",
    type: projectType.professional,
    company: "Deluxe Creation Studios",
    imgSrc: "/project-imgs/rasta-santa/rastasanta_header.jpg",
    code: "https://play.google.com/store/apps/dev?id=8936338793500634705",
    projectLink: {
      playStore: "https://play.google.com/store/apps/details?id=rasta.santa.fight.battle",
      appStore: "https://apps.apple.com/ng/app/rasta-santa-action-platformer/id6739973372",
      steam: "https://store.steampowered.com/app/4317950/Rasta_Santa/",
    },
    tech: ["Unity", "C#", "2D", "Action", "Platformer", "Android"],
    description:
      "A story-driven 2D action shooter and platformer set in Makoko, Lagos. Play as Rasta Santa on a mission to rescue kidnapped children through intense combat and platforming challenges.",
    devInfo: {
      game: "Rasta Santa: Action Platformer",
      company: "Deluxe Creation Studios",
      genre: "Action / Platformer",
      engine: "Unity",
      platforms: "Android, iOS, Steam",
      role: "Gameplay Programmer",
    },
    about:
      "Rasta Santa is a story-driven 2D action platformer and shooter developed at Deluxe Creation Studios, set in the floating slums of Makoko, Lagos. Players guide the hero, Rasta Santa, through challenging terrain to rescue kidnapped children, combining local themes with classic platforming action.",
    responsibilities: [
      "Translated the game's high-level concept brief into a fully working prototype using primitive placeholder assets to lay down the core platforming, shooting, and collision systems.",
      "Designed and built a highly modular framework so game systems, such as player ability, weapons, enemy paths, and UI elements,could be added or removed without breaking the core engine.",
      "Programmed and integrated a health-pack system with drone delivery to solve balancing issues discovered during playtesting, especially during punishing boss encounters.",
      "Collaborated closely with the art team to cleanly swap primitive blocks and placeholder shapes with final 2D pixel-art assets once mechanics were fully tuned.",
      "Iterated on gameplay balancing based on playtester feedback, adding tactical layers like purchasable health packs and ad-based rewards on mobile.",
      "Set up unique levels, such as a chase (racing) level and a tower defence level, to add some variety to the gameplay loop.",
    ],
    projectEvolution:
      "The first playable build of Rasta Santa played well mechanically, but playtesting quickly exposed a serious balancing problem, some enemies and the final boss encounter was brutally punishing, and most casual gamers couldn't survive past the second stage. Rather than simply lowering enemy health, we came up with an interesting solution: a health-pack system that players could summon mid-combat by purchasing one or watching a rewarded ad. I programmed a drone delivery mechanic that physically flies the health pack to the player's position. This single addition transformed the pacing of the entire game and became one of its most praised features.",
    devMedia: [
      { type: "video", src: "/project-imgs/rasta-santa/rastasanta_level1preview.mp4", label: "Level 1 Gameplay Preview" },
      { type: "image", src: "/project-imgs/rasta-santa/rastasanta_ragdollscript.png", label: "Ragdoll Script" },
      { type: "image", src: "/project-imgs/rasta-santa/rastasanta_prototypescene.png", label: "Prototype Scene" },
    ],
  },
  {
    title: "Grow Farm Garden: Cozy Farming",
    type: projectType.professional,
    company: "Deluxe Creation Studios",
    imgSrc: "/project-imgs/grow-a-farm/growafarm_header.png",
    code: "https://play.google.com/store/apps/dev?id=8936338793500634705",
    projectLink: {
      playStore: "https://play.google.com/store/apps/details?id=grow.garden.farm",
      appStore: "https://apps.apple.com/ng/app/grow-farm-garden-cozy-farming/id6752514031",
    },
    tech: ["Unity", "C#", "3D", "Simulation", "Physics", "Android"],
    description:
      "A 3D cozy farming simulator that emphasizes physics-based challenges, including harvesting, packing, and delivering produce. Grow your garden and manage your farm in a relaxing experience.",
    devInfo: {
      game: "Grow Farm Garden: Cozy Farming",
      company: "Deluxe Creation Studios",
      genre: "Simulation / Physics",
      engine: "Unity",
      platforms: "Android, iOS",
      role: "Gameplay Programmer",
    },
    about:
      "Grow Farm Garden is a 3D cozy farming simulator developed at Deluxe Creation Studios, where players plant, pack, and transport farm goods. It pairs relaxing farming dynamics with satisfying physical challenges, optimized for mobile devices.",
    responsibilities: [
      "Developed the core gameplay systems, plant, grow, harvest, package and sell.",
      "Created an in-game shop system for purchasing seeds, with inventory that restocks over time, and a separate packaging shop where players can process and sell their harvested crops for profit.",
      "Implemented a physics-based delivery system where players pack and transport harvested goods as stacks of packaging boxes, with realistic weight and collision interactions.",
      "Developed a farm animal system where players can raise and care for animals by feeding them crops harvested from your farm, then the animals produce additional goods like milk, eggs and wool, giving players more delivery options and expanding the gameplay loop beyond just crops.",
      "Added a truck mechanic for faster commuting and delivery across the farm, including vehicle handling and navigation logic.",
      "Implemented a watering can tool that players can use to water crops and accelerate their growth, along with a tap system for collecting water to refill the can.",
      "Built a delivery request system where completing specific orders rewards players with bonus currency, driving long-term engagement and replayability.",
      "Integrated final low-poly 3D models from the assets team once all physics interactions were validated and tuned.",
    ],
    projectEvolution:
      "The concept for Grow Farm Garden was sparked by the explosive success of 'Grow a Garden' games on Roblox, which dominated the platform's charts for months. We saw an opportunity to take that addictive progression loop; plant, grow, harvest, sell and then add our own twist, which introduced a physics-based delivery system, raising farm animals that also produced goods like eggs and milk, a truck for faster commuting and delivery, as well as delivery requests which, when completed, allow the player to earn bonus currency. As we layered in the economy system and other mechanics, the game evolved from a simple farming sim into a physics-driven puzzle where growing and delivering crops became half the fun.",
    devMedia: [
      { type: "video", src: "/project-imgs/grow-a-farm/growafarm_gamepreview.mp4", label: "Game Preview" },
      { type: "image", src: "/project-imgs/grow-a-farm/growafarm_seedsSO.png", label: "Seeds ScriptableObject" },
      { type: "image", src: "/project-imgs/grow-a-farm/growafarm_seedscript.png", label: "Seed Script" },
    ],
  },
  {
    title: "Captain EcoGen: Save the Planet",
    type: projectType.professional,
    company: "Deluxe Creation Studios",
    imgSrc: "/project-imgs/captain-ecogen/captainecogen_header.png",
    code: "https://play.google.com/store/apps/dev?id=8936338793500634705",
    projectLink: {
      playStore: "https://play.google.com/store/apps/details?id=planet.EcoGen.PlayGreen",
      appStore: "https://apps.apple.com/ng/app/captain-ecogen-save-the-planet/id6499124779",
    },
    tech: ["Unity", "C#", "3D", "Environmental Action", "Educational", "Android"],
    description:
      "A hybrid city-building and educational game where players design and develop a sustainable city while completing real-world recycling tasks to earn rewards.",
    devInfo: {
      game: "Captain EcoGen: Save the Planet",
      company: "Deluxe Creation Studios",
      genre: "Environmental Action / Educational",
      engine: "Unity",
      platforms: "Android, iOS",
      role: "Gameplay Programmer",
    },
    about:
      "Captain EcoGen is an educational environmental game developed at Deluxe Creation Studios, set across the streets and coastlines of Lagos, Nigeria. Guided by Tinu, a young Nigerian hero, players clean streets, sort waste, recycle trash into solar energy, and restore power to communities. The game goes beyond the screen through AI-verified real-world Eco Missions, where players collect actual waste, photograph it, and a computer vision model identifies each item to earn in-game rewards for real-world impact.",
    responsibilities: [
      "Programmed the core third-person top-down player controller and trash collection mechanics for the Street Cleanup mode, where players navigate Lagos streets gathering waste.",
      "Built the Ocean Cleanup mode with jetski handling, physics-based movement, and waterborne trash collection mechanics.",
      "Developed a classic runner level with left/right, jump, and slide controls, where the collectibles are trash items that players take to the recycling factory.",
      "Created a trash sorting minigame where players match similar waste objects together, rewarding bonus power cells on completion.",
      "Implemented the recycling-to-power-cell pipeline: collected trash is processed at the recycling factory into power cells, which players deliver to off-grid villages to restore their electricity.",
      "Built a fun fact popup system that triggers educational facts about recycling, solar energy, and pollution whenever players perform key actions like collecting trash, recycling, or producing power. Collected facts are stored in an in-game archive for revisiting.",
      "Developed the in-game mission system that assigns players specific tasks and rewards them upon completion, driving structured progression across all game modes.",
      "Integrated real-world Eco Missions using the AI image recognition system (from the Unity Image Recognition project), allowing players to photograph real-world waste for daily refreshed tasks that reward in-game currency.",
      "Built a community cleanup system with grid-based placement for dumpsters and trees that automatically collect garbage within their radius and purify the surrounding air.",
      "Built a dialogue and multi-choice option system for NPC interaction and quest selection.",
    ],
    projectEvolution:
      "It started as a straightforward third-person game where the player picks up trash from the environment, but after testing, the initial gameplay didn't communicate the environmental message strongly enough. So we redesigned the environment into a city and switched the camera to a top-down perspective so the player could really see how dirty the surroundings were. Outside the city was an ocean, which the player also had to clean up using a jetski to collect waterborne waste. Then came the fun fact system, one of the earliest and most enduring features. Every time the player collects trash, recycles, or produces electricity, real facts about waste, renewable energy, the ocean, and the planet are displayed, reinforcing the educational core of the game. Every fact collected can be revisited from the fact archive. We added a runner level set in rural villages, trash and obstacles are procedurally generated and the player collects waste along the way. The recycling loop tied everything together, turning all collected waste into power cells that players deliver to real communities to help with the problem of electricity. We also added a trash sorting minigame that players can use to earn extra power cells if they are a few short of purchasing electricity generation, rather than going back to collect and recycle, and it also gave players a quick break from the usual gameplay loop. In order to further encourage players to not just play the game but also work towards a cleaner environment, we integrated real-world Eco Missions powered by the same AI image recognition system I built as a separate project, letting players photograph actual waste for daily tasks verified by computer vision. The game has been rebuilt and redesigned so many times that it would be hard to tell it is the same game when comparing the previous and current states, and there is a good chance it will continue to evolve further.",
    devMedia: [
      { type: "video", src: "/project-imgs/captain-ecogen/captainecogen_gamepreview.mp4", label: "Game Preview" },
      { type: "image", src: "/project-imgs/captain-ecogen/captainecogen_dialoguescript.png", label: "Dialogue Script" },
      { type: "image", src: "/project-imgs/captain-ecogen/captainecogen_questSO.jpg", label: "Quest ScriptableObject" },
    ],
  },
  {
    title: "Finger Gunner: AI Robot FPS",
    type: projectType.professional,
    company: "Deluxe Creation Studios",
    imgSrc: "/project-imgs/finger-gunner/fingergunnerfps_header.png",
    code: "https://play.google.com/store/apps/dev?id=8936338793500634705",
    projectLink: {
      playStore: "https://play.google.com/store/apps/details?id=finger.gunner.shooterfps",
      appStore: "https://apps.apple.com/ng/app/finger-gunner-fps/id6446219081",
    },
    tech: ["Unity", "C#", "3D", "FPS", "AI", "Touch Controls", "Android"],
    description:
      "A fast-paced first-person sci-fi shooter where players wield gesture-powered combat gloves to battle waves of rogue AI robots and bosses using unique energy blasts, lightning shots, and black hole pulls.",
    devInfo: {
      game: "Finger Gunner: AI Robot FPS",
      company: "Deluxe Creation Studios",
      genre: "FPS / Action",
      engine: "Unity",
      platforms: "Android, iOS",
      role: "Gameplay Programmer",
    },
    about:
      "Finger Gunner: AI Robot FPS is a fast-paced mobile sci-fi first person shooter set in a world overrun by rogue AI. With conventional weapons compromised, players equip gesture-powered combat gloves that transform finger-gun gesture into destructive energy attacks, blasting through waves of killer machines and demanding boss battles.",
    responsibilities: [
      "Programmed the touch-based shooting and combat controls, mapping player inputs to responsive firing states and special ability triggers.",
      "Designed and implemented an arsenal of unlockable abilities, including rapid energy blasts, piercing lightning shots, crowd-controlling black hole pulls, and rocket-style explosive bursts.",
      "Integrated the first-person hand animation state machine, synchronizing distinct finger-gun hand animations to visually represent each special attack.",
      "Developed finite state machines (FSM) and AI tracking behaviors for diverse waves of rogue machines and escalating robotic enemy archetypes.",
      "Engineered multi-phase boss encounters with dynamic attack patterns and specialized threat mechanics designed to test player reflexes and ability timing.",
      "Structured the combat and ability managers to be fully decoupled and modular, making it seamless to balance damage values, cooldowns, and introduce new abilities without impacting core gameplay loops.",
      "Collaborated closely with 3D artists and animators to synchronize glove models, visual FX, and audio cues with corresponding attack animations.",
    ],
    projectEvolution:
      "Finger Gunner required very little structural iteration throughout development because the core mobile shooting loop was straightforward and engaging right from the initial prototype. The foundation of aiming to shoot waves of rogue robots in first-person worked effectively on touchscreen devices. Later in development, we focused on enhancing the combat presentation: we introduced unique animated hand gestures for the character to perform whenever activating special attacks like lightning blasts, black holes, and rocket bursts. This gave each power a distinct visual personality, turning childhood finger-gun motions into expressive in-game abilities and adding satisfying feedback to the fast-paced gameplay.",
    devMedia: [
      { type: "video", src: "/project-imgs/finger-gunner/fingergunner_previewvideo.mp4", label: "Gameplay Preview" },
      { type: "image", src: "/project-imgs/finger-gunner/fingergunner_enemyhealthmanagerfsm.jpg", label: "Enemy Health Manager FSM" },
      { type: "image", src: "/project-imgs/finger-gunner/fingergunner_wavemanagerfsm.jpg", label: "Wave Manager FSM" },
    ],
  },
  {
    title: "Dribble Run: Football Skills",
    type: projectType.professional,
    company: "Deluxe Creation Studios",
    imgSrc: "/project-imgs/dribble-run/dribblerun_header.png",
    code: "https://play.google.com/store/apps/dev?id=8936338793500634705",
    projectLink: {
      playStore: "https://play.google.com/store/apps/details?id=dribble.run.football.soccer",
      appStore: "https://apps.apple.com/ng/app/football-dribble-run/id1659580149",
    },
    tech: ["Unity", "C#", "3D", "Sports", "Runner", "Android"],
    description:
      "A swipe-based football runner game where players dribble past defenders and complete football challenges including penalty shootouts and free kicks at the finish line.",
    devInfo: {
      game: "Dribble Run: Football Skills",
      company: "Deluxe Creation Studios",
      genre: "Sports / Runner",
      engine: "Unity",
      platforms: "Android, iOS",
      role: "Gameplay Programmer",
    },
    about:
      "Dribble Run is an arcade football runner developed at Deluxe Creation Studios that merges swipe-based runner systems with arcade football challenges. Players run down a linear path, dodge opposing defenders, and perform penalty kick challenges at the stadium finish line.",
    responsibilities: [
      "Coded the movement mechanics, touch input registers, and the final scoring minigames including penalty shootouts and free kicks.",
      "Built the runner tracking system during blockout phase with primitive blocks representing fields, gates, and players to perfect physics and ball responsiveness.",
      "Built a procedural obstacle, gate, and coin spawner system that generates unique level layouts on every run, with progressive difficulty scaling to keep players challenged as they advance.",
      "Designed and implemented a modular defender and obstacle layout framework, enabling rapid construction of varied obstacle courses without manual level design for each stage.",
      "Programmed directional dribble animations that dynamically respond to the player's swipe direction, creating fluid and realistic ball-handling visuals during gameplay.",
      "Created two distinct end-of-level minigames: a penalty shootout mode with goalkeeper AI and aim mechanics, and a powershot mode featuring satisfying glass-breaking physics on impact.",
      "Implemented a full in-game currency and shop system, allowing players to earn coins during runs and spend them on new dribbles and level complete celebration animations.",
      "Developed a character switching feature with a dedicated selection menu, letting players choose between a male and a female character with unique jersey designs.",
      "Pivoted the design from a simple endless runner with instant-death mechanics to a multiplier/merging system based on modern hypercasual trends, drastically increasing engagement.",
      "Worked with graphic designers to replace blockout primitives with professional soccer assets and environments.",
    ],
    projectEvolution:
      "Dribble Run started life as a straightforward endless runner where colliding with a single defender meant instant game over. It worked, but retention data told a clear story: players were churning after just a few sessions. After studying modern hypercasual trends, we made a bold pivot: we removed the instant-death condition entirely and replaced it with a multiplier and merging system where dodging defenders builds your frenzy and hitting gates multiplies your ball power. The procedural spawner I built ensured that no two runs felt the same, with obstacles, gates, and coin patterns generating fresh layouts every time. We then layered in end-of-level minigames, including penalty shootouts and powershot glass-breaking challenges, to give each run a satisfying climax. The result was a completely different game: engagement metrics jumped, and the addition of a dribble shop and player celebration based on popular real-world player celebrations gave players long-term goals to chase.",
    devMedia: [
      { type: "video", src: "/project-imgs/dribble-run/dribblerun_previewvideo.mp4", label: "Gameplay Preview" },
      { type: "image", src: "/project-imgs/dribble-run/dribblerun_playerdribblefsm.jpg", label: "Player Dribble FSM" },
      { type: "image", src: "/project-imgs/dribble-run/dribblerun_enemyspawnerfsm.jpg", label: "Enemy Spawner FSM" },
    ],
  },
  {
    title: "Unity Image Recognition",
    type: projectType.personal,
    company: "Personal Project",
    imgSrc: "/project-imgs/unity-image-recognition/unityrecog_header.png",
    code: "https://github.com/DanielZeus2099/Unity-Image-Recognition-Project",
    projectLink: "https://vt.tiktok.com/ZSCcuTXah/",
    tech: ["Unity 6", "C#", "Unity Sentis", "ONNX", "Deep Learning", "GPU Compute"],
    description:
      "A real-time image classification and AI inference project built natively inside Unity 6 using Unity Sentis and MobileNetV2 ONNX models.",
    devInfo: {
      game: "Unity Image Recognition",
      company: "Personal Project",
      genre: "AI / Deep Learning",
      engine: "Unity 6",
      platforms: "Desktop, Mobile",
      role: "Sole Developer",
    },
    about:
      "This project demonstrates a real-time image classification and AI inference system built natively inside Unity 6 using the Unity Sentis framework (formerly Barracuda). Rather than relying on external web APIs, the system executes deep learning models directly in the engine to identify and classify objects found in input images, either from a live camera stream or a gallery texture.",
    responsibilities: [
      "Researched, developed, and open-sourced the entire repository end-to-end as a solo project.",
      "Wrote core preprocessing scripts to reshape input textures into standard ONNX-compliant tensors, converting Texture2D formats to the required 1×3×224×224 shape.",
      "Set up the full inference pipeline using GPU Compute acceleration through Unity Sentis for real-time classification.",
      "Implemented features for sorting top class predictions and querying target confidence parameters.",
      "Originally born out of research for a Pokémon GO-style recyclables-tracking feature planned for Captain EcoGen, then packaged the result as a reusable template for other Unity developers.",
    ],
    projectEvolution:
      "This project began as R&D for Captain EcoGen. We wanted a Pokémon GO-style feature where players could scan real-world plastic bottles and paper boxes with their phone camera to earn in-game recycling points. Cloud-based image recognition APIs introduced too much latency and required constant internet, which wasn't viable for our target audience. I discovered Unity Sentis (formerly Barracuda), which allows ONNX neural network models to run directly on-device using GPU Compute. After successfully getting MobileNetV2 classifying objects in real-time inside Unity, I realized this pipeline had value far beyond our game. I extracted the system into a clean, open-source template with documented preprocessing scripts, making it easy for any Unity developer to drop in their own ONNX model and run in-engine classification without writing a single line of ML code.",
    devMedia: [
      { type: "video", src: "/project-imgs/unity-image-recognition/unityrecog_previewvideo.mp4", label: "Real-time inference demo" },
      { type: "image", src: "/project-imgs/unity-image-recognition/unityrecog_preview1.png", label: "Tensor layout mapping" },
      { type: "image", src: "/project-imgs/unity-image-recognition/unityrecog_preview2.png", label: "ONNX graph layout" },
    ],
  },
];