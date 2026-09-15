export default function generate(THREE) {
  const root = new THREE.Group();
  const lemon_half = new THREE.Group();
  lemon_half.name = "lemon_half";
  lemon_half.rotation.set(-0.08, -0.12, -0.14);
  root.add(lemon_half);

  const peelMat = new THREE.MeshStandardMaterial({
    color: 0xffd51f,
    emissive: 0x4a3200,
    emissiveIntensity: 0.28,
    metalness: 0.0,
    roughness: 0.6,
  });
  const rindMat = new THREE.MeshStandardMaterial({
    color: 0xffe34f,
    emissive: 0x4a3500,
    emissiveIntensity: 0.22,
    metalness: 0.0,
    roughness: 0.65,
  });
  const pithMat = new THREE.MeshStandardMaterial({
    color: 0xfff7d9,
    emissive: 0x4a452f,
    emissiveIntensity: 0.22,
    metalness: 0.0,
    roughness: 0.72,
  });
  const pulpMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe783,
    emissive: 0x4a3908,
    emissiveIntensity: 0.2,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.16,
    thickness: 0.28,
    attenuationColor: 0xffe36b,
    attenuationDistance: 0.8,
    clearcoat: 0.65,
    clearcoatRoughness: 0.16,
    ior: 1.36,
  });
  const segmentLightMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe995,
    emissive: 0x493707,
    emissiveIntensity: 0.2,
    metalness: 0.0,
    roughness: 0.17,
    transmission: 0.18,
    thickness: 0.26,
    attenuationColor: 0xffe46d,
    attenuationDistance: 0.8,
    clearcoat: 0.68,
    clearcoatRoughness: 0.15,
    ior: 1.36,
  });
  const segmentMidMat = new THREE.MeshPhysicalMaterial({
    color: 0xffdf73,
    emissive: 0x493306,
    emissiveIntensity: 0.2,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.17,
    thickness: 0.28,
    attenuationColor: 0xffdb62,
    attenuationDistance: 0.8,
    clearcoat: 0.66,
    clearcoatRoughness: 0.16,
    ior: 1.36,
  });
  const segmentDarkMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd35e,
    emissive: 0x492d04,
    emissiveIntensity: 0.2,
    metalness: 0.0,
    roughness: 0.2,
    transmission: 0.15,
    thickness: 0.3,
    attenuationColor: 0xffcf50,
    attenuationDistance: 0.8,
    clearcoat: 0.62,
    clearcoatRoughness: 0.18,
    ior: 1.36,
  });
  const juiceMat = new THREE.MeshStandardMaterial({
    color: 0xfffbe0,
    emissive: 0x6a6245,
    emissiveIntensity: 0.24,
    metalness: 0.0,
    roughness: 0.22,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xfffff0,
    emissive: 0x756c4b,
    emissiveIntensity: 0.28,
    metalness: 0.0,
    roughness: 0.16,
  });
  const seedMat = new THREE.MeshStandardMaterial({
    color: 0xfff1bd,
    metalness: 0.0,
    roughness: 0.55,
  });
  const poreMat = new THREE.MeshStandardMaterial({
    color: 0xffca24,
    emissive: 0x382300,
    emissiveIntensity: 0.18,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createLemonShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.50 * scale, -0.02 * scale);
    shape.bezierCurveTo(
      -0.52 * scale, -0.27 * scale,
      -0.31 * scale, -0.50 * scale,
      0.02 * scale, -0.52 * scale
    );
    shape.bezierCurveTo(
      0.35 * scale, -0.52 * scale,
      0.55 * scale, -0.29 * scale,
      0.53 * scale, 0.02 * scale
    );
    shape.bezierCurveTo(
      0.51 * scale, 0.34 * scale,
      0.27 * scale, 0.53 * scale,
      -0.05 * scale, 0.51 * scale
    );
    shape.bezierCurveTo(
      -0.34 * scale, 0.49 * scale,
      -0.51 * scale, 0.25 * scale,
      -0.50 * scale, -0.02 * scale
    );
    shape.closePath();
    return shape;
  }

  const peel_bodyGeo = new THREE.SphereGeometry(
    1,
    64,
    32,
    Math.PI,
    Math.PI,
    0,
    Math.PI
  );
  const peel_body = new THREE.Mesh(peel_bodyGeo, peelMat);
  peel_body.name = "peel_body";
  peel_body.scale.set(0.52, 0.52, 0.30);
  lemon_half.add(peel_body);

  const cut_face = new THREE.Group();
  cut_face.name = "cut_face";
  cut_face.position.z = 0.004;
  lemon_half.add(cut_face);

  const outer_peelShape = createLemonShape(1.0);
  const outer_peelGeom = new THREE.ExtrudeGeometry(outer_peelShape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.018,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const outer_peel = new THREE.Mesh(outer_peelGeom, peelMat);
  outer_peel.name = "outer_peel";
  cut_face.add(outer_peel);

  const white_pithShape = createLemonShape(0.93);
  const white_pithGeom = new THREE.ExtrudeGeometry(white_pithShape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const white_pith = new THREE.Mesh(white_pithGeom, pithMat);
  white_pith.name = "white_pith";
  white_pith.position.z = 0.014;
  cut_face.add(white_pith);

  const inner_rindShape = createLemonShape(0.985);
  const inner_rindHole = new THREE.Path();
  inner_rindHole.moveTo(-0.463, -0.02);
  inner_rindHole.bezierCurveTo(-0.475, -0.25, -0.285, -0.46, 0.015, -0.48);
  inner_rindHole.bezierCurveTo(0.325, -0.48, 0.505, -0.27, 0.49, 0.015);
  inner_rindHole.bezierCurveTo(0.475, 0.31, 0.25, 0.48, -0.045, 0.47);
  inner_rindHole.bezierCurveTo(-0.315, 0.455, -0.475, 0.24, -0.463, -0.02);
  inner_rindHole.closePath();
  inner_rindShape.holes.push(inner_rindHole);

  const inner_rindGeom = new THREE.ExtrudeGeometry(inner_rindShape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const inner_rind = new THREE.Mesh(inner_rindGeom, rindMat);
  inner_rind.name = "inner_rind";
  inner_rind.position.z = 0.026;
  cut_face.add(inner_rind);

  const pulp_fieldShape = createLemonShape(0.895);
  const pulp_fieldGeom = new THREE.ExtrudeGeometry(pulp_fieldShape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const pulp_field = new THREE.Mesh(pulp_fieldGeom, pithMat);
  pulp_field.name = "pulp_field";
  pulp_field.position.z = 0.028;
  cut_face.add(pulp_field);

  const segmentCount = 8;
  const segmentStep = Math.PI * 2 / segmentCount;
  const segmentGap = 0.045;
  const segmentStart = -0.12;
  const segmentEnd = segmentStep - segmentGap - 0.12;
  const segmentInnerRadius = 0.075;
  const segmentOuterRadius = 0.415;
  const segmentScaleX = 0.98;
  const segmentScaleY = 0.97;

  function createSegmentGeometry() {
    const shape = new THREE.Shape();
    const arcSteps = 18;

    for (let i = 0; i <= arcSteps; i++) {
      const t = i / arcSteps;
      const angle = segmentStart + (segmentEnd - segmentStart) * t;
      const x = Math.cos(angle) * segmentOuterRadius * segmentScaleX;
      const y = Math.sin(angle) * segmentOuterRadius * segmentScaleY;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    for (let i = arcSteps; i >= 0; i--) {
      const t = i / arcSteps;
      const angle = segmentStart + (segmentEnd - segmentStart) * t;
      shape.lineTo(
        Math.cos(angle) * segmentInnerRadius * segmentScaleX,
        Math.sin(angle) * segmentInnerRadius * segmentScaleY
      );
    }

    shape.quadraticCurveTo(0.055, 0, segmentInnerRadius, 0);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 12);
  }

  const pulp_segmentsGeom = createSegmentGeometry();
  const pulp_segments = new THREE.Group();
  pulp_segments.name = "pulp_segments";
  pulp_segments.position.z = 0.040;

  const segmentMaterials = [
    segmentLightMat,
    segmentMidMat,
    segmentDarkMat,
    segmentLightMat,
    segmentMidMat,
    segmentLightMat,
    segmentDarkMat,
    segmentMidMat,
  ];

  for (let i = 0; i < segmentCount; i++) {
    const pulp_segment = new THREE.Mesh(
      pulp_segmentsGeom,
      segmentMaterials[i]
    );
    pulp_segment.name = "pulp_segment_" + i;
    pulp_segment.rotation.z = i * segmentStep;
    pulp_segments.add(pulp_segment);
  }
  cut_face.add(pulp_segments);

  const membraneShape = new THREE.Shape();
  membraneShape.moveTo(0.025, -0.010);
  membraneShape.bezierCurveTo(0.14, -0.020, 0.31, -0.014, 0.415, -0.004);
  membraneShape.lineTo(0.415, 0.006);
  membraneShape.bezierCurveTo(0.30, 0.016, 0.13, 0.022, 0.025, 0.012);
  membraneShape.closePath();

  const segment_membranesGeom = new THREE.ShapeGeometry(membraneShape, 12);
  const segment_membranes = new THREE.InstancedMesh(
    segment_membranesGeom,
    pithMat,
    segmentCount
  );
  segment_membranes.name = "segment_membranes";

  const membrane_dummy = new THREE.Object3D();
  for (let i = 0; i < segmentCount; i++) {
    membrane_dummy.position.set(0, 0, 0.047);
    membrane_dummy.rotation.set(0, 0, i * segmentStep + segmentGap);
    membrane_dummy.scale.set(1, 1, 1);
    membrane_dummy.updateMatrix();
    segment_membranes.setMatrixAt(i, membrane_dummy.matrix);
  }
  segment_membranes.instanceMatrix.needsUpdate = true;
  cut_face.add(segment_membranes);

  const central_coreShape = new THREE.Shape();
  for (let i = 0; i < 16; i++) {
    const angle = segmentStart + i * Math.PI / 8;
    const radius = i % 2 === 0 ? 0.078 : 0.043;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.92;
    if (i === 0) central_coreShape.moveTo(x, y);
    else central_coreShape.lineTo(x, y);
  }
  central_coreShape.closePath();

  const central_coreGeom = new THREE.ShapeGeometry(central_coreShape);
  const central_core = new THREE.Mesh(central_coreGeom, pithMat);
  central_core.name = "central_core";
  central_core.position.z = 0.050;
  cut_face.add(central_core);

  const central_cavityGeom = new THREE.CircleGeometry(0.024, 18);
  const central_cavity = new THREE.Mesh(central_cavityGeom, seedMat);
  central_cavity.name = "central_cavity";
  central_cavity.scale.set(1.0, 0.72, 1.0);
  central_cavity.position.z = 0.052;
  cut_face.add(central_cavity);

  const juice_vesiclesGeom = new THREE.SphereGeometry(1, 12, 8);
  const vesiclesPerSegment = 12;
  const juice_vesicles = new THREE.InstancedMesh(
    juice_vesiclesGeom,
    juiceMat,
    segmentCount * vesiclesPerSegment
  );
  juice_vesicles.name = "juice_vesicles";

  const vesicle_dummy = new THREE.Object3D();
  let vesicleIndex = 0;
  for (let i = 0; i < segmentCount; i++) {
    const segmentAngle = i * segmentStep;
    for (let j = 0; j < vesiclesPerSegment; j++) {
      const lane = (j % 4) - 1.5;
      const angle = segmentAngle + lane * 0.052 + Math.sin(i * 1.7 + j) * 0.012;
      const radius = 0.125 + (j % 5) * 0.052 + Math.floor(j / 5) * 0.022;
      const length = 0.024 + ((i + j) % 4) * 0.007;
      const width = 0.0045 + ((i * 2 + j) % 3) * 0.0015;

      vesicle_dummy.position.set(
        Math.cos(angle) * radius * segmentScaleX,
        Math.sin(angle) * radius * segmentScaleY,
        0.050
      );
      vesicle_dummy.rotation.set(0, 0, angle);
      vesicle_dummy.scale.set(length, width, 0.003);
      vesicle_dummy.updateMatrix();
      juice_vesicles.setMatrixAt(vesicleIndex, vesicle_dummy.matrix);
      vesicleIndex++;
    }
  }
  juice_vesicles.instanceMatrix.needsUpdate = true;
  cut_face.add(juice_vesicles);

  const seedGeom = new THREE.SphereGeometry(1, 18, 10);
  const seed = new THREE.Mesh(seedGeom, seedMat);
  seed.name = "seed";
  seed.position.set(-0.105, 0.055, 0.054);
  seed.rotation.z = -0.58;
  seed.scale.set(0.027, 0.013, 0.007);
  cut_face.add(seed);

  const rind_poresGeom = new THREE.SphereGeometry(1, 10, 6);
  const rindPoreCount = 32;
  const rind_pores = new THREE.InstancedMesh(
    rind_poresGeom,
    poreMat,
    rindPoreCount
  );
  rind_pores.name = "rind_pores";

  const pore_dummy = new THREE.Object3D();
  for (let i = 0; i < rindPoreCount; i++) {
    const angle = i / rindPoreCount * Math.PI * 2;
    const radius = 0.455 + (i % 2) * 0.008;
    const size = 0.006 + (i % 4) * 0.0015;
    pore_dummy.position.set(
      Math.cos(angle) * radius * 0.98,
      Math.sin(angle) * radius * 0.97,
      0.040
    );
    pore_dummy.rotation.set(0, 0, angle);
    pore_dummy.scale.set(size * 1.5, size, 0.0025);
    pore_dummy.updateMatrix();
    rind_pores.setMatrixAt(i, pore_dummy.matrix);
  }
  rind_pores.instanceMatrix.needsUpdate = true;
  cut_face.add(rind_pores);

  const edge_highlightsGeom = new THREE.SphereGeometry(1, 10, 6);
  const edgeHighlightCount = 14;
  const edge_highlights = new THREE.InstancedMesh(
    edge_highlightsGeom,
    highlightMat,
    edgeHighlightCount
  );
  edge_highlights.name = "edge_highlights";

  const edge_dummy = new THREE.Object3D();
  for (let i = 0; i < edgeHighlightCount; i++) {
    const angle = (i + 0.45) / edgeHighlightCount * Math.PI * 2;
    const radius = 0.466;
    edge_dummy.position.set(
      Math.cos(angle) * radius * 0.98,
      Math.sin(angle) * radius * 0.97,
      0.043
    );
    edge_dummy.rotation.set(0, 0, angle + Math.PI / 2);
    edge_dummy.scale.set(0.014 + (i % 3) * 0.003, 0.003, 0.002);
    edge_dummy.updateMatrix();
    edge_highlights.setMatrixAt(i, edge_dummy.matrix);
  }
  edge_highlights.instanceMatrix.needsUpdate = true;
  cut_face.add(edge_highlights);

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