export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_stool";

  const seat_assembly = new THREE.Group();
  seat_assembly.name = "seat_assembly";
  root.add(seat_assembly);

  const leg_assembly = new THREE.Group();
  leg_assembly.name = "leg_assembly";
  root.add(leg_assembly);

  const stretcher_assembly = new THREE.Group();
  stretcher_assembly.name = "stretcher_assembly";
  root.add(stretcher_assembly);

  const seatMat = new THREE.MeshStandardMaterial({
    color: 0xb9783f,
    metalness: 0.0,
    roughness: 0.6
  });
  const seat_topMat = new THREE.MeshStandardMaterial({
    color: 0xc58a4d,
    metalness: 0.0,
    roughness: 0.6
  });
  const legsMat = new THREE.MeshStandardMaterial({
    color: 0xa96532,
    metalness: 0.0,
    roughness: 0.6
  });
  const stretchersMat = new THREE.MeshStandardMaterial({
    color: 0xb76f32,
    metalness: 0.0,
    roughness: 0.6
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x754222,
    metalness: 0.0,
    roughness: 0.7
  });
  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xd39a5b,
    metalness: 0.0,
    roughness: 0.7
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2115,
    metalness: 0.0,
    roughness: 0.8
  });

  const seatRadius = 0.62;
  const seatThickness = 0.14;
  const seatY = 1.79;
  const seatBevel = 0.035;
  const seatTopY = seatY + seatThickness / 2 + seatBevel;

  const seatProfile = [
    { r: 0.00, y: -seatThickness / 2 },
    { r: 0.50, y: -seatThickness / 2 },
    { r: 0.57, y: -seatThickness / 2 + 0.012 },
    { r: 0.61, y: -seatThickness / 2 + 0.035 },
    { r: seatRadius, y: -0.015 },
    { r: seatRadius, y: 0.015 },
    { r: 0.61, y: seatThickness / 2 - 0.035 },
    { r: 0.57, y: seatThickness / 2 - 0.012 },
    { r: 0.50, y: seatThickness / 2 },
    { r: 0.00, y: seatThickness / 2 }
  ];
  const seatGeom = createProfileGeometry(THREE, seatProfile, 64);
  const seat = new THREE.Mesh(seatGeom, seatMat);
  seat.name = "seat";
  seat.position.y = seatY;
  seat_assembly.add(seat);

  const seat_topGeom = new THREE.CylinderGeometry(0.505, 0.505, 0.006, 64);
  const seat_top = new THREE.Mesh(seat_topGeom, seat_topMat);
  seat_top.name = "seat_top";
  seat_top.position.set(0, seatTopY + 0.001, 0);
  seat_assembly.add(seat_top);

  const seat_grain = new THREE.Group();
  seat_grain.name = "seat_grain";
  for (let i = 0; i < 11; i++) {
    const baseZ = -0.43 + i * 0.086;
    const halfLength = Math.sqrt(Math.max(0, 0.49 * 0.49 - baseZ * baseZ));
    const points = [];
    for (let j = 0; j <= 7; j++) {
      const t = j / 7;
      const x = -halfLength + 2 * halfLength * t;
      const z = baseZ + Math.sin(i * 1.37 + j * 1.11) * 0.006;
      points.push(new THREE.Vector3(x, seatTopY + 0.005, z));
    }
    const seat_grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      14,
      0.0018,
      5,
      false
    );
    const seat_grain_line = new THREE.Mesh(
      seat_grain_lineGeom,
      i % 3 === 0 ? light_grainMat : grainMat
    );
    seat_grain_line.name = "seat_grain_line_" + i;
    seat_grain.add(seat_grain_line);
  }
  seat_assembly.add(seat_grain);

  const seat_hole_rimGeom = new THREE.RingGeometry(0.043, 0.058, 32);
  const seat_hole_rim = new THREE.Mesh(seat_hole_rimGeom, grainMat);
  seat_hole_rim.name = "seat_hole_rim";
  seat_hole_rim.rotation.x = -Math.PI / 2;
  seat_hole_rim.position.set(0, seatTopY + 0.006, 0);
  seat_assembly.add(seat_hole_rim);

  const seat_holeGeom = new THREE.CircleGeometry(0.043, 32);
  const seat_hole = new THREE.Mesh(seat_holeGeom, holeMat);
  seat_hole.name = "seat_hole";
  seat_hole.rotation.x = -Math.PI / 2;
  seat_hole.position.set(0, seatTopY + 0.0065, 0);
  seat_assembly.add(seat_hole);

  const legSpecs = [
    {
      bottom: new THREE.Vector3(-0.48, 0.03, 0.34),
      top: new THREE.Vector3(-0.32, 1.70, 0.22),
      width: 0.15,
      depth: 0.13
    },
    {
      bottom: new THREE.Vector3(0.48, 0.03, 0.34),
      top: new THREE.Vector3(0.32, 1.70, 0.22),
      width: 0.15,
      depth: 0.13
    },
    {
      bottom: new THREE.Vector3(-0.48, 0.03, -0.34),
      top: new THREE.Vector3(-0.32, 1.70, -0.22),
      width: 0.15,
      depth: 0.13
    },
    {
      bottom: new THREE.Vector3(0.48, 0.03, -0.34),
      top: new THREE.Vector3(0.32, 1.70, -0.22),
      width: 0.15,
      depth: 0.13
    }
  ];

  const legsGeom = createRoundedTaperedPostGeometry(
    THREE,
    0.15,
    0.13,
    0.105,
    0.09,
    0.025
  );
  const legs = new THREE.InstancedMesh(legsGeom, legsMat, legSpecs.length);
  legs.name = "legs";

  const legDummy = new THREE.Object3D();
  const legBases = [];
  for (let i = 0; i < legSpecs.length; i++) {
    const spec = legSpecs[i];
    const direction = spec.top.clone().sub(spec.bottom);
    const length = direction.length();
    direction.normalize();

    const xAxis = new THREE.Vector3(direction.z, 0, -direction.x);
    if (xAxis.lengthSq() < 0.0001) xAxis.set(1, 0, 0);
    xAxis.normalize();

    const zAxis = new THREE.Vector3().crossVectors(xAxis, direction).normalize();
    const basis = new THREE.Matrix4().makeBasis(xAxis, direction, zAxis);

    legDummy.position.copy(spec.bottom).add(spec.top).multiplyScalar(0.5);
    legDummy.quaternion.setFromRotationMatrix(basis);
    legDummy.scale.set(1, length, 1);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);

    legBases.push({
      origin: spec.bottom.clone().add(spec.top).multiplyScalar(0.5),
      xAxis,
      direction,
      zAxis
    });
  }
  legs.instanceMatrix.needsUpdate = true;
  leg_assembly.add(legs);

  const leg_grain = new THREE.Group();
  leg_grain.name = "leg_grain";
  for (let i = 0; i < legBases.length; i++) {
    const base = legBases[i];
    for (let lineIndex = 0; lineIndex < 2; lineIndex++) {
      const points = [];
      const xOffset = lineIndex === 0 ? -0.032 : 0.032;
      for (let j = 0; j <= 7; j++) {
        const t = 0.10 + j / 7 * 0.80;
        const point = base.origin.clone().addScaledVector(base.direction, t);
        point.addScaledVector(base.xAxis, xOffset + Math.sin(j * 1.4 + i) * 0.003);
        point.addScaledVector(base.zAxis, 0.068);
        points.push(point);
      }
      const leg_grain_lineGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        14,
        0.0017,
        5,
        false
      );
      const leg_grain_line = new THREE.Mesh(
        leg_grain_lineGeom,
        (i + lineIndex) % 3 === 0 ? light_grainMat : grainMat
      );
      leg_grain_line.name = "leg_grain_line_" + i + "_" + lineIndex;
      leg_grain.add(leg_grain_line);
    }
  }
  leg_assembly.add(leg_grain);

  const stretcherY = 0.56;
  const stretcherTargets = [];
  for (const base of legBases) {
    const t = (stretcherY - base.origin.y) / base.direction.y;
    stretcherTargets.push(base.origin.clone().addScaledVector(base.direction, t));
  }

  const stretchersGeom = new THREE.CylinderGeometry(0.052, 0.052, 1, 16);
  const stretchers = new THREE.InstancedMesh(
    stretchersGeom,
    stretchersMat,
    stretcherTargets.length
  );
  stretchers.name = "stretchers";

  const stretcherDummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < stretcherTargets.length; i++) {
    const next = (i + 1) % stretcherTargets.length;
    const start = stretcherTargets[i];
    const end = stretcherTargets[next];
    const direction = end.clone().sub(start);
    const length = direction.length();
    direction.normalize();

    stretcherDummy.position.copy(start).add(end).multiplyScalar(0.5);
    stretcherDummy.quaternion.setFromUnitVectors(yAxis, direction);
    stretcherDummy.scale.set(1, length, 1);
    stretcherDummy.updateMatrix();
    stretchers.setMatrixAt(i, stretcherDummy.matrix);
  }
  stretchers.instanceMatrix.needsUpdate = true;
  stretcher_assembly.add(stretchers);

  const stretcher_jointsGeom = new THREE.SphereGeometry(0.057, 16, 10);
  const stretcher_joints = new THREE.InstancedMesh(
    stretcher_jointsGeom,
    stretchersMat,
    stretcherTargets.length
  );
  stretcher_joints.name = "stretcher_joints";

  const jointDummy = new THREE.Object3D();
  for (let i = 0; i < stretcherTargets.length; i++) {
    jointDummy.position.copy(stretcherTargets[i]);
    jointDummy.quaternion.identity();
    jointDummy.scale.setScalar(1);
    jointDummy.updateMatrix();
    stretcher_joints.setMatrixAt(i, jointDummy.matrix);
  }
  stretcher_joints.instanceMatrix.needsUpdate = true;
  stretcher_assembly.add(stretcher_joints);

  fitToUnitCube(THREE, root);
  return root;
}

