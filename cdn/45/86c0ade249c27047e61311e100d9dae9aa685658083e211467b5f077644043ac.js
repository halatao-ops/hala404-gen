export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6038,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5c321d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc18450,
    metalness: 0.0,
    roughness: 0.65,
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b8,
    metalness: 0.6,
    roughness: 0.45,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.7,
    roughness: 0.35,
  });
  const pivotMat = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: 0.7,
    roughness: 0.28,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.2,
    roughness: 0.8,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.3,
    roughness: 0.65,
  });

  function makeExtrudedGeometry(shape, thickness, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 20,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -thickness / 2);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.34, -2.72);
  handleShape.bezierCurveTo(-0.45, -2.70, -0.48, -2.55, -0.45, -2.38);
  handleShape.lineTo(-0.39, -0.28);
  handleShape.quadraticCurveTo(-0.38, -0.10, -0.27, -0.05);
  handleShape.lineTo(0.27, -0.05);
  handleShape.quadraticCurveTo(0.38, -0.10, 0.39, -0.28);
  handleShape.lineTo(0.45, -2.38);
  handleShape.bezierCurveTo(0.48, -2.55, 0.45, -2.70, 0.34, -2.72);
  handleShape.quadraticCurveTo(0.0, -2.82, -0.34, -2.72);
  handleShape.closePath();

  const handleGeom = makeExtrudedGeometry(handleShape, 0.34, 0.055, 0.045);
  const handle = new THREE.Mesh(handleGeom, woodMat);
  root.add(handle);

  const handle_grain = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const x = -0.31 + i * 0.078;
    const zStart = -2.50 + (i % 3) * 0.08;
    const zEnd = -0.28 - (i % 2) * 0.12;
    const grainPoints = [
      new THREE.Vector3(x, 0.222, zStart),
      new THREE.Vector3(x + Math.sin(i * 1.7) * 0.035, 0.222, -1.75),
      new THREE.Vector3(x - Math.sin(i * 0.9) * 0.025, 0.222, -0.95),
      new THREE.Vector3(x + Math.sin(i * 2.2) * 0.020, 0.222, zEnd),
    ];
    const grainCurve = new THREE.CatmullRomCurve3(grainPoints);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 18, 0.007, 5, false);
    const grainMat = i % 3 === 0 ? lightWoodMat : darkWoodMat;
    const grain_line = new THREE.Mesh(grainGeom, grainMat);
    handle_grain.add(grain_line);
  }
  root.add(handle_grain);

  const wood_rivetGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.035, 24);
  const wood_rivet = new THREE.Mesh(wood_rivetGeom, pivotMat);
  wood_rivet.position.set(0.02, 0.235, -1.62);
  root.add(wood_rivet);

  const tangShape = new THREE.Shape();
  tangShape.moveTo(-0.34, -0.34);
  tangShape.lineTo(0.34, -0.34);
  tangShape.lineTo(0.34, 0.52);
  tangShape.quadraticCurveTo(0.33, 0.66, 0.18, 0.70);
  tangShape.lineTo(-0.18, 0.70);
  tangShape.quadraticCurveTo(-0.33, 0.66, -0.34, 0.52);
  tangShape.closePath();

  const tangGeom = makeExtrudedGeometry(tangShape, 0.16, 0.025, 0.02);
  const tang = new THREE.Mesh(tangGeom, bladeMat);
  tang.position.y = 0.08;
  root.add(tang);

  const lowerBladeShape = new THREE.Shape();
  lowerBladeShape.moveTo(-0.28, 0.20);
  lowerBladeShape.quadraticCurveTo(-0.22, 0.42, -0.08, 0.62);
  lowerBladeShape.lineTo(0.10, 0.82);
  lowerBladeShape.lineTo(2.58, 1.62);
  lowerBladeShape.quadraticCurveTo(2.72, 1.67, 2.64, 1.55);
  lowerBladeShape.lineTo(0.30, 0.30);
  lowerBladeShape.quadraticCurveTo(0.08, 0.16, -0.28, 0.20);
  lowerBladeShape.closePath();

  const lower_bladeGeom = makeExtrudedGeometry(lowerBladeShape, 0.105, 0.025, 0.018);
  const lower_blade = new THREE.Mesh(lower_bladeGeom, bladeMat);
  lower_blade.position.y = 0.015;
  root.add(lower_blade);

  const upperBladeShape = new THREE.Shape();
  upperBladeShape.moveTo(-0.30, 0.18);
  upperBladeShape.quadraticCurveTo(-0.25, 0.43, -0.10, 0.65);
  upperBladeShape.lineTo(0.08, 0.86);
  upperBladeShape.lineTo(1.58, 3.05);
  upperBladeShape.quadraticCurveTo(1.66, 3.15, 1.55, 3.00);
  upperBladeShape.lineTo(0.25, 0.34);
  upperBladeShape.quadraticCurveTo(0.02, 0.16, -0.30, 0.18);
  upperBladeShape.closePath();

  const upper_bladeGeom = makeExtrudedGeometry(upperBladeShape, 0.115, 0.026, 0.019);
  const upper_blade = new THREE.Mesh(upper_bladeGeom, bladeMat);
  upper_blade.position.y = 0.13;
  root.add(upper_blade);

  const upper_blade_edgeGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.08, 0.218, 0.86),
      new THREE.Vector3(1.58, 0.218, 3.05)
    ),
    1,
    0.012,
    6,
    false
  );
  const upper_blade_edge = new THREE.Mesh(upper_blade_edgeGeom, edgeMat);
  root.add(upper_blade_edge);

  const lower_blade_edgeGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.10, 0.095, 0.82),
      new THREE.Vector3(2.58, 0.095, 1.62)
    ),
    1,
    0.011,
    6,
    false
  );
  const lower_blade_edge = new THREE.Mesh(lower_blade_edgeGeom, edgeMat);
  root.add(lower_blade_edge);

  const pivot_recessGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.025, 32);
  const pivot_recess = new THREE.Mesh(pivot_recessGeom, recessMat);
  pivot_recess.position.set(0, 0.215, 0.48);
  root.add(pivot_recess);

  const pivot_washerGeom = new THREE.CylinderGeometry(0.175, 0.175, 0.055, 32);
  const pivot_washer = new THREE.Mesh(pivot_washerGeom, pivotMat);
  pivot_washer.position.set(0, 0.245, 0.48);
  root.add(pivot_washer);

  const pivot_boltGeom = new THREE.SphereGeometry(0.13, 24, 12);
  const pivot_bolt = new THREE.Mesh(pivot_boltGeom, pivotMat);
  pivot_bolt.scale.set(1.0, 0.34, 1.0);
  pivot_bolt.position.set(0, 0.285, 0.48);
  root.add(pivot_bolt);

  const engraving_line_1Geom = new THREE.BoxGeometry(0.16, 0.008, 0.012);
  const engraving_line_1 = new THREE.Mesh(engraving_line_1Geom, engravingMat);
  engraving_line_1.position.set(-0.08, 0.198, 0.02);
  engraving_line_1.rotation.y = -0.12;
  root.add(engraving_line_1);

  const engraving_line_2Geom = new THREE.BoxGeometry(0.12, 0.008, 0.010);
  const engraving_line_2 = new THREE.Mesh(engraving_line_2Geom, engravingMat);
  engraving_line_2.position.set(-0.06, 0.198, 0.075);
  engraving_line_2.rotation.y = -0.12;
  root.add(engraving_line_2);

  const engraving_line_3Geom = new THREE.BoxGeometry(0.09, 0.008, 0.009);
  const engraving_line_3 = new THREE.Mesh(engraving_line_3Geom, engravingMat);
  engraving_line_3.position.set(-0.04, 0.198, 0.125);
  engraving_line_3.rotation.y = -0.12;
  root.add(engraving_line_3);

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