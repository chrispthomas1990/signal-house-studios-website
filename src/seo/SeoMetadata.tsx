import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applySeoMetadata } from "./seoConfig";

export function SeoMetadata() {
  const { pathname } = useLocation();
  useEffect(() => applySeoMetadata(pathname), [pathname]);
  return null;
}
