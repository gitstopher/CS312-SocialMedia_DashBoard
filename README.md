# CS312 Social Media Dashboard

A full-stack React + Node.js dashboard for managing social media activity, analytics, and scheduling. 
---

### Setup
### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm 
- Git 

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CS312-SocialMedia_DashBoard.git
cd CS312-SocialMedia_DashBoard

### 2. install dependencies
cd my-dashboard
npm install
npm start
```
This will launch the app at http://localhost:3000


# Instructions for Team Members

### Prerequisite
[cite_start]You (the admin) must add their Facebook account as a "Tester" on **developers.facebook.com > App Roles > Roles**[cite: 2].
[cite_start]They must accept the invite at **developers.facebook.com/requests** before they can log in[cite: 3].

### Step 1: Create the .env File
[cite_start]Since `.env` files are ignored by Git (for security), they won't have it[cite: 5]. [cite_start]You need to send them the file contents securely (e.g., via Slack, Discord, or DM)[cite: 6].

[cite_start]Tell them to create a file named `.env` inside the **backend** folder and paste this[cite: 7]:

```env
# Cloud Database (Shared by the whole team)
DATABASE_URL='postgresql://neondb_owner:npg_3ViUZd6AksqT@ep-cool-moon-afmafuo4.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require'

# Facebook Keys (Required for Login)
FB_APP_ID=2633206087078939
FB_APP_SECRET=03b32b0433699bcb8757f17b623461ee

# Security
JWT_SECRET=asdosfsdjhdkgheru

tep 3: Run the Project
Run this from the root folder: cd .../CS312-Social Media DashBoard.

Bash

npm start



This will launch the Backend (Port 4000) and Frontend (Port 3000) simultaneously. The browser should open automatically (or go to http://localhost:3000).