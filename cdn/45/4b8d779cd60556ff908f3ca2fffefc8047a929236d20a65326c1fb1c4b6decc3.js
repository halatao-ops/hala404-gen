export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "square_velvet_lounge";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const upper_group = new THREE.Group();
  upper_group.name = "upper_group";
  root.add(upper_group);

  const seat_group = new THREE.Group();
  seat_group.name = "seat_group";
  upper_group.add(seat_group);

  const textureSize = 64;
  const velvetData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;
      const wave =
        Math.sin(x * 1.71 + y * 0.23) +
        Math.sin(y * 2.17 - x * 0.31) +
        Math.sin((x + y) * 0.57);
      const value = Math.max(218, Math.min(248, 236 + Math.floor(wave * 4)));
      velvetData[index] = value;
      velvetData[index + 1] = value;
      velvetData[index + 2] = value;
      velvetData[index + 3] = 255;
    }
  }

  const velvetTexture = new THREE.DataTexture(
    velvetData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  velvetTexture.wrapS = THREE.RepeatWrapping;
  velvetTexture.wrapT = THREE.RepeatWrapping;
  velvetTexture.repeat.set(7, 7);
  velvetTexture.needsUpdate = true;

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b8,
    map: velvetTexture,
    bumpMap: velvetTexture,
    bumpScale: 0.012,
    metalness: 0.0,
    roughness: 0.98,
    vertexColors: true,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x747474,
    metalness: 0.0,
    roughness: 0.98,
  });

  function applySoftVariation(geometry, amount) {
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const colors = new Float32Array(position.count * 3);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const nx = normal.getX(i);
      const ny = normal.getY(i);
      const nz = normal.getZ(i);

      const broad = Math.sin(x * 5.3 + y * 2.9 - z * 4.1);
      const fine = Math.sin(x * 13.7 - y * 10.1 + z * 8.3);
      const offset = amount * (broad * 0.72 + fine * 0.28);

      position.setXYZ(
        i,
        x + nx * offset,
        y + ny * offset,
        z + nz * offset
      );

      const shade = 0.965 + 0.035 * (
        0.5 + 0.5 * Math.sin(x * 17.0 + y * 11.0 - z * 14.0)
      );
      colors[i * 3] = shade;
      colors[i * 3 + 1] = shade;
      colors[i * 3 + 2] = shade;
    }

    position.needsUpdate = true;
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
  }

  function createPillowGeometry(width, height, depth, radius) {
    const geometry = new THREE.BoxGeometry(width, height, depth, 12, 6, 12);
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const halfDepth = depth * 0.5;
    const innerX = Math.max(0, halfWidth - radius);
    const innerY = Math.max(0, halfHeight - radius);
    const innerZ = Math.max(0, halfDepth - radius);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      const coreX = Math.max(-innerX, Math.min(innerX, x));
      const coreY = Math.max(-innerY, Math.min(innerY, y));
      const coreZ = Math.max(-innerZ, Math.min(innerZ, z));

      const dx = x - coreX;
      const dy = y - coreY;
      const dz = z - coreZ;
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

      const nx = dx / length;
      const ny = dy / length;
      const nz = dz / length;

      position.setXYZ(
        i,
        coreX + nx * radius,
        coreY + ny * radius,
        coreZ + nz * radius
      );
      normal.setXYZ(i, nx, ny, nz);
    }

    position.needsUpdate = true;
    normal.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    applySoftVariation(geometry, 0.008);
    return geometry;
  }

  function createRoundedPrismGeometry(width, height, depth, radius) {
    const geometry = new THREE.BoxGeometry(width, height, depth, 12, 8, 12);
    const position = geometry.attributes.position;
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const halfDepth = depth * 0.5;
    const innerX = Math.max(0, halfWidth - radius);
    const innerY = Math.max(0, halfHeight - radius);
    const innerZ = Math.max(0, halfDepth - radius);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      const coreX = Math.max(-innerX, Math.min(innerX, x));
      const coreY = Math.max(-innerY, Math.min(innerY, y));
      const coreZ = Math.max(-innerZ, Math.min(innerZ, z));

      const dx = x - coreX;
      const dy = y - coreY;
      const dz = z - coreZ;
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

      position.setXYZ(
        i,
        coreX + dx / length * radius,
        coreY + dy / length * radius,
        coreZ + dz / length * radius
      );
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
    applySoftVariation(geometry, 0.012);
    return geometry;
  }

  function createSeam(name, points, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      12,
      radius,
      6,
      false
    );
    const seam = new THREE.Mesh(geometry, seamMat);
    seam.name = name;
    return seam;
  }

  const base_cushionGeom = createRoundedPrismGeometry(
    2.86,
    0.58,
    2.86,
    0.18
  );
  const base_cushion = new THREE.Mesh(base_cushionGeom, velvetMat);
  base_cushion.name = "base_cushion";
  base_cushion.position.set(0, 0.30, 0);
  base_group.add(base_cushion);

  const base_vertical_seamGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.36,
    8
  );
  const base_vertical_seams = new THREE.InstancedMesh(
    base_vertical_seamGeom,
    seamMat,
    8
  );
  base_vertical_seams.name = "base_vertical_seams";

  const baseSeamPositions = [
    [-0.86, 0.30, 1.438],
    [0.86, 0.30, 1.438],
    [-0.86, 0.30, -1.438],
    [0.86, 0.30, -1.438],
    [1.438, 0.30, -0.86],
    [1.438, 0.30, 0.86],
    [-1.438, 0.30, -0.86],
    [-1.438, 0.30, 0.86],
  ];
  const baseSeamDummy = new THREE.Object3D();

  for (let i = 0; i < baseSeamPositions.length; i++) {
    baseSeamDummy.position.set(
      baseSeamPositions[i][0],
      baseSeamPositions[i][1],
      baseSeamPositions[i][2]
    );
    baseSeamDummy.updateMatrix();
    base_vertical_seams.setMatrixAt(i, baseSeamDummy.matrix);
  }
  base_vertical_seams.instanceMatrix.needsUpdate = true;
  base_group.add(base_vertical_seams);

  const front_base_seam = createSeam(
    "front_base_seam",
    [
      new THREE.Vector3(0, 0.08, 1.442),
      new THREE.Vector3(0, 0.28, 1.446),
      new THREE.Vector3(0, 0.54, 1.442),
    ],
    0.008
  );
  base_group.add(front_base_seam);

  const rear_base_seam = createSeam(
    "rear_base_seam",
    [
      new THREE.Vector3(0, 0.08, -1.442),
      new THREE.Vector3(0, 0.28, -1.446),
      new THREE.Vector3(0, 0.54, -1.442),
    ],
    0.008
  );
  base_group.add(rear_base_seam);

  const left_base_seam = createSeam(
    "left_base_seam",
    [
      new THREE.Vector3(-1.442, 0.08, 0),
      new THREE.Vector3(-1.446, 0.28, 0),
      new THREE.Vector3(-1.442, 0.54, 0),
    ],
    0.008
  );
  base_group.add(left_base_seam);

  const right_base_seam = createSeam(
    "right_base_seam",
    [
      new THREE.Vector3(1.442, 0.08, 0),
      new THREE.Vector3(1.446, 0.28, 0),
      new THREE.Vector3(1.442, 0.54, 0),
    ],
    0.008
  );
  base_group.add(right_base_seam);

  const front_bolsterGeom = createPillowGeometry(2.82, 0.62, 0.64, 0.22);
  const front_bolster = new THREE.Mesh(front_bolsterGeom, velvetMat);
  front_bolster.name = "front_bolster";
  front_bolster.position.set(0, 0.82, 1.12);
  upper_group.add(front_bolster);

  const rear_bolster = new THREE.Mesh(front_bolsterGeom, velvetMat);
  rear_bolster.name = "rear_bolster";
  rear_bolster.position.set(0, 0.82, -1.12);
  upper_group.add(rear_bolster);

  const left_bolsterGeom = createPillowGeometry(0.64, 0.62, 1.70, 0.22);
  const left_bolster = new THREE.Mesh(left_bolsterGeom, velvetMat);
  left_bolster.name = "left_bolster";
  left_bolster.position.set(-1.12, 0.82, 0);
  upper_group.add(left_bolster);

  const right_bolster = new THREE.Mesh(left_bolsterGeom, velvetMat);
  right_bolster.name = "right_bolster";
  right_bolster.position.set(1.12, 0.82, 0);
  upper_group.add(right_bolster);

  const front_top_seam = createSeam(
    "front_top_seam",
    [
      new THREE.Vector3(-1.22, 1.132, 1.12),
      new THREE.Vector3(-0.61, 1.137, 1.12),
      new THREE.Vector3(0, 1.132, 1.12),
      new THREE.Vector3(0.61, 1.137, 1.12),
      new THREE.Vector3(1.22, 1.132, 1.12),
    ],
    0.007
  );
  upper_group.add(front_top_seam);

  const rear_top_seam = createSeam(
    "rear_top_seam",
    [
      new THREE.Vector3(-1.22, 1.132, -1.12),
      new THREE.Vector3(-0.61, 1.137, -1.12),
      new THREE.Vector3(0, 1.132, -1.12),
      new THREE.Vector3(0.61, 1.137, -1.12),
      new THREE.Vector3(1.22, 1.132, -1.12),
    ],
    0.007
  );
  upper_group.add(rear_top_seam);

  const left_top_seam = createSeam(
    "left_top_seam",
    [
      new THREE.Vector3(-1.12, 1.132, -0.72),
      new THREE.Vector3(-1.12, 1.137, -0.36),
      new THREE.Vector3(-1.12, 1.132, 0),
      new THREE.Vector3(-1.12, 1.137, 0.36),
      new THREE.Vector3(-1.12, 1.132, 0.72),
    ],
    0.007
  );
  upper_group.add(left_top_seam);

  const right_top_seam = createSeam(
    "right_top_seam",
    [
      new THREE.Vector3(1.12, 1.132, -0.72),
      new THREE.Vector3(1.12, 1.137, -0.36),
      new THREE.Vector3(1.12, 1.132, 0),
      new THREE.Vector3(1.12, 1.137, 0.36),
      new THREE.Vector3(1.12, 1.132, 0.72),
    ],
    0.007
  );
  upper_group.add(right_top_seam);

  const front_inner_seam = createSeam(
    "front_inner_seam",
    [
      new THREE.Vector3(-1.12, 0.82, 0.798),
      new THREE.Vector3(-0.56, 0.82, 0.794),
      new THREE.Vector3(0, 0.82, 0.798),
      new THREE.Vector3(0.56, 0.82, 0.794),
      new THREE.Vector3(1.12, 0.82, 0.798),
    ],
    0.007
  );
  upper_group.add(front_inner_seam);

  const rear_inner_seam = createSeam(
    "rear_inner_seam",
    [
      new THREE.Vector3(-1.12, 0.82, -0.798),
      new THREE.Vector3(-0.56, 0.82, -0.794),
      new THREE.Vector3(0, 0.82, -0.798),
      new THREE.Vector3(0.56, 0.82, -0.794),
      new THREE.Vector3(1.12, 0.82, -0.798),
    ],
    0.007
  );
  upper_group.add(rear_inner_seam);

  const left_inner_seam = createSeam(
    "left_inner_seam",
    [
      new THREE.Vector3(-0.798, 0.82, -0.76),
      new THREE.Vector3(-0.794, 0.82, -0.38),
      new THREE.Vector3(-0.798, 0.82, 0),
      new THREE.Vector3(-0.794, 0.82, 0.38),
      new THREE.Vector3(-0.798, 0.82, 0.76),
    ],
    0.007
  );
  upper_group.add(left_inner_seam);

  const right_inner_seam = createSeam(
    "right_inner_seam",
    [
      new THREE.Vector3(0.798, 0.82, -0.76),
      new THREE.Vector3(0.794, 0.82, -0.38),
      new THREE.Vector3(0.798, 0.82, 0),
      new THREE.Vector3(0.794, 0.82, 0.38),
      new THREE.Vector3(0.798, 0.82, 0.76),
    ],
    0.007
  );
  upper_group.add(right_inner_seam);

  const front_corner_seam = createSeam(
    "front_corner_seam",
    [
      new THREE.Vector3(1.12, 0.55, 1.442),
      new THREE.Vector3(1.12, 0.82, 1.446),
      new THREE.Vector3(1.12, 1.09, 1.442),
    ],
    0.008
  );
  upper_group.add(front_corner_seam);

  const rear_corner_seam = createSeam(
    "rear_corner_seam",
    [
      new THREE.Vector3(1.12, 0.55, -1.442),
      new THREE.Vector3(1.12, 0.82, -1.446),
      new THREE.Vector3(1.12, 1.09, -1.442),
    ],
    0.008
  );
  upper_group.add(rear_corner_seam);

  const left_corner_seam = createSeam(
    "left_corner_seam",
    [
      new THREE.Vector3(-1.442, 0.55, 1.12),
      new THREE.Vector3(-1.446, 0.82, 1.12),
      new THREE.Vector3(-1.442, 1.09, 1.12),
    ],
    0.008
  );
  upper_group.add(left_corner_seam);

  const right_corner_seam = createSeam(
    "right_corner_seam",
    [
      new THREE.Vector3(1.442, 0.55, 1.12),
      new THREE.Vector3(1.446, 0.82, 1.12),
      new THREE.Vector3(1.442, 1.09, 1.12),
    ],
    0.008
  );
  upper_group.add(right_corner_seam);

  const seat_cushionGeom = createPillowGeometry(0.84, 0.20, 0.84, 0.10);

  const seat_cushion_front_left = new THREE.Mesh(
    seat_cushionGeom,
    velvetMat
  );
  seat_cushion_front_left.name = "seat_cushion_front_left";
  seat_cushion_front_left.position.set(-0.43, 0.70, 0.43);
  seat_group.add(seat_cushion_front_left);

  const seat_cushion_front_right = new THREE.Mesh(
    seat_cushionGeom,
    velvetMat
  );
  seat_cushion_front_right.name = "seat_cushion_front_right";
  seat_cushion_front_right.position.set(0.43, 0.70, 0.43);
  seat_group.add(seat_cushion_front_right);

  const seat_cushion_rear_left = new THREE.Mesh(
    seat_cushionGeom,
    velvetMat
  );
  seat_cushion_rear_left.name = "seat_cushion_rear_left";
  seat_cushion_rear_left.position.set(-0.43, 0.70, -0.43);
  seat_group.add(seat_cushion_rear_left);

  const seat_cushion_rear_right = new THREE.Mesh(
    seat_cushionGeom,
    velvetMat
  );
  seat_cushion_rear_right.name = "seat_cushion_rear_right";
  seat_cushion_rear_right.position.set(0.43, 0.70, -0.43);
  seat_group.add(seat_cushion_rear_right);

  const seat_vertical_seamGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    0.72,
    8
  );
  const seat_vertical_seams = new THREE.InstancedMesh(
    seat_vertical_seamGeom,
    seamMat,
    2
  );
  seat_vertical_seams.name = "seat_vertical_seams";

  const seatVerticalPositions = [
    [0, 0.695, 0.43],
    [0, 0.695, -0.43],
  ];
  const seatVerticalDummy = new THREE.Object3D();

  for (let i = 0; i < seatVerticalPositions.length; i++) {
    seatVerticalDummy.position.set(
      seatVerticalPositions[i][0],
      seatVerticalPositions[i][1],
      seatVerticalPositions[i][2]
    );
    seatVerticalDummy.rotation.set(Math.PI / 2, 0, 0);
    seatVerticalDummy.updateMatrix();
    seat_vertical_seams.setMatrixAt(i, seatVerticalDummy.matrix);
  }
  seat_vertical_seams.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_vertical_seams);

  const seat_horizontal_seamGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    0.72,
    8
  );
  const seat_horizontal_seams = new THREE.InstancedMesh(
    seat_horizontal_seamGeom,
    seamMat,
    2
  );
  seat_horizontal_seams.name = "seat_horizontal_seams";

  const seatHorizontalPositions = [
    [-0.43, 0.695, 0],
    [0.43, 0.695, 0],
  ];
  const seatHorizontalDummy = new THREE.Object3D();

  for (let i = 0; i < seatHorizontalPositions.length; i++) {
    seatHorizontalDummy.position.set(
      seatHorizontalPositions[i][0],
      seatHorizontalPositions[i][1],
      seatHorizontalPositions[i][2]
    );
    seatHorizontalDummy.rotation.set(0, 0, Math.PI / 2);
    seatHorizontalDummy.updateMatrix();
    seat_horizontal_seams.setMatrixAt(i, seatHorizontalDummy.matrix);
  }
  seat_horizontal_seams.instanceMatrix.needsUpdate = true;
  seat_group.add(seat_horizontal_seams);

  const seat_center_dimpleGeom = new THREE.SphereGeometry(0.10, 16, 8);
  const seat_center_dimple = new THREE.Mesh(
    seat_center_dimpleGeom,
    seamMat
  );
  seat_center_dimple.name = "seat_center_dimple";
  seat_center_dimple.scale.set(1, 0.12, 1);
  seat_center_dimple.position.set(0, 0.692, 0);
  seat_group.add(seat_center_dimple);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}