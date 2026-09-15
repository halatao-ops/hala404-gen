export default function generate(THREE) {
  const root = new THREE.Group();

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff681f,
    metalness: 0.0,
    roughness: 0.3,
  });

  const white_panelMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const dimple_rimsMat = new THREE.MeshStandardMaterial({
    color: 0xff7629,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const dimple_centersMat = new THREE.MeshStandardMaterial({
    color: 0xe95417,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const white_dimple_rimsMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e9,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const white_dimple_centersMat = new THREE.MeshStandardMaterial({
    color: 0xded9cf,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const ball_bodyGeom = new THREE.SphereGeometry(1, 96, 64);
  const ball_body = new THREE.Mesh(ball_bodyGeom, ball_bodyMat);
  root.add(ball_body);

  const dimpleData = [];
  const dimpleCount = 320;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const patchClearance = 0.42;

  for (let i = 0; i < dimpleCount; i++) {
    const y = 1 - 2 * (i + 0.5) / dimpleCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const patchMetric =
      x * x +
      (y + 0.28) * (y + 0.28) * 0.68 +
      z * z * 0.18;

    if (patchMetric > patchClearance * patchClearance) {
      const size = 0.026 + 0.012 * (0.5 + 0.5 * Math.sin(i * 2.173));
      dimpleData.push({ x, y, z, size });
    }
  }

  const dimple_rimsGeom = new THREE.RingGeometry(0.58, 1, 18);
  const dimple_rims = new THREE.InstancedMesh(
    dimple_rimsGeom,
    dimple_rimsMat,
    dimpleData.length
  );

  const dimple_centersGeom = new THREE.CircleGeometry(1, 18);
  const dimple_centers = new THREE.InstancedMesh(
    dimple_centersGeom,
    dimple_centersMat,
    dimpleData.length
  );

  const dummy = new THREE.Object3D();
  const normal = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, 1);
  const quaternion = new THREE.Quaternion();

  for (let i = 0; i < dimpleData.length; i++) {
    const dimple = dimpleData[i];
    normal.set(dimple.x, dimple.y, dimple.z).normalize();
    quaternion.setFromUnitVectors(forward, normal);

    dummy.position.copy(normal).multiplyScalar(1.004);
    dummy.quaternion.copy(quaternion);
    dummy.scale.setScalar(dimple.size);
    dummy.updateMatrix();
    dimple_rims.setMatrixAt(i, dummy.matrix);

    dummy.position.copy(normal).multiplyScalar(1.003);
    dummy.quaternion.copy(quaternion);
    dummy.scale.setScalar(dimple.size * 0.56);
    dummy.updateMatrix();
    dimple_centers.setMatrixAt(i, dummy.matrix);
  }

  dimple_rims.instanceMatrix.needsUpdate = true;
  dimple_centers.instanceMatrix.needsUpdate = true;
  root.add(dimple_rims, dimple_centers);

  function createWhitePanelGeometry() {
    const rows = 34;
    const columns = 42;
    const positions = [];
    const normals = [];
    const indices = [];
    const panelRadius = 1.008;

    for (let row = 0; row <= rows; row++) {
      const v = row / rows;
      const latitude = -1.43 + v * 1.39;
      const centerLongitude = -0.08 - v * 0.47;
      const halfWidth =
        0.035 +
        0.82 * Math.pow(Math.sin(v * Math.PI * 0.5), 0.72);
      const longitudeSpread =
        halfWidth * (0.96 + 0.04 * Math.sin(v * Math.PI * 9));

      for (let column = 0; column <= columns; column++) {
        const u = column / columns;
        const longitude =
          centerLongitude +
          longitudeSpread * (u * 2 - 1);
        const cosLatitude = Math.cos(latitude);
        const nx = Math.sin(longitude) * cosLatitude;
        const ny = Math.sin(latitude);
        const nz = Math.cos(longitude) * cosLatitude;

        positions.push(
          nx * panelRadius,
          ny * panelRadius,
          nz * panelRadius
        );
        normals.push(nx, ny, nz);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const a = row * (columns + 1) + column;
        const b = a + 1;
        const c = a + columns + 1;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const white_panelGeom = createWhitePanelGeometry();
  const white_panel = new THREE.Mesh(white_panelGeom, white_panelMat);
  root.add(white_panel);

  const whiteDimpleData = [];
  for (let row = 0; row < 10; row++) {
    const v = (row + 0.5) / 10;
    const latitude = -1.37 + v * 1.22;
    const centerLongitude = -0.08 - v * 0.47;
    const halfWidth =
      0.035 +
      0.82 * Math.pow(Math.sin(v * Math.PI * 0.5), 0.72);

    for (let column = 0; column < 13; column++) {
      const u = (column + 0.5) / 13;
      const longitude =
        centerLongitude +
        halfWidth * (u * 2 - 1);
      const cosLatitude = Math.cos(latitude);
      const x = Math.sin(longitude) * cosLatitude;
      const y = Math.sin(latitude);
      const z = Math.cos(longitude) * cosLatitude;
      const size =
        0.024 +
        0.011 *
          (0.5 + 0.5 * Math.sin(row * 13 + column * 4.73));

      whiteDimpleData.push({ x, y, z, size });
    }
  }

  const white_dimple_rims = new THREE.InstancedMesh(
    dimple_rimsGeom,
    white_dimple_rimsMat,
    whiteDimpleData.length
  );

  const white_dimple_centers = new THREE.InstancedMesh(
    dimple_centersGeom,
    white_dimple_centersMat,
    whiteDimpleData.length
  );

  for (let i = 0; i < whiteDimpleData.length; i++) {
    const dimple = whiteDimpleData[i];
    normal.set(dimple.x, dimple.y, dimple.z).normalize();
    quaternion.setFromUnitVectors(forward, normal);

    dummy.position.copy(normal).multiplyScalar(1.012);
    dummy.quaternion.copy(quaternion);
    dummy.scale.setScalar(dimple.size);
    dummy.updateMatrix();
    white_dimple_rims.setMatrixAt(i, dummy.matrix);

    dummy.position.copy(normal).multiplyScalar(1.011);
    dummy.quaternion.copy(quaternion);
    dummy.scale.setScalar(dimple.size * 0.55);
    dummy.updateMatrix();
    white_dimple_centers.setMatrixAt(i, dummy.matrix);
  }

  white_dimple_rims.instanceMatrix.needsUpdate = true;
  white_dimple_centers.instanceMatrix.needsUpdate = true;
  root.add(white_dimple_rims, white_dimple_centers);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(THREE, root);
  return root;
}