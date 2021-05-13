import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { hashMapper, anyToTerraform } from "cdktf";
import { TerraformMapAttribute } from "./terraform-map-attribute";
import { TerraformAny, TerraformAnyAttribute } from "./terraform-any-attribute";

export class TerraformAnyMapAttribute extends TerraformMapAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: { [key: string]: TerraformAny }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): { [key: string]: TerraformAny } | undefined {
        return this.realValue;
    }

    public get(key: string): TerraformAnyAttribute {
        return new TerraformAnyAttribute(this, `${key}`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformAnyMap) {
        if (!(value instanceof TerraformAnyMapAttribute)) {
            return new TerraformAnyMapAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformAnyMapAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return hashMapper(anyToTerraform)(this.value);
    }
}

export type TerraformAnyMap = { [key: string]: TerraformAny } | TerraformAnyMapAttribute;