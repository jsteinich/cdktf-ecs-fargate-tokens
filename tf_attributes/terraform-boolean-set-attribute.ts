import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttributeOptions } from "./terraform-attribute";
import { listMapper, booleanToTerraform } from "cdktf";
import { TerraformBoolean } from "./terraform-boolean-attribute";
import { ITerraformAddressable } from "./terraform-addressable";
import { TerraformBooleanListAttribute } from "./terraform-boolean-list-attribute";

export class TerraformBooleanSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformBoolean[] /* Set<T> isn't supported by jsii */, options?: TerraformAttributeOptions) {
        super(parent, terraformAttribute, value, options);
    }

    public get value(): TerraformBoolean[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public toList(): TerraformBooleanListAttribute {
        return new TerraformBooleanListAttribute(this.parent, this.terraformAttribute, this.value, { nested: this.nested, operation: fqn => `tolist(${fqn})` });
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformBooleanSet) {
        if (!(value instanceof TerraformBooleanSetAttribute)) {
            return new TerraformBooleanSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanSetAttribute(parent, terraformAttribute, value.value, { nested: value });
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(booleanToTerraform)(this.value);
    }
}

export type TerraformBooleanSet = TerraformBoolean[] /* Set<T> isn't supported by jsii */ | TerraformBooleanSetAttribute;