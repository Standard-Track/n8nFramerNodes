import ts from 'typescript';
import { CSSProperties } from 'react';

/**
 * This alias takes a type as its argument and returns a new type that has the same properties as
 * the original, but the properties are not intersected. This makes the new type easier to read and
 * understand.
 *
 * Example:
 * ```ts
 * // Original type:
 * { a: string; } & { b: number; } & { c: boolean; }
 *
 * // New type:
 * { a: string; b: number; c: boolean; }
 * ```
 */
type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};

declare class FramerPluginError extends Error {
    name: string;
}
declare class FramerPluginClosedError extends Error {
    name: string;
}
type NodeRuntimeErrorResult = {
    type: "ModuleRuntimeError" | "ReactRenderingError";
    message: string;
};

/** @alpha */
interface Breakpoint {
    /** Name of the breakpoint as displayed on the node */
    name: string;
    /** Width of the breakpoint in pixels */
    width: number;
    /** The height of the viewport in pixels. This is an optional value that is used for correctly
     * displaying fixed positioned elements on the canvas. */
    viewportHeight?: number;
}

type LintRuleNameValue = "forbid-browser-apis";
type LintIssueSeverityValue = "error" | "warning";
/** @deprecated The lintCode API was removed. This type will be removed in the near future. */
type LintConfig = Record<LintRuleNameValue, LintIssueSeverityValue>;
interface DiagnosticBase {
    message: string;
    span?: DiagnosticSpan;
}
interface DiagnosticSpan {
    /** The first character, counted from the beginning of the file, 0-based. */
    offset: number;
    length: number;
    /** The first character, 0-based. */
    start: ts.LineAndCharacter;
    /** The last character, 0-based. */
    end: ts.LineAndCharacter;
}
/** @deprecated The lintCode API was removed. This type will be removed in the near future. */
interface LintLink {
    url: string;
    text: string;
}
/** @deprecated The lintCode API was removed. This type will be removed in the near future. */
interface LintDiagnostic extends DiagnosticBase {
    /** The span of the invalid code in the file. */
    span: DiagnosticSpan;
    severity: LintIssueSeverityValue;
    link?: LintLink;
}
interface TypecheckDiagnostic extends DiagnosticBase {
    /**
     * The span of the invalid code in the file.
     * Could be undefined if the diagnostic is system-level (and not file-specific), like e.g. an error about invalid TS options.
     */
    span?: DiagnosticSpan;
    /** Could be undefined if the diagnostic is system-level (and not file-specific), like e.g. an error about invalid TS options */
    fileName?: string;
    code: number;
    category: ts.DiagnosticCategory;
}

declare const getAiServiceInfo: unique symbol;
declare const sendTrackingEvent: unique symbol;
declare const environmentInfo: unique symbol;
declare const initialState: unique symbol;
declare const showUncheckedPermissionToasts: unique symbol;
declare const marshal: unique symbol;
declare const unmarshal: unique symbol;
declare const getHTMLForNode: unique symbol;
declare const setHTMLForNode: unique symbol;
declare const $framerInternal: {
    readonly getAiServiceInfo: typeof getAiServiceInfo;
    readonly sendTrackingEvent: typeof sendTrackingEvent;
    readonly environmentInfo: typeof environmentInfo;
    readonly initialState: typeof initialState;
    readonly showUncheckedPermissionToasts: typeof showUncheckedPermissionToasts;
    readonly marshal: typeof marshal;
    readonly unmarshal: typeof unmarshal;
    readonly getHTMLForNode: typeof getHTMLForNode;
    readonly setHTMLForNode: typeof setHTMLForNode;
};
declare const getAiServiceInfoMessageType = "INTERNAL_getAiServiceInfo";
declare const sendTrackingEventMessageType = "INTERNAL_sendTrackingEvent";
declare const getHTMLForNodeMessageType = "INTERNAL_getHTMLForNode";
declare const setHTMLForNodeMessageType = "INTERNAL_setHTMLForNode";

type LocaleId = string;
interface Locale {
    id: LocaleId;
    code: string;
    name: string;
    slug: string;
    fallbackLocaleId?: string;
}
interface LocalizationValueBase {
    /** A `value` of `null` means that the value explicitly falls back to the fallback locale */
    value: string | null;
    lastEdited: number;
    /**
     * Whether the value is read only and therefore cannot be updated.
     *
     * For example, this is the case for localized values that were set
     * when syncing a managed collection. To update these values, you must
     * sync using the plugin that manages the collection.
     */
    readonly: boolean;
}
interface LocalizationValueNew {
    value: null;
    status: "new";
}
interface LocalizationValueNeedsReview extends LocalizationValueBase {
    status: "needsReview";
}
interface LocalizationValueDone extends LocalizationValueBase {
    status: "done";
}
interface LocalizationValueWarning extends LocalizationValueBase {
    status: "warning";
    warning: string;
}
type LocalizationValue = LocalizationValueNew | LocalizationValueNeedsReview | LocalizationValueDone | LocalizationValueWarning;
type LocalizationValueByLocale = Record<LocaleId, LocalizationValue>;
type InlineLocalizationValueByLocale = Record<LocaleId, LocalizationValue>;
type LocalizationGroupId = string;
type LocalizationSourceId = string;
type LocalizedValueStatus = LocalizationValue["status"];
type LocalizationSourceType = "string" | "formattedText" | "altText" | "slug" | "link";
interface LocalizationSource {
    /** A stable ID of the localization source that can be used for updating and synchronizing */
    id: LocalizationSourceId;
    /** The type of value for this source */
    type: LocalizationSourceType;
    /** Current Source value */
    value: string;
    /** Localized values and metadata for each locale */
    valueByLocale: LocalizationValueByLocale;
}
type LocalizationGroupStatus = "excluded" | "ready";
type LocalizationGroupStatusByLocale = Record<LocaleId, LocalizationGroupStatus>;
interface LocalizationGroup {
    id: LocalizationGroupId;
    name: string;
    type: "collection" | "collection-item" | "component" | "page" | "settings" | "template";
    supportsExcludedStatus: boolean;
    sources: LocalizationSource[];
    statusByLocale: LocalizationGroupStatusByLocale;
}
type LocalizedValueUpdate = {
    action: "set";
    value: string;
    needsReview?: boolean;
} | {
    action: "clear";
} | {
    action: "ignore";
    needsReview?: boolean;
};
type LocalizationSourceUpdate = Record<LocaleId, LocalizedValueUpdate>;
interface LocalizationData {
    valuesBySource?: Record<LocalizationSourceId, LocalizationSourceUpdate>;
    statusByLocaleByGroup?: Record<LocalizationGroupId, LocalizationGroupStatusByLocale>;
}
interface LocalizationValueError {
    sourceId: LocalizationSourceId;
    localeId: LocaleId | null;
    error: string;
}
interface LocalizationStatusByLocaleError {
    groupId: LocalizationGroupId;
    error: string;
}
interface SetLocalizationDataResult {
    /** Set one or more localized values */
    valuesBySource: {
        errors: readonly LocalizationValueError[];
    };
    /** Set the hidden locale IDs of one or more localization groups */
    statusByLocaleByGroup: {
        errors: readonly LocalizationStatusByLocaleError[];
    };
}

/**
 * The opposite of Partial, can't omit it. Useful for making sure that you don't forget to handle a
 * new property in all cases where objects are built.
 */
type ExplicitPartial<T> = {
    [P in keyof T]: T[P] | undefined;
};
/** Type helper to transform a interface so that each value can be null. */
type NullableRecord<T> = {
    [P in keyof T]-?: T[P] | null;
};
/** Type helper to transform a interface so that each value can be null or undefined. */
type NullablePartialRecord<T> = Partial<NullableRecord<T>>;
declare const classKey: "__class";
type ClassKey = typeof classKey;

type ComputedValue = UnsupportedComputedValue;
declare abstract class ComputedValueBase {
    abstract readonly type: typeof unsupportedComputedValueType;
}
declare const unsupportedComputedValueClass = "UnsupportedComputedValue";
declare const unsupportedComputedValueType = "unsupported";
interface WithUnsupportedComputedValueClass {
    [classKey]: typeof unsupportedComputedValueClass;
}
type UnsupportedComputedValueData = WithUnsupportedComputedValueClass;
declare class UnsupportedComputedValue extends ComputedValueBase {
    #private;
    readonly type = "unsupported";
    constructor(data: UnsupportedComputedValueData);
    static [$framerInternal.unmarshal](_: PluginEngine, data: UnsupportedComputedValueData): UnsupportedComputedValue;
    [$framerInternal.marshal](): UnsupportedComputedValueData;
}
declare function isComputedValue(value: unknown): value is ComputedValueBase;

declare const fontClassDiscriminator = "Font";
type FontSelector = string;
interface FontData {
    [classKey]: typeof fontClassDiscriminator;
    selector: FontSelector;
    family: string;
    weight: FontWeight | null;
    style: FontStyle$1 | null;
}
type FontAttributes = Prettify<Partial<{
    weight: FontWeight;
    style: FontStyle$1;
}>>;
declare const fontStyles: readonly ["normal", "italic"];
type FontStyle$1 = (typeof fontStyles)[number];
declare const fontWeights: readonly [100, 200, 300, 400, 500, 600, 700, 800, 900];
/**
 * Boldness as an absolute value.
 *
 *  These values are usually associated with the following names:
 * - `100` - Thin
 * - `200` - Extra Light (Ultra Light)
 * - `300` - Light
 * - `400` - Normal
 * - `500` - Medium
 * - `600` - Semi Bold (Demi Bold)
 * - `700` - Bold
 * - `800` - Extra Bold
 * - `900` - Black (Heavy)
 * */
type FontWeight = (typeof fontWeights)[number];
declare class Font {
    /** An identifier used internally for differentiating fonts. */
    readonly selector: string;
    /** Name of the family the font belongs to. */
    readonly family: string;
    /**
     * Specifies how thin or bold the font appears.
     *
     * Note: This will be `null` for custom fonts since their weight isn't
     * calculated.
     * */
    readonly weight: FontWeight | null;
    /**
     * Specifies if the font is normal or _italic_.
     *
     * Note: This will be `null` for custom fonts since their weight isn't
     * calculated.
     * */
    readonly style: FontStyle$1 | null;
    constructor(data: FontData);
    static [$framerInternal.unmarshal](_: PluginEngine, data: FontData): Font;
    [$framerInternal.marshal](): FontData;
}

declare enum CSSUnit {
    Pixel = "px",
    Rem = "rem",
    Em = "em",
    Percentage = "%",
    Fraction = "fr",
    ViewportWidth = "vw",
    ViewportHeight = "vh"
}
type CSSDimension<U extends CSSUnit> = `${number}${U}`;

type TextNodeTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type TextTransform = "none" | "inherit" | "capitalize" | "uppercase" | "lowercase";
type TextAlignment = "left" | "center" | "right" | "justify";
type TextDecoration = "none" | "underline" | "line-through";
type TextDecorationStyle = "solid" | "double" | "dotted" | "dashed" | "wavy";
type TextDecorationSkipInk = "none" | "all" | "auto";
interface AddTextOptions {
    tag: TextNodeTag;
}

interface WithKey {
    key: string;
}
interface WithTitle {
    title: string;
}
interface WithDescription$1 {
    description: string;
}
interface ControlBase extends WithKey, Partial<WithTitle>, Partial<WithDescription$1> {
}
interface EnumOption extends Partial<WithTitle> {
    id: string | boolean | number | null;
}
interface EnumControl extends ControlBase {
    type: "enum";
    /** The ID of the selected option */
    value?: string | boolean | number | null | UnsupportedVariable | UnsupportedComputedValue | undefined;
    options: EnumOption[];
}
interface BooleanControl extends ControlBase {
    type: "boolean";
    value?: boolean | BooleanVariable | UnsupportedComputedValue | undefined;
}
interface BorderControl extends ControlBase {
    type: "border";
    value?: Border | BorderVariable | undefined;
}
interface Shadow {
    type: "box" | "realistic";
    inset: boolean;
    color: string | ColorStyle;
    x: number;
    y: number;
    blur: number;
    spread: number;
    diffusion: number;
    focus: number;
}
interface ShadowControl extends ControlBase {
    type: "shadow";
    value?: readonly Shadow[] | UnsupportedVariable | UnsupportedComputedValue | undefined;
}
interface DateControl extends ControlBase {
    type: "date";
    value?: string | DateVariable | UnsupportedComputedValue | undefined;
}
interface NumberControl extends ControlBase {
    type: "number";
    value?: number | NumberVariable | UnsupportedComputedValue | undefined;
}
interface Transition {
    type: "spring" | "tween" | "inertia" | false;
    ease: [number, number, number, number];
    duration: number;
    delay: number;
    stiffness: number;
    damping: number;
    mass: number;
    durationBasedSpring?: boolean;
    bounce?: number;
    stagger?: number;
}
interface TransitionControl extends ControlBase {
    type: "transition";
    value?: Transition | UnsupportedVariable | undefined;
}
interface StringControl extends ControlBase {
    type: "string";
    value?: string | StringVariable | UnsupportedVariable | UnsupportedComputedValue | undefined;
}
interface ColorControl extends ControlBase {
    type: "color";
    value?: string | ColorStyle | ColorVariable | UnsupportedComputedValue | undefined;
}
interface FormattedTextControl extends ControlBase {
    type: "formattedText";
    value?: string | FormattedTextVariable | UnsupportedComputedValue | undefined;
}
interface WithCollectionItemId {
    collectionItemId: string;
}
interface ScrollSectionSelector extends Partial<WithCollectionItemId> {
    targetNodeId: string;
}
interface LinkToWebPage extends Partial<WithCollectionItemId> {
    type: "webPage";
    webPageId: string;
    scrollSection?: ScrollSectionSelector | undefined;
}
interface LinkToUrl {
    type: "url";
    url: string;
}
type Link = LinkToWebPage | LinkToUrl;
interface LinkControl extends ControlBase {
    type: "link";
    value?: Link | LinkVariable | FileVariable | UnsupportedComputedValue | undefined;
}
type Rel = "nofollow" | "noreferrer" | "me" | "ugc" | "sponsored";
interface LinkRelControl extends ControlBase {
    type: "linkRel";
    value?: readonly Rel[] | UnsupportedVariable | undefined;
}
type FontStyle = Pick<CSSProperties, "fontFamily" | "fontWeight" | "fontStyle" | "fontSize" | "lineHeight" | "textAlign" | "letterSpacing" | "fontFeatureSettings">;
interface FontControl extends ControlBase {
    type: "font";
    value?: FontStyle | undefined;
}
interface PageScopeControl extends ControlBase {
    type: "pageScope";
    value?: LinkToWebPage | undefined;
}
interface ScrollSectionControl extends ControlBase {
    type: "scrollSection";
    value?: ScrollSectionSelector | UnsupportedVariable | undefined;
}
interface CustomCursor {
    smartComponentId?: string | undefined;
    variant?: string | undefined;
    follow?: boolean | undefined;
    offsetX?: number | undefined;
    offsetY?: number | undefined;
    placement?: "top" | "right" | "bottom" | "left" | undefined;
    alignment?: "start" | "center" | "end" | undefined;
    transitionEnabled?: boolean | undefined;
    transition?: Transition | undefined;
}
interface CustomCursorControl extends ControlBase {
    type: "customCursor";
    value?: CustomCursor | UnsupportedVariable | undefined;
}
type CSSCursor = "default" | "pointer" | "progress" | "copy" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "context-menu" | "cell" | "crosshair" | "alias" | "zoom-in" | "zoom-out" | "help" | "nw-resize" | "n-resize" | "ne-resize" | "w-resize" | "move" | "e-resize" | "sw-resize" | "s-resize" | "se-resize" | "ew-resize" | "ns-resize" | "nwse-resize" | "nesw-resize" | "col-resize" | "row-resize" | "text" | "vertical-text" | "none";
interface CursorControl extends ControlBase {
    type: "cursor";
    value?: CSSCursor | UnsupportedVariable | undefined;
}
interface FileControl extends ControlBase {
    type: "file";
    value?: FileAsset | FileVariable | UnsupportedVariable | UnsupportedComputedValue | undefined;
}
type PixelNumber = `${number}px`;
type TwoPixelNumberShorthand = PixelNumber | `${PixelNumber} ${PixelNumber}`;
interface GapControl extends ControlBase {
    type: "gap";
    value?: TwoPixelNumberShorthand | UnsupportedVariable | NumberVariable | UnsupportedComputedValue | undefined;
}
type FourPixelNumberShorthand = PixelNumber | `${PixelNumber} ${PixelNumber} ${PixelNumber} ${PixelNumber}`;
interface PaddingControl extends ControlBase {
    type: "padding";
    value?: FourPixelNumberShorthand | UnsupportedVariable | NumberVariable | UnsupportedComputedValue | undefined;
}
type RelativeNumber = `${number}%`;
type RelativeOrFourPixelNumberShorthand = RelativeNumber | FourPixelNumberShorthand;
interface BorderRadiusControl extends ControlBase {
    type: "borderRadius";
    value?: RelativeOrFourPixelNumberShorthand | UnsupportedVariable | NumberVariable | UnsupportedComputedValue | undefined;
}
interface CollectionReferenceControl extends ControlBase {
    type: "collectionReference";
    value?: string | UnsupportedVariable | undefined;
}
interface MultiCollectionReferenceControl extends ControlBase {
    type: "multiCollectionReference";
    value?: readonly string[] | UnsupportedVariable | UnsupportedComputedValue | undefined;
}
interface VectorSetItemControl extends ControlBase {
    type: "vectorSetItem";
    value?: string | UnsupportedVariable | undefined;
}
interface TrackingIdControl extends ControlBase {
    type: "trackingId";
    value?: string | UnsupportedVariable | undefined;
}
interface ImageControl extends ControlBase {
    type: "image";
    value?: ImageAsset | ImageVariable | UnsupportedComputedValue | undefined;
}
interface FusedNumber {
    single: number;
    fused: [number, number, number, number];
    isFused: boolean;
}
interface FusedNumberControl extends ControlBase {
    type: "fusedNumber";
    value?: FusedNumber | undefined;
}
interface ObjectControl extends ControlBase {
    type: "object";
    value?: Record<string, Control> | undefined;
}
type ArrayItemControl = BooleanControl | BorderControl | ColorControl | CursorControl | CustomCursorControl | DateControl | EnumControl | FileControl | FormattedTextControl | ImageControl | LinkControl | NumberControl | ObjectControl | ScrollSectionControl | SlotControl | StringControl | TransitionControl;
interface ArrayItem$1<T extends ArrayItemControl> {
    id: string;
    value: T["value"];
}
interface ArrayControlBase<T extends ArrayItemControl> extends ControlBase {
    type: "array";
    /** Use this to narrow the type of `value` and `itemControl`. */
    itemType: T["type"];
    value?: ArrayItem$1<T>[] | UnsupportedComputedValue | undefined;
    itemControl: Omit<T, "value">;
}
type ArrayControlHelper<T extends ArrayItemControl = ArrayItemControl> = T extends unknown ? ArrayControlBase<T> : never;
type ArrayControl = ArrayControlHelper;
interface EventHandlerControl extends ControlBase {
    type: "eventHandler";
    value?: undefined;
}
interface SlotItem {
    id: string;
    nodeId?: string | undefined;
}
interface SlotControl extends ControlBase {
    type: "slot";
    value?: readonly SlotItem[] | undefined;
}
type Control = EnumControl | BooleanControl | BorderControl | ShadowControl | DateControl | NumberControl | TransitionControl | StringControl | ColorControl | FormattedTextControl | LinkControl | LinkRelControl | FontControl | PageScopeControl | ScrollSectionControl | CustomCursorControl | CursorControl | FileControl | GapControl | PaddingControl | BorderRadiusControl | CollectionReferenceControl | MultiCollectionReferenceControl | VectorSetItemControl | TrackingIdControl | ImageControl | FusedNumberControl | ObjectControl | ArrayControl | EventHandlerControl | SlotControl;
interface WithTypedControlsTrait {
    readonly typedControls: Marshaled<Record<string, Control>>;
}

type NodeId = string;
interface WithIdTrait {
    readonly id: NodeId;
}
type Gesture = "hover" | "pressed" | "loading" | "error";
interface WithReplicaInfoTrait {
    readonly originalId: string | null;
}
interface WithComponentVariantTrait {
    readonly isVariant: boolean;
    readonly isPrimaryVariant: boolean;
    readonly gesture: Gesture | null;
    readonly inheritsFromId: string | null;
}
interface IsComponentVariant {
    readonly isVariant: true;
    readonly isPrimaryVariant: boolean;
    readonly inheritsFromId: string;
}
interface IsComponentGestureVariant extends IsComponentVariant {
    readonly gesture: Gesture;
}
interface WithNameTrait {
    readonly name: string | null;
}
interface WithVisibleTrait {
    readonly visible: boolean;
}
interface WithLockedTrait {
    readonly locked: boolean;
}
interface WithBreakpointTrait {
    readonly isBreakpoint: boolean;
    readonly isPrimaryBreakpoint: boolean;
}
interface IsBreakpoint {
    readonly isBreakpoint: true;
    readonly isPrimaryBreakpoint: boolean;
}
interface WithBackgroundColorTrait<T extends TraitVariant> {
    /** Color of the frame in RGBA format, e.g `rgba(242, 59, 57, 1)`, or as a `ColorStyle` instance. */
    readonly backgroundColor: (T extends TraitVariantData ? ColorStyleData : ColorStyle) | string | null;
}
interface WithBackgroundImageTrait<T extends TraitVariant> {
    readonly backgroundImage: (T extends TraitVariantData ? ImageAssetData : ImageAsset) | null;
}
interface WithBackgroundGradientTrait<T extends TraitVariant> {
    readonly backgroundGradient: (T extends TraitVariantData ? GradientData : Gradient) | null;
}
interface WithRotationTrait {
    readonly rotation: number;
}
interface WithOpacityTrait {
    readonly opacity: number;
}
type BorderRadius = CSSDimension<CSSUnit.Percentage | CSSUnit.Pixel> | `${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>}` | null;
interface WithBorderRadiusTrait {
    readonly borderRadius: BorderRadius;
}
type BorderWidth = CSSDimension<CSSUnit.Pixel> | `${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>}`;
type BorderStyle = "solid" | "dashed" | "dotted" | "double";
interface Border {
    width: BorderWidth;
    color: ColorStyle | string;
    style: BorderStyle;
}
interface WithBorderTrait<T extends TraitVariant> {
    readonly border: (T extends TraitVariantData ? Marshaled<Border> : Border) | null;
}
type ImageRendering = "auto" | "pixelated";
interface WithImageRenderingTrait {
    readonly imageRendering: ImageRendering | null;
}
type Overflow = "visible" | "hidden" | "auto" | "clip";
type AxisOverflow = Overflow;
interface WithOverflowTrait {
    readonly overflow: Overflow | null;
    readonly overflowX: AxisOverflow | null;
    readonly overflowY: AxisOverflow | null;
}
interface WithTextTruncationTrait {
    readonly textTruncation: number | null;
}
interface WithZIndexTrait {
    readonly zIndex: number | null;
}
interface WithRequiredComponentInfoTrait {
    readonly componentIdentifier: string;
}
interface WithNullableComponentInfoTrait {
    readonly insertURL: string | null;
    readonly componentName: string | null;
}
interface WithComponentInfoTrait extends WithRequiredComponentInfoTrait, WithNullableComponentInfoTrait {
}
interface WithWebPageInfoTrait {
    readonly path: string | null;
    readonly collectionId: string | null;
}
interface WithLinkTrait {
    readonly link: string | null;
    readonly linkOpenInNewTab: boolean | null;
}
type ControlAttributes = Record<string, unknown>;
interface WithControlAttributesTrait {
    readonly controls: ControlAttributes;
}
interface WithSVGTrait {
    readonly svg: string;
}
type Position = "relative" | "absolute" | "fixed" | "sticky";
interface WithPositionTrait {
    position: Position;
}
type FitContent = "fit-content";
type FitImage = "fit-image";
interface WithPinsTrait {
    top: CSSDimension<CSSUnit.Pixel> | null;
    right: CSSDimension<CSSUnit.Pixel> | null;
    bottom: CSSDimension<CSSUnit.Pixel> | null;
    left: CSSDimension<CSSUnit.Pixel> | null;
    centerX: CSSDimension<CSSUnit.Percentage> | null;
    centerY: CSSDimension<CSSUnit.Percentage> | null;
}
type Length = CSSDimension<CSSUnit.Pixel | CSSUnit.Percentage | CSSUnit.Fraction>;
type WidthLength = Length | FitContent | FitImage;
type HeightLength = Length | FitContent | CSSDimension<CSSUnit.ViewportHeight> | FitImage;
interface WithSizeTrait {
    width: WidthLength | null;
    height: HeightLength | null;
}
interface WithAspectRatioTrait {
    aspectRatio: number | null;
}
type WidthConstraint = CSSDimension<CSSUnit.Pixel | CSSUnit.Percentage>;
type HeightConstraint = CSSDimension<CSSUnit.Pixel | CSSUnit.Percentage | CSSUnit.ViewportHeight>;
interface WithSizeConstraintsTrait {
    maxWidth: WidthConstraint | null;
    minWidth: WidthConstraint | null;
    maxHeight: HeightConstraint | null;
    minHeight: HeightConstraint | null;
}
interface WithInlineTextStyleTrait<T extends TraitVariant> {
    readonly inlineTextStyle: (T extends TraitVariantData ? TextStyleData : TextStyle) | null;
}
interface WithFontTrait<T extends TraitVariant> {
    readonly font: (T extends TraitVariantData ? FontData : Font) | null;
}
type TraitVariantData = "data";
type TraitVariantNode = "node";
type StackDirection = "horizontal" | "vertical";
type StackDistribution = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
type StackAlignment = "start" | "center" | "end";
type LayoutType = "stack" | "grid";
interface StackLayout {
    stackDirection: StackDirection | null;
    stackDistribution: StackDistribution | null;
    stackAlignment: StackAlignment | null;
    stackWrapEnabled: boolean | null;
}
type GridContentAlignment = "start" | "center" | "end";
interface GridLayout {
    gridColumnCount: number | "auto-fill" | null;
    gridRowCount: number | null;
    gridAlignment: GridContentAlignment | null;
    gridColumnWidthType: "fixed" | "minmax" | null;
    gridColumnWidth: number | null;
    gridColumnMinWidth: number | null;
    gridRowHeightType: "fixed" | "auto" | "fit" | null;
    gridRowHeight: number | null;
}
interface WithLayoutTrait extends StackLayout, GridLayout {
    layout: LayoutType | null;
    gap: CSSDimension<CSSUnit.Pixel> | `${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>}` | null;
    padding: CSSDimension<CSSUnit.Pixel> | `${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>} ${CSSDimension<CSSUnit.Pixel>}` | null;
}
type GridItemAlignment = "start" | "center" | "end";
type GridItemColumnSpan = number | "all";
interface WithGridItemTrait {
    gridItemFillCellWidth: boolean | null;
    gridItemFillCellHeight: boolean | null;
    gridItemHorizontalAlignment: GridItemAlignment | null;
    gridItemVerticalAlignment: GridItemAlignment | null;
    gridItemColumnSpan: GridItemColumnSpan | null;
    gridItemRowSpan: number | null;
}
type TraitVariant = TraitVariantData | TraitVariantNode;
interface AllTraits<T extends TraitVariant = TraitVariant> extends WithIdTrait, WithNameTrait, WithVisibleTrait, WithLockedTrait, WithBackgroundColorTrait<T>, WithBackgroundImageTrait<T>, WithBackgroundGradientTrait<T>, WithRotationTrait, WithOpacityTrait, WithBorderRadiusTrait, WithBorderTrait<T>, WithOverflowTrait, WithComponentInfoTrait, WithControlAttributesTrait, WithTypedControlsTrait, WithSVGTrait, WithPositionTrait, WithPinsTrait, WithSizeTrait, WithSizeConstraintsTrait, WithAspectRatioTrait, WithTextTruncationTrait, WithImageRenderingTrait, WithZIndexTrait, WithFontTrait<T>, WithInlineTextStyleTrait<T>, WithWebPageInfoTrait, WithLayoutTrait, WithGridItemTrait, WithComponentVariantTrait, WithBreakpointTrait, WithLinkTrait {
}
type NodeAttributeKey = Prettify<Exclude<keyof AllTraits<TraitVariantNode>, "id" | "children">>;
type PartialNodeData = AnyNode | Partial<AnyNodeData>;
declare function supportsPosition<T extends PartialNodeData>(node: T): node is T & WithPositionTrait;
declare function supportsPins<T extends PartialNodeData>(node: T): node is T & WithPinsTrait;
declare function supportsSize<T extends PartialNodeData>(node: T): node is T & WithSizeTrait;
declare function supportsSizeConstraints<T extends PartialNodeData>(node: T): node is T & WithSizeConstraintsTrait;
declare function supportsAspectRatio<T extends PartialNodeData>(node: T): node is T & WithAspectRatioTrait;
declare function supportsName<T extends PartialNodeData>(node: T): node is T & WithNameTrait;
declare function supportsVisible<T extends PartialNodeData>(node: T): node is T & WithVisibleTrait;
declare function supportsLocked<T extends PartialNodeData>(node: T): node is T & WithLockedTrait;
declare function supportsBackgroundColor<T extends AnyNode>(node: T): node is T & WithBackgroundColorTrait<TraitVariantNode>;
declare function supportsBackgroundColorData<T extends Partial<AnyNodeData>>(node: T): node is T & WithBackgroundColorTrait<TraitVariantData>;
declare function supportsBackgroundImage<T extends AnyNode>(node: T): node is T & WithBackgroundImageTrait<TraitVariantNode>;
declare function supportsBackgroundImageData<T extends Partial<AnyNodeData>>(node: T): node is T & WithBackgroundImageTrait<TraitVariantData>;
declare function supportsBackgroundGradient<T extends PartialNodeData>(node: T): node is T & WithBackgroundGradientTrait<TraitVariantNode>;
declare function supportsBackgroundGradientData<T extends PartialNodeData>(node: T): node is T & WithBackgroundGradientTrait<TraitVariantData>;
declare function supportsRotation<T extends PartialNodeData>(node: T): node is T & WithRotationTrait;
declare function supportsOpacity<T extends PartialNodeData>(node: T): node is T & WithOpacityTrait;
declare function supportsBorderRadius<T extends PartialNodeData>(node: T): node is T & WithBorderRadiusTrait;
declare function supportsBorder<T extends AnyNode>(node: T): node is T & WithBorderTrait<TraitVariantNode>;
declare function supportsSVG<T extends PartialNodeData>(node: T): node is T & WithSVGTrait;
declare function supportsTextTruncation<T extends PartialNodeData>(node: T): node is T & WithTextTruncationTrait;
declare function supportsZIndex<T extends PartialNodeData>(node: T): node is T & WithZIndexTrait;
declare function supportsOverflow<T extends PartialNodeData>(node: T): node is T & WithOverflowTrait;
declare function supportsComponentInfo<T extends PartialNodeData>(node: T): node is T & WithComponentInfoTrait;
declare function supportsFont<T extends PartialNodeData>(node: T): node is T & WithFontTrait<TraitVariantNode>;
declare function supportsFontData<T extends PartialNodeData>(node: T): node is T & WithFontTrait<TraitVariantData>;
declare function supportsInlineTextStyle<T extends PartialNodeData>(node: T): node is T & WithInlineTextStyleTrait<TraitVariantNode>;
declare function supportsInlineTextStyleData<T extends PartialNodeData>(node: T): node is T & WithInlineTextStyleTrait<TraitVariantData>;
declare function supportsLink<T extends PartialNodeData>(node: T): node is T & WithLinkTrait;
declare function supportsImageRendering<T extends PartialNodeData>(node: T): node is T & WithImageRenderingTrait;
declare function supportsLayout<T extends PartialNodeData>(node: T): node is T & WithLayoutTrait;
declare function hasStackLayout<T extends PartialNodeData>(node: T): node is T & WithLayoutTrait & StackLayout;
declare function hasGridLayout<T extends PartialNodeData>(node: T): node is T & WithLayoutTrait & GridLayout;
declare function supportsComponentVariant<T extends PartialNodeData>(node: T): node is T & WithComponentVariantTrait;
declare function isComponentVariant<T extends AnyNode>(node: T): node is T & IsComponentVariant;
declare function isComponentGestureVariant<T extends AnyNode>(node: T): node is T & IsComponentGestureVariant;
declare function supportsBreakpoint<T extends PartialNodeData>(node: T): node is T & WithBreakpointTrait;
declare function isBreakpoint<T extends AnyNode>(node: T): node is T & IsBreakpoint;

