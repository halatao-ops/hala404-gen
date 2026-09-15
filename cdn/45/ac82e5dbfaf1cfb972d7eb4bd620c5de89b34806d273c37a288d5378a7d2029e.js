export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe5bd78,
    metalness: 0.0,
    roughness: 0.6,
  });
  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0xa97843,
    metalness: 0.0,
    roughness: 0.75,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0xc58d45,
    metalness: 0.0,
    roughness: 0.7,
  });
  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xf2d59b,
    metalness: 0.0,
    roughness: 0.65,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x3b2418,
    metalness: 0.0,
    roughness: 0.75,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x24130c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0x704323,
    metalness: 0.0,
    roughness: 0.75,
  });

  const bodyW = 0.62;
  const bodyL = 4.4;
  const bodyH = 0.14;
  const cornerR = 0.14;
  const halfW = bodyW / 2;
  const halfL = bodyL / 2;

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-halfW + cornerR, -halfL);
  bodyShape.lineTo(halfW - cornerR, -halfL);
  bodyShape.quadraticCurveTo(halfW, -halfL, halfW, -halfL + cornerR);
  bodyShape.lineTo(halfW, halfL - cornerR);
  bodyShape.quadraticCurveTo(halfW, halfL, halfW - cornerR, halfL);
  bodyShape.lineTo(-halfW + cornerR, halfL);
  bodyShape.quadraticCurveTo(-halfW, halfL, -halfW, halfL - cornerR);
  bodyShape.lineTo(-halfW, -halfL + cornerR);
  bodyShape.quadraticCurveTo(-halfW, -halfL, -halfW + cornerR, -halfL);

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyH,
    steps: 1,
    curveSegments: 10,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.rotation.x = -Math.PI / 2;
  root.add(body);

  const end_grainGeom = new THREE.BoxGeometry(0.36, 0.075, 0.012);
  const end_grain = new THREE.Mesh(end_grainGeom, end_grainMat);
  end_grain.position.set(0, 0.067, -halfL - 0.004);
  root.add(end_grain);

  const grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const grainDummy = new THREE.Object3D();

  const darkGrainCount = 24;
  const wood_grain_lines = new THREE.InstancedMesh(
    grainGeom,
    grainMat,
    darkGrainCount
  );
  for (let i = 0; i < darkGrainCount; i++) {
    const x = -0.265 + (i / (darkGrainCount - 1)) * 0.53;
    const z = -0.08 + ((i % 5) - 2) * 0.025;
    const length = 3.55 + ((i * 7) % 6) * 0.075;
    const width = 0.004 + (i % 3) * 0.0015;
    grainDummy.position.set(x, bodyH + 0.002, z);
    grainDummy.rotation.set(0, ((i % 4) - 1.5) * 0.003, 0);
    grainDummy.scale.set(width, 0.002, length);
    grainDummy.updateMatrix();
    wood_grain_lines.setMatrixAt(i, grainDummy.matrix);
  }
  wood_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(wood_grain_lines);

  const lightGrainCount = 16;
  const light_wood_grain = new THREE.InstancedMesh(
    grainGeom,
    light_grainMat,
    lightGrainCount
  );
  for (let i = 0; i < lightGrainCount; i++) {
    const x = -0.245 + (i / (lightGrainCount - 1)) * 0.49;
    const z = 0.04 + ((i % 4) - 1.5) * 0.035;
    const length = 3.72 - (i % 4) * 0.09;
    grainDummy.position.set(x, bodyH + 0.0015, z);
    grainDummy.rotation.set(0, ((i % 3) - 1) * 0.0025, 0);
    grainDummy.scale.set(0.0035, 0.0015, length);
    grainDummy.updateMatrix();
    light_wood_grain.setMatrixAt(i, grainDummy.matrix);
  }
  light_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(light_wood_grain);

  const markingGeom = new THREE.BoxGeometry(1, 1, 1);
  const markingDummy = new THREE.Object3D();
  const markY = bodyH + 0.006;

  const central_border = new THREE.InstancedMesh(
    markingGeom,
    markingMat,
    4
  );
  const borderTransforms = [
    [0, markY, 0.56, 0.55, 0.006, 0.025],
    [0, markY, -0.56, 0.55, 0.006, 0.025],
    [-0.265, markY, 0, 0.025, 0.006, 1.145],
    [0.265, markY, 0, 0.025, 0.006, 1.145],
  ];
  for (let i = 0; i < borderTransforms.length; i++) {
    const t = borderTransforms[i];
    markingDummy.position.set(t[0], t[1], t[2]);
    markingDummy.rotation.set(0, 0, 0);
    markingDummy.scale.set(t[3], t[4], t[5]);
    markingDummy.updateMatrix();
    central_border.setMatrixAt(i, markingDummy.matrix);
  }
  central_border.instanceMatrix.needsUpdate = true;
  root.add(central_border);

  const central_dividers = new THREE.InstancedMesh(
    markingGeom,
    markingMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    markingDummy.position.set(i === 0 ? -0.17 : 0.17, markY, 0);
    markingDummy.rotation.set(0, 0, 0);
    markingDummy.scale.set(0.022, 0.006, 1.03);
    markingDummy.updateMatrix();
    central_dividers.setMatrixAt(i, markingDummy.matrix);
  }
  central_dividers.instanceMatrix.needsUpdate = true;
  root.add(central_dividers);

  const glyphTransforms = [];
  function addGlyphBar(x, z, w, d, rot) {
    glyphTransforms.push([x, z, w, d, rot || 0]);
  }

  addGlyphBar(-0.09, 0.35, 0.18, 0.026, 0);
  addGlyphBar(-0.09, 0.19, 0.18, 0.026, 0);
  addGlyphBar(-0.18, 0.27, 0.026, 0.18, 0);
  addGlyphBar(0, 0.27, 0.026, 0.18, 0);
  addGlyphBar(0.09, 0.27, 0.026, 0.18, 0);

  addGlyphBar(0.09, 0.35, 0.18, 0.026, 0);
  addGlyphBar(0.09, 0.19, 0.18, 0.026, 0);
  addGlyphBar(0, 0.27, 0.026, 0.18, 0);
  addGlyphBar(0.18, 0.27, 0.026, 0.18, 0);

  addGlyphBar(-0.09, -0.19, 0.18, 0.026, 0);
  addGlyphBar(-0.09, -0.35, 0.18, 0.026, 0);
  addGlyphBar(-0.18, -0.27, 0.026, 0.18, 0);
  addGlyphBar(0, -0.27, 0.026, 0.18, 0);

  addGlyphBar(0.09, -0.19, 0.18, 0.026, 0);
  addGlyphBar(0.09, -0.35, 0.18, 0.026, 0);
  addGlyphBar(0, -0.27, 0.026, 0.18, 0);
  addGlyphBar(0.18, -0.27, 0.026, 0.18, 0);
  addGlyphBar(0.09, -0.27, 0.18, 0.026, 0);

  const central_glyphs = new THREE.InstancedMesh(
    markingGeom,
    markingMat,
    glyphTransforms.length
  );
  for (let i = 0; i < glyphTransforms.length; i++) {
    const t = glyphTransforms[i];
    markingDummy.position.set(t[0], markY + 0.001, t[1]);
    markingDummy.rotation.set(0, t[4], 0);
    markingDummy.scale.set(t[2], 0.006, t[3]);
    markingDummy.updateMatrix();
    central_glyphs.setMatrixAt(i, markingDummy.matrix);
  }
  central_glyphs.instanceMatrix.needsUpdate = true;
  root.add(central_glyphs);

  const scaleTickData = [
    [-0.22, -1.72, 0.025, 0.16, -0.22],
    [-0.13, -1.52, 0.024, 0.13, -0.20],
    [-0.04, -1.34, 0.024, 0.12, -0.18],
    [0.05, -1.17, 0.025, 0.14, -0.16],
    [0.14, -0.99, 0.025, 0.15, -0.14],
    [0.21, -0.80, 0.024, 0.12, -0.12],
    [-0.18, 1.24, 0.024, 0.12, 0.18],
    [-0.08, 1.39, 0.024, 0.11, 0.16],
    [0.03, 1.53, 0.025, 0.13, 0.14],
  ];
  const scale_ticks = new THREE.InstancedMesh(
    markingGeom,
    markingMat,
    scaleTickData.length
  );
  for (let i = 0; i < scaleTickData.length; i++) {
    const t = scaleTickData[i];
    markingDummy.position.set(t[0], markY, t[1]);
    markingDummy.rotation.set(0, t[4], 0);
    markingDummy.scale.set(t[2], 0.006, t[3]);
    markingDummy.updateMatrix();
    scale_ticks.setMatrixAt(i, markingDummy.matrix);
  }
  scale_ticks.instanceMatrix.needsUpdate = true;
  root.add(scale_ticks);

  const upper_pair_marks = new THREE.InstancedMesh(
    markingGeom,
    markingMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    markingDummy.position.set(i === 0 ? -0.035 : 0.035, markY, 0.91);
    markingDummy.rotation.set(0, i === 0 ? -0.18 : 0.18, 0);
    markingDummy.scale.set(0.022, 0.006, 0.105);
    markingDummy.updateMatrix();
    upper_pair_marks.setMatrixAt(i, markingDummy.matrix);
  }
  upper_pair_marks.instanceMatrix.needsUpdate = true;
  root.add(upper_pair_marks);

  const hole_rimGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.006, 24);
  const hole_rim = new THREE.Mesh(hole_rimGeom, hole_rimMat);
  hole_rim.position.set(0.045, bodyH + 0.003, 1.62);
  root.add(hole_rim);

  const hanging_holeGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.012,
    24
  );
  const hanging_hole = new THREE.Mesh(hanging_holeGeom, holeMat);
  hanging_hole.position.set(0.045, bodyH + 0.008, 1.62);
  root.add(hanging_hole);

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