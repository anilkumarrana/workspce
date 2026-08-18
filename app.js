const addStyle = (css) => { const style = document.createElement('style'); style.textContent = css; document.head.append(style); };
addStyle(`.account-grid,.task-panel{display:grid;grid-template-columns:1.1fr .9fr;gap:18px}.account-form,.roster,.task-panel{background:#fff;border:1px solid #e4e9e7;border-radius:12px;padding:29px}.account-form h2,.roster h2,.task-panel h2{font-size:21px;letter-spacing:-1px;margin:9px 0 20px}.account-form label,.task-form label{display:block;font-size:11px;font-weight:700;margin-top:14px}.account-form input,.account-form select,.task-form input,.task-form select,.task-form textarea{display:block;width:100%;border:1px solid #dce3e1;border-radius:6px;padding:10px;margin-top:6px;font:12px Manrope;outline-color:#84af3e;background:#fff}.field-row,.task-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}.id-preview{margin-top:20px;padding:14px 15px;background:#f1f8e7;border:1px dashed #bddb91;border-radius:8px;display:grid;gap:3px}.id-preview span,.task-summary span{font:9px 'DM Mono';letter-spacing:1px;color:#739051}.id-preview strong{font:700 19px 'DM Mono';letter-spacing:-1px;color:#365b29}.id-preview small{font-size:10px;color:#78906f}.account-form .check,.task-form .check{margin-top:20px;width:100%}.roster-head{display:flex;justify-content:space-between;align-items:start;padding-bottom:18px;border-bottom:1px solid #e4e9e7}.roster-head h2{margin-bottom:0}.roster-head>b{font:11px 'DM Mono';background:#eaf6da;color:#5a8331;padding:5px 7px;border-radius:5px}.employee{display:flex;gap:10px;align-items:center;padding:15px 0;border-bottom:1px solid #e4e9e7}.employee:last-child{border-bottom:0}.person-avatar{height:34px;width:34px;border-radius:50%;display:grid;place-items:center;font:800 10px Manrope;font-style:normal}.purple{background:#eeeaff;color:#7561b4}.blue{background:#e5efff;color:#5579ac}.orange{background:#ffebe1;color:#c26749}.employee b,.employee small{display:block}.employee b{font-size:12px}.employee small{font-size:10px;color:#849296;margin-top:3px}.employee em,.assignment em,.task-row em{font-style:normal;margin-left:auto;border-radius:12px;padding:4px 7px;font:9px 'DM Mono'}.employee em,.done{color:#5b8d38;background:#edf8df}.task-panel{margin-top:18px}.task-panel>div>p{font-size:11px;color:#71808a;margin:-11px 0 18px}.assignment-list,.task-list{display:flex;flex-direction:column;gap:9px}.assignment,.task-row{background:#f7f9f5;border:1px solid #e8ede6;border-radius:8px;padding:11px 12px;display:flex;align-items:center;gap:10px}.assignment b,.assignment small,.task-row b,.task-row small{display:block}.assignment b,.task-row b{font-size:11px}.assignment small,.task-row small{font:9px 'DM Mono';color:#7d8d91;margin-top:3px}.high{background:#fff0e9;color:#c76b4d}.medium{background:#e7f2ff;color:#5476a1}.low{background:#edf8df;color:#5b8d38}.task-summary{padding:14px;background:#f1f8e7;border-radius:8px;margin:10px 0 12px}.task-numbers{display:flex;gap:24px;margin-top:8px}.task-numbers b{display:block;font-size:25px;letter-spacing:-1px}.task-numbers small{font-size:10px;color:#728177}.pending{background:#fff6df;color:#a17520}@media(max-width:900px){.account-grid,.task-panel{grid-template-columns:1fr}}@media(max-width:650px){.field-row,.task-fields{grid-template-columns:1fr}.account-form,.roster,.task-panel{padding:21px}}`);