declare const colorStyleDiscriminator: "ColorStyle";
interface WithAssetName {
    name?: string;
    path?: never;
}
interface WithAssetPath {
    name?: never;
    path?: string;
}
type AssetPath = WithAssetName | WithAssetPath;
interface RequiredColorStyleAttributes {
    light: string;
}
interface OptionalColorStyleAttributes {
    dark: string | null;
}
interface ColorStyleData extends RequiredColorStyleAttributes, OptionalColorStyleAttributes {
    [classKey]: typeof colorStyleDiscriminator;
    id: NodeId;
    name: string;
    path: string;
}
type ColorStyleAttributes = Prettify<RequiredColorStyleAttributes & Partial<OptionalColorStyleAttributes> & AssetPath>;
declare class ColorStyle {
    #private;
    readonly id: NodeId;
    readonly name: string;
    /**
     * Hierarchical path to the color style in the assets folder structure, e.g. `ui/modals/background`.
     * Used for organizing color styles in the UI and for programmatic access.
     * Segments are separated by forward slashes.
     */
    readonly path: string;
    /** Color used for the default or light theme in RGBA format, e.g `rgba(242, 59, 57, 1)` */
    readonly light: string;
    /** Optional color used for the dark theme in RGBA format, e.g `rgba(242, 59, 57, 1)` */
    readonly dark: string | null;
    constructor(engine: PluginEngine, data: ColorStyleData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: ColorStyleData): ColorStyle;
    [$framerInternal.marshal](): ColorStyleData;
    /**
     * Set the attributes of a color style.
     *
     * Use `"ColorStyle.setAttributes"` to check if this method is allowed.
     */
    setAttributes(update: Partial<ColorStyleAttributes>): Promise<ColorStyle | null>;
    /**
     * Get plugin data for this color style by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Set plugin data on this color style by key.
     *
     * Use `"ColorStyle.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get all plugin data keys for this color style.
     */
    getPluginDataKeys(): Promise<string[]>;
    /**
     * Deletes the color style from the project.
     *
     * Use `"ColorStyle.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
}
declare function isColorStyle(value: unknown): value is ColorStyle;
type TextStyleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
interface TextStyleBreakpointData {
    /**
     * How big does the window width need to be for this breakpoint's styles to
     * take affect.
     *
     * This must be unique for each breakpoint.
     * */
    minWidth: number;
    /** Size of the text at this breakpoint. */
    fontSize: CSSDimension<CSSUnit.Pixel | CSSUnit.Rem>;
    /** Size of the space between each letter at this breakpoint. */
    letterSpacing: CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    /** Size of the space between each line of text at this breakpoint. */
    lineHeight: CSSDimension<CSSUnit.Pixel | CSSUnit.Em | CSSUnit.Percentage>;
    /** Size of the space between each paragraph at this breakpoint. */
    paragraphSpacing: number;
}
type TextStyleBreakpointAttributes = Prettify<Partial<TextStyleBreakpointData> & Pick<TextStyleBreakpointData, "minWidth">>;
type TextStyleBreakpoint = Prettify<TextStyleBreakpointData>;
declare const textStyleDiscriminator: "TextStyle";
interface TextStyleData extends TextStyleBreakpointData {
    [classKey]: typeof textStyleDiscriminator;
    id: NodeId;
    name: string;
    path: string;
    tag: TextStyleTag;
    color: ColorStyleData | string;
    font: FontData;
    boldFont: FontData | null;
    italicFont: FontData | null;
    boldItalicFont: FontData | null;
    transform: TextTransform;
    alignment: TextAlignment;
    decoration: TextDecoration;
    decorationColor: ColorStyleData | string;
    decorationThickness: "auto" | CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    decorationStyle: TextDecorationStyle;
    decorationSkipInk: TextDecorationSkipInk;
    decorationOffset: "auto" | CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    balance: boolean;
    breakpoints: TextStyleBreakpointData[];
}
type TextStyleAttributes = Prettify<Partial<Omit<TextStyleData, "id" | "color" | "font" | "boldFont" | "italicFont" | "boldItalicFont" | "breakpoints"> & {
    color: ColorStyle | string;
    font: Font;
    boldFont: Font | null;
    italicFont: Font | null;
    boldItalicFont: Font | null;
    breakpoints: TextStyleBreakpointAttributes[];
}> & AssetPath>;
declare class TextStyle {
    #private;
    readonly id: NodeId;
    readonly name: string;
    /**
     * Hierarchical path to the text style in the assets folder structure, e.g. `ui/modals/text`.
     * Used for organizing text styles in the UI and for programmatic access.
     * Segments are separated by forward slashes.
     */
    readonly path: string;
    /** HTML tag that the style will use. */
    readonly tag: TextStyleTag;
    /**
     * Base font of the text.
     *
     * Setting this will automatically update `boldFont`, `italicFont` or
     * `boldItalicFont` with the appropriate variants if they are not already
     * specified.
     * */
    readonly font: Font;
    /**
     * Font to use for bold text.
     *
     * Note: This must have the same family name as the base `font` attribute.
     * */
    readonly boldFont: Font | null;
    /**
     * Font to use for italic text.
     *
     * Note: This must be the same family name as the base `font` attribute.
     * */
    readonly italicFont: Font | null;
    /**
     * Font to use for bold italic text.
     *
     * Note: This must have the same family name as the base `font` attribute.
     * */
    readonly boldItalicFont: Font | null;
    /** Color of the text in RGBA format for all breakpoints, e.g `rgba(242, 59, 57, 1)` */
    readonly color: ColorStyle | string;
    /** Specifies how to capitalize the text for all breakpoints. */
    readonly transform: TextTransform;
    /** Specifies the horizontal direction of the text for all breakpoints. */
    readonly alignment: TextAlignment;
    /** Appearance of any decorative lines on the text for all breakpoints. */
    readonly decoration: TextDecoration;
    /** Color of the text decoration in RGBA format for all breakpoints, e.g `rgba(242, 59, 57, 1)` */
    readonly decorationColor: ColorStyle | string;
    /** Thickness of the text decoration for all breakpoints. */
    readonly decorationThickness: "auto" | CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    /** Style of the text decoration for all breakpoints. */
    readonly decorationStyle: TextDecorationStyle;
    /** Whether to skip ink when drawing the text decoration for all breakpoints. */
    readonly decorationSkipInk: TextDecorationSkipInk;
    /** Offset of the text decoration for all breakpoints. */
    readonly decorationOffset: "auto" | CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    /** When enabled, use a text wrap method that tries to balance the number of characters on each line for legibility. */
    readonly balance: boolean;
    /** A list of style overrides that take affect at specific window widths. Breakpoints are automatically sorted by `minWidth` from largest to smallest. */
    readonly breakpoints: TextStyleBreakpoint[];
    /**
     * How big does the window width need to be for primary breakpoint styles to
     * take affect.
     *
     * Note: This is ignored if the text style has no breakpoints.
     * */
    readonly minWidth: number;
    /**
     * Size of the text of the primary breakpoint.
     *
     * Note: This is used by default when there are no breakpoints.
     * */
    readonly fontSize: CSSDimension<CSSUnit.Pixel | CSSUnit.Rem>;
    /**
     * Size of the space between each letter for the primary breakpoint.
     *
     * Note: This is used by default when there are no breakpoints.
     * */
    readonly letterSpacing: CSSDimension<CSSUnit.Pixel | CSSUnit.Em>;
    /**
     * Size of the space between each line of text for the primary breakpoint.
     *
     * Note: This is used by default when there are no breakpoints.
     * */
    readonly lineHeight: CSSDimension<CSSUnit.Pixel | CSSUnit.Em | CSSUnit.Percentage>;
    /**
     * Size of the space between each paragraph for the primary breakpoint.
     *
     * Note: This is used by default when there are no breakpoints.
     * */
    readonly paragraphSpacing: number;
    constructor(engine: PluginEngine, data: TextStyleData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: TextStyleData): TextStyle;
    [$framerInternal.marshal](): TextStyleData;
    /**
     * Set the attributes of the text style.
     *
     * @throws If the number of breakpoints is bigger than the limit of 4.
     * @throws If any of the font families used for `boldFont`, `italicFont` and
     * `boldItalicFont` do not match the family of `font`.
     *
     * Use `"TextStyle.setAttributes"` to check if this method is allowed.
     */
    setAttributes(attributes: TextStyleAttributes): Promise<TextStyle | null>;
    /**
     * Get plugin data for this text style by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Set plugin data on this text style by key.
     *
     * Use `"TextStyle.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get all plugin data keys for this text style.
     */
    getPluginDataKeys(): Promise<string[]>;
    /**
     * Deletes the text style from the project.
     *
     * Use `"TextStyle.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
}
declare function isTextStyle(value: unknown): value is TextStyle;

interface ColorStopData {
    color: ColorStyleData | string;
    position: number;
}
interface BaseGradientData {
    stops: readonly ColorStopData[];
}
declare const linearGradientType: "LinearGradient";
type LinearGradientType = typeof linearGradientType;
interface LinearGradientData extends BaseGradientData {
    [classKey]: LinearGradientType;
    angle: number;
}
declare const radialGradientType: "RadialGradient";
type RadialGradientType = typeof radialGradientType;
interface RadialGradientData extends BaseGradientData {
    [classKey]: RadialGradientType;
    width: CSSDimension<CSSUnit.Percentage>;
    height: CSSDimension<CSSUnit.Percentage>;
    x: CSSDimension<CSSUnit.Percentage>;
    y: CSSDimension<CSSUnit.Percentage>;
}
declare const conicGradientType: "ConicGradient";
type ConicGradientType = typeof conicGradientType;
interface ConicGradientData extends BaseGradientData {
    [classKey]: ConicGradientType;
    angle: number;
    x: CSSDimension<CSSUnit.Percentage>;
    y: CSSDimension<CSSUnit.Percentage>;
}
type GradientData = LinearGradientData | RadialGradientData | ConicGradientData;
interface ColorStop {
    /** CSS color */
    color: ColorStyle | string;
    /** 0-1 */
    position: number;
}
interface UnmarshaledGradientBase {
    stops: readonly ColorStop[];
}
interface UnmarshaledLinearGradient extends UnmarshaledGradientBase {
    [classKey]: LinearGradientType;
    angle: number;
}
interface UnmarshaledRadialGradient extends UnmarshaledGradientBase {
    [classKey]: RadialGradientType;
    width: CSSDimension<CSSUnit.Percentage>;
    height: CSSDimension<CSSUnit.Percentage>;
    x: CSSDimension<CSSUnit.Percentage>;
    y: CSSDimension<CSSUnit.Percentage>;
}
interface UnmarshaledConicGradient extends UnmarshaledGradientBase {
    [classKey]: ConicGradientType;
    angle: number;
    x: CSSDimension<CSSUnit.Percentage>;
    y: CSSDimension<CSSUnit.Percentage>;
}
type UnmarshaledGradient = UnmarshaledLinearGradient | UnmarshaledRadialGradient | UnmarshaledConicGradient;
type UnmarshaledGradientAttributes = Omit<UnmarshaledGradient, ClassKey>;
type ExtractUnmarshaledGradientAttributes<T extends {
    [classKey]: UnmarshaledGradient[ClassKey];
}> = Omit<Extract<UnmarshaledGradient, {
    [classKey]: T[ClassKey];
}>, ClassKey>;
declare abstract class GradientBase {
    #private;
    abstract readonly [classKey]: UnmarshaledGradient[ClassKey];
    /** Color stops with position */
    get stops(): readonly ColorStop[];
    constructor(unmarshaledAttributes: UnmarshaledGradientAttributes);
    cloneWithAttributes(attributes: Partial<ExtractUnmarshaledGradientAttributes<typeof this>>): typeof this;
}
type UnmarshaledLinearGradientAttributes = Omit<UnmarshaledLinearGradient, ClassKey>;
declare class LinearGradient extends GradientBase {
    #private;
    readonly [classKey]: "LinearGradient";
    /** 0-360 */
    get angle(): number;
    constructor(unmarshaledAttributes: UnmarshaledLinearGradientAttributes);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: LinearGradientData): LinearGradient;
    [$framerInternal.marshal](): LinearGradientData;
    toCSS(): string;
}
type UnmarshaledRadialGradientAttributes = Omit<UnmarshaledRadialGradient, ClassKey>;
declare class RadialGradient extends GradientBase {
    #private;
    readonly [classKey]: "RadialGradient";
    /** Relative width */
    get width(): CSSDimension<CSSUnit.Percentage>;
    /** Relative height */
    get height(): CSSDimension<CSSUnit.Percentage>;
    /** Relative horizontal position */
    get x(): CSSDimension<CSSUnit.Percentage>;
    /** Relative vertical position */
    get y(): CSSDimension<CSSUnit.Percentage>;
    constructor(unmarshaledAttributes: UnmarshaledRadialGradientAttributes);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: RadialGradientData): RadialGradient;
    [$framerInternal.marshal](): RadialGradientData;
    toCSS(): string;
}
type UnmarshaledConicGradientAttributes = Omit<UnmarshaledConicGradient, ClassKey>;
declare class ConicGradient extends GradientBase {
    #private;
    readonly [classKey]: "ConicGradient";
    /** 0-360 */
    get angle(): number;
    /** Relative horizontal position */
    get x(): CSSDimension<CSSUnit.Percentage>;
    /** Relative vertical position */
    get y(): CSSDimension<CSSUnit.Percentage>;
    constructor(unmarshaledAttributes: UnmarshaledConicGradientAttributes);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: ConicGradientData): ConicGradient;
    [$framerInternal.marshal](): ConicGradientData;
    toCSS(): string;
}
type Gradient = LinearGradient | RadialGradient | ConicGradient;

type Marshaled<T> = T extends {
    [$framerInternal.marshal]: () => unknown;
} ? ReturnType<T[typeof $framerInternal.marshal]> : T extends string & {} ? T : T extends number & {} ? T : T extends object ? {
    [K in keyof T]: Marshaled<T[K]>;
} : T;

interface WithNodeId {
    nodeId: string;
}
type NodeType = "component" | "collection";
interface WithNodeType {
    nodeType: NodeType;
}
interface WithId {
    id: string;
}
interface WithName {
    name: string;
}
interface WithNameByLocale {
    nameByLocale: InlineLocalizationValueByLocale;
}
interface WithNameByLocaleUpdate {
    nameByLocale: LocalizationSourceUpdate;
}
interface WithDescription {
    description: string;
}
interface BaseVariableData extends WithNodeId, WithNodeType, WithId, WithName, ExplicitPartial<WithDescription> {
}
interface CreateVariableBase extends WithName, Partial<WithDescription> {
}
interface UpdateVariableBase extends Partial<WithName>, NullablePartialRecord<WithDescription> {
}
type UpdateVariableAttributes<T extends {
    type: UpdateVariable["type"];
}> = Omit<Extract<UpdateVariable, {
    type: T["type"];
}>, "type">;
declare abstract class VariableBase {
    #private;
    abstract readonly type: UpdateVariable["type"];
    get nodeId(): string;
    get nodeType(): NodeType;
    get id(): string;
    get name(): string;
    get description(): string | null;
    constructor(engine: PluginEngine, data: VariableData);
    /**
     * Use to rename or change the description of this variable:
     *
     * ```ts
     * const updatedVariable = await variable.setAttributes({ name: "New Name" })
     * ```
     *
     * And to update other attributes too, but make sure to narrow using `instanceof` first, as to
     * avoid potential bugs:
     *
     * ```ts
     * if (variable instanceof FileVariable) await variable.setAttributes({ allowedFileTypes: ["txt", "md"] })
     * ```
     *
     * Returns the updated variable on success, and `null` in the unlikely event of it being removed
     * between getting it and calling this method.
     *
     * Use `"Variable.setAttributes"` to check if this method is allowed.
     */
    setAttributes(attributes: UpdateVariableAttributes<typeof this>): Promise<typeof this | null>;
    /**
     * Remove this variable.
     *
     * Use `"Variable.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
}
declare const booleanVariableClass = "BooleanVariable";
declare const booleanVariableType: "boolean";
interface WithBooleanVariableClass {
    [classKey]: typeof booleanVariableClass;
}
interface WithBooleanVariableType {
    type: typeof booleanVariableType;
}
interface WithBooleanDefaultValue {
    defaultValue: boolean;
}
interface BooleanVariableData extends WithBooleanVariableClass, BaseVariableData, WithBooleanDefaultValue {
}
interface CreateBooleanVariable extends WithBooleanVariableType, CreateVariableBase, Partial<WithBooleanDefaultValue> {
}
interface UpdateBooleanVariable extends WithBooleanVariableType, UpdateVariableBase, Partial<WithBooleanDefaultValue> {
}
declare class BooleanVariable extends VariableBase {
    #private;
    readonly type: "boolean";
    constructor(engine: PluginEngine, data: BooleanVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: BooleanVariableData): BooleanVariable;
    [$framerInternal.marshal](): BooleanVariableData;
}
declare const numberVariableClass = "NumberVariable";
declare const numberVariableType: "number";
interface WithNumberVariableClass {
    [classKey]: typeof numberVariableClass;
}
interface WithNumberVariableType {
    type: typeof numberVariableType;
}
interface WithNumberDefaultValue {
    defaultValue: number;
}
interface NumberVariableData extends WithNumberVariableClass, BaseVariableData, WithNumberDefaultValue {
}
interface CreateNumberVariable extends WithNumberVariableType, CreateVariableBase, Partial<WithNumberDefaultValue> {
}
interface UpdateNumberVariable extends WithNumberVariableType, UpdateVariableBase, Partial<WithNumberDefaultValue> {
}
declare class NumberVariable extends VariableBase {
    #private;
    readonly type: "number";
    constructor(engine: PluginEngine, data: NumberVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: NumberVariableData): NumberVariable;
    [$framerInternal.marshal](): NumberVariableData;
}
declare const stringVariableClass = "StringVariable";
declare const stringVariableType: "string";
interface WithStringVariableClass {
    [classKey]: typeof stringVariableClass;
}
interface WithStringVariableType {
    type: typeof stringVariableType;
}
interface WithStringDefaultValue {
    defaultValue: string;
}
interface StringVariableData extends WithStringVariableClass, BaseVariableData, WithStringDefaultValue {
}
interface CreateStringVariable extends WithStringVariableType, CreateVariableBase, Partial<WithStringDefaultValue> {
}
interface UpdateStringVariable extends WithStringVariableType, UpdateVariableBase, Partial<WithStringDefaultValue> {
}
declare class StringVariable extends VariableBase {
    #private;
    readonly type: "string";
    constructor(engine: PluginEngine, data: StringVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: StringVariableData): StringVariable;
    [$framerInternal.marshal](): StringVariableData;
}
declare const formattedTextVariableClass = "FormattedTextVariable";
declare const formattedTextVariableType: "formattedText";
interface WithFormattedTextVariableClass {
    [classKey]: typeof formattedTextVariableClass;
}
interface WithFormattedTextVariableType {
    type: typeof formattedTextVariableType;
}
interface FormattedTextVariableData extends WithFormattedTextVariableClass, BaseVariableData, WithStringDefaultValue {
}
interface CreateFormattedTextVariable extends WithFormattedTextVariableType, CreateVariableBase, Partial<WithStringDefaultValue> {
}
interface UpdateFormattedTextVariable extends WithFormattedTextVariableType, UpdateVariableBase, Partial<WithStringDefaultValue> {
}
declare class FormattedTextVariable extends VariableBase {
    #private;
    readonly type: "formattedText";
    constructor(engine: PluginEngine, data: FormattedTextVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: FormattedTextVariableData): FormattedTextVariable;
    [$framerInternal.marshal](): FormattedTextVariableData;
}
declare const enumVariableClass = "EnumVariable";
declare const enumVariableType: "enum";
interface EnumCaseData extends WithId, WithName, WithNameByLocale {
}
interface UpdateEnumCase extends Partial<WithName>, Partial<WithNameByLocaleUpdate> {
}
declare class EnumCase {
    #private;
    get id(): string;
    get name(): string;
    get nameByLocale(): InlineLocalizationValueByLocale;
    constructor(engine: PluginEngine, nodeId: string, variableId: string, enumCaseData: EnumCaseData);
    /**
     * Update a mutable enum case property, for example the name.
     *
     * Use `"EnumCase.setAttributes"` to check if this method is allowed.
     */
    setAttributes(attributes: UpdateEnumCase): Promise<EnumCase | null>;
    /**
     * Remove the enum case.
     *
     * Use `"EnumCase.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
}
interface WithEnumVariableClass {
    [classKey]: typeof enumVariableClass;
}
interface WithEnumVariableType {
    type: typeof enumVariableType;
}
interface EnumVariableData extends WithEnumVariableClass, BaseVariableData, ExplicitPartial<WithStringDefaultValue> {
    cases: EnumCaseData[];
}
interface CreateEnumCase extends WithName, Partial<WithNameByLocaleUpdate> {
}
interface CreateEnumVariable extends WithEnumVariableType, CreateVariableBase {
    defaultCaseIndex?: number | undefined;
    cases: CreateEnumCase[];
}
interface UpdateEnumVariable extends WithEnumVariableType, UpdateVariableBase, Partial<WithStringDefaultValue> {
}
declare class EnumVariable extends VariableBase {
    #private;
    readonly type: "enum";
    get cases(): readonly EnumCase[];
    constructor(engine: PluginEngine, data: EnumVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: EnumVariableData): EnumVariable;
    [$framerInternal.marshal](): EnumVariableData;
    /**
     * Add a new enum case.
     *
     * Use `"EnumVariable.addCase"` to check if this method is allowed.
     */
    addCase(attributes: CreateEnumCase): Promise<EnumCase | null>;
    /**
     * Arrange enum cases in a specific order.
     *
     * Use `"EnumVariable.setCaseOrder"` to check if this method is allowed.
     */
    setCaseOrder(caseIds: string[]): Promise<void>;
}
declare const colorVariableClass = "ColorVariable";
declare const colorVariableType: "color";
interface WithColorVariableClass {
    [classKey]: typeof colorVariableClass;
}
interface WithColorVariableType {
    type: typeof colorVariableType;
}
interface WithColorDefaultValueData {
    defaultValue: string | ColorStyleData;
}
interface ColorVariableData extends WithColorVariableClass, BaseVariableData, WithColorDefaultValueData {
}
interface WithColorDefaultValue {
    defaultValue: string | ColorStyle;
}
interface CreateColorVariable extends WithColorVariableType, CreateVariableBase, Partial<WithColorDefaultValue> {
}
interface UpdateColorVariable extends WithColorVariableType, UpdateVariableBase, Partial<WithColorDefaultValue> {
}
declare class ColorVariable extends VariableBase {
    #private;
    readonly type: "color";
    constructor(engine: PluginEngine, data: ColorVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: ColorVariableData): ColorVariable;
    [$framerInternal.marshal](): ColorVariableData;
}
declare const imageVariableClass = "ImageVariable";
declare const imageVariableType: "image";
interface WithImageVariableClass {
    [classKey]: typeof imageVariableClass;
}
interface WithImageVariableType {
    type: typeof imageVariableType;
}
interface WithImageDefaultValueData {
    defaultValue: ImageAssetData;
}
interface ImageVariableData extends WithImageVariableClass, BaseVariableData, ExplicitPartial<WithImageDefaultValueData> {
}
interface WithImageDefaultValue {
    defaultValue: ImageAsset;
}
interface CreateImageVariable extends WithImageVariableType, CreateVariableBase, Partial<WithImageDefaultValue> {
}
interface UpdateImageVariable extends WithImageVariableType, UpdateVariableBase, Partial<WithImageDefaultValue> {
}
declare class ImageVariable extends VariableBase {
    #private;
    readonly type: "image";
    constructor(engine: PluginEngine, data: ImageVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: ImageVariableData): ImageVariable;
    [$framerInternal.marshal](): ImageVariableData;
}
declare const fileVariableClass = "FileVariable";
declare const fileVariableType: "file";
interface WithFileVariableClass {
    [classKey]: typeof fileVariableClass;
}
interface WithFileVariableType {
    type: typeof fileVariableType;
}
interface WithFileDefaultValueData {
    defaultValue: FileAssetData;
}
interface WithAllowedFileTypes {
    /**
     * Supported types are:
     * 1. Valid media types (`"image/png"`, `"audio/*"`, `"✱/✱"`)
     * 2. File extensions with a leading dot (`".png"`)
     * 3. `"*"` (`.*` as a pseudo file extension was confirmed to allow everything in file pickers of all three major browser engines)
     * 4. File extensions WITHOUT a leading dot (`"png"`) – unlike in browser APIs – for backward compatibility and in case something doesn't parse as a media type
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
     */
    allowedFileTypes: string[];
}
interface FileVariableData extends WithFileVariableClass, BaseVariableData, ExplicitPartial<WithFileDefaultValueData>, WithAllowedFileTypes {
}
interface WithFileDefaultValue {
    defaultValue: FileAsset;
}
interface CreateFileVariable extends WithFileVariableType, CreateVariableBase, Partial<WithFileDefaultValue>, WithAllowedFileTypes {
}
interface UpdateFileVariable extends WithFileVariableType, UpdateVariableBase, Partial<WithFileDefaultValue>, Partial<WithAllowedFileTypes> {
}
declare class FileVariable extends VariableBase {
    #private;
    readonly type: "file";
    get allowedFileTypes(): readonly string[];
    constructor(engine: PluginEngine, data: FileVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: FileVariableData): FileVariable;
    [$framerInternal.marshal](): FileVariableData;
}
declare const linkVariableClass = "LinkVariable";
declare const linkVariableType: "link";
interface WithLinkVariableClass {
    [classKey]: typeof linkVariableClass;
}
interface WithLinkVariableType {
    type: typeof linkVariableType;
}
interface LinkVariableData extends WithLinkVariableClass, BaseVariableData {
}
interface CreateLinkVariable extends WithLinkVariableType, CreateVariableBase {
}
interface UpdateLinkVariable extends WithLinkVariableType, UpdateVariableBase {
}
declare class LinkVariable extends VariableBase {
    #private;
    readonly type: "link";
    constructor(engine: PluginEngine, data: LinkVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: LinkVariableData): LinkVariable;
    [$framerInternal.marshal](): LinkVariableData;
}
declare const dateVariableClass = "DateVariable";
declare const dateVariableType: "date";
interface WithDateVariableClass {
    [classKey]: typeof dateVariableClass;
}
interface WithDateVariableType {
    type: typeof dateVariableType;
}
interface WithDisplayTime {
    displayTime?: boolean;
}
interface DateVariableData extends WithDateVariableClass, BaseVariableData, ExplicitPartial<WithStringDefaultValue>, WithDisplayTime {
}
interface CreateDateVariable extends WithDateVariableType, CreateVariableBase, Partial<WithStringDefaultValue>, Partial<WithDisplayTime> {
}
interface UpdateDateVariable extends WithDateVariableType, UpdateVariableBase, Partial<WithStringDefaultValue>, Partial<WithDisplayTime> {
}
declare class DateVariable extends VariableBase {
    #private;
    readonly type: "date";
    get displayTime(): boolean | undefined;
    constructor(engine: PluginEngine, data: DateVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: DateVariableData): DateVariable;
    [$framerInternal.marshal](): DateVariableData;
}
declare const borderVariableClass = "BorderVariable";
declare const borderVariableType: "border";
interface WithBorderVariableClass {
    [classKey]: typeof borderVariableClass;
}
interface WithBorderVariableType {
    type: typeof borderVariableType;
}
interface WithBorderDefaultValueData {
    defaultValue: Marshaled<Border>;
}
interface BorderVariableData extends WithBorderVariableClass, BaseVariableData, ExplicitPartial<WithBorderDefaultValueData> {
}
interface WithBorderDefaultValue {
    defaultValue: Border;
}
interface CreateBorderVariable extends WithBorderVariableType, CreateVariableBase, Partial<WithBorderDefaultValue> {
}
interface UpdateBorderVariable extends WithBorderVariableType, UpdateVariableBase, Partial<WithBorderDefaultValue> {
}
declare class BorderVariable extends VariableBase {
    #private;
    readonly type: "border";
    constructor(engine: PluginEngine, data: BorderVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: BorderVariableData): BorderVariable;
    [$framerInternal.marshal](): BorderVariableData;
}
declare const unsupportedVariableClass = "UnsupportedVariable";
declare const unsupportedVariableType: "unsupported";
interface WithUnsupportedVariableClass {
    [classKey]: typeof unsupportedVariableClass;
}
interface WithUnsupportedVariableType {
    type: typeof unsupportedVariableType;
}
interface UnsupportedVariableData extends WithUnsupportedVariableClass, BaseVariableData {
}
interface UpdateUnsupportedVariable extends WithUnsupportedVariableType, UpdateVariableBase {
}
declare class UnsupportedVariable extends VariableBase {
    #private;
    readonly type: "unsupported";
    constructor(engine: PluginEngine, data: UnsupportedVariableData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: UnsupportedVariableData): UnsupportedVariable;
    [$framerInternal.marshal](): UnsupportedVariableData;
}
type VariableData = BooleanVariableData | NumberVariableData | StringVariableData | FormattedTextVariableData | EnumVariableData | ColorVariableData | ImageVariableData | FileVariableData | LinkVariableData | DateVariableData | BorderVariableData | UnsupportedVariableData;
type CreateVariable = CreateBooleanVariable | CreateNumberVariable | CreateStringVariable | CreateFormattedTextVariable | CreateEnumVariable | CreateColorVariable | CreateImageVariable | CreateFileVariable | CreateLinkVariable | CreateDateVariable | CreateBorderVariable;
type UpdateVariable = UpdateBooleanVariable | UpdateNumberVariable | UpdateStringVariable | UpdateFormattedTextVariable | UpdateEnumVariable | UpdateColorVariable | UpdateImageVariable | UpdateFileVariable | UpdateLinkVariable | UpdateDateVariable | UpdateBorderVariable | UpdateUnsupportedVariable;
type ComponentVariable = BooleanVariable | NumberVariable | StringVariable | FormattedTextVariable | EnumVariable | ColorVariable | ImageVariable | FileVariable | LinkVariable | DateVariable | BorderVariable | UnsupportedVariable;
type Variable = ComponentVariable;
declare function isVariable(value: unknown): value is Variable;
declare function isComponentVariable(value: unknown): value is ComponentVariable;

