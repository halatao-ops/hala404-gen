export default function generate(THREE) {
  const root = new THREE.Group();

  const bookW = 0.76;
  const bookH = 1.0;
  const bookD = 0.06;
  const cornerR = 0.045;
  const frontZ = bookD / 2;

  const book_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd8c6a7,
    metalness: 0.0,
    roughness: 0.9,
  });
  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0xe5d5b9,
    metalness: 0.0,
    roughness: 0.9,
  });
  const spine_hingeMat = new THREE.MeshStandardMaterial({
    color: 0xcbb99a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const spine_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xeadcbf,
    metalness: 0.0,
    roughness: 0.9,
  });
  const page_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xbdae91,
    metalness: 0.0,
    roughness: 0.9,
  });

  function makeRoundedRectShape(w, h, r) {
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  const book_bodyShape = makeRoundedRectShape(bookW, bookH, cornerR);
  const book_bodyGeom = new THREE.ExtrudeGeometry(book_bodyShape, {
    depth: bookD,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.006,
    bevelThickness: 0.004,
  });
  const book_body = new THREE.Mesh(book_bodyGeom, book_bodyMat);
  book_body.position.z = -bookD / 2;
  root.add(book_body);

  const front_coverShape = makeRoundedRectShape(
    bookW - 0.012,
    bookH - 0.012,
    cornerR - 0.004
  );
  const front_coverGeom = new THREE.ShapeGeometry(front_coverShape, 12);
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.position.z = frontZ + 0.0045;
  root.add(front_cover);

  const spine_bandGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.91, 24);
  const spine_band = new THREE.Mesh(spine_bandGeom, book_bodyMat);
  spine_band.position.set(-bookW / 2 + 0.006, 0, 0.002);
  spine_band.scale.set(0.72, 1, 1.05);
  root.add(spine_band);

  const spine_hingeGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.91, 12);
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, spine_hingeMat);
  spine_hinge.position.set(-bookW / 2 + 0.052, 0, frontZ + 0.006);
  spine_hinge.scale.x = 0.75;
  root.add(spine_hinge);

  const spine_highlightGeom = new THREE.CylinderGeometry(0.0025, 0.0025, 0.90, 10);
  const spine_highlight = new THREE.Mesh(spine_highlightGeom, spine_highlightMat);
  spine_highlight.position.set(-bookW / 2 + 0.043, 0, frontZ + 0.007);
  root.add(spine_highlight);

  const bottom_page_edgeGeom = new THREE.BoxGeometry(0.64, 0.008, 0.046);
  const bottom_page_edge = new THREE.Mesh(bottom_page_edgeGeom, page_edgeMat);
  bottom_page_edge.position.set(0.025, -bookH / 2 + 0.004, -0.002);
  root.add(bottom_page_edge);

  const right_page_edgeGeom = new THREE.BoxGeometry(0.008, 0.86, 0.046);
  const right_page_edge = new THREE.Mesh(right_page_edgeGeom, page_edgeMat);
  right_page_edge.position.set(bookW / 2 - 0.004, -0.01, -0.002);
  root.add(right_page_edge);

  const blue_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x075ca8,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const cyan_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x2498bd,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const green_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x55a65b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const aqua_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x83c5bd,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const dotGeom = new THREE.CircleGeometry(1, 20);
  const dotBuckets = [[], [], [], []];

  function modValue(value) {
    return value - Math.floor(value);
  }

  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 18; col++) {
      const stagger = row % 2 === 0 ? 0 : 0.018;
      const xJitter = (modValue((row + 1) * 0.371 + (col + 2) * 0.113) - 0.5) * 0.026;
      const yJitter = (modValue((row + 3) * 0.157 + (col + 1) * 0.283) - 0.5) * 0.022;
      const x = -0.348 + col * 0.043 + stagger + xJitter;
      const y = -0.458 + row * 0.039 + yJitter;
      const radius = 0.0105 + modValue((row + 4) * 0.227 + (col + 5) * 0.419) * 0.0105;
      const colorIndex = (row * 7 + col * 11 + row * col * 3) % 4;
      dotBuckets[colorIndex].push([x, y, radius]);
    }
  }

  function makeDotInstances(entries, material) {
    const dots = new THREE.InstancedMesh(dotGeom, material, entries.length);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      dummy.position.set(entry[0], entry[1], frontZ + 0.007);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(entry[2], entry[2], 1);
      dummy.updateMatrix();
      dots.setMatrixAt(i, dummy.matrix);
    }
    dots.instanceMatrix.needsUpdate = true;
    return dots;
  }

  const blue_dots = makeDotInstances(dotBuckets[0], blue_dotsMat);
  const cyan_dots = makeDotInstances(dotBuckets[1], cyan_dotsMat);
  const green_dots = makeDotInstances(dotBuckets[2], green_dotsMat);
  const aqua_dots = makeDotInstances(dotBuckets[3], aqua_dotsMat);
  root.add(blue_dots, cyan_dots, green_dots, aqua_dots);

  const edge_dots = new THREE.Group();
  const edgeDotData = [
    [-0.374, 0.425, 0.014, 0],
    [-0.376, 0.335, 0.012, 1],
    [-0.375, 0.225, 0.014, 0],
    [-0.376, 0.105, 0.013, 2],
    [-0.375, -0.025, 0.014, 0],
    [-0.376, -0.155, 0.012, 1],
    [-0.375, -0.285, 0.014, 2],
    [-0.376, -0.405, 0.013, 0],
    [0.374, 0.385, 0.013, 2],
    [0.376, 0.275, 0.012, 0],
    [0.375, 0.155, 0.014, 1],
    [0.376, 0.025, 0.013, 0],
    [0.375, -0.105, 0.014, 2],
    [0.376, -0.235, 0.012, 1],
    [0.375, -0.365, 0.014, 0],
    [-0.265, -0.474, 0.014, 2],
    [-0.105, -0.475, 0.013, 0],
    [0.075, -0.474, 0.014, 1],
    [0.245, -0.475, 0.013, 0],
  ];

  for (let i = 0; i < edgeDotData.length; i++) {
    const data = edgeDotData[i];
    const edge_dot = new THREE.Mesh(dotGeom, dotBuckets[data[3]] ? dotBuckets[data[3]][0] : blue_dotsMat);
    edge_dot.material = data[3] === 0
      ? blue_dotsMat
      : data[3] === 1
        ? cyan_dotsMat
        : data[3] === 2
          ? green_dotsMat
          : aqua_dotsMat;
    edge_dot.position.set(data[0], data[1], frontZ + 0.0072);
    edge_dot.scale.set(data[2], data[2], 1);
    edge_dots.add(edge_dot);
  }
  root.add(edge_dots);

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