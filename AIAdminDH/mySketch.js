let officeImage;
let characterImage; // New image for character screen
let currentRoom = "splash"; // Start with the splash screen
let currentZone = ""; // Tracks the current zone (monitor, door, phone, or none)
let dialogueText = ""; // Holds the dialogue text for interactions
let interactionActive = false; // Controls whether an interaction is active
let options = []; // Array to hold interaction options
let currentChallenge = {}; // Holds the current challenge for the interaction
let challengesCompleted = 0; // Track the number of challenges completed
let endgameMessage = ""; // Message to display in the endgame screen
let selectedBook = ""; // Store the selected book description
let selectedColor; // Store the selected color for the book
let doorImages = {}; // Store the preloaded images
let phoneImage;
let feedbackMessage;
let reputationChangeMessage;

// Reputation scores (start at 5)
let facultyReputation = 5;
let adminReputation = 5;
let studentReputation = 5;

let initialBooks = [
  "You pick up Matthew Kirschenbaum's *Mechanisms.* He makes a compelling case that hard drives have souls—or at least file allocation tables. You wonder if your center's server room needs an exorcist after last week's mysterious data corruption.",
  "You flip through Safiya Noble's *Algorithms of Oppression.* Noble's insights make you realize your 'neutral' text analysis tool has been subtly racist this whole time. Time to add another ethics workshop to the calendar.",
  "You glance at Lauren Klein and Catherine D'Ignazio's *Data Feminism.* They argue data never speaks for itself—which explains why your visualizations keep mumbling incomprehensibly at faculty presentations.",
  "You open Tara McPherson's *Feminist in a Software Lab.* McPherson connects code to culture in ways that make you question every curly brace. Suddenly, your Python scripts feel politically charged.",
  "You scan *The Environmental Cost of GPUs: A Horror Story.* This one's self-published by a grad student who calculated their carbon footprint. The dedication reads: 'To the polar bears I've personally melted.'",
  "You pause at *Grant Writing for the Perpetually Rejected.* Chapter 3, 'How to Explain Digital Humanities to Scientists,' is just a single page that says 'Good luck with that.'",
  "You find Jessica Marie Johnson's *Wicked Flesh.* Johnson's digital history methods are revolutionary, but you're still trying to explain to IT why the slavery database needs more than 8GB of RAM.",
  "You turn the pages of *ChatGPT Ate My Homework: A Professor's Lament.* It's 400 pages of increasingly unhinged emails from faculty who can't tell student writing from AI anymore. The appendix is just crying emojis.",
  "You examine Alan Liu's *The Laws of Cool.* Liu predicted digital humanities would be cool. Twenty years later, you're still waiting for the leather jackets and motorcycles he promised.",
  "You flip open *Managing Humanities Researchers: Like Herding Cats, But the Cats Have Tenure.* The book is mostly pictures of cats sitting on keyboards, which honestly explains a lot about your project timelines.",
  "You pick up Ted Underwood's *Distant Horizons.* His machine learning approach to literature is brilliant, but you're pretty sure your neural network just wrote fanfiction about Moby Dick and Pride and Prejudice.",
  "You leaf through *Python for Humanists Who Still Miss the Semicolon.* Every code example includes at least three literary references and a footnote explaining why loops are a metaphor for existence.",
  "You grab *The CUDA Programming Guide.* You bought this to understand GPU computing, but it mostly serves as a monitor stand. The bookmark is still on page 3, where it's been since 2019.",
  "You pick up Rita Raley's *Tactical Media.* Raley's vision of digital resistance is inspiring, though your biggest act of rebellion lately was using Comic Sans in a budget presentation.",
  "You find *Debugging Your Digital Humanities Project: A Tragicomedy.* Chapter 1 begins: 'It worked on my machine.' Chapter 12 ends: 'Have you tried turning civilization off and on again?'",
  "You glance at N. Katherine Hayles' *How We Think.* Hayles argues humans and machines think together now. Your laptop agrees by crashing right when you need it most.",
  "You open *The Art of Explaining APIs to Medievalists.* It's mostly diagrams comparing REST endpoints to monastery scriptoriums. Somehow, this actually works.",
  "You flip through Miriam Posner's essays on DH infrastructure. She's right about everything, which makes you feel worse about your center's duct-taped-together tech stack.",
  "You pause at *Sustainable Computing for the Humanities.* It suggests running your text analysis on a Raspberry Pi. Your 10TB corpus laughs at this suggestion.",
  "You leaf through *Privacy in the Age of Big Data: LOL JK.* It's just 200 pages of screenshots showing what Google knows about you. The author's therapy bills are included as an appendix.",
  "You examine *When Your OCR Thinks Everything is Germanic: A Troubleshooting Guide.* Every example shows Latin text being interpreted as shopping lists in Swedish.",
  "You grab *The Complete Guide to Center Budgeting.* Someone has annotated it heavily. Most notes just say 'HA!' next to the suggested allocations for 'miscellaneous technical expenses.'",
  "You find Johanna Drucker's *SpecLab.* Her experimental approach to digital aesthetics is groundbreaking, but you're still explaining why the humanities need anything fancier than Microsoft Word.",
  "You open *Version Control for Academics: Git Gud or Git Out.* Half the book is just explaining why 'final_FINAL_reallyFinal_v2_ACTUALFINAL.docx' isn't sustainable.",
  "You pick up *The Ethical AI Handbook for Humanities Centers.* It's surprisingly thin. Page 1 just says: 'Have you considered not using AI?' The remaining pages are blank for notes."
];

let books = initialBooks;
		
