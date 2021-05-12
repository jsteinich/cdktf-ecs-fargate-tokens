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
            return this.valueToTerraform();
        }
    }

    public get fqn(): string {
        return `${this.parent.fqn}.${this.terraformAttribute}`;
    }

    public get terraformReference(): string {
        return this.parent.interpolationForAttribute(this.terraformAttribute);
    }

    protected abstract valueToTerraform(): any;
}