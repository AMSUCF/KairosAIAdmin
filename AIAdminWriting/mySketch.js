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
  "You pick up Ted Underwood's *Distant Horizons.* It’s like reading tea leaves, but with machine learning and novels. Apparently, AI's future plans for literature involve way more robots than we thought—go figure.",
  "You flip through Safiya Noble's *Algorithms of Oppression.* Noble pulls no punches—turns out, even AI algorithms are in on society's worst habits. At this rate, the robots might need to take a few sociology courses.",
  "You glance at Matthew Kirschenbaum's *Track Changes.* His deep dive into the history of word processing is basically a love letter to Clippy. Now, if only AI would stop trying to 'help' you write your own dissertation...",
  "You open Annette Vee's *Coding Literacy.* Vee makes it clear: if you don’t learn to code, AI will definitely take your job. Well, at least the part of your job that involves creating questionable PowerPoints.",
  "You scan Douglas Rushkoff's *Team Human.* Rushkoff is waving a flag for human beings in the race against algorithms, but honestly, the algorithms seem like they’re really good at relay races… and everything else.",
  "You pause at Ian Bogost’s *Play Anything.* He argues life is just a big game, and AI might be the ultimate player. Too bad it keeps glitching out when you ask it to do anything fun, like write a novel or make coffee.",
  "You find Nick Montfort's *The Future.* Montfort has some bold ideas about AI and creativity. By the time you finish, you’re half-expecting your toaster to write a haiku about breakfast.",
  "You turn the pages of André Brock's *Distributed Blackness.* Brock points out that AI could easily replicate society’s biases, but hopefully, it’ll at least learn to do it with fewer bugs than Twitter’s trending topics.",
  "You examine Catherine Knight-Steele’s *Digital Black Feminism.* She suggests AI might either amplify marginalized voices or drown them out with robotic gibberish—either way, there’s bound to be a lot of static.",
  "You flip open Sarah Roberts' *Behind the Screen.* Roberts reminds you that while AI automates everything, there’s still a human somewhere, frantically deleting the things no one should see—like your 3 a.m. Reddit posts.",
  "You pick up Nancy Baym's *Personal Connections in the Digital Age.* Baym argues that AI has changed how we communicate. You wonder if AI will start ghosting us, too, just like our friends do.",
  "You leaf through Joanna Zylinska’s *AI Art.* Zylinska explores the artistic potential of AI, but you're still waiting for it to explain why it thinks every portrait needs extra fingers.",
  "You pick up *How to Chair A Department.* As you flip through the pages, you realize there's no chapter on how to survive when everyone schedules their meetings at the same time. Maybe that’s the sequel?",
  "You grab *The College Administrator's Survival Guide.* The first tip is 'Invest in comfortable shoes.' By page 10, it's clear this is less about survival and more about 'embracing chaos gracefully.'",
  "You open *The Art of Delegating.* The advice seems solid until you realize it boils down to 'delegate everything except the stuff no one else wants to do.' You’re already an expert at this.",
  "You find *Managing Faculty Egos: A Field Guide.* It's surprisingly short, but that's probably because the solution is just 'nod, smile, and never make eye contact during meetings.'",
  "You glance at *Crisis Management in Higher Education.* The first chapter suggests keeping a large supply of coffee and tissues handy. By chapter three, you're contemplating adding chocolate to that list.",
  "You flip through *Budgeting for Dummies: University Edition.* It advises cutting 'non-essential spending,' but every example includes things like 'electricity' and 'office supplies.'",
  "You grab *The Zen of Academic Leadership.* The book claims you can find inner peace as an administrator. Step one: accept that no one reads your emails. Step two: stop sending emails.",
  "You open *Building Consensus Without Losing Your Mind.* Spoiler alert: you’re going to lose your mind. But at least there’s a flowchart that helps you decide whether to cry or laugh.",
  "You pause at *Dealing with Difficult Faculty: A How-To Guide.* The main advice is to avoid using phrases like 'That’s not how we do things,' and to always bring snacks to meetings.",
  "You leaf through *Meetings That Could Have Been Emails.* It’s mostly blank pages, except for the last one, which just says 'You know what you did.'"
];

let books = initialBooks;
		
