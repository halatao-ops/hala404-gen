export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "black_pencil";

  const pencil_assembly = new THREE.Group();
  pencil_assembly.name = "pencil_assembly";
  pencil_assembly.rotation.set(0.14, 0, -0.9);
  root.add(pencil_assembly);

  const bodyRadius = 0.34;
  const bodyBottom = -1.55;
  const bodyTop = 1.35;
  const bodyLength = bodyTop - bodyBottom;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x15171a,
    metalness: 0.55,
    roughness: 0.32
  });
  const bodyGeom = new THREE.CylinderGeometry(
    bodyRadius,
    bodyRadius,
    bodyLength,
    6,
    1,
    false
  );
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.y = (bodyBottom + bodyTop) * 0.5;
  body.rotation.y = Math.PI / 6;
  pencil_assembly.add(body);

  const body_edge_highlightsMat = new THREE.MeshStandardMaterial({
    color: 0x30343a,
    metalness: 0.45,
    roughness: 0.38
  });
  const body_edge_highlightsGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    bodyLength * 0.97,
    6
  );
  const body_edge_highlights = new THREE.InstancedMesh(
    body_edge_highlightsGeom,
    body_edge_highlightsMat,
    2
  );
  body_edge_highlights.name = "body_edge_highlights";
  const highlight_dummy = new THREE.Object3D();
  const highlightX = bodyRadius * Math.cos(Math.PI / 6);
  const highlightZ = bodyRadius * Math.sin(Math.PI / 6);
  for (let i = 0; i < 2; i++) {
    highlight_dummy.position.set(
      i === 0 ? -highlightX : highlightX,
      (bodyBottom + bodyTop) * 0.5,
      highlightZ
    );
    highlight_dummy.updateMatrix();
    body_edge_highlights.setMatrixAt(i, highlight_dummy.matrix);
  }
  body_edge_highlights.instanceMatrix.needsUpdate = true;
  pencil_assembly.add(body_edge_highlights);

  const sharpened_section = new THREE.Group();
  sharpened_section.name = "sharpened_section";
  pencil_assembly.add(sharpened_section);

  const woodTop = bodyBottom;
  const woodBottom = -2.45;
  const woodLength = woodTop - woodBottom;
  const woodTopRadius = bodyRadius;
  const woodBottomRadius = 0.095;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd8ad7d,
    metalness: 0.0,
    roughness: 0.9
  });
  const woodGeom = new THREE.CylinderGeometry(
    woodTopRadius,
    woodBottomRadius,
    woodLength,
    6,
    1,
    false
  );
  const wood = new THREE.Mesh(woodGeom, woodMat);
  wood.name = "wood";
  wood.position.y = (woodTop + woodBottom) * 0.5;
  wood.rotation.y = Math.PI / 6;
  sharpened_section.add(wood);

  function woodRadiusAt(y) {
    const t = (y - woodBottom) / woodLength;
    return woodBottomRadius + (woodTopRadius - woodBottomRadius) * t;
  }

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x9d704d,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_grainGeom = new THREE.CylinderGeometry(0.004, 0.004, 1, 5);
  const grainOffsets = [-0.72, -0.43, -0.14, 0.18, 0.47, 0.7];
  const wood_grain = new THREE.InstancedMesh(
    wood_grainGeom,
    wood_grainMat,
    grainOffsets.length
  );
  wood_grain.name = "wood_grain";
  const grain_dummy = new THREE.Object3D();

  for (let i = 0; i < grainOffsets.length; i++) {
    const y0 = -2.34 + (i % 3) * 0.035;
    const y1 = -1.72 - (i % 2) * 0.045;
    const ym = (y0 + y1) * 0.5;
    const r0 = woodRadiusAt(y0);
    const r1 = woodRadiusAt(y1);
    const rm = woodRadiusAt(ym);
    const x = grainOffsets[i] * rm * 0.86;
    const z = rm * Math.sqrt(1 - (x * x) / (rm * rm)) + 0.004;
    const dx = grainOffsets[i] * (r1 - r0) * 0.86;
    const dy = y1 - y0;
    const length = Math.sqrt(dx * dx + dy * dy);

    grain_dummy.position.set(x, ym, z);
    grain_dummy.rotation.set(0, 0, Math.atan2(-dx, dy));
    grain_dummy.scale.set(1, length, 1);
    grain_dummy.updateMatrix();
    wood_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  sharpened_section.add(wood_grain);

  const graphite_tipMat = new THREE.MeshStandardMaterial({
    color: 0x101113,
    metalness: 0.0,
    roughness: 0.8
  });
  const graphite_tipGeom = new THREE.CylinderGeometry(
    0.102,
    0.018,
    0.34,
    12,
    1,
    false
  );
  const graphite_tip = new THREE.Mesh(graphite_tipGeom, graphite_tipMat);
  graphite_tip.name = "graphite_tip";
  graphite_tip.position.y = -2.59;
  pencil_assembly.add(graphite_tip);

  const rounded_tip_endMat = graphite_tipMat;
  const rounded_tip_endGeom = new THREE.SphereGeometry(0.021, 12, 8);
  const rounded_tip_end = new THREE.Mesh(
    rounded_tip_endGeom,
    rounded_tip_endMat
  );
  rounded_tip_end.name = "rounded_tip_end";
  rounded_tip_end.position.y = -2.765;
  rounded_tip_end.scale.set(0.9, 1.15, 0.9);
  pencil_assembly.add(rounded_tip_end);

  const rear_eraser_assembly = new THREE.Group();
  rear_eraser_assembly.name = "rear_eraser_assembly";
  pencil_assembly.add(rear_eraser_assembly);

  const eraser_coreMat = new THREE.MeshStandardMaterial({
    color: 0x17181b,
    metalness: 0.0,
    roughness: 0.8
  });
  const eraser_coreGeom = new THREE.CylinderGeometry(
    0.35,
    0.35,
    0.84,
    24,
    1,
    false
  );
  const eraser_core = new THREE.Mesh(eraser_coreGeom, eraser_coreMat);
  eraser_core.name = "eraser_core";
  eraser_core.position.y = 1.75;
  rear_eraser_assembly.add(eraser_core);

  const eraser_endMat = eraser_coreMat;
  const eraser_endGeom = new THREE.SphereGeometry(0.35, 24, 16);
  const eraser_end = new THREE.Mesh(eraser_endGeom, eraser_endMat);
  eraser_end.name = "eraser_end";
  eraser_end.position.y = 2.16;
  eraser_end.scale.set(1, 0.82, 1);
  rear_eraser_assembly.add(eraser_end);

  const eraser_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0x0d0e10,
    metalness: 0.0,
    roughness: 0.8
  });
  const eraser_ridgesGeom = new THREE.TorusGeometry(0.35, 0.045, 10, 28);
  const ridgeHeights = [1.42, 1.59, 1.76, 1.93, 2.1];
  const eraser_ridges = new THREE.InstancedMesh(
    eraser_ridgesGeom,
    eraser_ridgesMat,
    ridgeHeights.length
  );
  eraser_ridges.name = "eraser_ridges";
  const ridge_dummy = new THREE.Object3D();

  for (let i = 0; i < ridgeHeights.length; i++) {
    const endScale = i === ridgeHeights.length - 1 ? 0.96 : 1;
    ridge_dummy.position.set(0, ridgeHeights[i], 0);
    ridge_dummy.rotation.set(Math.PI / 2, 0, 0);
    ridge_dummy.scale.setScalar(endScale);
    ridge_dummy.updateMatrix();
    eraser_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  eraser_ridges.instanceMatrix.needsUpdate = true;
  rear_eraser_assembly.add(eraser_ridges);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 0.95 / maxDim : 1;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}