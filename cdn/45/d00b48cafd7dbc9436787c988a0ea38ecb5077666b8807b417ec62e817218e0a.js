export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "woven_rainbow_bowl";

  const woven_basket = new THREE.Group();
  woven_basket.name = "woven_basket";
  root.add(woven_basket);

  const palette = [
    new THREE.Color(0x00aeea),
    new THREE.Color(0x008f91),
    new THREE.Color(0x00a85a),
    new THREE.Color(0xb9e632),
    new THREE.Color(0xffd52b),
    new THREE.Color(0xff6a2a),
    new THREE.Color(0xff3038),
    new THREE.Color(0xf20b73),
    new THREE.Color(0xd32a9e),
    new THREE.Color(0x9b4fc4),
  ];

  const strandMats = palette.map((color) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive: color.clone().multiplyScalar(0.12),
      metalness: 0.0,
      roughness: 0.9,
    })
  );

  const strandHighlightMats = palette.map((color) =>
    new THREE.MeshStandardMaterial({
      color: color.clone().lerp(new THREE.Color(0xffffff), 0.32),
      emissive: color.clone().multiplyScalar(0.1),
      metalness: 0.0,
      roughness: 0.85,
    })
  );

  const strandShadowMats = palette.map((color) =>
    new THREE.MeshStandardMaterial({
      color: color.clone().multiplyScalar(0.72),
      emissive: color.clone().multiplyScalar(0.06),
      metalness: 0.0,
      roughness: 0.95,
    })
  );

  const strandMaterials = strandMats.concat(
    strandHighlightMats,
    strandShadowMats
  );

  const weaveRows = 10;
  const segmentsPerRow = 24;
  const segmentArc = Math.PI * 2 / segmentsPerRow;
  const segmentSpan = segmentArc * 1.18;
  const segmentHeight = 0.22;
  const segmentWave = 0.055;
  const segmentRadius = 0.074;
  const segmentSampleCount = 18;

  function createBraidedSegmentGeometry() {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const sideBasis = new THREE.Vector3();
    const verticalBasis = new THREE.Vector3();
    const radialBasis = new THREE.Vector3();

    for (let i = 0; i <= segmentSampleCount; i++) {
      const t = i / segmentSampleCount;
      const theta = (t - 0.5) * segmentSpan;
      const centerY =
        -segmentHeight * 0.5 +
        segmentHeight * t +
        Math.sin(t * Math.PI * 2) * segmentWave;
      const centerRadius = 1.0;

      const center = new THREE.Vector3(
        Math.cos(theta) * centerRadius,
        centerY,
        Math.sin(theta) * centerRadius
      );

      const tangent = new THREE.Vector3(
        -Math.sin(theta),
        segmentHeight +
          Math.cos(t * Math.PI * 2) *
            segmentWave * Math.PI * 2,
        Math.cos(theta)
      ).normalize();

      sideBasis.set(Math.sin(theta), 0, -Math.cos(theta)).normalize();
      verticalBasis
        .crossVectors(sideBasis, tangent)
        .normalize();

      for (let ply = 0; ply < 3; ply++) {
        const plyPhase =
          (ply / 3) * Math.PI * 2 + t * Math.PI * 4;
        radialBasis
          .copy(sideBasis)
          .multiplyScalar(Math.cos(plyPhase))
          .addScaledVector(verticalBasis, Math.sin(plyPhase))
          .normalize();

        for (let fiber = 0; fiber < 4; fiber++) {
          const fiberPhase =
            (fiber / 4) * Math.PI * 2 +
            t * Math.PI * 12 +
            plyPhase * 0.5;
          const surfaceNormal = radialBasis
            .clone()
            .multiplyScalar(Math.cos(fiberPhase))
            .addScaledVector(verticalBasis, Math.sin(fiberPhase))
            .normalize();
          const surfacePoint = center
            .clone()
            .addScaledVector(surfaceNormal, segmentRadius);

          positions.push(
            surfacePoint.x,
            surfacePoint.y,
            surfacePoint.z
          );
          normals.push(
            surfaceNormal.x,
            surfaceNormal.y,
            surfaceNormal.z
          );
          uvs.push(t, (ply * 4 + fiber) / 12);
        }
      }
    }

    for (let i = 0; i < segmentSampleCount; i++) {
      for (let ply = 0; ply < 3; ply++) {
        for (let fiber = 0; fiber < 3; fiber++) {
          const a = i * 12 + ply * 4 + fiber;
          const b = (i + 1) * 12 + ply * 4 + fiber;
          const c = (i + 1) * 12 + ply * 4 + fiber + 1;
          const d = i * 12 + ply * 4 + fiber + 1;
          indices.push(a, b, d, b, c, d);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const woven_segment_geo = createBraidedSegmentGeometry();

  const woven_segments = new THREE.Group();
  woven_segments.name = "woven_segments";
  woven_basket.add(woven_segments);

  const segmentMatrices = Array.from(
    { length: palette.length },
    () => []
  );
  const segmentDummy = new THREE.Object3D();
  const segmentYaw = new THREE.Quaternion();
  const segmentTilt = new THREE.Quaternion();
  const segmentQuaternion = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);

  for (let row = 0; row < weaveRows; row++) {
    const rowY = -0.48 + row * 0.106;
    const rowRadius = 0.91 + row * 0.012;
    const rowTilt = row % 2 === 0 ? 0.2 : -0.2;
    const rowOffset = row % 2 === 0 ? 0 : 0.5;

    for (let segment = 0; segment < segmentsPerRow; segment++) {
      const theta =
        (segment + rowOffset) * segmentArc +
        row * 0.018;
      const colorIndex =
        (
          segment * 7 +
          row * 3 +
          Math.floor(segment / 3)
        ) % palette.length;
      const radialScale =
        0.985 +
        ((segment + row * 2) % 3) * 0.012;

      segmentDummy.position.set(
        Math.cos(theta) * rowRadius,
        rowY,
        Math.sin(theta) * rowRadius
      );
      segmentYaw.setFromAxisAngle(yAxis, -theta);
      segmentTilt.setFromAxisAngle(xAxis, rowTilt);
      segmentQuaternion.copy(segmentYaw).multiply(segmentTilt);

      segmentDummy.quaternion.copy(segmentQuaternion);
      segmentDummy.scale.set(
        rowRadius * radialScale,
        1,
        rowRadius * radialScale
      );
      segmentDummy.updateMatrix();
      segmentMatrices[colorIndex].push(segmentDummy.matrix.clone());
    }
  }

  for (let colorIndex = 0; colorIndex < palette.length; colorIndex++) {
    const matrices = segmentMatrices[colorIndex];
    const woven_segments_color = new THREE.InstancedMesh(
      woven_segment_geo,
      strandMaterials[colorIndex],
      matrices.length
    );
    woven_segments_color.name = "woven_segments_color_" + colorIndex;

    for (let i = 0; i < matrices.length; i++) {
      woven_segments_color.setMatrixAt(i, matrices[i]);
    }

    woven_segments_color.instanceMatrix.needsUpdate = true;
    woven_segments.add(woven_segments_color);
  }

  const rim_braid = new THREE.Group();
  rim_braid.name = "rim_braid";
  woven_basket.add(rim_braid);

  const rimStrandCount = 12;
  const rimSampleCount = 96;
  const rimBaseRadius = 0.972;
  const rimBaseY = 0.54;
  const rimRadialAmplitude = 0.052;
  const rimVerticalAmplitude = 0.05;
  const rimTurns = 6;

  function createRimStrandGeometry(strandIndex) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const center = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const radial = new THREE.Vector3();
    const vertical = new THREE.Vector3();
    const sideBasis = new THREE.Vector3();
    const radialBasis = new THREE.Vector3();
    const plyPhaseOffset = strandIndex / rimStrandCount * Math.PI * 2;

    for (let i = 0; i <= rimSampleCount; i++) {
      const t = i / rimSampleCount;
      const theta = t * Math.PI * 2;
      const braidPhase =
        theta * rimTurns + plyPhaseOffset;
      const baseRadius =
        rimBaseRadius +
        Math.sin(theta * 8) * 0.006;
      const radialOffset =
        Math.cos(braidPhase) * rimRadialAmplitude;
      const yOffset =
        Math.sin(braidPhase) * rimVerticalAmplitude;
      const radius = baseRadius + radialOffset;

      center.set(
        Math.cos(theta) * radius,
        rimBaseY + yOffset,
        Math.sin(theta) * radius
      );

      tangent.set(
        -Math.sin(theta),
        Math.cos(theta * 8) * 0.048,
        Math.cos(theta)
      ).normalize();

      radial.set(Math.cos(theta), 0, Math.sin(theta)).normalize();
      vertical.crossVectors(radial, tangent).normalize();

      for (let ply = 0; ply < 3; ply++) {
        const plyPhase =
          (ply / 3) * Math.PI * 2 +
          theta * rimTurns * 2 +
          plyPhaseOffset;
        const plyOffsetRadius = 0.041;

        sideBasis
          .copy(radial)
          .multiplyScalar(Math.cos(plyPhase))
          .addScaledVector(vertical, Math.sin(plyPhase))
          .normalize();

        for (let fiber = 0; fiber < 4; fiber++) {
          const fiberPhase =
            (fiber / 4) * Math.PI * 2 +
            theta * 24 +
            plyPhase;
          const surfaceNormal = sideBasis
            .clone()
            .multiplyScalar(Math.cos(fiberPhase))
            .addScaledVector(vertical, Math.sin(fiberPhase))
            .normalize();
          const surfacePoint = center
            .clone()
            .addScaledVector(
              sideBasis,
              plyOffsetRadius
            )
            .addScaledVector(surfaceNormal, 0.035);

          positions.push(
            surfacePoint.x,
            surfacePoint.y,
            surfacePoint.z
          );
          normals.push(
            surfaceNormal.x,
            surfaceNormal.y,
            surfaceNormal.z
          );
          uvs.push(t, (ply * 4 + fiber) / 12);
        }
      }
    }

    for (let i = 0; i < rimSampleCount; i++) {
      for (let ply = 0; ply < 3; ply++) {
        for (let fiber = 0; fiber < 3; fiber++) {
          const a = i * 12 + ply * 4 + fiber;
          const b = (i + 1) * 12 + ply * 4 + fiber;
          const c = (i + 1) * 12 + ply * 4 + fiber + 1;
          const d = i * 12 + ply * 4 + fiber + 1;
          indices.push(a, b, d, b, c, d);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  for (let strandIndex = 0; strandIndex < rimStrandCount; strandIndex++) {
    const rim_strand = new THREE.Mesh(
      createRimStrandGeometry(strandIndex),
      strandMaterials[
        (strandIndex * 7 + 2) % strandMaterials.length
      ]
    );
    rim_strand.name = "rim_strand_" + strandIndex;
    rim_braid.add(rim_strand);
  }

  const bottom_binding = new THREE.Group();
  bottom_binding.name = "bottom_binding";
  woven_basket.add(bottom_binding);

  const bottomStrandCount = 10;
  const bottomSampleCount = 80;
  const bottomBaseRadius = 0.91;
  const bottomBaseY = -0.54;
  const bottomRadialAmplitude = 0.038;
  const bottomVerticalAmplitude = 0.032;
  const bottomTurns = 5;

  function createBottomStrandGeometry(strandIndex) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const center = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const radial = new THREE.Vector3();
    const vertical = new THREE.Vector3();
    const sideBasis = new THREE.Vector3();
    const plyPhaseOffset = strandIndex / bottomStrandCount * Math.PI * 2;

    for (let i = 0; i <= bottomSampleCount; i++) {
      const t = i / bottomSampleCount;
      const theta = t * Math.PI * 2;
      const braidPhase =
        theta * bottomTurns + plyPhaseOffset;
      const radialOffset =
        Math.cos(braidPhase) * bottomRadialAmplitude;
      const yOffset =
        Math.sin(braidPhase) * bottomVerticalAmplitude;
      const radius = bottomBaseRadius + radialOffset;

      center.set(
        Math.cos(theta) * radius,
        bottomBaseY + yOffset,
        Math.sin(theta) * radius
      );

      tangent.set(
        -Math.sin(theta),
        Math.cos(theta * bottomTurns) *
          bottomVerticalAmplitude * bottomTurns,
        Math.cos(theta)
      ).normalize();

      radial.set(Math.cos(theta), 0, Math.sin(theta)).normalize();
      vertical.crossVectors(radial, tangent).normalize();

      for (let ply = 0; ply < 3; ply++) {
        const plyPhase =
          (ply / 3) * Math.PI * 2 +
          theta * bottomTurns * 2 +
          plyPhaseOffset;
        const plyOffsetRadius = 0.039;

        sideBasis
          .copy(radial)
          .multiplyScalar(Math.cos(plyPhase))
          .addScaledVector(vertical, Math.sin(plyPhase))
          .normalize();

        for (let fiber = 0; fiber < 4; fiber++) {
          const fiberPhase =
            (fiber / 4) * Math.PI * 2 +
            theta * 20 +
            plyPhase;
          const surfaceNormal = sideBasis
            .clone()
            .multiplyScalar(Math.cos(fiberPhase))
            .addScaledVector(vertical, Math.sin(fiberPhase))
            .normalize();
          const surfacePoint = center
            .clone()
            .addScaledVector(
              sideBasis,
              plyOffsetRadius
            )
            .addScaledVector(surfaceNormal, 0.034);

          positions.push(
            surfacePoint.x,
            surfacePoint.y,
            surfacePoint.z
          );
          normals.push(
            surfaceNormal.x,
            surfaceNormal.y,
            surfaceNormal.z
          );
          uvs.push(t, (ply * 4 + fiber) / 12);
        }
      }
    }

    for (let i = 0; i < bottomSampleCount; i++) {
      for (let ply = 0; ply < 3; ply++) {
        for (let fiber = 0; fiber < 3; fiber++) {
          const a = i * 12 + ply * 4 + fiber;
          const b = (i + 1) * 12 + ply * 4 + fiber;
          const c = (i + 1) * 12 + ply * 4 + fiber + 1;
          const d = i * 12 + ply * 4 + fiber + 1;
          indices.push(a, b, d, b, c, d);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  for (let strandIndex = 0; strandIndex < bottomStrandCount; strandIndex++) {
    const bottom_strand = new THREE.Mesh(
      createBottomStrandGeometry(strandIndex),
      strandMaterials[
        (strandIndex * 7 + 5) % strandMaterials.length
      ]
    );
    bottom_strand.name = "bottom_strand_" + strandIndex;
    bottom_binding.add(bottom_strand);
  }

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}