/* ==========================================================================
   Portfolio — content file
   --------------------------------------------------------------------------
   Every bit of text, every image path, every link and every colour lives here.
   Save the file, refresh the browser. You never need to touch the HTML.

   QUICK START
   1. Edit "Site basics" below (name, email, tagline).
   2. Fill in games / media / paintings one block at a time.
   3. Images: drop files into img/, then write the path here.
      An empty string "" shows a placeholder, so nothing ever looks broken.

   Image paths are relative to the site root:
      cover:  "img/101.webp"
      slides: ["img/102.webp", "img/103.webp"]

   Field reference:
      slug     url suffix — lowercase letters, numbers and hyphens only, must be unique
      no       index number, display only
      title    work title
      kind     category / subtitle, e.g. "2D Platformer"
      tagline  one-line hook shown on the home page
      about    body paragraphs, one string per paragraph
      meta     specs, shown in the detail page fact list
      palette  per-project page colours; delete to use the site default
      cover    cover image
      slides   gallery below the text on the detail page
      video    mp4 path OR a YouTube link — YouTube is embedded as a player
      links    external buttons: { label: "itch.io", url: "https://..." }
   ========================================================================== */

window.SITE = {

  /* ------------------------------------------------------------ Site basics */
  name: "Boran",
  initials: "B",                              // ← corner logo
  email: "borandyx@gmail.com",
  role: "Game Design · Interactive Art · Painting",
  tagline: "Whatever the medium — canvas, code or space — I ask one question:",
  taglineSerif: "what will someone feel?",
  location: "",                               // ← TODO: e.g. "Shanghai"

  socials: [],                                 // ← add { label, url } here if you want link buttons

  /* ------------------------------------------------------------------ About */
  bio: {
    portrait: "",                              // ← TODO: e.g. "img/portrait.jpg"
    intro: [
      "Hi, I'm Boran, an artist, game designer, and programmer who builds worlds people can feel.",
      "I started with painting ten years ago. My recent series explores pain and healing, from crowded medicine bottles to the slow days of recovering from knee surgery. In my sculpture Aftergrowth, modeled in Blender and ZBrush and 3D-printed, golden forms grow out of my old paint box.",
      "But I wanted people not only to look at my work, but to step inside it. That led me to games. In Bubble Surge, made in 48 hours for Global Game Jam 2025, every jump shrinks the bubble protecting the heroine, so players feel her pressure without reading a word. It won Best Sound and Best Teamwork at our site and was released on Steam. I also built a VR game that turns China's school calisthenics into a color challenge, and I founded my school's game club, Digital Oasis.",
      "Between canvas and code are my installation Luck Factory and my animated short Melody in Flames.",
      "Whatever the medium, I ask one question: what will someone feel? I hope to create worlds that don't help people escape reality, but help them understand each other."
    ],
    skills: [
      "Painting", "Game Design", "Programming", "VR Development",
      "Blender", "ZBrush", "3D Printing", "Interactive Installation"
    ]
  },

  /* ================================================================
     01 — Games
     ================================================================ */
  games: [
    {
      slug: "broadcast-calisthenics",
      no: "01",
      title: "BROADCAST CALISTHENICS",
      kind: "VR Sports Game",
      engine: "",
      date: "",
      context: "Independent Project",
      position: "Designer & Developer",
      tagline: "Play a chameleon on a neon cyberpunk stage — catch the right fruit before the countdown ends.",
      about: [
        "Broadcast Calisthenics is a VR motion-controlled game developed entirely by me. Players take on the role of a chameleon on a neon-lit cyberpunk stage, catching incoming fruits to change their body color.",
        "The goal is to match the target color before the countdown ends. Successful attempts are rewarded with digital candy, while failed attempts leave the chameleon wrapped in a cloud of cotton-like static, accompanied by electronic laughter."
      ],
      meta: [],
      palette: { bg: "#1c0f07", fg: "#fff1dc", accent: "#f6a821", accent2: "#ff6a3d" },
      homeCover: "img/100.webp",
      cover: "img/101.webp",
      slides: ["img/102.webp", "img/103.webp", "img/104.webp"],
      links: [{ label: "Video Link", url: "https://youtu.be/BZFgLEKBqzY" }]
    },
    {
      slug: "bubble-surge",
      no: "02",
      title: "Bubble Surge",
      kind: "2D Platformer",
      engine: "",
      date: "2025",
      context: "Global Game Jam · Team of 5",
      position: "Programmer, Designer, Level Designer",
      tagline: "A bubble-powered platformer built in 48 hours for Global Game Jam 2025.",
      about: [
        "Bubble Surge was our entry for Global Game Jam 2025, created within a 48-hour development sprint. Our team consisted of 5 people: 2 artists, 2 programmers and 1 composer.",
        "I took on multiple roles: besides assisting with some art assets, I wrote all the code, designed the gameplay mechanics and planned every level. In short, I built the game's core systems and rules from the ground up."
      ],
      meta: ["48-hour jam", "Team of 5"],
      palette: { bg: "#0b1220", fg: "#e8f0ff", accent: "#4ad6ff", accent2: "#b28dff" },
      homeCover: "img/200.webp",
      cover: "img/201.webp",
      slides: [
        "img/202.webp",
        "img/203.webp",
        "img/204.webp",
        "img/205.webp"
      ],
      links: [{ label: "Steam Link", url: "https://store.steampowered.com/app/2555940/_/" }]
    },
    {
      slug: "bee-blast",
      no: "03",
      title: "Bee Blast",
      kind: "2D Puzzle Game",
      engine: "",
      date: "",
      context: "NHSGA · Team of 6",
      position: "Lead Programmer",
      tagline: "A Tetris re-theme for a modern audience, built around a beehive.",
      about: [
        "Bee Blast was our entry for the NHSGA Tetris re-theme assignment, created as a team project. Our team consisted of 6 people.",
        "The brief was to redesign Tetris for a modern audience. We chose a beehive as the theme. I took on multiple roles: I was the lead programmer, designed the gameplay mechanics and planned every level."
      ],
      meta: ["Team of 6", "Tetris re-theme"],
      palette: { bg: "#170d16", fg: "#fbe9f4", accent: "#ff5fa2", accent2: "#ffd166" },
      homeCover: "img/300.webp",
      cover: "img/301.webp",
      slides: [
        "img/302.webp",
        "img/303.webp",
        "img/304.webp",
        "img/305.webp"
      ],
      links: []
    },
    {
      slug: "run-raccoon-run",
      no: "04",
      title: "Run, Raccoon, Run!!!",
      kind: "Local Two-Player · Asymmetric Hide-and-Seek Game",
      engine: "",
      date: "",
      context: "Group Project",
      position: "Lead Developer",
      tagline: "A thieving raccoon versus a security guard, inside a tech company's office.",
      about: [
        "Run, Raccoon, Run!!! is a local two-player hide-and-seek game set inside a tech company's office.",
        "One player takes the role of Klepto, a raccoon stealing secret files to save his home, while the other plays Lena, a security guard using surveillance and pursuit to stop the intruder."
      ],
      meta: ["Local two-player", "Asymmetric"],
      palette: { bg: "#08110f", fg: "#e6fff6", accent: "#3ddc97", accent2: "#ffd23f" },
      homeCover: "img/400.webp",
      cover: "img/401.webp",
      slides: ["img/402.webp", "img/403.webp", "img/404.webp"],
      links: []
    },
    {
      slug: "crime-lab-spy",
      no: "05",
      title: "Crime Lab Spy",
      kind: "Puzzle Game",
      engine: "Unity",
      date: "",
      context: "",
      position: "",
      tagline: "An undercover cop in a gangster drug lab, smuggling information out one puzzle at a time.",
      about: [
        "Crime Lab Spy is a gangster-themed stealth puzzle game. Players take on the role of an undercover cop in a drug lab and must find ways to smuggle the information out while completing their missions."
      ],
      meta: [],
      palette: { bg: "#211a10", fg: "#f7ecd8", accent: "#e0a029", accent2: "#c1573b" },
      homeCover: "img/500.webp",
      cover: "img/501.webp",
      slides: ["img/502.webp", "img/503.webp", "img/504.webp"],
      links: [{ label: "Video Link", url: "https://youtu.be/Hs8xwE648iw" }]
    }
  ],

  /* ================================================================
     02 — Moving image & space: animation / installation / sculpture
     ================================================================ */
  media: [
    {
      slug: "melody-in-flames",
      no: "01",
      title: "Melody in Flames",
      kind: "3D Animation",
      category: "3D Animation",
      engine: "Blender, Adobe Premiere",
      date: "June 2026",
      context: "",
      position: "Written & Directed by Boran",
      meta: ["3D animation", "Blender, Adobe Premiere", "June 2026"],
      tagline: "A comatose boy must sacrifice his cello to save his sister.",
      about: [
        "Trapped in a frozen inner world after a tragic car accident, a comatose boy must sacrifice his beloved cello to save his sister, ultimately awakening to a tearful reunion in the real world."
      ],
      palette: { bg: "#0d1018", fg: "#eef2ff", accent: "#7c9cff", accent2: "#ffb3c7" },
      homeCover: "img/600.webp",
      cover: "img/601.webp",
      slides: ["img/602.webp", "img/603.webp"],
      links: [{ label: "Video Link", url: "https://youtu.be/slDxlf4BkpY" }]
    },
    {
      slug: "luck-factory",
      no: "02",
      title: "Luck Factory",
      kind: "Interactive Installation Design",
      category: "Interactive Installation",
      engine: "",
      date: "",
      context: "",
      position: "",
      meta: ["Capsule machine, conveyor system, responsive digital interface"],
      tagline: "A capsule machine that sells the anticipation, not the reward.",
      about: [
        "Luck Factory explores how gamified purchasing transforms anticipation into something that can be repeatedly consumed. Inspired by blind boxes, gacha systems and other random-reward mechanisms, the installation recreates the cycle of choosing, waiting and revealing through a physical capsule machine, conveyor system and responsive digital interface.",
        "As each capsule moves through the system, projected visuals continuously amplify its rarity, probability and imagined value. However, when the capsule is finally opened, the reward inside is reduced to an undefined piece of white foam. By contrasting an increasingly exciting purchasing process with an intentionally meaningless outcome, the project questions whether consumers are buying the object itself, or the expectation produced before the reward is revealed."
      ],
      palette: { bg: "#0a0f0d", fg: "#e9fff8", accent: "#5ce1b6", accent2: "#ff7ac6" },
      cover: "img/701.webp",
      slides: [
        "img/702.webp",
        "img/703.webp",
        "img/704.webp",
        "img/705.webp",
        "img/706.webp"
      ],
      links: [{ label: "Video Link", url: "https://youtu.be/33uddWBieW8" }]
    },
    {
      slug: "aftergrowth",
      no: "03",
      title: "Aftergrowth",
      kind: "Sculpture · FDM 3D Printing",
      category: "Sculpture",
      engine: "Blender, Zbrush",
      date: "2026.9",
      context: "",
      position: "",
      meta: [
        "Fused deposition modeling, water-based metallic paint",
        "Polylactic acid",
        "210mm W × 200mm D × 150mm H"
      ],
      tagline: "On creativity growing through the most restrictive training.",
      about: [
        "For a time in middle school, I trained for a competitive art entrance examination. Hours of repetitive exercises seemed to value scores over creativity, gradually distancing me from what I believed art should be. Yet looking back, I discovered something unexpected: my desire to create had never disappeared. Instead, it had quietly grown through those difficult experiences, taking on a shape uniquely my own.",
        "This sculpture explores how even the most restrictive experiences can become the ground for personal artistic growth."
      ],
      palette: { bg: "#141210", fg: "#f2ece3", accent: "#d97742", accent2: "#9aa7b0" },
      cover: "img/801.webp",
      slides: ["img/802.webp", "img/803.webp"],
      links: []
    }
  ],

  /* ================================================================
     03 — Painting
     ================================================================ */
  paintings: [
    {
      slug: "five-colours-of-endurance",
      no: "01", title: "Five Colours of Endurance", kind: "Drawing",
      category: "Drawing", engine: "", date: "2024.10", context: "", position: "",
      meta: ["Pen, acrylic marker, pencil", "14.6in × 10.2in"],
      tagline: "On athletes who keep going through pain.",
      about: [
        "Competitive sports are often defined by speed, victory, and achievement, but I am more interested in the moments when athletes choose to continue despite injury, illness, or setbacks. This work explores the tension between physical vulnerability and mental resilience.",
        "The five cycling stripes running through the composition symbolize both the race itself and the determination to keep moving forward through pain."
      ],
      palette: { bg: "#161311", fg: "#f4ece2", accent: "#e08a4c", accent2: "#8c9a8e" },
      cover: "img/901.webp", video: "",
      slides: ["img/902.webp", "img/903.webp"],
      links: []
    },
    {
      slug: "the-headline-burns",
      no: "02", title: "The Headline Burns", kind: "Newspaper, shrink plastic, acrylic",
      category: "Drawing", engine: "", date: "2024.11", context: "", position: "",
      meta: [
        "Newspaper, photographs, burnt newspaper, shrink plastic, muslin, acrylic",
        "16.4in × 12.5in"
      ],
      tagline: "On peace declared, and the wounds that do not end with it.",
      about: [
        "A war may officially end with a newspaper headline, but the physical and psychological wounds it leaves behind do not disappear so easily. This work explores the contradiction between the historical declaration of peace and the lasting suffering of individuals.",
        "Burnt newspapers, ruined buildings, exposed bones, and scar-like red textures become fragments of a collective memory, questioning what it really means for a war to be over."
      ],
      palette: { bg: "#161311", fg: "#f4ece2", accent: "#c9502f", accent2: "#8c9a8e" },
      cover: "img/904.webp", video: "",
      slides: ["img/905.webp"],
      links: []
    },
    {
      slug: "time-passes-slowly",
      no: "03", title: "Time Passes Slowly", kind: "Charcoal, colored pencil",
      category: "Drawing", engine: "", date: "2024.11", context: "", position: "",
      meta: ["Charcoal, colored pencil", "16.4in × 12.5in"],
      tagline: "On recovery, and time that refuses to move.",
      about: [
        "Recovering from knee surgery made me realize that pain affects not only the body but also our perception of time and space. When movement becomes restricted, even ordinary moments can feel unbearably long.",
        "Through a first-person perspective, monochromatic tones, and heavy shadows, I wanted to visualize the helplessness, anxiety, and prolonged stillness that shaped my experience of recovery."
      ],
      palette: { bg: "#0e1013", fg: "#e7e9ee", accent: "#8e9bb5", accent2: "#d6c7a8" },
      cover: "img/906.webp", video: "",
      slides: ["img/907.webp"],
      links: []
    },
    {
      slug: "drip-by-drip",
      no: "04", title: "Drip by Drip", kind: "Acrylic marker",
      category: "Drawing", engine: "", date: "2024.12", context: "", position: "",
      meta: ["Acrylic marker", "14.6in × 10.2in"],
      tagline: "On medicine as both cure and trigger.",
      about: [
        "Medicine and medical equipment are designed to help us heal, yet they can also trigger memories of pain, fear, and anxiety. This work explores the contradictory nature of medical objects: they represent both recovery and distress.",
        "By crowding the composition with tilted medicine bottles, syringes, and IV bags, I wanted familiar objects to become visually overwhelming. The bright colors create a contrast between their ordinary appearance and the discomfort they evoke."
      ],
      palette: { bg: "#191510", fg: "#f7efdf", accent: "#f0b429", accent2: "#c96f4a" },
      cover: "img/908.webp", video: "",
      slides: ["img/909.webp"],
      links: []
    },
    {
      slug: "daily-dose",
      no: "05", title: "Daily Dose", kind: "Acrylic marker, masking tape",
      category: "Drawing", engine: "", date: "2025.1", context: "", position: "",
      meta: ["Acrylic marker, masking tape", "14.6in × 10.2in"],
      tagline: "On treatment becoming just another routine.",
      about: [
        "When taking medicine becomes part of everyday life, treatment itself can begin to feel like another burden. This work explores the repetitive routines of recovery through scattered pills, bottles, and blister packs.",
        "Rather than focusing on the immediate fear of medical procedures, I wanted to examine how pain gradually enters ordinary life. The folded, bandage-like textures suggest a body continuously surrounded by treatment, caught between healing and restriction."
      ],
      palette: { bg: "#1a0d0d", fg: "#ffeceb", accent: "#ff4d4d", accent2: "#ffbfa3" },
      cover: "img/910.webp", video: "",
      slides: ["img/911.webp", "img/912.webp"],
      links: []
    },
    {
      slug: "what-the-skin-remembers",
      no: "06", title: "What the Skin Remembers", kind: "Shrink plastic, muslin, acrylic",
      category: "Drawing", engine: "", date: "2025.3", context: "", position: "",
      meta: [
        "Shrink plastic, muslin, acrylic, glue; digital collage in Photoshop",
        "14.6in × 10.2in"
      ],
      tagline: "On what the body keeps after a wound has closed.",
      about: [
        "When a wound heals, does the experience of pain truly disappear? This work explores how the body preserves memories of trauma through scars, skin textures, and sensations.",
        "I see the skin as a surface that records past experiences. Through distorted materials, damaged textures, and repeated images of hands, I investigate the relationship between injury and healing, suggesting that even after a wound has closed, the body may continue to carry its memory."
      ],
      palette: { bg: "#101312", fg: "#e8efea", accent: "#7fa88f", accent2: "#d9d2c5" },
      cover: "img/913.webp", video: "",
      slides: ["img/914.webp"],
      links: []
    }
  ]
};
