export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "embossed_glass_vase";

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1f6f5,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.9,
    thickness: 0.22,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.94,
    thickness: 0.12,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_reliefMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f8f7,
    metalness: 0.0,
    roughness: 0.28,
    transmission: 0.72,
    thickness: 0.08,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_bodyProfile = [
    { r: 0.50, y: 0.00 },
    { r: 0.58, y: 0.04 },
    { r: 0.62, y: 0.14 },
    { r: 0.62, y: 0.28 },
    { r: 0.66, y: 0.48 },
    { r: 0.72, y: 0.82 },
    { r: 0.78, y: 1.25 },
    { r: 0.82, y: 1.72 },
    { r: 0.83, y: 2.05 },
    { r: 0.80, y: 2.38 },
    { r: 0.73, y: 2.68 },
    { r: 0.64, y: 2.92 },
    { r: 0.61, y: 3.08 },
    { r: 0.67, y: 3.28 },
    { r: 0.78, y: 3.47 },
    { r: 0.89, y: 3.60 },
    { r: 0.92, y: 3.66 },
    { r: 0.89, y: 3.71 },
    { r: 0.80, y: 3.71 },
    { r: 0.76, y: 3.65 },
    { r: 0.72, y: 3.50 },
    { r: 0.63, y: 3.28 },
    { r: 0.57, y: 3.08 },
    { r: 0.60, y: 2.90 },
    { r: 0.69, y: 2.65 },
    { r: 0.76, y: 2.36 },
    { r: 0.79, y: 2.04 },
    { r: 0.78, y: 1.72 },
    { r: 0.74, y: 1.26 },
    { r: 0.68, y: 0.83 },
    { r: 0.62, y: 0.49 },
    { r: 0.58, y: 0.29 },
    { r: 0.58, y: 0.20 },
    { r: 0.50, y: 0.16 }
  ];

  const glass_bodyVertices = [];
  const glass_bodyIndices = [];
  const glass_bodySegments = 64;

  for (let i = 0; i < glass_bodyProfile.length; i++) {
    const profile_point = glass_bodyProfile[i];
    for (let j = 0; j < glass_bodySegments; j++) {
      const angle = j / glass_bodySegments * Math.PI * 2;
      glass_bodyVertices.push(
        Math.cos(angle) * profile_point.r,
        profile_point.y,
        Math.sin(angle) * profile_point.r
      );
    }
  }

  for (let i = 0; i < glass_bodyProfile.length - 1; i++) {
    for (let j = 0; j < glass_bodySegments; j++) {
      const next = (j + 1) % glass_bodySegments;
      const a = i * glass_bodySegments + j;
      const b = i * glass_bodySegments + next;
      const c = (i + 1) * glass_bodySegments + next;
      const d = (i + 1) * glass_bodySegments + j;
      glass_bodyIndices.push(a, d, b, b, d, c);
    }
  }

  const glass_bodyGeo = new THREE.BufferGeometry();
  glass_bodyGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(glass_bodyVertices, 3)
  );
  glass_bodyGeo.setIndex(glass_bodyIndices);
  glass_bodyGeo.computeVertexNormals();

  const glass_body = new THREE.Mesh(glass_bodyGeo, glass_bodyMat);
  glass_body.name = "glass_body";
  root.add(glass_body);

  const thick_baseMat = glass_bodyMat;
  const thick_baseGeom = new THREE.CylinderGeometry(0.58, 0.55, 0.18, 48);
  const thick_base = new THREE.Mesh(thick_baseGeom, thick_baseMat);
  thick_base.name = "thick_base";
  thick_base.position.y = 0.10;
  root.add(thick_base);

  const base_facetsMat = clear_glassMat;
  const base_facetsGeom = new THREE.OctahedronGeometry(0.16, 0);
  const base_facet_count = 16;
  const base_facets = new THREE.InstancedMesh(
    base_facetsGeom,
    base_facetsMat,
    base_facet_count
  );
  base_facets.name = "base_facets";

  const base_facet_dummy = new THREE.Object3D();
  for (let i = 0; i < base_facet_count; i++) {
    const angle = i / base_facet_count * Math.PI * 2;
    base_facet_dummy.position.set(
      Math.cos(angle) * 0.575,
      0.19,
      Math.sin(angle) * 0.575
    );
    base_facet_dummy.rotation.set(
      0,
      Math.PI / 2 - angle,
      i % 2 === 0 ? 0.18 : -0.18
    );
    base_facet_dummy.scale.set(0.72, 1.45, 0.48);
    base_facet_dummy.updateMatrix();
    base_facets.setMatrixAt(i, base_facet_dummy.matrix);
  }
  base_facets.instanceMatrix.needsUpdate = true;
  root.add(base_facets);

  const flared_rimMat = glass_bodyMat;
  const flared_rimGeom = new THREE.TorusGeometry(0.855, 0.065, 14, 64);
  const flared_rim = new THREE.Mesh(flared_rimGeom, flared_rimMat);
  flared_rim.name = "flared_rim";
  flared_rim.rotation.x = Math.PI / 2;
  flared_rim.position.y = 3.67;
  root.add(flared_rim);

  const inner_lipMat = clear_glassMat;
  const inner_lipGeom = new THREE.TorusGeometry(0.795, 0.022, 10, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, inner_lipMat);
  inner_lip.name = "inner_lip";
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 3.695;
  root.add(inner_lip);

  const neck_bandMat = clear_glassMat;
  const neck_bandGeom = new THREE.TorusGeometry(0.615, 0.014, 8, 64);
  const neck_band = new THREE.Mesh(neck_bandGeom, neck_bandMat);
  neck_band.name = "neck_band";
  neck_band.rotation.x = Math.PI / 2;
  neck_band.position.y = 3.075;
  root.add(neck_band);

  const base_bandMat = clear_glassMat;
  const base_bandGeom = new THREE.TorusGeometry(0.595, 0.018, 8, 64);
  const base_band = new THREE.Mesh(base_bandGeom, base_bandMat);
  base_band.name = "base_band";
  base_band.rotation.x = Math.PI / 2;
  base_band.position.y = 0.31;
  root.add(base_band);

  function vaseRadiusAt(y) {
    if (y <= glass_bodyProfile[0].y) return glass_bodyProfile[0].r;
    for (let i = 0; i < glass_bodyProfile.length - 1; i++) {
      const a = glass_bodyProfile[i];
      const b = glass_bodyProfile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return glass_bodyProfile[glass_bodyProfile.length - 1].r;
  }

  function surfacePoint(angle, y, extra) {
    const radius = vaseRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceFrame(angle, y, extra) {
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function addSurfaceTube(parent, name, pairs, radius, material) {
    const points = [];
    for (let i = 0; i < pairs.length; i++) {
      points.push(surfacePoint(pairs[i][0], pairs[i][1], 0.018));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, pairs.length * 7),
      radius,
      7,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addSurfaceLeaf(
    parent,
    name,
    angle,
    y,
    width,
    height,
    tilt,
    material
  ) {
    const rows = 12;
    const columns = 5;
    const vertices = [];
    const indices = [];

    for (let row = 0; row <= rows; row++) {
      const t = row / rows;
      const local_y = (t - 0.5) * height;
      const half_width =
        width * 0.5 * Math.pow(Math.sin(Math.PI * t), 0.72);

      for (let column = 0; column < columns; column++) {
        const u = column / (columns - 1) * 2 - 1;
        const local_x = u * half_width;
        const curved_y =
          local_y +
          Math.sin(Math.PI * t) *
            (0.012 + Math.abs(u) * 0.008);
        const cos_tilt = Math.cos(tilt);
        const sin_tilt = Math.sin(tilt);
        const tangent_x = local_x * cos_tilt - curved_y * sin_tilt;
        const vertical_y = local_x * sin_tilt + curved_y * cos_tilt;
        const point_y = y + vertical_y;
        const radius = vaseRadiusAt(point_y) + 0.019;
        const point_angle =
          angle - tangent_x / Math.max(radius, 0.1);

        vertices.push(
          Math.cos(point_angle) * radius,
          point_y,
          Math.sin(point_angle) * radius
        );
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns - 1; column++) {
        const a = row * columns + column;
        const b = a + 1;
        const d = (row + 1) * columns + column;
        const c = d + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const leaf = new THREE.Mesh(geometry, material);
    leaf.name = name;
    parent.add(leaf);
    return leaf;
  }

  function addSurfaceOval(
    parent,
    name,
    angle,
    y,
    width,
    height,
    material
  ) {
    const rings = 4;
    const segments = 24;
    const vertices = [];
    const indices = [];
    const center = surfacePoint(angle, y, 0.021);
    vertices.push(center.x, center.y, center.z);

    for (let ring = 1; ring <= rings; ring++) {
      const scale = ring / rings;
      for (let i = 0; i < segments; i++) {
        const arc = i / segments * Math.PI * 2;
        const local_x = Math.cos(arc) * width * 0.5 * scale;
        const local_y = Math.sin(arc) * height * 0.5 * scale;
        const point_y = y + local_y;
        const radius = vaseRadiusAt(point_y) + 0.021;
        const point_angle =
          angle - local_x / Math.max(radius, 0.1);
        vertices.push(
          Math.cos(point_angle) * radius,
          point_y,
          Math.sin(point_angle) * radius
        );
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + (i + 1) % segments);
    }

    for (let ring = 1; ring < rings; ring++) {
      const inner_start = 1 + (ring - 1) * segments;
      const outer_start = 1 + ring * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = inner_start + i;
        const b = outer_start + i;
        const c = outer_start + next;
        const d = inner_start + next;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const oval = new THREE.Mesh(geometry, material);
    oval.name = name;
    parent.add(oval);
    return oval;
  }

  function addOvalOutline(
    parent,
    name,
    angle,
    y,
    width,
    height,
    radius,
    material
  ) {
    const points = [];
    const segments = 28;
    for (let i = 0; i < segments; i++) {
      const arc = i / segments * Math.PI * 2;
      const local_x = Math.cos(arc) * width * 0.5;
      const local_y = Math.sin(arc) * height * 0.5;
      const point_y = y + local_y;
      const point_angle =
        angle - local_x / Math.max(vaseRadiusAt(point_y), 0.1);
      points.push(surfacePoint(point_angle, point_y, 0.028));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      56,
      radius,
      6,
      true
    );
    const outline = new THREE.Mesh(geometry, material);
    outline.name = name;
    parent.add(outline);
    return outline;
  }

  const embossed_floral_relief = new THREE.Group();
  embossed_floral_relief.name = "embossed_floral_relief";
  root.add(embossed_floral_relief);

  const front_angle = Math.PI / 2;

  const central_stem = addSurfaceTube(
    embossed_floral_relief,
    "central_stem",
    [
      [front_angle + 0.02, 0.34],
      [front_angle + 0.10, 0.72],
      [front_angle + 0.04, 1.15],
      [front_angle - 0.08, 1.62],
      [front_angle - 0.15, 2.10],
      [front_angle - 0.18, 2.62]
    ],
    0.018,
    frosted_reliefMat
  );

  const left_rising_stem = addSurfaceTube(
    embossed_floral_relief,
    "left_rising_stem",
    [
      [front_angle + 0.04, 0.35],
      [front_angle + 0.28, 0.78],
      [front_angle + 0.42, 1.25],
      [front_angle + 0.48, 1.75],
      [front_angle + 0.43, 2.25],
      [front_angle + 0.34, 2.78]
    ],
    0.016,
    frosted_reliefMat
  );

  const right_rising_stem = addSurfaceTube(
    embossed_floral_relief,
    "right_rising_stem",
    [
      [front_angle - 0.02, 0.35],
      [front_angle - 0.25, 0.72],
      [front_angle - 0.42, 1.12],
      [front_angle - 0.50, 1.58],
      [front_angle - 0.47, 2.08],
      [front_angle - 0.36, 2.60]
    ],
    0.016,
    frosted_reliefMat
  );

  const left_side_vine = addSurfaceTube(
    embossed_floral_relief,
    "left_side_vine",
    [
      [front_angle + 0.72, 0.38],
      [front_angle + 0.86, 0.82],
      [front_angle + 0.91, 1.30],
      [front_angle + 0.84, 1.82],
      [front_angle + 0.72, 2.35],
      [front_angle + 0.62, 2.82]
    ],
    0.014,
    frosted_reliefMat
  );

  const right_side_vine = addSurfaceTube(
    embossed_floral_relief,
    "right_side_vine",
    [
      [front_angle - 0.72, 0.38],
      [front_angle - 0.86, 0.82],
      [front_angle - 0.91, 1.30],
      [front_angle - 0.84, 1.82],
      [front_angle - 0.72, 2.35],
      [front_angle - 0.62, 2.82]
    ],
    0.014,
    frosted_reliefMat
  );

  const lower_left_scroll = addSurfaceTube(
    embossed_floral_relief,
    "lower_left_scroll",
    [
      [front_angle + 0.02, 0.36],
      [front_angle + 0.30, 0.43],
      [front_angle + 0.55, 0.58],
      [front_angle + 0.62, 0.78],
      [front_angle + 0.52, 0.91],
      [front_angle + 0.38, 0.86]
    ],
    0.014,
    frosted_reliefMat
  );

  const lower_right_scroll = addSurfaceTube(
    embossed_floral_relief,
    "lower_right_scroll",
    [
      [front_angle - 0.02, 0.36],
      [front_angle - 0.30, 0.43],
      [front_angle - 0.55, 0.58],
      [front_angle - 0.62, 0.78],
      [front_angle - 0.52, 0.91],
      [front_angle - 0.38, 0.86]
    ],
    0.014,
    frosted_reliefMat
  );

  const central_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "central_leaf",
    front_angle - 0.08,
    1.82,
    0.28,
    1.02,
    -0.18,
    frosted_reliefMat
  );

  const upper_left_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "upper_left_leaf",
    front_angle + 0.34,
    2.28,
    0.25,
    0.88,
    0.28,
    frosted_reliefMat
  );

  const upper_right_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "upper_right_leaf",
    front_angle - 0.38,
    2.20,
    0.25,
    0.90,
    -0.28,
    frosted_reliefMat
  );

  const middle_left_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "middle_left_leaf",
    front_angle + 0.43,
    1.55,
    0.30,
    0.82,
    0.55,
    frosted_reliefMat
  );

  const middle_right_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "middle_right_leaf",
    front_angle - 0.45,
    1.48,
    0.30,
    0.82,
    -0.55,
    frosted_reliefMat
  );

  const lower_left_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "lower_left_leaf",
    front_angle + 0.30,
    0.91,
    0.32,
    0.76,
    0.78,
    frosted_reliefMat
  );

  const lower_right_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "lower_right_leaf",
    front_angle - 0.31,
    0.88,
    0.32,
    0.76,
    -0.78,
    frosted_reliefMat
  );

  const bottom_left_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "bottom_left_leaf",
    front_angle + 0.48,
    0.52,
    0.25,
    0.52,
    1.02,
    frosted_reliefMat
  );

  const bottom_right_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "bottom_right_leaf",
    front_angle - 0.48,
    0.52,
    0.25,
    0.52,
    -1.02,
    frosted_reliefMat
  );

  const rosette_ringGeom = new THREE.TorusGeometry(0.135, 0.012, 7, 32);
  const rosette_spokeGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.115,
    6
  );
  const rosette_centerGeom = new THREE.CircleGeometry(0.027, 16);

  function createRosette(name, angle, y, scale) {
    const rosette = new THREE.Group();
    rosette.name = name;

    const frame = surfaceFrame(angle, y, 0.022);
    rosette.position.copy(frame.position);
    rosette.quaternion.copy(frame.quaternion);
    rosette.scale.setScalar(scale);

    const ring = new THREE.Mesh(rosette_ringGeom, frosted_reliefMat);
    ring.name = name + "_ring";
    rosette.add(ring);

    const spokes = new THREE.InstancedMesh(
      rosette_spokeGeom,
      frosted_reliefMat,
      10
    );
    spokes.name = name + "_spokes";
    const spoke_dummy = new THREE.Object3D();

    for (let i = 0; i < 10; i++) {
      const a = i / 10 * Math.PI * 2;
      spoke_dummy.position.set(
        Math.cos(a) * 0.057,
        Math.sin(a) * 0.057,
        0.004
      );
      spoke_dummy.rotation.set(0, 0, a - Math.PI / 2);
      spoke_dummy.scale.set(1, 1, 1);
      spoke_dummy.updateMatrix();
      spokes.setMatrixAt(i, spoke_dummy.matrix);
    }
    spokes.instanceMatrix.needsUpdate = true;
    rosette.add(spokes);

    const center = new THREE.Mesh(
      rosette_centerGeom,
      frosted_reliefMat
    );
    center.name = name + "_center";
    center.position.z = 0.008;
    rosette.add(center);

    embossed_floral_relief.add(rosette);
    return rosette;
  }

  const left_rosette = createRosette(
    "left_rosette",
    front_angle + 0.55,
    0.61,
    1.0
  );

  const right_rosette = createRosette(
    "right_rosette",
    front_angle - 0.55,
    0.61,
    1.0
  );

  const left_upper_glint_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "left_upper_glint_leaf",
    front_angle + 0.58,
    2.92,
    0.13,
    0.42,
    0.48,
    clear_glassMat
  );

  const right_upper_glint_leaf = addSurfaceLeaf(
    embossed_floral_relief,
    "right_upper_glint_leaf",
    front_angle - 0.58,
    2.92,
    0.13,
    0.42,
    -0.48,
    clear_glassMat
  );

  const left_lower_glint = addSurfaceOval(
    embossed_floral_relief,
    "left_lower_glint",
    front_angle + 0.70,
    1.03,
    0.075,
    0.30,
    clear_glassMat
  );

  const right_lower_glint = addSurfaceOval(
    embossed_floral_relief,
    "right_lower_glint",
    front_angle - 0.70,
    1.03,
    0.075,
    0.30,
    clear_glassMat
  );

  const left_rosette_outline = addOvalOutline(
    embossed_floral_relief,
    "left_rosette_outline",
    front_angle + 0.55,
    0.61,
    0.285,
    0.285,
    0.009,
    clear_glassMat
  );

  const right_rosette_outline = addOvalOutline(
    embossed_floral_relief,
    "right_rosette_outline",
    front_angle - 0.55,
    0.61,
    0.285,
    0.285,
    0.009,
    clear_glassMat
  );

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