// Email challenges for the monitor
let initialEmailChallenges = [
  {
    question: "Dear Chair,\n\nI've just received a draft from a student, and I’m 90% sure the essay was written by a robot. The thing is, it's better than my own dissertation. Should I let it slide or prepare for our AI overlords?\n\nSincerely,\nProf. Linda Syntax",
    responses: ["Acknowledge the AI brilliance", "Suggest a cautious conversation", "Encourage innovation through cyborg minds"],
    effects: [
      { faculty: +1, admin: -1, student: 0 }, // For "Acknowledge the AI brilliance"
      { faculty: +0, admin: +1, student: -1 }, // For "Suggest a cautious conversation"
      { faculty: -1, admin: -1, student: +1 }  // For "Encourage innovation through cyborg minds"
    ]
  },
  {
    question: "Dear Chair,\n\nI've noticed that during exams, half the students are typing furiously while the other half stare blankly at their screens, probably waiting for ChatGPT to save the day. Should I intervene or just tell them to ask the Provost for divine intervention?\n\nBest,\nDr. Harriet Typewell",
    responses: ["Prohibit AI in exams", "Allow AI under supervision", "Let the Provost handle it"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Prohibit AI in exams"
      { faculty: -1, admin: 0, student: +1 },  // For "Allow AI under supervision"
      { faculty: -1, admin: -1, student: +1 }  // For "Let the Provost handle it"
    ]
  },
  {
    question: "Dear Chair,\n\nA few students are using AI to write their essays but 'forgetting' to mention it. I know the bots didn’t get writer’s block, but the ethics police might have a word. Should I let it slide, or make them confess their AI sins?\n\nYours,\nProf. Julius Paperjam",
    responses: ["Demand AI citations", "Start an ethics discussion", "Ignore it, they’ll never know"],
    effects: [
      { faculty: +1, admin: +1, student: -1 }, // For "Demand AI citations"
      { faculty: +0, admin: +1, student: -1 }, // For "Start an ethics discussion"
      { faculty: -1, admin: 0, student: +1 }   // For "Ignore it, they’ll never know"
    ]
  },
  {
    question: "Dear Chair,\n\nOne of my students claims that their essay is 'half-human, half-AI,' and honestly, it’s starting to sound like the next Marvel movie. How do I grade this... hybrid? Should I focus on the human part, or start handing out Avengers points?\n\nSincerely,\nDr. Janet Scribble",
    responses: ["Focus on the human effort", "Use AI detection software", "Let the Avengers handle it"],
    effects: [
      { faculty: 0, admin: -1, student: +1 },  // For "Focus on the human effort"
      { faculty: +1, admin: +1, student: -1 }, // For "Use AI detection software"
      { faculty: -1, admin: -1, student: +1 }  // For "Let the Avengers handle it"
    ]
  },
  {
    question: "Dear Chair,\n\nA student just told me they’ve decided to outsource their entire semester’s writing to ChatGPT. I thought I was teaching composition, not AI outsourcing strategies. Should I just roll with it or start drafting their resignation letter?\n\nBest,\nProf. Larry Scribbler",
    responses: ["Set limits on AI use", "Encourage balance, but no AI 100%", "Let ChatGPT teach the course"],
    effects: [
      { faculty: +1, admin: 0, student: -1 }, // For "Set limits on AI use"
      { faculty: 0, admin: 0, student: +1 },  // For "Encourage balance, but no AI 100%"
      { faculty: -1, admin: -1, student: +1 } // For "Let ChatGPT teach the course"
    ]
  },
	{
    question: "Dear Chair,\n\nWe’ve just implemented a new AI detection tool campus-wide. It’s supposed to be 99% accurate at identifying AI-generated essays… except when it’s not. If you encounter any issues, please contact IT, who will most likely forward your question back to you. Good luck!\n\nBest,\nDean Eloise Bureaucracy",
    responses: ["Trust the AI detection software", "Use it but double-check manually", "Ignore it and trust your gut"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },  // For "Trust the AI detection software"
      { faculty: +1, admin: +1, student: -1 }, // For "Use it but double-check manually"
      { faculty: +0, admin: -1, student: +1 }  // For "Ignore it and trust your gut"
    ]
  },
  {
    question: "Dear Chair,\n\nThe President’s office has decided that all faculty should integrate AI writing assistants into their courses. No specific details have been provided, but we’re confident you can figure it out. We’re calling this initiative ‘AI for All’—catchy, right? Please submit a report by Friday.\n\nSincerely,\nProvost Gregory Vagueness",
    responses: ["Embrace AI for All", "Ask for more guidance (good luck)", "Quietly ignore it and hope no one notices"],
    effects: [
      { faculty: -1, admin: +1, student: +1 },  // For "Embrace AI for All"
      { faculty: +1, admin: 0, student: 0 },    // For "Ask for more guidance"
      { faculty: 0, admin: -1, student: +1 }    // For "Quietly ignore it and hope no one notices"
    ]
  },
  {
    question: "Dear Chair,\n\nWe’ve been hearing complaints that faculty are relying too much on AI to grade assignments. We encourage you to remind your team that human oversight is still important, unless the AI is doing a better job, in which case… never mind. Do with this information what you will.\n\nWarmly,\nPresident Amanda Abstraction",
    responses: ["Reinforce the importance of human grading", "Suggest minimal AI use", "Let the AI handle it all"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Reinforce the importance of human grading"
      { faculty: 0, admin: 0, student: +1 },    // For "Suggest minimal AI use"
      { faculty: -1, admin: +1, student: +1 }   // For "Let the AI handle it all"
    ]
  },
  {
    question: "Dear Chair,\n\nThe Provost has just announced that all course syllabi must include an AI usage policy. We’ve attached a generic template that says something like 'Use AI responsibly.' We’re sure you can expand on that and make it meaningful. Have fun!\n\nBest regards,\nDean Eloise Bureaucracy",
    responses: ["Adopt the template and move on", "Spend hours crafting a thoughtful policy", "Tell faculty to figure it out themselves"],
    effects: [
      { faculty: +0, admin: +1, student: -1 },  // For "Adopt the template and move on"
      { faculty: +1, admin: 0, student: 0 },    // For "Spend hours crafting a thoughtful policy"
      { faculty: -1, admin: -1, student: +1 }   // For "Tell faculty to figure it out themselves"
    ]
  },
  {
    question: "Dear Chair,\n\nWe’re excited to introduce a new AI-powered virtual course assistant named ‘EduBot.’ It’s like a TA, but without the complaints! Please encourage your faculty to use it. We believe EduBot will revolutionize education—or at least take over a few inboxes.\n\nBest,\nProvost Gregory Vagueness",
    responses: ["Strongly encourage faculty to use EduBot", "Suggest using EduBot cautiously", "Pretend EduBot doesn’t exist"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },  // For "Strongly encourage faculty to use EduBot"
      { faculty: +0, admin: +1, student: -1 }, // For "Suggest using EduBot cautiously"
      { faculty: +1, admin: -1, student: +1 }  // For "Pretend EduBot doesn’t exist"
    ]
  }
];