const notes = [{title:'What five customers taught us about onboarding',category:'Research',summary:'The clearest friction point is still the moment after account creation. A progress cue would reduce uncertainty.',author:'Maya Chen',initials:'MC',age:'Today'},{title:'Checkout regression: release candidate 1',category:'QA',summary:'All core purchase paths pass. We found two address-validation edge cases to resolve before the Thursday cut.',author:'Kavya Patel',initials:'KP',age:'Yesterday'},{title:'Search latency benchmark, August',category:'Engineering',summary:'The new cache layer lowers p95 response time by 38%. The implementation is safe to ship behind a flag.',author:'Jordan Miles',initials:'JM',age:'2 days ago'}];
const noteTemplate = (note) => `<article class="note" data-category="${note.category}"><span class="tag ${note.category}">${note.category}</span><h3>${note.title}</h3><p>${note.summary}</p><div class="meta"><span><i class="avatar">${note.initials}</i>${note.author}</span><span>${note.age} · ♡ ${Math.floor(note.title.length / 2)}</span></div></article>`;
const renderNotes = () => { document.getElementById('feed').innerHTML = notes.map(noteTemplate).join(''); document.getElementById('library').innerHTML = notes.map(noteTemplate).join(''); };
renderNotes();
addStyle(`
  .employee-directory { margin-top: 22px; background: #fff; border: 1px solid #e4e9e7; border-radius: 16px; padding: 24px; }
  .directory-head { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 18px; }
  .directory-head h3 { margin: 0; font-size: 22px; letter-spacing: -1px; }
  .directory-table { width: 100%; border-collapse: collapse; }
  .directory-table th, .directory-table td { text-align: left; padding: 12px 10px; border-bottom: 1px solid #e9efe9; vertical-align: middle; }
  .directory-table th { font: 10px 'DM Mono', monospace; letter-spacing: 1px; color: #5f7079; text-transform: uppercase; }
  .employee-record-row { font-size: 13px; }
  .directory-actions { display: flex; justify-content: flex-end; }
  .secondary-btn { background: #1d3b2f; color: #fff; border: 0; border-radius: 8px; padding: 9px 12px; font-weight: 700; }
  .id-card-modal { position: fixed; inset: 0; background: rgba(15, 21, 22, 0.58); display: none; align-items: center; justify-content: center; z-index: 40; }
  .id-card-modal.show { display: flex; }
  .id-card-dialog { width: min(460px, calc(100vw - 30px)); background: #fff; border-radius: 18px; border: 1px solid #e4e9e7; padding: 18px; position: relative; }
  .id-card-close { position: absolute; right: 14px; top: 8px; font-size: 26px; background: transparent; color: #5a6d76; border: 0; }
  .employee-id-card { display: flex; align-items: center; gap: 18px; border: 1px solid #e5ece7; border-radius: 16px; padding: 18px; background: #f7faf5; }
  .id-card-photo { width: 96px; height: 96px; border-radius: 14px; background: #edf3ea; display: grid; place-items: center; overflow: hidden; border: 1px solid #dfeae4; flex-shrink: 0; }
  .id-card-photo img { width: 100%; height: 100%; object-fit: cover; }
  .id-card-meta { display: grid; gap: 6px; flex: 1; }
  .id-card-meta span { font: 10px 'DM Mono', monospace; color: #5f7079; letter-spacing: 1px; text-transform: uppercase; }
  .id-card-meta h4 { margin: 0; font-size: 24px; letter-spacing: -1px; }
  .id-card-meta p { margin: 0; color: #4e646f; }
  .id-card-data { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
  .id-card-data div { background: #fff; border: 1px solid #e5eae7; border-radius: 10px; padding: 8px 10px; }
  .id-card-data small { display: block; font: 9px 'DM Mono', monospace; color: #627b80; letter-spacing: 1px; text-transform: uppercase; }
  .id-card-data strong { display: block; margin-top: 4px; font-size: 12px; }
  .id-card-qr { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 18px; border-top: 1px solid #e2e8e5; padding-top: 16px; }
  .id-card-qr img { width: 90px; height: 90px; border: 6px solid #fff; border-radius: 12px; background: #fff; box-shadow: 0 4px 12px rgba(23,31,37,0.08); }
  .id-card-qr p { margin: 0; color: #4e646f; font-size: 12px; }
  @media (max-width: 700px) { .directory-table thead { display: none; } .directory-table, .directory-table tbody, .directory-table tr, .directory-table td { display: block; width: 100%; } .directory-table tr { padding: 10px 0; } .directory-table td { border: 0; padding: 6px 0; } .employee-id-card { flex-direction: column; align-items: flex-start; } .id-card-data { grid-template-columns: 1fr; } }
`);

