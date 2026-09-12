// export function SplashScreen({ visible }: { visible: boolean }) {
//   return (
//     <div
//       className={`splash ${visible ? "" : "splash--hidden"}`}
//       aria-hidden={!visible}
//     >
//       <img
//         className="splash__logo"
//         src="/assets/brand/labnova-logo.png"
//         alt="LabNova Scientific"
//       />
//       <div className="splash__ring" />
//     </div>
//   );
// }

// src/components/SplashScreen.tsx
export function SplashScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={`splash ${visible ? "" : "splash--hidden"}`}
      aria-hidden={!visible}
    >
      <img
        className="splash__logo"
        src="/assets/brand/new_logo.png"
        alt="LabNova Scientific"
      />
      <div className="splash__ring" />
    </div>
  );
}
