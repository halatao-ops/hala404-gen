export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.2,
    roughness: 0.8,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x050506,
    metalness: 0.0,
    roughness: 0.85,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x21070c,
    metalness: 0.15,
    roughness: 0.45,
  });
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0xff1738,
    metalness: 0.0,
    roughness: 0.25,
    emissive: 0xff001f,
    emissiveIntensity: 1.6,
  });
  const lensDarkMat = new THREE.MeshStandardMaterial({
    color: 0x8f0015,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x65000d,
    emissiveIntensity: 0.8,
  });
  const emitterMat = new THREE.MeshStandardMaterial({
    color: 0xffd18a,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xff5a24,
    emissiveIntensity: 2.2,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x070708,
    metalness: 0.0,
    roughness: 0.7,
  });

  const bodyRadius = 0.5;
  const bodyLength = 2.4;

  const main_body = new THREE.Group();
  root.add(main_body);

  const upper_shell_geom = new THREE.CylinderGeometry(
    bodyRadius,
    bodyRadius,
    bodyLength,
    64,
    1,
    true,
    Math.PI / 2,
    Math.PI
  );
  const upper_shell = new THREE.Mesh(upper_shell_geom, bodyMat);
  upper_shell.rotation.z = Math.PI / 2;
  main_body.add(upper_shell);

  const lower_shell_geom = new THREE.CylinderGeometry(
    bodyRadius,
    bodyRadius,
    bodyLength,
    64,
    1,
    true,
    -Math.PI / 2,
    Math.PI
  );
  const lower_shell = new THREE.Mesh(lower_shell_geom, bodyMat);
  lower_shell.rotation.z = Math.PI / 2;
  main_body.add(lower_shell);

  const top_seam_geom = new THREE.BoxGeometry(bodyLength * 0.98, 0.014, 0.018);
  const top_seam = new THREE.Mesh(top_seam_geom, seamMat);
  top_seam.position.set(0, bodyRadius + 0.003, 0);
  main_body.add(top_seam);

  const lower_seam_geom = new THREE.BoxGeometry(bodyLength * 0.98, 0.012, 0.018);
  const lower_seam = new THREE.Mesh(lower_seam_geom, seamMat);
  lower_seam.position.set(0, -bodyRadius + 0.004, 0);
  main_body.add(lower_seam);

  const front_seam_geom = new THREE.BoxGeometry(0.014, 0.012, 0.94);
  const front_seam = new THREE.Mesh(front_seam_geom, seamMat);
  front_seam.position.set(bodyLength / 2 + 0.004, 0, 0);
  main_body.add(front_seam);

  const rear_seam = new THREE.Mesh(front_seam_geom, seamMat);
  rear_seam.position.set(-bodyLength / 2 - 0.004, 0, 0);
  main_body.add(rear_seam);

  const front_cap_geom = new THREE.CylinderGeometry(0.47, 0.5, 0.18, 64);
  const front_cap = new THREE.Mesh(front_cap_geom, bodyMat);
  front_cap.rotation.z = Math.PI / 2;
  front_cap.position.x = bodyLength / 2 + 0.04;
  root.add(front_cap);

  const rear_cap_geom = new THREE.CylinderGeometry(0.5, 0.47, 0.18, 64);
  const rear_cap = new THREE.Mesh(rear_cap_geom, bodyMat);
  rear_cap.rotation.z = Math.PI / 2;
  rear_cap.position.x = -bodyLength / 2 - 0.04;
  root.add(rear_cap);

  const front_bezel_geom = new THREE.CylinderGeometry(0.39, 0.41, 0.11, 64);
  const front_bezel = new THREE.Mesh(front_bezel_geom, bezelMat);
  front_bezel.rotation.z = Math.PI / 2;
  front_bezel.position.x = bodyLength / 2 + 0.15;
  root.add(front_bezel);

  const outer_bezel_ring_geom = new THREE.TorusGeometry(0.345, 0.035, 16, 64);
  const outer_bezel_ring = new THREE.Mesh(outer_bezel_ring_geom, bezelMat);
  outer_bezel_ring.rotation.y = Math.PI / 2;
  outer_bezel_ring.position.x = bodyLength / 2 + 0.215;
  root.add(outer_bezel_ring);

  const lens_backing_geom = new THREE.CylinderGeometry(0.305, 0.305, 0.035, 64);
  const lens_backing = new THREE.Mesh(lens_backing_geom, lensDarkMat);
  lens_backing.rotation.z = Math.PI / 2;
  lens_backing.position.x = bodyLength / 2 + 0.215;
  root.add(lens_backing);

  const lens_dome_geom = new THREE.SphereGeometry(0.285, 48, 24);
  const lens_dome = new THREE.Mesh(lens_dome_geom, lensMat);
  lens_dome.scale.set(0.18, 1, 1);
  lens_dome.position.x = bodyLength / 2 + 0.245;
  root.add(lens_dome);

  const lens_concentric_ring_geom = new THREE.TorusGeometry(0.205, 0.012, 10, 48);
  const lens_concentric_ring = new THREE.Mesh(lens_concentric_ring_geom, lensDarkMat);
  lens_concentric_ring.rotation.y = Math.PI / 2;
  lens_concentric_ring.position.x = bodyLength / 2 + 0.295;
  root.add(lens_concentric_ring);

  const lens_inner_ring_geom = new THREE.TorusGeometry(0.115, 0.009, 10, 40);
  const lens_inner_ring = new THREE.Mesh(lens_inner_ring_geom, lensDarkMat);
  lens_inner_ring.rotation.y = Math.PI / 2;
  lens_inner_ring.position.x = bodyLength / 2 + 0.304;
  root.add(lens_inner_ring);

  const lens_radial_rib_geom = new THREE.BoxGeometry(0.012, 0.018, 0.075);
  const lens_radial_ribs = new THREE.InstancedMesh(
    lens_radial_rib_geom,
    lensDarkMat,
    18
  );
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    rib_dummy.position.set(
      bodyLength / 2 + 0.307,
      Math.cos(angle) * 0.18,
      Math.sin(angle) * 0.18
    );
    rib_dummy.rotation.set(angle, 0, 0);
    rib_dummy.updateMatrix();
    lens_radial_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  lens_radial_ribs.instanceMatrix.needsUpdate = true;
  root.add(lens_radial_ribs);

  const emitter_halo_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 32);
  const emitter_halo = new THREE.Mesh(emitter_halo_geom, lensDarkMat);
  emitter_halo.rotation.z = Math.PI / 2;
  emitter_halo.position.x = bodyLength / 2 + 0.315;
  root.add(emitter_halo);

  const central_emitter_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.032, 32);
  const central_emitter = new THREE.Mesh(central_emitter_geom, emitterMat);
  central_emitter.rotation.z = Math.PI / 2;
  central_emitter.position.x = bodyLength / 2 + 0.33;
  root.add(central_emitter);

  const top_logo = new THREE.Group();
  root.add(top_logo);

  const logo_bar_geom = new THREE.BoxGeometry(1, 1, 1);
  const logoY = bodyRadius + 0.012;

  function addLogoBar(x, z, width, depth) {
    const bar = new THREE.Mesh(logo_bar_geom, markingMat);
    bar.scale.set(width, 0.008, depth);
    bar.position.set(x, logoY, z);
    top_logo.add(bar);
    return bar;
  }

  const logo_m_left = addLogoBar(-0.31, -0.035, 0.15, 0.018);
  const logo_m_right = addLogoBar(-0.31, 0.035, 0.15, 0.018);
  const logo_m_inner_left = addLogoBar(-0.355, 0, 0.018, 0.085);
  const logo_m_inner_right = addLogoBar(-0.265, 0, 0.018, 0.085);

  const logo_c_top = addLogoBar(-0.13, -0.035, 0.13, 0.018);
  const logo_c_bottom = addLogoBar(-0.13, 0.035, 0.13, 0.018);
  const logo_c_side = addLogoBar(-0.19, 0, 0.018, 0.085);

  const logo_e_vertical = addLogoBar(0.035, 0, 0.018, 0.085);
  const logo_e_top = addLogoBar(0.075, -0.035, 0.08, 0.018);
  const logo_e_middle = addLogoBar(0.07, 0, 0.07, 0.018);
  const logo_e_bottom = addLogoBar(0.075, 0.035, 0.08, 0.018);

  const logo_2_top = addLogoBar(0.235, -0.035, 0.12, 0.018);
  const logo_2_middle = addLogoBar(0.235, 0, 0.12, 0.018);
  const logo_2_bottom = addLogoBar(0.235, 0.035, 0.12, 0.018);
  const logo_2_upper_side = addLogoBar(0.295, -0.018, 0.018, 0.036);
  const logo_2_lower_side = addLogoBar(0.175, 0.018, 0.018, 0.036);

  const logo_status_dot_geom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const logo_status_dot = new THREE.Mesh(logo_status_dot_geom, markingMat);
  logo_status_dot.position.set(-0.01, logoY, -0.075);
  top_logo.add(logo_status_dot);

  const side_switch_geom = new THREE.BoxGeometry(0.018, 0.15, 0.035);
  const side_switch = new THREE.Mesh(side_switch_geom, seamMat);
  side_switch.position.set(bodyLength / 2 - 0.08, 0.01, bodyRadius + 0.006);
  root.add(side_switch);

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