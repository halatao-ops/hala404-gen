export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "upholstered_platform_bed";

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xd8d2c8,
    metalness: 0.0,
    roughness: 0.95,
  });
  const mattressMat = new THREE.MeshStandardMaterial({
    color: 0xe5e1da,
    metalness: 0.0,
    roughness: 0.9,
  });
  const beddingMat = new THREE.MeshStandardMaterial({
    color: 0xece9e2,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xe8e5de,
    metalness: 0.0,
    roughness: 0.9,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xc8c1b6,
    metalness: 0.0,
    roughness: 0.95,
  });
  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createRoundedBoxGeometry(w, h, d, radius, segments) {
    const r = Math.min(radius, w * 0.45, h * 0.45);
    const geometry = new THREE.BoxGeometry(
      w,
      h,
      d,
      segments,
      segments,
      segments
    );
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const hx = w * 0.5 - r;
    const hy = h * 0.5 - r;
    const hz = d * 0.5 - r;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const qx = Math.max(-hx, Math.min(hx, x));
      const qy = Math.max(-hy, Math.min(hy, y));
      const qz = Math.max(-hz, Math.min(hz, z));
      const dx = x - qx;
      const dy = y - qy;
      const dz = z - qz;
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const nx = dx / length;
      const ny = dy / length;
      const nz = dz / length;

      position.setXYZ(
        i,
        qx + nx * r,
        qy + ny * r,
        qz + nz * r
      );
      normal.setXYZ(i, nx, ny, nz);
    }

    position.needsUpdate = true;
    normal.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createSoftDuvetGeometry(w, h, d) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const xSegments = 28;
    const ySegments = 10;
    const zSegments = 30;
    const hx = w * 0.5;
    const hy = h * 0.5;
    const hz = d * 0.5;
    const cornerRadius = 0.14;
    const cornerSegments = 5;
    const perimeterCount =
      xSegments * 2 + zSegments * 2 + cornerSegments * 4;

    function smoothStep(value) {
      const t = Math.max(0, Math.min(1, value));
      return t * t * (3 - 2 * t);
    }

    function perimeterPoint(theta) {
      const cornerLength = cornerRadius * 2;
      const straightX = hx - cornerRadius;
      const straightZ = hz - cornerRadius;
      const perimeterLength =
        straightX * 2 +
        straightZ * 2 +
        cornerLength * 4;
      let distance =
        ((theta % 1) + 1) % 1 * perimeterLength;

      if (distance < straightX) {
        return { x: -straightX + distance, z: hz };
      }
      distance -= straightX;

      if (distance < cornerRadius) {
        const angle = Math.PI * 0.5 - distance / cornerRadius;
        return {
          x: straightX + Math.cos(angle) * cornerRadius,
          z: hz - cornerRadius + Math.sin(angle) * cornerRadius,
        };
      }
      distance -= cornerRadius;

      if (distance < straightZ) {
        return { x: hx, z: hz - cornerRadius - distance };
      }
      distance -= straightZ;

      if (distance < cornerRadius) {
        const angle = -distance / cornerRadius;
        return {
          x: hx - cornerRadius + Math.cos(angle) * cornerRadius,
          z: -hz + cornerRadius + Math.sin(angle) * cornerRadius,
        };
      }
      distance -= cornerRadius;

      if (distance < straightX) {
        return { x: straightX - distance, z: -hz };
      }
      distance -= straightX;

      if (distance < cornerRadius) {
        const angle = -Math.PI * 0.5 - distance / cornerRadius;
        return {
          x: -straightX + Math.cos(angle) * cornerRadius,
          z: -hz + cornerRadius + Math.sin(angle) * cornerRadius,
        };
      }
      distance -= cornerRadius;

      if (distance < straightZ) {
        return { x: -hx, z: -hz + cornerRadius + distance };
      }
      distance -= straightZ;

      const angle = Math.PI - distance / cornerRadius;
      return {
        x: -hx + cornerRadius + Math.cos(angle) * cornerRadius,
        z: hz - cornerRadius + Math.sin(angle) * cornerRadius,
      };
    }

    function topHeight(u, v) {
      const edge = Math.max(Math.abs(u - 0.5) * 2, Math.abs(v - 0.5) * 2);
      let y = hy;

      if (edge > 0.82) {
        const amount = (edge - 0.82) / 0.18;
        y -= hy * 0.28 * smoothStep(amount);
      }

      const centerSag =
        Math.exp(
          -(
            (u - 0.5) * (u - 0.5) / 0.075 +
            (v - 0.5) * (v - 0.5) / 0.18
          )
        ) * 0.012;

      const leftDip =
        Math.exp(
          -(
            (u - 0.2) * (u - 0.2) / 0.018 +
            (v - 0.5) * (v - 0.5) / 0.2
          )
        ) * 0.008;

      const frontWrinkle =
        Math.exp(
          -(
            (u - 0.5) * (u - 0.5) / 0.22 +
            (v - 0.88) * (v - 0.88) / 0.018
          )
        ) * 0.009;

      const sideWrinkle =
        Math.exp(
          -(
            (u - 0.88) * (u - 0.88) / 0.018 +
            (v - 0.5) * (v - 0.5) / 0.12
          )
        ) * 0.007;

      return (
        y -
        centerSag -
        leftDip -
        frontWrinkle -
        sideWrinkle
      );
    }

    function addVertex(x, y, z) {
      const index = positions.length / 3;
      positions.push(x, y, z);
      normals.push(0, 1, 0);
      uvs.push(x / w + 0.5, z / d + 0.5);
      return index;
    }

    const topCenter = addVertex(0, topHeight(0.5, 0.5), 0);
    const topRings = [];

    for (let ring = 1; ring <= ySegments; ring++) {
      const radial = ring / ySegments;
      const ringIndices = [];

      for (let i = 0; i < perimeterCount; i++) {
        const theta = i / perimeterCount;
        const boundary = perimeterPoint(theta);
        const u = boundary.x / w + 0.5;
        const v = boundary.z / d + 0.5;
        ringIndices.push(
          addVertex(
            boundary.x * radial,
            topHeight(u, v),
            boundary.z * radial
          )
        );
      }
      topRings.push(ringIndices);
    }

    const firstRing = topRings[0];
    for (let i = 0; i < perimeterCount; i++) {
      const next = (i + 1) % perimeterCount;
      indices.push(topCenter, firstRing[next], firstRing[i]);
    }

    for (let ring = 1; ring < topRings.length; ring++) {
      const inner = topRings[ring - 1];
      const outer = topRings[ring];

      for (let i = 0; i < perimeterCount; i++) {
        const next = (i + 1) % perimeterCount;
        indices.push(inner[i], outer[next], outer[i]);
        indices.push(inner[i], inner[next], outer[next]);
      }
    }

    const outerTop = topRings[topRings.length - 1];
    const sideRings = [];
    const sideProfiles = [
      [1.0, 0.0],
      [0.985, -0.05],
      [0.94, -0.12],
      [0.86, -0.2],
      [0.74, -0.27],
    ];

    for (let level = 0; level < sideProfiles.length; level++) {
      const scale = sideProfiles[level][0];
      const drop = sideProfiles[level][1];
      const ringIndices = [];

      for (let i = 0; i < perimeterCount; i++) {
        const theta = i / perimeterCount;
        const boundary = perimeterPoint(theta);
        const u = boundary.x / w + 0.5;
        const v = boundary.z / d + 0.5;
        const topY = topHeight(u, v);
        ringIndices.push(
          addVertex(
            boundary.x * scale,
            topY + drop,
            boundary.z * scale
          )
        );
      }
      sideRings.push(ringIndices);
    }

    for (let level = 0; level < sideRings.length - 1; level++) {
      const upper = sideRings[level];
      const lower = sideRings[level + 1];

      for (let i = 0; i < perimeterCount; i++) {
        const next = (i + 1) % perimeterCount;
        indices.push(upper[i], lower[next], lower[i]);
        indices.push(upper[i], upper[next], lower[next]);
      }
    }

    const bottomPerimeter = sideRings[sideRings.length - 1];
    const bottomCenter = addVertex(0, -hy, 0);

    for (let i = 0; i < perimeterCount; i++) {
      const next = (i + 1) % perimeterCount;
      indices.push(bottomCenter, bottomPerimeter[i], bottomPerimeter[next]);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const feetGeom = new THREE.BoxGeometry(0.22, 0.14, 0.18);
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  feet.name = "feet";

  const footPositions = [
    [-1.58, 0.07, -1.86],
    [1.58, 0.07, -1.86],
    [-1.58, 0.07, 1.86],
    [1.58, 0.07, 1.86],
  ];
  const footDummy = new THREE.Object3D();

  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    footDummy.position.set(position[0], position[1], position[2]);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }

  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const platform_baseGeom = createRoundedBoxGeometry(
    3.58,
    0.5,
    4.08,
    0.11,
    6
  );
  const platform_base = new THREE.Mesh(platform_baseGeom, frameMat);
  platform_base.name = "platform_base";
  platform_base.position.set(0, 0.37, 0);
  root.add(platform_base);

  const front_apronGeom = createRoundedBoxGeometry(
    3.58,
    0.5,
    0.18,
    0.09,
    6
  );
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.37, 2.04);
  root.add(front_apron);

  const side_railGeom = createRoundedBoxGeometry(
    0.18,
    0.48,
    3.88,
    0.07,
    5
  );

  const left_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-1.75, 0.43, 0.02);
  root.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, frameMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(1.75, 0.43, 0.02);
  root.add(right_side_rail);

  const front_corner_seamGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.38,
    8
  );
  const front_corner_seams = new THREE.InstancedMesh(
    front_corner_seamGeom,
    seamMat,
    2
  );
  front_corner_seams.name = "front_corner_seams";

  const seamDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    seamDummy.position.set(i === 0 ? -1.69 : 1.69, 0.38, 2.137);
    seamDummy.updateMatrix();
    front_corner_seams.setMatrixAt(i, seamDummy.matrix);
  }

  front_corner_seams.instanceMatrix.needsUpdate = true;
  root.add(front_corner_seams);

  const headboardGeom = createRoundedBoxGeometry(
    3.55,
    2.4,
    0.3,
    0.15,
    8
  );
  const headboard = new THREE.Mesh(headboardGeom, frameMat);
  headboard.name = "headboard";
  headboard.position.set(0, 1.34, -2.0);
  root.add(headboard);

  const headboard_panelGeom = createRoundedBoxGeometry(
    0.84,
    1.55,
    0.12,
    0.12,
    7
  );
  const headboard_panels = new THREE.InstancedMesh(
    headboard_panelGeom,
    frameMat,
    4
  );
  headboard_panels.name = "headboard_panels";

  const panelDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    panelDummy.position.set(-1.275 + i * 0.85, 1.72, -1.825);
    panelDummy.updateMatrix();
    headboard_panels.setMatrixAt(i, panelDummy.matrix);
  }

  headboard_panels.instanceMatrix.needsUpdate = true;
  root.add(headboard_panels);

  const headboard_seamGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    1.42,
    8
  );
  const headboard_vertical_seams = new THREE.InstancedMesh(
    headboard_seamGeom,
    seamMat,
    3
  );
  headboard_vertical_seams.name = "headboard_vertical_seams";

  const verticalSeamPositions = [-0.85, 0, 0.85];
  for (let i = 0; i < verticalSeamPositions.length; i++) {
    seamDummy.position.set(verticalSeamPositions[i], 1.72, -1.756);
    seamDummy.updateMatrix();
    headboard_vertical_seams.setMatrixAt(i, seamDummy.matrix);
  }

  headboard_vertical_seams.instanceMatrix.needsUpdate = true;
  root.add(headboard_vertical_seams);

  const headboard_lower_seamGeom = new THREE.CylinderGeometry(
    0.01,
    0.01,
    3.25,
    8
  );
  const headboard_lower_seam = new THREE.Mesh(
    headboard_lower_seamGeom,
    seamMat
  );
  headboard_lower_seam.name = "headboard_lower_seam";
  headboard_lower_seam.rotation.z = Math.PI * 0.5;
  headboard_lower_seam.position.set(0, 0.96, -1.756);
  root.add(headboard_lower_seam);

  const mattressGeom = createRoundedBoxGeometry(
    3.25,
    0.42,
    3.62,
    0.14,
    8
  );
  const mattress = new THREE.Mesh(mattressGeom, mattressMat);
  mattress.name = "mattress";
  mattress.position.set(0, 0.79, 0.05);
  root.add(mattress);

  const mattress_piping_points = [
    new THREE.Vector3(-1.47, 1.005, -1.72),
    new THREE.Vector3(1.47, 1.005, -1.72),
    new THREE.Vector3(1.59, 1.005, -1.6),
    new THREE.Vector3(1.59, 1.005, 1.68),
    new THREE.Vector3(1.47, 1.005, 1.8),
    new THREE.Vector3(-1.47, 1.005, 1.8),
    new THREE.Vector3(-1.59, 1.005, 1.68),
    new THREE.Vector3(-1.59, 1.005, -1.6),
  ];
  const mattress_piping_curve = new THREE.CatmullRomCurve3(
    mattress_piping_points,
    true,
    "centripetal"
  );
  const mattress_pipingGeom = new THREE.TubeGeometry(
    mattress_piping_curve,
    64,
    0.012,
    8,
    true
  );
  const mattress_piping = new THREE.Mesh(
    mattress_pipingGeom,
    seamMat
  );
  mattress_piping.name = "mattress_piping";
  root.add(mattress_piping);

  const duvet_w = 3.28;
  const duvet_h = 0.3;
  const duvet_d = 3.42;
  const duvetGeom = createSoftDuvetGeometry(
    duvet_w,
    duvet_h,
    duvet_d
  );
  const duvet = new THREE.Mesh(duvetGeom, beddingMat);
  duvet.name = "duvet";
  duvet.position.set(0, 1.03, 0.12);
  root.add(duvet);

  const duvet_hem_points = [
    new THREE.Vector3(-1.48, 1.045, -1.55),
    new THREE.Vector3(-1.61, 1.045, -1.43),
    new THREE.Vector3(-1.61, 1.045, 1.66),
    new THREE.Vector3(-1.48, 1.045, 1.8),
    new THREE.Vector3(1.48, 1.045, 1.8),
    new THREE.Vector3(1.61, 1.045, 1.66),
    new THREE.Vector3(1.61, 1.045, -1.43),
    new THREE.Vector3(1.48, 1.045, -1.55),
  ];
  const duvet_hem_curve = new THREE.CatmullRomCurve3(
    duvet_hem_points,
    true,
    "centripetal"
  );
  const duvet_hemGeom = new THREE.TubeGeometry(
    duvet_hem_curve,
    72,
    0.013,
    8,
    true
  );
  const duvet_hem = new THREE.Mesh(duvet_hemGeom, seamMat);
  duvet_hem.name = "duvet_hem";
  root.add(duvet_hem);

  const folded_duvetGeom = createRoundedBoxGeometry(
    3.16,
    0.2,
    0.72,
    0.1,
    8
  );
  const folded_duvet = new THREE.Mesh(
    folded_duvetGeom,
    beddingMat
  );
  folded_duvet.name = "folded_duvet";
  folded_duvet.position.set(0, 1.16, -0.72);
  folded_duvet.rotation.x = -0.035;
  root.add(folded_duvet);

  const folded_duvet_seamGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    2.96,
    8
  );
  const folded_duvet_seam = new THREE.Mesh(
    folded_duvet_seamGeom,
    seamMat
  );
  folded_duvet_seam.name = "folded_duvet_seam";
  folded_duvet_seam.rotation.z = Math.PI * 0.5;
  folded_duvet_seam.position.set(0, 1.265, -0.355);
  root.add(folded_duvet_seam);

  const folded_duvet_dropGeom = createRoundedBoxGeometry(
    0.58,
    0.5,
    0.2,
    0.09,
    7
  );
  const folded_duvet_drop = new THREE.Mesh(
    folded_duvet_dropGeom,
    beddingMat
  );
  folded_duvet_drop.name = "folded_duvet_drop";
  folded_duvet_drop.position.set(-1.05, 0.91, -0.33);
  folded_duvet_drop.rotation.z = -0.055;
  folded_duvet_drop.rotation.x = -0.035;
  root.add(folded_duvet_drop);

  const pillowGeom = createRoundedBoxGeometry(
    1.3,
    0.28,
    0.78,
    0.13,
    9
  );

  const left_pillow = new THREE.Mesh(pillowGeom, pillowMat);
  left_pillow.name = "left_pillow";
  left_pillow.position.set(-0.68, 1.28, -1.25);
  left_pillow.rotation.set(-0.25, -0.055, -0.035);
  root.add(left_pillow);

  const right_pillow = new THREE.Mesh(pillowGeom, pillowMat);
  right_pillow.name = "right_pillow";
  right_pillow.position.set(0.68, 1.3, -1.3);
  right_pillow.rotation.set(-0.22, 0.045, 0.02);
  root.add(right_pillow);

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