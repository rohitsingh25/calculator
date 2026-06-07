# Deploying AetherCalc on Vercel

This guide provides step-by-step instructions to host and deploy the **AetherCalc** React application on [Vercel](https://vercel.com).

---

## Option 1: Deploying via Vercel Web Dashboard (Recommended)

Connecting your Git repository to Vercel is the easiest method and enables **automatic deployment on every push**.

### Step 1: Push code to Git (GitHub/GitLab/Bitbucket)
If you haven't already, commit your changes and push them to your repository:
```bash
git add .
git commit -m "feat: port calculator to React and style premium glassmorphic UI"
git branch -M main
# Add remote and push to github
# git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Import Project on Vercel
1. Log in to [Vercel](https://vercel.com).
2. On your dashboard, click **Add New...** and select **Project**.
3. Choose your Git provider and import the `calculator` repository.

### Step 3: Configure Build Settings
Vercel automatically detects that the project uses **Vite**. The configuration will be set to:
* **Framework Preset:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

Click **Deploy**. Vercel will build your application and launch it live in about a minute, providing you with a production URL.

---

## Option 2: Deploying via Vercel CLI (Local Terminal)

If you prefer to deploy directly from your local terminal without linking a Git repository, you can use the Vercel Command Line Interface.

### Step 1: Install Vercel CLI Globally
```bash
npm install -g vercel
```

### Step 2: Run Vercel Deploy Command
Navigate to your project root folder and execute:
```bash
vercel
```

### Step 3: Configure Project Prompts
The CLI will ask you a few setup questions:
1. **Set up and deploy?** Yes (`Y`)
2. **Which scope?** Choose your Vercel account.
3. **Link to existing project?** No (`N`)
4. **What's your project's name?** `aethercalc` (or hit enter to use default)
5. **In which directory is your code located?** `./` (default)
6. **Want to modify build settings?** No (`N`) - Vite settings are auto-detected.

Vercel will upload your files and generate a **Preview URL**.

### Step 4: Promote to Production
Once you've verified the preview build works, run the command to deploy to production:
```bash
vercel --prod
```
This generates your final live production link!

---

## Features Enabled by `vercel.json`

The included [vercel.json](file:///home/rohit/Desktop/GitHub/Calculator/calculator/vercel.json) configures the following settings:
- **Clean URLs:** Automatically strips trailing extensions or slashes from urls for a cleaner presentation.
- **SPA Routing Rewrites:** Directs all incoming URLs (`/(.*)`) to return `index.html`. This ensures that even if you expand the app with client-side routers (like React Router), browser refreshes will not trigger `404` errors.
