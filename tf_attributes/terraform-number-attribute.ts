import { TerraformAttribute } from "./terraform-attribute";
import { numberToTerraform } from "cdktf";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformNumberAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: number, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): number | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformNumber) {
        if (typeof(value) === 'number') {
            return new TerraformNumberAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return numberToTerraform(this.value);
    }
}

export type TerraformNumber = number | TerraformNumberAttribute;