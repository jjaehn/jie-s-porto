import React, { useRef, useState, useEffect } from 'react';

export default function InteractivePortrait({ 
  defaultImage = "/ai_researcher_portrait.png",
  manualTriggerScan
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [scanStatusText, setScanStatusText] = useState("LIDAR SCANNING...");
  const [isScanning, setIsScanning] = useState(true);

  const scannerYRef = useRef(-20);
  const isScanCompleteRef = useRef(false);

  // Dimensions
  const width = 380;
  const height = 480;

  // Track mouse coordinates for 3D parallax depth effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouse(prev => ({ ...prev, targetX: x, targetY: y }));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMouse(prev => ({ ...prev, targetX: 0, targetY: 0 }));
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  // Trigger re-scan sequence
  const triggerScan = () => {
    scannerYRef.current = -20;
    isScanCompleteRef.current = false;
    setIsScanning(true);
    setScanStatusText("LIDAR SCANNING...");
  };

  useEffect(() => {
    if (manualTriggerScan) {
      triggerScan();
    }
  }, [manualTriggerScan]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // High-DPI Canvas setup
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = defaultImage;
    img.crossOrigin = "anonymous";

    let animationId;
    let isImageLoaded = false;
    let sourceCrop = { sx: 0, sy: 0, sw: 1, sh: 1 };

    let currentMouseX = 0;
    let currentMouseY = 0;
    let sequenceTime = 0;

    // -------------------------------------------------------------------------
    // 3D FLOATING "NGAWANG-AWANG" FORMULAS & NEURAL DIAGRAM ECOSYSTEM
    // -------------------------------------------------------------------------

    const rawLeftFormulas = [
      "σ(z) = 1 / (1 + e⁻ᶻ)",
      "y = Wᵀx + b",
      "f(x) = max(0, x)",
      "L_loss = -Σ y log(ŷ)",
      "∇L = ∂L / ∂w",
      "mₜ = β₁mₜ₋₁ + (1-β₁)gₜ",
      "GELU(x) = x · Φ(x)",
      "hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁)",
      "dL/dw = δ · xᵀ",
      "L_reg = L + λ ||W||₂²"
    ];

    const rawRightFormulas = [
      "Attention = softmax(QKᵀ/√dₖ)V",
      "Softmax(zᵢ) = eᶻⁱ / Σ eᶻʲ",
      "wₜ₊₁ = wₜ - η ∇L(wₜ)",
      "MSE = (1/n) Σ (yᵢ - ŷᵢ)²",
      "BatchNorm = γ(X-μ)/√(σ²+ε)",
      "IoU = |A ∩ B| / |A ∪ B|",
      "min_G max_D E[log D(x)]",
      "PE(pos,2i) = sin(pos/10000²ⁱ/ᵈ)",
      "MultiHead = Concat(headᵢ)Wᴼ",
      "Ax = λx  |  A = U Σ Vᵀ"
    ];

    // Left Column 3D Floating Formulas ("Ngawang-awang")
    const leftFormulas = rawLeftFormulas.map((text, idx) => {
      const stepY = 35 + (idx / rawLeftFormulas.length) * (height - 70);
      return {
        text,
        baseX: 14 + Math.random() * 18,
        x: 14 + Math.random() * 18,
        y: stepY + (Math.random() - 0.5) * 12,
        z: -15 - Math.random() * 32,
        alpha: 0.45 + Math.random() * 0.45,
        size: 9.5 + Math.random() * 2.5,
        rot: (Math.random() - 0.5) * 0.25,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2
      };
    });

    // Right Column 3D Floating Formulas ("Ngawang-awang")
    const rightFormulas = rawRightFormulas.map((text, idx) => {
      const stepY = 35 + (idx / rawRightFormulas.length) * (height - 70);
      return {
        text,
        baseX: width - 14 - Math.random() * 18,
        x: width - 14 - Math.random() * 18,
        y: stepY + (Math.random() - 0.5) * 12,
        z: -15 - Math.random() * 32,
        alpha: 0.45 + Math.random() * 0.45,
        size: 9.5 + Math.random() * 2.5,
        rot: (Math.random() - 0.5) * 0.25,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2
      };
    });

    // Floating AI Diagrams on sides
    const leftDiagrams = [
      { type: "curve", x: 30, y: 110, z: -25 },
      { type: "kernel", x: 35, y: 280, z: -32 }
    ];
    const rightDiagrams = [
      { type: "matrix", x: 320, y: 110, z: -28 },
      { type: "curve", x: 325, y: 280, z: -35 }
    ];

    // Neural Constellation Nodes & Synapses
    const neuralNodes = [];
    for (let i = 0; i < 36; i++) {
      const isLeft = i % 2 === 0;
      const nx = isLeft ? 10 + Math.random() * 100 : 270 + Math.random() * 100;
      const ny = 20 + Math.random() * (height - 40);
      neuralNodes.push({
        x: nx,
        y: ny,
        z: -15 - Math.random() * 35,
        radius: 1.5 + Math.random() * 1.8,
        alpha: 0.25 + Math.random() * 0.45,
        vy: (Math.random() - 0.5) * 0.2
      });
    }

    const neuralConnections = [];
    for (let i = 0; i < neuralNodes.length; i++) {
      for (let j = i + 1; j < neuralNodes.length; j++) {
        const dist = Math.hypot(neuralNodes[j].x - neuralNodes[i].x, neuralNodes[j].y - neuralNodes[i].y);
        if (dist < 65 && Math.random() < 0.45) {
          neuralConnections.push({
            from: i,
            to: j,
            signalPos: Math.random(),
            signalSpeed: 0.008 + Math.random() * 0.015
          });
        }
      }
    }

    // Floating math symbols
    const mathSymbols = ["∫", "∑", "∂", "λ", "α", "∇", "θ", "π", "√", "β", "Ω", "μ", "1", "0"];
    const mathParticles = [];
    for (let i = 0; i < 32; i++) {
      const isLeft = i % 2 === 0;
      const px = isLeft ? 15 + Math.random() * 90 : 275 + Math.random() * 90;
      mathParticles.push({
        x: px,
        y: Math.random() * height,
        z: -10 - Math.random() * 40,
        speedY: -0.2 - Math.random() * 0.35,
        alpha: 0.2 + Math.random() * 0.4,
        char: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
        size: Math.floor(9 + Math.random() * 4)
      });
    }

    img.onload = () => {
      isImageLoaded = true;
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let baseSw = img.width;
      let baseSh = img.height;
      
      if (imgRatio > canvasRatio) {
        baseSw = img.height * canvasRatio;
      } else {
        baseSh = img.width / canvasRatio;
      }

      const zoomFactor = 1.68;
      const sw = baseSw / zoomFactor;
      const sh = baseSh / zoomFactor;
      const sx = (img.width - sw) / 2;
      const sy = (img.height - sh) * 0.35;
      
      sourceCrop = { sx, sy, sw, sh };
    };

    // Render Loop
    const render = () => {
      if (!isImageLoaded) {
        ctx.fillStyle = '#070305';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#E0A96D';
        ctx.font = '13px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Initializing AI Laboratory...', width / 2, height / 2);
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      sequenceTime += 0.016;

      // Mouse Parallax Easing
      currentMouseX += (mouse.targetX - currentMouseX) * 0.08;
      currentMouseY += (mouse.targetY - currentMouseY) * 0.08;

      // Advance scan line
      if (!isScanCompleteRef.current) {
        scannerYRef.current += 2.0;
        if (scannerYRef.current >= height + 30) {
          isScanCompleteRef.current = true;
          scannerYRef.current = height + 30;
          setIsScanning(false);
          setScanStatusText("RECONSTRUCTION READY");
        }
      }

      const currentScanY = scannerYRef.current;

      // Update "Ngawang-awang" drift physics for formulas
      leftFormulas.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;
        if (item.x < 10 || item.x > 130) item.vx *= -1;
        if (item.y < 25 || item.y > height - 25) item.vy *= -1;
      });

      rightFormulas.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;
        if (item.x < width - 140 || item.x > width - 10) item.vx *= -1;
        if (item.y < 25 || item.y > height - 25) item.vy *= -1;
      });

      // Update math particles
      mathParticles.forEach(p => {
        p.y += p.speedY;
        if (p.y < -10) p.y = height + 10;
      });

      // 3D Parallax Coordinate Mapper
      const project3D = (pt) => {
        const dx = pt.x - width / 2;
        const dy = pt.y - height / 2;
        const projX = pt.x + (dx / (width / 2)) * pt.z * currentMouseX * 0.45 + currentMouseX * pt.z * 0.35;
        const projY = pt.y + (dy / (height / 2)) * pt.z * currentMouseY * 0.45 + currentMouseY * pt.z * 0.35;
        return { projX, projY };
      };

      // =========================================================================
      // 1. UNSCANNED REGION (BELOW SCAN LINE): DRAW CLEAN NORMAL PHOTO
      // =========================================================================
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, Math.max(0, currentScanY), width, Math.max(0, height - currentScanY));
      ctx.clip();
      ctx.drawImage(img, sourceCrop.sx, sourceCrop.sy, sourceCrop.sw, sourceCrop.sh, 0, 0, width, height);
      ctx.restore();

      // =========================================================================
      // 2. SCANNED REGION (ABOVE SCAN LINE): DRAW 3D FLOATING "NGAWANG-AWANG" AI FORMULAS & NEURAL BACKGROUND
      // =========================================================================
      if (currentScanY > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, width, Math.min(height, currentScanY));
        ctx.clip();

        // A. Dark Cyberpunk Maroon Radial Background (#4A0D1A, #2A0810, #070305)
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 270);
        bgGrad.addColorStop(0, '#3A0B15');
        bgGrad.addColorStop(0.5, '#1A050A');
        bgGrad.addColorStop(1, '#070305');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, Math.min(height, currentScanY));

        // B. Floating Math Symbols
        mathParticles.forEach(p => {
          const proj = project3D(p);
          ctx.font = `${p.size}px serif`;
          ctx.fillStyle = `rgba(224, 169, 109, ${p.alpha * 0.45})`;
          ctx.fillText(p.char, proj.projX, proj.projY);
        });

        // C. 3D Neural Constellation Network & Synapse Pulses
        const projNodes = neuralNodes.map(n => ({ ...n, ...project3D(n) }));
        
        ctx.lineWidth = 0.8;
        neuralConnections.forEach(conn => {
          const n1 = projNodes[conn.from];
          const n2 = projNodes[conn.to];

          ctx.beginPath();
          ctx.moveTo(n1.projX, n1.projY);
          ctx.lineTo(n2.projX, n2.projY);
          ctx.strokeStyle = `rgba(212, 175, 55, 0.25)`;
          ctx.stroke();

          // Synapse pulse dot
          conn.signalPos += conn.signalSpeed;
          if (conn.signalPos > 1) conn.signalPos = 0;
          const px = n1.projX + (n2.projX - n1.projX) * conn.signalPos;
          const py = n1.projY + (n2.projY - n1.projY) * conn.signalPos;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#D4AF37';
          ctx.fill();
        });

        projNodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 169, 109, ${n.alpha * 0.75})`;
          ctx.fill();
        });

        // D. Symmetrical AI Diagrams
        leftDiagrams.forEach(diag => {
          const proj = project3D({ x: diag.x, y: diag.y, z: diag.z });
          ctx.save();
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
          ctx.lineWidth = 1;

          if (diag.type === 'curve') {
            ctx.beginPath();
            ctx.moveTo(proj.projX, proj.projY + 15);
            ctx.quadraticCurveTo(proj.projX + 15, proj.projY + 2, proj.projX + 35, proj.projY);
            ctx.stroke();
          } else if (diag.type === 'kernel') {
            ctx.strokeRect(proj.projX, proj.projY, 20, 20);
            ctx.beginPath();
            ctx.moveTo(proj.projX + 10, proj.projY); ctx.lineTo(proj.projX + 10, proj.projY + 20);
            ctx.moveTo(proj.projX, proj.projY + 10); ctx.lineTo(proj.projX + 20, proj.projY + 10);
            ctx.stroke();
          }
          ctx.restore();
        });

        rightDiagrams.forEach(diag => {
          const proj = project3D({ x: diag.x, y: diag.y, z: diag.z });
          ctx.save();
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
          ctx.lineWidth = 1;

          if (diag.type === 'matrix') {
            ctx.strokeRect(proj.projX - 20, proj.projY, 20, 20);
            ctx.fillRect(proj.projX - 18, proj.projY + 2, 7, 7);
            ctx.fillRect(proj.projX - 9, proj.projY + 11, 7, 7);
          } else if (diag.type === 'curve') {
            ctx.beginPath();
            ctx.moveTo(proj.projX - 35, proj.projY + 15);
            ctx.quadraticCurveTo(proj.projX - 20, proj.projY + 2, proj.projX, proj.projY);
            ctx.stroke();
          }
          ctx.restore();
        });

        // E. DRAW 3D FLOATING "NGAWANG-AWANG" LEFT FORMULAS (WITH ROTATION TILT)
        leftFormulas.forEach(item => {
          const floatY = item.y + Math.sin(sequenceTime * 1.8 + item.phase) * 2.5;
          const proj = project3D({ x: item.x, y: floatY, z: item.z });
          
          ctx.save();
          ctx.translate(proj.projX, proj.projY);
          ctx.rotate(item.rot);
          ctx.font = `600 ${item.size}px "Fira Code", monospace`;
          ctx.textAlign = 'left';
          
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(249, 246, 240, ${item.alpha})`;
          ctx.fillText(item.text, 0, 0);
          
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
          ctx.fillRect(0, 3, Math.min(85, item.text.length * 4.5), 0.8);
          ctx.restore();
        });

        // F. DRAW 3D FLOATING "NGAWANG-AWANG" RIGHT FORMULAS (WITH ROTATION TILT)
        rightFormulas.forEach(item => {
          const floatY = item.y + Math.cos(sequenceTime * 1.8 + item.phase) * 2.5;
          const proj = project3D({ x: item.x, y: floatY, z: item.z });
          
          ctx.save();
          ctx.translate(proj.projX, proj.projY);
          ctx.rotate(item.rot);
          ctx.font = `600 ${item.size}px "Fira Code", monospace`;
          ctx.textAlign = 'right';
          
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(249, 246, 240, ${item.alpha})`;
          ctx.fillText(item.text, 0, 0);
          
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
          ctx.fillRect(-Math.min(85, item.text.length * 4.5), 3, Math.min(85, item.text.length * 4.5), 0.8);
          ctx.restore();
        });

        // G. Draw REALISTIC PORTRAIT PHOTO above the scan line with subtle rose overlay
        ctx.save();
        ctx.drawImage(img, sourceCrop.sx, sourceCrop.sy, sourceCrop.sw, sourceCrop.sh, 0, 0, width, height);

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(140, 29, 54, 0.10)';
        ctx.fillRect(0, 0, width, Math.min(height, currentScanY));
        ctx.restore();

        ctx.restore(); // End scanned clip
      }

      // =========================================================================
      // 3. DRAW HORIZONTAL SCAN LINE (SWEEPING TOP TO BOTTOM)
      // =========================================================================
      if (currentScanY >= 0 && currentScanY <= height) {
        const scanlineHeight = 4;
        const scanGrad = ctx.createLinearGradient(0, currentScanY - scanlineHeight, 0, currentScanY + scanlineHeight);
        scanGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
        scanGrad.addColorStop(0.3, 'rgba(224, 169, 109, 0.85)');
        scanGrad.addColorStop(0.5, '#F9F6F0'); // White intense core line
        scanGrad.addColorStop(0.7, 'rgba(140, 29, 54, 0.85)');
        scanGrad.addColorStop(1, 'rgba(140, 29, 54, 0)');

        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, currentScanY - scanlineHeight, width, scanlineHeight * 2);

        // Floating sparks along scan line
        ctx.fillStyle = '#F9F6F0';
        ctx.shadowColor = '#E0A96D';
        ctx.shadowBlur = 6;
        for (let i = 0; i < 8; i++) {
          const sparkX = (Math.sin(sequenceTime * 8 + i * 1.5) * 0.5 + 0.5) * width;
          const sparkSize = 1.2 + (i % 3) * 0.8;
          const sparkY = currentScanY + (i % 2 === 0 ? -1 : 1) * (i * 1.5);
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // =========================================================================
      // 4. SETTLED IDLE STATE FRAME OUTLINE
      // =========================================================================
      if (isScanCompleteRef.current) {
        ctx.save();
        const pulse = Math.sin(sequenceTime * 2.5) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(224, 169, 109, ${0.15 + pulse * 0.15})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(14, 14, width - 28, height - 28);
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [defaultImage, mouse]); // Stable dependency array

  return (
    <div 
      ref={containerRef}
      style={{
        maxWidth: '100%',
        width: `${width}px`,
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(224, 169, 109, 0.25)',
        boxShadow: hovered 
          ? '0 25px 65px rgba(0, 0, 0, 0.9), 0 0 45px rgba(140, 29, 54, 0.45)' 
          : '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(74, 13, 26, 0.3)',
        zIndex: 2,
        backgroundColor: '#070305',
        transition: 'all 0.4s ease',
      }}
      className="hero-portrait-frame"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <canvas 
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Cyberpunk Glassmorphic Sci-Fi Corner Brackets */}
      <div style={{ position: 'absolute', top: '14px', left: '14px', width: '16px', height: '16px', borderTop: '2px solid #E0A96D', borderLeft: '2px solid #E0A96D', borderTopLeftRadius: '6px', pointerEvents: 'none', zIndex: 5, boxShadow: '0 0 6px rgba(224, 169, 109, 0.6)' }} />
      <div style={{ position: 'absolute', top: '14px', right: '14px', width: '16px', height: '16px', borderTop: '2px solid #E0A96D', borderRight: '2px solid #E0A96D', borderTopRightRadius: '6px', pointerEvents: 'none', zIndex: 5, boxShadow: '0 0 6px rgba(224, 169, 109, 0.6)' }} />
      <div style={{ position: 'absolute', bottom: '14px', left: '14px', width: '16px', height: '16px', borderBottom: '2px solid #E0A96D', borderLeft: '2px solid #E0A96D', borderBottomLeftRadius: '6px', pointerEvents: 'none', zIndex: 5, boxShadow: '0 0 6px rgba(224, 169, 109, 0.6)' }} />
      <div style={{ position: 'absolute', bottom: '14px', right: '14px', width: '16px', height: '16px', borderBottom: '2px solid #E0A96D', borderRight: '2px solid #E0A96D', borderBottomRightRadius: '6px', pointerEvents: 'none', zIndex: 5, boxShadow: '0 0 6px rgba(224, 169, 109, 0.6)' }} />

    </div>
  );
}
