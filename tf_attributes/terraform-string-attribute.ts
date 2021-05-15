import { TerraformAttribute } from "./terraform-attribute";
import { stringToTerraform } from "cdktf";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformStringAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: string, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): string | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformString) {
        if (typeof(value) === 'string') {
            return new TerraformStringAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return stringToTerraform(this.value);
    }
}

export type TerraformString = string | TerraformStringAttribute;