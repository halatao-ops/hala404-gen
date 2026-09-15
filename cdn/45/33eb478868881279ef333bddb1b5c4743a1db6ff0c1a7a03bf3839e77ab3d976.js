export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "red_balloon_hook";

  const balloonMat = new THREE.MeshStandardMaterial({
    color: 0xf20a1d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xc90818,
    metalness: 0.0,
    roughness: 0.3,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xa8a8a3,
    metalness: 0.6,
    roughness: 0.4,
  });
  const steelHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xd2d2cc,
    metalness: 0.6,
    roughness: 0.4,
  });

  const balloon_body = new THREE.Group();
  balloon_body.name = "balloon_body";
  root.add(balloon_body);

  const bodyProfile = new THREE.Shape();
  bodyProfile.moveTo(-0.72, 0.0);
  bodyProfile.bezierCurveTo(-0.68, 0.18, -0.52, 0.39, -0.22, 0.57);
  bodyProfile.bezierCurveTo(0.10, 0.76, 0.52, 0.84, 0.88, 0.73);
  bodyProfile.bezierCurveTo(1.18, 0.63, 1.34, 0.36, 1.33, 0.08);
  bodyProfile.bezierCurveTo(1.32, -0.25, 1.12, -0.52, 0.78, -0.65);
  bodyProfile.bezierCurveTo(0.40, -0.79, -0.08, -0.72, -0.43, -0.54);
  bodyProfile.bezierCurveTo(-0.66, -0.42, -0.75, -0.20, -0.72, 0.0);
  bodyProfile.closePath();

  const bodyDepth = 0.58;
  const bodyLatitude = 24;
  const bodyLongitude = 48;
  const bodyVertices = [];
  const bodyUvs = [];
  const bodyIndices = [];

  for (let iy = 0; iy <= bodyLatitude; iy++) {
    const v = iy / bodyLatitude;
    const phi = -Math.PI / 2 + v * Math.PI;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);

    for (let ix = 0; ix <= bodyLongitude; ix++) {
      const u = ix / bodyLongitude;
      const theta = -Math.PI + u * Math.PI * 2;
      const centerX = 0.28 + 0.08 * sinPhi;
      const x = centerX + cosPhi * Math.cos(theta) * 1.05;
      const y = 0.02 + sinPhi * 0.74;
      const z = cosPhi * Math.sin(theta) * bodyDepth;

      bodyVertices.push(x, y, z);
      bodyUvs.push(u, v);
    }
  }

  for (let iy = 0; iy < bodyLatitude; iy++) {
    for (let ix = 0; ix < bodyLongitude; ix++) {
      const a = iy * (bodyLongitude + 1) + ix;
      const b = a + bodyLongitude + 1;
      const c = b + 1;
      const d = a + 1;
      bodyIndices.push(a, b, d, b, c, d);
    }
  }

  const balloon_body_shellGeo = new THREE.BufferGeometry();
  balloon_body_shellGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bodyVertices, 3)
  );
  balloon_body_shellGeo.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(bodyUvs, 2)
  );
  balloon_body_shellGeo.setIndex(bodyIndices);
  balloon_body_shellGeo.computeVertexNormals();

  const balloon_body_shell = new THREE.Mesh(
    balloon_body_shellGeo,
    balloonMat
  );
  balloon_body_shell.name = "balloon_body_shell";
  balloon_body.add(balloon_body_shell);

  const seamPoints = [
    new THREE.Vector3(-0.66, -0.18, 0.245),
    new THREE.Vector3(-0.48, -0.40, 0.285),
    new THREE.Vector3(-0.12, -0.57, 0.295),
    new THREE.Vector3(0.30, -0.66, 0.285),
    new THREE.Vector3(0.70, -0.60, 0.270),
    new THREE.Vector3(1.02, -0.43, 0.245),
    new THREE.Vector3(1.22, -0.18, 0.215),
  ];
  const balloon_seamCurve = new THREE.CatmullRomCurve3(
    seamPoints,
    false,
    "centripetal"
  );
  const balloon_seamGeo = new THREE.TubeGeometry(
    balloon_seamCurve,
    40,
    0.012,
    7,
    false
  );
  const balloon_seam = new THREE.Mesh(balloon_seamGeo, seamMat);
  balloon_seam.name = "balloon_seam";
  balloon_body.add(balloon_seam);

  const balloon_neck = new THREE.Group();
  balloon_neck.name = "balloon_neck";
  root.add(balloon_neck);

  const neck_collarGeom = new THREE.CylinderGeometry(
    0.18,
    0.21,
    0.18,
    24
  );
  const neck_collar = new THREE.Mesh(neck_collarGeom, balloonMat);
  neck_collar.name = "neck_collar";
  neck_collar.rotation.z = Math.PI / 2;
  neck_collar.position.set(-0.70, 0.01, 0);
  balloon_neck.add(neck_collar);

  const neck_tubeGeom = new THREE.CylinderGeometry(
    0.145,
    0.17,
    0.78,
    24
  );
  const neck_tube = new THREE.Mesh(neck_tubeGeom, balloonMat);
  neck_tube.name = "neck_tube";
  neck_tube.rotation.z = Math.PI / 2;
  neck_tube.position.set(-1.08, 0.01, 0);
  balloon_neck.add(neck_tube);

  const neck_endGeom = new THREE.SphereGeometry(0.145, 24, 12);
  const neck_end = new THREE.Mesh(neck_endGeom, balloonMat);
  neck_end.name = "neck_end";
  neck_end.scale.set(0.72, 1, 1);
  neck_end.position.set(-1.47, 0.01, 0);
  balloon_neck.add(neck_end);

  const neck_openingGeom = new THREE.CylinderGeometry(
    0.095,
    0.095,
    0.012,
    20
  );
  const neck_opening = new THREE.Mesh(neck_openingGeom, seamMat);
  neck_opening.name = "neck_opening";
  neck_opening.rotation.z = Math.PI / 2;
  neck_opening.position.set(-1.575, 0.01, 0);
  balloon_neck.add(neck_opening);

  const steel_wire = new THREE.Group();
  steel_wire.name = "steel_wire";
  root.add(steel_wire);

  const wireStartX = -1.55;
  const wireStartY = 0.01;
  const wireRadius = 0.56;
  const wireTurns = 1.78;
  const wirePointCount = 90;
  const wireCorePoints = [];

  for (let i = 0; i <= wirePointCount; i++) {
    const t = i / wirePointCount;
    const angle = -t * Math.PI * 2 * wireTurns;
    wireCorePoints.push(
      new THREE.Vector3(
        wireStartX + Math.cos(angle) * wireRadius,
        wireStartY + Math.sin(angle) * wireRadius,
        0
      )
    );
  }

  const wire_coreCurve = new THREE.CatmullRomCurve3(
    wireCorePoints,
    false,
    "centripetal"
  );
  const wire_coreGeom = new THREE.TubeGeometry(
    wire_coreCurve,
    180,
    0.018,
    7,
    false
  );
  const wire_core = new THREE.Mesh(wire_coreGeom, steelMat);
  wire_core.name = "wire_core";
  steel_wire.add(wire_core);

  const wire_strands = new THREE.Group();
  wire_strands.name = "wire_strands";
  steel_wire.add(wire_strands);

  const strandCount = 6;
  const strandSamples = 180;
  const strandOffset = 0.025;

  for (let strandIndex = 0; strandIndex < strandCount; strandIndex++) {
    const strandPoints = [];
    const phase = strandIndex / strandCount * Math.PI * 2;

    for (let i = 0; i <= strandSamples; i++) {
      const t = i / strandSamples;
      const center = wire_coreCurve.getPoint(t);
      const tangent = wire_coreCurve.getTangent(t).normalize();
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      const binormal = new THREE.Vector3(0, 0, 1);
      const twist = t * Math.PI * 2 * 22 + phase;

      center.addScaledVector(normal, Math.cos(twist) * strandOffset);
      center.addScaledVector(binormal, Math.sin(twist) * strandOffset);
      strandPoints.push(center);
    }

    const wire_strandCurve = new THREE.CatmullRomCurve3(
      strandPoints,
      false,
      "centripetal"
    );
    const wire_strandGeom = new THREE.TubeGeometry(
      wire_strandCurve,
      180,
      0.011,
      6,
      false
    );
    const wire_strand = new THREE.Mesh(
      wire_strandGeom,
      strandIndex % 2 === 0 ? steelHighlightMat : steelMat
    );
    wire_strand.name = "wire_strand_" + strandIndex;
    wire_strands.add(wire_strand);
  }

  const wireEnd = wire_coreCurve.getPoint(1);
  const wireEndTangent = wire_coreCurve.getTangent(1).normalize();
  const wireEndQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    wireEndTangent
  );

  const wire_end_rimGeom = new THREE.TorusGeometry(0.027, 0.007, 7, 18);
  const wire_end_rim = new THREE.Mesh(wire_end_rimGeom, steelHighlightMat);
  wire_end_rim.name = "wire_end_rim";
  wire_end_rim.position.copy(wireEnd);
  wire_end_rim.quaternion.copy(wireEndQuaternion);
  steel_wire.add(wire_end_rim);

  const wire_end_holeGeom = new THREE.CircleGeometry(0.018, 16);
  const wire_end_hole = new THREE.Mesh(wire_end_holeGeom, seamMat);
  wire_end_hole.name = "wire_end_hole";
  wire_end_hole.position
    .copy(wireEnd)
    .addScaledVector(wireEndTangent, 0.004);
  wire_end_hole.quaternion.copy(wireEndQuaternion);
  steel_wire.add(wire_end_hole);

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