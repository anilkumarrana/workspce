const addStyle = (css) => { const style = document.createElement('style'); style.textContent = css; document.head.append(style); };
addStyle(`.account-grid,.task-panel{display:grid;grid-template-columns:1.1fr .9fr;gap:18px}.account-form,.roster,.task-panel{background:#fff;border:1px solid #e4e9e7;border-radius:12px;padding:29px}.account-form h2,.roster h2,.task-panel h2{font-size:21px;letter-spacing:-1px;margin:9px 0 20px}.account-form label,.task-form label{display:block;font-size:11px;font-weight:700;margin-top:14px}.account-form input,.account-form select,.task-form input,.task-form select,.task-form textarea{display:block;width:100%;border:1px solid #dce3e1;border-radius:6px;padding:10px;margin-top:6px;font:12px Manrope;outline-color:#84af3e;background:#fff}.field-row,.task-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}.id-preview{margin-top:20px;padding:14px 15px;background:#f1f8e7;border:1px dashed #bddb91;border-radius:8px;display:grid;gap:3px}.id-preview span,.task-summary span{font:9px 'DM Mono';letter-spacing:1px;color:#739051}.id-preview strong{font:700 19px 'DM Mono';letter-spacing:-1px;color:#365b29}.id-preview small{font-size:10px;color:#78906f}.account-form .check,.task-form .check{margin-top:20px;width:100%}.roster-head{display:flex;justify-content:space-between;align-items:start;padding-bottom:18px;border-bottom:1px solid #e4e9e7}.roster-head h2{margin-bottom:0}.roster-head>b{font:11px 'DM Mono';background:#eaf6da;color:#5a8331;padding:5px 7px;border-radius:5px}.employee{display:flex;gap:10px;align-items:center;padding:15px 0;border-bottom:1px solid #e4e9e7}.employee:last-child{border-bottom:0}.person-avatar{height:34px;width:34px;border-radius:50%;display:grid;place-items:center;font:800 10px Manrope;font-style:normal}.purple{background:#eeeaff;color:#7561b4}.blue{background:#e5efff;color:#5579ac}.orange{background:#ffebe1;color:#c26749}.employee b,.employee small{display:block}.employee b{font-size:12px}.employee small{font-size:10px;color:#849296;margin-top:3px}.employee em,.assignment em,.task-row em{font-style:normal;margin-left:auto;border-radius:12px;padding:4px 7px;font:9px 'DM Mono'}.employee em,.done{color:#5b8d38;background:#edf8df}.task-panel{margin-top:18px}.task-panel>div>p{font-size:11px;color:#71808a;margin:-11px 0 18px}.assignment-list,.task-list{display:flex;flex-direction:column;gap:9px}.assignment,.task-row{background:#f7f9f5;border:1px solid #e8ede6;border-radius:8px;padding:11px 12px;display:flex;align-items:center;gap:10px}.assignment b,.assignment small,.task-row b,.task-row small{display:block}.assignment b,.task-row b{font-size:11px}.assignment small,.task-row small{font:9px 'DM Mono';color:#7d8d91;margin-top:3px}.high{background:#fff0e9;color:#c76b4d}.medium{background:#e7f2ff;color:#5476a1}.low{background:#edf8df;color:#5b8d38}.task-summary{padding:14px;background:#f1f8e7;border-radius:8px;margin:10px 0 12px}.task-numbers{display:flex;gap:24px;margin-top:8px}.task-numbers b{display:block;font-size:25px;letter-spacing:-1px}.task-numbers small{font-size:10px;color:#728177}.pending{background:#fff6df;color:#a17520}@media(max-width:900px){.account-grid,.task-panel{grid-template-columns:1fr}}@media(max-width:650px){.field-row,.task-fields{grid-template-columns:1fr}.account-form,.roster,.task-panel{padding:21px}}`);

