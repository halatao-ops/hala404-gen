export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "upholstered_wooden_ottoman";

  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x777b7e,
    metalness: 0.0,
    roughness: 1.0,
  });
  const seat_pipingMat = new THREE.MeshStandardMaterial({
    color: 0x55595c,
    metalness: 0.0,
    roughness: 1.0,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a5d2f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x5f351c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x292521,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x = width / 2;
    const y = depth / 2;
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    return shape;
  }

  function roundedRectLoop(width, depth, radius, y, segmentsPerCorner) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5],
    ];

    for (let corner = 0; corner < corners.length; corner++) {
      const data = corners[corner];
      for (let i = 0; i < segmentsPerCorner; i++) {
        const angle = data[2] + (i / segmentsPerCorner) * Math.PI / 2;
        points.push(new THREE.Vector3(
          data[0] + Math.cos(angle) * radius,
          y,
          data[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  const seat_assembly = new THREE.Group();
  seat_assembly.name = "seat_assembly";
  root.add(seat_assembly);

  const seatShape = roundedRectShape(1.50, 1.08, 0.14);
  const seatGeom = new THREE.ExtrudeGeometry(seatShape, {
    depth: 0.16,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.04,
    bevelSegments: 5,
  });
  seatGeom.center();
  seatGeom.computeVertexNormals();

  const seat = new THREE.Mesh(seatGeom, seatMat);
  seat.name = "seat";
  seat.rotation.x = -Math.PI / 2;
  seat.position.y = 1.03;
  seat_assembly.add(seat);

  const seat_pipingPoints = roundedRectLoop(1.54, 1.12, 0.14, 0.965, 8);
  const seat_pipingCurve = new THREE.CatmullRomCurve3(
    seat_pipingPoints,
    true,
    "centripetal"
  );
  const seat_pipingGeom = new THREE.TubeGeometry(
    seat_pipingCurve,
    96,
    0.009,
    8,
    true
  );
  const seat_piping = new THREE.Mesh(seat_pipingGeom, seat_pipingMat);
  seat_piping.name = "seat_piping";
  seat_assembly.add(seat_piping);

  const wood_frame = new THREE.Group();
  wood_frame.name = "wood_frame";
  root.add(wood_frame);

  const legGeom = new THREE.CylinderGeometry(0.115, 0.09, 0.86, 4, 1, false);
  const legs = new THREE.InstancedMesh(legGeom, woodMat, 4);
  legs.name = "legs";
  const legPositions = [
    [-0.60, 0.43, 0.39],
    [0.60, 0.43, 0.39],
    [-0.60, 0.43, -0.39],
    [0.60, 0.43, -0.39],
  ];
  const legDummy = new THREE.Object3D();
  for (let i = 0; i < legPositions.length; i++) {
    legDummy.position.set(
      legPositions[i][0],
      legPositions[i][1],
      legPositions[i][2]
    );
    legDummy.rotation.set(0, Math.PI / 4, 0);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  wood_frame.add(legs);

  const feetGeom = new THREE.CylinderGeometry(0.086, 0.086, 0.018, 4);
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  for (let i = 0; i < legPositions.length; i++) {
    footDummy.position.set(
      legPositions[i][0],
      0.002,
      legPositions[i][2]
    );
    footDummy.rotation.set(0, Math.PI / 4, 0);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  wood_frame.add(feet);

  const front_apronGeom = new THREE.BoxGeometry(1.20, 0.22, 0.075);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.84, 0.43);
  wood_frame.add(front_apron);

  const back_apronGeom = new THREE.BoxGeometry(1.20, 0.22, 0.075);
  const back_apron = new THREE.Mesh(back_apronGeom, woodMat);
  back_apron.name = "back_apron";
  back_apron.position.set(0, 0.84, -0.43);
  wood_frame.add(back_apron);

  const left_apronGeom = new THREE.BoxGeometry(0.075, 0.22, 0.78);
  const left_apron = new THREE.Mesh(left_apronGeom, woodMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-0.62, 0.84, 0);
  wood_frame.add(left_apron);

  const right_apronGeom = new THREE.BoxGeometry(0.075, 0.22, 0.78);
  const right_apron = new THREE.Mesh(right_apronGeom, woodMat);
  right_apron.name = "right_apron";
  right_apron.position.set(0.62, 0.84, 0);
  wood_frame.add(right_apron);

  const front_apron_grain = new THREE.Group();
  front_apron_grain.name = "front_apron_grain";
  for (let lineIndex = 0; lineIndex < 5; lineIndex++) {
    const points = [];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const x = -0.53 + t * 1.06;
      const y = 0.765 + lineIndex * 0.037
        + Math.sin(t * Math.PI * 2 + lineIndex * 0.8) * 0.006;
      points.push(new THREE.Vector3(x, y, 0.469));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 24, 0.0022, 5, false);
    const grain = new THREE.Mesh(geom, wood_grainMat);
    front_apron_grain.add(grain);
  }
  wood_frame.add(front_apron_grain);

  const back_apron_grain = new THREE.Group();
  back_apron_grain.name = "back_apron_grain";
  for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
    const points = [];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const x = -0.52 + t * 1.04;
      const y = 0.775 + lineIndex * 0.043
        + Math.sin(t * Math.PI * 2 + lineIndex * 1.1) * 0.005;
      points.push(new THREE.Vector3(x, y, -0.469));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 24, 0.002, 5, false);
    const grain = new THREE.Mesh(geom, wood_grainMat);
    back_apron_grain.add(grain);
  }
  wood_frame.add(back_apron_grain);

  const side_apron_grain = new THREE.Group();
  side_apron_grain.name = "side_apron_grain";
  for (const side of [-1, 1]) {
    for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
      const points = [];
      for (let i = 0; i <= 7; i++) {
        const t = i / 7;
        const z = -0.33 + t * 0.66;
        const y = 0.775 + lineIndex * 0.043
          + Math.sin(t * Math.PI * 2 + lineIndex * 0.7) * 0.005;
        points.push(new THREE.Vector3(side * 0.659, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      const geom = new THREE.TubeGeometry(curve, 20, 0.002, 5, false);
      const grain = new THREE.Mesh(geom, wood_grainMat);
      side_apron_grain.add(grain);
    }
  }
  wood_frame.add(side_apron_grain);

  const leg_grain = new THREE.Group();
  leg_grain.name = "leg_grain";
  for (let legIndex = 0; legIndex < legPositions.length; legIndex++) {
    const px = legPositions[legIndex][0];
    const pz = legPositions[legIndex][2];

    for (let lineIndex = 0; lineIndex < 2; lineIndex++) {
      const points = [];
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const y = 0.08 + t * 0.68;
        const half = 0.064 + t * 0.032;
        const offset = (lineIndex === 0 ? -0.34 : 0.34) * half;
        const wiggle = Math.sin(t * Math.PI * 2 + legIndex + lineIndex) * 0.003;
        points.push(new THREE.Vector3(
          px + offset + wiggle,
          y,
          pz + half + 0.002
        ));
      }
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      const geom = new THREE.TubeGeometry(curve, 18, 0.0018, 5, false);
      const grain = new THREE.Mesh(geom, wood_grainMat);
      leg_grain.add(grain);
    }

    const sidePoints = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const y = 0.10 + t * 0.64;
      const half = 0.066 + t * 0.031;
      const sideDirection = legIndex % 2 === 0 ? 1 : -1;
      sidePoints.push(new THREE.Vector3(
        px + sideDirection * (half + 0.002),
        y,
        pz - 0.18 + t * 0.36
      ));
    }
    const sideCurve = new THREE.CatmullRomCurve3(sidePoints, false, "centripetal");
    const sideGeom = new THREE.TubeGeometry(sideCurve, 18, 0.0017, 5, false);
    const sideGrain = new THREE.Mesh(sideGeom, wood_grainMat);
    leg_grain.add(sideGrain);
  }
  wood_frame.add(leg_grain);

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