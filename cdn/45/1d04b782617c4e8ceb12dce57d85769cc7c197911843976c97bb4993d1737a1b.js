export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "engraved_plaque";

  const plaque_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa59678,
    metalness: 0.6,
    roughness: 0.4,
  });
  const front_panelMat = new THREE.MeshStandardMaterial({
    color: 0xb8ad96,
    metalness: 0.6,
    roughness: 0.4,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x493b29,
    metalness: 0.2,
    roughness: 0.8,
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  const plaque_bodyShape = makeRoundedRectShape(3.4, 2.2, 0.12);
  const plaque_bodyGeom = new THREE.ExtrudeGeometry(plaque_bodyShape, {
    depth: 0.14,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const plaque_body = new THREE.Mesh(plaque_bodyGeom, plaque_bodyMat);
  plaque_body.name = "plaque_body";
  plaque_body.position.z = -0.07;
  root.add(plaque_body);

  const front_panelShape = makeRoundedRectShape(3.24, 2.04, 0.075);
  const front_panelGeom = new THREE.ShapeGeometry(front_panelShape, 16);
  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.position.z = 0.108;
  root.add(front_panel);

  const glyphs = {
    " ": [
      "00000", "00000", "00000", "00000", "00000", "00000", "00000",
    ],
    A: [
      "01110", "10001", "10001", "11111", "10001", "10001", "10001",
    ],
    B: [
      "11110", "10001", "10001", "11110", "10001", "10001", "11110",
    ],
    C: [
      "01111", "10000", "10000", "10000", "10000", "10000", "01111",
    ],
    D: [
      "11110", "10001", "10001", "10001", "10001", "10001", "11110",
    ],
    E: [
      "11111", "10000", "10000", "11110", "10000", "10000", "11111",
    ],
    F: [
      "11111", "10000", "10000", "11110", "10000", "10000", "10000",
    ],
    G: [
      "01111", "10000", "10000", "10111", "10001", "10001", "01111",
    ],
    H: [
      "10001", "10001", "10001", "11111", "10001", "10001", "10001",
    ],
    I: [
      "11111", "00100", "00100", "00100", "00100", "00100", "11111",
    ],
    J: [
      "00111", "00010", "00010", "00010", "10010", "10010", "01100",
    ],
    K: [
      "10001", "10010", "10100", "11000", "10100", "10010", "10001",
    ],
    L: [
      "10000", "10000", "10000", "10000", "10000", "10000", "11111",
    ],
    M: [
      "10001", "11011", "10101", "10101", "10001", "10001", "10001",
    ],
    N: [
      "10001", "11001", "10101", "10011", "10001", "10001", "10001",
    ],
    O: [
      "01110", "10001", "10001", "10001", "10001", "10001", "01110",
    ],
    P: [
      "11110", "10001", "10001", "11110", "10000", "10000", "10000",
    ],
    Q: [
      "01110", "10001", "10001", "10001", "10101", "10010", "01101",
    ],
    R: [
      "11110", "10001", "10001", "11110", "10100", "10010", "10001",
    ],
    S: [
      "01111", "10000", "10000", "01110", "00001", "00001", "11110",
    ],
    T: [
      "11111", "00100", "00100", "00100", "00100", "00100", "00100",
    ],
    U: [
      "10001", "10001", "10001", "10001", "10001", "10001", "01110",
    ],
    V: [
      "10001", "10001", "10001", "10001", "10001", "01010", "00100",
    ],
    W: [
      "10001", "10001", "10001", "10101", "10101", "11011", "10001",
    ],
    X: [
      "10001", "10001", "01010", "00100", "01010", "10001", "10001",
    ],
    Y: [
      "10001", "10001", "01010", "00100", "00100", "00100", "00100",
    ],
    Z: [
      "11111", "00001", "00010", "00100", "01000", "10000", "11111",
    ],
    "0": [
      "01110", "10001", "10011", "10101", "11001", "10001", "01110",
    ],
    "1": [
      "00100", "01100", "00100", "00100", "00100", "00100", "01110",
    ],
    "2": [
      "01110", "10001", "00001", "00010", "00100", "01000", "11111",
    ],
    "3": [
      "11110", "00001", "00001", "01110", "00001", "00001", "11110",
    ],
    "4": [
      "00010", "00110", "01010", "10010", "11111", "00010", "00010",
    ],
    "5": [
      "11111", "10000", "10000", "11110", "00001", "00001", "11110",
    ],
    "6": [
      "01110", "10000", "10000", "11110", "10001", "10001", "01110",
    ],
    "7": [
      "11111", "00001", "00010", "00100", "01000", "01000", "01000",
    ],
    "8": [
      "01110", "10001", "10001", "01110", "10001", "10001", "01110",
    ],
    "9": [
      "01110", "10001", "10001", "01111", "00001", "00001", "01110",
    ],
    "-": [
      "00000", "00000", "00000", "11111", "00000", "00000", "00000",
    ],
    ",": [
      "00000", "00000", "00000", "00000", "00100", "00100", "01000",
    ],
    ".": [
      "00000", "00000", "00000", "00000", "00100", "00100", "00000",
    ],
    "'": [
      "00100", "00100", "00010", "00000", "00000", "00000", "00000",
    ],
  };

  const engraving_pixelGeom = new THREE.BoxGeometry(1, 1, 1);

  function createPixelText(text, cellWidth, cellHeight, depth) {
    let count = 0;
    for (let charIndex = 0; charIndex < text.length; charIndex++) {
      const rows = glyphs[text[charIndex]] || glyphs[" "];
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
          if (rows[row][column] === "1") count++;
        }
      }
    }

    const text_mesh = new THREE.InstancedMesh(
      engraving_pixelGeom,
      engravingMat,
      count
    );
    const totalWidth = (text.length * 6 - 1) * cellWidth;
    const dummy = new THREE.Object3D();
    let instanceIndex = 0;

    for (let charIndex = 0; charIndex < text.length; charIndex++) {
      const rows = glyphs[text[charIndex]] || glyphs[" "];
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
          if (rows[row][column] !== "1") continue;

          dummy.position.set(
            -totalWidth / 2 + cellWidth / 2 + (charIndex * 6 + column) * cellWidth,
            (3 - row) * cellHeight,
            0
          );
          dummy.scale.set(
            cellWidth * 0.88,
            cellHeight * 0.9,
            depth
          );
          dummy.updateMatrix();
          text_mesh.setMatrixAt(instanceIndex++, dummy.matrix);
        }
      }
    }

    text_mesh.instanceMatrix.needsUpdate = true;
    text_mesh.frustumCulled = false;
    return text_mesh;
  }

  const engraving_group = new THREE.Group();
  engraving_group.name = "engraving_group";
  root.add(engraving_group);

  const title_engraving = createPixelText(
    "WINNER' ENON FER",
    0.031,
    0.043,
    0.008
  );
  title_engraving.name = "title_engraving";
  title_engraving.position.set(0, 0.49, 0.113);
  engraving_group.add(title_engraving);

  const date_engraving = createPixelText(
    "2-00-1",
    0.032,
    0.047,
    0.008
  );
  date_engraving.name = "date_engraving";
  date_engraving.position.set(0, 0.02, 0.113);
  engraving_group.add(date_engraving);

  const subtitle_engraving = createPixelText(
    "YAK XFOO PAERTI EVERL, SIOEC-AIDT",
    0.0135,
    0.022,
    0.007
  );
  subtitle_engraving.name = "subtitle_engraving";
  subtitle_engraving.position.set(0, -0.57, 0.113);
  engraving_group.add(subtitle_engraving);

  const detail_line_engraving = createPixelText(
    "FAEM GINRABA SHEM",
    0.011,
    0.018,
    0.006
  );
  detail_line_engraving.name = "detail_line_engraving";
  detail_line_engraving.position.set(0, -0.73, 0.113);
  engraving_group.add(detail_line_engraving);

  const serial_line_engraving = createPixelText(
    "EIFIMIGKNG RE 186.208 00182.",
    0.0095,
    0.017,
    0.006
  );
  serial_line_engraving.name = "serial_line_engraving";
  serial_line_engraving.position.set(0, -0.87, 0.113);
  engraving_group.add(serial_line_engraving);

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