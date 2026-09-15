export default function generate(THREE) {
  const root = new THREE.Group();
  const crystal_assembly = new THREE.Group();
  crystal_assembly.name = "crystal_assembly";
  root.add(crystal_assembly);

  const crystalRadius = 0.44;
  const lowerY = -1.18;
  const bottomY = -1.48;
  const topY = 1.18;
  const apexY = 1.78;
  const facetRotation = -Math.PI / 6;
  const facetCount = 6;

  function makeCrystalMaterial(color, opacity) {
    return new THREE.MeshPhysicalMaterial({
      color,
      transmission: 0.82,
      thickness: 0.32,
      attenuationColor: color,
      attenuationDistance: 2.4,
      reflectivity: 0.18,
      ior: 1.5,
      clearcoat: 0.45,
      clearcoatRoughness: 0.08,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [120, 720],
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
      flatShading: true
    });
  }

  const crystal_bodyMat = [
    makeCrystalMaterial(0xf7ffff, 0.50),
    makeCrystalMaterial(0xdcefff, 0.52),
    makeCrystalMaterial(0xe8dcff, 0.50),
    makeCrystalMaterial(0xffe5dc, 0.48),
    makeCrystalMaterial(0xdaffef, 0.52),
    makeCrystalMaterial(0xe3dcff, 0.50)
  ];

  const top_pointMat = [
    makeCrystalMaterial(0xfaffff, 0.45),
    makeCrystalMaterial(0xd6f8ff, 0.48),
    makeCrystalMaterial(0xecd9ff, 0.47),
    makeCrystalMaterial(0xffe4d8, 0.45),
    makeCrystalMaterial(0xd7fff0, 0.48),
    makeCrystalMaterial(0xe0d7ff, 0.47)
  ];

  const base_facetMat = [
    makeCrystalMaterial(0xfff7e8, 0.52),
    makeCrystalMaterial(0xdcefff, 0.54),
    makeCrystalMaterial(0xe5dcff, 0.52),
    makeCrystalMaterial(0xffe3d7, 0.50),
    makeCrystalMaterial(0xd8fff0, 0.54),
    makeCrystalMaterial(0xe2d8ff, 0.52)
  ];

  const internal_rainbowMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.27,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });

  const fractureMat = new THREE.MeshBasicMaterial({
    color: 0xfff5d6,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });

  const fracture_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const mineral_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x625d50,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });

  const crystal_bodyPositions = [];
  const crystal_bodyUpper = [];
  const crystal_bodyLower = [];
  const top_pointPositions = [];
  const top_pointUpper = [];
  const top_pointLower = [];
  const base_facetPositions = [];
  const base_facetUpper = [];
  const base_facetLower = [];

  for (let i = 0; i < facetCount; i++) {
    const a0 = facetRotation + i * Math.PI * 2 / facetCount;
    const a1 = facetRotation + (i + 1) * Math.PI * 2 / facetCount;
    const top0 = new THREE.Vector3(Math.sin(a0) * crystalRadius, topY, Math.cos(a0) * crystalRadius);
    const top1 = new THREE.Vector3(Math.sin(a1) * crystalRadius, topY, Math.cos(a1) * crystalRadius);
    const bottom0 = new THREE.Vector3(Math.sin(a0) * crystalRadius, lowerY, Math.cos(a0) * crystalRadius);
    const bottom1 = new THREE.Vector3(Math.sin(a1) * crystalRadius, lowerY, Math.cos(a1) * crystalRadius);
    const foot0 = new THREE.Vector3(Math.sin(a0) * crystalRadius * 0.88, bottomY, Math.cos(a0) * crystalRadius * 0.88);
    const foot1 = new THREE.Vector3(Math.sin(a1) * crystalRadius * 0.88, bottomY, Math.cos(a1) * crystalRadius * 0.88);

    crystal_bodyPositions.push(
      top0.x, top0.y, top0.z,
      top1.x, top1.y, top1.z,
      bottom1.x, bottom1.y, bottom1.z,
      top0.x, top0.y, top0.z,
      bottom1.x, bottom1.y, bottom1.z,
      bottom0.x, bottom0.y, bottom0.z
    );
    crystal_bodyUpper.push(top0, top1);
    crystal_bodyLower.push(bottom1, bottom0);

    top_pointPositions.push(
      0, apexY, 0,
      top0.x, top0.y, top0.z,
      top1.x, top1.y, top1.z
    );
    top_pointUpper.push(top0, top1);
    top_pointLower.push(top1, top0);

    base_facetPositions.push(
      foot0.x, foot0.y, foot0.z,
      foot1.x, foot1.y, foot1.z,
      bottom1.x, bottom1.y, bottom1.z,
      foot0.x, foot0.y, foot0.z,
      bottom1.x, bottom1.y, bottom1.z,
      bottom0.x, bottom0.y, bottom0.z
    );
    base_facetUpper.push(foot0, foot1);
    base_facetLower.push(bottom1, bottom0);
  }

  const crystal_bodyGeom = new THREE.BufferGeometry();
  crystal_bodyGeom.setAttribute("position", new THREE.Float32BufferAttribute(crystal_bodyPositions, 3));
  crystal_bodyGeom.computeVertexNormals();
  for (let i = 0; i < facetCount; i++) {
    crystal_bodyGeom.addGroup(i * 6, 6, i);
  }
  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.name = "crystal_body";
  crystal_body.renderOrder = 1;
  crystal_assembly.add(crystal_body);

  const top_pointGeom = new THREE.BufferGeometry();
  top_pointGeom.setAttribute("position", new THREE.Float32BufferAttribute(top_pointPositions, 3));
  top_pointGeom.computeVertexNormals();
  for (let i = 0; i < facetCount; i++) {
    top_pointGeom.addGroup(i * 3, 3, i);
  }
  const top_point = new THREE.Mesh(top_pointGeom, top_pointMat);
  top_point.name = "top_point";
  top_point.renderOrder = 1;
  crystal_assembly.add(top_point);

  const base_facetGeom = new THREE.BufferGeometry();
  base_facetGeom.setAttribute("position", new THREE.Float32BufferAttribute(base_facetPositions, 3));
  base_facetGeom.computeVertexNormals();
  for (let i = 0; i < facetCount; i++) {
    base_facetGeom.addGroup(i * 6, 6, i);
  }
  const base_facet = new THREE.Mesh(base_facetGeom, base_facetMat);
  base_facet.name = "base_facet";
  base_facet.renderOrder = 1;
  crystal_assembly.add(base_facet);

  const internal_rainbowPositions = [];
  const internal_rainbowColors = [];
  const rainbowPalette = [
    0x72f5ff, 0x67c8ff, 0x9692ff, 0xff92c2,
    0xffc47a, 0xffef7d, 0x82ffad, 0x67f2e8
  ];
  const rainbowCenterX = 0.015;
  const rainbowCenterZ = 0.018;
  const rainbowRingCount = 8;
  const rainbowSegments = 36;

  function addRainbowTriangle(a, b, c, colorValue) {
    internal_rainbowPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = new THREE.Color(colorValue);
    for (let i = 0; i < 3; i++) {
      internal_rainbowColors.push(color.r, color.g, color.b);
    }
  }

  for (let ring = 0; ring < rainbowRingCount; ring++) {
    const t0 = ring / rainbowRingCount;
    const t1 = (ring + 1) / rainbowRingCount;
    const radius0 = 0.025 + t0 * 0.315;
    const radius1 = 0.025 + t1 * 0.315;
    const y0 = -0.96 + t0 * 1.92;
    const y1 = -0.96 + t1 * 1.92;

    for (let i = 0; i < rainbowSegments; i++) {
      const angle0 = i * Math.PI * 2 / rainbowSegments;
      const angle1 = (i + 1) * Math.PI * 2 / rainbowSegments;
      const p00 = new THREE.Vector3(
        rainbowCenterX + Math.cos(angle0) * radius0,
        y0,
        rainbowCenterZ + Math.sin(angle0) * radius0
      );
      const p10 = new THREE.Vector3(
        rainbowCenterX + Math.cos(angle0) * radius1,
        y1,
        rainbowCenterZ + Math.sin(angle0) * radius1
      );
      const p11 = new THREE.Vector3(
        rainbowCenterX + Math.cos(angle1) * radius1,
        y1,
        rainbowCenterZ + Math.sin(angle1) * radius1
      );
      const p01 = new THREE.Vector3(
        rainbowCenterX + Math.cos(angle1) * radius0,
        y0,
        rainbowCenterZ + Math.sin(angle1) * radius0
      );
      const color0 = rainbowPalette[(i + ring * 2) % rainbowPalette.length];
      const color1 = rainbowPalette[(i + ring * 2 + 1) % rainbowPalette.length];

      if (ring === 0) {
        addRainbowTriangle(p00, p10, p11, color0);
      } else {
        addRainbowTriangle(p00, p10, p11, color0);
        addRainbowTriangle(p00, p11, p01, color1);
      }
    }
  }

  const internal_rainbowGeom = new THREE.BufferGeometry();
  internal_rainbowGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(internal_rainbowPositions, 3)
  );
  internal_rainbowGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(internal_rainbowColors, 3)
  );
  internal_rainbowGeom.computeVertexNormals();
  const internal_rainbow = new THREE.Mesh(internal_rainbowGeom, internal_rainbowMat);
  internal_rainbow.name = "internal_rainbow";
  internal_rainbow.renderOrder = 0;
  crystal_assembly.add(internal_rainbow);

  const fracture_lightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.31, -0.73, 0.18),
    new THREE.Vector3(-0.23, -0.48, 0.22),
    new THREE.Vector3(-0.08, -0.20, 0.24),
    new THREE.Vector3(0.03, 0.04, 0.22),
    new THREE.Vector3(0.18, 0.31, 0.17),
    new THREE.Vector3(0.29, 0.58, 0.09)
  ], false, "centripetal");
  const fracture_lightGeom = new THREE.TubeGeometry(fracture_lightPath, 32, 0.006, 5, false);
  const fracture_light = new THREE.Mesh(fracture_lightGeom, fractureMat);
  fracture_light.name = "fracture_light";
  fracture_light.renderOrder = 3;
  crystal_assembly.add(fracture_light);

  const fracture_darkPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.28, -0.70, 0.15),
    new THREE.Vector3(-0.19, -0.43, 0.19),
    new THREE.Vector3(-0.03, -0.15, 0.21),
    new THREE.Vector3(0.09, 0.10, 0.18),
    new THREE.Vector3(0.22, 0.36, 0.12)
  ], false, "centripetal");
  const fracture_darkGeom = new THREE.TubeGeometry(fracture_darkPath, 28, 0.0035, 5, false);
  const fracture_dark = new THREE.Mesh(fracture_darkGeom, mineral_inclusionsMat);
  fracture_dark.name = "fracture_dark";
  fracture_dark.renderOrder = 3;
  crystal_assembly.add(fracture_dark);

  const fracture_branchPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.04, -0.16, 0.21),
    new THREE.Vector3(0.05, -0.08, 0.20),
    new THREE.Vector3(0.16, -0.02, 0.16),
    new THREE.Vector3(0.27, 0.03, 0.09)
  ], false, "centripetal");
  const fracture_branchGeom = new THREE.TubeGeometry(fracture_branchPath, 18, 0.003, 5, false);
  const fracture_branch = new THREE.Mesh(fracture_branchGeom, fractureMat);
  fracture_branch.name = "fracture_branch";
  fracture_branch.renderOrder = 3;
  crystal_assembly.add(fracture_branch);

  const lower_fracturePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.29, -0.96, 0.10),
    new THREE.Vector3(-0.16, -0.88, 0.17),
    new THREE.Vector3(0.00, -0.84, 0.20),
    new THREE.Vector3(0.16, -0.87, 0.16),
    new THREE.Vector3(0.28, -0.82, 0.08)
  ], false, "centripetal");
  const lower_fractureGeom = new THREE.TubeGeometry(lower_fracturePath, 24, 0.0035, 5, false);
  const lower_fracture = new THREE.Mesh(lower_fractureGeom, fracture_highlightMat);
  lower_fracture.name = "lower_fracture";
  lower_fracture.renderOrder = 3;
  crystal_assembly.add(lower_fracture);

  const upper_fracturePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.27, 0.43, 0.11),
    new THREE.Vector3(-0.18, 0.50, 0.17),
    new THREE.Vector3(-0.07, 0.55, 0.20),
    new THREE.Vector3(0.05, 0.53, 0.19),
    new THREE.Vector3(0.16, 0.47, 0.14)
  ], false, "centripetal");
  const upper_fractureGeom = new THREE.TubeGeometry(upper_fracturePath, 20, 0.0028, 5, false);
  const upper_fracture = new THREE.Mesh(upper_fractureGeom, fractureMat);
  upper_fracture.name = "upper_fracture";
  upper_fracture.renderOrder = 3;
  crystal_assembly.add(upper_fracture);

  const side_fracturePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.34, -0.31, -0.03),
    new THREE.Vector3(-0.27, -0.08, 0.02),
    new THREE.Vector3(-0.24, 0.18, 0.04),
    new THREE.Vector3(-0.18, 0.42, 0.02),
    new THREE.Vector3(-0.12, 0.66, -0.02)
  ], false, "centripetal");
  const side_fractureGeom = new THREE.TubeGeometry(side_fracturePath, 24, 0.0025, 5, false);
  const side_fracture = new THREE.Mesh(side_fractureGeom, fractureMat);
  side_fracture.name = "side_fracture";
  side_fracture.renderOrder = 3;
  crystal_assembly.add(side_fracture);

  const mineral_inclusionsGeom = new THREE.TetrahedronGeometry(0.018, 0);
  const mineral_inclusions = new THREE.InstancedMesh(
    mineral_inclusionsGeom,
    mineral_inclusionsMat,
    14
  );
  mineral_inclusions.name = "mineral_inclusions";
  mineral_inclusions.renderOrder = 3;

  const inclusionData = [
    [-0.22, -0.92, 0.10, 1.2, 0.5, 0.7, 0.2, 0.4, 0.1],
    [0.18, -0.86, 0.16, 0.8, 1.4, 0.6, 0.7, 0.1, 0.3],
    [-0.08, -0.72, -0.18, 1.0, 0.7, 1.2, 0.3, 0.8, 0.2],
    [0.27, -0.58, -0.04, 0.7, 1.1, 0.8, 0.9, 0.2, 0.6],
    [-0.29, -0.42, 0.02, 1.3, 0.6, 0.8, 0.4, 0.9, 0.1],
    [0.10, -0.31, 0.20, 0.9, 1.5, 0.7, 0.2, 0.5, 0.8],
    [-0.18, -0.08, 0.16, 1.1, 0.8, 1.0, 0.6, 0.3, 0.7],
    [0.24, 0.08, 0.10, 0.8, 1.2, 0.9, 0.8, 0.6, 0.2],
    [-0.05, 0.22, -0.20, 1.2, 0.7, 0.8, 0.3, 0.7, 0.4],
    [0.19, 0.39, 0.15, 0.7, 1.4, 0.8, 0.5, 0.2, 0.9],
    [-0.25, 0.52, 0.03, 1.0, 0.8, 1.1, 0.7, 0.4, 0.2],
    [0.06, 0.67, 0.18, 0.8, 1.3, 0.7, 0.2, 0.8, 0.3],
    [-0.15, 0.82, -0.08, 1.1, 0.7, 0.9, 0.6, 0.3, 0.8],
    [0.17, -0.98, -0.10, 0.9, 1.2, 0.7, 0.4, 0.7, 0.2]
  ];

  const inclusionDummy = new THREE.Object3D();
  for (let i = 0; i < inclusionData.length; i++) {
    const d = inclusionData[i];
    inclusionDummy.position.set(d[0], d[1], d[2]);
    inclusionDummy.scale.set(d[3], d[4], d[5]);
    inclusionDummy.rotation.set(d[6], d[7], d[8]);
    inclusionDummy.updateMatrix();
    mineral_inclusions.setMatrixAt(i, inclusionDummy.matrix);
  }
  mineral_inclusions.instanceMatrix.needsUpdate = true;
  crystal_assembly.add(mineral_inclusions);

  const edgeOffset = facetRotation + Math.PI / 6;
  const edgeX = Math.sin(edgeOffset) * crystalRadius;
  const edgeZ = Math.cos(edgeOffset) * crystalRadius;

  const left_facet_edgePath = new THREE.LineCurve3(
    new THREE.Vector3(-edgeX, lowerY, edgeZ),
    new THREE.Vector3(-edgeX, topY, edgeZ)
  );
  const left_facet_edgeGeom = new THREE.TubeGeometry(left_facet_edgePath, 1, 0.0022, 5, false);
  const left_facet_edge = new THREE.Mesh(left_facet_edgeGeom, fractureMat);
  left_facet_edge.name = "left_facet_edge";
  left_facet_edge.renderOrder = 3;
  crystal_assembly.add(left_facet_edge);

  const right_facet_edgePath = new THREE.LineCurve3(
    new THREE.Vector3(edgeX, lowerY, edgeZ),
    new THREE.Vector3(edgeX, topY, edgeZ)
  );
  const right_facet_edgeGeom = new THREE.TubeGeometry(right_facet_edgePath, 1, 0.0022, 5, false);
  const right_facet_edge = new THREE.Mesh(right_facet_edgeGeom, fractureMat);
  right_facet_edge.name = "right_facet_edge";
  right_facet_edge.renderOrder = 3;
  crystal_assembly.add(right_facet_edge);

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