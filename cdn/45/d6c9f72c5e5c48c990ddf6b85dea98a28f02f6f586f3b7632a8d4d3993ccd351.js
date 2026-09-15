export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "illuminated_crystal_tower";

  const outer_shell = new THREE.Group();
  outer_shell.name = "outer_shell";
  root.add(outer_shell);

  const crystal_assembly = new THREE.Group();
  crystal_assembly.name = "crystal_assembly";
  root.add(crystal_assembly);

  const outer_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eef2,
    metalness: 0.0,
    roughness: 0.48,
    transmission: 0.72,
    thickness: 0.18,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const upper_windowMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1f7fa,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.82,
    thickness: 0.12,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const conical_roofMat = new THREE.MeshPhysicalMaterial({
    color: 0xcddced,
    metalness: 0.0,
    roughness: 0.38,
    transmission: 0.76,
    thickness: 0.1,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xb9d8e8,
    metalness: 0.0,
    roughness: 0.55,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const bottom_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd8e8ef,
    metalness: 0.0,
    roughness: 0.6,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });

  const outer_bodyProfile = [
    new THREE.Vector3(-0.50, 0.02, 0),
    new THREE.Vector3(-0.57, 0.055, 0),
    new THREE.Vector3(-0.60, 0.13, 0),
    new THREE.Vector3(-0.60, 2.72, 0),
    new THREE.Vector3(-0.585, 2.80, 0),
    new THREE.Vector3(-0.50, 2.84, 0),
    new THREE.Vector3(0.50, 2.84, 0),
    new THREE.Vector3(0.585, 2.80, 0),
    new THREE.Vector3(0.60, 2.72, 0),
    new THREE.Vector3(0.60, 0.13, 0),
    new THREE.Vector3(0.57, 0.055, 0),
    new THREE.Vector3(0.50, 0.02, 0)
  ];
  const outer_bodyFaces = [];
  for (let i = 0; i < outer_bodyProfile.length; i++) {
    const next = (i + 1) % outer_bodyProfile.length;
    outer_bodyFaces.push([i, next]);
  }
  const outer_bodyIndexedGeom = new THREE.BufferGeometry().setFromPoints(
    outer_bodyProfile
  );
  outer_bodyIndexedGeom.setIndex(outer_bodyFaces);
  const outer_bodyGeom = outer_bodyIndexedGeom.toNonIndexed();
  outer_bodyGeom.computeVertexNormals();

  const outer_body = new THREE.Mesh(outer_bodyGeom, outer_bodyMat);
  outer_body.name = "outer_body";
  outer_body.renderOrder = 5;
  outer_shell.add(outer_body);

  const upper_windowGeom = new THREE.CylinderGeometry(
    0.592,
    0.592,
    1.95,
    64,
    1,
    true
  );
  const upper_window = new THREE.Mesh(upper_windowGeom, upper_windowMat);
  upper_window.name = "upper_window";
  upper_window.position.y = 1.825;
  upper_window.renderOrder = 6;
  outer_shell.add(upper_window);

  const conical_roofGeom = new THREE.ConeGeometry(0.6, 0.66, 64, 1, false);
  const conical_roof = new THREE.Mesh(conical_roofGeom, conical_roofMat);
  conical_roof.name = "conical_roof";
  conical_roof.position.y = 3.17;
  conical_roof.renderOrder = 6;
  outer_shell.add(conical_roof);

  const seam_ringGeom = new THREE.TorusGeometry(0.588, 0.009, 8, 64);
  const seam_ring = new THREE.Mesh(seam_ringGeom, seamMat);
  seam_ring.name = "seam_ring";
  seam_ring.rotation.x = Math.PI / 2;
  seam_ring.position.y = 2.84;
  seam_ring.renderOrder = 7;
  outer_shell.add(seam_ring);

  const roof_base_ringGeom = new THREE.TorusGeometry(0.59, 0.007, 8, 64);
  const roof_base_ring = new THREE.Mesh(roof_base_ringGeom, seamMat);
  roof_base_ring.name = "roof_base_ring";
  roof_base_ring.rotation.x = Math.PI / 2;
  roof_base_ring.position.y = 2.842;
  roof_base_ring.renderOrder = 7;
  outer_shell.add(roof_base_ring);

  const bottom_edgeGeom = new THREE.TorusGeometry(0.555, 0.008, 8, 64);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, bottom_edgeMat);
  bottom_edge.name = "bottom_edge";
  bottom_edge.rotation.x = Math.PI / 2;
  bottom_edge.position.y = 0.035;
  bottom_edge.renderOrder = 7;
  outer_shell.add(bottom_edge);

  const crystal_haloMat = new THREE.MeshBasicMaterial({
    color: 0x16dfff,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const crystal_haloGeom = new THREE.CircleGeometry(0.48, 48);
  const crystal_halo = new THREE.Mesh(crystal_haloGeom, crystal_haloMat);
  crystal_halo.name = "crystal_halo";
  crystal_halo.position.set(0, 1.78, 0.08);
  crystal_halo.scale.set(0.82, 1.35, 1);
  crystal_halo.renderOrder = 1;
  crystal_assembly.add(crystal_halo);

  const crystal_auraMat = new THREE.MeshBasicMaterial({
    color: 0x20e8ff,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const crystal_auraGeom = new THREE.CircleGeometry(0.36, 48);
  const crystal_aura = new THREE.Mesh(crystal_auraGeom, crystal_auraMat);
  crystal_aura.name = "crystal_aura";
  crystal_aura.position.set(0, 1.72, 0.1);
  crystal_aura.scale.set(0.78, 1.45, 1);
  crystal_aura.renderOrder = 1;
  crystal_assembly.add(crystal_aura);

  const light_columnMat = new THREE.MeshBasicMaterial({
    color: 0x28cfff,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const light_columnGeom = new THREE.CylinderGeometry(
    0.13,
    0.18,
    1.35,
    32,
    1,
    true
  );
  const light_column = new THREE.Mesh(light_columnGeom, light_columnMat);
  light_column.name = "light_column";
  light_column.position.y = 2.08;
  light_column.renderOrder = 1;
  crystal_assembly.add(light_column);

  const light_coreMat = new THREE.MeshStandardMaterial({
    color: 0xe9ffff,
    metalness: 0.0,
    roughness: 0.25,
    emissive: 0xe9ffff,
    emissiveIntensity: 1.0
  });
  const light_coreGeom = new THREE.SphereGeometry(0.16, 24, 16);
  const light_core = new THREE.Mesh(light_coreGeom, light_coreMat);
  light_core.name = "light_core";
  light_core.position.set(0, 1.39, 0.045);
  light_core.scale.set(0.9, 1.25, 0.75);
  light_core.renderOrder = 2;
  crystal_assembly.add(light_core);

  const light_baseMat = new THREE.MeshStandardMaterial({
    color: 0x39eaff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x39eaff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.82
  });
  const light_baseGeom = new THREE.CylinderGeometry(0.22, 0.25, 0.1, 32);
  const light_base = new THREE.Mesh(light_baseGeom, light_baseMat);
  light_base.name = "light_base";
  light_base.position.y = 1.25;
  light_base.renderOrder = 2;
  crystal_assembly.add(light_base);

  const top_lightMat = new THREE.MeshStandardMaterial({
    color: 0x20dfff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x20dfff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.86
  });
  const top_lightGeom = new THREE.SphereGeometry(0.16, 24, 16);
  const top_light = new THREE.Mesh(top_lightGeom, top_lightMat);
  top_light.name = "top_light";
  top_light.position.set(0, 2.96, 0.04);
  top_light.scale.set(1.0, 0.42, 0.8);
  top_light.renderOrder = 2;
  crystal_assembly.add(top_light);

  const top_light_coreMat = new THREE.MeshStandardMaterial({
    color: 0xbffeff,
    metalness: 0.0,
    roughness: 0.25,
    emissive: 0xbffeff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.8
  });
  const top_light_coreGeom = new THREE.SphereGeometry(0.085, 20, 12);
  const top_light_core = new THREE.Mesh(top_light_coreGeom, top_light_coreMat);
  top_light_core.name = "top_light_core";
  top_light_core.position.set(0, 2.965, 0.07);
  top_light_core.scale.set(1.0, 0.35, 0.75);
  top_light_core.renderOrder = 2;
  crystal_assembly.add(top_light_core);

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x79d9ff,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.58,
    thickness: 0.38,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const crystal_frontMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9f2ff,
    metalness: 0.0,
    roughness: 0.16,
    transmission: 0.62,
    thickness: 0.3,
    ior: 1.5,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const crystal_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x29bdefff,
    metalness: 0.0,
    roughness: 0.2,
    transmission: 0.48,
    thickness: 0.32,
    ior: 1.5,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const crystalOutline = [
    new THREE.Vector3(0.0, 2.62, 0.02),
    new THREE.Vector3(0.27, 2.31, 0.02),
    new THREE.Vector3(0.39, 1.91, 0.02),
    new THREE.Vector3(0.31, 1.62, 0.02),
    new THREE.Vector3(0.17, 1.43, 0.02),
    new THREE.Vector3(0.08, 1.18, 0.02),
    new THREE.Vector3(-0.08, 1.22, 0.02),
    new THREE.Vector3(-0.25, 1.48, 0.02),
    new THREE.Vector3(-0.38, 1.82, 0.02),
    new THREE.Vector3(-0.31, 2.18, 0.02)
  ];

  const crystalFrontCenter = new THREE.Vector3(-0.015, 1.91, 0.245);
  const crystalBackCenter = new THREE.Vector3(0.015, 1.9, -0.17);
  const crystalPositions = [];
  const crystalGroups = [];

  function pushCrystalTriangle(a, b, c, materialIndex) {
    const start = crystalPositions.length / 3;
    crystalPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    crystalGroups.push([start, 3, materialIndex]);
  }

  for (let i = 0; i < crystalOutline.length; i++) {
    const next = (i + 1) % crystalOutline.length;
    pushCrystalTriangle(
      crystalFrontCenter,
      crystalOutline[i],
      crystalOutline[next],
      i % 3 === 0 ? 1 : 0
    );
  }

  for (let i = 0; i < crystalOutline.length; i++) {
    const next = (i + 1) % crystalOutline.length;
    pushCrystalTriangle(
      crystalBackCenter,
      crystalOutline[next],
      crystalOutline[i],
      i % 2 === 0 ? 2 : 0
    );
  }

  for (let i = 0; i < crystalOutline.length; i++) {
    const next = (i + 1) % crystalOutline.length;
    pushCrystalTriangle(
      crystalOutline[i],
      crystalOutline[next],
      crystalOutline[next],
      2
    );
    pushCrystalTriangle(
      crystalOutline[i],
      crystalOutline[next],
      crystalOutline[i],
      2
    );
  }

  const crystalGeom = new THREE.BufferGeometry();
  crystalGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(crystalPositions, 3)
  );
  for (const group of crystalGroups) {
    crystalGeom.addGroup(group[0], group[1], group[2]);
  }
  crystalGeom.computeVertexNormals();

  const crystal = new THREE.Mesh(
    crystalGeom,
    [crystalMat, crystal_frontMat, crystal_edgeMat]
  );
  crystal.name = "crystal";
  crystal.renderOrder = 3;
  crystal_assembly.add(crystal);

  const crystal_inner_glowMat = new THREE.MeshBasicMaterial({
    color: 0x74f4ff,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const crystal_inner_glowGeom = new THREE.CircleGeometry(0.25, 32);
  const crystal_inner_glow = new THREE.Mesh(
    crystal_inner_glowGeom,
    crystal_inner_glowMat
  );
  crystal_inner_glow.name = "crystal_inner_glow";
  crystal_inner_glow.position.set(0, 1.67, 0.252);
  crystal_inner_glow.scale.set(0.72, 1.38, 1);
  crystal_inner_glow.renderOrder = 3;
  crystal_assembly.add(crystal_inner_glow);

  const crystal_lower_glowMat = new THREE.MeshBasicMaterial({
    color: 0xe8ffff,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const crystal_lower_glowGeom = new THREE.CircleGeometry(0.17, 28);
  const crystal_lower_glow = new THREE.Mesh(
    crystal_lower_glowGeom,
    crystal_lower_glowMat
  );
  crystal_lower_glow.name = "crystal_lower_glow";
  crystal_lower_glow.position.set(-0.01, 1.43, 0.255);
  crystal_lower_glow.scale.set(0.72, 1.25, 1);
  crystal_lower_glow.renderOrder = 3;
  crystal_assembly.add(crystal_lower_glow);

  const crystal_edgesMat = new THREE.LineBasicMaterial({
    color: 0x9ceeff,
    transparent: true,
    opacity: 0.38,
    depthWrite: false
  });
  const crystal_edgesGeom = new THREE.EdgesGeometry(crystalGeom, 18);
  const crystal_edges = new THREE.LineSegments(
    crystal_edgesGeom,
    crystal_edgesMat
  );
  crystal_edges.name = "crystal_edges";
  crystal_edges.renderOrder = 4;
  crystal_assembly.add(crystal_edges);

  const crystal_inclusionsMat = new THREE.MeshBasicMaterial({
    color: 0x087fb8,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });
  const crystal_inclusionsGeom = new THREE.TetrahedronGeometry(0.035, 0);
  const inclusionData = [
    [-0.17, 2.20, 0.12, 0.8, 1.5, 0.6, 0.2, 0.4, 0.1],
    [-0.23, 2.04, 0.13, 0.6, 1.2, 0.5, 0.7, 0.1, 0.3],
    [0.18, 1.91, 0.14, 0.7, 1.4, 0.6, 0.3, 0.8, 0.2],
    [-0.12, 1.72, 0.16, 0.5, 1.0, 0.5, 0.9, 0.2, 0.5],
    [0.08, 1.55, 0.15, 0.6, 1.1, 0.5, 0.1, 0.6, 0.8],
    [-0.04, 1.36, 0.12, 0.5, 0.9, 0.4, 0.5, 0.3, 0.9]
  ];
  const crystal_inclusions = new THREE.InstancedMesh(
    crystal_inclusionsGeom,
    crystal_inclusionsMat,
    inclusionData.length
  );
  crystal_inclusions.name = "crystal_inclusions";
  const inclusion_dummy = new THREE.Object3D();
  for (let i = 0; i < inclusionData.length; i++) {
    const d = inclusionData[i];
    inclusion_dummy.position.set(d[0], d[1], d[2]);
    inclusion_dummy.scale.set(d[3], d[4], d[5]);
    inclusion_dummy.rotation.set(d[6], d[7], d[8]);
    inclusion_dummy.updateMatrix();
    crystal_inclusions.setMatrixAt(i, inclusion_dummy.matrix);
  }
  crystal_inclusions.instanceMatrix.needsUpdate = true;
  crystal_inclusions.renderOrder = 4;
  crystal_assembly.add(crystal_inclusions);

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