export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "childrens_wooden_desk";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a684b,
    metalness: 0.0,
    roughness: 0.62
  });
  const topWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b7655,
    metalness: 0.0,
    roughness: 0.62
  });
  const drawerMat = new THREE.MeshStandardMaterial({
    color: 0x806047,
    metalness: 0.0,
    roughness: 0.65
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x493326,
    metalness: 0.0,
    roughness: 0.75
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x5b402f,
    metalness: 0.0,
    roughness: 0.8
  });
  const outlineMat = new THREE.MeshStandardMaterial({
    color: 0x2d241e,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalTanMat = new THREE.MeshStandardMaterial({
    color: 0xe1bd86,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalCreamMat = new THREE.MeshStandardMaterial({
    color: 0xf0d5a2,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalPinkMat = new THREE.MeshStandardMaterial({
    color: 0xd98283,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalBlueMat = new THREE.MeshStandardMaterial({
    color: 0x83b7c5,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalTealMat = new THREE.MeshStandardMaterial({
    color: 0x62a5a0,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalRedMat = new THREE.MeshStandardMaterial({
    color: 0xb95555,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalGreenMat = new THREE.MeshStandardMaterial({
    color: 0x668c67,
    metalness: 0.0,
    roughness: 0.8
  });
  const decalYellowMat = new THREE.MeshStandardMaterial({
    color: 0xd9b45f,
    metalness: 0.0,
    roughness: 0.8
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a46,
    metalness: 0.45,
    roughness: 0.35
  });

  const deskW = 3.2;
  const deskD = 1.25;
  const topH = 0.16;
  const topY = 1.5;
  const topSurfaceY = topY + topH / 2;
  const legH = 1.42;
  const legW = 0.28;
  const legD = 1.05;
  const legX = 1.39;
  const legZ = -0.04;

  const desk_topShape = new THREE.Shape();
  desk_topShape.moveTo(-deskW / 2 + 0.08, -deskD / 2);
  desk_topShape.lineTo(deskW / 2 - 0.08, -deskD / 2);
  desk_topShape.quadraticCurveTo(deskW / 2, -deskD / 2, deskW / 2, -deskD / 2 + 0.08);
  desk_topShape.lineTo(deskW / 2, deskD / 2 - 0.08);
  desk_topShape.quadraticCurveTo(deskW / 2, deskD / 2, deskW / 2 - 0.08, deskD / 2);
  desk_topShape.lineTo(-deskW / 2 + 0.08, deskD / 2);
  desk_topShape.quadraticCurveTo(-deskW / 2, deskD / 2, -deskW / 2, deskD / 2 - 0.08);
  desk_topShape.lineTo(-deskW / 2, -deskD / 2 + 0.08);
  desk_topShape.quadraticCurveTo(-deskW / 2, -deskD / 2, -deskW / 2 + 0.08, -deskD / 2);

  const desk_topGeom = new THREE.ExtrudeGeometry(desk_topShape, {
    depth: topH,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  desk_topGeom.translate(0, 0, -topH / 2);
  const desk_top = new THREE.Mesh(desk_topGeom, woodMat);
  desk_top.name = "desk_top";
  desk_top.rotation.x = -Math.PI / 2;
  desk_top.position.y = topY;
  root.add(desk_top);

  const top_surface_panelGeom = new THREE.PlaneGeometry(3.02, 1.08);
  const top_surface_panel = new THREE.Mesh(top_surface_panelGeom, topWoodMat);
  top_surface_panel.name = "top_surface_panel";
  top_surface_panel.rotation.x = -Math.PI / 2;
  top_surface_panel.position.set(0, topSurfaceY + 0.002, 0);
  root.add(top_surface_panel);

  const legShape = new THREE.Shape();
  legShape.moveTo(-legW / 2 + 0.035, 0);
  legShape.lineTo(legW / 2 - 0.035, 0);
  legShape.quadraticCurveTo(legW / 2, 0, legW / 2, 0.04);
  legShape.lineTo(legW / 2, legH - 0.04);
  legShape.quadraticCurveTo(legW / 2, legH, legW / 2 - 0.04, legH);
  legShape.lineTo(-legW / 2 + 0.04, legH);
  legShape.quadraticCurveTo(-legW / 2, legH, -legW / 2, legH - 0.04);
  legShape.lineTo(-legW / 2, 0.04);
  legShape.quadraticCurveTo(-legW / 2, 0, -legW / 2 + 0.035, 0);

  const legGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: legD,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  legGeom.translate(0, 0, -legD / 2);

  const left_leg = new THREE.Mesh(legGeom, woodMat);
  left_leg.name = "left_leg";
  left_leg.position.set(-legX, 0, legZ);
  root.add(left_leg);

  const right_leg = new THREE.Mesh(legGeom, woodMat);
  right_leg.name = "right_leg";
  right_leg.position.set(legX, 0, legZ);
  root.add(right_leg);

  const front_apronGeom = new THREE.BoxGeometry(2.5, 0.36, 0.1);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 1.25, 0.52);
  root.add(front_apron);

  const rear_apronGeom = new THREE.BoxGeometry(2.5, 0.25, 0.08);
  const rear_apron = new THREE.Mesh(rear_apronGeom, darkWoodMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 1.285, -0.51);
  root.add(rear_apron);

  const drawer_recessGeom = new THREE.BoxGeometry(1.18, 0.32, 0.018);
  const drawer_recess = new THREE.Mesh(drawer_recessGeom, outlineMat);
  drawer_recess.name = "drawer_recess";
  drawer_recess.position.set(0, 1.26, 0.576);
  root.add(drawer_recess);

  const drawer_frontGeom = new THREE.BoxGeometry(1.08, 0.27, 0.035);
  const drawer_front = new THREE.Mesh(drawer_frontGeom, drawerMat);
  drawer_front.name = "drawer_front";
  drawer_front.position.set(0, 1.26, 0.59);
  root.add(drawer_front);

  const drawer_knob_stemGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.055, 16);
  const drawer_knob_stem = new THREE.Mesh(drawer_knob_stemGeom, knobMat);
  drawer_knob_stem.name = "drawer_knob_stem";
  drawer_knob_stem.rotation.x = Math.PI / 2;
  drawer_knob_stem.position.set(0, 1.26, 0.625);
  root.add(drawer_knob_stem);

  const drawer_knobGeom = new THREE.SphereGeometry(0.055, 20, 12);
  const drawer_knob = new THREE.Mesh(drawer_knobGeom, knobMat);
  drawer_knob.name = "drawer_knob";
  drawer_knob.position.set(0, 1.26, 0.665);
  root.add(drawer_knob);

  const top_plank_seamGeom = new THREE.BoxGeometry(2.9, 0.004, 0.008);
  const top_plank_seams = new THREE.InstancedMesh(top_plank_seamGeom, grainMat, 2);
  top_plank_seams.name = "top_plank_seams";
  const seamDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    seamDummy.position.set(0, topSurfaceY + 0.006, i === 0 ? -0.18 : 0.18);
    seamDummy.rotation.set(0, 0, 0);
    seamDummy.scale.set(1, 1, 1);
    seamDummy.updateMatrix();
    top_plank_seams.setMatrixAt(i, seamDummy.matrix);
  }
  top_plank_seams.instanceMatrix.needsUpdate = true;
  root.add(top_plank_seams);

  const top_grainGeom = new THREE.BoxGeometry(1, 0.003, 0.006);
  const top_grain = new THREE.InstancedMesh(top_grainGeom, grainMat, 18);
  top_grain.name = "top_grain";
  const topGrainDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const length = 0.22 + ((i * 7) % 6) * 0.08;
    const x = -1.25 + ((i * 37) % 100) / 100 * 2.5;
    const z = -0.48 + ((i * 29) % 100) / 100 * 0.96;
    topGrainDummy.position.set(x, topSurfaceY + 0.008, z);
    topGrainDummy.rotation.set(0, ((i % 5) - 2) * 0.012, 0);
    topGrainDummy.scale.set(length, 1, 1);
    topGrainDummy.updateMatrix();
    top_grain.setMatrixAt(i, topGrainDummy.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  root.add(top_grain);

  const front_grainGeom = new THREE.BoxGeometry(1, 0.005, 0.004);
  const front_grain = new THREE.InstancedMesh(front_grainGeom, grainMat, 18);
  front_grain.name = "front_grain";
  const frontGrainDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const length = 0.18 + ((i * 11) % 7) * 0.07;
    const x = -1.15 + ((i * 31) % 100) / 100 * 2.3;
    const y = 1.14 + ((i * 17) % 100) / 100 * 0.23;
    frontGrainDummy.position.set(x, y, 0.611);
    frontGrainDummy.rotation.set(0, 0, ((i % 5) - 2) * 0.01);
    frontGrainDummy.scale.set(length, 1, 1);
    frontGrainDummy.updateMatrix();
    front_grain.setMatrixAt(i, frontGrainDummy.matrix);
  }
  front_grain.instanceMatrix.needsUpdate = true;
  root.add(front_grain);

  const leg_grainGeom = new THREE.BoxGeometry(0.006, 1, 0.004);
  const leg_grain = new THREE.InstancedMesh(leg_grainGeom, grainMat, 16);
  leg_grain.name = "leg_grain";
  const legGrainDummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const side = i < 8 ? -1 : 1;
    const local = i % 8;
    const length = 0.28 + ((local * 5) % 6) * 0.08;
    const y = 0.2 + ((local * 23) % 100) / 100 * 0.9;
    const z = -0.42 + ((local * 29) % 100) / 100 * 0.84;
    legGrainDummy.position.set(side * legX + (side > 0 ? legW / 2 + 0.004 : -legW / 2 - 0.004), y, z);
    legGrainDummy.rotation.set(0, 0, ((local % 3) - 1) * 0.012);
    legGrainDummy.scale.set(1, length, 1);
    legGrainDummy.updateMatrix();
    leg_grain.setMatrixAt(i, legGrainDummy.matrix);
  }
  leg_grain.instanceMatrix.needsUpdate = true;
  root.add(leg_grain);

  const decalCircleGeom = new THREE.CircleGeometry(1, 24);
  const decalRectGeom = new THREE.PlaneGeometry(1, 1);
  const decalTriangleShape = new THREE.Shape();
  decalTriangleShape.moveTo(0, 1);
  decalTriangleShape.lineTo(-1, -1);
  decalTriangleShape.lineTo(1, -1);
  decalTriangleShape.closePath();
  const decalTriangleGeom = new THREE.ShapeGeometry(decalTriangleShape);

  function addEllipse(parent, name, x, y, rx, ry, mat, z, rot) {
    const mesh = new THREE.Mesh(decalCircleGeom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(rx, ry, 1);
    mesh.rotation.z = rot || 0;
    parent.add(mesh);
    return mesh;
  }

  function addRect(parent, name, x, y, w, h, mat, z, rot) {
    const mesh = new THREE.Mesh(decalRectGeom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(w, h, 1);
    mesh.rotation.z = rot || 0;
    parent.add(mesh);
    return mesh;
  }

  function addTriangle(parent, name, x, y, sx, sy, mat, z, rot) {
    const mesh = new THREE.Mesh(decalTriangleGeom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, 1);
    mesh.rotation.z = rot || 0;
    parent.add(mesh);
    return mesh;
  }

  function addLine(parent, name, x1, y1, x2, y2, width, mat, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const line = new THREE.Mesh(decalRectGeom, mat);
    line.name = name;
    line.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    line.scale.set(length, width, 1);
    line.rotation.z = Math.atan2(dy, dx);
    parent.add(line);
    return line;
  }

  function addTopChild(parent, name, x, z, scale, shirtMat, pantsMat, hairMat, faceTurn) {
    const child = new THREE.Group();
    child.name = name;
    child.position.set(x, topSurfaceY + 0.012, z);
    child.rotation.x = -Math.PI / 2;
    child.scale.setScalar(scale);
    parent.add(child);

    addEllipse(child, name + "_hair_back", 0, 0.13, 0.145, 0.15, outlineMat, 0.001, faceTurn * 0.15);
    addEllipse(child, name + "_hair", 0, 0.13, 0.132, 0.138, hairMat, 0.002, faceTurn * 0.15);
    addEllipse(child, name + "_face", 0, 0.12, 0.105, 0.108, decalCreamMat, 0.003, faceTurn * 0.08);
    addEllipse(child, name + "_left_ear", -0.112, 0.115, 0.026, 0.035, decalTanMat, 0.0025, 0);
    addEllipse(child, name + "_right_ear", 0.112, 0.115, 0.026, 0.035, decalTanMat, 0.0025, 0);
    addEllipse(child, name + "_left_eye", -0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addEllipse(child, name + "_right_eye", 0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addEllipse(child, name + "_left_cheek", -0.065, 0.095, 0.025, 0.017, decalPinkMat, 0.0045, 0);
    addEllipse(child, name + "_right_cheek", 0.065, 0.095, 0.025, 0.017, decalPinkMat, 0.0045, 0);
    addLine(child, name + "_smile", -0.035, 0.075, 0.035, 0.07, 0.012, outlineMat, 0.005);
    addRect(child, name + "_shirt_outline", 0, -0.055, 0.205, 0.17, outlineMat, 0.001, faceTurn * 0.08);
    addRect(child, name + "_shirt", 0, -0.055, 0.18, 0.145, shirtMat, 0.002, faceTurn * 0.08);
    addLine(child, name + "_left_arm", -0.09, -0.02, -0.22, 0.035, 0.035, outlineMat, 0.001);
    addLine(child, name + "_right_arm", 0.09, -0.02, 0.22, 0.04, 0.035, outlineMat, 0.001);
    addEllipse(child, name + "_left_hand", -0.225, 0.04, 0.028, 0.03, decalCreamMat, 0.003, 0);
    addEllipse(child, name + "_right_hand", 0.225, 0.045, 0.028, 0.03, decalCreamMat, 0.003, 0);
    addLine(child, name + "_left_leg", -0.055, -0.14, -0.09, -0.285, 0.045, outlineMat, 0.001);
    addLine(child, name + "_right_leg", 0.055, -0.14, 0.09, -0.285, 0.045, outlineMat, 0.001);
    addRect(child, name + "_left_shoe", -0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, -0.15);
    addRect(child, name + "_right_shoe", 0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, 0.15);
    return child;
  }

  function addFrontChild(parent, name, x, y, scale, shirtMat, pantsMat, hairMat, faceTurn) {
    const child = new THREE.Group();
    child.name = name;
    child.position.set(x, y, 0.614);
    child.scale.setScalar(scale);
    parent.add(child);

    addEllipse(child, name + "_hair_back", 0, 0.13, 0.145, 0.15, outlineMat, 0.001, faceTurn * 0.15);
    addEllipse(child, name + "_hair", 0, 0.13, 0.132, 0.138, hairMat, 0.002, faceTurn * 0.15);
    addEllipse(child, name + "_face", 0, 0.12, 0.105, 0.108, decalCreamMat, 0.003, faceTurn * 0.08);
    addEllipse(child, name + "_left_ear", -0.112, 0.115, 0.026, 0.035, decalTanMat, 0.0025, 0);
    addEllipse(child, name + "_right_ear", 0.112, 0.115, 0.026, 0.035, decalTanMat, 0.0025, 0);
    addEllipse(child, name + "_left_eye", -0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addEllipse(child, name + "_right_eye", 0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addEllipse(child, name + "_left_cheek", -0.065, 0.095, 0.025, 0.017, decalPinkMat, 0.0045, 0);
    addEllipse(child, name + "_right_cheek", 0.065, 0.095, 0.025, 0.017, decalPinkMat, 0.0045, 0);
    addLine(child, name + "_smile", -0.035, 0.075, 0.035, 0.07, 0.012, outlineMat, 0.005);
    addRect(child, name + "_shirt_outline", 0, -0.055, 0.205, 0.17, outlineMat, 0.001, faceTurn * 0.08);
    addRect(child, name + "_shirt", 0, -0.055, 0.18, 0.145, shirtMat, 0.002, faceTurn * 0.08);
    addLine(child, name + "_left_arm", -0.09, -0.02, -0.22, 0.035, 0.035, outlineMat, 0.001);
    addLine(child, name + "_right_arm", 0.09, -0.02, 0.22, 0.04, 0.035, outlineMat, 0.001);
    addEllipse(child, name + "_left_hand", -0.225, 0.04, 0.028, 0.03, decalCreamMat, 0.003, 0);
    addEllipse(child, name + "_right_hand", 0.225, 0.045, 0.028, 0.03, decalCreamMat, 0.003, 0);
    addLine(child, name + "_left_leg", -0.055, -0.14, -0.09, -0.285, 0.045, outlineMat, 0.001);
    addLine(child, name + "_right_leg", 0.055, -0.14, 0.09, -0.285, 0.045, outlineMat, 0.001);
    addRect(child, name + "_left_shoe", -0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, -0.15);
    addRect(child, name + "_right_shoe", 0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, 0.15);
    return child;
  }

  function addSideChild(parent, name, x, y, z, scale, shirtMat, pantsMat, hairMat) {
    const child = new THREE.Group();
    child.name = name;
    child.position.set(x, y, z);
    child.rotation.y = Math.PI / 2;
    child.scale.setScalar(scale);
    parent.add(child);

    addEllipse(child, name + "_hair_back", 0, 0.13, 0.145, 0.15, outlineMat, 0.001, 0.1);
    addEllipse(child, name + "_hair", 0, 0.13, 0.132, 0.138, hairMat, 0.002, 0.1);
    addEllipse(child, name + "_face", 0, 0.12, 0.105, 0.108, decalCreamMat, 0.003, 0.05);
    addEllipse(child, name + "_left_eye", -0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addEllipse(child, name + "_right_eye", 0.038, 0.145, 0.012, 0.017, outlineMat, 0.005, 0);
    addLine(child, name + "_smile", -0.035, 0.075, 0.035, 0.07, 0.012, outlineMat, 0.005);
    addRect(child, name + "_shirt_outline", 0, -0.055, 0.205, 0.17, outlineMat, 0.001, 0.05);
    addRect(child, name + "_shirt", 0, -0.055, 0.18, 0.145, shirtMat, 0.002, 0.05);
    addLine(child, name + "_left_arm", -0.09, -0.02, -0.22, 0.035, 0.035, outlineMat, 0.001);
    addLine(child, name + "_right_arm", 0.09, -0.02, 0.22, 0.04, 0.035, outlineMat, 0.001);
    addLine(child, name + "_left_leg", -0.055, -0.14, -0.09, -0.285, 0.045, outlineMat, 0.001);
    addLine(child, name + "_right_leg", 0.055, -0.14, 0.09, -0.285, 0.045, outlineMat, 0.001);
    addRect(child, name + "_left_shoe", -0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, -0.15);
    addRect(child, name + "_right_shoe", 0.11, -0.3, 0.09, 0.045, pantsMat, 0.003, 0.15);
    return child;
  }

  function addTopAnimal(parent, name, x, z, scale, bodyMat, earMat) {
    const animal = new THREE.Group();
    animal.name = name;
    animal.position.set(x, topSurfaceY + 0.012, z);
    animal.rotation.x = -Math.PI / 2;
    animal.scale.setScalar(scale);
    parent.add(animal);

    addEllipse(animal, name + "_body_outline", 0, -0.035, 0.15, 0.105, outlineMat, 0.001, 0);
    addEllipse(animal, name + "_body", 0, -0.035, 0.137, 0.092, bodyMat, 0.002, 0);
    addEllipse(animal, name + "_head_outline", 0.11, 0.055, 0.09, 0.085, outlineMat, 0.001, 0);
    addEllipse(animal, name + "_head", 0.11, 0.055, 0.078, 0.073, decalCreamMat, 0.002, 0);
    addTriangle(animal, name + "_left_ear", 0.065, 0.13, 0.035, 0.055, earMat, 0.002, -0.25);
    addTriangle(animal, name + "_right_ear", 0.15, 0.13, 0.035, 0.055, earMat, 0.002, 0.25);
    addEllipse(animal, name + "_eye", 0.13, 0.067, 0.011, 0.014, outlineMat, 0.004, 0);
    addEllipse(animal, name + "_nose", 0.18, 0.04, 0.014, 0.012, outlineMat, 0.004, 0);
    addLine(animal, name + "_tail", -0.13, -0.02, -0.2, 0.035, 0.025, outlineMat, 0.001);
    addLine(animal, name + "_front_leg", 0.07, -0.09, 0.08, -0.16, 0.025, outlineMat, 0.001);
    addLine(animal, name + "_back_leg", -0.07, -0.09, -0.08, -0.16, 0.025, outlineMat, 0.001);
    return animal;
  }

  function addTopStar(parent, name, x, z, scale) {
    const star = new THREE.Group();
    star.name = name;
    star.position.set(x, topSurfaceY + 0.013, z);
    star.rotation.x = -Math.PI / 2;
    star.scale.setScalar(scale);
    parent.add(star);
    for (let i = 0; i < 5; i++) {
      const a = Math.PI / 2 + i * Math.PI * 2 / 5;
      addLine(
        star,
        name + "_point_" + i,
        Math.cos(a) * 0.045,
        Math.sin(a) * 0.045,
        Math.cos(a) * 0.13,
        Math.sin(a) * 0.13,
        0.018,
        outlineMat,
        0.002
      );
    }
    return star;
  }

  function addTopCloud(parent, name, x, z, scale) {
    const cloud = new THREE.Group();
    cloud.name = name;
    cloud.position.set(x, topSurfaceY + 0.013, z);
    cloud.rotation.x = -Math.PI / 2;
    cloud.scale.setScalar(scale);
    parent.add(cloud);
    addEllipse(cloud, name + "_base", 0, -0.01, 0.13, 0.055, decalBlueMat, 0.002, 0);
    addEllipse(cloud, name + "_left_lobe", -0.065, 0.025, 0.06, 0.06, decalBlueMat, 0.002, 0);
    addEllipse(cloud, name + "_right_lobe", 0.06, 0.03, 0.065, 0.065, decalBlueMat, 0.002, 0);
    return cloud;
  }

  const top_decorations = new THREE.Group();
  top_decorations.name = "top_decorations";
  root.add(top_decorations);

  const top_left_child = addTopChild(top_decorations, "top_left_child", -1.08, 0.28, 0.72, decalRedMat, decalBlueMat, decalTanMat, -1);
  const top_center_child = addTopChild(top_decorations, "top_center_child", 0.02, -0.02, 0.82, decalTealMat, decalBlueMat, decalYellowMat, 1);
  const top_right_child = addTopChild(top_decorations, "top_right_child", 1.08, -0.27, 0.62, decalBlueMat, decalTealMat, decalTanMat, 1);
  const top_small_child = addTopChild(top_decorations, "top_small_child", -0.35, 0.39, 0.48, decalCreamMat, decalRedMat, decalYellowMat, -1);

  const top_left_animal = addTopAnimal(top_decorations, "top_left_animal", -1.3, -0.34, 0.55, decalCreamMat, decalTanMat);
  const top_center_animal = addTopAnimal(top_decorations, "top_center_animal", 0.55, -0.43, 0.48, decalCreamMat, decalYellowMat);
  const top_right_animal = addTopAnimal(top_decorations, "top_right_animal", 1.3, 0.1, 0.42, decalYellowMat, decalTanMat);

  const top_star_left = addTopStar(top_decorations, "top_star_left", -0.62, -0.35, 0.65);
  const top_star_center = addTopStar(top_decorations, "top_star_center", 0.55, 0.38, 0.55);
  const top_star_right = addTopStar(top_decorations, "top_star_right", 1.38, 0.36, 0.48);

  const top_cloud = addTopCloud(top_decorations, "top_cloud", -0.48, -0.42, 0.75);
  const top_little_cloud = addTopCloud(top_decorations, "top_little_cloud", 0.72, 0.22, 0.5);

  const front_decorations = new THREE.Group();
  front_decorations.name = "front_decorations";
  root.add(front_decorations);

  const front_left_tree = new THREE.Group();
  front_left_tree.name = "front_left_tree";
  front_left_tree.position.set(-0.95, 1.25, 0.614);
  front_left_tree.scale.setScalar(0.55);
  front_decorations.add(front_left_tree);
  addRect(front_left_tree, "front_left_tree_trunk_outline", 0, -0.08, 0.065, 0.2, outlineMat, 0.001, 0);
  addRect(front_left_tree, "front_left_tree_trunk", 0, -0.08, 0.04, 0.18, darkWoodMat, 0.002, 0);
  addEllipse(front_left_tree, "front_left_tree_canopy", 0, 0.09, 0.12, 0.1, decalGreenMat, 0.002, 0);
  addEllipse(front_left_tree, "front_left_tree_canopy_left", -0.08, 0.075, 0.07, 0.065, decalGreenMat, 0.002, 0);
  addEllipse(front_left_tree, "front_left_tree_canopy_right", 0.08, 0.075, 0.07, 0.065, decalGreenMat, 0.002, 0);

  const front_small_creature = new THREE.Group();
  front_small_creature.name = "front_small_creature";
  front_small_creature.position.set(-0.58, 1.25, 0.614);
  front_small_creature.scale.setScalar(0.5);
  front_decorations.add(front_small_creature);
  addEllipse(front_small_creature, "front_small_creature_body", 0, -0.02, 0.12, 0.08, decalYellowMat, 0.002, 0);
  addEllipse(front_small_creature, "front_small_creature_head", 0.09, 0.04, 0.07, 0.065, decalCreamMat, 0.002, 0);
  addEllipse(front_small_creature, "front_small_creature_eye", 0.11, 0.05, 0.01, 0.012, outlineMat, 0.004, 0);
  addLine(front_small_creature, "front_small_creature_tail", -0.1, -0.01, -0.18, 0.05, 0.025, outlineMat, 0.001);

  const front_right_cloud = addTopCloud(front_decorations, "front_right_cloud", 0.92, 1.29, 0.55);
  front_right_cloud.rotation.x = 0;

  const front_flower = new THREE.Group();
  front_flower.name = "front_flower";
  front_flower.position.set(1.18, 1.25, 0.614);
  front_flower.scale.setScalar(0.55);
  front_decorations.add(front_flower);
  addLine(front_flower, "front_flower_stem", 0, -0.12, 0, 0.08, 0.025, decalGreenMat, 0.001);
  addEllipse(front_flower, "front_flower_left_petal", -0.055, 0.1, 0.045, 0.06, decalYellowMat, 0.002, -0.5);
  addEllipse(front_flower, "front_flower_right_petal", 0.055, 0.1, 0.045, 0.06, decalYellowMat, 0.002, 0.5);
  addEllipse(front_flower, "front_flower_top_petal", 0, 0.16, 0.045, 0.06, decalYellowMat, 0.002, 0);
  addEllipse(front_flower, "front_flower_center", 0, 0.08, 0.035, 0.035, decalPinkMat, 0.003, 0);

  const right_leg_decorations = new THREE.Group();
  right_leg_decorations.name = "right_leg_decorations";
  root.add(right_leg_decorations);

  const right_leg_child = addSideChild(right_leg_decorations, "right_leg_child", legX + legW / 2 + 0.008, 0.72, -0.08, 0.78, decalRedMat, decalBlueMat, decalTanMat);

  const left_leg_decorations = new THREE.Group();
  left_leg_decorations.name = "left_leg_decorations";
  root.add(left_leg_decorations);

  const left_leg_child = addSideChild(left_leg_decorations, "left_leg_child", -legX - legW / 2 - 0.008, 0.68, -0.05, 0.76, decalBlueMat, decalRedMat, decalTanMat);

  const top_edge_grainGeom = new THREE.BoxGeometry(1, 0.007, 0.006);
  const top_edge_grain = new THREE.InstancedMesh(top_edge_grainGeom, grainMat, 8);
  top_edge_grain.name = "top_edge_grain";
  const edgeGrainDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const length = 0.35 + ((i * 13) % 7) * 0.1;
    const x = -1.2 + ((i * 29) % 100) / 100 * 2.4;
    const y = topY - 0.055 + (i % 4) * 0.035;
    edgeGrainDummy.position.set(x, y, deskD / 2 + 0.028);
    edgeGrainDummy.rotation.set(0, 0, ((i % 3) - 1) * 0.01);
    edgeGrainDummy.scale.set(length, 1, 1);
    edgeGrainDummy.updateMatrix();
    top_edge_grain.setMatrixAt(i, edgeGrainDummy.matrix);
  }
  top_edge_grain.instanceMatrix.needsUpdate = true;
  root.add(top_edge_grain);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}