/**
 * The type of the `attributes` parameter of `Field.setAttributes`:
 *
 * ```ts
 * const fileFieldAttributes: UpdateFieldAttributes<FileField> = {}
 * fileFieldAttributes.allowedFileTypes = []
 * fileField.setAttributes(fileFieldAttributes)
 * ```
 *
 * Can also use `typeof`:
 *
 * ```ts
 * const fileFieldAttributes: UpdateFieldAttributes<typeof fileField> = {}
 * ```
 */
type UpdateFieldAttributes<T extends {
    type: UpdateField["type"];
}> = Omit<Extract<UpdateField, {
    type: T["type"];
}>, // This is NOT the same as Extract<UpdateField, T>
// This is NOT the same as Extract<UpdateField, T>
"id" | "type">;
declare abstract class FieldBase {
    #private;
    abstract readonly type: FieldDefinitionData["type"];
    get id(): string;
    get name(): string;
    constructor(engine: PluginEngine, collectionId: string, data: FieldDefinitionBase);
    /**
     * Use to rename any field:
     *
     * ```ts
     * const updatedField = await field.setAttributes({ name: "New Name" })
     * ```
     *
     * And to set other attributes too, but make sure to narrow based on field's `type` first, as to
     * avoid potential bugs:
     *
     * ```ts
     * if (field.type === "file") await field.setAttributes({ allowedFileTypes: ["txt", "md"] })
     * ```
     *
     * Returns the updated field on success, and `null` in the unlikely event of it being removed
     * between getting it and calling this method.
     *
     * Use `"Field.setAttributes"` to check if this method is allowed.
     */
    setAttributes(attributes: UpdateFieldAttributes<typeof this>): Promise<typeof this | null>;
    /**
     * Remove this field.
     *
     * Use `"Field.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
}
declare abstract class FieldBaseWithRequired extends FieldBase implements WithFieldRequired {
    #private;
    get required(): boolean;
    constructor(engine: PluginEngine, collectionId: string, data: FieldDefinitionBase & WithFieldRequired);
}
declare class BooleanField extends FieldBase {
    readonly type = "boolean";
}
declare class ColorField extends FieldBase {
    readonly type = "color";
}
declare class NumberField extends FieldBase {
    readonly type = "number";
}
declare class StringField extends FieldBaseWithRequired implements WithFieldBasedOn {
    #private;
    readonly type = "string";
    constructor(engine: PluginEngine, collectionId: string, data: StringFieldDefinitionData);
    get basedOn(): string | null;
}
declare class FormattedTextField extends FieldBaseWithRequired {
    readonly type = "formattedText";
}
declare class ImageField extends FieldBaseWithRequired {
    readonly type = "image";
}
declare class LinkField extends FieldBaseWithRequired {
    readonly type = "link";
}
declare class DateField extends FieldBaseWithRequired {
    #private;
    readonly type = "date";
    get displayTime(): boolean | undefined;
    constructor(engine: PluginEngine, collectionId: string, data: DateFieldDefinitionData);
}
declare class FieldDivider extends FieldBase {
    readonly type = "divider";
}
declare class UnsupportedField extends FieldBase {
    readonly type = "unsupported";
}
declare class FileField extends FieldBaseWithRequired implements WithAllowedFileTypes {
    #private;
    readonly type = "file";
    /** @inheritdoc */
    get allowedFileTypes(): string[];
    constructor(engine: PluginEngine, collectionId: string, data: FileFieldDefinitionData);
}
declare class EnumField extends FieldBase {
    #private;
    readonly type = "enum";
    get cases(): readonly EnumCase[];
    constructor(engine: PluginEngine, collectionId: string, data: EnumFieldDefinitionData);
    /**
     * Add a new enum case.
     *
     * Use `"EnumField.addCase"` to check if this method is allowed.
     */
    addCase(attributes: CreateEnumCase): Promise<EnumCase | null>;
    /**
     * Arrange enum cases in a specific order.
     *
     * Use `"EnumField.setCaseOrder"` to check if this method is allowed.
     */
    setCaseOrder(caseIds: string[]): Promise<void>;
}
declare class CollectionReferenceField extends FieldBaseWithRequired implements WithFieldCollectionId {
    #private;
    readonly type = "collectionReference";
    get collectionId(): string;
    constructor(engine: PluginEngine, collectionId: string, data: CollectionReferenceFieldDefinitionData);
}
declare class MultiCollectionReferenceField extends FieldBaseWithRequired implements WithFieldCollectionId {
    #private;
    readonly type = "multiCollectionReference";
    get collectionId(): string;
    constructor(engine: PluginEngine, collectionId: string, data: MultiCollectionReferenceFieldDefinitionData);
}
type ArrayItemField = ImageField;
declare class ArrayField extends FieldBaseWithRequired {
    readonly type = "array";
    readonly fields: readonly [ArrayItemField];
    constructor(engine: PluginEngine, collectionId: string, data: ArrayFieldDefinitionData);
}
type Field = BooleanField | ColorField | NumberField | StringField | FormattedTextField | ImageField | LinkField | DateField | FieldDivider | UnsupportedField | FileField | EnumField | CollectionReferenceField | MultiCollectionReferenceField | ArrayField;
declare function isField(value: unknown): value is FieldBase;

type ManagedCollectionManagedBy = "thisPlugin" | "anotherPlugin";
type CollectionManagedBy = "user" | ManagedCollectionManagedBy;
/** Controls how formatted text content is processed */
type ContentType = "auto" | "markdown" | "html";
interface CollectionData {
    id: string;
    name: string;
    slugFieldName: string | null;
    slugFieldBasedOn: string | null;
    /** @deprecated Use `managedBy` instead. */
    readonly: boolean;
    managedBy: CollectionManagedBy;
}
interface BooleanFieldDataEntry {
    type: BooleanFieldType;
    value: boolean;
}
type BooleanFieldDataEntryInput = BooleanFieldDataEntry;
interface ColorFieldDataEntryInput {
    type: ColorFieldType;
    value: string | ColorStyleData | null;
}
interface ColorFieldDataEntrySerializable {
    type: ColorFieldType;
    value: string | ColorStyleData;
}
interface ColorFieldDataEntry {
    type: ColorFieldType;
    value: string | ColorStyle;
}
interface DateFieldDataEntryInput {
    type: DateFieldType;
    value: string | number | null;
}
interface DateFieldDataEntry {
    type: DateFieldType;
    value: string | undefined;
}
interface EnumFieldDataEntryInput {
    type: EnumFieldType;
    value: string;
}
interface EnumFieldDataEntry {
    type: EnumFieldType;
    value: string;
}
interface FileFieldDataEntryInput {
    type: FileFieldType;
    value: string | null;
}
interface FileFieldDataEntrySerializable {
    type: FileFieldType;
    value: FileAssetData | undefined;
}
interface FileFieldDataEntry {
    type: FileFieldType;
    value: FileAsset | undefined;
}
interface LinkFieldDataEntryInput {
    type: LinkFieldType;
    value: string | null;
    valueByLocale?: LocalizationSourceUpdate;
}
interface LinkFieldDataEntry {
    type: LinkFieldType;
    value: string | undefined;
    valueByLocale: InlineLocalizationValueByLocale;
}
interface NumberFieldDataEntry {
    type: NumberFieldType;
    value: number;
}
type NumberFieldDataEntryInput = NumberFieldDataEntry;
interface FormattedTextFieldDataEntry {
    type: FormattedTextFieldType;
    value: string;
    valueByLocale: InlineLocalizationValueByLocale;
}
interface FormattedTextFieldDataEntryInput {
    type: FormattedTextFieldType;
    value: string;
    /** @default "html" */
    contentType?: ContentType;
    valueByLocale?: LocalizationSourceUpdate;
}
interface StringFieldDataEntry {
    type: StringFieldType;
    value: string;
    valueByLocale: InlineLocalizationValueByLocale;
}
interface StringFieldDataEntryInput {
    type: StringFieldType;
    value: string;
    valueByLocale?: LocalizationSourceUpdate;
}
interface ImageFieldDataEntryInput {
    type: ImageFieldType;
    value: string | null;
    alt?: string;
    altByLocale?: LocalizationSourceUpdate;
}
interface ImageFieldDataEntrySerializable {
    type: ImageFieldType;
    value: ImageAssetData | undefined;
}
interface ImageFieldDataEntry {
    type: ImageFieldType;
    value: ImageAsset | undefined;
}
interface ArrayItemSerializableData {
    /** Unique ID. */
    id: string;
    /** Data for the fields. */
    fieldData: FieldSerializableData;
}
type ArrayItemFieldDataEntry = ImageFieldDataEntry;
type ArrayItemFieldData = Record<string, ArrayItemFieldDataEntry>;
interface ArrayItemData {
    /** Unique ID. */
    id: string;
    /** Data for the fields. */
    fieldData: ArrayItemFieldData;
}
type ArrayItemFieldDataEntryInput = ImageFieldDataEntryInput;
type ArrayItemFieldDataInput = Record<string, ArrayItemFieldDataEntryInput>;
interface CreateArrayItem {
    /** Data for the fields. */
    fieldData: ArrayItemFieldDataInput | undefined;
}
interface EditableArrayItemAttributes {
    /** Data for the fields. */
    fieldData?: ArrayItemFieldDataInput | undefined;
}
interface UpdateArrayItem extends EditableArrayItemAttributes {
    /** The ID of an existing item if updating. Omit if adding. */
    id: string;
}
type ArrayItemInput = CreateArrayItem | UpdateArrayItem;
interface ArrayFieldDataEntryInput {
    type: ArrayFieldType;
    value: ArrayItemInput[];
}
interface ArrayFieldDataEntrySerializable {
    type: ArrayFieldType;
    value: ArrayItemSerializableData[];
}
interface ArrayItem {
    id: string;
    fieldData: Readonly<ArrayItemFieldData>;
}
interface ArrayFieldDataEntry {
    type: ArrayFieldType;
    value: ArrayItem[];
}
interface CollectionReferenceFieldDataEntryInput {
    type: CollectionReferenceFieldType;
    value: string | null;
}
interface CollectionReferenceFieldDataEntry {
    type: CollectionReferenceFieldType;
    value: string | undefined;
}
interface MultiCollectionReferenceFieldDataEntryInput {
    type: MultiCollectionReferenceFieldType;
    value: readonly string[] | null;
}
interface MultiCollectionReferenceFieldDataEntry {
    type: MultiCollectionReferenceFieldType;
    value: readonly string[];
}
type FieldDataEntry = BooleanFieldDataEntry | ColorFieldDataEntry | DateFieldDataEntry | EnumFieldDataEntry | FileFieldDataEntry | LinkFieldDataEntry | NumberFieldDataEntry | FormattedTextFieldDataEntry | StringFieldDataEntry | ImageFieldDataEntry | CollectionReferenceFieldDataEntry | MultiCollectionReferenceFieldDataEntry | ArrayFieldDataEntry;
type FieldDataEntrySerializable = Exclude<FieldDataEntry, ImageFieldDataEntry | FileFieldDataEntry | ColorFieldDataEntry | ArrayFieldDataEntry> | ImageFieldDataEntrySerializable | FileFieldDataEntrySerializable | ColorFieldDataEntrySerializable | ArrayFieldDataEntrySerializable;
type FieldDataEntryInput = BooleanFieldDataEntryInput | ColorFieldDataEntryInput | DateFieldDataEntryInput | EnumFieldDataEntryInput | FileFieldDataEntryInput | LinkFieldDataEntryInput | NumberFieldDataEntryInput | FormattedTextFieldDataEntryInput | StringFieldDataEntryInput | ImageFieldDataEntryInput | CollectionReferenceFieldDataEntryInput | MultiCollectionReferenceFieldDataEntryInput | ArrayFieldDataEntryInput;
type ApiV2FieldData = Record<string, unknown>;
type FieldData = Record<string, FieldDataEntry>;
type FieldSerializableData = Record<string, FieldDataEntrySerializable>;
type FieldDataInput = Record<string, FieldDataEntryInput>;
interface BaseCollectionItemData {
    /** Drafts are excluded from publishing. */
    draft?: boolean | undefined;
}
interface ApiV2CollectionItemData extends BaseCollectionItemData {
    /** Unique ID. */
    id: string;
    /** Unique slug. */
    slug: string;
    /** Data for the fields. */
    fieldData: ApiV2FieldData;
}
interface CollectionItemSerializableData extends BaseCollectionItemData {
    /** @deprecated use `externalId ?? nodeId` to emulate the old behaviour, or use `nodeId` or `externalId` directly */
    id: string;
    /** Node ID. This is a unique ID for the node that can be used to navigate to the node */
    nodeId: string;
    /** External ID. This is the ID of the node in the external system */
    externalId: string | undefined;
    /** Unique slug. */
    slug: string;
    /** Slug by locale. */
    slugByLocale: InlineLocalizationValueByLocale;
    /** Data for the fields. */
    fieldData: FieldSerializableData;
}
interface CollectionItemData extends BaseCollectionItemData {
    /** Unique ID. */
    id: string;
    /** Unique slug. */
    slug: string;
    /** Slug by locale. */
    slugByLocale: InlineLocalizationValueByLocale;
    /** Data for the fields. */
    fieldData: FieldData;
}
interface ApiV2ManagedCollectionItemInput extends BaseCollectionItemData {
    /** Required unique ID of your choice. Using an ID instead of the slug helps avoid data loss. */
    id: string;
    /** Unique on collection level. */
    slug: string;
    /** Data for the fields. */
    fieldData: ApiV2FieldData;
}
interface ManagedCollectionItemInput extends BaseCollectionItemData {
    /** Required unique ID of your choice. Using an ID instead of the slug helps avoid data loss. */
    id: string;
    /** Unique on collection level. */
    slug: string;
    /** Localized values for the slug */
    slugByLocale?: LocalizationSourceUpdate;
    /** Data for the fields. */
    fieldData: FieldDataInput;
    /** Status of each locale for the resulting localization  group */
    statusByLocale?: LocalizationGroupStatusByLocale;
}
interface ApiV2CreateCollectionItem extends BaseCollectionItemData {
    /** The ID of an existing item if updating. Omit if adding. */
    id?: undefined;
    /** Unique on collection level. Required if adding, optional if updating. */
    slug: string;
    /** Data for the fields. */
    fieldData?: ApiV2FieldData | undefined;
}
interface CreateCollectionItem extends BaseCollectionItemData {
    /** The ID of an existing item if updating. Omit if adding. */
    id?: undefined;
    /** Unique on collection level. Required if adding, optional if updating. */
    slug: string;
    /** Localized values for the slug */
    slugByLocale?: LocalizationSourceUpdate;
    /** Data for the fields. */
    fieldData?: FieldDataInput | undefined;
    /** Status of each locale for the resulting localization  group */
    statusByLocale?: LocalizationGroupStatusByLocale;
}
interface ApiV2EditableCollectionItemAttributes extends BaseCollectionItemData {
    /** Unique on collection level. Required if adding, optional if updating. */
    slug?: string | undefined;
    /** Data for the fields. */
    fieldData?: ApiV2FieldData | undefined;
}
interface EditableCollectionItemAttributes extends BaseCollectionItemData {
    /** Unique on collection level. Required if adding, optional if updating. */
    slug?: string | undefined;
    /** Localized values for the slug */
    slugByLocale?: LocalizationSourceUpdate;
    /** Data for the fields. */
    fieldData?: FieldDataInput | undefined;
    /** Status of each locale for the resulting localization  group */
    statusByLocale?: Record<LocaleId, LocalizationGroupStatus>;
}
interface ApiV2EditableCollectionItemAttributesWithId extends ApiV2EditableCollectionItemAttributes {
    /** The ID of an existing item if updating. Omit if adding. */
    id: NodeId;
}
interface EditableCollectionItemAttributesWithId extends EditableCollectionItemAttributes {
    /** The ID of an existing item if updating. Omit if adding. */
    id: NodeId;
}
type ApiV2CollectionItemInput = ApiV2CreateCollectionItem | ApiV2EditableCollectionItemAttributesWithId;
type CollectionItemInput = CreateCollectionItem | EditableCollectionItemAttributesWithId;
interface WithFieldId {
    /** Required unique ID. Use a unique identifier to prevent data loss when the field is renamed. */
    id: string;
}
interface WithFieldName {
    /** The name of the field as displayed in the UI. */
    name: string;
}
interface WithFieldBasedOn {
    /**
     * The ID of the field on which this field is based.
     *
     * When set, this field will use the referenced field's value as a fallback
     * when no value is provided.
     */
    basedOn: string | null;
}
interface WithFieldRequired {
    required: boolean;
}
type WithOptionalFieldRequired = Partial<WithFieldRequired>;
interface FieldDefinitionBase extends WithFieldId, WithFieldName {
}
type CreateFieldBase = WithFieldName;
interface UpdateFieldBase extends WithFieldId, Partial<WithFieldName> {
}
interface WithIdAndOptionalUserEditable extends WithFieldId, Partial<WithUserEditable> {
}
declare const booleanFieldType = "boolean";
type BooleanFieldType = typeof booleanFieldType;
interface BooleanFieldBase {
    type: BooleanFieldType;
}
interface BooleanFieldDefinitionData extends BooleanFieldBase, FieldDefinitionBase {
}
interface CreateBooleanField extends BooleanFieldBase, CreateFieldBase {
}
interface UpdateBooleanField extends BooleanFieldBase, UpdateFieldBase {
}
interface ManagedBooleanFieldInput extends CreateBooleanField, WithIdAndOptionalUserEditable {
}
declare const colorFieldType = "color";
type ColorFieldType = typeof colorFieldType;
interface ColorFieldBase {
    type: ColorFieldType;
}
interface ColorFieldDefinitionData extends ColorFieldBase, FieldDefinitionBase {
}
interface CreateColorField extends ColorFieldBase, CreateFieldBase {
}
interface UpdateColorField extends ColorFieldBase, UpdateFieldBase {
}
interface ManagedColorFieldInput extends CreateColorField, WithIdAndOptionalUserEditable {
}
declare const numberFieldType = "number";
type NumberFieldType = typeof numberFieldType;
interface NumberFieldBase {
    type: NumberFieldType;
}
interface NumberFieldDefinitionData extends NumberFieldBase, FieldDefinitionBase {
}
interface CreateNumberField extends NumberFieldBase, CreateFieldBase {
}
interface UpdateNumberField extends NumberFieldBase, UpdateFieldBase {
}
interface ManagedNumberFieldInput extends CreateNumberField, WithIdAndOptionalUserEditable {
}
declare const stringFieldType = "string";
type StringFieldType = typeof stringFieldType;
interface StringFieldBase {
    type: StringFieldType;
}
interface StringFieldDefinitionData extends StringFieldBase, WithFieldRequired, WithFieldBasedOn, FieldDefinitionBase {
}
interface CreateStringField extends StringFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface UpdateStringField extends StringFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedStringFieldInput extends CreateStringField, WithIdAndOptionalUserEditable {
}
declare const formattedTextFieldType = "formattedText";
type FormattedTextFieldType = typeof formattedTextFieldType;
interface FormattedTextFieldBase {
    type: FormattedTextFieldType;
    /** Controls how formatted text content is processed: "auto" (detect), "markdown", or "html" */
    contentType?: ContentType;
}
interface FormattedTextFieldDefinitionData extends FormattedTextFieldBase, WithFieldRequired, FieldDefinitionBase {
}
interface CreateFormattedTextField extends FormattedTextFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface UpdateFormattedTextField extends FormattedTextFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface FormattedTextFieldInput extends CreateFormattedTextField, WithIdAndOptionalUserEditable {
}
declare const imageFieldType = "image";
type ImageFieldType = typeof imageFieldType;
interface ImageFieldBase {
    type: ImageFieldType;
}
interface ImageFieldDefinitionData extends ImageFieldBase, WithFieldRequired, FieldDefinitionBase {
}
interface CreateImageField extends ImageFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface UpdateImageField extends ImageFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedImageFieldInput extends CreateImageField, WithIdAndOptionalUserEditable {
}
type ArrayItemFieldBase = ImageFieldBase;
interface ArrayItemFieldDefinitionData extends ArrayItemFieldBase, WithFieldRequired, FieldDefinitionBase {
}
interface CreateArrayItemField extends ArrayItemFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface ManagedArrayItemFieldInput extends CreateArrayItemField, WithIdAndOptionalUserEditable {
}
declare const arrayFieldType = "array";
type ArrayFieldType = typeof arrayFieldType;
interface ArrayFieldBase {
    type: ArrayFieldType;
}
interface ArrayFieldDefinitionData extends ArrayFieldBase, WithFieldRequired, FieldDefinitionBase {
    fields: [ArrayItemFieldDefinitionData];
}
interface CreateArrayField extends ArrayFieldBase, CreateFieldBase, WithOptionalFieldRequired {
    fields: [CreateArrayItemField];
}
interface UpdateArrayField extends ArrayFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
    fields?: [CreateArrayItemField];
}
interface ManagedArrayFieldInput extends CreateArrayField, WithIdAndOptionalUserEditable {
    fields: [ManagedArrayItemFieldInput];
}
declare const linkFieldType = "link";
type LinkFieldType = typeof linkFieldType;
interface LinkFieldBase {
    type: LinkFieldType;
}
interface LinkFieldDefinitionData extends LinkFieldBase, WithFieldRequired, FieldDefinitionBase {
}
interface CreateLinkField extends LinkFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface UpdateLinkField extends LinkFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedLinkFieldInput extends CreateLinkField, WithIdAndOptionalUserEditable {
}
declare const dateFieldType = "date";
type DateFieldType = typeof dateFieldType;
interface DateFieldBase {
    type: DateFieldType;
    displayTime?: boolean;
}
interface DateFieldDefinitionData extends DateFieldBase, WithFieldRequired, FieldDefinitionBase {
}
interface CreateDateField extends DateFieldBase, CreateFieldBase, WithOptionalFieldRequired {
}
interface UpdateDateField extends DateFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedDateFieldInput extends CreateDateField, WithIdAndOptionalUserEditable {
}
declare const fileFieldType = "file";
type FileFieldType = typeof fileFieldType;
interface FileFieldBase {
    type: FileFieldType;
}
interface FileFieldDefinitionData extends FileFieldBase, FieldDefinitionBase, WithAllowedFileTypes, WithFieldRequired {
}
interface CreateFileField extends FileFieldBase, CreateFieldBase, WithAllowedFileTypes, WithOptionalFieldRequired {
}
interface UpdateFileField extends FileFieldBase, UpdateFieldBase, Partial<WithAllowedFileTypes>, WithOptionalFieldRequired {
}
interface ManagedFileFieldInput extends CreateFileField, WithIdAndOptionalUserEditable {
}
declare const enumFieldType = "enum";
type EnumFieldType = typeof enumFieldType;
interface EnumFieldBase {
    type: EnumFieldType;
}
interface WithEnumCaseId {
    id: string;
}
interface WithEnumCaseNameInput {
    name: string;
    nameByLocale?: LocalizationSourceUpdate;
}
interface WithEnumCaseNameInputForUpdate {
    name: string;
    nameByLocale?: Record<LocaleId, LocalizedValueUpdate | LocalizationValue>;
}
interface EnumCaseDataInput extends WithEnumCaseId, WithEnumCaseNameInput {
}
interface EnumCaseDataInputForUpdate extends WithEnumCaseId, WithEnumCaseNameInputForUpdate {
}
interface EnumFieldDefinitionData extends EnumFieldBase, FieldDefinitionBase {
    cases: EnumCaseData[];
}
interface CreateEnumField extends EnumFieldBase, CreateFieldBase {
    cases: CreateEnumCase[];
}
interface UpdateEnumField extends EnumFieldBase, UpdateFieldBase {
}
interface ManagedEnumFieldInput extends EnumFieldBase, CreateFieldBase, WithIdAndOptionalUserEditable {
    cases: EnumCaseDataInput[];
}
interface ManagedEnumFieldInputForSetFields extends Omit<ManagedEnumFieldInput, "cases"> {
    cases: EnumCaseDataInputForUpdate[];
}
declare const collectionReferenceFieldType = "collectionReference";
type CollectionReferenceFieldType = typeof collectionReferenceFieldType;
interface CollectionReferenceFieldBase {
    type: CollectionReferenceFieldType;
}
interface WithFieldCollectionId {
    collectionId: string;
}
interface CollectionReferenceFieldDefinitionData extends CollectionReferenceFieldBase, FieldDefinitionBase, WithFieldCollectionId, WithFieldRequired {
}
interface CreateCollectionReferenceField extends CollectionReferenceFieldBase, CreateFieldBase, WithFieldCollectionId, WithOptionalFieldRequired {
}
interface UpdateCollectionReferenceField extends CollectionReferenceFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedCollectionReferenceFieldInput extends CreateCollectionReferenceField, WithIdAndOptionalUserEditable {
}
declare const multiCollectionReferenceFieldType = "multiCollectionReference";
type MultiCollectionReferenceFieldType = typeof multiCollectionReferenceFieldType;
interface MultiCollectionReferenceFieldBase {
    type: MultiCollectionReferenceFieldType;
}
interface MultiCollectionReferenceFieldDefinitionData extends MultiCollectionReferenceFieldBase, FieldDefinitionBase, WithFieldCollectionId, WithFieldRequired {
}
interface CreateMultiCollectionReferenceField extends MultiCollectionReferenceFieldBase, CreateFieldBase, WithFieldCollectionId, WithOptionalFieldRequired {
}
interface UpdateMultiCollectionReferenceField extends MultiCollectionReferenceFieldBase, UpdateFieldBase, WithOptionalFieldRequired {
}
interface ManagedMultiCollectionReferenceFieldInput extends CreateMultiCollectionReferenceField, WithIdAndOptionalUserEditable {
}
declare const fieldDividerType = "divider";
type FieldDividerType = typeof fieldDividerType;
interface FieldDividerBase {
    type: FieldDividerType;
}
interface FieldDividerDefinitionData extends FieldDividerBase, FieldDefinitionBase {
}
interface CreateFieldDivider extends FieldDividerBase, CreateFieldBase {
}
interface UpdateFieldDivider extends FieldDividerBase, UpdateFieldBase {
}
declare const unsupportedFieldType = "unsupported";
type UnsupportedFieldType = typeof unsupportedFieldType;
interface UnsupportedFieldBase {
    type: UnsupportedFieldType;
}
interface UnsupportedFieldDefinitionData extends UnsupportedFieldBase, FieldDefinitionBase {
}
interface UpdateUnsupportedField extends UnsupportedFieldBase, UpdateFieldBase {
}
/**
 * A collection field that Framer knows about and the plugin API fully supports.
 */
