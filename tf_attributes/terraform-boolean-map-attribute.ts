import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { hashMapper, booleanToTerraform } from "cdktf";
import { TerraformMapAttribute } from "./terraform-map-attribute";
import { TerraformBoolean, TerraformBooleanAttribute } from "./terraform-boolean-attribute";

export class TerraformBooleanMapAttribute extends TerraformMapAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: { [key: string]: TerraformBoolean }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): { [key: string]: TerraformBoolean } | undefined {
        return this.realValue;
    }

    public get(key: string): TerraformBooleanAttribute {
        return new TerraformBooleanAttribute(this, `${key}`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformBooleanMap) {
        if (!(value instanceof TerraformBooleanMapAttribute)) {
            return new TerraformBooleanMapAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanMapAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return hashMapper(booleanToTerraform)(this.value);
    }
}

export type TerraformBooleanMap = { [key: string]: TerraformBoolean } | TerraformBooleanMapAttribute;