let initialPhoneChallenges = [
  {
    question: "Dean Eloise Bureaucracy: Hi, Chair. We’ve received a complaint that one of your faculty is asking students to write essays without AI assistance. Apparently, this has caused some confusion among the students—how could they possibly write without ChatGPT? Could you, um, handle this situation?",
    responses: ["Encourage AI-free writing", "Let the students use AI as a tool", "Just tell the students to relax"],
    effects: [
      { faculty: +1, admin: +1, student: -1 },  // For "Encourage AI-free writing"
      { faculty: -1, admin: 0, student: +1 },   // For "Let the students use AI as a tool"
      { faculty: 0, admin: -1, student: +1 }    // For "Just tell the students to relax"
    ]
  },
  {
    question: "Student Mark Overload: Hi! So, um, I tried using AI to write my term paper, and it just sent me some random nonsense about quantum mechanics. I’m in a poetry class. Should I be worried? Or just go with it and see if the professor notices?",
    responses: ["Tell him to rewrite it himself", "Let him submit it and hope for the best", "Suggest switching to quantum poetry"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Tell him to rewrite it himself"
      { faculty: 0, admin: -1, student: +1 },   // For "Let him submit it and hope for the best"
      { faculty: -1, admin: 0, student: +1 }    // For "Suggest switching to quantum poetry"
    ]
  },
  {
    question: "Provost Gregory Vagueness: Chair, I need you to explain to the faculty that AI is *neither* a threat *nor* a panacea. Just tell them to integrate it into the curriculum—somehow—but don’t rely on it. Oh, and I’ll need a full report by next week. Thanks!",
    responses: ["Pass the message along as-is", "Ask for clarification (good luck)", "Quietly ignore it and hope no one notices"],
    effects: [
      { faculty: 0, admin: +1, student: 0 },    // For "Pass the message along as-is"
      { faculty: +1, admin: 0, student: 0 },    // For "Ask for clarification"
      { faculty: 0, admin: -1, student: +1 }    // For "Quietly ignore it and hope no one notices"
    ]
  },
  {
    question: "President Amanda Abstraction: Hello, Chair! We’re considering integrating AI-based tutoring across campus. You know, something to support students but not *replace* instructors. We want it to feel 'human-adjacent,' if that makes sense. Thoughts?",
    responses: ["Fully support the initiative", "Suggest careful integration", "Say 'human-adjacent' is too vague and politely hang up"],
    effects: [
      { faculty: -1, admin: +1, student: +1 },  // For "Fully support the initiative"
      { faculty: +0, admin: +1, student: -1 },  // For "Suggest careful integration"
      { faculty: +1, admin: -1, student: 0 }    // For "Politely hang up"
    ]
  },
  {
    question: "Prof. Daisy Stubborn: Chair, I refuse to use this AI nonsense in my class. It’s a fad. Like the internet. Remember that? What do I do when students start quoting robots at me?",
    responses: ["Encourage her to adapt", "Tell her to keep doing what she’s doing", "Suggest starting a conspiracy theory podcast"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },   // For "Encourage her to adapt"
      { faculty: +1, admin: -1, student: -1 },  // For "Tell her to keep doing what she’s doing"
      { faculty: 0, admin: 0, student: +1 }     // For "Suggest starting a podcast"
    ]
  },
  {
    question: "Student Bella Panic: Um, Chair? I think I used ChatGPT to accidentally plagiarize myself? It’s, like, identical to something I wrote last semester, but now the plagiarism software thinks I’m copying… me? Help?",
    responses: ["Tell her to revise the essay", "Tell her to submit it anyway", "Ask ChatGPT to solve its own problem"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Tell her to revise the essay"
      { faculty: 0, admin: -1, student: +1 },   // For "Tell her to submit it anyway"
      { faculty: -1, admin: +1, student: 0 }    // For "Ask ChatGPT to solve it"
    ]
  },
  {
    question: "Prof. Victor Tech-Savvy: Chair, I’ve integrated AI into *everything*—grading, feedback, even my coffee machine. Students love it. Admin, not so much. Do I need to dial it back?",
    responses: ["Tell him to tone it down", "Encourage more AI integration", "Ask him to brew you a coffee with AI"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },   // For "Tell him to tone it down"
      { faculty: +0, admin: -1, student: +1 },  // For "Encourage more AI integration"
      { faculty: 0, admin: 0, student: +1 }     // For "Ask for AI coffee"
    ]
  },
  {
    question: "Dean Eloise Bureaucracy: Chair, we’ve received a generous donation to create an AI research center on campus, but no one seems to know how to run it. Could you maybe… figure that out? Also, no budget yet. Good luck!",
    responses: ["Agree to take it on", "Ask for funding first", "Recommend calling IT for help"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },   // For "Agree to take it on"
      { faculty: 0, admin: 0, student: 0 },     // For "Ask for funding first"
      { faculty: +1, admin: -1, student: 0 }    // For "Recommend IT help"
    ]
  },
  {
    question: "Student Jamie Excuse: Hey, Chair. So, like, I missed class because I was experimenting with AI to write my final paper. But now the AI has convinced me I should become a novelist. Do I still have to submit the essay?",
    responses: ["Tell him to submit the essay", "Encourage his novelist dream", "Let him submit his novel as the assignment"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Tell him to submit the essay"
      { faculty: 0, admin: -1, student: +1 },   // For "Encourage his novelist dream"
      { faculty: -1, admin: +1, student: +1 }   // For "Let him submit his novel"
    ]
  },
  {
    question: "Provost Gregory Vagueness: Chair, we’re hearing from students that faculty are either banning AI completely or using it excessively. Could you tell them to, I don’t know, find a middle ground? Make sure to send me a report on your progress.",
    responses: ["Encourage faculty to find balance", "Request specific guidelines", "Pretend this conversation never happened"],
    effects: [
      { faculty: +1, admin: +1, student: 0 },   // For "Encourage faculty to find balance"
      { faculty: +0, admin: 0, student: 0 },    // For "Request specific guidelines"
      { faculty: -1, admin: -1, student: +1 }   // For "Pretend it never happened"
    ]
  }
];

