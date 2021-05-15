import { ITerraformAddressable } from "./terraform-addressable";

export interface TerraformAttributeOptions {
    readonly nested?: TerraformAttribute;
    readonly operation?: { (fqn: string): string; };
}

export abstract class TerraformAttribute implements ITerraformAddressable {
    protected nested?: TerraformAttribute;
    protected readonly operations: { (fqn: string): string; }[] = [];

    public constructor(protected readonly parent: ITerraformAddressable, protected readonly terraformAttribute: string, protected realValue?: any, options?: TerraformAttributeOptions) {
        if(options) {
            this.nested = options.nested;
            if(options.operation) {
                this.operations.push(options.operation);
            }
        }
    }

    public reset() {
        this.realValue = undefined;
        this.nested = undefined;
    }

    public toTerraform(): any {
        if (this.nested) {
            //only go up one level to maintain terraform dependencies
            return this.nested.terraformReference;
        }
        else {
            return this.valueToTerraform();
        }
    }

    public get fqn(): string {
        let reference = `${this.parent.fqn}.${this.terraformAttribute}`;
        this.operations.forEach(operation => {
            reference = operation(reference);
        });
        return reference;
    }

    public get terraformReference(): string {
        return `\${${this.fqn}}`;
    }

    protected abstract valueToTerraform(): any;
}