// Email challenges for the monitor
// Email challenges for the monitor
let initialEmailChallenges = [
  {
    question: "Dear Director,\n\nI've just discovered our text analysis project has been running on the campus servers for 72 hours straight. The sustainability office is asking why our carbon footprint looks like Godzilla's. Should I pull the plug or claim we're studying climate change narratives?\n\nSincerely,\nProf. Linda Syntax",
    responses: ["Switch to more efficient algorithms", "Blame it on essential research", "Invest in carbon offsets and pray"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Switch to more efficient algorithms"
      { faculty: +1, admin: -1, student: 0 },  // For "Blame it on essential research"
      { faculty: -1, admin: +1, student: +1 }  // For "Invest in carbon offsets and pray"
    ]
  },
  {
    question: "Dear Director,\n\nMy students are using GPT-4 to generate 'historical' primary sources for their digital archives project. The AI thinks the Civil War had mechs. Should I embrace this steampunk history or insist on actual documents?\n\nBest,\nDr. Harriet Typewell",
    responses: ["Require verified primary sources only", "Use it as a lesson in source criticism", "Submit it to a science fiction journal"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Require verified primary sources only"
      { faculty: 0, admin: 0, student: +1 },   // For "Use it as a lesson in source criticism"
      { faculty: -1, admin: -1, student: +1 }  // For "Submit it to a science fiction journal"
    ]
  },
  {
    question: "Dear Director,\n\nOur facial recognition project for analyzing historical photographs just identified George Washington as three different K-pop stars. The algorithm seems to have strong opinions about 18th-century hairstyles. Should we retrain it or pivot to a boy band history project?\n\nYours,\nProf. Julius Paperjam",
    responses: ["Debug the algorithm immediately", "Add it to our bias case studies", "Launch 'Founding Fathers: The Musical'"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },  // For "Debug the algorithm immediately"
      { faculty: 0, admin: +1, student: +1 },  // For "Add it to our bias case studies"
      { faculty: -1, admin: -1, student: +1 }  // For "Launch 'Founding Fathers: The Musical'"
    ]
  },
  {
    question: "Dear Director,\n\nA student's network visualization of Victorian literature looks suspiciously like their Instagram follower network. They claim it's 'digital autoethnography.' Should I fail them for laziness or nominate them for innovative methodology?\n\nSincerely,\nDr. Janet Scribble",
    responses: ["Demand actual Victorian data", "Explore this as legitimate DH method", "Check if they at least used Gephi"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Demand actual Victorian data"
      { faculty: -1, admin: 0, student: +1 },  // For "Explore this as legitimate DH method"
      { faculty: 0, admin: -1, student: +1 }   // For "Check if they at least used Gephi"
    ]
  },
  {
    question: "Dear Director,\n\nThe library is furious. Apparently, my web scraping tutorial resulted in 30 students simultaneously downloading their entire digital collections. Their servers are smoking, literally. Should I teach responsible scraping or suggest they upgrade from Windows 98?\n\nBest,\nProf. Larry Scribbler",
    responses: ["Implement strict rate limiting", "Apologize and offer server CPR", "Suggest they try turning it off and on"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Implement strict rate limiting"
      { faculty: 0, admin: +1, student: 0 },   // For "Apologize and offer server CPR"
      { faculty: -1, admin: -1, student: +1 }  // For "Suggest they try turning it off and on"
    ]
  },
  {
    question: "Dear Director,\n\nWe've been asked to implement an AI ethics review board for DH projects. The committee wants to meet monthly, but half the members think 'Python' is just a snake and 'GitHub' is a typo. How do we proceed without crushing souls?\n\nBest,\nDean Eloise Bureaucracy",
    responses: ["Provide extensive tech training first", "Focus on ethics, translate the tech", "Replace them with chatbots"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },  // For "Provide extensive tech training first"
      { faculty: 0, admin: +1, student: +1 },  // For "Focus on ethics, translate the tech"
      { faculty: -1, admin: -1, student: +1 }  // For "Replace them with chatbots"
    ]
  },
  {
    question: "Dear Director,\n\nThe President wants all DH projects to be 'accessible, sustainable, and cutting-edge.' Also, the budget is $500. I assume this includes snacks for the launch party. Please advise on which laws of physics we should violate first.\n\nSincerely,\nProvost Gregory Vagueness",
    responses: ["Promise miracles, deliver PDFs", "Explain the reality diplomatically", "Spend it all on really good snacks"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },   // For "Promise miracles, deliver PDFs"
      { faculty: +1, admin: 0, student: 0 },    // For "Explain the reality diplomatically"
      { faculty: +1, admin: -1, student: +1 }   // For "Spend it all on really good snacks"
    ]
  },
  {
    question: "Dear Director,\n\nOur new computer vision project analyzing medieval manuscripts keeps finding UFOs in the marginalia. Either monks were way ahead of their time, or our algorithm needs therapy. Should we publish in Digital Humanities Quarterly or Ancient Aliens?\n\nWarmly,\nPresident Amanda Abstraction",
    responses: ["Retrain with better data", "Embrace interdisciplinary weirdness", "Contact the History Channel"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Retrain with better data"
      { faculty: 0, admin: -1, student: +1 },   // For "Embrace interdisciplinary weirdness"
      { faculty: -1, admin: -1, student: +1 }   // For "Contact the History Channel"
    ]
  },
  {
    question: "Dear Director,\n\nFaculty are complaining that our 'Introduction to DH' workshop assumed they knew what a 'terminal' was. Three professors are now convinced we're training them to be airport staff. How should we adjust our pedagogical approach?\n\nBest regards,\nDean Eloise Bureaucracy",
    responses: ["Start with 'What is a computer?'", "Create visual metaphors for everything", "Lean into the airport theme"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Start with 'What is a computer?'"
      { faculty: +1, admin: 0, student: 0 },    // For "Create visual metaphors for everything"
      { faculty: -1, admin: -1, student: +1 }   // For "Lean into the airport theme"
    ]
  },
  {
    question: "Dear Director,\n\nWe're excited to announce that all DH projects must now include a 'decolonial framework.' No one's quite sure what this means for our TCP/IP protocol analysis project, but we're confident you'll figure it out. Due Friday!\n\nBest,\nProvost Gregory Vagueness",
    responses: ["Host critical theory code reviews", "Acknowledge the irony and proceed", "Decolonize the mainframe"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Host critical theory code reviews"
      { faculty: 0, admin: -1, student: +1 },   // For "Acknowledge the irony and proceed"
      { faculty: -1, admin: -1, student: +1 }   // For "Decolonize the mainframe"
    ]
  }
];

