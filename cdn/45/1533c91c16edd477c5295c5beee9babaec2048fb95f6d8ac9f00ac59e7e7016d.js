export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lighthouse";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const tower_group = new THREE.Group();
  tower_group.name = "tower_group";
  root.add(tower_group);

  const gallery_group = new THREE.Group();
  gallery_group.name = "gallery_group";
  root.add(gallery_group);

  const lantern_group = new THREE.Group();
  lantern_group.name = "lantern_group";
  root.add(lantern_group);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x686b65,
    metalness: 0.0,
    roughness: 0.9
  });
  const darkStoneMat = new THREE.MeshStandardMaterial({
    color: 0x4c514d,
    metalness: 0.0,
    roughness: 0.9
  });
  const trimStoneMat = new THREE.MeshStandardMaterial({
    color: 0x777b73,
    metalness: 0.0,
    roughness: 0.85
  });
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0xd8d7cc,
    metalness: 0.0,
    roughness: 0.9
  });
  const towerWeatheringMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8ad,
    metalness: 0.0,
    roughness: 0.95
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x171b1a,
    metalness: 0.0,
    roughness: 0.9
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x35231f,
    metalness: 0.2,
    roughness: 0.8
  });
  const railingMat = new THREE.MeshStandardMaterial({
    color: 0x454b48,
    metalness: 0.35,
    roughness: 0.7
  });
  const lanternGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff4cf,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });
  const lanternFrameMat = new THREE.MeshStandardMaterial({
    color: 0xc8c2a9,
    metalness: 0.25,
    roughness: 0.55
  });
  const lanternRoofMat = new THREE.MeshStandardMaterial({
    color: 0xd8d2b9,
    metalness: 0.15,
    roughness: 0.6
  });
  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xfffbe0,
    metalness: 0.0,
    roughness: 0.35,
    emissive: 0xfff2b0,
    emissiveIntensity: 1.6
  });
  const lightHaloMat = new THREE.MeshBasicMaterial({
    color: 0xfff2b8,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  });

  const baseBottomRadius = 1.28;
  const baseTopRadius = 1.18;
  const baseHeight = 0.18;
  const towerBottomY = 0.78;
  const towerTopY = 4.58;
  const towerHeight = towerTopY - towerBottomY;
  const towerBottomRadius = 0.58;
  const towerTopRadius = 0.42;

  function addNamed(parent, object, name) {
    object.name = name;
    parent.add(object);
    return object;
  }

  function towerRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - towerBottomY) / towerHeight));
    return towerBottomRadius + (towerTopRadius - towerBottomRadius) * t;
  }

  function createArchShape(width, height) {
    const shape = new THREE.Shape();
    const radius = width * 0.5;
    const springY = height - radius;
    shape.moveTo(-width * 0.5, 0);
    shape.lineTo(-width * 0.5, springY);
    shape.absarc(0, springY, radius, Math.PI, 0, true);
    shape.lineTo(width * 0.5, 0);
    shape.closePath();
    return shape;
  }

  const base_foundation = addNamed(
    base_group,
    new THREE.Mesh(
      new THREE.CylinderGeometry(baseTopRadius, baseBottomRadius, baseHeight, 8),
      darkStoneMat
    ),
    "base_foundation"
  );
  base_foundation.position.y = baseHeight * 0.5;
  base_foundation.rotation.y = Math.PI / 8;

  const base_upper_step = addNamed(
    base_group,
    new THREE.Mesh(new THREE.CylinderGeometry(1.13, 1.18, 0.1, 8), stoneMat),
    "base_upper_step"
  );
  base_upper_step.position.y = 0.23;
  base_upper_step.rotation.y = Math.PI / 8;

  const base_walkway = addNamed(
    base_group,
    new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.1, 0.08, 8), trimStoneMat),
    "base_walkway"
  );
  base_walkway.position.y = 0.31;
  base_walkway.rotation.y = Math.PI / 8;

  const base_pedestal = addNamed(
    base_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.86, 0.58, 12), darkStoneMat),
    "base_pedestal"
  );
  base_pedestal.position.y = 0.57;
  base_pedestal.rotation.y = Math.PI / 12;

  const pedestal_panel_seam_geom = new THREE.BoxGeometry(0.018, 0.48, 0.014);
  const base_pedestal_seams = new THREE.InstancedMesh(
    pedestal_panel_seam_geom,
    recessMat,
    12
  );
  base_pedestal_seams.name = "base_pedestal_seams";
  const pedestalSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    pedestalSeamDummy.position.set(
      Math.sin(angle) * 0.77,
      0.57,
      Math.cos(angle) * 0.77
    );
    pedestalSeamDummy.rotation.set(0, angle, 0);
    pedestalSeamDummy.updateMatrix();
    base_pedestal_seams.setMatrixAt(i, pedestalSeamDummy.matrix);
  }
  base_pedestal_seams.instanceMatrix.needsUpdate = true;
  base_group.add(base_pedestal_seams);

  const base_lower_molding = addNamed(
    base_group,
    new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.065, 8, 32), trimStoneMat),
    "base_lower_molding"
  );
  base_lower_molding.position.y = 0.79;
  base_lower_molding.rotation.x = Math.PI / 2;

  const base_upper_molding = addNamed(
    base_group,
    new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.055, 8, 32), trimStoneMat),
    "base_upper_molding"
  );
  base_upper_molding.position.y = 0.86;
  base_upper_molding.rotation.x = Math.PI / 2;

  const base_rail_post_geom = new THREE.BoxGeometry(0.055, 0.27, 0.055);
  const base_rail_posts = new THREE.InstancedMesh(
    base_rail_post_geom,
    trimStoneMat,
    24
  );
  base_rail_posts.name = "base_rail_posts";
  const basePostDummy = new THREE.Object3D();
  let basePostIndex = 0;
  for (let side = 0; side < 8; side++) {
    const angle = side / 8 * Math.PI * 2;
    const radialX = Math.sin(angle);
    const radialZ = Math.cos(angle);
    const tangentX = Math.cos(angle);
    const tangentZ = -Math.sin(angle);
    for (let j = -1; j <= 1; j++) {
      const tangentOffset = j * 0.27;
      basePostDummy.position.set(
        radialX * 1.02 + tangentX * tangentOffset,
        0.49,
        radialZ * 1.02 + tangentZ * tangentOffset
      );
      basePostDummy.rotation.set(0, angle, 0);
      basePostDummy.updateMatrix();
      base_rail_posts.setMatrixAt(basePostIndex++, basePostDummy.matrix);
    }
  }
  base_rail_posts.instanceMatrix.needsUpdate = true;
  base_group.add(base_rail_posts);

  const base_rail_top_geom = new THREE.BoxGeometry(0.64, 0.055, 0.055);
  const base_rail_top = new THREE.InstancedMesh(
    base_rail_top_geom,
    trimStoneMat,
    8
  );
  base_rail_top.name = "base_rail_top";

  const base_rail_middle = new THREE.InstancedMesh(
    base_rail_top_geom,
    trimStoneMat,
    8
  );
  base_rail_middle.name = "base_rail_middle";

  const baseRailDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const x = Math.sin(angle) * 1.02;
    const z = Math.cos(angle) * 1.02;

    baseRailDummy.position.set(x, 0.625, z);
    baseRailDummy.rotation.set(0, angle, 0);
    baseRailDummy.updateMatrix();
    base_rail_top.setMatrixAt(i, baseRailDummy.matrix);

    baseRailDummy.position.set(x, 0.49, z);
    baseRailDummy.updateMatrix();
    base_rail_middle.setMatrixAt(i, baseRailDummy.matrix);
  }
  base_rail_top.instanceMatrix.needsUpdate = true;
  base_rail_middle.instanceMatrix.needsUpdate = true;
  base_group.add(base_rail_top, base_rail_middle);

  const tower_body = addNamed(
    tower_group,
    new THREE.Mesh(
      new THREE.CylinderGeometry(towerTopRadius, towerBottomRadius, towerHeight, 32),
      towerMat
    ),
    "tower_body"
  );
  tower_body.position.y = towerBottomY + towerHeight * 0.5;

  const tower_weathering_geom = new THREE.BoxGeometry(0.075, 0.012, 0.006);
  const tower_weathering = new THREE.InstancedMesh(
    tower_weathering_geom,
    towerWeatheringMat,
    18
  );
  tower_weathering.name = "tower_weathering";
  const weatherDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const y = 1.05 + ((i * 17) % 100) / 100 * 3.15;
    const angle = -1.0 + ((i * 29) % 100) / 100 * 2.0;
    const radius = towerRadiusAt(y) + 0.006;
    const widthScale = 0.55 + ((i * 13) % 10) / 10;
    weatherDummy.position.set(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    weatherDummy.rotation.set(0, angle, ((i % 5) - 2) * 0.025);
    weatherDummy.scale.set(widthScale, 1, 1);
    weatherDummy.updateMatrix();
    tower_weathering.setMatrixAt(i, weatherDummy.matrix);
  }
  tower_weathering.instanceMatrix.needsUpdate = true;
  tower_group.add(tower_weathering);

  const window_recess_shape = createArchShape(0.18, 0.34);
  const window_recess_geom = new THREE.ShapeGeometry(window_recess_shape, 12);
  const window_trim_shape = createArchShape(0.25, 0.41);
  const window_trim_geom = new THREE.ShapeGeometry(window_trim_shape, 12);
  const window_pane_geom = new THREE.BoxGeometry(0.012, 0.2, 0.008);
  const window_mullion_geom = new THREE.BoxGeometry(0.14, 0.014, 0.009);

  function createTowerWindow(name, y, angle) {
    const window_group = new THREE.Group();
    window_group.name = name;
    const radius = towerRadiusAt(y) + 0.006;
    window_group.position.set(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    window_group.rotation.y = angle;

    const trim = new THREE.Mesh(window_trim_geom, trimStoneMat);
    trim.name = name + "_trim";
    trim.position.set(0, 0, 0.004);
    window_group.add(trim);

    const recess = new THREE.Mesh(window_recess_geom, recessMat);
    recess.name = name + "_recess";
    recess.position.set(0, 0.035, 0.01);
    window_group.add(recess);

    const pane = new THREE.Mesh(window_pane_geom, recessMat);
    pane.name = name + "_pane";
    pane.position.set(0, 0.145, 0.016);
    window_group.add(pane);

    const mullion = new THREE.Mesh(window_mullion_geom, darkStoneMat);
    mullion.name = name + "_mullion";
    mullion.position.set(0, 0.145, 0.021);
    window_group.add(mullion);

    tower_group.add(window_group);
    return window_group;
  }

  const lower_window = createTowerWindow("lower_window", 1.78, 0);
  const middle_window = createTowerWindow("middle_window", 2.78, 0);
  const upper_window = createTowerWindow("upper_window", 3.78, 0);

  const service_slot_shape = createArchShape(0.075, 0.25);
  const service_slot_geom = new THREE.ShapeGeometry(service_slot_shape, 8);
  const service_slot = new THREE.Mesh(service_slot_geom, recessMat);
  service_slot.name = "service_slot";
  const serviceSlotAngle = 1.05;
  const serviceSlotY = 1.28;
  service_slot.position.set(
    Math.sin(serviceSlotAngle) * (towerRadiusAt(serviceSlotY) + 0.006),
    serviceSlotY,
    Math.cos(serviceSlotAngle) * (towerRadiusAt(serviceSlotY) + 0.006)
  );
  service_slot.rotation.y = serviceSlotAngle;
  tower_group.add(service_slot);

  const entrance_door_shape = createArchShape(0.27, 0.5);
  const entrance_door_geom = new THREE.ShapeGeometry(entrance_door_shape, 12);
  const entrance_door = new THREE.Mesh(entrance_door_geom, doorMat);
  entrance_door.name = "entrance_door";
  entrance_door.position.set(0, 0.87, towerRadiusAt(0.87) + 0.012);
  tower_group.add(entrance_door);

  const entrance_trim_shape = createArchShape(0.37, 0.59);
  const entrance_trim_geom = new THREE.ShapeGeometry(entrance_trim_shape, 12);
  const entrance_trim = new THREE.Mesh(entrance_trim_geom, trimStoneMat);
  entrance_trim.name = "entrance_trim";
  entrance_trim.position.set(0, 0.83, towerRadiusAt(0.83) + 0.005);
  tower_group.add(entrance_trim);
  entrance_door.position.z = towerRadiusAt(0.87) + 0.019;

  const entrance_panel_geom = new THREE.BoxGeometry(0.012, 0.28, 0.008);
  const entrance_door_panels = new THREE.InstancedMesh(
    entrance_panel_geom,
    darkStoneMat,
    2
  );
  entrance_door_panels.name = "entrance_door_panels";
  const entrancePanelDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    entrancePanelDummy.position.set(
      i === 0 ? -0.055 : 0.055,
      1.08,
      towerRadiusAt(0.87) + 0.025
    );
    entrancePanelDummy.updateMatrix();
    entrance_door_panels.setMatrixAt(i, entrancePanelDummy.matrix);
  }
  entrance_door_panels.instanceMatrix.needsUpdate = true;
  tower_group.add(entrance_door_panels);

  const entrance_knob = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 10, 6),
    lanternRoofMat
  );
  entrance_knob.name = "entrance_knob";
  entrance_knob.position.set(0.085, 1.08, towerRadiusAt(0.87) + 0.035);
  tower_group.add(entrance_knob);

  const tower_top_collar = addNamed(
    gallery_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.44, 0.14, 24), trimStoneMat),
    "tower_top_collar"
  );
  tower_top_collar.position.y = 4.56;

  const gallery_support_drum = addNamed(
    gallery_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.49, 0.18, 24), darkStoneMat),
    "gallery_support_drum"
  );
  gallery_support_drum.position.y = 4.67;

  const gallery_brace_geom = new THREE.CylinderGeometry(0.024, 0.024, 1, 6);
  const gallery_braces = new THREE.InstancedMesh(
    gallery_brace_geom,
    darkStoneMat,
    16
  );
  gallery_braces.name = "gallery_braces";
  const braceDummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const lower = new THREE.Vector3(
      Math.sin(angle) * 0.45,
      4.59,
      Math.cos(angle) * 0.45
    );
    const upper = new THREE.Vector3(
      Math.sin(angle) * 0.66,
      4.77,
      Math.cos(angle) * 0.66
    );
    const direction = new THREE.Vector3().subVectors(upper, lower);
    const length = direction.length();
    braceDummy.position.copy(lower).add(upper).multiplyScalar(0.5);
    braceDummy.quaternion.setFromUnitVectors(up, direction.normalize());
    braceDummy.scale.set(1, length, 1);
    braceDummy.updateMatrix();
    gallery_braces.setMatrixAt(i, braceDummy.matrix);
  }
  gallery_braces.instanceMatrix.needsUpdate = true;
  gallery_group.add(gallery_braces);

  const gallery_lower_slab = addNamed(
    gallery_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.69, 0.13, 24), darkStoneMat),
    "gallery_lower_slab"
  );
  gallery_lower_slab.position.y = 4.78;

  const gallery_deck = addNamed(
    gallery_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.76, 0.12, 32), stoneMat),
    "gallery_deck"
  );
  gallery_deck.position.y = 4.88;

  const gallery_post_geom = new THREE.BoxGeometry(0.035, 0.4, 0.035);
  const gallery_rail_posts = new THREE.InstancedMesh(
    gallery_post_geom,
    railingMat,
    20
  );
  gallery_rail_posts.name = "gallery_rail_posts";
  const galleryPostDummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    galleryPostDummy.position.set(
      Math.sin(angle) * 0.72,
      5.13,
      Math.cos(angle) * 0.72
    );
    galleryPostDummy.rotation.set(0, angle, 0);
    galleryPostDummy.updateMatrix();
    gallery_rail_posts.setMatrixAt(i, galleryPostDummy.matrix);
  }
  gallery_rail_posts.instanceMatrix.needsUpdate = true;
  gallery_group.add(gallery_rail_posts);

  const gallery_rail_top = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.018, 6, 40),
    railingMat
  );
  gallery_rail_top.name = "gallery_rail_top";
  gallery_rail_top.position.y = 5.33;
  gallery_rail_top.rotation.x = Math.PI / 2;
  gallery_group.add(gallery_rail_top);

  const gallery_rail_middle = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.014, 6, 40),
    railingMat
  );
  gallery_rail_middle.name = "gallery_rail_middle";
  gallery_rail_middle.position.y = 5.13;
  gallery_rail_middle.rotation.x = Math.PI / 2;
  gallery_group.add(gallery_rail_middle);

  const lantern_pedestal = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.46, 0.34, 24), lanternFrameMat),
    "lantern_pedestal"
  );
  lantern_pedestal.position.y = 5.08;

  const lantern_lower_sill = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.46, 0.1, 24), lanternFrameMat),
    "lantern_lower_sill"
  );
  lantern_lower_sill.position.y = 5.27;

  const lantern_glass = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.74, 32, 1, true), lanternGlassMat),
    "lantern_glass"
  );
  lantern_glass.position.y = 5.68;

  const lantern_light_column = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.62, 24), lightMat),
    "lantern_light_column"
  );
  lantern_light_column.position.y = 5.68;

  const lantern_light_halo = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.68, 24),
    lightHaloMat
  );
  lantern_light_halo.name = "lantern_light_halo";
  lantern_light_halo.position.y = 5.68;
  lantern_group.add(lantern_light_halo);

  const lantern_mullion_geom = new THREE.BoxGeometry(0.026, 0.76, 0.026);
  const lantern_mullions = new THREE.InstancedMesh(
    lantern_mullion_geom,
    lanternFrameMat,
    12
  );
  lantern_mullions.name = "lantern_mullions";
  const lanternMullionDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    lanternMullionDummy.position.set(
      Math.sin(angle) * 0.405,
      5.68,
      Math.cos(angle) * 0.405
    );
    lanternMullionDummy.rotation.set(0, angle, 0);
    lanternMullionDummy.updateMatrix();
    lantern_mullions.setMatrixAt(i, lanternMullionDummy.matrix);
  }
  lantern_mullions.instanceMatrix.needsUpdate = true;
  lantern_group.add(lantern_mullions);

  const lantern_lower_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.405, 0.025, 8, 36),
    lanternFrameMat
  );
  lantern_lower_ring.name = "lantern_lower_ring";
  lantern_lower_ring.position.y = 5.31;
  lantern_lower_ring.rotation.x = Math.PI / 2;
  lantern_group.add(lantern_lower_ring);

  const lantern_middle_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.405, 0.017, 6, 36),
    lanternFrameMat
  );
  lantern_middle_ring.name = "lantern_middle_ring";
  lantern_middle_ring.position.y = 5.68;
  lantern_middle_ring.rotation.x = Math.PI / 2;
  lantern_group.add(lantern_middle_ring);

  const lantern_upper_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.405, 0.025, 8, 36),
    lanternFrameMat
  );
  lantern_upper_ring.name = "lantern_upper_ring";
  lantern_upper_ring.position.y = 6.05;
  lantern_upper_ring.rotation.x = Math.PI / 2;
  lantern_group.add(lantern_upper_ring);

  const lantern_roof_eave = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.47, 0.08, 32), lanternRoofMat),
    "lantern_roof_eave"
  );
  lantern_roof_eave.position.y = 6.08;

  const lantern_roof = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.49, 0.34, 32), lanternRoofMat),
    "lantern_roof"
  );
  lantern_roof.position.y = 6.27;

  const lantern_roof_cap = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.08, 20), lanternRoofMat),
    "lantern_roof_cap"
  );
  lantern_roof_cap.position.y = 6.47;

  const lantern_finial_stem = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.12, 16), lanternRoofMat),
    "lantern_finial_stem"
  );
  lantern_finial_stem.position.y = 6.56;

  const lantern_finial = addNamed(
    lantern_group,
    new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 12), lanternRoofMat),
    "lantern_finial"
  );
  lantern_finial.position.y = 6.68;
  lantern_finial.scale.set(1, 1.08, 1);

  const finial_tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.035, 0.1, 12),
    lanternRoofMat
  );
  finial_tip.name = "finial_tip";
  finial_tip.position.y = 6.81;
  lantern_group.add(finial_tip);

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

  fitToUnitCube(THREE, root);
  return root;
}