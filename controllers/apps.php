<?php

function selectapps($cn)
{
  $sql = "SELECT apps.nombre, apps.descripcion, apps.link, categorias.nombre AS categoria_nombre, apps.linkfoto FROM categorias join apps on categorias.id = apps.categoria  ORDER BY apps.nombre ASC";
  $result = mysqli_query($cn, $sql);
  if (mysqli_num_rows($result) > 0) {
    return $result;
  } else {
    return false;
  }
}

// Verify if receiving POST request with JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Set response header as JSON
  header('Content-Type: application/json');

  // Decode received JSON
  $data = json_decode(file_get_contents("php://input"), true);
  if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
  }

  // Validate received data
    

  include_once('../config/db.php');
  switch ($data['action']) {
    case 'obtenerApps':
      if (!$conexion) {
        echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
        exit;
      }
      try {
        $response = selectapps($conexion);

        if ($response) {
          $apps = [];
          while ($row = $response->fetch_assoc()) {
            $apps[] = $row;
          }
          echo json_encode(['success' => true, 'apps' => $apps, 'message' => 'apps encontradas']);
        } else {
          echo json_encode(['success' => false, 'message' => 'actualmente no hay apps disponibles']);
        }
      } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
      }
      break;
    default:
      echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
      break;
  }
}
