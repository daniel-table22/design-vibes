import {
  getColorFamilies,
  getTypographyScale,
  getFontInfo,
  getSpacingTokens,
  getRadiusTokens,
  getScalingTokens,
} from "@/lib/design-tokens";
import FoundationsClient from "./components/FoundationsClient";

export default function DesignSystemPage() {
  const colorFamilies = getColorFamilies();
  const typographyScale = getTypographyScale();
  const fontInfo = getFontInfo();
  const spacingTokens = getSpacingTokens();
  const radiusTokens = getRadiusTokens();
  const scalingTokens = getScalingTokens();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Design System</h1>
      <FoundationsClient
        colorFamilies={colorFamilies}
        typographyScale={typographyScale}
        fontInfo={fontInfo}
        spacingTokens={spacingTokens}
        radiusTokens={radiusTokens}
        scalingTokens={scalingTokens}
      />
    </main>
  );
}
