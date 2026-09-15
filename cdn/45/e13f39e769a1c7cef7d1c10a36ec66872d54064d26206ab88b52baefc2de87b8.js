export default function generate(THREE) {
  const root = new THREE.Group();
  const board = new THREE.Group();
  root.add(board);

  const length = 4.8;
  const width = 1.15;
  const tailHalf = 0.08;
  const frontHalf = 0.56;

  function makeBoardShape(halfWidth, halfLength) {
    const shape = new THREE.Shape();
    const segments = 48;
    const exponent = 3.2;

    for (let i = 0; i <= segments; i++) {
      const angle = Math.PI / 2 - Math.PI * i / segments;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const x = halfWidth * Math.sign(cosine) * Math.pow(Math.abs(cosine), 2 / exponent);
      const z = halfLength * Math.sign(sine) * Math.pow(Math.abs(sine), 2 / exponent);
      if (i === 0) shape.moveTo(x, z);
      else shape.lineTo(x, z);
    }

    shape.closePath();
    return shape;
  }

  function makeRoundedRectShape(x, y, rectWidth, rectHeight, radius) {
    const shape = new THREE.Shape();
    const x0 = x - rectWidth / 2;
    const x1 = x + rectWidth / 2;
    const y0 = y - rectHeight / 2;
    const y1 = y + rectHeight / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();

    return shape;
  }

  const wooden_boardMat = new THREE.MeshStandardMaterial({
    color: 0xd7a66d,
    metalness: 0.0,
    roughness: 0.6
  });
  const wooden_boardShape = makeBoardShape(width / 2, length / 2);
  const wooden_boardGeom = new THREE.ExtrudeGeometry(wooden_boardShape, {
    depth: 0.12,
    steps: 1,
    curveSegments: 16
  });
  const wooden_board = new THREE.Mesh(wooden_boardGeom, wooden_boardMat);
  wooden_board.rotation.x = Math.PI / 2;
  wooden_board.position.y = 0.06;
  board.add(wooden_board);

  const top_wood_laminateMat = new THREE.MeshStandardMaterial({
    color: 0xe6bd83,
    metalness: 0.0,
    roughness: 0.6
  });
  const top_wood_laminateShape = makeBoardShape(width * 0.49, length * 0.49);
  const top_wood_laminateGeom = new THREE.ExtrudeGeometry(top_wood_laminateShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 16
  });
  const top_wood_laminate = new THREE.Mesh(top_wood_laminateGeom, top_wood_laminateMat);
  top_wood_laminate.rotation.x = Math.PI / 2;
  top_wood_laminate.position.y = 0.078;
  board.add(top_wood_laminate);

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xb9824f,
    metalness: 0.0,
    roughness: 0.65
  });
  const wood_grain = new THREE.Group();
  const grainOffsets = [-0.5, -0.25, 0, 0.25, 0.5];

  for (const side of [-1, 1]) {
    for (let j = 0; j < grainOffsets.length; j++) {
      const offset = grainOffsets[j];
      const points = [];

      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const z = -length * 0.43 + length * 0.86 * t;
        const wave = Math.sin(t * Math.PI * 2 + j * 0.75) * 0.008;
        const x = side * (width * 0.475 + offset * 0.035 + wave);
        const y = 0.083 + Math.abs(offset) * 0.002;
        points.push(new THREE.Vector3(x, y, z));
      }

      const grain_lineGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        24,
        0.0045,
        6,
        false
      );
      const grain_line = new THREE.Mesh(grain_lineGeom, wood_grainMat);
      wood_grain.add(grain_line);
    }
  }
  board.add(wood_grain);

  const blue_deck_padMat = new THREE.MeshStandardMaterial({
    color: 0x4da5d9,
    metalness: 0.0,
    roughness: 0.8
  });
  const blue_deck_padShape = makeBoardShape(0.48, 2.2);
  const blue_deck_padGeom = new THREE.ExtrudeGeometry(blue_deck_padShape, {
    depth: 0.035,
    steps: 1,
    curveSegments: 20
  });
  const blue_deck_pad = new THREE.Mesh(blue_deck_padGeom, blue_deck_padMat);
  blue_deck_pad.rotation.x = Math.PI / 2;
  blue_deck_pad.position.set(0, 0.112, 0.02);
  board.add(blue_deck_pad);

  const pad_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x368bc0,
    metalness: 0.0,
    roughness: 0.8
  });
  const pad_edgePoints = [];
  const padEdgeSegments = 48;
  const padEdgeExponent = 3.2;

  for (let i = 0; i < padEdgeSegments; i++) {
    const angle = Math.PI / 2 - Math.PI * 2 * i / padEdgeSegments;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const x = 0.48 * Math.sign(cosine) * Math.pow(Math.abs(cosine), 2 / padEdgeExponent);
    const z = 2.2 * Math.sign(sine) * Math.pow(Math.abs(sine), 2 / padEdgeExponent) + 0.02;
    pad_edgePoints.push(new THREE.Vector3(x, 0.114, z));
  }

  const pad_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(pad_edgePoints, true),
    96,
    0.011,
    7,
    true
  );
  const pad_edge = new THREE.Mesh(pad_edgeGeom, pad_edgeMat);
  board.add(pad_edge);

  const rear_pad_notchMat = new THREE.MeshStandardMaterial({
    color: 0x246f9f,
    metalness: 0.0,
    roughness: 0.8
  });
  const rear_pad_notchGeom = new THREE.SphereGeometry(1, 24, 12);
  const rear_pad_notch = new THREE.Mesh(rear_pad_notchGeom, rear_pad_notchMat);
  rear_pad_notch.scale.set(0.18, 0.009, 0.2);
  rear_pad_notch.position.set(0, 0.116, -2.02);
  board.add(rear_pad_notch);

  const traction_padMat = new THREE.MeshStandardMaterial({
    color: 0x24282b,
    metalness: 0.0,
    roughness: 0.8
  });
  const traction_padShape = makeRoundedRectShape(0, 1.52, 0.58, 0.5, 0.1);
  const traction_padGeom = new THREE.ExtrudeGeometry(traction_padShape, {
    depth: 0.026,
    steps: 1,
    curveSegments: 12
  });
  const traction_pad = new THREE.Mesh(traction_padGeom, traction_padMat);
  traction_pad.rotation.x = Math.PI / 2;
  traction_pad.position.y = 0.145;
  board.add(traction_pad);

  const traction_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0x101315,
    metalness: 0.0,
    roughness: 0.8
  });
  const traction_ridgesGeom = new THREE.BoxGeometry(0.46, 0.009, 0.018);
  const traction_ridges = new THREE.InstancedMesh(
    traction_ridgesGeom,
    traction_ridgesMat,
    11
  );
  const ridgeDummy = new THREE.Object3D();

  for (let i = 0; i < 11; i++) {
    const z = 1.34 + i * 0.035;
    ridgeDummy.position.set(0, 0.153, z);
    ridgeDummy.updateMatrix();
    traction_ridges.setMatrixAt(i, ridgeDummy.matrix);
  }
  traction_ridges.instanceMatrix.needsUpdate = true;
  board.add(traction_ridges);

  const leash_plugMat = new THREE.MeshStandardMaterial({
    color: 0x171b1d,
    metalness: 0.0,
    roughness: 0.8
  });
  const leash_plugShape = makeRoundedRectShape(0, 1.78, 0.29, 0.17, 0.045);
  const leash_plugGeom = new THREE.ExtrudeGeometry(leash_plugShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 10
  });
  const leash_plug = new THREE.Mesh(leash_plugGeom, leash_plugMat);
  leash_plug.rotation.x = Math.PI / 2;
  leash_plug.position.y = 0.16;
  board.add(leash_plug);

  const leash_slotMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.8
  });
  const leash_slotShape = makeRoundedRectShape(0, 1.78, 0.13, 0.055, 0.025);
  const leash_slotGeom = new THREE.ExtrudeGeometry(leash_slotShape, {
    depth: 0.007,
    steps: 1,
    curveSegments: 8
  });
  const leash_slot = new THREE.Mesh(leash_slotGeom, leash_slotMat);
  leash_slot.rotation.x = Math.PI / 2;
  leash_slot.position.y = 0.166;
  board.add(leash_slot);

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