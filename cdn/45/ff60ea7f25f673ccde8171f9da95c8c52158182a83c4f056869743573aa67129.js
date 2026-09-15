export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ceramic_cup";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  const cup = new THREE.Group();
  cup.name = "cup";
  root.add(cup);

  const cup_bodyProfile = [
    { r: 0.00, y: 0.22, s: 1.00 },
    { r: 0.45, y: 0.22, s: 1.00 },
    { r: 0.65, y: 0.27, s: 1.00 },
    { r: 0.82, y: 0.38, s: 1.00 },
    { r: 0.98, y: 0.55, s: 1.00 },
    { r: 1.12, y: 0.76, s: 1.00 },
    { r: 1.23, y: 1.00, s: 1.00 },
    { r: 1.31, y: 1.25, s: 1.00 },
    { r: 1.37, y: 1.49, s: 1.00 },
    { r: 1.41, y: 1.69, s: 1.00 },
    { r: 1.42, y: 1.82, s: 1.00 },
    { r: 1.40, y: 1.89, s: 1.00 },
    { r: 1.35, y: 1.94, s: 1.00 },
    { r: 1.29, y: 1.95, s: 1.00 },
    { r: 1.23, y: 1.92, s: 1.00 },
    { r: 1.19, y: 1.86, s: 1.00 },
    { r: 1.17, y: 1.76, s: 1.00 },
    { r: 1.15, y: 1.60, s: 1.00 },
    { r: 1.11, y: 1.39, s: 1.00 },
    { r: 1.04, y: 1.16, s: 1.00 },
    { r: 0.94, y: 0.93, s: 1.00 },
    { r: 0.81, y: 0.72, s: 1.00 },
    { r: 0.65, y: 0.55, s: 1.00 },
    { r: 0.46, y: 0.43, s: 1.00 },
    { r: 0.24, y: 0.38, s: 1.00 },
    { r: 0.00, y: 0.37, s: 1.00 },
  ];

  const cup_body = createLoftGeometry(THREE, cup_bodyProfile, 64, 2.0);
  cup_body.name = "cup_body";
  const cup_body_mesh = new THREE.Mesh(cup_body, ceramicMat);
  cup_body_mesh.name = "cup_body_mesh";
  cup.add(cup_body_mesh);

  const rim_rollProfile = [
    { r: 1.18, y: 1.82, s: 1.00 },
    { r: 1.20, y: 1.89, s: 1.00 },
    { r: 1.26, y: 1.96, s: 1.00 },
    { r: 1.36, y: 2.00, s: 1.00 },
    { r: 1.46, y: 1.99, s: 1.00 },
    { r: 1.53, y: 1.94, s: 1.00 },
    { r: 1.55, y: 1.87, s: 1.00 },
    { r: 1.52, y: 1.80, s: 1.00 },
    { r: 1.45, y: 1.75, s: 1.00 },
    { r: 1.36, y: 1.73, s: 1.00 },
    { r: 1.28, y: 1.76, s: 1.00 },
    { r: 1.22, y: 1.80, s: 1.00 },
    { r: 1.18, y: 1.82, s: 1.00 },
  ];

  const rim_roll = createLoftGeometry(THREE, rim_rollProfile, 64, 2.0);
  rim_roll.name = "rim_roll";
  const rim_roll_mesh = new THREE.Mesh(rim_roll, ceramicMat);
  rim_roll_mesh.name = "rim_roll_mesh";
  cup.add(rim_roll_mesh);

  const pedestal_footProfile = [
    { r: 0.00, y: 0.00, s: 1.00 },
    { r: 0.68, y: 0.00, s: 1.00 },
    { r: 0.82, y: 0.015, s: 1.00 },
    { r: 0.91, y: 0.05, s: 1.00 },
    { r: 0.96, y: 0.11, s: 1.00 },
    { r: 0.96, y: 0.16, s: 1.00 },
    { r: 0.92, y: 0.22, s: 1.00 },
    { r: 0.84, y: 0.28, s: 1.00 },
    { r: 0.72, y: 0.32, s: 1.00 },
    { r: 0.58, y: 0.34, s: 1.00 },
    { r: 0.00, y: 0.34, s: 1.00 },
  ];

  const pedestal_foot = createLoftGeometry(THREE, pedestal_footProfile, 64, 1.0);
  pedestal_foot.name = "pedestal_foot";
  const pedestal_foot_mesh = new THREE.Mesh(pedestal_foot, ceramicMat);
  pedestal_foot_mesh.name = "pedestal_foot_mesh";
  cup.add(pedestal_foot);

  const foot_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.79, 0.045, 12, 64),
    ceramicMat
  );
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = 0.31;
  cup.add(foot_ring);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(1.36, 1.67, 0),
      new THREE.Vector3(1.53, 1.76, 0),
      new THREE.Vector3(1.78, 1.77, 0),
      new THREE.Vector3(2.00, 1.65, 0),
      new THREE.Vector3(2.10, 1.44, 0),
      new THREE.Vector3(2.07, 1.20, 0),
      new THREE.Vector3(1.91, 1.00, 0),
      new THREE.Vector3(1.66, 0.84, 0),
      new THREE.Vector3(1.34, 0.72, 0),
      new THREE.Vector3(1.02, 0.73, 0),
    ],
    false,
    "centripetal",
    0.5
  );

  const handle = new THREE.Mesh(
    new THREE.TubeGeometry(handlePath, 64, 0.13, 16, false),
    ceramicMat
  );
  handle.name = "handle";
  cup.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 16);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(1.35, 1.66, 0);
  upper_handle_mount.scale.set(0.22, 0.16, 0.18);
  cup.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(1.04, 0.73, 0);
  lower_handle_mount.scale.set(0.24, 0.15, 0.18);
  cup.add(lower_handle_mount);

  fitToUnitCube(THREE, root);
  return root;
}

function createLoftGeometry(THREE, stations, segments, exponent) {
  const positions = [];
  const indices = [];
  const power = 2 / exponent;

  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    for (let j = 0; j < segments; j++) {
      const angle = j / segments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const x = station.r * Math.sign(cosine) * Math.pow(Math.abs(cosine), power);
      const z = station.r * Math.sign(sine) * Math.pow(Math.abs(sine), power) * station.s;
      positions.push(x, station.y, z);
    }
  }

  for (let i = 0; i < stations.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const next = (j + 1) % segments;
      const a = i * segments + j;
      const b = i * segments + next;
      const c = (i + 1) * segments + next;
      const d = (i + 1) * segments + j;
      indices.push(a, b, d, b, c, d);
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