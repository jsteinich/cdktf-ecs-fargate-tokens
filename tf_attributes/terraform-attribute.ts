import { TerraformInterpolable } from "./terraform-interpolable";

export abstract class TerraformAttribute {
    public constructor(protected readonly parent: TerraformInterpolable, protected readonly terraformAttribute: string, protected realValue?: any, protected nested?: TerraformAttribute) {

    }

    public reset() {
        this.realValue = undefined;
        this.nested = undefined;
    }

    public toTerraform(): any {
        if (this.nested) {
            //only go up one level to maintain terraform dependencies
            return this.nested.parent.interpolationForAttribute(this.terraformAttribute);
        }
        else {
            //TODO let subclasses determine how to format this
            return this.realValue;
        }
    }
}