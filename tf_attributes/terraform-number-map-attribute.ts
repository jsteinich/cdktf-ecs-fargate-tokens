import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { hashMapper, numberToTerraform } from "cdktf";
import { TerraformMapAttribute } from "./terraform-map-attribute";
import { TerraformNumber, TerraformNumberAttribute } from "./terraform-number-attribute";

export class TerraformNumberMapAttribute extends TerraformMapAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: { [key: string]: TerraformNumber }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): { [key: string]: TerraformNumber } | undefined {
        return this.realValue;
    }

    public get(key: string): TerraformNumberAttribute {
        return new TerraformNumberAttribute(this, `${key}`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformNumberMap) {
        if (!(value instanceof TerraformNumberMapAttribute)) {
            return new TerraformNumberMapAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberMapAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return hashMapper(numberToTerraform)(this.value);
    }
}

export type TerraformNumberMap = { [key: string]: TerraformNumber } | TerraformNumberMapAttribute;