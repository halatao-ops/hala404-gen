export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "christmas_bauble";

  const ornament_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc80016,
    metalness: 0.15,
    roughness: 0.18,
  });
  const silver_capMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    metalness: 0.6,
    roughness: 0.25,
  });
  const cap_flutesMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.45,
    roughness: 0.35,
  });
  const silver_ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.35,
    roughness: 0.22,
  });
  const glitter_crystalsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.5,
    roughness: 0.18,
    flatShading: true,
  });

  const bodyProfile = [
    { y: -0.520, r: 0.000 },
    { y: -0.495, r: 0.075 },
    { y: -0.455, r: 0.170 },
    { y: -0.390, r: 0.270 },
    { y: -0.290, r: 0.350 },
    { y: -0.160, r: 0.395 },
    { y: -0.020, r: 0.405 },
    { y: 0.120, r: 0.380 },
    { y: 0.240, r: 0.330 },
    { y: 0.340, r: 0.250 },
    { y: 0.410, r: 0.160 },
    { y: 0.445, r: 0.090 },
    { y: 0.460, r: 0.000 },
  ];

  function bodyRadiusAt(y) {
    if (y <= bodyProfile[0].y) return bodyProfile[0].r;
    const last = bodyProfile.length - 1;
    if (y >= bodyProfile[last].y) return bodyProfile[last].r;

    for (let i = 0; i < last; i++) {
      const a = bodyProfile[i];
      const b = bodyProfile[i + 1];
      if (y >= a.y && y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        const smooth = t * t * (3 - 2 * t);
        return a.r + (b.r - a.r) * smooth;
      }
    }
    return 0;
  }

  const ornament_bodyGeom = new THREE.LatheGeometry();
  const bodyPositions = [];
  const bodyUvs = [];
  const bodyIndices = [];
  const bodyRingSegments = 64;
  const bodyVerticalSegments = 56;

  for (let j = 0; j <= bodyVerticalSegments; j++) {
    const v = j / bodyVerticalSegments;
    const y = -0.52 + v * 0.98;
    const baseRadius = bodyRadiusAt(y);
    const fade = Math.sin(Math.PI * v);

    for (let i = 0; i <= bodyRingSegments; i++) {
      const u = i / bodyRingSegments;
      const angle = u * Math.PI * 2;
      const lobe =
        1 +
        fade *
          (0.018 * Math.cos(angle * 3 - 0.35) +
            0.012 * Math.sin(angle * 2 + 0.7));
      const radius = baseRadius * lobe;
      bodyPositions.push(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      bodyUvs.push(u, v);
    }
  }

  for (let j = 0; j < bodyVerticalSegments; j++) {
    for (let i = 0; i < bodyRingSegments; i++) {
      const a = j * (bodyRingSegments + 1) + i;
      const b = a + 1;
      const c = a + bodyRingSegments + 1;
      const d = c + 1;
      bodyIndices.push(a, c, b, b, c, d);
    }
  }

  ornament_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bodyPositions, 3)
  );
  ornament_bodyGeom.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(bodyUvs, 2)
  );
  ornament_bodyGeom.setIndex(bodyIndices);
  ornament_bodyGeom.computeVertexNormals();

  const ornament_body = new THREE.Mesh(ornament_bodyGeom, ornament_bodyMat);
  ornament_body.name = "ornament_body";
  root.add(ornament_body);

  const silver_capGeom = new THREE.CylinderGeometry(
    0.105,
    0.135,
    0.105,
    32
  );
  const silver_cap = new THREE.Mesh(silver_capGeom, silver_capMat);
  silver_cap.name = "silver_cap";
  silver_cap.position.y = 0.485;
  root.add(silver_cap);

  const cap_topGeom = new THREE.CylinderGeometry(0.108, 0.108, 0.018, 32);
  const cap_top = new THREE.Mesh(cap_topGeom, silver_capMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 0.542;
  root.add(cap_top);

  const cap_flutesGeom = new THREE.BoxGeometry(0.014, 0.078, 0.012);
  const cap_flutes = new THREE.InstancedMesh(
    cap_flutesGeom,
    cap_flutesMat,
    18
  );
  cap_flutes.name = "cap_flutes";
  const capFluteDummy = new THREE.Object3D();

  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    capFluteDummy.position.set(
      Math.cos(angle) * 0.124,
      0.482,
      Math.sin(angle) * 0.124
    );
    capFluteDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    capFluteDummy.scale.set(1, 1, 1);
    capFluteDummy.updateMatrix();
    cap_flutes.setMatrixAt(i, capFluteDummy.matrix);
  }
  cap_flutes.instanceMatrix.needsUpdate = true;
  root.add(cap_flutes);

  const cap_scallopsGeom = new THREE.SphereGeometry(0.025, 10, 6);
  const cap_scallops = new THREE.InstancedMesh(
    cap_scallopsGeom,
    silver_capMat,
    12
  );
  cap_scallops.name = "cap_scallops";
  const capScallopDummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    capScallopDummy.position.set(
      Math.cos(angle) * 0.124,
      0.428,
      Math.sin(angle) * 0.124
    );
    capScallopDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    capScallopDummy.scale.set(0.75, 1.15, 0.42);
    capScallopDummy.updateMatrix();
    cap_scallops.setMatrixAt(i, capScallopDummy.matrix);
  }
  cap_scallops.instanceMatrix.needsUpdate = true;
  root.add(cap_scallops);

  const hanging_loopGeom = new THREE.TorusGeometry(0.052, 0.009, 10, 32);
  const hanging_loop = new THREE.Mesh(hanging_loopGeom, silver_capMat);
  hanging_loop.name = "hanging_loop";
  hanging_loop.position.set(0, 0.605, -0.008);
  hanging_loop.scale.set(0.82, 1.15, 1);
  root.add(hanging_loop);

  const loop_mountGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.045,
    12
  );
  const loop_mount = new THREE.Mesh(loop_mountGeom, silver_capMat);
  loop_mount.name = "loop_mount";
  loop_mount.position.set(0, 0.558, -0.008);
  root.add(loop_mount);

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createSurfaceRibbonGeometry(sampler, width, segments) {
    const positions = [];
    const normals = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const sample = sampler(t);
      const angle = sample[0];
      const y = sample[1];
      const radius = bodyRadiusAt(y);
      const delta = 0.002;
      const lowerY = Math.max(-0.515, y - delta);
      const upperY = Math.min(0.445, y + delta);
      const radiusSlope =
        (bodyRadiusAt(upperY) - bodyRadiusAt(lowerY)) /
        Math.max(upperY - lowerY, 0.0001);

      const normal = new THREE.Vector3(
        Math.cos(angle),
        -radiusSlope,
        Math.sin(angle)
      ).normalize();

      const tangent = new THREE.Vector3(
        -Math.sin(angle) * radius,
        1,
        Math.cos(angle) * radius
      ).normalize();

      const side = new THREE.Vector3()
        .crossVectors(normal, tangent)
        .normalize()
        .multiplyScalar(width * 0.5);

      const center = surfacePoint(angle, y, 0.010);
      const left = center.clone().add(side);
      const right = center.clone().sub(side);

      positions.push(
        left.x, left.y, left.z,
        right.x, right.y, right.z
      );
      normals.push(
        normal.x, normal.y, normal.z,
        normal.x, normal.y, normal.z
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const silver_ribbon_1Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        2.85 - 2.45 * t + 0.12 * Math.sin(t * Math.PI * 2),
        0.37 - 0.82 * t + 0.018 * Math.sin(t * Math.PI * 3),
      ];
    },
    0.022,
    64
  );
  const silver_ribbon_1 = new THREE.Mesh(
    silver_ribbon_1Geom,
    silver_ribbonMat
  );
  silver_ribbon_1.name = "silver_ribbon_1";
  root.add(silver_ribbon_1);

  const silver_ribbon_2Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        0.35 + 2.35 * t - 0.10 * Math.sin(t * Math.PI * 2),
        0.39 - 0.80 * t + 0.022 * Math.cos(t * Math.PI * 3),
      ];
    },
    0.020,
    64
  );
  const silver_ribbon_2 = new THREE.Mesh(
    silver_ribbon_2Geom,
    silver_ribbonMat
  );
  silver_ribbon_2.name = "silver_ribbon_2";
  root.add(silver_ribbon_2);

  const silver_ribbon_3Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        2.95 - 2.65 * t + 0.13 * Math.sin(t * Math.PI * 2),
        -0.42 + 0.79 * t + 0.018 * Math.sin(t * Math.PI * 3),
      ];
    },
    0.021,
    64
  );
  const silver_ribbon_3 = new THREE.Mesh(
    silver_ribbon_3Geom,
    silver_ribbonMat
  );
  silver_ribbon_3.name = "silver_ribbon_3";
  root.add(silver_ribbon_3);

  const silver_ribbon_4Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        0.18 + 2.70 * t + 0.11 * Math.sin(t * Math.PI * 2),
        -0.40 + 0.77 * t - 0.018 * Math.cos(t * Math.PI * 3),
      ];
    },
    0.019,
    64
  );
  const silver_ribbon_4 = new THREE.Mesh(
    silver_ribbon_4Geom,
    silver_ribbonMat
  );
  silver_ribbon_4.name = "silver_ribbon_4";
  root.add(silver_ribbon_4);

  const silver_ribbon_5Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        1.50 + 1.55 * Math.sin(t * Math.PI * 2),
        0.31 - 0.61 * t + 0.025 * Math.sin(t * Math.PI * 4),
      ];
    },
    0.017,
    72
  );
  const silver_ribbon_5 = new THREE.Mesh(
    silver_ribbon_5Geom,
    silver_ribbonMat
  );
  silver_ribbon_5.name = "silver_ribbon_5";
  root.add(silver_ribbon_5);

  const silver_ribbon_6Geom = createSurfaceRibbonGeometry(
    function (t) {
      return [
        4.65 + 1.45 * Math.sin(t * Math.PI * 2 + 0.5),
        0.29 - 0.65 * t + 0.020 * Math.cos(t * Math.PI * 4),
      ];
    },
    0.016,
    72
  );
  const silver_ribbon_6 = new THREE.Mesh(
    silver_ribbon_6Geom,
    silver_ribbonMat
  );
  silver_ribbon_6.name = "silver_ribbon_6";
  root.add(silver_ribbon_6);

  const glitter_crystalsGeom = new THREE.OctahedronGeometry(0.009, 0);
  const glitterPerRibbon = 28;
  const glitter_crystals = new THREE.InstancedMesh(
    glitter_crystalsGeom,
    glitter_crystalsMat,
    glitterPerRibbon * 6
  );
  glitter_crystals.name = "glitter_crystals";

  const glitterSamplers = [
    function (t) {
      return [
        2.85 - 2.45 * t + 0.12 * Math.sin(t * Math.PI * 2),
        0.37 - 0.82 * t + 0.018 * Math.sin(t * Math.PI * 3),
      ];
    },
    function (t) {
      return [
        0.35 + 2.35 * t - 0.10 * Math.sin(t * Math.PI * 2),
        0.39 - 0.80 * t + 0.022 * Math.cos(t * Math.PI * 3),
      ];
    },
    function (t) {
      return [
        2.95 - 2.65 * t + 0.13 * Math.sin(t * Math.PI * 2),
        -0.42 + 0.79 * t + 0.018 * Math.sin(t * Math.PI * 3),
      ];
    },
    function (t) {
      return [
        0.18 + 2.70 * t + 0.11 * Math.sin(t * Math.PI * 2),
        -0.40 + 0.77 * t - 0.018 * Math.cos(t * Math.PI * 3),
      ];
    },
    function (t) {
      return [
        1.50 + 1.55 * Math.sin(t * Math.PI * 2),
        0.31 - 0.61 * t + 0.025 * Math.sin(t * Math.PI * 4),
      ];
    },
    function (t) {
      return [
        4.65 + 1.45 * Math.sin(t * Math.PI * 2 + 0.5),
        0.29 - 0.65 * t + 0.020 * Math.cos(t * Math.PI * 4),
      ];
    },
  ];

  const glitterDummy = new THREE.Object3D();
  let glitterIndex = 0;

  for (let ribbonIndex = 0; ribbonIndex < glitterSamplers.length; ribbonIndex++) {
    const sampler = glitterSamplers[ribbonIndex];
    for (let i = 0; i < glitterPerRibbon; i++) {
      const t = (i + 0.5) / glitterPerRibbon;
      const sample = sampler(t);
      const scale = 0.72 + ((i * 7 + ribbonIndex * 3) % 6) * 0.11;

      glitterDummy.position.copy(surfacePoint(sample[0], sample[1], 0.020));
      glitterDummy.rotation.set(
        (i % 5) * 0.31,
        (ribbonIndex % 4) * 0.43,
        ((i + ribbonIndex) % 6) * 0.27
      );
      glitterDummy.scale.setScalar(scale);
      glitterDummy.updateMatrix();
      glitter_crystals.setMatrixAt(glitterIndex, glitterDummy.matrix);
      glitterIndex++;
    }
  }
  glitter_crystals.instanceMatrix.needsUpdate = true;
  root.add(glitter_crystals);

  const glitter_specksGeom = new THREE.SphereGeometry(0.0055, 6, 4);
  const glitter_specks = new THREE.InstancedMesh(
    glitter_specksGeom,
    glitter_crystalsMat,
    96
  );
  glitter_specks.name = "glitter_specks";
  const speckDummy = new THREE.Object3D();

  for (let i = 0; i < 96; i++) {
    const u = ((i * 37) % 97) / 96;
    const v = ((i * 53 + 11) % 101) / 100;
    const angle = u * Math.PI * 2;
    const y = -0.43 + v * 0.82;
    const scale = 0.55 + ((i * 17) % 9) * 0.10;

    speckDummy.position.copy(surfacePoint(angle, y, 0.014));
    speckDummy.rotation.set(0, 0, 0);
    speckDummy.scale.setScalar(scale);
    speckDummy.updateMatrix();
    glitter_specks.setMatrixAt(i, speckDummy.matrix);
  }
  glitter_specks.instanceMatrix.needsUpdate = true;
  root.add(glitter_specks);

  const glitter_flakesGeom = new THREE.OctahedronGeometry(0.022, 0);
  const glitter_flakes = new THREE.InstancedMesh(
    glitter_flakesGeom,
    glitter_crystalsMat,
    18
  );
  glitter_flakes.name = "glitter_flakes";
  const flakeDummy = new THREE.Object3D();

  for (let i = 0; i < 18; i++) {
    const u = ((i * 19 + 7) % 43) / 42;
    const v = ((i * 23 + 5) % 47) / 46;
    const angle = 0.18 + u * 2.78;
    const y = -0.39 + v * 0.74;
    const scale = 0.65 + ((i * 5) % 7) * 0.09;

    flakeDummy.position.copy(surfacePoint(angle, y, 0.018));
    flakeDummy.rotation.set(
      (i % 4) * 0.37,
      (i % 5) * 0.29,
      (i % 6) * 0.41
    );
    flakeDummy.scale.set(scale, scale * 0.72, scale * 0.48);
    flakeDummy.updateMatrix();
    glitter_flakes.setMatrixAt(i, flakeDummy.matrix);
  }
  glitter_flakes.instanceMatrix.needsUpdate = true;
  root.add(glitter_flakes);

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