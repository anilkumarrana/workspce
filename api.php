<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET') {
        echo json_encode(['employees' => fetchEmployees()], JSON_PRETTY_PRINT);
        exit;
    }

    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    $photoPath = null;

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] !== UPLOAD_ERR_NO_FILE) {
        $photoPath = saveUploadedPhoto($_FILES['photo']);
    }

    $employee = insertEmployee([
        'first_name' => $_POST['firstName'] ?? '',
        'last_name' => $_POST['lastName'] ?? '',
        'email' => $_POST['email'] ?? '',
        'department' => $_POST['department'] ?? '',
        'start_date' => $_POST['startDate'] ?? '',
        'photo_path' => $photoPath,
    ]);

    echo json_encode(['success' => true, 'employee' => $employee], JSON_PRETTY_PRINT);
} catch (Throwable $exception) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $exception->getMessage()]);
}