document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => { const target = button.dataset.view; document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === target)); document.querySelectorAll('.nav').forEach((nav) => nav.classList.toggle('current', nav.dataset.view === target)); document.getElementById('rail').classList.remove('open'); window.scrollTo({top:0, behavior:'smooth'}); }));
const weeklyAttendance = [
  { day: 'M', value: 14, status: 'present' },
  { day: 'T', value: 15, status: 'half-day' },
  { day: 'W', value: 16, status: 'absent' },
  { day: 'T', value: 17, status: 'present' },
  { day: 'F', value: 18, status: 'today' },
  { day: 'S', value: 19, status: 'present' },
  { day: 'S', value: 20, status: 'present' }
];
document.getElementById('week').innerHTML = weeklyAttendance.map((entry) => `<span class="${entry.status}">${entry.day}<b>${entry.value}</b></span>`).join('');
const calendar = document.getElementById('calendar'); const calendarStatus = { 3:'present', 4:'present', 5:'half-day', 6:'present', 7:'absent', 10:'present', 11:'present', 12:'half-day', 13:'present', 14:'absent', 17:'present', 18:'today' };
for (let i = 0; i < 35; i++) { const cell = document.createElement('span'); const date = i - 4; if (date < 1 || date > 31) cell.className = 'empty'; else { cell.textContent = date; if (calendarStatus[date]) { cell.classList.add(calendarStatus[date]); } if (date === 18) cell.classList.add('today'); if (i % 7 > 4) cell.classList.add('weekend'); } calendar.append(cell); }

const checkButton = document.getElementById('check'), breakButton = document.getElementById('break'), time = document.getElementById('time'), fill = document.getElementById('fill'), hint = document.getElementById('hint'); let checkedIn = false, startTime;
const tick = () => { if (!startTime) return; const minutes = Math.floor((Date.now() - startTime) / 60000); time.textContent = `${String(Math.floor(minutes / 60)).padStart(2,'0')}:${String(minutes % 60).padStart(2,'0')}`; fill.style.width = `${Math.min(100, minutes / 4.8)}%`; };
checkButton.addEventListener('click', () => { checkedIn = !checkedIn; if (checkedIn) { startTime = Date.now(); checkButton.textContent = 'Checked in ✓'; breakButton.disabled = false; document.getElementById('check-title').textContent = 'You’re on the clock.'; document.getElementById('check-copy').textContent = 'Your focused workday has started.'; hint.textContent = 'Building a strong day, one block at a time.'; tick(); } else { checkButton.innerHTML = 'Check in <span>→</span>'; breakButton.disabled = true; } }); setInterval(tick, 30000);
breakButton.addEventListener('click', () => { const onBreak = breakButton.textContent === 'Take a break'; breakButton.textContent = onBreak ? 'Resume focus' : 'Take a break'; hint.textContent = onBreak ? 'Break started. Take the space you need.' : 'Welcome back — focus resumed.'; });

