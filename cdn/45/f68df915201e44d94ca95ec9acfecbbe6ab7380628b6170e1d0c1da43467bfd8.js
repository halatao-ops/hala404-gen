export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wooden_box";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  const ornament_group = new THREE.Group();
  ornament_group.name = "ornament_group";
  const latch_group = new THREE.Group();
  latch_group.name = "latch_group";

  root.add(base_group, body_group, lid_group, ornament_group, latch_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a5435,
    metalness: 0.0,
    roughness: 0.6
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b633d,
    metalness: 0.0,
    roughness: 0.6
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x75432e,
    metalness: 0.0,
    roughness: 0.62
  });
  const carvingMat = new THREE.MeshStandardMaterial({
    color: 0x2d1a13,
    metalness: 0.0,
    roughness: 0.75
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x4b2b1d,
    metalness: 0.0,
    roughness: 0.8
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.4
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x70552b,
    metalness: 0.5,
    roughness: 0.45
  });
  const keyholeMat = new THREE.MeshStandardMaterial({
    color: 0x17120d,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function roundedBoxGeometry(width, height, depth, radius) {
    const bevel = Math.min(radius * 0.35, height * 0.18, depth * 0.08);
    const shapeWidth = width - bevel * 2;
    const shapeDepth = depth - bevel * 2;
    const shapeRadius = Math.max(0.004, radius - bevel);
    const shape = roundedRectShape(shapeWidth, shapeDepth, shapeRadius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.01, height - bevel * 2),
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelOffset: 0,
      bevelSegments: 2,
      curveSegments: 6
    });
    geometry.center();
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  function addBox(name, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCurveTube(name, points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      segments || Math.max(12, points.length * 5),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    ornament_group.add(mesh);
    return mesh;
  }

  const bottom_plinthGeom = roundedBoxGeometry(2.72, 0.16, 1.52, 0.09);
  const bottom_plinth = new THREE.Mesh(bottom_plinthGeom, edgeWoodMat);
  bottom_plinth.name = "bottom_plinth";
  bottom_plinth.position.y = 0.08;
  base_group.add(bottom_plinth);

  const bottom_moldingGeom = roundedBoxGeometry(2.64, 0.1, 1.46, 0.07);
  const bottom_molding = new THREE.Mesh(bottom_moldingGeom, woodMat);
  bottom_molding.name = "bottom_molding";
  bottom_molding.position.y = 0.18;
  base_group.add(bottom_molding);

  const body_shellGeom = roundedBoxGeometry(2.56, 0.68, 1.38, 0.06);
  const body_shell = new THREE.Mesh(body_shellGeom, woodMat);
  body_shell.name = "body_shell";
  body_shell.position.y = 0.52;
  body_group.add(body_shell);

  const upper_body_railGeom = roundedBoxGeometry(2.64, 0.12, 1.46, 0.07);
  const upper_body_rail = new THREE.Mesh(upper_body_railGeom, edgeWoodMat);
  upper_body_rail.name = "upper_body_rail";
  upper_body_rail.position.y = 0.82;
  body_group.add(upper_body_rail);

  const lid_seamGeom = roundedBoxGeometry(2.66, 0.035, 1.48, 0.055);
  const lid_seam = new THREE.Mesh(lid_seamGeom, carvingMat);
  lid_seam.name = "lid_seam";
  lid_seam.position.y = 0.89;
  lid_group.add(lid_seam);

  const lid_lower_bandGeom = roundedBoxGeometry(2.72, 0.12, 1.52, 0.09);
  const lid_lower_band = new THREE.Mesh(lid_lower_bandGeom, edgeWoodMat);
  lid_lower_band.name = "lid_lower_band";
  lid_lower_band.position.y = 0.95;
  lid_group.add(lid_lower_band);

  const lid_mainGeom = roundedBoxGeometry(2.68, 0.3, 1.5, 0.11);
  const lid_main = new THREE.Mesh(lid_mainGeom, woodMat);
  lid_main.name = "lid_main";
  lid_main.position.y = 1.08;
  lid_group.add(lid_main);

  const lid_top_panelGeom = roundedBoxGeometry(2.48, 0.1, 1.3, 0.07);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, panelMat);
  lid_top_panel.name = "lid_top_panel";
  lid_top_panel.position.y = 1.25;
  lid_group.add(lid_top_panel);

  const front_panelGeom = new THREE.BoxGeometry(2.28, 0.48, 0.026);
  const front_panel = new THREE.Mesh(front_panelGeom, panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, 0.51, 0.704);
  body_group.add(front_panel);

  const rear_panel = new THREE.Mesh(front_panelGeom, panelMat);
  rear_panel.name = "rear_panel";
  rear_panel.position.set(0, 0.51, -0.704);
  body_group.add(rear_panel);

  const side_panelGeom = new THREE.BoxGeometry(0.026, 0.48, 1.12);
  const left_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-1.292, 0.51, 0);
  body_group.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(1.292, 0.51, 0);
  body_group.add(right_side_panel);

  const front_top_trim = addBox(
    "front_top_trim", 2.36, 0.055, 0.045, edgeWoodMat,
    0, 0.775, 0.724
  );
  const front_bottom_trim = addBox(
    "front_bottom_trim", 2.36, 0.055, 0.045, edgeWoodMat,
    0, 0.245, 0.724
  );
  const front_left_trim = addBox(
    "front_left_trim", 0.055, 0.53, 0.045, edgeWoodMat,
    -1.18, 0.51, 0.724
  );
  const front_right_trim = addBox(
    "front_right_trim", 0.055, 0.53, 0.045, edgeWoodMat,
    1.18, 0.51, 0.724
  );

  const rear_top_trim = addBox(
    "rear_top_trim", 2.36, 0.055, 0.045, edgeWoodMat,
    0, 0.775, -0.724
  );
  const rear_bottom_trim = addBox(
    "rear_bottom_trim", 2.36, 0.055, 0.045, edgeWoodMat,
    0, 0.245, -0.724
  );
  const rear_left_trim = addBox(
    "rear_left_trim", 0.055, 0.53, 0.045, edgeWoodMat,
    -1.18, 0.51, -0.724
  );
  const rear_right_trim = addBox(
    "rear_right_trim", 0.055, 0.53, 0.045, edgeWoodMat,
    1.18, 0.51, -0.724
  );

  const left_side_top_trim = addBox(
    "left_side_top_trim", 0.045, 0.055, 1.2, edgeWoodMat,
    -1.307, 0.775, 0
  );
  const left_side_bottom_trim = addBox(
    "left_side_bottom_trim", 0.045, 0.055, 1.2, edgeWoodMat,
    -1.307, 0.245, 0
  );
  const left_side_front_trim = addBox(
    "left_side_front_trim", 0.045, 0.53, 0.055, edgeWoodMat,
    -1.307, 0.51, 0.6
  );
  const left_side_rear_trim = addBox(
    "left_side_rear_trim", 0.045, 0.53, 0.055, edgeWoodMat,
    -1.307, 0.51, -0.6
  );
  const right_side_top_trim = addBox(
    "right_side_top_trim", 0.045, 0.055, 1.2, edgeWoodMat,
    1.307, 0.775, 0
  );
  const right_side_bottom_trim = addBox(
    "right_side_bottom_trim", 0.045, 0.055, 1.2, edgeWoodMat,
    1.307, 0.245, 0
  );
  const right_side_front_trim = addBox(
    "right_side_front_trim", 0.045, 0.53, 0.055, edgeWoodMat,
    1.307, 0.51, 0.6
  );
  const right_side_rear_trim = addBox(
    "right_side_rear_trim", 0.045, 0.53, 0.055, edgeWoodMat,
    1.307, 0.51, -0.6
  );

  const top_front_groove = addBox(
    "top_front_groove", 2.3, 0.008, 0.018, carvingMat,
    0, 1.304, 0.57
  );
  const top_rear_groove = addBox(
    "top_rear_groove", 2.3, 0.008, 0.018, carvingMat,
    0, 1.304, -0.57
  );
  const top_left_groove = addBox(
    "top_left_groove", 0.018, 0.008, 1.14, carvingMat,
    -1.15, 1.304, 0
  );
  const top_right_groove = addBox(
    "top_right_groove", 0.018, 0.008, 1.14, carvingMat,
    1.15, 1.304, 0
  );

  const top_medallionGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.014, 32);
  const top_medallion = new THREE.Mesh(top_medallionGeom, woodMat);
  top_medallion.name = "top_medallion";
  top_medallion.position.set(0, 1.309, 0);
  ornament_group.add(top_medallion);

  const top_medallion_ringGeom = new THREE.TorusGeometry(0.215, 0.012, 8, 32);
  const top_medallion_ring = new THREE.Mesh(top_medallion_ringGeom, carvingMat);
  top_medallion_ring.name = "top_medallion_ring";
  top_medallion_ring.rotation.x = Math.PI / 2;
  top_medallion_ring.position.set(0, 1.319, 0);
  ornament_group.add(top_medallion_ring);

  const top_inner_ringGeom = new THREE.TorusGeometry(0.135, 0.009, 8, 28);
  const top_inner_ring = new THREE.Mesh(top_inner_ringGeom, carvingMat);
  top_inner_ring.name = "top_inner_ring";
  top_inner_ring.rotation.x = Math.PI / 2;
  top_inner_ring.position.set(0, 1.32, 0);
  ornament_group.add(top_inner_ring);

  const top_centerGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.014, 20);
  const top_center = new THREE.Mesh(top_centerGeom, carvingMat);
  top_center.name = "top_center";
  top_center.position.set(0, 1.319, 0);
  ornament_group.add(top_center);

  const top_rayGeom = new THREE.BoxGeometry(0.13, 0.012, 0.022);
  const top_rays = new THREE.InstancedMesh(top_rayGeom, carvingMat, 16);
  top_rays.name = "top_rays";
  const ray_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    ray_dummy.position.set(
      Math.cos(angle) * 0.285,
      1.316,
      Math.sin(angle) * 0.285
    );
    ray_dummy.rotation.set(0, -angle, 0);
    ray_dummy.scale.set(1, 1, 1);
    ray_dummy.updateMatrix();
    top_rays.setMatrixAt(i, ray_dummy.matrix);
  }
  top_rays.instanceMatrix.needsUpdate = true;
  ornament_group.add(top_rays);

  const top_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const top_leaves = new THREE.InstancedMesh(top_leafGeom, carvingMat, 16);
  top_leaves.name = "top_leaves";
  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    leaf_dummy.position.set(
      Math.cos(angle) * 0.365,
      1.316,
      Math.sin(angle) * 0.365
    );
    leaf_dummy.rotation.set(0, -angle, 0);
    leaf_dummy.scale.set(0.085, 0.007, 0.032);
    leaf_dummy.updateMatrix();
    top_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  top_leaves.instanceMatrix.needsUpdate = true;
  ornament_group.add(top_leaves);

  const top_left_scroll = addCurveTube(
    "top_left_scroll",
    [
      new THREE.Vector3(-0.31, 1.316, 0.04),
      new THREE.Vector3(-0.48, 1.316, 0.15),
      new THREE.Vector3(-0.66, 1.316, 0.2),
      new THREE.Vector3(-0.84, 1.316, 0.15),
      new THREE.Vector3(-0.96, 1.316, 0.04),
      new THREE.Vector3(-0.92, 1.316, -0.08),
      new THREE.Vector3(-0.8, 1.316, -0.1),
      new THREE.Vector3(-0.72, 1.316, -0.02),
      new THREE.Vector3(-0.77, 1.316, 0.07)
    ],
    0.012,
    carvingMat,
    40
  );

  const top_right_scroll = addCurveTube(
    "top_right_scroll",
    [
      new THREE.Vector3(0.31, 1.316, 0.04),
      new THREE.Vector3(0.48, 1.316, 0.15),
      new THREE.Vector3(0.66, 1.316, 0.2),
      new THREE.Vector3(0.84, 1.316, 0.15),
      new THREE.Vector3(0.96, 1.316, 0.04),
      new THREE.Vector3(0.92, 1.316, -0.08),
      new THREE.Vector3(0.8, 1.316, -0.1),
      new THREE.Vector3(0.72, 1.316, -0.02),
      new THREE.Vector3(0.77, 1.316, 0.07)
    ],
    0.012,
    carvingMat,
    40
  );

  const top_front_left_scroll = addCurveTube(
    "top_front_left_scroll",
    [
      new THREE.Vector3(-0.2, 1.316, 0.2),
      new THREE.Vector3(-0.34, 1.316, 0.34),
      new THREE.Vector3(-0.52, 1.316, 0.42),
      new THREE.Vector3(-0.7, 1.316, 0.4),
      new THREE.Vector3(-0.82, 1.316, 0.31),
      new THREE.Vector3(-0.79, 1.316, 0.2),
      new THREE.Vector3(-0.68, 1.316, 0.17),
      new THREE.Vector3(-0.61, 1.316, 0.24)
    ],
    0.012,
    carvingMat,
    36
  );

  const top_front_right_scroll = addCurveTube(
    "top_front_right_scroll",
    [
      new THREE.Vector3(0.2, 1.316, 0.2),
      new THREE.Vector3(0.34, 1.316, 0.34),
      new THREE.Vector3(0.52, 1.316, 0.42),
      new THREE.Vector3(0.7, 1.316, 0.4),
      new THREE.Vector3(0.82, 1.316, 0.31),
      new THREE.Vector3(0.79, 1.316, 0.2),
      new THREE.Vector3(0.68, 1.316, 0.17),
      new THREE.Vector3(0.61, 1.316, 0.24)
    ],
    0.012,
    carvingMat,
    36
  );

  const top_rear_left_scroll = addCurveTube(
    "top_rear_left_scroll",
    [
      new THREE.Vector3(-0.2, 1.316, -0.2),
      new THREE.Vector3(-0.36, 1.316, -0.34),
      new THREE.Vector3(-0.55, 1.316, -0.42),
      new THREE.Vector3(-0.73, 1.316, -0.39),
      new THREE.Vector3(-0.84, 1.316, -0.29),
      new THREE.Vector3(-0.8, 1.316, -0.18),
      new THREE.Vector3(-0.69, 1.316, -0.16),
      new THREE.Vector3(-0.62, 1.316, -0.24)
    ],
    0.012,
    carvingMat,
    36
  );

  const top_rear_right_scroll = addCurveTube(
    "top_rear_right_scroll",
    [
      new THREE.Vector3(0.2, 1.316, -0.2),
      new THREE.Vector3(0.36, 1.316, -0.34),
      new THREE.Vector3(0.55, 1.316, -0.42),
      new THREE.Vector3(0.73, 1.316, -0.39),
      new THREE.Vector3(0.84, 1.316, -0.29),
      new THREE.Vector3(0.8, 1.316, -0.18),
      new THREE.Vector3(0.69, 1.316, -0.16),
      new THREE.Vector3(0.62, 1.316, -0.24)
    ],
    0.012,
    carvingMat,
    36
  );

  const top_left_corner_curl = addCurveTube(
    "top_left_corner_curl",
    [
      new THREE.Vector3(-1.05, 1.316, 0.47),
      new THREE.Vector3(-0.98, 1.316, 0.39),
      new THREE.Vector3(-0.88, 1.316, 0.37),
      new THREE.Vector3(-0.82, 1.316, 0.43),
      new THREE.Vector3(-0.86, 1.316, 0.5)
    ],
    0.011,
    carvingMat,
    24
  );

  const top_right_corner_curl = addCurveTube(
    "top_right_corner_curl",
    [
      new THREE.Vector3(1.05, 1.316, 0.47),
      new THREE.Vector3(0.98, 1.316, 0.39),
      new THREE.Vector3(0.88, 1.316, 0.37),
      new THREE.Vector3(0.82, 1.316, 0.43),
      new THREE.Vector3(0.86, 1.316, 0.5)
    ],
    0.011,
    carvingMat,
    24
  );

  const top_rear_left_corner_curl = addCurveTube(
    "top_rear_left_corner_curl",
    [
      new THREE.Vector3(-1.05, 1.316, -0.47),
      new THREE.Vector3(-0.98, 1.316, -0.39),
      new THREE.Vector3(-0.88, 1.316, -0.37),
      new THREE.Vector3(-0.82, 1.316, -0.43),
      new THREE.Vector3(-0.86, 1.316, -0.5)
    ],
    0.011,
    carvingMat,
    24
  );

  const top_rear_right_corner_curl = addCurveTube(
    "top_rear_right_corner_curl",
    [
      new THREE.Vector3(1.05, 1.316, -0.47),
      new THREE.Vector3(0.98, 1.316, -0.39),
      new THREE.Vector3(0.88, 1.316, -0.37),
      new THREE.Vector3(0.82, 1.316, -0.43),
      new THREE.Vector3(0.86, 1.316, -0.5)
    ],
    0.011,
    carvingMat,
    24
  );

  const front_left_scroll = addCurveTube(
    "front_left_scroll",
    [
      new THREE.Vector3(-0.08, 0.49, 0.724),
      new THREE.Vector3(-0.28, 0.64, 0.724),
      new THREE.Vector3(-0.5, 0.68, 0.724),
      new THREE.Vector3(-0.72, 0.61, 0.724),
      new THREE.Vector3(-0.86, 0.48, 0.724),
      new THREE.Vector3(-0.83, 0.34, 0.724),
      new THREE.Vector3(-0.7, 0.29, 0.724),
      new THREE.Vector3(-0.59, 0.36, 0.724),
      new THREE.Vector3(-0.64, 0.46, 0.724)
    ],
    0.013,
    carvingMat,
    40
  );

  const front_right_scroll = addCurveTube(
    "front_right_scroll",
    [
      new THREE.Vector3(0.08, 0.49, 0.724),
      new THREE.Vector3(0.28, 0.64, 0.724),
      new THREE.Vector3(0.5, 0.68, 0.724),
      new THREE.Vector3(0.72, 0.61, 0.724),
      new THREE.Vector3(0.86, 0.48, 0.724),
      new THREE.Vector3(0.83, 0.34, 0.724),
      new THREE.Vector3(0.7, 0.29, 0.724),
      new THREE.Vector3(0.59, 0.36, 0.724),
      new THREE.Vector3(0.64, 0.46, 0.724)
    ],
    0.013,
    carvingMat,
    40
  );

  const front_left_corner_curl = addCurveTube(
    "front_left_corner_curl",
    [
      new THREE.Vector3(-1.08, 0.66, 0.724),
      new THREE.Vector3(-0.98, 0.58, 0.724),
      new THREE.Vector3(-0.96, 0.45, 0.724),
      new THREE.Vector3(-1.04, 0.36, 0.724),
      new THREE.Vector3(-1.13, 0.39, 0.724),
      new THREE.Vector3(-1.14, 0.49, 0.724),
      new THREE.Vector3(-1.07, 0.54, 0.724)
    ],
    0.013,
    carvingMat,
    32
  );

  const front_right_corner_curl = addCurveTube(
    "front_right_corner_curl",
    [
      new THREE.Vector3(1.08, 0.66, 0.724),
      new THREE.Vector3(0.98, 0.58, 0.724),
      new THREE.Vector3(0.96, 0.45, 0.724),
      new THREE.Vector3(1.04, 0.36, 0.724),
      new THREE.Vector3(1.13, 0.39, 0.724),
      new THREE.Vector3(1.14, 0.49, 0.724),
      new THREE.Vector3(1.07, 0.54, 0.724)
    ],
    0.013,
    carvingMat,
    32
  );

  const front_center_stem = addCurveTube(
    "front_center_stem",
    [
      new THREE.Vector3(0, 0.28, 0.724),
      new THREE.Vector3(-0.02, 0.38, 0.724),
      new THREE.Vector3(0.02, 0.48, 0.724),
      new THREE.Vector3(0, 0.59, 0.724)
    ],
    0.012,
    carvingMat,
    24
  );

  const front_center_left_branch = addCurveTube(
    "front_center_left_branch",
    [
      new THREE.Vector3(-0.01, 0.39, 0.724),
      new THREE.Vector3(-0.1, 0.43, 0.724),
      new THREE.Vector3(-0.17, 0.49, 0.724),
      new THREE.Vector3(-0.22, 0.57, 0.724)
    ],
    0.011,
    carvingMat,
    24
  );

  const front_center_right_branch = addCurveTube(
    "front_center_right_branch",
    [
      new THREE.Vector3(0.01, 0.39, 0.724),
      new THREE.Vector3(0.1, 0.43, 0.724),
      new THREE.Vector3(0.17, 0.49, 0.724),
      new THREE.Vector3(0.22, 0.57, 0.724)
    ],
    0.011,
    carvingMat,
    24
  );

  const left_side_scroll = addCurveTube(
    "left_side_scroll",
    [
      new THREE.Vector3(-1.31, 0.49, -0.05),
      new THREE.Vector3(-1.31, 0.63, -0.2),
      new THREE.Vector3(-1.31, 0.67, -0.38),
      new THREE.Vector3(-1.31, 0.59, -0.52),
      new THREE.Vector3(-1.31, 0.45, -0.56),
      new THREE.Vector3(-1.31, 0.33, -0.48),
      new THREE.Vector3(-1.31, 0.3, -0.34),
      new THREE.Vector3(-1.31, 0.38, -0.27),
      new THREE.Vector3(-1.31, 0.46, -0.31)
    ],
    0.013,
    carvingMat,
    40
  );

  const right_side_scroll = addCurveTube(
    "right_side_scroll",
    [
      new THREE.Vector3(1.31, 0.49, -0.05),
      new THREE.Vector3(1.31, 0.63, -0.2),
      new THREE.Vector3(1.31, 0.67, -0.38),
      new THREE.Vector3(1.31, 0.59, -0.52),
      new THREE.Vector3(1.31, 0.45, -0.56),
      new THREE.Vector3(1.31, 0.33, -0.48),
      new THREE.Vector3(1.31, 0.3, -0.34),
      new THREE.Vector3(1.31, 0.38, -0.27),
      new THREE.Vector3(1.31, 0.46, -0.31)
    ],
    0.013,
    carvingMat,
    40
  );

  const left_side_forward_scroll = addCurveTube(
    "left_side_forward_scroll",
    [
      new THREE.Vector3(-1.31, 0.49, 0.05),
      new THREE.Vector3(-1.31, 0.63, 0.2),
      new THREE.Vector3(-1.31, 0.67, 0.38),
      new THREE.Vector3(-1.31, 0.59, 0.52),
      new THREE.Vector3(-1.31, 0.45, 0.56),
      new THREE.Vector3(-1.31, 0.33, 0.48),
      new THREE.Vector3(-1.31, 0.3, 0.34),
      new THREE.Vector3(-1.31, 0.38, 0.27),
      new THREE.Vector3(-1.31, 0.46, 0.31)
    ],
    0.013,
    carvingMat,
    40
  );

  const right_side_forward_scroll = addCurveTube(
    "right_side_forward_scroll",
    [
      new THREE.Vector3(1.31, 0.49, 0.05),
      new THREE.Vector3(1.31, 0.63, 0.2),
      new THREE.Vector3(1.31, 0.67, 0.38),
      new THREE.Vector3(1.31, 0.59, 0.52),
      new THREE.Vector3(1.31, 0.45, 0.56),
      new THREE.Vector3(1.31, 0.33, 0.48),
      new THREE.Vector3(1.31, 0.3, 0.34),
      new THREE.Vector3(1.31, 0.38, 0.27),
      new THREE.Vector3(1.31, 0.46, 0.31)
    ],
    0.013,
    carvingMat,
    40
  );

  const front_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const front_leaf_data = [
    [-0.2, 0.57, -0.7], [-0.34, 0.61, -0.45], [-0.48, 0.62, -0.2],
    [-0.62, 0.57, 0.2], [-0.74, 0.48, 0.65], [-0.72, 0.37, 1.0],
    [-0.55, 0.34, 1.2], [-0.38, 0.38, 0.9], [-0.24, 0.43, 0.65],
    [0.2, 0.57, 0.7], [0.34, 0.61, 0.45], [0.48, 0.62, 0.2],
    [0.62, 0.57, -0.2], [0.74, 0.48, -0.65], [0.72, 0.37, -1.0],
    [0.55, 0.34, -1.2], [0.38, 0.38, -0.9], [0.24, 0.43, -0.65],
    [-0.08, 0.48, -0.35], [0.08, 0.48, 0.35],
    [-0.14, 0.55, -0.55], [0.14, 0.55, 0.55],
    [-0.18, 0.36, -0.8], [0.18, 0.36, 0.8]
  ];
  const front_leaves = new THREE.InstancedMesh(
    front_leafGeom,
    carvingMat,
    front_leaf_data.length
  );
  front_leaves.name = "front_leaves";
  const front_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < front_leaf_data.length; i++) {
    const data = front_leaf_data[i];
    front_leaf_dummy.position.set(data[0], data[1], 0.728);
    front_leaf_dummy.rotation.set(0, 0, data[2]);
    front_leaf_dummy.scale.set(0.085, 0.028, 0.008);
    front_leaf_dummy.updateMatrix();
    front_leaves.setMatrixAt(i, front_leaf_dummy.matrix);
  }
  front_leaves.instanceMatrix.needsUpdate = true;
  ornament_group.add(front_leaves);

  const top_leaf_data = [
    [-0.42, 0.2, -0.7], [-0.55, 0.27, -0.45], [-0.69, 0.27, -0.15],
    [-0.82, 0.2, 0.25], [-0.88, 0.1, 0.65], [-0.84, -0.02, 1.0],
    [-0.72, -0.1, 1.2], [-0.58, -0.08, 1.0], [-0.45, -0.18, 0.7],
    [0.42, 0.2, 0.7], [0.55, 0.27, 0.45], [0.69, 0.27, 0.15],
    [0.82, 0.2, -0.25], [0.88, 0.1, -0.65], [0.84, -0.02, -1.0],
    [0.72, -0.1, -1.2], [0.58, -0.08, -1.0], [0.45, -0.18, -0.7],
    [-0.32, 0.34, -1.0], [-0.46, 0.4, -0.75], [-0.61, 0.4, -0.45],
    [-0.76, 0.34, -0.1], [0.32, 0.34, 1.0], [0.46, 0.4, 0.75],
    [0.61, 0.4, 0.45], [0.76, 0.34, 0.1],
    [-0.34, -0.34, -2.1], [-0.49, -0.4, -1.85], [-0.64, -0.4, -1.55],
    [-0.79, -0.34, -1.2], [0.34, -0.34, 2.1], [0.49, -0.4, 1.85],
    [0.64, -0.4, 1.55], [0.79, -0.34, 1.2]
  ];
  const top_side_leaves = new THREE.InstancedMesh(
    top_leafGeom,
    carvingMat,
    top_leaf_data.length
  );
  top_side_leaves.name = "top_side_leaves";
  const top_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < top_leaf_data.length; i++) {
    const data = top_leaf_data[i];
    top_leaf_dummy.position.set(data[0], 1.316, data[1]);
    top_leaf_dummy.rotation.set(0, data[2], 0);
    top_leaf_dummy.scale.set(0.082, 0.007, 0.028);
    top_leaf_dummy.updateMatrix();
    top_side_leaves.setMatrixAt(i, top_leaf_dummy.matrix);
  }
  top_side_leaves.instanceMatrix.needsUpdate = true;
  ornament_group.add(top_side_leaves);

  const side_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const side_leaf_data = [
    [0.61, -0.18, -0.7], [0.64, -0.34, -0.4], [0.61, -0.49, 0.0],
    [0.52, -0.56, 0.4], [0.4, -0.54, 0.8], [0.33, -0.44, 1.1],
    [0.34, -0.3, 1.0], [0.43, -0.18, 0.7], [0.57, 0.18, 0.7],
    [0.64, 0.34, 0.4], [0.61, 0.49, 0.0], [0.52, 0.56, -0.4],
    [0.4, 0.54, -0.8], [0.33, 0.44, -1.1], [0.34, 0.3, -1.0],
    [0.43, 0.18, -0.7]
  ];
  const side_leaves = new THREE.InstancedMesh(
    side_leafGeom,
    carvingMat,
    side_leaf_data.length * 2
  );
  side_leaves.name = "side_leaves";
  const side_leaf_dummy = new THREE.Object3D();
  let side_leaf_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < side_leaf_data.length; i++) {
      const data = side_leaf_data[i];
      side_leaf_dummy.position.set(side * 1.31, data[0], data[1]);
      side_leaf_dummy.rotation.set(data[2], 0, 0);
      side_leaf_dummy.scale.set(0.008, 0.082, 0.028);
      side_leaf_dummy.updateMatrix();
      side_leaves.setMatrixAt(side_leaf_index++, side_leaf_dummy.matrix);
    }
  }
  side_leaves.instanceMatrix.needsUpdate = true;
  ornament_group.add(side_leaves);

  const front_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_grain_data = [
    [-0.72, 0.735, 0.42, 0.008], [-0.18, 0.748, 0.34, -0.01],
    [0.48, 0.73, 0.5, 0.006], [-0.92, 0.205, 0.3, 0.0],
    [-0.38, 0.215, 0.46, -0.008], [0.28, 0.2, 0.52, 0.008],
    [0.86, 0.218, 0.28, 0.0], [-0.78, 0.805, 0.5, 0.0],
    [-0.12, 0.81, 0.42, -0.006], [0.62, 0.8, 0.48, 0.006]
  ];
  const front_wood_grain = new THREE.InstancedMesh(
    front_grainGeom,
    grainMat,
    front_grain_data.length
  );
  front_wood_grain.name = "front_wood_grain";
  const front_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < front_grain_data.length; i++) {
    const data = front_grain_data[i];
    front_grain_dummy.position.set(data[0], data[1], 0.719);
    front_grain_dummy.rotation.set(0, 0, data[3]);
    front_grain_dummy.scale.set(data[2], 0.006, 0.005);
    front_grain_dummy.updateMatrix();
    front_wood_grain.setMatrixAt(i, front_grain_dummy.matrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  ornament_group.add(front_wood_grain);

  const top_grain_data = [
    [-0.72, -0.49, 0.42, 0.08], [-0.18, -0.5, 0.36, -0.05],
    [0.42, -0.49, 0.46, 0.04], [0.88, -0.47, 0.24, -0.08],
    [-0.9, 0.49, 0.32, 0.02], [-0.42, 0.5, 0.4, -0.04],
    [0.18, 0.49, 0.46, 0.05], [0.72, 0.5, 0.36, -0.03],
    [-1.02, 0.02, 0.28, 0.1], [1.02, -0.02, 0.3, -0.1]
  ];
  const top_wood_grain = new THREE.InstancedMesh(
    front_grainGeom,
    grainMat,
    top_grain_data.length
  );
  top_wood_grain.name = "top_wood_grain";
  const top_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < top_grain_data.length; i++) {
    const data = top_grain_data[i];
    top_grain_dummy.position.set(data[0], 1.307, data[1]);
    top_grain_dummy.rotation.set(0, data[3], 0);
    top_grain_dummy.scale.set(data[2], 0.004, 0.006);
    top_grain_dummy.updateMatrix();
    top_wood_grain.setMatrixAt(i, top_grain_dummy.matrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  ornament_group.add(top_wood_grain);

  const side_grain_data = [
    [-0.48, 0.735, 0.34, 0.0], [0.02, 0.745, 0.42, -0.01],
    [0.52, 0.73, 0.32, 0.01], [-0.42, 0.205, 0.4, 0.0],
    [0.12, 0.215, 0.46, -0.008], [0.58, 0.2, 0.3, 0.008]
  ];
  const side_wood_grain = new THREE.InstancedMesh(
    front_grainGeom,
    grainMat,
    side_grain_data.length * 2
  );
  side_wood_grain.name = "side_wood_grain";
  const side_grain_dummy = new THREE.Object3D();
  let side_grain_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < side_grain_data.length; i++) {
      const data = side_grain_data[i];
      side_grain_dummy.position.set(side * 1.307, data[1], data[0]);
      side_grain_dummy.rotation.set(data[3], 0, 0);
      side_grain_dummy.scale.set(0.005, 0.006, data[2]);
      side_grain_dummy.updateMatrix();
      side_wood_grain.setMatrixAt(side_grain_index++, side_grain_dummy.matrix);
    }
  }
  side_wood_grain.instanceMatrix.needsUpdate = true;
  ornament_group.add(side_wood_grain);

  const latch_top_plateShape = new THREE.Shape();
  latch_top_plateShape.moveTo(-0.27, -0.08);
  latch_top_plateShape.quadraticCurveTo(-0.29, 0.04, -0.2, 0.1);
  latch_top_plateShape.quadraticCurveTo(0, 0.16, 0.2, 0.1);
  latch_top_plateShape.quadraticCurveTo(0.29, 0.04, 0.27, -0.08);
  latch_top_plateShape.quadraticCurveTo(0.16, -0.13, 0.08, -0.09);
  latch_top_plateShape.lineTo(0.06, -0.14);
  latch_top_plateShape.lineTo(-0.06, -0.14);
  latch_top_plateShape.quadraticCurveTo(-0.16, -0.13, -0.27, -0.08);
  latch_top_plateShape.closePath();

  const latch_top_plateGeom = new THREE.ExtrudeGeometry(latch_top_plateShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelOffset: 0,
    bevelSegments: 2,
    curveSegments: 8
  });
  const latch_top_plate = new THREE.Mesh(latch_top_plateGeom, brassMat);
  latch_top_plate.name = "latch_top_plate";
  latch_top_plate.position.set(0, 1.01, 0.765);
  latch_group.add(latch_top_plate);

  const latch_lower_plateShape = new THREE.Shape();
  latch_lower_plateShape.moveTo(-0.2, 0.15);
  latch_lower_plateShape.quadraticCurveTo(-0.25, 0.08, -0.21, -0.02);
  latch_lower_plateShape.quadraticCurveTo(-0.18, -0.12, -0.13, -0.18);
  latch_lower_plateShape.quadraticCurveTo(0, -0.3, 0.13, -0.18);
  latch_lower_plateShape.quadraticCurveTo(0.18, -0.12, 0.21, -0.02);
  latch_lower_plateShape.quadraticCurveTo(0.25, 0.08, 0.2, 0.15);
  latch_lower_plateShape.quadraticCurveTo(0.1, 0.2, 0, 0.18);
  latch_lower_plateShape.quadraticCurveTo(-0.1, 0.2, -0.2, 0.15);
  latch_lower_plateShape.closePath();

  const latch_lower_plateGeom = new THREE.ExtrudeGeometry(latch_lower_plateShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelOffset: 0,
    bevelSegments: 2,
    curveSegments: 8
  });
  const latch_lower_plate = new THREE.Mesh(latch_lower_plateGeom, brassMat);
  latch_lower_plate.name = "latch_lower_plate";
  latch_lower_plate.position.set(0, 0.72, 0.765);
  latch_group.add(latch_lower_plate);

  const latch_tongueShape = new THREE.Shape();
  latch_tongueShape.moveTo(-0.07, 0.2);
  latch_tongueShape.quadraticCurveTo(-0.09, 0.16, -0.065, 0.11);
  latch_tongueShape.lineTo(-0.055, -0.08);
  latch_tongueShape.quadraticCurveTo(-0.055, -0.14, -0.035, -0.18);
  latch_tongueShape.quadraticCurveTo(0, -0.22, 0.035, -0.18);
  latch_tongueShape.quadraticCurveTo(0.055, -0.14, 0.055, -0.08);
  latch_tongueShape.lineTo(0.065, 0.11);
  latch_tongueShape.quadraticCurveTo(0.09, 0.16, 0.07, 0.2);
  latch_tongueShape.quadraticCurveTo(0, 0.23, -0.07, 0.2);
  latch_tongueShape.closePath();

  const latch_tongueGeom = new THREE.ExtrudeGeometry(latch_tongueShape, {
    depth: 0.04,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelOffset: 0,
    bevelSegments: 2,
    curveSegments: 8
  });
  const latch_tongue = new THREE.Mesh(latch_tongueGeom, brassMat);
  latch_tongue.name = "latch_tongue";
  latch_tongue.position.set(0, 0.88, 0.805);
  latch_group.add(latch_tongue);

  const latch_hingeGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.2, 18);
  const latch_hinge = new THREE.Mesh(latch_hingeGeom, darkBrassMat);
  latch_hinge.name = "latch_hinge";
  latch_hinge.rotation.z = Math.PI / 2;
  latch_hinge.position.set(0, 1.075, 0.84);
  latch_group.add(latch_hinge);

  const latch_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 16);
  const latch_screws = new THREE.InstancedMesh(latch_screwGeom, darkBrassMat, 4);
  latch_screws.name = "latch_screws";
  const screw_positions = [
    [-0.17, 1.035, 0.815],
    [0.17, 1.035, 0.815],
    [-0.13, 0.76, 0.815],
    [0.13, 0.76, 0.815]
  ];
  const screw_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    const position = screw_positions[i];
    screw_dummy.position.set(position[0], position[1], position[2]);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    latch_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  latch_screws.instanceMatrix.needsUpdate = true;
  latch_group.add(latch_screws);

  const screw_slotGeom = new THREE.BoxGeometry(0.047, 0.008, 0.008);
  const screw_slots = new THREE.InstancedMesh(screw_slotGeom, keyholeMat, 4);
  screw_slots.name = "screw_slots";
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    const position = screw_positions[i];
    slot_dummy.position.set(position[0], position[1], 0.827);
    slot_dummy.rotation.set(0, 0, i % 2 === 0 ? 0.25 : -0.25);
    slot_dummy.scale.set(1, 1, 1);
    slot_dummy.updateMatrix();
    screw_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  latch_group.add(screw_slots);

  const keyhole_roundGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.012, 16);
  const keyhole_round = new THREE.Mesh(keyhole_roundGeom, keyholeMat);
  keyhole_round.name = "keyhole_round";
  keyhole_round.rotation.x = Math.PI / 2;
  keyhole_round.position.set(0, 0.75, 0.858);
  latch_group.add(keyhole_round);

  const keyhole_slotGeom = new THREE.BoxGeometry(0.018, 0.075, 0.012);
  const keyhole_slot = new THREE.Mesh(keyhole_slotGeom, keyholeMat);
  keyhole_slot.name = "keyhole_slot";
  keyhole_slot.position.set(0, 0.705, 0.858);
  latch_group.add(keyhole_slot);

  fitToUnitCube(THREE, root);
  return root;

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
}