type SupportedFieldDefinitionData = BooleanFieldDefinitionData | ColorFieldDefinitionData | NumberFieldDefinitionData | StringFieldDefinitionData | FormattedTextFieldDefinitionData | ImageFieldDefinitionData | LinkFieldDefinitionData | DateFieldDefinitionData | FileFieldDefinitionData | EnumFieldDefinitionData | CollectionReferenceFieldDefinitionData | MultiCollectionReferenceFieldDefinitionData | ArrayFieldDefinitionData;
type ManagedCollectionFieldInputData = ManagedBooleanFieldInput | ManagedColorFieldInput | ManagedNumberFieldInput | ManagedStringFieldInput | FormattedTextFieldInput | ManagedImageFieldInput | ManagedLinkFieldInput | ManagedDateFieldInput | ManagedFileFieldInput | ManagedEnumFieldInput | ManagedCollectionReferenceFieldInput | ManagedMultiCollectionReferenceFieldInput | ManagedArrayFieldInput;
type ManagedCollectionFieldInput = Exclude<ManagedCollectionFieldInputData, ManagedEnumFieldInput> | ManagedEnumFieldInputForSetFields;
/**
 * Any kind of collection field definition. The field may be unsupported by the
 * plugin API.
 */
type FieldDefinitionData = SupportedFieldDefinitionData | FieldDividerDefinitionData | UnsupportedFieldDefinitionData;
type CreateField = CreateBooleanField | CreateColorField | CreateNumberField | CreateStringField | CreateFormattedTextField | CreateImageField | CreateLinkField | CreateDateField | CreateFileField | CreateEnumField | CreateCollectionReferenceField | CreateMultiCollectionReferenceField | CreateFieldDivider | CreateArrayField;
type UpdateField = UpdateBooleanField | UpdateColorField | UpdateNumberField | UpdateStringField | UpdateFormattedTextField | UpdateImageField | UpdateLinkField | UpdateDateField | UpdateFileField | UpdateEnumField | UpdateCollectionReferenceField | UpdateMultiCollectionReferenceField | UpdateFieldDivider | UpdateUnsupportedField | UpdateArrayField;
type FieldInput = Prettify<CreateField | UpdateField>;
interface WithUserEditable {
    /** Is the user able to edit the field within the UI. */
    userEditable: boolean;
}
/**
 * Any kind of collection field definition that was created by a plugin and is
 * supported by the API.
 */
type ManagedCollectionField = SupportedFieldDefinitionData & WithUserEditable;
/** @deprecated Use `ManagedCollectionFieldInput` instead. */
type EditableManagedCollectionField = ManagedCollectionFieldInputData;
declare class ManagedCollection implements Navigable {
    #private;
    readonly id: NodeId;
    readonly name: string;
    /**
     * @deprecated Use `managedBy` instead and the [Permissions
     * API](https://www.framer.com/developers/plugins-permissions) to check if users can edit the
     * collection.
     */
    readonly readonly: boolean;
    /**
     * Collections managed by other plugins should are read-only.
     */
    readonly managedBy: ManagedCollectionManagedBy;
    constructor(data: CollectionData, engine: PluginEngine);
    /**
     * Get item keys in their set order.
     */
    getItemIds(): Promise<string[]>;
    /**
     * Arrange items in a specific order.
     *
     * Use `"ManagedCollection.setItemOrder"` to check if this method is allowed.
     */
    setItemOrder(ids: string[]): Promise<void>;
    /**
     * Get all fields.
     */
    getFields(): Promise<ManagedCollectionField[]>;
    /**
     * Create, update or remove all fields in one go.
     *
     * Use `"ManagedCollection.setFields"` to check if this method is allowed.
     */
    setFields(fields: ManagedCollectionFieldInput[]): Promise<void>;
    /**
     * Add new items or update existing ones if their IDs match.
     *
     * Use `"ManagedCollection.addItems"` to check if this method is allowed.
     */
    addItems(items: ManagedCollectionItemInput[]): Promise<void>;
    /**
     * Remove items by their ID.
     *
     * Use `"ManagedCollection.removeItems"` to check if this method is allowed.
     */
    removeItems(itemIds: string[]): Promise<void>;
    /**
     * Make this the active collection.
     */
    setAsActive(): Promise<void>;
    /**
     * Set plugin data by key.
     *
     * Use `"ManagedCollection.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get plugin data by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Get all plugin data keys.
     */
    getPluginDataKeys(): Promise<string[]>;
    /**
     * Navigate to this collection. May switch modes to reveal the relevant view.
     */
    navigateTo(opts?: NavigableOptions): Promise<void>;
}
declare class Collection implements Navigable {
    #private;
    readonly id: NodeId;
    readonly name: string;
    readonly slugFieldName: string | null;
    readonly slugFieldBasedOn: string | null;
    /**
     * @deprecated Use `managedBy` instead and the [Permissions
     * API](https://www.framer.com/developers/plugins-permissions) to check if users can edit the
     * collection.
     */
    readonly readonly: boolean;
    /**
     * Collections managed by plugins are read-only. To be able to modify them use
     * `ManagedCollection` (which is only possible in `configureManagedCollection` or
     * `syncManagedCollection` modes).
     */
    readonly managedBy: CollectionManagedBy;
    constructor(data: CollectionData, engine: PluginEngine);
    /**
     * Arrange items in a specific order.
     *
     * Use `"Collection.setItemOrder"` to check if this method is allowed.
     */
    setItemOrder(ids: NodeId[]): Promise<void>;
    /**
     * Get all fields.
     */
    getFields(): Promise<Field[]>;
    /**
     * Create new fields. Use `Field.setAttributes` to update.
     *
     * Use `"Collection.addFields"` to check if this method is allowed.
     */
    addFields(fields: CreateField[]): Promise<Field[]>;
    /**
     * Remove fields by their ID.
     *
     * Use `"Collection.removeFields"` to check if this method is allowed.
     */
    removeFields(fieldIds: string[]): Promise<void>;
    /**
     * Arrange fields in a specific order.
     *
     * Use `"Collection.setFieldOrder"` to check if this method is allowed.
     */
    setFieldOrder(fieldIds: string[]): Promise<void>;
    /**
     * Get all items in their set order.
     */
    getItems(): Promise<CollectionItem[]>;
    /**
     * Add new items or update existing ones if their IDs are provided.
     *
     * This creates a new item with "foo" as its slug:
     *
     * ```ts
     * collection.addItems([{ slug: "foo" }])
     * ```
     *
     * This updates an existing item with ID "aBc123" to have "bar" as its slug:
     *
     * ```ts
     * collection.addItems([{ id: "aBc123", slug: "bar" }])
     * ```
     *
     * Use `"Collection.addItems"` to check if this method is allowed.
     */
    addItems(items: CollectionItemInput[]): Promise<void>;
    /**
     * Remove items by their ID.
     *
     * Use `"Collection.removeItems"` to check if this method is allowed.
     */
    removeItems(itemIds: NodeId[]): Promise<void>;
    /**
     * Make this the active collection.
     */
    setAsActive(): Promise<void>;
    /**
     * Set plugin data by key.
     *
     * Use `"Collection.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get plugin data by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Get all plugin data keys.
     */
    getPluginDataKeys(): Promise<string[]>;
    /**
     * Navigate to this collection. May switch modes to reveal the relevant view.
     */
    navigateTo(opts?: NavigableOptions): Promise<void>;
}
declare class CollectionItem implements Navigable {
    #private;
    readonly id: NodeId;
    /** External ID for managed collections, unique node ID otherwise. */
    readonly nodeId: NodeId;
    readonly slug: string;
    readonly slugByLocale: InlineLocalizationValueByLocale;
    readonly draft: boolean;
    readonly fieldData: Readonly<FieldData>;
    constructor(collectionItemData: CollectionItemSerializableData, engine: PluginEngine);
    /**
     * Remove this item.
     *
     * Use `"CollectionItem.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
    /**
     * Update the item.
     *
     * Use `"CollectionItem.setAttributes"` to check if this method is allowed.
     */
    setAttributes(update: EditableCollectionItemAttributes): Promise<CollectionItem | null>;
    /**
     * Set plugin data by key.
     *
     * Use `"CollectionItem.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get plugin data by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Get all plugin data keys.
     */
    getPluginDataKeys(): Promise<string[]>;
    /**
     * Navigate to this collection item. May switch modes to reveal the relevant view.
     */
    navigateTo(opts?: NavigableOptions): Promise<void>;
}

interface ZoomIntoViewOptions {
    /**
     * Set a percentage limit for the maximum zoom level.
     *
     * For example, use a value of `1.0` to ensure the zoom does not exceed 100%.
     */
    maxZoom?: number;
    /**
     * If the nodes are already visible, skip the zoom.
     * @default false
     */
    skipIfVisible?: boolean;
}

