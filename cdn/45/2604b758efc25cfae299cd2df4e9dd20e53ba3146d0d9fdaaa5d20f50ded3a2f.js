export default function generate(THREE) {
  const root = new THREE.Group();
  const ball_group = new THREE.Group();
  root.add(ball_group);

  const ballRadius = 0.36;

  const wool_coreMat = new THREE.MeshStandardMaterial({
    color: 0xf2f0e7,
    metalness: 0.0,
    roughness: 0.98,
    emissive: 0xf2f0e7,
    emissiveIntensity: 0.22,
  });
  const wool_wispMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf5,
    metalness: 0.0,
    roughness: 0.98,
    emissive: 0xfff8e8,
    emissiveIntensity: 0.28,
  });
  const wool_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xe4dfd2,
    metalness: 0.0,
    roughness: 0.98,
    emissive: 0xe4dfd2,
    emissiveIntensity: 0.16,
  });
  const wooden_rodMat = new THREE.MeshStandardMaterial({
    color: 0xb9824f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x8f5d35,
    metalness: 0.0,
    roughness: 0.65,
  });
  const wood_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd7a66f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wool_core = new THREE.Mesh(
    new THREE.SphereGeometry(ballRadius, 48, 32),
    wool_coreMat
  );
  wool_core.scale.set(1.0, 0.98, 1.01);
  ball_group.add(wool_core);

  const surface_fiber_positions = [];
  const surfaceFiberCount = 1400;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < surfaceFiberCount; i++) {
    const y = 1 - 2 * (i + 0.5) / surfaceFiberCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle;
    const normal = new THREE.Vector3(
      Math.cos(theta) * radial,
      y,
      Math.sin(theta) * radial
    );
    const tangentA = new THREE.Vector3(-normal.z, 0, normal.x);
    if (tangentA.lengthSq() < 0.0001) tangentA.set(1, 0, 0);
    tangentA.normalize();
    const tangentB = new THREE.Vector3()
      .crossVectors(normal, tangentA)
      .normalize();

    const direction = new THREE.Vector3();
    const drift = 0.34 + 0.55 * (0.5 + 0.5 * Math.sin(i * 1.731));
    direction
      .copy(tangentA)
      .multiplyScalar(drift)
      .addScaledVector(tangentB, Math.sin(i * 0.913) * 0.62)
      .addScaledVector(normal, Math.sin(i * 2.173) * 0.16)
      .normalize();

    const length = 0.035 + 0.075 * (0.5 + 0.5 * Math.sin(i * 1.237));
    const lift = 0.003 + 0.008 * (0.5 + 0.5 * Math.sin(i * 2.011));
    const start = normal.clone().multiplyScalar(ballRadius + lift);
    const end = start
      .clone()
      .addScaledVector(direction, length)
      .addScaledVector(normal, Math.sin(i * 0.619) * 0.004);

    surface_fiber_positions.push(
      start.x, start.y, start.z,
      end.x, end.y, end.z
    );
  }

  const surface_fibersGeom = new THREE.BufferGeometry();
  surface_fibersGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(surface_fiber_positions, 3)
  );
  const surface_fibersMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.68,
  });
  const surface_fibers = new THREE.LineSegments(
    surface_fibersGeom,
    surface_fibersMat
  );
  ball_group.add(surface_fibers);

  const wool_wisps = new THREE.Group();
  const wispCount = 28;
  for (let i = 0; i < wispCount; i++) {
    const y = 1 - 2 * (i + 0.5) / wispCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle + 0.31;
    const normal = new THREE.Vector3(
      Math.cos(theta) * radial,
      y,
      Math.sin(theta) * radial
    );
    const tangentA = new THREE.Vector3(-normal.z, 0, normal.x);
    if (tangentA.lengthSq() < 0.0001) tangentA.set(1, 0, 0);
    tangentA.normalize();
    const tangentB = new THREE.Vector3()
      .crossVectors(normal, tangentA)
      .normalize();

    const points = [];
    const pointCount = 10;
    for (let j = 0; j <= pointCount; j++) {
      const t = j / pointCount;
      const angle =
        theta +
        (t - 0.5) * (1.35 + 0.45 * Math.sin(i * 0.73)) +
        Math.sin(t * Math.PI * 2 + i) * 0.12;
      const shellRadius =
        ballRadius +
        0.004 +
        0.012 * Math.sin(t * Math.PI) +
        0.004 * Math.sin(i * 1.41 + t * 5.0);
      const point = new THREE.Vector3(
        Math.cos(angle) * radial * shellRadius,
        y * shellRadius + Math.sin(t * Math.PI * 2 + i) * 0.006,
        Math.sin(angle) * radial * shellRadius
      );
      points.push(point);
    }

    const wispCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const wispGeom = new THREE.TubeGeometry(
      wispCurve,
      20,
      0.0012 + (i % 3) * 0.00025,
      4,
      false
    );
    const wispMat = i % 4 === 0 ? wool_shadowMat : wool_wispMat;
    const wisp = new THREE.Mesh(wispGeom, wispMat);
    wool_wisps.add(wisp);
  }
  ball_group.add(wool_wisps);

  const rod_direction = new THREE.Vector3(1, -0.5, 0.82).normalize();
  const rod_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    rod_direction
  );

  const wooden_rodGeom = new THREE.CylinderGeometry(
    0.033,
    0.033,
    1.58,
    24
  );
  const wooden_rod = new THREE.Mesh(wooden_rodGeom, wooden_rodMat);
  wooden_rod.quaternion.copy(rod_quaternion);
  root.add(wooden_rod);

  const rod_end_capsGeom = new THREE.SphereGeometry(0.033, 18, 12);
  const rod_end_caps = new THREE.InstancedMesh(
    rod_end_capsGeom,
    wooden_rodMat,
    2
  );
  const cap_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    cap_dummy.position.copy(rod_direction).multiplyScalar(i === 0 ? -0.79 : 0.79);
    cap_dummy.updateMatrix();
    rod_end_caps.setMatrixAt(i, cap_dummy.matrix);
  }
  rod_end_caps.instanceMatrix.needsUpdate = true;
  root.add(rod_end_caps);

  const wood_grain = new THREE.Group();
  const grainAngles = [0.25, 1.55, 2.85, 4.15, 5.35];
  for (let i = 0; i < grainAngles.length; i++) {
    const angle = grainAngles[i];
    const grainPoints = [];
    for (let j = 0; j <= 6; j++) {
      const t = j / 6;
      const y = -0.70 + t * 1.40;
      const waviness = Math.sin(t * Math.PI * 2 + i * 0.7) * 0.0015;
      grainPoints.push(new THREE.Vector3(
        Math.cos(angle) * (0.0325 + waviness),
        y,
        Math.sin(angle) * (0.0325 + waviness)
      ));
    }
    const grainCurve = new THREE.CatmullRomCurve3(
      grainPoints,
      false,
      "centripetal"
    );
    const grainGeom = new THREE.TubeGeometry(
      grainCurve,
      12,
      0.00115,
      4,
      false
    );
    const grainMat = i % 2 === 0 ? wood_grainMat : wood_highlightMat;
    const grain = new THREE.Mesh(grainGeom, grainMat);
    wood_grain.add(grain);
  }
  wood_grain.quaternion.copy(rod_quaternion);
  root.add(wood_grain);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}