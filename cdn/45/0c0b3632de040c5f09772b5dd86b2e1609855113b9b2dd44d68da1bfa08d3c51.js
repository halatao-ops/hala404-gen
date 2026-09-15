export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "perforated_wooden_spoon";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd99a52,
    metalness: 0.0,
    roughness: 0.48,
  });
  const bowl_innerMat = new THREE.MeshStandardMaterial({
    color: 0xc88745,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const dark_grainMat = new THREE.MeshStandardMaterial({
    color: 0x713716,
    metalness: 0.0,
    roughness: 0.65,
  });
  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xf0bd73,
    metalness: 0.0,
    roughness: 0.55,
  });
  const perforation_holesMat = new THREE.MeshStandardMaterial({
    color: 0x321508,
    metalness: 0.0,
    roughness: 0.85,
  });

  const bowl_center_z = 1.48;
  const bowl_radius_x = 0.72;
  const bowl_radius_z = 0.95;
  const bowl_rim_y = 0.1;
  const bowl_depth = 0.34;
  const bowl_thickness = 0.12;

  function bowlBoundary(theta) {
    const taper = 1 - 0.22 * Math.cos(theta);
    return {
      x: bowl_radius_x * Math.sin(theta) * taper,
      z: bowl_center_z + bowl_radius_z * Math.cos(theta),
    };
  }

  function bowlTopY(t, theta) {
    const edge_blend = Math.pow(t, 1.55);
    return bowl_rim_y - bowl_depth * (1 - edge_blend);
  }

  function createBowlSurface(top, include_center) {
    const rings = 18;
    const segments = 64;
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let ring = 0; ring <= rings; ring++) {
      const t = include_center ? ring / rings : (ring + 1) / rings;
      for (let segment = 0; segment < segments; segment++) {
        const theta = segment / segments * Math.PI * 2;
        const boundary = bowlBoundary(theta);
        const x = boundary.x * t;
        const z = bowl_center_z + (boundary.z - bowl_center_z) * t;
        const y = bowlTopY(t, theta) - (top ? 0 : bowl_thickness);
        positions.push(x, y, z);
        uvs.push(0.5 + x / (bowl_radius_x * 2), 0.5 + (z - bowl_center_z) / (bowl_radius_z * 2));
      }
    }

    for (let ring = 0; ring < rings; ring++) {
      for (let segment = 0; segment < segments; segment++) {
        const next = (segment + 1) % segments;
        const a = ring * segments + segment;
        const b = ring * segments + next;
        const c = (ring + 1) * segments + next;
        const d = (ring + 1) * segments + segment;
        if (top) {
          indices.push(a, b, c, a, c, d);
        } else {
          indices.push(a, c, b, a, d, c);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createBowlWall() {
    const segments = 64;
    const positions = [];
    const indices = [];

    for (let segment = 0; segment < segments; segment++) {
      const theta = segment / segments * Math.PI * 2;
      const boundary = bowlBoundary(theta);
      const top_y = bowlTopY(1, theta);
      positions.push(boundary.x, top_y, boundary.z);
      positions.push(boundary.x, top_y - bowl_thickness, boundary.z);
    }

    for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      const top_a = segment * 2;
      const bottom_a = top_a + 1;
      const top_b = next * 2;
      const bottom_b = top_b + 1;
      indices.push(top_a, top_b, bottom_b, top_a, bottom_b, bottom_a);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const bowl_outerGeom = createBowlSurface(false, false);
  const bowl_outer = new THREE.Mesh(bowl_outerGeom, woodMat);
  bowl_outer.name = "bowl_outer";
  root.add(bowl_outer);

  const bowl_innerGeom = createBowlSurface(true, false);
  const bowl_inner = new THREE.Mesh(bowl_innerGeom, bowl_innerMat);
  bowl_inner.name = "bowl_inner";
  root.add(bowl_inner);

  const bowl_wallGeom = createBowlWall();
  const bowl_wall = new THREE.Mesh(bowl_wallGeom, woodMat);
  bowl_wall.name = "bowl_wall";
  root.add(bowl_wall);

  const bowl_rim_points = [];
  for (let i = 0; i < 64; i++) {
    const theta = i / 64 * Math.PI * 2;
    const boundary = bowlBoundary(theta);
    bowl_rim_points.push(new THREE.Vector3(boundary.x, bowl_rim_y, boundary.z));
  }
  const bowl_rim_curve = new THREE.CatmullRomCurve3(bowl_rim_points, true, "centripetal");
  const bowl_rimGeom = new THREE.TubeGeometry(bowl_rim_curve, 128, 0.047, 10, true);
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, woodMat);
  bowl_rim.name = "bowl_rim";
  root.add(bowl_rim);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.18, 0.58);
  handleShape.bezierCurveTo(0.2, 0.28, 0.17, -0.12, 0.18, -0.55);
  handleShape.bezierCurveTo(0.19, -1.15, 0.25, -1.95, 0.34, -2.55);
  handleShape.bezierCurveTo(0.36, -2.7, 0.28, -2.82, 0.14, -2.87);
  handleShape.bezierCurveTo(0.06, -2.9, -0.06, -2.9, -0.14, -2.87);
  handleShape.bezierCurveTo(-0.28, -2.82, -0.36, -2.7, -0.34, -2.55);
  handleShape.bezierCurveTo(-0.25, -1.95, -0.19, -1.15, -0.18, -0.55);
  handleShape.bezierCurveTo(-0.17, -0.12, -0.2, 0.28, -0.18, 0.58);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    curveSegments: 24,
    steps: 1,
    depth: 0.14,
  });
  const handle = new THREE.Mesh(handleGeom, woodMat);
  handle.name = "handle";
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.14;
  root.add(handle);

  const perforation_positions = [
    [-0.2, 1.08], [0.02, 1.08], [0.23, 1.1],
    [-0.32, 1.27], [-0.09, 1.25], [0.14, 1.27], [0.34, 1.3],
    [-0.4, 1.47], [-0.18, 1.45], [0.05, 1.46], [0.27, 1.48], [0.42, 1.51],
    [-0.43, 1.68], [-0.22, 1.66], [0.0, 1.68], [0.22, 1.69], [0.4, 1.72],
    [-0.36, 1.88], [-0.14, 1.87], [0.08, 1.89], [0.29, 1.91],
    [-0.25, 2.06], [-0.04, 2.05], [0.17, 2.07],
    [-0.12, 2.22], [0.1, 2.23],
  ];

  const perforation_holesGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.012, 18);
  const perforation_holes = new THREE.InstancedMesh(
    perforation_holesGeom,
    perforation_holesMat,
    perforation_positions.length
  );
  perforation_holes.name = "perforation_holes";

  const perforation_dummy = new THREE.Object3D();
  for (let i = 0; i < perforation_positions.length; i++) {
    const x = perforation_positions[i][0];
    const z = perforation_positions[i][1];
    const theta = Math.atan2(x / bowl_radius_x, (z - bowl_center_z) / bowl_radius_z);
    const boundary = bowlBoundary(theta);
    const dx = boundary.x;
    const dz = boundary.z - bowl_center_z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const t = Math.min(0.96, Math.max(0, Math.sqrt(x * x + (z - bowl_center_z) * (z - bowl_center_z)) / distance));
    const y = bowlTopY(t, theta) + 0.004;
    perforation_dummy.position.set(x, y, z);
    perforation_dummy.rotation.set(0, 0, 0);
    perforation_dummy.scale.set(1, 1, 1);
    perforation_dummy.updateMatrix();
    perforation_holes.setMatrixAt(i, perforation_dummy.matrix);
  }
  perforation_holes.instanceMatrix.needsUpdate = true;
  root.add(perforation_holes);

  const bowl_grain = new THREE.Group();
  bowl_grain.name = "bowl_grain";
  for (let i = 0; i < 9; i++) {
    const base_x = -0.48 + i * 0.12;
    const points = [];
    for (let j = 0; j <= 8; j++) {
      const z = 0.82 + j * 0.19;
      const x = base_x + 0.018 * Math.sin(j * 1.4 + i * 0.7);
      const theta = Math.atan2(x / bowl_radius_x, (z - bowl_center_z) / bowl_radius_z);
      const boundary = bowlBoundary(theta);
      const dx = boundary.x;
      const dz = boundary.z - bowl_center_z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      const t = Math.min(0.9, Math.sqrt(x * x + (z - bowl_center_z) * (z - bowl_center_z)) / distance);
      const y = bowlTopY(t, theta) + 0.008;
      points.push(new THREE.Vector3(x, y, z));
    }
    const grain_curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const grain_line = new THREE.Mesh(
      new THREE.TubeGeometry(grain_curve, 24, 0.0045, 6, false),
      i % 3 === 0 ? dark_grainMat : light_grainMat
    );
    grain_line.name = "bowl_grain_line_" + i;
    bowl_grain.add(grain_line);
  }
  root.add(bowl_grain);

  const handle_grain = new THREE.Group();
  handle_grain.name = "handle_grain";
  for (let i = 0; i < 7; i++) {
    const base_x = -0.21 + i * 0.07;
    const points = [];
    for (let j = 0; j <= 8; j++) {
      const z = -2.58 + j * 0.34;
      const x = base_x + 0.014 * Math.sin(j * 1.25 + i * 0.85);
      points.push(new THREE.Vector3(x, 0.147, z));
    }
    const grain_curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const grain_line = new THREE.Mesh(
      new THREE.TubeGeometry(grain_curve, 28, 0.0045, 6, false),
      i % 3 === 1 ? dark_grainMat : light_grainMat
    );
    grain_line.name = "handle_grain_line_" + i;
    handle_grain.add(grain_line);
  }
  root.add(handle_grain);

  const handle_knot_points = [
    new THREE.Vector3(-0.07, 0.149, -1.58),
    new THREE.Vector3(0.04, 0.149, -1.63),
    new THREE.Vector3(0.09, 0.149, -1.72),
    new THREE.Vector3(0.03, 0.149, -1.81),
    new THREE.Vector3(-0.06, 0.149, -1.77),
    new THREE.Vector3(-0.09, 0.149, -1.67),
  ];
  const handle_knot_curve = new THREE.CatmullRomCurve3(handle_knot_points, true, "centripetal");
  const handle_knotGeom = new THREE.TubeGeometry(handle_knot_curve, 32, 0.005, 6, true);
  const handle_knot = new THREE.Mesh(handle_knotGeom, dark_grainMat);
  handle_knot.name = "handle_knot";
  root.add(handle_knot);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}