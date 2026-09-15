export default function generate(THREE) {
  const root = new THREE.Group();

  const outerRadius = 0.5;
  const boreRadius = 0.075;
  const plateDepth = 0.055;
  const frontZ = plateDepth / 2;

  const main_discMat = new THREE.MeshStandardMaterial({
    color: 0xd8dce0,
    metalness: 0.65,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const central_hubMat = new THREE.MeshStandardMaterial({
    color: 0xb8bdc4,
    metalness: 0.65,
    roughness: 0.34,
    side: THREE.DoubleSide
  });
  const outer_rimMat = new THREE.MeshStandardMaterial({
    color: 0xc8cccf,
    metalness: 0.7,
    roughness: 0.25
  });
  const dark_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x747a80,
    metalness: 0.6,
    roughness: 0.42,
    side: THREE.DoubleSide
  });
  const bright_grooveMat = new THREE.MeshStandardMaterial({
    color: 0xe8ecef,
    metalness: 0.6,
    roughness: 0.28,
    side: THREE.DoubleSide
  });
  const brushed_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xf0f2f4,
    metalness: 0.55,
    roughness: 0.32,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const brushed_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x969ca3,
    metalness: 0.55,
    roughness: 0.38,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const main_discShape = new THREE.Shape();
  main_discShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const main_discHole = new THREE.Path();
  main_discHole.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
  main_discShape.holes.push(main_discHole);

  const main_discGeom = new THREE.ExtrudeGeometry(main_discShape, {
    depth: plateDepth,
    steps: 1,
    curveSegments: 128,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  main_discGeom.translate(0, 0, -plateDepth / 2);
  const main_disc = new THREE.Mesh(main_discGeom, main_discMat);
  root.add(main_disc);

  const central_hubShape = new THREE.Shape();
  central_hubShape.absarc(0, 0, 0.17, 0, Math.PI * 2, false);
  const central_hubHole = new THREE.Path();
  central_hubHole.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
  central_hubShape.holes.push(central_hubHole);

  const central_hubGeom = new THREE.ShapeGeometry(central_hubShape, 96);
  const central_hub = new THREE.Mesh(central_hubGeom, central_hubMat);
  central_hub.position.z = frontZ + 0.001;
  root.add(central_hub);

  const hub_blend_ringGeom = new THREE.RingGeometry(0.145, 0.174, 96);
  const hub_blend_ring = new THREE.Mesh(hub_blend_ringGeom, main_discMat);
  hub_blend_ring.position.z = frontZ + 0.0018;
  root.add(hub_blend_ring);

  const hub_face_ringGeom = new THREE.RingGeometry(0.083, 0.132, 96);
  const hub_face_ring = new THREE.Mesh(hub_face_ringGeom, central_hubMat);
  hub_face_ring.position.z = frontZ + 0.0022;
  root.add(hub_face_ring);

  const bore_bevelGeom = new THREE.TorusGeometry(0.078, 0.005, 10, 96);
  const bore_bevel = new THREE.Mesh(bore_bevelGeom, outer_rimMat);
  bore_bevel.position.z = frontZ + 0.002;
  root.add(bore_bevel);

  const bore_wallGeom = new THREE.CylinderGeometry(
    boreRadius,
    boreRadius,
    plateDepth + 0.012,
    96,
    1,
    true
  );
  const bore_wall = new THREE.Mesh(bore_wallGeom, dark_grooveMat);
  bore_wall.rotation.x = Math.PI / 2;
  root.add(bore_wall);

  const outer_rimGeom = new THREE.TorusGeometry(0.493, 0.006, 10, 128);
  const outer_rim = new THREE.Mesh(outer_rimGeom, outer_rimMat);
  outer_rim.position.z = frontZ + 0.001;
  root.add(outer_rim);

  const outer_edge_shadowGeom = new THREE.TorusGeometry(0.484, 0.0025, 8, 128);
  const outer_edge_shadow = new THREE.Mesh(outer_edge_shadowGeom, dark_grooveMat);
  outer_edge_shadow.position.z = frontZ + 0.002;
  root.add(outer_edge_shadow);

  const rear_rimGeom = new THREE.TorusGeometry(0.493, 0.0045, 8, 128);
  const rear_rim = new THREE.Mesh(rear_rimGeom, dark_grooveMat);
  rear_rim.position.z = -frontZ - 0.001;
  root.add(rear_rim);

  const dummy = new THREE.Object3D();

  const outer_groovesGeom = new THREE.RingGeometry(0.992, 1, 128);
  const outer_grooves = new THREE.InstancedMesh(
    outer_groovesGeom,
    dark_grooveMat,
    34
  );
  for (let i = 0; i < 34; i++) {
    const radius = 0.188 + i * (0.282 / 33);
    dummy.position.set(0, 0, frontZ + 0.0028);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(radius, radius, 1);
    dummy.updateMatrix();
    outer_grooves.setMatrixAt(i, dummy.matrix);
  }
  outer_grooves.instanceMatrix.needsUpdate = true;
  root.add(outer_grooves);

  const outer_highlight_groovesGeom = new THREE.RingGeometry(0.995, 1, 128);
  const outer_highlight_grooves = new THREE.InstancedMesh(
    outer_highlight_groovesGeom,
    bright_grooveMat,
    34
  );
  for (let i = 0; i < 34; i++) {
    const radius = 0.188 + i * (0.282 / 33);
    dummy.position.set(0, 0, frontZ + 0.0031);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(radius, radius, 1);
    dummy.updateMatrix();
    outer_highlight_grooves.setMatrixAt(i, dummy.matrix);
  }
  outer_highlight_grooves.instanceMatrix.needsUpdate = true;
  root.add(outer_highlight_grooves);

  const hub_groovesGeom = new THREE.RingGeometry(0.985, 1, 96);
  const hub_grooves = new THREE.InstancedMesh(
    hub_groovesGeom,
    dark_grooveMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const radius = 0.087 + i * (0.074 / 11);
    dummy.position.set(0, 0, frontZ + 0.0035);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(radius, radius, 1);
    dummy.updateMatrix();
    hub_grooves.setMatrixAt(i, dummy.matrix);
  }
  hub_grooves.instanceMatrix.needsUpdate = true;
  root.add(hub_grooves);

  const brushed_radial_highlightsGeom = new THREE.RingGeometry(
    0.19,
    0.472,
    10,
    1,
    -0.012,
    0.024
  );
  const brushed_radial_highlights = new THREE.InstancedMesh(
    brushed_radial_highlightsGeom,
    brushed_highlightMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + 0.035;
    dummy.position.set(0, 0, frontZ + 0.0038);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    brushed_radial_highlights.setMatrixAt(i, dummy.matrix);
  }
  brushed_radial_highlights.instanceMatrix.needsUpdate = true;
  root.add(brushed_radial_highlights);

  const brushed_radial_shadowsGeom = new THREE.RingGeometry(
    0.19,
    0.472,
    10,
    1,
    -0.009,
    0.018
  );
  const brushed_radial_shadows = new THREE.InstancedMesh(
    brushed_radial_shadowsGeom,
    brushed_shadowMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + 0.17;
    dummy.position.set(0, 0, frontZ + 0.0039);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    brushed_radial_shadows.setMatrixAt(i, dummy.matrix);
  }
  brushed_radial_shadows.instanceMatrix.needsUpdate = true;
  root.add(brushed_radial_shadows);

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
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}