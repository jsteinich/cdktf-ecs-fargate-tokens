import { TerraformAttribute } from "./terraform-attribute";
import { anyToTerraform } from "cdktf";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformAnyAttribute extends TerraformAttribute implements ITerraformAddressable {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: any, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): any | undefined {
        return this.realValue;
    }

    public getAttribute(attributeName: string): TerraformAnyAttribute {
        return new TerraformAnyAttribute(this, attributeName, this.value?.attributeName);
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformAny) {
        if (!(value instanceof TerraformAnyAttribute)) {
            return new TerraformAnyAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformAnyAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return anyToTerraform(this.value);
    }
}

export type TerraformAny = any | TerraformAnyAttribute;