interface Rect$1 {
    x: number;
    y: number;
    width: number;
    height: number;
}
declare const createableNodes: readonly ["FrameNode", "TextNode", "ComponentNode"];
declare const otherNodes: readonly ["SVGNode", "DesignPageNode", "WebPageNode", "ComponentNode", "VectorSetNode", "VectorSetItemNode", "UnknownNode", "ComponentInstanceNode"];
type CreateNodeType$1 = (typeof createableNodes)[number];
type OtherNodeType = (typeof otherNodes)[number];
type PluginNodeClass = OtherNodeType | CreateNodeType$1;
type KnownNodeClass = Exclude<PluginNodeClass, "UnknownNode">;
type NodeWithAttribute<T extends NodeAttributeKey> = Extract<AnyNode, Record<T, unknown>>;
interface CommonNodeData extends WithIdTrait, WithReplicaInfoTrait {
    [classKey]: PluginNodeClass;
}
interface NodeClassToEditableAttributes {
    FrameNode: EditableFrameNodeAttributes;
    TextNode: EditableTextNodeAttributes;
    SVGNode: EditableSVGNodeAttributes;
    ComponentInstanceNode: EditableComponentInstanceNodeAttributes;
    DesignPageNode: EditableDesignPageNodeAttributes;
    WebPageNode: EditableWebPageNodeAttributes;
    ComponentNode: EditableComponentNodeAttributes;
    VectorSetNode: EditableVectorSetNodeAttributes;
    VectorSetItemNode: EditableVectorSetItemNodeAttributes;
    UnknownNode: object;
}
declare abstract class NodeMethods implements WithIdTrait, Navigable {
    #private;
    abstract readonly [classKey]: PluginNodeClass;
    readonly id: NodeId;
    readonly originalId: NodeId | null;
    constructor(data: SomeNodeData, engine: PluginEngine);
    get isReplica(): boolean;
    /**
     * Remove this node.
     *
     * Use `"Node.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
    /**
     * Select this node.
     */
    select(): Promise<void>;
    /**
     * Clone this node.
     *
     * Use `"Node.clone"` to check if this method is allowed.
     */
    clone(): Promise<(typeof this)[ClassKey] extends "UnknownNode" ? never : typeof this | null>;
    /**
     * Set the attributes of this node.
     *
     * Use `"Node.setAttributes"` to check if this method is allowed.
     */
    setAttributes(update: Partial<NodeClassToEditableAttributes[(typeof this)[ClassKey]]>): Promise<(typeof this)[ClassKey] extends "UnknownNode" ? never : typeof this | null>;
    /**
     * Get the bounding box of this node.
     */
    getRect(): Promise<Rect$1 | null>;
    /**
     * Pans and zooms the viewport to center the node.
     */
    zoomIntoView(options?: ZoomIntoViewOptions): Promise<void>;
    /**
     * Navigate to this node. May switch modes to reveal the relevant view.
     */
    navigateTo(opts?: Pick<NavigableOptions, "select" | "zoomIntoView">): Promise<void>;
    /**
     * Get the parent of this node.
     */
    getParent(): Promise<AnyNode | null>;
    /**
     * Get the children of this node.
     */
    getChildren(): Promise<CanvasNode[]>;
    /**
     * Get `type` descendants of this node.
     */
    getNodesWithType(type: "FrameNode"): Promise<FrameNode[]>;
    getNodesWithType(type: "TextNode"): Promise<TextNode[]>;
    getNodesWithType(type: "SVGNode"): Promise<SVGNode[]>;
    getNodesWithType(type: "ComponentInstanceNode"): Promise<ComponentInstanceNode[]>;
    getNodesWithType(type: "DesignPageNode"): Promise<DesignPageNode[]>;
    getNodesWithType(type: "WebPageNode"): Promise<WebPageNode[]>;
    getNodesWithType(type: "ComponentNode"): Promise<ComponentNode[]>;
    /**
     * Get the descendants of this node that support `attribute`.
     */
    getNodesWithAttribute<T extends NodeAttributeKey, Node = NodeWithAttribute<T>>(attribute: T): Promise<Node[]>;
    /**
     * Get the descendants of this node that have `attribute` set.
     */
    getNodesWithAttributeSet<T extends NodeAttributeKey, Node = NodeWithAttribute<T>>(attribute: T): Promise<Node[]>;
    /**
     * Walk this node and its descendants recursively.
     */
    walk(this: AnyNode): AsyncGenerator<AnyNode>;
    /**
     * Get plugin data by key.
     */
    getPluginData(key: string): Promise<string | null>;
    /**
     * Set plugin data by key.
     *
     * Use `"Node.setPluginData"` to check if this method is allowed.
     */
    setPluginData(key: string, value: string | null): Promise<void>;
    /**
     * Get all plugin data keys.
     */
    getPluginDataKeys(): Promise<string[]>;
}
interface DrawableNode extends WithNameTrait, WithVisibleTrait, WithLockedTrait, WithOpacityTrait {
}
interface EditableFrameNodeAttributes extends DrawableNode, WithPositionTrait, WithPinsTrait, WithSizeTrait, WithSizeConstraintsTrait, WithAspectRatioTrait, WithZIndexTrait, WithOverflowTrait, WithBackgroundColorTrait<TraitVariantNode>, WithBackgroundImageTrait<TraitVariantNode>, WithBackgroundGradientTrait<TraitVariantNode>, WithRotationTrait, WithLinkTrait, WithBorderRadiusTrait, WithBorderTrait<TraitVariantNode>, WithLayoutTrait, WithGridItemTrait, WithImageRenderingTrait {
}
interface FrameNodeData extends CommonNodeData, Partial<DrawableNode>, WithPositionTrait, Partial<WithComponentVariantTrait>, Partial<WithPinsTrait>, Partial<WithSizeTrait>, Partial<WithSizeConstraintsTrait>, Partial<WithAspectRatioTrait>, Partial<WithZIndexTrait>, Partial<WithOverflowTrait>, Partial<WithBackgroundColorTrait<TraitVariantData>>, Partial<WithBackgroundImageTrait<TraitVariantData>>, Partial<WithBackgroundGradientTrait<TraitVariantData>>, Partial<WithRotationTrait>, Partial<WithLinkTrait>, Partial<WithBorderRadiusTrait>, Partial<WithBorderTrait<TraitVariantData>>, Partial<WithLayoutTrait>, Partial<WithGridItemTrait>, Partial<WithBreakpointTrait>, Partial<WithImageRenderingTrait> {
    [classKey]: "FrameNode";
}
declare class FrameNode extends NodeMethods implements EditableFrameNodeAttributes, WithBreakpointTrait {
    readonly [classKey]: FrameNodeData[ClassKey];
    readonly name: string | null;
    readonly visible: boolean;
    readonly locked: boolean;
    readonly backgroundColor: ColorStyle | string | null;
    readonly backgroundImage: ImageAsset | null;
    readonly backgroundGradient: LinearGradient | RadialGradient | ConicGradient | null;
    readonly rotation: number;
    readonly opacity: number;
    readonly borderRadius: BorderRadius;
    readonly border: Border | null;
    readonly imageRendering: ImageRendering | null;
    readonly position: Position;
    readonly top: CSSDimension<CSSUnit.Pixel> | null;
    readonly right: CSSDimension<CSSUnit.Pixel> | null;
    readonly bottom: CSSDimension<CSSUnit.Pixel> | null;
    readonly left: CSSDimension<CSSUnit.Pixel> | null;
    readonly centerX: CSSDimension<CSSUnit.Percentage> | null;
    readonly centerY: CSSDimension<CSSUnit.Percentage> | null;
    readonly width: WidthLength | null;
    readonly height: HeightLength | null;
    readonly maxWidth: WidthConstraint | null;
    readonly minWidth: WidthConstraint | null;
    readonly maxHeight: HeightConstraint | null;
    readonly minHeight: HeightConstraint | null;
    readonly aspectRatio: number | null;
    readonly zIndex: WithZIndexTrait["zIndex"];
    readonly link: string | null;
    readonly linkOpenInNewTab: boolean | null;
    readonly overflow: WithOverflowTrait["overflow"];
    readonly overflowX: WithOverflowTrait["overflowX"];
    readonly overflowY: WithOverflowTrait["overflowY"];
    readonly layout: WithLayoutTrait["layout"];
    readonly gap: WithLayoutTrait["gap"];
    readonly padding: WithLayoutTrait["padding"];
    readonly stackDirection: WithLayoutTrait["stackDirection"];
    readonly stackDistribution: WithLayoutTrait["stackDistribution"];
    readonly stackAlignment: WithLayoutTrait["stackAlignment"];
    readonly stackWrapEnabled: WithLayoutTrait["stackWrapEnabled"];
    readonly gridColumnCount: WithLayoutTrait["gridColumnCount"];
    readonly gridRowCount: WithLayoutTrait["gridRowCount"];
    readonly gridAlignment: WithLayoutTrait["gridAlignment"];
    readonly gridColumnWidthType: WithLayoutTrait["gridColumnWidthType"];
    readonly gridColumnWidth: WithLayoutTrait["gridColumnWidth"];
    readonly gridColumnMinWidth: WithLayoutTrait["gridColumnMinWidth"];
    readonly gridRowHeightType: WithLayoutTrait["gridRowHeightType"];
    readonly gridRowHeight: WithLayoutTrait["gridRowHeight"];
    readonly gridItemFillCellWidth: WithGridItemTrait["gridItemFillCellWidth"];
    readonly gridItemFillCellHeight: WithGridItemTrait["gridItemFillCellHeight"];
    readonly gridItemHorizontalAlignment: WithGridItemTrait["gridItemHorizontalAlignment"];
    readonly gridItemVerticalAlignment: WithGridItemTrait["gridItemVerticalAlignment"];
    readonly gridItemColumnSpan: WithGridItemTrait["gridItemColumnSpan"];
    readonly gridItemRowSpan: WithGridItemTrait["gridItemRowSpan"];
    readonly isVariant: boolean;
    readonly isPrimaryVariant: boolean;
    readonly isBreakpoint: boolean;
    readonly isPrimaryBreakpoint: boolean;
    readonly inheritsFromId: string | null;
    readonly gesture: Gesture | null;
    constructor(rawData: FrameNodeData, engine: PluginEngine);
}
interface EditableTextNodeAttributes extends DrawableNode, WithPositionTrait, WithPinsTrait, WithSizeTrait, WithSizeConstraintsTrait, WithRotationTrait, WithZIndexTrait, WithOverflowTrait, WithTextTruncationTrait, WithFontTrait<TraitVariantNode>, WithLinkTrait, WithInlineTextStyleTrait<TraitVariantNode>, WithGridItemTrait {
}
interface TextNodeData extends CommonNodeData, Partial<DrawableNode>, WithPositionTrait, Partial<WithPinsTrait>, Partial<WithSizeTrait>, Partial<WithSizeConstraintsTrait>, Partial<WithRotationTrait>, Partial<WithZIndexTrait>, Partial<WithLinkTrait>, Partial<WithOverflowTrait>, Partial<WithTextTruncationTrait>, Partial<WithFontTrait<TraitVariantData>>, Partial<WithInlineTextStyleTrait<TraitVariantData>>, Partial<WithGridItemTrait> {
    [classKey]: "TextNode";
}
declare class TextNode extends NodeMethods implements EditableTextNodeAttributes {
    #private;
    readonly [classKey]: TextNodeData[ClassKey];
    readonly name: string | null;
    readonly visible: boolean;
    readonly locked: boolean;
    readonly rotation: number;
    readonly opacity: number;
    readonly zIndex: WithZIndexTrait["zIndex"];
    readonly font: Font | null;
    readonly inlineTextStyle: TextStyle | null;
    readonly position: Position;
    readonly top: CSSDimension<CSSUnit.Pixel> | null;
    readonly right: CSSDimension<CSSUnit.Pixel> | null;
    readonly bottom: CSSDimension<CSSUnit.Pixel> | null;
    readonly left: CSSDimension<CSSUnit.Pixel> | null;
    readonly centerX: CSSDimension<CSSUnit.Percentage> | null;
    readonly centerY: CSSDimension<CSSUnit.Percentage> | null;
    readonly width: WidthLength | null;
    readonly height: HeightLength | null;
    readonly maxWidth: WidthConstraint | null;
    readonly minWidth: WidthConstraint | null;
    readonly maxHeight: HeightConstraint | null;
    readonly minHeight: HeightConstraint | null;
    readonly link: string | null;
    readonly linkOpenInNewTab: boolean | null;
    readonly gridItemFillCellWidth: WithGridItemTrait["gridItemFillCellWidth"];
    readonly gridItemFillCellHeight: WithGridItemTrait["gridItemFillCellHeight"];
    readonly gridItemHorizontalAlignment: WithGridItemTrait["gridItemHorizontalAlignment"];
    readonly gridItemVerticalAlignment: WithGridItemTrait["gridItemVerticalAlignment"];
    readonly gridItemColumnSpan: WithGridItemTrait["gridItemColumnSpan"];
    readonly gridItemRowSpan: WithGridItemTrait["gridItemRowSpan"];
    readonly overflow: WithOverflowTrait["overflow"];
    readonly overflowX: WithOverflowTrait["overflowX"];
    readonly overflowY: WithOverflowTrait["overflowY"];
    readonly textTruncation: WithTextTruncationTrait["textTruncation"];
    constructor(rawData: TextNodeData, engine: PluginEngine);
    /**
     * Set the text of this node. Plain text content, not HTML.
     *
     * Use `"TextNode.setText"` to check if this method is allowed.
     */
    setText(text: string): Promise<void>;
    /**
     * Get the text of this node. Plain text content, not HTML.
     */
    getText(): Promise<string | null>;
    /**
     * Set the HTML of this node
     *
     * @alpha This an early API, and maybe heavily refactored in the future.
     */
    setHTML(html: string): Promise<void>;
    /**
     * Get HTML of this node
     *
     * @alpha This an early API, and maybe heavily refactored in the future.
     */
    getHTML(): Promise<string | null>;
}
interface EditableSVGNodeAttributes extends DrawableNode, WithPositionTrait, WithPinsTrait, WithSizeTrait, WithSVGTrait, WithRotationTrait {
}
interface SVGNodeData extends CommonNodeData, Partial<DrawableNode>, WithPositionTrait, Partial<WithPinsTrait>, Partial<WithSizeTrait>, WithSVGTrait, Partial<WithRotationTrait> {
    [classKey]: "SVGNode";
}
declare class SVGNode extends NodeMethods implements EditableSVGNodeAttributes {
    readonly [classKey]: SVGNodeData[ClassKey];
    readonly name: string | null;
    readonly visible: boolean;
    readonly locked: boolean;
    readonly svg: string;
    readonly rotation: number;
    readonly opacity: number;
    readonly position: Position;
    readonly top: CSSDimension<CSSUnit.Pixel> | null;
    readonly right: CSSDimension<CSSUnit.Pixel> | null;
    readonly bottom: CSSDimension<CSSUnit.Pixel> | null;
    readonly left: CSSDimension<CSSUnit.Pixel> | null;
    readonly centerX: CSSDimension<CSSUnit.Percentage> | null;
    readonly centerY: CSSDimension<CSSUnit.Percentage> | null;
    readonly width: WidthLength | null;
    readonly height: HeightLength | null;
    constructor(rawData: SVGNodeData, engine: PluginEngine);
}
interface EditableVectorSetItemNodeAttributes extends WithNameTrait, WithVisibleTrait, WithLockedTrait, WithPinsTrait, WithSizeTrait {
}
interface VectorSetItemNodeData extends CommonNodeData, Partial<WithNameTrait>, Partial<WithVisibleTrait>, Partial<WithLockedTrait>, Partial<WithPinsTrait>, Partial<WithSizeTrait> {
    [classKey]: "VectorSetItemNode";
}
declare class VectorSetItemNode extends NodeMethods implements EditableVectorSetItemNodeAttributes {
    #private;
    readonly [classKey]: VectorSetItemNodeData[ClassKey];
    readonly name: string | null;
    readonly visible: boolean;
    readonly locked: boolean;
    readonly top: CSSDimension<CSSUnit.Pixel> | null;
    readonly right: CSSDimension<CSSUnit.Pixel> | null;
    readonly bottom: CSSDimension<CSSUnit.Pixel> | null;
    readonly left: CSSDimension<CSSUnit.Pixel> | null;
    readonly centerX: CSSDimension<CSSUnit.Percentage> | null;
    readonly centerY: CSSDimension<CSSUnit.Percentage> | null;
    readonly width: WidthLength | null;
    readonly height: HeightLength | null;
    constructor(rawData: VectorSetItemNodeData, engine: PluginEngine);
    getSVG(): Promise<string | null>;
}
interface EditableComponentInstanceNodeAttributes extends DrawableNode, WithPositionTrait, WithPinsTrait, WithSizeTrait, WithSizeConstraintsTrait, WithAspectRatioTrait, WithControlAttributesTrait, WithRotationTrait {
}
interface ComponentInstanceNodeData extends CommonNodeData, Partial<DrawableNode>, WithPositionTrait, Partial<WithPinsTrait>, Partial<WithSizeTrait>, Partial<WithSizeConstraintsTrait>, Partial<WithAspectRatioTrait>, Partial<WithControlAttributesTrait>, Partial<WithTypedControlsTrait>, WithRequiredComponentInfoTrait, Partial<WithNullableComponentInfoTrait>, Partial<WithRotationTrait> {
    [classKey]: "ComponentInstanceNode";
}
declare class ComponentInstanceNode extends NodeMethods implements EditableComponentInstanceNodeAttributes, WithComponentInfoTrait {
    #private;
    readonly [classKey]: ComponentInstanceNodeData[ClassKey];
    readonly name: string | null;
    readonly visible: boolean;
    readonly locked: boolean;
    readonly componentIdentifier: string;
    readonly insertURL: string | null;
    readonly componentName: string | null;
    readonly controls: ControlAttributes;
    readonly rotation: number;
    readonly opacity: number;
    readonly position: Position;
    readonly top: CSSDimension<CSSUnit.Pixel> | null;
    readonly right: CSSDimension<CSSUnit.Pixel> | null;
    readonly bottom: CSSDimension<CSSUnit.Pixel> | null;
    readonly left: CSSDimension<CSSUnit.Pixel> | null;
    readonly centerX: CSSDimension<CSSUnit.Percentage> | null;
    readonly centerY: CSSDimension<CSSUnit.Percentage> | null;
    readonly width: WidthLength | null;
    readonly height: HeightLength | null;
    readonly maxWidth: WidthConstraint | null;
    readonly minWidth: WidthConstraint | null;
    readonly maxHeight: HeightConstraint | null;
    readonly minHeight: HeightConstraint | null;
    readonly aspectRatio: number | null;
    /** @alpha */
    get typedControls(): Record<string, Control>;
    constructor(rawData: ComponentInstanceNodeData, engine: PluginEngine);
    /**
     * Get runtime error for this node.
     *
     * @alpha
     */
    getRuntimeError(): Promise<NodeRuntimeErrorResult | null>;
}
type EditableWebPageNodeAttributes = object;
interface WebPageNodeData extends CommonNodeData, Partial<WithWebPageInfoTrait> {
    [classKey]: "WebPageNode";
}
declare class WebPageNode extends NodeMethods implements EditableWebPageNodeAttributes, WithWebPageInfoTrait {
    #private;
    readonly [classKey]: WebPageNodeData[ClassKey];
    /**
     * The relative path to the WebPage
     */
    readonly path: string | null;
    /**
     * The Collection ID of the CMS Collection if the WebPage is a CMS Detail Page
     */
    readonly collectionId: string | null;
    constructor(rawData: WebPageNodeData, engine: PluginEngine);
    /**
     * Get a list of breakpoints suggestions that can be added to the WebPage.
     *
     * @alpha
     */
    getBreakpointSuggestions(): Promise<readonly Breakpoint[]>;
    /**
     * Adds a new breakpoint to the web page.
     * @param breakpoint The breakpoint configuration to add
     * @returns a new FrameNode
     *
     * @alpha
     */
    addBreakpoint(basedOn: NodeId, breakpoint: Breakpoint): Promise<FrameNode>;
    /**
     * Get the active collection item for this CMS detail page.
     * Returns null if this is not a detail page or the collection is empty.
     *
     * @alpha
     */
    getActiveCollectionItem(): Promise<CollectionItem | null>;
}
type EditableComponentNodeAttributes = WithNameTrait;
interface ComponentNodeData extends CommonNodeData, Partial<WithNameTrait>, WithRequiredComponentInfoTrait, Partial<WithNullableComponentInfoTrait> {
    [classKey]: "ComponentNode";
}
declare class ComponentNode extends NodeMethods implements EditableComponentNodeAttributes, WithComponentInfoTrait {
    #private;
    readonly [classKey]: ComponentNodeData[ClassKey];
    readonly name: string | null;
    readonly componentIdentifier: string;
    readonly insertURL: string | null;
    readonly componentName: string | null;
    constructor(rawData: ComponentNodeData, engine: PluginEngine);
    /**
     * Add a variant to this component.
     *
     * @param basedOn - The ID of the node to duplicate
     * @param attributes - Optional attributes for the variant
     *
     * Use `"ComponentNode.addVariant"` to check if this method is allowed.
     *
     * @alpha - This method requires using FramerPluginAPIAlpha
     */
    addVariant(basedOn: NodeId, attributes?: Partial<EditableFrameNodeAttributes>): Promise<FrameNode>;
    /**
     * Add a state to this component.
     *
     * @param nodeId - The ID of the node to add the state to
     * @param type - The type of state to add
     * @param attributes - Optional attributes for the state
     *
     * Use `"ComponentNode.addGestureVariant"` to check if this method is allowed.
     *
     * @alpha - This method requires using FramerPluginAPIAlpha
     */
    addGestureVariant(nodeId: NodeId, type: "hover" | "pressed", attributes?: Partial<EditableFrameNodeAttributes>): Promise<FrameNode & IsComponentGestureVariant>;
    /**
     * Get the variables that belong to this component.
     *
     * @alpha
     */
    getVariables(): Promise<ComponentVariable[]>;
    /**
     * Create new variables. Use `ComponentVariable.setAttributes` to update.
     *
     * Use `"ComponentNode.addVariables"` to check if this method is allowed.
     *
     * @alpha
     */
    addVariables(variables: CreateVariable[]): Promise<ComponentVariable[]>;
    /**
     * Remove variables by their ID.
     *
     * Use `"ComponentNode.removeVariables"` to check if this method is allowed.
     *
     * @alpha
     */
    removeVariables(variableIds: string[]): Promise<void>;
    /**
     * Arrange variables in a specific order.
     *
     * Use `"ComponentNode.setVariableOrder"` to check if this method is allowed.
     *
     * @alpha
     */
    setVariableOrder(variableIds: string[]): Promise<void>;
}
type EditableVectorSetNodeAttributes = WithNameTrait;
interface VectorSetNodeData extends CommonNodeData, Partial<WithNameTrait> {
    [classKey]: "VectorSetNode";
}
declare class VectorSetNode extends NodeMethods implements EditableVectorSetNodeAttributes {
    readonly [classKey]: VectorSetNodeData[ClassKey];
    readonly name: string | null;
    constructor(rawData: VectorSetNodeData, engine: PluginEngine);
}
type EditableDesignPageNodeAttributes = WithNameTrait;
interface DesignPageNodeData extends CommonNodeData, Partial<WithNameTrait> {
    [classKey]: "DesignPageNode";
}
declare class DesignPageNode extends NodeMethods implements EditableDesignPageNodeAttributes {
    readonly [classKey]: DesignPageNodeData[ClassKey];
    readonly name: string | null;
    constructor(rawData: DesignPageNodeData, engine: PluginEngine);
}
interface UnknownNodeData extends CommonNodeData {
    [classKey]: "UnknownNode";
}
declare class UnknownNode extends NodeMethods {
    readonly [classKey]: UnknownNodeData[ClassKey];
    constructor(rawData: UnknownNodeData, engine: PluginEngine);
}
type CanvasRootNode = WebPageNode | DesignPageNode | ComponentNode | VectorSetNode | UnknownNode;
type CanvasNode = FrameNode | TextNode | ComponentInstanceNode | SVGNode | VectorSetItemNode | UnknownNode;
type SomeNodeData = FrameNodeData | TextNodeData | ComponentInstanceNodeData | SVGNodeData | DesignPageNodeData | WebPageNodeData | ComponentNodeData | VectorSetNodeData | VectorSetItemNodeData | UnknownNodeData;
interface AnyNodeData extends Partial<AllTraits<TraitVariantData>>, WithReplicaInfoTrait {
    [classKey]: PluginNodeClass;
}
interface AnyEditableAttributes extends EditableFrameNodeAttributes, EditableTextNodeAttributes, EditableSVGNodeAttributes, EditableComponentInstanceNodeAttributes, EditableComponentNodeAttributes, EditableWebPageNodeAttributes, EditableDesignPageNodeAttributes {
}
type AnyNode = CanvasNode | CanvasRootNode;
declare function isFrameNode(node: unknown): node is FrameNode;
declare function isTextNode(node: unknown): node is TextNode;
declare function isSVGNode(node: unknown): node is SVGNode;
declare function isComponentInstanceNode(node: unknown): node is ComponentInstanceNode;
declare function isWebPageNode(node: unknown): node is WebPageNode;
declare function isComponentNode(node: unknown): node is ComponentNode;
declare function isDesignPageNode(node: unknown): node is DesignPageNode;
declare function isVectorSetNode(node: unknown): node is VectorSetNode;
declare function isVectorSetItemNode(node: unknown): node is VectorSetItemNode;

/** @alpha */
interface ComponentInstancePlaceholderData {
    id: string;
    width: number;
    height: number;
    title: string;
    codePreview: string | null;
}
/** @alpha */
type ComponentInstancePlaceholderAttributes = Partial<Omit<ComponentInstancePlaceholderData, "id">>;
/** @alpha */
declare class ComponentInstancePlaceholder {
    #private;
    constructor(data: ComponentInstancePlaceholderData, engine: PluginEngine);
    get id(): string;
    get width(): number;
    get height(): number;
    get title(): string;
    get codePreview(): string | null;
    setAttributes(attributes: ComponentInstancePlaceholderAttributes): Promise<ComponentInstancePlaceholder | null>;
    remove(): Promise<void>;
    replaceWithComponentInstance(url: string, attributes?: Partial<EditableComponentInstanceNodeAttributes>): Promise<ComponentInstanceNode | null>;
}

interface ApiVersion1User {
    name: string;
    /** Hashed user id */
    id: string;
}
interface User extends ApiVersion1User {
    /** Hashed user id served by API version 1, use for migration only */
    apiVersion1Id: string;
    avatarUrl?: string | undefined;
    /** For when there is no avatar. */
    initials: string;
}

interface CodeExportCommon {
    name: string;
    isDefaultExport: boolean;
}
interface CodeFileComponentExport extends CodeExportCommon {
    insertURL: string;
    type: "component";
}
interface CodeFileOverrideExport extends CodeExportCommon {
    type: "override";
}
declare function isCodeFileComponentExport(exportItem: CodeFileExport): exportItem is CodeFileComponentExport;
declare function isCodeFileOverrideExport(exportItem: CodeFileExport): exportItem is CodeFileOverrideExport;
type CodeFileExport = CodeFileComponentExport | CodeFileOverrideExport;
/** @alpha */
type ShowProgressOnInstancesAttributes = Pick<ComponentInstancePlaceholderAttributes, "title" | "codePreview">;
interface CodeFileData {
    id: string;
    name: string;
    path: string;
    content: string;
    exports: readonly CodeFileExport[];
    versionId: string;
}
interface CodeFileVersionData extends Pick<CodeFileData, "id" | "name"> {
    fileId: string;
    createdAt: string;
    createdBy: User;
}
declare class CodeFileVersion {
    #private;
    get id(): string;
    get name(): string;
    get createdAt(): string;
    get createdBy(): Readonly<User>;
    constructor(data: CodeFileVersionData, engine: PluginEngine);
    getContent(): Promise<string>;
}
declare class CodeFile implements Navigable {
    #private;
    get id(): string;
    get name(): string;
    get path(): string;
    get content(): string;
    get exports(): readonly CodeFileExport[];
    get versionId(): string;
    constructor(data: CodeFileData, engine: PluginEngine);
    /**
     * Set the content of this code file.
     *
     * Use `"CodeFile.setFileContent"` to check if this method is allowed.
     */
    setFileContent(code: string): Promise<CodeFile>;
    /**
     * Rename this code file.
     *
     * Use `"CodeFile.rename"` to check if this method is allowed.
     */
    rename(newName: string): Promise<CodeFile>;
    /**
     * Remove this code file.
     *
     * Use `"CodeFile.remove"` to check if this method is allowed.
     */
    remove(): Promise<void>;
    /**
     * Get all versions of this code file.
     */
    getVersions(): Promise<readonly CodeFileVersion[]>;
    /** @alpha */
    showProgressOnInstances(attributes?: ShowProgressOnInstancesAttributes): Promise<void>;
    /** @alpha */
    removeProgressFromInstances(): Promise<void>;
    /**
     * @deprecated The implementation of this method was removed. The method will always return an empty array. The method will be removed in the near future.
     */
    lint(_rules: LintConfig): Promise<LintDiagnostic[]>;
    typecheck(compilerOptions?: ts.server.protocol.CompilerOptions): Promise<TypecheckDiagnostic[]>;
    /**
     * Navigate to this code file. May switch modes to reveal the relevant view.
     */
    navigateTo(): Promise<void>;
}

type CustomCodeLocation = "headStart" | "headEnd" | "bodyStart" | "bodyEnd";
interface SetCustomCodeOptions {
    html: string | null;
    location: CustomCodeLocation;
}
type CustomCode = Record<CustomCodeLocation, {
    disabled: boolean;
    html: string | null;
}>;

interface WithOptionalName$1 {
    name?: string;
}
interface WithOptionalPreviewImage {
    previewImage?: string;
}
interface SvgDragData extends WithOptionalName$1, WithOptionalPreviewImage {
    type: "svg";
    svg: string;
    /** Inverts SVG drag preview in dark mode. Defaults to true. */
    invertInDarkMode?: boolean;
}
interface ImageDragData extends WithOptionalName$1, WithOptionalPreviewImage, ImageOptions {
    type: "image";
    image: string;
}
interface ComponentInstanceDragData extends WithOptionalName$1, WithOptionalPreviewImage {
    type: "componentInstance";
    url: string;
    attributes?: Partial<EditableComponentInstanceNodeAttributes>;
}
interface DetachedComponentLayersDragData extends WithOptionalName$1, WithOptionalPreviewImage {
    type: "detachedComponentLayers";
    url: string;
    layout?: boolean;
    attributes?: Partial<EditableComponentInstanceNodeAttributes>;
}
type DragData = SvgDragData | ImageDragData | ComponentInstanceDragData | DetachedComponentLayersDragData;
interface Point {
    x: number;
    y: number;
}
interface Size$1 {
    width: number;
    height: number;
}
interface DragSessionId {
    dragSessionId: string;
}
type Rect = Point & Size$1;
interface Mouse {
    mouse: Point;
}
interface ElementRect {
    elementRect: Rect;
    svgRect?: Rect;
}
type DragStartInfo = DragSessionId & ElementRect & Mouse;
type DragInfo = DragSessionId & Mouse;
type DragEndInfo = DragSessionId & {
    cancelled: boolean;
};
interface DragCompleteSuccess {
    /** Whether the drag was successful or not. */
    status: "success";
    /** The inserted node id. */
    nodeId: NodeId;
}
interface DragCompleteError {
    /** Whether the drag was successful or not. */
    status: "error";
    /** Reason for the error, if available. */
    reason?: string;
}
type DragCompleteResult = DragCompleteSuccess | DragCompleteError;
type DragCompleteCallback = (result: DragCompleteResult) => void;

declare const publish: unique symbol;
declare const getDeployments: unique symbol;
declare const deploy: unique symbol;
declare const getChangedPaths: unique symbol;
declare const getChangeContributors: unique symbol;
declare const createManagedCollection: unique symbol;
declare const rejectAllPending: unique symbol;
declare const $framerApiOnly: {
    readonly publish: typeof publish;
    readonly getDeployments: typeof getDeployments;
    readonly deploy: typeof deploy;
    readonly getChangedPaths: typeof getChangedPaths;
    readonly getChangeContributors: typeof getChangeContributors;
    readonly createManagedCollection: typeof createManagedCollection;
    readonly rejectAllPending: typeof rejectAllPending;
};

type Ownership = {
    type: "project";
} | {
    type: "external";
    name: string;
};
interface VectorSetData {
    id: string;
    name: string;
    owner: Ownership;
}
interface VectorSetItemData {
    id: string;
    name: string;
    insertUrl: string;
    iconUrl: string;
    moduleId: string;
}
interface VectorSetItemVariable {
    type: "number" | "color";
    id: string;
    name: string;
}
declare class VectorSet {
    #private;
    id: string;
    name: string;
    owner: Ownership;
    constructor(data: VectorSetData, engine: PluginEngine);
    getItems(): Promise<VectorSetItem[]>;
}
declare class VectorSetItem {
    #private;
    id: string;
    name: string;
    insertUrl: string;
    iconUrl: string;
    constructor(data: VectorSetItemData, engine: PluginEngine);
    getVariables(): Promise<VectorSetItemVariable[]>;
}

