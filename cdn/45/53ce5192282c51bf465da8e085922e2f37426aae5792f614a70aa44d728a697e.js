export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_urn";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb8754f,
    metalness: 0.6,
    roughness: 0.4,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc8a45b,
    metalness: 0.6,
    roughness: 0.4,
  });
  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2a1c,
    metalness: 0.2,
    roughness: 0.3,
  });

  function makeHorizontalTorus(name, radius, tube, y, mat) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 64), mat);
    mesh.name = name;
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = y;
    root.add(mesh);
    return mesh;
  }

  function makeTube(name, points, radius, mat, segments = 24) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, false),
      mat
    );
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const pedestal_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(1.20, 0.00),
    new THREE.Vector2(1.34, 0.05),
    new THREE.Vector2(1.41, 0.13),
    new THREE.Vector2(1.40, 0.22),
    new THREE.Vector2(1.34, 0.31),
    new THREE.Vector2(1.25, 0.40),
    new THREE.Vector2(1.13, 0.48),
    new THREE.Vector2(1.00, 0.57),
    new THREE.Vector2(0.88, 0.68),
    new THREE.Vector2(0.78, 0.81),
    new THREE.Vector2(0.70, 0.96),
    new THREE.Vector2(0.64, 1.12),
    new THREE.Vector2(0.60, 1.27),
    new THREE.Vector2(0.59, 1.38),
    new THREE.Vector2(0.63, 1.47),
    new THREE.Vector2(0.70, 1.54),
    new THREE.Vector2(0.70, 1.61),
    new THREE.Vector2(0.64, 1.68),
    new THREE.Vector2(0.53, 1.72),
    new THREE.Vector2(0.00, 1.72),
  ];
  const pedestal_footGeom = new THREE.LatheGeometry(pedestal_footProfile, 64);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, copperMat);
  pedestal_foot.name = "pedestal_foot";
  root.add(pedestal_foot);

  const base_ornament_bandGeom = new THREE.CylinderGeometry(
    1.34,
    1.39,
    0.18,
    64
  );
  const base_ornament_band = new THREE.Mesh(
    base_ornament_bandGeom,
    darkBronzeMat
  );
  base_ornament_band.name = "base_ornament_band";
  base_ornament_band.position.y = 0.25;
  root.add(base_ornament_band);

  const base_lower_rim = makeHorizontalTorus(
    "base_lower_rim",
    1.37,
    0.045,
    0.10,
    goldMat
  );
  const base_upper_rim = makeHorizontalTorus(
    "base_upper_rim",
    1.32,
    0.035,
    0.36,
    goldMat
  );
  const base_neck_rim = makeHorizontalTorus(
    "base_neck_rim",
    0.66,
    0.045,
    1.57,
    goldMat
  );

  const base_scrollGeom = new THREE.TorusGeometry(0.105, 0.018, 7, 18);
  const base_scroll_ornaments = new THREE.InstancedMesh(
    base_scrollGeom,
    goldMat,
    20
  );
  base_scroll_ornaments.name = "base_scroll_ornaments";
  const base_scroll_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    base_scroll_dummy.position.set(
      Math.sin(angle) * 1.375,
      0.255,
      Math.cos(angle) * 1.375
    );
    base_scroll_dummy.rotation.set(0, angle, 0);
    base_scroll_dummy.scale.set(1.0, 0.72, 1.0);
    base_scroll_dummy.updateMatrix();
    base_scroll_ornaments.setMatrixAt(i, base_scroll_dummy.matrix);
  }
  base_scroll_ornaments.instanceMatrix.needsUpdate = true;
  root.add(base_scroll_ornaments);

  const base_leafGeom = new THREE.SphereGeometry(1, 12, 8);
  const base_leaf_ornaments = new THREE.InstancedMesh(
    base_leafGeom,
    goldMat,
    20
  );
  base_leaf_ornaments.name = "base_leaf_ornaments";
  const base_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = ((i + 0.5) / 20) * Math.PI * 2;
    base_leaf_dummy.position.set(
      Math.sin(angle) * 1.385,
      0.255,
      Math.cos(angle) * 1.385
    );
    base_leaf_dummy.rotation.set(0, angle, 0);
    base_leaf_dummy.scale.set(0.032, 0.105, 0.014);
    base_leaf_dummy.updateMatrix();
    base_leaf_ornaments.setMatrixAt(i, base_leaf_dummy.matrix);
  }
  base_leaf_ornaments.instanceMatrix.needsUpdate = true;
  root.add(base_leaf_ornaments);

  const main_bodyProfile = [
    new THREE.Vector2(0.00, 1.43),
    new THREE.Vector2(0.52, 1.43),
    new THREE.Vector2(0.62, 1.50),
    new THREE.Vector2(0.70, 1.62),
    new THREE.Vector2(0.74, 1.78),
    new THREE.Vector2(0.77, 1.98),
    new THREE.Vector2(0.82, 2.25),
    new THREE.Vector2(0.88, 2.55),
    new THREE.Vector2(0.94, 2.85),
    new THREE.Vector2(1.00, 3.15),
    new THREE.Vector2(1.06, 3.45),
    new THREE.Vector2(1.12, 3.75),
    new THREE.Vector2(1.18, 4.05),
    new THREE.Vector2(1.23, 4.30),
    new THREE.Vector2(1.25, 4.42),
    new THREE.Vector2(1.22, 4.49),
    new THREE.Vector2(0.00, 4.49),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, copperMat);
  main_body.name = "main_body";
  root.add(main_body);

  const body_lower_bandGeom = new THREE.CylinderGeometry(
    0.76,
    0.73,
    0.11,
    64
  );
  const body_lower_band = new THREE.Mesh(body_lower_bandGeom, goldMat);
  body_lower_band.name = "body_lower_band";
  body_lower_band.position.y = 1.76;
  root.add(body_lower_band);

  const body_lower_trim = makeHorizontalTorus(
    "body_lower_trim",
    0.75,
    0.035,
    1.82,
    goldMat
  );

  const body_upper_bandGeom = new THREE.CylinderGeometry(
    1.25,
    1.23,
    0.34,
    64
  );
  const body_upper_band = new THREE.Mesh(body_upper_bandGeom, copperMat);
  body_upper_band.name = "body_upper_band";
  body_upper_band.position.y = 4.31;
  root.add(body_upper_band);

  const body_upper_lower_trim = makeHorizontalTorus(
    "body_upper_lower_trim",
    1.235,
    0.035,
    4.14,
    goldMat
  );
  const body_upper_upper_trim = makeHorizontalTorus(
    "body_upper_upper_trim",
    1.255,
    0.04,
    4.48,
    goldMat
  );

  const lidProfile = [
    new THREE.Vector2(0.00, 4.43),
    new THREE.Vector2(1.20, 4.43),
    new THREE.Vector2(1.28, 4.47),
    new THREE.Vector2(1.31, 4.52),
    new THREE.Vector2(1.27, 4.58),
    new THREE.Vector2(1.18, 4.63),
    new THREE.Vector2(1.10, 4.72),
    new THREE.Vector2(1.02, 4.84),
    new THREE.Vector2(0.94, 4.98),
    new THREE.Vector2(0.85, 5.13),
    new THREE.Vector2(0.75, 5.28),
    new THREE.Vector2(0.64, 5.41),
    new THREE.Vector2(0.52, 5.51),
    new THREE.Vector2(0.39, 5.57),
    new THREE.Vector2(0.25, 5.60),
    new THREE.Vector2(0.00, 5.60),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, copperMat);
  lid.name = "lid";
  root.add(lid);

  const lid_brimGeom = new THREE.CylinderGeometry(1.34, 1.31, 0.09, 64);
  const lid_brim = new THREE.Mesh(lid_brimGeom, goldMat);
  lid_brim.name = "lid_brim";
  lid_brim.position.y = 4.51;
  root.add(lid_brim);

  const lid_brim_trim = makeHorizontalTorus(
    "lid_brim_trim",
    1.31,
    0.035,
    4.55,
    goldMat
  );

  const lid_domeProfile = [
    new THREE.Vector2(0.00, 5.50),
    new THREE.Vector2(0.43, 5.50),
    new THREE.Vector2(0.49, 5.55),
    new THREE.Vector2(0.48, 5.63),
    new THREE.Vector2(0.44, 5.72),
    new THREE.Vector2(0.38, 5.82),
    new THREE.Vector2(0.30, 5.91),
    new THREE.Vector2(0.21, 5.98),
    new THREE.Vector2(0.11, 6.02),
    new THREE.Vector2(0.00, 6.03),
  ];
  const lid_domeGeom = new THREE.LatheGeometry(lid_domeProfile, 48);
  const lid_dome = new THREE.Mesh(lid_domeGeom, goldMat);
  lid_dome.name = "lid_dome";
  root.add(lid_dome);

  const lid_dome_base = makeHorizontalTorus(
    "lid_dome_base",
    0.45,
    0.028,
    5.55,
    goldMat
  );

  const finial_stemProfile = [
    new THREE.Vector2(0.00, 5.96),
    new THREE.Vector2(0.10, 5.96),
    new THREE.Vector2(0.14, 6.01),
    new THREE.Vector2(0.15, 6.08),
    new THREE.Vector2(0.12, 6.15),
    new THREE.Vector2(0.10, 6.20),
    new THREE.Vector2(0.15, 6.25),
    new THREE.Vector2(0.16, 6.31),
    new THREE.Vector2(0.12, 6.38),
    new THREE.Vector2(0.00, 6.38),
  ];
  const finial_stemGeom = new THREE.LatheGeometry(finial_stemProfile, 40);
  const finial_stem = new THREE.Mesh(finial_stemGeom, goldMat);
  finial_stem.name = "finial_stem";
  root.add(finial_stem);

  const finial_lower_ring = makeHorizontalTorus(
    "finial_lower_ring",
    0.13,
    0.025,
    6.08,
    goldMat
  );
  const finial_upper_ring = makeHorizontalTorus(
    "finial_upper_ring",
    0.14,
    0.023,
    6.27,
    goldMat
  );

  const finial_gemGeom = new THREE.OctahedronGeometry(1, 0);
  const finial_gem = new THREE.Mesh(finial_gemGeom, goldMat);
  finial_gem.name = "finial_gem";
  finial_gem.position.y = 6.58;
  finial_gem.scale.set(0.25, 0.38, 0.25);
  root.add(finial_gem);

  const left_side_rib = makeTube(
    "left_side_rib",
    [
      new THREE.Vector3(-0.70, 1.72, 0.08),
      new THREE.Vector3(-0.82, 2.35, 0.08),
      new THREE.Vector3(-0.98, 3.20, 0.08),
      new THREE.Vector3(-1.18, 4.25, 0.08),
    ],
    0.035,
    goldMat,
    32
  );

  const right_side_rib = makeTube(
    "right_side_rib",
    [
      new THREE.Vector3(0.70, 1.72, 0.08),
      new THREE.Vector3(0.82, 2.35, 0.08),
      new THREE.Vector3(0.98, 3.20, 0.08),
      new THREE.Vector3(1.18, 4.25, 0.08),
    ],
    0.035,
    goldMat,
    32
  );

  const rib_mountGeom = new THREE.SphereGeometry(1, 16, 10);

  const left_lower_rib_mount = new THREE.Mesh(rib_mountGeom, goldMat);
  left_lower_rib_mount.name = "left_lower_rib_mount";
  left_lower_rib_mount.position.set(-0.70, 1.72, 0.08);
  left_lower_rib_mount.scale.set(0.09, 0.15, 0.07);
  root.add(left_lower_rib_mount);

  const right_lower_rib_mount = new THREE.Mesh(rib_mountGeom, goldMat);
  right_lower_rib_mount.name = "right_lower_rib_mount";
  right_lower_rib_mount.position.set(0.70, 1.72, 0.08);
  right_lower_rib_mount.scale.set(0.09, 0.15, 0.07);
  root.add(right_lower_rib_mount);

  const left_upper_rib_mount = new THREE.Mesh(rib_mountGeom, goldMat);
  left_upper_rib_mount.name = "left_upper_rib_mount";
  left_upper_rib_mount.position.set(-1.18, 4.25, 0.08);
  left_upper_rib_mount.scale.set(0.10, 0.13, 0.07);
  root.add(left_upper_rib_mount);

  const right_upper_rib_mount = new THREE.Mesh(rib_mountGeom, goldMat);
  right_upper_rib_mount.name = "right_upper_rib_mount";
  right_upper_rib_mount.position.set(1.18, 4.25, 0.08);
  right_upper_rib_mount.scale.set(0.10, 0.13, 0.07);
  root.add(right_upper_rib_mount);

  const left_handle_backplate = makeTube(
    "left_handle_backplate",
    [
      new THREE.Vector3(-1.18, 4.24, 0.02),
      new THREE.Vector3(-1.34, 4.35, 0.02),
      new THREE.Vector3(-1.47, 4.56, 0.02),
      new THREE.Vector3(-1.56, 4.78, 0.02),
      new THREE.Vector3(-1.72, 4.94, 0.02),
    ],
    0.075,
    darkBronzeMat,
    28
  );

  const right_handle_backplate = makeTube(
    "right_handle_backplate",
    [
      new THREE.Vector3(1.18, 4.24, 0.02),
      new THREE.Vector3(1.34, 4.35, 0.02),
      new THREE.Vector3(1.47, 4.56, 0.02),
      new THREE.Vector3(1.56, 4.78, 0.02),
      new THREE.Vector3(1.72, 4.94, 0.02),
    ],
    0.075,
    darkBronzeMat,
    28
  );

  const left_handle_outer = makeTube(
    "left_handle_outer",
    [
      new THREE.Vector3(-1.18, 4.24, 0.08),
      new THREE.Vector3(-1.34, 4.35, 0.08),
      new THREE.Vector3(-1.47, 4.56, 0.08),
      new THREE.Vector3(-1.56, 4.78, 0.08),
      new THREE.Vector3(-1.72, 4.94, 0.08),
    ],
    0.038,
    goldMat,
    28
  );

  const right_handle_outer = makeTube(
    "right_handle_outer",
    [
      new THREE.Vector3(1.18, 4.24, 0.08),
      new THREE.Vector3(1.34, 4.35, 0.08),
      new THREE.Vector3(1.47, 4.56, 0.08),
      new THREE.Vector3(1.56, 4.78, 0.08),
      new THREE.Vector3(1.72, 4.94, 0.08),
    ],
    0.038,
    goldMat,
    28
  );

  const left_handle_scroll = makeTube(
    "left_handle_scroll",
    [
      new THREE.Vector3(-1.20, 4.20, 0.10),
      new THREE.Vector3(-1.25, 4.02, 0.10),
      new THREE.Vector3(-1.38, 3.88, 0.10),
      new THREE.Vector3(-1.53, 3.84, 0.10),
      new THREE.Vector3(-1.63, 3.93, 0.10),
      new THREE.Vector3(-1.61, 4.06, 0.10),
      new THREE.Vector3(-1.50, 4.11, 0.10),
      new THREE.Vector3(-1.43, 4.04, 0.10),
    ],
    0.035,
    goldMat,
    30
  );

  const right_handle_scroll = makeTube(
    "right_handle_scroll",
    [
      new THREE.Vector3(1.20, 4.20, 0.10),
      new THREE.Vector3(1.25, 4.02, 0.10),
      new THREE.Vector3(1.38, 3.88, 0.10),
      new THREE.Vector3(1.53, 3.84, 0.10),
      new THREE.Vector3(1.63, 3.93, 0.10),
      new THREE.Vector3(1.61, 4.06, 0.10),
      new THREE.Vector3(1.50, 4.11, 0.10),
      new THREE.Vector3(1.43, 4.04, 0.10),
    ],
    0.035,
    goldMat,
    30
  );

  const left_handle_lower_scroll = makeTube(
    "left_handle_lower_scroll",
    [
      new THREE.Vector3(-1.20, 4.18, 0.11),
      new THREE.Vector3(-1.34, 4.10, 0.11),
      new THREE.Vector3(-1.48, 4.08, 0.11),
      new THREE.Vector3(-1.57, 4.15, 0.11),
      new THREE.Vector3(-1.55, 4.25, 0.11),
      new THREE.Vector3(-1.47, 4.28, 0.11),
    ],
    0.027,
    goldMat,
    22
  );

  const right_handle_lower_scroll = makeTube(
    "right_handle_lower_scroll",
    [
      new THREE.Vector3(1.20, 4.18, 0.11),
      new THREE.Vector3(1.34, 4.10, 0.11),
      new THREE.Vector3(1.48, 4.08, 0.11),
      new THREE.Vector3(1.57, 4.15, 0.11),
      new THREE.Vector3(1.55, 4.25, 0.11),
      new THREE.Vector3(1.47, 4.28, 0.11),
    ],
    0.027,
    goldMat,
    22
  );

  const handle_leafGeom = new THREE.SphereGeometry(1, 16, 10);

  const left_handle_leaf = new THREE.Mesh(handle_leafGeom, goldMat);
  left_handle_leaf.name = "left_handle_leaf";
  left_handle_leaf.position.set(-1.34, 4.27, 0.12);
  left_handle_leaf.rotation.z = -0.55;
  left_handle_leaf.scale.set(0.065, 0.20, 0.028);
  root.add(left_handle_leaf);

  const right_handle_leaf = new THREE.Mesh(handle_leafGeom, goldMat);
  right_handle_leaf.name = "right_handle_leaf";
  right_handle_leaf.position.set(1.34, 4.27, 0.12);
  right_handle_leaf.rotation.z = 0.55;
  right_handle_leaf.scale.set(0.065, 0.20, 0.028);
  root.add(right_handle_leaf);

  const left_handle_rosette = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.035, 20),
    darkBronzeMat
  );
  left_handle_rosette.name = "left_handle_rosette";
  left_handle_rosette.rotation.x = Math.PI / 2;
  left_handle_rosette.position.set(-1.29, 4.31, 0.13);
  root.add(left_handle_rosette);

  const right_handle_rosette = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.035, 20),
    darkBronzeMat
  );
  right_handle_rosette.name = "right_handle_rosette";
  right_handle_rosette.rotation.x = Math.PI / 2;
  right_handle_rosette.position.set(1.29, 4.31, 0.13);
  root.add(right_handle_rosette);

  const left_handle_rosette_center = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 8),
    goldMat
  );
  left_handle_rosette_center.name = "left_handle_rosette_center";
  left_handle_rosette_center.position.set(-1.29, 4.31, 0.16);
  root.add(left_handle_rosette_center);

  const right_handle_rosette_center = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 8),
    goldMat
  );
  right_handle_rosette_center.name = "right_handle_rosette_center";
  right_handle_rosette_center.position.set(1.29, 4.31, 0.16);
  root.add(right_handle_rosette_center);

  const front_left_scroll = makeTube(
    "front_left_scroll",
    [
      new THREE.Vector3(-0.01, 4.31, 1.285),
      new THREE.Vector3(-0.12, 4.24, 1.285),
      new THREE.Vector3(-0.25, 4.20, 1.285),
      new THREE.Vector3(-0.38, 4.22, 1.285),
      new THREE.Vector3(-0.46, 4.30, 1.285),
      new THREE.Vector3(-0.44, 4.39, 1.285),
      new THREE.Vector3(-0.36, 4.42, 1.285),
      new THREE.Vector3(-0.30, 4.37, 1.285),
    ],
    0.027,
    goldMat,
    28
  );

  const front_right_scroll = makeTube(
    "front_right_scroll",
    [
      new THREE.Vector3(0.01, 4.31, 1.285),
      new THREE.Vector3(0.12, 4.24, 1.285),
      new THREE.Vector3(0.25, 4.20, 1.285),
      new THREE.Vector3(0.38, 4.22, 1.285),
      new THREE.Vector3(0.46, 4.30, 1.285),
      new THREE.Vector3(0.44, 4.39, 1.285),
      new THREE.Vector3(0.36, 4.42, 1.285),
      new THREE.Vector3(0.30, 4.37, 1.285),
    ],
    0.027,
    goldMat,
    28
  );

  const front_center_spine = makeTube(
    "front_center_spine",
    [
      new THREE.Vector3(0.00, 4.17, 1.29),
      new THREE.Vector3(0.00, 4.27, 1.29),
      new THREE.Vector3(0.00, 4.39, 1.29),
      new THREE.Vector3(0.00, 4.48, 1.29),
    ],
    0.022,
    goldMat,
    12
  );

  const front_left_ridge = makeTube(
    "front_left_ridge",
    [
      new THREE.Vector3(-0.01, 4.18, 1.29),
      new THREE.Vector3(-0.05, 4.28, 1.29),
      new THREE.Vector3(-0.10, 4.40, 1.29),
    ],
    0.016,
    goldMat,
    10
  );

  const front_right_ridge = makeTube(
    "front_right_ridge",
    [
      new THREE.Vector3(0.01, 4.18, 1.29),
      new THREE.Vector3(0.05, 4.28, 1.29),
      new THREE.Vector3(0.10, 4.40, 1.29),
    ],
    0.016,
    goldMat,
    10
  );

  const front_center_boss = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 16, 10),
    goldMat
  );
  front_center_boss.name = "front_center_boss";
  front_center_boss.position.set(0, 4.18, 1.29);
  front_center_boss.scale.set(0.8, 1.15, 0.45);
  root.add(front_center_boss);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}