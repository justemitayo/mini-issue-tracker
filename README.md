           Mini Issue Tracker
A lightweight issue tracking app built with React, TypeScript, and Zustand. It allows users to create, filter, update, and view issues directly in the browser. I made use of json server. 
Instruction to run locally


git clone https://github.com/yourusername/mini-issue-tracker.git
cd mini-issue-tracker
npm install
npm run dev

Open a second terminal 

  Json-server - - watch data/db.json - - port 8000 

Features

•	Create issues with title, description and priority by clicking the add issue button. 
•	Filter and search by status, priority and title. 
•	Edit and delete issue details by clicking the edit icon and the delete icon respectively. 
•	Toggle the open and closed button. 
•	View issue details on a separate page using routes and params. 
•	Persistent storage using localStorage. 
•	Instant feedback with React Hot Toast. 
•	Fully responsive UI in both web and mobile view. 


Architecture


The app follows a modular component structure:
•	Navbar- containing the title. 
•	SearchModal – Handles filtering and searching and new issue form. 
•	IssueCard – Individual issue display with colored priority tags.
•	IssueList – Displays all issues with scroll and layout spacing.
•	NewIssueForm – Form to add new issues and its handled in the search modal. 
•	IssueDetail – Shows full details for a selected issue using react-router-dom and params. 
•	IssueClear- clears all the issue at once. 
State is managed globally with Zustand, which stores and syncs issues to localStorage. Routing is handled by React Router.

Tech Stack

•	React + TypeScript
. json server
•	Zustand (state management)
•	React Router
•	React Hot Toast