const modal = document.getElementById('modal'), noteForm = document.getElementById('form'), toast = document.getElementById('toast'); document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => modal.classList.add('show'))); document.getElementById('close').addEventListener('click', () => modal.classList.remove('show')); modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('show'); }); noteForm.addEventListener('submit', (event) => { event.preventDefault(); const values = new FormData(noteForm); notes.unshift({title:values.get('title'),category:values.get('category'),summary:values.get('summary'),author:'Arun Mehta',initials:'AM',age:'Just now'}); renderNotes(); modal.classList.remove('show'); noteForm.reset(); toast.textContent = '✓ Your test note is now visible to the team.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); }); document.querySelectorAll('.filters button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.filters button').forEach((filter) => filter.classList.remove('selected')); button.classList.add('selected'); document.querySelectorAll('#library .note').forEach((note) => note.style.display = button.textContent === 'All notes' || note.dataset.category === button.textContent ? 'flex' : 'none'); })); document.getElementById('menu').addEventListener('click', () => document.getElementById('rail').classList.toggle('open'));

let employees = [];
const tasks = [{employeeId:'NST-2024-0712',title:'Validate onboarding prototype',priority:'Medium',due:'Aug 21',status:'Pending'},{employeeId:'NST-2024-0712',title:'Synthesize session notes',priority:'Low',due:'Aug 16',status:'Completed'},{employeeId:'NST-2025-0935',title:'Confirm checkout edge cases',priority:'High',due:'Aug 19',status:'Pending'},{employeeId:'NST-2023-0528',title:'Review cache benchmark',priority:'Medium',due:'Aug 22',status:'Completed'}];
const taskPanel = document.createElement('section'); taskPanel.className = 'task-panel'; taskPanel.innerHTML = `<div><span class="eyebrow">WORK ASSIGNMENTS</span><h2>Assign a task</h2><p>Give an employee a clear, trackable next step.</p><form class="task-form" id="taskForm"><label>Assign to<select id="assignee"></select></label><label>Task title<input id="taskTitle" required placeholder="e.g. Review onboarding findings"></label><div class="task-fields"><label>Priority<select id="taskPriority"><option>High</option><option selected>Medium</option><option>Low</option></select></label><label>Due date<input id="taskDue" type="date" required></label></div><label>Instructions<textarea id="taskDetails" placeholder="Add context or an expected outcome."></textarea></label><button class="check" type="submit">Assign task <span>→</span></button></form></div><div><span class="eyebrow">TASK OVERVIEW</span><h2>Employee workload</h2><label class="task-form">View tasks for<select id="trackerEmployee"></select></label><div class="task-summary"><span>ASSIGNMENT SUMMARY</span><div class="task-numbers"><div><b id="assignedCount">0</b><small>assigned</small></div><div><b id="completedCount">0</b><small>completed</small></div><div><b id="pendingCount">0</b><small>pending</small></div></div></div><div class="task-list" id="taskList"></div></div>`; document.querySelector('#people .account-grid').after(taskPanel);
const assignee = document.getElementById('assignee'), trackerEmployee = document.getElementById('trackerEmployee');
const normalizeEmployee = (employee) => ({id:employee.employee_id || employee.id, name:employee.name || `${employee.first_name} ${employee.last_name}`.trim(), initials:employee.initials || `${(employee.first_name || '').charAt(0)}${(employee.last_name || '').charAt(0)}`.toUpperCase(), department:employee.department || 'General', email:employee.email || '', startDate:employee.start_date || employee.startDate || '', photo_path: employee.photo_path || employee.photo || ''});
const renderEmployeeList = () => { const list = document.getElementById('employeeList'); if (!list) return; list.innerHTML = employees.map((employee) => `<div class="employee"><i class="person-avatar purple">${employee.initials}</i><span><b>${employee.name}</b><small>${employee.id} · ${employee.department}</small></span><em>Active</em></div>`).join(''); document.getElementById('employeeCount').textContent = String(employees.length); };
const fallbackEmployees = [
  {id:'NST-2024-0712',name:'Maya Chen',initials:'MC',department:'Research',email:'maya.chen@northstar.com',startDate:'2024-01-14'},
  {id:'NST-2025-0935',name:'Kavya Patel',initials:'KP',department:'Quality Assurance',email:'kavya.patel@northstar.com',startDate:'2025-02-05'},
  {id:'NST-2023-0528',name:'Jordan Miles',initials:'JM',department:'Engineering',email:'jordan.miles@northstar.com',startDate:'2023-08-19'}
];
const resolveEmployeeImage = (imagePath) => {
  if (!imagePath) return '';
  if (/^(data:|https?:|blob:)/i.test(imagePath)) return imagePath;
  if (imagePath.startsWith('/')) return new URL(imagePath, window.location.origin).href;
  return new URL(imagePath, window.location.href).href;
};
const buildProfileImage = (employee) => {
  const uploadedPhoto = employee.photo_path || employee.photo || employee.profileImage || '';
  if (uploadedPhoto) return resolveEmployeeImage(uploadedPhoto);

  const initials = employee.initials || 'NA';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" rx="32" fill="#edf5df"/>
      <circle cx="100" cy="74" r="38" fill="#c7d98d"/>
      <path d="M55 160c10-26 35-40 45-40s35 14 45 40" fill="#a8c77c"/>
      <text x="100" y="111" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700" fill="#233b2a">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
const buildEmployeeQrUrl = (employee) => {
  const payload = JSON.stringify({
    employee_id: employee.id,
    name: employee.name,
    email: employee.email,
    department: employee.department,
    start_date: employee.startDate || employee.start_date || '',
    created_at: new Date().toISOString(),
  });
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payload)}`;
};
const createIdCardModal = () => {
  const modal = document.createElement('div');
  modal.className = 'id-card-modal';
  modal.id = 'idCardModal';
  modal.innerHTML = `
    <div class="id-card-dialog">
      <button class="id-card-close" type="button" aria-label="Close ID card">×</button>
      <div id="employeeIdCard"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.id-card-close').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('show'); });
  return modal;
};
const renderEmployeeDirectory = () => {
  const directory = document.getElementById('employeeDirectory');
  if (!directory) return;

  directory.innerHTML = `
    <div class="directory-head">
      <h3>Employee directory</h3>
      <button class="secondary-btn" id="viewDirectoryBtn" type="button">View complete employee data</button>
    </div>
    <table class="directory-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>Department</th>
          <th>Start Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${employees.map((employee) => `
          <tr class="employee-record-row">
            <td><strong>${employee.id}</strong></td>
            <td>${employee.name}</td>
            <td>${employee.email || 'Not provided'}</td>
            <td>${employee.department}</td>
            <td>${employee.startDate || employee.start_date || '—'}</td>
            <td class="directory-actions"><button class="secondary-btn" type="button" data-employee-id="${employee.id}">Generate ID card</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const viewDirectoryBtn = document.getElementById('viewDirectoryBtn');
  if (viewDirectoryBtn) {
    viewDirectoryBtn.addEventListener('click', () => {
      directory.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  directory.querySelectorAll('[data-employee-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const employee = employees.find((person) => person.id === button.dataset.employeeId);
      if (!employee) return;

      const modal = document.getElementById('idCardModal') || createIdCardModal();
      const card = document.getElementById('employeeIdCard');
      card.innerHTML = `
        <div class="employee-id-card">
          <div class="id-card-photo">
            <img src="${buildProfileImage(employee)}" alt="${employee.name} profile image" />
          </div>
          <div class="id-card-meta">
            <span>Employee ID</span>
            <h4>${employee.id}</h4>
            <p>${employee.name}</p>
            <div class="id-card-data">
              <div>
                <small>Email ID</small>
                <strong>${employee.email || 'Not provided'}</strong>
              </div>
              <div>
                <small>Department</small>
                <strong>${employee.department || 'General'}</strong>
              </div>
              <div>
                <small>Start Date</small>
                <strong>${employee.startDate || employee.start_date || 'Not set'}</strong>
              </div>
              <div>
                <small>Role</small>
                <strong>${employee.department || 'Team Member'}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="id-card-qr">
          <div>
            <span class="eyebrow">SCAN FOR DATA</span>
            <p>Employee details encoded in QR code.</p>
          </div>
          <img src="${buildEmployeeQrUrl(employee)}" alt="QR code for ${employee.name}" />
        </div>
      `;
      modal.classList.add('show');
    });
  });
};
const employeeDirectory = document.createElement('section');
employeeDirectory.className = 'employee-directory';
employeeDirectory.id = 'employeeDirectory';
document.querySelector('#people .account-grid').after(employeeDirectory);
const viewEmployeeDataBtn = document.getElementById('viewEmployeeDataBtn');
if (viewEmployeeDataBtn) {
  viewEmployeeDataBtn.addEventListener('click', () => {
    document.getElementById('employeeDirectory').scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('employeeDirectory').scrollTop = 0;
  });
}
const populateEmployeeSelects = () => { if (!assignee || !trackerEmployee) return; assignee.innerHTML = employees.map((employee) => `<option value="${employee.id}">${employee.name} · ${employee.id}</option>`).join(''); trackerEmployee.innerHTML = employees.map((employee) => `<option value="${employee.id}">${employee.name} · ${employee.id}</option>`).join(''); };
const renderAssignments = () => { document.getElementById('assignmentList')?.remove(); };
const renderTracker = () => { const employee = employees.find((person) => person.id === trackerEmployee.value) || employees[0]; if (!employee) { document.getElementById('assignedCount').textContent = '0'; document.getElementById('completedCount').textContent = '0'; document.getElementById('pendingCount').textContent = '0'; document.getElementById('taskList').innerHTML = '<p>No tasks assigned to this employee yet.</p>'; return; } const assigned = tasks.filter((task) => task.employeeId === employee.id); const completed = assigned.filter((task) => task.status === 'Completed').length; document.getElementById('assignedCount').textContent = assigned.length; document.getElementById('completedCount').textContent = completed; document.getElementById('pendingCount').textContent = assigned.length - completed; document.getElementById('taskList').innerHTML = assigned.length ? assigned.map((task) => `<article class="task-row"><i class="person-avatar ${task.status === 'Completed' ? 'purple' : 'blue'}">${employee.initials}</i><span><b>${task.title}</b><small>Due ${task.due} · ${task.priority} priority</small></span><em class="${task.status === 'Completed' ? 'done' : 'pending'}">${task.status.toUpperCase()}</em></article>`).join('') : '<p>No tasks assigned to this employee yet.</p>'; };
const getNextEmployeeNumber = () => { const numbers = employees.map((employee) => { const match = String(employee.id || '').match(/^(?:NST-\d{4}-)?(\d{4})$/); return match ? Number(match[1]) : 0; }); return numbers.length ? Math.max(...numbers) + 1 : 1049; };
const nextId = () => `NST-${new Date().getFullYear()}-${String(getNextEmployeeNumber()).padStart(4,'0')}`; const employeeForm = document.getElementById('employeeForm'), preview = document.getElementById('idPreview');
const syncEmployeePreview = () => { preview.textContent = nextId(); };
const loadEmployees = async () => { try { const response = await fetch('api.php'); const data = await response.json(); employees = (Array.isArray(data.employees) ? data.employees : []).map(normalizeEmployee); if (!employees.length) { employees = fallbackEmployees; } } catch (error) { console.error('Unable to load employees', error); employees = fallbackEmployees; } employees.forEach((employee) => ensureWorkLog(employee.id)); renderEmployeeList(); renderEmployeeDirectory(); populateEmployeeSelects(); populateWorklog(); renderWorklog(); syncEmployeePreview(); renderTracker(); };
loadEmployees(); trackerEmployee.addEventListener('change', renderTracker);
employeeForm.addEventListener('submit', async (event) => { event.preventDefault(); const formData = new FormData(employeeForm); const payload = {firstName:formData.get('firstName').toString().trim(), lastName:formData.get('lastName').toString().trim(), email:formData.get('email').toString().trim(), department:formData.get('department').toString(), startDate:formData.get('startDate').toString()}; if (!payload.firstName || !payload.lastName || !payload.email || !payload.department || !payload.startDate) { toast.textContent = 'Please fill in all employee fields before creating the account.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); return; } try { const response = await fetch('api.php', {method:'POST', body: formData}); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || 'Unable to save employee'); ensureWorkLog(result.employee.employee_id); employeeForm.reset(); await loadEmployees(); if (assignee && trackerEmployee) { assignee.value = result.employee.employee_id; trackerEmployee.value = result.employee.employee_id; } if (worklogEmployee) { worklogEmployee.value = result.employee.employee_id; } populateWorklog(); renderWorklog(); renderEmployeeDirectory(); syncEmployeePreview(); renderTracker(); toast.textContent = `✓ Account created — employee ID ${result.employee.employee_id} issued.`; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); } catch (error) { toast.textContent = error.message || 'There was a problem creating the employee account.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); } });
document.getElementById('taskForm').addEventListener('submit', (event) => { event.preventDefault(); const employee = employees.find((person) => person.id === assignee.value), dueInput = document.getElementById('taskDue').value; tasks.unshift({employeeId:employee.id,title:document.getElementById('taskTitle').value,priority:document.getElementById('taskPriority').value,due:new Date(`${dueInput}T00:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'}),status:'Pending'}); trackerEmployee.value = employee.id; renderTracker(); event.currentTarget.reset(); toast.textContent = `✓ Task assigned to ${employee.name}.`; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); });
document.getElementById('focusCreate').addEventListener('click', () => document.querySelector('.account-form').scrollIntoView({behavior:'smooth',block:'start'}));

const workLogs = { 'NST-2024-0712':{login:'09:12 AM',breakStart:'01:04 PM',breakEnd:'01:37 PM',logout:'06:18 PM',net:'8h 33m'}, 'NST-2025-0935':{login:'09:01 AM',breakStart:'12:46 PM',breakEnd:'01:16 PM',logout:'06:06 PM',net:'8h 35m'}, 'NST-2023-0528':{login:'08:48 AM',breakStart:'01:12 PM',breakEnd:'01:55 PM',logout:'05:42 PM',net:'8h 11m'} };
const buildDefaultWorkLog = (employeeId) => {
  const workHours = ['08:45 AM', '12:15 PM', '12:50 PM', '05:40 PM'];
  const login = workHours[0];
  const breakStart = workHours[1];
  const breakEnd = workHours[2];
  const logout = workHours[3];
  const net = '8h 10m';

  return {
    login,
    breakStart,
    breakEnd,
    logout,
    net,
    employeeId,
  };
};
const ensureWorkLog = (employeeId) => {
  if (!employeeId) return;
  if (!workLogs[employeeId]) {
    workLogs[employeeId] = buildDefaultWorkLog(employeeId);
  }
};
const worklogPanel = document.createElement('section'); worklogPanel.className = 'worklog-panel'; worklogPanel.innerHTML = `<style>.worklog-panel{margin-top:18px;background:#273e4a;border-radius:12px;padding:28px;color:#fff;display:grid;grid-template-columns:.8fr 1.2fr;gap:28px}.worklog-panel .eyebrow{color:#b4c7cb}.worklog-panel h2{font-size:21px;letter-spacing:-1px;margin:9px 0 8px}.worklog-panel p{font-size:11px;color:#bfd0d3;line-height:1.6}.worklog-panel select{display:block;width:100%;background:#36515d;color:#fff;border:1px solid #52707a;border-radius:6px;padding:10px;margin-top:16px;font:12px Manrope}.hour-total{display:flex;align-items:baseline;gap:7px;margin:24px 0 4px}.hour-total b{font-size:38px;letter-spacing:-2px}.hour-total span{font-size:11px;color:#b4c7cb}.work-events{border-left:1px solid #516a73;padding-left:23px;display:flex;flex-direction:column;gap:14px}.work-event{position:relative;display:flex;justify-content:space-between;align-items:center;font-size:12px}.work-event:before{content:'';position:absolute;left:-28px;width:9px;height:9px;border-radius:50%;background:#c9fa6a;box-shadow:0 0 0 4px #273e4a}.work-event.break:before{background:#ffbd76}.work-event:last-child:before{background:#9bb2ff}.work-event small{display:block;color:#b4c7cb;font-size:10px;margin-top:3px}.work-event time{font:10px 'DM Mono';color:#eaf4f4;background:#36515d;padding:5px 7px;border-radius:5px}.no-log{color:#b4c7cb;font-size:12px;padding:14px 0}@media(max-width:700px){.worklog-panel{grid-template-columns:1fr}}</style><div><span class="eyebrow">WORKDAY ACTIVITY</span><h2>Login &amp; break history</h2><p>Review an employee’s logged hours and break times for today.</p><select id="worklogEmployee"></select><div class="hour-total"><b id="netHours">—</b><span>net work time</span></div></div><div class="work-events" id="workEvents"></div>`; taskPanel.after(worklogPanel);
const worklogEmployee = document.getElementById('worklogEmployee'); const populateWorklog = () => { const saved = worklogEmployee.value; worklogEmployee.innerHTML = employees.map((employee) => `<option value="${employee.id}">${employee.name} · ${employee.id}</option>`).join(''); if (employees.some((employee) => employee.id === saved)) worklogEmployee.value = saved; else if (employees[0]) worklogEmployee.value = employees[0].id; }; const renderWorklog = () => { const employeeId = worklogEmployee.value; const log = workLogs[employeeId]; if (!employeeId) { document.getElementById('netHours').textContent = '—'; document.getElementById('workEvents').innerHTML = '<p class="no-log">No login activity has been recorded for this employee today.</p>'; return; } if (!log) { ensureWorkLog(employeeId); } const currentLog = workLogs[employeeId]; document.getElementById('netHours').textContent = currentLog.net; document.getElementById('workEvents').innerHTML = `<div class="work-event"><span><b>Logged in</b><small>Workday started</small></span><time>${currentLog.login}</time></div><div class="work-event break"><span><b>Break started</b><small>Out for a break</small></span><time>${currentLog.breakStart}</time></div><div class="work-event break"><span><b>Break ended</b><small>Returned to work</small></span><time>${currentLog.breakEnd}</time></div><div class="work-event"><span><b>Logged out</b><small>Workday completed</small></span><time>${currentLog.logout}</time></div>`; }; populateWorklog(); renderWorklog(); worklogEmployee.addEventListener('change', renderWorklog); new MutationObserver(() => { populateWorklog(); renderWorklog(); }).observe(document.getElementById('employeeList'), {childList:true});

const buildEmployeeReport = (employee) => {
  const assigned = tasks.filter((task) => task.employeeId === employee.id);
  const completed = assigned.filter((task) => task.status === 'Completed');
  const pending = assigned.filter((task) => task.status !== 'Completed');
  const currentLog = workLogs[employee.id] || buildDefaultWorkLog(employee.id);
  const completionRate = assigned.length ? Math.round((completed.length / assigned.length) * 100) : 0;

  const lines = [
    'Northstar Pulse Weekly Progress Report',
    '===================================',
    `Employee: ${employee.name}`,
    `Employee ID: ${employee.id}`,
    `Department: ${employee.department}`,
    `Week of: ${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`,
    '',
    'Work done throughout the week',
    `- Login time: ${currentLog.login}`,
    `- Break start: ${currentLog.breakStart}`,
    `- Break end: ${currentLog.breakEnd}`,
    `- Logout time: ${currentLog.logout}`,
    `- Net work time: ${currentLog.net}`,
    '',
    'Progress made',
    `- Tasks assigned: ${assigned.length}`,
    `- Tasks completed: ${completed.length}`,
    `- Tasks still pending: ${pending.length}`,
    `- Completion rate: ${completionRate}%`,
    '',
    'Work completed on the project'
  ];

  if (assigned.length) {
    assigned.forEach((task, index) => {
      lines.push(`${index + 1}. ${task.title} | ${task.status} | Priority: ${task.priority} | Due: ${task.due}`);
    });
  } else {
    lines.push('No project tasks have been assigned this week.');
  }

  return lines.join('\n');
};

const downloadEmployeeReport = () => {
  const selectedEmployeeId = worklogEmployee?.value || trackerEmployee?.value || (employees[0] && employees[0].id);
  const employee = employees.find((person) => person.id === selectedEmployeeId) || employees[0];

  if (!employee) {
    toast.textContent = 'No employee is available to generate a report.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    return;
  }

  const reportText = buildEmployeeReport(employee);
  const blob = new Blob([reportText + '\n'], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${employee.name.toLowerCase().replace(/\s+/g, '-')}-weekly-report.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  toast.textContent = `✓ Weekly report downloaded for ${employee.name}.`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
};

document.getElementById('downloadReportBtn')?.addEventListener('click', downloadEmployeeReport);
