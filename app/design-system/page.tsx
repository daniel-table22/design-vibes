import {
  getColorFamilies,
  getVariableColors,
  getSemanticColorFamilies,
  getPanelTokens,
  getTokenColors,
  getThemeRadiusTokens,
  getTokenSpaceTokens,
  getTypographyScale,
  getFontInfo,
  getSpacingTokens,
  getRadiusTokens,
  getScalingTokens,
  getResponsiveSizes,
} from "@/lib/design-tokens";
import DesignSystemShell from "./components/DesignSystemShell";

export default function DesignSystemPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">Design System</h1>
      <DesignSystemShell
        colorFamilies={getColorFamilies()}
        variableColors={getVariableColors()}
        semanticColorFamilies={getSemanticColorFamilies()}
        panelTokens={getPanelTokens()}
        tokenColors={getTokenColors()}
        themeRadiusTokens={getThemeRadiusTokens()}
        tokenSpaceTokens={getTokenSpaceTokens()}
        typographyScale={getTypographyScale()}
        fontInfo={getFontInfo()}
        spacingTokens={getSpacingTokens()}
        radiusTokens={getRadiusTokens()}
        scalingTokens={getScalingTokens()}
        responsiveSizes={getResponsiveSizes()}
      />
    </main>
  );
}
