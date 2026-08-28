import blackBenchLogo from "../../assets/brand/black-bench-logo.svg";
import "./BlackBenchLogo.css";

interface BlackBenchLogoProps {
  className?: string;
}

export function BlackBenchLogo({ className = "" }: BlackBenchLogoProps) {
  const classes = ["black-bench-mark", className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <img src={blackBenchLogo} alt="" />
    </span>
  );
}
