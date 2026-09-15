export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "iridescent_blade";

  const blade_assembly = new THREE.Group();
  blade_assembly.name = "blade_assembly";
  root.add(blade_assembly);

  const bladeLength = 5.0;
  const bladeThickness = 0.05;
  const halfWidth = (z) => 0.5 * Math.max(0, 1 - z / bladeLength);
  const holeZ = -1.72;
  const holeRadius = 0.105;

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -2.5);
  bladeShape.lineTo(0.5, -0.5);
  bladeShape.lineTo(0.5, 1.0);
  bladeShape.lineTo(0.46, 1.4);
  bladeShape.lineTo(0.42, 1.75);
  bladeShape.lineTo(0.36, 2.1);
  bladeShape.lineTo(0.25, 2.35);
  bladeShape.lineTo(0, 2.5);
  bladeShape.lineTo(-0.25, 2.35);
  bladeShape.lineTo(-0.36, 2.1);
  bladeShape.lineTo(-0.42, 1.75);
  bladeShape.lineTo(-0.46, 1.4);
  bladeShape.lineTo(-0.5, 1.0);
  bladeShape.lineTo(-0.5, -0.5);
  bladeShape.lineTo(0, -2.5);

  const mountingHolePath = new THREE.Path();
  mountingHolePath.absarc(0, holeZ, holeRadius, 0, Math.PI * 2, true);
  bladeShape.holes.push(mountingHolePath);

  const blade_bodyGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: bladeThickness,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  blade_bodyGeom.translate(0, 0, -bladeThickness / 2);
  blade_bodyGeom.rotateX(Math.PI / 2);

  const blade_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.65,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 700],
    side: THREE.DoubleSide
  });

  applySpectralColors(THREE, blade_bodyGeom, 0.22);
  const blade_body = new THREE.Mesh(blade_bodyGeom, blade_bodyMat);
  blade_body.name = "blade_body";
  blade_assembly.add(blade_body);

  const edge_bandGeom = new THREE.ShapeGeometry(bladeShape, 32);
  edge_bandGeom.rotateX(Math.PI / 2);
  const edge_bandMat = new THREE.MeshPhysicalMaterial({
    color: 0x7548d8,
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [180, 650],
    side: THREE.DoubleSide
  });

  const upper_edge_band = new THREE.Mesh(edge_bandGeom, edge_bandMat);
  upper_edge_band.name = "upper_edge_band";
  upper_edge_band.position.y = bladeThickness / 2 + 0.013;
  blade_assembly.add(upper_edge_band);

  const lower_edge_band = new THREE.Mesh(edge_bandGeom, edge_bandMat);
  lower_edge_band.name = "lower_edge_band";
  lower_edge_band.position.y = -bladeThickness / 2 - 0.013;
  blade_assembly.add(lower_edge_band);

  const mounting_hole_rimGeom = new THREE.TorusGeometry(
    holeRadius,
    0.014,
    10,
    36
  );
  const mounting_hole_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xa8ff72,
    metalness: 0.55,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 500]
  });
  const mounting_hole_rim = new THREE.Mesh(
    mounting_hole_rimGeom,
    mounting_hole_rimMat
  );
  mounting_hole_rim.name = "mounting_hole_rim";
  mounting_hole_rim.rotation.x = Math.PI / 2;
  mounting_hole_rim.position.set(0, bladeThickness / 2 + 0.018, holeZ);
  blade_assembly.add(mounting_hole_rim);

  const mounting_hole_shadowGeom = new THREE.TorusGeometry(
    holeRadius - 0.012,
    0.009,
    8,
    32
  );
  const mounting_hole_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x17131c,
    metalness: 0.2,
    roughness: 0.7
  });
  const mounting_hole_shadow = new THREE.Mesh(
    mounting_hole_shadowGeom,
    mounting_hole_shadowMat
  );
  mounting_hole_shadow.name = "mounting_hole_shadow";
  mounting_hole_shadow.rotation.x = Math.PI / 2;
  mounting_hole_shadow.position.set(0, bladeThickness / 2 + 0.014, holeZ);
  blade_assembly.add(mounting_hole_shadow);

  const cutting_edge_points = [
    new THREE.Vector3(0, bladeThickness / 2 + 0.019, -2.5),
    new THREE.Vector3(0.5, bladeThickness / 2 + 0.019, -0.5),
    new THREE.Vector3(0.5, bladeThickness / 2 + 0.019, 1.0),
    new THREE.Vector3(0.46, bladeThickness / 2 + 0.019, 1.4),
    new THREE.Vector3(0.42, bladeThickness / 2 + 0.019, 1.75),
    new THREE.Vector3(0.36, bladeThickness / 2 + 0.019, 2.1),
    new THREE.Vector3(0.25, bladeThickness / 2 + 0.019, 2.35),
    new THREE.Vector3(0, bladeThickness / 2 + 0.019, 2.5),
    new THREE.Vector3(-0.25, bladeThickness / 2 + 0.019, 2.35),
    new THREE.Vector3(-0.36, bladeThickness / 2 + 0.019, 2.1),
    new THREE.Vector3(-0.42, bladeThickness / 2 + 0.019, 1.75),
    new THREE.Vector3(-0.46, bladeThickness / 2 + 0.019, 1.4),
    new THREE.Vector3(-0.5, bladeThickness / 2 + 0.019, 1.0),
    new THREE.Vector3(-0.5, bladeThickness / 2 + 0.019, -0.5),
    new THREE.Vector3(0, bladeThickness / 2 + 0.019, -2.5)
  ];
  const cutting_edge_curve = new THREE.CatmullRomCurve3(
    cutting_edge_points,
    true,
    "centripetal"
  );
  const cutting_edge_highlightGeom = new THREE.TubeGeometry(
    cutting_edge_curve,
    96,
    0.007,
    6,
    true
  );
  const cutting_edge_highlightMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9f4ff,
    metalness: 0.5,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [150, 600]
  });
  const cutting_edge_highlight = new THREE.Mesh(
    cutting_edge_highlightGeom,
    cutting_edge_highlightMat
  );
  cutting_edge_highlight.name = "cutting_edge_highlight";
  blade_assembly.add(cutting_edge_highlight);

  fitToUnitCube(THREE, root);
  return root;
}

function applySpectralColors(THREE, geometry, phase) {
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const longitudinal = z / 5.0;
    const lateral = x / 0.5;
    const wave = 0.5 + 0.5 * Math.sin(
      longitudinal * 12.5 - lateral * 3.8 + phase
    );
    let hue = phase + longitudinal * 0.78 - lateral * 0.17 + wave * 0.16;
    hue -= Math.floor(hue);
    const lightness = 0.5 + 0.065 * Math.sin(
      longitudinal * 18 + lateral * 5 - phase
    );
    color.setHSL(hue, 0.96, Math.max(0.4, Math.min(0.62, lightness)));
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
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