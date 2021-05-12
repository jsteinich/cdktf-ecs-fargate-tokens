import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { anyToTerraform } from "cdktf";

export class TerraformAnyAttribute extends TerraformAttribute implements TerraformInterpolable {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: any, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): any | undefined {
        return this.realValue;
    }

    public interpolationForAttribute(attribute: string | undefined): string {
        return this.parent.interpolationForAttribute(`${this.terraformAttribute}.${attribute}`);
    }

    public getAttribute(attributeName: string): TerraformAnyAttribute {
        return new TerraformAnyAttribute(this, attributeName, this.value?.attributeName);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformAny) {
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