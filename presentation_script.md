# ACADEMITRACK - FINAL PRESENTATION (PPT SCRIPT & STRUCTURE)

Here is the complete content for your PowerPoint slides and a structured timeline for your 10-minute video presentation. I have carefully divided the speaking time so all 3 team members get equal opportunity as required by the professor.

## 🕒 10-MINUTE VIDEO TIMELINE OVERVIEW
- **Srujan Rajput (0:00 - 3:20):** Introduction, Problem Statement, Architecture, & Core Engineering.
- **Aditya Raj Kar (3:20 - 6:40):** System Design (UMLs) and Student Workflow Demonstration. 
- **Rakshan Singh (6:40 - 10:00):** Faculty Workflow Demonstration, Testing Automation (Selenium), and Conclusion.

---

## 📊 SLIDES & SPEAKING SCRIPT

### SLIDE 1: Title & Team Details
**Visuals on Slide:**
- **Title:** AcademiTrack: Academic Project Management and Progress Tracking System
- **Team ID:** [Insert Your Team ID Here]
- **Team Members:** 
  - Srujan Rajput (23BCT0104) - Team Leader
  - Aditya Raj Kar (23BCT0079)
  - Rakshan Singh (23BCB0062)
- **Instructor:** Prof. Swarnalatha P.

**Speaking (Srujan):**
"Good Morning/Afternoon Professor. We are Team [Insert Team ID], presenting our software engineering project: AcademiTrack. I am the team leader Srujan Rajput, and presenting with me today are Aditya Raj Kar and Rakshan Singh."

### SLIDE 2: Individual Contributions (Mandatory Requirement)
**Visuals on Slide:**
- **Srujan Rajput:** Agile Project Leadership, Backend Auth & RBAC Middleware, Selenium Testing Automation.
- **Aditya Raj Kar:** System Architecture Design, UI/UX Workflow Planning, Student Interfaces.
- **Rakshan Singh:** UML Behavioral Modeling (Sequence/Activity), Database Schema Design, Faculty Dashboard Logic.

**Speaking (Srujan):**
"Before we begin the demo, here is a brief overview of our individual contributions. As the Team Lead, I oversaw the Agile process, programmed the backend Role-Based Access Control, and built the Selenium testing suite. Aditya designed the core system architecture and the React UI for students. Rakshan engineered our complex UML models, the database schemas, and the overarching faculty logic."

### SLIDE 3: Problem Statement
**Visuals on Slide:**
- Bullet 1: Fragmented project tracking (Emails, WhatsApp).
- Bullet 2: Lack of transparency between students and faculty.
- Bullet 3: Inefficient milestone enforcement.

**Speaking (Srujan):**
"The core problem we identified is that university project tracking relies on fragmented methods like emails and spreadsheets. This leads to lost deliverables and a lack of transparency for supervisors. AcademiTrack solves this by centralizing milestones, file uploads, and faculty grading into a single, immutable audit trail."

### SLIDE 4: System Architecture & Tech Stack
**Visuals on Slide:**
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Testing:** Selenium WebDriver, Python Load Testing
*(Insert your High-Level Architecture Diagram from your SDS here)*

**Speaking (Srujan):**
"Our application is built on the modern MERN stack. We structured it in a decoupled Three-Tier Architecture. Our Express backend uses JWTs and strict middleware logic to enforce data isolation, meaning Faculty A can never see Faculty B's nested data. I'll now pass it to Aditya who will explain our System Design and demonstrate the student workflow."

### SLIDE 5: System Design (UML Models)
**Visuals on Slide:**
*(Combine screenshots of your Use Case Diagram and Sequence Diagram side-by-side)*

**Speaking (Aditya):**
"Thank you Srujan. To ensure a robust build, we created comprehensive UML models. Our Use Case diagram maps out the strict boundaries between Student and Faculty actors, while our Sequence diagrams dictate exactly how authentication tokens flow between the React frontend and the MongoDB database."

### SLIDE 6: Demo Overview - The Student Workflow
**Visuals on Slide:**
- Bullet 1: Secure Registration & Login
- Bullet 2: Creating Projects & Assigning Faculty
- Bullet 3: Submitting Documents against Milestones.
*(Have your screen recording software ready here)*

**Speaking (Aditya):**
"Now, we will demonstrate the live software. First, the student workflow. [Start Video Demo]. As a student, I log into the React dashboard. The stats cards dynamically calculate my total and graded projects. I can create a new project, select a completely dynamic list of faculty advisors, and lock in my proposal. As you can see, I am sequentially adding milestones, uploading my deliverables via our Multer implementation, and watching the progress bar calculate in real-time. I will now pass it to Rakshan to show the Faculty review process."

### SLIDE 7: Demo Overview - The Faculty Workflow
**Visuals on Slide:**
- Bullet 1: Dynamic Student Grouping UI
- Bullet 2: Project Status & Grade Application
- Bullet 3: Immutable Feedback Logging
*(Have your screen recording software ready here)*

**Speaking (Rakshan):**
"Thank you Aditya. Moving over to the faculty perspective, I will log in as our test professor. [Start Video Demo]. Notice how the dashboard UI is completely different. The projects are grouped under specific student headers using a dynamic javascript reduction algorithm. Right here, I can review the documents Aditya just uploaded. I will update the status to 'Approved', assign a final grade of 'A+', and leave a feedback comment. These actions update the database in real-time, enforcing an unchangeable audit trail."

### SLIDE 8: Software Testing & Quality Assurance
**Visuals on Slide:**
- **Automated Testing:** 52-Case Selenium Suite (Node.js) -> Passed 96.2%
- **Performance Testing:** Python Benchmarking -> 733 Requests/second.
*(Insert screenshots of the Selenium Terminal Output and the Python graphs here)*

**Speaking (Rakshan):**
"To guarantee software stability, we heavily prioritized automated testing. Srujan built a custom 52-case Selenium WebDriver script that automatically drives a Chrome window to test login routing, role isolation, and DOM mutations, achieving a 96.2% pass rate. We also ran a Python multithreaded benchmarking script, proving our REST API can comfortably handle 730 concurrent requests per second with sub-35 millisecond response times."

### SLIDE 9: Conclusion
**Visuals on Slide:**
- Summarize Success: Fully working MERN application ensuring academic grading integrity.
- Future Scope: Cloud File Storage (AWS), University SSO Integration.
- "Thank You!"

**Speaking (Rakshan):**
"In conclusion, AcademiTrack successfully digitizes manual academic supervision workflows into a scalable, secure software product. Future enhancements will include AWS object storage and University SSO integration. Thank you Professor Swarnalatha for your continued guidance this semester. This concludes our final presentation."
