<?php
session_start();
if (!empty($_SESSION['employee_id']) || !empty($_SESSION['is_team_leader'])) {
    header('Location: index.php');
    exit;
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Northstar Pulse | Sign In</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body data-page="login">
    <div class="auth-shell" id="authShell">
      <div class="auth-card">
        <span class="eyebrow">WELCOME BACK</span>
        <h2>Northstar Pulse</h2>
        <p>Use your employee username and password to access your workspace.</p>

        <form id="loginForm">
          <label>
            Username
            <input name="username" type="text" placeholder="employee123" required />
          </label>

          <label>
            Password
            <input name="password" type="password" placeholder="Enter your password" required />
          </label>

          <button class="check" type="submit">Login to dashboard <span>→</span></button>
        </form>

        <form id="signupForm" class="hidden">
          <label>
            First name
            <input name="firstName" type="text" placeholder="e.g. Priya" required />
          </label>

          <label>
            Last name
            <input name="lastName" type="text" placeholder="e.g. Shah" required />
          </label>

          <label>
            Work email
            <input name="email" type="email" placeholder="priya@northstar.com" required />
          </label>

          <div class="field-row">
            <label>
              Username
              <input name="username" type="text" placeholder="employee123" required />
            </label>
            <label>
              Set password
              <input name="password" type="password" placeholder="Minimum 6 characters" required />
            </label>
          </div>

          <label>
            Confirm password
            <input name="confirmPassword" type="password" placeholder="Re-enter password" required />
          </label>

          <label>
            Department
            <select name="department">
              <option>Product Design</option>
              <option>Engineering</option>
              <option>Quality Assurance</option>
              <option>People Operations</option>
            </select>
          </label>

          <label>
            Start date
            <input name="startDate" type="date" required />
          </label>

          <button class="check" type="submit">Create account &amp; continue <span>→</span></button>
        </form>

        <div class="humor-quote-box" id="authHumorQuoteBox">
          <span class="humor-icon">☕</span>
          <span id="authHumorText">"Unlocking your workspace... Please ensure your coffee cup is at least half full."</span>
        </div>

        <div class="auth-actions">
          <button class="secondary-btn" id="showCreateAccountBtn" type="button">Employee Sign Up</button>
          <button class="secondary-btn leader-auth-nav-btn" id="authShellLeaderLoginBtn" type="button" style="margin-left:8px;">👑 Team Leader Sign In</button>
          <button class="secondary-btn" id="authShellCreateLeaderBtn" type="button" style="margin-left:8px;background:#eef6ec;color:#2f5d34;border:1px solid #cce4ca;">➕ Create Leader Account</button>
          <button class="text-btn hidden" id="showLoginBtn" type="button">Back to login</button>
        </div>
      </div>
    </div>

    <div class="modal" id="leaderLoginModal">
      <form id="leaderLoginForm">
        <button type="button" id="closeLeaderModal" class="modal-close">&times;</button>
        <span class="eyebrow">RESTRICTED SIGN IN</span>
        <h2>Team Leader Sign In</h2>
        <p class="panel-subtitle" style="margin-bottom:14px;">Enter your credentials to unlock the Team Leader Portal.</p>

        <label>
          Username
          <input name="username" required value="leader" placeholder="Enter leader username" />
        </label>

        <label>
          Password
          <input name="password" type="password" required value="leader123" placeholder="Enter leader password" />
        </label>

        <button class="check" type="submit" style="margin-top:16px;">Sign In as Team Leader <span>→</span></button>
      </form>
    </div>

    <div class="modal" id="createLeaderModal">
      <form id="createLeaderForm">
        <button type="button" id="closeCreateLeaderModal" class="modal-close">&times;</button>
        <span class="eyebrow">CREATE LEADER ACCOUNT</span>
        <h2>Create Team Leader Account</h2>
        <p class="panel-subtitle" style="margin-bottom:14px;">Set up a secure leadership account for the Northstar dashboard.</p>

        <div class="field-row">
          <label>
            First name
            <input name="first_name" type="text" required placeholder="e.g. Priya" />
          </label>
          <label>
            Last name
            <input name="last_name" type="text" required placeholder="e.g. Shah" />
          </label>
        </div>

        <div class="field-row">
          <label>
            Email
            <input name="email" type="email" required placeholder="leader@northstar.com" />
          </label>
          <label>
            Department
            <input name="department" type="text" required placeholder="Executive Management" />
          </label>
        </div>

        <div class="field-row">
          <label>
            Username
            <input name="username" type="text" required placeholder="leader" />
          </label>
          <label>
            Password
            <input name="password" type="password" required placeholder="Create password" />
          </label>
        </div>

        <label>
          Organization security key
          <input name="sec_key" type="text" placeholder="NORTHSTAR-LEADER-2026" />
        </label>

        <button class="check" type="submit" style="margin-top:16px;">Create Leader Account <span>→</span></button>
      </form>
    </div>

    <div id="toast" class="toast"></div>
    <script src="app.js"></script>
  </body>
</html>
