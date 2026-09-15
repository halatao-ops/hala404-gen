export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.8,
  });
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x1c1d1e,
    metalness: 0.0,
    roughness: 0.8,
  });
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0d0e0f,
    metalness: 0.0,
    roughness: 0.8,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -0.74),
    new THREE.Vector2(0.98, -0.74),
    new THREE.Vector2(1.10, -0.72),
    new THREE.Vector2(1.18, -0.67),
    new THREE.Vector2(1.22, -0.58),
    new THREE.Vector2(1.23, -0.45),
    new THREE.Vector2(1.23, 0.53),
    new THREE.Vector2(1.22, 0.62),
    new THREE.Vector2(1.18, 0.69),
    new THREE.Vector2(1.10, 0.73),
    new THREE.Vector2(0.98, 0.75),
    new THREE.Vector2(0.00, 0.75),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  root.add(main_body);

  const top_surfaceGeom = new THREE.CylinderGeometry(1.075, 1.075, 0.025, 64);
  const top_surface = new THREE.Mesh(top_surfaceGeom, topMat);
  top_surface.position.y = 0.758;
  root.add(top_surface);

  const top_rimGeom = new THREE.TorusGeometry(1.09, 0.035, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, bodyMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 0.765;
  root.add(top_rim);

  const side_tabShape = new THREE.Shape();
  side_tabShape.moveTo(0.00, -0.25);
  side_tabShape.lineTo(0.18, -0.24);
  side_tabShape.lineTo(0.56, -0.14);
  side_tabShape.quadraticCurveTo(0.66, -0.10, 0.66, -0.01);
  side_tabShape.lineTo(0.66, 0.08);
  side_tabShape.quadraticCurveTo(0.65, 0.16, 0.57, 0.19);
  side_tabShape.lineTo(0.18, 0.29);
  side_tabShape.lineTo(0.00, 0.29);
  side_tabShape.closePath();

  const side_tabGeom = new THREE.ExtrudeGeometry(side_tabShape, {
    depth: 0.58,
    steps: 1,
    curveSegments: 12,
  });
  const side_tab = new THREE.Mesh(side_tabGeom, bodyMat);
  side_tab.position.set(1.10, 0.08, -0.29);
  root.add(side_tab);

  const bottom_footProfile = [
    new THREE.Vector2(0.00, -0.86),
    new THREE.Vector2(0.90, -0.86),
    new THREE.Vector2(1.00, -0.845),
    new THREE.Vector2(1.07, -0.81),
    new THREE.Vector2(1.09, -0.76),
    new THREE.Vector2(1.06, -0.71),
    new THREE.Vector2(0.00, -0.70),
  ];
  const bottom_footGeom = new THREE.LatheGeometry(bottom_footProfile, 64);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, baseMat);
  root.add(bottom_foot);

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