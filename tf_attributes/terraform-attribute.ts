import { ITerraformAddressable } from "./terraform-addressable";

export abstract class TerraformAttribute implements ITerraformAddressable {
    public constructor(protected readonly parent: ITerraformAddressable, protected readonly terraformAttribute: string, protected realValue?: any, protected nested?: TerraformAttribute) {

    }

    public reset() {
        this.realValue = undefined;
        this.nested = undefined;
    }

    public toTerraform(): any {
        if (this.nested) {
            //only go up one level to maintain terraform dependencies
            return `\${${this.nested.parent.fqn}.${this.nested.terraformAttribute}}`;
        }
        else {
            return this.valueToTerraform();
        }
    }

    public get fqn(): string {
        return `${this.parent.fqn}.${this.terraformAttribute}`;
    }

    public get terraformReference(): string {
        return `\${${this.parent.fqn}.${this.terraformAttribute}}`;
    }

    protected abstract valueToTerraform(): any;
}