function createProfileGeometry(THREE, profile, segments) {
  const positions = [];
  const indices = [];
  const ringSize = segments + 1;

  for (let ring = 0; ring < profile.length; ring++) {
    const p = profile[ring];
    for (let i = 0; i <= segments; i++) {
      const angle = i / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * p.r,
        p.y,
        Math.sin(angle) * p.r
      );
    }
  }

  for (let ring = 0; ring < profile.length - 1; ring++) {
    for (let i = 0; i < segments; i++) {
      const a = ring * ringSize + i;
      const b = a + 1;
      const c = (ring + 1) * ringSize + i;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createRoundedTaperedPostGeometry(
  THREE,
  bottomWidth,
  bottomDepth,
  topWidth,
  topDepth,
  cornerRadius
) {
  const positions = [];
  const indices = [];
  const rings = [
    { y: -0.5, w: bottomWidth * 0.90, d: bottomDepth * 0.88 },
    { y: -0.475, w: bottomWidth, d: bottomDepth },
    { y: 0.475, w: topWidth, d: topDepth },
    { y: 0.5, w: topWidth * 0.90, d: topDepth * 0.88 }
  ];
  const cornerSegments = 4;
  const perimeterCount = cornerSegments * 4;

  for (const ring of rings) {
    const halfW = ring.w / 2;
    const halfD = ring.d / 2;
    const radius = Math.min(
      cornerRadius,
      halfW * 0.45,
      halfD * 0.45
    );
    const corners = [
      [halfW - radius, halfD - radius, 0],
      [-halfW + radius, halfD - radius, Math.PI / 2],
      [-halfW + radius, -halfD + radius, Math.PI],
      [halfW - radius, -halfD + radius, Math.PI * 1.5]
    ];

    for (const corner of corners) {
      for (let i = 0; i < cornerSegments; i++) {
        const angle = corner[2] + i / cornerSegments * Math.PI / 2;
        positions.push(
          corner[0] + Math.cos(angle) * radius,
          ring.y,
          corner[1] + Math.sin(angle) * radius
        );
      }
    }
  }

  for (let ring = 0; ring < rings.length - 1; ring++) {
    const lower = ring * perimeterCount;
    const upper = (ring + 1) * perimeterCount;
    for (let i = 0; i < perimeterCount; i++) {
      const next = (i + 1) % perimeterCount;
      const a = lower + i;
      const b = lower + next;
      const c = upper + i;
      const d = upper + next;
      indices.push(a, c, b, b, c, d);
    }
  }

  const bottomCenter = positions.length / 3;
  positions.push(0, rings[0].y, 0);
  const topCenter = positions.length / 3;
  positions.push(0, rings[rings.length - 1].y, 0);

  const topOffset = (rings.length - 1) * perimeterCount;
  for (let i = 0; i < perimeterCount; i++) {
    const next = (i + 1) % perimeterCount;
    indices.push(bottomCenter, i, next);
    indices.push(topCenter, topOffset + next, topOffset + i);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
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