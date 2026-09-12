// /** Light backgrounds (header, admin login, etc.) get the real brand logo file.
//  *  Dark backgrounds (the navy footer) use a recolorable text mark instead,
//  *  since the source logo file has no reversed/white variant — ask the
//  *  design team for one if the footer logo needs to match exactly. */
// export function Logo({ light = false }: { light?: boolean }) {
//   if (light) {
//     return (
//       <div className="brand brand--light" aria-label="LabNova Scientific">
//         <span className="brand__type"><strong>LABNOVA</strong><small>SCIENTIFIC</small></span>
//       </div>
//     );
//   }
//   return (
//     <div className="brand" aria-label="LabNova Scientific">
//       <img className="brand__logo" src="/assets/brand/labnova-logo.png" alt="LabNova Scientific" />
//     </div>
//   );
// }

// src/components/Logo.tsx
/** Light backgrounds (header, admin login, etc.) get the real brand logo file.
 *  Dark backgrounds (the navy footer) use a recolorable text mark instead,
 *  since the source logo file has no reversed/white variant — ask the
 *  design team for one if the footer logo needs to match exactly. */
export function Logo({ light = false }: { light?: boolean }) {
  if (light) {
    return (
      <div className="brand brand--light" aria-label="LabNova Scientific">
        <span className="brand__type">
          <strong>LABNOVA</strong>
          <small>SCIENTIFIC</small>
        </span>
      </div>
    );
  }
  return (
    <div className="brand" aria-label="LabNova Scientific">
      <img
        className="brand__logo"
        src="/assets/brand/new_logo.png"
        alt="LabNova Scientific"
      />
    </div>
  );
}
