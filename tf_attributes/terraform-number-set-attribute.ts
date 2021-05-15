import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, numberToTerraform } from "cdktf";
import { TerraformNumber } from "./terraform-number-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformNumberSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformNumber[] /* Set<T> isn't supported by jsii */, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformNumber[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformNumberSet) {
        if (!(value instanceof TerraformNumberSetAttribute)) {
            return new TerraformNumberSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberSetAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(numberToTerraform)(this.value);
    }
}

export type TerraformNumberSet = TerraformNumber[] /* Set<T> isn't supported by jsii */ | TerraformNumberSetAttribute;