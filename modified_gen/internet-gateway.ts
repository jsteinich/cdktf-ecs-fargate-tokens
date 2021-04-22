// https://www.terraform.io/docs/providers/aws/r/internet_gateway.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';
import { TerraformString, TerraformStringAttribute } from '../tf_attributes/terraform-string-attributes';

// Configuration

export interface InternetGatewayConfig extends cdktf.TerraformMetaArguments {
  readonly tags?: { [key: string]: string };
  readonly vpcId?: TerraformString;
}

// Resource

export class InternetGateway extends cdktf.TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: InternetGatewayConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'aws_internet_gateway',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._tags = config.tags;
    this.vpcId = config.vpcId ?? new TerraformStringAttribute(this, 'vpc_id');
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arn - computed: true, optional: false, required: false
  public get arn() {
    return this.getStringAttribute('arn');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // owner_id - computed: true, optional: false, required: false
  public get ownerId() {
    return this.getStringAttribute('owner_id');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string };
  public get tags() {
    return this.interpolationForAttribute('tags') as any;
  }
  public set tags(value: { [key: string]: string } ) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags
  }

  // vpc_id - computed: false, optional: true, required: false
  private _vpcId!: TerraformStringAttribute;
  public get vpcId(): TerraformString {
    return this._vpcId;
  }
  public set vpcId(value: TerraformString) {
    if (typeof(value) === 'string') {
      this._vpcId = new TerraformStringAttribute(this, 'vpc_id', value);
    }
    else {
      this._vpcId = value;
    }
  }
  public resetVpcId() {
    this._vpcId.value = undefined;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      tags: cdktf.hashMapper(cdktf.anyToTerraform)(this._tags),
      vpc_id: this._vpcId.toTerraform(),
    };
  }
}
