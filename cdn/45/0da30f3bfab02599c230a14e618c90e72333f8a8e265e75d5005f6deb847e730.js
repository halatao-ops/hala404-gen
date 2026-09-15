export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b4f2c,
    metalness: 0.2,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b1d12,
    metalness: 0.1,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });
  const grainLineMat = new THREE.LineBasicMaterial({
    color: 0x2d160d,
    transparent: true,
    opacity: 0.58,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb88a35,
    metalness: 0.7,
    roughness: 0.35,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x76521c,
    metalness: 0.6,
    roughness: 0.45,
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.85,
  });
  const innerGlowMat = new THREE.MeshStandardMaterial({
    color: 0xffb33a,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
  });

  const baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.58, 0.00),
    new THREE.Vector2(0.67, 0.035),
    new THREE.Vector2(0.70, 0.095),
    new THREE.Vector2(0.68, 0.165),
    new THREE.Vector2(0.56, 0.225),
    new THREE.Vector2(0.36, 0.285),
    new THREE.Vector2(0.23, 0.365),
    new THREE.Vector2(0.18, 0.475),
    new THREE.Vector2(0.00, 0.475),
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile);
  const base = new THREE.Mesh(baseGeom, brassMat);
  root.add(base);

  const base_foot = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.025, 64), cordMat);
  base_foot.position.y = -0.012;
  root.add(base_foot);

  const base_highlight_ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.012, 8, 64), darkBrassMat);
  base_highlight_ring.position.y = 0.185;
  base_highlight_ring.rotation.x = Math.PI / 2;
  root.add(base_highlight_ring);

  const stemProfile = [
    new THREE.Vector2(0.00, 0.43),
    new THREE.Vector2(0.17, 0.43),
    new THREE.Vector2(0.22, 0.50),
    new THREE.Vector2(0.25, 0.62),
    new THREE.Vector2(0.27, 0.78),
    new THREE.Vector2(0.28, 0.96),
    new THREE.Vector2(0.26, 1.14),
    new THREE.Vector2(0.22, 1.34),
    new THREE.Vector2(0.19, 1.53),
    new THREE.Vector2(0.20, 1.68),
    new THREE.Vector2(0.25, 1.78),
    new THREE.Vector2(0.00, 1.78),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile);
  const stem = new THREE.Mesh(stemGeom, woodMat);
  root.add(stem);

  const stem_top_cap = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.055, 48), brassMat);
  stem_top_cap.position.y = 1.79;
  root.add(stem_top_cap);

  const stem_lower_shadow = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.012, 8, 48), darkBrassMat);
  stem_lower_shadow.position.y = 0.47;
  stem_lower_shadow.rotation.x = Math.PI / 2;
  root.add(stem_lower_shadow);

  const shadeBottomY = 1.82;
  const shadeTopY = 2.88;
  const shadeH = shadeTopY - shadeBottomY;
  const shadeBottomR = 0.78;
  const shadeTopR = 0.48;

  const lampshadeGeom = new THREE.CylinderGeometry(shadeTopR, shadeBottomR, shadeH, 96, 1, true);
  const lampshade = new THREE.Mesh(lampshadeGeom, woodMat);
  lampshade.position.y = (shadeBottomY + shadeTopY) * 0.5;
  root.add(lampshade);

  const shade_top_rim = new THREE.Mesh(new THREE.TorusGeometry(shadeTopR, 0.018, 10, 96), darkWoodMat);
  shade_top_rim.position.y = shadeTopY;
  shade_top_rim.rotation.x = Math.PI / 2;
  root.add(shade_top_rim);

  const shade_bottom_rim = new THREE.Mesh(new THREE.TorusGeometry(shadeBottomR, 0.018, 10, 96), darkWoodMat);
  shade_bottom_rim.position.y = shadeBottomY;
  shade_bottom_rim.rotation.x = Math.PI / 2;
  root.add(shade_bottom_rim);

  const inner_glow = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.66, shadeH * 0.92, 64, 1, true), innerGlowMat);
  inner_glow.position.y = (shadeBottomY + shadeTopY) * 0.5;
  root.add(inner_glow);

  const inner_top_glow = new THREE.Mesh(new THREE.CircleGeometry(0.40, 64), innerGlowMat);
  inner_top_glow.position.y = shadeTopY - 0.035;
  inner_top_glow.rotation.x = -Math.PI / 2;
  root.add(inner_top_glow);

  const bulb_socket = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.13, 32), brassMat);
  bulb_socket.position.y = 1.86;
  root.add(bulb_socket);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 16), innerGlowMat);
  bulb.position.y = 1.98;
  bulb.scale.set(0.8, 1.0, 0.8);
  root.add(bulb);

  function shadeRadiusAt(y) {
    const t = (y - shadeBottomY) / shadeH;
    return shadeBottomR + (shadeTopR - shadeBottomR) * t;
  }

  function stemRadiusAt(y) {
    if (y < 0.55) return 0.20;
    if (y < 0.85) return 0.25 + (y - 0.55) * 0.08;
    if (y < 1.20) return 0.275 - (y - 0.85) * 0.05;
    if (y < 1.55) return 0.235 - (y - 1.20) * 0.10;
    return 0.20;
  }

  function baseRadiusAt(y) {
    if (y < 0.08) return 0.67;
    if (y < 0.18) return 0.68 - (y - 0.08) * 0.25;
    if (y < 0.30) return 0.55 - (y - 0.18) * 1.55;
    return 0.25;
  }

  function addSurfaceGrain(parent, count, yMin, yMax, radiusFn, phase) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const a0 = phase + i / count * Math.PI * 2;
      const steps = 10;
      for (let s = 0; s < steps; s++) {
        const t0 = s / steps;
        const t1 = (s + 1) / steps;
        const y0 = yMin + (yMax - yMin) * t0;
        const y1 = yMin + (yMax - yMin) * t1;
        const a1 = a0 + Math.sin(t0 * Math.PI * 2 + i * 0.73) * 0.018;
        const r0 = radiusFn(y0) + 0.006;
        const r1 = radiusFn(y1) + 0.006;
        positions.push(Math.cos(a0) * r0, y0, Math.sin(a0) * r0);
        positions.push(Math.cos(a1) * r1, y1, Math.sin(a1) * r1);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const lines = new THREE.LineSegments(geom, grainLineMat);
    parent.add(lines);
    return lines;
  }

  const shade_grain = addSurfaceGrain(root, 42, shadeBottomY + 0.035, shadeTopY - 0.035, shadeRadiusAt, 0.12);
  const stem_grain = addSurfaceGrain(root, 24, 0.52, 1.70, stemRadiusAt, 0.34);
  const base_grain = addSurfaceGrain(root, 18, 0.045, 0.36, baseRadiusAt, 0.58);

  function addKnot(parent, angle, y, radiusFn, size) {
    const knot = new THREE.Group();
    for (let ring = 0; ring < 4; ring++) {
      const pts = [];
      const r = radiusFn(y) + 0.010;
      for (let i = 0; i < 32; i++) {
        const a = i / 32 * Math.PI * 2;
        const wobble = 1 + Math.sin(a * 3 + ring * 0.8) * 0.08;
        const rr = size * (0.35 + ring * 0.20) * wobble;
        const yy = y + Math.sin(a * 2 + ring) * size * 0.18;
        const aa = angle + Math.cos(a) * rr / Math.max(radiusFn(y), 0.1);
        pts.push(new THREE.Vector3(Math.cos(aa) * (r + 0.004), yy, Math.sin(aa) * (r + 0.004)));
      }
      const knot_ring = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 32, 0.004, 6, true), darkWoodMat);
      knot.add(knot_ring);
    }
    parent.add(knot);
    return knot;
  }

  const shade_knot = addKnot(root, Math.PI / 2 - 0.32, 2.36, shadeRadiusAt, 0.12);
  const stem_knot = addKnot(root, Math.PI / 2 + 0.08, 0.92, stemRadiusAt, 0.075);

  const cordPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.22, 0.16, -0.30),
    new THREE.Vector3(0.45, 0.12, -0.42),
    new THREE.Vector3(0.78, 0.10, -0.48),
    new THREE.Vector3(1.18, 0.09, -0.45),
    new THREE.Vector3(1.55, 0.08, -0.38),
  ]);
  const power_cord = new THREE.Mesh(new THREE.TubeGeometry(cordPath, 48, 0.025, 10, false), cordMat);
  root.add(power_cord);

  const cord_grommet = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 10), cordMat);
  cord_grommet.position.set(0.22, 0.16, -0.30);
  cord_grommet.scale.set(1.0, 0.65, 1.0);
  root.add(cord_grommet);

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