type PermissionMap = {
    [K in keyof PluginMessageAPI]: boolean;
};
type NamespaceMembers<Class, Namespace extends string, Parent = undefined> = {
    [Member in Exclude<keyof Class, keyof Parent> as Member extends string ? `${Namespace}.${Member}` : never]: Class[Member];
};
type AllMembers = Omit<FramerPluginAPIAlpha, "isAllowedTo" | "subscribeToIsAllowedTo"> & NamespaceMembers<ImageAsset, "ImageAsset"> & NamespaceMembers<CodeFile, "CodeFile"> & NamespaceMembers<CodeFileVersion, "CodeFileVersion"> & NamespaceMembers<ComponentInstancePlaceholder, "ComponentInstancePlaceholder"> & NamespaceMembers<Field, "Field"> & NamespaceMembers<BooleanField, "BooleanField", Field> & NamespaceMembers<ColorField, "ColorField", Field> & NamespaceMembers<NumberField, "NumberField", Field> & NamespaceMembers<StringField, "StringField", Field> & NamespaceMembers<FormattedTextField, "FormattedTextField", Field> & NamespaceMembers<ImageField, "ImageField", Field> & NamespaceMembers<LinkField, "LinkField", Field> & NamespaceMembers<DateField, "DateField", Field> & NamespaceMembers<FieldDivider, "FieldDivider", Field> & NamespaceMembers<UnsupportedField, "UnsupportedField", Field> & NamespaceMembers<FileField, "FileField", Field> & NamespaceMembers<EnumField, "EnumField", Field> & NamespaceMembers<CollectionReferenceField, "CollectionReferenceField", Field> & NamespaceMembers<MultiCollectionReferenceField, "MultiCollectionReferenceField", Field> & NamespaceMembers<ManagedCollection, "ManagedCollection"> & NamespaceMembers<Collection, "Collection"> & NamespaceMembers<CollectionItem, "CollectionItem"> & NamespaceMembers<NodeMethods, "Node"> & NamespaceMembers<FrameNode, "FrameNode", NodeMethods> & NamespaceMembers<TextNode, "TextNode", NodeMethods> & NamespaceMembers<SVGNode, "SVGNode", NodeMethods> & NamespaceMembers<ComponentInstanceNode, "ComponentInstanceNode", NodeMethods> & NamespaceMembers<WebPageNode, "WebPageNode", NodeMethods> & NamespaceMembers<ComponentNode, "ComponentNode", NodeMethods> & NamespaceMembers<UnknownNode, "UnknownNode", NodeMethods> & NamespaceMembers<ColorStyle, "ColorStyle"> & NamespaceMembers<TextStyle, "TextStyle"> & NamespaceMembers<Variable, "Variable"> & NamespaceMembers<BooleanVariable, "BooleanVariable", Variable> & NamespaceMembers<NumberVariable, "NumberVariable", Variable> & NamespaceMembers<StringVariable, "StringVariable", Variable> & NamespaceMembers<FormattedTextVariable, "FormattedTextVariable", Variable> & NamespaceMembers<EnumCase, "EnumCase"> & NamespaceMembers<EnumVariable, "EnumVariable", Variable> & NamespaceMembers<ColorVariable, "ColorVariable", Variable> & NamespaceMembers<ImageVariable, "ImageVariable", Variable> & NamespaceMembers<FileVariable, "FileVariable", Variable> & NamespaceMembers<LinkVariable, "LinkVariable", Variable> & NamespaceMembers<DateVariable, "DateVariable", Variable> & NamespaceMembers<BorderVariable, "BorderVariable", Variable> & NamespaceMembers<UnsupportedVariable, "UnsupportedVariable", Variable> & NamespaceMembers<VectorSet, "VectorSet"> & NamespaceMembers<VectorSetItem, "VectorSetItem">;
declare const unprotectedMessageTypesSource: ["closeNotification", "closePlugin", "setCloseWarning", "getActiveCollection", "getActiveLocale", "getActiveManagedCollection", "getCanvasRoot", "getChildren", "getCollection", "getCollectionFields", "getCollectionFields2", "getCollectionItems", "getCollectionItems2", "getCollections", "getColorStyle", "getColorStyles", "getCurrentUser", "getCurrentUser2", "getCustomCode", "getDefaultLocale", "getFont", "getFonts", "getImage", "getImageData", "getLocales", "getLocalizationGroups", "getManagedCollection", "getManagedCollectionFields", "getManagedCollectionFields2", "getManagedCollectionItemIds", "getManagedCollections", "getNode", "getNodesWithAttribute", "getNodesWithAttributeSet", "getNodesWithType", "getParent", "getPluginData", "getPluginDataForNode", "getPluginDataKeys", "getPluginDataKeysForNode", "getProjectInfo", "getProjectInfo2", "getPublishInfo", "getRect", "getSelection", "getSVGForNode", "getText", "getTextForNode", "getTextStyle", "getTextStyles", "hideUI", "setBackgroundMessage", "notify", "onPointerDown", "setActiveCollection", "setSelection", "showUI", "getCodeFileVersionContent", "typecheckCode", "getCodeFileVersions", "getCodeFiles", "getCodeFile", "getRedirects", "uploadFile", "uploadFiles", "uploadImage", "uploadImages", "zoomIntoView", "navigateTo", "getRuntimeErrorForModule", "getRuntimeErrorForCodeComponentNode", "showProgressOnInstances", "removeProgressFromInstances", "addComponentInstancePlaceholder", "updateComponentInstancePlaceholder", "removeComponentInstancePlaceholder", "setMenu", "showContextMenu", "getBreakpointSuggestionsForWebPage", "getActiveCollectionItemForWebPage", "getVariables", "getVectorSets", "getVectorSetItems", "getVectorSetItemVariables", "getChangedPaths", "getChangeContributors", "getDeployments", "INTERNAL_getAiServiceInfo", "INTERNAL_sendTrackingEvent", "INTERNAL_getHTMLForNode", "getAiServiceInfo", "sendTrackingEvent", "unstable_getCodeFile", "unstable_getCodeFiles", "unstable_getCodeFileVersionContent", "unstable_getCodeFileLint2", "unstable_getCodeFileTypecheck2", "unstable_getCodeFileVersions", "lintCode"];
type UnprotectedMessageType = (typeof unprotectedMessageTypesSource)[number];
type ProtectedMessageType = Exclude<keyof PluginMessageAPI, UnprotectedMessageType>;
type Method = keyof {
    [K in keyof AllMembers as AllMembers[K] extends (...args: any) => unknown ? K : never]: string;
};
declare const methodToMessageTypes: {
    readonly addComponentInstance: ["addComponentInstance"];
    /** @alpha */
    readonly addComponentInstancePlaceholder: [];
    readonly addDetachedComponentLayers: ["addDetachedComponentLayers"];
    readonly addImage: ["addImage"];
    readonly addImages: ["addImages"];
    readonly addSVG: ["addSVG"];
    readonly addText: ["addText"];
    readonly addRedirects: ["addRedirects"];
    readonly getRedirects: [];
    readonly removeRedirects: ["removeRedirects"];
    readonly setRedirectOrder: ["setRedirectOrder"];
    readonly subscribeToRedirects: [];
    readonly cloneNode: ["cloneNode"];
    readonly closePlugin: [];
    readonly createColorStyle: ["createColorStyle"];
    readonly createFrameNode: ["createNode"];
    readonly createTextNode: ["createNode"];
    readonly createComponentNode: ["createNode"];
    readonly createTextStyle: ["createTextStyle"];
    readonly createDesignPage: ["createDesignPage"];
    readonly createWebPage: ["createWebPage"];
    readonly getActiveCollection: [];
    readonly getActiveLocale: [];
    readonly getActiveManagedCollection: [];
    readonly getCanvasRoot: [];
    readonly getChildren: [];
    readonly getCollection: [];
    readonly getCollections: [];
    readonly getColorStyle: [];
    readonly getColorStyles: [];
    readonly getCurrentUser: [];
    readonly getCustomCode: [];
    readonly getDefaultLocale: [];
    readonly getFont: [];
    readonly getFonts: [];
    readonly getImage: [];
    readonly getLocales: [];
    readonly getLocalizationGroups: [];
    readonly getManagedCollection: [];
    readonly getManagedCollections: [];
    readonly getNode: [];
    readonly getNodesWithAttribute: [];
    readonly getNodesWithAttributeSet: [];
    readonly getNodesWithType: [];
    readonly getParent: [];
    readonly getPluginData: [];
    readonly getPluginDataKeys: [];
    readonly getProjectInfo: [];
    readonly getPublishInfo: [];
    readonly getRect: [];
    readonly getSelection: [];
    readonly getText: [];
    readonly getTextStyle: [];
    readonly getTextStyles: [];
    readonly hideUI: [];
    /** @beta */
    readonly setBackgroundMessage: [];
    readonly setCloseWarning: [];
    /** @deprecated The lintCode API was removed. */
    readonly lintCode: [];
    readonly makeDraggable: ["onDragEnd", "onDragStart", "onDrag", "setDragData", "preloadDetachedComponentLayers", "preloadImageUrlForInsertion", "preloadDragPreviewImage"];
    readonly notify: [];
    readonly preloadDetachedComponentLayers: ["preloadDetachedComponentLayers"];
    readonly preloadDragPreviewImage: ["preloadDragPreviewImage"];
    readonly preloadImageUrlForInsertion: ["preloadImageUrlForInsertion"];
    readonly removeNode: ["removeNodes2"];
    readonly removeNodes: ["removeNodes2"];
    readonly setAttributes: ["setAttributes"];
    readonly setCustomCode: ["setCustomCode"];
    readonly setImage: ["setImage"];
    readonly setLocalizationData: ["setLocalizationData"];
    readonly setMenu: [];
    readonly showContextMenu: [];
    readonly setParent: ["setParent"];
    readonly setPluginData: ["setPluginData"];
    readonly setSelection: [];
    readonly setText: ["setText"];
    /** @beta */
    readonly typecheckCode: [];
    readonly showUI: [];
    readonly subscribeToCanvasRoot: [];
    readonly subscribeToColorStyles: [];
    readonly subscribeToCustomCode: [];
    readonly subscribeToImage: [];
    readonly subscribeToPublishInfo: [];
    readonly subscribeToSelection: [];
    readonly subscribeToText: [];
    readonly subscribeToTextStyles: [];
    readonly createCodeFile: ["createCodeFile"];
    readonly unstable_ensureMinimumDependencyVersion: ["unstable_ensureMinimumDependencyVersion"];
    readonly getCodeFiles: [];
    readonly getCodeFile: [];
    readonly subscribeToCodeFiles: [];
    readonly subscribeToOpenCodeFile: [];
    readonly uploadFile: [];
    readonly uploadFiles: [];
    readonly uploadImage: [];
    readonly uploadImages: [];
    readonly zoomIntoView: [];
    readonly navigateTo: [];
    readonly getVectorSets: [];
    readonly "VectorSet.getItems": [];
    readonly "VectorSetItem.getVariables": [];
    readonly "Node.navigateTo": [];
    readonly "CodeFile.navigateTo": [];
    readonly "Collection.navigateTo": [];
    readonly "ManagedCollection.navigateTo": [];
    readonly "CollectionItem.navigateTo": [];
    readonly "ComponentInstanceNode.getRuntimeError": [];
    readonly "ImageAsset.cloneWithAttributes": [];
    readonly "ImageAsset.getData": [];
    readonly "ImageAsset.loadBitmap": [];
    readonly "ImageAsset.loadImage": [];
    readonly "ImageAsset.measure": [];
    readonly "CodeFile.remove": ["removeCodeFile"];
    readonly "CodeFile.rename": ["renameCodeFile"];
    readonly "CodeFile.setFileContent": ["setCodeFileContent"];
    readonly "CodeFile.getVersions": [];
    /** @alpha */
    readonly "CodeFile.showProgressOnInstances": [];
    /** @alpha */
    readonly "CodeFile.removeProgressFromInstances": [];
    readonly "CodeFile.lint": [];
    readonly "CodeFile.typecheck": [];
    readonly "CodeFileVersion.getContent": [];
    /** @alpha */
    readonly "ComponentInstancePlaceholder.setAttributes": [];
    /** @alpha */
    readonly "ComponentInstancePlaceholder.remove": [];
    /** @alpha */
    readonly "ComponentInstancePlaceholder.replaceWithComponentInstance": ["replaceComponentInstancePlaceholderWithComponentInstance"];
    readonly "Field.remove": ["removeCollectionFields"];
    readonly "Field.setAttributes": ["addCollectionFields2"];
    readonly "EnumField.addCase": ["addEnumCase"];
    readonly "EnumField.setCaseOrder": ["setEnumCaseOrder"];
    readonly "Collection.addFields": ["addCollectionFields2"];
    readonly "Collection.addItems": ["addCollectionItems2"];
    readonly "Collection.getFields": [];
    readonly "Collection.getItems": [];
    readonly "Collection.getPluginData": [];
    readonly "Collection.getPluginDataKeys": [];
    readonly "Collection.removeFields": ["removeCollectionFields"];
    readonly "Collection.removeItems": ["removeCollectionItems"];
    readonly "Collection.setAsActive": [];
    readonly "Collection.setFieldOrder": ["setCollectionFieldOrder"];
    readonly "Collection.setItemOrder": ["setCollectionItemOrder"];
    readonly "Collection.setPluginData": ["setPluginDataForNode"];
    readonly "CollectionItem.getPluginData": [];
    readonly "CollectionItem.getPluginDataKeys": [];
    readonly "CollectionItem.remove": ["removeCollectionItems"];
    readonly "CollectionItem.setAttributes": ["setCollectionItemAttributes2"];
    readonly "CollectionItem.setPluginData": ["setPluginDataForNode"];
    readonly "ManagedCollection.addItems": ["addManagedCollectionItems2"];
    readonly "ManagedCollection.getFields": [];
    readonly "ManagedCollection.getItemIds": [];
    readonly "ManagedCollection.getPluginData": [];
    readonly "ManagedCollection.getPluginDataKeys": [];
    readonly "ManagedCollection.removeItems": ["removeManagedCollectionItems"];
    readonly "ManagedCollection.setAsActive": [];
    readonly "ManagedCollection.setFields": ["setManagedCollectionFields"];
    readonly "ManagedCollection.setItemOrder": ["setManagedCollectionItemOrder"];
    readonly "ManagedCollection.setPluginData": ["setPluginDataForNode"];
    readonly "Node.clone": ["cloneNode"];
    readonly "Node.getChildren": [];
    readonly "Node.getNodesWithAttribute": [];
    readonly "Node.getNodesWithAttributeSet": [];
    readonly "Node.getNodesWithType": [];
    readonly "Node.getParent": [];
    readonly "Node.getPluginData": [];
    readonly "Node.getPluginDataKeys": [];
    readonly "Node.getRect": [];
    readonly "Node.remove": ["removeNodes2"];
    readonly "Node.select": [];
    readonly "Node.setAttributes": ["setAttributes"];
    readonly "Node.setPluginData": ["setPluginDataForNode"];
    readonly "Node.walk": [];
    readonly "Node.zoomIntoView": [];
    readonly "TextNode.getText": [];
    readonly "TextNode.setText": ["setTextForNode"];
    readonly "TextNode.setHTML": ["INTERNAL_setHTMLForNode"];
    readonly "TextNode.getHTML": [];
    /** @alpha */
    readonly "ComponentNode.addVariant": ["addVariantToComponent"];
    /** @alpha */
    readonly "ComponentNode.addGestureVariant": ["addGestureVariantToComponent"];
    /** @alpha */
    readonly "ComponentNode.getVariables": [];
    /** @alpha */
    readonly "ComponentNode.addVariables": ["addVariables"];
    /** @alpha */
    readonly "ComponentNode.removeVariables": ["removeVariables"];
    readonly "WebPageNode.getBreakpointSuggestions": [];
    readonly "WebPageNode.addBreakpoint": ["addBreakpointToWebPage"];
    /** @alpha */
    readonly "WebPageNode.getActiveCollectionItem": [];
    readonly "ColorStyle.getPluginData": [];
    readonly "ColorStyle.getPluginDataKeys": [];
    readonly "ColorStyle.remove": ["removeColorStyle"];
    readonly "ColorStyle.setAttributes": ["setColorStyleAttributes"];
    readonly "ColorStyle.setPluginData": ["setPluginDataForNode"];
    readonly "TextStyle.getPluginData": [];
    readonly "TextStyle.getPluginDataKeys": [];
    readonly "TextStyle.remove": ["removeTextStyle"];
    readonly "TextStyle.setAttributes": ["setTextStyleAttributes"];
    readonly "TextStyle.setPluginData": ["setPluginDataForNode"];
    /** @alpha */
    readonly "Variable.setAttributes": ["updateVariable"];
    /** @alpha */
    readonly "Variable.remove": ["removeVariables"];
    /** @alpha */
    readonly "ComponentNode.setVariableOrder": ["setVariableOrder"];
    readonly "EnumCase.remove": ["removeEnumCase"];
    readonly "EnumCase.setAttributes": ["updateEnumCase"];
    /** @alpha */
    readonly "EnumVariable.addCase": ["addEnumCase"];
    /** @alpha */
    readonly "EnumVariable.setCaseOrder": ["setEnumCaseOrder"];
    readonly createCollection: ["createCollection"];
    readonly createManagedCollection: ["createManagedCollection"];
    readonly [getAiServiceInfo]: [];
    readonly [sendTrackingEvent]: [];
    readonly [getHTMLForNode]: [];
    readonly [setHTMLForNode]: [];
    readonly [publish]: ["publish"];
    readonly [getDeployments]: [];
    readonly [deploy]: ["deploy"];
    readonly [getChangedPaths]: [];
    readonly [getChangeContributors]: [];
    readonly [createManagedCollection]: ["createManagedCollection"];
    readonly [rejectAllPending]: [];
};
type AllMethods = keyof {
    [K in Method as (typeof methodToMessageTypes)[K] extends [] ? never : K]: (typeof methodToMessageTypes)[K];
};
type ProtectedMethod = AllMethods & string;
type PerMethodPermissionMap = {
    [K in ProtectedMethod]: boolean;
};

type OptimizationStatus = "optimizing" | "optimized" | "error";
interface Publish {
    deploymentTime: number;
    optimizationStatus: OptimizationStatus;
    url: string;
    currentPageUrl: string;
}
interface PublishInfo {
    production: Publish | null;
    staging: Publish | null;
}
interface Deployment {
    id: string;
    createdAt: string;
    updatedAt: string;
}
type HostnameType = "default" | "custom" | "version";
interface Hostname {
    hostname: string;
    type: HostnameType;
    isPrimary: boolean;
    isPublished: boolean;
    deploymentId: string;
}
interface PublishResult {
    deployment: Deployment;
    hostnames: Hostname[];
}

interface RedirectAttributes {
    /** The source path to redirect from */
    from: string;
    /** Whether to expand the redirect to all locales */
    expandToAllLocales: boolean;
}
interface WithToField {
    /** The destination path to redirect to */
    to: string;
}
interface WithNullableToField {
    /** The destination path to redirect to. If the page was removed and the redirect is no longer valid, the value
     * will be set to null */
    to: string | null;
}
interface RedirectData extends RedirectAttributes, WithNullableToField {
    /** The id of the redirect */
    id: string;
}
interface CreateRedirect extends RedirectAttributes, WithToField {
    /** The id of the redirect, if provided, the redirect will be updated, otherwise a new redirect will be created */
    id?: never;
}
interface UpdateRedirect extends Partial<RedirectAttributes>, Partial<WithToField> {
    /** The id of the redirect, if provided, the redirect will be updated, otherwise a new redirect will be created */
    id: string;
}
type RedirectInput = Prettify<CreateRedirect | UpdateRedirect>;
declare class Redirect {
    #private;
    /** The id of the redirect. */
    get id(): string;
    /** The source path to redirect from. */
    get from(): string;
    /** The destination path to redirect to. */
    get to(): string | null;
    /** Whether to expand the redirect to all locales. */
    get expandToAllLocales(): boolean;
    constructor(data: RedirectData, engine: PluginEngine);
    /**
     * Remove the redirect.
     */
    remove(): Promise<void>;
    /**
     * Update the redirect attributes.
     *
     * @returns The updated redirect, or `null` if the redirect was not found.
     */
    setAttributes(attributes: Partial<CreateRedirect>): Promise<Redirect | null>;
}

type ThemeMode = "light" | "dark";
interface ThemeTokens {
    "--framer-color-tint": string;
    "--framer-color-tint-dimmed": string;
    "--framer-color-tint-dark": string;
    "--framer-color-text": string;
    "--framer-color-text-secondary": string;
    "--framer-color-text-tertiary": string;
    "--framer-color-text-reversed": string;
    "--framer-color-bg": string;
    "--framer-color-bg-secondary": string;
    "--framer-color-bg-tertiary": string;
    "--framer-color-divider": string;
    "--framer-color-tint-extra-dark": string;
}
interface Theme {
    mode: ThemeMode;
    tokens: ThemeTokens;
}

type PluginMessageId = number;
declare const allModesRecord: {
    readonly canvas: true;
    readonly image: true;
    readonly editImage: true;
    readonly configureManagedCollection: true;
    readonly syncManagedCollection: true;
    readonly collection: true;
    readonly localization: true;
    readonly code: true;
    readonly api: true;
};
type Mode = keyof typeof allModesRecord;
declare const typeKey = "type";
type TypeKey = typeof typeKey;
interface PluginMethodInvocation {
    [typeKey]: "methodInvocation";
    methodName: keyof PluginMessageAPI;
    id: PluginMessageId;
    args: unknown[];
}
interface PluginSubscribe {
    [typeKey]: "subscribe";
    topic: PluginSubscriptionTopic;
}
interface PluginUnsubscribe {
    [typeKey]: "unsubscribe";
    topic: PluginSubscriptionTopic;
}
interface PluginSubscription {
    [typeKey]: PluginSubscribe[TypeKey] | PluginUnsubscribe[TypeKey];
    topic: PluginSubscriptionTopic;
}
declare const readySignal: {
    readonly type: "pluginReadySignal";
};
type PluginReadySignal = typeof readySignal;
type ReleaseChannel = "alpha" | "beta" | "stable";
interface EnvironmentInfo {
    releaseChannel: ReleaseChannel | null;
    isEmployee: boolean;
}
interface PluginSubscriptionBase {
    [typeKey]: "subscriptionMessage";
    payload: unknown;
}
interface PluginSubscriptionPublishInfo extends PluginSubscriptionBase {
    topic: "publishInfo";
    payload: PublishInfo;
}
interface PluginSubscriptionSelection extends PluginSubscriptionBase {
    topic: "selection";
    payload: SomeNodeData[];
}
interface PluginSubscriptionCanvasRoot extends PluginSubscriptionBase {
    topic: "canvasRoot";
    payload: SomeNodeData;
}
interface PluginSubscriptionImage extends PluginSubscriptionBase {
    topic: "image";
    payload: ImageAssetData | null;
}
interface PluginSubscriptionText extends PluginSubscriptionBase {
    topic: "text";
    payload: string | null;
}
interface PluginSubscriptionCustomHTML extends PluginSubscriptionBase {
    topic: "customCode";
    payload: CustomCode;
}
interface PluginSubscriptionTheme extends PluginSubscriptionBase {
    topic: "theme";
    payload: Theme;
}
interface PluginSubscriptionColorStyle extends PluginSubscriptionBase {
    topic: "colorStyles";
    payload: ColorStyleData[];
}
interface PluginSubscriptionTextStyle extends PluginSubscriptionBase {
    topic: "textStyles";
    payload: TextStyleData[];
}
/** @alpha */
interface PluginSubscriptionRedirects extends PluginSubscriptionBase {
    topic: "redirects";
    payload: RedirectData[];
}
interface PluginSubscriptionCodeFiles extends PluginSubscriptionBase {
    topic: "codeFiles";
    payload: readonly CodeFileData[];
}
/** @alpha */
interface PluginSubscriptionOpenCodeFile extends PluginSubscriptionBase {
    topic: "openCodeFile";
    payload: CodeFileData | null;
}
type PluginSubscriptionEvent = PluginSubscriptionPublishInfo | PluginSubscriptionSelection | PluginSubscriptionCanvasRoot | PluginSubscriptionImage | PluginSubscriptionTheme | PluginSubscriptionText | PluginSubscriptionCustomHTML | PluginSubscriptionColorStyle | PluginSubscriptionTextStyle | /** @alpha */ PluginSubscriptionRedirects | PluginSubscriptionCodeFiles | /** @alpha */ PluginSubscriptionOpenCodeFile;
type PluginSubscriptionTopic = PluginSubscriptionEvent["topic"];
type PluginToVekterMessage = PluginMethodInvocation | PluginSubscription | PluginReadySignal;

type PickModes<T extends Mode> = Extract<Mode, T>;
type InitialState = {
    mode: Mode;
    intent: "plugin/open";
} | {
    mode: PickModes<"collection" | "syncManagedCollection" | "configureManagedCollection">;
    intent: "collection/add";
};

interface SeparatorMenuItem {
    type: "separator";
}
interface NormalMenuItem {
    type?: never;
    label: string;
    secondaryLabel?: string;
    enabled?: boolean;
    visible?: boolean;
    checked?: boolean;
    submenu?: MenuItem[];
    onAction?: () => void;
}
type MenuItem = NormalMenuItem | SeparatorMenuItem;
type NormalMenuItemSerializable = Omit<NormalMenuItem, "onAction" | "submenu"> & {
    actionId?: number;
    submenu?: MenuItemSerializable[];
};
type MenuItemSerializable = NormalMenuItemSerializable | SeparatorMenuItem;
type MenuPlacementVertical = "top" | "bottom";
type MenuPlacementHorizontal = "left" | "right";
type MenuPlacement = MenuPlacementVertical | MenuPlacementHorizontal | `${MenuPlacementVertical}-${MenuPlacementHorizontal}`;
interface ContextMenuConfig {
    /**
     * Coordinates of the anchor point.
     */
    location: {
        x: number;
        y: number;
    };
    /**
     * Placement of the menu relative to the anchor point.
     */
    placement?: MenuPlacement;
    /**
     * Sets fixed width for the menu. If not set, the menu width is based on the content.
     */
    width?: number;
}

type NotificationVariant = "info" | "success" | "error" | "warning";
interface NotifyOptionsBase {
    /** The Notification variant for styling of the notification. Defaults to "info" */
    variant?: NotificationVariant;
    durationMs?: number;
}
interface NotifyOptions extends NotifyOptionsBase {
    /** A button to be displayed on the notification */
    button?: {
        /** The text of the button */
        text: string;
        /** Click handler when the button is pressed */
        onClick: () => void;
    };
    /** A function that is called when the notification disappears */
    onDisappear?: VoidFunction;
}
interface NotifyOptionsData extends NotifyOptionsBase {
    buttonText?: string;
    notificationId: string;
}
interface Notification {
    close: () => Promise<void>;
}
type NotificationCloseReason = "timeoutReachedOrDismissed" | "actionButtonClicked";
type Notify = (message: string, options?: NotifyOptions) => Notification;

/**
 * Options for the `navigateTo` method.
 */
interface NavigableOptions {
    /**
     * Selects the item after navigation (e.g., opens the editor for a CollectionItem or selects it on the canvas).
     * @default true
     */
    select?: boolean | undefined;
    /**
     * Zooms and centers the item after scrolling it into view (only applicable to canvas nodes).
     * @default true
     */
    zoomIntoView?: boolean | ZoomIntoViewOptions | undefined;
    /**
     * Scrolls to and highlights a specific part of the content.
     */
    scrollTo?: NavigableScrollToOptions | undefined;
}
interface NavigableScrollToOptions {
    collectionFieldId?: string;
    codeFilePosition?: CodeFilePosition;
}
interface CodeFilePosition {
    /** Start line number (1-based) */
    startLine: number;
    /** Start column number (1-based) */
    startColumn?: number;
    /** End line number (1-based) */
    endLine?: number;
    /** End column number (1-based) */
    endColumn?: number;
}
/**
 * Represents any object in Framer that can be navigated to, such as FramerNode, CollectionItem, or CodeFile.
 */
interface Navigable {
    /**
     * Navigates to the item in the Framer UI. May switch modes to reveal the relevant view.
     * @param opts Configuration options for the navigation behaviour.
     */
    navigateTo(opts?: NavigableOptions): Promise<void>;
}
type Unsubscribe$1 = VoidFunction;
type Cleanup = VoidFunction;

