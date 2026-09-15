export default function generate(THREE) {
  const root = new THREE.Group();
  const stone_group = new THREE.Group();
  const hardware_group = new THREE.Group();
  root.add(stone_group, hardware_group);

  function makeOpalTexture(THREE) {
    const size = 128;
    const data = new Uint8Array(size * size * 4);
    const palette = [
      [30, 255, 220],
      [50, 150, 255],
      [220, 80, 255],
      [255, 110, 245],
      [255, 235, 55],
      [255, 125, 45],
      [75, 255, 125],
      [125, 210, 255]
    ];

    for (let y = 0; y < size; y++) {
      const v = y / (size - 1);
      for (let x = 0; x < size; x++) {
        const u = x / (size - 1);
        const warpedU = u + 0.055 * Math.sin(v * 13 + Math.sin(u * 8));
        const warpedV = v + 0.045 * Math.sin(u * 15 - v * 5);
        const broad =
          Math.sin(warpedU * 12 + warpedV * 5) +
          0.7 * Math.sin(warpedU * 5 - warpedV * 17) +
          0.45 * Math.cos((warpedU + warpedV) * 23);

        let colorIndex = Math.floor((broad + 3.2) * 2.15) % palette.length;
        if (colorIndex < 0) colorIndex = 0;

        const baseColor = palette[colorIndex];
        const grain =
          0.82 +
          0.12 * Math.sin(x * 0.73 + y * 1.17) +
          0.06 * Math.cos(x * 1.31 - y * 0.47);
        const edgeFade = Math.min(1, u * 8, (1 - u) * 8, v * 10, (1 - v) * 10);
        const intensity = Math.max(0.45, grain * edgeFade);
        const milky = 0.5 + 0.5 * Math.sin(u * 9 - v * 7 + Math.sin(v * 11));

        const index = (y * size + x) * 4;
        data[index] = Math.min(255, Math.floor(232 + (baseColor[0] - 232) * intensity * milky));
        data[index + 1] = Math.min(255, Math.floor(235 + (baseColor[1] - 235) * intensity * milky));
        data[index + 2] = Math.min(255, Math.floor(232 + (baseColor[2] - 232) * intensity * milky));
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, size, size);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  const opal_texture = makeOpalTexture(THREE);

  const opal_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f6f3,
    map: opal_texture,
    emissive: 0xf4f6f3,
    emissiveMap: opal_texture,
    emissiveIntensity: 0.28,
    metalness: 0.0,
    roughness: 0.22,
    transmission: 0.32,
    thickness: 0.35,
    attenuationColor: 0xe8ffff,
    attenuationDistance: 1.8,
    ior: 1.45,
    clearcoat: 0.55,
    clearcoatRoughness: 0.18,
    sheen: 0.35,
    sheenColor: 0xe8ffff,
    sheenRoughness: 0.45,
    iridescence: 0.65,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 420],
    side: THREE.DoubleSide
  });

  const opal_bodyShape = new THREE.Shape();
  opal_bodyShape.moveTo(-0.075, 0.58);
  opal_bodyShape.bezierCurveTo(-0.035, 0.66, 0.035, 0.66, 0.075, 0.58);
  opal_bodyShape.bezierCurveTo(0.34, 0.20, 0.66, -0.28, 0.96, -0.70);
  opal_bodyShape.bezierCurveTo(1.04, -0.82, 0.96, -0.91, 0.82, -0.92);
  opal_bodyShape.bezierCurveTo(0.30, -0.94, -0.30, -0.94, -0.82, -0.92);
  opal_bodyShape.bezierCurveTo(-0.96, -0.91, -1.04, -0.82, -0.96, -0.70);
  opal_bodyShape.bezierCurveTo(-0.66, -0.28, -0.34, 0.20, -0.075, 0.58);
  opal_bodyShape.closePath();

  const opal_bodyGeom = new THREE.ExtrudeGeometry(opal_bodyShape, {
    curveSegments: 28,
    steps: 1,
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.065,
    bevelOffset: 0,
    bevelSegments: 7
  });
  opal_bodyGeom.translate(0, 0, -0.07);
  opal_bodyGeom.computeVertexNormals();

  const opal_body = new THREE.Mesh(opal_bodyGeom, opal_bodyMat);
  stone_group.add(opal_body);

  const opal_front_glazeMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.16,
    transmission: 0.22,
    thickness: 0.12,
    ior: 1.45,
    clearcoat: 0.7,
    clearcoatRoughness: 0.12,
    iridescence: 0.5,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 380],
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    side: THREE.FrontSide
  });
  const opal_front_glazeGeom = new THREE.ShapeGeometry(opal_bodyShape, 28);
  const opal_front_glaze = new THREE.Mesh(opal_front_glazeGeom, opal_front_glazeMat);
  opal_front_glaze.scale.set(0.965, 0.965, 1);
  opal_front_glaze.position.z = 0.13;
  stone_group.add(opal_front_glaze);

  const opal_inclusionGeom = new THREE.CircleGeometry(1, 14);

  function makeInclusionMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.55,
      metalness: 0.0,
      roughness: 0.45,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      side: THREE.FrontSide
    });
  }

  function createInclusions(THREE, material, colorIndex, count) {
    const inclusions = new THREE.InstancedMesh(opal_inclusionGeom, material, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const halfWidth = 0.075 + 0.885 * t;
      const centerX = 0.012 * Math.sin(i * 2.37 + colorIndex * 0.81);
      const spread = Math.sqrt(Math.max(0, 1 - t * t));
      const lateral = Math.sin((i + 1) * (1.73 + colorIndex * 0.11) + colorIndex * 1.91);
      const x = centerX + lateral * halfWidth * 0.82;
      const y = -0.80 + t * 1.30 + 0.018 * Math.cos(i * 1.41 + colorIndex);
      const size = 0.012 + 0.027 * (0.5 + 0.5 * Math.sin(i * 2.19 + colorIndex * 1.37));
      const stretch = 1.0 + 1.6 * (0.5 + 0.5 * Math.cos(i * 1.13 + colorIndex * 0.73));

      dummy.position.set(x, y, 0.134 + colorIndex * 0.0003);
      dummy.rotation.set(0, 0, i * 0.91 + colorIndex * 0.67);
      dummy.scale.set(size * stretch, size * (0.55 + 0.35 * Math.sin(i * 0.83)), 1);
      dummy.updateMatrix();
      inclusions.setMatrixAt(i, dummy.matrix);
    }

    inclusions.instanceMatrix.needsUpdate = true;
    stone_group.add(inclusions);
    return inclusions;
  }

  const cyan_inclusionsMat = makeInclusionMaterial(0x22f5e1);
  const blue_inclusionsMat = makeInclusionMaterial(0x348cff);
  const magenta_inclusionsMat = makeInclusionMaterial(0xe44dff);
  const pink_inclusionsMat = makeInclusionMaterial(0xff65c8);
  const yellow_inclusionsMat = makeInclusionMaterial(0xffe83a);
  const orange_inclusionsMat = makeInclusionMaterial(0xff7b31);
  const green_inclusionsMat = makeInclusionMaterial(0x42ff72);

  const cyan_inclusions = createInclusions(THREE, cyan_inclusionsMat, 0, 18);
  const blue_inclusions = createInclusions(THREE, blue_inclusionsMat, 1, 18);
  const magenta_inclusions = createInclusions(THREE, magenta_inclusionsMat, 2, 18);
  const pink_inclusions = createInclusions(THREE, pink_inclusionsMat, 3, 18);
  const yellow_inclusions = createInclusions(THREE, yellow_inclusionsMat, 4, 18);
  const orange_inclusions = createInclusions(THREE, orange_inclusionsMat, 5, 18);
  const green_inclusions = createInclusions(THREE, green_inclusionsMat, 6, 18);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    metalness: 0.6,
    roughness: 0.2
  });

  const jump_ringGeom = new THREE.TorusGeometry(0.145, 0.035, 16, 48);
  const jump_ring = new THREE.Mesh(jump_ringGeom, silverMat);
  jump_ring.position.set(0, 0.68, -0.015);
  hardware_group.add(jump_ring);

  const bailShape = new THREE.Shape();
  bailShape.moveTo(-0.17, 1.18);
  bailShape.bezierCurveTo(-0.19, 1.20, -0.15, 1.23, -0.09, 1.23);
  bailShape.bezierCurveTo(-0.03, 1.24, 0.03, 1.24, 0.09, 1.23);
  bailShape.bezierCurveTo(0.15, 1.23, 0.19, 1.20, 0.17, 1.18);
  bailShape.bezierCurveTo(0.14, 1.03, 0.085, 0.82, 0.055, 0.72);
  bailShape.bezierCurveTo(0.04, 0.67, -0.04, 0.67, -0.055, 0.72);
  bailShape.bezierCurveTo(-0.085, 0.82, -0.14, 1.03, -0.17, 1.18);
  bailShape.closePath();

  const bailHole = new THREE.Path();
  bailHole.moveTo(-0.105, 1.14);
  bailHole.bezierCurveTo(-0.085, 1.03, -0.045, 0.86, -0.025, 0.79);
  bailHole.bezierCurveTo(-0.012, 0.75, 0.012, 0.75, 0.025, 0.79);
  bailHole.bezierCurveTo(0.045, 0.86, 0.085, 1.03, 0.105, 1.14);
  bailHole.bezierCurveTo(0.06, 1.17, -0.06, 1.17, -0.105, 1.14);
  bailHole.closePath();
  bailShape.holes.push(bailHole);

  const bailGeom = new THREE.ExtrudeGeometry(bailShape, {
    curveSegments: 24,
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.018,
    bevelOffset: 0,
    bevelSegments: 5
  });
  bailGeom.translate(0, 0, -0.05);
  bailGeom.computeVertexNormals();

  const bail = new THREE.Mesh(bailGeom, silverMat);
  bail.position.z = 0.025;
  hardware_group.add(bail);

  const bail_inner_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x454545,
    metalness: 0.3,
    roughness: 0.45,
    side: THREE.DoubleSide
  });
  const bail_inner_shadowShape = new THREE.Shape();
  bail_inner_shadowShape.moveTo(-0.105, 1.14);
  bail_inner_shadowShape.bezierCurveTo(-0.085, 1.03, -0.045, 0.86, -0.025, 0.79);
  bail_inner_shadowShape.bezierCurveTo(-0.012, 0.75, 0.012, 0.75, 0.025, 0.79);
  bail_inner_shadowShape.bezierCurveTo(0.045, 0.86, 0.085, 1.03, 0.105, 1.14);
  bail_inner_shadowShape.bezierCurveTo(0.06, 1.17, -0.06, 1.17, -0.105, 1.14);
  bail_inner_shadowShape.closePath();
  const bail_inner_shadowGeom = new THREE.ShapeGeometry(bail_inner_shadowShape, 20);
  const bail_inner_shadow = new THREE.Mesh(bail_inner_shadowGeom, bail_inner_shadowMat);
  bail_inner_shadow.position.z = -0.055;
  hardware_group.add(bail_inner_shadow);

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