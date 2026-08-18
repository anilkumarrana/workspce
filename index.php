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

        <p>DISCOVER</p>

        <button class="nav" data-view="people" type="button">? <span>Employee accounts</span></button>
        <button class="nav" data-view="insights" type="button">? <span>Insights</span></button>
      </nav>

      <div class="rail-bottom">
        <button class="nav" type="button">? <span>Need help?</span></button>

        <div class="profile">
          <div class="avatar">AM</div>
          <span>
            <b>Arun Mehta</b>
            <small>Product Design</small>
          </span>
          <em>?</em>
        </div>
      </div>
    </aside>

    <main>
      <header>
        <button id="menu" type="button">?</button>
        <span class="system"><i></i> ALL SYSTEMS NORMAL</span>

        <div>
          <button class="icon" type="button">?</button>
          <button class="icon" type="button">?</button>
          <button class="new" data-open type="button">+ New test note</button>
        </div>
      </header>

      <section class="view active" id="today">
        <div class="hero">
          <div>
            <span class="eyebrow">TUESDAY � 18 AUG 2026</span>
            <h1>Make today <em>count.</em></h1>
            <p>Small, visible steps make great work easier to build together.</p>
          </div>

          <div class="meter-wrap">
            <div>
              <span>Your day</span>
              <b id="time">00:00</b>
            </div>
            <aside>
              <i id="fill"></i>
            </aside>
            <small id="hint">Not checked in yet</small>
          </div>
        </div>

        <div class="today-grid">
          <article class="check-card">
            <div class="card-top">
              <div>
                <span class="eyebrow">ATTENDANCE</span>
                <h2 id="check-title">Ready to begin?</h2>
                <p id="check-copy">Check in when you�re ready to focus.</p>
              </div>
              <div class="stamp">
                <b>18</b>
                <span>AUG<br />2026</span>
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
          <section class="account-form">
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
                <strong id="idPreview">NST-2026-1048</strong>
                <small>Generated automatically when the account is created.</small>
              </div>

              <button class="check" type="submit">Create account &amp; issue ID <span>?</span></button>
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

    <div class="toast" id="toast">? Your test note is now visible to the team.</div>

    <script src="app.js"></script>
  </body>
</html>
