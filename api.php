<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';

$publicActions = [
    'status',
    'login',
    'leader_login',
    'create_team_leader',
    'logout',
    'logout_all',
    'leader_logout',
    'register',
    'signup',
    'create_employee',
];

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$requestedAction = $method === 'POST' ? (string) ($_POST['action'] ?? '') : (string) ($_GET['action'] ?? '');
$hasActiveSession = !empty($_SESSION['employee_id']) || !empty($_SESSION['is_team_leader']);

if ($requestedAction !== '' && !in_array($requestedAction, $publicActions, true) && !$hasActiveSession) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Authentication required. Please sign in to continue.'], JSON_PRETTY_PRINT);
    exit;
}

if ($requestedAction === '' && !$hasActiveSession && $method === 'GET') {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Authentication required. Please sign in to continue.'], JSON_PRETTY_PRINT);
    exit;
}

try {

    if ($method === 'GET') {
        $action = $_GET['action'] ?? 'employees';

        if ($action === 'status') {
            $employee = null;
            if (!empty($_SESSION['employee_id'])) {
                $employee = [
                    'employee_id' => $_SESSION['employee_id'],
                    'name' => $_SESSION['employee_name'] ?? '',
                    'department' => $_SESSION['employee_department'] ?? '',
                    'email' => $_SESSION['employee_email'] ?? '',
                ];
            }

            $isTeamLeader = !empty($_SESSION['is_team_leader']);
            $leader = $isTeamLeader ? [
                'leader_id' => $_SESSION['leader_id'] ?? 'TL-2026-0001',
                'username' => $_SESSION['leader_username'] ?? 'leader',
                'name' => $_SESSION['leader_name'] ?? 'Chief Team Leader',
                'role' => 'Team Leader',
                'department' => $_SESSION['leader_department'] ?? 'Executive Management',
            ] : null;

            $hasEmployee = !empty($_SESSION['employee_id']);
            $loggedIn = $hasEmployee || $isTeamLeader;

            echo json_encode([
                'loggedIn' => $loggedIn,
                'hasEmployee' => $hasEmployee,
                'employee' => $employee,
                'isTeamLeader' => $isTeamLeader,
                'leader' => $leader,
            ], JSON_PRETTY_PRINT);
            exit;
        }

        if ($action === 'get_leader_portal_data') {
            if (empty($_SESSION['is_team_leader'])) {
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'Team Leader authentication required.'], JSON_PRETTY_PRINT);
                exit;
            }

            $tasks = fetchDetailedTasks(null, true);
            $reports = fetchWorkReports(null, true);
            $employees = fetchEmployees();

            echo json_encode([
                'success' => true,
                'tasks' => $tasks,
                'reports' => $reports,
                'employees' => $employees,
            ], JSON_PRETTY_PRINT);
            exit;
        }

        if ($action === 'get_task_reports') {
            $employeeId = $_GET['employee_id'] ?? ($_SESSION['employee_id'] ?? null);
            $isLeader = !empty($_GET['is_leader']) || !empty($_SESSION['is_leader']);

            $tasks = fetchDetailedTasks($employeeId, $isLeader);
            $reports = fetchWorkReports($employeeId, $isLeader);

            // Compute overall tracking statistics
            $totalTasks = count($tasks);
            $completedTasks = 0;
            $totalProgress = 0;
            foreach ($tasks as $t) {
                $p = (int) ($t['progress_percent'] ?? 0);
                $totalProgress += $p;
                if ($p >= 100 || strtolower($t['status'] ?? '') === 'completed') {
                    $completedTasks++;
                }
            }
            $avgTaskProgress = $totalTasks > 0 ? round($totalProgress / $totalTasks) : 0;

            $totalReports = count($reports);
            $totalHours = 0.0;
            $totalReportCompletion = 0;
            foreach ($reports as $r) {
                $totalHours += (float) ($r['hours_spent'] ?? 0);
                $totalReportCompletion += (int) ($r['completion_rate'] ?? 0);
            }
            $avgReportCompletion = $totalReports > 0 ? round($totalReportCompletion / $totalReports) : 0;

            echo json_encode([
                'success' => true,
                'tasks' => $tasks,
                'reports' => $reports,
                'stats' => [
                    'total_tasks' => $totalTasks,
                    'completed_tasks' => $completedTasks,
                    'avg_task_progress' => $avgTaskProgress,
                    'total_reports' => $totalReports,
                    'total_hours' => round($totalHours, 2),
                    'avg_report_completion' => $avgReportCompletion,
                ]
            ], JSON_PRETTY_PRINT);
            exit;
        }

        echo json_encode(['employees' => fetchEmployees()], JSON_PRETTY_PRINT);
        exit;
    }

    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    $action = $_POST['action'] ?? '';

    if ($action === 'post_detailed_task') {
        $employeeId = trim((string) ($_POST['employee_id'] ?? ($_SESSION['employee_id'] ?? '')));
        $title = trim((string) ($_POST['title'] ?? ''));
        $description = trim((string) ($_POST['description'] ?? ''));
        $priority = trim((string) ($_POST['priority'] ?? 'Medium'));
        $category = trim((string) ($_POST['category'] ?? 'General'));
        $estimatedHours = (float) ($_POST['estimated_hours'] ?? 0.0);
        $progressPercent = (int) ($_POST['progress_percent'] ?? 0);
        $status = trim((string) ($_POST['status'] ?? 'In Progress'));
        $visibleToLeaderOnly = isset($_POST['visible_to_leader_only']) ? (int) $_POST['visible_to_leader_only'] : 1;

        $task = insertDetailedTask([
            'employee_id' => $employeeId,
            'title' => $title,
            'description' => $description,
            'priority' => $priority,
            'category' => $category,
            'estimated_hours' => $estimatedHours,
            'progress_percent' => $progressPercent,
            'status' => $status,
            'visible_to_leader_only' => $visibleToLeaderOnly,
        ]);

        echo json_encode(['success' => true, 'task' => $task], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'submit_work_report') {
        $employeeId = trim((string) ($_POST['employee_id'] ?? ($_SESSION['employee_id'] ?? '')));
        $reportTitle = trim((string) ($_POST['report_title'] ?? ''));
        $workSummary = trim((string) ($_POST['work_summary'] ?? ''));
        $deliverables = trim((string) ($_POST['deliverables'] ?? ''));
        $blockers = trim((string) ($_POST['blockers'] ?? ''));
        $hoursSpent = (float) ($_POST['hours_spent'] ?? 0.0);
        $completionRate = (int) ($_POST['completion_rate'] ?? 0);

        $report = insertWorkReport([
            'employee_id' => $employeeId,
            'report_title' => $reportTitle,
            'work_summary' => $workSummary,
            'deliverables' => $deliverables,
            'blockers' => $blockers,
            'hours_spent' => $hoursSpent,
            'completion_rate' => $completionRate,
        ]);

        echo json_encode(['success' => true, 'report' => $report], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'update_task_progress') {
        $taskId = (int) ($_POST['task_id'] ?? 0);
        $progressPercent = (int) ($_POST['progress_percent'] ?? 0);
        $status = trim((string) ($_POST['status'] ?? 'In Progress'));

        if ($taskId <= 0) {
            throw new InvalidArgumentException('Invalid task ID.');
        }

        $result = updateTaskProgress($taskId, $progressPercent, $status);
        echo json_encode(['success' => (bool) $result], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'update_leader_feedback') {
        $reportId = (int) ($_POST['report_id'] ?? 0);
        $feedback = trim((string) ($_POST['leader_feedback'] ?? ''));
        $status = trim((string) ($_POST['status'] ?? 'Reviewed'));

        if ($reportId <= 0 || $feedback === '') {
            throw new InvalidArgumentException('Report ID and leader feedback are required.');
        }

        $result = updateReportLeaderFeedback($reportId, $feedback, $status);
        echo json_encode(['success' => (bool) $result], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'leader_login') {
        $username = strtolower(trim((string) ($_POST['username'] ?? '')));
        $password = (string) ($_POST['password'] ?? '');

        $leader = authenticateTeamLeader($username, $password);
        if (!$leader) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Invalid Team Leader credentials. (Demo: leader / leader123)']);
            exit;
        }

        $_SESSION['is_team_leader'] = true;
        $_SESSION['leader_id'] = $leader['leader_id'] ?? 'TL-2026-0001';
        $_SESSION['leader_username'] = $leader['username'];
        $_SESSION['leader_name'] = $leader['name'];
        $_SESSION['leader_department'] = $leader['department'] ?? 'Executive Management';

        echo json_encode(['success' => true, 'leader' => $leader], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'create_team_leader') {
        $secKey = strtoupper(trim((string) ($_POST['sec_key'] ?? $_POST['secKey'] ?? '')));
        $firstName = trim((string) ($_POST['first_name'] ?? $_POST['firstName'] ?? ''));
        $lastName = trim((string) ($_POST['last_name'] ?? $_POST['lastName'] ?? ''));
        $email = strtolower(trim((string) ($_POST['email'] ?? '')));
        $department = trim((string) ($_POST['department'] ?? 'Executive Management'));
        $teamSize = trim((string) ($_POST['team_size'] ?? $_POST['teamSize'] ?? '1-5 Members'));
        $username = strtolower(trim((string) ($_POST['username'] ?? '')));
        $password = (string) ($_POST['password'] ?? '');

        // Security key verification (accepts NORTHSTAR-LEADER-2026 or empty)
        if ($secKey !== '' && $secKey !== 'NORTHSTAR-LEADER-2026' && $secKey !== 'NORTHSTAR') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid Organization Security Key (use: NORTHSTAR-LEADER-2026).'], JSON_PRETTY_PRINT);
            exit;
        }

        if (strlen($password) < 4) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Password must be at least 4 characters long.'], JSON_PRETTY_PRINT);
            exit;
        }

        $leader = insertTeamLeader([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'department' => $department,
            'username' => $username,
            'password' => $password,
        ]);

        $_SESSION['is_team_leader'] = true;
        $_SESSION['leader_id'] = $leader['leader_id'];
        $_SESSION['leader_username'] = $leader['username'];
        $_SESSION['leader_name'] = $leader['name'];
        $_SESSION['leader_department'] = $leader['department'];

        echo json_encode(['success' => true, 'leader' => $leader], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'leader_logout') {
        session_unset();
        session_destroy();
        echo json_encode(['success' => true], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'login') {
        $username = strtolower(trim((string) ($_POST['username'] ?? '')));
        $password = (string) ($_POST['password'] ?? '');

        $employee = authenticateEmployee($username, $password);
        if (!$employee) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Invalid username or password. (Demo: employee123 / employee123)']);
            exit;
        }

        $_SESSION['employee_id'] = $employee['employee_id'];
        $_SESSION['employee_name'] = $employee['name'];
        $_SESSION['employee_department'] = $employee['department'];
        $_SESSION['employee_email'] = $employee['email'];

        echo json_encode(['success' => true, 'employee' => $employee], JSON_PRETTY_PRINT);
        exit;
    }

    if ($action === 'logout' || $action === 'logout_all') {
        session_unset();
        session_destroy();
        echo json_encode(['success' => true], JSON_PRETTY_PRINT);
        exit;
    }

    // Handle Employee Registration (action === 'register', 'signup', 'create_employee', or default POST)
    $photoPath = null;

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] !== UPLOAD_ERR_NO_FILE) {
        $photoPath = saveUploadedPhoto($_FILES['photo']);
    }

    $employee = insertEmployee([
        'first_name' => $_POST['firstName'] ?? $_POST['first_name'] ?? '',
        'last_name' => $_POST['lastName'] ?? $_POST['last_name'] ?? '',
        'email' => $_POST['email'] ?? '',
        'department' => $_POST['department'] ?? 'Product Design',
        'start_date' => $_POST['startDate'] ?? $_POST['start_date'] ?? date('Y-m-d'),
        'username' => $_POST['username'] ?? '',
        'password' => $_POST['password'] ?? '',
        'photo_path' => $photoPath,
    ]);

    $password = (string) ($_POST['password'] ?? '');
    $emailSent = sendEmployeeCredentialsEmail(
        $employee['email'],
        $employee['name'],
        $employee['username'],
        $password,
        $employee['department']
    );

    $_SESSION['employee_id'] = $employee['employee_id'];
    $_SESSION['employee_name'] = $employee['name'];
    $_SESSION['employee_department'] = $employee['department'];
    $_SESSION['employee_email'] = $employee['email'];

    echo json_encode(['success' => true, 'employee' => $employee, 'email_sent' => $emailSent], JSON_PRETTY_PRINT);
} catch (Throwable $exception) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $exception->getMessage()]);
}
