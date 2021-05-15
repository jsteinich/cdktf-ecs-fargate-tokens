import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttributeOptions } from "./terraform-attribute";
import { listMapper, numberToTerraform } from "cdktf";
import { TerraformNumber } from "./terraform-number-attribute";
import { ITerraformAddressable } from "./terraform-addressable";
import { TerraformNumberListAttribute } from "./terraform-number-list-attribute";

export class TerraformNumberSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformNumber[] /* Set<T> isn't supported by jsii */, options?: TerraformAttributeOptions) {
        super(parent, terraformAttribute, value, options);
    }

    public get value(): TerraformNumber[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public toList(): TerraformNumberListAttribute {
        return new TerraformNumberListAttribute(this.parent, this.terraformAttribute, this.value, { nested: this.nested, operation: fqn => `tolist(${fqn})` });
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformNumberSet) {
        if (!(value instanceof TerraformNumberSetAttribute)) {
            return new TerraformNumberSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberSetAttribute(parent, terraformAttribute, value.value, { nested: value });
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(numberToTerraform)(this.value);
    }
}

export type TerraformNumberSet = TerraformNumber[] /* Set<T> isn't supported by jsii */ | TerraformNumberSetAttribute;