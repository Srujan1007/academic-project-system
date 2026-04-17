const pptxgen = require("pptxgenjs");
let pres = new pptxgen();

pres.author = "Srujan Rajput";
pres.company = "Vellore Institute of Technology";
pres.subject = "Academic Project Management System";
pres.title = "AcademiTrack Final Presentation";

// Custom slide layout and theme
pres.defineSlideMaster({
  title: "MASTER_SLIDE",
  background: { color: "FFFFFF" },
  objects: [
    { rect: { x: 0, y: 0, w: "100%", h: 0.7, fill: { color: "003366" } } },
    { text: { text: "AcademiTrack - Winter 2026", options: { x: 0.2, y: 0.1, w: "50%", h: 0.5, color: "FFFFFF", fontSize: 14, bold: true } } }
  ]
});

pres.layout = "LAYOUT_16x9";

// Slide 1: Title & Team Details
let slide1 = pres.addSlide();
slide1.background = { color: "003366" };
slide1.addText("AcademiTrack", { x: 0.5, y: 1.5, w: "90%", color: "FFFFFF", fontSize: 44, bold: true, align: "center" });
slide1.addText("Academic Project Management and Progress Tracking System", { x: 0.5, y: 2.3, w: "90%", color: "CCCCCC", fontSize: 20, align: "center" });

slide1.addText("Team ID: (Your Team ID Here)\nInstructor: Prof. Swarnalatha P.", { x: 0.5, y: 3.5, w: "90%", color: "FFFFFF", fontSize: 18, align: "center", bold: true });

slide1.addText("Team Members:\n• Srujan Rajput (23BCT0104) - Team Leader\n• Aditya Raj Kar (23BCT0079)\n• Rakshan Singh (23BCB0062)", { x: 0.5, y: 4.2, w: "90%", color: "FFFFFF", fontSize: 16, align: "center" });

// Slide 2: Individual Contributions
let slide2 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide2.addText("Individual Member Contributions", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide2.addText([
  { text: "Srujan Rajput (23BCT0104)\n", options: { bold: true, color: "003366" } },
  { text: "• Agile Project Leadership\n• Backend Auth & RBAC Middleware\n• Selenium Testing Automation\n\n" },
  { text: "Aditya Raj Kar (23BCT0079)\n", options: { bold: true, color: "003366" } },
  { text: "• System Architecture Design\n• UI/UX Workflow Planning\n• Student Interfaces & API Integration\n\n" },
  { text: "Rakshan Singh (23BCB0062)\n", options: { bold: true, color: "003366" } },
  { text: "• UML Behavioral Modeling (Sequence/Activity)\n• Database Schema Design\n• Faculty Dashboard Logic" }
], { x: 0.5, y: 1.6, w: "90%", fontSize: 16, color: "333333" });

// Slide 3: Problem Statement
let slide3 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide3.addText("Problem Statement", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide3.addText("Current academic project tracking relies on fragmented manual workflows.\n\n• Inefficient Tracking: Spreadsheets and emails result in lost deliverables.\n• Lack of Transparency: Supervisors cannot see real-time progress.\n• Coordination Issues: Grading and feedback trails are often disconnected from submissions.\n\nOur Solution: AcademiTrack centralizes milestones, file uploads, and faculty grading into a single, immutable digital audit trail.", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 4: System Architecture & Tech Stack
let slide4 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide4.addText("System Architecture & Technology Stack", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide4.addText("A modern, decoupled Three-Tier Architecture:\n\n1. Presentation Layer (Frontend)\n   • React.js with Vite\n   • Tailwind CSS for UI\n\n2. Application Layer (Backend)\n   • Node.js & Express.js\n   • Custom JWT Authentication Middleware\n\n3. Data Layer (Database)\n   • MongoDB & Mongoose ODM\n\n(Please paste your architecture diagram here)", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 5: System Design (UML Models)
let slide5 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide5.addText("System Design (UML Modeling)", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide5.addText("Our software behavior is strictly mapped using standard UML specifications:\n\n• Use Case Diagram: Enforces isolated roles between Student and Faculty actors.\n• Class Diagram: Structures Mongoose schemas (Users, Projects, Milestones).\n• Sequence Diagram: Dictates HTTP logic and UI states during auth flows.\n\n(Please paste screenshots of your UML diagrams here)", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 6: Student Workflow
let slide6 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide6.addText("The Student Workflow", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide6.addText("The primary actor's journey from genesis to delivery:\n\n• Authentic Registration: Encrypted sessions (Bcrypt + JWT).\n• Dynamic Mapping: Creating projects and directly linking registered Faculty guides.\n• Sequential Tracking: Adding specific milestones on a timeline.\n• Document Archival: Secure Multer uploads mapped strictly to milestones.\n\n(Live Demo Context: Refer to Video Screen Recording)", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 7: Faculty Workflow
let slide7 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide7.addText("The Faculty Workflow & Evaluation", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide7.addText("The evaluation loop enforcing project integrity:\n\n• Data Isolation: Faculty A can never access Faculty B's nested group data.\n• Dynamic UI: Projects grouped neatly under the names of specific assigned students.\n• Evaluation: One-click status updates (In Progress -> Approved).\n• Immutable Feedback: Faculty assign letter grades and textual feedback saved permanently on record.\n\n(Live Demo Context: Refer to Video Screen Recording)", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 8: Testing & Validation
let slide8 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide8.addText("Software Testing & Quality Assurance", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide8.addText("Extensive validation verifying functional completion:\n\n• Automated Regression (Selenium): 52 UI Test Cases executing dynamically over Node.js Chrome bindings -> Achieved 96.2% Pass Rate.\n• Boundary Checks: Intercepted and patched Multer bypass flaws.\n• Performance Testing (Python): System scales to handle 733 REST requests per second natively.\n\n(Please paste Selenium HTML Table & Python graphs here)", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Slide 9: Conclusion
let slide9 = pres.addSlide({ masterName: "MASTER_SLIDE" });
slide9.addText("Conclusion & Future Scope", { x: 0.5, y: 0.8, w: "90%", color: "003366", fontSize: 32, bold: true });
slide9.addText("AcademiTrack successfully digitizes administrative chaos into a streamlined, high-performance application enforcing accurate evaluations.\n\nFuture Scope:\n• Dedicated University SSO (OAuth2) identity providers.\n• Cloud Blob Storage (AWS S3) for massive submission archives.\n• Dedicated Dean/HOD analytical dashboard monitoring.\n\nThank you!", { x: 0.5, y: 1.8, w: "90%", fontSize: 18, color: "333333", bullet: true });

// Save the Presentation
pres.writeFile({ fileName: "AcademiTrack_Final_Presentation.pptx" }).then(() => {
    console.log("PPTX created successfully!");
}).catch(err => {
    console.error("Error creating PPTX: ", err);
});