let initialPhoneChallenges = [
  {
    question: "Dean Eloise Bureaucracy: Hi, Director. We've received a complaint that your Python workshop is teaching students to scrape copyrighted materials. The publishers are threatening legal action, and IT is hiding under their desks. Could you, um, make this go away?",
    responses: ["Add ethics modules immediately", "Claim it's for research purposes only", "Blame it on Stack Overflow"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Add ethics modules immediately"
      { faculty: 0, admin: -1, student: +1 },   // For "Claim it's for research purposes only"
      { faculty: -1, admin: -1, student: +1 }   // For "Blame it on Stack Overflow"
    ]
  },
  {
    question: "Student Mark Overload: Hi! So, um, I used GitHub Copilot to write my digital history project, and now it's suggesting I committed war crimes in 1823. I wasn't even born then! Should I push this commit or start over?",
    responses: ["Delete everything and code it yourself", "Debug the anachronisms at least", "Lean into time-travel narrative"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Delete everything and code it yourself"
      { faculty: 0, admin: 0, student: +1 },    // For "Debug the anachronisms at least"
      { faculty: -1, admin: -1, student: +1 }   // For "Lean into time-travel narrative"
    ]
  },
  {
    question: "Provost Gregory Vagueness: Director, I need you to ensure all DH projects are both 'cutting-edge AI' and 'completely transparent about data usage.' Also, no one should feel surveilled. I don't see the contradiction here. Report due Monday!",
    responses: ["Document the inherent paradox", "Create elaborate consent forms", "Install a suggestion box and flee"],
    effects: [
      { faculty: +1, admin: 0, student: 0 },    // For "Document the inherent paradox"
      { faculty: 0, admin: +1, student: -1 },   // For "Create elaborate consent forms"
      { faculty: -1, admin: -1, student: +1 }   // For "Install a suggestion box and flee"
    ]
  },
  {
    question: "President Amanda Abstraction: Hello, Director! Our new AI-powered historical chatbot is telling visitors that Benjamin Franklin invented Bitcoin. Marketing loves it, History department... less so. Thoughts on damage control?",
    responses: ["Immediately retrain the model", "Add historical fact-checkers", "Pivot to alternative history museum"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Immediately retrain the model"
      { faculty: +1, admin: 0, student: -1 },   // For "Add historical fact-checkers"
      { faculty: -1, admin: -1, student: +1 }   // For "Pivot to alternative history museum"
    ]
  },
  {
    question: "Prof. Daisy Stubborn: Director, students in my medieval studies class are using AI to generate Middle English. It's somehow both grammatically perfect and completely nonsensical. How do I grade 'Ye Olde Machine Learning'?",
    responses: ["Ban AI-generated historical languages", "Treat it as creative anachronism", "Make the AI take the midterm"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Ban AI-generated historical languages"
      { faculty: -1, admin: 0, student: +1 },   // For "Treat it as creative anachronism"
      { faculty: 0, admin: -1, student: +1 }    // For "Make the AI take the midterm"
    ]
  },
  {
    question: "Student Bella Panic: Um, Director? My text mining project found that Shakespeare was apparently tweeting in 1599? The timestamps look real but... that can't be right? My professor says I broke history?",
    responses: ["Check your data cleaning pipeline", "Embrace temporal anomalies", "Contact Dr. Who immediately"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Check your data cleaning pipeline"
      { faculty: -1, admin: -1, student: +1 },  // For "Embrace temporal anomalies"
      { faculty: 0, admin: 0, student: +1 }     // For "Contact Dr. Who immediately"
    ]
  },
  {
    question: "Prof. Victor Tech-Savvy: Director, I've created an AI that generates entire digital humanities grants. It's already won $2 million in funding. The catch? No human can understand what we promised to build. Help?",
    responses: ["Hire interpreters immediately", "Let the AI build itself", "Return the money and run"],
    effects: [
      { faculty: 0, admin: +1, student: 0 },    // For "Hire interpreters immediately"
      { faculty: -1, admin: -1, student: +1 },  // For "Let the AI build itself"
      { faculty: +1, admin: +1, student: -1 }   // For "Return the money and run"
    ]
  },
  {
    question: "Dean Eloise Bureaucracy: Director, the IRB wants to review every DH project that uses AI. They're particularly concerned about your 'sentiment analysis of Victorian death notices.' Apparently, the dead can't consent?",
    responses: ["Submit 400 pages of paperwork", "Argue the dead have no privacy", "Suggest séances for consent"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Submit 400 pages of paperwork"
      { faculty: -1, admin: -1, student: +1 },  // For "Argue the dead have no privacy"
      { faculty: 0, admin: -1, student: +1 }    // For "Suggest séances for consent"
    ]
  },
  {
    question: "Student Jamie Excuse: Hey, Director. So, like, I trained a neural network on fan fiction, and now it's writing better scholarly articles than me. Can I list it as a co-author? It's demanding attribution.",
    responses: ["Explain AI can't be an author", "Negotiate with the neural network", "Start an AI rights movement"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Explain AI can't be an author"
      { faculty: -1, admin: 0, student: +1 },   // For "Negotiate with the neural network"
      { faculty: -1, admin: -1, student: +1 }   // For "Start an AI rights movement"
    ]
  },
  {
    question: "Provost Gregory Vagueness: Director, we need all coding bootcamps to be 'accessible to humanities scholars' but also 'industry-ready.' Please make JavaScript poetic and Python philosophical. You have unlimited enthusiasm but no budget.",
    responses: ["Create metaphor-based tutorials", "Recruit poet-programmers", "Teach coding through interpretive dance"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Create metaphor-based tutorials"
      { faculty: 0, admin: 0, student: +1 },    // For "Recruit poet-programmers"
      { faculty: -1, admin: -1, student: +1 }   // For "Teach coding through interpretive dance"
    ]
  }
];
let initialDoorChallenges = [
  {
    question: "Prof. Agnes Overwhelmed: Director, I have three students whose 'digital archives' are just Instagram feeds with scholarly metadata. They're calling it 'auto-ethnographic data curation.' Can we set standards, or is this what DH is now?",
    responses: ["Demand real archival standards", "Embrace social media as archive", "Start your own TikTok archive"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Demand real archival standards"
      { faculty: -1, admin: -1, student: +1 },  // For "Embrace social media as archive"
      { faculty: 0, admin: -1, student: +1 }    // For "Start your own TikTok archive"
    ],
    lastName: "overwhelmed"
  },
  {
    question: "Prof. Sean Confused: Director, I've been asked to teach 'Introduction to Digital Humanities,' but I thought DH meant 'Definitely Humanities.' Do I need to, like, learn computers first? Is Excel considered coding?",
    responses: ["Start him with basic tutorials", "Tell him Excel totally counts", "Suggest he teach analog humanities"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Start him with basic tutorials"
      { faculty: -1, admin: -1, student: +1 },  // For "Tell him Excel totally counts"
      { faculty: 0, admin: -1, student: +1 }    // For "Suggest analog humanities"
    ],
    lastName: "confused"
  },
  {
    question: "Tutor Mia Overexplainer: Director, I'm helping a student whose entire dissertation is GPT-4 analyzing GPT-3 analyzing Victorian novels. It's AI all the way down. Am I supervising a human or training Skynet?",
    responses: ["Insist on human analysis layer", "Let the AIs talk to each other", "Check if student passes Turing test"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Insist on human analysis"
      { faculty: -1, admin: -1, student: +1 },  // For "Let the AIs talk"
      { faculty: 0, admin: 0, student: +1 }     // For "Check Turing test"
    ],
    lastName: "overexplainer"
  },
  {
    question: "Prof. Gary Gadgets: Director, I've created an AI that generates research questions based on trending hashtags. It just suggested 'A Corpus Analysis of Victorian Literature Through the Lens of #HotGirlSummer.' Should I submit this to DHQ?",
    responses: ["Gently suggest traditional topics", "Submit it immediately", "Pivot to meme studies program"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Suggest traditional topics"
      { faculty: -1, admin: -1, student: +1 },  // For "Submit it immediately"
      { faculty: 0, admin: -1, student: +1 }    // For "Pivot to meme studies"
    ],
    lastName: "gadgets"
  },
  {
    question: "Writing Center Tutor Liz Lost: Director, a student's network visualization is so beautiful it made me cry, but I'm pretty sure it's just showing their Spotify connections, not historical data. Do aesthetic lies count as data visualization?",
    responses: ["Demand actual historical data", "If it's pretty, it's valid", "Submit it to MoMA instead"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Demand actual data"
      { faculty: -1, admin: -1, student: +1 },  // For "If it's pretty, it's valid"
      { faculty: 0, admin: -1, student: +1 }    // For "Submit to MoMA"
    ],
    lastName: "lost"
  },
  {
    question: "Admin Assistant Tom Tired: Director, I've spent three days trying to install TensorFlow on the humanities server. It keeps saying 'insufficient poetry modules.' Is this a real error or is the computer mocking me?",
    responses: ["Call IT for proper setup", "Install poetry and see what happens", "Let the server win this round"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Call IT for proper setup"
      { faculty: -1, admin: -1, student: +1 },  // For "Install poetry"
      { faculty: 0, admin: -1, student: +1 }    // For "Let server win"
    ],
    lastName: "tired"
  },
  {
    question: "Prof. Helen Hallway: Director, students are using AI to generate ancient manuscripts, then using more AI to 'discover' them, then using even MORE AI to analyze their findings. Should I report this to archaeology or just watch the ouroboros eat itself?",
    responses: ["Stop the recursive madness", "Document it as performance art", "Apply for a recursion grant"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Stop the madness"
      { faculty: -1, admin: -1, student: +1 },  // For "Document as art"
      { faculty: 0, admin: 0, student: +1 }     // For "Apply for grant"
    ],
    lastName: "hallway"
  },
  {
    question: "Tutor Jake Jittery: Director, a student asked me to explain why their sentiment analysis thinks all medieval texts are 'extremely depressed.' I mean, they're not wrong, but should algorithms be diagnosing historical mental health?",
    responses: ["Recalibrate for historical context", "Medieval times WERE depressing", "Suggest therapy for the algorithm"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Recalibrate for context"
      { faculty: 0, admin: -1, student: +1 },   // For "Medieval times WERE depressing"
      { faculty: -1, admin: -1, student: +1 }   // For "Algorithm therapy"
    ],
    lastName: "jittery"
  },
  {
    question: "Prof. Dana Deadline: Director, I just realized my 'Digital Approaches to Renaissance Drama' course has been teaching students to digitize actual drama—as in department gossip. They've created a beautiful network graph of faculty feuds. Can I count this as DH?",
    responses: ["Redirect to actual Renaissance drama", "Publish the gossip network", "Add 'Digital Dramatics' to curriculum"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Redirect to Renaissance"
      { faculty: -1, admin: -1, student: +1 },  // For "Publish gossip network"
      { faculty: 0, admin: -1, student: +1 }    // For "Add to curriculum"
    ],
    lastName: "deadline"
  },
  {
    question: "Admin Assistant Fran Frazzled: Director, I've been asked to calculate our center's carbon footprint, but every time I open the spreadsheet, another GPU fires up somewhere. Should I count the environmental cost of my despair?",
    responses: ["Implement green computing policies", "Offset with virtual trees", "Count everything, including tears"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Green computing policies"
      { faculty: -1, admin: 0, student: +1 },   // For "Virtual trees"
      { faculty: 0, admin: -1, student: +1 }    // For "Count everything"
    ],
    lastName: "frazzled"
  }
];

