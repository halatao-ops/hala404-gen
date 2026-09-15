export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "plush_teddy_bear";

  const torso_group = new THREE.Group();
  torso_group.name = "torso_group";
  const left_arm_group = new THREE.Group();
  left_arm_group.name = "left_arm_group";
  const right_arm_group = new THREE.Group();
  right_arm_group.name = "right_arm_group";
  const left_leg_group = new THREE.Group();
  left_leg_group.name = "left_leg_group";
  const right_leg_group = new THREE.Group();
  right_leg_group.name = "right_leg_group";
  const head_group = new THREE.Group();
  head_group.name = "head_group";

  root.add(
    torso_group,
    left_arm_group,
    right_arm_group,
    left_leg_group,
    right_leg_group,
    head_group
  );

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa9784f,
    metalness: 0.0,
    roughness: 1.0
  });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xbd8e5d,
    metalness: 0.0,
    roughness: 1.0
  });
  const muzzleMat = new THREE.MeshStandardMaterial({
    color: 0xd2ad78,
    metalness: 0.0,
    roughness: 1.0
  });
  const inner_earMat = new THREE.MeshStandardMaterial({
    color: 0x70472f,
    metalness: 0.0,
    roughness: 1.0
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x5b3828,
    metalness: 0.0,
    roughness: 1.0
  });
  const noseMat = new THREE.MeshStandardMaterial({
    color: 0x4b2d25,
    metalness: 0.0,
    roughness: 0.55
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x100d0c,
    metalness: 0.0,
    roughness: 0.3
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xf4eee3,
    metalness: 0.0,
    roughness: 0.3
  });

  const bodyGeom = new THREE.SphereGeometry(1, 32, 24);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.set(0, 0.95, -0.02);
  body.scale.set(0.60, 0.84, 0.47);
  torso_group.add(body);

  const armGeom = new THREE.SphereGeometry(1, 28, 20);

  const left_arm = new THREE.Mesh(armGeom, bodyMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-0.61, 1.02, 0.00);
  left_arm.rotation.z = -0.24;
  left_arm.scale.set(0.24, 0.62, 0.25);
  left_arm_group.add(left_arm);

  const right_arm = new THREE.Mesh(armGeom, bodyMat);
  right_arm.name = "right_arm";
  right_arm.position.set(0.61, 1.02, 0.00);
  right_arm.rotation.z = 0.24;
  right_arm.scale.set(0.24, 0.62, 0.25);
  right_arm_group.add(right_arm);

  const legGeom = new THREE.SphereGeometry(1, 28, 20);

  const left_leg = new THREE.Mesh(legGeom, bodyMat);
  left_leg.name = "left_leg";
  left_leg.position.set(-0.34, 0.38, 0.02);
  left_leg.rotation.z = -0.08;
  left_leg.scale.set(0.31, 0.43, 0.32);
  left_leg_group.add(left_leg);

  const right_leg = new THREE.Mesh(legGeom, bodyMat);
  right_leg.name = "right_leg";
  right_leg.position.set(0.34, 0.38, 0.02);
  right_leg.rotation.z = 0.08;
  right_leg.scale.set(0.31, 0.43, 0.32);
  right_leg_group.add(right_leg);

  const footGeom = new THREE.SphereGeometry(1, 32, 20);

  const left_foot = new THREE.Mesh(footGeom, bodyMat);
  left_foot.name = "left_foot";
  left_foot.position.set(-0.35, 0.02, 0.20);
  left_foot.scale.set(0.36, 0.22, 0.43);
  left_leg_group.add(left_foot);

  const right_foot = new THREE.Mesh(footGeom, bodyMat);
  right_foot.name = "right_foot";
  right_foot.position.set(0.35, 0.02, 0.20);
  right_foot.scale.set(0.36, 0.22, 0.43);
  right_leg_group.add(right_foot);

  const earGeom = new THREE.SphereGeometry(1, 28, 20);

  const left_ear = new THREE.Mesh(earGeom, headMat);
  left_ear.name = "left_ear";
  left_ear.position.set(-0.59, 2.58, -0.01);
  left_ear.rotation.z = -0.12;
  left_ear.scale.set(0.34, 0.37, 0.25);
  head_group.add(left_ear);

  const right_ear = new THREE.Mesh(earGeom, headMat);
  right_ear.name = "right_ear";
  right_ear.position.set(0.59, 2.58, -0.01);
  right_ear.rotation.z = 0.12;
  right_ear.scale.set(0.34, 0.37, 0.25);
  head_group.add(right_ear);

  const inner_earGeom = new THREE.SphereGeometry(1, 24, 16);

  const left_inner_ear = new THREE.Mesh(inner_earGeom, inner_earMat);
  left_inner_ear.name = "left_inner_ear";
  left_inner_ear.position.set(-0.61, 2.57, 0.17);
  left_inner_ear.rotation.z = -0.12;
  left_inner_ear.scale.set(0.20, 0.24, 0.055);
  head_group.add(left_inner_ear);

  const right_inner_ear = new THREE.Mesh(inner_earGeom, inner_earMat);
  right_inner_ear.name = "right_inner_ear";
  right_inner_ear.position.set(0.61, 2.57, 0.17);
  right_inner_ear.rotation.z = 0.12;
  right_inner_ear.scale.set(0.20, 0.24, 0.055);
  head_group.add(right_inner_ear);

  const headGeom = new THREE.SphereGeometry(1, 36, 28);
  const head = new THREE.Mesh(headGeom, headMat);
  head.name = "head";
  head.position.set(0, 2.08, 0);
  head.scale.set(0.72, 0.70, 0.62);
  head_group.add(head);

  const muzzleGeom = new THREE.SphereGeometry(1, 32, 24);
  const muzzle = new THREE.Mesh(muzzleGeom, muzzleMat);
  muzzle.name = "muzzle";
  muzzle.position.set(0, 1.94, 0.49);
  muzzle.scale.set(0.43, 0.34, 0.30);
  head_group.add(muzzle);

  const eyeGeom = new THREE.SphereGeometry(1, 24, 18);

  const left_eye = new THREE.Mesh(eyeGeom, eyeMat);
  left_eye.name = "left_eye";
  left_eye.position.set(-0.29, 2.18, 0.56);
  left_eye.scale.set(0.105, 0.125, 0.085);
  head_group.add(left_eye);

  const right_eye = new THREE.Mesh(eyeGeom, eyeMat);
  right_eye.name = "right_eye";
  right_eye.position.set(0.29, 2.18, 0.56);
  right_eye.scale.set(0.105, 0.125, 0.085);
  head_group.add(right_eye);

  const eye_highlightGeom = new THREE.SphereGeometry(1, 16, 12);

  const left_eye_highlight = new THREE.Mesh(eye_highlightGeom, highlightMat);
  left_eye_highlight.name = "left_eye_highlight";
  left_eye_highlight.position.set(-0.318, 2.218, 0.637);
  left_eye_highlight.scale.set(0.027, 0.032, 0.018);
  head_group.add(left_eye_highlight);

  const right_eye_highlight = new THREE.Mesh(eye_highlightGeom, highlightMat);
  right_eye_highlight.name = "right_eye_highlight";
  right_eye_highlight.position.set(0.262, 2.218, 0.637);
  right_eye_highlight.scale.set(0.027, 0.032, 0.018);
  head_group.add(right_eye_highlight);

  const noseShape = new THREE.Shape();
  noseShape.moveTo(-0.14, 0.055);
  noseShape.bezierCurveTo(-0.13, 0.125, 0.13, 0.125, 0.14, 0.055);
  noseShape.bezierCurveTo(0.13, -0.015, 0.045, -0.105, 0.0, -0.12);
  noseShape.bezierCurveTo(-0.045, -0.105, -0.13, -0.015, -0.14, 0.055);

  const noseGeom = new THREE.ExtrudeGeometry(noseShape, {
    curveSegments: 12,
    steps: 1,
    depth: 0.04
  });
  const nose = new THREE.Mesh(noseGeom, noseMat);
  nose.name = "nose";
  nose.position.set(0, 2.01, 0.77);
  head_group.add(nose);

  const mouth_center_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 1.895, 0.792),
    new THREE.Vector3(0.00, 1.855, 0.790),
    new THREE.Vector3(0.00, 1.815, 0.785)
  ]);
  const mouth_centerGeom = new THREE.TubeGeometry(
    mouth_center_curve,
    8,
    0.011,
    8,
    false
  );
  const mouth_center = new THREE.Mesh(mouth_centerGeom, seamMat);
  mouth_center.name = "mouth_center";
  head_group.add(mouth_center);

  const mouth_left_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 1.815, 0.785),
    new THREE.Vector3(-0.065, 1.775, 0.781),
    new THREE.Vector3(-0.145, 1.795, 0.765)
  ]);
  const mouth_leftGeom = new THREE.TubeGeometry(
    mouth_left_curve,
    10,
    0.011,
    8,
    false
  );
  const mouth_left = new THREE.Mesh(mouth_leftGeom, seamMat);
  mouth_left.name = "mouth_left";
  head_group.add(mouth_left);

  const mouth_right_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 1.815, 0.785),
    new THREE.Vector3(0.065, 1.775, 0.781),
    new THREE.Vector3(0.145, 1.795, 0.765)
  ]);
  const mouth_rightGeom = new THREE.TubeGeometry(
    mouth_right_curve,
    10,
    0.011,
    8,
    false
  );
  const mouth_right = new THREE.Mesh(mouth_rightGeom, seamMat);
  mouth_right.name = "mouth_right";
  head_group.add(mouth_right);

  const head_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 2.745, 0.125),
    new THREE.Vector3(0.00, 2.665, 0.305),
    new THREE.Vector3(0.00, 2.535, 0.455),
    new THREE.Vector3(0.00, 2.390, 0.555),
    new THREE.Vector3(0.00, 2.285, 0.595)
  ]);
  const head_seamGeom = new THREE.TubeGeometry(
    head_seam_curve,
    20,
    0.008,
    7,
    false
  );
  const head_seam = new THREE.Mesh(head_seamGeom, seamMat);
  head_seam.name = "head_seam";
  head_group.add(head_seam);

  const belly_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 1.57, 0.315),
    new THREE.Vector3(0.00, 1.35, 0.425),
    new THREE.Vector3(0.00, 1.05, 0.475),
    new THREE.Vector3(0.00, 0.72, 0.445),
    new THREE.Vector3(0.00, 0.43, 0.335)
  ]);
  const belly_seamGeom = new THREE.TubeGeometry(
    belly_seam_curve,
    20,
    0.009,
    7,
    false
  );
  const belly_seam = new THREE.Mesh(belly_seamGeom, seamMat);
  belly_seam.name = "belly_seam";
  torso_group.add(belly_seam);

  const left_arm_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.68, 1.42, 0.185),
    new THREE.Vector3(-0.73, 1.08, 0.255),
    new THREE.Vector3(-0.79, 0.70, 0.205)
  ]);
  const left_arm_seamGeom = new THREE.TubeGeometry(
    left_arm_seam_curve,
    12,
    0.008,
    7,
    false
  );
  const left_arm_seam = new THREE.Mesh(left_arm_seamGeom, seamMat);
  left_arm_seam.name = "left_arm_seam";
  left_arm_group.add(left_arm_seam);

  const right_arm_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.68, 1.42, 0.185),
    new THREE.Vector3(0.73, 1.08, 0.255),
    new THREE.Vector3(0.79, 0.70, 0.205)
  ]);
  const right_arm_seamGeom = new THREE.TubeGeometry(
    right_arm_seam_curve,
    12,
    0.008,
    7,
    false
  );
  const right_arm_seam = new THREE.Mesh(right_arm_seamGeom, seamMat);
  right_arm_seam.name = "right_arm_seam";
  right_arm_group.add(right_arm_seam);

  const left_foot_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0.175, 0.565),
    new THREE.Vector3(-0.35, 0.105, 0.625),
    new THREE.Vector3(-0.35, 0.035, 0.642)
  ]);
  const left_foot_seamGeom = new THREE.TubeGeometry(
    left_foot_seam_curve,
    8,
    0.008,
    7,
    false
  );
  const left_foot_seam = new THREE.Mesh(left_foot_seamGeom, seamMat);
  left_foot_seam.name = "left_foot_seam";
  left_leg_group.add(left_foot_seam);

  const right_foot_seam_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.175, 0.565),
    new THREE.Vector3(0.35, 0.105, 0.625),
    new THREE.Vector3(0.35, 0.035, 0.642)
  ]);
  const right_foot_seamGeom = new THREE.TubeGeometry(
    right_foot_seam_curve,
    8,
    0.008,
    7,
    false
  );
  const right_foot_seam = new THREE.Mesh(right_foot_seamGeom, seamMat);
  right_foot_seam.name = "right_foot_seam";
  right_leg_group.add(right_foot_seam);

  const fur_lightColor = new THREE.Color(0xd5ae7d);
  const fur_midColor = new THREE.Color(0xc19464);
  const fur_darkColor = new THREE.Color(0xa9784f);
  const fur_paleColor = new THREE.Color(0xdfc092);

  const fur_lightMat = new THREE.MeshStandardMaterial({
    color: fur_lightColor,
    metalness: 0.0,
    roughness: 1.0
  });
  const fur_midMat = new THREE.MeshStandardMaterial({
    color: fur_midColor,
    metalness: 0.0,
    roughness: 1.0
  });
  const fur_darkMat = new THREE.MeshStandardMaterial({
    color: fur_darkColor,
    metalness: 0.0,
    roughness: 1.0
  });
  const fur_paleMat = new THREE.MeshStandardMaterial({
    color: fur_paleColor,
    metalness: 0.0,
    roughness: 1.0
  });

  const fur_strandGeom = new THREE.CylinderGeometry(
    0.0022,
    0.0034,
    1,
    5,
    1,
    false
  );

  const fur_matrices = [[], [], [], []];
  const golden_angle = Math.PI * (3 - Math.sqrt(5));

  function appendFur(
    center,
    radii,
    count,
    phase,
    rotation,
    material_index,
    fiber_scale
  ) {
    const surface_rotation = new THREE.Quaternion().setFromEuler(rotation);
    const normal = new THREE.Vector3();
    const surface_point = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const bitangent = new THREE.Vector3();
    const strand_direction = new THREE.Vector3();
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < count; i++) {
      const v = (i + 0.5) / count;
      const ny = 1 - 2 * v;
      const ring = Math.sqrt(Math.max(0, 1 - ny * ny));
      const angle = i * golden_angle + phase;
      const nx = Math.cos(angle) * ring;
      const nz = Math.sin(angle) * ring;

      normal.set(nx, ny, nz).applyQuaternion(surface_rotation).normalize();
      surface_point
        .set(nx * radii.x, ny * radii.y, nz * radii.z)
        .applyQuaternion(surface_rotation)
        .add(center);

      tangent.set(-normal.z, 0, normal.x);
      if (tangent.lengthSq() < 0.0001) {
        tangent.set(1, 0, 0);
      }
      tangent.normalize();
      bitangent.crossVectors(normal, tangent).normalize();

      const lean_a = Math.sin(i * 1.731 + phase) * 0.18;
      const lean_b = Math.cos(i * 2.173 + phase * 0.7) * 0.12;
      strand_direction
        .copy(normal)
        .addScaledVector(tangent, lean_a)
        .addScaledVector(bitangent, lean_b)
        .normalize();

      const length_wave = 0.5 + 0.5 * Math.sin(i * 12.9898 + phase * 3.17);
      const strand_length = fiber_scale * (0.038 + 0.034 * length_wave);
      const width_scale =
        0.72 + 0.30 * (0.5 + 0.5 * Math.cos(i * 7.371 + phase));

      dummy.position
        .copy(surface_point)
        .addScaledVector(strand_direction, strand_length * 0.47);
      dummy.quaternion.setFromUnitVectors(up, strand_direction);
      dummy.scale.set(width_scale, strand_length, width_scale);
      dummy.updateMatrix();

      const color_index = (i * 7 + material_index * 3) % 4;
      fur_matrices[color_index].push(dummy.matrix.clone());
    }
  }

  function appendEllipsoidFur(
    center,
    radii,
    count,
    phase,
    material_index,
    rotation,
    fiber_scale
  ) {
    appendFur(
      center,
      radii,
      count,
      phase,
      rotation,
      material_index,
      fiber_scale
    );
  }

  function appendEarEdgeFur(
    center,
    radii,
    count,
    phase,
    material_index,
    rotation
  ) {
    const surface_rotation = new THREE.Quaternion().setFromEuler(rotation);
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3();
    const surface_point = new THREE.Vector3();
    const strand_direction = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + phase;
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);

      normal.set(nx, ny, 0).applyQuaternion(surface_rotation).normalize();
      surface_point
        .set(nx * radii.x, ny * radii.y, 0)
        .applyQuaternion(surface_rotation)
        .add(center);

      strand_direction
        .copy(normal)
        .add(new THREE.Vector3(0, 0, 0.18 + 0.08 * Math.sin(i * 1.91)))
        .normalize();

      const strand_length = 0.045 + 0.025 * (
        0.5 + 0.5 * Math.sin(i * 9.173 + phase)
      );

      dummy.position
        .copy(surface_point)
        .addScaledVector(strand_direction, strand_length * 0.48);
      dummy.quaternion.setFromUnitVectors(up, strand_direction);
      dummy.scale.set(0.85, strand_length, 0.85);
      dummy.updateMatrix();
      fur_matrices[(i * 3 + material_index) % 4].push(dummy.matrix.clone());
    }
  }

  appendEllipsoidFur(
    new THREE.Vector3(0, 2.08, 0),
    new THREE.Vector3(0.72, 0.70, 0.62),
    4200,
    0.2,
    0,
    new THREE.Euler(0, 0, 0),
    1.0
  );
  appendEllipsoidFur(
    new THREE.Vector3(0, 1.94, 0.49),
    new THREE.Vector3(0.43, 0.34, 0.30),
    1300,
    1.1,
    3,
    new THREE.Euler(0, 0, 0),
    0.82
  );
  appendEllipsoidFur(
    new THREE.Vector3(0, 0.95, -0.02),
    new THREE.Vector3(0.60, 0.84, 0.47),
    3000,
    2.0,
    2,
    new THREE.Euler(0, 0, 0),
    1.0
  );
  appendEllipsoidFur(
    new THREE.Vector3(-0.61, 1.02, 0.00),
    new THREE.Vector3(0.24, 0.62, 0.25),
    900,
    0.7,
    2,
    new THREE.Euler(0, 0, -0.24),
    0.95
  );
  appendEllipsoidFur(
    new THREE.Vector3(0.61, 1.02, 0.00),
    new THREE.Vector3(0.24, 0.62, 0.25),
    900,
    1.6,
    2,
    new THREE.Euler(0, 0, 0.24),
    0.95
  );
  appendEllipsoidFur(
    new THREE.Vector3(-0.34, 0.38, 0.02),
    new THREE.Vector3(0.31, 0.43, 0.32),
    900,
    2.5,
    2,
    new THREE.Euler(0, 0, -0.08),
    0.95
  );
  appendEllipsoidFur(
    new THREE.Vector3(0.34, 0.38, 0.02),
    new THREE.Vector3(0.31, 0.43, 0.32),
    900,
    3.2,
    2,
    new THREE.Euler(0, 0, 0.08),
    0.95
  );
  appendEllipsoidFur(
    new THREE.Vector3(-0.35, 0.02, 0.20),
    new THREE.Vector3(0.36, 0.22, 0.43),
    1000,
    0.4,
    1,
    new THREE.Euler(0, 0, 0),
    0.9
  );
  appendEllipsoidFur(
    new THREE.Vector3(0.35, 0.02, 0.20),
    new THREE.Vector3(0.36, 0.22, 0.43),
    1000,
    1.4,
    1,
    new THREE.Euler(0, 0, 0),
    0.9
  );
  appendEllipsoidFur(
    new THREE.Vector3(-0.59, 2.58, -0.01),
    new THREE.Vector3(0.34, 0.37, 0.25),
    700,
    2.2,
    1,
    new THREE.Euler(0, 0, -0.12),
    0.95
  );
  appendEllipsoidFur(
    new THREE.Vector3(0.59, 2.58, -0.01),
    new THREE.Vector3(0.34, 0.37, 0.25),
    700,
    3.0,
    1,
    new THREE.Euler(0, 0, 0.12),
    0.95
  );

  appendEarEdgeFur(
    new THREE.Vector3(-0.59, 2.58, -0.01),
    new THREE.Vector3(0.34, 0.37, 0.25),
    180,
    0.3,
    1,
    new THREE.Euler(0, 0, -0.12)
  );
  appendEarEdgeFur(
    new THREE.Vector3(0.59, 2.58, -0.01),
    new THREE.Vector3(0.34, 0.37, 0.25),
    180,
    1.2,
    1,
    new THREE.Euler(0, 0, 0.12)
  );

  function makeFurMesh(name, matrices, material) {
    const fur_mesh = new THREE.InstancedMesh(
      fur_strandGeom,
      material,
      matrices.length
    );
    fur_mesh.name = name;
    for (let i = 0; i < matrices.length; i++) {
      fur_mesh.setMatrixAt(i, matrices[i]);
    }
    fur_mesh.instanceMatrix.needsUpdate = true;
    fur_mesh.frustumCulled = false;
    return fur_mesh;
  }

  const fur_light = makeFurMesh("fur_light", fur_matrices[0], fur_lightMat);
  const fur_mid = makeFurMesh("fur_mid", fur_matrices[1], fur_midMat);
  const fur_dark = makeFurMesh("fur_dark", fur_matrices[2], fur_darkMat);
  const fur_pale = makeFurMesh("fur_pale", fur_matrices[3], fur_paleMat);
  root.add(fur_light, fur_mid, fur_dark, fur_pale);

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