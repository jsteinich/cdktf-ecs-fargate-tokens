export interface TerraformInterpolable {
    interpolationForAttribute(attribute: string | undefined): string;
    readonly fqn: string;
}