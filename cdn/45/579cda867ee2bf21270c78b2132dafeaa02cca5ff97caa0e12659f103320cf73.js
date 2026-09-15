export default function generate(THREE) {
  const root = new THREE.Group();
  const handle_assembly = new THREE.Group();
  const blade_assembly = new THREE.Group();
  root.add(handle_assembly, blade_assembly);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a84f,
    metalness: 0.6,
    roughness: 0.3,
  });
  const goldFaceMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf78,
    metalness: 0.6,
    roughness: 0.28,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8f6728,
    metalness: 0.5,
    roughness: 0.38,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc8c9c7,
    metalness: 0.6,
    roughness: 0.35,
  });
  const silverFaceMat = new THREE.MeshStandardMaterial({
    color: 0xe2e3e1,
    metalness: 0.5,
    roughness: 0.3,
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x85898d,
    metalness: 0.5,
    roughness: 0.35,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.2,
    roughness: 0.75,
  });

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelSize,
      bevelThickness,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeHandleShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.34, 0.72);
    shape.lineTo(-0.42, 0.48);
    shape.lineTo(-0.42, -2.72);
    shape.bezierCurveTo(-0.42, -3.0, -0.24, -3.18, 0, -3.18);
    shape.bezierCurveTo(0.24, -3.18, 0.42, -3.0, 0.42, -2.72);
    shape.lineTo(0.42, 0.48);
    shape.lineTo(0.34, 0.72);
    shape.closePath();
    return shape;
  }

  function makeCollarShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.42, 0.38);
    shape.lineTo(-0.42, 0.62);
    shape.bezierCurveTo(-0.42, 0.82, -0.5, 0.98, -0.62, 1.12);
    shape.lineTo(0.62, 1.12);
    shape.bezierCurveTo(0.5, 0.98, 0.42, 0.82, 0.42, 0.62);
    shape.lineTo(0.42, 0.38);
    shape.closePath();
    return shape;
  }

  function makeBladeShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.48, 0.72);
    shape.bezierCurveTo(-0.58, 0.9, -0.72, 1.05, -0.82, 1.22);
    shape.lineTo(-1.05, 1.65);
    shape.lineTo(-1.1, 3.18);
    shape.bezierCurveTo(-1.1, 3.42, -0.92, 3.58, -0.68, 3.62);
    shape.lineTo(0.68, 3.62);
    shape.bezierCurveTo(0.92, 3.58, 1.1, 3.42, 1.1, 3.18);
    shape.lineTo(1.05, 1.65);
    shape.lineTo(0.82, 1.22);
    shape.bezierCurveTo(0.72, 1.05, 0.58, 0.9, 0.48, 0.72);
    shape.closePath();

    const slot = new THREE.Path();
    slot.moveTo(0.46, 2.25);
    slot.bezierCurveTo(0.18, 2.08, -0.28, 2.08, -0.5, 2.28);
    slot.bezierCurveTo(-0.68, 2.45, -0.68, 2.72, -0.58, 2.95);
    slot.lineTo(0.58, 3.2);
    slot.bezierCurveTo(0.72, 3.2, 0.78, 3.12, 0.78, 3.0);
    slot.lineTo(0.68, 2.38);
    slot.bezierCurveTo(0.64, 2.28, 0.56, 2.24, 0.46, 2.25);
    slot.closePath();
    shape.holes.push(slot);
    return shape;
  }

  const handle_bodyGeom = makeExtrudedGeometry(makeHandleShape(), 0.34, 0.055, 0.055);
  const handle_body = new THREE.Mesh(handle_bodyGeom, goldMat);
  handle_assembly.add(handle_body);

  const handle_faceGeom = makeExtrudedGeometry(makeHandleShape(), 0.025, 0.018, 0.008);
  const handle_face = new THREE.Mesh(handle_faceGeom, goldFaceMat);
  handle_face.scale.set(0.86, 0.975, 1);
  handle_face.position.z = 0.225;
  handle_assembly.add(handle_face);

  const collarGeom = makeExtrudedGeometry(makeCollarShape(), 0.36, 0.045, 0.045);
  const collar = new THREE.Mesh(collarGeom, goldMat);
  handle_assembly.add(collar);

  const collar_faceGeom = makeExtrudedGeometry(makeCollarShape(), 0.025, 0.014, 0.008);
  const collar_face = new THREE.Mesh(collar_faceGeom, goldFaceMat);
  collar_face.scale.set(0.88, 0.96, 1);
  collar_face.position.z = 0.235;
  handle_assembly.add(collar_face);

  const bladeGeom = makeExtrudedGeometry(makeBladeShape(), 0.1, 0.025, 0.025);
  const blade = new THREE.Mesh(bladeGeom, silverMat);
  blade_assembly.add(blade);

  const blade_faceGeom = makeExtrudedGeometry(makeBladeShape(), 0.018, 0.012, 0.006);
  const blade_face = new THREE.Mesh(blade_faceGeom, silverFaceMat);
  blade_face.position.z = 0.078;
  blade_assembly.add(blade_face);

  const handle_ridgeGeom = new THREE.CylinderGeometry(0.018, 0.018, 2.72, 10);
  const left_handle_ridge = new THREE.Mesh(handle_ridgeGeom, darkGoldMat);
  left_handle_ridge.position.set(-0.31, -1.05, 0.255);
  handle_assembly.add(left_handle_ridge);

  const right_handle_ridge = new THREE.Mesh(handle_ridgeGeom, darkGoldMat);
  right_handle_ridge.position.set(0.31, -1.05, 0.255);
  handle_assembly.add(right_handle_ridge);

  const butt_end_grooveGeom = new THREE.BoxGeometry(0.68, 0.025, 0.018);
  const butt_end_groove = new THREE.Mesh(butt_end_grooveGeom, darkGoldMat);
  butt_end_groove.position.set(0, -2.72, 0.258);
  handle_assembly.add(butt_end_groove);

  const collar_seamGeom = new THREE.BoxGeometry(0.76, 0.025, 0.018);
  const collar_seam = new THREE.Mesh(collar_seamGeom, darkGoldMat);
  collar_seam.position.set(0, 0.43, 0.258);
  handle_assembly.add(collar_seam);

  const collar_highlightGeom = new THREE.BoxGeometry(0.72, 0.018, 0.014);
  const collar_highlight = new THREE.Mesh(collar_highlightGeom, goldFaceMat);
  collar_highlight.position.set(0, 1.02, 0.258);
  handle_assembly.add(collar_highlight);

  const screwGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 24);
  const lower_screw = new THREE.Mesh(screwGeom, screwMat);
  lower_screw.rotation.x = Math.PI / 2;
  lower_screw.position.set(0, -2.91, 0.275);
  handle_assembly.add(lower_screw);

  const upper_screw = new THREE.Mesh(screwGeom, screwMat);
  upper_screw.rotation.x = Math.PI / 2;
  upper_screw.position.set(0, 0.72, 0.275);
  handle_assembly.add(upper_screw);

  const screw_slotGeom = new THREE.BoxGeometry(0.12, 0.018, 0.012);
  const lower_screw_slot_horizontal = new THREE.Mesh(screw_slotGeom, darkMat);
  lower_screw_slot_horizontal.position.set(0, -2.91, 0.298);
  handle_assembly.add(lower_screw_slot_horizontal);

  const lower_screw_slot_vertical = new THREE.Mesh(screw_slotGeom, darkMat);
  lower_screw_slot_vertical.rotation.z = Math.PI / 2;
  lower_screw_slot_vertical.position.set(0, -2.91, 0.299);
  handle_assembly.add(lower_screw_slot_vertical);

  const upper_screw_slot_horizontal = new THREE.Mesh(screw_slotGeom, darkMat);
  upper_screw_slot_horizontal.position.set(0, 0.72, 0.298);
  handle_assembly.add(upper_screw_slot_horizontal);

  const upper_screw_slot_vertical = new THREE.Mesh(screw_slotGeom, darkMat);
  upper_screw_slot_vertical.rotation.z = Math.PI / 2;
  upper_screw_slot_vertical.position.set(0, 0.72, 0.299);
  handle_assembly.add(upper_screw_slot_vertical);

  const blade_toothShape = new THREE.Shape();
  blade_toothShape.moveTo(0, -0.055);
  blade_toothShape.lineTo(0.17, 0);
  blade_toothShape.lineTo(0, 0.055);
  blade_toothShape.closePath();

  const blade_toothGeom = makeExtrudedGeometry(blade_toothShape, 0.09, 0.004, 0.004);
  const toothCount = 13;
  const right_serrated_edge = new THREE.InstancedMesh(blade_toothGeom, silverMat, toothCount);
  const left_serrated_edge = new THREE.InstancedMesh(blade_toothGeom, silverMat, toothCount);
  const tooth_dummy = new THREE.Object3D();

  for (let i = 0; i < toothCount; i++) {
    const y = 1.82 + i * 0.09;

    tooth_dummy.position.set(1.04, y, 0);
    tooth_dummy.rotation.set(0, 0, 0);
    tooth_dummy.updateMatrix();
    right_serrated_edge.setMatrixAt(i, tooth_dummy.matrix);

    tooth_dummy.position.set(-1.04, y, 0);
    tooth_dummy.rotation.set(0, 0, Math.PI);
    tooth_dummy.updateMatrix();
    left_serrated_edge.setMatrixAt(i, tooth_dummy.matrix);
  }
  right_serrated_edge.instanceMatrix.needsUpdate = true;
  left_serrated_edge.instanceMatrix.needsUpdate = true;
  blade_assembly.add(right_serrated_edge, left_serrated_edge);

  const inner_toothGeom = new THREE.BoxGeometry(0.075, 0.035, 0.1);
  const inner_serrated_edge = new THREE.InstancedMesh(inner_toothGeom, darkMat, toothCount);
  for (let i = 0; i < toothCount; i++) {
    const t = i / (toothCount - 1);
    const y = 2.39 + t * 0.69;
    const x = 0.68 - t * 0.1;
    tooth_dummy.position.set(x, y, 0.015);
    tooth_dummy.rotation.set(0, 0, -0.12);
    tooth_dummy.updateMatrix();
    inner_serrated_edge.setMatrixAt(i, tooth_dummy.matrix);
  }
  inner_serrated_edge.instanceMatrix.needsUpdate = true;
  blade_assembly.add(inner_serrated_edge);

  const logo_barGeom = new THREE.BoxGeometry(0.018, 0.1, 0.012);
  const logo_bars = new THREE.InstancedMesh(logo_barGeom, darkGoldMat, 6);
  const logo_dummy = new THREE.Object3D();
  const logoHeights = [0.65, 1, 0.78, 0.9, 0.62, 1];
  for (let i = 0; i < 6; i++) {
    logo_dummy.position.set(-0.12 + i * 0.048, 0.82, 0.267);
    logo_dummy.scale.set(1, logoHeights[i], 1);
    logo_dummy.updateMatrix();
    logo_bars.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_bars.instanceMatrix.needsUpdate = true;
  handle_assembly.add(logo_bars);

  const logo_underlineGeom = new THREE.BoxGeometry(0.29, 0.012, 0.012);
  const logo_underline = new THREE.Mesh(logo_underlineGeom, darkGoldMat);
  logo_underline.position.set(0, 0.755, 0.267);
  handle_assembly.add(logo_underline);

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