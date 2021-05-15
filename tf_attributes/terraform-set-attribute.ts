import { TerraformAttribute } from "./terraform-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export abstract class TerraformSetAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: any[] /* Set<T> isn't supported by jsii */, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }
}