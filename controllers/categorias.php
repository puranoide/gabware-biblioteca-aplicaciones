<?php

function selectcategorias($cn)
{
  $sql = "SELECT nombre FROM categorias ORDER BY nombre ASC";
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
    case 'obtenerCategorias':
      if (!$conexion) {
        echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
        exit;
      }
      try {
        $response = selectcategorias($conexion);

        if ($response) {
          $categorias = [];
          while ($row = $response->fetch_assoc()) {
            $categorias[] = $row;
          }
          echo json_encode(['success' => true, 'categorias' => $categorias, 'message' => 'categorias encontradas']);
        } else {
          echo json_encode(['success' => false, 'message' => 'actualmente no hay categorias disponibles']);
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
