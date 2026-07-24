import React, { useEffect, useRef } from 'react';

export default function BackgroundEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse position tracking
    const mouse = { x: null, y: null, radius: 220 };

    // Particles: Nodes, Binary Streams, Math/AI Tokens
    const numNodes = Math.min(65, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const nodes = [];
    const connectionDistance = 160;

    // Palette: Deep Maroon (#4A0D1A), Wine Red (#721226), Crimson (#8C1D36), Rose Gold (#E0A96D), Gold (#D4AF37)
    const colors = ['#721226', '#8C1D36', '#A31C38', '#E0A96D', '#D4AF37'];

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 2.2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.type = Math.random() > 0.75 ? 'binary' : 'dot';
        this.binaryChar = Math.random() > 0.5 ? '1' : '0';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      draw() {
        ctx.save();
        this.pulse += this.pulseSpeed;
        const currentSize = this.size + Math.sin(this.pulse) * 0.6;

        if (this.type === 'binary') {
          ctx.font = `${Math.floor(currentSize * 4 + 7)}px "Fira Code", monospace`;
          ctx.fillStyle = this.color;
          ctx.globalAlpha = 0.35 + Math.sin(this.pulse) * 0.2;
          ctx.fillText(this.binaryChar, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = currentSize * 3;
          ctx.shadowColor = this.color;
          ctx.fill();
        }
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -10 || this.x > canvas.width + 10) this.vx *= -1;
        if (this.y < -10 || this.y > canvas.height + 10) this.vy *= -1;

        // Gentle interactive repulsion/attraction on mouse hover
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
          }
        }
      }
    }

    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node());
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep Dark Cyberpunk Background Gradient
      const baseGrad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.4, 100,
        canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height)
      );
      baseGrad.addColorStop(0, '#14050A');
      baseGrad.addColorStop(0.5, '#0B0305');
      baseGrad.addColorStop(1, '#050203');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Interactive Mouse Spotlight Radial Glow (Deep Maroon & Rose Gold)
      if (mouse.x !== null && mouse.y !== null) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.5
        );
        mouseGlow.addColorStop(0, 'rgba(140, 29, 54, 0.12)');
        mouseGlow.addColorStop(0.5, 'rgba(74, 13, 26, 0.05)');
        mouseGlow.addColorStop(1, 'rgba(7, 3, 5, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw Synapse Neural Network Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.22;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const isMouseNear = mouse.x !== null && Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y) < 180;
            if (isMouseNear) {
              ctx.strokeStyle = `rgba(224, 169, 109, ${alpha * 1.8})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(140, 29, 54, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Update & Draw Nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const styles = {
    wrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      backgroundColor: '#070305',
      overflow: 'hidden',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    gridOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(140, 29, 54, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(140, 29, 54, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
    },
    glowOrbTop: {
      position: 'absolute',
      top: '-15%',
      left: '-10%',
      width: '55vw',
      height: '55vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(114, 18, 38, 0.15) 0%, rgba(74, 13, 26, 0.02) 65%, transparent 80%)',
      filter: 'blur(90px)',
      pointerEvents: 'none',
    },
    glowOrbBottom: {
      position: 'absolute',
      bottom: '-15%',
      right: '-10%',
      width: '50vw',
      height: '50vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(140, 29, 54, 0.12) 0%, rgba(42, 8, 16, 0.02) 65%, transparent 80%)',
      filter: 'blur(90px)',
      pointerEvents: 'none',
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glowOrbTop} />
      <div style={styles.glowOrbBottom} />
      <div style={styles.gridOverlay} />
      <canvas ref={canvasRef} style={styles.canvas} />
    </div>
  );
}
