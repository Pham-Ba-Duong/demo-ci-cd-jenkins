gsap.registerPlugin(MotionPathPlugin);

// 🐉 Rồng bay quanh trăng
gsap.to(".dragon-container", {
  duration: 20,
  repeat: -1,
  ease: "power1.inOut",
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 400, y: -200 },
      { x: 800, y: 0 },
      { x: 400, y: 100 },
      { x: 0, y: 0 }
    ],
    curviness: 1.5
  }
});

// Rồng lượn nhẹ
gsap.to(".dragon", {
  y: -20,
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});
