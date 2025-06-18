# AI: Admin Life

A visual novel game about navigating academic administration in the age of generative AI.

## Overview

"AI: Admin Life" is an interactive browser-based game that puts players in the role of a department chair at "Some University" dealing with the challenges and opportunities of generative AI in higher education. Players must balance the competing interests of faculty, administrators, and students while making decisions about AI policies and implementation.

## Game Description

You play as a newly appointed department chair tasked with providing leadership to faculty and students in navigating generative AI on campus. Through a series of interactions via email, phone calls, and office visits, you'll make decisions that affect your reputation with three key groups:

- **Faculty** - Academic colleagues with varying levels of AI acceptance
- **Administration** - Upper management with institutional concerns  
- **Students** - Learners adapting to AI-enhanced education

The game features humorous dialogue and scenarios that reflect real-world tensions around AI in academic settings.

## Technical Structure

### Core Files

- **`index.html`** - Main HTML page with game container and documentation
- **`mySketch.js`** - P5.js game logic and mechanics (1,169 lines)
- **`office.jpg`** - Primary office background image
- **`office.png`** - Alternative office background

### Character Assets

The game includes character portraits for various NPCs:
- `avatar.jpg` - Player character
- `confused.jpg` - Prof. Sean Confused
- `overwhelmed.jpg` - Prof. Agnes Overwhelmed
- `overexplainer.jpg` - Tutor Mia Overexplainer
- `gadgets.jpg` - Prof. Gary Gadgets
- `lost.jpg` - Writing Center Tutor Liz Lost
- `tired.jpg` - Admin Assistant Tom Tired
- `jittery.jpg` - Tutor Jake Jittery
- `deadline.jpg` - Prof. Dana Deadline
- `frazzled.jpg` - Admin Assistant Fran Frazzled

### Environment Assets

- `campus.jpg` - Campus background for intro/outro screens
- `hallway.jpg` - Hallway background
- `phone.jpg` - Phone interaction background

## Game Mechanics

### Reputation System
Players start with 5 points in each category (Faculty, Admin, Students) and can earn or lose points based on decisions. The game ends when any reputation reaches 0 or 10 points.

### Interaction Types

1. **Email Challenges** (`monitor` zone) - Handle email scenarios from faculty and administrators
2. **Phone Calls** (`phone` zone) - Respond to urgent calls from various stakeholders  
3. **Office Visits** (`door` zone) - Meet with faculty and staff who drop by
4. **Bookshelf** - Take breaks to read academic literature (costs reputation with all groups)

### Features

- **Dynamic Content** - Over 30 unique scenarios across the three interaction types
- **Branching Dialogue** - Multiple response options with different reputation impacts
- **Visual Novel Style** - Character portraits and themed backgrounds
- **Retro Aesthetic** - Inspired by early web design and Adobe Flash games

## Technical Implementation

### Built With
- **P5.js** - JavaScript creative coding library
- **HTML5/CSS3** - Web structure and styling
- **Vanilla JavaScript** - Game logic and interactions

### Key Systems
- Mouse-over zone detection for office interactions
- Dynamic reputation tracking and visualization
- Random challenge selection from predefined pools
- Reputation-based feedback system with humorous messages

## Academic Context

This game was developed for the **2024 CCCC Fall Virtual Institute: Machine Writing and the Work of Rhetoric and Composition Program**. It serves as a "playable editorial" exploring the tensions around generative AI in higher education through interactive narrative.

### Design Philosophy
The game intentionally balances:
- **Productivity vs. Reflection** - Players can engage with constant demands or take time to read
- **Stakeholder Management** - Realistic competing interests of different campus groups
- **Humor and Critique** - Satirical take on administrative challenges while addressing real concerns

## Development Process

### AI-Assisted Creation
The game was created through iterative dialogue with generative AI tools:
- **ChatGPT 4.0** - Content generation and code development (~70 prompts)
- **DALL-E** - Initial image generation
- **Adobe Firefly** - Character refinement and variations

### Assets
- **Code**: ~1,100 lines of JavaScript (some hand-coded debugging)  
- **Images**: All AI-generated, refined for retro web aesthetic
- **Content**: Character names, dialogue, and scenarios generated via AI
- **Structure**: Game mechanics and interaction zones hand-designed

## How to Play

1. Open `index.html` in a web browser
2. Click through the intro screens
3. Hover over highlighted zones in the office to see available interactions
4. Click on zones to engage with challenges
5. Choose responses that balance competing stakeholder interests
6. Monitor your reputation bars in the upper right
7. Try to survive the academic day without losing all reputation with any group!

## Extensions

The game includes a framework for community contributions through a Google Form for scenario submissions, allowing participants to add their own AI-related administrative challenges.

## Credits

**Created by:** [Anastasia Salter](https://anastasiasalter.net)  
**Institution:** University of Central Florida  
**Generated with:** ChatGPT 4.0, DALL-E, and Adobe Firefly

## License

This project was created for educational purposes as part of an academic conference presentation.