interface AiServiceInfo {
    endpoint: string;
    token: string;
    expiresAt: string;
}
declare class FramerPluginAPI {
    #private;
    constructor(engine: PluginEngine);
    /** Get the current mode. A plugin can launch in a special mode where only a subset of the API is allowed. */
    get mode(): Mode;
    /**
     * Find out if user's permissions allow them to execute all of `methods`:
     *
     * ```ts
     * if (framer.isAllowedTo("addImage")) await framer.addImage(...)
     * if (framer.isAllowedTo("Collection.setItemOrder")) await collection.setItemOrder(...)
     * ```
     *
     * Note that when the result of the permission check affects the UI, it's better to use the
     * `subscribeToIsAllowedTo` method, or `useIsAllowedTo` if using React.
     */
    isAllowedTo(...methods: [ProtectedMethod, ...ProtectedMethod[]]): boolean;
    /**
     * Subscribe to changes in `framer.isAllowedTo(...methods)`:
     *
     * ```ts
     * console.log(`Initial isAllowed: ${framer.isAllowedTo("addImage")}`)
     * framer.subscribeToIsAllowedTo("addImage", (isAllowed) => {
     *     console.log(`New isAllowed: ${isAllowed}`)
     * })
     * ```
     *
     * Refer to `useIsAllowedTo` for a React hook version of this.
     */
    subscribeToIsAllowedTo(...args: [...methods: [ProtectedMethod, ...ProtectedMethod[]], callback: (isAllowed: boolean) => void]): Unsubscribe$1;
    /** Show the plugin UI. */
    showUI(options?: UIOptions): Promise<void>;
    /** Hide the plugin window, without stopping the plugin. */
    hideUI(): Promise<void>;
    /** Update the background status text shown while the plugin UI is hidden. */
    setBackgroundMessage(status: string | null): Promise<void>;
    /**
     * Stop the plugin. Throws `FramerPluginClosedError`, which should be ignored.
     * @param message - Optional message to show in the notification (ignored if options.silent is true)
     * @param options - Options to control the close behaviour
     */
    closePlugin(message?: string, options?: ClosePluginOptions): never;
    /** Get the current user info like name and id. */
    getCurrentUser(): Promise<User>;
    /** Get the project info like name and id. */
    getProjectInfo(): Promise<ProjectInfo>;
    /** Get the current selection. */
    getSelection(): Promise<CanvasNode[]>;
    /** Set the current selection. */
    setSelection(nodeIds: string | Iterable<string>): Promise<void>;
    /** Subscribe to selection changes. */
    subscribeToSelection(selectionUpdate: (nodes: CanvasNode[]) => void): Unsubscribe$1;
    /** Get the root of the current canvas. */
    getCanvasRoot(): Promise<CanvasRootNode>;
    /** Subscribe to canvas root changes */
    subscribeToCanvasRoot(rootUpdate: (root: CanvasRootNode) => void): Unsubscribe$1;
    /** Get the current publish info. */
    getPublishInfo(): Promise<PublishInfo>;
    /** Subscribe to publish info changes. */
    subscribeToPublishInfo(publishInfoUpdate: (info: PublishInfo) => void): Unsubscribe$1;
    /** Create a new node on the canvas. */
    createFrameNode(attributes: Partial<EditableFrameNodeAttributes>, parentId?: string): Promise<FrameNode | null>;
    /** Remove nodes from the canvas. */
    removeNodes(nodeIds: NodeId[]): Promise<void>;
    /** @deprecated Use `removeNodes` directly. */
    removeNode(nodeId: NodeId): Promise<void>;
    /** Clone a node. */
    cloneNode(nodeId: NodeId): Promise<AnyNode | null>;
    /** Get a node by its id. */
    getNode(nodeId: NodeId): Promise<AnyNode | null>;
    /** Get the parent of a node. */
    getParent(nodeId: NodeId): Promise<AnyNode | null>;
    /** Get the children of a node. */
    getChildren(nodeId: NodeId): Promise<CanvasNode[]>;
    /** Get the rect of a node */
    getRect(nodeId: NodeId): Promise<Rect$1 | null>;
    /** Pans and zooms the viewport to center a single or group of nodes. */
    zoomIntoView(nodeIds: NodeId | Iterable<NodeId>, options?: ZoomIntoViewOptions): Promise<void>;
    /** Set the attributes of a node. */
    setAttributes(nodeId: NodeId, attributes: Partial<AnyEditableAttributes>): Promise<AnyNode | null>;
    /** Set the parent of a node. */
    setParent(nodeId: NodeId, parentId: NodeId, index?: number | undefined): Promise<void>;
    /** Get all nodes of a certain class. */
    getNodesWithType(type: "FrameNode"): Promise<FrameNode[]>;
    getNodesWithType(type: "TextNode"): Promise<TextNode[]>;
    getNodesWithType(type: "SVGNode"): Promise<SVGNode[]>;
    getNodesWithType(type: "ComponentInstanceNode"): Promise<ComponentInstanceNode[]>;
    getNodesWithType(type: "WebPageNode"): Promise<WebPageNode[]>;
    getNodesWithType(type: "DesignPageNode"): Promise<DesignPageNode[]>;
    getNodesWithType(type: "ComponentNode"): Promise<ComponentNode[]>;
    /** Get all nodes with a certain attribute. */
    getNodesWithAttribute<T extends NodeAttributeKey, Node = NodeWithAttribute<T>>(attribute: T): Promise<Node[]>;
    /** Get all nodes with a certain attribute which value is set. */
    getNodesWithAttributeSet<T extends NodeAttributeKey, Node = NodeWithAttribute<T>>(attribute: T): Promise<Node[]>;
    /** Get the image of the current selection or null if there is no image. */
    getImage(): Promise<ImageAsset | null>;
    /** Subscribe to single image selection changes. */
    subscribeToImage(imageUpdate: (image: ImageAsset | null) => void): Unsubscribe$1;
    /** Upload an image, and insert on the canvas. */
    addImage(image: NamedImageAssetInput | File): Promise<void>;
    /** Upload an image, and set on the selected node. */
    setImage(image: NamedImageAssetInput | File): Promise<void>;
    /** Upload an image without assigning it to a property. */
    uploadImage(image: NamedImageAssetInput | File): Promise<ImageAsset>;
    /** Add multiple images, replacing the selected images, or insert on the canvas. */
    addImages(images: readonly NamedImageAssetInput[]): Promise<void>;
    /** Upload multiple images without assigning them to properties. */
    uploadImages(images: readonly NamedImageAssetInput[]): Promise<ImageAsset[]>;
    /** Uploads a file without assigning it to a property. */
    uploadFile(file: NamedFileAssetInput | File): Promise<FileAsset>;
    /** Upload multiple files without assigning them to properties. */
    uploadFiles(files: readonly NamedFileAssetInput[]): Promise<FileAsset[]>;
    /** Add an SVG, replacing the selected SVG, or insert on the canvas. */
    addSVG(svg: SVGData): Promise<void>;
    /** Add a component instance by module URL. */
    addComponentInstance({ url, attributes, parentId, }: AddComponentInstanceOptions): Promise<ComponentInstanceNode>;
    /** Adds the layers of a component by module URL. */
    addDetachedComponentLayers({ url, layout, attributes }: AddDetachedComponentLayersOptions): Promise<FrameNode>;
    /** Preload the component layers for detached insertion. */
    preloadDetachedComponentLayers(url: string): Promise<void>;
    preloadImageUrlForInsertion(url: string): Promise<void>;
    preloadDragPreviewImage(url: string): Promise<void>;
    /** Get plaintext of the current selection or null if there is no text. */
    getText(): Promise<string | null>;
    /** Set the text of the current selection or insert it onto the canvas. */
    setText(text: string): Promise<void>;
    /** Add a new text node to the canvas. */
    addText(text: string, options?: AddTextOptions): Promise<void>;
    /**
     * Set Custom HTML to be loaded in the document. A plugin can only set custom HTML once per
     * location.
     */
    setCustomCode(options: SetCustomCodeOptions): Promise<void>;
    /** Get custom HTML settings set by the plugin. */
    getCustomCode(): Promise<CustomCode>;
    /** Subscribe to custom HTML changes set by the plugin. */
    subscribeToCustomCode(callback: (customHTML: CustomCode) => void): Unsubscribe$1;
    /** Subscribe to the current text selection. */
    subscribeToText(callback: (text: string | null) => void): Unsubscribe$1;
    /**
     * Allow any HTML element to become draggable. Different types of drag data can be dropped onto
     * Framer. A function is returned to remove the draggable behavior from the element and to stop
     * all of the added listeners.
     */
    makeDraggable(element: HTMLElement, getDragData: () => DragData, onDragComplete?: DragCompleteCallback): Cleanup;
    /** Get the managed collection that is currently active and selected in the UI. */
    getActiveManagedCollection(): Promise<ManagedCollection>;
    /** @deprecated Use `getActiveManagedCollection` */
    getManagedCollection(): Promise<ManagedCollection>;
    /** Get all collections managed by your plugin. */
    getManagedCollections(): Promise<ManagedCollection[]>;
    /** Get a collection by its id. */
    getCollection(id: NodeId): Promise<Collection | null>;
    /** Get the collection that is currently selected in the UI. */
    getActiveCollection(): Promise<Collection | null>;
    /**
     * Get all collections in the project. This includes collections created by the user or a
     * plugin.
     */
    getCollections(): Promise<Collection[]>;
    /**
     * Display a notification message. The message will be truncated if longer than 120 characters.
     */
    notify: Notify;
    /** Get plugin data by key. */
    getPluginData(key: string): Promise<string | null>;
    /** Set plugin data by key. */
    setPluginData(key: string, value: string | null): Promise<void>;
    /** Get all plugin data keys. */
    getPluginDataKeys(): Promise<string[]>;
    /** Get all color styles in the project. */
    getColorStyles(): Promise<ColorStyle[]>;
    /** Get a specific color style. */
    getColorStyle(id: NodeId): Promise<ColorStyle | null>;
    /** Add a new color style to the project. */
    createColorStyle(attributes: ColorStyleAttributes): Promise<ColorStyle>;
    /** Fired when a color style is added, edited or removed. */
    subscribeToColorStyles(callback: (styles: ColorStyle[]) => void): Unsubscribe$1;
    /** Get all text styles in the project. */
    getTextStyles(): Promise<TextStyle[]>;
    /** Get a specific text style. */
    getTextStyle(id: NodeId): Promise<TextStyle | null>;
    /** Add a new text style to the project. */
    createTextStyle(attributes: TextStyleAttributes): Promise<TextStyle>;
    /** Fired when a text style is added, edited or removed. */
    subscribeToTextStyles(callback: (styles: TextStyle[]) => void): Unsubscribe$1;
    /** Get a specific font via it's family name, and optionally weight and style. */
    getFont(family: string, attributes?: FontAttributes): Promise<Font | null>;
    /** Get all available fonts. */
    getFonts(): Promise<Font[]>;
    /** Get all locales in the current Project */
    getLocales(): Promise<readonly Locale[]>;
    /** Get the default locale of the current Project */
    getDefaultLocale(): Promise<Locale>;
    /**
     * Get the currently active locale.
     *
     * - In "localization" mode, the active locale is the locale selected in the Localizations panel.
     * - In "canvas" mode, the active locale is the locale selected in the toolbar.
     * - Otherwise, the active locale is null.
     */
    getActiveLocale(): Promise<Locale | null>;
    /** Get all localization groups in the current Project */
    getLocalizationGroups(): Promise<readonly LocalizationGroup[]>;
    /** Update localization data */
    setLocalizationData(update: LocalizationData): Promise<SetLocalizationDataResult>;
    /** Get all redirects in the project */
    getRedirects(): Promise<readonly Redirect[]>;
    /** Add new redirects or update existing ones if their IDs match */
    subscribeToRedirects(callback: (redirects: Redirect[]) => void): Unsubscribe$1;
    /** Add new redirects or update existing ones if their IDs match */
    addRedirects(redirects: RedirectInput[]): Promise<Redirect[]>;
    /** Remove a redirect from the project */
    removeRedirects(redirectIds: string[]): Promise<void>;
    /** Set the order of redirects */
    setRedirectOrder(redirectIds: string[]): Promise<void>;
    /** Create a new code file */
    createCodeFile(name: string, code: string, options?: {
        editViaPlugin?: boolean;
    }): Promise<CodeFile>;
    /** Get an array of all code files  */
    getCodeFiles(): Promise<readonly CodeFile[]>;
    /** Get a specific code file */
    getCodeFile(id: string): Promise<CodeFile | null>;
    /**
     * Lint a code file and return the diagnostics.
     *
     * @param fileName - The name of the code file, must include the extension. Use `*.tsx` for TSX files, otherwise the React JSX syntax will be rejected.
     * @param content - The content of the code file.
     * @param rules - The rules to use for linting.
     *
     * @deprecated The implementation of this method was removed. The method will always return an empty array. The method will be removed in the near future.
     */
    lintCode(_fileName: string, _content: string, _rules: LintConfig): Promise<LintDiagnostic[]>;
    /**
     * Type check a code file and return the diagnostics.
     *
     * @param fileName - The name of the code file, must include the extension. Use `*.tsx` for TSX files, otherwise the React JSX syntax will be rejected.
     * @param content - The content of the code file.
     * @param compilerOptions - Optional compiler options to override the default compiler options for type checking.
     * @param sessionId - Optional session ID. Pass it when repeatedly type checking the same file. If not provided, a new session will be created for each type check, which is slow.
     */
    typecheckCode(fileName: string, content: string, compilerOptions?: ts.server.protocol.CompilerOptions, sessionId?: string): Promise<TypecheckDiagnostic[]>;
    /**
     * Subscribe to changes in code files.
     * This will be called when code files are added, removed, or updated and will return an array of
     * all code files in the project.
     */
    subscribeToCodeFiles(callback: (codeFiles: readonly CodeFile[]) => void): Unsubscribe$1;
    /**
     * Set the plugin's menu, which is shown in the plugin window header.
     */
    setMenu(menuItems: MenuItem[]): Promise<void>;
    /**
     * Show a context menu at the given location.
     */
    showContextMenu(menuItems: MenuItem[], config: ContextMenuConfig): Promise<void>;
    /**
     * Updates the version of the given dependency to the
     * specified version.
     *
     * WARNING: This API is unstable and may change or break in the future
     */
    unstable_ensureMinimumDependencyVersion(packageName: string, version: string): Promise<void>;
    /**
     * Navigate to a node by ID with optional selection and zoom behaviour.
     *
     * @param nodeId - The ID of the node to navigate to.
     * @param opts - The options for the navigation.
     * @returns A promise that resolves when the navigation is complete.
     */
    navigateTo(nodeId: string, opts?: NavigableOptions): Promise<void>;
    /**
     * Subscribe to the currently open code file in the Code Editor.
     *
     * @param callback - The callback to call when the code file changes.
     * @returns A function to unsubscribe from the subscription.
     */
    subscribeToOpenCodeFile(callback: (codeFile: CodeFile | null) => void): Unsubscribe$1;
    /**
     * Create a new design page.
     *
     * If you want to open the newly created design page, you can `.navigateTo()` the page after creation.
     *
     * @example
     * ```ts
     * const designPage = await framer.createDesignPage("About")
     * await designPage.navigateTo()
     * ```
     */
    createDesignPage(pageName: string): Promise<DesignPageNode>;
    /**
     * Create a new web page.
     *
     * If you want to open the newly created web page, you can `.navigateTo()` the page after creation.
     *
     * @example
     * ```ts
     * const webPage = await framer.createWebPage("/about")
     * await webPage.navigateTo()
     * ```
     */
    createWebPage(pagePath: string): Promise<WebPageNode>;
    /**
     * Create a new collection.
     */
    createCollection(name: string): Promise<Collection>;
    /**
     * Create a new managed collection.
     */
    createManagedCollection(name: string): Promise<ManagedCollection>;
    /**
     * Set a warning message to show when the user attempts to close the plugin. Set to false to disable.
     * - `string` to enable with a custom message.
     * - `false` to disable.
     * */
    setCloseWarning(message: string | false): Promise<void>;
    /**
     * Initial state data passed from Vekter during handshake.
     */
    get [$framerInternal.initialState](): InitialState;
}
/** @beta */
declare class FramerPluginAPIBeta extends FramerPluginAPI {
    #private;
    constructor(engine: PluginEngine);
}
/** @alpha */
declare class FramerPluginAPIAlpha extends FramerPluginAPIBeta {
    #private;
    constructor(engine: PluginEngine);
    /**
     * Adds a new component instance placeholder.
     *
     * @param attributes - The attributes of the component instance placeholder.
     * @returns The component instance placeholder.
     */
    addComponentInstancePlaceholder(attributes?: ComponentInstancePlaceholderAttributes): Promise<ComponentInstancePlaceholder>;
    [$framerInternal.getAiServiceInfo](): Promise<AiServiceInfo>;
    /** @internal */
    [$framerInternal.sendTrackingEvent](key: string, value: string, identifier: string): Promise<void>;
    /** @internal */
    [$framerInternal.getHTMLForNode](nodeId: NodeId): Promise<string | null>;
    /** @internal */
    [$framerInternal.setHTMLForNode](nodeId: NodeId, html: string): Promise<void>;
    /** @internal */
    get [$framerInternal.environmentInfo](): EnvironmentInfo | null;
    /** @internal */
    get [$framerInternal.showUncheckedPermissionToasts](): boolean;
    /** @internal */
    set [$framerInternal.showUncheckedPermissionToasts](value: boolean);
    /**
     * Create a new text node on the canvas.
     *
     * @alpha
     * @param attributes - The attributes of the node.
     * @param parentId - The id of the parent node.
     * @returns The created node.
     */
    createTextNode(attributes: Partial<EditableTextNodeAttributes>, parentId?: string): Promise<TextNode | null>;
    /**
     * Create a new smart component node.
     *
     * @alpha
     * @param name - The name of the node.
     * @param attributes - The attributes of the node.
     * @returns The created node.
     */
    createComponentNode(name: string): Promise<ComponentNode | null>;
    /**
     * Get all available vector sets.
     *
     * @alpha
     */
    getVectorSets(): Promise<VectorSet[]>;
    /** @internal - Available only through framer-api */
    [$framerApiOnly.publish](): Promise<PublishResult>;
    /** @internal - Available only through framer-api */
    [$framerApiOnly.getDeployments](): Promise<Deployment[]>;
    /** @internal - Available only through framer-api */
    [$framerApiOnly.deploy](deploymentId: string, domains?: string[]): Promise<Hostname[]>;
    /** @internal - Available only through framer-api */
    [$framerApiOnly.getChangedPaths](): Promise<{
        added: string[];
        removed: string[];
        modified: string[];
    }>;
    /** @internal - Available only through framer-api */
    [$framerApiOnly.getChangeContributors](fromVersion?: number, toVersion?: number): Promise<string[]>;
    /**
     * @deprecated Use `createManagedCollection` instead.
     * @internal - Available only through framer-api
     * */
    [$framerApiOnly.createManagedCollection](name: string): Promise<ManagedCollection>;
    /** @internal - Rejects all pending method calls with the given error */
    [$framerApiOnly.rejectAllPending](error: FramerPluginError): void;
}
/**
 * Methods that are only available through framer-api (server API),
 * not through the plugin API.
 */
type FramerApiOnlyMethods = {
    [K in keyof typeof $framerApiOnly]: FramerPluginAPIAlpha[(typeof $framerApiOnly)[K]];
};
interface UIOptions {
    /** The preferred UI width. */
    width?: number;
    /** The preferred UI height. */
    height?: number;
    /** The initial window position, defaults to top left. */
    position?: "center" | "top left" | "bottom left" | "top right" | "bottom right";
    /** Whether the UI is resizable. */
    resizable?: true | false | "width" | "height";
    /** Minimum UI width. */
    minWidth?: number;
    /** Minimum UI height. */
    minHeight?: number;
    /** Maximum UI width. */
    maxWidth?: number;
    /** Maximum UI height. */
    maxHeight?: number;
}
interface ClosePluginOptions {
    variant?: NotificationVariant;
    /** When true, closes the plugin without showing a toast. */
    silent?: boolean;
}
interface ApiVersion1ProjectInfo {
    name: string;
    /** Hashed project id */
    id: string;
}
interface ProjectInfo extends ApiVersion1ProjectInfo {
    /** Hashed project id served by API version 1, use for migration only */
    apiVersion1Id: string;
}
interface AddComponentInstanceOptions {
    /** The component module URL. Can be copied from the components panel. */
    url: string;
    /** Optional component attributes. */
    attributes?: Partial<EditableComponentInstanceNodeAttributes>;
    /**
     * Optional parent node ID where the component instance should be inserted.
     * If not provided, the component will be inserted at the default location based on the current selection.
     *
     * @alpha
     */
    parentId?: string;
}
interface AddDetachedComponentLayersOptions {
    /** The component module URL. Can be copied from the components panel. */
    url: string;
    /** Optional component attributes. */
    attributes?: Partial<EditableComponentInstanceNodeAttributes>;
    /** Insert the layers as a layout block and match variants with breakpoints. */
    layout?: boolean;
}
type Extends<T, U extends T> = U;
type CreateNodeType = Extends<PluginNodeClass, "FrameNode" | "TextNode" | "ComponentNode">;
type ComponentDragData = Omit<Extract<DragData, {
    type: "componentInstance";
}>, "attributes"> & {
    attributes?: Record<string, unknown>;
};
type OtherDragData = Exclude<DragData, {
    type: "componentInstance";
}>;
type MessageApiDragData = ComponentDragData | OtherDragData;
interface PluginMessageAPI {
    hideUI: FramerPluginAPI["hideUI"];
    setBackgroundMessage: FramerPluginAPI["setBackgroundMessage"];
    setCloseWarning: (message: string | false) => Promise<void>;
    closePlugin: (...parameters: Parameters<FramerPluginAPI["closePlugin"]>) => Promise<void>;
    removeNode: FramerPluginAPI["removeNode"];
    removeNodes: FramerPluginAPI["removeNodes"];
    addSVG: FramerPluginAPI["addSVG"];
    getRect: FramerPluginAPI["getRect"];
    setText: FramerPluginAPI["setText"];
    getText: FramerPluginAPI["getText"];
    addText: FramerPluginAPI["addText"];
    preloadDetachedComponentLayers: FramerPluginAPI["preloadDetachedComponentLayers"];
    preloadImageUrlForInsertion: FramerPluginAPI["preloadImageUrlForInsertion"];
    preloadDragPreviewImage: FramerPluginAPI["preloadDragPreviewImage"];
    setCustomCode: FramerPluginAPI["setCustomCode"];
    getCustomCode: FramerPluginAPI["getCustomCode"];
    setPluginData: FramerPluginAPI["setPluginData"];
    getPluginData: FramerPluginAPI["getPluginData"];
    getPluginDataKeys: FramerPluginAPI["getPluginDataKeys"];
    getLocales: FramerPluginAPI["getLocales"];
    getDefaultLocale: FramerPluginAPI["getDefaultLocale"];
    getActiveLocale: FramerPluginAPI["getActiveLocale"];
    getLocalizationGroups: FramerPluginAPI["getLocalizationGroups"];
    setLocalizationData: FramerPluginAPI["setLocalizationData"];
    unstable_ensureMinimumDependencyVersion: FramerPluginAPI["unstable_ensureMinimumDependencyVersion"];
    showUI: (options?: UIOptions) => Promise<void>;
    notify: (message: string, options: NotifyOptionsData) => Promise<NotificationCloseReason>;
    closeNotification: (notificationId: string) => Promise<void>;
    getCurrentUser(): Promise<ApiVersion1User>;
    getCurrentUser2(): Promise<User>;
    getProjectInfo(): Promise<ApiVersion1ProjectInfo>;
    getProjectInfo2(): Promise<ProjectInfo>;
    getSelection: () => Promise<SomeNodeData[]>;
    setSelection: (nodeIds: NodeId[]) => Promise<void>;
    getCanvasRoot: () => Promise<SomeNodeData>;
    getPublishInfo: () => Promise<PublishInfo>;
    createNode: (type: CreateNodeType, parentId: NodeId | null, attributes: Record<string, unknown>) => Promise<SomeNodeData | null>;
    cloneNode: (nodeId: NodeId) => Promise<SomeNodeData | null>;
    getNode: (nodeId: NodeId) => Promise<SomeNodeData | null>;
    getParent: (nodeId: NodeId) => Promise<SomeNodeData | null>;
    getChildren: (nodeId: NodeId) => Promise<SomeNodeData[]>;
    removeNodes2: (ids: NodeId[]) => Promise<void>;
    zoomIntoView: (nodeIds: NodeId[], options?: ZoomIntoViewOptions) => Promise<void>;
    navigateTo: (nodeId: string, opts?: NavigableOptions) => Promise<void>;
    setAttributes: (nodeId: NodeId, attributes: Record<string, unknown>) => Promise<SomeNodeData | null>;
    getTextForNode(nodeId: NodeId): Promise<string | null>;
    setTextForNode(nodeId: NodeId, text: string): Promise<void>;
    getSVGForNode: (nodeId: NodeId) => Promise<string | null>;
    getNodesWithType: (nodeId: NodeId | null, type: KnownNodeClass) => Promise<SomeNodeData[]>;
    getNodesWithAttribute: (nodeId: NodeId | null, attribute: string) => Promise<SomeNodeData[]>;
    getNodesWithAttributeSet: (nodeId: NodeId | null, attribute: string) => Promise<SomeNodeData[]>;
    addImages: (image: readonly NamedImageTransfer[]) => Promise<void>;
    getImage(): Promise<ImageAssetData | null>;
    addImage(image: NamedImageTransfer): Promise<void>;
    setImage(image: NamedImageTransfer): Promise<void>;
    uploadImage(image: NamedImageTransfer): Promise<ImageAssetData>;
    uploadImages: (image: readonly NamedImageTransfer[]) => Promise<ImageAssetData[]>;
    uploadFile: (file: NamedAssetTransfer) => Promise<FileAssetData>;
    uploadFiles: (files: readonly NamedAssetTransfer[]) => Promise<FileAssetData[]>;
    getImageData: (image: AssetIdentifier & Partial<Pick<ImageAssetData, "resolution">>) => Promise<BytesData>;
    setParent: (nodeId: NodeId, parentId: NodeId, index?: number) => Promise<void>;
    addComponentInstance: (options: {
        url: string;
        attributes?: Partial<Record<string, unknown>>;
        parentId?: string;
    }) => Promise<SomeNodeData>;
    addDetachedComponentLayers: (options: {
        url: string;
        layout?: boolean;
        attributes?: Partial<Record<string, unknown>>;
    }) => Promise<SomeNodeData>;
    setDragData: (dragSessionId: string, dragData: MessageApiDragData) => Promise<void>;
    onDragStart: (info: DragStartInfo) => Promise<void>;
    onDrag: (info: DragInfo) => Promise<string | null>;
    onDragEnd: (info: DragEndInfo) => Promise<DragCompleteResult>;
    onPointerDown: () => Promise<void>;
    getActiveManagedCollection: () => Promise<CollectionData>;
    /** @deprecated Use getActiveManagedCollection */
    getManagedCollection: () => Promise<CollectionData>;
    getManagedCollections: () => Promise<CollectionData[]>;
    getManagedCollectionItemIds: (id: NodeId) => Promise<string[]>;
    setManagedCollectionItemOrder: (id: NodeId, ids: string[]) => Promise<void>;
    setManagedCollectionFields: (id: NodeId, fields: ManagedCollectionFieldInputData[]) => Promise<void>;
    getManagedCollectionFields: (id: NodeId) => Promise<ManagedCollectionField[]>;
    getManagedCollectionFields2: (id: NodeId) => Promise<ManagedCollectionField[]>;
    addManagedCollectionItems: (id: NodeId, items: ApiV2ManagedCollectionItemInput[]) => Promise<void>;
    addManagedCollectionItems2: (id: NodeId, items: ManagedCollectionItemInput[]) => Promise<void>;
    removeManagedCollectionItems: (id: NodeId, itemIds: string[]) => Promise<void>;
    createCollection: (name: string) => Promise<CollectionData>;
    getCollection: (id: NodeId) => Promise<CollectionData | null>;
    getActiveCollection: () => Promise<CollectionData | null>;
    getCollections: () => Promise<CollectionData[]>;
    getCollectionItems: (id: NodeId) => Promise<ApiV2CollectionItemData[]>;
    getCollectionItems2: (id: NodeId) => Promise<CollectionItemSerializableData[]>;
    setCollectionItemOrder: (collectionId: NodeId, itemIds: NodeId[]) => Promise<void>;
    getCollectionFields: (collectionId: string, includeDividers?: true) => Promise<FieldDefinitionData[]>;
    getCollectionFields2: (collectionId: string, includeDividers?: true) => Promise<FieldDefinitionData[]>;
    addCollectionFields: (collectionId: string, fields: FieldInput[]) => Promise<(FieldDefinitionData | null)[]>;
    addCollectionFields2: (collectionId: string, fields: FieldInput[]) => Promise<(FieldDefinitionData | null)[]>;
    removeCollectionFields: (collectionId: string, fieldIds: string[]) => Promise<void>;
    setCollectionFieldOrder: (collectionId: string, fieldIds: string[]) => Promise<void>;
    addCollectionItems: (id: NodeId, items: ApiV2CollectionItemInput[]) => Promise<ApiV2CollectionItemData[]>;
    addCollectionItems2: (id: NodeId, items: CollectionItemInput[]) => Promise<CollectionItemSerializableData[]>;
    setCollectionItemAttributes: (id: NodeId, attributes: ApiV2EditableCollectionItemAttributes) => Promise<ApiV2CollectionItemData | null>;
    setCollectionItemAttributes2: (id: NodeId, attributes: EditableCollectionItemAttributes) => Promise<CollectionItemSerializableData | null>;
    setActiveCollection: (collectionId: NodeId) => Promise<void>;
    removeCollectionItems: (ids: NodeId[]) => Promise<void>;
    /** @alpha */
    getActiveCollectionItemForWebPage: (webPageNodeId: NodeId) => Promise<CollectionItemSerializableData | null>;
    addEnumCase: (collectionId: string, fieldId: string, attributes: CreateEnumCase) => Promise<EnumCaseData | null>;
    updateEnumCase: (collectionId: string, fieldId: string, caseId: string, attributes: UpdateEnumCase) => Promise<EnumCaseData | null>;
    removeEnumCase: (collectionId: string, fieldId: string, caseId: string) => Promise<void>;
    setEnumCaseOrder: (collectionId: string, fieldId: string, caseIds: string[]) => Promise<void>;
    getPluginDataForNode: (id: NodeId, key: string) => Promise<string | null>;
    setPluginDataForNode: (id: NodeId, key: string, value: string | null) => Promise<void>;
    getPluginDataKeysForNode: (id: NodeId) => Promise<string[]>;
    getColorStyle(id: NodeId): Promise<ColorStyleData | null>;
    getColorStyles(): Promise<ColorStyleData[]>;
    createColorStyle(attributes: Record<string, unknown>): Promise<ColorStyleData>;
    setColorStyleAttributes(id: NodeId, update: Record<string, unknown>): Promise<ColorStyleData | null>;
    removeColorStyle(id: NodeId): Promise<void>;
    getTextStyle: (id: NodeId) => Promise<TextStyleData | null>;
    getTextStyles: () => Promise<TextStyleData[]>;
    createTextStyle: (attributes: Record<string, unknown>) => Promise<TextStyleData>;
    setTextStyleAttributes: (id: NodeId, update: Record<string, unknown>) => Promise<TextStyleData | null>;
    removeTextStyle: (id: NodeId) => Promise<void>;
    getFont: (family: string, attributes?: Record<string, unknown>) => Promise<FontData | null>;
    getFonts: () => Promise<FontData[]>;
    /** @deprecated */
    unstable_createCodeFile: (name: string, code: string) => Promise<CodeFileData>;
    /** @deprecated */
    unstable_getCodeFiles: () => Promise<readonly CodeFileData[]>;
    /** @deprecated */
    unstable_getCodeFile: (id: string) => Promise<CodeFileData | null>;
    /** @deprecated */
    unstable_renameCodeFile: (id: string, newName: string) => Promise<CodeFileData>;
    /** @deprecated */
    unstable_removeCodeFile: (id: string) => Promise<void>;
    /** @deprecated */
    unstable_setCodeFileContent: (id: string, code: string) => Promise<CodeFileData>;
    /** @deprecated */
    unstable_getCodeFileVersions: (id: string) => Promise<readonly CodeFileVersionData[]>;
    /** @deprecated */
    unstable_getCodeFileVersionContent: (fileId: string, versionId: string) => Promise<string>;
    /** @deprecated */
    unstable_getCodeFileLint2(fileName: string, content: string, rules: LintConfig): Promise<LintDiagnostic[]>;
    /** @deprecated */
    unstable_getCodeFileTypecheck2(fileName: string, content: string, compilerOptions?: ts.server.protocol.CompilerOptions): Promise<TypecheckDiagnostic[]>;
    createCodeFile: (name: string, code: string, options?: {
        editViaPlugin?: boolean;
    }) => Promise<CodeFileData>;
    getCodeFiles: () => Promise<readonly CodeFileData[]>;
    getCodeFile: (id: string) => Promise<CodeFileData | null>;
    renameCodeFile: (id: string, newName: string) => Promise<CodeFileData>;
    removeCodeFile: (id: string) => Promise<void>;
    setCodeFileContent: (id: string, code: string) => Promise<CodeFileData>;
    getCodeFileVersions: (id: string) => Promise<readonly CodeFileVersionData[]>;
    getCodeFileVersionContent: (fileId: string, versionId: string) => Promise<string>;
    /** @deprecated The lintCode API was removed. */
    lintCode(fileName: string, content: string, rules: LintConfig): Promise<LintDiagnostic[]>;
    typecheckCode(fileName: string, content: string, compilerOptions?: ts.server.protocol.CompilerOptions, sessionId?: string): Promise<TypecheckDiagnostic[]>;
    addRedirects: (redirects: RedirectInput[]) => Promise<RedirectData[]>;
    getRedirects: () => Promise<readonly RedirectData[]>;
    setRedirectOrder: (redirectIds: string[]) => Promise<void>;
    removeRedirects: (redirectIds: string[]) => Promise<void>;
    /** @deprecated Use `getRuntimeErrorForCodeComponentNode` instead. Can be removed when Workshop is updated. */
    getRuntimeErrorForModule: (moduleIdentifier: string) => Promise<string | null>;
    getRuntimeErrorForCodeComponentNode: (nodeId: NodeId) => Promise<NodeRuntimeErrorResult | null>;
    addComponentInstancePlaceholder: (attributes?: ComponentInstancePlaceholderAttributes) => Promise<ComponentInstancePlaceholderData>;
    updateComponentInstancePlaceholder: (id: string, attributes: ComponentInstancePlaceholderAttributes) => Promise<ComponentInstancePlaceholderData | null>;
    removeComponentInstancePlaceholder: (id: string) => Promise<void>;
    replaceComponentInstancePlaceholderWithComponentInstance: (id: string, url: string, attributes?: Partial<EditableComponentInstanceNodeAttributes>) => Promise<SomeNodeData | null>;
    showProgressOnInstances: (codeFileId: string, attributes?: ShowProgressOnInstancesAttributes) => Promise<void>;
    removeProgressFromInstances: (codeFileId: string) => Promise<void>;
    setMenu: (menuItems: MenuItemSerializable[]) => Promise<void>;
    showContextMenu: (menuItems: MenuItemSerializable[], config: ContextMenuConfig) => Promise<void>;
    /** @alpha */
    publish: () => Promise<PublishResult>;
    /** @alpha */
    getDeployments: () => Promise<Deployment[]>;
    /** @alpha */
    deploy: (deploymentId: string, domains?: string[]) => Promise<Hostname[]>;
    /** @alpha */
    getChangedPaths: () => Promise<{
        added: string[];
        removed: string[];
        modified: string[];
    }>;
    /** @alpha */
    getChangeContributors: (fromVersion?: number, toVersion?: number) => Promise<string[]>;
    /** @alpha */
    createManagedCollection: (name: string) => Promise<CollectionData>;
    [getAiServiceInfoMessageType]: () => Promise<AiServiceInfo>;
    [sendTrackingEventMessageType]: (key: string, value: string, identifier: string) => Promise<void>;
    [getHTMLForNodeMessageType]: (nodeId: NodeId) => Promise<string | null>;
    [setHTMLForNodeMessageType]: (nodeId: NodeId, html: string) => Promise<void>;
    /** @deprecated Use `getAiServiceInfoMessageType`. */
    getAiServiceInfo: () => Promise<AiServiceInfo>;
    /** @deprecated Use `sendTrackingEventMessageType`. */
    sendTrackingEvent: (key: string, value: string, identifier: string) => Promise<void>;
    /** @alpha */
    addVariantToComponent: (componentId: NodeId, basedOn: NodeId, attributes?: unknown) => Promise<SomeNodeData>;
    /** @alpha */
    addGestureVariantToComponent: (componentId: NodeId, nodeId: NodeId, type: "hover" | "pressed", attributes?: unknown) => Promise<SomeNodeData>;
    /** @alpha */
    addBreakpointToWebPage: (nodeId: NodeId, basedOn: NodeId, breakpoint: Breakpoint) => Promise<SomeNodeData>;
    /** @alpha */
    getBreakpointSuggestionsForWebPage: (nodeId: NodeId) => Promise<readonly Breakpoint[]>;
    /** @alpha */
    getVariables: (nodeId: string) => Promise<VariableData[]>;
    /** @alpha */
    addVariables: (nodeId: string, pluginCreateVariables: Marshaled<CreateVariable[]>) => Promise<VariableData[]>;
    /** @alpha */
    updateVariable: (nodeId: string, variableId: string, pluginUpdateVariable: Marshaled<UpdateVariable>) => Promise<VariableData | null>;
    /** @alpha */
    removeVariables: (nodeId: string, variableIds: string[]) => Promise<void>;
    /** @alpha */
    setVariableOrder: (nodeId: string, variableIds: string[]) => Promise<void>;
    /** @alpha */
    getVectorSets: () => Promise<VectorSetData[]>;
    /** @alpha */
    getVectorSetItems: (vectorSetId: string) => Promise<VectorSetItemData[]>;
    /** @alpha */
    getVectorSetItemVariables: (vectorSetItemId: string, moduleId: string) => Promise<VectorSetItemVariable[]>;
    createDesignPage: (pageName: string) => Promise<SomeNodeData>;
    createWebPage: (pagePath: string) => Promise<SomeNodeData>;
}

