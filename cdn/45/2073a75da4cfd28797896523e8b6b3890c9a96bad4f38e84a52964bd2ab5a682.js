export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "salad_bowl";

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f1,
    metalness: 0.0,
    roughness: 0.22,
    side: THREE.DoubleSide,
  });
  const salad_bedMat = new THREE.MeshStandardMaterial({
    color: 0x285f20,
    metalness: 0.0,
    roughness: 0.8,
  });
  const leafy_greensMat = new THREE.MeshStandardMaterial({
    color: 0x2f7d25,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_greensMat = new THREE.MeshStandardMaterial({
    color: 0x1f6421,
    metalness: 0.0,
    roughness: 0.8,
  });
  const cucumber_skinMat = new THREE.MeshStandardMaterial({
    color: 0x286b25,
    metalness: 0.0,
    roughness: 0.75,
  });
  const cucumber_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xb9d879,
    metalness: 0.0,
    roughness: 0.7,
  });
  const cucumber_seedsMat = new THREE.MeshStandardMaterial({
    color: 0xe4e3a2,
    metalness: 0.0,
    roughness: 0.75,
  });
  const red_pepperMat = new THREE.MeshStandardMaterial({
    color: 0xe83c25,
    metalness: 0.0,
    roughness: 0.65,
  });
  const orange_pepperMat = new THREE.MeshStandardMaterial({
    color: 0xf28a18,
    metalness: 0.0,
    roughness: 0.68,
  });
  const yellow_pepperMat = new THREE.MeshStandardMaterial({
    color: 0xe7d94a,
    metalness: 0.0,
    roughness: 0.68,
  });
  const purple_onionMat = new THREE.MeshStandardMaterial({
    color: 0x54205f,
    metalness: 0.0,
    roughness: 0.72,
  });
  const eggplant_skinMat = new THREE.MeshStandardMaterial({
    color: 0x3d174d,
    metalness: 0.0,
    roughness: 0.72,
  });
  const eggplant_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xd8c982,
    metalness: 0.0,
    roughness: 0.72,
  });
  const cherry_tomatoesMat = new THREE.MeshStandardMaterial({
    color: 0xd93424,
    metalness: 0.0,
    roughness: 0.62,
  });
  const green_peasMat = new THREE.MeshStandardMaterial({
    color: 0xa9bd35,
    metalness: 0.0,
    roughness: 0.68,
  });
  const corn_kernelsMat = new THREE.MeshStandardMaterial({
    color: 0xf0c83b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const strawberryMat = new THREE.MeshStandardMaterial({
    color: 0xe93224,
    metalness: 0.0,
    roughness: 0.62,
  });
  const strawberry_seedsMat = new THREE.MeshStandardMaterial({
    color: 0xf2c05a,
    metalness: 0.0,
    roughness: 0.72,
  });
  const cilantro_leavesMat = new THREE.MeshStandardMaterial({
    color: 0x246f2b,
    metalness: 0.0,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });
  const cilantro_stemsMat = new THREE.MeshStandardMaterial({
    color: 0x347d31,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createBowlGeometry() {
    const segments = 64;
    const levels = 20;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= levels; j++) {
      const t = j / levels;
      const curve = Math.pow(t, 0.72);
      const halfWidth = 0.58 + 1.18 * curve;
      const halfDepth = 0.45 + 0.87 * curve;
      const y = -0.72 + 1.84 * t;

      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const superPower = 2 / 4.2;
        const x = halfWidth * Math.sign(cosine) * Math.pow(Math.abs(cosine), superPower);
        const z = halfDepth * Math.sign(sine) * Math.pow(Math.abs(sine), superPower);
        positions.push(x, y, z);
      }
    }

    for (let j = 0; j < levels; j++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = j * segments + i;
        const b = j * segments + next;
        const c = (j + 1) * segments + next;
        const d = (j + 1) * segments + i;
        indices.push(a, d, b, b, d, c);
      }
    }

    const innerLevels = 14;
    const innerStart = positions.length / 3;

    for (let j = 0; j <= innerLevels; j++) {
      const t = j / innerLevels;
      const curve = Math.pow(t, 0.78);
      const halfWidth = 0.28 + 1.17 * curve;
      const halfDepth = 0.20 + 0.82 * curve;
      const y = -0.18 + 1.38 * t;

      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const superPower = 2 / 4.0;
        const x = halfWidth * Math.sign(cosine) * Math.pow(Math.abs(cosine), superPower);
        const z = halfDepth * Math.sign(sine) * Math.pow(Math.abs(sine), superPower);
        positions.push(x, y, z);
      }
    }

    for (let j = 0; j < innerLevels; j++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + j * segments + i;
        const b = innerStart + j * segments + next;
        const c = innerStart + (j + 1) * segments + next;
        const d = innerStart + (j + 1) * segments + i;
        indices.push(a, b, d, b, c, d);
      }
    }

    const outerTop = levels * segments;
    const innerTop = innerStart + innerLevels * segments;

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const outerA = outerTop + i;
      const outerB = outerTop + next;
      const innerA = innerTop + i;
      const innerB = innerTop + next;
      indices.push(outerA, innerA, outerB, outerB, innerA, innerB);
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, -0.72, 0);
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(bottomCenter, i, next);
    }

    const innerCenter = positions.length / 3;
    positions.push(0, -0.18, 0);
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(innerCenter, innerStart + next, innerStart + i);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createLeafGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.045, 0.045);
    shape.lineTo(0.025, 0.075);
    shape.lineTo(0.085, 0.105);
    shape.lineTo(0.045, 0.135);
    shape.lineTo(0.105, 0.17);
    shape.lineTo(0.05, 0.205);
    shape.lineTo(0.07, 0.25);
    shape.lineTo(0, 0.31);
    shape.lineTo(-0.07, 0.25);
    shape.lineTo(-0.05, 0.205);
    shape.lineTo(-0.105, 0.17);
    shape.lineTo(-0.045, 0.135);
    shape.lineTo(-0.085, 0.105);
    shape.lineTo(-0.025, 0.075);
    shape.lineTo(-0.045, 0.045);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const bowl = new THREE.Group();
  bowl.name = "bowl";
  root.add(bowl);

  const bowl_shellGeo = createBowlGeometry();
  const bowl_shell = new THREE.Mesh(bowl_shellGeo, bowlMat);
  bowl_shell.name = "bowl_shell";
  bowl.add(bowl_shell);

  const rimPoints = [];
  const rimSegments = 64;
  for (let i = 0; i < rimSegments; i++) {
    const angle = i / rimSegments * Math.PI * 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const superPower = 2 / 4.2;
    const x = 1.76 * Math.sign(cosine) * Math.pow(Math.abs(cosine), superPower);
    const z = 1.32 * Math.sign(sine) * Math.pow(Math.abs(sine), superPower);
    rimPoints.push(new THREE.Vector3(x, 1.12, z));
  }
  const bowl_rimCurve = new THREE.CatmullRomCurve3(rimPoints, true, "centripetal");
  const bowl_rimGeo = new THREE.TubeGeometry(bowl_rimCurve, 128, 0.075, 10, true);
  const bowl_rim = new THREE.Mesh(bowl_rimGeo, bowlMat);
  bowl_rim.name = "bowl_rim";
  bowl.add(bowl_rim);

  const pedestal_footProfile = [
    new THREE.Vector2(0.00, -1.00),
    new THREE.Vector2(0.62, -1.00),
    new THREE.Vector2(0.76, -0.97),
    new THREE.Vector2(0.84, -0.91),
    new THREE.Vector2(0.86, -0.84),
    new THREE.Vector2(0.82, -0.77),
    new THREE.Vector2(0.72, -0.70),
    new THREE.Vector2(0.00, -0.68),
  ];
  const pedestal_footGeo = new THREE.LatheGeometry(pedestal_footProfile);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeo, bowlMat);
  pedestal_foot.name = "pedestal_foot";
  bowl.add(pedestal_foot);

  const pedestal_base_ringGeo = new THREE.TorusGeometry(0.73, 0.035, 10, 48);
  const pedestal_base_ring = new THREE.Mesh(pedestal_base_ringGeo, bowlMat);
  pedestal_base_ring.name = "pedestal_base_ring";
  pedestal_base_ring.rotation.x = Math.PI / 2;
  pedestal_base_ring.position.y = -0.965;
  bowl.add(pedestal_base_ring);

  const salad = new THREE.Group();
  salad.name = "salad";
  root.add(salad);

  const salad_bed = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), salad_bedMat);
  salad_bed.name = "salad_bed";
  salad_bed.position.set(0, 0.76, 0);
  salad_bed.scale.set(1.28, 0.25, 0.90);
  salad.add(salad_bed);

  const instance_dummy = new THREE.Object3D();

  function placeInstance(mesh, index, position, rotation, scale) {
    instance_dummy.position.set(position[0], position[1], position[2]);
    instance_dummy.rotation.set(rotation[0], rotation[1], rotation[2]);
    instance_dummy.scale.set(scale[0], scale[1], scale[2]);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const leafy_greensGeo = new THREE.SphereGeometry(1, 16, 8);
  const leafy_greens = new THREE.InstancedMesh(leafy_greensGeo, leafy_greensMat, 18);
  leafy_greens.name = "leafy_greens";
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399963;
    const radius = 0.22 + 0.78 * ((i % 6) / 5);
    const x = Math.cos(angle) * radius * 1.15;
    const z = Math.sin(angle) * radius * 0.82;
    const y = 0.91 + 0.07 * (i % 4);
    placeInstance(
      leafy_greens,
      i,
      [x, y, z],
      [0.18 * Math.sin(angle), angle * 0.72, 0.22 * Math.cos(angle)],
      [0.22 + 0.025 * (i % 3), 0.045, 0.30 + 0.025 * (i % 4)]
    );
  }
  leafy_greens.instanceMatrix.needsUpdate = true;
  salad.add(leafy_greens);

  const dark_greensGeo = new THREE.SphereGeometry(1, 14, 7);
  const dark_greens = new THREE.InstancedMesh(dark_greensGeo, dark_greensMat, 12);
  dark_greens.name = "dark_greens";
  for (let i = 0; i < 12; i++) {
    const angle = 0.7 + i * 2.17;
    const radius = 0.35 + 0.62 * ((i % 5) / 4);
    placeInstance(
      dark_greens,
      i,
      [Math.cos(angle) * radius, 0.98 + 0.045 * (i % 3), Math.sin(angle) * radius * 0.8],
      [0.25, angle, 0.18],
      [0.18, 0.04, 0.27]
    );
  }
  dark_greens.instanceMatrix.needsUpdate = true;
  salad.add(dark_greens);

  const cucumber_skinsGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.075, 24);
  const cucumber_skins = new THREE.InstancedMesh(cucumber_skinsGeo, cucumber_skinMat, 8);
  cucumber_skins.name = "cucumber_skins";

  const cucumber_fleshGeo = new THREE.CylinderGeometry(0.185, 0.185, 0.018, 24);
  const cucumber_flesh = new THREE.InstancedMesh(cucumber_fleshGeo, cucumber_fleshMat, 8);
  cucumber_flesh.name = "cucumber_flesh";

  const cucumberData = [
    [-1.05, 1.08, 0.28, 0.18, 0.30, -0.22, 1.00],
    [-0.82, 1.18, -0.42, -0.25, 0.85, 0.18, 0.92],
    [-0.42, 1.25, 0.55, 0.20, -0.55, 0.12, 0.88],
    [0.18, 1.20, -0.62, -0.18, 0.35, -0.12, 0.95],
    [0.72, 1.12, 0.48, 0.25, -0.90, 0.20, 0.92],
    [1.05, 1.04, -0.08, -0.20, 0.50, -0.18, 0.86],
    [-0.18, 1.06, 0.88, 0.16, 1.10, 0.10, 0.82],
    [0.48, 1.28, -0.12, -0.12, -0.30, 0.22, 0.84],
  ];

  for (let i = 0; i < cucumberData.length; i++) {
    const d = cucumberData[i];
    placeInstance(cucumber_skins, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [d[6], 1, d[6]]);
    placeInstance(cucumber_flesh, i, [d[0], d[1] + 0.046, d[2]], [d[3], d[4], d[5]], [d[6], 1, d[6]]);
  }
  cucumber_skins.instanceMatrix.needsUpdate = true;
  cucumber_flesh.instanceMatrix.needsUpdate = true;
  salad.add(cucumber_skins, cucumber_flesh);

  const cucumber_seedsGeo = new THREE.SphereGeometry(1, 10, 6);
  const cucumber_seeds = new THREE.InstancedMesh(cucumber_seedsGeo, cucumber_seedsMat, 16);
  cucumber_seeds.name = "cucumber_seeds";
  let cucumberSeedIndex = 0;
  for (let i = 0; i < cucumberData.length; i++) {
    const d = cucumberData[i];
    const rotation = new THREE.Euler(d[3], d[4], d[5]);
    for (let j = 0; j < 2; j++) {
      const localOffset = new THREE.Vector3((j === 0 ? -0.045 : 0.045) * d[6], 0.061, (j === 0 ? 0.025 : -0.025) * d[6]);
      localOffset.applyEuler(rotation);
      placeInstance(
        cucumber_seeds,
        cucumberSeedIndex++,
        [d[0] + localOffset.x, d[1] + localOffset.y, d[2] + localOffset.z],
        [d[3], d[4] + (j === 0 ? -0.35 : 0.35), d[5]],
        [0.022, 0.008, 0.045]
      );
    }
  }
  cucumber_seeds.instanceMatrix.needsUpdate = true;
  salad.add(cucumber_seeds);

  const red_pepperGeom = new THREE.BoxGeometry(0.38, 0.25, 0.29);
  const red_pepper = new THREE.InstancedMesh(red_pepperGeom, red_pepperMat, 7);
  red_pepper.name = "red_pepper";
  const redPepperData = [
    [-1.05, 1.02, 0.55, 0.12, 0.45, -0.18, 1.00],
    [-0.62, 1.20, -0.62, -0.18, -0.55, 0.12, 0.92],
    [0.92, 1.08, 0.52, 0.16, 0.82, 0.20, 0.95],
    [1.08, 1.00, -0.38, -0.12, -0.72, -0.16, 0.88],
    [-0.12, 1.12, 0.78, 0.20, 0.25, 0.12, 0.84],
    [0.35, 1.25, -0.55, -0.20, 0.60, -0.10, 0.82],
    [-0.88, 1.08, -0.12, 0.10, -0.90, 0.18, 0.86],
  ];
  for (let i = 0; i < redPepperData.length; i++) {
    const d = redPepperData[i];
    placeInstance(red_pepper, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [d[6], d[6], d[6]]);
  }
  red_pepper.instanceMatrix.needsUpdate = true;
  salad.add(red_pepper);

  const orange_pepperGeom = new THREE.BoxGeometry(0.36, 0.22, 0.27);
  const orange_pepper = new THREE.InstancedMesh(orange_pepperGeom, orange_pepperMat, 5);
  orange_pepper.name = "orange_pepper";
  const orangePepperData = [
    [-0.95, 1.12, -0.52, 0.18, -0.35, 0.12],
    [0.82, 1.18, -0.52, -0.16, 0.55, -0.18],
    [0.12, 1.04, 0.88, 0.12, -0.80, 0.10],
    [-0.32, 1.28, 0.12, -0.12, 0.25, 0.18],
    [1.12, 0.98, 0.12, 0.20, 0.95, -0.12],
  ];
  for (let i = 0; i < orangePepperData.length; i++) {
    const d = orangePepperData[i];
    placeInstance(orange_pepper, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [1, 1, 1]);
  }
  orange_pepper.instanceMatrix.needsUpdate = true;
  salad.add(orange_pepper);

  const yellow_pepperGeom = new THREE.BoxGeometry(0.34, 0.23, 0.26);
  const yellow_pepper = new THREE.InstancedMesh(yellow_pepperGeom, yellow_pepperMat, 5);
  yellow_pepper.name = "yellow_pepper";
  const yellowPepperData = [
    [-1.12, 1.00, -0.18, 0.12, 0.70, -0.16],
    [-0.72, 1.10, 0.72, -0.18, -0.40, 0.12],
    [0.72, 1.08, 0.72, 0.16, 0.35, -0.12],
    [1.02, 1.12, -0.02, -0.12, -0.75, 0.18],
    [0.02, 1.22, -0.72, 0.18, 0.50, -0.10],
  ];
  for (let i = 0; i < yellowPepperData.length; i++) {
    const d = yellowPepperData[i];
    placeInstance(yellow_pepper, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [1, 1, 1]);
  }
  yellow_pepper.instanceMatrix.needsUpdate = true;
  salad.add(yellow_pepper);

  const purple_onionGeom = new THREE.SphereGeometry(1, 18, 10);
  const purple_onion = new THREE.InstancedMesh(purple_onionGeom, purple_onionMat, 6);
  purple_onion.name = "purple_onion";
  const purpleOnionData = [
    [-0.92, 1.02, 0.72, 0.12, 0.40, -0.10, 1.00],
    [-0.32, 1.08, -0.82, -0.16, -0.50, 0.12, 0.92],
    [0.62, 1.04, 0.78, 0.18, 0.75, -0.12, 0.95],
    [1.02, 1.08, -0.48, -0.12, -0.30, 0.16, 0.88],
    [-1.12, 1.10, -0.32, 0.14, 0.90, 0.10, 0.84],
    [0.22, 1.18, 0.58, -0.10, -0.80, -0.14, 0.82],
  ];
  for (let i = 0; i < purpleOnionData.length; i++) {
    const d = purpleOnionData[i];
    placeInstance(purple_onion, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [0.25 * d[6], 0.17 * d[6], 0.28 * d[6]]);
  }
  purple_onion.instanceMatrix.needsUpdate = true;
  salad.add(purple_onion);

  const eggplant_skinsGeom = new THREE.CylinderGeometry(0.23, 0.23, 0.08, 24);
  const eggplant_skins = new THREE.InstancedMesh(eggplant_skinsGeom, eggplant_skinMat, 5);
  eggplant_skins.name = "eggplant_skins";

  const eggplant_fleshGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.018, 24);
  const eggplant_flesh = new THREE.InstancedMesh(eggplant_fleshGeom, eggplant_fleshMat, 5);
  eggplant_flesh.name = "eggplant_flesh";

  const eggplantData = [
    [-0.72, 1.18, 0.18, 0.18, -0.40, -0.12, 0.95],
    [0.72, 1.20, -0.22, -0.20, 0.65, 0.16, 0.92],
    [0.18, 1.08, 0.82, 0.16, -0.80, -0.10, 0.84],
    [-1.08, 1.04, -0.02, -0.14, 0.30, 0.18, 0.82],
    [0.92, 1.04, 0.38, 0.20, 0.95, -0.14, 0.86],
  ];
  for (let i = 0; i < eggplantData.length; i++) {
    const d = eggplantData[i];
    placeInstance(eggplant_skins, i, [d[0], d[1], d[2]], [d[3], d[4], d[5]], [d[6], 1, d[6]]);
    placeInstance(eggplant_flesh, i, [d[0], d[1] + 0.049, d[2]], [d[3], d[4], d[5]], [d[6], 1, d[6]]);
  }
  eggplant_skins.instanceMatrix.needsUpdate = true;
  eggplant_flesh.instanceMatrix.needsUpdate = true;
  salad.add(eggplant_skins, eggplant_flesh);

  const cherry_tomatoesGeom = new THREE.SphereGeometry(0.13, 16, 10);
  const cherry_tomatoes = new THREE.InstancedMesh(cherry_tomatoesGeom, cherry_tomatoesMat, 8);
  cherry_tomatoes.name = "cherry_tomatoes";
  const tomatoData = [
    [-0.92, 1.13, 0.12, 1.00],
    [-0.52, 1.22, -0.35, 0.92],
    [-0.18, 1.16, 0.42, 0.88],
    [0.28, 1.18, -0.42, 0.95],
    [0.58, 1.14, 0.22, 0.90],
    [0.92, 1.12, -0.12, 0.88],
    [-0.42, 1.08, 0.82, 0.84],
    [0.42, 1.06, 0.82, 0.82],
  ];
  for (let i = 0; i < tomatoData.length; i++) {
    const d = tomatoData[i];
    placeInstance(cherry_tomatoes, i, [d[0], d[1], d[2]], [0, i * 0.7, 0], [d[3], d[3], d[3]]);
  }
  cherry_tomatoes.instanceMatrix.needsUpdate = true;
  salad.add(cherry_tomatoes);

  const green_peasGeom = new THREE.SphereGeometry(0.085, 14, 8);
  const green_peas = new THREE.InstancedMesh(green_peasGeom, green_peasMat, 14);
  green_peas.name = "green_peas";
  const peaPositions = [
    [-0.72, 1.12, 0.52], [-0.48, 1.18, 0.18], [-0.22, 1.10, 0.62],
    [0.05, 1.16, 0.48], [0.32, 1.12, 0.58], [0.55, 1.16, 0.28],
    [0.78, 1.10, 0.52], [-0.82, 1.16, -0.22], [-0.52, 1.12, -0.52],
    [-0.12, 1.18, -0.58], [0.22, 1.12, -0.62], [0.55, 1.14, -0.48],
    [0.88, 1.10, -0.28], [-0.12, 1.22, 0.02],
  ];
  for (let i = 0; i < peaPositions.length; i++) {
    const p = peaPositions[i];
    const scale = 0.86 + 0.06 * (i % 3);
    placeInstance(green_peas, i, p, [0, i * 0.45, 0], [scale, scale, scale]);
  }
  green_peas.instanceMatrix.needsUpdate = true;
  salad.add(green_peas);

  const corn_kernelsGeom = new THREE.SphereGeometry(0.075, 12, 7);
  const corn_kernels = new THREE.InstancedMesh(corn_kernelsGeom, corn_kernelsMat, 12);
  corn_kernels.name = "corn_kernels";
  const cornPositions = [
    [-1.00, 1.08, 0.32], [-0.78, 1.18, -0.42], [-0.58, 1.10, 0.72],
    [-0.32, 1.20, 0.32], [-0.08, 1.12, -0.68], [0.12, 1.18, 0.68],
    [0.38, 1.10, -0.32], [0.58, 1.20, 0.12], [0.82, 1.12, 0.62],
    [1.02, 1.08, -0.38], [-0.18, 1.24, -0.12], [0.68, 1.16, -0.62],
  ];
  for (let i = 0; i < cornPositions.length; i++) {
    const p = cornPositions[i];
    placeInstance(corn_kernels, i, p, [0.2 * (i % 2), i * 0.6, 0], [0.85, 1.15, 0.85]);
  }
  corn_kernels.instanceMatrix.needsUpdate = true;
  salad.add(corn_kernels);

  const strawberry = new THREE.Group();
  strawberry.name = "strawberry";
  strawberry.position.set(0.02, 1.48, -0.08);
  strawberry.rotation.set(0.12, -0.18, -0.12);
  salad.add(strawberry);

  const strawberry_bodyProfile = [
    new THREE.Vector2(0.00, -0.34),
    new THREE.Vector2(0.10, -0.29),
    new THREE.Vector2(0.20, -0.18),
    new THREE.Vector2(0.25, -0.02),
    new THREE.Vector2(0.24, 0.12),
    new THREE.Vector2(0.18, 0.24),
    new THREE.Vector2(0.08, 0.30),
    new THREE.Vector2(0.00, 0.31),
  ];
  const strawberry_bodyGeom = new THREE.LatheGeometry(strawberry_bodyProfile);
  const strawberry_body = new THREE.Mesh(strawberry_bodyGeom, strawberryMat);
  strawberry_body.name = "strawberry_body";
  strawberry.add(strawberry_body);

  const strawberry_seedsGeom = new THREE.SphereGeometry(1, 8, 5);
  const strawberry_seeds = new THREE.InstancedMesh(strawberry_seedsGeom, strawberry_seedsMat, 24);
  strawberry_seeds.name = "strawberry_seeds";
  const strawberrySeedLevels = [
    [-0.20, 0.17],
    [-0.08, 0.24],
    [0.05, 0.24],
    [0.17, 0.19],
  ];
  let strawberrySeedIndex = 0;
  for (let level = 0; level < strawberrySeedLevels.length; level++) {
    const y = strawberrySeedLevels[level][0];
    const radius = strawberrySeedLevels[level][1];
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2 + level * 0.32;
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      placeInstance(
        strawberry_seeds,
        strawberrySeedIndex++,
        [normal.x * (radius + 0.008), y, normal.z * (radius + 0.008)],
        [0, Math.PI / 2 - angle, 0],
        [0.014, 0.027, 0.008]
      );
    }
  }
  strawberry_seeds.instanceMatrix.needsUpdate = true;
  strawberry.add(strawberry_seeds);

  const strawberry_calyxGeom = createLeafGeometry();
  const strawberry_calyx = new THREE.InstancedMesh(strawberry_calyxGeom, cilantro_leavesMat, 5);
  strawberry_calyx.name = "strawberry_calyx";
  const upwardQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );
  for (let i = 0; i < 5; i++) {
    const angle = i / 5 * Math.PI * 2;
    const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    instance_dummy.position.set(0, 0.285, 0);
    instance_dummy.quaternion.copy(spin).multiply(upwardQuaternion);
    instance_dummy.scale.set(0.42, 0.42, 0.42);
    instance_dummy.updateMatrix();
    strawberry_calyx.setMatrixAt(i, instance_dummy.matrix);
  }
  strawberry_calyx.instanceMatrix.needsUpdate = true;
  strawberry.add(strawberry_calyx);

  const cilantro = new THREE.Group();
  cilantro.name = "cilantro";
  salad.add(cilantro);

  const cilantro_stemsGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const cilantro_stems = new THREE.InstancedMesh(cilantro_stemsGeom, cilantro_stemsMat, 7);
  cilantro_stems.name = "cilantro_stems";
  const stemBase = new THREE.Vector3(-0.08, 1.30, 0.02);
  const stemTips = [
    [-0.52, 1.43, 0.02],
    [-0.38, 1.55, -0.08],
    [-0.22, 1.62, -0.16],
    [0.02, 1.65, -0.12],
    [0.25, 1.58, -0.04],
    [0.45, 1.47, 0.08],
    [-0.58, 1.36, 0.16],
  ];
  const yAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < stemTips.length; i++) {
    const tip = new THREE.Vector3(stemTips[i][0], stemTips[i][1], stemTips[i][2]);
    const direction = tip.clone().sub(stemBase);
    const length = direction.length();
    const midpoint = stemBase.clone().add(tip).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, direction.normalize());
    instance_dummy.position.copy(midpoint);
    instance_dummy.quaternion.copy(quaternion);
    instance_dummy.scale.set(1, length, 1);
    instance_dummy.updateMatrix();
    cilantro_stems.setMatrixAt(i, instance_dummy.matrix);
  }
  cilantro_stems.instanceMatrix.needsUpdate = true;
  cilantro.add(cilantro_stems);

  const cilantro_leavesGeom = createLeafGeometry();
  const cilantro_leaves = new THREE.InstancedMesh(cilantro_leavesGeom, cilantro_leavesMat, 14);
  cilantro_leaves.name = "cilantro_leaves";
  const cilantroLeafData = [
    [-0.52, 1.43, 0.02, -1.10, 0.88],
    [-0.43, 1.47, 0.00, -0.72, 0.78],
    [-0.38, 1.55, -0.08, -0.52, 0.82],
    [-0.29, 1.59, -0.12, -0.22, 0.74],
    [-0.22, 1.62, -0.16, 0.10, 0.78],
    [0.02, 1.65, -0.12, 0.42, 0.82],
    [0.25, 1.58, -0.04, 0.72, 0.80],
    [0.45, 1.47, 0.08, 1.05, 0.86],
    [-0.58, 1.36, 0.16, -1.35, 0.78],
    [-0.46, 1.39, 0.14, -0.92, 0.70],
    [-0.31, 1.47, -0.02, -0.38, 0.72],
    [-0.12, 1.55, -0.10, 0.02, 0.68],
    [0.14, 1.55, -0.08, 0.34, 0.72],
    [0.36, 1.45, 0.04, 0.82, 0.74],
  ];
  for (let i = 0; i < cilantroLeafData.length; i++) {
    const d = cilantroLeafData[i];
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(-1.08, 0, d[3], "XYZ")
    );
    instance_dummy.position.set(d[0], d[1], d[2]);
    instance_dummy.quaternion.copy(quaternion);
    instance_dummy.scale.set(d[4], d[4], d[4]);
    instance_dummy.updateMatrix();
    cilantro_leaves.setMatrixAt(i, instance_dummy.matrix);
  }
  cilantro_leaves.instanceMatrix.needsUpdate = true;
  cilantro.add(cilantro_leaves);

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
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}