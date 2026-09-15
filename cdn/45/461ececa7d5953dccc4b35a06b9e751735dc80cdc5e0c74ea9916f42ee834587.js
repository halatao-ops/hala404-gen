export default function generate(THREE) {
  const root = new THREE.Group();

  const black_baseMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    roughness: 0.8,
  });
  const white_collarMat = new THREE.MeshStandardMaterial({
    color: 0xf3f6f8,
    roughness: 0.65,
  });
  const orange_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff4a00,
    roughness: 0.5,
  });
  const orange_topMat = new THREE.MeshStandardMaterial({
    color: 0xff5a16,
    roughness: 0.5,
  });
  const knob_ballMat = new THREE.MeshStandardMaterial({
    color: 0xff5a18,
    roughness: 0.45,
  });

  const black_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.62, 0.00),
    new THREE.Vector2(0.70, 0.03),
    new THREE.Vector2(0.76, 0.09),
    new THREE.Vector2(0.79, 0.18),
    new THREE.Vector2(0.80, 0.30),
    new THREE.Vector2(0.80, 0.94),
    new THREE.Vector2(0.79, 1.03),
    new THREE.Vector2(0.75, 1.11),
    new THREE.Vector2(0.68, 1.16),
    new THREE.Vector2(0.00, 1.16),
  ];
  const black_baseGeom = new THREE.LatheGeometry(black_baseProfile, 48);
  const black_base = new THREE.Mesh(black_baseGeom, black_baseMat);
  root.add(black_base);

  const white_collarProfile = [
    new THREE.Vector2(0.00, 0.98),
    new THREE.Vector2(0.64, 0.98),
    new THREE.Vector2(0.69, 0.99),
    new THREE.Vector2(0.72, 1.03),
    new THREE.Vector2(0.73, 1.09),
    new THREE.Vector2(0.73, 1.34),
    new THREE.Vector2(0.71, 1.39),
    new THREE.Vector2(0.00, 1.39),
  ];
  const white_collarGeom = new THREE.LatheGeometry(white_collarProfile, 48);
  const white_collar = new THREE.Mesh(white_collarGeom, white_collarMat);
  root.add(white_collar);

  const orange_bodyProfile = [
    new THREE.Vector2(0.00, 1.34),
    new THREE.Vector2(0.68, 1.34),
    new THREE.Vector2(0.72, 1.37),
    new THREE.Vector2(0.74, 1.43),
    new THREE.Vector2(0.74, 1.50),
    new THREE.Vector2(0.71, 2.43),
    new THREE.Vector2(0.70, 2.49),
    new THREE.Vector2(0.67, 2.54),
    new THREE.Vector2(0.00, 2.54),
  ];
  const orange_bodyGeom = new THREE.LatheGeometry(orange_bodyProfile, 48);
  const orange_body = new THREE.Mesh(orange_bodyGeom, orange_bodyMat);
  root.add(orange_body);

  const orange_topProfile = [
    new THREE.Vector2(0.00, 2.50),
    new THREE.Vector2(0.67, 2.50),
    new THREE.Vector2(0.69, 2.53),
    new THREE.Vector2(0.68, 2.57),
    new THREE.Vector2(0.58, 2.66),
    new THREE.Vector2(0.45, 2.75),
    new THREE.Vector2(0.31, 2.83),
    new THREE.Vector2(0.18, 2.88),
    new THREE.Vector2(0.00, 2.89),
  ];
  const orange_topGeom = new THREE.LatheGeometry(orange_topProfile, 48);
  const orange_top = new THREE.Mesh(orange_topGeom, orange_topMat);
  root.add(orange_top);

  const knob_neckGeom = new THREE.CylinderGeometry(0.14, 0.16, 0.10, 32);
  const knob_neck = new THREE.Mesh(knob_neckGeom, orange_bodyMat);
  knob_neck.position.y = 2.89;
  root.add(knob_neck);

  const knob_ballGeom = new THREE.SphereGeometry(0.42, 48, 24);
  const knob_ball = new THREE.Mesh(knob_ballGeom, knob_ballMat);
  knob_ball.position.y = 3.29;
  knob_ball.scale.set(1, 1.02, 1);
  root.add(knob_ball);

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