type Unsubscribe = VoidFunction;
type PostMessage = (message: PluginToVekterMessage, transfer?: Transferable[] | undefined) => void;
interface PluginApiTransport {
    send: (message: PluginToVekterMessage, transfer?: Transferable[]) => void;
    onMessage: (handler: (event: unknown) => void) => void;
}
interface PluginApiContext {
    transport: PluginApiTransport;
    mode: Mode;
    permissionMap: PermissionMap;
    environmentInfo: EnvironmentInfo | null;
    origin: string | null;
    theme: Theme | null;
    initialState: InitialState | null;
}
declare class PluginEngine {
    methodInvocationId: number;
    notificationId: number;
    readonly postMessage: PostMessage;
    readonly methodResponseHandlers: Map<number, {
        resolve: (value: any) => void;
        reject: (error: FramerPluginError) => void;
    }>;
    readonly mode: Mode;
    readonly subscriptions: Map<"text" | "image" | "publishInfo" | "selection" | "canvasRoot" | "theme" | "customCode" | "colorStyles" | "textStyles" | "redirects" | "codeFiles" | "openCodeFile", Set<(value: any) => void>>;
    perMethodPermissionMap: PerMethodPermissionMap;
    readonly permissionSubscriptions: Set<VoidFunction>;
    readonly messageTypesCheckedInIsAllowedTo: Set<ProtectedMessageType>;
    showUncheckedPermissionToasts: boolean;
    readonly environmentInfo: EnvironmentInfo | null;
    /** @internal - Initial state passed from Vekter during handshake. */
    readonly initialState: InitialState;
    menuItemOnActionCallbackMap: Map<number, () => void>;
    contextMenuItemOnActionCallbackMap: Map<number, () => void>;
    rejectAllPending(error: Error): void;
    constructor(context?: PluginApiContext);
    invoke<MessageType extends keyof PluginMessageAPI>(messageType: MessageType, ...args: Parameters<PluginMessageAPI[MessageType]>): Promise<Awaited<ReturnType<PluginMessageAPI[MessageType]>>>;
    invokeTransferable<MessageType extends keyof PluginMessageAPI>(messageType: MessageType, transfer: Transferable[] | undefined, ...args: Parameters<PluginMessageAPI[MessageType]>): Promise<Awaited<ReturnType<PluginMessageAPI[MessageType]>>>;
    subscribe<Topic extends PluginSubscriptionTopic>(topic: Topic, callback: (data: Extract<PluginSubscriptionEvent, {
        topic: Topic;
    }>["payload"]) => void): Unsubscribe;
    onMessage: (eventOrMessage: unknown) => void;
    private getOnActionFromCallbackMap;
    applyPluginTheme: (theme: Theme) => void;
    cloneNode(nodeId: NodeId): Promise<AnyNode | null>;
    setAttributes(nodeId: NodeId, attributes: Partial<AnyEditableAttributes>): Promise<AnyNode | null>;
    getParent(nodeId: NodeId): Promise<AnyNode | null>;
    getChildren(nodeId: NodeId): Promise<CanvasNode[]>;
    notify: Notify;
    setMenu(menuItems: MenuItem[]): Promise<void>;
    showContextMenu(menuItems: MenuItem[], config: ContextMenuConfig): Promise<void>;
}

type AssetId = string;
interface AssetIdentifier {
    id: string;
}
interface WithOptionalName {
    name?: string;
}
interface AssetData extends WithOptionalName {
    /** Something that can be rendered within the iFrame. Always the original size of the image */
    url: string;
}
interface ImageOptions {
    /**
     * The image rendering to use.
     * Defaults to "auto"
     */
    preferredImageRendering?: ImageRendering;
    /**
     * The alt text to use for the image.
     */
    altText?: string;
    /**
     * The resolution to use for the image.
     * Defaults to "auto"
     */
    resolution?: Resolution;
}
interface FileAssetDataFields extends AssetData {
    extension: string | null;
}
declare const fileAssetDiscriminator: "FileAsset";
interface FileAssetData extends AssetIdentifier, FileAssetDataFields {
    [classKey]: typeof fileAssetDiscriminator;
}
declare class FileAsset implements AssetIdentifier, FileAssetDataFields {
    readonly id: AssetId;
    readonly url: string;
    readonly extension: string | null;
    constructor(data: FileAssetData);
    static [$framerInternal.unmarshal](_: PluginEngine, data: FileAssetData): FileAsset;
    [$framerInternal.marshal](): FileAssetData;
}
declare function isFileAsset(value: unknown): value is FileAsset;
interface ImageDataFields extends AssetData {
    /**
     * Thumbnail URL of the image.
     */
    thumbnailUrl: string;
    /**
     * Optional Alt Text of the image.
     */
    altText?: string;
    /**
     * The resolution set on the image. Defaults to "auto"
     */
    resolution: Resolution;
}
declare const imageAssetDiscriminator: "ImageAsset";
interface ImageAssetData extends AssetIdentifier, ImageDataFields {
    [classKey]: typeof imageAssetDiscriminator;
}
interface Size {
    /** Same as [HTMLImageElement.naturalWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth).
     *
     * **Warning**: May be zero!
     */
    width: number;
    /** Same as [HTMLImageElement.naturalHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight).
     *
     * **Warning**: May be zero!
     */
    height: number;
}
declare class ImageAsset implements ImageDataFields, AssetIdentifier {
    #private;
    readonly id: AssetId;
    readonly url: string;
    readonly thumbnailUrl: string;
    readonly altText: string | undefined;
    readonly resolution: Resolution;
    constructor(engine: PluginEngine, data: ImageAssetData);
    static [$framerInternal.unmarshal](engine: PluginEngine, data: ImageAssetData): ImageAsset;
    [$framerInternal.marshal](): ImageAssetData;
    /**
     * Clone this image, optionally overriding its attributes.
     */
    cloneWithAttributes({ altText, resolution, }: Prettify<Partial<Pick<ImageAssetData, "altText" | "resolution">>>): ImageAsset;
    /**
     * Measure this image.
     */
    measure(): Promise<Size>;
    /**
     * Get the data such as the bytes of the image. The bytes can be used to manipulate the pixels
     * of the image.
     */
    getData(): Promise<BytesData>;
    /**
     * Load this image as `ImageBitmap`.
     */
    loadBitmap(): Promise<ImageBitmap>;
    /**
     * Load this image as `HTMLImageElement`.
     */
    loadImage(): Promise<HTMLImageElement>;
}
declare function isImageAsset(value: unknown): value is ImageAsset;
type AssetInput = string | File | BytesData;
interface NamedImageAssetInput extends ImageData {
    image: AssetInput;
}
interface NamedFileAssetInput extends WithOptionalName {
    file: AssetInput;
}
interface AssetURLDataTransfer {
    type: "url";
    url: string;
}
interface BytesData {
    bytes: Uint8Array<ArrayBuffer>;
    mimeType: string;
}
type BytesDataTransfer = BytesData & {
    type: "bytes";
};
type Resolution = "auto" | "lossless" | "small" | "medium" | "large" | "full";
interface ImageData extends WithOptionalName, ImageOptions {
}
type AssetDataTransfer = AssetURLDataTransfer | BytesDataTransfer;
type NamedImageTransfer = AssetDataTransfer & ImageData;
type NamedAssetTransfer = AssetDataTransfer & WithOptionalName;
interface SVGData extends WithOptionalName {
    svg: string;
}

declare const framer: FramerPluginAPIAlpha;

declare function configure(environment: Record<string, string | undefined>): void;

declare enum ErrorCode {
    PROJECT_CLOSED = "PROJECT_CLOSED",
    POOL_EXHAUSTED = "POOL_EXHAUSTED",
    TIMEOUT = "TIMEOUT",
    INTERNAL = "INTERNAL",
    NODE_NOT_FOUND = "NODE_NOT_FOUND",
    SCREENSHOT_TOO_LARGE = "SCREENSHOT_TOO_LARGE",
    INVALID_REQUEST = "INVALID_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED"
}
declare class FramerAPIError extends Error {
    readonly code: ErrorCode;
    constructor(message: string, code: ErrorCode);
}
declare function isRetryableError(error: unknown): boolean;

interface ScreenshotOptions {
    /**
     * Image format.
     * @default "png"
     */
    format?: "png" | "jpeg";
    /**
     * JPEG quality (0-100).
     * Only applies when format is "jpeg".
     * @default 100
     */
    quality?: number;
    /**
     * Pixel density multiplier for retina/HiDPI screenshots.
     * @default 1
     */
    scale?: 0.5 | 1 | 1.5 | 2 | 3 | 4;
    /**
     * Clip region in CSS pixels (before scale).
     * Captures only this portion of the node.
     */
    clip?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
interface ScreenshotResult {
    data: Buffer;
    mimeType: string;
}
declare const enabledMethods: {
    showUI: false;
    hideUI: false;
    closePlugin: false;
    setCloseWarning: true;
    notify: false;
    setMenu: false;
    showContextMenu: false;
    preloadDetachedComponentLayers: false;
    preloadDragPreviewImage: false;
    preloadImageUrlForInsertion: false;
    setBackgroundMessage: false;
    getSelection: false;
    getActiveCollection: false;
    getActiveManagedCollection: false;
    getActiveLocale: false;
    zoomIntoView: false;
    navigateTo: false;
    getPluginData: false;
    setPluginData: false;
    getPluginDataKeys: false;
    makeDraggable: false;
    subscribeToSelection: false;
    subscribeToImage: false;
    subscribeToText: false;
    subscribeToCustomCode: false;
    subscribeToColorStyles: false;
    subscribeToTextStyles: false;
    subscribeToRedirects: false;
    subscribeToCodeFiles: false;
    subscribeToOpenCodeFile: false;
    subscribeToIsAllowedTo: false;
    subscribeToCanvasRoot: false;
    subscribeToPublishInfo: false;
    unstable_ensureMinimumDependencyVersion: false;
    removeNode: true;
    removeNodes: true;
    addSVG: true;
    getRect: true;
    setText: true;
    getText: true;
    addText: true;
    setCustomCode: true;
    getCustomCode: true;
    getLocales: true;
    getDefaultLocale: true;
    getLocalizationGroups: true;
    setLocalizationData: true;
    getCurrentUser: true;
    getProjectInfo: true;
    setSelection: true;
    getCanvasRoot: true;
    getPublishInfo: true;
    cloneNode: true;
    getNode: true;
    getParent: true;
    getChildren: true;
    setAttributes: true;
    getNodesWithType: true;
    getNodesWithAttribute: true;
    getNodesWithAttributeSet: true;
    addImages: true;
    getImage: true;
    addImage: true;
    setImage: true;
    uploadImage: true;
    uploadImages: true;
    uploadFile: true;
    uploadFiles: true;
    setParent: true;
    addComponentInstance: true;
    addDetachedComponentLayers: true;
    getManagedCollection: true;
    getManagedCollections: true;
    getCollection: true;
    getCollections: true;
    getColorStyle: true;
    getColorStyles: true;
    createColorStyle: true;
    getTextStyle: true;
    getTextStyles: true;
    createTextStyle: true;
    getFont: true;
    getFonts: true;
    createCodeFile: true;
    getCodeFiles: true;
    getCodeFile: true;
    /** @deprecated The lintCode API was removed. */
    lintCode: true;
    typecheckCode: true;
    addRedirects: true;
    getRedirects: true;
    setRedirectOrder: true;
    removeRedirects: true;
    addComponentInstancePlaceholder: true;
    createCollection: true;
    getVectorSets: true;
    createDesignPage: true;
    createWebPage: true;
    createTextNode: true;
    createComponentNode: true;
    mode: true;
    isAllowedTo: false;
    createFrameNode: true;
    createManagedCollection: true;
};
type EnabledMethodsConfig = typeof enabledMethods;
type BlockedMethods = {
    [K in keyof EnabledMethodsConfig]: EnabledMethodsConfig[K] extends false ? K : never;
}[keyof EnabledMethodsConfig];
/** Used by ActivePlugin.ts for vekter-side validation */
type AvailablePluginMethods = Omit<FramerPluginAPIAlpha, BlockedMethods>;
interface FramerConnectionMethods {
    disconnect(): Promise<void>;
    /** @internal */
    reconnect(): Promise<void>;
    requestId?: string;
    [Symbol.dispose](): void;
    [Symbol.asyncDispose](): Promise<void>;
}
interface FramerScreenshotMethods {
    screenshot(nodeId: string, options?: ScreenshotOptions): Promise<ScreenshotResult>;
    exportSVG(nodeId: string): Promise<string>;
}
type Framer = AvailablePluginMethods & FramerConnectionMethods & FramerScreenshotMethods & FramerApiOnlyMethods;

/**
 * Connect to a Framer project and start using the Framer API.
 *
 * The returned Framer instance is very much aligned with the Plugin API, but has handling to end the connection gracefully.
 *
 * @example
 * ```typescript
 * const projectUrl = "https://framer.com/projects/Website--aabbccdd1122"
 * // Uses your API Key from the environment variable FRAMER_API_KEY
 * const framer = await connect(projectUrl)
 * // ...
 * await framer.disconnect()
 * ```
 *
 * @example
 * ```typescript
 * const projectUrl = "https://framer.com/projects/Website--aabbccdd1122"
 * // Uses your API Key from the environment variable FRAMER_API_KEY
 * // Works in Node.js v24+ and bun 1.3.0+, will automatically close the connection when the scope ends.
 * using framer = await connect(projectUrl)
 * ```
 *
 * @example
 * ```typescript
 * // Use your API key in the function call instead of the environment variable
 * const apiKey = "ap123"
 * const framer = await connect(projectUrl, apiKey)
 * ```
 */
/**
 * @internal
 */
interface ConnectOptions {
    /**
     * Override the api server URL (e.g., for local development)
     * @internal
     */
    serverUrl?: string;
}
declare function connect(projectUrlOrId: string, token?: string, options?: ConnectOptions): Promise<Framer>;
/**
 * Connect to a Framer project and execute a callback with the Framer instance.
 * The connection will be closed automatically when the resolves.
 *
 * @example
 * ```typescript
 * const projectUrl = "https://framer.com/projects/Website--aabbccdd1122"
 * await withConnection(projectUrl, async (framer) => {
 *     const info = await framer.getProjectInfo()
 *     // ...
 *     await myApi.doSomething(info)
 *     // the connection is closed automatically when this callback resolves
 * })
 * ```
 */
declare function withConnection<T>(projectUrlOrId: string, callback: (framer: Framer) => Promise<T>, token?: string, options?: ConnectOptions): Promise<T>;

export { type AllTraits, type AnyNode, type ApiVersion1ProjectInfo, type ApiVersion1User, type ArrayControl, type ArrayFieldDataEntry, type ArrayFieldDataEntryInput, type ArrayItem, type ArrayItemData, type ArrayItemInput, type AxisOverflow, type BooleanControl, BooleanField, BooleanVariable, type Border, type BorderControl, type BorderRadius, type BorderRadiusControl, type BorderStyle, BorderVariable, type BorderWidth, type Breakpoint, type CanvasNode, type CanvasRootNode, CodeFile, type CodeFileComponentExport, type CodeFileExport, type CodeFileOverrideExport, CodeFileVersion, Collection, CollectionItem, type CollectionItemData, type CollectionItemInput, type CollectionReferenceControl, CollectionReferenceField, type ColorControl, ColorField, type ColorStop, ColorStyle, ColorVariable, ComponentInstanceNode, ComponentInstancePlaceholder, type ComponentInstancePlaceholderAttributes, type ComponentInstancePlaceholderData, ComponentNode, type ComponentVariable, type ComputedValue, ConicGradient, type ConnectOptions, type Control, type ControlAttributes, type CreateField, type CreateVariable, type CursorControl, type CustomCode, type CustomCodeLocation, type CustomCursorControl, type DateControl, DateField, DateVariable, type Deployment, DesignPageNode, type DiagnosticSpan, type EditableManagedCollectionField, EnumCase, type EnumCaseData, type EnumControl, EnumField, EnumVariable, ErrorCode, type Field, type FieldData, type FieldDataEntry, type FieldDataEntryInput, type FieldDataInput, FieldDivider, type FileControl, FileField, FileVariable, type FitContent, type FitImage, Font, type FontControl, type FormattedTextControl, FormattedTextField, FormattedTextVariable, FrameNode, type Framer, FramerAPIError, FramerPluginClosedError, FramerPluginError, type FusedNumberControl, type GapControl, type Gesture, type Gradient, type GridContentAlignment, type GridItemAlignment, type GridItemColumnSpan, type GridLayout, type HeightConstraint, type HeightLength, type Hostname, type HostnameType, ImageAsset, type ImageControl, ImageField, type ImageRendering, ImageVariable, type InlineLocalizationValueByLocale, type IsBreakpoint, type IsComponentGestureVariant, type IsComponentVariant, type LayoutType, type Length, LinearGradient, type LinkControl, LinkField, type LinkRelControl, LinkVariable, type LintConfig, type LintDiagnostic, type LintLink, type Locale, type LocaleId, type LocalizationData, type LocalizationGroup, type LocalizationGroupStatus, type LocalizationGroupStatusByLocale, type LocalizationSource, type LocalizationSourceId, type LocalizationSourceUpdate, type LocalizationValueByLocale, type LocalizedValueStatus, type LocalizedValueUpdate, ManagedCollection, type ManagedCollectionField, type ManagedCollectionFieldInput, type ManagedCollectionItemInput, type Mode, type MultiCollectionReferenceControl, MultiCollectionReferenceField, type NodeAttributeKey, type NodeId, type NodeRuntimeErrorResult, type NumberControl, NumberField, NumberVariable, type ObjectControl, type Overflow, type Ownership, type PaddingControl, type PageScopeControl, type Position, type ProjectInfo, type ProtectedMethod, type Publish, type PublishInfo, type PublishResult, RadialGradient, type Rect$1 as Rect, Redirect, type RedirectInput, SVGNode, type ScreenshotOptions, type ScreenshotResult, type ScrollSectionControl, type SetLocalizationDataResult, type ShadowControl, type ShowProgressOnInstancesAttributes, type StackAlignment, type StackDirection, type StackDistribution, type StackLayout, type StringControl, StringField, StringVariable, type TextAlignment, type TextDecoration, TextNode, TextStyle, type TextStyleBreakpoint, type TextStyleTag, type TextTransform, type TrackingIdControl, type TraitVariant, type TraitVariantData, type TraitVariantNode, type TransitionControl, type TypecheckDiagnostic, UnsupportedComputedValue, UnsupportedField, UnsupportedVariable, type UpdateFieldAttributes, type User, type Variable, VectorSet, type VectorSetData, VectorSetItem, type VectorSetItemControl, type VectorSetItemData, VectorSetItemNode, type VectorSetItemVariable, VectorSetNode, WebPageNode, type WidthConstraint, type WidthLength, type WithAspectRatioTrait, type WithBackgroundColorTrait, type WithBackgroundGradientTrait, type WithBackgroundImageTrait, type WithBorderRadiusTrait, type WithBorderTrait, type WithBreakpointTrait, type WithComponentInfoTrait, type WithComponentVariantTrait, type WithControlAttributesTrait, type WithFontTrait, type WithGridItemTrait, type WithIdTrait, type WithImageRenderingTrait, type WithInlineTextStyleTrait, type WithLayoutTrait, type WithLinkTrait, type WithLockedTrait, type WithNameTrait, type WithNullableComponentInfoTrait, type WithOpacityTrait, type WithOverflowTrait, type WithPinsTrait, type WithPositionTrait, type WithReplicaInfoTrait, type WithRequiredComponentInfoTrait, type WithRotationTrait, type WithSVGTrait, type WithSizeConstraintsTrait, type WithSizeTrait, type WithTextTruncationTrait, type WithVisibleTrait, type WithWebPageInfoTrait, type WithZIndexTrait, configure, connect, framer, hasGridLayout, hasStackLayout, isBreakpoint, isCodeFileComponentExport, isCodeFileOverrideExport, isColorStyle, isComponentGestureVariant, isComponentInstanceNode, isComponentNode, isComponentVariable, isComponentVariant, isComputedValue, isDesignPageNode, isField, isFileAsset, isFrameNode, isImageAsset, isRetryableError, isSVGNode, isTextNode, isTextStyle, isVariable, isVectorSetItemNode, isVectorSetNode, isWebPageNode, supportsAspectRatio, supportsBackgroundColor, supportsBackgroundColorData, supportsBackgroundGradient, supportsBackgroundGradientData, supportsBackgroundImage, supportsBackgroundImageData, supportsBorder, supportsBorderRadius, supportsBreakpoint, supportsComponentInfo, supportsComponentVariant, supportsFont, supportsFontData, supportsImageRendering, supportsInlineTextStyle, supportsInlineTextStyleData, supportsLayout, supportsLink, supportsLocked, supportsName, supportsOpacity, supportsOverflow, supportsPins, supportsPosition, supportsRotation, supportsSVG, supportsSize, supportsSizeConstraints, supportsTextTruncation, supportsVisible, supportsZIndex, withConnection };
