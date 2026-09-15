export default function generate(THREE) {
  const root = new THREE.Group();

  const seatW = 1.50;
  const seatD = 1.00;
  const baseH = 0.60;
  const cushionH = 0.22;
  const baseBottom = 0.06;
  const baseTop = baseBottom + baseH;
  const cushionTop = baseTop + cushionH;
  const archHalfW = 0.62;
  const archDepth = 0.045;

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x5b1028,
    metalness: 0.0,
    roughness: 0.95
  });
  const velvetDarkMat = new THREE.MeshStandardMaterial({
    color: 0x3b0718,
    metalness: 0.0,
    roughness: 0.95
  });
  const pipingMat = new THREE.MeshStandardMaterial({
    color: 0x6b1730,
    metalness: 0.0,
    roughness: 0.90
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb98555,
    metalness: 0.0,
    roughness: 0.60
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x8f603d,
    metalness: 0.0,
    roughness: 0.70
  });

  function makeRoundedRectShape(w, d, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -d / 2;
    const y1 = d / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function makeArchShape(halfW, bottom, top, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-halfW, bottom);
    shape.lineTo(halfW, bottom);
    shape.lineTo(halfW, top);
    for (let i = 1; i <= 28; i++) {
      const t = i / 28;
      const x = halfW - 2 * halfW * t;
      const y = top - 4 * depth * Math.sin(Math.PI * t);
      shape.lineTo(x, y);
    }
    shape.lineTo(-halfW, bottom);
    shape.closePath();
    return shape;
  }

  function makeArchHoleShape(halfW, bottom, top, depth) {
    const path = new THREE.Path();
    path.moveTo(-halfW, bottom);
    path.lineTo(-halfW, top);
    for (let i = 28; i >= 0; i--) {
      const t = i / 28;
      const x = halfW - 2 * halfW * t;
      const y = top - 4 * depth * Math.sin(Math.PI * t);
      path.lineTo(x, y);
    }
    path.lineTo(-halfW, bottom);
    path.closePath();
    return path;
  }

  function makeRoundedRectCurve(w, d, r, y) {
    const points = [];
    const corners = [
      [w / 2 - r, d / 2 - r, 0],
      [-w / 2 + r, d / 2 - r, Math.PI / 2],
      [-w / 2 + r, -d / 2 + r, Math.PI],
      [w / 2 - r, -d / 2 + r, Math.PI * 1.5]
    ];
    const cornerSteps = 6;
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= cornerSteps; i++) {
        const angle = corner[2] + i / cornerSteps * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          y,
          corner[1] + Math.sin(angle) * r
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const wooden_arch_baseShape = makeArchShape(
    archHalfW,
    baseBottom,
    baseTop,
    archDepth
  );
  const wooden_arch_baseGeom = new THREE.ExtrudeGeometry(
    wooden_arch_baseShape,
    {
      depth: seatD,
      steps: 1,
      curveSegments: 16
    }
  );
  const wooden_arch_base = new THREE.Mesh(wooden_arch_baseGeom, woodMat);
  wooden_arch_base.position.z = -seatD / 2;
  root.add(wooden_arch_base);

  const wooden_arch_faceShape = makeArchShape(
    archHalfW,
    baseBottom + 0.008,
    baseTop - 0.008,
    archDepth
  );
  const wooden_arch_faceGeom = new THREE.ShapeGeometry(
    wooden_arch_faceShape,
    16
  );
  const wooden_arch_face = new THREE.Mesh(wooden_arch_faceGeom, woodMat);
  wooden_arch_face.position.z = seatD / 2 + 0.004;
  root.add(wooden_arch_face);

  const wooden_arch_rear_face = new THREE.Mesh(
    wooden_arch_faceGeom,
    woodMat
  );
  wooden_arch_rear_face.rotation.y = Math.PI;
  wooden_arch_rear_face.position.z = -seatD / 2 - 0.004;
  root.add(wooden_arch_rear_face);

  const wooden_arch_grain = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const grainPoints = [];
    const baseY = baseBottom + 0.035 + i * 0.027;
    for (let j = 0; j <= 10; j++) {
      const t = j / 10;
      const x = -0.56 + 1.12 * t;
      const y = baseY + Math.sin(t * Math.PI * 2 + i * 0.7) * 0.004;
      grainPoints.push(new THREE.Vector3(x, y, seatD / 2 + 0.009));
    }
    const grainCurve = new THREE.CatmullRomCurve3(
      grainPoints,
      false,
      "centripetal"
    );
    const grainGeom = new THREE.BufferGeometry().setFromPoints(
      grainCurve.getPoints(24)
    );
    const grain = new THREE.Line(
      grainGeom,
      new THREE.LineBasicMaterial({ color: 0x8f603d })
    );
    wooden_arch_grain.add(grain);
  }
  root.add(wooden_arch_grain);

  const upholstered_baseShape = makeRoundedRectShape(
    seatW,
    seatD,
    0.11
  );
  const upholstered_baseGeom = new THREE.ExtrudeGeometry(
    upholstered_baseShape,
    {
      depth: baseH,
      steps: 1,
      curveSegments: 16
    }
  );
  const upholstered_base = new THREE.Mesh(
    upholstered_baseGeom,
    velvetMat
  );
  upholstered_base.rotation.x = -Math.PI / 2;
  upholstered_base.position.y = baseBottom;
  root.add(upholstered_base);

  const front_drapeShape = makeArchShape(
    seatW / 2,
    baseBottom + 0.012,
    baseTop - 0.006,
    archDepth
  );
  const front_drapeGeom = new THREE.ShapeGeometry(front_drapeShape, 16);
  const front_drape = new THREE.Mesh(front_drapeGeom, velvetMat);
  front_drape.position.z = seatD / 2 + 0.007;
  root.add(front_drape);

  const rear_drape = new THREE.Mesh(front_drapeGeom, velvetMat);
  rear_drape.rotation.y = Math.PI;
  rear_drape.position.z = -seatD / 2 - 0.007;
  root.add(rear_drape);

  const side_drapeShape = makeArchShape(
    seatD / 2,
    baseBottom + 0.012,
    baseTop - 0.006,
    archDepth
  );
  const side_drapeGeom = new THREE.ShapeGeometry(side_drapeShape, 16);

  const right_side_drape = new THREE.Mesh(side_drapeGeom, velvetMat);
  right_side_drape.rotation.y = Math.PI / 2;
  right_side_drape.position.x = seatW / 2 + 0.007;
  root.add(right_side_drape);

  const left_side_drape = new THREE.Mesh(side_drapeGeom, velvetMat);
  left_side_drape.rotation.y = -Math.PI / 2;
  left_side_drape.position.x = -seatW / 2 - 0.007;
  root.add(left_side_drape);

  const top_cushionShape = makeRoundedRectShape(
    seatW + 0.02,
    seatD + 0.02,
    0.13
  );
  const top_cushionGeom = new THREE.ExtrudeGeometry(
    top_cushionShape,
    {
      depth: cushionH,
      steps: 1,
      curveSegments: 18
    }
  );
  const top_cushion = new THREE.Mesh(top_cushionGeom, velvetMat);
  top_cushion.rotation.x = -Math.PI / 2;
  top_cushion.position.y = baseTop;
  root.add(top_cushion);

  const top_cushion_domeGeom = new THREE.SphereGeometry(1, 32, 16);
  const top_cushion_dome = new THREE.Mesh(
    top_cushion_domeGeom,
    velvetMat
  );
  top_cushion_dome.scale.set(0.70, 0.055, 0.45);
  top_cushion_dome.position.set(0, cushionTop - 0.008, 0);
  root.add(top_cushion_dome);

  const top_pipingCurve = makeRoundedRectCurve(
    seatW + 0.025,
    seatD + 0.025,
    0.13,
    baseTop + 0.012
  );
  const top_pipingGeom = new THREE.TubeGeometry(
    top_pipingCurve,
    96,
    0.014,
    8,
    true
  );
  const top_piping = new THREE.Mesh(top_pipingGeom, pipingMat);
  root.add(top_piping);

  const lower_pipingCurve = makeRoundedRectCurve(
    seatW - 0.015,
    seatD - 0.015,
    0.11,
    baseBottom + 0.018
  );
  const lower_pipingGeom = new THREE.TubeGeometry(
    lower_pipingCurve,
    96,
    0.008,
    7,
    true
  );
  const lower_piping = new THREE.Mesh(
    lower_pipingGeom,
    velvetDarkMat
  );
  root.add(lower_piping);

  const top_wrinkles = new THREE.Group();
  const topWrinklePaths = [
    [
      [-0.62, -0.30],
      [-0.48, -0.24],
      [-0.31, -0.27],
      [-0.12, -0.20]
    ],
    [
      [-0.48, 0.29],
      [-0.31, 0.22],
      [-0.12, 0.25],
      [0.08, 0.17]
    ],
    [
      [0.58, -0.27],
      [0.43, -0.20],
      [0.29, -0.23],
      [0.13, -0.15]
    ],
    [
      [0.54, 0.28],
      [0.39, 0.21],
      [0.22, 0.23],
      [0.05, 0.15]
    ],
    [
      [-0.08, -0.38],
      [0.00, -0.29],
      [0.08, -0.31],
      [0.17, -0.23]
    ]
  ];

  for (let i = 0; i < topWrinklePaths.length; i++) {
    const points = [];
    for (let j = 0; j < topWrinklePaths[i].length; j++) {
      const x = topWrinklePaths[i][j][0];
      const z = topWrinklePaths[i][j][1];
      const nx = x / 0.70;
      const nz = z / 0.45;
      const y = cushionTop - 0.008 +
        0.055 * Math.sqrt(Math.max(0, 1 - nx * nx - nz * nz)) +
        0.004;
      points.push(new THREE.Vector3(x, y, z));
    }
    const wrinkleCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const wrinkleGeom = new THREE.BufferGeometry().setFromPoints(
      wrinkleCurve.getPoints(18)
    );
    const wrinkle = new THREE.Line(
      wrinkleGeom,
      new THREE.LineBasicMaterial({ color: 0x3b0718 })
    );
    top_wrinkles.add(wrinkle);
  }
  root.add(top_wrinkles);

  const front_wrinkles = new THREE.Group();
  const frontWrinklePaths = [
    [
      [-0.66, 0.57],
      [-0.59, 0.49],
      [-0.61, 0.39],
      [-0.55, 0.30]
    ],
    [
      [-0.43, 0.58],
      [-0.37, 0.50],
      [-0.40, 0.41],
      [-0.34, 0.33]
    ],
    [
      [0.65, 0.57],
      [0.58, 0.49],
      [0.61, 0.39],
      [0.55, 0.30]
    ],
    [
      [0.42, 0.58],
      [0.36, 0.50],
      [0.39, 0.41],
      [0.33, 0.33]
    ]
  ];

  for (let i = 0; i < frontWrinklePaths.length; i++) {
    const points = [];
    for (let j = 0; j < frontWrinklePaths[i].length; j++) {
      points.push(new THREE.Vector3(
        frontWrinklePaths[i][j][0],
        frontWrinklePaths[i][j][1],
        seatD / 2 + 0.012
      ));
    }
    const wrinkleCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const wrinkleGeom = new THREE.BufferGeometry().setFromPoints(
      wrinkleCurve.getPoints(14)
    );
    const wrinkle = new THREE.Line(
      wrinkleGeom,
      new THREE.LineBasicMaterial({ color: 0x3b0718 })
    );
    front_wrinkles.add(wrinkle);
  }
  root.add(front_wrinkles);

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

  fitToUnitCube(THREE, root);
  return root;
}