let initialDoorChallenges = [
  {
    question: "Prof. Agnes Overwhelmed: Chair, I have three students who are submitting assignments with AI-generated titles like 'Untitled Essay 5' and 'This Essay is Definitely Human.' Can we set a rule about creative titles, or do I just need more coffee?",
    responses: ["Encourage students to use real titles", "Let them be creative (or lazy)", "Offer her coffee and sympathy"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Encourage students to use real titles"
      { faculty: 0, admin: -1, student: +1 },   // For "Let them be creative"
      { faculty: +1, admin: 0, student: 0 }     // For "Offer coffee and sympathy"
    ],
		lastName: "overwhelmed"
  },
  {
    question: "Prof. Sean Confused: Chair, I’ve been tasked with organizing the department’s new AI policy workshop, but I don’t actually know what AI is. Do I need to, like, download it first? Help me out here.",
    responses: ["Explain AI basics to him", "Send him a Wikipedia link", "Tell him to 'download it' and see what happens"],
    effects: [
      { faculty: 0, admin: +1, student: 0 },    // For "Explain AI basics"
      { faculty: +1, admin: -1, student: 0 },   // For "Send a Wikipedia link"
      { faculty: 0, admin: -1, student: +1 }    // For "Tell him to 'download it'"
    ],
		lastName: "confused"
  },
  {
    question: "Tutor Mia Overexplainer: Chair, I’ve been helping a student who used AI for every part of their essay—brainstorming, drafting, even revising. Now they want me to proofread it. Am I just proofreading ChatGPT at this point?",
    responses: ["Tell her to treat it like any other paper", "Ask her to focus on human-written sections", "Suggest she start giving AI feedback"],
    effects: [
      { faculty: 0, admin: 0, student: -1 },    // For "Treat it like any other paper"
      { faculty: +1, admin: 0, student: 0 },    // For "Focus on human-written sections"
      { faculty: -1, admin: +1, student: +1 }   // For "Give AI feedback"
    ],
		lastName: "overexplainer"
  },
  {
    question: "Prof. Gary Gadgets: Chair, I’ve started using this new AI app in class that generates essay prompts based on whatever the students are talking about. Problem is, it just gave me 'Write about why pizza is the perfect metaphor for life.' Should I keep using it?",
    responses: ["Encourage them to dial it back", "Tell them to go with the pizza metaphor", "Suggest a pizza party instead"],
    effects: [
      { faculty: -1, admin: +1, student: 0 },   // For "Encourage him to dial it back"
      { faculty: 0, admin: -1, student: +1 },   // For "Go with the pizza metaphor"
      { faculty: 0, admin: 0, student: +1 }     // For "Suggest a pizza party"
    ],
		lastName: "gadgets"
  },
  {
    question: "Writing Center Tutor Liz Lost: Chair, a student just brought me an essay they swear they wrote themselves, but it sounds… too good. I can’t tell if it’s AI or they’ve been secretly brilliant all along. What do I do?",
    responses: ["Trust the student's work", "Ask the student directly", "Pretend she never saw it"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Trust the student"
      { faculty: 0, admin: 0, student: +1 },    // For "Ask the student directly"
      { faculty: -1, admin: 0, student: +1 }    // For "Pretend she never saw it"
    ],
		lastName: "lost"
  },
  {
    question: "Admin Assistant Tom Tired: Chair, I’ve just spent the last three hours trying to figure out how to schedule a meeting between you and a new AI vendor. Can we just tell them the AI can figure out the schedule for us?",
    responses: ["Let him try that", "Offer to handle the meeting", "Tell him to take a coffee break"],
    effects: [
      { faculty: 0, admin: +1, student: 0 },    // For "Let him try that"
      { faculty: 0, admin: -1, student: 0 },    // For "Offer to handle the meeting"
      { faculty: +1, admin: 0, student: 0 }     // For "Tell him to take a break"
    ],
		lastName: "tired"
  },
  {
    question: "Prof. Helen Hallway: Chair, students have been using AI to write their research papers and then using *more* AI to fact-check themselves. It’s like AI Inception out there. Should I tell them to stop or just let the robots handle it?",
    responses: ["Encourage human research", "Let the AI fact-check", "Tell her to write a paper on AI Inception"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Encourage human research"
      { faculty: 0, admin: +1, student: +1 },   // For "Let the AI fact-check"
      { faculty: -1, admin: 0, student: 0 }     // For "Write a paper on AI Inception"
    ],
		lastName: "hallway"
  },
  {
    question: "Tutor Jake Jittery: Chair, a student asked if I could help them understand how AI 'thinks'—like, what’s going on inside the machine's head? I don’t even know what’s going on inside my own head most days. Any advice?",
    responses: ["Tell him to stick to writing", "Offer a basic explanation of AI", "Ask ChatGPT to explain itself"],
    effects: [
      { faculty: 0, admin: 0, student: -1 },    // For "Stick to writing"
      { faculty: +1, admin: 0, student: 0 },    // For "Explain AI basics"
      { faculty: -1, admin: +1, student: +1 }   // For "Ask ChatGPT to explain"
    ], 
		lastName: "jittery"
  },
  {
    question: "Prof. Dana Deadline: Chair, I just got an email about this AI policy thing you wanted me to implement. But I’ve been so busy grading, I haven’t had time to, you know… read it. Can I just make something up for now?",
    responses: ["Tell her to read the policy", "Let her wing it", "Offer an extension on the deadline"],
    effects: [
      { faculty: +1, admin: 0, student: -1 },   // For "Read the policy"
      { faculty: 0, admin: +1, student: +1 },   // For "Let her wing it"
      { faculty: 0, admin: 0, student: +1 }     // For "Offer an extension"
    ],
		lastName: "deadline"
  },
  {
    question: "Admin Assistant Fran Frazzled: Chair, I’ve been asked to compile a report on all the ways the department is using AI. But I’m honestly not sure who’s using it or how. Should I start knocking on doors, or just write 'We’re working on it' and call it a day?",
    responses: ["Help her track it down", "Tell her to write 'We’re working on it'", "Suggest she ask AI to write the report"],
    effects: [
      { faculty: 0, admin: +1, student: 0 },    // For "Help her track it down"
      { faculty: 0, admin: 0, student: +1 },    // For "Write 'We’re working on it'"
      { faculty: -1, admin: +1, student: 0 }    // For "Ask AI to write it"
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
  officeImage = loadImage('office.jpg');
	campusImage = loadImage('campus.jpg');
	phoneImage = loadImage('phone.jpg');
	characterImage = loadImage('avatar.jpg'); // Make sure you have a 200x200 character image
	
	initialDoorChallenges.forEach(challenge => {
    let lastName = challenge.lastName; // Get the lastname from the challenge object
    doorImages[lastName] = loadImage(`${lastName}.jpg`); // Preload each image as lastname.jpg
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
  background(officeImage); // Black background for the feedback screen
    fill(0,0,0,190); // Black background
    rect(225,225,550,450);;
  	fill(255); // White text
  	textSize(24);
  	textAlign(LEFT, TOP);
  	text(feedbackMessage, 250, 250, 525, 400); // Display the feedback message
  textAlign(CENTER, BOTTOM); // Center the reputation change at the bottom
	fill(31, 204, 195);
  text(reputationChangeMessage, width / 2, height - 350); // Display the reputation changes
}
function displayEndgameScreen() {
 background(campusImage);
	fill(0,0,0,150); // Black background
  rect(0,0,1000,1000);
	
  // Set up the purple border for the character image
  fill(128, 0, 128); // Purple color for the border
  rect(width - 255, 45, 210, 210); // Draw a purple rectangle slightly larger than the image
  
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
  );
	// Set yellow color for the "Click to begin" text
  fill(255, 255, 0); // Yellow text
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display "Click to begin" centered near the bottom of the screen
  text("Click to try again.", width / 2, height - 250);
	
}

function displaySplashScreen() {
  background(campusImage);
	fill(0,0,0,50); // Black background
  rect(0,0,1000,1000);
	noFill();
  stroke(230, 183, 14);
  strokeWeight(3);
  rect(150, 150, 700, 700);
  // Set white color for text
  fill(255);

  // Display the large title text
  textSize(64); // Large pixelated text
  textAlign(CENTER, CENTER);
  text("AI: Admin Life.", width / 2, height / 2 - 50);

  // Display the smaller "Click to Play" text
  textSize(32); // Smaller text
  text("Click to Begin", width / 2, height / 2 + 50);
}
function displayRulesScreen() {
  background(campusImage);
	
	fill(0,0,0,150); // Black background
  rect(0,0,1000,1000);
	stroke(230, 183, 14);
  strokeWeight(3);
	  // Display the large title text
	fill(255);
  textSize(64); // Large pixelated text
  textAlign(CENTER, CENTER);
  text("AI: Admin Life.", width / 2, 150);
	noStroke();
  // Set neon purple for the headings
  fill(255, 128, 0); // Neon purple
  textSize(36);
  textAlign(CENTER);
  
  // Display "How to Play" heading
  text("How to Play", width / 2, 250);
  
  // Set white color for the instructions
  fill(255);
  textSize(20);
  textAlign(LEFT);
  
  // Instructions text
  let howToPlayText = "In this game, you occupy the chair—literally—of a new department chair.\n\n" +
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
  fill(31, 204, 195); // Neon purple for the "Credits" heading
  textSize(36);
  textAlign(CENTER);
  text("Credits", width / 2, height - 315);
  
  // Set white color for the credits text
  fill(255);
  textSize(20);
  textAlign(LEFT);
  
  // Credits text
  let creditsText = "AI Version - Designed by Anastasia Salter\n\n" +
    "Text, code, and image generation using:\n" +
    "- ChatGPT 4\n" +
    "- DALL-E\n" +
    "- Adobe Firefly\n\n" +
    "for the 2024 CCCC Fall Virtual Institute.";
  
  // Display the credits text
  text(creditsText, 200, 700, 600, 250);
}

// Display reputation with a transparent box behind the text
function displayReputation() {
  fill(70, 130, 180, 180); // Transparent gray-blue box
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
  fill(100); // Gray background for the bar
  rect(barX, firstBarY, barWidth, barHeight); // Background bar
  fill(31, 204, 195); // Green for filled part
  rect(barX, firstBarY, map(facultyReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  textSize(24); // Larger text size for bar labels
  textAlign(CENTER, CENTER); // Center the text
  text("Faculty", barX + barWidth / 2, firstBarY + barHeight / 2); // Label over the bar

  // Admin reputation bar
  fill(100); // Gray background for the bar
  rect(barX, firstBarY + spacing, barWidth, barHeight); // Background bar
  fill(31, 204, 195); // Green for filled part
  rect(barX, firstBarY + spacing, map(adminReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  text("Admin", barX + barWidth / 2, firstBarY + spacing + barHeight / 2); // Label over the bar

  // Student reputation bar
  fill(100); // Gray background for the bar
  rect(barX, firstBarY + 2 * spacing, barWidth, barHeight); // Background bar
  fill(31, 204, 195); // Green for filled part
  rect(barX, firstBarY + 2 * spacing, map(studentReputation, 0, 10, 0, barWidth), barHeight); // Filled part based on reputation

  fill(255); // White text
  text("Students", barX + barWidth / 2, firstBarY + 2 * spacing + barHeight / 2); // Label over the bar
}

// New character screen function
function displayCharacterScreen() {
  background(campusImage);
	fill(0,0,0,150); // Black background
  rect(0,0,1000,1000);
	
  // Set up the purple border for the character image
  fill(128, 0, 128); // Purple color for the border
  rect(width - 255, 45, 210, 210); // Draw a purple rectangle slightly larger than the image
  
  // Display the character image in the upper right corner
  image(characterImage, width - 250, 50, 200, 200);

  // Set white color for the text
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
	noStroke();
  // Display the introductory text on the left side
  text(
    "Congratulations! You're a new chair at Some University, a campus with lots of students—and no AI policy.\n\n" +
    "You're tasked with providing leadership to your faculty and students in navigating the opportunities and challenges of generative AI on campus.\n\n" +
    "There hasn't been much guidance from your upper administration, but it's time for your first open office hours, so you'll need to make it work. \n\n Good luck!\n\n",
    150, 274, 700, 700 // Text bounds
  );
	// Set yellow color for the "Click to begin" text
  fill(255, 255, 0); // Yellow text
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display "Click to begin" centered near the bottom of the screen
  text("Click to begin", width / 2, height - 250);
}

function displayIntroScreen() {
  background(0); // Black background
  noStroke();
  fill(255);
  textSize(28); // Set text size for the intro
  textAlign(CENTER, CENTER);

  text(
    "August 19, 2024.\n\nabout how to handle generative AI on campus.\n\nNow that everyone's back, the requests and concerns are really rolling in.\n\nHow will you handle them?",
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
  fill(selectedColor); // Purple fill for the spine
  stroke(0);        // Black outline
  strokeWeight(5);
  rect(50, 100, 150, 800); // Spine rectangle

  // Black lines across the top of the spine (for the "title" effect)
  strokeWeight(3);
  for (let i = 0; i < 5; i++) {
    line(60, 140 + i * 20, 190, 140 + i * 20);
  }

  // Book page on the right side
  fill(255);        // White fill for the page
  noStroke();
  rect(250, 100, 700, 800); // Page rectangle

  // Block of text inside the page
  fill(0);          // Black text color
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
  fill(255, 105, 180); // Pink background for the button
  noStroke();
  let buttonWidth = 350;
  let buttonHeight = 50;
  let buttonX = 250 + (700 - buttonWidth) / 2; // Centered on the white rectangle
  let buttonY = 800 - buttonHeight - 30; // Positioned near the bottom of the page
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Slightly rounded corners

  // Black text inside the button
  fill(255,255,255);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Click to close the book", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

}

function checkMouseOverZones() {
  currentZone = ""; // Reset the currentZone when the mouse moves
  let message = ""; // Message to display in the black bar
	noStroke();
	  // Bookshelf zone
  if (mouseX > 852 && mouseX < 1000 && mouseY > 257 && mouseY < 595) {
    fill(200, 104, 237, 150); // Red highlight
    rect(852,257,148,338); // Bookshelf dimensions - right
    currentZone = "bookshelf";
    message = books.length > 0 ? "You need more time to just read." : "You really don't have time to read.";
  }
  if (mouseX > 11 && mouseX < 223 && mouseY > 135 && mouseY < 595) {
    fill(200, 104, 237, 150); // Red highlight
    rect(11,135,212,460); // Bookshelf dimensions - left
    currentZone = "bookshelf";
    message = books.length > 0 ? "You need more time to just read." : "You really don't have time to read.";
  }
  // Writing zone
	if (mouseX > 827 && mouseX < 931 && mouseY > 662 && mouseY < 814) {
    fill(255, 147, 0, 150); // Orange highlight
    rect(827,662,104,152); // Pencil cup dimensions
    message = "Remember when you had time for your own writing?";
  }
  // Monitor zone
  if (mouseX > 400 && mouseX < 625 && mouseY > 569 && mouseY < 709) {
    fill(20, 245, 233, 150); // Red highlight
    rect(400, 569, 225, 140); // Monitor dimensions
    currentZone = "monitor";
    message = emailChallenges.length > 0 ? "You have so many new emails." : "There are no more emails...for the moment.";
  }

  // Door zone (adjust x, y, width, and height based on actual position)
  if (mouseX > 400 && mouseX < 648 && mouseY > 128 && mouseY < 531) {
    fill(245, 66, 233, 150); // Red highlight
    rect(403, 128, 250, 406); // Door dimensions
    currentZone = "door";
    message = doorChallenges.length > 0 ? "There's people waiting outside the office." : "There's no one outside...for now.";
  }

   // Phone zone (adjust x, y, width, and height based on actual position)
  if (mouseX > 83 && mouseX < 258 && mouseY > 650 && mouseY < 787) {
    fill(155, 209, 250, 150); // Red highlight
    rect(83, 650, 175, 137); // phone dimensions
    currentZone = "phone";
    message = phoneChallenges.length > 0 ? "The phone hasn't stopped ringing." : "The phone is silent...for now.";
  }

  // Display the black bar at the bottom with the appropriate message
  if (message !== "") {
    fill(0); // Black background for the bar
    rect(0, height - 200, width, 100); // Draw the black bar at the bottom
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
    selectedColor = color(random(100, 255), random(0, 255), random(100, 255));
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
	if (currentZone === "monitor") {
		background(64, 224, 208);  // Turquoise background
	  textAlign(LEFT, BOTTOM);

		// Draw black border
		stroke(0);
		strokeWeight(10);
		noFill();
		rect(0, 0, width, height);

		// From and To boxes shifted to the right to make space for the envelope
		noStroke();
		fill(255);
		rect(250, 50, 700, 100);  // 'From' box
		rect(250, 180, 700, 100); // 'To' box

		// 'From' and 'To' text
		fill(0);
		textFont('monospace');
		textSize(40);
		text('From: someone@someU.edu', 260, 110);
		text('To:you@someU.edu', 260, 240);

		// Text display area shifted to the right
		fill(255);
		rect(50, 320, 900, 600); // White rectangle for text display

		// Optional: text inside the text display area
		fill(0);
		textSize(24);
		text(dialogueText, 100, 350, 800,300);

		// Larger retro "mail" icon (closed envelope) on the left
		fill(255); // White fill for the envelope
		stroke(0);
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
      let imgHeight = 250; // Height of the image

      // Draw a yellow border around the image
      fill(255, 255, 0); // Yellow color
      rect(imgX - 5, imgY - 5, imgWidth + 10, imgHeight + 10); // Draw the yellow outline slightly larger than the image

      // Draw the actual image inside the yellow outline
      image(doorImages[lastName], imgX, imgY, imgWidth, imgHeight);
		}
	} else {
		background(phoneImage);
    fill(0,0,0,190); // Black background
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
      fill(199, 60, 201); // Dark red when mouse is over the option
    } else {
      fill(100); // Light gray boxes when not hovered
    }
		
    rect(50, 400 + i * 50, 700, 40); // Create a box for each option	
    fill(255);
    text(options[i], 60, 410 + i * 50); // Display option text inside the box
    fill(100); // Reset the fill color for the next box
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
      fill(199, 60, 201); // Highlight color when mouse is over the option
    } else {
      fill(100); // Default color when not hovered
    }

    // Center the box horizontally and position it near the bottom
    rect(150, boxY, 700, 40); // Draw box for each option

    // Display the option text inside the box
    fill(255); // White text color
    textAlign(CENTER, CENTER); // Center the text
    text(options[i], 500, boxY + 20); // Center text inside the box

    fill(100); // Reset the fill color for the next box
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

// Function to check reputation limits and trigger the endgame
function checkReputationLimits() {
  if (facultyReputation <= 0) {
    endgameMessage = "The faculty have formed a secret AI rebellion. You’re officially on the 'no-fly zone' list for every committee meeting. Time to start practicing your evil laugh. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (facultyReputation >= 10) {
    endgameMessage = "Faculty are raving about your AI policies. Someone even suggested naming the break room coffee maker after you. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (adminReputation <= 0) {
    endgameMessage = "The administration is not amused. They’ve scheduled an emergency meeting—probably involving PowerPoints and raised eyebrows. Good luck explaining AI to them. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (adminReputation >= 10) {
    endgameMessage = "Congrats! The administration thinks you're a genius. You’ve been offered a special parking spot, which is the highest form of academic flattery. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (studentReputation <= 0) {
    endgameMessage = "Students have gone full riot mode. There are rumors they’re building a giant AI effigy on the quad. You might want to avoid campus for a bit. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }
  if (studentReputation >= 10) {
    endgameMessage = "The students have declared you their AI hero. Someone’s already designing a meme in your honor, and it’s trending. But tomorrow is another day. Click to continue.";
    currentRoom = "endgame";
    return true;
  }

  // New condition: If the player has exhausted all challenges without major reputation changes
  if (facultyReputation > 0 && facultyReputation < 10 && adminReputation > 0 && adminReputation < 10 && studentReputation > 0 && studentReputation < 10 && challengesCompleted >= totalChallenges) {
    endgameMessage = "You've successfully dodged AI-related chaos without really impressing or upsetting anyone. Somehow, you’ve survived the middle ground of academia. Bravo, for now. But tomorrow is another day. Click to continue.";
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
    "Your faculty can't believe it—they actually like your decision. That's a first.",
    "The faculty are praising your decision in the break room. Someone even bought donuts.",
    "Faculty members are actually smiling in your direction. This feels weird.",
    "Faculty approval is through the roof. They’re even saying nice things about you in emails!",
    "Your faculty loved that decision. They've started drafting a memo about it—voluntarily."
  ];
  
  const facultyNegativeMessages = [
    "Your faculty heard about that response, and they're not impressed. Expect some pointed questions at the next meeting.",
    "The faculty aren’t exactly thrilled with that one. Someone's already crafting a strongly worded email.",
    "Faculty members are grumbling in the hallways. Looks like your inbox is about to explode.",
    "Your faculty didn’t like that response. Brace yourself for some extra 'constructive feedback.'",
    "Your decision didn't sit well with the faculty. There's talk of forming a subcommittee to complain about it."
  ];

  // Arrays for admin reputation changes
  const adminPositiveMessages = [
    "The administration is pleased. They’ve even bumped you up in the email CC hierarchy!",
    "Congrats! The administration is considering giving you a special parking spot.",
    "The admins are impressed! They might actually show up to your next meeting.",
    "The administration just sent you a 'Great job!' email. They didn’t even use Comic Sans.",
    "Your decision made the admins happy. Expect a mysterious gift card in your mailbox."
  ];

  const adminNegativeMessages = [
    "The administration is confused by your decision. Prepare for an emergency meeting—probably with PowerPoints.",
    "Admin HQ isn’t too pleased. You can feel the passive-aggressive emails coming.",
    "The administration didn’t like that. Someone in the Provost's office is probably already writing a memo.",
    "The admin team looks concerned. They’ve scheduled a meeting with the word 'urgent' in the subject line.",
    "The administration is sending a 'we need to talk' email. Looks like you're getting some bonus paperwork."
  ];

  // Arrays for student reputation changes
  const studentPositiveMessages = [
    "The students are hyped. Someone’s already designing a meme in your honor.",
    "Your students loved that decision. Rumor has it, you’re trending on campus social media.",
    "Students are thrilled. Someone just started a fan page for you on their class group chat.",
    "The student body is buzzing with excitement. A few of them even sent a thank-you note.",
    "Your students are ecstatic. They’re debating whether to throw a party or make a viral TikTok."
  ];

  const studentNegativeMessages = [
    "The students aren’t impressed. There’s already a petition circulating to 'overthrow the AI policies.'",
    "Your decision didn’t sit well with the students. Someone’s organizing a sit-in. Again.",
    "The students are not happy. You can hear the faint rustling of protest signs being made.",
    "Students are grumbling about 'unfair AI policies.' Expect some angry tweets to start rolling in.",
    "Your decision has students upset. They’re planning a walkout... or maybe just skipping class. It’s hard to tell."
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