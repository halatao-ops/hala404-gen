export default function generate(THREE) {
  const root = new THREE.Group();
  const fruit = new THREE.Group();
  root.add(fruit);

  const fruit_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.72,
    emissive: 0xe9782d,
    emissiveIntensity: 0.18,
  });

  const pale_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xf2bd86,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const dark_flecksMat = new THREE.MeshStandardMaterial({
    color: 0x68452d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const bruiseMat = new THREE.MeshStandardMaterial({
    color: 0x805039,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const calyxMat = new THREE.MeshStandardMaterial({
    color: 0x756044,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const dried_stemMat = new THREE.MeshStandardMaterial({
    color: 0x5d4932,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stem_centerMat = new THREE.MeshStandardMaterial({
    color: 0x927854,
    metalness: 0.0,
    roughness: 0.9,
  });

  function surfacePoint(u, theta) {
    const ring = Math.sqrt(Math.max(0, 1 - u * u));
    const broad = 1 + 0.018 * Math.sin(3 * theta + 0.8) * ring;
    const skin =
      1 +
      0.004 * Math.sin(29 * u + 17 * theta) +
      0.0025 * Math.sin(53 * u - 11 * theta);
    const radial = ring * broad * skin;

    return new THREE.Vector3(
      1.18 * u + 0.035 * (1 - u * u),
      0.86 * radial * Math.cos(theta) * (1 - 0.035 * u),
      0.84 * radial * Math.sin(theta) * (1 + 0.025 * u)
    );
  }

  function surfaceNormal(u, theta) {
    const du = 0.003;
    const dt = 0.003;
    const u0 = Math.max(-0.998, u - du);
    const u1 = Math.min(0.998, u + du);
    const tangent_u = surfacePoint(u1, theta).sub(surfacePoint(u0, theta));
    const tangent_t = surfacePoint(u, theta + dt).sub(surfacePoint(u, theta - dt));
    return tangent_u.cross(tangent_t).normalize();
  }

  const fruit_bodyGeom = new THREE.SphereGeometry(1, 96, 64);
  const fruit_positions = fruit_bodyGeom.attributes.position;
  const fruit_colors = new Float32Array(fruit_positions.count * 3);
  const base_color = new THREE.Color(0xe9782d);
  const golden_color = new THREE.Color(0xf49a45);
  const red_color = new THREE.Color(0xdc6032);
  const vertex_color = new THREE.Color();

  for (let i = 0; i < fruit_positions.count; i++) {
    const ox = fruit_positions.getX(i);
    const oy = fruit_positions.getY(i);
    const oz = fruit_positions.getZ(i);
    const length = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
    const u = ox / length;
    const theta = Math.atan2(oz, oy);
    const point = surfacePoint(u, theta);

    fruit_positions.setXYZ(i, point.x, point.y, point.z);

    const mottling =
      0.5 +
      0.5 *
        Math.sin(8.5 * u + 3.2 * theta) *
        Math.sin(12.0 * u - 5.1 * theta);
    const warm =
      0.5 + 0.5 * Math.sin(3.7 * u - 2.2 * theta + 0.4 * Math.sin(5 * u));

    vertex_color.copy(base_color);
    vertex_color.lerp(golden_color, 0.12 + 0.2 * mottling);
    vertex_color.lerp(red_color, 0.06 + 0.1 * (1 - warm));
    fruit_colors[i * 3] = vertex_color.r;
    fruit_colors[i * 3 + 1] = vertex_color.g;
    fruit_colors[i * 3 + 2] = vertex_color.b;
  }

  fruit_positions.needsUpdate = true;
  fruit_bodyGeom.setAttribute(
    "color",
    new THREE.BufferAttribute(fruit_colors, 3)
  );
  fruit_bodyGeom.computeVertexNormals();

  const fruit_body = new THREE.Mesh(fruit_bodyGeom, fruit_bodyMat);
  fruit.add(fruit_body);

  const surface_markGeom = new THREE.CircleGeometry(1, 10);

  function createSurfaceMarks(count, material, phase, minSize, maxSize) {
    const marks = new THREE.InstancedMesh(surface_markGeom, material, count);
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const spin_quaternion = new THREE.Quaternion();
    const normal_axis = new THREE.Vector3(0, 0, 1);
    const spin_axis = new THREE.Vector3(0, 0, 1);
    const scale = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const u = -0.9 + 1.8 * (((i * 37 + phase * 11) % 101) / 100);
      const theta =
        (i * 2.399963229728653 + phase * 0.73) % (Math.PI * 2);
      const point = surfacePoint(u, theta);
      const normal = surfaceNormal(u, theta);
      const size =
        minSize +
        (maxSize - minSize) * (((i * 29 + phase * 7) % 19) / 18);
      const stretch = 0.55 + 1.25 * (((i * 17 + phase * 3) % 13) / 12);

      quaternion.setFromUnitVectors(normal_axis, normal);
      spin_quaternion.setFromAxisAngle(
        spin_axis,
        ((i * 41 + phase * 13) % 360) * Math.PI / 180
      );
      quaternion.multiply(spin_quaternion);
      scale.set(size * stretch, size, 1);
      matrix.compose(point, quaternion, scale);
      marks.setMatrixAt(i, matrix);
    }

    marks.instanceMatrix.needsUpdate = true;
    return marks;
  }

  const pale_speckles = createSurfaceMarks(
    150,
    pale_specklesMat,
    3,
    0.004,
    0.014
  );
  fruit.add(pale_speckles);

  const dark_flecks = createSurfaceMarks(
    42,
    dark_flecksMat,
    7,
    0.003,
    0.009
  );
  fruit.add(dark_flecks);

  const bruise_u = 0.78;
  const bruise_theta = 0.72;
  const bruise_point = surfacePoint(bruise_u, bruise_theta);
  const bruise_normal = surfaceNormal(bruise_u, bruise_theta);
  const bruise_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bruise_normal
  );

  const bruise_haloGeom = new THREE.CircleGeometry(0.065, 20);
  const bruise_halo = new THREE.Mesh(bruise_haloGeom, bruiseMat);
  bruise_halo.position.copy(bruise_point).addScaledVector(bruise_normal, 0.006);
  bruise_halo.quaternion.copy(bruise_quaternion);
  bruise_halo.scale.set(1.15, 0.72, 1);
  fruit.add(bruise_halo);

  const bruise_coreGeom = new THREE.CircleGeometry(0.018, 12);
  const bruise_core = new THREE.Mesh(bruise_coreGeom, dark_flecksMat);
  bruise_core.position.copy(bruise_point).addScaledVector(bruise_normal, 0.009);
  bruise_core.quaternion.copy(bruise_quaternion);
  bruise_core.scale.set(1.25, 0.75, 1);
  fruit.add(bruise_core);

  const stem_u = -0.965;
  const stem_theta = 2.55;
  const stem_point = surfacePoint(stem_u, stem_theta);
  const stem_normal = surfaceNormal(stem_u, stem_theta);
  const stem_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    stem_normal
  );

  const calyx_patchGeom = new THREE.CircleGeometry(0.105, 24);
  const calyx_patch = new THREE.Mesh(calyx_patchGeom, calyxMat);
  calyx_patch.position.copy(stem_point).addScaledVector(stem_normal, 0.008);
  calyx_patch.quaternion.copy(stem_quaternion);
  calyx_patch.scale.set(1.08, 0.82, 1);
  fruit.add(calyx_patch);

  const calyx_sepalGeom = new THREE.CircleGeometry(1, 12);
  const calyx_sepals = new THREE.InstancedMesh(
    calyx_sepalGeom,
    calyxMat,
    6
  );
  const sepal_matrix = new THREE.Matrix4();
  const sepal_quaternion = new THREE.Quaternion();
  const sepal_spin = new THREE.Quaternion();
  const sepal_axis = new THREE.Vector3(0, 0, 1);
  const sepal_scale = new THREE.Vector3();

  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    const tangent_offset = new THREE.Vector3(
      Math.cos(angle) * 0.052,
      Math.sin(angle) * 0.052,
      0
    ).applyQuaternion(stem_quaternion);
    const position = stem_point
      .clone()
      .addScaledVector(stem_normal, 0.012)
      .add(tangent_offset);

    sepal_spin.setFromAxisAngle(sepal_axis, angle - Math.PI / 2);
    sepal_quaternion.copy(stem_quaternion).multiply(sepal_spin);
    sepal_scale.set(0.022, 0.068, 1);
    sepal_matrix.compose(position, sepal_quaternion, sepal_scale);
    calyx_sepals.setMatrixAt(i, sepal_matrix);
  }

  calyx_sepals.instanceMatrix.needsUpdate = true;
  fruit.add(calyx_sepals);

  const dried_stemGeom = new THREE.CylinderGeometry(
    0.034,
    0.061,
    0.105,
    7
  );
  const dried_stem = new THREE.Mesh(dried_stemGeom, dried_stemMat);
  dried_stem.position.copy(stem_point).addScaledVector(stem_normal, 0.06);
  dried_stem.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    stem_normal
  );
  fruit.add(dried_stem);

  const stem_centerGeom = new THREE.DodecahedronGeometry(0.032, 0);
  const stem_center = new THREE.Mesh(stem_centerGeom, stem_centerMat);
  stem_center.position.copy(stem_point).addScaledVector(stem_normal, 0.118);
  stem_center.scale.set(0.9, 0.65, 0.9);
  fruit.add(stem_center);

  fruit.rotation.y = -0.08;
  fruit.rotation.z = 0.1;

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