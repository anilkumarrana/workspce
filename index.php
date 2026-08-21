<?php
session_start();
if (empty($_SESSION['employee_id']) && empty($_SESSION['is_team_leader'])) {
    header('Location: login.php');
    exit;
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Northstar Pulse � Team work, visible</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="auth-shell hidden" id="authShell">
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

    <div class="app-shell" id="appShell">
      <aside class="rail" id="rail">
        <a class="logo" href="#"><span class="logo-glyph">N</span>Northstar</a>

        <div class="workspace">
          <b>N</b>
          Northstar, Inc.
          <button type="button">?</button>
        </div>

        <nav>
          <button class="nav current" data-view="today" type="button">� <span>Today</span></button>
          <button class="nav" data-view="attendance" type="button">? <span>Attendance</span></button>
          <button class="nav" data-view="notes" type="button">? <span>Test notes</span><i>8</i></button>
          <button class="nav" data-view="growth" type="button">? <span>Growth</span></button>
          <button class="nav" data-view="performance" type="button">? <span>Performance</span></button>
          <button class="nav" data-view="task-reports" type="button">📋 <span>Tasks &amp; Reports</span></button>

          <p>DISCOVER</p>

          <button class="nav" data-view="people" type="button">? <span>Employee accounts</span></button>
          <button class="nav" data-view="insights" type="button">? <span>Insights</span></button>
          <button class="nav" data-view="leader-portal" type="button">👑 <span>Leader Portal</span></button>
        </nav>

        <div class="rail-bottom">
          <button class="nav" type="button">? <span>Need help?</span></button>

          <div class="profile hidden" id="userProfileCard">
            <div class="avatar" id="userAvatar">--</div>
            <span>
              <b id="userName">—</b>
              <small id="userDepartment">Not signed in</small>
            </span>
            <em id="userStatusIndicator" style="color:#4caf50;">•</em>
          </div>
        </div>
      </aside>

      <main>
        <header>
          <button id="menu" type="button">?</button>
          <span class="system"><i></i> ALL SYSTEMS NORMAL</span>

          <div class="header-auth-controls" style="position:relative;">
            <!-- Single Unified Header Auth Button -->
            <button class="secondary-btn auth-trigger-btn" id="mainAuthBtn" type="button" style="display:flex;align-items:center;gap:6px;padding:9px 16px;font-weight:700;">
              🔑 Sign In / Sign Up
            </button>

            <!-- Unified Dropdown Interface -->
            <div class="auth-dropdown-menu hidden" id="mainAuthDropdown" style="position:absolute;right:0;top:calc(100% + 10px);width:350px;background:#fff;border:1px solid #dce8e2;border-radius:18px;padding:20px;box-shadow:0 16px 40px rgba(0,0,0,0.2);z-index:99999;">
              <!-- Active Logged-In User Banner -->
              <div id="mainLoggedInBanner" class="hidden">
                <div style="padding:10px 14px;background:#eef6ec;border:1px solid #cce4ca;border-radius:12px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;">
                  <div>
                    <span id="mainSessionBadge" style="font-size:10px;font-weight:800;color:#2f5d34;letter-spacing:0.5px;">👤 SIGNED IN</span>
                    <h4 id="mainSessionName" style="margin:2px 0 0;font-size:15px;color:#172a37;">Maya Chen</h4>
                    <small id="mainSessionRole" style="color:#556;font-size:11px;display:block;">Product Design</small>
                  </div>
                  <button type="button" id="mainSignOutBtn" style="padding:8px 14px;background:#e74c3c;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Sign Out</button>
                </div>
              </div>

              <!-- Logged-Out Main Auth Interface -->
              <div id="mainLoggedOutInterface">
                <!-- Mode Selector Tabs -->
                <div class="auth-tab-row" style="display:flex;gap:6px;background:#f4f8f6;padding:4px;border-radius:10px;margin-bottom:16px;">
                  <button type="button" id="tabEmployeeMode" class="auth-tab-btn active" style="flex:1;padding:8px;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;background:#172a37;color:#c9fa6a;">👤 Employee</button>
                  <button type="button" id="tabLeaderMode" class="auth-tab-btn" style="flex:1;padding:8px;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;background:transparent;color:#556;">👑 Team Leader Access</button>
                </div>

                <!-- Section A: Employee Options -->
                <div id="sectionEmployeeAuth">
                  <div style="display:flex;gap:12px;margin-bottom:12px;border-bottom:1px solid #edf4f0;padding-bottom:10px;">
                    <button type="button" id="subTabEmpLogin" style="font-size:12px;font-weight:700;border:none;background:none;color:#172a37;cursor:pointer;text-decoration:underline;">Sign In</button>
                    <button type="button" id="subTabEmpRegister" style="font-size:12px;font-weight:600;border:none;background:none;color:#778;cursor:pointer;">Create Account</button>
                  </div>

                  <!-- Employee Sign In Form -->
                  <form id="formEmpSignIn">
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#3b4d53;margin-bottom:10px;">
                      Username, Email, or ID
                      <input name="username" required value="employee123" placeholder="e.g. employee123 or NST-2024-0001" style="padding:9px 12px;border:1px solid #cce0d8;border-radius:8px;font-size:13px;" />
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#3b4d53;margin-bottom:12px;">
                      Password
                      <input name="password" type="password" required value="employee123" placeholder="Enter password" style="padding:9px 12px;border:1px solid #cce0d8;border-radius:8px;font-size:13px;" />
                    </label>
                    <div style="background:#f4f9f2;border:1px solid #d4ebcc;border-radius:8px;padding:8px 10px;margin-bottom:12px;font-size:11px;color:#2f5d34;">
                      🔑 <b>Demo Employee Login:</b><br/>Username: <code>employee123</code> &nbsp;|&nbsp; Password: <code>employee123</code>
                    </div>
                    <button type="submit" class="check" style="width:100%;padding:11px;background:#315134;color:#c9fa6a;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;">Employee Sign In <span>→</span></button>
                  </form>

                  <!-- Employee Register Form -->
                  <form id="formEmpRegister" class="hidden">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                      <input name="firstName" required placeholder="First Name" style="padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                      <input name="lastName" required placeholder="Last Name" style="padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                    </div>
                    <input name="email" type="email" required placeholder="Work Email (e.g. name@northstar.com)" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                    <select name="department" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;">
                      <option>Product Design</option>
                      <option>Engineering</option>
                      <option>Quality Assurance</option>
                      <option>Operations</option>
                      <option>People Operations</option>
                    </select>
                    <input name="username" required placeholder="Choose Username (min 3 chars)" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                    <input name="password" type="password" required placeholder="Set Password (min 4 chars)" style="width:100%;margin-bottom:12px;padding:8px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                    <input name="startDate" type="hidden" value="<?php echo date('Y-m-d'); ?>" />
                    <button type="submit" class="check" style="width:100%;padding:10px;background:#315134;color:#c9fa6a;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Create Account &amp; Sign In <span>→</span></button>
                  </form>
                </div>

                <!-- Section B: Team Leader Options -->
                <div id="sectionLeaderAuth" class="hidden">
                  <div style="display:flex;gap:12px;margin-bottom:12px;border-bottom:1px solid #edf4f0;padding-bottom:10px;">
                    <button type="button" id="subTabLdrLogin" style="font-size:12px;font-weight:700;border:none;background:none;color:#172a37;cursor:pointer;text-decoration:underline;">Leader Sign In</button>
                    <button type="button" id="subTabLdrRegister" style="font-size:12px;font-weight:600;border:none;background:none;color:#778;cursor:pointer;">🔒 Secure Leader Registration</button>
                  </div>

                  <!-- Leader Sign In Form -->
                  <form id="formLeaderSignIn">
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#3b4d53;margin-bottom:10px;">
                      Leader Username or ID
                      <input name="username" required value="leader" placeholder="Leader username or ID" style="padding:9px 12px;border:1px solid #cce0d8;border-radius:8px;font-size:13px;" />
                    </label>
                    <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#3b4d53;margin-bottom:12px;">
                      Password
                      <input name="password" type="password" required value="leader123" placeholder="Leader password" style="padding:9px 12px;border:1px solid #cce0d8;border-radius:8px;font-size:13px;" />
                    </label>
                    <div style="background:#f0f5fa;border:1px solid #c8dced;border-radius:8px;padding:8px 10px;margin-bottom:12px;font-size:11px;color:#18303e;">
                      👑 <b>Default Team Leader:</b><br/>Username: <code>leader</code> &nbsp;|&nbsp; Password: <code>leader123</code>
                    </div>
                    <button type="submit" class="check" style="width:100%;padding:11px;background:#172a37;color:#c9fa6a;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;">Team Leader Sign In <span>→</span></button>
                  </form>

                  <!-- High-Security Team Leader Registration Form -->
                  <form id="formSecureLeaderRegister" class="hidden">
                    <div style="background:#fff8eb;border:1px solid #ffe0b2;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
                      <span style="font-size:10px;font-weight:800;color:#d97706;letter-spacing:0.5px;">🛡️ TEAM LEADER REGISTRATION</span>
                      <p style="margin:2px 0 0;font-size:11px;color:#78350f;line-height:1.3;">Create an executive Team Leader account to review reports &amp; tasks.</p>
                    </div>

                    <label style="display:block;font-size:11px;font-weight:700;color:#334;margin-bottom:3px;">Org Security Key</label>
                    <input name="secKey" value="NORTHSTAR-LEADER-2026" placeholder="NORTHSTAR-LEADER-2026" style="width:100%;margin-bottom:8px;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;background:#fbfdfc;" />

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
                      <div>
                        <label style="font-size:11px;font-weight:700;color:#334;">First Name</label>
                        <input name="firstName" required placeholder="Sarah" style="width:100%;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                      </div>
                      <div>
                        <label style="font-size:11px;font-weight:700;color:#334;">Last Name</label>
                        <input name="lastName" required placeholder="Connor" style="width:100%;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />
                      </div>
                    </div>

                    <label style="display:block;font-size:11px;font-weight:700;color:#334;margin-bottom:3px;">Official Work Email *</label>
                    <input name="email" type="email" required placeholder="sarah@northstar.com" style="width:100%;margin-bottom:8px;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
                      <div>
                        <label style="font-size:11px;font-weight:700;color:#334;">Department</label>
                        <select name="department" style="width:100%;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;">
                          <option>Executive Management</option>
                          <option>Engineering Leadership</option>
                          <option>Product Design</option>
                          <option>Operations</option>
                        </select>
                      </div>
                      <div>
                        <label style="font-size:11px;font-weight:700;color:#334;">Team Size</label>
                        <select name="teamSize" style="width:100%;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;">
                          <option>1-5 Members</option>
                          <option>6-15 Members</option>
                          <option>16+ Members</option>
                        </select>
                      </div>
                    </div>

                    <label style="display:block;font-size:11px;font-weight:700;color:#334;margin-bottom:3px;">Leader Username *</label>
                    <input name="username" required placeholder="leader_sarah" style="width:100%;margin-bottom:8px;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />

                    <label style="display:block;font-size:11px;font-weight:700;color:#334;margin-bottom:3px;">Password *</label>
                    <input id="leaderSecPass" name="password" type="password" required placeholder="Minimum 4 characters" style="width:100%;margin-bottom:12px;padding:7px;border:1px solid #cce0d8;border-radius:6px;font-size:12px;" />

                    <button type="submit" class="check" style="width:100%;padding:10px;background:#172a37;color:#c9fa6a;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Generate Leader ID &amp; Create Account <span>→</span></button>
                  </form>
                </div>
              </div>
            </div>

            <button class="new" data-open type="button">+ New test note</button>
          </div>
        </header>

        <section class="view active" id="today">
        <div class="motivational-welcome-card hidden" id="welcomeMotivationalCard">
          <div class="welcome-badge" id="welcomeBadge">● WORKSPACE ACTIVE</div>
          <h2 id="motivationalWelcomeTitle">Welcome back! 👋</h2>
          <p id="motivationalWelcomeQuote">"The secret of getting ahead is getting started." — Let's conquer today's goals together!</p>
        </div>

        <div class="hero">
          <div>
            <span class="eyebrow" id="todayDateLabel">Today</span>
            <h1>Make today <em>count.</em></h1>
            <p>Small, visible steps make great work easier to build together.</p>
          </div>

          <div class="meter-wrap">
            <div>
              <span>Your day</span>
              <b id="time">00:00:00</b>
            </div>
            <aside>
              <i id="fill"></i>
            </aside>
            <small id="hint">Not checked in yet</small>
            <div class="break-reminder" id="breakReminder" aria-live="polite">
              Break reminder will appear here when it's time to pause.
            </div>
          </div>
        </div>

        <div class="today-grid">
          <article class="check-card">
            <div class="card-top">
              <div>
                <span class="eyebrow">ATTENDANCE</span>
                <h2 id="check-title">Ready to begin?</h2>
                <p id="check-copy">Check in when you’re ready to focus.</p>
                <p id="attendanceStatus" class="attendance-status">Status: Not marked yet</p>
              </div>
              <div class="stamp">
                <b id="todayDayNumber">19</b>
                <span id="todayMonthYear">AUG<br />2026</span>
              </div>
            </div>

            <div class="actions">
              <button class="check" id="check" type="button">Check in <span>?</span></button>
              <button class="break" id="break" type="button" disabled>Take a break</button>
            </div>

            <div class="week" id="week"></div>
          </article>

          <article class="focus">
            <div class="card-label">
              THIS WEEK
              <button data-view="attendance" type="button">View attendance ?</button>
            </div>

            <div class="focus-score">
              <b>4<small>/5</small></b>
              <span>
                <strong>Great consistency</strong>
                <small>You�ve checked in 4 days in a row.</small>
              </span>
            </div>

            <div class="dots">
              <i class="done"></i>
              <i class="done"></i>
              <i class="done"></i>
              <i class="done"></i>
              <i class="today-dot"></i>
              <i></i>
              <i></i>
            </div>

            <div class="days">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </article>
        </div>

        <div class="section-head">
          <div>
            <span class="eyebrow">TEAM KNOWLEDGE</span>
            <h2>What people are learning</h2>
          </div>
          <button data-view="notes" type="button">Explore all notes ?</button>
        </div>

        <div class="feed" id="feed"></div>

        <section class="meeting-panel">
          <div class="section-head">
            <div>
              <span class="eyebrow">UPCOMING MEETINGS</span>
              <h2>Team meeting updates</h2>
            </div>
          </div>

          <div class="meeting-content">
            <form id="meetingForm" class="meeting-form">
              <label>
                Meeting title
                <input name="meetingTitle" type="text" placeholder="e.g. Product leadership sync" required />
              </label>
              <label>
                Time
                <input name="meetingTime" type="text" placeholder="Tomorrow • 10:30 AM" required />
              </label>
              <label>
                Meeting link (optional)
                <input name="meetingLink" type="url" placeholder="https://meet.google.com/... or https://zoom.us/j/..." />
              </label>
              <label>
                Message for the team
                <textarea name="meetingMessage" rows="3" placeholder="Share the agenda, reminder, or key update for the team leader." required></textarea>
              </label>
              <button class="check" type="submit">Share meeting update <span>→</span></button>
            </form>

            <div id="meetingList" class="meeting-list"></div>
          </div>
        </section>
      </section>

      <section class="view" id="attendance">
        <div class="page-title">
          <span class="eyebrow">TIME &amp; ATTENDANCE</span>
          <h1>Your rhythm</h1>
          <p>See your work pattern at a glance.</p>
        </div>

        <div class="attendance-grid">
          <article class="calendar-card">
            <div class="cal-head">
              <h2>August 2026</h2>
              <span>� �</span>
            </div>

            <div class="weekdays">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div class="calendar" id="calendar"></div>
          </article>

          <article class="summary">
            <span class="eyebrow">MONTHLY SUMMARY</span>
            <strong>86<small>%</small></strong>
            <p>Attendance rate</p>
            <div><b>19</b> days present</div>
            <div><b>2</b> days remaining</div>
            <button id="downloadReportBtn" type="button">Download report ?</button>
          </article>
        </div>
      </section>

      <section class="view" id="notes">
        <div class="page-title split">
          <div>
            <span class="eyebrow">TEAM KNOWLEDGE</span>
            <h1>Test notes</h1>
            <p>Useful evidence, shared with the whole company.</p>
          </div>
          <button class="new" data-open type="button">+ New test note</button>
        </div>

        <div class="filters">
          <button class="selected" type="button">All notes</button>
          <button type="button">Research</button>
          <button type="button">QA</button>
          <button type="button">Engineering</button>
        </div>

        <div class="library" id="library"></div>
      </section>

      <section class="view" id="growth">
        <div class="page-title">
          <span class="eyebrow">YOUR DEVELOPMENT</span>
          <h1>Growth, made clear.</h1>
          <p>Ratings are useful when they turn into a practical next step.</p>
        </div>

        <div class="growth-grid">
          <article class="growth-card">
            <span class="eyebrow">CURRENT RATING</span>
            <strong class="rating">4.6<small>/5</small></strong>

            <div class="bar">
              <span>Craft</span>
              <i><b style="width:94%"></b></i>
              <em>4.7</em>
            </div>

            <div class="bar">
              <span>Collaboration</span>
              <i><b style="width:90%"></b></i>
              <em>4.5</em>
            </div>

            <div class="bar">
              <span>Ownership</span>
              <i><b style="width:92%"></b></i>
              <em>4.6</em>
            </div>
          </article>

          <article class="next">
            <span class="eyebrow">NEXT BEST STEP</span>
            <h2>Make research findings easier to act on.</h2>
            <p>In your next test note, include a proposed owner and impact for each finding.</p>
            <button class="check" data-view="notes" type="button">Write a note <span>?</span></button>
          </article>
        </div>
      </section>

      <section class="view" id="performance">
        <div class="page-title">
          <span class="eyebrow">EMPLOYEE PERFORMANCE</span>
          <h1>Scoreboard &amp; performance</h1>
          <p>Each detailed report generates a personal score and performance summary for the team leader.</p>
        </div>

        <div class="performance-shell">
          <section class="performance-form-card">
            <span class="eyebrow">EMPLOYEE SCORECARD</span>
            <h2>Report and score</h2>

            <form id="performanceForm">
              <label>
                Employee
                <select id="performanceEmployee" name="performanceEmployee"></select>
              </label>

              <label>
                Detailed work summary
                <textarea name="workSummary" rows="4" placeholder="Describe the work completed, progress made, and overall contribution." required></textarea>
              </label>

              <label>
                Completed deliverables
                <textarea name="deliverables" rows="4" placeholder="List the projects, tasks, or outcomes completed this period." required></textarea>
              </label>

              <label>
                Impact and outcomes
                <textarea name="impact" rows="3" placeholder="Share the impact of the work on the team or project." required></textarea>
              </label>

              <div class="score-grid">
                <label>
                  Quality score
                  <input name="qualityScore" type="number" min="1" max="10" value="8" required />
                </label>
                <label>
                  Delivery score
                  <input name="deliveryScore" type="number" min="1" max="10" value="8" required />
                </label>
                <label>
                  Collaboration score
                  <input name="collaborationScore" type="number" min="1" max="10" value="8" required />
                </label>
                <label>
                  Reliability score
                  <input name="reliabilityScore" type="number" min="1" max="10" value="8" required />
                </label>
              </div>

              <button class="check" type="submit">Generate scorecard <span>→</span></button>
            </form>
          </section>

          <section class="performance-report-card">
            <span class="eyebrow">CURRENT SCORE</span>
            <div class="score-ring">
              <strong id="overallScore">0</strong>
              <small>/100</small>
            </div>
            <div id="performanceMetrics" class="metric-list"></div>
            <div class="performance-history-box">
              <span class="eyebrow">RECENT REPORTS</span>
              <div id="performanceHistory" class="performance-history"></div>
            </div>
          </section>
        </div>
      </section>

      <section class="view" id="task-reports">
        <div class="page-title split">
          <div>
            <span class="eyebrow">EMPLOYEE TASK &amp; REPORT HUB</span>
            <h1>Tasks &amp; Work Reports</h1>
            <p>Post detailed tasks (visible only to Team Leader), submit work reports, and track overall progress.</p>
          </div>
          <div class="leader-toggle-box">
            <button class="secondary-btn" id="leaderModeToggleBtn" type="button">🔒 Switch to Team Leader View</button>
          </div>
        </div>

        <div class="tracker-metrics-grid" id="trackerMetricsGrid">
          <article class="metric-card">
            <span class="eyebrow">TASK PROGRESS</span>
            <strong id="kpiAvgTaskProgress">0%</strong>
            <p>Average task completion</p>
            <small id="kpiCompletedTasksLabel">0 completed tasks</small>
          </article>
          <article class="metric-card">
            <span class="eyebrow">WORK REPORTS</span>
            <strong id="kpiTotalReports">0</strong>
            <p>Reports submitted</p>
            <small id="kpiAvgReportCompletionLabel">0% avg completion rate</small>
          </article>
          <article class="metric-card">
            <span class="eyebrow">LOGGED TIME</span>
            <strong id="kpiTotalHours">0.0h</strong>
            <p>Total hours logged</p>
            <small id="kpiHealthLabel">Active tracking health</small>
          </article>
        </div>

        <div class="task-reports-grid">
          <div class="forms-column">
            <section class="card-panel">
              <div class="panel-head">
                <span class="eyebrow">EMPLOYEE POST TASK</span>
                <h2>Post Detailed Task</h2>
                <p class="panel-subtitle">Tasks posted here are detailed work items marked visible only to the Team Leader.</p>
              </div>
              <form id="detailedTaskForm" class="styled-form">
                <label>
                  Task title
                  <input name="title" type="text" placeholder="e.g. Implement OAuth authentication flow" required />
                </label>
                <div class="field-row">
                  <label>
                    Category
                    <select name="category">
                      <option>Engineering</option>
                      <option>Product Design</option>
                      <option>Quality Assurance</option>
                      <option>Research &amp; Data</option>
                      <option>Operations</option>
                    </select>
                  </label>
                  <label>
                    Priority
                    <select name="priority">
                      <option>High</option>
                      <option selected>Medium</option>
                      <option>Low</option>
                    </select>
                  </label>
                </div>
                <div class="field-row">
                  <label>
                    Estimated hours
                    <input name="estimated_hours" type="number" step="0.5" min="0" value="4" required />
                  </label>
                  <label>
                    Initial progress (%)
                    <input name="progress_percent" type="number" min="0" max="100" value="0" required />
                  </label>
                </div>
                <label>
                  Detailed task breakdown / instructions
                  <textarea name="description" rows="4" placeholder="Detail the specific scope, technical approach, and deliverables. This detailed info will be visible only to the Team Leader." required></textarea>
                </label>
                <div class="visibility-notice">
                  <span>🔒 VISIBILITY</span>
                  <p>This detailed task will be securely tagged and accessible in the Team Leader Vault.</p>
                </div>
                <button class="check" type="submit">Post detailed task <span>→</span></button>
              </form>
            </section>

            <section class="card-panel margin-top">
              <div class="panel-head">
                <span class="eyebrow">SUBMIT WORK REPORT</span>
                <h2>Submit Work Report</h2>
                <p class="panel-subtitle">Log your completed work, accomplishments, blockers, and logged hours.</p>
              </div>
              <form id="workReportForm" class="styled-form">
                <label>
                  Report title
                  <input name="report_title" type="text" placeholder="e.g. Daily progress report - Sprint 14" required />
                </label>
                <label>
                  Work summary / Accomplishments
                  <textarea name="work_summary" rows="3" placeholder="Summarize what was accomplished today or this period." required></textarea>
                </label>
                <label>
                  Deliverables completed
                  <textarea name="deliverables" rows="2" placeholder="List pull requests, docs, test results, or design assets finished."></textarea>
                </label>
                <label>
                  Blockers / Issues encountered
                  <textarea name="blockers" rows="2" placeholder="Flag any dependency delays, technical blockers, or help needed."></textarea>
                </label>
                <div class="field-row">
                  <label>
                    Hours spent
                    <input name="hours_spent" type="number" step="0.5" min="0" value="7.5" required />
                  </label>
                  <label>
                    Overall completion rate (%)
                    <input name="completion_rate" type="number" min="0" max="100" value="85" required />
                  </label>
                </div>
                <button class="check" type="submit">Submit work report <span>→</span></button>
              </form>
            </section>
          </div>

          <div class="feed-column">
            <section class="card-panel">
              <div class="panel-head split-head">
                <div>
                  <span class="eyebrow" id="feedEyebrow">TEAM LEADER VAULT</span>
                  <h2 id="feedTitle">Detailed Tasks &amp; Reports</h2>
                </div>
                <div class="filter-controls">
                  <select id="taskReportFilterEmployee" class="small-select">
                    <option value="">All Employees</option>
                  </select>
                </div>
              </div>

              <div class="tab-buttons">
                <button class="tab-btn active" id="tabTasksBtn" type="button">🔒 Detailed Tasks (<span id="taskCountBadge">0</span>)</button>
                <button class="tab-btn" id="tabReportsBtn" type="button">📊 Work Reports (<span id="reportCountBadge">0</span>)</button>
              </div>

              <div class="tab-content active" id="tasksTabContent">
                <div id="detailedTaskList" class="feed-list"></div>
              </div>

              <div class="tab-content" id="reportsTabContent">
                <div id="workReportList" class="feed-list"></div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section class="view" id="people">
        <div class="page-title split">
          <div>
            <span class="eyebrow">COMPANY DIRECTORY</span>
            <h1>Employee accounts</h1>
            <p>Create secure accounts and issue employee IDs for your team.</p>
          </div>
          <button class="new" id="focusCreate" type="button">+ Create employee</button>
        </div>

        <div class="account-grid">
          <div class="tab-buttons margin-bottom" style="grid-column: 1 / -1;">
            <button class="tab-btn active" id="tabCreateEmployeeBtn" type="button">👤 New Employee Account</button>
            <button class="tab-btn" id="tabCreateLeaderBtn" type="button">👑 New Team Leader Account</button>
          </div>

          <section class="account-form tab-content active" id="createEmployeeSection">
            <span class="eyebrow">NEW EMPLOYEE</span>
            <h2>Create an account</h2>

            <form id="employeeForm" enctype="multipart/form-data">
              <div class="field-row">
                <label>
                  First name
                  <input name="firstName" required placeholder="e.g. Priya" />
                </label>
                <label>
                  Last name
                  <input name="lastName" required placeholder="e.g. Shah" />
                </label>
              </div>

              <label>
                Work email
                <input name="email" type="email" required placeholder="priya@northstar.com" />
              </label>

              <div class="field-row">
                <label>
                  Username
                  <input name="username" required placeholder="employee123" />
                </label>
                <label>
                  Set password
                  <input name="password" type="password" required placeholder="Minimum 6 characters" />
                </label>
              </div>

              <label>
                Confirm password
                <input name="confirmPassword" type="password" required placeholder="Re-enter your password" />
              </label>

              <label>
                Employee image
                <input name="photo" type="file" accept="image/*" />
              </label>

              <div class="field-row">
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
              </div>

              <div class="id-preview">
                <span>EMPLOYEE ID</span>
                <strong id="idPreview">ID will be issued after account creation</strong>
                <small>Credentials and employee ID appear only after the new account is saved.</small>
              </div>

              <div class="id-preview" id="issuedCredentials" hidden>
                <span>ACCOUNT DETAILS</span>
                <strong id="issuedAccountInfo">Waiting for account creation</strong>
                <small id="issuedAccountNote">Employee ID, username, and password will be shown here after creation.</small>
              </div>

              <button class="check" type="submit">Create account &amp; issue ID <span>?</span></button>
            </form>
          </section>

          <section class="account-form tab-content" id="createLeaderSection" style="display:none;">
            <span class="eyebrow">NEW TEAM LEADER</span>
            <h2>Create Team Leader Account</h2>
            <p class="panel-subtitle" style="margin-bottom:14px;">Generate Team Leader ID and credentials for team supervision.</p>

            <form id="teamLeaderForm">
              <div class="field-row">
                <label>
                  First name
                  <input name="first_name" required placeholder="e.g. Sarah" />
                </label>
                <label>
                  Last name
                  <input name="last_name" required placeholder="e.g. Connor" />
                </label>
              </div>

              <label>
                Work email
                <input name="email" type="email" required placeholder="sarah.leader@northstar.com" />
              </label>

              <label>
                Department / Role
                <input name="department" required placeholder="e.g. Engineering Lead" value="Executive Management" />
              </label>

              <div class="field-row">
                <label>
                  Leader Username
                  <input name="username" required placeholder="e.g. sarah_leader" />
                </label>
                <label>
                  Set password
                  <input name="password" type="password" required placeholder="Minimum 6 characters" />
                </label>
              </div>

              <label>
                Confirm password
                <input name="confirmPassword" type="password" required placeholder="Re-enter password" />
              </label>

              <div class="id-preview" id="issuedLeaderCredentials" hidden>
                <span>TEAM LEADER ID ISSUED</span>
                <strong id="issuedLeaderInfo">Waiting for creation...</strong>
                <small id="issuedLeaderNote">Leader ID, Username, and Password details appear here after creation.</small>
              </div>

              <button class="check" type="submit" style="margin-top:12px;">Create Leader Account &amp; Issue ID <span>→</span></button>
            </form>
          </section>

          <section class="roster">
            <div class="roster-head">
              <div>
                <span class="eyebrow">ACTIVE ACCOUNTS</span>
                <h2>Company roster</h2>
              </div>
              <button class="icon" id="viewEmployeeDataBtn" type="button">View all employees</button>
              <b id="employeeCount">48</b>
            </div>

            <div id="employeeList">
              <div class="employee">
                <i class="person-avatar purple">MC</i>
                <span>
                  <b>Maya Chen</b>
                  <small>NST-2024-0712 � Research</small>
                </span>
                <em>Active</em>
              </div>
              <div class="employee">
                <i class="person-avatar blue">KP</i>
                <span>
                  <b>Kavya Patel</b>
                  <small>NST-2025-0935 � Quality Assurance</small>
                </span>
                <em>Active</em>
              </div>
              <div class="employee">
                <i class="person-avatar orange">JM</i>
                <span>
                  <b>Jordan Miles</b>
                  <small>NST-2023-0528 � Engineering</small>
                </span>
                <em>Active</em>
              </div>
            </div>
          </section>
        </div>
      </section>

        <section class="view empty" id="insights">
          <div class="page-title">
            <span class="eyebrow">INSIGHTS</span>
            <h1>Team insights</h1>
            <p>Track patterns, trends, and momentum across your organization.</p>
          </div>
        </section>

        <section class="view" id="leader-portal">
          <div id="leaderPortalLockedState" class="card-panel locked-banner">
            <div class="locked-content">
              <span class="eyebrow">RESTRICTED TEAM LEADER PORTAL</span>
              <h1>👑 Team Leader Access Required</h1>
              <p>This page is reserved strictly for Team Leaders to review confidential employee work reports, detailed breakdown tasks, and communication messages.</p>
              <button class="secondary-btn" id="portalPromptLoginBtn" type="button">👑 Sign In as Team Leader</button>
            </div>
          </div>

          <div id="leaderPortalUnlockedState" style="display:none;">
            <div class="page-title split">
              <div>
                <span class="eyebrow">RESTRICTED DASHBOARD</span>
                <h1>👑 Team Leader Portal</h1>
                <p>Welcome, <b id="portalLeaderName">Chief Team Leader</b>. Full executive access to employee work reports, tasks, and messages.</p>
              </div>
              <div>
                <button class="secondary-btn danger-outline" id="portalLeaderSignOutBtn" type="button">🚪 Sign Out Team Leader</button>
              </div>
            </div>

            <div class="tab-buttons margin-bottom">
              <button class="tab-btn active" id="leaderTabReportsBtn" type="button">📊 Employee Work Reports &amp; Detailed Tasks</button>
              <button class="tab-btn" id="leaderTabMessagesBtn" type="button">💬 Employee Messages &amp; Communication Notes</button>
            </div>

            <div class="tab-content active" id="leaderReportsTabContent">
              <section class="card-panel">
                <div class="panel-head split-head">
                  <div>
                    <span class="eyebrow">CONFIDENTIAL VAULT</span>
                    <h2>Employee Work Reports &amp; Detailed Tasks</h2>
                  </div>
                  <select id="leaderPortalFilterEmployee" class="small-select">
                    <option value="">All Employees</option>
                  </select>
                </div>
                <div id="leaderPortalReportsList" class="feed-list"></div>
              </section>
            </div>

            <div class="tab-content" id="leaderMessagesTabContent">
              <section class="card-panel">
                <div class="panel-head">
                  <span class="eyebrow">TEAM COMMUNICATION</span>
                  <h2>Employee Messages &amp; Shared Notes</h2>
                  <p class="panel-subtitle">Review all test notes, takeaways, and updates posted by employees across departments.</p>
                </div>
                <div id="leaderPortalMessagesList" class="feed-list"></div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <div class="modal" id="modal">
      <form id="form">
        <button type="button" id="close">�</button>
        <span class="eyebrow">SHARE WHAT YOU LEARNED</span>
        <h2>New test note</h2>

        <label>
          Title
          <input name="title" required placeholder="e.g. Checkout usability test" />
        </label>

        <label>
          Category
          <select name="category">
            <option>Research</option>
            <option>QA</option>
            <option>Engineering</option>
          </select>
        </label>

        <label>
          Key takeaway
          <textarea name="summary" required placeholder="Describe the evidence and what the team should do next."></textarea>
        </label>

        <button class="check" type="submit">Share with Northstar <span>?</span></button>
      </form>
    </div>

    <div class="modal" id="employeeLoginModal">
      <form id="employeeLoginForm">
        <button type="button" id="closeEmployeeModal" class="modal-close">&times;</button>
        <span class="eyebrow">EMPLOYEE SIGN IN</span>
        <h2>Employee Sign In</h2>
        <p class="panel-subtitle" style="margin-bottom:14px;">Sign in with your employee account to submit detailed tasks and work reports.</p>

        <label>
          Username
          <input name="username" required placeholder="e.g. employee123" />
        </label>

        <label>
          Password
          <input name="password" type="password" required placeholder="Enter your employee password" />
        </label>

        <button class="check" type="submit" style="margin-top:16px;">Sign In as Employee <span>→</span></button>
      </form>
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

        <div class="visibility-notice" style="margin-top:12px;">
          <span>🔑 DEFAULT LEADER CREDENTIALS</span>
          <p>Username: <b>leader</b> &nbsp;|&nbsp; Password: <b>leader123</b></p>
        </div>

        <button class="check" type="submit" style="margin-top:16px;">Sign In as Team Leader <span>→</span></button>
      </form>
    </div>

    <div class="modal" id="createLeaderModal">
      <form id="createLeaderForm">
        <button type="button" id="closeCreateLeaderModal" class="modal-close">&times;</button>
        <span class="eyebrow">TEAM LEADER REGISTRATION</span>
        <h2>Create Team Leader Account</h2>
        <p class="panel-subtitle" style="margin-bottom:14px;">Generate your Team Leader ID &amp; password to oversee employee work reports.</p>

        <label>
          First Name
          <input name="firstName" required placeholder="e.g. Sarah" />
        </label>

        <label>
          Last Name
          <input name="lastName" required placeholder="e.g. Connor" />
        </label>

        <label>
          Work Email
          <input name="email" type="email" required placeholder="sarah@northstar.com" />
        </label>

        <label>
          Department
          <select name="department">
            <option>Executive Management</option>
            <option>Engineering Leadership</option>
            <option>Product Design</option>
            <option>Operations</option>
          </select>
        </label>

        <label>
          Leader Username
          <input name="username" required placeholder="e.g. leader_sarah" />
        </label>

        <label>
          Set Password
          <input name="password" type="password" required placeholder="Minimum 6 characters" />
        </label>

        <button class="check" type="submit" style="margin-top:16px;">Generate Leader ID &amp; Create Account <span>→</span></button>
      </form>
    </div>

      <div class="toast" id="toast">? Your test note is now visible to the team.</div>
    </div>

    <script src="app.js"></script>
  </body>
</html>