// Active challenges (will be filtered as the game progresses)
let emailChallenges = [...initialEmailChallenges];
let phoneChallenges = [...initialPhoneChallenges];
let doorChallenges = [...initialDoorChallenges];
let totalChallenges = initialEmailChallenges.length + initialDoorChallenges.length + initialPhoneChallenges.length;

function preload() {
  // Load the office background image
  officeImage = loadImage('office.png');
	campusImage = loadImage('campus.png');
	phoneImage = loadImage('phone.png');
	characterImage = loadImage('avatar.png'); // Make sure you have a 200x200 character image
	
	initialDoorChallenges.forEach(challenge => {
    let lastName = challenge.lastName; // Get the lastname from the challenge object
    doorImages[lastName] = loadImage(`${lastName}.png`); // Preload each image as lastname.jpg
  });
}

function setup() {
    // Create a canvas of size 1000 by 1000 pixels
    let canvas = createCanvas(1000, 1000);
   canvas.parent('gameContainer'); // Attach the canvas to the #gameContainer div
    // Set up text properties for pixelated look
    textFont('monospace'); // Using a monospace font for a pixelated effect
    noStroke();
  }
  
 

let bookshelfActive = false;

function draw() {
  // Display the appropriate screen based on the current room
  if (currentRoom === "splash") {
    displaySplashScreen();
  } else if (currentRoom === "rulesScreen") {
		displayRulesScreen();
	} else if (currentRoom === "characterScreen") {
    displayCharacterScreen(); // New character screen
  } else if (currentRoom === "intro") {
    displayIntroScreen();
  } else if (currentRoom === "bookshelf" && bookshelfActive === true) {
    displayBookScreen(); // Show the black screen with the selected book text
  } else if (currentRoom === "office") {
    displayOffice();
  } else if (currentRoom === "monitorInteraction") {
    displayMonitorInteraction();
  } else if (currentRoom === "phoneInteraction") {
    displayPhoneInteraction();
  } else if (currentRoom === "doorInteraction") {
    displayDoorInteraction();
  } else if (currentRoom === "reputationFeedback") {
    displayReputationFeedback(); // Show the feedback screen for reputation changes
  } else if (currentRoom === "endgame") {
    displayEndgameScreen();
  }
}
function displayOffice() {
  background(officeImage);
  checkMouseOverZones();
  displayReputation();
//	displayCoordinates();
}
function displayReputationFeedback() {
  background(officeImage); // Dark blue background for the feedback screen
    fill(13, 21, 33, 190); // Dark blue background
    rect(225,225,550,450);;
  	fill(255); // White text
  	textSize(24);
  	textAlign(LEFT, TOP);
  	text(feedbackMessage, 250, 250, 525, 400); // Display the feedback message
  textAlign(CENTER, BOTTOM); // Center the reputation change at the bottom
	fill(255, 140, 0); // Orange
  text(reputationChangeMessage, width / 2, height - 350); // Display the reputation changes
}
function displayEndgameScreen() {
 background(campusImage);
	fill(13, 21, 33, 150); // Dark blue background
  rect(0,0,1000,1000);
	
  // Set up the orange border for the character image
  fill(255, 140, 0); // Orange color for the border
  rect(width - 255, 45, 210, 210); // Draw an orange rectangle slightly larger than the image
  
  // Display the character image in the upper right corner
  image(characterImage, width - 250, 50, 200, 200);

  // Set white color for the text
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
	noStroke();
  // Display the introductory text on the left side
  text(
    endgameMessage, 150, 274, 700, 700 // Text bounds
  );	// Set yellow color for the "Click to begin" text
  fill(255, 204, 51); // Yellow text
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display "Click to begin" centered near the bottom of the screen
  text("Click to try again.", width / 2, height - 250);
	
}

