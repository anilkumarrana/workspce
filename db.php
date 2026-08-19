<?php

function getDatabaseConnection()
{
    $mysql = @mysqli_connect('127.0.0.1', 'root', '');

    if ($mysql && !$mysql->connect_errno) {
        $mysql->query("CREATE DATABASE IF NOT EXISTS `workspce`");
        $mysql->select_db('workspce');
        mysqli_set_charset($mysql, 'utf8mb4');

        $mysql->query(
            "CREATE TABLE IF NOT EXISTS `employees` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `employee_id` VARCHAR(30) NOT NULL,
                `first_name` VARCHAR(80) NOT NULL,
                `last_name` VARCHAR(80) NOT NULL,
                `email` VARCHAR(150) NOT NULL,
                `department` VARCHAR(80) NOT NULL,
                `start_date` DATE NOT NULL,
                `photo_path` VARCHAR(255) NULL DEFAULT NULL,
                `username` VARCHAR(50) NULL,
                `password_hash` VARCHAR(255) NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`),
                UNIQUE KEY `employee_id_unique` (`employee_id`),
                UNIQUE KEY `email_unique` (`email`),
                UNIQUE KEY `username_unique` (`username`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );

        $columns = $mysql->query("SHOW COLUMNS FROM `employees`");
        $missingColumns = ['photo_path', 'username', 'password_hash'];

        foreach ($missingColumns as $columnName) {
            $hasColumn = false;
            while ($column = $columns->fetch_assoc()) {
                if (($column['Field'] ?? '') === $columnName) {
                    $hasColumn = true;
                    break;
                }
            }
            $columns->data_seek(0);

            if (!$hasColumn) {
                $mysql->query("ALTER TABLE `employees` ADD COLUMN `$columnName` " . ($columnName === 'username' ? 'VARCHAR(50) NULL' : ($columnName === 'password_hash' ? 'VARCHAR(255) NULL' : 'VARCHAR(255) NULL DEFAULT NULL')) . " AFTER `start_date`");
            }
        }

        $mysql->query(
            "CREATE TABLE IF NOT EXISTS `detailed_tasks` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `employee_id` VARCHAR(30) NOT NULL,
                `title` VARCHAR(255) NOT NULL,
                `description` TEXT NOT NULL,
                `priority` VARCHAR(20) DEFAULT 'Medium',
                `category` VARCHAR(50) DEFAULT 'General',
                `estimated_hours` DECIMAL(5,2) DEFAULT 0.00,
                `progress_percent` INT DEFAULT 0,
                `status` VARCHAR(30) DEFAULT 'In Progress',
                `visible_to_leader_only` TINYINT(1) DEFAULT 1,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );

        $mysql->query(
            "CREATE TABLE IF NOT EXISTS `work_reports` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `employee_id` VARCHAR(30) NOT NULL,
                `report_title` VARCHAR(255) NOT NULL,
                `work_summary` TEXT NOT NULL,
                `deliverables` TEXT DEFAULT NULL,
                `blockers` TEXT DEFAULT NULL,
                `hours_spent` DECIMAL(5,2) DEFAULT 0.00,
                `completion_rate` INT DEFAULT 0,
                `leader_feedback` TEXT DEFAULT NULL,
                `status` VARCHAR(30) DEFAULT 'Pending Review',
                `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );

        $mysql->query(
            "CREATE TABLE IF NOT EXISTS `team_leaders` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `leader_id` VARCHAR(30) NOT NULL,
                `first_name` VARCHAR(80) NOT NULL,
                `last_name` VARCHAR(80) NOT NULL,
                `email` VARCHAR(150) NOT NULL,
                `department` VARCHAR(80) NOT NULL,
                `username` VARCHAR(50) NOT NULL,
                `password_hash` VARCHAR(255) NOT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`),
                UNIQUE KEY `leader_id_unique` (`leader_id`),
                UNIQUE KEY `email_unique_leader` (`email`),
                UNIQUE KEY `username_unique_leader` (`username`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );

        return $mysql;
    }

    $sqlite = new PDO('sqlite:' . __DIR__ . '/employees.db');
    $sqlite->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sqlite->exec(
        "CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT NOT NULL UNIQUE,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            department TEXT NOT NULL,
            start_date TEXT NOT NULL,
            photo_path TEXT NULL,
            username TEXT NULL UNIQUE,
            password_hash TEXT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )"
    );

    $sqlite->exec(
        "CREATE TABLE IF NOT EXISTS detailed_tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            priority TEXT DEFAULT 'Medium',
            category TEXT DEFAULT 'General',
            estimated_hours REAL DEFAULT 0.0,
            progress_percent INTEGER DEFAULT 0,
            status TEXT DEFAULT 'In Progress',
            visible_to_leader_only INTEGER DEFAULT 1,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )"
    );

    $sqlite->exec(
        "CREATE TABLE IF NOT EXISTS work_reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT NOT NULL,
            report_title TEXT NOT NULL,
            work_summary TEXT NOT NULL,
            deliverables TEXT NULL,
            blockers TEXT NULL,
            hours_spent REAL DEFAULT 0.0,
            completion_rate INTEGER DEFAULT 0,
            leader_feedback TEXT NULL,
            status TEXT DEFAULT 'Pending Review',
            submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
        )"
    );
    $sqlite->exec(
        "CREATE TABLE IF NOT EXISTS team_leaders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            leader_id TEXT NOT NULL UNIQUE,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            department TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )"
    );

    $columns = $sqlite->query("PRAGMA table_info(employees)")->fetchAll(PDO::FETCH_ASSOC);
    foreach (['photo_path', 'username', 'password_hash'] as $columnName) {
        $hasColumn = false;
        foreach ($columns as $column) {
            if (($column['name'] ?? '') === $columnName) {
                $hasColumn = true;
                break;
            }
        }

        if (!$hasColumn) {
            $sqlite->exec('ALTER TABLE employees ADD COLUMN ' . $columnName . ' TEXT NULL');
        }
    }

    return $sqlite;
}

function findEmployeeByUsername(string $username)
{
    $db = getDatabaseConnection();
    $normalized = strtolower(trim($username));

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('SELECT employee_id, first_name, last_name, email, department, start_date, username, photo_path, password_hash FROM employees WHERE LOWER(username) = ? LIMIT 1');
        $stmt->bind_param('s', $normalized);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc() ?: null;
    }

    $stmt = $db->prepare('SELECT employee_id, first_name, last_name, email, department, start_date, username, photo_path, password_hash FROM employees WHERE LOWER(username) = :username LIMIT 1');
    $stmt->execute([':username' => $normalized]);
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
}

function authenticateEmployee(string $username, string $password)
{
    $employee = findEmployeeByUsername($username);
    if (!$employee || empty($employee['password_hash'])) {
        return null;
    }

    if (!password_verify($password, $employee['password_hash'])) {
        return null;
    }

    return [
        'employee_id' => $employee['employee_id'],
        'first_name' => $employee['first_name'],
        'last_name' => $employee['last_name'],
        'email' => $employee['email'],
        'department' => $employee['department'],
        'start_date' => $employee['start_date'],
        'photo_path' => $employee['photo_path'] ?? null,
        'username' => $employee['username'],
        'name' => trim($employee['first_name'] . ' ' . $employee['last_name']),
    ];
}

function sendEmployeeCredentialsEmail(string $toEmail, string $employeeName, string $username, string $password, string $department = ''): bool
{
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $subject = 'Your Northstar Pulse account details';
    $from = 'noreply@northstar.local';
    $message = "Hello {$employeeName},\r\n\r\n" .
        "Your Northstar Pulse account has been created successfully.\r\n" .
        "Department: {$department}\r\n" .
        "Username: {$username}\r\n" .
        "Password: {$password}\r\n\r\n" .
        "Please log in at http://127.0.0.1:8000/index.php\r\n\r\n" .
        "Regards,\r\nNorthstar Pulse";

    $headers = [
        'From: Northstar Pulse <' . $from . '>',
        'Reply-To: ' . $from,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    return @mail($toEmail, $subject, $message, implode("\r\n", $headers));
}

function saveUploadedPhoto(array $file): ?string
{
    if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
        return null;
    }

    $mime = mime_content_type($file['tmp_name']);
    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!in_array($mime, $allowed, true)) {
        throw new InvalidArgumentException('Please upload a valid employee image in JPG, PNG, WEBP, or GIF format.');
    }

    $extensionMap = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];

    $uploadDir = __DIR__ . '/uploads/employee-photos';
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0777, true) && !is_dir($uploadDir)) {
        throw new RuntimeException('Unable to create the employee photo upload directory.');
    }

    $fileName = 'employee-' . bin2hex(random_bytes(8)) . '.' . ($extensionMap[$mime] ?? 'jpg');
    $targetPath = $uploadDir . '/' . $fileName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new RuntimeException('Unable to save the employee photo.');
    }

    return 'uploads/employee-photos/' . $fileName;
}

function fetchEmployees()
{
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $result = $db->query("SELECT employee_id, first_name, last_name, email, department, start_date, photo_path, username FROM employees ORDER BY created_at DESC");
        $employees = [];

        while ($row = $result->fetch_assoc()) {
            $employees[] = [
                'employee_id' => $row['employee_id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'department' => $row['department'],
                'start_date' => $row['start_date'],
                'photo_path' => $row['photo_path'],
                'username' => $row['username'],
                'name' => trim($row['first_name'] . ' ' . $row['last_name']),
                'initials' => strtoupper(substr($row['first_name'], 0, 1) . substr($row['last_name'], 0, 1)),
            ];
        }

        return $employees;
    }

    $stmt = $db->query("SELECT employee_id, first_name, last_name, email, department, start_date, photo_path, username FROM employees ORDER BY created_at DESC");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return array_map(function ($row) {
        return [
            'employee_id' => $row['employee_id'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'email' => $row['email'],
            'department' => $row['department'],
            'start_date' => $row['start_date'],
            'photo_path' => $row['photo_path'],
            'username' => $row['username'],
            'name' => trim($row['first_name'] . ' ' . $row['last_name']),
            'initials' => strtoupper(substr($row['first_name'], 0, 1) . substr($row['last_name'], 0, 1)),
        ];
    }, $rows);
}

function generateEmployeeId()
{
    $employees = fetchEmployees();
    $maxNumber = 0;

    foreach ($employees as $employee) {
        if (preg_match('/^NST-(\d{4})-(\d{4})$/', $employee['employee_id'], $matches)) {
            $sequence = (int) $matches[2];
            if ($sequence > $maxNumber) {
                $maxNumber = $sequence;
            }
        }
    }

    $year = (int) date('Y');
    return 'NST-' . $year . '-' . str_pad((string) ($maxNumber + 1), 4, '0', STR_PAD_LEFT);
}

function insertEmployee(array $payload)
{
    $firstName = trim((string) ($payload['first_name'] ?? ''));
    $lastName = trim((string) ($payload['last_name'] ?? ''));
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $department = trim((string) ($payload['department'] ?? ''));
    $startDate = trim((string) ($payload['start_date'] ?? ''));
    $username = strtolower(trim((string) ($payload['username'] ?? '')));
    $password = (string) ($payload['password'] ?? '');
    $photoPath = $payload['photo_path'] ?? null;

    if ($firstName === '' || $lastName === '' || $email === '' || $department === '' || $startDate === '' || $username === '' || $password === '') {
        throw new InvalidArgumentException('Please provide all required employee details, including username and password.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Please provide a valid work email address.');
    }

    if (strlen($username) < 4 || strlen($username) > 30) {
        throw new InvalidArgumentException('Username must be between 4 and 30 characters long.');
    }

    if (strlen($password) < 6) {
        throw new InvalidArgumentException('Password must be at least 6 characters long.');
    }

    if (findEmployeeByUsername($username)) {
        throw new InvalidArgumentException('This username is already taken. Please choose another one.');
    }

    $employeeId = generateEmployeeId();
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare(
            'INSERT INTO employees (employee_id, first_name, last_name, email, department, start_date, photo_path, username, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->bind_param('sssssssss', $employeeId, $firstName, $lastName, $email, $department, $startDate, $photoPath, $username, $passwordHash);
        $stmt->execute();

        return [
            'employee_id' => $employeeId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'department' => $department,
            'start_date' => $startDate,
            'photo_path' => $photoPath,
            'username' => $username,
            'name' => trim($firstName . ' ' . $lastName),
            'initials' => strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1)),
        ];
    }

    $stmt = $db->prepare(
        'INSERT INTO employees (employee_id, first_name, last_name, email, department, start_date, photo_path, username, password_hash) VALUES (:employee_id, :first_name, :last_name, :email, :department, :start_date, :photo_path, :username, :password_hash)'
    );
    $stmt->execute([
        ':employee_id' => $employeeId,
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':department' => $department,
        ':start_date' => $startDate,
        ':photo_path' => $photoPath,
        ':username' => $username,
        ':password_hash' => $passwordHash,
    ]);

    return [
        'employee_id' => $employeeId,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'department' => $department,
        'start_date' => $startDate,
        'photo_path' => $photoPath,
        'username' => $username,
        'name' => trim($firstName . ' ' . $lastName),
        'initials' => strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1)),
    ];
}

function insertDetailedTask(array $data)
{
    $employeeId = trim((string) ($data['employee_id'] ?? ''));
    $title = trim((string) ($data['title'] ?? ''));
    $description = trim((string) ($data['description'] ?? ''));
    $priority = trim((string) ($data['priority'] ?? 'Medium'));
    $category = trim((string) ($data['category'] ?? 'General'));
    $estimatedHours = (float) ($data['estimated_hours'] ?? 0.0);
    $progressPercent = (int) ($data['progress_percent'] ?? 0);
    $status = trim((string) ($data['status'] ?? 'In Progress'));
    $visibleToLeaderOnly = !empty($data['visible_to_leader_only']) ? 1 : 0;

    if ($employeeId === '' || $title === '' || $description === '') {
        throw new InvalidArgumentException('Employee ID, task title, and detailed description are required.');
    }

    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('INSERT INTO detailed_tasks (employee_id, title, description, priority, category, estimated_hours, progress_percent, status, visible_to_leader_only) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssssdssi', $employeeId, $title, $description, $priority, $category, $estimatedHours, $progressPercent, $status, $visibleToLeaderOnly);
        $stmt->execute();
        $id = $stmt->insert_id;
    } else {
        $stmt = $db->prepare('INSERT INTO detailed_tasks (employee_id, title, description, priority, category, estimated_hours, progress_percent, status, visible_to_leader_only) VALUES (:employee_id, :title, :description, :priority, :category, :estimated_hours, :progress_percent, :status, :visible_to_leader_only)');
        $stmt->execute([
            ':employee_id' => $employeeId,
            ':title' => $title,
            ':description' => $description,
            ':priority' => $priority,
            ':category' => $category,
            ':estimated_hours' => $estimatedHours,
            ':progress_percent' => $progressPercent,
            ':status' => $status,
            ':visible_to_leader_only' => $visibleToLeaderOnly,
        ]);
        $id = (int) $db->lastInsertId();
    }

    return [
        'id' => $id,
        'employee_id' => $employeeId,
        'title' => $title,
        'description' => $description,
        'priority' => $priority,
        'category' => $category,
        'estimated_hours' => $estimatedHours,
        'progress_percent' => $progressPercent,
        'status' => $status,
        'visible_to_leader_only' => $visibleToLeaderOnly,
        'created_at' => date('Y-m-d H:i:s'),
    ];
}

function fetchDetailedTasks(?string $employeeId = null, bool $isLeader = false)
{
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        if ($isLeader) {
            $sql = 'SELECT t.*, CONCAT(e.first_name, " ", e.last_name) AS employee_name, e.department FROM detailed_tasks t LEFT JOIN employees e ON t.employee_id = e.employee_id ';
            $params = [];
            $types = '';
            if ($employeeId) {
                $sql .= 'WHERE t.employee_id = ? ';
                $params[] = $employeeId;
                $types .= 's';
            }
            $sql .= 'ORDER BY t.created_at DESC';
            $stmt = $db->prepare($sql);
            if (!empty($params)) {
                $stmt->bind_param($types, ...$params);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }

        $sql = 'SELECT t.*, CONCAT(e.first_name, " ", e.last_name) AS employee_name, e.department FROM detailed_tasks t LEFT JOIN employees e ON t.employee_id = e.employee_id WHERE t.employee_id = ? ORDER BY t.created_at DESC';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $employeeId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    if ($isLeader) {
        $sql = 'SELECT t.*, (e.first_name || " " || e.last_name) AS employee_name, e.department FROM detailed_tasks t LEFT JOIN employees e ON t.employee_id = e.employee_id ';
        $params = [];
        if ($employeeId) {
            $sql .= 'WHERE t.employee_id = :employee_id ';
            $params[':employee_id'] = $employeeId;
        }
        $sql .= 'ORDER BY t.created_at DESC';
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $sql = 'SELECT t.*, (e.first_name || " " || e.last_name) AS employee_name, e.department FROM detailed_tasks t LEFT JOIN employees e ON t.employee_id = e.employee_id WHERE t.employee_id = :employee_id ORDER BY t.created_at DESC';
    $stmt = $db->prepare($sql);
    $stmt->execute([':employee_id' => $employeeId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function updateTaskProgress(int $taskId, int $progressPercent, string $status)
{
    $db = getDatabaseConnection();
    $progressPercent = max(0, min(100, $progressPercent));

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('UPDATE detailed_tasks SET progress_percent = ?, status = ? WHERE id = ?');
        $stmt->bind_param('isi', $progressPercent, $status, $taskId);
        return $stmt->execute();
    }

    $stmt = $db->prepare('UPDATE detailed_tasks SET progress_percent = :progress_percent, status = :status WHERE id = :id');
    return $stmt->execute([':progress_percent' => $progressPercent, ':status' => $status, ':id' => $taskId]);
}

function insertWorkReport(array $data)
{
    $employeeId = trim((string) ($data['employee_id'] ?? ''));
    $reportTitle = trim((string) ($data['report_title'] ?? ''));
    $workSummary = trim((string) ($data['work_summary'] ?? ''));
    $deliverables = trim((string) ($data['deliverables'] ?? ''));
    $blockers = trim((string) ($data['blockers'] ?? ''));
    $hoursSpent = (float) ($data['hours_spent'] ?? 0.0);
    $completionRate = (int) ($data['completion_rate'] ?? 0);
    $status = 'Pending Review';

    if ($employeeId === '' || $reportTitle === '' || $workSummary === '') {
        throw new InvalidArgumentException('Employee ID, report title, and work summary are required.');
    }

    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('INSERT INTO work_reports (employee_id, report_title, work_summary, deliverables, blockers, hours_spent, completion_rate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssssdis', $employeeId, $reportTitle, $workSummary, $deliverables, $blockers, $hoursSpent, $completionRate, $status);
        $stmt->execute();
        $id = $stmt->insert_id;
    } else {
        $stmt = $db->prepare('INSERT INTO work_reports (employee_id, report_title, work_summary, deliverables, blockers, hours_spent, completion_rate, status) VALUES (:employee_id, :report_title, :work_summary, :deliverables, :blockers, :hours_spent, :completion_rate, :status)');
        $stmt->execute([
            ':employee_id' => $employeeId,
            ':report_title' => $reportTitle,
            ':work_summary' => $workSummary,
            ':deliverables' => $deliverables,
            ':blockers' => $blockers,
            ':hours_spent' => $hoursSpent,
            ':completion_rate' => $completionRate,
            ':status' => $status,
        ]);
        $id = (int) $db->lastInsertId();
    }

    return [
        'id' => $id,
        'employee_id' => $employeeId,
        'report_title' => $reportTitle,
        'work_summary' => $workSummary,
        'deliverables' => $deliverables,
        'blockers' => $blockers,
        'hours_spent' => $hoursSpent,
        'completion_rate' => $completionRate,
        'status' => $status,
        'submitted_at' => date('Y-m-d H:i:s'),
    ];
}

function fetchWorkReports(?string $employeeId = null, bool $isLeader = false)
{
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        if ($isLeader) {
            $sql = 'SELECT r.*, CONCAT(e.first_name, " ", e.last_name) AS employee_name, e.department FROM work_reports r LEFT JOIN employees e ON r.employee_id = e.employee_id ';
            $params = [];
            $types = '';
            if ($employeeId) {
                $sql .= 'WHERE r.employee_id = ? ';
                $params[] = $employeeId;
                $types .= 's';
            }
            $sql .= 'ORDER BY r.submitted_at DESC';
            $stmt = $db->prepare($sql);
            if (!empty($params)) {
                $stmt->bind_param($types, ...$params);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }

        $sql = 'SELECT r.*, CONCAT(e.first_name, " ", e.last_name) AS employee_name, e.department FROM work_reports r LEFT JOIN employees e ON r.employee_id = e.employee_id WHERE r.employee_id = ? ORDER BY r.submitted_at DESC';
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $employeeId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    if ($isLeader) {
        $sql = 'SELECT r.*, (e.first_name || " " || e.last_name) AS employee_name, e.department FROM work_reports r LEFT JOIN employees e ON r.employee_id = e.employee_id ';
        $params = [];
        if ($employeeId) {
            $sql .= 'WHERE r.employee_id = :employee_id ';
            $params[':employee_id'] = $employeeId;
        }
        $sql .= 'ORDER BY r.submitted_at DESC';
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $sql = 'SELECT r.*, (e.first_name || " " || e.last_name) AS employee_name, e.department FROM work_reports r LEFT JOIN employees e ON r.employee_id = e.employee_id WHERE r.employee_id = :employee_id ORDER BY r.submitted_at DESC';
    $stmt = $db->prepare($sql);
    $stmt->execute([':employee_id' => $employeeId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function updateReportLeaderFeedback(int $reportId, string $feedback, string $status = 'Reviewed')
{
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('UPDATE work_reports SET leader_feedback = ?, status = ? WHERE id = ?');
        $stmt->bind_param('ssi', $feedback, $status, $reportId);
        return $stmt->execute();
    }

    $stmt = $db->prepare('UPDATE work_reports SET leader_feedback = :feedback, status = :status WHERE id = :id');
    return $stmt->execute([':feedback' => $feedback, ':status' => $status, ':id' => $reportId]);
}

function findTeamLeaderByUsername(string $username)
{
    $db = getDatabaseConnection();
    $normalized = strtolower(trim($username));

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('SELECT leader_id, first_name, last_name, email, department, username, password_hash FROM team_leaders WHERE LOWER(username) = ? LIMIT 1');
        $stmt->bind_param('s', $normalized);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc() ?: null;
    }

    $stmt = $db->prepare('SELECT leader_id, first_name, last_name, email, department, username, password_hash FROM team_leaders WHERE LOWER(username) = :username LIMIT 1');
    $stmt->execute([':username' => $normalized]);
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
}

function generateTeamLeaderId()
{
    $db = getDatabaseConnection();
    $maxNumber = 0;

    if ($db instanceof mysqli) {
        $result = $db->query("SELECT leader_id FROM team_leaders");
        while ($row = $result->fetch_assoc()) {
            if (preg_match('/^TL-(\d{4})-(\d{4})$/', $row['leader_id'], $matches)) {
                $sequence = (int) $matches[2];
                if ($sequence > $maxNumber) $maxNumber = $sequence;
            }
        }
    } else {
        $stmt = $db->query("SELECT leader_id FROM team_leaders");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            if (preg_match('/^TL-(\d{4})-(\d{4})$/', $row['leader_id'] ?? '', $matches)) {
                $sequence = (int) $matches[2];
                if ($sequence > $maxNumber) $maxNumber = $sequence;
            }
        }
    }

    $year = (int) date('Y');
    return 'TL-' . $year . '-' . str_pad((string) ($maxNumber + 1), 4, '0', STR_PAD_LEFT);
}

function insertTeamLeader(array $payload)
{
    $firstName = trim((string) ($payload['first_name'] ?? ''));
    $lastName = trim((string) ($payload['last_name'] ?? ''));
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $department = trim((string) ($payload['department'] ?? 'Executive Management'));
    $username = strtolower(trim((string) ($payload['username'] ?? '')));
    $password = (string) ($payload['password'] ?? '');

    if ($firstName === '' || $lastName === '' || $email === '' || $username === '' || $password === '') {
        throw new InvalidArgumentException('First name, last name, email, username, and password are required.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Please provide a valid work email address.');
    }

    if (strlen($username) < 4 || strlen($username) > 30) {
        throw new InvalidArgumentException('Leader username must be between 4 and 30 characters.');
    }

    if (strlen($password) < 6) {
        throw new InvalidArgumentException('Leader password must be at least 6 characters long.');
    }

    if (findTeamLeaderByUsername($username) || ($username === 'leader')) {
        throw new InvalidArgumentException('This Team Leader username is already taken.');
    }

    $leaderId = generateTeamLeaderId();
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare('INSERT INTO team_leaders (leader_id, first_name, last_name, email, department, username, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssssss', $leaderId, $firstName, $lastName, $email, $department, $username, $passwordHash);
        $stmt->execute();
    } else {
        $stmt = $db->prepare('INSERT INTO team_leaders (leader_id, first_name, last_name, email, department, username, password_hash) VALUES (:leader_id, :first_name, :last_name, :email, :department, :username, :password_hash)');
        $stmt->execute([
            ':leader_id' => $leaderId,
            ':first_name' => $firstName,
            ':last_name' => $lastName,
            ':email' => $email,
            ':department' => $department,
            ':username' => $username,
            ':password_hash' => $passwordHash,
        ]);
    }

    return [
        'leader_id' => $leaderId,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'department' => $department,
        'username' => $username,
        'name' => trim($firstName . ' ' . $lastName),
        'role' => 'Team Leader',
    ];
}

function authenticateTeamLeader(string $username, string $password): ?array
{
    $username = strtolower(trim($username));

    // Check DB registered team leaders first
    $dbLeader = findTeamLeaderByUsername($username);
    if ($dbLeader && !empty($dbLeader['password_hash'])) {
        if (password_verify($password, $dbLeader['password_hash'])) {
            return [
                'leader_id' => $dbLeader['leader_id'],
                'username' => $dbLeader['username'],
                'name' => trim($dbLeader['first_name'] . ' ' . $dbLeader['last_name']),
                'role' => 'Team Leader',
                'department' => $dbLeader['department'] ?? 'Executive Management',
                'email' => $dbLeader['email'],
            ];
        }
    }

    // Default fallback leader credentials
    if ($username === 'leader' && ($password === 'leader123' || $password === 'admin123')) {
        return [
            'leader_id' => 'TL-2026-0000',
            'username' => 'leader',
            'name' => 'Chief Team Leader',
            'role' => 'Team Leader',
            'department' => 'Executive Management',
            'email' => 'leader@northstar.local',
        ];
    }
    return null;
}


