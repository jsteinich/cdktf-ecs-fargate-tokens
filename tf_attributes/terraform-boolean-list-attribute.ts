import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, booleanToTerraform } from "cdktf";
import { TerraformBoolean, TerraformBooleanAttribute } from "./terraform-boolean-attribute";

export class TerraformBooleanListAttribute extends TerraformListAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: TerraformBoolean[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformBoolean[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformBooleanAttribute {
        return new TerraformBooleanAttribute(this, `[${index}]`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformBooleanList) {
        if (!(value instanceof TerraformBooleanListAttribute)) {
            return new TerraformBooleanListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(booleanToTerraform)(this.value);
    }
}

export type TerraformBooleanList = TerraformBoolean[] | TerraformBooleanListAttribute;