function displaySplashScreen() {  background(campusImage);
	fill(13, 21, 33, 50); // Dark blue background
  rect(0,0,1000,1000);
	noFill();
  stroke(255, 140, 0); // Orange stroke
  strokeWeight(3);
  rect(150, 150, 700, 700);
  // Set white color for text
  fill(255);

  // Display the large title text
  textSize(64); // Large pixelated text
  textAlign(CENTER, CENTER);
  text("AI: Admin Life 2.0", width / 2, height / 2 - 70);

  // Display the subtitle
  textSize(32); // Medium text
  text("(DH Edition)", width / 2, height / 2 - 20);

  // Display the smaller "Click to Play" text
  textSize(32); // Smaller text
  text("Click to Begin", width / 2, height / 2 + 50);
}
function displayRulesScreen() {
  background(campusImage);
	
	fill(13, 21, 33, 150); // Dark blue background
  rect(0,0,1000,1000);
	stroke(255, 140, 0); // Orange stroke
  strokeWeight(3);
	  // Display the large title text
	fill(255);
  textSize(64); // Large pixelated text
  textAlign(CENTER, CENTER);
  text("AI: Admin Life 2.0", width / 2, 120);
  
  // Display the subtitle
  textSize(32); // Medium text
  text("(DH Edition)", width / 2, 170);
	noStroke();
  // Set orange for the headings
  fill(255, 140, 0); // Orange
  textSize(36);
  textAlign(CENTER);
  
  // Display "How to Play" heading
  text("How to Play", width / 2, 250);
  
  // Set white color for the instructions
  fill(255);
  textSize(20);
  textAlign(LEFT);
  
  // Instructions text
  let howToPlayText = "In this game, you occupy the role of a digital humanities center director.\n\n" +
    "Your job is to navigate the endless meetings, emails, phone calls, and office drop-ins, " +
    "while balancing the needs and opinions of faculty, administrators, and students.\n\n" +
    "Mouseover different zones in the office to see what tasks await you, and click to engage. " +
    "Your decisions will gain or lose the approval of everyone else, depending on how well " +
    "you manage each situation.\n\n" +
    "Pay attention to reputation feedback after each action to see how well you're doing—" +
    "but be warned, it’s hard to keep everyone happy!\n\n" +
		"Click to begin!";
  
  // Display the instructions text
  text(howToPlayText, 100, 50, width - 200, height - 200);
    // Display "Credits" heading
  fill(255, 204, 51); // Yellow for the "Credits" heading
  textSize(36);
  textAlign(CENTER);
  text("Credits", width / 2, height - 315);
  
  // Set white color for the credits text
  fill(255);
  textSize(20);
  textAlign(LEFT);
  
  // Credits text
  let creditsText = "AI Version 2.0 - Designed by Anastasia Salter\n\n" +
    "Text, code, and image generation using:\n" +
    "- ChatGPT 4\n" +
    "- DALL-E\n" +
    "- Adobe Firefly\n" +
    "- Claude Opus 4\n\n" +
    "for the 2025 ACH Conference.";
  
  // Display the credits text
  text(creditsText, 200, 700, 600, 250);
}

