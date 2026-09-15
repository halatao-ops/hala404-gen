export default function generate(THREE) {
  const root = new THREE.Group();
  const base_assembly = new THREE.Group();
  const reservoir_assembly = new THREE.Group();
  const burner_assembly = new THREE.Group();
  const chimney_assembly = new THREE.Group();
  const lever_assembly = new THREE.Group();

  root.add(
    base_assembly,
    reservoir_assembly,
    burner_assembly,
    chimney_assembly,
    lever_assembly
  );

  const antique_brassMat = new THREE.MeshStandardMaterial({
    color: 0xa87935,
    metalness: 0.6,
    roughness: 0.4
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc59a4b,
    metalness: 0.6,
    roughness: 0.3
  });
  const dark_patinaMat = new THREE.MeshStandardMaterial({
    color: 0x3d2a18,
    metalness: 0.2,
    roughness: 0.8
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x55514a,
    metalness: 0.5,
    roughness: 0.55
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x171512,
    metalness: 0.0,
    roughness: 0.9
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.025,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc5d0ce,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.75,
    thickness: 0.04,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const unit_rodGeom = new THREE.CylinderGeometry(1, 1, 1, 10);

  function makeRod(parent, start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(unit_rodGeom, material);
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    rod.scale.set(radius, length, radius);
    parent.add(rod);
    return rod;
  }

  const base_plinthProfile = [
    [0.00, 0.66],
    [0.00, 0.78],
    [0.08, 0.82],
    [0.16, 0.79],
    [0.22, 0.70],
    [0.27, 0.62],
    [0.32, 0.53],
    [0.37, 0.43],
    [0.41, 0.34],
    [0.42, 0.29],
    [0.36, 0.27],
    [0.00, 0.27]
  ];
  const base_plinthGeom = createLatheGeometry(THREE, base_plinthProfile);
  const base_plinth = new THREE.Mesh(base_plinthGeom, antique_brassMat);
  base_assembly.add(base_plinth);

  const base_lower_bandGeom = new THREE.TorusGeometry(0.745, 0.026, 10, 64);
  const base_lower_band = new THREE.Mesh(base_lower_bandGeom, polished_brassMat);
  base_lower_band.rotation.x = Math.PI / 2;
  base_lower_band.position.y = 0.095;
  base_assembly.add(base_lower_band);

  const base_shadow_grooveGeom = new THREE.TorusGeometry(0.704, 0.012, 8, 64);
  const base_shadow_groove = new THREE.Mesh(base_shadow_grooveGeom, dark_patinaMat);
  base_shadow_groove.rotation.x = Math.PI / 2;
  base_shadow_groove.position.y = 0.155;
  base_assembly.add(base_shadow_groove);

  const base_upper_bandGeom = new THREE.TorusGeometry(0.372, 0.025, 10, 48);
  const base_upper_band = new THREE.Mesh(base_upper_bandGeom, polished_brassMat);
  base_upper_band.rotation.x = Math.PI / 2;
  base_upper_band.position.y = 0.365;
  base_assembly.add(base_upper_band);

  const pedestal_stemProfile = [
    [0.00, 0.27],
    [0.31, 0.27],
    [0.36, 0.31],
    [0.34, 0.37],
    [0.28, 0.43],
    [0.235, 0.50],
    [0.225, 0.59],
    [0.255, 0.67],
    [0.315, 0.735],
    [0.355, 0.77],
    [0.00, 0.77]
  ];
  const pedestal_stemGeom = createLatheGeometry(THREE, pedestal_stemProfile);
  const pedestal_stem = new THREE.Mesh(pedestal_stemGeom, antique_brassMat);
  base_assembly.add(pedestal_stem);

  const pedestal_lower_ringGeom = new THREE.TorusGeometry(0.325, 0.022, 10, 48);
  const pedestal_lower_ring = new THREE.Mesh(
    pedestal_lower_ringGeom,
    polished_brassMat
  );
  pedestal_lower_ring.rotation.x = Math.PI / 2;
  pedestal_lower_ring.position.y = 0.315;
  base_assembly.add(pedestal_lower_ring);

  const pedestal_upper_ringGeom = new THREE.TorusGeometry(0.326, 0.024, 10, 48);
  const pedestal_upper_ring = new THREE.Mesh(
    pedestal_upper_ringGeom,
    polished_brassMat
  );
  pedestal_upper_ring.rotation.x = Math.PI / 2;
  pedestal_upper_ring.position.y = 0.745;
  base_assembly.add(pedestal_upper_ring);

  const scroll_reliefPath = [
    new THREE.Vector3(-0.145, 0.405, 0.535),
    new THREE.Vector3(-0.125, 0.475, 0.495),
    new THREE.Vector3(-0.055, 0.515, 0.455),
    new THREE.Vector3(0.035, 0.505, 0.455),
    new THREE.Vector3(0.105, 0.458, 0.485),
    new THREE.Vector3(0.112, 0.398, 0.515),
    new THREE.Vector3(0.065, 0.355, 0.535),
    new THREE.Vector3(0.005, 0.358, 0.540),
    new THREE.Vector3(-0.035, 0.392, 0.532),
    new THREE.Vector3(-0.020, 0.425, 0.515),
    new THREE.Vector3(0.015, 0.430, 0.505)
  ];
  const scroll_reliefGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(scroll_reliefPath, false, "centripetal"),
    36,
    0.014,
    8,
    false
  );
  const scroll_relief = new THREE.InstancedMesh(
    scroll_reliefGeom,
    polished_brassMat,
    8
  );
  const scroll_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    scroll_dummy.position.set(0, 0, 0);
    scroll_dummy.rotation.set(0, i / 8 * Math.PI * 2, 0);
    scroll_dummy.updateMatrix();
    scroll_relief.setMatrixAt(i, scroll_dummy.matrix);
  }
  scroll_relief.instanceMatrix.needsUpdate = true;
  base_assembly.add(scroll_relief);

  const scroll_dividerGeom = new THREE.ConeGeometry(0.035, 0.15, 3);
  const scroll_dividers = new THREE.InstancedMesh(
    scroll_dividerGeom,
    polished_brassMat,
    8
  );
  const divider_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    divider_dummy.position.set(
      Math.sin(angle) * 0.585,
      0.425,
      Math.cos(angle) * 0.585
    );
    divider_dummy.rotation.set(0, angle, 0);
    divider_dummy.updateMatrix();
    scroll_dividers.setMatrixAt(i, divider_dummy.matrix);
  }
  scroll_dividers.instanceMatrix.needsUpdate = true;
  base_assembly.add(scroll_dividers);

  const oil_reservoirProfile = [
    [0.00, 0.69],
    [0.27, 0.69],
    [0.32, 0.72],
    [0.37, 0.77],
    [0.43, 0.84],
    [0.48, 0.93],
    [0.50, 1.02],
    [0.49, 1.10],
    [0.45, 1.17],
    [0.39, 1.22],
    [0.00, 1.22]
  ];
  const oil_reservoirGeom = createLatheGeometry(THREE, oil_reservoirProfile);
  const oil_reservoir = new THREE.Mesh(oil_reservoirGeom, antique_brassMat);
  reservoir_assembly.add(oil_reservoir);

  const reservoir_lower_ringGeom = new THREE.TorusGeometry(0.325, 0.025, 10, 48);
  const reservoir_lower_ring = new THREE.Mesh(
    reservoir_lower_ringGeom,
    polished_brassMat
  );
  reservoir_lower_ring.rotation.x = Math.PI / 2;
  reservoir_lower_ring.position.y = 0.72;
  reservoir_assembly.add(reservoir_lower_ring);

  const reservoir_flangeGeom = new THREE.CylinderGeometry(0.61, 0.58, 0.07, 64);
  const reservoir_flange = new THREE.Mesh(
    reservoir_flangeGeom,
    antique_brassMat
  );
  reservoir_flange.position.y = 1.235;
  reservoir_assembly.add(reservoir_flange);

  const flange_edgeGeom = new THREE.TorusGeometry(0.585, 0.026, 10, 64);
  const flange_edge = new THREE.Mesh(flange_edgeGeom, polished_brassMat);
  flange_edge.rotation.x = Math.PI / 2;
  flange_edge.position.y = 1.265;
  reservoir_assembly.add(flange_edge);

  const burner_lower_collarGeom = new THREE.CylinderGeometry(
    0.39,
    0.42,
    0.105,
    64
  );
  const burner_lower_collar = new THREE.Mesh(
    burner_lower_collarGeom,
    antique_brassMat
  );
  burner_lower_collar.position.y = 1.315;
  reservoir_assembly.add(burner_lower_collar);

  const burner_bodyGeom = new THREE.CylinderGeometry(0.36, 0.38, 0.28, 64);
  const burner_body = new THREE.Mesh(burner_bodyGeom, antique_brassMat);
  burner_body.position.y = 1.475;
  reservoir_assembly.add(burner_body);

  const burner_top_collarGeom = new THREE.CylinderGeometry(
    0.405,
    0.38,
    0.09,
    64
  );
  const burner_top_collar = new THREE.Mesh(
    burner_top_collarGeom,
    polished_brassMat
  );
  burner_top_collar.position.y = 1.635;
  reservoir_assembly.add(burner_top_collar);

  const burner_ringGeom = new THREE.TorusGeometry(0.37, 0.018, 8, 48);
  const burner_ring_heights = [1.34, 1.405, 1.47, 1.535, 1.595];
  const burner_horizontal_rings = new THREE.InstancedMesh(
    burner_ringGeom,
    polished_brassMat,
    burner_ring_heights.length
  );
  const burner_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < burner_ring_heights.length; i++) {
    burner_ring_dummy.position.set(0, burner_ring_heights[i], 0);
    burner_ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    burner_ring_dummy.updateMatrix();
    burner_horizontal_rings.setMatrixAt(i, burner_ring_dummy.matrix);
  }
  burner_horizontal_rings.instanceMatrix.needsUpdate = true;
  reservoir_assembly.add(burner_horizontal_rings);

  const burner_grooveGeom = new THREE.TorusGeometry(0.374, 0.007, 6, 48);
  const burner_groove_heights = [1.372, 1.437, 1.502, 1.567];
  const burner_dark_grooves = new THREE.InstancedMesh(
    burner_grooveGeom,
    dark_patinaMat,
    burner_groove_heights.length
  );
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < burner_groove_heights.length; i++) {
    groove_dummy.position.set(0, burner_groove_heights[i], 0);
    groove_dummy.rotation.set(Math.PI / 2, 0, 0);
    groove_dummy.updateMatrix();
    burner_dark_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  burner_dark_grooves.instanceMatrix.needsUpdate = true;
  reservoir_assembly.add(burner_dark_grooves);

  const burner_wellGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.025, 48);
  const burner_well = new THREE.Mesh(burner_wellGeom, dark_patinaMat);
  burner_well.position.y = 1.687;
  burner_assembly.add(burner_well);

  const burner_inner_ringGeom = new THREE.TorusGeometry(0.275, 0.018, 8, 48);
  const burner_inner_ring = new THREE.Mesh(
    burner_inner_ringGeom,
    polished_brassMat
  );
  burner_inner_ring.rotation.x = Math.PI / 2;
  burner_inner_ring.position.y = 1.705;
  burner_assembly.add(burner_inner_ring);

  const burner_supportGeom = new THREE.BoxGeometry(0.055, 0.34, 0.085);
  const burner_supports = new THREE.InstancedMesh(
    burner_supportGeom,
    steelMat,
    2
  );
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    support_dummy.position.set(i === 0 ? -0.14 : 0.14, 1.84, 0.015);
    support_dummy.rotation.set(0, 0, 0);
    support_dummy.updateMatrix();
    burner_supports.setMatrixAt(i, support_dummy.matrix);
  }
  burner_supports.instanceMatrix.needsUpdate = true;
  burner_assembly.add(burner_supports);

  const burner_crossbar = makeRod(
    burner_assembly,
    new THREE.Vector3(-0.20, 2.005, 0.02),
    new THREE.Vector3(0.20, 2.005, 0.02),
    0.012,
    steelMat
  );

  const burner_rear_crossbar = makeRod(
    burner_assembly,
    new THREE.Vector3(-0.16, 1.91, -0.075),
    new THREE.Vector3(0.16, 1.91, -0.075),
    0.009,
    steelMat
  );

  const wick_adjuster_shaft = makeRod(
    burner_assembly,
    new THREE.Vector3(0.115, 1.69, 0.045),
    new THREE.Vector3(0.115, 2.075, 0.045),
    0.009,
    steelMat
  );

  const wick_adjuster_knobGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.035,
    12
  );
  const wick_adjuster_knob = new THREE.Mesh(
    wick_adjuster_knobGeom,
    dark_patinaMat
  );
  wick_adjuster_knob.position.set(0.115, 2.085, 0.045);
  burner_assembly.add(wick_adjuster_knob);

  const burner_wire_left = makeRod(
    burner_assembly,
    new THREE.Vector3(-0.16, 1.91, -0.055),
    new THREE.Vector3(-0.055, 1.73, 0.055),
    0.005,
    steelMat
  );
  const burner_wire_right = makeRod(
    burner_assembly,
    new THREE.Vector3(0.16, 1.91, -0.055),
    new THREE.Vector3(0.055, 1.73, 0.055),
    0.005,
    steelMat
  );

  const wickGeom = new THREE.BoxGeometry(0.035, 0.16, 0.025);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  wick.position.set(0, 1.76, 0.075);
  burner_assembly.add(wick);

  const burner_air_holeGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.014,
    16
  );
  const burner_air_hole = new THREE.Mesh(
    burner_air_holeGeom,
    dark_patinaMat
  );
  burner_air_hole.rotation.x = Math.PI / 2;
  burner_air_hole.position.set(0.205, 1.485, 0.323);
  reservoir_assembly.add(burner_air_hole);

  const burner_air_hole_rimGeom = new THREE.TorusGeometry(
    0.027,
    0.005,
    6,
    20
  );
  const burner_air_hole_rim = new THREE.Mesh(
    burner_air_hole_rimGeom,
    polished_brassMat
  );
  burner_air_hole_rim.position.set(0.205, 1.485, 0.333);
  reservoir_assembly.add(burner_air_hole_rim);

  const chimney_glassProfile = [
    [0.00, 1.625],
    [0.25, 1.625],
    [0.31, 1.67],
    [0.38, 1.76],
    [0.44, 1.90],
    [0.47, 2.08],
    [0.46, 2.27],
    [0.42, 2.48],
    [0.36, 2.70],
    [0.30, 2.92],
    [0.255, 3.15],
    [0.225, 3.38],
    [0.215, 3.58],
    [0.235, 3.71],
    [0.255, 3.75],
    [0.215, 3.75],
    [0.198, 3.69],
    [0.198, 3.58],
    [0.207, 3.39],
    [0.235, 3.16],
    [0.28, 2.94],
    [0.34, 2.72],
    [0.395, 2.50],
    [0.435, 2.28],
    [0.445, 2.09],
    [0.415, 1.92],
    [0.355, 1.79],
    [0.29, 1.70],
    [0.23, 1.67],
    [0.00, 1.67]
  ];
  const chimney_glassGeom = createLatheGeometry(THREE, chimney_glassProfile);
  const chimney_glass = new THREE.Mesh(chimney_glassGeom, glassMat);
  chimney_assembly.add(chimney_glass);

  const glass_bottom_edgeGeom = new THREE.TorusGeometry(0.29, 0.012, 8, 48);
  const glass_bottom_edge = new THREE.Mesh(
    glass_bottom_edgeGeom,
    glass_edgeMat
  );
  glass_bottom_edge.rotation.x = Math.PI / 2;
  glass_bottom_edge.position.y = 1.68;
  chimney_assembly.add(glass_bottom_edge);

  const glass_lipGeom = new THREE.TorusGeometry(0.235, 0.018, 10, 64);
  const glass_lip = new THREE.Mesh(glass_lipGeom, glass_edgeMat);
  glass_lip.rotation.x = Math.PI / 2;
  glass_lip.position.y = 3.745;
  chimney_assembly.add(glass_lip);

  const glass_inner_lipGeom = new THREE.TorusGeometry(0.205, 0.008, 8, 48);
  const glass_inner_lip = new THREE.Mesh(
    glass_inner_lipGeom,
    glass_edgeMat
  );
  glass_inner_lip.rotation.x = Math.PI / 2;
  glass_inner_lip.position.y = 3.735;
  chimney_assembly.add(glass_inner_lip);

  const glass_highlightGeom = new THREE.SphereGeometry(1, 20, 12);

  const glass_highlight_left = new THREE.Mesh(
    glass_highlightGeom,
    highlightMat
  );
  glass_highlight_left.position.set(-0.17, 2.55, 0.35);
  glass_highlight_left.scale.set(0.045, 0.48, 0.012);
  glass_highlight_left.rotation.z = -0.12;
  chimney_assembly.add(glass_highlight_left);

  const glass_highlight_right = new THREE.Mesh(
    glass_highlightGeom,
    highlightMat
  );
  glass_highlight_right.position.set(0.15, 3.16, 0.205);
  glass_highlight_right.scale.set(0.025, 0.30, 0.009);
  glass_highlight_right.rotation.z = -0.08;
  chimney_assembly.add(glass_highlight_right);

  const lever_pivotGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.055, 24);
  const lever_pivot = new THREE.Mesh(lever_pivotGeom, dark_patinaMat);
  lever_pivot.rotation.z = Math.PI / 2;
  lever_pivot.position.set(-0.49, 1.16, 0.16);
  lever_assembly.add(lever_pivot);

  const lever_armPath = [
    new THREE.Vector3(-0.49, 1.17, 0.16),
    new THREE.Vector3(-0.58, 1.20, 0.18),
    new THREE.Vector3(-0.67, 1.27, 0.19),
    new THREE.Vector3(-0.75, 1.34, 0.18)
  ];
  const lever_armGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(lever_armPath, false, "centripetal"),
    20,
    0.025,
    8,
    false
  );
  const lever_arm = new THREE.Mesh(lever_armGeom, antique_brassMat);
  lever_assembly.add(lever_arm);

  const lever_handleGeom = new THREE.SphereGeometry(1, 24, 12);
  const lever_handle = new THREE.Mesh(
    lever_handleGeom,
    polished_brassMat
  );
  lever_handle.position.set(-0.82, 1.405, 0.18);
  lever_handle.scale.set(0.14, 0.045, 0.07);
  lever_handle.rotation.z = -0.58;
  lever_assembly.add(lever_handle);

  const lever_handle_insetGeom = new THREE.SphereGeometry(1, 20, 10);
  const lever_handle_inset = new THREE.Mesh(
    lever_handle_insetGeom,
    dark_patinaMat
  );
  lever_handle_inset.position.set(-0.825, 1.41, 0.225);
  lever_handle_inset.scale.set(0.085, 0.022, 0.008);
  lever_handle_inset.rotation.z = -0.58;
  lever_assembly.add(lever_handle_inset);

  fitToUnitCube(THREE, root);
  return root;
}

function createLatheGeometry(THREE, profile) {
  const positions = [];
  const indices = [];
  const segments = 64;

  for (let i = 0; i < profile.length; i++) {
    const radius = profile[i][0];
    const height = profile[i][1];

    for (let j = 0; j <= segments; j++) {
      const angle = j / segments * Math.PI * 2;
      positions.push(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
    }
  }

  const row = segments + 1;
  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * row + j;
      const b = a + 1;
      const d = (i + 1) * row + j;
      const c = d + 1;
      indices.push(a, d, b, b, d, c);
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