const notes = [{title:'What five customers taught us about onboarding',category:'Research',summary:'The clearest friction point is still the moment after account creation. A progress cue would reduce uncertainty.',author:'Maya Chen',initials:'MC',age:'Today'},{title:'Checkout regression: release candidate 1',category:'QA',summary:'All core purchase paths pass. We found two address-validation edge cases to resolve before the Thursday cut.',author:'Kavya Patel',initials:'KP',age:'Yesterday'},{title:'Search latency benchmark, August',category:'Engineering',summary:'The new cache layer lowers p95 response time by 38%. The implementation is safe to ship behind a flag.',author:'Jordan Miles',initials:'JM',age:'2 days ago'}];
const noteTemplate = (note) => `<article class="note" data-category="${note.category}"><span class="tag ${note.category}">${note.category}</span><h3>${note.title}</h3><p>${note.summary}</p><div class="meta"><span><i class="avatar">${note.initials}</i>${note.author}</span><span>${note.age} · ♡ ${Math.floor(note.title.length / 2)}</span></div></article>`;
const renderNotes = () => { document.getElementById('feed').innerHTML = notes.map(noteTemplate).join(''); document.getElementById('library').innerHTML = notes.map(noteTemplate).join(''); };
const teamMeetings = [
  { title: 'Product sync', time: 'Tomorrow • 10:30 AM', message: 'Review launch blockers, customer feedback, and this week’s product priorities.', link: 'https://meet.google.com/abc-defg-hij' },
  { title: 'Leadership check-in', time: 'Thursday • 2:00 PM', message: 'Share cross-team updates, staffing signals, and decision needs for Friday.', link: 'https://zoom.us/j/1234567890' }
];
const renderMeetings = () => {
  const list = document.getElementById('meetingList');
  if (!list) return;

  list.innerHTML = teamMeetings.length
    ? teamMeetings.map((meeting, index) => {
        const linkText = meeting.link?.includes('zoom.us') ? 'Join Zoom' : meeting.link?.includes('meet.google') ? 'Join Google Meet' : 'Open meeting link';
        const linkMarkup = meeting.link
          ? `
            <div class="meeting-actions">
              <a class="meeting-link" href="${meeting.link}" target="_blank" rel="noreferrer">${linkText}</a>
              <button class="meeting-link-delete" type="button" data-delete-link-index="${index}">Delete link</button>
            </div>
          `
          : '<span class="meeting-no-link">No meeting link added yet.</span>';

        return `
          <article class="meeting-item">
            <div>
              <span class="eyebrow">UPCOMING TEAM MEETING</span>
              <h3>${meeting.title}</h3>
              <p>${meeting.message}</p>
              ${linkMarkup}
              <div class="meeting-card-actions">
                <button class="meeting-card-btn" type="button" data-reschedule-index="${index}">Reschedule</button>
                <button class="meeting-card-btn danger" type="button" data-delete-meeting-index="${index}">Delete meeting</button>
              </div>
            </div>
            <time>${meeting.time}</time>
          </article>
        `;
      }).join('')
    : '<p class="no-log">No upcoming team meetings. Share one below for the team.</p>';
};
const meetingForm = document.getElementById('meetingForm');
meetingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(meetingForm);
  const meetingTitle = String(formData.get('meetingTitle') || '').trim();
  const meetingTime = String(formData.get('meetingTime') || '').trim();
  const meetingMessage = String(formData.get('meetingMessage') || '').trim();
  const meetingLink = String(formData.get('meetingLink') || '').trim();

  if (!meetingTitle || !meetingTime || !meetingMessage) {
    toast.textContent = 'Please provide a meeting title, time, and message before sharing it.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
    return;
  }

  teamMeetings.unshift({ title: meetingTitle, time: meetingTime, message: meetingMessage, link: meetingLink || '' });
  meetingForm.reset();
  renderMeetings();

  toast.textContent = '✓ Team meeting update shared successfully.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
});
document.addEventListener('click', (event) => {
  const deleteLinkButton = event.target.closest('[data-delete-link-index]');
  if (deleteLinkButton) {
    const meetingIndex = Number(deleteLinkButton.dataset.deleteLinkIndex);
    if (!Number.isInteger(meetingIndex) || meetingIndex < 0 || meetingIndex >= teamMeetings.length) return;

    teamMeetings[meetingIndex].link = '';
    renderMeetings();

    toast.textContent = '✓ Meeting link removed.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
    return;
  }

  const rescheduleButton = event.target.closest('[data-reschedule-index]');
  if (rescheduleButton) {
    const meetingIndex = Number(rescheduleButton.dataset.rescheduleIndex);
    if (!Number.isInteger(meetingIndex) || meetingIndex < 0 || meetingIndex >= teamMeetings.length) return;

    const meeting = teamMeetings[meetingIndex];
    const nextTime = prompt('Enter the new meeting time:', meeting.time || '');
    if (nextTime === null) return;

    const cleanTime = nextTime.trim();
    if (cleanTime) {
      meeting.time = cleanTime;
      renderMeetings();
      toast.textContent = '✓ Meeting rescheduled.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }
    return;
  }

  const deleteMeetingButton = event.target.closest('[data-delete-meeting-index]');
  if (deleteMeetingButton) {
    const meetingIndex = Number(deleteMeetingButton.dataset.deleteMeetingIndex);
    if (!Number.isInteger(meetingIndex) || meetingIndex < 0 || meetingIndex >= teamMeetings.length) return;

    const confirmed = window.confirm('Delete this meeting entry and all its details?');
    if (!confirmed) return;

    teamMeetings.splice(meetingIndex, 1);
    renderMeetings();

    toast.textContent = '✓ Meeting entry deleted.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }
});
renderNotes();
renderMeetings();
addStyle(`
  .employee-directory { margin-top: 22px; background: #fff; border: 1px solid #e4e9e7; border-radius: 16px; padding: 24px; }
  .directory-head { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 18px; }
  .directory-head h3 { margin: 0; font-size: 22px; letter-spacing: -1px; }
  .directory-table { width: 100%; border-collapse: collapse; }
  .directory-table th, .directory-table td { text-align: left; padding: 12px 10px; border-bottom: 1px solid #e9efe9; vertical-align: middle; }
  .directory-table th { font: 10px 'DM Mono', monospace; letter-spacing: 1px; color: #5f7079; text-transform: uppercase; }
  .employee-record-row { font-size: 13px; }
  .directory-actions { display: flex; justify-content: flex-end; gap: 8px; align-items: center; flex-wrap: wrap; }
  .directory-tools { margin-bottom: 18px; }
  .search-field { display: grid; gap: 7px; font: 10px 'DM Mono', monospace; letter-spacing: 1px; color: #5f7079; text-transform: uppercase; }
  .search-field input { width: 100%; border: 1px solid #dde6de; border-radius: 8px; padding: 10px 12px; font: 14px Manrope; background: #fff; }
  .secondary-btn { background: #1d3b2f; color: #fff; border: 0; border-radius: 8px; padding: 9px 12px; font-weight: 700; }
  .danger-btn { background: #fff0f0; color: #b54242; border: 1px solid #f0c3c3; border-radius: 8px; padding: 9px 12px; font-weight: 700; cursor: pointer; }
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
  .performance-shell { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 18px; margin-top: 20px; }
  .performance-form-card, .performance-report-card { background: linear-gradient(180deg, #ffffff 0%, #f8faf6 100%); border: 1px solid #e4e9e7; border-radius: 18px; padding: 24px; }
  .performance-form-card h2, .performance-report-card h2 { margin: 8px 0 16px; font-size: 24px; letter-spacing: -1px; }
  #performanceForm { display: grid; gap: 12px; }
  #performanceForm label { display: grid; gap: 7px; font: 10px 'DM Mono', monospace; letter-spacing: 1px; color: #5f7079; text-transform: uppercase; }
  #performanceForm input, #performanceForm select, #performanceForm textarea { width: 100%; border: 1px solid #dde6de; border-radius: 8px; padding: 10px 12px; font: 14px Manrope; background: #fff; }
  #performanceForm textarea { resize: vertical; min-height: 100px; }
  .score-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .score-ring { display: flex; align-items: baseline; justify-content: center; gap: 6px; margin: 18px 0; }
  .score-ring strong { font-size: clamp(42px, 5vw, 62px); letter-spacing: -2px; }
  .score-ring small { font-size: 16px; color: #5f7079; }
  .metric-list { display: grid; gap: 12px; }
  .metric-row { display: grid; grid-template-columns: 84px 1fr 48px; align-items: center; gap: 10px; }
  .metric-row span { color: #5f7079; font: 11px 'DM Mono', monospace; }
  .metric-row b { font-size: 12px; }
  .metric-bar { width: 100%; height: 10px; background: #edf3eb; border-radius: 999px; overflow: hidden; }
  .metric-bar i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #d4f278 0%, #7ec16d 100%); }
  .performance-history-box { margin-top: 18px; padding-top: 16px; border-top: 1px solid #e6ece8; }
  .performance-history { display: grid; gap: 10px; margin-top: 12px; }
  .performance-history-item { display: flex; justify-content: space-between; align-items: center; background: #f6faf3; border: 1px solid #deead8; border-radius: 10px; padding: 10px 12px; }
  .performance-history-item strong { font-size: 14px; }
  .performance-history-item span { font: 10px 'DM Mono', monospace; color: #5f7079; }
  .employee-profile-page { margin-top: 22px; background: linear-gradient(180deg, #ffffff 0%, #f7faf5 100%); border: 1px solid #e4e9e7; border-radius: 18px; padding: 26px 24px; }
  .profile-page-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
  .profile-page-title { display: flex; align-items: center; gap: 16px; }
  .profile-page-avatar { width: 64px; height: 64px; border-radius: 16px; overflow: hidden; border: 1px solid #dfeae3; background: #edf4e9; }
  .profile-page-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .profile-page-title h3 { margin: 6px 0 0; font-size: 26px; letter-spacing: -1px; }
  .profile-page-title p { margin: 4px 0 0; color: #5f7079; }
  .profile-badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 8px 12px; font: 700 11px Manrope; }
  .profile-badge.active { background: #eaf7dd; color: #2f6835; }
  .profile-badge.deactivated { background: #fbe9e7; color: #9d3f39; }
  .employee-profile-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 18px; }
  .employee-report-form, .leader-review-panel { background: #fff; border: 1px solid #e6ece8; border-radius: 14px; padding: 22px; }
  .employee-report-form { display: grid; gap: 12px; }
  .employee-report-form h4, .leader-review-head h4 { margin: 0; font-size: 20px; letter-spacing: -1px; }
  .employee-report-form label { display: grid; gap: 7px; font: 10px 'DM Mono', monospace; letter-spacing: 1px; color: #5f7079; text-transform: uppercase; }
  .employee-report-form input, .employee-report-form textarea { width: 100%; border: 1px solid #dde6de; border-radius: 8px; padding: 10px 12px; font: 14px Manrope; background: #fff; }
  .employee-report-form textarea { min-height: 90px; resize: vertical; }
  .leader-review-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .leader-report-list { display: grid; gap: 12px; }
  .leader-report-item { background: #f6faf3; border: 1px solid #deead8; border-radius: 12px; padding: 16px 18px; }
  .leader-report-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px; }
  .leader-report-top strong { font-size: 18px; letter-spacing: -1px; }
  .leader-report-top span { font: 10px 'DM Mono', monospace; color: #5f7079; }
  .leader-report-item p { margin: 7px 0; color: #42575d; line-height: 1.5; font-size: 12px; }
  .leader-report-item p b { color: #1d3b2f; }
  .leader-review-badge { display: inline-block; margin-top: 8px; background: #ecf6df; color: #3c6a2a; border-radius: 999px; padding: 7px 10px; font: 700 10px Manrope; }
  @media (max-width: 700px) { .directory-table thead { display: none; } .directory-table, .directory-table tbody, .directory-table tr, .directory-table td { display: block; width: 100%; } .directory-table tr { padding: 10px 0; } .directory-table td { border: 0; padding: 6px 0; } .employee-id-card { flex-direction: column; align-items: flex-start; } .id-card-data { grid-template-columns: 1fr; } .employee-profile-grid { grid-template-columns: 1fr; } .profile-page-header { flex-direction: column; align-items: flex-start; } .performance-shell { grid-template-columns: 1fr; } .score-grid { grid-template-columns: 1fr; } }
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

const checkButton = document.getElementById('check'), breakButton = document.getElementById('break'), time = document.getElementById('time'), fill = document.getElementById('fill'), hint = document.getElementById('hint'), breakReminder = document.getElementById('breakReminder');
const sessionState = { checkedIn: false, startTime: null, breakSessionActive: false };

const updateRealtimeDate = () => {
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNamesShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = dayNames[now.getDay()];
  const dayNumber = String(now.getDate()).padStart(2, '0');
  const monthShort = monthNamesShort[now.getMonth()];
  const monthFull = monthNamesFull[now.getMonth()];
  const year = now.getFullYear();

  const todayDateLabel = document.getElementById('todayDateLabel');
  const todayDayNumber = document.getElementById('todayDayNumber');
  const todayMonthYear = document.getElementById('todayMonthYear');

  if (todayDateLabel) todayDateLabel.textContent = `Today • ${dayOfWeek}, ${monthFull} ${now.getDate()}, ${year}`;
  if (todayDayNumber) todayDayNumber.textContent = dayNumber;
  if (todayMonthYear) todayMonthYear.innerHTML = `${monthShort}<br />${year}`;
};

updateRealtimeDate();
setInterval(updateRealtimeDate, 60000);
const formatDuration = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
const tick = () => {
  if (!sessionState.startTime) {
    if (time) time.textContent = '00:00:00';
    return;
  }

  const elapsedMs = Date.now() - sessionState.startTime;
  time.textContent = formatDuration(elapsedMs);
  fill.style.width = `${Math.min(100, (elapsedMs / 3600000) * 100)}%`;

  if (sessionState.checkedIn && !sessionState.breakSessionActive && elapsedMs >= 5400000) {
    breakReminder.textContent = 'Break reminder: you have been on focus for 90 minutes. It is a good time to take a short break.';
    breakReminder.classList.add('show');
    breakButton.classList.add('reminder');
  } else if (sessionState.breakSessionActive) {
    breakReminder.textContent = 'Break is active. Resume when you are ready.';
    breakReminder.classList.add('show');
  }
};
const setCheckInState = (state) => {
  const states = {
    'not-marked': { title: 'Ready to begin?', copy: 'Check in when you’re ready to focus.', hint: 'Not checked in yet', button: 'Check in <span>→</span>', breakDisabled: true },
    present: { title: 'You’re on the clock.', copy: 'Your focused workday has started.', hint: 'Building a strong day, one block at a time.', button: 'Checked in ✓', breakDisabled: false },
    break: { title: 'On a short break.', copy: 'Your attendance is recorded and your break is active.', hint: 'Break started. Take the space you need.', button: 'Resume focus', breakDisabled: false },
  };

  const current = states[state] || states['not-marked'];
  document.getElementById('check-title').textContent = current.title;
  document.getElementById('check-copy').textContent = current.copy;
  hint.textContent = current.hint;
  checkButton.innerHTML = current.button;
  breakButton.disabled = current.breakDisabled;
  setAttendanceStatus(state);
};
if (typeof checkButton !== 'undefined' && checkButton) {
  checkButton.addEventListener('click', () => { 
    const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
    if (!isUserAuth) {
      toast.textContent = '🔒 Authentication Required: Please sign in first to check in.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3200);
      mainAuthDropdown?.classList.remove('hidden');
      return;
    }

    sessionState.checkedIn = !sessionState.checkedIn; 
    if (sessionState.checkedIn) { 
      sessionState.startTime = Date.now(); 
      sessionState.breakSessionActive = false; 
      setCheckInState('present'); 
      tick(); 
    } else { 
      setCheckInState('not-marked'); 
      sessionState.breakSessionActive = false; 
      if (breakButton) breakButton.textContent = 'Take a break'; 
      if (breakButton) breakButton.classList.remove('reminder'); 
      if (breakReminder) breakReminder.classList.remove('show'); 
      if (breakReminder) breakReminder.textContent = 'Break reminder will appear here when it\'s time to pause.'; 
      sessionState.startTime = null; 
      if (time) time.textContent = '00:00:00'; 
      if (fill) fill.style.width = '0%'; 
    } 
  }); 
}
if (typeof breakButton !== 'undefined' && breakButton) {
  breakButton.addEventListener('click', () => { const onBreak = breakButton.textContent === 'Take a break'; breakButton.textContent = onBreak ? 'Resume focus' : 'Take a break'; if (onBreak) { sessionState.breakSessionActive = true; setAttendanceStatus('break'); if (hint) hint.textContent = 'Break started. Take the space you need.'; const checkTitle = document.getElementById('check-title'); if (checkTitle) checkTitle.textContent = 'On a short break.'; const checkCopy = document.getElementById('check-copy'); if (checkCopy) checkCopy.textContent = 'Your attendance is recorded and your break is active.'; if (breakReminder) breakReminder.textContent = 'Healthy break time. Step away for a few minutes and come back refreshed.'; if (breakReminder) breakReminder.classList.add('show'); breakButton.classList.remove('reminder'); } else { sessionState.breakSessionActive = false; setAttendanceStatus('present'); if (hint) hint.textContent = 'Welcome back — focus resumed.'; const checkTitle = document.getElementById('check-title'); if (checkTitle) checkTitle.textContent = 'You’re back on the clock.'; const checkCopy = document.getElementById('check-copy'); if (checkCopy) checkCopy.textContent = 'Your focused workday has resumed.'; if (breakReminder) breakReminder.textContent = 'Focus mode is active again. Keep the momentum going.'; if (breakReminder) breakReminder.classList.add('show'); } });
}
if (typeof tick === 'function') setInterval(tick, 1000);

const modal = document.getElementById('modal'), noteForm = document.getElementById('form'), toast = document.getElementById('toast'); 
document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => modal?.classList.add('show'))); 
document.getElementById('close')?.addEventListener('click', () => modal?.classList.remove('show')); 
modal?.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('show'); }); 
noteForm?.addEventListener('submit', (event) => { event.preventDefault(); const values = new FormData(noteForm); notes.unshift({title:values.get('title'),category:values.get('category'),summary:values.get('summary'),author:'Arun Mehta',initials:'AM',age:'Just now'}); renderNotes(); modal?.classList.remove('show'); noteForm.reset(); if (toast) { toast.textContent = '✓ Your test note is now visible to the team.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); } }); 
document.querySelectorAll('.filters button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.filters button').forEach((filter) => filter.classList.remove('selected')); button.classList.add('selected'); document.querySelectorAll('#library .note').forEach((note) => note.style.display = button.textContent === 'All notes' || note.dataset.category === button.textContent ? 'flex' : 'none'); })); 
document.getElementById('menu')?.addEventListener('click', () => document.getElementById('rail')?.classList.toggle('open'));

let employees = [];
let rosterStatus = { active: true };
const tasks = [{employeeId:'NST-2024-0712',title:'Validate onboarding prototype',priority:'Medium',due:'Aug 21',status:'Pending'},{employeeId:'NST-2024-0712',title:'Synthesize session notes',priority:'Low',due:'Aug 16',status:'Completed'},{employeeId:'NST-2025-0935',title:'Confirm checkout edge cases',priority:'High',due:'Aug 19',status:'Pending'},{employeeId:'NST-2023-0528',title:'Review cache benchmark',priority:'Medium',due:'Aug 22',status:'Completed'}];
const taskPanel = document.createElement('section'); taskPanel.className = 'task-panel'; taskPanel.innerHTML = `<div><span class="eyebrow">WORK ASSIGNMENTS</span><h2>Assign a task</h2><p>Give an employee a clear, trackable next step.</p><form class="task-form" id="taskForm"><label>Assign to<select id="assignee"></select></label><label>Task title<input id="taskTitle" required placeholder="e.g. Review onboarding findings"></label><div class="task-fields"><label>Priority<select id="taskPriority"><option>High</option><option selected>Medium</option><option>Low</option></select></label><label>Due date<input id="taskDue" type="date" required></label></div><label>Instructions<textarea id="taskDetails" placeholder="Add context or an expected outcome."></textarea></label><button class="check" type="submit">Assign task <span>→</span></button></form></div><div><span class="eyebrow">TASK OVERVIEW</span><h2>Employee workload</h2><label class="task-form">View tasks for<select id="trackerEmployee"></select></label><div class="task-summary"><span>ASSIGNMENT SUMMARY</span><div class="task-numbers"><div><b id="assignedCount">0</b><small>assigned</small></div><div><b id="completedCount">0</b><small>completed</small></div><div><b id="pendingCount">0</b><small>pending</small></div></div></div><div class="task-list" id="taskList"></div></div>`; 
const targetAccountGrid = document.querySelector('#people .account-grid') || document.querySelector('.account-grid');
if (targetAccountGrid) targetAccountGrid.after(taskPanel);
const assignee = document.getElementById('assignee'), trackerEmployee = document.getElementById('trackerEmployee');
const stripTimingMetadata = (value = {}) => {
  if (!value || typeof value !== 'object') return value;

  const {
    created_at,
    updated_at,
    createdAt,
    updatedAt,
    timestamp,
    time,
    ...rest
  } = value;

  return rest;
};
const normalizeEmployee = (employee) => {
  const cleanEmployee = stripTimingMetadata(employee);
  return {
    id: cleanEmployee.employee_id || cleanEmployee.id,
    name: cleanEmployee.name || `${cleanEmployee.first_name || ''} ${cleanEmployee.last_name || ''}`.trim(),
    initials: cleanEmployee.initials || `${(cleanEmployee.first_name || '').charAt(0)}${(cleanEmployee.last_name || '').charAt(0)}`.toUpperCase(),
    department: cleanEmployee.department || 'General',
    email: cleanEmployee.email || '',
    startDate: cleanEmployee.start_date || cleanEmployee.startDate || '',
    photo_path: cleanEmployee.photo_path || cleanEmployee.photo || '',
    isDeactivated: Boolean(cleanEmployee.isDeactivated),
  };
};
const renderEmployeeList = () => {
  const list = document.getElementById('employeeList');
  if (!list) return;

  list.innerHTML = employees.map((employee) => {
    const isVisibleActive = rosterStatus.active && !employee.isDeactivated;
    const statusLabel = isVisibleActive ? 'Active' : 'Deactivated';
    const toggleLabel = isVisibleActive ? 'Deactivate' : 'Activate';
    return `<div class="employee"><i class="person-avatar purple">${employee.initials}</i><span><b>${employee.name}</b><small>${employee.id} · ${employee.department}</small></span><div class="employee-status"><em class="${isVisibleActive ? 'status-active' : 'status-deactivated'}">${statusLabel}</em><button class="status-toggle" type="button" data-status-toggle="${employee.id}">${toggleLabel}</button></div></div>`;
  }).join('');

  list.querySelectorAll('[data-status-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
      if (!isUserAuth) {
        toast.textContent = '🔒 Authentication Required: Please sign in first to change employee status.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3200);
        mainAuthDropdown?.classList.remove('hidden');
        return;
      }
      const employee = employees.find((person) => person.id === button.dataset.statusToggle);
      if (!employee) return;
      employee.isDeactivated = !employee.isDeactivated;
      renderEmployeeList();
    });
  });

  document.getElementById('employeeCount').textContent = String(employees.length);
};
const fallbackEmployees = [
  {id:'NST-2024-0712',name:'Maya Chen',initials:'MC',department:'Research',email:'maya.chen@northstar.com',startDate:'2024-01-14'},
  {id:'NST-2025-0935',name:'Kavya Patel',initials:'KP',department:'Quality Assurance',email:'kavya.patel@northstar.com',startDate:'2025-02-05'},
  {id:'NST-2023-0528',name:'Jordan Miles',initials:'JM',department:'Engineering',email:'jordan.miles@northstar.com',startDate:'2023-08-19'}
];
const employeeReports = {
  'NST-2024-0712': [{
    title: 'Customer onboarding progress',
    summary: 'Updated the onboarding checklist and validated the feedback loop for new account creation.',
    workCompleted: 'Worked on onboarding sequence, reviewed user journey issues, and documented friction points for the team.',
    blocker: 'No blockers this week. The main pain point is still onboarding clarity after account creation.',
    nextStep: 'Prepare the final handoff notes and share the launch-ready checklist with the product team.',
    createdAt: '2026-08-18',
    leaderReview: 'Approved for review. Follow-up planned with the product lead.'
  }],
  'NST-2025-0935': [{
    title: 'Prototype validation',
    summary: 'Reviewed the checkout flow and logged quality gaps in the release candidate.',
    workCompleted: 'Checked purchase pathways, documented edge cases, and pushed the remaining fixes to the QA queue.',
    blocker: 'One address validation scenario still needs final confirmation from finance.',
    nextStep: 'Verify the final validation bug and complete regression note before the Thursday cut.',
    createdAt: '2026-08-17',
    leaderReview: 'Outstanding progress. Final regression is pending confirmation.'
  }]
};
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
let selectedEmployeeProfileId = null;
const createEmployeeProfilePage = () => {
  const profilePage = document.createElement('section');
  profilePage.className = 'employee-profile-page';
  profilePage.id = 'employeeProfilePage';
  document.querySelector('#people .account-grid')?.after(profilePage);
  return profilePage;
};
const renderEmployeeProfilePage = (employeeId) => {
  const profilePage = document.getElementById('employeeProfilePage') || createEmployeeProfilePage();
  const employee = employees.find((person) => person.id === employeeId) || employees[0];

  if (!employee) {
    profilePage.innerHTML = '<div class="empty-state">No employee details available.</div>';
    return;
  }

  selectedEmployeeProfileId = employee.id;
  const reports = employeeReports[employee.id] || [];

  profilePage.innerHTML = `
    <div class="profile-page-header">
      <div class="profile-page-title">
        <div class="profile-page-avatar">
          <img src="${buildProfileImage(employee)}" alt="${employee.name} profile" />
        </div>
        <div>
          <span class="eyebrow">EMPLOYEE PROFILE</span>
          <h3>${employee.name}</h3>
          <p>${employee.department} • ${employee.id}</p>
        </div>
      </div>
      <span class="profile-badge ${employee.isDeactivated ? 'deactivated' : 'active'}">${employee.isDeactivated ? 'Deactivated' : 'Active'}</span>
    </div>

    <div class="employee-profile-grid">
      <form id="employeeReportForm" class="employee-report-form">
        <h4>Submit detailed work report</h4>
        <label>
          Report title
          <input name="reportTitle" type="text" placeholder="e.g. Weekly sprint summary" required />
        </label>
        <label>
          Summary
          <textarea name="reportSummary" rows="3" placeholder="Brief overview of this update." required></textarea>
        </label>
        <label>
          Work completed
          <textarea name="workCompleted" rows="4" placeholder="Describe the tasks and work that were completed." required></textarea>
        </label>
        <label>
          Blockers
          <textarea name="reportBlocker" rows="3" placeholder="Any blockers or issues to flag."></textarea>
        </label>
        <label>
          Next steps
          <textarea name="reportNextStep" rows="3" placeholder="What should happen next?"></textarea>
        </label>
        <button class="check" type="submit">Save employee report <span>→</span></button>
      </form>

      <div class="leader-review-panel">
        <div class="leader-review-head">
          <div>
            <span class="eyebrow">TEAM LEADER VIEW</span>
            <h4>Submitted reports</h4>
          </div>
        </div>
        <div class="leader-report-list">
          ${reports.length ? reports.map((report) => `
            <article class="leader-report-item">
              <div class="leader-report-top">
                <strong>${report.title}</strong>
                <span>${report.createdAt}</span>
              </div>
              <p><b>Summary:</b> ${report.summary}</p>
              <p><b>Work completed:</b> ${report.workCompleted}</p>
              <p><b>Blockers:</b> ${report.blocker || 'No blockers reported.'}</p>
              <p><b>Next steps:</b> ${report.nextStep || 'No next steps yet.'}</p>
              <div class="leader-review-badge">${report.leaderReview || 'Pending review'}</div>
            </article>
          `).join('') : '<p class="no-log">No work reports submitted yet for this employee.</p>'}
        </div>
      </div>
    </div>
  `;

  const reportForm = profilePage.querySelector('#employeeReportForm');
  reportForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(reportForm);
    const title = String(formData.get('reportTitle') || '').trim();
    const summary = String(formData.get('reportSummary') || '').trim();
    const workCompleted = String(formData.get('workCompleted') || '').trim();
    const blocker = String(formData.get('reportBlocker') || '').trim();
    const nextStep = String(formData.get('reportNextStep') || '').trim();

    if (!title || !summary || !workCompleted) {
      toast.textContent = 'Please add a title, summary, and work completed before saving the report.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
      return;
    }

    const reportEntry = {
      title,
      summary,
      workCompleted,
      blocker: blocker || 'No blockers reported.',
      nextStep: nextStep || 'No next steps yet.',
      createdAt: new Date().toISOString().slice(0, 10),
      leaderReview: 'Pending team leader review'
    };

    employeeReports[employee.id] = [reportEntry, ...(employeeReports[employee.id] || [])];
    reportForm.reset();
    renderEmployeeProfilePage(employee.id);

    toast.textContent = `✓ Report saved for ${employee.name}.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
};
const renderEmployeeDirectory = () => {
  const directory = document.getElementById('employeeDirectory');
  if (!directory) return;

  const searchTerm = (document.getElementById('employeeSearchInput')?.value || '').trim().toLowerCase();
  const filteredEmployees = employees.filter((employee) => {
    if (!searchTerm) return true;
    return (employee.name || '').toLowerCase().includes(searchTerm);
  });

  directory.innerHTML = `
    <div class="directory-head">
      <h3>Employee directory</h3>
      <button class="secondary-btn" id="viewDirectoryBtn" type="button">View complete employee data</button>
    </div>
    <div class="directory-tools">
      <label class="search-field">
        <span>Search by name</span>
        <input id="employeeSearchInput" type="search" placeholder="Search employee name" value="${searchTerm}" />
      </label>
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
        ${filteredEmployees.length ? filteredEmployees.map((employee) => `
          <tr class="employee-record-row">
            <td><strong>${employee.id}</strong></td>
            <td>${employee.name}</td>
            <td>${employee.email || 'Not provided'}</td>
            <td>${employee.department}</td>
            <td>${employee.startDate || employee.start_date || '—'}</td>
            <td class="directory-actions">
              <button class="secondary-btn" type="button" data-employee-id="${employee.id}">Generate ID card</button>
              <button class="danger-btn" type="button" data-delete-employee-id="${employee.id}">Delete</button>
            </td>
          </tr>
        `).join('') : `
          <tr class="employee-record-row">
            <td colspan="6">No employees match this search.</td>
          </tr>
        `}
      </tbody>
    </table>
  `;

  const viewDirectoryBtn = document.getElementById('viewDirectoryBtn');
  if (viewDirectoryBtn) {
    viewDirectoryBtn.addEventListener('click', () => {
      directory.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const employeeSearchInput = document.getElementById('employeeSearchInput');
  employeeSearchInput?.addEventListener('input', () => renderEmployeeDirectory());

  directory.querySelectorAll('[data-employee-profile-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const employeeId = button.dataset.employeeProfileId;
      if (!employeeId) return;
      renderEmployeeProfilePage(employeeId);
      document.getElementById('employeeProfilePage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

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

  directory.querySelectorAll('[data-delete-employee-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
      if (!isUserAuth) {
        toast.textContent = '🔒 Authentication Required: Please sign in first to delete employee records.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3200);
        mainAuthDropdown?.classList.remove('hidden');
        return;
      }

      const employeeId = button.dataset.deleteEmployeeId;
      if (!employeeId) return;

      employees = employees.filter((employee) => employee.id !== employeeId);
      tasks.splice(0, tasks.length, ...tasks.filter((task) => task.employeeId !== employeeId));
      delete workLogs[employeeId];

      if (worklogEmployee && worklogEmployee.value === employeeId) {
        worklogEmployee.value = employees[0]?.id || '';
      }

      if (trackerEmployee && trackerEmployee.value === employeeId) {
        trackerEmployee.value = employees[0]?.id || '';
      }

      renderEmployeeDirectory();
      renderEmployeeList();
      populateEmployeeSelects();
      populateWorklog();
      renderWorklog();
      renderTracker();
      toast.textContent = '✓ Employee entry removed from the list.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    });
  });
};
const employeeDirectory = document.createElement('section');
employeeDirectory.className = 'employee-directory';
employeeDirectory.id = 'employeeDirectory';
document.querySelector('#people .account-grid').after(employeeDirectory);
const employeeProfilePage = document.getElementById('employeeProfilePage') || createEmployeeProfilePage();
if (employees[0]) renderEmployeeProfilePage(employees[0].id);
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
const issuedCredentials = document.getElementById('issuedCredentials');
const issuedAccountInfo = document.getElementById('issuedAccountInfo');
const issuedAccountNote = document.getElementById('issuedAccountNote');
const todayDateLabel = document.getElementById('todayDateLabel');
const todayDayNumber = document.getElementById('todayDayNumber');
const todayMonthYear = document.getElementById('todayMonthYear');
const attendanceStatus = document.getElementById('attendanceStatus');
const syncEmployeePreview = () => {
  preview.textContent = 'ID will be issued after account creation';
  if (issuedCredentials) issuedCredentials.hidden = true;
};
const syncTodayDate = () => {
  if (!todayDateLabel || !todayDayNumber || !todayMonthYear) return;

  const now = new Date();
  const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  const year = now.getFullYear();

  todayDateLabel.textContent = `${weekday.toUpperCase()} • ${day} ${month} ${year}`;
  todayDayNumber.textContent = day;
  todayMonthYear.innerHTML = `${month}<br />${year}`;
};
const setAttendanceStatus = (status) => {
  if (!attendanceStatus) return;

  const statusMap = {
    'not-marked': 'Status: Not marked yet',
    present: 'Status: Present today',
    break: 'Status: On break',
    'half-day': 'Status: Half day',
    absent: 'Status: Absent'
  };

  attendanceStatus.textContent = statusMap[status] || statusMap['not-marked'];
};
const authShell = document.getElementById('authShell');
const appShell = document.getElementById('appShell');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');
const showCreateAccountBtn = document.getElementById('showCreateAccountBtn');
const showLoginBtn = document.getElementById('showLoginBtn');
const isLoginPage = document.body?.dataset?.page === 'login' || window.location.pathname.toLowerCase().endsWith('/login.php');
const redirectToApp = () => {
  if (isLoginPage) {
    window.location.href = 'index.php';
  }
};
const redirectToLogin = () => {
  window.location.href = 'login.php?logged_out=1';
};
const toggleAuthMode = (mode) => {
  const showLogin = mode === 'login';
  loginForm?.classList.toggle('hidden', !showLogin);
  signupForm?.classList.toggle('hidden', showLogin);
  showCreateAccountBtn?.classList.toggle('hidden', !showLogin);
  showLoginBtn?.classList.toggle('hidden', showLogin);
  const cardTitle = document.querySelector('.auth-card h2');
  if (cardTitle) {
    cardTitle.textContent = showLogin ? 'Northstar Pulse' : 'Create your account';
  }
  const cardText = document.querySelector('.auth-card p');
  if (cardText) {
    cardText.textContent = showLogin ? 'Use your employee username and password to access your workspace.' : 'Set up your company account and continue to the dashboard.';
  }
  if (!showLogin) {
    signupForm?.querySelector('input[name="firstName"]')?.focus();
  }
};
const syncAuthState = async () => {
  try {
    const response = await fetch('api.php?action=status');
    const result = await response.json();
    const loggedIn = !!result.loggedIn;
    rosterStatus.active = loggedIn;
    authShell?.classList.toggle('hidden', loggedIn);
    appShell?.classList.toggle('hidden', !loggedIn);
    if (logoutBtn) logoutBtn.hidden = !loggedIn;

    const profileName = document.querySelector('.profile b');
    const profileRole = document.querySelector('.profile small');
    const profileAvatar = document.querySelector('.profile .avatar');
    const employee = result.employee || null;

    if (loggedIn && employee) {
      const fullName = employee.name || 'Employee';
      const role = employee.department || 'Team member';
      profileName.textContent = fullName;
      profileRole.textContent = role;
      if (profileAvatar) {
        profileAvatar.textContent = (fullName.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'EM').toUpperCase();
      }
    } else if (profileName) {
      profileName.textContent = 'Arun Mehta';
      profileRole.textContent = 'Product Design';
      if (profileAvatar) profileAvatar.textContent = 'AM';
    }

    renderEmployeeList();
  } catch (error) {
    console.error('Unable to check auth state', error);
  }
};
const loadEmployees = async () => { try { const response = await fetch('api.php'); const data = await response.json(); employees = (Array.isArray(data.employees) ? data.employees : []).map(normalizeEmployee); if (!employees.length) { employees = fallbackEmployees; } } catch (error) { console.error('Unable to load employees', error); employees = fallbackEmployees; } employees.forEach((employee) => ensureWorkLog(employee.id)); renderEmployeeList(); renderEmployeeDirectory(); populateEmployeeSelects(); populateWorklog(); renderWorklog(); syncEmployeePreview(); renderTracker(); };
loadEmployees(); trackerEmployee.addEventListener('change', renderTracker);
loginForm?.addEventListener('submit', async (event) => { event.preventDefault(); const formData = new FormData(loginForm); formData.append('action', 'login'); try { const response = await fetch('api.php', {method:'POST', body: formData}); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || 'Unable to log in.'); await syncAuthState(); loginForm.reset(); if (isLoginPage) { redirectToApp(); return; } toast.textContent = `✓ Welcome back, ${result.employee.name}.`; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); } catch (error) { toast.textContent = error.message || 'There was a problem logging in.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); } });showCreateAccountBtn?.addEventListener('click', () => toggleAuthMode('signup'));
showLoginBtn?.addEventListener('click', () => toggleAuthMode('login'));
signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const payload = {
    firstName: formData.get('firstName')?.toString().trim(),
    lastName: formData.get('lastName')?.toString().trim(),
    email: formData.get('email')?.toString().trim(),
    department: formData.get('department')?.toString(),
    startDate: formData.get('startDate')?.toString(),
    username: formData.get('username')?.toString().trim(),
    password: formData.get('password')?.toString(),
    confirmPassword: formData.get('confirmPassword')?.toString()
  };

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.department || !payload.startDate || !payload.username || !payload.password) {
    toast.textContent = 'Please fill in all account fields before creating your profile.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    return;
  }

  if (payload.password.length < 6) {
    toast.textContent = 'Your password must be at least 6 characters long.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    return;
  }

  if (payload.password !== payload.confirmPassword) {
    toast.textContent = 'The password and confirmation do not match.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    return;
  }

  try {
    const response = await fetch('api.php', { method: 'POST', body: formData });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Unable to create account.');

    const loginFormData = new FormData();
    loginFormData.append('action', 'login');
    loginFormData.append('username', payload.username);
    loginFormData.append('password', payload.password);

    const loginResponse = await fetch('api.php', { method: 'POST', body: loginFormData });
    const loginResult = await loginResponse.json();
    if (!loginResponse.ok || !loginResult.success) throw new Error(loginResult.error || 'Account created, but login failed.');

    signupForm.reset();
    await syncAuthState();
    if (isLoginPage) {
      redirectToApp();
      return;
    }
    toast.textContent = `✓ Account created successfully. Welcome, ${loginResult.employee.name}.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  } catch (error) {
    toast.textContent = error.message || 'There was a problem creating the account.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});
logoutBtn?.addEventListener('click', async () => { const formData = new FormData(); formData.append('action', 'logout'); await fetch('api.php', {method:'POST', body: formData}); rosterStatus.active = false; await syncAuthState(); toggleAuthMode('login'); redirectToLogin(); toast.textContent = '✓ You have been logged out.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); });
employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
  if (!isUserAuth) {
    toast.textContent = '🔒 Authentication Required: Please sign in first to create Employee accounts.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    mainAuthDropdown?.classList.remove('hidden');
    return;
  }
  const formData = new FormData(employeeForm); const payload = {firstName:formData.get('firstName').toString().trim(), lastName:formData.get('lastName').toString().trim(), email:formData.get('email').toString().trim(), department:formData.get('department').toString(), startDate:formData.get('startDate').toString(), username:formData.get('username').toString().trim(), password:formData.get('password').toString(), confirmPassword:formData.get('confirmPassword').toString()}; if (!payload.firstName || !payload.lastName || !payload.email || !payload.department || !payload.startDate || !payload.username || !payload.password) { toast.textContent = 'Please fill in all employee fields before creating the account.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); return; } if (payload.password.length < 6) { toast.textContent = 'The password must be at least 6 characters long.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); return; } if (payload.password !== payload.confirmPassword) { toast.textContent = 'The password and confirmation do not match. Please try again.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); return; } try { const response = await fetch('api.php', {method:'POST', body: formData}); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || 'Unable to save employee'); ensureWorkLog(result.employee.employee_id); preview.textContent = result.employee.employee_id; if (issuedCredentials) { issuedCredentials.hidden = false; issuedAccountInfo.textContent = `${result.employee.employee_id} • ${payload.username}`; issuedAccountNote.textContent = `Password: ${payload.password}`; } const loginFormData = new FormData(); loginFormData.append('action', 'login'); loginFormData.append('username', payload.username); loginFormData.append('password', payload.password); const loginResponse = await fetch('api.php', {method:'POST', body: loginFormData}); const loginResult = await loginResponse.json(); if (!loginResponse.ok || !loginResult.success) throw new Error(loginResult.error || 'Your account was created, but the dashboard login did not complete.'); await syncAuthState(); employeeForm.reset(); await loadEmployees(); if (assignee && trackerEmployee) { assignee.value = result.employee.employee_id; trackerEmployee.value = result.employee.employee_id; } if (worklogEmployee) { worklogEmployee.value = result.employee.employee_id; } populateWorklog(); renderWorklog(); renderEmployeeDirectory(); renderTracker(); toast.textContent = `✓ Account created and logged in — Employee ID: ${result.employee.employee_id} | Username: ${payload.username} | Password: ${payload.password}`; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 5000); } catch (error) { toast.textContent = error.message || 'There was a problem creating the employee account.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); }
});
syncAuthState();
document.getElementById('taskForm').addEventListener('submit', (event) => { event.preventDefault(); const employee = employees.find((person) => person.id === assignee.value), dueInput = document.getElementById('taskDue').value; tasks.unshift({employeeId:employee.id,title:document.getElementById('taskTitle').value,priority:document.getElementById('taskPriority').value,due:new Date(`${dueInput}T00:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'}),status:'Pending'}); trackerEmployee.value = employee.id; renderTracker(); event.currentTarget.reset(); toast.textContent = `✓ Task assigned to ${employee.name}.`; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); });
document.getElementById('focusCreate').addEventListener('click', () => {
  const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
  if (!isUserAuth) {
    toast.textContent = '🔒 Authentication Required: Please sign in first to create Employee accounts.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    mainAuthDropdown?.classList.remove('hidden');
    return;
  }
  document.querySelector('.account-form').scrollIntoView({behavior:'smooth',block:'start'});
});

const workLogs = { 'NST-2024-0712':{login:'09:12 AM',breakStart:'01:04 PM',breakEnd:'01:37 PM',logout:'06:18 PM',net:'8h 33m'}, 'NST-2025-0935':{login:'09:01 AM',breakStart:'12:46 PM',breakEnd:'01:16 PM',logout:'06:06 PM',net:'8h 35m'}, 'NST-2023-0528':{login:'08:48 AM',breakStart:'01:12 PM',breakEnd:'01:55 PM',logout:'05:42 PM',net:'8h 11m'} };
const getLiveSessionSnapshot = () => {
  if (!checkedIn || !startTime) {
    return null;
  }

  const elapsedMs = Date.now() - startTime;
  return {
    login: new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    breakStart: breakSessionActive ? new Date(startTime + Math.max(0, elapsedMs / 2)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No break recorded',
    breakEnd: breakSessionActive ? 'Break still active' : 'No break recorded',
    logout: 'Session still active',
    net: formatDuration(elapsedMs),
    active: true,
  };
};
const buildDefaultWorkLog = (employeeId) => {
  const login = 'No active session';
  const breakStart = 'No active session';
  const breakEnd = 'No active session';
  const logout = 'No active session';
  const net = '00:00:00';

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
const worklogEmployee = document.getElementById('worklogEmployee'); const populateWorklog = () => { const saved = worklogEmployee.value; worklogEmployee.innerHTML = employees.map((employee) => `<option value="${employee.id}">${employee.name} · ${employee.id}</option>`).join(''); if (employees.some((employee) => employee.id === saved)) worklogEmployee.value = saved; else if (employees[0]) worklogEmployee.value = employees[0].id; else worklogEmployee.value = ''; }; const renderWorklog = () => { const employeeId = worklogEmployee.value; const liveSession = getLiveSessionSnapshot(); const log = workLogs[employeeId]; if (!employeeId) { document.getElementById('netHours').textContent = '—'; document.getElementById('workEvents').innerHTML = '<p class="no-log">No active session. Select an employee to review their work activity.</p>'; return; } if (!log && !liveSession) { ensureWorkLog(employeeId); } const currentLog = liveSession || workLogs[employeeId] || buildDefaultWorkLog(employeeId); const isNoActiveSession = currentLog.login === 'No active session' || currentLog.logout === 'No active session'; document.getElementById('netHours').textContent = isNoActiveSession ? '—' : currentLog.net; document.getElementById('workEvents').innerHTML = isNoActiveSession ? '<p class="no-log">No active session. The employee is not currently logged in or there is no active work session.</p>' : `<div class="work-event"><span><b>Logged in</b><small>Workday started</small></span><time>${currentLog.login}</time></div><div class="work-event break"><span><b>Break started</b><small>Out for a break</small></span><time>${currentLog.breakStart}</time></div><div class="work-event break"><span><b>Break ended</b><small>Returned to work</small></span><time>${currentLog.breakEnd}</time></div><div class="work-event"><span><b>Logged out</b><small>Workday completed</small></span><time>${currentLog.logout}</time></div>`; }; populateWorklog(); renderWorklog(); worklogEmployee.addEventListener('change', renderWorklog); new MutationObserver(() => { populateWorklog(); renderWorklog(); }).observe(document.getElementById('employeeList'), {childList:true});

const buildEmployeeReport = (employee) => {
  const assigned = tasks.filter((task) => task.employeeId === employee.id);
  const completed = assigned.filter((task) => task.status === 'Completed');
  const pending = assigned.filter((task) => task.status !== 'Completed');
  const liveSession = getLiveSessionSnapshot();
  const currentLog = liveSession || workLogs[employee.id] || buildDefaultWorkLog(employee.id);
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

  if (currentLog.login === 'No active login' && currentLog.logout === 'No active logout') {
    lines.push('');
    lines.push('No active employee session is available. The user has not logged in or the session has not started yet.');
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

/* Tasks & Work Reports Hub Logic */
const taskReportState = {
  isLeader: false,
  activeTab: 'tasks',
  selectedEmployee: '',
  tasks: [],
  reports: [],
  stats: {
    total_tasks: 0,
    completed_tasks: 0,
    avg_task_progress: 0,
    total_reports: 0,
    total_hours: 0,
    avg_report_completion: 0
  }
};

const populateTaskReportFilterSelect = () => {
  const filterSelect = document.getElementById('taskReportFilterEmployee');
  if (!filterSelect) return;

  const currentValue = filterSelect.value;
  filterSelect.innerHTML = '<option value="">All Employees</option>' + employees.map((emp) =>
    `<option value="${emp.id}">${emp.name} (${emp.id})</option>`
  ).join('');

  if (employees.some((emp) => emp.id === currentValue)) {
    filterSelect.value = currentValue;
  }
};

const fetchTaskReportsData = async () => {
  try {
    const params = new URLSearchParams();
    params.append('action', 'get_task_reports');
    if (taskReportState.isLeader) params.append('is_leader', '1');
    if (taskReportState.selectedEmployee) params.append('employee_id', taskReportState.selectedEmployee);

    const response = await fetch(`api.php?${params.toString()}`);
    const result = await response.json();

    if (result.success) {
      taskReportState.tasks = result.tasks || [];
      taskReportState.reports = result.reports || [];
      taskReportState.stats = result.stats || {};
    }
  } catch (err) {
    console.error('Unable to fetch task & report data:', err);
  }
  renderTaskReportsHubView();
};

const renderTaskReportsHubView = () => {
  const stats = taskReportState.stats || {};
  const kpiTaskProg = document.getElementById('kpiAvgTaskProgress');
  const kpiCompletedLabel = document.getElementById('kpiCompletedTasksLabel');
  const kpiTotalRep = document.getElementById('kpiTotalReports');
  const kpiAvgReportLabel = document.getElementById('kpiAvgReportCompletionLabel');
  const kpiHours = document.getElementById('kpiTotalHours');
  const kpiHealthLabel = document.getElementById('kpiHealthLabel');

  if (kpiTaskProg) kpiTaskProg.textContent = `${stats.avg_task_progress || 0}%`;
  if (kpiCompletedLabel) kpiCompletedLabel.textContent = `${stats.completed_tasks || 0} completed tasks`;
  if (kpiTotalRep) kpiTotalRep.textContent = String(stats.total_reports || 0);
  if (kpiAvgReportLabel) kpiAvgReportLabel.textContent = `${stats.avg_report_completion || 0}% avg completion rate`;
  if (kpiHours) kpiHours.textContent = `${stats.total_hours || 0}h`;
  if (kpiHealthLabel) kpiHealthLabel.textContent = taskReportState.isLeader ? 'Leader Vault mode active' : 'Employee submission active';

  const taskCountBadge = document.getElementById('taskCountBadge');
  const reportCountBadge = document.getElementById('reportCountBadge');
  if (taskCountBadge) taskCountBadge.textContent = String(taskReportState.tasks.length);
  if (reportCountBadge) reportCountBadge.textContent = String(taskReportState.reports.length);

  const taskListEl = document.getElementById('detailedTaskList');
  if (taskListEl) {
    if (!taskReportState.tasks.length) {
      taskListEl.innerHTML = '<p class="no-log">No detailed tasks posted yet.</p>';
    } else {
      taskListEl.innerHTML = taskReportState.tasks.map((task) => {
        const priorityClass = `priority-${(task.priority || 'Medium').toLowerCase()}`;
        const p = Math.max(0, Math.min(100, parseInt(task.progress_percent || 0, 10)));
        const empName = task.employee_name || task.employee_id || 'Employee';
        const isCompleted = p >= 100 || (task.status || '').toLowerCase() === 'completed';

        return `
          <article class="task-item-card" data-task-id="${task.id}">
            <div class="item-card-top">
              <div>
                <h4>${task.title}</h4>
                <div class="badge-row">
                  <span class="badge ${priorityClass}">${task.priority || 'Medium'} Priority</span>
                  <span class="badge leader-vault">🔒 Team Leader Only</span>
                  <span class="badge">${task.category || 'General'}</span>
                  ${isCompleted ? '<span class="badge" style="background:#eaf6da;color:#3c6929">✓ Completed</span>' : ''}
                </div>
              </div>
              <small class="item-meta">${task.created_at || 'Recently'}</small>
            </div>
            <p class="item-description">${task.description}</p>
            <div class="item-meta">
              <span>By: <b>${empName}</b> (${task.department || task.employee_id})</span>
              <span>Est. Hours: <b>${task.estimated_hours || 0}h</b></span>
            </div>
            <div class="progress-bar-wrap">
              <label>
                <span>Progress</span>
                <b>${p}% (${task.status || 'In Progress'})</b>
              </label>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${p}%"></div>
              </div>
            </div>
            <div class="inline-update-box">
              <span style="font-size: 11px; font-weight:700;">Update progress:</span>
              <input type="number" min="0" max="100" value="${p}" class="task-progress-input" data-task-id="${task.id}" />
              <select class="task-status-select small-select" data-task-id="${task.id}">
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Under Review" ${task.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                <option value="Completed" ${task.status === 'Completed' || p === 100 ? 'selected' : ''}>Completed</option>
                <option value="Blocked" ${task.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
              </select>
              <button type="button" class="secondary-btn save-task-progress-btn" data-task-id="${task.id}">Update</button>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  const reportListEl = document.getElementById('workReportList');
  if (reportListEl) {
    if (!taskReportState.reports.length) {
      reportListEl.innerHTML = '<p class="no-log">No work reports submitted yet.</p>';
    } else {
      reportListEl.innerHTML = taskReportState.reports.map((report) => {
        const empName = report.employee_name || report.employee_id || 'Employee';
        const rate = Math.max(0, Math.min(100, parseInt(report.completion_rate || 0, 10)));
        const feedback = report.leader_feedback ? report.leader_feedback : 'No leader feedback provided yet.';
        const reviewStatus = report.status || 'Pending Review';

        return `
          <article class="report-item-card" data-report-id="${report.id}">
            <div class="item-card-top">
              <div>
                <h4>${report.report_title}</h4>
                <div class="badge-row">
                  <span class="badge" style="background:#eaf6da;color:#3c6929">${reviewStatus}</span>
                  <span class="badge" style="background:#e7f1ff;color:#365d8a">${report.hours_spent || 0} hrs logged</span>
                  <span class="badge" style="background:#fef4d8;color:#8b6a10">${rate}% Completion Rate</span>
                </div>
              </div>
              <small class="item-meta">${report.submitted_at || 'Recently'}</small>
            </div>
            <div class="item-meta">
              <span>Submitted by: <b>${empName}</b> (${report.department || report.employee_id})</span>
            </div>
            <p class="item-description"><b>Summary:</b> ${report.work_summary}</p>
            ${report.deliverables ? `<p class="item-description"><b>Deliverables:</b> ${report.deliverables}</p>` : ''}
            ${report.blockers ? `<p class="item-description" style="border-color:#f8d7da;background:#fff5f5;"><b>Blockers / Issues:</b> ${report.blockers}</p>` : ''}
            
            <div class="leader-feedback-box">
              <h5>🔒 Team Leader Feedback</h5>
              <p style="margin:0 0 8px;font-size:12px;color:#394f44;">${feedback}</p>
              ${taskReportState.isLeader ? `
                <div style="display:grid;gap:6px;margin-top:8px;">
                  <textarea class="leader-feedback-input" data-report-id="${report.id}" rows="2" placeholder="Write feedback for ${empName}...">${report.leader_feedback || ''}</textarea>
                  <div style="display:flex;gap:8px;">
                    <select class="leader-status-select small-select" data-report-id="${report.id}">
                      <option value="Reviewed" ${reviewStatus === 'Reviewed' ? 'selected' : ''}>Reviewed</option>
                      <option value="Approved" ${reviewStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                      <option value="Needs Revision" ${reviewStatus === 'Needs Revision' ? 'selected' : ''}>Needs Revision</option>
                    </select>
                    <button type="button" class="secondary-btn save-leader-feedback-btn" data-report-id="${report.id}">Save Review</button>
                  </div>
                </div>
              ` : ''}
            </div>
          </article>
        `;
      }).join('');
    }
  }
};

document.getElementById('detailedTaskForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  formData.append('action', 'post_detailed_task');

  try {
    const response = await fetch('api.php', { method: 'POST', body: formData });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Failed to post detailed task.');

    form.reset();
    toast.textContent = '✓ Detailed task posted! Marked visible to Team Leader.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);

    await fetchTaskReportsData();
  } catch (err) {
    toast.textContent = err.message || 'Error posting task.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});

document.getElementById('workReportForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  formData.append('action', 'submit_work_report');

  try {
    const response = await fetch('api.php', { method: 'POST', body: formData });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Failed to submit work report.');

    form.reset();
    toast.textContent = '✓ Work report submitted successfully!';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);

    await fetchTaskReportsData();
  } catch (err) {
    toast.textContent = err.message || 'Error submitting work report.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});

document.getElementById('leaderModeToggleBtn')?.addEventListener('click', () => {
  taskReportState.isLeader = !taskReportState.isLeader;
  const toggleBtn = document.getElementById('leaderModeToggleBtn');
  const feedEyebrow = document.getElementById('feedEyebrow');
  const feedTitle = document.getElementById('feedTitle');

  if (taskReportState.isLeader) {
    toggleBtn.classList.add('active-leader');
    toggleBtn.textContent = '🔓 Team Leader View (Active)';
    if (feedEyebrow) feedEyebrow.textContent = 'TEAM LEADER VAULT (UNLOCKED)';
    if (feedTitle) feedTitle.textContent = 'All Confidential Tasks & Reports';
    toast.textContent = '🔓 Unlocked Team Leader View: Viewing all employee tasks & reports.';
  } else {
    toggleBtn.classList.remove('active-leader');
    toggleBtn.textContent = '🔒 Switch to Team Leader View';
    if (feedEyebrow) feedEyebrow.textContent = 'TEAM LEADER VAULT';
    if (feedTitle) feedTitle.textContent = 'Detailed Tasks & Reports';
    toast.textContent = '👤 Employee View Active.';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);

  fetchTaskReportsData();
});

document.getElementById('tabTasksBtn')?.addEventListener('click', () => {
  taskReportState.activeTab = 'tasks';
  document.getElementById('tabTasksBtn')?.classList.add('active');
  document.getElementById('tabReportsBtn')?.classList.remove('active');
  document.getElementById('tasksTabContent')?.classList.add('active');
  document.getElementById('reportsTabContent')?.classList.remove('active');
});

document.getElementById('tabReportsBtn')?.addEventListener('click', () => {
  taskReportState.activeTab = 'reports';
  document.getElementById('tabReportsBtn')?.classList.add('active');
  document.getElementById('tabTasksBtn')?.classList.remove('active');
  document.getElementById('reportsTabContent')?.classList.add('active');
  document.getElementById('tasksTabContent')?.classList.remove('active');
});

document.getElementById('taskReportFilterEmployee')?.addEventListener('change', (e) => {
  taskReportState.selectedEmployee = e.target.value;
  fetchTaskReportsData();
});

document.addEventListener('click', async (event) => {
  const saveProgressBtn = event.target.closest('.save-task-progress-btn');
  if (saveProgressBtn) {
    const taskId = saveProgressBtn.dataset.taskId;
    const card = saveProgressBtn.closest('.task-item-card');
    const input = card.querySelector('.task-progress-input');
    const select = card.querySelector('.task-status-select');

    const formData = new FormData();
    formData.append('action', 'update_task_progress');
    formData.append('task_id', taskId);
    formData.append('progress_percent', input.value);
    formData.append('status', select.value);

    try {
      const res = await fetch('api.php', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        toast.textContent = '✓ Task progress updated.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
        await fetchTaskReportsData();
      }
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const saveFeedbackBtn = event.target.closest('.save-leader-feedback-btn');
  if (saveFeedbackBtn) {
    const reportId = saveFeedbackBtn.dataset.reportId;
    const card = saveFeedbackBtn.closest('.report-item-card');
    const input = card.querySelector('.leader-feedback-input');
    const select = card.querySelector('.leader-status-select');

    const formData = new FormData();
    formData.append('action', 'update_leader_feedback');
    formData.append('report_id', reportId);
    formData.append('leader_feedback', input.value);
    formData.append('status', select.value);

    try {
      const res = await fetch('api.php', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        toast.textContent = '✓ Team Leader review saved.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
        await fetchTaskReportsData();
      }
    } catch (e) {
      console.error(e);
    }
  }
});

// Also hook into loadEmployees execution
const originalLoadEmployees = loadEmployees;
loadEmployees = async () => {
  await originalLoadEmployees();
  populateTaskReportFilterSelect();
  fetchTaskReportsData();
};

/* Dedicated Team Leader Portal & Authentication Logic */
const leaderPortalState = {
  isTeamLeader: false,
  leaderInfo: null,
  activeTab: 'reports',
  selectedEmployee: '',
  tasks: [],
  reports: [],
  employees: [],
};

const updateLeaderUIState = () => {
  const openModalBtn = document.getElementById('openLeaderLoginModalBtn');
  const leaderChip = document.getElementById('leaderStatusChip');
  const lockedState = document.getElementById('leaderPortalLockedState');
  const unlockedState = document.getElementById('leaderPortalUnlockedState');
  const leaderNameEl = document.getElementById('portalLeaderName');

  if (leaderPortalState.isTeamLeader) {
    if (openModalBtn) openModalBtn.style.display = 'none';
    if (leaderChip) leaderChip.style.display = 'inline-flex';
    if (lockedState) lockedState.style.display = 'none';
    if (unlockedState) unlockedState.style.display = 'block';
    if (leaderNameEl) leaderNameEl.textContent = leaderPortalState.leaderInfo?.name || 'Chief Team Leader';
  } else {
    if (openModalBtn) openModalBtn.style.display = 'inline-flex';
    if (leaderChip) leaderChip.style.display = 'none';
    if (lockedState) lockedState.style.display = 'block';
    if (unlockedState) unlockedState.style.display = 'none';
  }
};

const fetchLeaderPortalData = async () => {
  if (!leaderPortalState.isTeamLeader) return;

  try {
    const response = await fetch('api.php?action=get_leader_portal_data');
    const data = await response.json();

    if (data.success) {
      leaderPortalState.tasks = data.tasks || [];
      leaderPortalState.reports = data.reports || [];
      leaderPortalState.employees = data.employees || [];
    }
  } catch (err) {
    console.error('Error fetching leader portal data:', err);
  }

  renderLeaderPortalView();
};

const renderLeaderPortalView = () => {
  if (!leaderPortalState.isTeamLeader) return;

  const filterSelect = document.getElementById('leaderPortalFilterEmployee');
  if (filterSelect && leaderPortalState.employees.length) {
    const curVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="">All Employees</option>' + leaderPortalState.employees.map(emp =>
      `<option value="${emp.employee_id}">${emp.name} (${emp.employee_id})</option>`
    ).join('');
    filterSelect.value = curVal;
  }

  const reportsListEl = document.getElementById('leaderPortalReportsList');
  if (reportsListEl) {
    const selEmp = leaderPortalState.selectedEmployee;
    let filteredReports = leaderPortalState.reports;
    if (selEmp) {
      filteredReports = filteredReports.filter(r => r.employee_id === selEmp);
    }

    if (!filteredReports.length) {
      reportsListEl.innerHTML = '<p class="no-log">No employee work reports submitted yet.</p>';
    } else {
      reportsListEl.innerHTML = filteredReports.map((report) => {
        const empName = report.employee_name || report.employee_id || 'Employee';
        const rate = Math.max(0, Math.min(100, parseInt(report.completion_rate || 0, 10)));
        const feedback = report.leader_feedback ? report.leader_feedback : 'No feedback entered yet.';
        const reviewStatus = report.status || 'Pending Review';

        return `
          <article class="report-item-card" data-report-id="${report.id}">
            <div class="item-card-top">
              <div>
                <h4>${report.report_title}</h4>
                <div class="badge-row">
                  <span class="badge" style="background:#eaf6da;color:#3c6929">${reviewStatus}</span>
                  <span class="badge" style="background:#e7f1ff;color:#365d8a">${report.hours_spent || 0} hrs logged</span>
                  <span class="badge" style="background:#fef4d8;color:#8b6a10">${rate}% Completion Rate</span>
                </div>
              </div>
              <small class="item-meta">${report.submitted_at || 'Recently'}</small>
            </div>
            <div class="item-meta">
              <span>Submitted by: <b>${empName}</b> (${report.department || report.employee_id})</span>
            </div>
            <p class="item-description"><b>Work Summary:</b> ${report.work_summary}</p>
            ${report.deliverables ? `<p class="item-description"><b>Deliverables:</b> ${report.deliverables}</p>` : ''}
            ${report.blockers ? `<p class="item-description" style="border-color:#f8d7da;background:#fff5f5;"><b>Blockers:</b> ${report.blockers}</p>` : ''}
            
            <div class="leader-feedback-box">
              <h5>👑 Team Leader Direct Review</h5>
              <p style="margin:0 0 8px;font-size:12px;color:#394f44;">${feedback}</p>
              <div style="display:grid;gap:6px;margin-top:8px;">
                <textarea class="leader-feedback-input" data-report-id="${report.id}" rows="2" placeholder="Write official leader review...">${report.leader_feedback || ''}</textarea>
                <div style="display:flex;gap:8px;">
                  <select class="leader-status-select small-select" data-report-id="${report.id}">
                    <option value="Reviewed" ${reviewStatus === 'Reviewed' ? 'selected' : ''}>Reviewed</option>
                    <option value="Approved" ${reviewStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                    <option value="Needs Revision" ${reviewStatus === 'Needs Revision' ? 'selected' : ''}>Needs Revision</option>
                  </select>
                  <button type="button" class="secondary-btn save-leader-feedback-btn" data-report-id="${report.id}">Save Review</button>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  const messagesListEl = document.getElementById('leaderPortalMessagesList');
  if (messagesListEl) {
    if (!notes || !notes.length) {
      messagesListEl.innerHTML = '<p class="no-log">No employee messages or test notes found.</p>';
    } else {
      messagesListEl.innerHTML = notes.map((note) => {
        return `
          <article class="message-card">
            <div class="item-card-top">
              <div>
                <span class="tag ${note.category}">${note.category}</span>
                <h4 style="margin:6px 0 2px;">${note.title}</h4>
              </div>
              <small class="item-meta">${note.createdDate || note.date || 'Today'}</small>
            </div>
            <p class="item-description">${note.summary}</p>
            <div class="item-meta">
              <span>Author: <b>${note.author || 'Employee'}</b> (${note.department || 'General'})</span>
              <span>Reads: <b>${note.reads || 1} team members</b></span>
            </div>
          </article>
        `;
      }).join('');
    }
  }
};

const leaderLoginModal = document.getElementById('leaderLoginModal');
document.getElementById('openLeaderLoginModalBtn')?.addEventListener('click', () => {
  leaderLoginModal?.classList.add('show');
});
document.getElementById('authShellLeaderLoginBtn')?.addEventListener('click', () => {
  leaderLoginModal?.classList.add('show');
});
document.getElementById('portalPromptLoginBtn')?.addEventListener('click', () => {
  leaderLoginModal?.classList.add('show');
});
document.getElementById('closeLeaderModal')?.addEventListener('click', () => {
  leaderLoginModal?.classList.remove('show');
});
leaderLoginModal?.addEventListener('click', (e) => {
  if (e.target === leaderLoginModal) leaderLoginModal.classList.remove('show');
});

document.getElementById('leaderLoginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  formData.append('action', 'leader_login');

  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid Team Leader login credentials.');
    }

    leaderPortalState.isTeamLeader = true;
    leaderPortalState.leaderInfo = data.leader;
    updateLeaderUIState();
    leaderLoginModal?.classList.remove('show');

    if (isLoginPage) {
      window.location.href = 'index.php';
      return;
    }

    toast.textContent = '👑 Signed in successfully as Team Leader!';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);

    fetchLeaderPortalData();
  } catch (err) {
    toast.textContent = err.message || 'Login failed.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});

const createLeaderModal = document.getElementById('createLeaderModal');
document.getElementById('openCreateLeaderModalBtn')?.addEventListener('click', () => {
  createLeaderModal?.classList.add('show');
});
document.getElementById('authShellCreateLeaderBtn')?.addEventListener('click', () => {
  createLeaderModal?.classList.add('show');
});
document.getElementById('closeCreateLeaderModal')?.addEventListener('click', () => {
  createLeaderModal?.classList.remove('show');
});
createLeaderModal?.addEventListener('click', (e) => {
  if (e.target === createLeaderModal) createLeaderModal.classList.remove('show');
});

document.getElementById('createLeaderForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  formData.append('action', 'create_team_leader');

  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to create Team Leader account.');
    }

    createLeaderModal?.classList.remove('show');
    form.reset();

    if (isLoginPage) {
      window.location.href = 'index.php';
      return;
    }

    toast.textContent = `👑 Leader account created! Leader ID: ${data.leader.leader_id}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);

    const leaderLoginForm = document.getElementById('leaderLoginForm');
    if (leaderLoginForm) {
      const usernameInput = leaderLoginForm.querySelector('input[name="username"]');
      if (usernameInput) usernameInput.value = data.leader.username;
    }
    leaderLoginModal?.classList.add('show');
  } catch (err) {
    toast.textContent = err.message || 'Registration failed.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
});

const handleLeaderSignOut = async () => {
  try {
    const formData = new FormData();
    formData.append('action', 'leader_logout');
    await fetch('api.php', { method: 'POST', body: formData });
  } catch (e) {
    console.error(e);
  }

  leaderPortalState.isTeamLeader = false;
  leaderPortalState.leaderInfo = null;
  updateLeaderUIState();
  redirectToLogin();

  toast.textContent = '🚪 Team Leader signed out.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

document.getElementById('headerLeaderSignOutBtn')?.addEventListener('click', handleLeaderSignOut);
document.getElementById('portalLeaderSignOutBtn')?.addEventListener('click', handleLeaderSignOut);

document.getElementById('leaderTabReportsBtn')?.addEventListener('click', () => {
  document.getElementById('leaderTabReportsBtn')?.classList.add('active');
  document.getElementById('leaderTabMessagesBtn')?.classList.remove('active');
  document.getElementById('leaderReportsTabContent')?.classList.add('active');
  document.getElementById('leaderMessagesTabContent')?.classList.remove('active');
});

document.getElementById('leaderTabMessagesBtn')?.addEventListener('click', () => {
  document.getElementById('leaderTabMessagesBtn')?.classList.add('active');
  document.getElementById('leaderTabReportsBtn')?.classList.remove('active');
  document.getElementById('leaderMessagesTabContent')?.classList.add('active');
  document.getElementById('leaderReportsTabContent')?.classList.remove('active');
});

document.getElementById('leaderPortalFilterEmployee')?.addEventListener('change', (e) => {
  leaderPortalState.selectedEmployee = e.target.value;
  renderLeaderPortalView();
});

const checkAuthStatus = async () => {
  try {
    const res = await fetch('api.php?action=status');
    const data = await res.json();
    updateUserSessionUI(data);

    if (data.isTeamLeader) {
      leaderPortalState.isTeamLeader = true;
      leaderPortalState.leaderInfo = data.leader;
      updateLeaderUIState();
      fetchLeaderPortalData();
    }
  } catch (e) {
    console.error('Auth status check error:', e);
  }
};

const humorousQuotes = [
  { icon: '☕', text: '"Unlocking your workspace... Please ensure your coffee cup is at least half full."' },
  { icon: '🚀', text: '"Procrastination mode: OFF. Productivity mode: LOADING..."' },
  { icon: '⏳', text: '"Calculating your chances of finishing today\'s to-do list before 5 PM..."' },
  { icon: '⭐', text: '"Connecting to Northstar Pulse... (No actual stars were harmed in this process)"' },
  { icon: '🧠', text: '"Powering up workspace neurons... Brain cell count: optimal!"' }
];

const motivationalQuotes = [
  '"Great things in business are never done by one person. They\'re done by a team of people." — Let\'s conquer today\'s goals together!',
  '"Success is not final, failure is not fatal: it is the courage to continue that counts." — You\'ve got this!',
  '"Work hard, stay humble, and make every single step count today." — Have an extraordinary day!',
  '"Productivity is being able to do things that you were never able to do before." — Ready to make an impact!',
  '"Your dedication and teamwork move Northstar forward every single day. Let\'s build great things!"'
];

let humorQuoteIndex = 0;
const rotateHumorQuote = () => {
  const quoteBoxText = document.getElementById('authHumorText');
  const quoteBoxIcon = document.querySelector('.humor-quote-box .humor-icon');
  if (quoteBoxText && quoteBoxIcon) {
    humorQuoteIndex = (humorQuoteIndex + 1) % humorousQuotes.length;
    quoteBoxIcon.textContent = humorousQuotes[humorQuoteIndex].icon;
    quoteBoxText.textContent = humorousQuotes[humorQuoteIndex].text;
  }
};
setInterval(rotateHumorQuote, 5500);

let currentSessionData = null;

const handleEmployeeSignOut = async () => {
  try {
    const formData = new FormData();
    formData.append('action', 'logout');
    await fetch('api.php', { method: 'POST', body: formData });
  } catch (e) {
    console.error(e);
  }
  await checkAuthStatus();
  redirectToLogin();
  toast.textContent = '🚪 Signed out of employee account.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

// Unified Single Header Auth Button & Dropdown Logic
const mainAuthBtn = document.getElementById('mainAuthBtn');
const mainAuthDropdown = document.getElementById('mainAuthDropdown');

mainAuthBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  mainAuthDropdown?.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-auth-controls')) {
    mainAuthDropdown?.classList.add('hidden');
  }
});

// Mode Selector Tabs (Employee vs Team Leader)
const tabEmployeeMode = document.getElementById('tabEmployeeMode');
const tabLeaderMode = document.getElementById('tabLeaderMode');
const sectionEmployeeAuth = document.getElementById('sectionEmployeeAuth');
const sectionLeaderAuth = document.getElementById('sectionLeaderAuth');

tabEmployeeMode?.addEventListener('click', () => {
  tabEmployeeMode.classList.add('active');
  tabEmployeeMode.style.background = '#172a37';
  tabEmployeeMode.style.color = '#c9fa6a';

  tabLeaderMode.classList.remove('active');
  tabLeaderMode.style.background = 'transparent';
  tabLeaderMode.style.color = '#556';

  sectionEmployeeAuth?.classList.remove('hidden');
  sectionLeaderAuth?.classList.add('hidden');
});

tabLeaderMode?.addEventListener('click', () => {
  tabLeaderMode.classList.add('active');
  tabLeaderMode.style.background = '#172a37';
  tabLeaderMode.style.color = '#c9fa6a';

  tabEmployeeMode.classList.remove('active');
  tabEmployeeMode.style.background = 'transparent';
  tabEmployeeMode.style.color = '#556';

  sectionLeaderAuth?.classList.remove('hidden');
  sectionEmployeeAuth?.classList.add('hidden');
});

// Sub-Tab Toggles for Employee Forms
const subTabEmpLogin = document.getElementById('subTabEmpLogin');
const subTabEmpRegister = document.getElementById('subTabEmpRegister');
const formEmpSignIn = document.getElementById('formEmpSignIn');
const formEmpRegister = document.getElementById('formEmpRegister');

subTabEmpLogin?.addEventListener('click', () => {
  subTabEmpLogin.style.textDecoration = 'underline';
  subTabEmpLogin.style.color = '#172a37';
  subTabEmpRegister.style.textDecoration = 'none';
  subTabEmpRegister.style.color = '#778';

  formEmpSignIn?.classList.remove('hidden');
  formEmpRegister?.classList.add('hidden');
});

subTabEmpRegister?.addEventListener('click', () => {
  subTabEmpRegister.style.textDecoration = 'underline';
  subTabEmpRegister.style.color = '#172a37';
  subTabEmpLogin.style.textDecoration = 'none';
  subTabEmpLogin.style.color = '#778';

  formEmpRegister?.classList.remove('hidden');
  formEmpSignIn?.classList.add('hidden');
});

// Sub-Tab Toggles for Team Leader Forms
const subTabLdrLogin = document.getElementById('subTabLdrLogin');
const subTabLdrRegister = document.getElementById('subTabLdrRegister');
const formLeaderSignIn = document.getElementById('formLeaderSignIn');
const formSecureLeaderRegister = document.getElementById('formSecureLeaderRegister');

subTabLdrLogin?.addEventListener('click', () => {
  subTabLdrLogin.style.textDecoration = 'underline';
  subTabLdrLogin.style.color = '#172a37';
  subTabLdrRegister.style.textDecoration = 'none';
  subTabLdrRegister.style.color = '#778';

  formLeaderSignIn?.classList.remove('hidden');
  formSecureLeaderRegister?.classList.add('hidden');
});

subTabLdrRegister?.addEventListener('click', () => {
  subTabLdrRegister.style.textDecoration = 'underline';
  subTabLdrRegister.style.color = '#172a37';
  subTabLdrLogin.style.textDecoration = 'none';
  subTabLdrLogin.style.color = '#778';

  formSecureLeaderRegister?.classList.remove('hidden');
  formLeaderSignIn?.classList.add('hidden');
});

// Real-Time High-Security Password Protocol Validation for Team Leader Creation
const leaderSecPass = document.getElementById('leaderSecPass');
const leaderSecPassConfirm = document.getElementById('leaderSecPassConfirm');
const leaderPassHint = document.getElementById('leaderPassHint');

const validateLeaderPassword = () => {
  if (!leaderSecPass || !leaderPassHint) return true;
  const val = leaderSecPass.value;
  const confirmVal = leaderSecPassConfirm?.value || '';

  const hasLength = val.length >= 8;
  const hasUpper = /[A-Z]/.test(val);
  const hasNum = /[0-9]/.test(val);
  const hasSpecial = /[@$!%*?&#^*-]/.test(val);
  const matches = val === confirmVal;

  if (hasLength && hasUpper && hasNum && hasSpecial && matches) {
    leaderPassHint.textContent = '✅ Security Protocol Satisfied: Strong Password Verified.';
    leaderPassHint.style.color = '#27ae60';
    return true;
  } else if (!matches && confirmVal.length > 0) {
    leaderPassHint.textContent = '❌ Passwords do not match!';
    leaderPassHint.style.color = '#e74c3c';
    return false;
  } else {
    leaderPassHint.textContent = '⚠️ Require: 8+ chars, 1 Uppercase, 1 Number, 1 Special (@$!%*?&#^*-)';
    leaderPassHint.style.color = '#e74c3c';
    return false;
  }
};

leaderSecPass?.addEventListener('input', validateLeaderPassword);
leaderSecPassConfirm?.addEventListener('input', validateLeaderPassword);

// Form Submit Handlers
formEmpSignIn?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.append('action', 'login');
  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');
    toast.textContent = `👤 Welcome back, ${data.employee.name}!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    mainAuthDropdown?.classList.add('hidden');
    await checkAuthStatus();
  } catch (err) {
    toast.textContent = err.message || 'Login failed';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});

formEmpRegister?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.append('action', 'register');
  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Registration failed');
    toast.textContent = `👤 Account created for ${data.employee.name}! Sign in to proceed.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
    mainAuthDropdown?.classList.add('hidden');
    await checkAuthStatus();
  } catch (err) {
    toast.textContent = err.message || 'Registration failed';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});

formLeaderSignIn?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.append('action', 'leader_login');
  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Leader login failed');
    toast.textContent = `👑 Welcome back, Team Leader ${data.leader.name}!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    mainAuthDropdown?.classList.add('hidden');
    await checkAuthStatus();
  } catch (err) {
    toast.textContent = err.message || 'Leader login failed';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});

formSecureLeaderRegister?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateLeaderPassword()) {
    toast.textContent = '⚠️ Please fulfill all high-security password requirements.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
    return;
  }

  const formData = new FormData(e.currentTarget);
  formData.append('action', 'create_team_leader');
  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Leader creation failed');
    toast.textContent = `🛡️ Created Team Leader ID: ${data.leader.leader_id}! Signed in securely.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
    mainAuthDropdown?.classList.add('hidden');
    await checkAuthStatus();
  } catch (err) {
    toast.textContent = err.message || 'Leader registration failed';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});

// Single Main Auth Sign Out Handler
document.getElementById('mainSignOutBtn')?.addEventListener('click', async () => {
  try {
    const fd1 = new FormData(); fd1.append('action', 'logout');
    await fetch('api.php', { method: 'POST', body: fd1 });
    const fd2 = new FormData(); fd2.append('action', 'leader_logout');
    await fetch('api.php', { method: 'POST', body: fd2 });
  } catch (e) {
    console.error(e);
  }
  toast.textContent = '🚪 Signed out successfully.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
  mainAuthDropdown?.classList.add('hidden');
  await checkAuthStatus();
});

const updateUserSessionUI = (data) => {
  currentSessionData = data;
  const authShell = document.getElementById('authShell');
  const appShell = document.getElementById('appShell');
  const userNameEl = document.getElementById('userName');
  const userDeptEl = document.getElementById('userDepartment');
  const userAvatarEl = document.getElementById('userAvatar');

  const welcomeTitle = document.getElementById('motivationalWelcomeTitle');
  const welcomeQuote = document.getElementById('motivationalWelcomeQuote');

  const mainAuthBtn = document.getElementById('mainAuthBtn');
  const mainLoggedInBanner = document.getElementById('mainLoggedInBanner');
  const mainLoggedOutInterface = document.getElementById('mainLoggedOutInterface');
  const mainSessionBadge = document.getElementById('mainSessionBadge');
  const mainSessionName = document.getElementById('mainSessionName');
  const mainSessionRole = document.getElementById('mainSessionRole');

  const isUserAuthenticated = Boolean(data?.loggedIn || data?.isTeamLeader);

  if (authShell) authShell.classList.toggle('hidden', isUserAuthenticated);
  if (appShell) appShell.classList.toggle('hidden', !isUserAuthenticated);

  let activeName = '';
  let activeRole = '';

  if (data?.loggedIn && data?.employee) {
    const emp = data.employee;
    activeName = emp.name || emp.employee_id;
    activeRole = emp.department || 'Employee';

    if (userNameEl) userNameEl.textContent = activeName;
    if (userDeptEl) userDeptEl.textContent = `${activeRole} • ${emp.employee_id}`;
    if (userAvatarEl) {
      const initials = activeName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      userAvatarEl.textContent = initials || 'EM';
    }

    if (mainAuthBtn) {
      mainAuthBtn.textContent = `🚪 Sign Out (${activeName})`;
      mainAuthBtn.style.background = '#eef6ec';
      mainAuthBtn.style.color = '#2f5d34';
      mainAuthBtn.style.borderColor = '#cce4ca';
    }

    if (mainLoggedOutInterface) mainLoggedOutInterface.classList.add('hidden');
    if (mainLoggedInBanner) mainLoggedInBanner.classList.remove('hidden');
    if (mainSessionName) mainSessionName.textContent = activeName;
    if (mainSessionRole) mainSessionRole.textContent = `${activeRole} • ${emp.employee_id}`;
    if (mainSessionBadge) mainSessionBadge.textContent = '👤 EMPLOYEE SIGNED IN';
  } else if (data?.isTeamLeader && data?.leader) {
    const ldr = data.leader;
    activeName = ldr.name || 'Team Leader';
    activeRole = `${ldr.department || 'Executive Management'} (Team Leader)`;

    if (userNameEl) userNameEl.textContent = activeName;
    if (userDeptEl) userDeptEl.textContent = `${ldr.department || 'Executive Management'} • ${ldr.username}`;
    if (userAvatarEl) userAvatarEl.textContent = '👑';

    if (mainAuthBtn) {
      mainAuthBtn.textContent = `🚪 Sign Out (${ldr.name})`;
      mainAuthBtn.style.background = '#172a37';
      mainAuthBtn.style.color = '#c9fa6a';
      mainAuthBtn.style.borderColor = '#172a37';
    }

    if (mainLoggedOutInterface) mainLoggedOutInterface.classList.add('hidden');
    if (mainLoggedInBanner) mainLoggedInBanner.classList.remove('hidden');
    if (mainSessionName) mainSessionName.textContent = ldr.name;
    if (mainSessionRole) mainSessionRole.textContent = `${ldr.department || 'Executive Management'} • ${ldr.leader_id || ldr.username}`;
    if (mainSessionBadge) mainSessionBadge.textContent = '👑 LEADER SIGNED IN';
  } else {
    if (mainAuthBtn) {
      mainAuthBtn.textContent = '🔑 Sign In / Sign Up';
      mainAuthBtn.style.background = '';
      mainAuthBtn.style.color = '';
      mainAuthBtn.style.borderColor = '';
    }

    if (mainLoggedOutInterface) mainLoggedOutInterface.classList.remove('hidden');
    if (mainLoggedInBanner) mainLoggedInBanner.classList.add('hidden');
  }

  // Populate Post-Login Personal Welcome Banner
  const welcomeCard = document.getElementById('welcomeMotivationalCard');
  if (isUserAuthenticated) {
    if (welcomeCard) welcomeCard.classList.remove('hidden');
    if (welcomeTitle) {
      const displayName = activeName || (data?.isTeamLeader ? data.leader?.name : 'Team Member');
      welcomeTitle.textContent = `Welcome back, ${displayName}! 👋`;
    }
    if (welcomeQuote) {
      welcomeQuote.textContent = `"The secret of getting ahead is getting started." — Let's conquer today's goals together!`;
    }
  } else {
    if (welcomeCard) welcomeCard.classList.add('hidden');
  }

  // Show/hide sidebar user profile card
  const userProfileCard = document.getElementById('userProfileCard');
  if (isUserAuthenticated) {
    if (userProfileCard) userProfileCard.classList.remove('hidden');
  } else {
    if (userProfileCard) userProfileCard.classList.add('hidden');
  }

  if (!isUserAuthenticated) {
    if (userAvatarEl) userAvatarEl.textContent = '--';

    // Reset Check-In session & timer on logout
    sessionState.checkedIn = false;
    sessionState.startTime = null;
    sessionState.breakSessionActive = false;
    setCheckInState('not-marked');
    if (time) time.textContent = '00:00:00';
    if (fill) fill.style.width = '0%';
  }
};

// Employee Sign In Modal Handlers
const employeeLoginModal = document.getElementById('employeeLoginModal');
document.getElementById('openEmployeeLoginModalBtn')?.addEventListener('click', () => {
  employeeLoginModal?.classList.add('show');
});
document.getElementById('closeEmployeeModal')?.addEventListener('click', () => {
  employeeLoginModal?.classList.remove('show');
});
employeeLoginModal?.addEventListener('click', (e) => {
  if (e.target === employeeLoginModal) employeeLoginModal.classList.remove('show');
});

document.getElementById('employeeLoginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  formData.append('action', 'login');

  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid employee credentials.');
    }

    employeeLoginModal?.classList.remove('show');
    toast.textContent = `👤 Welcome back, ${data.employee.name}!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);

    checkAuthStatus();
    fetchTaskReportsData();
  } catch (err) {
    toast.textContent = err.message || 'Login failed.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});

// Employee Sign Out Handler
document.getElementById('headerEmployeeSignOutBtn')?.addEventListener('click', async () => {
  try {
    const formData = new FormData();
    formData.append('action', 'logout');
    await fetch('api.php', { method: 'POST', body: formData });
  } catch (e) {
    console.error(e);
  }

  toast.textContent = '👋 Signed out as Employee.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
  checkAuthStatus();
});

// Subtab toggling for Employee / Leader creation in Company Directory
document.getElementById('tabCreateEmployeeBtn')?.addEventListener('click', () => {
  const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
  if (!isUserAuth) {
    toast.textContent = '🔒 Authentication Required: Please sign in first to create Employee accounts.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    mainAuthDropdown?.classList.remove('hidden');
    return;
  }

  document.getElementById('tabCreateEmployeeBtn')?.classList.add('active');
  document.getElementById('tabCreateLeaderBtn')?.classList.remove('active');
  const empSec = document.getElementById('createEmployeeSection');
  const ldrSec = document.getElementById('createLeaderSection');
  if (empSec) empSec.style.display = 'block';
  if (ldrSec) ldrSec.style.display = 'none';
});

document.getElementById('tabCreateLeaderBtn')?.addEventListener('click', () => {
  const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
  if (!isUserAuth) {
    toast.textContent = '🔒 Authentication Required: Please sign in first to create Team Leader accounts.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    mainAuthDropdown?.classList.remove('hidden');
    return;
  }

  document.getElementById('tabCreateLeaderBtn')?.classList.add('active');
  document.getElementById('tabCreateEmployeeBtn')?.classList.remove('active');
  const empSec = document.getElementById('createEmployeeSection');
  const ldrSec = document.getElementById('createLeaderSection');
  if (empSec) empSec.style.display = 'none';
  if (ldrSec) ldrSec.style.display = 'block';
});

// Create Team Leader Form Submission
document.getElementById('teamLeaderForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const isUserAuth = Boolean(currentSessionData?.loggedIn || currentSessionData?.isTeamLeader);
  if (!isUserAuth) {
    toast.textContent = '🔒 Authentication Required: Please sign in first to create Team Leader accounts.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    mainAuthDropdown?.classList.remove('hidden');
    return;
  }

  const form = e.currentTarget;
  const formData = new FormData(form);

  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    toast.textContent = 'Passwords do not match.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
    return;
  }

  formData.append('action', 'create_team_leader');

  try {
    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to create Team Leader account.');
    }

    const issuedCard = document.getElementById('issuedLeaderCredentials');
    const infoEl = document.getElementById('issuedLeaderInfo');
    const noteEl = document.getElementById('issuedLeaderNote');

    if (issuedCard) issuedCard.hidden = false;
    if (infoEl) infoEl.textContent = `Leader ID: ${data.leader.leader_id} | Username: ${data.leader.username}`;
    if (noteEl) noteEl.textContent = `Team Leader ${data.leader.name} created successfully. Role: ${data.leader.department}.`;

    form.reset();
    toast.textContent = `👑 Team Leader account created! ID: ${data.leader.leader_id}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  } catch (err) {
    toast.textContent = err.message || 'Creation failed.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});

// Run session status check on load
checkAuthStatus();




