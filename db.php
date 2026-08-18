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
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`),
                UNIQUE KEY `employee_id_unique` (`employee_id`),
                UNIQUE KEY `email_unique` (`email`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
        );

        $columns = $mysql->query("SHOW COLUMNS FROM `employees`");
        $hasPhotoPath = false;

        while ($column = $columns->fetch_assoc()) {
            if (($column['Field'] ?? '') === 'photo_path') {
                $hasPhotoPath = true;
                break;
            }
        }

        if (!$hasPhotoPath) {
            $mysql->query("ALTER TABLE `employees` ADD COLUMN `photo_path` VARCHAR(255) NULL DEFAULT NULL AFTER `start_date`");
        }

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
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )"
    );

    $columns = $sqlite->query("PRAGMA table_info(employees)")->fetchAll(PDO::FETCH_ASSOC);
    $hasPhotoPath = false;

    foreach ($columns as $column) {
        if (($column['name'] ?? '') === 'photo_path') {
            $hasPhotoPath = true;
            break;
        }
    }

    if (!$hasPhotoPath) {
        $sqlite->exec('ALTER TABLE employees ADD COLUMN photo_path TEXT NULL');
    }

    return $sqlite;
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
        $result = $db->query("SELECT employee_id, first_name, last_name, email, department, start_date, photo_path FROM employees ORDER BY created_at DESC");
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
                'name' => trim($row['first_name'] . ' ' . $row['last_name']),
                'initials' => strtoupper(substr($row['first_name'], 0, 1) . substr($row['last_name'], 0, 1)),
            ];
        }

        return $employees;
    }

    $stmt = $db->query("SELECT employee_id, first_name, last_name, email, department, start_date, photo_path FROM employees ORDER BY created_at DESC");
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
    $photoPath = $payload['photo_path'] ?? null;

    if ($firstName === '' || $lastName === '' || $email === '' || $department === '' || $startDate === '') {
        throw new InvalidArgumentException('Please provide all required employee details.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Please provide a valid work email address.');
    }

    $employeeId = generateEmployeeId();
    $db = getDatabaseConnection();

    if ($db instanceof mysqli) {
        $stmt = $db->prepare(
            'INSERT INTO employees (employee_id, first_name, last_name, email, department, start_date, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->bind_param('sssssss', $employeeId, $firstName, $lastName, $email, $department, $startDate, $photoPath);
        $stmt->execute();

        return [
            'employee_id' => $employeeId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'department' => $department,
            'start_date' => $startDate,
            'photo_path' => $photoPath,
            'name' => trim($firstName . ' ' . $lastName),
            'initials' => strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1)),
        ];
    }

    $stmt = $db->prepare(
        'INSERT INTO employees (employee_id, first_name, last_name, email, department, start_date, photo_path) VALUES (:employee_id, :first_name, :last_name, :email, :department, :start_date, :photo_path)'
    );
    $stmt->execute([
        ':employee_id' => $employeeId,
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':department' => $department,
        ':start_date' => $startDate,
        ':photo_path' => $photoPath,
    ]);

    return [
        'employee_id' => $employeeId,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'department' => $department,
        'start_date' => $startDate,
        'photo_path' => $photoPath,
        'name' => trim($firstName . ' ' . $lastName),
        'initials' => strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1)),
    ];
}
