export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "scarab_seal";

  const gemstone_group = new THREE.Group();
  gemstone_group.name = "gemstone_group";
  root.add(gemstone_group);

  const silver_setting = new THREE.Group();
  silver_setting.name = "silver_setting";
  root.add(silver_setting);

  const engraved_glyphs = new THREE.Group();
  engraved_glyphs.name = "engraved_glyphs";
  root.add(engraved_glyphs);

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x8b0718,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.32,
    thickness: 0.9,
    attenuationColor: 0xb5162b,
    attenuationDistance: 1.8,
    ior: 1.5,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.98
  });

  const silver_frameMat = new THREE.MeshStandardMaterial({
    color: 0xc8c6bd,
    metalness: 0.6,
    roughness: 0.24
  });

  const engraved_strokesMat = new THREE.MeshStandardMaterial({
    color: 0x4b0209,
    metalness: 0.0,
    roughness: 0.32
  });

  const engraving_highlightsMat = new THREE.MeshStandardMaterial({
    color: 0xb52836,
    metalness: 0.0,
    roughness: 0.2
  });

  const amber_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0xff7a24,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x8f2108,
    emissiveIntensity: 0.25
  });

  const gemstone_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x3d0108,
    metalness: 0.0,
    roughness: 0.7
  });

  const gemstoneShape = new THREE.Shape();
  gemstoneShape.moveTo(0, -0.66);
  gemstoneShape.bezierCurveTo(0.19, -0.65, 0.34, -0.52, 0.39, -0.30);
  gemstoneShape.bezierCurveTo(0.44, -0.04, 0.41, 0.28, 0.30, 0.48);
  gemstoneShape.bezierCurveTo(0.21, 0.62, 0.08, 0.67, 0, 0.67);
  gemstoneShape.bezierCurveTo(-0.08, 0.67, -0.21, 0.62, -0.30, 0.48);
  gemstoneShape.bezierCurveTo(-0.41, 0.28, -0.44, -0.04, -0.39, -0.30);
  gemstoneShape.bezierCurveTo(-0.34, -0.52, -0.19, -0.65, 0, -0.66);
  gemstoneShape.closePath();

  const gemstoneDepth = 0.46;
  const gemstoneBevel = 0.09;
  const gemstoneBodyDepth = gemstoneDepth - gemstoneBevel * 2;
  const gemstoneGeom = new THREE.ExtrudeGeometry(gemstoneShape, {
    depth: gemstoneBodyDepth,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: gemstoneBevel,
    bevelSize: 0.055,
    bevelSegments: 5
  });
  gemstoneGeom.translate(0, 0, -gemstoneBodyDepth / 2);

  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone_group.add(gemstone);

  const amber_inclusionsGeom = new THREE.SphereGeometry(0.018, 10, 6);
  const amberData = [
    [-0.25, 0.30, 0.12, 1.4],
    [0.19, 0.39, 0.07, 0.8],
    [0.31, 0.08, -0.02, 1.1],
    [-0.31, -0.08, 0.04, 0.7],
    [0.22, -0.29, 0.13, 1.3],
    [-0.14, -0.43, -0.05, 0.9],
    [0.04, 0.52, -0.08, 0.65],
    [0.02, -0.12, 0.16, 0.55]
  ];
  const amber_inclusions = new THREE.InstancedMesh(
    amber_inclusionsGeom,
    amber_inclusionsMat,
    amberData.length
  );
  amber_inclusions.name = "amber_inclusions";
  const amberDummy = new THREE.Object3D();
  for (let i = 0; i < amberData.length; i++) {
    const p = amberData[i];
    amberDummy.position.set(p[0], p[1], p[2]);
    amberDummy.scale.setScalar(p[3]);
    amberDummy.updateMatrix();
    amber_inclusions.setMatrixAt(i, amberDummy.matrix);
  }
  amber_inclusions.instanceMatrix.needsUpdate = true;
  gemstone_group.add(amber_inclusions);

  const gemstone_inclusionsGeom = new THREE.SphereGeometry(0.011, 8, 5);
  const darkData = [
    [-0.12, 0.43, 0.13, 0.7],
    [0.27, 0.25, 0.10, 0.55],
    [-0.30, 0.12, -0.04, 0.45],
    [0.12, -0.02, 0.15, 0.6],
    [-0.20, -0.25, 0.08, 0.5],
    [0.29, -0.39, -0.03, 0.7],
    [0.08, -0.52, 0.03, 0.45]
  ];
  const gemstone_inclusions = new THREE.InstancedMesh(
    gemstone_inclusionsGeom,
    gemstone_inclusionsMat,
    darkData.length
  );
  gemstone_inclusions.name = "gemstone_inclusions";
  const inclusionDummy = new THREE.Object3D();
  for (let i = 0; i < darkData.length; i++) {
    const p = darkData[i];
    inclusionDummy.position.set(p[0], p[1], p[2]);
    inclusionDummy.scale.setScalar(p[3]);
    inclusionDummy.updateMatrix();
    gemstone_inclusions.setMatrixAt(i, inclusionDummy.matrix);
  }
  gemstone_inclusions.instanceMatrix.needsUpdate = true;
  gemstone_group.add(gemstone_inclusions);

  const silverFrameShape = new THREE.Shape();
  silverFrameShape.moveTo(0, -0.72);
  silverFrameShape.bezierCurveTo(0.22, -0.71, 0.39, -0.57, 0.44, -0.32);
  silverFrameShape.bezierCurveTo(0.49, -0.04, 0.46, 0.31, 0.34, 0.52);
  silverFrameShape.bezierCurveTo(0.24, 0.67, 0.10, 0.72, 0, 0.72);
  silverFrameShape.bezierCurveTo(-0.10, 0.72, -0.24, 0.67, -0.34, 0.52);
  silverFrameShape.bezierCurveTo(-0.46, 0.31, -0.49, -0.04, -0.44, -0.32);
  silverFrameShape.bezierCurveTo(-0.39, -0.57, -0.22, -0.71, 0, -0.72);
  silverFrameShape.closePath();

  const silverFrameHole = new THREE.Path();
  silverFrameHole.moveTo(0, -0.625);
  silverFrameHole.bezierCurveTo(-0.17, -0.62, -0.31, -0.50, -0.36, -0.28);
  silverFrameHole.bezierCurveTo(-0.40, -0.03, -0.38, 0.25, -0.29, 0.45);
  silverFrameHole.bezierCurveTo(-0.20, 0.58, -0.07, 0.63, 0, 0.63);
  silverFrameHole.bezierCurveTo(0.07, 0.63, 0.20, 0.58, 0.29, 0.45);
  silverFrameHole.bezierCurveTo(0.38, 0.25, 0.40, -0.03, 0.36, -0.28);
  silverFrameHole.bezierCurveTo(0.31, -0.50, 0.17, -0.62, 0, -0.625);
  silverFrameHole.closePath();
  silverFrameShape.holes.push(silverFrameHole);

  const silverFrameDepth = 0.10;
  const silverFrameBevel = 0.018;
  const silverFrameBodyDepth = silverFrameDepth - silverFrameBevel * 2;
  const silver_frameGeom = new THREE.ExtrudeGeometry(silverFrameShape, {
    depth: silverFrameBodyDepth,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: silverFrameBevel,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  silver_frameGeom.translate(0, 0, 0.215 - silverFrameBodyDepth / 2);

  const silver_frame = new THREE.Mesh(silver_frameGeom, silver_frameMat);
  silver_frame.name = "silver_frame";
  silver_setting.add(silver_frame);

  const rear_silver_bandGeom = new THREE.TorusGeometry(0.34, 0.045, 12, 48);
  const rear_silver_band = new THREE.Mesh(rear_silver_bandGeom, silver_frameMat);
  rear_silver_band.name = "rear_silver_band";
  rear_silver_band.position.z = -0.225;
  rear_silver_band.scale.set(1.16, 1.73, 1);
  silver_setting.add(rear_silver_band);

  const strokeData = [];
  const highlightData = [];

  function addStroke(x1, y1, x2, y2, width) {
    strokeData.push([x1, y1, x2, y2, width]);
  }

  function addHighlight(x1, y1, x2, y2, width) {
    highlightData.push([x1, y1, x2, y2, width]);
  }

  function addPolyline(points, width) {
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      addStroke(a[0], a[1], b[0], b[1], width);
      addHighlight(
        a[0] - 0.004,
        a[1] + 0.004,
        b[0] - 0.004,
        b[1] + 0.004,
        width * 0.34
      );
    }
  }

  function addArc(cx, cy, rx, ry, start, end, segments, width) {
    let px = cx + Math.cos(start) * rx;
    let py = cy + Math.sin(start) * ry;
    for (let i = 1; i <= segments; i++) {
      const a = start + (end - start) * i / segments;
      const x = cx + Math.cos(a) * rx;
      const y = cy + Math.sin(a) * ry;
      addStroke(px, py, x, y, width);
      addHighlight(px - 0.004, py + 0.004, x - 0.004, y + 0.004, width * 0.34);
      px = x;
      py = y;
    }
  }

  function addEllipse(cx, cy, rx, ry, segments, width) {
    let px = cx + rx;
    let py = cy;
    for (let i = 1; i <= segments; i++) {
      const a = Math.PI * 2 * i / segments;
      const x = cx + Math.cos(a) * rx;
      const y = cy + Math.sin(a) * ry;
      addStroke(px, py, x, y, width);
      addHighlight(px - 0.004, py + 0.004, x - 0.004, y + 0.004, width * 0.34);
      px = x;
      py = y;
    }
  }

  addStroke(-0.18, 0.49, -0.05, 0.53, 0.022);
  addStroke(0.08, 0.50, 0.23, 0.42, 0.022);
  addStroke(0.23, 0.42, 0.16, 0.30, 0.022);
  addStroke(0.16, 0.30, 0.28, 0.22, 0.022);

  addPolyline([
    [-0.28, 0.39],
    [-0.18, 0.29],
    [-0.24, 0.18],
    [-0.30, 0.22],
    [-0.28, 0.39]
  ], 0.021);

  addArc(-0.08, 0.25, 0.085, 0.105, -1.0, 2.15, 7, 0.021);
  addStroke(-0.08, 0.15, 0.02, 0.12, 0.021);

  addStroke(0.02, 0.39, 0.02, 0.08, 0.022);
  addStroke(0.02, 0.39, 0.12, 0.35, 0.022);
  addStroke(0.02, 0.24, 0.11, 0.21, 0.021);
  addStroke(0.02, 0.08, 0.14, 0.12, 0.022);

  addStroke(0.20, 0.34, 0.31, 0.28, 0.022);
  addStroke(0.20, 0.34, 0.27, 0.12, 0.022);
  addStroke(0.27, 0.12, 0.35, 0.18, 0.022);

  addEllipse(0.27, 0.49, 0.060, 0.073, 12, 0.019);
  addEllipse(0.31, -0.43, 0.064, 0.078, 12, 0.021);

  addPolyline([
    [-0.31, 0.08],
    [-0.24, 0.14],
    [-0.18, 0.08],
    [-0.20, -0.03],
    [-0.29, -0.08],
    [-0.31, 0.08]
  ], 0.020);

  addStroke(-0.12, 0.03, -0.03, 0.08, 0.021);
  addStroke(-0.03, 0.08, 0.04, 0.02, 0.021);
  addStroke(0.04, 0.02, -0.01, -0.08, 0.021);
  addStroke(-0.01, -0.08, -0.11, -0.04, 0.021);
  addStroke(-0.08, -0.06, -0.05, -0.17, 0.020);

  addStroke(0.13, -0.02, 0.23, 0.03, 0.021);
  addStroke(0.23, 0.03, 0.29, -0.04, 0.021);
  addStroke(0.29, -0.04, 0.22, -0.12, 0.021);
  addStroke(0.22, -0.12, 0.14, -0.08, 0.021);

  addPolyline([
    [-0.30, -0.18],
    [-0.22, -0.23],
    [-0.27, -0.34],
    [-0.18, -0.39],
    [-0.11, -0.31],
    [-0.08, -0.43]
  ], 0.020);

  addStroke(0.02, -0.20, 0.12, -0.16, 0.021);
  addStroke(0.12, -0.16, 0.17, -0.25, 0.021);
  addStroke(0.17, -0.25, 0.09, -0.31, 0.021);
  addStroke(0.09, -0.31, 0.01, -0.27, 0.021);

  addPolyline([
    [0.08, -0.43],
    [0.18, -0.50],
    [0.29, -0.46],
    [0.24, -0.36],
    [0.31, -0.31]
  ], 0.021);

  addStroke(-0.34, 0.31, -0.27, 0.23, 0.018);
  addStroke(-0.35, 0.17, -0.29, 0.09, 0.018);
  addStroke(-0.35, -0.17, -0.29, -0.25, 0.018);
  addStroke(-0.31, -0.43, -0.23, -0.36, 0.018);
  addStroke(0.33, 0.35, 0.27, 0.27, 0.018);
  addStroke(0.35, -0.12, 0.29, -0.20, 0.018);
  addStroke(0.32, -0.50, 0.25, -0.43, 0.018);

  const engraved_strokesGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
  const engraved_strokes = new THREE.InstancedMesh(
    engraved_strokesGeom,
    engraved_strokesMat,
    strokeData.length
  );
  engraved_strokes.name = "engraved_strokes";

  const strokeDummy = new THREE.Object3D();
  const strokeUp = new THREE.Vector3(0, 1, 0);
  const strokeStart = new THREE.Vector3();
  const strokeEnd = new THREE.Vector3();
  const strokeDirection = new THREE.Vector3();

  function setStrokeInstance(mesh, index, data, z) {
    strokeStart.set(data[0], data[1], z);
    strokeEnd.set(data[2], data[3], z);
    strokeDirection.subVectors(strokeEnd, strokeStart);
    const length = strokeDirection.length();
    strokeDirection.normalize();
    strokeDummy.position.copy(strokeStart).add(strokeEnd).multiplyScalar(0.5);
    strokeDummy.quaternion.setFromUnitVectors(strokeUp, strokeDirection);
    strokeDummy.scale.set(data[4], length, data[4]);
    strokeDummy.updateMatrix();
    mesh.setMatrixAt(index, strokeDummy.matrix);
  }

  for (let i = 0; i < strokeData.length; i++) {
    setStrokeInstance(engraved_strokes, i, strokeData[i], 0.334);
  }
  engraved_strokes.instanceMatrix.needsUpdate = true;
  engraved_glyphs.add(engraved_strokes);

  const engraving_highlightsGeom = engraved_strokesGeom;
  const engraving_highlights = new THREE.InstancedMesh(
    engraving_highlightsGeom,
    engraving_highlightsMat,
    highlightData.length
  );
  engraving_highlights.name = "engraving_highlights";
  for (let i = 0; i < highlightData.length; i++) {
    setStrokeInstance(engraving_highlights, i, highlightData[i], 0.340);
  }
  engraving_highlights.instanceMatrix.needsUpdate = true;
  engraved_glyphs.add(engraving_highlights);

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