// Display reputation with a transparent box behind the text
function displayReputation() {
  fill(44, 62, 80, 180); // Transparent dark blue box
  rect(width - 180, 5, 170, 210); // Adjusted box size for larger bars and label

  // Add the "Reputation" label centered above the bars
  fill(255); // White text color
  textSize(28); // Larger text size for "Reputation"
  textAlign(CENTER, CENTER); // Center the text
  text("Reputation", width - 95, 25); // Centered above the bars

  // Define larger bar properties
  let barWidth = 150; // Wider bar
  let barHeight = 30; // Taller bar
  let barX = width - 170; // X position for the bars
  let spacing = 50; // More space between bars for readability
  let firstBarY = 60; // Starting Y position for the first bar
  // Faculty reputation bar
  fill(44, 62, 80); // Dark blue background for the bar
  rect(barX, firstBarY, barWidth, barHeight); // Background bar
  fill(255, 140, 0); // Orange for filled part
  rect(barX, firstBarY, map(facultyReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  textSize(24); // Larger text size for bar labels
  textAlign(CENTER, CENTER); // Center the text
  text("Faculty", barX + barWidth / 2, firstBarY + barHeight / 2); // Label over the bar

  // Admin reputation bar
  fill(44, 62, 80); // Dark blue background for the bar
  rect(barX, firstBarY + spacing, barWidth, barHeight); // Background bar
  fill(255, 140, 0); // Orange for filled part
  rect(barX, firstBarY + spacing, map(adminReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  text("Admin", barX + barWidth / 2, firstBarY + spacing + barHeight / 2); // Label over the bar

  // Student reputation bar
  fill(44, 62, 80); // Dark blue background for the bar
  rect(barX, firstBarY + 2 * spacing, barWidth, barHeight); // Background bar
  fill(255, 140, 0); // Orange for filled part
  rect(barX, firstBarY + 2 * spacing, map(studentReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  text("Students", barX + barWidth / 2, firstBarY + 2 * spacing + barHeight / 2); // Label over the bar
}

// New character screen function
function displayCharacterScreen() {
  background(campusImage);
	fill(13, 21, 33, 150); // Dark blue background
  rect(0,0,1000,1000);
	
  // Set up the orange border for the character image
  fill(255, 140, 0); // Orange color for the border
  rect(width - 255, 45, 210, 210); // Draw an orange rectangle slightly larger than the image
  
  // Display the character image in the upper right corner
  image(characterImage, width - 250, 50, 200, 200);

  // Set white color for the text
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
	noStroke();
  // Display the introductory text on the left side
  text(
    "Congratulations! You're a new Digital Humanities Center Director at Some University, a campus with lots of students—and no AI policy.\n\n" +
    "You're tasked with providing leadership to your faculty and students in navigating the opportunities and challenges of generative AI on campus.\n\n" +
    "It seems like every day there's a new challenge - edtech coming into the classroom without faculty input; concerns about privacy, data, and environmental impact; and real possibilities for using generative AI in both programming and digital humanities data analysis.  \n\n Good luck!\n\n",
    150, 274, 700, 700 // Text bounds
  );	// Set yellow color for the "Click to begin" text
  fill(255, 204, 51); // Yellow text
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display "Click to begin" centered near the bottom of the screen
  text("Click to begin", width / 2, height - 250);
}

function displayIntroScreen() {
  background(13, 21, 33); // Dark blue background
  noStroke();
  fill(255);
  textSize(28); // Set text size for the intro
  textAlign(CENTER, CENTER);

  text(
    "June 10, 2025.\n\nabout how to handle generative AI on campus.\n\nNow that everyone's back, the requests and concerns are really rolling in.\n\nHow will you handle them?",
    200, 500, 600);

  textSize(20); // Instruction to proceed
  text("Click to continue", width / 2, height - 100);
}

function displayCoordinates() {
  fill(255); // White text
  textSize(25);
	textAlign(CENTER, CENTER);
  text(`X: ${mouseX}, Y: ${mouseY}`, width /2, height /2);
}

function displayBookScreen() {
  background(officeImage); // Black background
	// Book spine on the left side
  fill(selectedColor); // Purple fill for the spine  stroke(13, 21, 33);        // Dark blue outline
  strokeWeight(5);
  rect(50, 100, 150, 800); // Spine rectangle

  // Dark blue lines across the top of the spine (for the "title" effect)
  strokeWeight(3);
  for (let i = 0; i < 5; i++) {
    line(60, 140 + i * 20, 190, 140 + i * 20);
  }

  // Book page on the right side
  fill(255);        // White fill for the page
  noStroke();
  rect(250, 100, 700, 800); // Page rectangle
  // Block of text inside the page
  fill(13, 21, 33);          // Dark blue text color
  textSize(30);
  textFont('monospace');  // Blocky font for retro look
  textAlign(LEFT, TOP);

  // Display the text block inside the white rectangle
 // Display the text block inside the white rectangle
  text(selectedBook, 270, 120, 660, 760); // Adjust the text to fit inside the "page"
  fill(255); // White text
  textSize(24);
  textAlign(LEFT, TOP);
	  // "Click to close the book" box at the bottom
  fill(255, 140, 0); // Orange background for the button
  noStroke();
  let buttonWidth = 350;
  let buttonHeight = 50;
  let buttonX = 250 + (700 - buttonWidth) / 2; // Centered on the white rectangle
  let buttonY = 800 - buttonHeight - 30; // Positioned near the bottom of the page
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Slightly rounded corners

  // White text inside the button
  fill(255,255,255);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Click to close the book", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

}

function checkMouseOverZones() {
  currentZone = ""; // Reset the currentZone when the mouse moves
  let message = ""; // Message to display in the black bar
	noStroke();	  // Bookshelf zone
  if (mouseX > 852 && mouseX < 1000 && mouseY > 257 && mouseY < 595) {
    fill(255, 140, 0, 150); // Orange highlight
    rect(852,257,148,338); // Bookshelf dimensions - right
    currentZone = "bookshelf";
    message = books.length > 0 ? "You need more time to just read." : "You really don't have time to read.";
  }if (mouseX > 11 && mouseX < 223 && mouseY > 135 && mouseY < 595) {
    fill(255, 140, 0, 150); // Orange highlight
    rect(11,135,212,460); // Bookshelf dimensions - left
    currentZone = "bookshelf";
    message = books.length > 0 ? "You need more time to just read." : "You really don't have time to read.";
  }  // Writing zone
	if (mouseX > 827 && mouseX < 931 && mouseY > 662 && mouseY < 814) {
    fill(255, 204, 51, 150); // Yellow highlight
    rect(827,662,104,152); // Pencil cup dimensions
    message = "Remember when you had time for your own writing?";
  }  // Monitor zone
  if (mouseX > 400 && mouseX < 625 && mouseY > 569 && mouseY < 709) {
    fill(44, 62, 80, 150); // Dark blue highlight
    rect(400, 569, 225, 140); // Monitor dimensions
    currentZone = "monitor";
    message = emailChallenges.length > 0 ? "You have so many new emails." : "There are no more emails...for the moment.";
  }

  // Door zone (adjust x, y, width, and height based on actual position)
  if (mouseX > 400 && mouseX < 648 && mouseY > 128 && mouseY < 531) {
    fill(255, 140, 0, 150); // Orange highlight
    rect(403, 128, 250, 406); // Door dimensions
    currentZone = "door";
    message = doorChallenges.length > 0 ? "There's people waiting outside the office." : "There's no one outside...for now.";
  }   // Phone zone (adjust x, y, width, and height based on actual position)
  if (mouseX > 83 && mouseX < 258 && mouseY > 650 && mouseY < 787) {
    fill(255, 204, 51, 150); // Yellow highlight
    rect(83, 650, 175, 137); // phone dimensions
    currentZone = "phone";
    message = phoneChallenges.length > 0 ? "The phone hasn't stopped ringing." : "The phone is silent...for now.";
  }

  // Display the dark blue bar at the bottom with the appropriate message
  if (message !== "") {
    fill(13, 21, 33); // Dark blue background for the bar
    rect(0, height - 200, width, 100); // Draw the dark blue bar at the bottom
    fill(255); // White text
    textSize(30);
    textAlign(CENTER, CENTER);
    text(message, width / 2, height - 150); // Display the message in the center of the bar
  }
}

function mousePressed() {
  // Handle mouse clicks on different rooms
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      // Handle mouse clicks on different rooms
      if (currentRoom === "splash") {
        currentRoom = "rulesScreen";
      } else if (currentRoom === "rulesScreen") {
        currentRoom = "characterScreen"; // Switch to the character screen after the rules screen
      } else if (currentRoom === "characterScreen") {
        currentRoom = "office"; // Switch to office scene after the character screen
      } else if (currentRoom === "office") {
      if (currentZone === "monitor" && emailChallenges.length > 0) {
        startMonitorInteraction();
      } else if (currentZone === "phone" && phoneChallenges.length > 0) {
        startPhoneInteraction();
      } else if (currentZone === "door" && doorChallenges.length > 0) {
        startDoorInteraction();
      } else if (currentZone === "bookshelf" && books.length > 0) {
        startBookInteraction();
      }
    } else if (currentRoom === "bookshelf") {
        currentRoom = "reputationFeedback";
    }else if (currentRoom === "endgame") {
      // Reset the game when clicking in the endgame screen
      resetGame();
    } else if (interactionActive) {
      checkInteractionOptions(); // Check if the player clicked on an interaction response option
    } else if (currentRoom === "reputationFeedback") {
      currentRoom = "office"; // Return to the office after viewing feedback
    }
  }
}
const bookshelfMessages = [
  "While you were lost in that thrilling academic tome, your inbox overflowed, and now everyone's wondering if you've gone off-grid.",
  "Turns out, reading isn't a viable excuse for missing three back-to-back meetings. Faculty, admin, and students are all grumbling about your sudden 'unavailability.'",
  "The complaints have been piling up while you were flipping through those pages. Everyone's growing more impatient by the minute.",
  "You were deep into that book, but meanwhile, the faculty, admin, and students were deep into wondering where you've been. They're not happy.",
  "Turns out your temporary escape into academic reading didn’t go unnoticed. Everyone's been tapping their fingers waiting for you to return to reality.",
  "You took some time to read, but now it seems like the whole department has been simmering in your absence. You might want to check those emails.",
  "Sure, that book was enlightening, but now the faculty, admin, and students are all a little less enlightened about your priorities.",
  "That quiet time you spent reading? Not so quiet in the rest of the office. There’s some serious side-eye happening now.",
  "While you were learning new strategies, the old ones—like answering emails—got neglected. No one seems too thrilled about that.",
  "You took a deep dive into the bookshelf, and now it feels like everyone else is about to dive into your office, demanding answers."
];

function startBookInteraction() {
	if (books.length > 0) {
		currentRoom = "bookshelf";
		selectedBook = random(books);
    selectedColor = color(random(180, 255), random(100, 160), random(0, 50)); // Dark blue, yellow, orange range
		books = books.filter(c => c !== selectedBook);
		bookshelfActive = true;
		effects = { faculty: -1, admin: -1, student: -1 };
		adjustReputation(effects);
		 if (checkReputationLimits()) {
        return; // Endgame triggered, stop further actions
      }
	}
	feedbackMessage = random(bookshelfMessages);

}

function startMonitorInteraction() {
  if (emailChallenges.length > 0) {
    currentRoom = "monitorInteraction";
    interactionActive = true;
    currentChallenge = random(emailChallenges); // Pick a random challenge from the emailChallenges array
    emailChallenges = emailChallenges.filter(c => c !== currentChallenge); // Remove the selected challenge
    dialogueText = currentChallenge.question;
    options = currentChallenge.responses;
  }
}

function startPhoneInteraction() {
  if (phoneChallenges.length > 0) {
    currentRoom = "phoneInteraction";
    interactionActive = true;
    currentChallenge = random(phoneChallenges); // Pick a random challenge from the phoneChallenges array
    phoneChallenges = phoneChallenges.filter(c => c !== currentChallenge); // Remove the selected challenge
    dialogueText = currentChallenge.question;
    options = currentChallenge.responses;
  }
}

function startDoorInteraction() {
  if (doorChallenges.length > 0) {
    currentRoom = "doorInteraction";
    interactionActive = true;
    currentChallenge = random(doorChallenges); // Pick a random challenge from the doorChallenges array
    doorChallenges = doorChallenges.filter(c => c !== currentChallenge); // Remove the selected challenge
    dialogueText = currentChallenge.question;
    options = currentChallenge.responses;
  }
}

function displayMonitorInteraction() {
  displayInteraction();
}

function displayPhoneInteraction() {
  displayInteraction();
}

function displayDoorInteraction() {
  displayInteraction();
}

function displayInteraction() {
  // Display the interaction dialogue interface
	if (currentZone === "monitor") {		background(26, 35, 50);  // Dark blue background
	  textAlign(LEFT, BOTTOM);

		// Draw orange border
		stroke(255, 140, 0);
		strokeWeight(10);
		noFill();
		rect(0, 0, width, height);

		// From and To boxes shifted to the right to make space for the envelope
		noStroke();
		fill(255);
		rect(250, 50, 700, 100);  // 'From' box
		rect(250, 180, 700, 100); // 'To' box
		// 'From' and 'To' text
		fill(13, 21, 33);
		textFont('monospace');
		textSize(40);
		text('From: someone@someU.edu', 260, 110);
		text('To:you@someU.edu', 260, 240);

		// Text display area shifted to the right
		fill(255);
		rect(50, 320, 900, 600); // White rectangle for text display
		// Optional: text inside the text display area
		fill(13, 21, 33); // Dark blue text
		textSize(24);
		text(dialogueText, 100, 350, 800,300);

		// Larger retro "mail" icon (closed envelope) on the left
		fill(255); // White fill for the envelope
		stroke(13, 21, 33); // Dark blue stroke
		strokeWeight(3);

		// Draw larger rectangle (envelope body)
		rect(50, 80, 160, 100);

		// Draw inner diagonal lines for the closed envelope
		line(50, 80, 130, 150);  // Diagonal line on left
		line(210, 80, 130, 150); // Diagonal line on right
		
	} else if (currentZone === "door") {
		background(officeImage);
  	fill(0,0,0,150);
		rect(0,0,1000,1000);
		
  	textSize(24);
  	textAlign(LEFT, TOP); 
		fill(0,0,0,190);
		rect(60, 185, 530, 530);
		fill(255); // White text
		text(dialogueText, 75,200,500,400); // Display door-related challenge text

    // Use the lastname from the current challenge to display the corresponding image
    let lastName = currentChallenge.lastName;
    
    // Display the corresponding image with a yellow outline if it exists
    if (doorImages[lastName]) {

      let imgX = 700; // X position of the image
      let imgY = 100; // Y position of the image
      let imgWidth = 250; // Width of the image
      let imgHeight = 250; // Height of the image      // Draw an orange border around the image
      fill(255, 140, 0); // Orange color
      rect(imgX - 5, imgY - 5, imgWidth + 10, imgHeight + 10); // Draw the orange outline slightly larger than the image

      // Draw the actual image inside the yellow outline
      image(doorImages[lastName], imgX, imgY, imgWidth, imgHeight);
		}	} else {
		background(phoneImage);
    fill(13, 21, 33, 190); // Dark blue background
    rect(225,225,550,450);;
  	fill(255); // White text
  	textSize(24);
  	textAlign(LEFT, TOP);
  	text(dialogueText, 250, 250, 525, 400); // Display the challenge text
		}
	  	// Display response options
 		displayInteractionOptions();
}
/*
function displayInteractionOptions() {
	textSize(20);
  for (let i = 0; i < options.length; i++) {
		 // Check if the mouse is hovering over the current option
    if (mouseX > 50 && mouseX < 350 && mouseY > 400 + i * 50 && mouseY < 440 + i * 50) {
      fill(255, 140, 0); // Orange when mouse is over the option
    } else {
      fill(44, 62, 80); // Dark blue boxes when not hovered
    }
		
    rect(50, 400 + i * 50, 700, 40); // Create a box for each option	
    fill(255);
    text(options[i], 60, 410 + i * 50); // Display option text inside the box
    fill(44, 62, 80); // Reset the fill color for the next box
  }
}
function checkInteractionOptions() {
  // Check if the player clicked one of the interaction response options
  for (let i = 0; i < options.length; i++) {
    if (mouseX > 50 && mouseX < 350 && mouseY > 400 + i * 50 && mouseY < 440 + i * 50) {
      dialogueText = `You selected: "${options[i]}"`; // Update dialogue text to show the selected option
      adjustReputation(currentChallenge.effects[i]); // Adjust the reputation based on the chosen option's effects
      interactionActive = false; // Interaction is done

      // Check if reputation limits have been reached
      if (checkReputationLimits()) {
        return; // Endgame triggered, stop further actions
      }

      currentRoom = "office"; // Return to the office
    }
  }
}
*/
function displayInteractionOptions() {
  textSize(20);
  
  // Calculate the starting y-position for the first option
  let totalHeight = options.length * 50; // Total height of all option boxes
  let startY = height - totalHeight - 100; // Start 100 pixels from the bottom of the screen
  for (let i = 0; i < options.length; i++) {
    // Check if the mouse is hovering over the current option
    let boxY = startY + i * 50; // y-position for each box

    if (mouseX > 150 && mouseX < 850 && mouseY > boxY && mouseY < boxY + 40) {
      fill(255, 140, 0); // Orange highlight color when mouse is over the option
    } else {
      fill(44, 62, 80); // Dark blue default color when not hovered
    }

    // Center the box horizontally and position it near the bottom
    rect(150, boxY, 700, 40); // Draw box for each option

    // Display the option text inside the box
    fill(255); // White text color
    textAlign(CENTER, CENTER); // Center the text
    text(options[i], 500, boxY + 20); // Center text inside the box

    fill(44, 62, 80); // Reset the fill color for the next box
  }
}

function checkInteractionOptions() {
  let totalHeight = options.length * 50; // Total height of all option boxes
  let startY = height - totalHeight - 100; // Start 100 pixels from the bottom of the screen

  // Check if the player clicked one of the interaction response options
  for (let i = 0; i < options.length; i++) {
    let boxY = startY + i * 50; // y-position for each box

    if (mouseX > 150 && mouseX < 850 && mouseY > boxY && mouseY < boxY + 40) {
      dialogueText = `You selected: "${options[i]}"`; // Update dialogue text to show the selected option
      adjustReputation(currentChallenge.effects[i]); // Adjust the reputation based on the chosen option's effects
      interactionActive = false; // Interaction is done

      // Check if reputation limits have been reached
      if (checkReputationLimits()) {
        return; // Endgame triggered, stop further actions
      }

		currentRoom = "reputationFeedback";
    }
  }
}

function checkReputationLimits() {
  if (facultyReputation <= 0) {
    endgameMessage = "The faculty have declared your center a 'digital dystopia.' They've formed a Neo-Luddite reading group that meets in the basement, by candlelight, to discuss the good old days of card catalogs. Time to update your LinkedIn. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (facultyReputation >= 10) {
    endgameMessage = "Faculty are calling you the 'Digital Humanities Whisperer.' Someone nominated you for a genius grant just for explaining what an API is without using the word 'thingy.' Your methods workshops have a waitlist. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (adminReputation <= 0) {
    endgameMessage = "The administration has decided your center is 'too experimental.' They've reassigned your server room to store old filing cabinets and your budget line now reads 'TBD (Totally Broke Department).' Time to practice grant writing. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (adminReputation >= 10) {
    endgameMessage = "Amazing! The administration thinks you're revolutionizing the humanities. They've given you a blank check (it's still small, but it's blank!) and first dibs on any tech donations. Even IT returns your emails now. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (studentReputation <= 0) {
    endgameMessage = "Students have occupied the DH lab, declaring it a 'code-free zone.' They're using your 3D printers to make protest signs and your VR headsets as expensive paperweights. The memes about you are... not kind. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (studentReputation >= 10) {
    endgameMessage = "You've become a student legend! They've created a Discord server in your honor where they share your programming metaphors. Someone made a neural network that generates inspirational quotes in your style. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }

  // New condition: If the player has exhausted all challenges without major reputation changes
  if (facultyReputation > 0 && facultyReputation < 10 && adminReputation > 0 && adminReputation < 10 && studentReputation > 0 && studentReputation < 10 && challengesCompleted >= totalChallenges) {
    endgameMessage = "You've mastered the art of digital humanities diplomacy, keeping everyone equally confused but not upset. Your center exists in a quantum state of being both cutting-edge and comfortably traditional. Nobody knows what you do, but they're pretty sure it involves computers. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }

  return false; // No endgame triggered
}
// Function to adjust reputation scores
function adjustReputation(effects) {
  feedbackMessage = "";
  reputationChangeMessage = "";

  // Arrays of possible feedback messages for faculty reputation changes
  const facultyPositiveMessages = [
    "Your faculty can't believe it—they actually understood your technical explanation. Someone's taking notes!",
    "The faculty are praising your decision over artisanal coffee. One even downloaded Python.",
    "Faculty members are calling you 'surprisingly reasonable.' That's basically a standing ovation.",
    "Faculty approval detected! They're voluntarily attending your workshops without free lunch.",
    "Your faculty loved that. Someone just cited you favorably in a grant proposal—on purpose!"
  ];
  
  const facultyNegativeMessages = [
    "Your faculty heard about that response and immediately formed a 'traditional scholarship' support group.",
    "The faculty aren't thrilled. Someone's drafting a manifesto about the death of close reading.",
    "Faculty members are muttering about 'kids these days and their databases.' Your name was mentioned.",
    "Your faculty hated that. They're planning a symposium on 'Why Card Catalogs Were Better.'",
    "Your decision sparked a faculty rebellion. They're threatening to go back to typewriters."
  ];

  // Arrays for admin reputation changes
  const adminPositiveMessages = [
    "The administration is thrilled! They don't understand what you do, but the graphs look impressive.",
    "Congrats! The administration just called your center 'innovative' in a press release.",
    "The admins are pleased! Your budget might actually get approved this year.",
    "The administration loves it. They're nominating you for an award they just made up.",
    "Your decision impressed the brass. They're considering giving you a window office!"
  ];

  const adminNegativeMessages = [
    "The administration is concerned about your 'experimental methods.' Expect a compliance audit.",
    "Admin HQ wants to discuss your 'unconventional approaches.' Bring charts.",
    "The administration didn't like that. Your center just got moved to the basement.",
    "The admin team is worried. They've scheduled a meeting about 'digital best practices.'",
    "The administration is sending lawyers. Apparently, 'disruption' isn't always welcome."
  ];

  // Arrays for student reputation changes
  const studentPositiveMessages = [
    "The students are stoked! Someone made a GitHub repo called 'director-is-awesome.'",
    "Your students loved that. The DH lab Discord is full of fire emojis and your quotes.",
    "Students are thrilled! They're actually showing up to optional coding workshops.",
    "The student body is buzzing. Someone 3D-printed a trophy with your name on it.",
    "Your students are ecstatic. They've started a data visualization of how cool you are."
  ];

  const studentNegativeMessages = [
    "The students aren't impressed. Someone started a 'Humanities Without Computers' club.",
    "Your decision upset the students. They're using your computational resources to mine cryptocurrency in protest.",
    "The students are revolting. They've replaced all your Python scripts with Shakespeare quotes.",
    "Students are angry about your 'techno-tyranny.' The lab computers mysteriously have new passwords.",
    "Your decision has students fuming. They're planning a 'analog-only' thesis exhibition."
  ];

  // Adjust faculty reputation and give feedback
  if (effects.faculty > 0) {
    facultyReputation = constrain(facultyReputation + effects.faculty, 0, 10);
    feedbackMessage += random(facultyPositiveMessages) + " ";
    reputationChangeMessage += `Faculty Reputation: +${effects.faculty} `;
		reputationChangeMessage += '\n';
  } else if (effects.faculty < 0) {
    facultyReputation = constrain(facultyReputation + effects.faculty, 0, 10);
    feedbackMessage += random(facultyNegativeMessages) + " ";
    reputationChangeMessage += `Faculty Reputation: ${effects.faculty} `;
		reputationChangeMessage += '\n';
  }

  // Adjust admin reputation and give feedback
  if (effects.admin > 0) {
    adminReputation = constrain(adminReputation + effects.admin, 0, 10);
    feedbackMessage += random(adminPositiveMessages) + " ";
    reputationChangeMessage += `Admin Reputation: +${effects.admin} `;
		reputationChangeMessage += '\n';
  } else if (effects.admin < 0) {
    adminReputation = constrain(adminReputation + effects.admin, 0, 10);
    feedbackMessage += random(adminNegativeMessages) + " ";
    reputationChangeMessage += `Admin Reputation: ${effects.admin} `;
		reputationChangeMessage += '\n';
  }

  // Adjust student reputation and give feedback
  if (effects.student > 0) {
    studentReputation = constrain(studentReputation + effects.student, 0, 10);
    feedbackMessage += random(studentPositiveMessages) + " ";
    reputationChangeMessage += `Student Reputation: +${effects.student} `;
  } else if (effects.student < 0) {
    studentReputation = constrain(studentReputation + effects.student, 0, 10);
    feedbackMessage += random(studentNegativeMessages) + " ";
    reputationChangeMessage += `Student Reputation: ${effects.student} `;
  }

}

function resetGame() {
  challengesCompleted = 0;
  facultyReputation = 5;
  adminReputation = 5;
  studentReputation = 5; // Reset reputations
  emailChallenges = [...initialEmailChallenges]; // Reset email challenges
  phoneChallenges = [...initialPhoneChallenges]; // Reset phone challenges
  doorChallenges = [...initialDoorChallenges]; // Reset door challenges
  currentRoom = "splash"; // Return to the start screen
}