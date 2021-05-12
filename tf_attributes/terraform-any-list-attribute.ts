import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, anyToTerraform } from "cdktf";
import { TerraformAny, TerraformAnyAttribute } from "./terraform-any-attribute";

export class TerraformAnyListAttribute extends TerraformListAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: TerraformAny[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformAny[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformAnyAttribute {
        return new TerraformAnyAttribute(this, `[${index}]`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformAnyList) {
        if (!(value instanceof TerraformAnyListAttribute)) {
            return new TerraformAnyListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformAnyListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(anyToTerraform)(this.value);
    }
}

export type TerraformAnyList = TerraformAny[] | TerraformAnyListAttribute;