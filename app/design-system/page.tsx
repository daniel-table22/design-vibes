import {
  getColorFamilies,
  getSemanticColorFamilies,
  getTypographyScale,
  getFontInfo,
  getSpacingTokens,
  getRadiusTokens,
  getScalingTokens,
} from "@/lib/design-tokens";
import FoundationsClient from "./components/FoundationsClient";

export default function DesignSystemPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Design System</h1>
      <FoundationsClient
        colorFamilies={getColorFamilies()}
        semanticColorFamilies={getSemanticColorFamilies()}
        typographyScale={getTypographyScale()}
        fontInfo={getFontInfo()}
        spacingTokens={getSpacingTokens()}
        radiusTokens={getRadiusTokens()}
        scalingTokens={getScalingTokens()}
      />
    </main>
  );
}
