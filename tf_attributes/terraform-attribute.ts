import { TerraformInterpolable } from "./terraform-interpolable";

export abstract class TerraformAttribute {
    public constructor(protected readonly parent: TerraformInterpolable, protected readonly terraformAttribute: string) {

    }

    //TODO as currently used, this sometimes needs to return the set value
    public toTerraform(): string {
        return this.parent.interpolationForAttribute(this.terraformAttribute);
    }
}