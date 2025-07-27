import { useEffect } from "react";

type Props = {
  couponApplied: boolean;
};

const CouponUnloadWarning = ({ couponApplied }: Props) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (couponApplied) {
        e.preventDefault();
        e.returnValue = ""; // Requerido por algunos navegadores para mostrar el prompt
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [couponApplied]);

  return null;
};

export default CouponUnloadWarning;
