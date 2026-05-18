# CYSE 411: Secure Software Engineering

## Course Repository — Summer 2026
Welcome to the official course repository for CYSE 411: Secure Software Engineering. This repository serves as a centralized hub for all practical, technical, and supplementary materials used throughout the semester. Here, you will find code demonstrations, hands-on lab stubs, classroom examples, and extra exercises designed to help you master the art of building inherently secure systems.

The core objective of this course is to shift security to the left—integrating robust security practices, threat modeling, and vulnerability mitigation directly into the software development lifecycle (SDLC).

📂 Repository Structure
The repository is organized into distinct directories to help you quickly find the resources you need:

``` Plaintext
├── unit1/                 # files related to the unit 1
├── unit2/                 # files related to the unit 2
...
└── README.md              # This file
```

---

## 🛠️ Core Topics Covered

This repository contains code, frameworks, and exercises mapped to the following major course domains:

- Secure Coding Principles: Input validation, output encoding, data sanitization, and cryptographic storage.

- Vulnerability Analysis: Practical exploitation and remediation of the OWASP Top 10 (e.g., Injection, Broken Authentication, SSRF).

- Threat Modeling: Architectural risk analysis utilizing frameworks like STRIDE to analyze cyber-physical and enterprise software architectures.

- Automated Assurance: Leveraging Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and dependency scanning within automated pipelines.

---

## 🚀 Getting Started
To work with the materials in this repository locally, follow these steps:

1) Prerequisites
Ensure you have the following baseline tools installed on your development machine:

- Git (latest version): Compiler/Runtime environments specified in individual lab directories (e.g., Python 3.x, Java OpenJDK, or C/C++ build tools): https://git-scm.com/install/

- An IDE of your choice (VS Code): https://code.visualstudio.com/download

- NodeJS: it is the core of our work this Summer: https://nodejs.org/en/download


2) Clone the Repository

Clone this repository to your local environment using SSH or HTTPS:

``` bash
git clone https://github.com/CYSE-411/GMU-CYSE-411.git
```

3) Staying Updated

Materials may be added or updated as the semester progresses. Before starting a new module or lab, ensure your local copy is synchronized with the remote tracking branch (in VSCode):

``` bash
git checkout main
git pull origin main
```

---

## 📝 Lab Workflow & GitHub Classroom
While this repository hosts general samples and exercise stubs, your formal graded assignments will be managed via GitHub Classroom.

- Accepting Assignments: Use the unique GitHub Classroom assignment links distributed via the course learning management system (Canvas) to generate your private repository for each lab.

- Automated Feedback: Graded repositories often utilize integrated GitHub Actions pipelines to run automated test suites. Review the action logs upon pushing code to check your test coverage and correctness.


---

## 📬 Contact & Support
If you encounter technical issues with the code samples, discover a bug in a lab stub, or have questions about the material:

- Office Hours: Refer to the course syllabus on Canvas for scheduled times and location details.

- Teaching Assistant: Reach out to the Graduate Teaching Assistant (GTA) via the designated course channels for lab-specific environment troubleshooting.

- Issues: For typos or errors explicitly found within this central repository, feel free to open a descriptive Issue here on GitHub.
