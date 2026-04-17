/**
 * seed.js — Clears DB and populates with custom demo data
 * Run: node seed.js  (from /backend directory)
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");
const Project = require("./models/Project");
const Milestone = require("./models/Milestone");
const Feedback = require("./models/Feedback");
const Submission = require("./models/Submission");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/academic_system";

// ── Faculty accounts (2) ──────────────────────────────────────────
const facultyData = [
  { name: "Raghav Sharma",   email: "s4srijanrajput1007@gmail.com",    password: "Professor@123", role: "faculty" },
  { name: "Saksham Rajput",  email: "s4sakshamrajput2004@gmail.com",   password: "Professor@123", role: "faculty" },
];

// ── Student accounts (4) ──────────────────────────────────────────
const studentData = [
  { name: "Srujan Rajput",   email: "srujan.rajput2023@vitstudent.ac.in",    password: "Student@123", role: "student" },
  { name: "Aditya Raj Kar",  email: "adityaraj.kar2023@vitstudent.ac.in",    password: "Student@123", role: "student" },
  { name: "Divyam Pandey",   email: "divyam.pandey2023@vitstudent.ac.in",    password: "Student@123", role: "student" },
  { name: "Abhishek Kumar",  email: "abhishek.kumar2023a@vitstudent.ac.in",  password: "Student@123", role: "student" },
];

// ── Projects (mapped by index after user creation) ────────────────
const projectTemplates = [
  // Srujan (student 0) → Raghav (faculty 0)
  { studentIdx: 0, facultyIdx: 0, title: "AcademiTrack: Academic Project Management System",
    description: "A full-stack MERN web application for centralized academic project tracking with role-based access control, milestone management, and faculty grading.",
    status: "Completed", grade: "A+" },
  { studentIdx: 0, facultyIdx: 0, title: "Smart Attendance System using Face Recognition",
    description: "An AI-powered attendance system using OpenCV and deep learning to automatically mark student attendance through facial recognition in real-time.",
    status: "In Progress", grade: "" },

  // Aditya (student 1) → Raghav (faculty 0)
  { studentIdx: 1, facultyIdx: 0, title: "Blockchain-Based Certificate Verification Portal",
    description: "A tamper-proof academic certificate verification platform built on Ethereum smart contracts with a React frontend and MetaMask wallet integration.",
    status: "In Progress", grade: "" },
  { studentIdx: 1, facultyIdx: 0, title: "Online Exam Proctoring System",
    description: "Browser-based exam proctoring using webcam eye-tracking with TensorFlow.js to detect suspicious behaviour during online assessments.",
    status: "Approved", grade: "A" },

  // Divyam (student 2) → Saksham (faculty 1)
  { studentIdx: 2, facultyIdx: 1, title: "E-Commerce Recommendation Engine",
    description: "A collaborative filtering recommendation engine built with Python Flask, serving personalised product suggestions via a REST API connected to a React storefront.",
    status: "Completed", grade: "B+" },
  { studentIdx: 2, facultyIdx: 1, title: "IoT-Based Smart Irrigation System",
    description: "Sensor-driven irrigation automation using NodeMCU, soil moisture sensors, and a React dashboard for real-time monitoring and automated watering schedules.",
    status: "In Progress", grade: "" },

  // Abhishek (student 3) → Saksham (faculty 1)
  { studentIdx: 3, facultyIdx: 1, title: "Hospital Management System",
    description: "Full-stack hospital management application with patient records, doctor scheduling, prescription tracking, and billing modules using the MERN stack.",
    status: "In Progress", grade: "" },
  { studentIdx: 3, facultyIdx: 1, title: "Real-Time Weather Monitoring Dashboard",
    description: "A live weather monitoring dashboard using the OpenWeatherMap API, Chart.js visualisations, and geolocation-based city detection with historical data analysis.",
    status: "Completed", grade: "A-" },
];

// ── Milestones per project status ─────────────────────────────────
const milestoneSets = {
  "In Progress": [
    { name: "Literature Survey Completed",     daysOffset: -30, status: "Completed" },
    { name: "System Design Finalized",         daysOffset: -15, status: "Completed" },
    { name: "Backend API Development",         daysOffset: 5,   status: "Pending" },
    { name: "Frontend Integration & Testing",  daysOffset: 20,  status: "Pending" },
  ],
  "Completed": [
    { name: "Requirement Analysis Done",       daysOffset: -45, status: "Completed" },
    { name: "Database Schema Designed",        daysOffset: -30, status: "Completed" },
    { name: "Full Stack Implementation",       daysOffset: -15, status: "Completed" },
    { name: "Testing & Documentation",         daysOffset: -5,  status: "Completed" },
  ],
  "Approved": [
    { name: "Project Proposal Accepted",       daysOffset: -50, status: "Completed" },
    { name: "Core Modules Built",              daysOffset: -30, status: "Completed" },
    { name: "Integration Testing Passed",      daysOffset: -15, status: "Completed" },
    { name: "Final Presentation & Viva",       daysOffset: -3,  status: "Completed" },
  ],
};

// ── Feedback templates ────────────────────────────────────────────
const feedbackPool = [
  "Good progress so far. Please ensure the architecture diagram is updated before the next review.",
  "The implementation looks solid. Consider adding input validation on the frontend forms as well.",
  "Well-structured code. Add JSDoc comments to all controller files for better maintainability.",
  "Excellent work on the UI design. The milestone tracking feature works exactly as expected.",
  "The database schema is well-designed. Consider adding indexing on frequently queried fields.",
  "Testing coverage is satisfactory. Add edge-case tests for authentication failure scenarios.",
  "Project is on track. The REST API follows best practices — good use of status codes.",
  "Great demonstration during the review. Minor UI fixes needed on mobile responsiveness.",
  "Impressive architecture. The RBAC implementation is clean and well-separated at the middleware level.",
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // ── CLEAR ALL COLLECTIONS ─────────────────────────────────────
    console.log("\n🗑️   Clearing entire database...");
    await User.deleteMany({});
    await Project.deleteMany({});
    await Milestone.deleteMany({});
    await Feedback.deleteMany({});
    await Submission.deleteMany({});
    console.log("   ✅ All collections cleared");

    // ── CREATE FACULTY ────────────────────────────────────────────
    console.log("\n📦  Creating Faculty accounts...");
    const faculties = [];
    for (const f of facultyData) {
      const user = await User.create(f);
      console.log(`   ✅ Created: ${user.name} (${user.email})`);
      faculties.push(user);
    }

    // ── CREATE STUDENTS ───────────────────────────────────────────
    console.log("\n📦  Creating Student accounts...");
    const students = [];
    for (const s of studentData) {
      const user = await User.create(s);
      console.log(`   ✅ Created: ${user.name} (${user.email})`);
      students.push(user);
    }

    // ── CREATE PROJECTS, MILESTONES & FEEDBACK ────────────────────
    console.log("\n📦  Creating Projects, Milestones & Feedback...");
    for (const pt of projectTemplates) {
      const studentId = students[pt.studentIdx]._id;
      const facultyId = faculties[pt.facultyIdx]._id;

      const project = await Project.create({
        title: pt.title,
        description: pt.description,
        studentId,
        facultyId,
        status: pt.status,
        grade: pt.grade,
      });
      console.log(`   ✅ Project: "${project.title}" → ${pt.status}${pt.grade ? " [" + pt.grade + "]" : ""}`);

      // Add milestones
      const milestoneSet = milestoneSets[pt.status];
      for (const ms of milestoneSet) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + ms.daysOffset);
        await Milestone.create({
          projectId: project._id,
          name: ms.name,
          deadline,
          status: ms.status,
        });
      }
      console.log(`      ↳ ${milestoneSet.length} milestones added`);

      // Add feedback for completed/approved projects
      if (pt.status !== "In Progress") {
        const numFeedback = pt.status === "Approved" ? 2 : 1;
        for (let i = 0; i < numFeedback; i++) {
          const comment = feedbackPool[Math.floor(Math.random() * feedbackPool.length)];
          await Feedback.create({
            projectId: project._id,
            facultyId,
            comment,
          });
        }
        console.log(`      ↳ ${numFeedback} feedback entries added`);
      }
    }

    // ── SUMMARY ───────────────────────────────────────────────────
    console.log("\n══════════════════════════════════════════════════════");
    console.log("🎉  DATABASE SEEDED SUCCESSFULLY!");
    console.log("══════════════════════════════════════════════════════");
    console.log("\n📋  LOGIN CREDENTIALS FOR DEMO:");
    console.log("──────────────────────────────────────────────────────");
    console.log("  FACULTY ACCOUNTS (password: Professor@123)");
    faculties.forEach(f => console.log(`    • ${f.name.padEnd(20)} → ${f.email}`));
    console.log("  STUDENT ACCOUNTS (password: Student@123)");
    students.forEach(s => console.log(`    • ${s.name.padEnd(20)} → ${s.email}`));
    console.log("──────────────────────────────────────────────────────");
    console.log(`  Total: ${faculties.length} faculty, ${students.length} students, ${projectTemplates.length} projects`);
    console.log("══════════════════════════════════════════════════════\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌  Seeding failed:", err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
